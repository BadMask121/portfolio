# Jeffrey.build Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan.

**Goal:** Replace the existing portfolio placeholder with the approved retro hacker portfolio, publish it from the existing GitHub repository, and deploy it to `jeffrey.build` on Jeffrey's VPS.

**Architecture:** Use framework-free static HTML, CSS, and JavaScript so the page is fast, audit-friendly, and deployable as immutable files. Keep structured portfolio content in one module, theme and motion logic in focused modules, validate the build with Node's built-in test runner, and serve the generated `dist/` directory from a small Nginx container.

**Tech Stack:** Semantic HTML5, modern CSS, ES modules, Node.js test runner, Nginx, Docker, GitHub, existing VPS/Coolify.

---

## Task 1: Establish the static build and contract tests

**Files:**

- Modify: `package.json`
- Create: `scripts/build.mjs`
- Create: `tests/content.test.mjs`
- Create: `site/content.mjs`
- Delete after replacement is complete: Nuxt-only application files and dependencies

**Step 1: Write the failing content contract tests**

Test that the exported content contains exactly the four approved metrics, the three approved employers in order, the four approved builds in order, the public contact links, and no em dash character in visible strings.

**Step 2: Run the test to verify it fails**

Run: `node --test tests/content.test.mjs`

Expected: FAIL because `site/content.mjs` does not exist.

**Step 3: Implement the content module**

Export `metrics`, `experience`, `builds`, `capabilities`, `contact`, and `profile` from `site/content.mjs`. Use only RepliKit, Tappz, and Receeve for experience; only RepliKit, Member, Prole, and AI Agents for builds; and use normal hyphens in all date ranges.

**Step 4: Add a dependency-free static build**

Set package scripts to:

```json
{
  "dev": "node scripts/dev.mjs",
  "test": "node --test tests/*.test.mjs",
  "build": "node scripts/build.mjs"
}
```

The build script recreates `dist/`, copies the approved site assets, and fails if required source files are missing.

**Step 5: Run the contract test**

Run: `npm test`

Expected: PASS.

**Step 6: Commit**

```bash
git add package.json package-lock.json scripts tests site/content.mjs
git commit -m "test: define portfolio content contracts"
```

## Task 2: Implement testable theme and parallax behavior

**Files:**

- Create: `tests/theme.test.mjs`
- Create: `tests/parallax.test.mjs`
- Create: `site/theme.mjs`
- Create: `site/parallax.mjs`
- Create: `site/main.mjs`

**Step 1: Write failing unit tests**

Cover system preference fallback, stored theme normalization, parallax clamping and interpolation, deterministic targets at the same scroll position, responsive movement reduction, disabled motion for `prefers-reduced-motion`, and a 4px maximum horizontal movement for work-history rows.

**Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because the theme and parallax modules do not exist.

**Step 3: Implement pure helpers**

`theme.mjs` exposes pure theme resolution helpers plus a DOM initializer. `parallax.mjs` exposes `clamp`, `lerp`, target calculation, geometry refresh, and a single-requestAnimationFrame controller using stable `offsetTop` coordinates and `translate3d` transforms.

Use the approved motion strengths, with project and hero depth remaining visible while `.job` movement is capped at 4px. Disable all motion under reduced-motion preference and scale it down on narrow screens.

**Step 4: Wire the browser entry point**

`main.mjs` initializes theme persistence, the parallax controller, and the footer year after DOM readiness.

**Step 5: Run tests**

Run: `npm test`

Expected: PASS.

**Step 6: Commit**

```bash
git add tests site/theme.mjs site/parallax.mjs site/main.mjs
git commit -m "feat: add accessible theme and smooth parallax"
```

## Task 3: Build the complete approved one-page experience

**Files:**

- Create: `site/index.html`
- Create: `site/styles.css`
- Create: `tests/markup.test.mjs`

**Step 1: Write failing markup tests**

Validate one `h1`, landmark structure, skip link, ordered section anchors, theme button accessibility, external-link safety, crawlable project URLs, no phone number, no excluded employers, no em dash character, and every interactive target represented with visible text or an accessible name.

**Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because the production markup is not present.

**Step 3: Create the semantic page**

Implement, in order: sticky navigation, hero and system-status panel, four production metrics, selected work experience, selected builds, capability groups, about, contact, and footer. Preserve the terminal symbols from the approved preview and use only normal hyphens in copy.

**Step 4: Implement the visual system**

Create the approved dark phosphor-terminal theme and warm-paper light theme with square borders, subtle scanlines, no stock imagery, no fake code rain, visible focus states, touch targets of at least 44px, and responsive layouts at 375px, 768px, 1024px, and wide desktop widths.

**Step 5: Run tests**

Run: `npm test`

Expected: PASS.

**Step 6: Commit**

```bash
git add site/index.html site/styles.css tests/markup.test.mjs
git commit -m "feat: build retro production portfolio"
```

## Task 4: Add SEO, structured data, and static assets

**Files:**

- Modify: `site/index.html`
- Create: `site/favicon.svg`
- Create: `site/og-image.svg`
- Create: `site/robots.txt`
- Create: `site/sitemap.xml`
- Create: `tests/seo.test.mjs`

**Step 1: Write failing SEO tests**

Require the canonical URL, description, Open Graph and Twitter metadata, theme colors, Person and WebSite JSON-LD, favicon, robots policy, and sitemap entry for `https://jeffrey.build/`.

**Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL until the metadata and files are present.

**Step 3: Implement metadata and assets**

Use the title `Jeffrey Emakpor | Senior AI Platform Engineer`, a concise production-focused description, the canonical apex URL, and a branded terminal-style social image. Keep all assets local and avoid third-party tracking or fonts.

**Step 4: Run tests and build**

Run: `npm test && npm run build`

Expected: PASS with a complete `dist/` directory.

**Step 5: Commit**

```bash
git add site tests scripts
git commit -m "feat: add portfolio metadata and discovery files"
```

## Task 5: Package the static site for the VPS

**Files:**

- Create: `Dockerfile`
- Create: `nginx.conf`
- Create: `.dockerignore`
- Modify: `README.md`
- Create: `tests/deployment.test.mjs`

**Step 1: Write failing deployment tests**

Require a multi-stage static build, non-root Nginx-compatible paths, compression, security headers, immutable asset caching, short HTML caching, and a health endpoint.

**Step 2: Run tests and verify failure**

Run: `npm test`

Expected: FAIL because deployment files do not exist.

**Step 3: Implement container and server config**

Build `dist/` in a Node stage, copy it into Nginx, listen on port 8080, serve `index.html`, expose `/healthz`, enable gzip, set CSP and other security headers, cache static assets for one year, and keep HTML revalidatable.

**Step 4: Document local and VPS operation**

Document `npm test`, `npm run build`, the local dev server, Docker build/run, Coolify deployment settings, and domain expectations.

**Step 5: Verify**

Run: `npm test && npm run build`

If Docker is available, also run: `docker build -t jeffrey-build-portfolio:local .`

Expected: all checks pass and the image builds.

**Step 6: Commit**

```bash
git add Dockerfile nginx.conf .dockerignore README.md tests
git commit -m "ops: package portfolio for Coolify"
```

## Task 6: Remove the retired Nuxt placeholder

**Files:**

- Delete: `app.vue`, `nuxt.config.ts`, `tsconfig.json`, `tailwind.config.js`
- Delete: `pages/`, `layouts/`, `components/`, `assets/`, `server/`
- Modify: `.gitignore`
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Remove framework-only files and dependencies**

Keep only the static source, scripts, tests, documentation, and deployment files. Regenerate the lock file with no application dependencies.

**Step 2: Verify the clean project**

Run: `npm install && npm test && npm run build`

Expected: install reports no application dependency vulnerabilities, all tests pass, and `dist/index.html` exists.

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor: retire Nuxt portfolio placeholder"
```

## Task 7: Perform visual and accessibility QA

**Files:**

- Modify as needed: `site/index.html`, `site/styles.css`, `site/main.mjs`, `site/parallax.mjs`

**Step 1: Serve the production build**

Run: `npm run build && npm run dev`

**Step 2: Inspect all approved breakpoints**

Check dark and light themes at 375px, 768px, 1024px, and a wide desktop viewport. Verify content order, no horizontal overflow, 200% zoom readability, keyboard navigation, visible focus, theme persistence, and clear but comfortable parallax.

**Step 3: Verify motion comfort**

Measure work-history row translation while scrolling and confirm it never exceeds 4px. Confirm reduced-motion mode produces no non-essential transforms or blinking animation.

**Step 4: Run final local verification**

Run: `npm test && npm run build`

Expected: PASS with no browser console errors.

**Step 5: Commit any QA adjustments**

```bash
git add site tests
git commit -m "fix: polish responsive portfolio experience"
```

## Task 8: Publish to GitHub and deploy to jeffrey.build

**Files:**

- No source changes expected unless deployment verification exposes a defect

**Step 1: Confirm the final diff and remote**

Run: `git status --short --branch && git diff origin/main...HEAD --stat && git remote -v`

Expected: only the portfolio implementation is present and `origin` is `BadMask121/portfolio`.

**Step 2: Push the implementation branch**

Run: `git push -u origin codex/jeffrey-build-portfolio`

Expected: branch is available on GitHub.

**Step 3: Publish to the deployment branch**

Fast-forward `main` to the verified implementation only after confirming the remote has not moved. Preserve the previous remote commit so rollback is a normal Git redeploy.

**Step 4: Deploy through the VPS's existing Coolify setup**

Create or update the portfolio application from `BadMask121/portfolio`, use the repository Dockerfile, set the exposed service port to `8080`, and attach `jeffrey.build` plus `www.jeffrey.build`. Configure automatic HTTPS, redirect HTTP to HTTPS, and redirect `www` to the apex domain without touching other VPS services.

**Step 5: Verify production**

Check DNS, certificate validity, HTTP-to-HTTPS redirect, `www` redirect, `/healthz`, page metadata, all public links, dark/light theme persistence, mobile layout, console errors, and the rendered approved content.

**Step 6: Roll back if verification fails**

Redeploy the previous remote commit if a production-blocking issue cannot be corrected immediately. Do not delete the previous deployment or unrelated Coolify applications.

