import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

// Every page is its own HTML file, laid out like the fellowship guide:
//   index.html (profile), about.html, months/month-1.html … month-6.html, projects/dewy.html
// `npm run release` builds into dist/ and copies it to the repo root, so the fellowship's
// publishing build only ever sees ordinary HTML/CSS/JS.
const at = (p) => fileURLToPath(new URL(p, import.meta.url));
const pages = {
  index: "index.html",
  about: "about.html",
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map((n) => [`month-${n}`, `months/month-${n}.html`])),
  dewy: "projects/dewy.html",
};

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
    rollupOptions: {
      input: Object.fromEntries(Object.entries(pages).map(([name, file]) => [name, at(file)])),
    },
  },
});
