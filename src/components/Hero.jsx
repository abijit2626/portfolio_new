import { profile, facts } from '../data'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <Reveal className="status">
          <i className="status-dot" aria-hidden="true" />
          {profile.status}
        </Reveal>
        <Reveal as="h1" delay={80}>
          {profile.name}
        </Reveal>
        <Reveal as="p" className="role" delay={140}>
          {profile.title}
        </Reveal>
        <Reveal as="p" className="lede" delay={200}>
          {profile.intro}
        </Reveal>
        <Reveal className="cta" delay={260}>
          <a href="#projects" className="btn btn-primary">
            View projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in touch
          </a>
        </Reveal>

        <Reveal as="dl" className="facts" delay={340}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>
                {f.href ? (
                  <a href={f.href} target="_blank" rel="noreferrer">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
