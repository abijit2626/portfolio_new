import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { terminalLines } from '../data'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Decorative, simulated SOC terminal that types itself out on a loop.
export default function Terminal() {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 })
  const [lines, setLines] = useState([])
  const [cur, setCur] = useState('')

  useEffect(() => {
    if (!inView) return
    let cancelled = false
    ;(async () => {
      while (!cancelled) {
        setLines([])
        for (const l of terminalLines) {
          if (cancelled) return
          if (l.t === 'cmd') {
            for (let k = 1; k <= l.v.length; k++) {
              if (cancelled) return
              setCur(l.v.slice(0, k))
              await sleep(32)
            }
            await sleep(260)
            setLines((p) => [...p, l])
            setCur('')
          } else {
            await sleep(380)
            setLines((p) => [...p, l])
          }
        }
        await sleep(3200)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [inView])

  return (
    <div className="terminal" ref={ref} aria-label="Simulated SOC terminal output">
      <div className="terminal-bar">
        <i /> <i /> <i />
        <span className="mono">soc-console — simulated</span>
      </div>
      <div className="terminal-body mono">
        {lines.map((l, i) => (
          <div key={i} className={`t-${l.t}`}>
            {l.t === 'cmd' ? <span className="t-prompt">$ </span> : null}
            {l.v}
          </div>
        ))}
        <div className="t-cmd">
          <span className="t-prompt">$ </span>
          {cur}
          <span className="caret" />
        </div>
      </div>
    </div>
  )
}
