import Reveal from './Reveal'

export default function SectionHead({ label, title }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{label}</p>
      <h2>{title}</h2>
    </Reveal>
  )
}
