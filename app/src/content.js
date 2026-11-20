// ─────────────────────────────────────────────────────────────
//  Everything you write on the site lives in this one file.
//  Edit text here; you shouldn't need to touch the components.
//  Photos: put compressed .webp/.jpg files in app/public/images/
//  and reference them as "images/your-photo.webp".
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: ["abijit", "arun"],
  hello: "hi, i'm",
  intro:
    "engineering student in palakkad. i break things (safely) for defensive security and ctfs, play guitar, dig for vinyl, and build small things that feel alive.",
  scribble: "this is my scrapbook of six months of making →",
  badge: "maker fellow · ulp '26 · ", // the spinning stamp by dewy's photo. keep it short (~25 characters)
  github: "https://github.com/abijit2626",
};

export const loves = [
  { icon: "px-turntable.svg", title: "vinyl", note: "crate digging, always" },
  { icon: "px-guitar.svg", title: "guitar", note: "30 mins a day, minimum" },
  { icon: "px-cat-black.svg", title: "cats", note: "all of them. every one." },
  { icon: "px-headphones.svg", title: "frank ocean", note: "on repeat, forever" },
  { icon: "px-laptop.svg", title: "ctfs", note: "blue team at heart" },
];

// The opening screen: visitors pick one of these and the whole site takes on its mood.
// `id` must stay "orange", "blonde" or "endless" (those names are wired to the themes in rich.css).
export const albums = [
  // color / label = how its record looks on the turntable
  // song = the track that plays when it's picked. Put the file in app/public/audio/ and set e.g.
  //   song: { file: "audio/nikes.mp3", title: "nikes" }
  // (leave it as null and the record just spins silently)
  { id: "orange", title: "channel orange", artist: "frank ocean", vibe: "sunrise · warm · golden", color: "#f08a3c", label: "#fbe3c4", song: { file: "audio/forrest-gump.mp3", title: "forrest gump" } },
  { id: "blonde", title: "blonde", artist: "frank ocean", vibe: "spring · flowers · pink + white sky", color: "#f4a3be", label: "#ffffff", song: { file: "audio/pink-white.mp3", title: "pink + white" } },
  { id: "endless", title: "endless", artist: "frank ocean", vibe: "night · moon · windy · dreamy", color: "#2a2456", label: "#b39cff", song: { file: "audio/rushes.mp3", title: "rushes" } },
];

// status: "now" | "done" | "soon"
export const months = [
  {
    n: 1,
    name: "november",
    year: 2026,
    status: "now",
    teaser: "dewy, in progress!",
    focus:
      "designing and starting to build dewy, a small desk robot with a screen face, moods and a voice.",
    worked: [
      ["concept", "i planned the personality first and picked parts after. dewy should feel alive: moods that shift with attention, reacting when shaken or picked up, and waking up when you say its name."],
      ["picking parts", "an esp32-s3 (16 MB flash, 8 MB psram) for the memory that audio and animations need, a 3.2\" ili9341 touch display, an mpu6050 motion sensor, an inmp441 mic with a max98357a amp, and a 3 W speaker. two 18650 cells in a usb-c shield mean no cable."],
      ["face design", "big two-tone eyes with dark pupils, tilted slightly outward, plus a small mouth. a random eye palette on every wake-up, and sometimes it turns into a cat with slit pupils until it sleeps."],
      ["case", "ordered an early prototype case, a white box with a thick black visor, to test fit before choosing the final colour."],
      ["voice plan", "microwakeword for \"hey dewy\", trained on synthetic voices on my own gpu. speech from cloudflare's aura \"luna\" voice, sped up ~1.15×. answers from the claude api (haiku), through a small cloudflare backend."],
      ["build", "parts arrive on 20 november. next: wiring, first display tests and the face animation."], // TODO: update after first power-on
    ],
    experiments: [
      "wake word engines: compared microwakeword and edge impulse on cost, training effort and how well each runs on the esp32-s3.",
      "voices: \"stella\" didn't fit the face; \"luna\" sped up did.",
      "coming next: eye animation frame rate, and shake / pick-up thresholds on the mpu6050.",
    ],
    photos: [
      // { src: "images/m1-parts.webp", caption: "all the parts, day one" },
    ],
    learned: [
      "designing the behaviour before the hardware made picking parts easy. every part has a reason to be there.",
      "audio plus animation needs real memory, which is why psram mattered.",
      "ordering a prototype case early is cheap insurance against fit problems.",
      // TODO: add one honest thing that went wrong this month
    ],
    projects: ["dewy"],
    next: [
      "get the face, moods and motion reactions working on real hardware.",
      "train and test the \"hey dewy\" wake word.",
      "design the custom pcb so the final build has no loose wires.",
    ],
  },
  { n: 2, name: "december", year: 2026, status: "soon", teaser: "soon…" },
  { n: 3, name: "january", year: 2027, status: "soon", teaser: "soon…" },
  { n: 4, name: "february", year: 2027, status: "soon", teaser: "soon…" },
  { n: 5, name: "march", year: 2027, status: "soon", teaser: "soon…" },
  { n: 6, name: "april", year: 2027, status: "soon", teaser: "soon…" },
];

export const projects = {
  dewy: {
    name: "dewy",
    tagline: "a little desk robot with an animated face, moods, a wake word and a voice.",
    short: "it gets dizzy if you shake it. it sometimes turns into a cat.",
    tags: ["esp32-s3", "display", "mic", "speaker", "claude api"],
    month: 1,
    repo: "https://github.com/abijit2626/desk-buddy",
    why:
      "i wanted a first fellowship project that covers everything i want to learn (displays, sensors, audio, wireless, voice ai, and eventually a custom pcb) and that's fun to have on a desk. a robot with a personality ticks every box.",
    features: [
      ["animated face", "moods change depending on how much attention it gets."],
      ["motion", "shake it and it gets dizzy; pick it up and it looks surprised."],
      ["random looks", "a new eye palette every wake-up, and a chance of cat mode."],
      ["\"hey dewy\"", "wakes up, looks at you, listens."],
      ["voice assistant", "time, day, notes, news, random questions."],
      ["phone app", "alarms, reminders and notes from your phone."],
    ],
    hardware: [
      ["esp32-s3 n16r8", "wi-fi, two cores, 8 MB psram for audio buffers and animation frames"],
      ["3.2\" ili9341 touch display", "the face. big enough for expressive eyes."],
      ["gy-87 (mpu6050)", "detects shakes, pick-ups and tilts"],
      ["inmp441 i²s mic", "wake word and voice input"],
      ["max98357a amp + 3 W speaker", "dewy's voice"],
      ["2× 18650 + usb-c shield", "no cable, charges over usb-c"],
    ],
    how: [
      "the esp32-s3 runs the face animation and reads the motion sensor all the time.",
      "a tiny on-device model (microwakeword) listens for \"hey dewy\".",
      "after the wake word, audio goes to a small cloudflare backend: speech → text → claude (haiku) → text → speech (aura \"luna\").",
      "the phone app talks to the same backend for alarms, reminders and notes.",
    ],
    log: [
      ["early nov", "concept, feature list, face design, parts chosen and ordered."],
      ["mid nov", "prototype case ordered. wake word engine and voice chosen."],
      ["20 nov", "parts arrive."], // TODO: what happened on first power-on?
    ],
    failed: [
      "the first voice i tried (\"stella\") didn't match the face. switched to \"luna\" and pitched it up.",
    ],
    next: [
      "wire everything and get the face animating smoothly.",
      "tune shake and pick-up detection.",
      "train and test the wake word.",
      "design a custom pcb so the final version has no loose wires.",
      "decide the final case colour.",
    ],
  },
};

// Things the terminal on the home page knows about. Type `help` there.
export const terminal = {
  user: "abijit@jcet",
  whoami: "maker · ctf player · defender",
  now: "building dewy, practising chords",
  flag: "flag{m4d3_sl0wly_w1th_l0v3}",
};
