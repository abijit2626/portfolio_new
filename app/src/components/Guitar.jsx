import { useRef, useState } from "react";
import { Paper, Tape } from "./Paper.jsx";

// A playable guitar. Each string is a Karplus-Strong pluck made in the browser.
const OPEN = [82.41, 110.0, 146.83, 196.0, 246.94, 329.63]; // E2 A2 D3 G3 B3 E4
const NAMES = ["E", "A", "D", "G", "B", "e"];
const CHORDS = {
  Em: [0, 2, 2, 0, 0, 0],
  G: [3, 2, 0, 0, 0, 3],
  C: [null, 3, 2, 0, 1, 0],
  D: [null, null, 0, 2, 3, 2],
  Am: [null, 0, 2, 2, 1, 0],
};

function pluckBuffer(ctx, freq) {
  const sr = ctx.sampleRate;
  const len = Math.floor(sr * 2.2);
  const buf = ctx.createBuffer(1, len, sr);
  const out = buf.getChannelData(0);
  const N = Math.round(sr / freq);
  const ring = new Float32Array(N);
  for (let i = 0; i < N; i++) ring[i] = Math.random() * 2 - 1;
  let idx = 0;
  for (let i = 0; i < len; i++) {
    const next = (idx + 1) % N;
    const v = 0.996 * 0.5 * (ring[idx] + ring[next]);
    out[i] = ring[idx];
    ring[idx] = v;
    idx = next;
  }
  return buf;
}

export default function Guitar() {
  const ctxRef = useRef(null);
  const cache = useRef(new Map());
  const [ringing, setRinging] = useState([]);
  const [chord, setChord] = useState(null);
  const down = useRef(false);

  const ctx = () => {
    try {
      if (!ctxRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        ctxRef.current = new Ctx();
      }
      ctxRef.current.resume();
      return ctxRef.current;
    } catch { return null; }
  };

  const play = (s, fret = 0, when = 0) => {
    if (fret === null) return;
    const c = ctx();
    if (c) {
      const f = OPEN[s] * Math.pow(2, fret / 12);
      const key = f.toFixed(2);
      if (!cache.current.has(key)) cache.current.set(key, pluckBuffer(c, f));
      const src = c.createBufferSource();
      src.buffer = cache.current.get(key);
      const g = c.createGain();
      g.gain.value = 0.35;
      src.connect(g).connect(c.destination);
      src.start(c.currentTime + when);
    }
    setTimeout(() => {
      setRinging((r) => [...r, s]);
      setTimeout(() => setRinging((r) => { const i = r.indexOf(s); return r.filter((_, j) => j !== i); }), 600);
    }, when * 1000);
  };

  const strum = (name) => {
    setChord(name);
    CHORDS[name].forEach((fret, s) => play(s, fret, s * 0.035));
  };

  const fretFor = (s) => (chord ? CHORDS[chord][s] : 0);

  return (
    <Paper className="guitar-card">
      <Tape color="p" style={{ top: -10, left: "46%", transform: "rotate(3deg)" }} />
      <div className="guitar-head">
        <div>
          <p className="pixel muted">▶ go on, play it</p>
          <h3>my guitar</h3>
          <p className="hand">hover or drag across the strings · or pick a chord</p>
        </div>
        <div className="chords">
          {Object.keys(CHORDS).map((c) => (
            <button key={c} type="button" className={`chord ${chord === c ? "on" : ""}`} onClick={() => strum(c)}>{c}</button>
          ))}
          <button type="button" className={`chord ${chord === null ? "on" : ""}`} onClick={() => setChord(null)} title="open strings">open</button>
        </div>
      </div>

      <div
        className="neck"
        onPointerDown={() => (down.current = true)}
        onPointerUp={() => (down.current = false)}
        onPointerLeave={() => (down.current = false)}
      >
        <div className="frets" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <span key={i} />)}</div>
        <div className="inlays" aria-hidden="true"><i style={{ left: "29%" }} /><i style={{ left: "45%" }} /><i style={{ left: "62%" }} /><i style={{ left: "79%" }} /></div>
        <div className="soundhole" aria-hidden="true" />
        {OPEN.map((_, s) => {
          const strIdx = 5 - s; // high e on top, like tab
          const fret = fretFor(strIdx);
          return (
            <button
              type="button"
              key={strIdx}
              className={`string ${ringing.includes(strIdx) ? "ring" : ""} ${fret === null ? "muted" : ""}`}
              style={{ "--thick": `${1 + (5 - strIdx) * 0.45}px` }}
              onPointerEnter={() => play(strIdx, fret)}
              onClick={() => play(strIdx, fret)}
              aria-label={`pluck the ${NAMES[strIdx]} string`}
            >
              <span className="sname pixel">{NAMES[strIdx]}</span>
              <span className="wire" />
              {fret !== null && fret > 0 && <span className="dot" style={{ left: `${12 + fret * 8.2}%` }} />}
              {fret === null && <span className="x pixel">×</span>}
            </button>
          );
        })}
      </div>
    </Paper>
  );
}
