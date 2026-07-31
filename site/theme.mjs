const themes = new Set(['dark', 'light'])

export const resolveTheme = ({ stored, prefersLight = false }) => {
  if (themes.has(stored)) return stored
  return prefersLight ? 'light' : 'dark'
}

export const themeToggleState = (theme) =>
  theme === 'light'
    ? { nextTheme: 'dark', label: '☾ DARK', ariaLabel: 'Switch to dark theme' }
    : { nextTheme: 'light', label: '☼ LIGHT', ariaLabel: 'Switch to light theme' }

export const initTheme = ({ doc = document, win = window, storage = localStorage } = {}) => {
  const root = doc.documentElement
  const toggle = doc.querySelector('#theme-toggle')
  const media = win.matchMedia('(prefers-color-scheme: light)')

  let stored = null
  try {
    stored = storage.getItem('jeffrey-build-theme')
  } catch {
    stored = null
  }

  const applyTheme = (theme, persist = false) => {
    root.dataset.theme = theme
    root.style.colorScheme = theme
    if (toggle) {
      const state = themeToggleState(theme)
      toggle.textContent = state.label
      toggle.setAttribute('aria-label', state.ariaLabel)
    }
    if (persist) {
      try {
        storage.setItem('jeffrey-build-theme', theme)
      } catch {
        // The selected theme still works when storage is unavailable.
      }
    }
  }

  applyTheme(resolveTheme({ stored, prefersLight: media.matches }))

  const onToggle = () => {
    const state = themeToggleState(root.dataset.theme)
    applyTheme(state.nextTheme, true)
  }
  toggle?.addEventListener('click', onToggle)

  return () => toggle?.removeEventListener('click', onToggle)
}
