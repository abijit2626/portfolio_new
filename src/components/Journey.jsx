import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { journey } from '../data'
import { SplitText } from './SplitText'

export default function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.7', 'end 0.6'] })
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

  return (
    <section id="journey" className="section">
      <div className="wrap">
        <p className="kicker mono">04 — JOURNEY</p>
        <SplitText as="h2" className="h2" text="How I got here, and where next." />

        <ol className="timeline" ref={ref}>
          <span className="tl-rail" aria-hidden="true" />
          <motion.span className="tl-line" aria-hidden="true" style={{ scaleY: line }} />
          {journey.map((j, i) => (
            <motion.li
              key={j.title}
              className={i % 2 ? 'right' : 'left'}
              initial={{ opacity: 0, y: 70, rotateX: -35, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, x: 0 }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }}
            >
              <motion.i
                className="tl-node"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
              />
              <div className="glass tl-card">
                <span className="mono tl-when">{j.when}</span>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
