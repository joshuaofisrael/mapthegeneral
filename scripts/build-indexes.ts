import { votingEndedConfirmed } from "../src/data/release-status";
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { electionSitemapLastmod } from "../src/data/election-seo";
import { SITE, absoluteUrl } from "../src/data/site";
import { EMPTY_MUNICIPALITY_TOTAL_COUNT, MUNICIPALITY_PAGE_COUNT } from "../src/data/spain/municipalities";
import { COMMUNITIES, PROVINCES } from "../src/data/spain/places";
import { registryCountries } from "../src/lib/country-registry";
import { allPublicPaths, searchIndex } from "../src/lib/routes";
import {
  calendarStatus,
  indexingAsOf,
  thinCountsByCountry,
  thinMunicipalityExcluded,
} from "../src/lib/indexing-policy";
import { buildDateIso, loadGitFileDates, resolveLastmod, sourceFilesForPath } from "../src/lib/sitemap-lastmod";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DATE = buildDateIso();

function write(path: string, body: string) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, body);
}

/** Lastmod values already published. Kept for unchanged pages when git history is missing. */
function previousLastmods(): Map<string, string> {
  const dir = join(root, "public", "sitemaps");
  const found = new Map<string, string>();
  if (!existsSync(dir)) return found;
  const base = SITE.url.replace(/\/+$/, "");
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".xml")) continue;
    const xml = readFileSync(join(dir, name), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc><lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/g)) {
      const loc = match[1];
      let path = "/";
      if (loc !== base && loc !== `${base}/`) {
        const rest = loc.startsWith(base) ? loc.slice(base.length) : loc;
        path = `/${rest.replace(/^\/+|\/+$/g, "")}/`;
      }
      found.set(path, match[2]);
    }
  }
  return found;
}

function dirtyFiles(): Set<string> {
  const listed = execSync("git diff --name-only HEAD && git ls-files --others --exclude-standard", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return new Set(listed.split("\n").map((line) => line.trim()).filter(Boolean));
}

function appPageFiles(dir: string, prefix: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const rel = `${prefix}${name.name}`;
    const full = join(dir, name.name);
    if (name.isDirectory()) found.push(...appPageFiles(full, `${rel}/`));
    else if (name.name === "page.tsx") found.push(rel);
  }
  return found;
}

const pageFiles = appPageFiles(join(root, "src", "app"), "src/app/");
const history = loadGitFileDates(root);
const dates = history.dates;
const dirty = dirtyFiles();
const previous = history.available ? new Map<string, string>() : previousLastmods();
const lastmodByPath = new Map<string, string>();
let missingSources = 0;

if (!history.available) {
  console.log(
    `indexes: git history is shallow or missing; lastmod uses an explicit election date, the build date for pages generated or changed, or the previous sitemap date (${previous.size} urls)`,
  );
}

function lastmodFor(path: string): string {
  const cached = lastmodByPath.get(path);
  if (cached) return cached;
  const files = sourceFilesForPath(path, pageFiles, (rel) => existsSync(join(root, rel)));
  if (files.length === 0) missingSources += 1;
  const value = resolveLastmod({
    files,
    gitDates: dates,
    dirty,
    buildDate: BUILD_DATE,
    historyAvailable: history.available,
    explicit: electionSitemapLastmod(path),
    previous: previous.get(path),
  });
  lastmodByPath.set(path, value);
  return value;
}

function urlset(paths: string[]): string {
  const rows = paths
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmodFor(path)}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

const allPaths = allPublicPaths();
const asOf = indexingAsOf();
const paths = allPaths.filter((path) => !thinMunicipalityExcluded(path, asOf));
const buckets = new Map<string, string[]>();
for (const path of paths) {
  const match = path.match(/^\/([a-z]{2})\/([a-z]{2})\//);
  const key = match ? `${match[1]}-${match[2]}` : "global";
  const list = buckets.get(key) ?? [];
  list.push(path);
  buckets.set(key, list);
}
const bucketNames = [...buckets.keys()].sort((a, b) => (a === "global" ? -1 : b === "global" ? 1 : a.localeCompare(b)));
for (const name of bucketNames) {
  const list = buckets.get(name) ?? [];
  if (list.length > 50000) throw new Error(`${name} sitemap exceeds 50,000 URLs`);
  write(`public/sitemaps/${name}.xml`, urlset(list));
}

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bucketNames
  .map((name) => `  <sitemap><loc>${SITE.url}/sitemaps/${name}.xml</loc><lastmod>${BUILD_DATE}</lastmod></sitemap>`)
  .join("\n")}
</sitemapindex>
`;
write("public/sitemap.xml", index);

const sitemapDir = join(root, "public", "sitemaps");
const keepSitemaps = new Set(bucketNames.map((name) => `${name}.xml`));
for (const name of readdirSync(sitemapDir)) {
  if (!name.endsWith(".xml") || keepSitemaps.has(name)) continue;
  unlinkSync(join(sitemapDir, name));
  console.log(`indexes: removed stale sitemap ${name}`);
}

write("public/search/index.json", JSON.stringify(searchIndex()));
// Chieti poll-publication hold: the committed IndexNow list carries no Italian URL until
// it-2026-chieti.votingEnded is true (the deploy job pings from this committed file).
const indexNowPaths = paths.filter((path) => votingEndedConfirmed("it-2026-chieti") || !(path === "/it/" || path.startsWith("/it/")));
write("public/search/indexnow-urls.json", JSON.stringify(indexNowPaths.map((path) => absoluteUrl(path))));

const indexed = searchIndex();
const byPath = new Map(indexed.map((item) => [item.path, item]));
const lines = [
  `# ${SITE.name}`,
  "",
  `> ${SITE.description} Publisher: ${SITE.name}. Business address: ${SITE.location}. ${SITE.officialNotUs}`,
  "",
  "## Pages",
  "",
  ...allPaths.map((path) => {
    const entry = byPath.get(path);
    return `- [${entry?.title ?? path}](${absoluteUrl(path)})`;
  }),
  "",
  `Spain: ${COMMUNITIES.length} autonomous communities and cities, ${PROVINCES.length} provinces, ${MUNICIPALITY_PAGE_COUNT} municipalities with a 2025 Total in INE table 29005. Ceuta and Melilla are the city pages. ${EMPTY_MUNICIPALITY_TOTAL_COUNT} codes with an empty 2025 Total have no page.`,
  "",
  ...registryCountries().flatMap((country) => [`${country.name} (${SITE.url}${country.href}): ${country.summary}`, ""]),
  `Sitemap index: ${SITE.url}/sitemap.xml`,
  "",
];
write("public/llms.txt", lines.join("\n"));

const distinct = new Set(lastmodByPath.values());
if (missingSources > 0) {
  console.log(`indexes: ${missingSources} paths had no source file; lastmod fell back to ${BUILD_DATE}`);
}
const beforeBuckets = new Map<string, number>();
for (const path of allPaths) {
  const match = path.match(/^\/([a-z]{2})\/([a-z]{2})\//);
  const key = match ? `${match[1]}-${match[2]}` : "global";
  beforeBuckets.set(key, (beforeBuckets.get(key) ?? 0) + 1);
}
const countryBefore = new Map<string, number>();
const countryAfter = new Map<string, number>();
for (const [key, count] of beforeBuckets) {
  const country = key === "global" ? "global" : key.slice(0, 2);
  countryBefore.set(country, (countryBefore.get(country) ?? 0) + count);
}
for (const name of bucketNames) {
  const country = name === "global" ? "global" : name.slice(0, 2);
  countryAfter.set(country, (countryAfter.get(country) ?? 0) + (buckets.get(name)?.length ?? 0));
}
const thinByCountry = thinCountsByCountry();
const status = calendarStatus(asOf);
console.log(
  `indexes: sitemap ${paths.length} urls, was ${allPaths.length}, omitted ${allPaths.length - paths.length} thin municipality pages outside the election window (${asOf})`,
);
console.log(
  `indexes: per country ${[...countryBefore.keys()].sort().map((country) => `${country} ${countryBefore.get(country)}→${countryAfter.get(country) ?? 0}`).join(", ")}`,
);
console.log(
  `indexes: thin pages ${[...thinByCountry.entries()].sort().map(([country, count]) => `${country} ${count}`).join(", ") || "none"}`,
);
console.log(
  `indexes: in window ${status.inWindow.map((row) => `${row.country} ${row.activeDays.join("+")}`).join(", ") || "none"}`,
);
console.log(
  `indexes: outside window ${status.outsideWindow.map((row) => `${row.country} ${row.pollingDays.join("+")}`).join(", ") || "none"}`,
);
console.log(`indexes: unreliable calendars stay indexed: ${status.unreliable.join(", ") || "none"}`);
console.log(
  `indexes: files ${bucketNames.map((name) => `${name} ${beforeBuckets.get(name) ?? 0}→${buckets.get(name)?.length ?? 0}`).join(", ")}; lastmod days ${distinct.size}; index ${BUILD_DATE}`,
);
