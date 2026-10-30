// Shared scroll state read by the WebGL scene every frame (no React re-renders).
export const scrollStore = { y: 0, progress: 0 }

export function initScrollStore() {
  const update = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    scrollStore.y = window.scrollY
    scrollStore.progress = Math.min(1, Math.max(0, window.scrollY / max))
  }
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  return () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  }
}
