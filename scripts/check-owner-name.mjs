/**
 * Fail the build if the owner or LLC name appears outside the legal pages.
 *
 * Allowed pages: terms, disclaimer, privacy, imprint (legal notice), copyright,
 * advertising, and contact (including the thanks page).
 *
 * Officeholder names already published on the site (Mr Joshua Reynolds MP,
 * Joshua Kim MS) are not the owner and are ignored.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const PHRASES = ["joshua israel ventures", "joshua israel", "ji ventures"];
const OFFICEHOLDERS = ["Joshua Reynolds", "Joshua Kim"];
const ALLOWED = new Set([
  "/terms/",
  "/disclaimer/",
  "/privacy/",
  "/imprint/",
  "/copyright/",
  "/advertising/",
  "/contact/",
  "/contact/thanks/",
]);
const TEXT = new Set([
  ".html",
  ".txt",
  ".xml",
  ".json",
  ".js",
  ".mjs",
  ".css",
  ".svg",
  ".map",
  ".webmanifest",
]);

function routeOf(rel) {
  const norm = rel.split(path.sep).join("/");
  if (!norm.endsWith(".html")) return null;
  const route = norm.endsWith("/index.html")
    ? norm.slice(0, -"index.html".length)
    : norm.slice(0, -".html".length);
  const withSlash = route.startsWith("/") ? route : `/${route}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

const hits = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full);
      continue;
    }
    if (!TEXT.has(path.extname(entry).toLowerCase())) continue;
    const rel = path.relative(OUT, full);
    const route = routeOf(rel);
    if (route && ALLOWED.has(route)) continue;
    const text = readFileSync(full, "utf8");
    let scrubbed = text;
    for (const person of OFFICEHOLDERS) scrubbed = scrubbed.split(person).join("");
    const lower = scrubbed.toLowerCase();
    const reasons = PHRASES.filter((phrase) => lower.includes(phrase));
    if (/\bJoshua\b/.test(scrubbed)) reasons.push("Joshua");
    if (reasons.length) hits.push(`${rel} (${[...new Set(reasons)].join(", ")})`);
  }
}

walk(OUT);

if (hits.length) {
  console.error(`owner-name: ${hits.length} file(s) outside the legal pages`);
  for (const line of hits.slice(0, 40)) console.error(`  - ${line}`);
  if (hits.length > 40) console.error(`  - … ${hits.length - 40} more`);
  process.exit(1);
}

console.log("export: owner name only on the legal pages");
