/**
 * After `next build`, insert the AdSense meta tag and loader into any exported
 * HTML page that does not already have the exact tags in <head>.
 * Redirect stubs and non-documents (for example the Google verification token) are skipped.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ensureAdsenseHead } from "../src/lib/adsense";

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
    const after = ensureAdsenseHead(before);
    if (after === before) {
      skipped++;
      continue;
    }
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`adsense stamp: ${updated} pages updated, ${skipped} unchanged, ${scanned} html files.`);
