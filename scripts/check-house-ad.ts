/**
 * Fails the build when a document is missing its one house ad, when the
 * offer does not match the path hash, when the banner sits below the
 * heading, or when the card is not a single link.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense";
import {
  HOUSE_AD_CSS,
  HOUSE_AD_IDS,
  type HouseAdId,
  houseAdHtml,
  isEmbedRoute,
  houseAdLangForDocument,
  pageLanguage,
  routeFromHtmlFile,
  selfCheckHouseAds,
} from "../src/lib/house-ad";

const OUT = path.join(process.cwd(), "out");
const SITE = "https://mapthegeneral.com";
const CSS_FILES = ["src/app/globals.css", "public/place.css", "public/gb/place.css"];
const errors = selfCheckHouseAds();

for (const file of CSS_FILES) {
  const full = path.join(process.cwd(), file);
  if (!existsSync(full) || !readFileSync(full, "utf8").includes(HOUSE_AD_CSS)) {
    errors.push(`${file} is missing the house-ad rules`);
  }
}

const houseAdSource = readFileSync(path.join(process.cwd(), "src/lib/house-ad.ts"), "utf8");
if (/taxdeed|tax deed/i.test(houseAdSource)) errors.push("Tax Deed Pack remains in src/lib/house-ad.ts");

if (process.argv.includes("--self")) {
  if (errors.length) {
    console.error(`house-ad: ${errors.length} self-check problem(s)`);
    for (const line of errors) console.error(`  - ${line}`);
    process.exit(1);
  }
  console.log("house-ad: self-check passed");
  process.exit(0);
}

if (!existsSync(OUT)) errors.push("out/ is missing");

const counts: Record<HouseAdId, number> = { namedscan: 0, rankfootprint: 0 };
const examples: Partial<Record<HouseAdId, string>> = {};
let pages = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const rel = path.relative(OUT, full);
    const route = routeFromHtmlFile(rel);
    const html = readFileSync(full, "utf8");
    if (html.toLowerCase().includes("taxdeedpack.com")) errors.push(`${rel}: links to taxdeedpack.com`);
    const cards = html.match(/class="house-ad"/g)?.length ?? 0;
    const skip = isRedirectStub(html) || htmlHead(html) === null || isEmbedRoute(route);
    if (skip) {
      if (cards !== 0) errors.push(`${rel}: house ad on a skipped page`);
      continue;
    }
    pages++;
    const lang = houseAdLangForDocument(pageLanguage(html));
    if (!lang) {
      errors.push(`${rel}: unsupported lang "${pageLanguage(html) ?? ""}"`);
      continue;
    }
    const expected = houseAdHtml(route, lang);
    const found = html.split(expected).length - 1;
    if (found !== 1 || cards !== 1) {
      errors.push(`${rel}: expected one ${route} card, found markup ${found} and class ${cards}`);
      continue;
    }
    const placement = bannerPlacementError(html);
    if (placement) errors.push(`${rel}: ${placement}`);
    const id = expected.match(/data-house-ad="([^"]+)"/)?.[1] as HouseAdId | undefined;
    if (!id || !HOUSE_AD_IDS.includes(id)) {
      errors.push(`${rel}: missing offer id`);
      continue;
    }
    counts[id]++;
    examples[id] ??= `${SITE}${route}`;
    if (expected.includes("<img") || expected.includes("<script")) errors.push(`${rel}: card has a request`);
    const inner = expected.replace(/^<a\b[^>]*>/, "").replace(/<\/a>$/, "");
    if (inner.includes("<a")) errors.push(`${rel}: nested link`);
  }
}

if (existsSync(OUT)) walk(OUT);

if (pages > 0) {
  const namedShare = counts.namedscan / pages;
  if (namedShare < 0.5 || namedShare > 0.7) {
    errors.push(`NamedScan share ${(namedShare * 100).toFixed(1)}% is outside 50–70%`);
  }
  const rankShare = counts.rankfootprint / pages;
  if (rankShare < 0.3 || rankShare > 0.5) {
    errors.push(`RankFootprint share ${(rankShare * 100).toFixed(1)}% is outside 30–50%`);
  }
  for (const id of HOUSE_AD_IDS) {
    if (!examples[id]) errors.push(`no page received ${id}`);
  }
}

function bannerPlacementError(html: string): string | null {
  const bodyAt = html.search(/<body\b/i);
  const body = bodyAt === -1 ? html : html.slice(bodyAt);
  const adAt = body.indexOf('class="house-ad"');
  if (adAt === -1) return "missing house ad";
  const headerAt = body.indexOf("</header>");
  if (headerAt !== -1 && adAt < headerAt) return "house ad is above the header";
  const h1At = body.search(/<h1\b/i);
  if (h1At !== -1 && adAt > h1At) return "house ad is below the main heading";
  return null;
}

const cssHits = existsSync(OUT)
  ? walkCss(OUT).filter((file) => readFileSync(file, "utf8").includes(".house-ad"))
  : [];
if (existsSync(OUT) && cssHits.length < 2) {
  errors.push(`expected house-ad rules in place.css and the Next stylesheet, found ${cssHits.length}`);
}

function walkCss(dir: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name === "node_modules") continue;
      found.push(...walkCss(full));
    } else if (name.endsWith(".css")) found.push(full);
  }
  return found;
}

if (errors.length) {
  console.error(`house-ad: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  if (errors.length > 40) console.error(`  - … ${errors.length - 40} more`);
  process.exit(1);
}

const parts = HOUSE_AD_IDS.map((id) => {
  const pct = pages ? ((counts[id] / pages) * 100).toFixed(1) : "0.0";
  return `${id} ${counts[id]} (${pct}%) ${examples[id]}`;
});
console.log(`house-ad: ${pages} pages. ${parts.join("; ")}`);
