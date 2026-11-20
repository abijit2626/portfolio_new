# scrapbook source

The site is a small React app. The repo root holds the **built** static files, laid out like
the fellowship guide. Those are what TinkerHub publishes:

```
index.html            profile + links to every month
about.html            about me
months/month-1.html   one page per month (month-1 … month-6)
projects/dewy.html    one page per project
assets/ images/ fonts/
```

This `app/` folder is the source. Each page above has a matching HTML file in `app/`; to add a
project, copy `app/projects/dewy.html`, change its `data-id`, and add it to `pages` in
`vite.config.js`. Links between pages are relative (`../index.html`), so the site works inside
`…/ulp26/abijit-arun/`.

## editing

- **Words:** almost everything lives in `src/content.js` (profile, albums (they set the theme), months, Dewy).
- **Photos:** compress to `.webp`/`.jpg`, put them in `public/images/`, then add them to a
  month's `photos` list in `content.js`, e.g. `{ src: "images/m1-parts.webp", caption: "day one" }`.
- **Look:** `src/styles/base.css` and `src/styles/components.css`.

## commands (run inside `app/`)

```
npm install        # first time only
npm run dev        # live preview while you edit
npm run release    # build + copy the finished site to the repo root
npm run preview    # check the built version
```

Then, from the repo root:

```
git pull --ff-only
git add index.html assets/ images/ fonts/ app/ .gitignore
git commit -m "Update scrapbook"
git push origin main
```

Always run `npm run release` before committing, or the live site won't change.
Opening `index.html` by double-clicking won't work (browsers block module scripts on
`file://`). Use `npm run preview`.

## easter eggs

- click Dewy → cat mode · hover → happy · double-click → dizzy
- the terminal takes commands: try `help`, `ls -a`, `./submit_flag`
- type `meow` anywhere
- the stickers on the home page can be dragged around
- the opening scene: click "open my laptop", pick a record; "change record" in the nav brings it back
