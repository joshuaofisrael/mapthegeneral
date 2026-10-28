/**
 * Owner-approved exception: thin municipality pages (population under 20,000)
 * are noindex and omitted from the sitemap outside a country's election window.
 * Country, region, election, results, larger-city and in-window pages must
 * stay indexable. A noindex on any other page fails the build. Redirect stubs
 * keep their existing noindex.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { isRedirectStub } from "../src/lib/adsense";
import {
  addCalendarDays,
  calendarStatus,
  countryInElectionWindow,
  ELECTION_INDEX_RADIUS_DAYS,
  indexingAsOf,
  isThinMunicipality,
  reliablePollingDays,
  thinMunicipalityExcluded,
  thinMunicipalityPaths,
  thinPagesIndexed,
  THIN_POPULATION_UNDER,
} from "../src/lib/indexing-policy";
import { allPublicPaths } from "../src/lib/routes";
import { SITE } from "../src/data/site";

const OUT = path.join(process.cwd(), "out");
const errors: string[] = [];
const AS_OF = indexingAsOf();

function selfTest(): void {
  if (THIN_POPULATION_UNDER !== 20_000) errors.push("threshold must stay under 20,000");
  if (ELECTION_INDEX_RADIUS_DAYS !== 92) errors.push("election window must be 92 days either side");
  if (addCalendarDays("2026-11-07", -92) !== "2026-08-07") errors.push("92 days before 7 November 2026");
  if (addCalendarDays("2026-11-07", 92) !== "2027-02-07") errors.push("92 days after 7 November 2026");
  if (addCalendarDays("2027-06-06", -92) !== "2027-03-06") errors.push("92 days before 6 June 2027");

  const nz = reliablePollingDays("nz");
  if (!nz.includes("2026-11-07")) errors.push(`NZ calendar missing 2026-11-07: ${nz.join(",")}`);
  if (!countryInElectionWindow("nz", "2026-10-28")) errors.push("NZ is in window on 28 October 2026");
  if (countryInElectionWindow("nz", "2026-08-06")) errors.push("NZ window starts on 7 August 2026");
  if (!countryInElectionWindow("nz", "2026-08-07")) errors.push("NZ window includes 7 August 2026");
  if (!countryInElectionWindow("es", "2026-10-28")) errors.push("Spain is in window on 28 October 2026");
  if (countryInElectionWindow("mx", "2026-10-28")) errors.push("Mexico is outside the window on 28 October 2026");
  if (!countryInElectionWindow("mx", "2027-03-06")) errors.push("Mexico window opens on 6 March 2027");
  if (countryInElectionWindow("mx", "2027-03-05")) errors.push("Mexico window does not include 5 March 2027");
  if (!thinPagesIndexed("gb", "2026-10-28")) errors.push("UK has no reliable polling day and stays indexed");
  if (!thinPagesIndexed("bg", "2026-10-28")) errors.push("Bulgaria's possible round is not a reliable day");
  if (reliablePollingDays("bg").length !== 0) errors.push("Bulgaria should not contribute a reliable day");

  const thin = thinMunicipalityPaths();
  const mx = [...thin].filter((route) => route.startsWith("/mx/"));
  const es = [...thin].filter((route) => route.startsWith("/es/"));
  if (mx.length < 1000) errors.push(`expected Mexican thin pages, found ${mx.length}`);
  if (es.length < 1000) errors.push(`expected Spanish thin pages, found ${es.length}`);
  if (!thinMunicipalityExcluded(mx[0], "2026-10-28")) errors.push(`${mx[0]} should be excluded on 28 October 2026`);
  if (thinMunicipalityExcluded(es[0], "2026-10-28")) errors.push(`${es[0]} should stay indexed inside Spain's window`);
  if (isThinMunicipality("/mx/en/") || isThinMunicipality("/es/en/results/") || isThinMunicipality("/mx/en/elections/diputaciones-federales-2027/")) {
    errors.push("country, results, or election page was classified as a thin municipality");
  }
  if (thinPagesIndexed("au", "2026-10-28") !== countryInElectionWindow("au", "2026-10-28")) {
    errors.push("Australia has a reliable calendar, so indexing follows the window");
  }
}

function routeOf(file: string): string {
  const rel = path.relative(OUT, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (rel.endsWith("/index.html")) return `/${rel.slice(0, -"index.html".length)}`;
  if (rel.endsWith(".html")) return `/${rel.slice(0, -".html".length)}/`;
  return `/${rel}`;
}

function htmlFile(route: string): string {
  if (route === "/") return path.join(OUT, "index.html");
  return path.join(OUT, route.replace(/^\/+|\/+$/g, ""), "index.html");
}

function robotsContent(html: string): string | null {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? html.slice(0, 8000);
  return head.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] ?? null;
}

function walkHtml(dir: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir)) {
    if (name === "_next") continue;
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) found.push(...walkHtml(full));
    else if (name.endsWith(".html")) found.push(full);
  }
  return found;
}

function sitemapPaths(): Set<string> {
  const set = new Set<string>();
  const dir = path.join(OUT, "sitemaps");
  const base = SITE.url.replace(/\/+$/, "");
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".xml")) continue;
    const xml = readFileSync(path.join(dir, name), "utf8");
    for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      let loc = match[1];
      if (loc.startsWith(base)) loc = loc.slice(base.length) || "/";
      if (!loc.startsWith("/")) loc = `/${loc}`;
      if (loc !== "/" && !loc.endsWith("/")) loc = `${loc}/`;
      set.add(loc);
    }
  }
  return set;
}

selfTest();

if (process.argv.includes("--self-test")) {
  if (errors.length) {
    console.error(`indexing-policy self-test: ${errors.length} problem(s)`);
    for (const line of errors) console.error(`  - ${line}`);
    process.exit(1);
  }
  const status = calendarStatus("2026-10-28");
  console.log(
    `indexing-policy self-test ok. On 2026-10-28 in window: ${status.inWindow.map((row) => row.country).join(", ")}. Outside: ${status.outsideWindow.map((row) => row.country).join(", ")}. Unreliable: ${status.unreliable.join(", ")}.`,
  );
  process.exit(0);
}

if (!existsSync(OUT)) {
  errors.push("out/ is missing; this check runs after the static export");
} else {
  const listed = sitemapPaths();
  const publicPaths = allPublicPaths();
  const excluded = new Set<string>();
  for (const route of thinMunicipalityPaths()) {
    const file = htmlFile(route);
    const outside = thinMunicipalityExcluded(route, AS_OF);
    if (outside) excluded.add(route);
    if (!existsSync(file)) {
      errors.push(`${route} has no exported page`);
      continue;
    }
    const robots = robotsContent(readFileSync(file, "utf8"));
    if (outside) {
      if (robots !== "noindex,follow") errors.push(`${route} should be noindex,follow, got ${robots ?? "no robots meta"}`);
      if (listed.has(route)) errors.push(`${route} is thin and outside the window but still in the sitemap`);
    } else if (robots && /noindex/i.test(robots)) {
      errors.push(`${route} is in the election window but noindexed`);
    } else if (!listed.has(route)) {
      errors.push(`${route} is in the election window but missing from the sitemap`);
    }
  }

  for (const route of publicPaths) {
    if (excluded.has(route)) continue;
    if (!listed.has(route)) errors.push(`${route} is always indexed but missing from the sitemap`);
  }

  const published = new Set(publicPaths);
  const files = walkHtml(OUT);
  let accidental = 0;
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const robots = robotsContent(html);
    if (!robots || !/noindex/i.test(robots)) continue;
    if (isRedirectStub(html)) continue;
    const route = routeOf(file);
    // 404 and the Israel embed are noindex on purpose and are not public index pages.
    if (!published.has(route) || excluded.has(route)) continue;
    accidental++;
    if (accidental <= 20) errors.push(`${route} is noindex but is not a thin municipality outside the election window`);
  }
  if (accidental > 20) errors.push(`and ${accidental - 20} more accidental noindex page(s)`);
}

if (errors.length) {
  console.error(`indexing-policy: ${errors.length} problem(s) on ${AS_OF}`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

const status = calendarStatus(AS_OF);
const inWindow = status.inWindow.map((row) => `${row.country} (${row.activeDays.join(", ")})`).join(", ");
const outside = status.outsideWindow.map((row) => `${row.country} (${row.pollingDays.join(", ")})`).join(", ");
console.log(
  `indexing-policy: thin municipalities under ${THIN_POPULATION_UNDER} may be noindex outside ±${ELECTION_INDEX_RADIUS_DAYS} days (${AS_OF}). In window: ${inWindow}. Outside: ${outside}. Unreliable calendars stay indexed: ${status.unreliable.join(", ")}.`,
);
