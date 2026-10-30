/**
 * New Zealand content freeze, 00:00–19:00 NZDT on 7 November 2026.
 * Outside the window a drift fails the build so the sealed baseline stays
 * current. Inside the window the same drift fails and must not be cleared
 * by editing New Zealand pages.
 */
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { NZ_COUNTRY_HUB } from "../src/data/country-hubs";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import { nightById } from "../src/data/election-night";
import { RELEASE_POLICIES } from "../src/data/election-policy";
import { NZ_FREEZE_END, NZ_FREEZE_START, NZ_WINDOW_ID, nzFreezeActive } from "../src/data/nz-freeze";

const FILES = [
  "src/data/election-seo-nz.ts",
  "src/data/candidates/nz-general-2026.json",
  "src/data/candidates/nz-electorates-2026.json",
  "src/countries/nz.json",
  "src/data/editorial/batch5.ts",
  "data/review/nz-2026-11-07.md",
];

/** Sealed baseline. Update only outside the freeze, in the same commit as a real New Zealand edit. */
const SEAL = "b59d18139937e36b9637d2d3eb880e6e3f065dcba2b921a4347430f9c1af951c";

function fileHash(rel: string): string {
  const bytes = readFileSync(path.join(process.cwd(), rel));
  return createHash("sha256").update(bytes).digest("hex");
}

export function nzContentDigest(): string {
  const parts = FILES.map((rel) => `${rel}\n${fileHash(rel)}`);
  const window = ELECTION_WINDOWS.find((item) => item.id === NZ_WINDOW_ID);
  parts.push(`window\n${JSON.stringify(window)}`);
  parts.push(`policy\n${JSON.stringify(RELEASE_POLICIES[NZ_WINDOW_ID])}`);
  parts.push(`hub\n${JSON.stringify(NZ_COUNTRY_HUB)}`);
  parts.push(`night\n${JSON.stringify(nightById(NZ_WINDOW_ID))}`);
  return createHash("sha256").update(parts.join("\n")).digest("hex");
}

const errors: string[] = [];
if (Date.parse(NZ_FREEZE_END) - Date.parse(NZ_FREEZE_START) !== 19 * 3600e3) {
  errors.push("New Zealand freeze is not the 19-hour NZDT window");
}
if (nzFreezeActive(Date.parse("2026-11-06T10:59:00Z"))) errors.push("freeze starts early");
if (!nzFreezeActive(Date.parse("2026-11-06T11:00:00Z"))) errors.push("freeze misses 00:00 NZDT");
if (!nzFreezeActive(Date.parse("2026-11-07T05:59:00Z"))) errors.push("freeze ends early");
if (nzFreezeActive(Date.parse("2026-11-07T06:00:00Z"))) errors.push("freeze still on at 19:00 NZDT");

const workflow = readFileSync(path.join(process.cwd(), ".github/workflows/pages.yml"), "utf8");
if (!workflow.includes("2026-11-06T11:00:00+00:00") || !workflow.includes("2026-11-07T06:00:00+00:00")) {
  errors.push("IndexNow workflow is missing the New Zealand freeze window");
}
if (!workflow.includes('"/nz/"')) errors.push("IndexNow workflow does not drop New Zealand URLs");
if (RELEASE_POLICIES[NZ_WINDOW_ID]?.requiresEndOfVotingConfirmation !== true) {
  errors.push("New Zealand results are not gated on official confirmation that voting places have closed");
}

const digest = nzContentDigest();
if (process.env.PRINT_NZ_SEAL === "1") {
  console.log(digest);
  process.exit(0);
}
if (digest !== SEAL) {
  const when = nzFreezeActive() ? "during the freeze" : "before the freeze";
  errors.push(
    `New Zealand election content does not match the sealed baseline (${when}). Digest ${digest}. Do not change New Zealand pages, IndexNow, or promotion from 00:00 to 19:00 NZDT on 7 November 2026.`,
  );
}

if (errors.length) {
  console.error(`nz-freeze: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`nz-freeze: baseline sealed; window ${NZ_FREEZE_START} to ${NZ_FREEZE_END}.`);
