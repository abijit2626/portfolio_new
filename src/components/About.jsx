import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { profile, projects, skillGroups } from '../data'
import { SplitText } from './SplitText'
import TiltCard from './TiltCard'
import Terminal from './Terminal'

function ScrollWord({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <motion.span style={{ opacity }} className="sw">
      {word}{' '}
    </motion.span>
  )
}

function ScrollParagraph({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p className="about-text" ref={ref}>
      {words.map((w, i) => (
        <ScrollWord key={i} word={w} range={[i / words.length, (i + 1) / words.length]} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  )
}

const toolCount = skillGroups.reduce((n, g) => n + g.items.length, 0)
const stats = [
  { to: 3, suffix: 'rd', label: 'Year of CS' },
  { to: projects.length, suffix: '', label: 'Security projects' },
  { to: toolCount, suffix: '', label: 'Tools & skills' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap about-grid">
        <div>
          <p className="kicker mono">01 — ABOUT</p>
          <SplitText as="h2" className="h2" text="Catching what attackers hope you miss." />
          <ScrollParagraph text={profile.about} />
          <div className="stats">
            {stats.map((s, i) => (
              <motion.div
                className="stat"
                key={s.label}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.8 }}
              >
                <b className="grad-text">
                  <Counter to={s.to} suffix={s.suffix} />
                </b>
                <span>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="about-side"
          initial={{ opacity: 0, x: 80, rotateY: -25 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1, ease: [0.2, 0.7, 0.1, 1] }}
        >
          <TiltCard className="glass term-card" intensity={8}>
            <Terminal />
          </TiltCard>
        </motion.div>
      </div>
    </section>
  )
}
