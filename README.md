# jeffrey.build — Portfolio

Static portfolio served from Cloudflare Workers.

## Build

```bash
npm run build
```

Copies `site/` to `dist/` with no additional processing.

## Test

```bash
npm test
```

Runs 25 tests that verify the build output, security headers, cache rules, and asset versioning.

## Deploy (Cloudflare)

```bash
npm run deploy
```

Builds the site and deploys to Cloudflare Workers with custom domains `jeffrey.build` and `www.jeffrey.build`.

### Cut-over

1. In the Cloudflare dashboard, delete the `@` and `www` A records pointing at `95.217.185.93`.
2. Run `npm run deploy`.
3. Wait ~2 minutes for the certificate to be issued.
4. Verify with:

```bash
curl --resolve jeffrey.build:443:<cf-ip> https://jeffrey.build/
curl --resolve www.jeffrey.build:443:<cf-ip> https://www.jeffrey.build/
curl --resolve jeffrey.build:443:<cf-ip> https://jeffrey.build/healthz
```

### Rollback (while Hetzner still exists)

1. Remove both custom domains from the Worker.
2. Re-add the A records (`@`, `www` → `95.217.185.93`) in the Cloudflare dashboard.
3. Deploy via Coolify.

## Architecture

- **Build:** `scripts/build.mjs` copies `site/` to `dist/`.
- **Worker:** `src/worker.mjs` serves `dist/` with security headers, cache rules, and a `www` → apex redirect.
- **Assets:** Icons (`svg`, `ico`) are immutable; everything else revalidates.
- **Security:** CSP, COOP, Permissions-Policy, Referrer-Policy, X-Content-Type-Options, X-Frame-Options.
- **Health:** `/healthz` returns `ok` with `no-store` cache control.
