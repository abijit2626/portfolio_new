import { useEffect, useState } from "react";
import { prefix } from "./site.js";

// One shared audio player for the whole site, so the opening laptop screen and the turntable
// control the same song. Songs live in app/public/videos/ (audio-only .mp4) and are set per album in content.js.
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
    audio.addEventListener("error", () => {
      // forget the source so the next tap loads the file fresh instead of replaying a dead element
      console.warn("audio error", audio.error && audio.error.code, audio.currentSrc);
      state.playing = false;
      state.src = null;
      emit();
    });
  }
  return audio;
}

const VOLUME = 0.45;

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
    a.src = prefix() + src;
    state.src = src;
  }
  fadeId++; // cancel any fade-out still running
  // start at the real volume: a song that begins at volume 0 and ramps up with a timer can stay
  // silent on phones (Android Chrome), so only the fade-out is kept
  a.volume = VOLUME;
  const p = a.play();
  if (p) p.catch((e) => {
    console.warn("play blocked", e && e.name);
    // a failed load leaves the element stuck: reload it and try once more from the same tap
    if (e && e.name !== "NotAllowedError" && e.name !== "AbortError") { a.load(); a.play().catch(() => {}); }
  });
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
