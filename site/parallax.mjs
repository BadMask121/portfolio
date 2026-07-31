export const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export const lerp = (current, target, amount) => current + (target - current) * amount

export const responsiveMotionScale = (viewportWidth = Number.POSITIVE_INFINITY) =>
  viewportWidth < 700 ? 0.66 : 1

export const calculateTarget = ({
  kind,
  scrollY = 0,
  viewportHeight = 0,
  viewportWidth = Number.POSITIVE_INFINITY,
  baseCenter = 0,
  speed = 0,
  direction = 1,
  max = 0,
  reducedMotion = false,
}) => {
  if (reducedMotion) return 0
  const scale = responsiveMotionScale(viewportWidth)
  if (kind === 'scroll') return clamp(scrollY * speed, 0, max) * scale
  const viewportCenter = scrollY + viewportHeight / 2
  return clamp((baseCenter - viewportCenter) * speed * direction, -max, max) * scale
}

export const workHistoryMotion = (index) => ({
  kind: 'center',
  axis: 'x',
  speed: 0.018,
  direction: index % 2 === 0 ? 1 : -1,
  max: 4,
})

const documentTop = (element) => {
  let top = 0
  let node = element
  while (node) {
    top += node.offsetTop || 0
    node = node.offsetParent
  }
  return top
}

const centerOf = (element) => documentTop(element) + element.offsetHeight / 2

export const initParallax = ({ doc = document, win = window } = {}) => {
  const preference = win.matchMedia('(prefers-reduced-motion: reduce)')
  if (preference.matches) return () => {}

  const motion = []
  const add = (element, config) => {
    if (!element) return
    motion.push({
      element,
      current: 0,
      target: 0,
      baseCenter: centerOf(config.base || element),
      ...config,
    })
  }

  add(doc.querySelector('.noise'), { kind: 'scroll', axis: 'y', speed: 0.2, max: 9999, scale: 1.08 })
  add(doc.querySelector('.machine'), { kind: 'scroll', axis: 'y', speed: 0.32, max: 210 })
  add(doc.querySelector('.hero h1'), { kind: 'scroll', axis: 'y', speed: 0.11, max: 74 })

  doc.querySelectorAll('.metric').forEach((element, index) => {
    add(element, { kind: 'center', axis: 'y', speed: 0.2, direction: index % 2 === 0 ? 1 : -1, max: 62 })
  })

  doc.querySelectorAll('.section-head').forEach((head) => {
    const experience = Boolean(head.closest('#experience'))
    add(head.querySelector('h2'), {
      kind: 'center',
      axis: 'y',
      speed: experience ? -0.025 : -0.1,
      direction: 1,
      max: experience ? 16 : 72,
      base: head,
    })
    add(head.querySelector('.eyebrow'), {
      kind: 'center',
      axis: 'x',
      speed: experience ? -0.035 : -0.16,
      direction: 1,
      max: experience ? 18 : 90,
      base: head,
    })
  })

  doc.querySelectorAll('.job').forEach((element, index) => add(element, workHistoryMotion(index)))
  doc.querySelectorAll('.project').forEach((element, index) => {
    add(element, { kind: 'center', axis: 'y', speed: 0.16, direction: index % 2 === 0 ? 1 : -1, max: 64 })
  })

  let frame = 0
  const ease = 0.105

  const updateTargets = () => {
    motion.forEach((item) => {
      item.target = calculateTarget({
        ...item,
        scrollY: win.scrollY,
        viewportHeight: win.innerHeight,
        viewportWidth: win.innerWidth,
      })
    })
  }

  const render = () => {
    let unsettled = false
    motion.forEach((item) => {
      const delta = item.target - item.current
      if (Math.abs(delta) > 0.08) {
        item.current = lerp(item.current, item.target, ease)
        unsettled = true
      } else {
        item.current = item.target
      }
      const x = item.axis === 'x' ? item.current : 0
      const y = item.axis === 'y' ? item.current : 0
      const scale = item.scale ? ` scale(${item.scale})` : ''
      item.element.style.transform = `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)${scale}`
    })
    frame = unsettled ? win.requestAnimationFrame(render) : 0
  }

  const requestRender = () => {
    updateTargets()
    if (!frame) frame = win.requestAnimationFrame(render)
  }

  const refreshGeometry = () => {
    motion.forEach((item) => {
      item.baseCenter = centerOf(item.base || item.element)
    })
    requestRender()
  }

  win.addEventListener('scroll', requestRender, { passive: true })
  win.addEventListener('resize', refreshGeometry, { passive: true })
  requestRender()

  return () => {
    win.removeEventListener('scroll', requestRender)
    win.removeEventListener('resize', refreshGeometry)
    if (frame) win.cancelAnimationFrame(frame)
    motion.forEach(({ element }) => element.style.removeProperty('transform'))
  }
}
