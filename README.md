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

## Container

Build and run the same image used in production:

```bash
docker build -t jeffrey-build-portfolio .
docker run --rm -p 8080:8080 jeffrey-build-portfolio
curl http://127.0.0.1:8080/healthz
```

The runtime image uses unprivileged Nginx on port `8080`, serves compressed assets, and includes security and cache headers.

## Coolify deployment

1. Create or update the Coolify application from `BadMask121/portfolio`.
2. Select the repository `Dockerfile` as the build pack and expose port `8080`.
3. Attach `jeffrey.build` and `www.jeffrey.build`.
4. Enable automatic HTTPS and redirect HTTP to HTTPS.
5. Redirect `www.jeffrey.build` to the apex `https://jeffrey.build` URL.
6. Verify `/healthz`, the certificate, metadata, public links, both themes, and the mobile layout.

The previous Git commit remains the rollback point. Deployment must not change unrelated `*.jeffrey.build` services.
