import { projects } from '../data'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <SectionHead label="Projects" title="Selected work." />
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.name} className="card project" delay={(i % 2) * 80}>
              <div className="project-meta">
                <span className="pill">{p.tag}</span>
                <span className="project-status">{p.status}</span>
              </div>
              <h3>{p.name}</h3>
              <p className="project-desc">{p.description}</p>
              <ul className="ticks">
                {p.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <a className="link" href={p.href} target="_blank" rel="noreferrer">
                View repository <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
