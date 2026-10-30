import { motion } from 'framer-motion'
import { profile } from '../data'
import { SplitText } from './SplitText'
import Magnetic from './Magnetic'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <p className="kicker mono">05 — CONTACT</p>
        <SplitText as="h2" className="h2 mega" text="Let's build something secure." />
        <motion.p
          className="lede"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          I am looking for SOC analyst internships for 2026–2027 and open to collaborating on detection
          engineering projects. Say hello.
        </motion.p>
        <div className="cta">
          <Magnetic strength={0.5}>
            <a href={profile.github} target="_blank" rel="noreferrer" className="btn btn-solid">
              <span>GitHub</span>
              <b aria-hidden="true">↗</b>
            </a>
          </Magnetic>
          <Magnetic strength={0.5}>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <span>LinkedIn</span>
              <b aria-hidden="true">↗</b>
            </a>
          </Magnetic>
        </div>
      </div>
      <footer className="footer mono">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  )
}
