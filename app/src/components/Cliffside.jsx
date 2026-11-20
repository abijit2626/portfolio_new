import { useEffect, useRef, useState } from "react";
import { albums } from "../content.js";
import Scene from "./Scene.jsx";
import { playSong } from "../player.js";

// The opening: me on a cliff by the sea with my cat. Click to zoom into my laptop, pick a
// record, and the camera settles back into that record's mood. The moving scene then stays
// on as the homepage background, with me (still listening) on the right.
//
// phases: intro → zoom-in → laptop → playing → settle → bg
//         bg → lift → zoom-in … (the "change record" button in the nav)
const OVERLAY = ["intro", "zoom-in", "laptop", "playing", "settle", "lift"];

function useReducedMotion() {
  const [r] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
  return r;
}

export default function Cliffside({ look, startFull, reopen, onPick }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState(startFull ? "intro" : "bg");
  const [mood, setMood] = useState(startFull ? "dawn" : look);
  const [playing, setPlaying] = useState(null);
  const overlay = OVERLAY.includes(phase);
  const wait = (ms) => (reduced ? 0 : ms);

  // timed steps (the intro waits for a click)
  useEffect(() => {
    const next = { "zoom-in": ["laptop", 1400], settle: ["bg", 3000], lift: ["zoom-in", 500] }[phase];
    if (!next) return;
    const t = setTimeout(() => setPhase(next[0]), wait(next[1]));
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // tell the page whether the scene is behind it now (for the background styles + fade-in)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-scene");
    root.classList.toggle("scene-bg", phase === "bg");
    if (phase === "bg") window.scrollTo({ top: 0 });
  }, [phase]);
  useEffect(() => () => document.documentElement.classList.remove("has-scene", "scene-bg"), []);

  // "change record" in the nav
  const firstReopen = useRef(true);
  useEffect(() => {
    if (firstReopen.current) { firstReopen.current = false; return; }
    if (reopen) { setPlaying(null); setPhase("lift"); }
  }, [reopen]);

  // lock page scroll + Esc to skip while the scene covers the page
  useEffect(() => {
    if (!overlay) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") skip(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overlay]);

  const pickTimer = useRef(null);
  useEffect(() => () => clearTimeout(pickTimer.current), []);

  const pick = (id) => {
    if (phase !== "laptop") return;
    setPlaying(id);
    setPhase("playing");
    onPick(id); // the page underneath switches theme now
    const song = albums.find((a) => a.id === id)?.song;
    if (song) playSong(song.file); // this click is what lets the browser play sound
    pickTimer.current = setTimeout(() => { setMood(id); setPhase("settle"); }, wait(1300));
  };

  const skip = () => {
    clearTimeout(pickTimer.current);
    onPick(look);
    setMood(look);
    setPlaying(null);
    setPhase("bg");
  };

  const shownId = playing || (mood === "dawn" ? null : mood);
  const album = albums.find((a) => a.id === shownId);
  const view = ["zoom-in", "laptop", "playing"].includes(phase) ? "laptop" : phase === "intro" || phase === "lift" ? "wide" : "bg";

  return (
    <div
      className={`cliff ${overlay ? "full" : "bg"} ph-${phase}`}
      data-mood={mood}
      role={overlay ? "dialog" : undefined}
      aria-modal={overlay ? "true" : undefined}
      aria-label={overlay ? "pick a record to set the mood" : undefined}
      aria-hidden={overlay ? undefined : "true"}
      onClick={phase === "intro" ? () => setPhase("zoom-in") : undefined}
    >
      <Scene mood={mood} view={view} listening={phase === "settle" || phase === "bg"} />
      <div className="cl-dim" aria-hidden="true" />
      <div className="cl-veil" aria-hidden="true" />

      {phase === "intro" && (
        <div className="cl-cap cl-cap-intro">
          <p className="pixel">abijit's scrapbook of making</p>
          <p className="cl-big">come sit for a bit.</p>
          <button type="button" className="cl-open pixel" autoFocus onClick={(e) => { e.stopPropagation(); setPhase("zoom-in"); }}>
            open my laptop ▸
          </button>
        </div>
      )}

      {(phase === "laptop" || phase === "playing") && <Laptop playing={playing} onPick={pick} />}

      {phase === "settle" && album && (
        <div className="cl-cap cl-cap-now" aria-live="polite">
          <p className="pixel">now playing</p>
          <p className="cl-big">{album.title}</p>
          <p className="hand">{album.vibe}</p>
        </div>
      )}

      {overlay && phase !== "lift" && (
        <button type="button" className="cl-skip pixel" onClick={(e) => { e.stopPropagation(); skip(); }}>
          skip →
        </button>
      )}

    </div>
  );
}

// The laptop screen: a little music app with my three records.
function Laptop({ playing, onPick }) {
  const first = useRef(null);
  useEffect(() => { first.current?.focus({ preventScroll: true }); }, []);
  const now = albums.find((a) => a.id === playing);

  return (
    <div className="cl-laptop" onClick={(e) => e.stopPropagation()}>
      <div className="cl-screen">
        <div className="cl-app">
          <aside className="cl-side" aria-hidden="true">
            <p className="pixel">your library</p>
            {albums.map((a) => (
              <div key={a.id} className={`cl-side-row alb-${a.id} ${playing === a.id ? "on" : ""}`}>
                <span className={`cl-cover sm alb-${a.id}`} />
                <span><b>{a.title}</b><small>album · {a.artist}</small></span>
              </div>
            ))}
          </aside>

          <div className="cl-main">
            <p className="pixel cl-kicker">abijit's records</p>
            <p className="cl-title">pick a record</p>
            <p className="hand cl-sub">it sets the mood for the whole site</p>
            <div className="cl-grid">
              {albums.map((a, i) => (
                <button
                  key={a.id}
                  ref={i === 0 ? first : null}
                  type="button"
                  className={`cl-card alb-${a.id} ${playing === a.id ? "on" : ""} ${playing && playing !== a.id ? "off" : ""}`}
                  style={{ "--i": i }}
                  onClick={() => onPick(a.id)}
                  aria-label={`${a.title} by ${a.artist}: ${a.vibe}`}
                >
                  <span className={`cl-cover alb-${a.id}`}>
                    <span className="cl-word">{a.title}</span>
                    <span className="cl-play" aria-hidden="true">{playing === a.id ? "❚❚" : "▶"}</span>
                  </span>
                  <b>{a.title}</b>
                  <small>{a.artist}</small>
                  <span className="hand">{a.vibe}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`cl-player ${now ? "alb-" + now.id : ""}`} aria-hidden="true">
            {now ? (
              <>
                <span className={`cl-cover xs alb-${now.id}`} />
                <span className="cl-np"><b>{now.title}</b><small>{now.artist}</small></span>
                <span className="cl-eq"><i /><i /><i /><i /><i /></span>
                <span className="cl-prog"><i /></span>
              </>
            ) : (
              <span className="cl-np cl-idle">nothing playing yet · pick one ↑</span>
            )}
          </div>
        </div>
      </div>
      <div className="cl-base" />
    </div>
  );
}
