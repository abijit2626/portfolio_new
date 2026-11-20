import { months, projects } from "../content.js";
import { Paper, Tape, Px, Label, Reveal, img } from "../components/Paper.jsx";
import { homeHref, monthHref, projectHref, prefix } from "../site.js";

function Pager({ n }) {
  const prev = months.find((m) => m.n === n - 1);
  const next = months.find((m) => m.n === n + 1);
  return (
    <div className="pager">
      {prev ? <a className="paper pg" href={monthHref(prev.n)}>← {prev.name}</a> : <span />}
      <a className="pg-home pixel" href={homeHref()}>home</a>
      {next ? <a className="paper pg" href={monthHref(next.n)}>{next.name} →</a> : <span />}
    </div>
  );
}

function Strip({ active }) {
  return (
    <div className="month-strip" aria-label="all months">
      {months.map((m) => (
        <a key={m.n} href={monthHref(m.n)} className={`${m.n === active ? "on" : ""} ${m.status}`}>
          {String(m.n).padStart(2, "0")}
        </a>
      ))}
    </div>
  );
}

export default function Month({ n }) {
  const m = months.find((x) => x.n === n);
  if (!m) return null;

  if (m.status === "soon") {
    return (
      <div className="wrap month">
        <Strip active={n} />
        <Paper torn className="blank">
          <Tape style={{ top: -6, left: "40%", transform: "rotate(-3deg)" }} />
          <span className="num pixel">{String(m.n).padStart(2, "0")} · {m.year}</span>
          <h1>{m.name}</h1>
          <p className="hand">this page is still blank. the cat is guarding it until then.</p>
          <Px src="px-cat-sleep.svg" className="guard" alt="sleeping pixel cat" />
        </Paper>
        <Pager n={n} />
      </div>
    );
  }

  return (
    <div className="wrap month">
      <Strip active={n} />
      <img className="ivy" src={img("ivy.svg")} alt="" style={{ height: 420, top: 40, right: -56, transform: "rotate(8deg)" }} />

      <Paper torn className="month-hero">
        <Tape style={{ top: -6, left: "36%", transform: "rotate(-4deg)" }} />
        <span className="num pixel">month {String(m.n).padStart(2, "0")} · {m.year}</span>
        <h1>{m.name}<span className="dot">.</span></h1>
        <p className="intro">{m.focus}</p>
        <span className={`stamp ${m.status}`}>{m.status === "now" ? "in progress" : "done"}</span>
      </Paper>

      <Label>what i worked on</Label>
      <div className="worked">
        {m.worked.map(([title, text], i) => (
          <Reveal key={title} delay={i * 60}>
            <Paper className="work">
              <span className="pin" aria-hidden="true" />
              <span className="pixel idx">{String(i + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Paper>
          </Reveal>
        ))}
      </div>

      <Label>experiments</Label>
      <div className="stickies">
        {m.experiments.map((e, i) => (
          <div key={i} className={`sticky s${i % 3}`}><span className="hand">{e}</span></div>
        ))}
      </div>

      <Label>photos</Label>
      <div className="gallery">
        {(m.photos.length ? m.photos : [{ caption: "photo coming soon" }, { caption: "first power-on?" }, { caption: "the mess on my desk" }]).map((p, i) => (
          <figure key={i} className="polaroid small" style={{ "--tilt": `${[-3, 2, -1.5][i % 3]}deg` }}>
            <Tape color={["", "g", "p"][i % 3]} style={{ top: -10, left: "35%" }} />
            {p.src ? <img src={prefix() + p.src}alt={p.caption} loading="lazy" /> : <div className="empty pixel">📷 add a photo</div>}
            <figcaption className="hand">{p.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className="two">
        <div>
          <Label>what i learned</Label>
          <Paper className="lined">
            <ul>{m.learned.map((l, i) => <li key={i} className="hand">{l}</li>)}</ul>
          </Paper>
        </div>
        <div>
          <Label>next month</Label>
          <Paper className="todo">
            <Tape color="g" style={{ top: -10, left: "30%", transform: "rotate(-4deg)" }} />
            {m.next.map((t, i) => (
              <label key={i} className="check">
                <input type="checkbox" /> <span>{t}</span>
              </label>
            ))}
          </Paper>
        </div>
      </div>

      <Label>projects this month</Label>
      <div className="mini-projects">
        {m.projects.map((id) => (
          <a key={id} href={projectHref(id)} className="paper mini">
            <Px src="px-dewy.svg" />
            <div><b>{projects[id].name}</b><span className="hand">{projects[id].tagline}</span></div>
          </a>
        ))}
      </div>

      <Pager n={n} />
    </div>
  );
}
