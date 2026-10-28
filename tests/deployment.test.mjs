import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import worker, { SECURITY_HEADERS, cacheControlFor } from '../src/worker.mjs'

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')

/** Stands in for the Workers static-asset binding: 404 for /missing, 200 otherwise. */
const fakeEnv = {
  ASSETS: {
    async fetch(request) {
      const { pathname } = new URL(request.url)
      const missing = pathname === '/missing'
      return new Response(missing ? 'not found' : `asset ${pathname}`, {
        status: missing ? 404 : 200,
        headers: { 'Content-Type': pathname.endsWith('.mjs') ? 'text/javascript' : 'text/html' },
      })
    },
  },
}

const call = (url, init) => worker.fetch(new Request(url, init), fakeEnv)

test('redirects www to the apex permanently, keeping path and query', async () => {
  const res = await call('https://www.jeffrey.build/work?tab=2')
  assert.equal(res.status, 301)
  assert.equal(res.headers.get('Location'), 'https://jeffrey.build/work?tab=2')
})

test('answers /healthz with ok, uncached, with security headers', async () => {
  const res = await call('https://jeffrey.build/healthz')
  assert.equal(res.status, 200)
  assert.equal(await res.text(), 'ok\n')
  assert.match(res.headers.get('Content-Type'), /text\/plain/)
  assert.equal(res.headers.get('Cache-Control'), 'no-store')
  assert.equal(res.headers.get('X-Frame-Options'), 'DENY')
})

test('adds every security header to static files', async () => {
  const res = await call('https://jeffrey.build/')
  assert.equal(res.status, 200)
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    assert.equal(res.headers.get(name), value, name)
  }
  assert.match(res.headers.get('Content-Security-Policy'), /default-src 'self'/)
  assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff')
})

test('icons are immutable; pages, styles and scripts revalidate', async () => {
  for (const path of ['/favicon.svg', '/og-image.svg', '/favicon.ico']) {
    const res = await call(`https://jeffrey.build${path}`)
    assert.equal(res.headers.get('Cache-Control'), 'public, max-age=31536000, immutable', path)
  }
  for (const path of ['/', '/index.html', '/styles.css', '/main.mjs']) {
    const res = await call(`https://jeffrey.build${path}`)
    assert.equal(res.headers.get('Cache-Control'), 'public, max-age=0, must-revalidate', path)
  }
  assert.equal(cacheControlFor('/A.SVG'), 'public, max-age=31536000, immutable')
})

test('serves module scripts as JavaScript', async () => {
  const res = await call('https://jeffrey.build/main.mjs?v=2')
  assert.match(res.headers.get('Content-Type'), /^application\/javascript/)
})

test('keeps the asset status (a missing file stays 404)', async () => {
  const res = await call('https://jeffrey.build/missing')
  assert.equal(res.status, 404)
  assert.equal(res.headers.get('X-Frame-Options'), 'DENY')
})

test('wrangler.jsonc serves dist/, runs the Worker first and owns both domains', async () => {
  const config = await read('../wrangler.jsonc')
  assert.match(config, /"main": "src\/worker\.mjs"/)
  assert.match(config, /"directory": "\.\/dist"/)
  assert.match(config, /"run_worker_first": true/)
  assert.match(config, /"command": "npm run build"/)
  assert.match(config, /"pattern": "jeffrey\.build", "custom_domain": true/)
  assert.match(config, /"pattern": "www\.jeffrey\.build", "custom_domain": true/)
})

test('documents local verification and the Cloudflare deployment', async () => {
  const readme = await read('../README.md')
  assert.match(readme, /npm test/)
  assert.match(readme, /npm run build/)
  assert.match(readme, /npm run deploy/)
  assert.match(readme, /wrangler/)
  assert.match(readme, /jeffrey\.build/)
})

test('versions browser assets to escape legacy immutable responses', async () => {
  const markup = await read('../site/index.html')
  assert.match(markup, /href="\/styles\.css\?v=2"/)
  assert.match(markup, /src="\/main\.mjs\?v=2"/)
})
