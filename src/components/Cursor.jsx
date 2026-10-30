import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Custom dot + trailing ring cursor (fine pointers only).
export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 600, damping: 40, mass: 0.3 })
  const dotY = useSpring(y, { stiffness: 600, damping: 40, mass: 0.3 })
  const ringX = useSpring(x, { stiffness: 140, damping: 18 })
  const ringY = useSpring(y, { stiffness: 140, damping: 18 })
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(false)
  const [down, setDown] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e) => setHover(!!e.target.closest?.('a, button, [data-cursor]'))
    const dn = () => setDown(true)
    const up = () => setDown(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', dn)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', dn)
      window.removeEventListener('pointerup', up)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <>
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} animate={{ scale: hover ? 1.9 : down ? 0.7 : 1 }} />
      <motion.div className="cursor-dot" style={{ x: dotX, y: dotY }} animate={{ scale: hover ? 0.4 : 1 }} />
    </>
  )
}
