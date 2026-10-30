import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

// 3D tilt toward the pointer, with a moving glare. Children can use translateZ for depth.
export default function TiltCard({ children, className = '', intensity = 12, as = 'div', ...rest }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 220, damping: 20, mass: 0.5 }
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [intensity, -intensity]), spring)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-intensity, intensity]), spring)
  const Comp = motion[as] || motion.div

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    mx.set(x - 0.5)
    my.set(y - 0.5)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <Comp
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 1100, transformStyle: 'preserve-3d' }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </Comp>
  )
}
