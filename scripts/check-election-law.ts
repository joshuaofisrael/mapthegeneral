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
import { RELEASE_POLICIES } from "../src/data/election-policy";
import { releaseRow } from "../src/data/release-status";
import { ianaOffset, offsetMatchesZone } from "../src/data/zone-offset";
import { registryCountries } from "../src/lib/country-registry";

const OUT = path.join(process.cwd(), "out");
const now = Date.now();
const errors: string[] = [];
const ISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

for (const item of ELECTION_WINDOWS) {
  const policy = RELEASE_POLICIES[item.id];
  if (!policy) errors.push(`${item.id}: missing statutory/official/editorial policy fields`);
  if (!ISO.test(item.trackerOpensAt)) errors.push(`${item.id}: trackerOpensAt needs an explicit UTC offset`);
  if (policy && !offsetMatchesZone(item.trackerOpensAt, policy.timeZone)) {
    errors.push(`${item.id}: trackerOpensAt offset does not match ${policy.timeZone}`);
  }
  if (!item.officialResults.url.startsWith("https://")) errors.push(`${item.id}: official results URL must be https`);
  if (policy) {
    for (const stamp of [policy.officialRelease.at, policy.editorial.holdUntil, policy.editorial.startsAt]) {
      if (!ISO.test(stamp)) errors.push(`${item.id}: policy time needs an explicit UTC offset (${stamp})`);
      else if (!offsetMatchesZone(stamp, policy.timeZone)) {
        errors.push(`${item.id}: ${stamp} is not the ${policy.timeZone} offset`);
      }
    }
    if (Date.parse(policy.editorial.holdUntil) < Date.parse(policy.officialRelease.at)) {
      errors.push(`${item.id}: editorial hold ends before the official release`);
    }
    if (!policy.officialRelease.citation.url.startsWith("https://")) {
      errors.push(`${item.id}: official release citation must be https`);
    }
    if (policy.requiresEndOfVotingConfirmation) {
      const row = releaseRow(item.id);
      if (!row || typeof row.votingEnded !== "boolean") {
        errors.push(`${item.id}: end-of-voting confirmation is missing; the gate stays closed`);
      }
    }
  }
  for (const rule of item.rules) {
    if (!ISO.test(rule.start) || !ISO.test(rule.end)) errors.push(`${item.id}/${rule.kind}: times need explicit UTC offsets`);
    if (policy && ISO.test(rule.start) && !offsetMatchesZone(rule.start, policy.timeZone)) {
      errors.push(`${item.id}/${rule.kind}: start is not the ${policy.timeZone} offset`);
    }
    if (policy && ISO.test(rule.end) && !offsetMatchesZone(rule.end, policy.timeZone)) {
      errors.push(`${item.id}/${rule.kind}: end is not the ${policy.timeZone} offset`);
    }
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

const ilLabel = "Seat numbers are copied from a named media report of the partial count; this site does not calculate seats. Unofficial and not final.";
const ilLabelHe = "מספרי המנדטים הועתקו מדיווח תקשורתי שצוין בשמו על הספירה החלקית; האתר אינו מחשב מנדטים. לא רשמי ולא סופי.";

const IL_EXIT_OPEN = Date.parse("2026-10-27T22:00:00+02:00");
const IL_EXIT_SECTION = /<section\b[^>]*\bdata-il-exit-polls\b[^>]*>[\s\S]*?<\/section>/i;
const IL_EXIT_DISCLAIMER_EN =
  "These are unofficial TV seat samples published by television channels, not official results. Official results come only from the Central Elections Committee.";
const IL_EXIT_DISCLAIMER_HE =
  "אלה תחזיות לא רשמיות של מדגמי טלוויזיה שפרסמו ערוצי הטלוויזיה, לא תוצאות רשמיות. התוצאות הרשמיות מגיעות רק מוועדת הבחירות המרכזית.";

function exitPollSeats() {
  const file = path.join(process.cwd(), "src/data/il-2026-exit-polls.json");
  const doc = JSON.parse(readFileSync(file, "utf8")) as {
    polls?: { id?: string; sources?: { url?: string }[]; seats?: Record<string, number> }[];
  };
  for (const poll of doc.polls ?? []) {
    const seats = poll.seats ?? {};
    const values = Object.values(seats);
    const sum = values.reduce((total, value) => total + value, 0);
    if (!values.length || values.some((value) => !Number.isInteger(value) || value < 0) || sum !== 120) {
      errors.push(`${poll.id ?? "sample"}: seat counts must be whole numbers that add up to 120`);
    }
    if (!poll.sources?.length || poll.sources.some((source) => !source.url?.startsWith("https://"))) {
      errors.push(`${poll.id ?? "sample"}: each sample needs an https source`);
    }
  }
}

if (Date.parse("2026-10-27T21:59:00+02:00") >= IL_EXIT_OPEN) errors.push("Israel television samples open before 22:00");
if (Date.parse("2026-10-27T22:00:00+02:00") < IL_EXIT_OPEN) errors.push("Israel television samples stay closed at 22:00");
if (Date.now() >= IL_EXIT_OPEN) exitPollSeats();

function withoutIlExitSection(file: string, html: string): string {
  const rel = file.split(path.sep).join("/");
  const isIlResults = /il\/(?:en|he)\/results\/index\.html$/.test(rel);
  if (!isIlResults) return html;
  const has = html.includes("data-il-exit-polls");
  const open = Date.now() >= IL_EXIT_OPEN;
  const label = path.relative(OUT, file);
  if (has && !open) {
    errors.push(`${label}: television sample section is present before 22:00 Israel time`);
    return html;
  }
  if (!has && open) {
    errors.push(`${label}: television sample section is missing after 22:00 Israel time`);
    return html;
  }
  if (has && open) {
    if (!html.includes(IL_EXIT_DISCLAIMER_EN) || !html.includes(IL_EXIT_DISCLAIMER_HE)) {
      errors.push(`${label}: television sample section is missing the disclaimer`);
    }
    return html.replace(IL_EXIT_SECTION, "");
  }
  return html;
}

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
    const text = withoutIlExitSection(
      full,
      readFileSync(full, "utf8")
        .replace(/<script[\s\S]*?<\/script>/g, "")
        .replace(/<style[\s\S]*?<\/style>/g, ""),
    );
    const match = text.match(POLL_FIGURE);
    if (match) errors.push(`${path.relative(OUT, full)}: poll-like figure "${match[0].slice(0, 160)}"`);
  }
}

if (existsSync(OUT)) {
  walk(OUT);
  const enPage = path.join(OUT, "il/en/results/index.html");
  const hePage = path.join(OUT, "il/he/results/index.html");
  const imprintPage = path.join(OUT, "imprint/index.html");
  if (existsSync(enPage) && !readFileSync(enPage, "utf8").includes(ilLabel)) {
    errors.push("built /il/en/results/ is missing the unofficial seat label");
  }
  if (existsSync(hePage) && !readFileSync(hePage, "utf8").includes(ilLabelHe)) {
    errors.push("built /il/he/results/ is missing the Hebrew seat label");
  }
  if (existsSync(imprintPage)) {
    const imprintHtml = readFileSync(imprintPage, "utf8");
    if (imprintHtml.includes("electoral advertising blackout for broadcasters")) {
      errors.push("imprint still cites the Broadcasting Services Act blackout as the results hold");
    }
    if (!imprintHtml.includes("conservative editorial policy")) {
      errors.push("imprint does not describe the results hold as editorial policy");
    }
  }
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

for (const id of Object.keys(RELEASE_POLICIES)) {
  if (!ELECTION_WINDOWS.some((item) => item.id === id)) errors.push(`${id}: policy without an election window`);
}

const mx = ELECTION_WINDOWS.find((item) => item.id === "mx-2027-federal");
const mxPolicy = RELEASE_POLICIES["mx-2027-federal"];
if (mx && mxPolicy) {
  const instant = Date.parse(mx.trackerOpensAt);
  const west = ianaOffset("America/Tijuana", instant);
  const city = ianaOffset("America/Mexico_City", instant);
  if (west && city && west !== city) {
    const stamps = [mx.trackerOpensAt, mxPolicy.officialRelease.at, mxPolicy.editorial.holdUntil, ...mx.rules.map((rule) => rule.end)];
    for (const stamp of stamps) {
      if (stamp.endsWith(city)) errors.push(`mx-2027-federal: release ${stamp} uses Mexico City time`);
      if (!stamp.endsWith(west)) errors.push(`mx-2027-federal: release ${stamp} is not America/Tijuana`);
    }
  }
  if (mxPolicy.timeZone !== "America/Tijuana") errors.push("mx-2027-federal: time zone must be the westernmost zone, America/Tijuana");
}

if (trackerOpen("il-2026-knesset", Date.parse("2026-10-27T21:59:00+02:00"))) {
  errors.push("Israel tracker opens before 22:00 Israel time");
}
if (!trackerOpen("il-2026-knesset", Date.parse("2026-10-27T22:00:00+02:00"))) {
  errors.push("Israel tracker stays closed at 22:00 Israel time");
}
if (trackerOpen("bg-2026-11-01", Date.parse("2026-11-01T21:00:00+02:00"))) {
  errors.push("Bulgaria tracker opened on the clock without CEC confirmation");
}
if (trackerOpen("unknown-election", Date.parse("2026-11-01T21:00:00+02:00"))) {
  errors.push("unknown tracker opened");
}

const ilCopy = readFileSync(path.join(process.cwd(), "src/data/il-results.ts"), "utf8");
if (!ilCopy.includes(ilLabel)) errors.push("Israel English seat label missing from il-results");
if (!ilCopy.includes(ilLabelHe)) errors.push("Israel Hebrew seat label missing from il-results");
for (const rel of ["src/components/IlLiveResults.tsx", "src/components/IlEmbed.tsx", "src/components/IlResultsPage.tsx", "scripts/il-live/snapshot.mjs"]) {
  const text = readFileSync(path.join(process.cwd(), rel), "utf8");
  if (!text.includes(ilLabel) && !text.includes("IL_SEAT_LABEL")) errors.push(`${rel}: seat label is not wired through`);
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
