/**
 * US 2026 midterms live results, /us/en/live/.
 *
 * The feed is produced by the sibling project (joshuaofisrael/midterm-map),
 * which reads official state and county election-office sources and
 * publishes one aggregated file. This site reads that one file and shows
 * nothing else: no polls, no projections, no exit polls, and no countdown.
 * Every state card also links straight to its own official results page,
 * so the board still works if the aggregated feed cannot be reached.
 *
 * Primary feed confirmed to send Access-Control-Allow-Origin: * (checked
 * with curl -I -H "Origin: https://mapthegeneral.com" on 1 Nov 2026), so a
 * browser on mapthegeneral.com may read it directly. The GitHub Pages
 * mirror on the live-results branch sends the same header and is tried
 * second if the primary file cannot be read.
 */
export const US_LIVE_PRIMARY_URL = "https://mapthemidterms.com/live/results.json";
export const US_LIVE_FALLBACK_URL =
  "https://raw.githubusercontent.com/joshuaofisrael/midterm-map/live-results/results.json";

export const US_LIVE_PATH = "/us/en/live/";
export const US_ELECTION_DAY = "2026-11-03";

/** Fixed 60-second poll, as set out in the work order. No faster, no slower. */
export const US_LIVE_POLL_MS = 60_000;

/** A document older than this is treated as stale even if the fetch itself succeeded. */
export const US_LIVE_STALE_MS = 10 * 60 * 1000;

export type UsRaceCandidate = {
  name?: string;
  party?: string;
  votes?: number | null;
  pct?: number | null;
  winner?: boolean;
};

export type UsRace = {
  office?: string;
  called?: boolean;
  candidates?: UsRaceCandidate[];
};

export type UsLiveState = {
  code: string;
  name: string;
  office: string;
  resultsUrl: string;
  resultsLabel: string;
  machineReadable?: boolean;
  format?: string;
  feedStatus?: string;
  feedNote?: string;
  sourceUpdatedAt?: string | null;
  fetchedAt?: string | null;
  races?: UsRace[];
};

export type UsChamberTotals = { dem: number | null; rep: number | null; other: number | null };

export type UsLiveDoc = {
  generatedAt?: string | null;
  electionDay?: string;
  chambers?: { house?: UsChamberTotals; senate?: UsChamberTotals };
  countsContinue?: boolean;
  states: Record<string, UsLiveState>;
};

export function isUsLiveDoc(value: unknown): value is UsLiveDoc {
  if (!value || typeof value !== "object") return false;
  const states = (value as { states?: unknown }).states;
  return !!states && typeof states === "object" && !Array.isArray(states);
}

export function usLiveStates(doc: UsLiveDoc | null | undefined): UsLiveState[] {
  if (!doc) return [];
  return Object.values(doc.states).sort((a, b) => a.name.localeCompare(b.name));
}

/** Cache-friendly poll URL: the query string is stable within one 60-second window. */
export function usLivePollUrl(base: string, now = Date.now()): string {
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}t=${Math.floor(now / US_LIVE_POLL_MS)}`;
}

export function usLiveFresh(doc: UsLiveDoc | null | undefined, now = Date.now()): boolean {
  if (!doc?.generatedAt) return false;
  const generated = Date.parse(doc.generatedAt);
  return Number.isFinite(generated) && now - generated <= US_LIVE_STALE_MS;
}

/** Only on /us/en/live/, and only while the tab is visible. */
export function usLivePollPage(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/us/en/live";
}

const STATUS_LABEL: Record<string, string> = {
  "link-only": "Official link only",
  "polls-open": "Polls not yet closed",
  closed: "Polls closed, awaiting returns",
  reporting: "Returns reporting",
  certified: "Certified",
};

export function usFeedStatusLabel(status?: string): string {
  if (!status) return "Status not reported";
  return STATUS_LABEL[status] ?? status;
}

export function usChamberTotalsShown(totals?: UsChamberTotals): boolean {
  return !!totals && (totals.dem != null || totals.rep != null || totals.other != null);
}
