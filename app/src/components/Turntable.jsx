import { useEffect, useMemo, useRef, useState } from "react";
import { albums } from "../content.js";
import { playSong, stopSong, usePlayer } from "../player.js";
import { Paper, Tape, Px } from "./Paper.jsx";

// Soft vinyl crackle made in the browser (no audio files). Only starts after a click.
function useCrackle(on) {
  const ctxRef = useRef(null);
  const nodeRef = useRef(null);
  useEffect(() => {
    if (!on) {
      nodeRef.current?.gain.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.2);
      return;
    }
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = ctxRef.current || new Ctx();
      ctxRef.current = ctx;
      if (!nodeRef.current) {
        const len = ctx.sampleRate * 2;
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) {
          d[i] = (Math.random() * 2 - 1) * 0.015; // hiss
          if (Math.random() < 0.0009) d[i] += (Math.random() * 2 - 1) * 0.6; // pops
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.value = 3200;
        const gain = ctx.createGain();
        gain.gain.value = 0;
        src.connect(lp).connect(gain).connect(ctx.destination);
        src.start();
        nodeRef.current = { src, gain };
      }
      ctx.resume();
      nodeRef.current.gain.gain.setTargetAtTime(0.5, ctx.currentTime, 0.3);
    } catch { /* audio unavailable: the record still spins */ }
  }, [on]);
  useEffect(() => () => { try { ctxRef.current?.close(); } catch {} }, []);
}

export default function Turntable({ album }) {
  // only the album picked on the opening screen sits on the turntable; the record just turns
  // its song on and off (pick a different album with "change record" in the nav)
  const crate = useMemo(() => {
    const list = album ? [album] : albums;
    return list.map((a) => ({ artist: a.title, title: a.title, note: a.vibe, color: a.color, label: a.label, song: a.song }));
  }, [album]);
  const [spinOnly, setSpinOnly] = useState(!!album); // records without a song file just spin
  const [cur, setCur] = useState(0);
  const [sound, setSound] = useState(false);
  const player = usePlayer();
  useEffect(() => { if (album) { setCur(0); setSpinOnly(true); } }, [album]);
  const r = crate[cur] || crate[0];
  // a record with a song file is "playing" exactly when its song is actually playing
  const playing = r.song ? player.playing && player.src === r.song.file : spinOnly;
  useCrackle(playing && sound);

  const toggle = () => {
    if (r.song) { if (playing) stopSong(); else playSong(r.song.file); }
    else setSpinOnly((p) => !p);
  };
  const putOn = (i) => {
    setCur(i);
    const rec = crate[i];
    if (rec.song) playSong(rec.song.file);
    else { stopSong(); setSpinOnly(true); }
  };

  return (
    <Paper className="spin">
      <Tape color="g" style={{ top: -10, left: "12%", transform: "rotate(-6deg)" }} />
      <Tape style={{ bottom: -8, right: "10%", transform: "rotate(4deg)" }} />

      <button
        type="button"
        className={`deck ${playing ? "playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "stop the record" : "play the record"}
      >
        <span className="platter" />
        <span
          className="record"
          style={{ "--label": r.color, "--label-ink": r.label }}
        >
          <span className="label-text">{r.artist}</span>
        </span>
        <span className="arm" />
        <span className="deck-light" />
        <span className="deck-hint pixel">{playing ? "■ stop" : "▶ play"}</span>
      </button>

      <div className="nowplaying">
        <p className="pixel">{playing ? "▶ now spinning · side a · 33⅓" : "■ needle up · pick a record"}</p>
        <h3 key={r.artist} className="pop">{r.artist}</h3>
        <p className="hand">{r.note}</p>
        {r.song && <p className="pixel track">♪ {r.song.title}</p>}
        <div className={`eq ${playing ? "on" : ""}`} aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => <i key={i} style={{ animationDelay: `${(i * 137) % 600}ms` }} />)}
        </div>
        <div className="crate" role="list" aria-label="my record crate">
          {crate.map((rec, i) => (
            <button
              type="button"
              role="listitem"
              key={i}
              className={`sleeve ${i === cur ? "picked" : ""}`}
              style={{ background: rec.color, "--tilt": `${[-3, 2, -1, 3, -2][i % 5]}deg` }}
              onClick={() => putOn(i)}
              title={`put on ${rec.artist}`}
            >
              {rec.artist}
            </button>
          ))}
        </div>
        <div className="crate-row">
          <p className="hand crate-note">tap the record to play or stop ♪</p>
          <label className="crackle pixel">
            <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} /> crackle
          </label>
        </div>
      </div>
      <Px src="px-note.svg" className="float-note n1" />
      <Px src="px-note.svg" className="float-note n2" />
      <Px src="px-sparkle.svg" className="float-note n3" />
    </Paper>
  );
}
