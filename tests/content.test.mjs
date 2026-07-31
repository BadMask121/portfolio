import assert from 'node:assert/strict'
import test from 'node:test'

import {
  builds,
  capabilities,
  contact,
  experience,
  metrics,
  profile,
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

test('contains only the approved selected builds in order', () => {
  assert.deepEqual(builds.map(({ name }) => name), ['RepliKit', 'Member', 'Prole', 'AI Agents'])
  assert.equal(builds.find(({ name }) => name === 'Member')?.url, 'https://github.com/BadMask121/member')
})

test('contains the approved public contact channels and no phone number', () => {
  assert.equal(contact.email, 'jeff.emakpor@gmail.com')
  assert.equal(contact.linkedin, 'https://www.linkedin.com/in/jeffreyemakpor')
  assert.equal(contact.github, 'https://github.com/BadMask121')
  assert.equal(deepStrings({ profile, contact }).some((value) => /\+?\d[\d ()-]{7,}/.test(value)), false)
})

test('uses standard hyphens instead of em dashes in visible copy', () => {
  const visibleStrings = deepStrings({ metrics, experience, builds, capabilities, contact, profile })
  assert.equal(visibleStrings.some((value) => value.includes('—')), false)
})
