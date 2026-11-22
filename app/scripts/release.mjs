// Copies the built site (app/dist) to the repo root, replacing the old build.
import { cpSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const app = join(dirname(fileURLToPath(import.meta.url)), "..");
const root = join(app, "..");
const dist = join(app, "dist");

for (const p of ["assets", "images", "fonts", "audio", "videos", "months", "projects", "about.html", "index.html"]) {
  const t = join(root, p);
  if (existsSync(t)) rmSync(t, { recursive: true, force: true });
}
cpSync(dist, root, { recursive: true });
console.log("✓ site copied to repo root. preview: npm run preview  ·  then git add + commit + push");
