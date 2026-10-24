/**
 * Fail the build if the owner or LLC name appears outside the legal pages,
 * or if a site copyright line appears on a non-legal page.
 *
 * Allowed for the owner name: terms, disclaimer, privacy, imprint (legal
 * notice), copyright, advertising, and contact (including the thanks page).
 * The copyright line is allowed only on the legal pages, and it must be the
 * exact COPYRIGHT_NOTICE from src/data/legal-entity.ts.
 *
 * JSON-LD on every page may name Joshua Israel Ventures LLC as the
 * Organization's parentOrganization. The publisher stays the brand.
 *
 * Officeholder names already published on the site (Mr Joshua Reynolds MP,
 * Joshua Kim MS) are not the owner and are ignored.
 *
 * Third-party licence lines (© Commonwealth of Australia, © State of
 * Queensland, © Victorian Electoral Commission, and the like) are not the
 * site copyright line. A site copyright line is "©" plus a year, "© Map the
 * General", or "All rights reserved".
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const ENTITY = path.join(process.cwd(), "src/data/legal-entity.ts");
const PHRASES = ["joshua israel ventures", "joshua israel", "ji ventures"];
const OFFICEHOLDERS = ["Joshua Reynolds", "Joshua Kim"];
const OWNER_ALLOWED = new Set([
  "/terms/",
  "/disclaimer/",
  "/privacy/",
  "/imprint/",
  "/copyright/",
  "/advertising/",
  "/contact/",
  "/contact/thanks/",
]);
const COPYRIGHT_PAGES = new Set([
  "/terms/",
  "/disclaimer/",
  "/privacy/",
  "/imprint/",
  "/copyright/",
  "/advertising/",
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
const SITE_COPYRIGHT = /©\s*(?:20\d{2}\b|Map the General\b)|All rights reserved/i;
const FLORIDA_LAW = "These terms are governed by the laws of the State of Florida";
const PARENT_ORG =
  /parentOrganization(?:\\*)"\s*:\s*(?:\\*)\{\s*(?:\\*)"@type(?:\\*)"\s*:\s*(?:\\*)"Organization(?:\\*)"\s*,\s*(?:\\*)"name(?:\\*)"\s*:\s*(?:\\*)"Joshua Israel Ventures LLC(?:\\*)"\s*(?:\\*)\}/g;

const entitySrc = readFileSync(ENTITY, "utf8");
const noticeMatch = entitySrc.match(/export const COPYRIGHT_NOTICE =\s*\n\s*"([^"]+)"/);
if (!noticeMatch) {
  console.error("owner-name: COPYRIGHT_NOTICE missing from src/data/legal-entity.ts");
  process.exit(1);
}
const COPYRIGHT_NOTICE = noticeMatch[1];
if (!COPYRIGHT_NOTICE.startsWith("© 2026 Joshua Israel Ventures LLC. All rights reserved.")) {
  console.error("owner-name: COPYRIGHT_NOTICE is not the required legal-page line");
  process.exit(1);
}

function routeOf(rel) {
  const norm = rel.split(path.sep).join("/");
  if (!norm.endsWith(".html")) return null;
  const route = norm.endsWith("/index.html")
    ? norm.slice(0, -"index.html".length)
    : norm.slice(0, -".html".length);
  const withSlash = route.startsWith("/") ? route : `/${route}`;
  return withSlash.endsWith("/") ? withSlash : `${withSlash}/`;
}

function scrubAllowedIdentity(text) {
  let scrubbed = text;
  for (const person of OFFICEHOLDERS) scrubbed = scrubbed.split(person).join("");
  scrubbed = scrubbed.replace(PARENT_ORG, "");
  return scrubbed;
}

const hits = [];
const copyrightHits = [];
const missingNotice = [];

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
    const text = readFileSync(full, "utf8");
    if (route && COPYRIGHT_PAGES.has(route)) {
      if (!text.includes(COPYRIGHT_NOTICE)) missingNotice.push(rel);
      if (route === "/terms/" && !text.includes(FLORIDA_LAW)) {
        missingNotice.push(`${rel} (Florida governing-law line missing)`);
      }
      continue;
    }
    if (route && SITE_COPYRIGHT.test(text)) copyrightHits.push(rel);
    if (route && OWNER_ALLOWED.has(route)) continue;
    const scrubbed = scrubAllowedIdentity(text);
    const lower = scrubbed.toLowerCase();
    const reasons = PHRASES.filter((phrase) => lower.includes(phrase));
    if (/\bJoshua\b/.test(scrubbed)) reasons.push("Joshua");
    if (reasons.length) hits.push(`${rel} (${[...new Set(reasons)].join(", ")})`);
  }
}

walk(OUT);

let failed = false;

if (hits.length) {
  failed = true;
  console.error(`owner-name: ${hits.length} file(s) outside the legal pages`);
  for (const line of hits.slice(0, 40)) console.error(`  - ${line}`);
  if (hits.length > 40) console.error(`  - … ${hits.length - 40} more`);
}

if (copyrightHits.length) {
  failed = true;
  console.error(`owner-name: ${copyrightHits.length} non-legal page(s) still have a © line`);
  for (const line of copyrightHits.slice(0, 40)) console.error(`  - ${line}`);
  if (copyrightHits.length > 40) console.error(`  - … ${copyrightHits.length - 40} more`);
}

if (missingNotice.length) {
  failed = true;
  console.error(`owner-name: ${missingNotice.length} legal page(s) missing the required line`);
  for (const line of missingNotice) console.error(`  - ${line}`);
}

if (failed) process.exit(1);

console.log("export: owner name only on the legal pages; © line only on the legal pages");
