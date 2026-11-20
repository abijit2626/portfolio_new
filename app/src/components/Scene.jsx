import { useEffect, useRef } from "react";

// The cliffside, in pixel art: me on the right, sitting at the edge with my laptop, petting my
// cat, looking left over the ocean. Drawn on a tiny 480×180 canvas and scaled up with crisp
// pixels. A "camera" picks which part of that canvas fills the screen, so zooming into the
// laptop makes the pixels chunkier, like a real pixel-art game.
//
// moods: "dawn" (before a record is picked), "orange", "blonde", "endless"
// views: "wide" (whole scene), "laptop" (zoomed right in), "bg" (behind the homepage, me on the right)

const W = 480;
const H = 180;
const HORIZON = 118;
const EDGE = 246; // where the cliff drops away

// ---------- palettes, blended smoothly when the mood changes ----------
const PAL = {
  dawn: {
    sky: [[79, 93, 128], [154, 166, 189], [230, 214, 198]], sea: [[128, 148, 174], [58, 77, 107]],
    land: [107, 94, 85], rock: [84, 72, 66], grass: [109, 143, 90], grassHi: [146, 176, 112], grassDark: [80, 110, 70],
    far: [111, 124, 150], cloud: [232, 234, 242], cloudShade: [190, 196, 214], shimmer: [222, 230, 242], sail: [235, 236, 240],
    cup: [240, 138, 60], windCol: [255, 255, 255],
    stars: 0.25, moon: 0, sunY: 127, sunGlow: 0.35, flowers: 0, ivy: 0, petals: 0, wind: 0, flies: 0, birds: 1,
    rays: 0, tree: 0, bfly: 0, shoot: 0, beam: 0, birdCol: [58, 42, 42], glide: 0,
    sunPath: 0, moonPath: 0, faceGlow: 0.7, sway: 0.7,
  },
  orange: {
    sky: [[196, 74, 42], [239, 124, 58], [255, 214, 150]], sea: [[246, 176, 106], [74, 35, 41]],
    land: [138, 90, 60], rock: [105, 66, 46], grass: [143, 156, 60], grassHi: [196, 196, 92], grassDark: [100, 110, 45],
    far: [168, 88, 63], cloud: [255, 214, 168], cloudShade: [240, 160, 110], shimmer: [255, 226, 166], sail: [255, 238, 214],
    cup: [240, 138, 60], windCol: [255, 255, 255],
    stars: 0, moon: 0, sunY: 88, sunGlow: 1, flowers: 0.3, ivy: 0, petals: 0, wind: 0, flies: 0, birds: 1,
    rays: 1, tree: 0, bfly: 0, shoot: 0, beam: 0, birdCol: [252, 244, 232], glide: 1,
    sunPath: 1, moonPath: 0, faceGlow: 0.15, sway: 0.6,
  },
  blonde: {
    sky: [[240, 178, 198], [252, 221, 231], [255, 255, 255]], sea: [[207, 233, 239], [116, 175, 194]],
    land: [168, 150, 138], rock: [140, 122, 112], grass: [151, 211, 107], grassHi: [196, 238, 146], grassDark: [111, 174, 82],
    far: [159, 182, 201], cloud: [255, 255, 255], cloudShade: [246, 218, 228], shimmer: [255, 255, 255], sail: [255, 255, 255],
    cup: [244, 163, 190], windCol: [205, 120, 152],
    stars: 0, moon: 0, sunY: 136, sunGlow: 0, flowers: 1, ivy: 1, petals: 1, wind: 1, flies: 0, birds: 1,
    rays: 0, tree: 1, bfly: 1, shoot: 0, beam: 0, birdCol: [120, 86, 100], glide: 0,
    sunPath: 0, moonPath: 0, faceGlow: 0.1, sway: 1.7,
  },
  endless: {
    sky: [[5, 7, 29], [20, 26, 69], [40, 51, 104]], sea: [[28, 37, 84], [5, 7, 26]],
    land: [36, 32, 52], rock: [24, 22, 38], grass: [31, 64, 56], grassHi: [48, 96, 80], grassDark: [20, 42, 37],
    far: [18, 23, 51], cloud: [72, 78, 124], cloudShade: [52, 57, 98], shimmer: [140, 150, 210], sail: [150, 156, 196],
    cup: [169, 139, 255], windCol: [210, 215, 255],
    stars: 1, moon: 1, sunY: 140, sunGlow: 0, flowers: 0, ivy: 0, petals: 0, wind: 1, flies: 1, birds: 0,
    rays: 0, tree: 0, bfly: 0, shoot: 1, beam: 1, birdCol: [58, 42, 42], glide: 0,
    sunPath: 0, moonPath: 1, faceGlow: 1, sway: 1.7,
  },
};

// camera targets: centre (x, y) on the 480×180 canvas, and zoom
const CAMS = {
  // nx / nz: where to look on tall, narrow screens (phones), so me and the cat stay in frame
  wide: { x: 226, y: 98, z: 1.35, nx: 238, nz: 1 },
  laptop: { x: 244, y: 119, z: 10, nx: 244, nz: 10 },
  bg: { x: 194, y: 96, z: 1.2, nx: 240, nz: 1 },
};

// ---------- sprites ----------
const COLORS = {
  k: "#1a1410", h: "#3d2a1e", s: "#8d5a3b", S: "#6e4329", m: "#1a1410", p: "#111111",
  t: "#f4f2ec", T: "#cfc9bd", v: "#1b1b1b",
  j: "#34466a", J: "#26344f", e: "#f2efe8", E: "#9a948a",
  l: "#c9ced6", L: "#8a919c",
  // calico cat: white, black, grey
  w: "#f4f2ee", b: "#211d21", g: "#8a8790", G: "#5c5964", n: "#f7a8c4",
};
// me, sitting at the edge facing left: messy wavy hair, oversized white tee with a tiny vinyl
// on the chest, laptop on my lap, legs over the side. (c = headphone cup, r = vinyl label,
// both take the mood's colour)
const BODY = [
  "...k.kk.k.....",
  "..kkkkkkkkk...",
  ".khkkkhkkkk...",
  ".kkkkkkkpkkk..",
  "kkkskkkkpkkk..",
  ".ksskkkcckkk..",
  ".smsskkcckk...",
  "sssssskcck....",
  ".sssssskk.....",
  "..ssSssk......",
  "....sS........",
  "...kttttk.....",
  "..kvvvttk.....",
  "..kvrvtTk.....",
  "L.kvvvtTk.....",
  "L.kttsstk.....",
  "L.ssstttk.....",
  "Llllltttk.....",
  "jjjjjjjjjk....",
  "jJJjjjjjJ.....",
  "jj............",
  "jj............",
  "jj............",
  "Jj............",
  "jj............",
  "ee............",
  "eeE...........",
];
const HEAD_ROWS = 11; // rows that bob along to the music
// my other arm, reaching over to the cat (two frames: on its head, then a stroke down its back)
const PET = [
  [[9, 12, "t"], [10, 12, "t"], [11, 12, "s"], [12, 12, "s"], [13, 11, "s"], [14, 11, "s"], [15, 11, "s"]],
  [[9, 12, "t"], [10, 13, "t"], [11, 13, "s"], [12, 13, "s"], [13, 13, "s"], [14, 13, "s"], [15, 13, "s"], [16, 13, "s"]],
];
const ARM_REST = [[9, 12, "t"], [9, 13, "t"], [9, 14, "s"], [9, 15, "s"], [9, 16, "s"]];
// the cat, sitting facing me
const CAT = [
  "b..g.......",
  "bwgg.......",
  "wkwkg......",
  "wwnww......",
  "wwww.gggb..",
  "wwwwwggbbb.",
  "wwwgwbbbgg.",
  "wwwwwwbbggg",
  "ww.ww...gg.",
];
const CAT_HAPPY = "wGwGg......";
const CAT_YAWN_FACE = ["wGwGg......", "wnnnw......"];
// stretching: front paws out, back end up
const CAT_STRETCH = [
  "........gg...",
  ".......gbbg..",
  "b..g..wbbbgg.",
  "bwgg.wwwbbgg.",
  "wGwGwwwwwbg..",
  "wnnwwwwwww...",
  "wwww.....ww..",
  "ww..ww...ww..",
];
// curled up asleep (night)
const CAT_SLEEP = [
  "...gggb....",
  "..gwwwbbg..",
  ".wwwwwwbbg.",
  "wGwwwwwwbg.",
  "wwnwwwwwwgg",
  ".wwwwwwwwg.",
];
const TAILS = [
  [[10, 6, "g"], [11, 5, "g"], [11, 4, "b"], [11, 3, "b"]],
  [[10, 6, "g"], [11, 5, "g"], [12, 4, "b"], [12, 3, "b"]],
  [[10, 6, "g"], [10, 5, "g"], [11, 4, "b"], [11, 3, "b"]],
];
const HEART = [".p.p.", "ppppp", ".ppp.", "..p.."];
const NOTE = ["..pp", "..p.", "..p.", "ppp.", "pp.."];
const ZED = ["ppp", "..p", ".p.", "ppp"];
const BUTTERFLY = [["p.p", ".k.", "p.p"], [".p.", "pkp", ".p."]];
// a little lighthouse on the far island
const LIGHTHOUSE = [".l.", "lll", "www", "rrr", "www", "rrr", "www", "www"];
const BOAT = [
  "....w....",
  "....ww...",
  "....www..",
  "....wwww.",
  "....wwwww",
  "....b....",
  "bbbbbbbbb",
  ".BBBBBBB.",
];
const CLOUD_SHAPES = [
  [[6, 0, 10, 2], [2, 2, 20, 2], [0, 4, 26, 2]],
  [[4, 0, 8, 2], [1, 2, 16, 2], [0, 4, 20, 2]],
  [[8, 0, 12, 2], [3, 2, 24, 2], [0, 4, 32, 3]],
];

// ---------- the land ----------
const groundY = (x) => Math.round(123.6 - (x - EDGE) * 0.045 + Math.sin(x * 0.07) * 0.8);
const faceX = (y) => Math.round(EDGE - (y - 124) * 0.12 + Math.sin(y * 0.35) * 1.5 + Math.sin(y * 0.11) * 2);

function rng(seed) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}
const R = rng(5);
const STARS = Array.from({ length: 80 }, () => ({ x: Math.floor(R() * W), y: Math.floor(R() * (HORIZON - 12)), big: R() < 0.14, ph: R() }));
const SHIM = Array.from({ length: 44 }, () => ({ x: Math.floor(R() * (EDGE - 10)), y: HORIZON + 3 + Math.floor(R() * 58), w: 2 + Math.floor(R() * 6), ph: R() }));
const FLOWERS = Array.from({ length: 50 }, () => ({ x: EDGE + 2 + Math.floor(R() * (W - EDGE - 4)), c: R() < 0.55 ? [247, 168, 196] : [255, 255, 255], tall: R() < 0.4 }));
const PETALS = Array.from({ length: 24 }, () => ({ y: R() * H, sp: 0.025 + R() * 0.03, ph: R() * W, pink: R() < 0.65 }));
const WIND = Array.from({ length: 10 }, () => ({ y: Math.floor(8 + R() * 160), w: 8 + Math.floor(R() * 18), sp: 0.09 + R() * 0.07, ph: R() * W }));
const FLIES = Array.from({ length: 14 }, () => ({ x: EDGE + 6 + Math.floor(R() * (W - EDGE - 12)), y: 98 + Math.floor(R() * 18), ph: R() }));
const CLOUDS = [{ y: 16, sp: 0.004, ph: 30, s: 0 }, { y: 34, sp: 0.006, ph: 210, s: 1 }, { y: 10, sp: 0.003, ph: 390, s: 2 }, { y: 50, sp: 0.005, ph: 120, s: 1 }];

// ---------- helpers ----------
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const mix = (A, B, t) => A.map((v, i) => lerp(v, B[i], t));
function mixPal(A, B, t) {
  const o = {};
  for (const k in A) {
    const a = A[k];
    const b = B[k];
    if (Array.isArray(a)) o[k] = Array.isArray(a[0]) ? a.map((s, i) => mix(s, b[i], t)) : mix(a, b, t);
    else o[k] = lerp(a, b, t);
  }
  return o;
}
const rgb = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
const grad3 = (s, t) => (t < 0.5 ? mix(s[0], s[1], t * 2) : mix(s[1], s[2], (t - 0.5) * 2));
function sprite(g, rows, x, y, colors) {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r];
    for (let c = 0; c < row.length; c++) {
      const ch = row[c];
      if (ch === ".") continue;
      g.fillStyle = colors[ch];
      g.fillRect(x + c, y + r, 1, 1);
    }
  }
}
function disc(g, cx, cy, r) {
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(r * r - dy * dy) + 0.5);
    g.fillRect(cx - w, cy + dy, w * 2 + 1, 1);
  }
}

// sky and sea are banded with a dithered seam, the classic pixel-art gradient
function drawSky(g, P) {
  g.clearRect(0, 0, W, H);
  const N = 14;
  const bh = HORIZON / N;
  for (let i = 0; i < N; i++) {
    const y0 = Math.round(i * bh);
    g.fillStyle = rgb(grad3(P.sky, (i + 0.5) / N));
    g.fillRect(0, y0, W, Math.round((i + 1) * bh) - y0);
  }
  for (let i = 1; i < N; i++) {
    const y = Math.round(i * bh);
    g.fillStyle = rgb(grad3(P.sky, (i - 0.5) / N));
    for (let x = y % 2; x < W; x += 2) g.fillRect(x, y, 1, 1);
  }
}
function drawSea(g, P) {
  g.clearRect(0, 0, W, H);
  const M = 8;
  const sh = (H - HORIZON) / M;
  for (let i = 0; i < M; i++) {
    const y0 = HORIZON + Math.round(i * sh);
    g.fillStyle = rgb(mix(P.sea[0], P.sea[1], (i + 0.5) / M));
    g.fillRect(0, y0, W, HORIZON + Math.round((i + 1) * sh) - y0);
  }
  for (let i = 1; i < M; i++) {
    const y = HORIZON + Math.round(i * sh);
    g.fillStyle = rgb(mix(P.sea[0], P.sea[1], (i - 0.5) / M));
    for (let x = y % 2; x < W; x += 2) g.fillRect(x, y, 1, 1);
  }
}

function drawWorld(g, t, P, sky, sea, listening) {
  g.globalAlpha = 1;
  g.drawImage(sky, 0, 0);

  // stars
  if (P.stars > 0.01) {
    g.globalAlpha = P.stars;
    g.fillStyle = "#ffffff";
    for (const s of STARS) {
      if ((t * 0.0007 + s.ph) % 1 < 0.12) continue;
      g.fillRect(s.x, s.y, 1, 1);
      if (s.big && (t * 0.0011 + s.ph) % 1 > 0.5) { g.fillRect(s.x - 1, s.y, 3, 1); g.fillRect(s.x, s.y - 1, 1, 3); }
    }
  }

  // night: a shooting star every few seconds
  if (P.shoot > 0.01) {
    const k = Math.floor(t / 5200);
    const sp = (t % 5200) / 900;
    if (sp < 1) {
      const x0 = 60 + ((k * 97) % 300);
      const y0 = 8 + ((k * 31) % 40);
      g.fillStyle = "#ffffff";
      for (let i = 0; i < 12; i++) {
        const d = sp * 60 - i * 2;
        if (d < 0) continue;
        g.globalAlpha = P.shoot * (1 - i / 12) * (1 - sp * 0.6);
        g.fillRect(Math.round(x0 + d), Math.round(y0 + d * 0.45), 1, 1);
      }
    }
  }

  // moon
  if (P.moon > 0.01) {
    g.fillStyle = "rgb(235,232,255)";
    g.globalAlpha = P.moon * 0.1; disc(g, 196, 70, 17);
    g.globalAlpha = P.moon * 0.18; disc(g, 196, 70, 12);
    g.globalAlpha = P.moon; g.fillStyle = "#f4f1de"; disc(g, 196, 70, 8);
    g.fillStyle = "#e0dcc4"; g.fillRect(192, 67, 2, 2); g.fillRect(198, 72, 2, 1); g.fillRect(195, 74, 1, 1);
  }

  // sun, rising out of the sea (the sea is drawn over it)
  const sy = Math.round(P.sunY);
  g.fillStyle = "rgb(255,196,110)";
  g.globalAlpha = 0.12 * P.sunGlow; disc(g, 200, sy, 30);
  g.globalAlpha = 0.2 * P.sunGlow; disc(g, 200, sy, 20);
  g.globalAlpha = 0.35 * P.sunGlow; g.fillRect(0, HORIZON - 4, W, 4);
  g.globalAlpha = 1;
  g.fillStyle = "#ffd27a"; disc(g, 200, sy, 11);
  g.fillStyle = "#fff1c9"; disc(g, 200, sy, 9);
  // sunrise: slow-turning pixel rays
  if (P.rays > 0.01 && sy < HORIZON) {
    g.fillStyle = "#fff0c8";
    const rot = t * 0.00008;
    for (let k = 0; k < 12; k++) {
      const a = rot + (k / 12) * Math.PI * 2;
      for (let r = 15; r < 64; r += 2) {
        if ((r + k) % 4 === 0) continue;
        const y = Math.round(sy + Math.sin(a) * r);
        if (y >= HORIZON) continue;
        g.globalAlpha = P.rays * 0.35 * (1 - r / 64);
        g.fillRect(Math.round(200 + Math.cos(a) * r), y, 1, 1);
      }
    }
    g.globalAlpha = 1;
  }

  // clouds
  const windy = 1 + P.wind * 1.6;
  for (const c of CLOUDS) {
    const x = Math.round(((c.ph + t * c.sp * windy) % (W + 50)) - 40);
    for (const [dx, dy, w, h] of CLOUD_SHAPES[c.s]) {
      g.fillStyle = rgb(P.cloud); g.fillRect(x + dx, c.y + dy, w, h);
    }
    const last = CLOUD_SHAPES[c.s][CLOUD_SHAPES[c.s].length - 1];
    g.fillStyle = rgb(P.cloudShade); g.fillRect(x + last[0] + 2, c.y + last[1] + last[3] - 1, last[2] - 4, 1);
  }

  // birds flying left (big gliding gulls at sunrise)
  if (P.birds > 0.01) {
    g.globalAlpha = P.birds;
    g.fillStyle = rgb(P.birdCol);
    const gull = P.glide > 0.5;
    for (let i = 0; i < 3; i++) {
      const x = Math.round(W + 20 - ((t * (gull ? 0.012 : 0.018) + i * 13) % (W + 40)));
      const y = (gull ? 30 : 38) + i * 6 + Math.round(Math.sin(t * 0.0015 + i) * 2);
      const up = Math.floor(t / (gull ? 700 : 260) + i) % 2;
      if (gull) {
        if (up) { g.fillRect(x, y, 2, 1); g.fillRect(x + 2, y - 1, 2, 1); g.fillRect(x + 4, y, 1, 1); g.fillRect(x + 5, y - 1, 2, 1); g.fillRect(x + 7, y, 2, 1); }
        else { g.fillRect(x, y - 1, 1, 1); g.fillRect(x + 1, y, 7, 1); g.fillRect(x + 8, y - 1, 1, 1); }
      } else if (up) { g.fillRect(x, y, 1, 1); g.fillRect(x + 1, y - 1, 1, 1); g.fillRect(x + 2, y, 1, 1); g.fillRect(x + 3, y - 1, 1, 1); g.fillRect(x + 4, y, 1, 1); }
      else { g.fillRect(x, y - 1, 1, 1); g.fillRect(x + 1, y, 3, 1); g.fillRect(x + 4, y - 1, 1, 1); }
    }
    g.globalAlpha = 1;
  }

  // far island on the horizon
  g.globalAlpha = 1;
  g.fillStyle = rgb(P.far);
  for (let x = 96; x < 176; x++) {
    const h = Math.round(4 * Math.sin(((x - 96) / 80) * Math.PI) + Math.sin(x * 0.3) * 0.7);
    if (h > 0) g.fillRect(x, HORIZON - h, 1, h);
  }

  // a lighthouse on the island; its beam sweeps at night
  sprite(g, LIGHTHOUSE, 149, HORIZON - 11, { l: P.beam > 0.5 ? "#ffe27a" : "#c9c4b8", w: "#e9e6de", r: "#c2552b" });
  if (P.beam > 0.01) {
    const dir = Math.sin(t * 0.0011);
    const len = Math.round(Math.abs(dir) * 46);
    g.fillStyle = "#fff3b0";
    for (let i = 2; i < len; i++) {
      const spread = Math.floor(i / 8);
      for (let d = -spread; d <= spread; d++) {
        if ((i + d) % 2) continue;
        g.globalAlpha = P.beam * 0.35 * (1 - i / 50);
        g.fillRect(150 + Math.sign(dir) * i, HORIZON - 10 + d, 1, 1);
      }
    }
    g.globalAlpha = 1;
  }

  // the sea
  g.drawImage(sea, 0, 0);
  for (const s of SHIM) {
    if ((t * 0.0006 + s.ph) % 1 < 0.45) continue;
    g.fillStyle = rgb(P.shimmer, 0.55); g.fillRect(s.x, s.y, s.w, 1);
  }
  const path = (alpha, cx, col) => {
    if (alpha < 0.01) return;
    g.globalAlpha = alpha; g.fillStyle = col;
    for (let y = HORIZON + 2; y < H; y += 3) {
      if ((y + Math.floor(t / 200)) % 2) continue;
      const w = Math.round(4 + (y - HORIZON) * 0.32);
      g.fillRect(Math.round(cx - w / 2 + Math.sin(t * 0.002 + y) * 2), y, w, 1);
    }
    g.globalAlpha = 1;
  };
  path(P.sunPath, 200, "#ffe0a0");
  path(P.moonPath, 196, "#e8e6ff");

  // a little sailboat drifting
  const bx = Math.round(140 + Math.sin(t * 0.00012) * 34);
  const by = HORIZON + 6 + (Math.floor(t / 650) % 2);
  sprite(g, BOAT, bx, by, { w: rgb(P.sail), b: "#6e4430", B: "#4f3022" });
  if (P.flies > 0.01) { g.globalAlpha = P.flies; g.fillStyle = "#ffe27a"; g.fillRect(bx + 3, by + 5, 1, 1); g.globalAlpha = 1; }

  // the cliff
  g.fillStyle = rgb(P.land);
  for (let x = EDGE; x < W; x++) { const gy = groundY(x); g.fillRect(x, gy, 1, H - gy); }
  for (let y = 124; y < H; y++) { const fx = faceX(y); g.fillRect(fx, y, EDGE + 2 - fx, 1); }
  g.fillStyle = rgb(P.rock);
  for (let y = 124; y < H; y++) {
    const fx = faceX(y);
    g.fillRect(fx, y, 3, 1);
    if (y % 9 === 0) g.fillRect(fx + 3, y, 14 + (y % 5), 1);
    if (y % 13 === 4) g.fillRect(fx + 20, y, 10, 1);
  }
  // grass
  for (let x = EDGE - 1; x < W; x++) {
    const gy = groundY(x);
    g.fillStyle = rgb(P.grass); g.fillRect(x, gy, 1, 3);
    if (x % 2) { g.fillStyle = rgb(P.grassDark); g.fillRect(x, gy + 3, 1, 1); }
  }
  g.fillStyle = rgb(P.grass); g.fillRect(EDGE - 3, groundY(EDGE) + 1, 2, 2); g.fillRect(EDGE - 2, groundY(EDGE) + 3, 1, 2);
  for (let x = EDGE; x < W; x += 2) {
    const gy = groundY(x);
    const h = 1 + ((x * 7) % 3);
    const sway = -Math.round(Math.abs(Math.sin(t * 0.004 + x * 0.35)) * P.sway);
    for (let k = 1; k <= h; k++) {
      g.fillStyle = rgb(k === h ? P.grassHi : P.grass);
      g.fillRect(x + (k === h ? sway : 0), gy - k, 1, 1);
    }
  }
  // spring: flowers + ivy
  if (P.flowers > 0.01) {
    g.globalAlpha = P.flowers;
    for (const f of FLOWERS) {
      const gy = groundY(f.x);
      if (f.tall) { g.fillStyle = rgb(P.grassDark); g.fillRect(f.x, gy - 2, 1, 2); }
      g.fillStyle = rgb(f.c); g.fillRect(f.x, gy - (f.tall ? 3 : 1), 1, 1);
    }
    g.globalAlpha = 1;
  }
  if (P.ivy > 0.01) {
    g.globalAlpha = P.ivy;
    [[0, 28], [5, 18], [11, 34], [17, 14]].forEach(([off, len]) => {
      for (let y = 125; y < 125 + len; y++) {
        const x = faceX(y) + 1 + off + Math.round(Math.sin(y * 0.4 + off));
        g.fillStyle = "#3e6b3a"; g.fillRect(x, y, 1, 1);
        if (y % 3 === 0) { g.fillStyle = "#5f9a45"; g.fillRect(x - 1, y, 2, 1); }
      }
    });
    g.globalAlpha = 1;
  }
  // night: fireflies
  if (P.flies > 0.01) {
    g.globalAlpha = P.flies;
    for (const f of FLIES) {
      if ((t * 0.0009 + f.ph) % 1 < 0.45) continue;
      g.fillStyle = "#fff6b0";
      g.fillRect(f.x + Math.round(Math.sin(t * 0.001 + f.ph * 9) * 3), f.y + Math.round(Math.cos(t * 0.0013 + f.ph * 7) * 2), 1, 1);
    }
    g.globalAlpha = 1;
  }
  // foam where the sea hits the cliff
  g.fillStyle = "rgba(255,255,255,.8)";
  for (let i = 0; i < 6; i++) {
    const x = faceX(H - 4) - 3 - ((Math.floor(t / 220) + i * 3) % 16);
    g.fillRect(x, H - 3 - (i % 2), 2, 1);
  }

  // spring: a blossom tree on the cliff
  if (P.tree > 0.01) {
    g.globalAlpha = P.tree;
    const tx = 304;
    const ty = groundY(304);
    g.fillStyle = "#6e4a3a"; g.fillRect(tx, ty - 18, 2, 18); g.fillRect(tx - 3, ty - 12, 3, 1); g.fillRect(tx + 2, ty - 15, 4, 1);
    g.fillStyle = "#f4a3be";
    for (const [dx, dy, r] of [[0, -24, 9], [-8, -20, 6], [8, -21, 7], [-3, -30, 6], [5, -29, 5]]) disc(g, tx + dx, ty + dy, r);
    g.fillStyle = "#fbd6e2";
    for (let i = 0; i < 26; i++) { const a = i * 2.39; const r = 2 + ((i * 5) % 9); g.fillRect(Math.round(tx + Math.cos(a) * r), Math.round(ty - 25 + Math.sin(a) * r * 0.7), 1, 1); }
    g.fillStyle = "#e2789b";
    for (let i = 0; i < 18; i++) { const a = i * 1.7 + 1; const r = 3 + ((i * 7) % 8); g.fillRect(Math.round(tx + 1 + Math.cos(a) * r), Math.round(ty - 22 + Math.sin(a) * r * 0.6), 1, 1); }
    g.fillStyle = "#fbd6e2";
    for (let i = 0; i < 5; i++) { const p = (t * 0.00025 + i * 0.2) % 1; g.fillRect(Math.round(tx - 6 + i * 4 - p * 30 + Math.sin(t * 0.003 + i) * 2), Math.round(ty - 18 + p * 18), 1, 1); }
    g.globalAlpha = 1;
  }

  // me + the cat
  const bx0 = EDGE - 3;
  const by0 = 122 - 18;
  const bob = listening ? Math.floor(t / 550) % 2 : 0;
  // the laptop screen lights up my skin a little (strongest at dawn and at night)
  const lit = (hex, k) => { const n = parseInt(hex.slice(1), 16); return rgb(mix([n >> 16, (n >> 8) & 255, n & 255], [207, 230, 255], k)); };
  const glowK = P.faceGlow * 0.3;
  const colors = { ...COLORS, c: rgb(P.cup), r: rgb(P.cup), s: lit(COLORS.s, glowK), S: lit(COLORS.S, glowK) };
  const mode = P.flies > 0.5 ? "sleep" : P.bfly > 0.5 ? "chase" : "pet";
  sprite(g, BODY.slice(0, HEAD_ROWS), bx0, by0 + bob, colors);
  sprite(g, BODY.slice(HEAD_ROWS), bx0, by0 + HEAD_ROWS, colors);
  const petting = mode === "sleep" ? Math.floor(t / 1100) % 2 : Math.floor(t / 450) % 2;
  for (const [c, r, ch] of mode === "chase" ? ARM_REST : PET[petting]) { g.fillStyle = colors[ch]; g.fillRect(bx0 + c, by0 + r, 1, 1); }

  const catHome = bx0 + 14;
  if (mode === "sleep") {
    // night: curled up asleep next to me, breathing, little z's
    const cy = 122 - 5;
    sprite(g, CAT_SLEEP, catHome, cy, COLORS);
    if (Math.floor(t / 1200) % 2) { g.fillStyle = COLORS.g; g.fillRect(catHome + 4, cy - 1, 2, 1); }
    for (let i = 0; i < 2; i++) {
      const zp = ((t + i * 1300) % 2600) / 2600;
      g.globalAlpha = 1 - zp;
      sprite(g, ZED, catHome + 6 + Math.round(zp * 6), Math.round(cy - 5 - zp * 14), { p: "#d9d2ff" });
    }
    g.globalAlpha = 1;
  } else if (mode === "chase") {
    // spring: bounding along the grass after a butterfly
    const ph = t * 0.0006;
    const cx = Math.round(catHome + 4 + (Math.sin(ph) * 0.5 + 0.5) * 34);
    const right = Math.cos(ph) >= 0;
    const hop = Math.round(Math.abs(Math.sin(t * 0.009)) * 3);
    const cy = groundY(cx + 5) - 9 - hop;
    sprite(g, right ? CAT.map((row) => row.split("").reverse().join("")) : CAT, cx, cy, COLORS);
    for (let i = 0; i < 3; i++) {
      const lead = i === 0;
      const fx = lead ? cx + (right ? 15 : -5) + Math.round(Math.sin(t * 0.004) * 3) : 262 + i * 22 + Math.round(Math.sin(t * 0.0013 + i) * 12);
      const fy = lead ? cy - 6 + Math.round(Math.sin(t * 0.006) * 3) : 98 + Math.round(Math.cos(t * 0.0017 + i * 2) * 6);
      g.globalAlpha = P.bfly;
      sprite(g, BUTTERFLY[Math.floor(t / 160 + i) % 2], fx, fy, { p: i === 1 ? "#ffe27a" : "#f4a3be", k: "#4a3a3a" });
    }
    g.globalAlpha = 1;
  } else {
    // sitting by me being petted; every so often a big stretch, then a yawn
    const cyc = t % 9000;
    const stretch = cyc > 6000 && cyc < 7400;
    const yawn = cyc > 7400 && cyc < 8400;
    if (stretch) {
      sprite(g, CAT_STRETCH, catHome, 122 - 7, COLORS);
    } else {
      const rows = CAT.slice();
      if (yawn) { rows[2] = CAT_YAWN_FACE[0]; rows[3] = CAT_YAWN_FACE[1]; }
      else if (petting) rows[2] = CAT_HAPPY;
      const cy = 122 - 8;
      sprite(g, rows, catHome, cy, COLORS);
      for (const [c, r, ch] of TAILS[Math.floor(t / 380) % 3]) { g.fillStyle = COLORS[ch]; g.fillRect(catHome + c, cy + r, 1, 1); }
      const hp = (t % 2600) / 2600;
      if (t > 0 && hp < 0.6 && !yawn) { g.globalAlpha = 1 - hp / 0.6; sprite(g, HEART, catHome + 1, Math.round(cy - 5 - hp * 16), { p: "#f0648f" }); g.globalAlpha = 1; }
    }
  }

  // music notes while i'm listening
  if (listening && t > 0) {
    for (let i = 0; i < 2; i++) {
      const np = ((t + i * 900) % 1800) / 1800;
      g.globalAlpha = np < 0.2 ? np / 0.2 : 1 - (np - 0.2) / 0.8;
      sprite(g, NOTE, bx0 + 9 + Math.round(np * 5), Math.round(by0 - 5 - np * 14), { p: P.petals > 0.5 ? "#b4527a" : "#ffffff" });
    }
    g.globalAlpha = 1;
  }

  // weather on top
  if (P.wind > 0.01) {
    g.globalAlpha = P.wind * 0.5; g.fillStyle = rgb(P.windCol);
    for (const w of WIND) g.fillRect(Math.round(W - ((w.ph + t * w.sp) % (W + 40)) + 10), w.y, w.w, 1);
    g.globalAlpha = 1;
  }
  if (P.petals > 0.01) {
    g.globalAlpha = P.petals;
    for (const p of PETALS) {
      const x = Math.round(W + 10 - ((p.ph + t * p.sp) % (W + 30)));
      const y = Math.round((p.y + t * 0.004 + Math.sin(t * 0.002 + p.ph) * 6) % H);
      g.fillStyle = p.pink ? "#f7a8c4" : "#ffffff";
      g.fillRect(x, y, Math.floor(t / 300 + p.ph) % 2 ? 2 : 1, 1);
    }
    g.globalAlpha = 1;
  }
}

export default function Scene({ mood, view, listening }) {
  const ref = useRef(null);
  const live = useRef({ mood, view, listening });
  live.current = { mood, view, listening };

  useEffect(() => {
    const canvas = ref.current;
    const out = canvas.getContext("2d");
    const mk = () => { const c = document.createElement("canvas"); c.width = W; c.height = H; return c; };
    const world = mk();
    const sky = mk();
    const sea = mk();
    const g = world.getContext("2d");
    const reduced = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();

    const first = live.current;
    const pal = { cur: PAL[first.mood], from: PAL[first.mood], to: PAL[first.mood], at: -1e9, key: first.mood };
    const cam = { from: CAMS[first.view], to: CAMS[first.view], at: -1e9, key: first.view };
    const camAt = (now) => {
      const e = ease(reduced ? 1 : clamp((now - cam.at) / 1400));
      return {
        x: lerp(cam.from.x, cam.to.x, e),
        y: lerp(cam.from.y, cam.to.y, e),
        z: Math.exp(lerp(Math.log(cam.from.z), Math.log(cam.to.z), e)),
        nx: lerp(cam.from.nx, cam.to.nx, e),
        nz: Math.exp(lerp(Math.log(cam.from.nz), Math.log(cam.to.nz), e)),
      };
    };

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    };
    let resized = true;
    const ro = new ResizeObserver(() => { fit(); resized = true; });
    ro.observe(canvas);
    fit();
    // don't spend effort while the scene is scrolled out of view
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; });
    io.observe(canvas);

    let bgDirty = true;
    let lastWorld = -1e9;
    let raf;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (!onScreen) return;
      const p = live.current;
      if (p.mood !== pal.key) { pal.from = pal.cur; pal.to = PAL[p.mood]; pal.at = now; pal.key = p.mood; }
      if (p.view !== cam.key) { cam.from = camAt(now); cam.to = CAMS[p.view]; cam.at = now; cam.key = p.view; }

      const pk = reduced ? 1 : clamp((now - pal.at) / 3200);
      const moving = pk < 1;
      if (moving || bgDirty) {
        pal.cur = mixPal(pal.from, pal.to, ease(pk));
        drawSky(sky.getContext("2d"), pal.cur);
        drawSea(sea.getContext("2d"), pal.cur);
        bgDirty = moving;
      }
      const t = reduced ? 0 : now - start;
      let dirty = resized;
      if (now - lastWorld > 60 || moving) { drawWorld(g, t, pal.cur, sky, sea, p.listening); lastWorld = now; dirty = true; }
      const camMoving = !reduced && now - cam.at < 1450;
      if (!dirty && !camMoving) return;
      resized = false;

      // camera: crop the 480×180 world to the screen's shape, nearest-neighbour scaled
      const c = camAt(now);
      const dw = canvas.width;
      const dh = canvas.height;
      const wideness = clamp((dw / dh - 0.5) / (16 / 9 - 0.5)); // 0 on a phone, 1 on a laptop screen
      const cx = lerp(c.nx, c.x, wideness);
      const z = lerp(c.nz, c.z, wideness);
      let vh = H / z;
      let vw = vh * (dw / dh);
      if (vw > W) { vw = W; vh = vw * (dh / dw); }
      const sx = clamp(cx - vw / 2, 0, W - vw);
      const sy = clamp(c.y - vh / 2, 0, H - vh);
      out.imageSmoothingEnabled = false;
      out.drawImage(world, sx, sy, vw, vh, 0, 0, dw, dh);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} className="cl-canvas" aria-hidden="true" />;
}
