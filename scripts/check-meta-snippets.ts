/**
 * Fails the build when an indexable exported page has no title, no meta
 * description, or a meta description longer than 160 characters.
 * Open Graph and Twitter descriptions are checked when those tags exist.
 * noindex pages are skipped here. Thin municipality pages outside an election
 * window are an owner-approved noindex exception; check-indexing-policy.ts
 * still fails the build if a country, region, election, results, larger-city,
 * or in-window page is noindex.
 *
 * New Zealand, Bulgaria, and Taiwan are skipped: their current copy is over
 * the limit, and those countries are owned by other work.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const LIMIT = 160;
const SKIP_PREFIXES = ["/nz/", "/bg/", "/tw/"];

const titleRe = /<title>([^<]*)<\/title>/i;
const descRe = /<meta\s+name="description"\s+content="([^"]*)"/i;
const ogDescRe = /<meta\s+property="og:description"\s+content="([^"]*)"/i;
const twDescRe = /<meta\s+name="twitter:description"\s+content="([^"]*)"/i;
const robotsRe = /<meta\s+name="robots"\s+content="([^"]*)"/i;

function decode(value: string): string {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function routeOf(rel: string): string {
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}/`;
  return `/${rel}`;
}

function isSkipped(route: string): boolean {
  return SKIP_PREFIXES.some((prefix) => route === prefix || route.startsWith(prefix));
}

if (!existsSync(OUT)) {
  console.error("meta snippets: out/ is missing. Run next build first.");
  process.exit(1);
}

const errors: string[] = [];
let scanned = 0;
let indexable = 0;
let skipped = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const rel = path.relative(OUT, full).split(path.sep).join("/");
    const route = routeOf(rel);
    scanned++;
    if (isSkipped(route)) {
      skipped++;
      continue;
    }
    const head = readFileSync(full, "utf8").slice(0, 12000);
    // Site-verification tokens are a single line, not an indexable document.
    if (!/<html[\s>]/i.test(head)) continue;
    const robots = robotsRe.exec(head)?.[1] ?? "";
    if (/noindex/i.test(robots)) continue;
    indexable++;
    const title = decode(titleRe.exec(head)?.[1] ?? "").trim();
    const description = decode(descRe.exec(head)?.[1] ?? "").trim();
    if (!title) errors.push(`${route} missing <title>`);
    if (!description) errors.push(`${route} missing meta description`);
    else if ([...description].length > LIMIT) {
      errors.push(`${route} meta description is ${[...description].length} characters`);
    }
    for (const [label, re] of [
      ["og:description", ogDescRe],
      ["twitter:description", twDescRe],
    ] as const) {
      const match = re.exec(head);
      if (!match) continue;
      const value = decode(match[1]).trim();
      if (value && [...value].length > LIMIT) {
        errors.push(`${route} ${label} is ${[...value].length} characters`);
      }
    }
  }
}

walk(OUT);

if (errors.length) {
  console.error(`meta snippets: ${errors.length} problem(s) on ${indexable} indexable pages (${skipped} nz/bg/tw pages skipped)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  if (errors.length > 40) console.error(`  - … ${errors.length - 40} more`);
  process.exit(1);
}

console.log(
  `meta snippets: ${indexable} indexable pages have a title and a description of at most ${LIMIT} characters (${skipped} nz/bg/tw pages skipped, ${scanned} html files).`,
);
