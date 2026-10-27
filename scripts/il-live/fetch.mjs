// Scheduled fetcher for the Israel live results page (GitHub Action
// il-live-results.yml). Reads ONLY the Central Elections Committee results
// CSV, writes <outDir>/results.json, and reports whether the count changed.
//
//   node scripts/il-live/fetch.mjs <outDir>
//
// Env: IL_RESULTS_CSV_URL  override/extra CEC CSV URL(s), comma separated
//      IL_RESULTS_FINAL=1  label the count final (set only after the CEC
//                          publishes the final results)
// Legal: before polls close (trackerOpensAt) nothing is fetched and the file
// carries no counts. Polls and exit polls are never read.
import { existsSync, readFileSync, mkdirSync, appendFileSync } from "node:fs";
import path from "node:path";
import { decode, totalCsv, buildDoc } from "./lib.mjs";
import { LegalHoldError, publishFile } from "../publish-gate.mjs";

const meta = JSON.parse(readFileSync(new URL("../../src/data/il-knesset-2026.json", import.meta.url), "utf8"));
export const TRACKER_OPENS_AT = "2026-10-27T22:00:00+02:00";
const ELIGIBLE = 7331981; // CEC, via ynet 2026
const BALLOT_BOXES = 12018; // CEC polling stations, via ynet 2026
const DEFAULT_URLS = [
  "https://media26.bechirot.gov.il/files/expc.csv",
  "https://media.bechirot.gov.il/files/expc.csv",
];
const ALLOWED_HOST = /(^|\.)bechirot\.gov\.il$/;

const outDir = process.argv[2] ?? "il-live-out";
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "results.json");
// Local dry runs only (ignored inside GitHub Actions): IL_LIVE_NOW fakes the
// clock and IL_LIVE_FILE reads a saved CEC CSV, e.g. the 2022 fixture.
const local = process.env.GITHUB_ACTIONS !== "true";
const now = local && process.env.IL_LIVE_NOW ? new Date(process.env.IL_LIVE_NOW) : new Date();
const prev = existsSync(outFile) ? JSON.parse(readFileSync(outFile, "utf8")) : null;

function setOutput(k, v) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${k}=${v}\n`);
  console.log(`${k}=${v}`);
}
const fingerprint = (d) => (d ? JSON.stringify([d.stage, d.units, d.voters, d.valid, (d.results ?? []).map((p) => [p.letter, p.votes])]) : "");

function write(doc) {
  const changed = fingerprint(doc) !== fingerprint(prev);
  if (changed || !prev) publishFile(outFile, JSON.stringify(doc, null, 1) + "\n");
  setOutput("changed", changed ? "true" : "false");
  setOutput("stage", doc.stage);
  setOutput("units", doc.units ?? 0);
}

const base = {
  schema: 1,
  election: "il-2026-knesset",
  trackerOpensAt: TRACKER_OPENS_AT,
  eligibleTotal: ELIGIBLE,
  ballotBoxesTotal: BALLOT_BOXES,
};

function publicationBlocked() {
  try {
    const all = JSON.parse(readFileSync(new URL("../../data/release-status.json", import.meta.url), "utf8"));
    if (all["il-2026-knesset"]?.pollingExtended === true) return "polling extended";
    return null;
  } catch {
    return "release-status missing";
  }
}

const blocked = publicationBlocked();
if (now < new Date(TRACKER_OPENS_AT) || blocked) {
  write({ ...base, stage: "pre", fetchedAt: null, results: [] });
  console.log(blocked ? `closed: ${blocked}; no fetch, no counts` : "polls still open: no fetch, no counts");
  process.exit(0);
}

const urls = [...(process.env.IL_RESULTS_CSV_URL ?? "").split(","), ...DEFAULT_URLS]
  .map((u) => u.trim()).filter(Boolean)
  .filter((u) => { try { const h = new URL(u); return h.protocol === "https:" && ALLOWED_HOST.test(h.hostname); } catch { return false; } });

let lastErr = "no URL";
if (local && process.env.IL_LIVE_FILE) urls.unshift(`file:${process.env.IL_LIVE_FILE}`);
for (const url of urls) {
  try {
    const res = url.startsWith("file:")
      ? new Response(readFileSync(url.slice(5)), { headers: { "last-modified": new Date().toUTCString() } })
      : await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
      signal: AbortSignal.timeout(45_000),
      headers: { "user-agent": "mapthegeneral.com results page (+https://mapthegeneral.com/il/he/results/)", accept: "text/csv,*/*" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const total = totalCsv(decode(await res.arrayBuffer()));
    if (total.valid <= 0) throw new Error("no valid votes yet");
    const unknown = Object.keys(total.votes).filter((k) => !meta.parties[k] && total.votes[k] > 0);
    if (unknown.length) console.warn(`letters not in candidate list: ${unknown.join(", ")}`);
    const doc = buildDoc(total, {
      parties: meta.parties,
      agreements: meta.agreements,
      eligibleTotal: ELIGIBLE,
      ballotBoxesTotal: BALLOT_BOXES,
      source: url,
      sourceUpdated: res.headers.get("last-modified"),
      fetchedAt: now.toISOString(),
      stage: process.env.IL_RESULTS_FINAL === "1" ? "final" : "preliminary",
    });
    write({ ...base, ...doc });
    console.log(`ok ${url}: ${total.units} rows, ${total.valid} valid votes`);
    process.exit(0);
  } catch (e) {
    if (e instanceof LegalHoldError || e.legalHold) throw e;
    lastErr = `${url}: ${e.message}`;
    console.warn(`skip ${lastErr}`);
  }
}
// A failed feed publishes no counts. Do not keep a previous estimate.
write({ ...base, stage: "awaiting", fetchedAt: now.toISOString(), results: [] });
console.warn(`no CEC CSV available (${lastErr}); no counts published`);
