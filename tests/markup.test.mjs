import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const html = await readFile(new URL('../site/index.html', import.meta.url), 'utf8')

test('uses semantic landmarks, one h1, and a skip link', () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1)
  assert.match(html, /<header\b/)
  assert.match(html, /<main\s+id="main"/)
  assert.match(html, /<footer\b/)
  assert.match(html, /class="skip"\s+href="#main"/)
})

test('keeps the approved section order and navigation anchors', () => {
  const ids = ['experience', 'builds', 'stack', 'about', 'contact']
  let previous = -1
  for (const id of ids) {
    const position = html.indexOf(`id="${id}"`)
    assert.ok(position > previous, `${id} should follow the previous section`)
    previous = position
  }
  for (const id of ['experience', 'builds', 'stack', 'contact']) {
    assert.match(html, new RegExp(`href="#${id}"`))
  }
})

test('has an accessible theme control and safe external links', () => {
  assert.match(html, /<button[^>]+id="theme-toggle"[^>]+aria-label="Switch to light theme"/)
  for (const anchor of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(anchor[0], /rel="noreferrer"/)
  }
})

test('contains the approved crawlable build and contact links', () => {
  for (const url of [
    'https://replikit.ai',
    'https://github.com/BadMask121/member',
    'https://prole.jeffrey.build',
    'https://github.com/BadMask121/ai-agents',
    'mailto:jeff.emakpor@gmail.com',
    'https://www.linkedin.com/in/jeffreyemakpor',
  ]) {
    assert.match(html, new RegExp(`href="${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`))
  }
})

test('excludes retired copy, phone data, and em dashes', () => {
  assert.doesNotMatch(html, /FTR|Divergent|Cecula|Foundations/)
  assert.doesNotMatch(html, /\b(?:phone|tel:)\b/i)
  assert.equal(html.includes('—'), false)
})
