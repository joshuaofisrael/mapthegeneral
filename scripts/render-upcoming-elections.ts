/**
 * Writes the static election pages in the SEO registry.
 * A profile is logged as active when its polling day is inside 60 days,
 * or when polling day was in the previous 14 days.
 * Profiles outside that window are still rendered: the page stays up, and
 * the home list is what the window controls.
 * Run this after scripts/render-ca-level2.ts. That script deletes public/ca,
 * and public/ca is gitignored, so an earlier write would not survive the build.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import {
  ELECTION_SEO_PROFILES,
  ELECTION_SEO_RECENT_DAYS,
  ELECTION_SEO_WINDOW_DAYS,
  isListedElection,
  utcToday,
} from "../src/data/election-seo";
import { renderElectionHtml } from "../src/lib/election-seo-html";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const asOf = utcToday();
const profiled = new Set(ELECTION_SEO_PROFILES.map((profile) => profile.id));

for (const profile of ELECTION_SEO_PROFILES) {
  const window = ELECTION_WINDOWS.find((item) => item.id === profile.id);
  if (!window) throw new Error(`${profile.id} is not in the election-law registry`);
  if (window.pollingDay !== profile.pollingDay) {
    throw new Error(`${profile.id} polling day ${profile.pollingDay} does not match the registry (${window.pollingDay})`);
  }
  if (profile.endDate !== window.trackerOpensAt) {
    throw new Error(`${profile.id} endDate ${profile.endDate} does not match tracker close ${window.trackerOpensAt}`);
  }
  for (const page of profile.pages) {
    const html = renderElectionHtml(profile, page, root);
    const file = join(root, "public", page.path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`election-seo: wrote ${page.path}`);
  }
}

const due = ELECTION_WINDOWS.filter((item) =>
  isListedElection(item.pollingDay, asOf, ELECTION_SEO_WINDOW_DAYS, ELECTION_SEO_RECENT_DAYS),
);
const missing = due.filter((item) => !profiled.has(item.id)).map((item) => item.id);
console.log(
  `election-seo: ${due.filter((item) => profiled.has(item.id)).map((item) => item.id).join(", ") || "none"} within ${ELECTION_SEO_WINDOW_DAYS} days of ${asOf}, or held in the previous ${ELECTION_SEO_RECENT_DAYS} days`,
);
if (missing.length) {
  console.log(
    `election-seo: inside the home window but no SEO profile yet: ${missing.join(", ")}`,
  );
}
