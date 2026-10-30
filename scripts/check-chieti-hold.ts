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
import { releaseRow, votingEndedConfirmed } from "../src/data/release-status";

export const CHIETI_ID = "it-2026-chieti";
export const CHIETI_HOLD_START = "2026-10-30T23:00:00Z";
const FILES = ["src/data/candidates/camera-chieti-2026.json"];
/** Sealed baseline. Update only before the hold starts or after votingEnded is true. */
const SEAL = "d25067bea51efc20031216d1d72c9a00660f35d3d6bd9f5d0a44685f5e9c1302";

export function chietiHoldActive(now = Date.now()): boolean {
  return now >= Date.parse(CHIETI_HOLD_START) && !votingEndedConfirmed(CHIETI_ID);
}

function digest(): string {
  const parts = FILES.map((rel) => `${rel}\n${createHash("sha256").update(readFileSync(path.join(process.cwd(), rel))).digest("hex")}`);
  parts.push(`window\n${JSON.stringify(ELECTION_WINDOWS.find((w) => w.id === CHIETI_ID))}`);
  parts.push(`policy\n${JSON.stringify(RELEASE_POLICIES[CHIETI_ID])}`);
  parts.push(`night\n${JSON.stringify(nightById(CHIETI_ID))}`);
  return createHash("sha256").update(parts.join("\n")).digest("hex");
}

const errors: string[] = [];
const row = releaseRow(CHIETI_ID);
if (!row || typeof row.votingEnded !== "boolean") errors.push("release-status row for it-2026-chieti is missing");
if (RELEASE_POLICIES[CHIETI_ID]?.requiresEndOfVotingConfirmation !== true) errors.push("Chieti count is not gated on official confirmation");
if (Date.parse(RELEASE_POLICIES[CHIETI_ID]?.editorial.startsAt ?? "") !== Date.parse(CHIETI_HOLD_START)) errors.push("Chieti editorial hold does not start at 00:00 Rome time on 31 October");
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
