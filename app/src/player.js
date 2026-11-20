import { useEffect, useState } from "react";

// One shared audio player for the whole site, so the opening laptop screen and the turntable
// control the same song. Songs live in app/public/audio/ and are set per album in content.js.
// Browsers only allow sound after a click, so playback always starts from one.

let audio = null;
let state = { src: null, playing: false };
const subs = new Set();
const emit = () => subs.forEach((fn) => fn({ ...state }));

function el() {
  if (!audio) {
    audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.addEventListener("play", () => { state.playing = true; emit(); });
    audio.addEventListener("pause", () => { state.playing = false; emit(); });
    audio.addEventListener("error", () => { state.playing = false; emit(); });
  }
  return audio;
}

// gently fade the volume instead of starting or stopping abruptly. Starting a new fade cancels
// the old one, so a stop that's still fading out can't silence a song picked right after it.
let fadeId = 0;
function fade(a, to, ms, done) {
  const id = ++fadeId;
  const from = a.volume;
  const start = performance.now();
  const step = (now) => {
    if (id !== fadeId) return;
    const k = Math.min(1, (now - start) / ms);
    a.volume = from + (to - from) * k;
    if (k < 1) requestAnimationFrame(step);
    else if (done) done();
  };
  requestAnimationFrame(step);
}

export function playSong(src) {
  if (!src) return;
  const a = el();
  if (state.src !== src) {
    a.src = src;
    state.src = src;
  }
  fadeId++; // cancel any fade-out still running
  a.volume = 0;
  a.play().then(() => fade(a, 0.45, 900)).catch(() => { /* blocked or missing file: stay quiet */ });
  emit();
}

export function stopSong() {
  if (!audio || audio.paused) return;
  fade(audio, 0, 500, () => audio.pause());
}

export function usePlayer() {
  const [s, setS] = useState(state);
  useEffect(() => {
    subs.add(setS);
    return () => subs.delete(setS);
  }, []);
  return s;
}
