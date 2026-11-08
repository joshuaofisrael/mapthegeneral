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
export const CORRECTIONS: readonly CorrectionEntry[] = [
  { date: "2026-11-07", path: "/il/en/results/", change: "Corrected stale FAQs that described the seat table as provisional after the page had already published the Committee’s final allocation approved on 4 November. No vote or seat totals changed; archived partial counts remain dated and labelled. The social-share image was also aligned with the existing final allocation instead of the empty automatic feed." },
  { date: "2026-11-07", path: "/il/he/results/", change: "Updated the Hebrew final-result FAQ to match the final table approved on 4 November; no vote or seat totals changed." },
];
