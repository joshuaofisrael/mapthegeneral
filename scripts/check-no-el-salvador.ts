/**
 * Fails the build when an El Salvador country entry comes back.
 * Swedish pages (/fi/sv/, /se/sv/) and municipalities named El Salvador stay.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { COUNTRY_HUBS } from "../src/data/country-hubs";
import { NATIVE_COUNTRY_NAMES } from "../src/data/country-nav";
import { EDITORIAL_PREVIEWS } from "../src/data/editorial";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import { NIGHT_ELECTIONS } from "../src/data/election-night";
import { ELECTION_SEO_PROFILES } from "../src/data/election-seo";
import { isRedirectStub } from "../src/lib/adsense";
import { RETIRED_EL_SALVADOR_PATHS } from "../src/data/retired-el-salvador";
import { registryCountries } from "../src/lib/country-registry";
import { allPublicPaths } from "../src/lib/routes";
import { FEEDS } from "./election-night/feeds.mjs";
import { OPENS } from "./election-night/fetch.mjs";

const root = process.cwd();
const errors: string[] = [];

function isCountryPath(value: string): boolean {
  return value === "/sv" || value === "/sv/" || value.startsWith("/sv/");
}

function hasCountryUrl(text: string): boolean {
  return /https:\/\/mapthegeneral\.com\/sv\/|"\/sv\/|href="\/sv\/|href="\/sv"/.test(text);
}

for (const sample of [
  "https://mapthegeneral.com/sv/",
  "https://mapthegeneral.com/sv/en/",
  '"path":"/sv/es/"',
  'href="/sv/"',
]) {
  if (!hasCountryUrl(sample)) errors.push(`detector missed ${sample}`);
}
for (const sample of [
  "https://mapthegeneral.com/fi/sv/",
  "https://mapthegeneral.com/se/sv/",
  "https://mapthegeneral.com/mx/en/zacatecas/el-salvador/",
  "https://mapthegeneral.com/es/en/castilla-la-mancha/cuenca/puebla-del-salvador/",
  '"path":"/fi/sv/"',
  'hreflang="sv"',
]) {
  if (hasCountryUrl(sample)) errors.push(`detector flagged ${sample}`);
}
if (!isCountryPath("/sv/") || !isCountryPath("/sv/en/elections/general-2027/")) {
  errors.push("path detector missed a country path");
}
if (isCountryPath("/fi/sv/") || isCountryPath("/se/sv/")) errors.push("path detector flagged a Swedish path");

for (const card of registryCountries()) {
  const name = card.name.trim().toLowerCase();
  if (card.code === "sv" || name === "el salvador" || isCountryPath(card.href)) {
    errors.push(`registry country ${card.code} ${card.name} ${card.href}`);
  }
}

if (Object.prototype.hasOwnProperty.call(NATIVE_COUNTRY_NAMES, "sv")) {
  errors.push("native country list still has sv");
}

for (const hub of COUNTRY_HUBS) {
  for (const page of [...hub.pages, ...hub.index]) {
    if (isCountryPath(page.path)) errors.push(`country hub ${page.path}`);
  }
}

for (const item of ELECTION_WINDOWS) {
  if (item.country === "sv" || item.id.startsWith("sv-")) errors.push(`election window ${item.id}`);
}

for (const item of NIGHT_ELECTIONS) {
  if (item.id.startsWith("sv-")) errors.push(`election night ${item.id}`);
  for (const link of item.links) {
    if (isCountryPath(link.href)) errors.push(`election night link ${link.href}`);
  }
}

for (const profile of ELECTION_SEO_PROFILES) {
  if (profile.id.startsWith("sv-")) errors.push(`election seo ${profile.id}`);
  for (const page of profile.pages) {
    if (isCountryPath(page.path)) errors.push(`election seo path ${page.path}`);
  }
}

for (const preview of EDITORIAL_PREVIEWS) {
  if (isCountryPath(preview.path)) errors.push(`editorial preview ${preview.path}`);
}

for (const route of allPublicPaths()) {
  if (isCountryPath(route)) errors.push(`public path ${route}`);
}

for (const feed of FEEDS) {
  if (feed.id.startsWith("sv-")) errors.push(`election-night feed ${feed.id}`);
}

for (const id of Object.keys(OPENS as Record<string, string>)) {
  if (id.startsWith("sv-")) errors.push(`election-night opener ${id}`);
}

const candidateDir = path.join(root, "src", "data", "candidates");
if (existsSync(candidateDir)) {
  for (const name of readdirSync(candidateDir)) {
    if (name.startsWith("sv-")) errors.push(`candidate file ${name}`);
  }
}

const reviewDir = path.join(root, "data", "review");
if (existsSync(reviewDir)) {
  for (const name of readdirSync(reviewDir)) {
    const full = path.join(reviewDir, name);
    if (name.startsWith("sv-") || name.includes("el-salvador")) errors.push(`review note ${name}`);
    if (statSync(full).isFile() && hasCountryUrl(readFileSync(full, "utf8"))) {
      errors.push(`review note links the country: ${name}`);
    }
    if (statSync(full).isFile() && /El Salvador/.test(readFileSync(full, "utf8"))) {
      errors.push(`review note names El Salvador: ${name}`);
    }
  }
}

const liveDir = path.join(root, "public", "live");
if (existsSync(liveDir)) {
  for (const name of readdirSync(liveDir)) {
    if (name.startsWith("sv-")) errors.push(`live file ${name}`);
  }
}

const published = [
  "public/sitemap.xml",
  "public/llms.txt",
  "public/search/index.json",
  "public/search/indexnow-urls.json",
];
const sitemapDir = path.join(root, "public", "sitemaps");
if (existsSync(sitemapDir)) {
  for (const name of readdirSync(sitemapDir)) {
    if (name === "sv-en.xml" || name === "sv-es.xml") errors.push(`sitemap file ${name}`);
    if (name.endsWith(".xml")) published.push(`public/sitemaps/${name}`);
  }
}
for (const rel of published) {
  const full = path.join(root, rel);
  if (!existsSync(full)) continue;
  if (hasCountryUrl(readFileSync(full, "utf8"))) errors.push(`${rel} still lists an El Salvador URL`);
}

const outDir = path.join(root, "out");
if (existsSync(outDir)) {
  for (const route of RETIRED_EL_SALVADOR_PATHS) {
    const file = path.join(outDir, route, "index.html");
    if (!existsSync(file)) {
      errors.push(`missing homepage redirect for ${route}`);
      continue;
    }
    const html = readFileSync(file, "utf8");
    if (!isRedirectStub(html) || !/noindex/i.test(html) || !html.includes('url=/')) {
      errors.push(`${route} is not a noindex refresh to the homepage`);
    }
    if (hasCountryUrl(html) || html.includes("El Salvador")) errors.push(`${route} redirect still names the country`);
  }

  function walk(dir: string) {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);
      if (statSync(full).isDirectory()) {
        if (name !== "_next") walk(full);
        continue;
      }
      if (!name.endsWith(".html") && !name.endsWith(".xml") && !name.endsWith(".txt") && !name.endsWith(".json")) {
        continue;
      }
      const rel = path.relative(outDir, full);
      const html = readFileSync(full, "utf8");
      if (name.endsWith(".html") && isRedirectStub(html) && rel.startsWith(`sv${path.sep}`)) continue;
      if (hasCountryUrl(html)) errors.push(`out/${rel} still lists an El Salvador URL`);
    }
  }
  walk(outDir);
}

if (errors.length) {
  console.error(`el-salvador: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

console.log("el-salvador: no country entry in the registry, nav, sitemap, or export.");
