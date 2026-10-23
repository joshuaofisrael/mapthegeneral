/**
 * After `next build`, add Open Graph and Twitter image tags to exported HTML
 * that does not already have them. AdSense tags, robots.txt, and legal copy
 * are not edited. Redirect stubs and non-documents are skipped.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ensureSocialHead } from "../src/lib/social";

const OUT = path.join(process.cwd(), "out");

if (!existsSync(OUT)) {
  console.error("social stamp: out/ is missing. Run next build first.");
  process.exit(1);
}

let scanned = 0;
let updated = 0;
let unchanged = 0;

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
    const after = ensureSocialHead(before);
    if (after === before) {
      unchanged++;
      continue;
    }
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`social stamp: ${updated} pages updated, ${unchanged} unchanged, ${scanned} html files.`);
