# Abijit Arun — 3D Portfolio

An animation-heavy, WebGL portfolio built around an **Ice & Gold** gradient
(`#8EC5FF → #EAF2FF → #FFC86B` on `#07090F`).

## What's inside

- **Three.js scene** (React Three Fiber): a distorted metal core with a wireframe shell, gyroscope rings and
  orbiting shards that glide across the page as you scroll, a scroll-reactive star field, parallax drifting
  shapes, and two lights that chase the pointer.
- **3D skill globe**: skills laid out on a Fibonacci sphere that spins toward the cursor and fades with depth.
- **Framer Motion** everywhere: letter/word mask reveals, scroll-scrubbed paragraph, counters, magnetic buttons,
  custom cursor, velocity-reactive marquee, pinned horizontal project showcase, animated timeline.
- **CSS 3D**: loader cube, perspective grid floor, tilt cards with glare and rotating gradient borders.
- Respects `prefers-reduced-motion`, fully responsive, keyboard and screen-reader friendly.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview
```

Edit your content in `src/data.js`. Colours live in the `:root` tokens at the top of `src/styles.css`
and in the colour constants at the top of `src/components/Scene.jsx`.
