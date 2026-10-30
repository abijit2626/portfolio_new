import { useEffect, useState } from 'react'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import { initScrollStore } from './lib/scrollStore'
import Scene from './components/Scene'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'

export default function App() {
  const [ready, setReady] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => initScrollStore(), [])
  useEffect(() => {
    document.body.style.overflow = ready ? '' : 'hidden'
  }, [ready])

  return (
    <>
      <Cursor />
      <AnimatePresence>{!ready && <Loader key="loader" onDone={() => setReady(true)} />}</AnimatePresence>
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <Scene reduced={!!reduced} />
      <div className="noise" aria-hidden="true" />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </>
  )
}
