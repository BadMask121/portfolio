import { initParallax } from './parallax.mjs'
import { initTheme } from './theme.mjs'

const start = () => {
  initTheme()
  initParallax()
  const year = document.querySelector('[data-current-year]')
  if (year) year.textContent = String(new Date().getFullYear())
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true })
} else {
  start()
}
