import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { projects } from '../data'
import { SplitText } from './SplitText'
import TiltCard from './TiltCard'
import { useMedia } from '../lib/hooks'

function ProjectCard({ p, i }) {
  return (
    <TiltCard className="glass project" intensity={9} style={{ '--hue': p.hue }}>
      <span className="project-num" aria-hidden="true" style={{ transform: 'translateZ(60px)' }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="project-body" style={{ transform: 'translateZ(34px)' }}>
        <span className="project-tag mono">{p.tag}</span>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <ul>
          {p.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <a href={p.href} target="_blank" rel="noreferrer" className="project-link">
          View on GitHub <b aria-hidden="true">↗</b>
        </a>
      </div>
    </TiltCard>
  )
}

export default function Projects() {
  const desktop = useMedia('(min-width: 900px)')
  const section = useRef(null)
  const track = useRef(null)
  const [dist, setDist] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    if (!desktop) return
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [desktop])

  if (!desktop) {
    return (
      <section id="work" className="section">
        <div className="wrap">
          <p className="kicker mono">03 — SELECTED WORK</p>
          <SplitText as="h2" className="h2" text="Things I have built." />
          <div className="project-stack">
            {projects.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 60, rotateX: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: 0.8 }}
              >
                <ProjectCard p={p} i={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="work" ref={section} className="hs" style={{ height: dist + window.innerHeight }}>
      <div className="hs-sticky">
        <div className="wrap hs-head">
          <p className="kicker mono">03 — SELECTED WORK</p>
          <SplitText as="h2" className="h2" text="Things I have built." />
        </div>
        <motion.div className="hs-track" ref={track} style={{ x }}>
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </motion.div>
        <div className="hs-bar" aria-hidden="true">
          <motion.i style={{ scaleX: bar }} />
        </div>
      </div>
    </section>
  )
}
