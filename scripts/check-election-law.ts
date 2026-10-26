/**
 * Build-time election-law guard. Runs after `next build` (postbuild).
 *
 * Fails the build when:
 *  1. a window in src/data/election-law.ts has a bad time, a non-https
 *     citation, or a rule that ends before it starts;
 *  2. any exported HTML page prints an opinion-poll, exit-poll or projection
 *     figure (Map the General publishes none, in any country);
 *  3. a live-tracker file `out/live/<window id>.json` carries vote counts
 *     before that window's tracker may open.
 * It also prints which windows are open at build time.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ELECTION_WINDOWS, STANDING_RULES, trackerOpen } from "../src/data/election-law";
import { registryCountries } from "../src/lib/country-registry";

const OUT = path.join(process.cwd(), "out");
const now = Date.now();
const errors: string[] = [];
const ISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

for (const item of ELECTION_WINDOWS) {
  if (!ISO.test(item.trackerOpensAt)) errors.push(`${item.id}: trackerOpensAt needs an explicit UTC offset`);
  if (!item.officialResults.url.startsWith("https://")) errors.push(`${item.id}: official results URL must be https`);
  for (const rule of item.rules) {
    if (!ISO.test(rule.start) || !ISO.test(rule.end)) errors.push(`${item.id}/${rule.kind}: times need explicit UTC offsets`);
    if (Date.parse(rule.end) <= Date.parse(rule.start)) errors.push(`${item.id}/${rule.kind}: ends before it starts`);
    if (!rule.citation.url.startsWith("https://")) errors.push(`${item.id}/${rule.kind}: citation must be https`);
    if (Date.parse(rule.end) > Date.parse(item.trackerOpensAt) + 6 * 3600e3) {
      errors.push(`${item.id}/${rule.kind}: rule ends long after trackerOpensAt; check the close-of-polls time`);
    }
    if (now >= Date.parse(rule.start) && now < Date.parse(rule.end)) {
      console.log(`election-law: OPEN NOW ${item.id} ${rule.kind} until ${rule.end}`);
    }
  }
}

const KW =
  "(?:opinion poll|voting intention|exit poll|sondage|sondaggi[oa]? (?:politic|elettoral)|encuesta|sondeo|sondaż|여론조사|umfrage|wählerbefragung|hochrechnung|kamuoyu araştırma|anket|世論調査|出口調査|prognos[ei]|seat projection|meningsmåling|meningsmaling|opinionsundersökning|opinionsundersokning|pobalbhreith)";
const PCT = "\\d{1,2}(?:[.,]\\d)?\\s?%";
const POLL_FIGURE = new RegExp(`${KW}[^<]{0,120}?${PCT}|${PCT}[^<]{0,120}?${KW}`, "i");

let scanned = 0;
function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    scanned++;
    const text = readFileSync(full, "utf8")
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<style[\s\S]*?<\/style>/g, "");
    const match = text.match(POLL_FIGURE);
    if (match) errors.push(`${path.relative(OUT, full)}: poll-like figure "${match[0].slice(0, 160)}"`);
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  for (const item of ELECTION_WINDOWS) {
    const file = path.join(OUT, "live", `${item.id}.json`);
    if (!existsSync(file) || trackerOpen(item.id, now)) continue;
    const data = JSON.parse(readFileSync(file, "utf8")) as { results?: unknown[] };
    if (Array.isArray(data.results) && data.results.length > 0) {
      errors.push(`${item.id}: live file has counts before ${item.trackerOpensAt}`);
    }
  }
}

const standingCountries = new Set<string>();
for (const rule of STANDING_RULES) {
  if (!/^[a-z]{2}$/.test(rule.country)) errors.push(`${rule.country}: standing rule needs a two-letter country code`);
  if (standingCountries.has(rule.country)) errors.push(`${rule.country}: duplicate standing rule`);
  standingCountries.add(rule.country);
  if (!rule.note.trim()) errors.push(`${rule.country}: standing rule needs a note`);
  if (!rule.citation.url.startsWith("https://")) errors.push(`${rule.country}: standing-rule citation must be https`);
}

const ISO_DAY = /^\d{4}-\d\d-\d\d$/;
const CHIETI_SOURCES = [
  "https://www.gazzettaufficiale.it/eli/id/2026/09/26/26A05139/sg",
  "https://dait.interno.gov.it/elezioni/speciale-elezioni",
  "https://prefettura.interno.gov.it/it/prefetture/chieti/comunicazioni/elezione-suppletiva-camera-deputati-15-16-novembre-2026",
  "https://elezioni.interno.gov.it/",
];

for (const item of ELECTION_WINDOWS) {
  if (!item.verified) continue;
  if (!ISO_DAY.test(item.verified.readOn)) errors.push(`${item.id}: verified.readOn is not a date`);
  if (item.verified.sources.length === 0) errors.push(`${item.id}: verified sources are empty`);
  for (const source of item.verified.sources) {
    if (!source.label.trim()) errors.push(`${item.id}: verified source needs a label`);
    if (!source.url.startsWith("https://")) errors.push(`${item.id}: verified source must be https`);
  }
}

const chieti = ELECTION_WINDOWS.find((item) => item.id === "it-2026-chieti");
const chietiUrls = new Set((chieti?.verified?.sources ?? []).map((source) => source.url.replace(/\/+$/, "")));
if (!chieti?.verified) errors.push("it-2026-chieti: registry entry is not marked verified");
for (const url of CHIETI_SOURCES) {
  if (!chietiUrls.has(url.replace(/\/+$/, ""))) errors.push(`it-2026-chieti: verified sources missing ${url}`);
}

const covered = new Set<string>([...ELECTION_WINDOWS.map((item) => item.country), ...standingCountries]);
for (const card of registryCountries()) {
  if (!covered.has(card.code)) {
    errors.push(`${card.code}: registry country has no election window and no standing rule`);
  }
}

if (errors.length) {
  console.error(`election-law: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 50)) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(
  `election-law: ${ELECTION_WINDOWS.length} windows valid; ${STANDING_RULES.length} standing rules; ${scanned} HTML files carry no poll figures.`,
);
