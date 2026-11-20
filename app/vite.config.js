import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `npm run release` builds into dist/ and copies it to the repo root, so the
// fellowship's publishing build only ever sees ordinary HTML/CSS/JS.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets",
  },
});
