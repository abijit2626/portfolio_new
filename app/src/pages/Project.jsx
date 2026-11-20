import { projects, months } from "../content.js";
import { Paper, Tape, Px, Label, Reveal, img } from "../components/Paper.jsx";
import { homeHref, monthHref } from "../site.js";
import Dewy from "../components/Dewy.jsx";

const ICONS = ["px-sparkle.svg", "px-heart.svg", "px-cat.svg", "px-note.svg", "px-headphones.svg", "px-laptop.svg"];

export default function Project({ id }) {
  const p = projects[id];
  if (!p) return null;
  const month = months.find((m) => m.n === p.month);

  return (
    <div className="wrap project-page">
      <img className="ivy" src={img("ivy.svg")} alt="" style={{ height: 440, top: 0, left: -60, transform: "rotate(-6deg)" }} />

      <section className="proj-hero">
        <Paper torn className="proj-title">
          <Tape style={{ top: -6, left: "30%", transform: "rotate(-3deg)" }} />
          <span className="pixel num">project · month {String(p.month).padStart(2, "0")}</span>
          <h1>{p.name}<span className="dot">.</span></h1>
          <p className="intro">{p.tagline}</p>
          <p className="hand">{p.short}</p>
          <p className="tags">{p.tags.map((t) => <span key={t} className="chip pixel">{t}</span>)}</p>
        </Paper>
        <div className="dewy-stage">
          <Paper className="stage-card">
            <Tape color="p" style={{ top: -10, left: "38%", transform: "rotate(4deg)" }} />
            <Dewy size={230} />
            <p className="hand">hover: happy · click: cat mode · double-click: dizzy</p>
          </Paper>
        </div>
      </section>

      <Label>why i'm building it</Label>
      <Paper className="why"><p>{p.why}</p></Paper>

      <Label>what it does</Label>
      <div className="features">
        {p.features.map(([t, d], i) => (
          <Reveal key={t} delay={i * 60}>
            <Paper className="feature">
              <Px src={ICONS[i % ICONS.length]} />
              <h3>{t}</h3>
              <p>{d}</p>
            </Paper>
          </Reveal>
        ))}
      </div>

      <Label>the parts</Label>
      <Paper className="graph">
        <Tape style={{ top: -10, left: "8%", transform: "rotate(-5deg)" }} />
        <Tape color="g" style={{ top: -10, right: "8%", transform: "rotate(4deg)" }} />
        <table>
          <thead><tr><th>part</th><th>why it's there</th></tr></thead>
          <tbody>{p.hardware.map(([a, b]) => <tr key={a}><td className="pixel">{a}</td><td>{b}</td></tr>)}</tbody>
        </table>
      </Paper>

      <Label>how it works</Label>
      <ol className="flow">
        {p.how.map((s, i) => (
          <li key={i}>
            <Paper className="step"><span className="pixel idx">{i + 1}</span><p>{s}</p></Paper>
            {i < p.how.length - 1 && <span className="arrow hand" aria-hidden="true">↓</span>}
          </li>
        ))}
      </ol>

      <div className="two">
        <div>
          <Label>build log</Label>
          <ul className="timeline">
            {p.log.map(([when, what]) => (
              <li key={when}><span className="pixel when">{when}</span><span>{what}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <Label>what didn't work (yet)</Label>
          <div className="stickies one">
            {p.failed.map((f, i) => <div key={i} className={`sticky s${(i + 1) % 3}`}><span className="hand">{f}</span></div>)}
            <div className="sticky s2"><span className="hand">more to come once the hardware is on the bench…</span></div>
          </div>
        </div>
      </div>

      <Label>next steps</Label>
      <Paper className="todo wide">
        {p.next.map((t, i) => <label key={i} className="check"><input type="checkbox" /> <span>{t}</span></label>)}
      </Paper>

      <div className="pager">
        <a className="paper pg" href={monthHref(p.month)}>← {month?.name}</a>
        <a className="pg-home pixel" href={homeHref()}>home</a>
        <a className="paper pg" href={p.repo} target="_blank" rel="noreferrer">code on github ↗</a>
      </div>
    </div>
  );
}
