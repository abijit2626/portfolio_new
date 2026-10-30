import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { profile } from '../data'
import { Letters } from './SplitText'
import Magnetic from './Magnetic'

const chips = [
  { label: 'SIEM', depth: 40, pos: { top: '24%', right: '9%' } },
  { label: 'THREAT HUNTING', depth: -26, pos: { top: '52%', right: '4%' } },
  { label: 'CTF', depth: 58, pos: { top: '70%', right: '22%' } },
]

function Chip({ label, depth, pos, mx, my, i, ready }) {
  const x = useSpring(useTransform(mx, [-1, 1], [-depth, depth]), { stiffness: 80, damping: 18 })
  const y = useSpring(useTransform(my, [-1, 1], [-depth, depth]), { stiffness: 80, damping: 18 })
  return (
    <motion.div className="chip" style={{ ...pos, x, y }}>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={ready ? { opacity: 1, scale: 1, y: [0, -12, 0] } : {}}
        transition={{
          opacity: { delay: 1.6 + i * 0.2 },
          scale: { delay: 1.6 + i * 0.2, type: 'spring' },
          y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: 2 + i * 0.3 },
        }}
      >
        {label}
      </motion.span>
    </motion.div>
  )
}

export default function Hero({ ready }) {
  const [role, setRole] = useState(0)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const textX = useSpring(useTransform(mx, [-1, 1], [12, -12]), { stiffness: 60, damping: 20 })
  const textY = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 60, damping: 20 })

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % profile.roles.length), 2400)
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1)
      my.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move)
    return () => {
      clearInterval(id)
      window.removeEventListener('pointermove', move)
    }
  }, [mx, my])

  return (
    <section id="top" className="hero">
      <div className="floor" aria-hidden="true">
        <div className="floor-grid" />
      </div>

      {chips.map((c, i) => (
        <Chip key={c.label} {...c} mx={mx} my={my} i={i} ready={ready} />
      ))}

      <motion.div className="wrap hero-inner" style={{ x: textX, y: textY }}>
        <motion.p
          className="eyebrow mono"
          initial={{ opacity: 0, x: -30 }}
          animate={ready ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <i className="dot" /> CS STUDENT · {profile.location.toUpperCase()}
        </motion.p>

        <h1 className="hero-title">
          <span className="hero-line grad-text">
            <Letters text={profile.first} ready={ready} delay={0.35} />
          </span>
          <span className="hero-line outline">
            <Letters text={profile.last} ready={ready} delay={0.75} />
          </span>
        </h1>

        <motion.div
          className="role"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 1.3 }}
        >
          <span className="role-label mono">I do</span>
          <span className="role-swap">
            <AnimatePresence mode="wait">
              <motion.span
                key={role}
                initial={{ y: 28, opacity: 0, rotateX: -70 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -28, opacity: 0, rotateX: 70 }}
                transition={{ duration: 0.45 }}
              >
                {profile.roles[role]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.9 }}
        >
          {profile.intro}
        </motion.p>

        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.7, duration: 0.9 }}
        >
          <Magnetic>
            <a href="#work" className="btn btn-solid">
              <span>See my work</span>
              <b aria-hidden="true">↗</b>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <span>GitHub {profile.githubHandle}</span>
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-cue mono"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
        aria-label="Scroll to about"
      >
        SCROLL
        <i />
      </motion.a>
    </section>
  )
}
