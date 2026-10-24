/**
 * Confirms the rendered election pages still carry one Event, a matching
 * FAQ, and sourced key dates after the export stamps. Also checks the
 * 60-day filter and that sitemap lastmod is no longer a single stale day.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ELECTION_SEO_PROFILES, addDays, isWithinDays } from "../src/data/election-seo";
import { validateElectionHtml, existingImageUrl } from "../src/lib/election-seo-html";

const root = process.cwd();
const outDir = join(root, "out");
const errors: string[] = [];

if (!isWithinDays("2026-11-22", "2026-10-24", 60) || !isWithinDays("2026-11-28", "2026-10-24", 60)) {
  errors.push("22 and 28 November 2026 should fall inside 60 days of 24 October 2026");
}
if (isWithinDays("2026-11-28", "2026-12-24", 60)) errors.push("a past polling day must leave the 60-day window");
if (isWithinDays("2027-06-06", "2026-10-24", 60)) errors.push("June 2027 must stay outside the 60-day window");
if (addDays("2026-10-24", 60) !== "2026-12-23") errors.push("60 days after 24 October 2026 should be 23 December 2026");

for (const profile of ELECTION_SEO_PROFILES) {
  const image = existingImageUrl(profile, root);
  for (const page of profile.pages) {
    const rel = join(page.path, "index.html");
    const fromOut = join(outDir, rel);
    const fromPublic = join(root, "public", rel);
    const file = existsSync(fromOut) ? fromOut : fromPublic;
    if (!existsSync(file)) {
      errors.push(`missing ${page.path}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    errors.push(...validateElectionHtml(html, profile, page, image).map((line) => `${page.path}: ${line}`));
    const events = html.match(/"@type":"Event"/g) ?? [];
    if (events.length !== 1) errors.push(`${page.path}: Event count ${events.length}`);
  }
}

const indexPath = existsSync(join(outDir, "sitemap.xml")) ? join(outDir, "sitemap.xml") : join(root, "public", "sitemap.xml");
if (!existsSync(indexPath)) {
  errors.push("sitemap index missing");
} else {
  const index = readFileSync(indexPath, "utf8");
  const indexMods = [...index.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1]);
  const distinctIndex = new Set(indexMods);
  if (indexMods.length === 0) errors.push("sitemap index has no lastmod");
  if (distinctIndex.size !== 1) errors.push(`sitemap index lastmod should be one fresh build date, got ${[...distinctIndex].join(", ")}`);
  const indexDay = indexMods[0];
  if (indexDay && indexDay < "2026-10-24") errors.push(`sitemap index lastmod ${indexDay} is stale`);

  const bucketDir = indexPath.endsWith("sitemap.xml") ? join(indexPath, "..", "sitemaps") : join(root, "public", "sitemaps");
  const auFile = join(bucketDir, "au-en.xml");
  const plFile = join(bucketDir, "pl-en.xml");
  const dates = new Set<string>();
  for (const file of [auFile, plFile, join(bucketDir, "pl-pl.xml")]) {
    if (!existsSync(file)) {
      errors.push(`missing sitemap ${file}`);
      continue;
    }
    const xml = readFileSync(file, "utf8");
    for (const match of xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) dates.add(match[1]);
    for (const path of [
      "https://mapthegeneral.com/au/en/elections/victoria-2026/",
      "https://mapthegeneral.com/pl/en/elections/senat-20-2026/",
      "https://mapthegeneral.com/pl/pl/elections/senat-20-2026/",
    ]) {
      const row = xml.match(new RegExp(`<loc>${path}</loc><lastmod>([^<]+)</lastmod>`));
      if (!row) continue;
      if (row[1] < "2026-10-24") errors.push(`${path} lastmod ${row[1]} is still stale`);
    }
  }
  if (dates.size < 2) errors.push(`expected real per-page lastmod values, found ${[...dates].join(", ") || "none"}`);
}

if (errors.length) {
  console.error(`election-seo check: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log("election-seo check: Event, FAQ, key dates, 60-day window, and sitemap lastmod ok.");
