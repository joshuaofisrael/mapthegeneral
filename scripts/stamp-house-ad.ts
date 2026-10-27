/**
 * Inserts one house-ad banner into each exported document, directly under
 * the header. The offer comes from the page path. Redirect stubs and the
 * Israel results widget are left alone. AdSense tags, GA tags, and the
 * live-results files are not edited.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense";
import {
  HOUSE_AD_IDS,
  type HouseAdId,
  houseAdHtml,
  isEmbedRoute,
  houseAdLangForDocument,
  pageLanguage,
  routeFromHtmlFile,
} from "../src/lib/house-ad";

const OUT = path.join(process.cwd(), "out");
const counts: Record<HouseAdId, number> = { namedscan: 0, rankfootprint: 0 };
const examples: Partial<Record<HouseAdId, string>> = {};
const errors: string[] = [];
let stamped = 0;
let skipped = 0;

/** Under the header and above the heading. Pages that already render it are left as they are. */
function insertHouseAd(html: string, card: string): string | null {
  const header = html.indexOf("</header>");
  if (header !== -1) {
    const at = header + "</header>".length;
    return `${html.slice(0, at)}\n${card}\n${html.slice(at)}`;
  }
  const main = html.match(/<main\b[^>]*>/i);
  if (main?.index !== undefined) {
    const at = main.index + main[0].length;
    return `${html.slice(0, at)}\n${card}\n${html.slice(at)}`;
  }
  return null;
}

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
    if (isRedirectStub(html) || htmlHead(html) === null || isEmbedRoute(route)) {
      skipped++;
      continue;
    }
    if (html.includes('class="house-ad"')) {
      stamped++;
      const id = HOUSE_AD_IDS.find((candidate) => html.includes(`data-house-ad="${candidate}"`));
      if (id) {
        counts[id]++;
        examples[id] ??= route;
      }
      continue;
    }
    const lang = houseAdLangForDocument(pageLanguage(html));
    if (!lang) {
      errors.push(`${rel}: no house-ad translation for lang "${pageLanguage(html) ?? ""}"`);
      continue;
    }
    const card = houseAdHtml(route, lang);
    const next = insertHouseAd(html, card);
    if (next === null) {
      errors.push(`${rel}: no header or main to place the banner`);
      continue;
    }
    writeFileSync(full, next);
    const id = HOUSE_AD_IDS.find((candidate) => next.includes(`data-house-ad="${candidate}"`));
    if (!id) {
      errors.push(`${rel}: card missing after stamp`);
      continue;
    }
    counts[id]++;
    examples[id] ??= route;
    stamped++;
  }
}

if (!existsSync(OUT)) {
  console.error("house-ad: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

if (errors.length) {
  console.error(`house-ad: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

const total = stamped || 1;
const parts = HOUSE_AD_IDS.map((id) => {
  const pct = ((counts[id] / total) * 100).toFixed(1);
  return `${id} ${counts[id]} (${pct}%, e.g. ${examples[id] ?? "none"})`;
});
console.log(`house-ad: stamped ${stamped} pages; skipped ${skipped}. ${parts.join("; ")}`);
