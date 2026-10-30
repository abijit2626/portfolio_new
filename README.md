# Abijit Arun — Portfolio

A clean, professional single-page portfolio for a defensive-security student.
Built with React and Vite, no UI or animation libraries. Subtle fade-in on scroll only
(disabled automatically for visitors who prefer reduced motion).

**Sections:** Hero · About · Skills · Projects · Journey · Contact

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview
```

## Edit your content

All text lives in `src/data.js` (profile, skills, projects, journey).
Colours and spacing are tokens at the top of `src/styles.css`.

## Deploy

Pushes to `main` build and publish to GitHub Pages via `.github/workflows/deploy.yml`.
In the repo, set **Settings → Pages → Source** to **GitHub Actions** once.
