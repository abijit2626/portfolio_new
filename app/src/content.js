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
  // song = the track that plays when it's picked. The fellowship publisher only copies the
  // guide's media types, so songs are audio-only .mp4 files in app/public/videos/, e.g.
  //   song: { file: "videos/nikes.mp4", title: "nikes" }
  // (make one with: ffmpeg -i song.mp3 -vn -c:a aac -b:a 128k -movflags +faststart song.mp4)
  // (leave it as null and the record just spins silently)
  { id: "orange", title: "channel orange", artist: "frank ocean", vibe: "sunrise · warm · golden", color: "#f08a3c", label: "#fbe3c4", song: { file: "videos/forrest-gump.mp4", title: "forrest gump" } },
  { id: "blonde", title: "blonde", artist: "frank ocean", vibe: "spring · flowers · pink + white sky", color: "#f4a3be", label: "#ffffff", song: { file: "videos/pink-white.mp4", title: "pink + white" } },
  { id: "endless", title: "endless", artist: "frank ocean", vibe: "night · moon · windy · dreamy", color: "#2a2456", label: "#b39cff", song: { file: "videos/wither.mp4", title: "wither" } },
];

// status: "now" | "done" | "soon"
export const months = [
  {
    n: 1,
    name: "november",
    year: 2026,
    status: "now",
    teaser: "dewy wakes up!",
    focus:
      "designing and building dewy, a desk buddy with an animated face that reacts to touch and motion, wakes up to \"hey dewy\" and answers out loud. prototype due 30 november.",
    worked: [
      ["the idea", "after winning tinkerhub's useless projects hackathon i joined the fellowship. for the first term: a desk buddy that wakes up to its name, carries notes, runs on batteries and works with an iphone. big pink two-tone eyes, dark pupils, a small mouth, and a box with a black visor."],
      ["10 nov · firmware + cloud", "wrote the face engine from scratch and a cloudflare worker for pairing (a code on the screen), settings, notes, timers and firmware updates. built the voice chat on workers ai too: speech → text → a chat model with tools → speech."],
      ["10–11 nov · \"hey dewy\"", "trained the wake word with microwakeword on my own rtx 4060. round 1 (synthetic voices only) caught 1 of 10 real recordings. round 2, with real recordings added, caught 10 of 10."],
      ["11 nov · voice + a bug hunt", "got the whole voice loop running on a pc first, then on the esp32 in three stages: mic check, push-to-talk, then the on-device wake word. a code review found 18 bugs; i fixed most and added pc tests for them."],
      ["12 nov · bond levels + alarms", "stranger → friend → close friend → best friend → soulmate. dewy celebrates each level, misses you after a day alone and fades slowly. alarms beep louder and louder until you say (or tap) snooze or stop."],
      ["13–14 nov · making the face fast", "the first frame took 141.6 ms (7 fps). i switched the screen to 8-bit parallel, drew the frame in strips sent by dma, and optimised round after round: solid runs, integer colour blending, edge maths only near outlines. 141.6 → 57 → ~23 ms."],
      ["16 nov · the main board", "the screen stayed dark: a mode pin was on 5 v instead of gnd, and the board's 5vin pin needs two tiny pads soldered before usb powers it. after that: ~20 ms a frame, and shake, tilt, face-down and pick-up all working."],
      ["16 nov · carrier pcb", "designed a 2-layer board that sits behind the screen so nothing hangs on loose wires. placed it with a script, routed it with a small maze router i wrote, and checked all 43 connections against the firmware's pin list."],
      ["17 nov · online + open source", "registering failed with \"ssl - memory allocation failed\": only 62 kb of internal ram was left. halving the screen strips freed 30 kb. dewy is online now (syncing, showing the weather), and the repo is public."],
      ["19 nov · measuring for real", "the screen board is 91 × 64 mm, not the 9 × 5.5 cm the shop says. i re-routed the pcb to match a photo of the board's back and moved two standoff holes off the sd slot and a resistor. 0 unconnected pads, 43/43 pins."],
      ["19 nov · pcb ordered", "5 boards, 99.7 × 66 mm, 2 layers, black with white text, every board electrically tested. lead time is 15–20 business days, so they arrive around mid-december."],
      ["20 nov · dewy hears me", "the mic, amp and speaker arrived. \"hey dewy\" woke it 5 out of 5 times on the first real-mic test. first real answer: \"what's the time?\" → \"it's 8:15 pm\"."],
      ["21 nov · making the voice feel right", "\"hey dewy\" while asleep now just wakes dewy up (surprised eyes, then happy). \"what's the time?\" skips the ai and goes straight to the clock: a few seconds instead of 12–15."],
      ["21–22 nov · the mystery freezes", "every 30–60 s the wake word went deaf for ~2.6 s. the cause was freertos priority inheritance: my https lock let the network task borrow the wi-fi driver's priority for the whole handshake. a plain semaphore, keep-alive connections and a \"face first\" schedule fixed it: no freezes, steady 40 fps."],
    ],
    experiments: [
      "wake word engines: compared microwakeword and edge impulse on cost, training effort and how well each runs on the esp32-s3.",
      "voices: \"stella\" didn't fit the face; aura \"luna\" at 1.15× did.",
      "mic level: the inmp441 was ~10× louder than the datasheet suggested. turning it down 4× fixed recordings but made \"hey dewy\" need shouting, so the wake word now gets its own 4× louder copy.",
      "wake word distance: printed live scores every second. normal-distance tries scored 0.71–0.97 against a cutoff of 0.98, near misses rather than failures. at 0.90 it woke every time.",
      "pick-up detection: needs 7° of tilt for 0.15 s from rest, and ignores taps, being put down, and dewy's own speaker while it answers.",
    ],
    // photos go in app/public/images/, videos (.mp4) in app/public/videos/
    // a video entry uses `video:` instead of `src:`. `alt` describes a photo for screen readers.
    photos: [
      { src: "images/dewy-photo.webp", caption: "dewy, in person", alt: "dewy on my desk" },
      { video: "videos/dewy-1.mp4", caption: "dewy in action" },
      { video: "videos/dewy-2.mp4", caption: "dewy in action, part 2" },
    ],
    learned: [
      "designing the behaviour before the hardware made picking parts easy. every part has a reason to be there.",
      "measure it myself. the shop listing for the screen was wrong, and a ruler saved the pcb.",
      "the esp32-s3 has no hardware float division or square root, so every one avoided per pixel counts.",
      "\"it's slow\" and \"it freezes\" can come from scheduling, not slow code. measuring which task ran on which core at which priority found it in one log, after hours of guessing.",
    ],
    projects: ["dewy"],
    next: [
      "confirm the \"face first\" build on the board: smooth animation, and syncs succeed.",
      "watch for false wake-ups over a full day at cutoff 0.90.",
      "test alarms with sound, and pairing with the phone app.",
      "full-day test, then the prototype demo on 30 november.",
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
    tagline: "a small desk buddy with an animated face that reacts when you touch it, tilt it, shake it or pick it up.",
    short: "it gets dizzy if you shake it. say \"hey dewy\" and it answers out loud.",
    tags: ["esp32-s3", "c++", "cloudflare workers", "wake word", "custom pcb"],
    month: 1,
    repo: "https://github.com/abijit2626/desk-buddy",
    why:
      "i wanted a first fellowship project that covers everything i want to learn (displays, sensors, audio, wireless, voice ai and a custom pcb) and that's fun to have on a desk. the prototype is due 30 november, and in december it becomes a finished gift for someone far away.",
    features: [
      ["animated face", "a face engine written from scratch: 12 moods, blinking, glancing, breathing and 46 eye-colour sets."],
      ["touch + motion", "shake it and it gets dizzy; tilt it, flip it face-down or pick it up and it reacts."],
      ["\"hey dewy\"", "an on-device wake word. asleep, it just wakes up; awake, it listens and answers out loud."],
      ["notes, weather, time", "shows reminders, notes, the weather and the clock. \"what's the time?\" goes straight to the clock."],
      ["bond levels", "stranger → friend → close friend → best friend → soulmate. it misses you after a day alone."],
      ["phone app", "a home-screen web app for iphone to send notes, set alarms and change settings."],
    ],
    hardware: [
      ["esp32-s3 n16r8", "wi-fi, two cores, 16 MB flash and 8 MB psram for audio buffers and animation frames"],
      ["3.2\" ili9341 touch screen", "the face. 240×320, driven in 8-bit parallel for speed"],
      ["gy-87 (mpu6050)", "detects shakes, tilts, face-down and pick-ups"],
      ["inmp441 i²s mic", "\"hey dewy\" and spoken questions"],
      ["max98357a amp + 3 W speaker", "dewy's voice"],
      ["2× 18650 + usb-c shield", "no cable, charges over usb-c"],
      ["3d-printed case", "a box with a black visor"],
      ["custom carrier pcb", "every module soldered on, so nothing hangs on loose jumper wires. ordered, arriving mid-december"],
    ],
    how: [
      "the esp32-s3 draws the face in strips in fast internal ram and sends each strip to the screen by dma while drawing the next.",
      "it reads touch and the motion sensor all the time, and a tiny on-device model (microwakeword, tensorflow lite micro) listens for \"hey dewy\".",
      "after the wake word, the question goes to a cloudflare worker: speech → text → a chat model with tools → speech, all on workers ai, in aura \"luna\" at 1.15×.",
      "the same worker (with a d1 database) handles pairing, settings, notes, timers and firmware updates. the phone app talks to it too.",
      "a pc test suite runs ~200 firmware checks and 100+ cloud checks, and renders every face on the pc without hardware.",
    ],
    numbers: [
      ["face frame time", "141.6 ms (7 fps)", "~19 ms to draw, steady 40 fps"],
      ["sunny face", "35.9 ms", "20.4 ms"],
      ["8-ball answer screen", "slow", "6.5 ms"],
      ["wake word, real voices", "1/10 (round 1)", "10/10 (round 2); 5/5 on the real mic"],
      ["mic background noise", "1,200–3,000", "~500"],
      ["recording after a question", "always 10 s", "stops ~1 s after you finish"],
      ["\"what's the time?\"", "12–15 s, spoken", "a few seconds, straight to the clock"],
      ["wake word freezes", "2.6 s at every check-in", "none"],
      ["internal ram for https", "62 KB (failed)", "+30 KB (works)"],
      ["pcb connection check", "—", "43/43 correct, 0 unconnected pads"],
    ],
    log: [
      ["early nov", "idea, parts and the look: pink two-tone eyes and a box with a black visor."],
      ["10 nov", "face engine, cloud server, voice chat. wake word round 1: 1/10."],
      ["11 nov", "wake word round 2: 10/10. voice loop on the esp32. 18 bugs found, most fixed."],
      ["12 nov", "bond levels, an on/off switch in the app, alarms."],
      ["13–14 nov", "first screen tests. frame time 141.6 → ~23 ms."],
      ["16 nov", "main board lit up (two hidden power/mode problems). motion gestures. carrier pcb v0.1."],
      ["17 nov", "dewy is online. repo made public."],
      ["19 nov", "measured the screen properly, re-routed and checked the pcb, then ordered 5 boards."],
      ["20 nov", "mic, amp and speaker in. \"hey dewy\" 5/5. first real spoken answer."],
      ["21 nov", "wake-from-sleep, the time shortcut, live wake word tuning."],
      ["21–22 nov", "tracked the 2.6 s freezes to freertos priority inheritance and fixed them."],
    ],
    failed: [
      "the first voice i tried (\"stella\") didn't match the face. switched to \"luna\" and sped it up.",
      "wake word round 1 used only synthetic voices and caught 1 of 10 real recordings.",
      "the face crashed straight away: it needed far more than the default 8 KB stack (now 32 KB).",
      "frames in psram showed stripes on the eyes, so i moved drawing to internal ram in strips.",
      "the printed case's screen pocket is 62 mm and the screen is 64 mm. it needs 2 mm sanded off.",
      "fixing the freezes first broke every sync: the handshake dragged on for ~20 s and the server hung up.",
    ],
    next: [
      "confirm smooth animation and working syncs on the board, then the 30 nov prototype demo.",
      "test alarms with sound, and pairing with the phone app.",
      "pcb arrives around mid-december: solder everything, sand the case pocket by 2 mm, assemble with standoffs.",
      "wake word round 3, recorded through dewy's own mic.",
      "final calibration, and the gift.",
    ],
    licence: "open source: code under polyform noncommercial 1.0.0; case, pcb and docs under cc by-nc 4.0. anyone can build one, nobody can sell it.",
  },
};

// Things the terminal on the home page knows about. Type `help` there.
export const terminal = {
  user: "abijit@jcet",
  whoami: "maker · ctf player · defender",
  now: "building dewy, practising chords",
  flag: "flag{m4d3_sl0wly_w1th_l0v3}",
};
