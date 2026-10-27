/**
 * After `next build` and after place-redirect stubs are written, insert the
 * GA measurement id and consent.js into any exported HTML page that lacks them.
 * Includes noindex pages and redirect stubs. Does not edit AdSense tags.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ensureGaHead } from "../src/lib/google-analytics";

const OUT = path.join(process.cwd(), "out");

let scanned = 0;
let updated = 0;
let skipped = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    scanned++;
    const before = readFileSync(full, "utf8");
    const after = ensureGaHead(before);
    if (after === before) {
      skipped++;
      continue;
    }
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`ga stamp: ${updated} pages updated, ${skipped} unchanged, ${scanned} html files.`);
