# jeffrey.build

Jeffrey Emakpor's production portfolio. It is a dependency-free static site with a retro terminal visual system, a warm-paper light mode, and a motion-comfort-aware parallax controller.

## Local development

Node.js 22 or newer is recommended.

```bash
npm test
npm run build
npm run dev
```

The development server opens the source site at `http://127.0.0.1:3000`. `npm run build` recreates the production files in `dist/`.

## Content and behavior

- `site/index.html` contains the semantic one-page layout and metadata.
- `site/styles.css` contains both themes and responsive layouts.
- `site/content.mjs` records the approved public portfolio data contracts.
- `site/theme.mjs` controls system preference and persisted theme choice.
- `site/parallax.mjs` contains the tested single-loop motion controller.
- `tests/` checks copy, semantics, motion, SEO, and deployment behavior.

## Hosting (Cloudflare)

The site runs as the Cloudflare Worker `jeffrey-build` (`wrangler.jsonc`) on the custom domains `jeffrey.build` and `www.jeffrey.build`.

- Static files are the build output in `dist/`.
- `src/worker.mjs` runs first for every request. It adds the security headers (CSP, COOP, Permissions-Policy, Referrer-Policy, `nosniff`, `DENY` framing) and the cache rules: icons (`.svg`, `.ico`) are immutable and everything else revalidates (styles and scripts are versioned with `?v=`). It serves `.mjs` as JavaScript, answers `/healthz` with `ok`, and permanently redirects `www.jeffrey.build` to `https://jeffrey.build`, keeping the path and query.

Deploy (needs `wrangler` logged in to the Cloudflare account):

```bash
npm test
npm run deploy   # builds dist/ and runs wrangler deploy
```

Check a deploy:

```bash
curl -sI https://jeffrey.build/ | grep -iE '^(server|content-security-policy|cache-control)'
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' https://www.jeffrey.build/
curl -s https://jeffrey.build/healthz
```

Roll back with `npx wrangler rollback` (previous Worker version). Deployment must not change unrelated `*.jeffrey.build` services.
