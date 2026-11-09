/**
 * Shared shape for an election results page. One file per election under
 * src/data/results/. Figures are copied from the named source only; this
 * site does not calculate seats or call a winner.
 */
export type ResultsStage = "awaiting" | "preliminary" | "official-final";

export type SourceRef = { label: string; url: string };

export type ResultRow = {
  /** Party, list or candidate name exactly as the source prints it. */
  name: string;
  votes?: number;
  /** Share as the source prints it, e.g. "29.3%". */
  share?: string;
  /** Seats copied from the source. Never calculated here. */
  seats?: number;
};

export type LiveEntry = {
  /** ISO time with offset. */
  at: string;
  text: string;
  source: SourceRef;
};

export type OddsConfig = {
  /** Polymarket event slug. Only set where a real market covers the race. */
  slug: string;
  title: string;
  /** Legal blackout (ISO). The meter is hidden inside it. */
  hideFrom?: string;
  hideUntil?: string;
  pausedNote?: string;
};

export type ElectionResults = {
  /** Matches ELECTION_WINDOWS[].id. */
  id: string;
  stage: ResultsStage;
  /** e.g. "99.3% of voting places". Copied from the source. */
  counted?: string;
  source: SourceRef;
  /** ISO time the figures were read. */
  readAt?: string;
  rowLabel: string;
  rows: ResultRow[];
  seatsTotal?: number;
  log: LiveEntry[];
  odds?: OddsConfig;
};

export const STAGE_LABEL: Record<ResultsStage, { en: string; es: string }> = {
  awaiting: { en: "Awaiting the count", es: "Pendiente del escrutinio" },
  preliminary: { en: "Preliminary (unofficial, will change)", es: "Provisional (no oficial, cambiará)" },
  "official-final": { en: "Official final results", es: "Resultados oficiales definitivos" },
};
