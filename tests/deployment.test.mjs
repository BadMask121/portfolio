import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8')

test('uses a multi-stage unprivileged Nginx image on port 8080', async () => {
  const dockerfile = await read('../Dockerfile')
  assert.match(dockerfile, /FROM node:22-alpine AS build/)
  assert.match(dockerfile, /FROM nginxinc\/nginx-unprivileged:/)
  assert.match(dockerfile, /COPY --from=build \/app\/dist \/usr\/share\/nginx\/html/)
  assert.match(dockerfile, /EXPOSE 8080/)
  assert.match(dockerfile, /HEALTHCHECK/)
})

test('configures compression, security headers, caching, and health checks', async () => {
  const config = await read('../nginx.conf')
  assert.match(config, /listen 8080/)
  assert.match(config, /gzip on/)
  assert.match(config, /Content-Security-Policy/)
  assert.match(config, /X-Content-Type-Options/)
  assert.match(config, /max-age=31536000, immutable/)
  assert.match(config, /max-age=0, must-revalidate/)
  assert.match(config, /location = \/healthz/)
})

test('documents local verification and Coolify deployment', async () => {
  const readme = await read('../README.md')
  assert.match(readme, /npm test/)
  assert.match(readme, /npm run build/)
  assert.match(readme, /Coolify/)
  assert.match(readme, /jeffrey\.build/)
})
