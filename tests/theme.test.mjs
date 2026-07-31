import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveTheme, themeToggleState } from '../site/theme.mjs'

test('uses a valid stored theme before system preference', () => {
  assert.equal(resolveTheme({ stored: 'dark', prefersLight: true }), 'dark')
  assert.equal(resolveTheme({ stored: 'light', prefersLight: false }), 'light')
})

test('falls back to the operating system and normalizes invalid values', () => {
  assert.equal(resolveTheme({ stored: null, prefersLight: true }), 'light')
  assert.equal(resolveTheme({ stored: 'sepia', prefersLight: false }), 'dark')
})

test('theme toggle describes the action it performs', () => {
  assert.deepEqual(themeToggleState('dark'), {
    nextTheme: 'light',
    label: '☼ LIGHT',
    ariaLabel: 'Switch to light theme',
  })
  assert.deepEqual(themeToggleState('light'), {
    nextTheme: 'dark',
    label: '☾ DARK',
    ariaLabel: 'Switch to dark theme',
  })
})
