import { execSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, absoluteUrl } from "../src/data/site";
import { EMPTY_MUNICIPALITY_TOTAL_COUNT, MUNICIPALITY_PAGE_COUNT } from "../src/data/spain/municipalities";
import { COMMUNITIES, PROVINCES } from "../src/data/spain/places";
import { registryCountries } from "../src/lib/country-registry";
import { allPublicPaths, searchIndex } from "../src/lib/routes";
import { buildDateIso, resolveLastmod, sourceFilesForPath } from "../src/lib/sitemap-lastmod";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUILD_DATE = buildDateIso();

function write(path: string, body: string) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, body);
}

function gitDates(): Map<string, string> {
  const out = execSync("git log --pretty=format:%cs --name-only", {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  const dates = new Map<string, string>();
  let current = "";
  for (const line of out.split("\n")) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(line)) {
      current = line;
      continue;
    }
    if (!line || !current || dates.has(line)) continue;
    dates.set(line, current);
  }
  return dates;
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
const dates = gitDates();
const dirty = dirtyFiles();
const lastmodByPath = new Map<string, string>();
let missingSources = 0;

function lastmodFor(path: string): string {
  const cached = lastmodByPath.get(path);
  if (cached) return cached;
  const files = sourceFilesForPath(path, pageFiles, (rel) => existsSync(join(root, rel)));
  if (files.length === 0) missingSources += 1;
  const value = resolveLastmod({ files, gitDates: dates, dirty, buildDate: BUILD_DATE });
  lastmodByPath.set(path, value);
  return value;
}

function urlset(paths: string[]): string {
  const rows = paths
    .map((path) => `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${lastmodFor(path)}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

const paths = allPublicPaths();
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

write("public/search/index.json", JSON.stringify(searchIndex()));
write("public/search/indexnow-urls.json", JSON.stringify(paths.map((path) => absoluteUrl(path))));

const indexed = searchIndex();
const byPath = new Map(indexed.map((item) => [item.path, item]));
const lines = [
  `# ${SITE.name}`,
  "",
  `> ${SITE.description} Publisher: ${SITE.name}. Business address: ${SITE.location}. ${SITE.officialNotUs}`,
  "",
  "## Pages",
  "",
  ...paths.map((path) => {
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
console.log(
  `indexes: ${paths.length} urls (${bucketNames.map((name) => `${name} ${buckets.get(name)?.length ?? 0}`).join(", ")}); lastmod days ${distinct.size}; index ${BUILD_DATE}`,
);
