import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.2, 0.7, 0.1, 1]

// Word-by-word mask reveal when scrolled into view.
// The observer sits on the wrapper: a child hidden by its own overflow mask never reports as visible.
export function SplitText({ text, className = '', delay = 0, as: Tag = 'span' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <span className="split-word" key={i} aria-hidden="true">
          <motion.span
            className="split-inner"
            initial={{ y: '112%', rotateX: -70 }}
            animate={inView ? { y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

// Letter-by-letter 3D flip-in, triggered by `ready` (used by the hero after the loader).
export function Letters({ text, ready, delay = 0, className = '' }) {
  return (
    <span className={`letters ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span className="letter-mask" key={i} aria-hidden="true">
          <motion.span
            className="letter"
            initial={{ y: '118%', rotateX: -90, opacity: 0 }}
            animate={ready ? { y: 0, rotateX: 0, opacity: 1 } : {}}
            transition={{ duration: 1.05, ease, delay: delay + i * 0.07 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
