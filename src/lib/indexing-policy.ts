/**
 * Thin municipality pages stay live, with internal links intact, but are
 * `noindex,follow` and left out of the sitemaps unless the country is inside
 * an election window.
 *
 * Threshold (applied wherever this site stores a population figure):
 * a municipality page is thin when that figure is under 20,000. A figure of
 * 20,000 or more is a larger-city page and always stays indexed. A missing
 * figure is not treated as thin: Italy, Canada, Poland, Switzerland, Britain
 * and Australia do not store a municipality population, and those classes mix
 * larger cities with template pages. Marking the whole class thin would
 * noindex Rome, Toronto, Warsaw, Zürich or Brisbane. Country, region,
 * election, results, district and autonomous-city pages are not municipality
 * leaves, so they are never thin.
 *
 * Election window: 92 days before through 92 days after a reliable polling
 * day in `ELECTION_WINDOWS` (about three months either side). The day is
 * reliable when the calendar prints a concrete date and does not itself call
 * the election possible or uncalled. A missing `verified` block means the
 * law tracker has not attached calling instruments; it does not discard a
 * day the calendar states as fixed (Mexico 6 June 2027 is the case). A
 * country with no reliable day — the standing-rule countries, and Bulgaria's
 * "possible" round — keeps its thin pages indexed.
 *
 * Computed from the UTC build date so the daily deploy picks up the window.
 */

import { ELECTION_WINDOWS, STANDING_RULES } from "../data/election-law";
import { entitySlugFor, MUNICIPIOS } from "../data/mx/municipios";
import { pageMunicipalities } from "../data/spain/municipalities";

/** Population strictly under this value is a thin municipality page. */
export const THIN_POPULATION_UNDER = 20_000;

/** Days before and after polling day that thin pages are indexed again. */
export const ELECTION_INDEX_RADIUS_DAYS = 92;

const UNRELIABLE_TITLE = /\bpossible\b|\bno polling day\b|\bnot been called\b|\bhas not been called\b/i;

export function indexingAsOf(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addCalendarDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export function countryOfPath(path: string): string {
  return path.match(/^\/([a-z]{2})\//)?.[1] ?? "";
}

function titleOf(window: (typeof ELECTION_WINDOWS)[number]): string {
  return `${window.election.en} ${window.election.local ?? ""}`;
}

/** Concrete polling days the calendar treats as fixed for this country. */
export function reliablePollingDays(country: string): string[] {
  const days: string[] = [];
  for (const window of ELECTION_WINDOWS) {
    if (window.country !== country) continue;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(window.pollingDay)) continue;
    if (UNRELIABLE_TITLE.test(titleOf(window))) continue;
    if (!days.includes(window.pollingDay)) days.push(window.pollingDay);
  }
  return days.sort();
}

export function countryHasReliableCalendar(country: string): boolean {
  return reliablePollingDays(country).length > 0;
}

/** True when `asOf` falls on a reliable polling day or within 92 days either side. */
export function countryInElectionWindow(country: string, asOf = indexingAsOf()): boolean {
  for (const day of reliablePollingDays(country)) {
    const start = addCalendarDays(day, -ELECTION_INDEX_RADIUS_DAYS);
    const end = addCalendarDays(day, ELECTION_INDEX_RADIUS_DAYS);
    if (asOf >= start && asOf <= end) return true;
  }
  return false;
}

/**
 * True when thin pages in this country should be indexed: the calendar is
 * unreliable, or today is inside a reliable election window.
 */
export function thinPagesIndexed(country: string, asOf = indexingAsOf()): boolean {
  if (!countryHasReliableCalendar(country)) return true;
  return countryInElectionWindow(country, asOf);
}

function buildThinPaths(): Set<string> {
  const paths = new Set<string>();
  for (const municipality of pageMunicipalities()) {
    if (municipality.population >= THIN_POPULATION_UNDER) continue;
    for (const lang of ["en", "es"] as const) {
      paths.add(`/es/${lang}/${municipality.communitySlug}/${municipality.provinceSlug}/${municipality.slug}/`);
    }
  }
  for (const row of MUNICIPIOS) {
    if (row.population === null || row.population >= THIN_POPULATION_UNDER) continue;
    const entity = entitySlugFor(row);
    for (const lang of ["en", "es"] as const) {
      paths.add(`/mx/${lang}/${entity}/${row.slug}/`);
    }
  }
  return paths;
}

let thinPaths: Set<string> | null = null;

export function thinMunicipalityPaths(): Set<string> {
  thinPaths ??= buildThinPaths();
  return thinPaths;
}

export function isThinMunicipality(path: string): boolean {
  return thinMunicipalityPaths().has(path);
}

/** Thin, and the country's calendar is reliable and outside the window. */
/**
 * Language-version ranking (Oct 2026). Low-value version: the English mirror
 * of Mexico's municipio pages. Spanish is the page's audience language, the
 * English copy repeats the same figures, and Mexico is outside its election
 * window until 2027. These pages stay live, are noindex,follow, leave the
 * sitemap and hreflang, and re-index automatically when the window opens.
 * Undo: empty this list.
 */
export const LOW_VALUE_MIRRORS: { country: string; lang: string }[] = [{ country: "mx", lang: "en" }];

let mirrorPaths: Set<string> | null = null;
export function lowValueMirrorPaths(): Set<string> {
  if (mirrorPaths) return mirrorPaths;
  mirrorPaths = new Set();
  for (const m of LOW_VALUE_MIRRORS) {
    if (m.country !== "mx") continue;
    for (const row of MUNICIPIOS) mirrorPaths.add(`/mx/${m.lang}/${entitySlugFor(row)}/${row.slug}/`);
  }
  return mirrorPaths;
}

export function thinMunicipalityExcluded(path: string, asOf = indexingAsOf()): boolean {
  if (lowValueMirrorPaths().has(path)) return !thinPagesIndexed(countryOfPath(path), asOf);
  if (!isThinMunicipality(path)) return false;
  return !thinPagesIndexed(countryOfPath(path), asOf);
}

export function municipalityRobots(path: string, asOf = indexingAsOf()): "index,follow" | "noindex,follow" {
  return thinMunicipalityExcluded(path, asOf) ? "noindex,follow" : "index,follow";
}

const ROBOTS_META = /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i;

/** Replace the robots meta, or insert one before `</head>`. Other tags are left alone. */
export function applyRobotsMeta(html: string, content: "index,follow" | "noindex,follow"): string {
  const tag = `<meta name="robots" content="${content}">`;
  if (ROBOTS_META.test(html)) return html.replace(ROBOTS_META, tag);
  return html.replace(/<\/head>/i, `${tag}\n</head>`);
}

export type CalendarStatus = {
  country: string;
  pollingDays: string[];
  /** Reliable days whose 92-day window covers `asOf`. Empty when the country is outside every window. */
  activeDays: string[];
};

export function calendarStatus(asOf = indexingAsOf()): {
  inWindow: CalendarStatus[];
  outsideWindow: CalendarStatus[];
  unreliable: string[];
} {
  const seen = new Set<string>();
  const inWindow: CalendarStatus[] = [];
  const outsideWindow: CalendarStatus[] = [];
  for (const window of ELECTION_WINDOWS) seen.add(window.country);
  for (const rule of STANDING_RULES) seen.add(rule.country);
  const unreliable: string[] = [];
  for (const country of [...seen].sort()) {
    const pollingDays = reliablePollingDays(country);
    if (pollingDays.length === 0) {
      unreliable.push(country);
      continue;
    }
    const activeDays = pollingDays.filter((day) => {
      const start = addCalendarDays(day, -ELECTION_INDEX_RADIUS_DAYS);
      const end = addCalendarDays(day, ELECTION_INDEX_RADIUS_DAYS);
      return asOf >= start && asOf <= end;
    });
    const row = { country, pollingDays, activeDays };
    if (activeDays.length > 0) inWindow.push(row);
    else outsideWindow.push(row);
  }
  return { inWindow, outsideWindow, unreliable };
}

export function thinCountsByCountry(): Map<string, number> {
  const counts = new Map<string, number>();
  for (const path of thinMunicipalityPaths()) {
    const country = countryOfPath(path);
    counts.set(country, (counts.get(country) ?? 0) + 1);
  }
  return counts;
}
