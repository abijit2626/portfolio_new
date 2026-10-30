import { journey } from '../data'
import Reveal from './Reveal'
import SectionHead from './SectionHead'

export default function Journey() {
  return (
    <section id="journey" className="section">
      <div className="wrap">
        <SectionHead label="Journey" title="How I got here, and what is next." />
        <ol className="timeline">
          {journey.map((j, i) => (
            <Reveal as="li" key={j.title} delay={i * 60}>
              <span className="when">{j.when}</span>
              <div>
                <h3>{j.title}</h3>
                <p>{j.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
