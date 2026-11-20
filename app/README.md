# scrapbook source

The site is a small React app. The repo root holds the **built** static files
(`index.html`, `assets/`, `images/`, `fonts/`). Those are what TinkerHub publishes.
This `app/` folder is the source.

## editing

- **Words:** almost everything lives in `src/content.js` (profile, albums + their songs, months, Dewy).
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
