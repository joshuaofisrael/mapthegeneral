/**
 * Puts the sponsorship slot directly under the house-ad banner on the
 * homepage and country hubs. Other documents, including the Israel results
 * embed, stay without it. AdSense, analytics, and /il-live are not edited.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense";
import { isEmbedRoute, languageFromRoute, routeFromHtmlFile } from "../src/lib/house-ad";
import { isSponsorSurface, sponsorSlotHtml } from "../src/data/sponsorship";

const OUT = path.join(process.cwd(), "out");
const SLOT_RE = /<(div|a)\b[^>]*\bdata-sponsor-slot="(?:open|sold)"[^>]*>[\s\S]*?<\/\1>/;
const HOUSE_RE = /<a\b[^>]*\bclass="house-ad"[^>]*>[\s\S]*?<\/a>/;

function withoutSlot(html: string): string {
  return html.replace(SLOT_RE, "");
}

function withSlot(html: string, slot: string): string | null {
  if (SLOT_RE.test(html)) return html.replace(SLOT_RE, slot);
  const house = HOUSE_RE.exec(html);
  if (!house || house.index === undefined) return null;
  const at = house.index + house[0].length;
  return `${html.slice(0, at)}\n${slot}${html.slice(at)}`;
}

function walk(dir: string, errors: string[], counts: { added: number; kept: number; removed: number }) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full, errors, counts);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const rel = path.relative(OUT, full);
    const route = routeFromHtmlFile(rel);
    const html = readFileSync(full, "utf8");
    const skip = isRedirectStub(html) || htmlHead(html) === null || isEmbedRoute(route);
    const show = !skip && isSponsorSurface(route);
    if (!show) {
      if (!SLOT_RE.test(html)) continue;
      writeFileSync(full, withoutSlot(html));
      counts.removed++;
      continue;
    }
    const slot = sponsorSlotHtml(route, languageFromRoute(route));
    if (html.includes(slot)) {
      counts.kept++;
      continue;
    }
    const next = withSlot(html, slot);
    if (next === null) {
      errors.push(`${rel}: no house-ad banner to place the slot under`);
      continue;
    }
    writeFileSync(full, next);
    counts.added++;
  }
}

if (!existsSync(OUT)) {
  console.error("sponsor-slot: out/ is missing. Run next build first.");
  process.exit(1);
}

const errors: string[] = [];
const counts = { added: 0, kept: 0, removed: 0 };
walk(OUT, errors, counts);
if (errors.length) {
  console.error(`sponsor-slot: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`sponsor-slot: added ${counts.added}, kept ${counts.kept}, removed ${counts.removed}`);
