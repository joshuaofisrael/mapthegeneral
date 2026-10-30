/**
 * Chieti (Italy) publishing hold. Starts 00:00 Rome time on 31 October 2026
 * (23:00 London, 30 October), the start of the Law 28/2000 art. 8 poll blackout.
 * It does not lift on a clock: it stays on until data/release-status.json sets
 * "it-2026-chieti".votingEnded to true. While on, Chieti election content must
 * match the sealed baseline, so nothing new is published and no poll or count appears.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import { nightById } from "../src/data/election-night";
import { RELEASE_POLICIES } from "../src/data/election-policy";
import { profileById } from "../src/data/election-seo";
import { EDITORIAL_PREVIEWS } from "../src/data/editorial";
import { releaseRow, votingEndedConfirmed } from "../src/data/release-status";

export const CHIETI_ID = "it-2026-chieti";
export const CHIETI_HOLD_START = "2026-10-30T23:00:00Z";
const FILES = [
  "src/data/candidates/camera-chieti-2026.json",
  "src/app/it/[lang]/elections/[slug]/page.tsx",
  "src/app/it/[lang]/results/page.tsx",
];
/** Sealed baseline. Update only before the hold starts or after votingEnded is true. */
const SEAL = "1a4617105de12c7828705e71c8d47abb4ffff0eac1f9a78e0e21b6b25ff34f97";

export function chietiHoldActive(now = Date.now()): boolean {
  return now >= Date.parse(CHIETI_HOLD_START) && !votingEndedConfirmed(CHIETI_ID);
}

function digest(): string {
  const parts = FILES.map((rel) => `${rel}\n${createHash("sha256").update(readFileSync(path.join(process.cwd(), rel))).digest("hex")}`);
  parts.push(`window\n${JSON.stringify(ELECTION_WINDOWS.find((w) => w.id === CHIETI_ID))}`);
  parts.push(`policy\n${JSON.stringify(RELEASE_POLICIES[CHIETI_ID])}`);
  parts.push(`night\n${JSON.stringify(nightById(CHIETI_ID))}`);
  parts.push(`seo\n${JSON.stringify(profileById(CHIETI_ID))}`);
  const previews = EDITORIAL_PREVIEWS.filter((p) => p.path.startsWith("/it/") || /chieti/i.test(JSON.stringify(p)));
  parts.push(`editorial\n${JSON.stringify(previews)}`);
  return createHash("sha256").update(parts.join("\n")).digest("hex");
}

const errors: string[] = [];
const row = releaseRow(CHIETI_ID);
if (!row || typeof row.votingEnded !== "boolean") errors.push("release-status row for it-2026-chieti is missing");
if (RELEASE_POLICIES[CHIETI_ID]?.requiresEndOfVotingConfirmation !== true) errors.push("Chieti count is not gated on official confirmation");
if (Date.parse(RELEASE_POLICIES[CHIETI_ID]?.editorial.startsAt ?? "") !== Date.parse(CHIETI_HOLD_START)) errors.push("Chieti editorial hold does not start at 00:00 Rome time on 31 October");
const pings: string[] = JSON.parse(readFileSync(path.join(process.cwd(), "public/search/indexnow-urls.json"), "utf8"));
if (!votingEndedConfirmed(CHIETI_ID) && pings.some((u) => new URL(u).pathname.startsWith("/it/"))) errors.push("IndexNow list still carries Italian URLs during the Chieti hold");
if (chietiHoldActive(Date.parse("2026-10-30T22:59:00Z"))) errors.push("hold starts early");
if (!votingEndedConfirmed(CHIETI_ID) && !chietiHoldActive(Date.parse("2026-10-30T23:00:00Z"))) errors.push("hold misses 00:00 Rome 31 Oct");
if (!votingEndedConfirmed(CHIETI_ID) && !chietiHoldActive(Date.parse("2026-12-31T00:00:00Z"))) errors.push("hold lifts on the clock without votingEnded");
const d = digest();
if (process.env.PRINT_CHIETI_SEAL === "1") {
  console.log(d);
  process.exit(0);
}
if (chietiHoldActive() && d !== SEAL) {
  errors.push(`Chieti election content changed during the publishing hold (digest ${d}). Nothing new may be published until it-2026-chieti.votingEnded is true.`);
}
if (errors.length) {
  console.error(`chieti-hold: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`chieti-hold: ${chietiHoldActive() ? "ON" : "not active"}; starts ${CHIETI_HOLD_START}, lifts only on votingEnded=true.`);
