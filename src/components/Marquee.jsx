import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'

const wrap = (min, max, v) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

// Scrolling text row that speeds up and reverses with scroll velocity.
function Row({ children, base = 1, outline = false }) {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const dir = useRef(1)

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000)
    if (factor.get() < 0) dir.current = -1
    else if (factor.get() > 0) dir.current = 1
    move += dir.current * move * factor.get()
    baseX.set(baseX.get() + move)
  })

  return (
    <div className="marquee-row">
      <motion.div className={`marquee-track ${outline ? 'outline' : ''}`} style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} aria-hidden={i > 0}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Detect. Correlate. Respond. Repeat.">
      <Row base={-2}>DETECT ✦ CORRELATE ✦ RESPOND ✦ REPEAT ✦&nbsp;</Row>
      <Row base={2} outline>
        SIEM ✦ THREAT HUNTING ✦ LOG ANALYSIS ✦ CTF ✦&nbsp;
      </Row>
    </div>
  )
}
