export type CorrectionEntry = {
  /** ISO date the page was changed (YYYY-MM-DD). */
  date: string;
  /** Canonical path, with a trailing slash. */
  path: string;
  /** What was wrong, and what the page says after the change. */
  change: string;
};

/**
 * Material corrections for the public log on /copyright/.
 * Add a row when a date, name, seat count, result, or legal rule is fixed.
 * Do not invent rows. A typo that does not change a fact needs no row.
 */
export const CORRECTIONS: readonly CorrectionEntry[] = [];
