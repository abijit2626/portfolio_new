import { profile } from '../data'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHead label="About" title="Catching what attackers hope you miss." />
        <Reveal className="prose">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
