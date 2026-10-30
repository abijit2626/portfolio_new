import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const links = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['work', 'Work'],
  ['journey', 'Journey'],
  ['contact', 'Contact'],
]

export default function Nav() {
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <motion.nav
        className="nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
        aria-label="Primary"
      >
        <a href="#top" className="nav-logo" aria-label="Back to top">
          <span className="grad-text">A</span>A
        </a>
        <ul>
          {links.map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? 'is-active' : ''}>
                {label}
                {active === id && <motion.i layoutId="nav-pill" className="nav-pill" />}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>
    </>
  )
}
