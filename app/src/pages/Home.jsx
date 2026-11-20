import { profile, loves, months, projects } from "../content.js";
import { monthHref, projectHref } from "../site.js";
import { Paper, Tape, Px, Sticker, Label, Reveal, img } from "../components/Paper.jsx";
import Dewy from "../components/Dewy.jsx";
import Terminal from "../components/Terminal.jsx";

function Hero() {
  return (
    <section className="hero">
      <Paper torn className="namecard">
        <Tape style={{ top: -6, left: "38%", transform: "rotate(-4deg)" }} />
        <p className="hand hi">{profile.hello}</p>
        <h1>
          {profile.name[0]}
          <br />
          {profile.name[1]}
          <span className="dot">.</span>
        </h1>
        <p className="intro">{profile.intro}</p>
        <p className="hand scribble">{profile.scribble}</p>
        <div className="me-wrap">
          <Px src="px-me.svg" alt="pixel-art me with headphones round my neck" className="me" />
          <span className="hand me-note">← me, probably humming</span>
        </div>
        <div className="doodles" aria-hidden="true">
          <span className="doodle star">✦</span>
          <span className="doodle spark">✧</span>
          <span className="doodle heart">♡</span>
          <span className="doodle squiggle">〰</span>
        </div>
      </Paper>

      <div className="polaroid">
        <Tape color="p" style={{ top: -12, left: "30%", transform: "rotate(5deg)" }} />
        <Px src="px-cat.svg" alt="pixel orange cat sitting on the photo" className="cat-on-top" />
        <div className="shot">
          <div className="shot-sun" />
          <Px src="px-sparkle.svg" className="twinkle t1" />
          <Px src="px-sparkle.svg" className="twinkle t2" />
          <Px src="px-sparkle.svg" className="twinkle t3" />
          <Dewy size={150} />
        </div>
        <p className="hand">meet dewy, my first build ♡ <small>(click it)</small></p>
        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="badge-ring" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
            </defs>
            <text><textPath href="#badge-ring">{profile.badge + profile.badge}</textPath></text>
          </svg>
          <Px src="px-heart.svg" className="badge-core" />
        </div>
      </div>
    </section>
  );
}

function Loves() {
  return (
    <div className="loves">
      {loves.map((l, i) => (
        <Reveal key={l.title} delay={i * 70}>
          <Paper className="love">
            <Px src={l.icon} />
            <span className="hand">{l.title}</span>
            <small>{l.note}</small>
          </Paper>
        </Reveal>
      ))}
    </div>
  );
}

function Journal() {
  const tapes = ["g", "", "p", "p", "g", ""];
  return (
    <div className="notes">
      {months.map((m, i) => (
        <a
          key={m.n}
          href={monthHref(m.n)}
          className={`paper note ${m.status === "now" ? "on" : ""} ${m.status === "soon" ? "soon" : ""}`}
        >
          <Tape color={tapes[i]} />
          {m.status === "now" && <Px src="px-cat-black.svg" className="peek" />}
          <span className="num">{String(m.n).padStart(2, "0")}</span>
          <b>{m.name}</b>
          <span className="hand">{m.teaser}</span>
          {m.status === "soon" && <span className="lock pixel">locked</span>}
        </a>
      ))}
    </div>
  );
}

function Builds() {
  const p = projects.dewy;
  return (
    <div className="bottom">
      <Paper className="project">
        <Tape style={{ top: -10, left: "40%", transform: "rotate(-3deg)" }} />
        <a className="thumb" href={projectHref("dewy")} aria-label="open the dewy project page">
          <div><img className="px" src={img("px-dewy.svg")} alt="" /></div>
        </a>
        <div>
          <h3><a href={projectHref("dewy")}>{p.name}</a></h3>
          <p>{p.tagline} {p.short}</p>
          <p className="tags">{p.tags.map((t) => <span key={t} className="chip pixel">{t}</span>)}</p>
          <a className="hand more" href={projectHref("dewy")}>read the build log →</a>
        </div>
      </Paper>
      <Terminal />
    </div>
  );
}

export default function Home() {
  return (
    <div className="wrap">
      <img className="ivy" src={img("ivy.svg")} alt="" style={{ height: 460, top: -10, right: -50, transform: "rotate(10deg)" }} />
      <Sticker id="heart" src="px-heart.svg" width={30} rotate={8} style={{ left: "52%", top: 30 }} />
      <Sticker id="cassette" src="px-cassette.svg" width={64} rotate={6} style={{ right: 10, top: 560 }} />

      <Hero />
      <p className="hand drag-tip">(the stickers are real. drag them around.)</p>

      <Label>things i love</Label>
      <Loves />

      <Label id="journal">the journal</Label>
      <Journal />

      <Label>builds &amp; bits</Label>
      <Builds />
    </div>
  );
}
