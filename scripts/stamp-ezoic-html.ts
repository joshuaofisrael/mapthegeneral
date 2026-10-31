/** Insert the Ezoic header block at the start of <head> on every exported HTML page, then verify it precedes GA. */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { insertEzoicHead } from "../src/lib/ezoic";

const OUT = path.join(process.cwd(), "out");
let scanned = 0, updated = 0, bad = 0;
function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) { if (name !== "_next") walk(full); continue; }
    if (!name.endsWith(".html")) continue;
    scanned++;
    const before = readFileSync(full, "utf8");
    const after = insertEzoicHead(before);
    if (after !== before) { writeFileSync(full, after); updated++; }
    const ez = after.indexOf("ezojs.com/ezoic/sa.min.js");
    const ga = after.indexOf("G-ZFR5N4M7PY");
    if (/<head/i.test(after) && (ez < 0 || (ga >= 0 && ga < ez))) { bad++; console.error(`ezoic: missing or after GA in ${path.relative(OUT, full)}`); }
  }
}
walk(OUT);
console.log(`ezoic stamp: ${updated} updated of ${scanned} html files.`);
if (bad) process.exit(1);
