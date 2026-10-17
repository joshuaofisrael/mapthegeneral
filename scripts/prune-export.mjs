import { readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../out");

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    // Next writes a flight-data index.txt beside every exported route.
    // The HTML already contains the page. Dropping these files keeps the
    // GitHub Pages artifact under the 1 GB site limit.
    if (name === "index.txt") rmSync(full);
  }
}

walk(root);
