import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, absoluteUrl } from "../src/data/site";
import { EMPTY_MUNICIPALITY_TOTAL_COUNT, MUNICIPALITY_PAGE_COUNT } from "../src/data/spain/municipalities";
import { COMMUNITIES, PROVINCES } from "../src/data/spain/places";
import { allPublicPaths, searchIndex } from "../src/lib/routes";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LASTMOD = "2026-10-17";

function write(path: string, body: string) {
  const full = join(root, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, body);
}

function urlset(paths: string[]): string {
  const rows = paths
    .map(
      (path) =>
        `  <url><loc>${absoluteUrl(path)}</loc><lastmod>${LASTMOD}</lastmod></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

const paths = allPublicPaths();
const buckets = new Map<string, string[]>();
const globalPaths: string[] = [];
for (const path of paths) {
  const match = path.match(/^\/([a-z]{2})\/(en|es)\//);
  if (!match) {
    globalPaths.push(path);
    continue;
  }
  const key = `${match[1]}-${match[2]}`;
  const list = buckets.get(key) ?? [];
  list.push(path);
  buckets.set(key, list);
}
const languageKeys = [...buckets.keys()].sort();

for (const [name, list] of [["global", globalPaths] as const, ...languageKeys.map((key) => [key, buckets.get(key) ?? []] as const)]) {
  if (list.length > 50000) throw new Error(`${name} sitemap exceeds 50,000 URLs`);
  write(`public/sitemaps/${name}.xml`, urlset(list));
}

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["global", ...languageKeys]
  .map((name) => `  <sitemap><loc>${SITE.url}/sitemaps/${name}.xml</loc><lastmod>${LASTMOD}</lastmod></sitemap>`)
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
  `> ${SITE.description} ${SITE.brandSentence} Business address: ${SITE.location}. ${SITE.officialNotUs}`,
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
  "Mexico: national page and 32 entidades federativas, in Spanish and English. Federal deputies are renewed on 6 June 2027. Municipality pages are not in this release.",
  "",
  `Sitemap index: ${SITE.url}/sitemap.xml`,
  "",
];
write("public/llms.txt", lines.join("\n"));

const bucketLog = languageKeys.map((key) => `${key} ${buckets.get(key)?.length ?? 0}`).join(", ");
console.log(`indexes: ${paths.length} urls (global ${globalPaths.length}, ${bucketLog})`);
