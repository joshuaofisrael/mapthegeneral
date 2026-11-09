import { ELECTION_WINDOWS } from "@/data/election-law";
import type { ElectionResults } from "./types";

const WINDOW = ELECTION_WINDOWS.find((item) => item.id === "es-2026-generales")!;
const POLL_BAN = WINDOW.rules.find((rule) => rule.kind === "poll-ban")!;

/**
 * Spain, general election of 29 November 2026. No count exists yet.
 * Add rows only from the Ministerio del Interior results service, with the
 * read time, after WINDOW.trackerOpensAt.
 */
export const ES_2026_RESULTS: ElectionResults = {
  id: WINDOW.id,
  stage: "awaiting",
  source: { label: WINDOW.officialResults.label, url: WINDOW.officialResults.url },
  rowLabel: "Party",
  rows: [],
  seatsTotal: 350,
  log: [],
  odds: {
    slug: "spain-general-election-winner",
    title: "Spain general election winner",
    hideFrom: POLL_BAN.start,
    hideUntil: POLL_BAN.end,
    pausedNote:
      "Odds paused from 24 November until polls close in the Canary Islands (21:00 peninsular time) on 29 November, in line with LOREG article 69.7.",
  },
};

export const ES_TRACKER_OPENS_AT = WINDOW.trackerOpensAt;
