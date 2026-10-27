// Sets <html lang> (and dir="rtl" for Hebrew) from the language segment of each exported page's path.
// Next.js renders every App Router page through the root layout, which says lang="en".
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const out = new URL("../out", import.meta.url).pathname;
const LANGS = new Set(["sr", "pt", "he", "es", "fr", "de", "it", "pl", "en"]);
const RTL = new Set(["he"]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (name.endsWith(".html")) files.push(path);
  }
  return files;
}

let changed = 0;
const problems = [];
for (const file of walk(out)) {
  const parts = relative(out, file).split(sep);
  const lang = parts.length > 2 && LANGS.has(parts[1]) ? parts[1] : null;
  if (!lang) continue;
  const html = readFileSync(file, "utf8");
  const want = RTL.has(lang) ? `<html lang="${lang}" dir="rtl"` : `<html lang="${lang}"`;
  const next = html.replace(/<html lang="[^"]*"(?: dir="[^"]*")?/, want);
  if (next !== html) {
    writeFileSync(file, next);
    changed++;
  }
  if (!next.includes(want)) problems.push(relative(out, file));
}
if (problems.length) {
  console.error(`html-lang: ${problems.length} pages lack the expected lang attribute, e.g. ${problems.slice(0, 5).join(", ")}`);
  process.exit(1);
}
console.log(`html-lang: ${changed} pages restamped; every /xx/<lang>/ page carries its lang.`);
