import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import { profile } from './data'

export default function App() {
  return (
    <>
      <a className="skip" href="#about">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <footer className="footer">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  )
}
