import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const html = await readFile(new URL('../site/index.html', import.meta.url), 'utf8')

test('declares canonical, Open Graph, Twitter, and theme metadata', () => {
  assert.match(html, /<link rel="canonical" href="https:\/\/jeffrey\.build\/">/)
  for (const property of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    assert.match(html, new RegExp(`property="${property}"`))
  }
  for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert.match(html, new RegExp(`name="${name}"`))
  }
  assert.equal((html.match(/name="theme-color"/g) || []).length, 2)
})

test('includes Person and WebSite structured data', () => {
  assert.match(html, /"@type":\s*"Person"/)
  assert.match(html, /"@type":\s*"WebSite"/)
  assert.match(html, /"url":\s*"https:\/\/jeffrey\.build\/"/)
})

test('ships local favicon, social image, robots, and sitemap files', async () => {
  for (const path of ['../site/favicon.svg', '../site/og-image.svg', '../site/robots.txt', '../site/sitemap.xml']) {
    await access(new URL(path, import.meta.url))
  }
  const robots = await readFile(new URL('../site/robots.txt', import.meta.url), 'utf8')
  const sitemap = await readFile(new URL('../site/sitemap.xml', import.meta.url), 'utf8')
  assert.match(robots, /Sitemap: https:\/\/jeffrey\.build\/sitemap\.xml/)
  assert.match(sitemap, /<loc>https:\/\/jeffrey\.build\/<\/loc>/)
})
