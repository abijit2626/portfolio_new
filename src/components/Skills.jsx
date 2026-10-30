import { skillGroups } from '../data'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <SectionHead label="Skills" title="Tools and techniques I work with." />
        <div className="skill-grid">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} className="skill-group" delay={i * 70}>
              <h3>{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
