/**
 * Inserts one house-ad card into each exported document, chosen from the
 * page path. Redirect stubs and the Israel results widget are left alone.
 * AdSense tags, GA tags, and the live-results files are not edited.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense";
import {
  HOUSE_AD_IDS,
  type HouseAdId,
  houseAdHtml,
  isEmbedRoute,
  isHouseAdLang,
  pageLanguage,
  routeFromHtmlFile,
} from "../src/lib/house-ad";

const OUT = path.join(process.cwd(), "out");
const counts: Record<HouseAdId, number> = { namedscan: 0, taxdeedpack: 0, rankfootprint: 0 };
const examples: Partial<Record<HouseAdId, string>> = {};
const errors: string[] = [];
let stamped = 0;
let skipped = 0;

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
    const lang = pageLanguage(html);
    if (!isHouseAdLang(lang)) {
      errors.push(`${rel}: no house-ad translation for lang "${lang ?? ""}"`);
      continue;
    }
    const at = html.lastIndexOf("</main>");
    const card = `\n${houseAdHtml(route, lang)}\n`;
    let next: string;
    if (at !== -1) next = html.slice(0, at) + card + html.slice(at);
    else {
      const body = html.lastIndexOf("</body>");
      if (body === -1) {
        errors.push(`${rel}: no </main> or </body>`);
        continue;
      }
      next = html.slice(0, body) + card + html.slice(body);
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
