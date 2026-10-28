// jeffrey.build on Cloudflare: serves the built site (dist/) with the security
// and cache headers the old Nginx config set, redirects www to the apex, and
// answers /healthz.

export const APEX = 'jeffrey.build'

export const SECURITY_HEADERS = {
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
}

/** Icons never change in place; everything else revalidates (styles and
 * scripts are versioned with ?v= instead). */
export function cacheControlFor(pathname) {
  return /\.(?:svg|ico)$/i.test(pathname)
    ? 'public, max-age=31536000, immutable'
    : 'public, max-age=0, must-revalidate'
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.hostname === `www.${APEX}`) {
      url.hostname = APEX
      return Response.redirect(url.toString(), 301)
    }

    if (url.pathname === '/healthz') {
      return new Response('ok\n', {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', ...SECURITY_HEADERS },
      })
    }

    const asset = await env.ASSETS.fetch(request)
    const headers = new Headers(asset.headers)
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value)
    headers.set('Cache-Control', cacheControlFor(url.pathname))
    // Module scripts must be served as JavaScript.
    if (url.pathname.endsWith('.mjs')) headers.set('Content-Type', 'application/javascript; charset=utf-8')
    return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers })
  },
}
