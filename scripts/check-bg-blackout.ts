/**
 * Bulgaria presidential runoff, 1 November 2026. Polls close at 20:00 Bulgaria
 * time (CEC FAQ q03); article 220 allows queues to 21:00. Article 205 bars
 * survey results from 00:00 on 31 October until the end of voting is declared.
 * Fails the build if any gate would let a count, exit poll or estimate out early.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import { RELEASE_POLICIES } from "../src/data/election-policy";
import { votingEndedConfirmed } from "../src/data/release-status";
import { OPENS } from "./election-night/fetch.mjs";

const ID = "bg-2026-11-01";
const CLOSE = Date.parse("2026-11-01T20:00:00+02:00");
const BAN_START = Date.parse("2026-10-31T00:00:00+02:00");
const errors: string[] = [];

const win = ELECTION_WINDOWS.find((w) => w.id === ID);
if (!win) errors.push("Bulgaria window missing from election-law");
else {
  if (Date.parse(win.trackerOpensAt) < CLOSE) errors.push(`trackerOpensAt ${win.trackerOpensAt} is before 20:00 close`);
  const ban = win.rules.find((r) => r.kind === "poll-ban");
  if (!ban) errors.push("Bulgaria poll-ban rule missing");
  else {
    if (Date.parse(ban.start) > BAN_START) errors.push("poll ban starts after 00:00 31 Oct");
    if (Date.parse(ban.end) < CLOSE) errors.push("poll ban ends before 20:00 close");
  }
}
const pol = RELEASE_POLICIES[ID];
if (!pol) errors.push("Bulgaria release policy missing");
else if (pol.requiresEndOfVotingConfirmation !== true) errors.push("Bulgaria results not gated on CEC end-of-voting confirmation");
if (!OPENS[ID] || Date.parse(OPENS[ID]) < CLOSE) errors.push("election-night fetch opens before 20:00 close");

const now = Date.now();
if (votingEndedConfirmed(ID) && now < CLOSE) errors.push("release-status says Bulgaria voting ended before 20:00 close");

const cron = readFileSync(path.join(process.cwd(), ".github/workflows/election-night.yml"), "utf8");
for (const m of cron.matchAll(/cron:\s*"\*\/\d+ (\d+)-\d+ 1 11 \*"/g)) {
  if (Number(m[1]) < 18) errors.push(`election-night cron on 1 Nov starts at ${m[1]}:00Z, before 18:00Z close`);
}
const indexer = readFileSync(path.join(process.cwd(), "scripts/build-indexes.ts"), "utf8");
if (!indexer.includes('votingEndedConfirmed("bg-2026-11-01")') || !indexer.includes('path.startsWith("/bg/")')) {
  errors.push("IndexNow list builder does not drop Bulgaria URLs during the blackout");
}
try {
  const pinged: string[] = JSON.parse(readFileSync(path.join(process.cwd(), "public/search/indexnow-urls.json"), "utf8"));
  const now = Date.now();
  if (now >= Date.parse("2026-10-30T22:00:00Z") && !votingEndedConfirmed("bg-2026-11-01") && pinged.some((u) => /\/bg(\/|$)/.test(new URL(u).pathname))) {
    errors.push("public/search/indexnow-urls.json lists /bg/ URLs during the blackout");
  }
} catch {}

// Exported Bulgaria pages: no exit-poll, parallel-count or estimate figures before CEC confirmation.
const OUT = path.join(process.cwd(), "out", "bg");
const FIG = /(exit[- ]poll|екзитпол|паралелно преброяване|parallel count|estimate|прогноз|оценк)[^<]{0,120}\d{1,2}(?:[.,]\d)?\s?%/i;
let scanned = 0;
function walk(dir: string) {
  for (const n of readdirSync(dir)) {
    const f = path.join(dir, n);
    if (statSync(f).isDirectory()) { walk(f); continue; }
    if (!/\.(html|json|txt)$/.test(n)) continue;
    scanned++;
    const t = readFileSync(f, "utf8");
    if (FIG.test(t)) errors.push(`out/bg/${path.relative(OUT, f)}: exit-poll or estimate figure`);
  }
}
if (!votingEndedConfirmed(ID) && existsSync(OUT)) walk(OUT);

if (errors.length) {
  console.error(`bg-blackout: ${errors.length} problem(s)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`bg-blackout: gates hold to 20:00 Bulgaria time and CEC confirmation; ${scanned} Bulgaria files scanned.`);
