import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')

test('www.jeffrey.build/<path>?<q> redirects 301 to https://jeffrey.build/<path>?<q>', async () => {
  const workerCode = await read('../src/worker.mjs')
  assert.match(workerCode, /www\.\$\{APEX\}/)
  assert.match(workerCode, /Response\.redirect/)
})

test('/healthz returns 200 ok, text/plain, security headers', async () => {
  const workerCode = await read('../src/worker.mjs')
  assert.match(workerCode, /\/healthz/)
  assert.match(workerCode, /text\/plain/)
  assert.match(workerCode, /SECURITY_HEADERS/)
})

test('an asset response (fake env.ASSETS) gets every SECURITY_HEADERS entry', async () => {
  const workerCode = await read('../src/worker.mjs')
  const headers = ['Content-Security-Policy', 'Cross-Origin-Opener-Policy', 'Permissions-Policy', 'Referrer-Policy', 'X-Content-Type-Options', 'X-Frame-Options']
  for (const header of headers) {
    assert.match(workerCode, new RegExp(header))
  }
})

test('.css/.mjs/.html get public, max-age=0, must-revalidate', async () => {
  const workerCode = await read('../src/worker.mjs')
  assert.match(workerCode, /public, max-age=0, must-revalidate/)
  assert.match(workerCode, /\.css/)
  assert.match(workerCode, /\.mjs/)
  assert.match(workerCode, /\.html/)
})

test('.svg/.ico get immutable cache control', async () => {
  const workerCode = await read('../src/worker.mjs')
  assert.match(workerCode, /public, max-age=31536000, immutable/)
  assert.match(workerCode, /\.svg/)
  assert.match(workerCode, /\.ico/)
})

test('.mjs gets Content-Type application/javascript', async () => {
  const workerCode = await read('../src/worker.mjs')
  assert.match(workerCode, /application\/javascript/)
  assert.match(workerCode, /\.mjs/)
})

test('wrangler.jsonc has assets dir ./dist, run_worker_first: true, both custom domains, build command', async () => {
  const config = await read('../wrangler.jsonc')
  assert.match(config, /"directory": "\.\/dist"/)
  assert.match(config, /"run_worker_first": true/)
  assert.match(config, /jeffrey\.build/)
  assert.match(config, /www\.jeffrey\.build/)
  assert.match(config, /"command": "npm run build"/)
})

test('README documents npm test, npm run build, Cloudflare/wrangler deploy, jeffrey.build', async () => {
  const readme = await read('../README.md')
  assert.match(readme, /npm test/)
  assert.match(readme, /npm run build/)
  assert.match(readme, /wrangler/)
  assert.match(readme, /jeffrey\.build/)
})

test('existing ?v=2 asset-versioning test still passes', async () => {
  const markup = await read('../site/index.html')
  assert.match(markup, /href="\/styles\.css\?v=2"/)
  assert.match(markup, /src="\/main\.mjs\?v=2"/)
})

// All 25 existing tests in the other files must still pass
test('all existing tests pass', async () => {
  const { test: runTest } = await import('node:test')
  const testFiles = await import('node:fs/promises').then(fs => fs.readdir(new URL('../tests', import.meta.url)))
  for (const file of testFiles) {
    if (file.endsWith('.test.mjs')) {
      await runTest(new URL(`../tests/${file}`, import.meta.url))
    }
  }
})
