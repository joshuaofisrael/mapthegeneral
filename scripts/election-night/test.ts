/**
 * Election-night gates: no counts before the tracker opens, feed hosts match
 * the official results URL, and the homepage picks the next contest.
 */
import { mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { ELECTION_WINDOWS } from "../../src/data/election-law";
import {
  NIGHT_ELECTIONS,
  activeNight,
  countsVisible,
  feedPath,
  nightOpensAt,
} from "../../src/data/election-night";
import { FEEDS, hostAllowed } from "./feeds.mjs";
import { acceptOfficial, OPENS, writeFeed } from "./fetch.mjs";

const errors: string[] = [];
const nightIds = NIGHT_ELECTIONS.map((item) => item.id);
const feedIds = FEEDS.map((feed) => feed.id);

for (const id of nightIds) {
  const window = ELECTION_WINDOWS.find((item) => item.id === id);
  if (!window) errors.push(`${id} missing from election law`);
  else if (nightOpensAt(id) !== window.trackerOpensAt) errors.push(`${id} opensAt drifted`);
}

for (const [id, opens] of Object.entries(OPENS as Record<string, string>)) {
  const window = ELECTION_WINDOWS.find((item) => item.id === id);
  if (!window) errors.push(`${id} in the fetcher is not an election window`);
  else if (window.trackerOpensAt !== opens) errors.push(`${id} fetcher opensAt drifted from election law`);
  if (!feedIds.includes(id)) errors.push(`${id} is in the fetcher but not in FEEDS`);
}

for (const feed of FEEDS) {
  if (!nightIds.includes(feed.id)) errors.push(`${feed.id} feed has no night card`);
  const window = ELECTION_WINDOWS.find((item) => item.id === feed.id);
  if (!window) continue;
  const host = new URL(window.officialResults.url).hostname;
  if (!hostAllowed(host, feed.hosts)) errors.push(`${feed.id} does not allow ${host}`);
  if (feedPath(feed.id) !== `/il-live/${feed.id}/results.json`) errors.push(`${feed.id} feed path`);
}
if (feedIds.includes("il-2026-knesset")) errors.push("Israel must stay on scripts/il-live");

const before = Date.parse("2026-11-06T10:59:00+00:00");
const after = Date.parse("2026-11-06T11:00:00+00:00");
if (countsVisible("ie-2026-seanad", before)) errors.push("Seanad count visible before 11:00");
if (!countsVisible("ie-2026-seanad", after)) errors.push("Seanad count hidden at 11:00");
if (countsVisible("pl-2026-senat-20", Date.parse("2026-11-22T20:59:00+01:00"))) {
  errors.push("Poland count visible during silence");
}
if (countsVisible("es-2026-generales", Date.parse("2026-11-29T20:30:00+01:00"))) {
  errors.push("Spain count visible before the Canary close");
}

const onElectionMorning = Date.parse("2026-10-27T12:00:00Z");
if (activeNight(onElectionMorning)?.id !== "il-2026-knesset") errors.push("27 Oct morning should surface Israel");
const afterIsrael = Date.parse("2026-10-29T12:00:00Z");
if (activeNight(afterIsrael)?.id !== "bg-2026-11-01") errors.push("after Israel night the next card should be Bulgaria");
const afterBulgaria = Date.parse("2026-11-03T12:00:00Z");
if (activeNight(afterBulgaria)?.id !== "ie-2026-seanad") errors.push("after the Bulgaria night the next card should be the Seanad");
const afterSeanad = Date.parse("2026-11-07T05:30:00Z");
if (activeNight(afterSeanad)?.id === "nz-2026-11-07") errors.push("New Zealand must not be promoted during its freeze");
if (activeNight(afterSeanad)?.id !== "it-2026-chieti") errors.push("during the New Zealand freeze the next card should not be New Zealand");
if (activeNight(Date.parse("2026-11-07T06:00:00Z"))?.id !== "nz-2026-11-07") {
  errors.push("New Zealand night should surface once the freeze ends at 19:00 NZDT");
}
if (countsVisible("nz-2026-11-07", Date.parse("2026-11-07T18:59:00+13:00"))) {
  errors.push("New Zealand count visible before 19:00");
}
if (countsVisible("bg-2026-11-01", Date.parse("2026-11-01T20:59:00+02:00"))) {
  errors.push("Bulgaria count visible before 21:00");
}
if (countsVisible("bg-2026-11-01", Date.parse("2026-11-01T21:00:00+02:00"))) {
  errors.push("Bulgaria count visible on the clock without CEC confirmation");
}
if (countsVisible("tw-2026-local", Date.parse("2026-11-28T23:59:00+08:00"))) {
  errors.push("Taiwan count visible before 00:00 on 29 November");
}
if (!countsVisible("tw-2026-local", Date.parse("2026-11-29T00:00:00+08:00"))) {
  errors.push("Taiwan count hidden at 00:00 on 29 November");
}
const victoriaHour = Date.parse("2026-11-28T08:00:00Z");
if (activeNight(victoriaHour)?.id !== "au-vic-2026") errors.push("28 Nov at 08:00Z should surface Victoria");
const taiwanHour = Date.parse("2026-11-28T16:30:00Z");
if (activeNight(taiwanHour)?.id !== "tw-2026-local") errors.push("28 Nov at 16:30Z should surface Taiwan");
const swissHour = Date.parse("2026-11-29T11:30:00Z");
if (activeNight(swissHour)?.id !== "ch-2026-11-29") errors.push("29 Nov at 12:30 CET should surface Switzerland");
const spainHour = Date.parse("2026-11-29T20:30:00Z");
if (activeNight(spainHour)?.id !== "es-2026-generales") errors.push("29 Nov after 21:00 CET should surface Spain");

if (acceptOfficial("ie-2026-seanad", { schema: 1, election: "ie-2026-seanad", stage: "pre", results: [{ name: "A", votes: 1 }] })) {
  errors.push("pre stage was accepted as a count");
}
if (acceptOfficial("ie-2026-seanad", { schema: 1, election: "other", stage: "preliminary", results: [{ name: "A", votes: 1 }] })) {
  errors.push("wrong election id was accepted");
}
const ok = acceptOfficial("ie-2026-seanad", {
  schema: 1,
  election: "ie-2026-seanad",
  stage: "preliminary",
  results: [{ name: "A", votes: 3, share: 60 }],
});
if (!ok || ok.results.length !== 1) errors.push("official schema was refused");

async function main(): Promise<void> {
const dir = mkdtempSync(path.join(tmpdir(), "night-"));
await writeFeed("ie-2026-seanad", dir, new Date("2026-11-06T10:00:00Z"));
const early = JSON.parse(readFileSync(path.join(dir, "ie-2026-seanad", "results.json"), "utf8")) as { stage: string; results: unknown[] };
if (early.stage !== "pre" || early.results.length !== 0) errors.push(`early file was ${early.stage} with ${early.results.length} rows`);

const client = readFileSync(path.join(process.cwd(), "public", "election-night.js"), "utf8");
if (!client.includes("now >= open")) errors.push("client is missing the open gate");
if (!client.includes("data-election-gate")) errors.push("client does not mark the count for the blackout gate");
if (client.includes("innerHTML")) errors.push("client writes HTML from the feed");

if (errors.length) {
  console.error(`election-night: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log("election-night: gates, hosts, and empty pre-close file ok.");
}

main();
