import assert from 'node:assert/strict'
import test from 'node:test'

import {
  calculateTarget,
  clamp,
  lerp,
  responsiveMotionScale,
  workHistoryMotion,
} from '../site/parallax.mjs'

test('clamps and interpolates motion values', () => {
  assert.equal(clamp(12, -4, 4), 4)
  assert.equal(clamp(-8, -4, 4), -4)
  assert.equal(lerp(0, 10, 0.1), 1)
})

test('returns a stable target for identical geometry and scroll state', () => {
  const input = {
    kind: 'center',
    scrollY: 720,
    viewportHeight: 800,
    baseCenter: 1420,
    speed: 0.16,
    direction: -1,
    max: 64,
    viewportWidth: 1280,
  }
  assert.equal(calculateTarget(input), calculateTarget(input))
})

test('reduces motion on narrow viewports and disables it for reduced motion', () => {
  assert.equal(responsiveMotionScale(699), 0.66)
  assert.equal(responsiveMotionScale(700), 1)
  assert.equal(calculateTarget({ kind: 'scroll', scrollY: 500, speed: 0.2, max: 100, reducedMotion: true }), 0)
})

test('caps every work-history row at four horizontal pixels', () => {
  for (let index = 0; index < 3; index += 1) {
    const config = workHistoryMotion(index)
    assert.equal(config.axis, 'x')
    assert.equal(config.max, 4)
    const target = calculateTarget({
      ...config,
      scrollY: 4000,
      viewportHeight: 900,
      viewportWidth: 1440,
      baseCenter: 100,
    })
    assert.ok(Math.abs(target) <= 4)
  }
})
