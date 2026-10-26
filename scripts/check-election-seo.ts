/**
 * Confirms the rendered election pages still carry one Event, a matching
 * FAQ, and sourced key dates after the export stamps. Also checks the
 * 60-day filter and that sitemap lastmod is no longer a single stale day.
 * A shallow clone has no per-page git history, so those lastmod findings
 * are warnings there instead of a failed deploy.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ELECTION_SEO_PROFILES, addDays, isListedElection, isRecentlyHeld, isWithinDays } from "../src/data/election-seo";
import { validateElectionHtml, existingImageUrl } from "../src/lib/election-seo-html";
import { gitHistoryAvailable } from "../src/lib/sitemap-lastmod";

const root = process.cwd();
const outDir = join(root, "out");
const errors: string[] = [];
const warnings: string[] = [];
const historyAvailable = gitHistoryAvailable(root);
const lastmodFindings = historyAvailable ? errors : warnings;

if (!isWithinDays("2026-11-22", "2026-10-24", 60) || !isWithinDays("2026-11-28", "2026-10-24", 60)) {
  errors.push("22 and 28 November 2026 should fall inside 60 days of 24 October 2026");
}
if (isWithinDays("2026-11-28", "2026-12-24", 60)) errors.push("a past polling day must leave the 60-day window");
if (isWithinDays("2027-06-06", "2026-10-24", 60)) errors.push("June 2027 must stay outside the 60-day window");
if (addDays("2026-10-24", 60) !== "2026-12-23") errors.push("60 days after 24 October 2026 should be 23 December 2026");
if (isWithinDays("2026-10-24", "2026-10-25", 60)) errors.push("24 October must leave the upcoming window on 25 October");
if (!isRecentlyHeld("2026-10-24", "2026-10-25")) errors.push("24 October is recently held on 25 October");
if (!isRecentlyHeld("2026-10-24", "2026-11-07")) errors.push("24 October is still recently held on 7 November");
if (isRecentlyHeld("2026-10-24", "2026-11-08")) errors.push("24 October drops off the recent window on 8 November");
if (isRecentlyHeld("2026-10-24", "2026-10-24")) errors.push("polling day itself is not recently held");
if (!isListedElection("2026-10-24", "2026-10-25")) errors.push("the BC election stays listed on 25 October");
if (!isListedElection("2026-11-28", "2026-10-24")) errors.push("28 November stays listed on 24 October");
if (isListedElection("2026-10-24", "2026-11-08")) errors.push("the BC election leaves the home list on 8 November");
if (isListedElection("2027-06-06", "2026-10-24")) errors.push("June 2027 stays off the home list");

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
      if (row[1] < "2026-10-24") lastmodFindings.push(`${path} lastmod ${row[1]} is still stale`);
    }
  }
  if (dates.size < 2) lastmodFindings.push(`expected real per-page lastmod values, found ${[...dates].join(", ") || "none"}`);

  for (const [file, loc, fresh] of [
    ["ca-en.xml", "https://mapthegeneral.com/ca/en/elections/bc-2026/", "2026-10-25"],
    ["ca-fr.xml", "https://mapthegeneral.com/ca/fr/elections/bc-2026/", "2026-10-25"],
    ["it-en.xml", "https://mapthegeneral.com/it/en/elections/camera-chieti-2026/", "2026-10-26"],
    ["it-it.xml", "https://mapthegeneral.com/it/it/elections/camera-chieti-2026/", "2026-10-26"],
  ] as const) {
    const xmlPath = join(bucketDir, file);
    if (!existsSync(xmlPath)) {
      errors.push(`missing sitemap ${xmlPath}`);
      continue;
    }
    const xml = readFileSync(xmlPath, "utf8");
    const row = xml.match(new RegExp(`<loc>${loc}</loc><lastmod>([^<]+)</lastmod>`));
    if (!row) {
      errors.push(`${file} is missing ${loc}`);
      continue;
    }
    if (row[1] < fresh) lastmodFindings.push(`${loc} lastmod ${row[1]} is still stale`);
  }
}

if (warnings.length) {
  console.warn(
    `election-seo check: ${warnings.length} lastmod warning(s); git history is shallow or missing, so this does not fail the build`,
  );
  for (const line of warnings) console.warn(`  - ${line}`);
}
if (errors.length) {
  console.error(`election-seo check: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(
  warnings.length
    ? "election-seo check: Event, FAQ, key dates, and 60-day window ok. Sitemap lastmod warnings only (shallow or missing git history)."
    : "election-seo check: Event, FAQ, key dates, 60-day window, and sitemap lastmod ok.",
);
