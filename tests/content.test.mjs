import assert from 'node:assert/strict'
import test from 'node:test'

import {
  builds,
  capabilities,
  contact,
  experience,
  metrics,
  profile,
  sideProjects,
} from '../site/content.mjs'

const deepStrings = (value) => {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(deepStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(deepStrings)
  return []
}

test('contains the four approved production metrics in order', () => {
  assert.deepEqual(metrics.map(({ value }) => value), ['€4M+', '1M+', '200K+', '8+'])
})

test('contains only the approved work experience in order', () => {
  assert.deepEqual(experience.map(({ company }) => company), ['RepliKit', 'Tappz GmbH', 'Receeve GmbH'])
})

test('features RepliKit as the only selected build', () => {
  assert.deepEqual(builds.map(({ name }) => name), ['RepliKit'])
  assert.equal(builds[0].url, 'https://replikit.ai')
})

test('lists personal work as side projects in order', () => {
  assert.deepEqual(sideProjects.items.map(({ name }) => name), ['VoxSplit', 'DJ Sync', 'Prole', 'Member', 'AI Agents', 'mail-mcp'])
  assert.equal(sideProjects.items.find(({ name }) => name === 'Member')?.url, 'https://github.com/BadMask121/member')
  for (const project of sideProjects.items) {
    assert.match(project.url, /^https:\/\//, project.name)
    assert.ok(project.tags.length > 0, project.name)
  }
})

test('contains the approved public contact channels and no phone number', () => {
  assert.equal(contact.email, 'jeff.emakpor@gmail.com')
  assert.equal(contact.linkedin, 'https://www.linkedin.com/in/jeffreyemakpor')
  assert.equal(contact.github, 'https://github.com/BadMask121')
  assert.equal(deepStrings({ profile, contact }).some((value) => /\+?\d[\d ()-]{7,}/.test(value)), false)
})

test('uses standard hyphens instead of em dashes in visible copy', () => {
  const visibleStrings = deepStrings({ metrics, experience, builds, sideProjects, capabilities, contact, profile })
  assert.equal(visibleStrings.some((value) => value.includes('—')), false)
})
