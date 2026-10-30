import { profile } from '../data'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHead label="Contact" title="Let's work together." />
        <Reveal className="card contact-card">
          <p>
            I am looking for SOC analyst internships for 2026–2027 and open to collaborating on detection
            engineering projects. The best way to reach me is through GitHub or LinkedIn.
          </p>
          <div className="cta">
            <a className="btn btn-primary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn-secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
