/**
 * Tiny HTML redirects for spelling-variant and official-alias slugs.
 * Not listed in the sitemap. A variant claimed by two places in one folder is skipped.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { LOCAL_AREAS, STATE_DISTRICTS, localPath, stateAssemblyPath } from "../src/data/au/level3";
import { DIVISIONS } from "../src/data/ca/level2";
import { LEGISLATURE, MUNICIPALITIES } from "../src/data/ca/level3";
import { legislaturePath, municipalityPath } from "../src/data/ca/paths";
import { CANTONS } from "../data/ch/cantons";
import { COMMUNES } from "../data/ch/communes";
import { communePath } from "../data/ch/search";
import { CH_LANGS } from "../data/ch/types";
import { COUNCILS, councilPath } from "../src/data/gb/level3";
import { COMUNI } from "../src/data/italy/comuni";
import { IT_LANGS, comunePath } from "../src/data/italy/paths";
import { entitySlugFor, MUNICIPIOS } from "../src/data/mx/municipios";
import { municipioPath } from "../src/data/mx/paths";
import { allGminy, gminaPath } from "../data/pl/gminy";
import { pageMunicipalities } from "../src/data/spain/municipalities";
import { absoluteUrl } from "../src/data/site";
import { variantSlugs } from "../src/lib/place-variants";
import { LANGS, allPublicPaths, municipalityPath as spainMunicipalityPath } from "../src/lib/routes";

const root = process.cwd();
const outDir = path.join(root, "out");
const GIGABYTE = 1024 * 1024 * 1024;

const RESERVED_SLUGS = new Set([
  "assembly",
  "combined-authorities",
  "communes",
  "comuni",
  "counties",
  "councils",
  "districts",
  "divisions",
  "gminy",
  "greater-london-authority",
  "index",
  "legislature",
  "local-councils",
  "local-government",
  "municipalities",
  "municipios",
]);

type Page = { lang: string; path: string };
type Place = { name: string; aliases: string[]; slug: string; pages: Page[] };

function assertVariant(names: string[], slug: string): void {
  const found = variantSlugs(names);
  if (!found.includes(slug)) throw new Error(`${names.join(" | ")} did not produce ${slug}`);
}

assertVariant(["St Albans"], "saint-albans");
assertVariant(["St. Helens"], "saint-helens");
assertVariant(["Mount Isa"], "mt-isa");
assertVariant(["Forlì"], "forli");
assertVariant(["Forlì"], "forlì");
assertVariant(["Künten"], "kunten");
assertVariant(["Künten"], "künten");
assertVariant(["Ayala/Aiara"], "ayala");
assertVariant(["Ayala/Aiara"], "aiara");
assertVariant(["Bolzano/Bozen", "Bozen"], "bozen");
assertVariant(["Ynys Môn"], "ynys-mon");
assertVariant(["Ynys Môn"], "ynys-môn");

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function redirectHtml(targetPath: string, label: string, canonicalUrl: string, lang: string): string {
  const href = escapeHtml(targetPath);
  return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(label)}</title>
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${href}">
</head>
<body>
<p><a href="${href}">${escapeHtml(label)}</a></p>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
}

function scopeOf(pagePath: string, slug: string): string {
  const suffix = `${slug}/`;
  if (!pagePath.endsWith(suffix)) throw new Error(`${pagePath} does not end with ${suffix}`);
  return pagePath.slice(0, -suffix.length);
}

function places(): Place[] {
  const list: Place[] = [];

  for (const municipality of pageMunicipalities()) {
    list.push({
      name: municipality.name,
      aliases: [],
      slug: municipality.slug,
      pages: LANGS.map((lang) => ({
        lang,
        path: spainMunicipalityPath(lang, municipality.communitySlug, municipality.provinceSlug, municipality.slug),
      })),
    });
  }

  const italyAliases = new Map<string, string[]>();
  const italyChunks = ["comuni-chunk1.json", "comuni-chunk2.json"].flatMap((name) => {
    const file = path.join(root, "src/data/italy", name);
    if (!existsSync(file)) return [];
    const chunk = JSON.parse(readFileSync(file, "utf8")) as {
      comuni: { code: string; name: string; italian: string; other: string }[];
    };
    return chunk.comuni;
  });
  for (const comune of italyChunks) {
    const aliases = [comune.italian, comune.other].filter((name) => name && name !== comune.name);
    if (aliases.length) italyAliases.set(comune.code, aliases);
  }
  for (const comune of COMUNI) {
    list.push({
      name: comune.name,
      aliases: italyAliases.get(comune.code) ?? [],
      slug: comune.slug,
      pages: IT_LANGS.map((lang) => ({
        lang,
        path: comunePath(lang, comune.regionSlug, comune.unitSlug, comune.slug),
      })),
    });
  }

  const divisionSlug = new Map(DIVISIONS.map((division) => [division.code, division.slug]));
  for (const place of MUNICIPALITIES) {
    const parent = divisionSlug.get(place.cd);
    if (!parent) throw new Error(`No division slug for ${place.code}`);
    const aliases = [place.nameEn, place.nameFr, place.boundary].filter((name) => name && name !== place.nameEn);
    list.push({
      name: place.nameEn,
      aliases,
      slug: place.slug,
      pages: (["en", "fr"] as const).map((lang) => ({
        lang,
        path: municipalityPath(lang, place.region, parent, place.slug),
      })),
    });
  }
  for (const seat of LEGISLATURE) {
    list.push({
      name: seat.name,
      aliases: [],
      slug: seat.slug,
      pages: (["en", "fr"] as const).map((lang) => ({
        lang,
        path: legislaturePath(lang, seat.region, seat.slug),
      })),
    });
  }

  for (const gmina of allGminy()) {
    list.push({
      name: gmina.name,
      aliases: [],
      slug: gmina.slug,
      pages: (["pl", "en"] as const).map((lang) => ({ lang, path: gminaPath(lang, gmina) })),
    });
  }

  for (const council of COUNCILS) {
    list.push({
      name: council.name,
      aliases: council.welshName ? [council.welshName] : [],
      slug: council.slug,
      pages: [{ lang: "en", path: councilPath(council) }],
    });
  }

  for (const row of MUNICIPIOS) {
    const entity = entitySlugFor(row);
    list.push({
      name: row.name,
      aliases: [],
      slug: row.slug,
      pages: (["en", "es"] as const).map((lang) => ({ lang, path: municipioPath(lang, entity, row.slug) })),
    });
  }

  for (const district of STATE_DISTRICTS) {
    list.push({
      name: district.name,
      aliases: [],
      slug: district.slug,
      pages: [{ lang: "en", path: stateAssemblyPath(district.jurisdictionSlug, district.slug) }],
    });
  }
  for (const area of LOCAL_AREAS) {
    const aliases = area.absName && area.absName !== area.name ? [area.absName] : [];
    list.push({
      name: area.name,
      aliases,
      slug: area.slug,
      pages: [{ lang: "en", path: localPath(area) }],
    });
  }

  const cantonSlug = new Map(CANTONS.map((canton) => [canton.abbr, canton.slug]));
  for (const commune of COMMUNES) {
    const canton = cantonSlug.get(commune.canton);
    if (!canton) throw new Error(`No canton slug for ${commune.canton}`);
    const aliases = commune.shortName && commune.shortName !== commune.name && !commune.shortName.includes(".")
      ? [commune.shortName]
      : [];
    list.push({
      name: commune.name,
      aliases,
      slug: commune.slug,
      pages: CH_LANGS.map((lang) => ({
        lang,
        path: communePath(lang, canton, commune.districtSlug, commune.slug),
      })),
    });
  }

  return list;
}

function walkBytes(dir: string): number {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) total += walkBytes(full);
    else total += statSync(full).size;
  }
  return total;
}

if (!existsSync(outDir)) {
  console.error("place redirects: out/ is missing. Run next build first.");
  process.exit(1);
}

const reservedPaths = new Set(allPublicPaths());
const catalog = places();
for (const place of catalog) {
  for (const page of place.pages) reservedPaths.add(page.path);
}

const canonicalSlugs = new Map<string, Set<string>>();
const claims = new Map<string, Map<string, { target: string; lang: string; name: string }>>();

function claim(scope: string, slug: string, target: string, lang: string, name: string): void {
  let bySlug = claims.get(scope);
  if (!bySlug) {
    bySlug = new Map();
    claims.set(scope, bySlug);
  }
  const existing = bySlug.get(slug);
  if (!existing) {
    bySlug.set(slug, { target, lang, name });
    return;
  }
  if (existing.target !== target) bySlug.set(slug, { target: "", lang, name });
}

for (const place of catalog) {
  const slugs = variantSlugs([place.name, ...place.aliases]);
  for (const page of place.pages) {
    const scope = scopeOf(page.path, place.slug);
    let taken = canonicalSlugs.get(scope);
    if (!taken) {
      taken = new Set();
      canonicalSlugs.set(scope, taken);
    }
    taken.add(place.slug);
    for (const slug of slugs) {
      if (slug === place.slug || RESERVED_SLUGS.has(slug)) continue;
      claim(scope, slug, page.path, page.lang, place.name);
    }
  }
}

let redirects = 0;
let bytes = 0;
let skipped = 0;
const written = new Map<string, string>();

for (const [scope, bySlug] of claims) {
  const taken = canonicalSlugs.get(scope) ?? new Set<string>();
  for (const [slug, target] of bySlug) {
    if (!target.target || taken.has(slug)) {
      skipped += 1;
      continue;
    }
    const variantPath = `${scope}${slug}/`;
    if (reservedPaths.has(variantPath)) {
      skipped += 1;
      continue;
    }
    const htmlPath = path.join(outDir, variantPath, "index.html");
    if (existsSync(htmlPath)) throw new Error(`Redirect ${variantPath} would overwrite an existing page`);
    const html = redirectHtml(target.target, target.name, absoluteUrl(target.target), target.lang);
    mkdirSync(path.dirname(htmlPath), { recursive: true });
    writeFileSync(htmlPath, html);
    redirects += 1;
    bytes += Buffer.byteLength(html);
    written.set(variantPath, target.target);
  }
}

function expectRedirect(variantPath: string, targetSuffix: string): void {
  const target = written.get(variantPath);
  if (!target || !target.endsWith(targetSuffix)) {
    throw new Error(`${variantPath} redirected to ${target ?? "nothing"}, expected ${targetSuffix}`);
  }
  const html = readFileSync(path.join(outDir, variantPath, "index.html"), "utf8");
  if (!html.includes('content="noindex, follow"')) throw new Error(`${variantPath} is not noindex`);
  if (!html.includes('rel="canonical"')) throw new Error(`${variantPath} has no canonical`);
  if (!html.includes('http-equiv="refresh"')) throw new Error(`${variantPath} has no refresh`);
  if (/joshua|adsbygoogle|google-adsense-account/i.test(html)) throw new Error(`${variantPath} contains a forbidden token`);
}

expectRedirect("/gb/en/england/councils/saint-albans/", "/gb/en/england/councils/st-albans/");
expectRedirect("/au/en/queensland/local-government/mt-isa/", "/au/en/queensland/local-government/mount-isa/");

const ayala = [...written.entries()].find(([variant, target]) => variant.endsWith("/ayala/") && target.endsWith("/ayala-aiara/"));
if (!ayala) throw new Error("Ayala alias redirect is missing");
const forli = [...written.keys()].find((variant) => variant.endsWith("/forlì/"));
if (!forli || !written.get(forli)?.endsWith("/forli/")) throw new Error("Forlì accent redirect is missing");
const kunten = [...written.keys()].find((variant) => variant.endsWith("/kunten/"));
if (!kunten || !written.get(kunten)?.endsWith("/kuenten/")) throw new Error("Künten accent-free redirect is missing");

const sitemapDir = path.join(outDir, "sitemaps");
if (existsSync(sitemapDir)) {
  for (const name of readdirSync(sitemapDir)) {
    if (!name.endsWith(".xml")) continue;
    const xml = readFileSync(path.join(sitemapDir, name), "utf8");
    if (xml.includes("/saint-albans/") || xml.includes("/forlì/") || xml.includes("/kunten/")) {
      throw new Error(`${name} lists a place redirect`);
    }
  }
}

const outBytes = walkBytes(outDir);
const redirectMb = (bytes / (1024 * 1024)).toFixed(1);
const outMb = (outBytes / (1024 * 1024)).toFixed(1);
console.log(
  `place redirects: ${redirects} pages (${redirectMb} MiB), ${skipped} ambiguous or reserved slugs skipped. out/ is ${outMb} MiB.`,
);
if (outBytes >= GIGABYTE) {
  throw new Error(`out/ is ${outBytes} bytes, which is not under 1 GB`);
}
