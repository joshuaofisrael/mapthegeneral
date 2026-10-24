/**
 * Writes the static election pages in the SEO registry.
 * Any profile whose polling day is inside 60 days is logged as active.
 * Profiles outside that window are still rendered: the page stays up, and
 * the home “upcoming” list is what the 60-day filter controls.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ELECTION_WINDOWS } from "../src/data/election-law";
import { ELECTION_SEO_PROFILES, ELECTION_SEO_WINDOW_DAYS, isWithinDays, utcToday } from "../src/data/election-seo";
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

const due = ELECTION_WINDOWS.filter((item) => isWithinDays(item.pollingDay, asOf, ELECTION_SEO_WINDOW_DAYS));
const missing = due.filter((item) => !profiled.has(item.id)).map((item) => item.id);
console.log(
  `election-seo: ${due.filter((item) => profiled.has(item.id)).map((item) => item.id).join(", ") || "none"} within ${ELECTION_SEO_WINDOW_DAYS} days of ${asOf}`,
);
if (missing.length) {
  console.log(`election-seo: within ${ELECTION_SEO_WINDOW_DAYS} days but no SEO profile yet: ${missing.join(", ")}`);
}
