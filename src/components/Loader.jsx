import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

// Intro screen: a CSS-3D spinning cube and a counter, then a curtain wipe.
export default function Loader({ onDone }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    let timer
    const controls = animate(0, 100, {
      duration: 2.2,
      ease: 'easeInOut',
      onUpdate: (v) => setN(Math.round(v)),
      onComplete: () => {
        timer = setTimeout(onDone, 250)
      },
    })
    return () => {
      controls.stop()
      clearTimeout(timer)
    }
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      exit={{ y: '-100%', borderBottomLeftRadius: '50% 12vh', borderBottomRightRadius: '50% 12vh' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="cube-scene" aria-hidden="true">
        <div className="cube">
          <i className="face f1" />
          <i className="face f2" />
          <i className="face f3" />
          <i className="face f4" />
          <i className="face f5" />
          <i className="face f6" />
        </div>
      </div>
      <div className="loader-meta">
        <span className="mono">ABIJIT.ARUN // INITIALISING</span>
        <span className="loader-count grad-text">{String(n).padStart(3, '0')}</span>
      </div>
      <div className="loader-bar">
        <motion.i style={{ scaleX: n / 100 }} />
      </div>
    </motion.div>
  )
}
