/**
 * Results hub registry: every election this site covers, with its stage and
 * the page to open. Dates and official results services come from
 * ELECTION_WINDOWS (each cites the election authority). No figures live here.
 * Bulgaria is dropped and is not listed.
 */
import { ELECTION_WINDOWS, type ElectionWindow } from "./election-law";
import nzManual from "./nz-results-manual.json";
import type { ResultsStage } from "./results/types";

export type HubStage = ResultsStage | "not-copied";

export type HubElection = {
  id: string;
  country: string;
  countryName: string;
  name: string;
  pollingDay: string;
  /** Our results page, when there is one. */
  resultsPath?: string;
  /** Our guide to the election. */
  guidePath: string;
  /** Search wording used for the link text, e.g. "Spain election results live". */
  searchLabel: string;
  stage: HubStage;
  stageNote: string;
  official: { label: string; url: string };
};

const DROPPED = new Set(["bg"]);

const COUNTRY_NAMES: Record<string, string> = {
  au: "Australia",
  ca: "Canada",
  ch: "Switzerland",
  ee: "Estonia",
  es: "Spain",
  fi: "Finland",
  ie: "Ireland",
  il: "Israel",
  it: "Italy",
  mx: "Mexico",
  nl: "Netherlands",
  nz: "New Zealand",
  pl: "Poland",
  tw: "Taiwan",
};

type Overlay = Omit<HubElection, "id" | "country" | "countryName" | "pollingDay" | "official" | "name"> & { name?: string };

const nzCounted = nzManual.votingPlacesCounted ? `, ${nzManual.votingPlacesCounted} of voting places reported` : "";

const OVERLAY: Record<string, Overlay> = {
  "il-2026-knesset": {
    name: "Knesset election",
    resultsPath: "/il/en/results/",
    guidePath: "/il/en/elections/knesset-2026/",
    searchLabel: "Israel election results",
    stage: "official-final",
    stageNote: "Official final results, approved by the Central Elections Committee on 4 November 2026.",
  },
  "nz-2026-11-07": {
    name: "General election",
    resultsPath: "/nz/en/results/",
    guidePath: "/nz/en/elections/general-election/",
    searchLabel: "NZ election results",
    stage: nzManual.stage === "official-final" ? "official-final" : "preliminary",
    stageNote:
      nzManual.stage === "official-final"
        ? "Official final results declared by the Electoral Commission."
        : `Preliminary count${nzCounted}; excludes special votes. Official final results pending.`,
  },
  "ie-2026-seanad": {
    name: "Seanad bye-election (Cultural and Educational Panel)",
    guidePath: "/ie/en/elections/seanad-2026/",
    searchLabel: "Seanad bye-election result",
    stage: "not-copied",
    stageNote: "No count is copied on this site. The result is published by the Houses of the Oireachtas.",
  },
  "ca-bc-2026": {
    name: "British Columbia provincial election",
    guidePath: "/ca/en/elections/bc-2026/",
    searchLabel: "BC election results",
    stage: "not-copied",
    stageNote: "No count is copied on this site. Results are published by Elections BC.",
  },
  "it-2026-chieti": {
    name: "Chamber of Deputies by-election, Chieti",
    guidePath: "/it/en/elections/camera-chieti-2026/",
    searchLabel: "Chieti by-election results",
    stage: "awaiting",
    stageNote: "Voting on 15 and 16 November 2026. Results come from the Ministry of the Interior (Eligendo).",
  },
  "pl-2026-senat-20": {
    name: "Senate by-election, constituency 20",
    guidePath: "/pl/en/elections/senat-20-2026/",
    searchLabel: "Poland Senate by-election results",
    stage: "awaiting",
    stageNote: "Results come from the National Electoral Commission (PKW).",
  },
  "au-vic-2026": {
    name: "Victorian state election",
    guidePath: "/au/en/elections/victoria-2026/",
    searchLabel: "Victorian election results",
    stage: "awaiting",
    stageNote: "Results come from the Victorian Electoral Commission.",
  },
  "tw-2026-local": {
    name: "Local public-office elections",
    guidePath: "/tw/en/elections/local-2026/",
    searchLabel: "Taiwan local election results",
    stage: "awaiting",
    stageNote: "Results come from the Central Election Commission.",
  },
  "es-2026-generales": {
    name: "General election",
    resultsPath: "/es/en/results/",
    guidePath: "/es/en/elections/cortes-generales-2026/",
    searchLabel: "Spain election results live",
    stage: "awaiting",
    stageNote: "350 Congress seats. Results come from the Ministry of the Interior after polls close.",
  },
  "ch-2026-11-29": {
    name: "Federal popular vote",
    guidePath: "/ch/en/elections/volksabstimmung-2026-11-29/",
    searchLabel: "Swiss referendum results",
    stage: "awaiting",
    stageNote: "Results come from the Federal Statistical Office.",
  },
  "ee-2027-03-07": {
    name: "Riigikogu election",
    guidePath: "/ee/en/elections/riigikogu-2027/",
    searchLabel: "Estonia election results",
    stage: "awaiting",
    stageNote: "Results come from the State Electoral Office.",
  },
  "au-nsw-2027": {
    name: "New South Wales state election",
    guidePath: "/au/en/elections/nsw-2027/",
    searchLabel: "NSW election results",
    stage: "awaiting",
    stageNote: "Results come from the NSW Electoral Commission.",
  },
  "nl-2027-03-17": {
    name: "Provincial States and water-board elections",
    guidePath: "/nl/en/elections/provincial-2027/",
    searchLabel: "Dutch provincial election results",
    stage: "awaiting",
    stageNote: "Results come from the Electoral Council (Kiesraad).",
  },
  "fi-2027-04-18": {
    name: "Parliamentary election",
    guidePath: "/fi/en/elections/parliamentary-2027/",
    searchLabel: "Finland election results",
    stage: "awaiting",
    stageNote: "Results come from the Ministry of Justice results service.",
  },
  "mx-2027-federal": {
    name: "Federal election",
    guidePath: "/mx/en/elections/",
    searchLabel: "Mexico election results",
    stage: "awaiting",
    stageNote: "Results come from the National Electoral Institute (INE).",
  },
};

function toHub(window: ElectionWindow): HubElection | null {
  const overlay = OVERLAY[window.id];
  if (!overlay || DROPPED.has(window.country)) return null;
  return {
    ...overlay,
    id: window.id,
    country: window.country,
    countryName: COUNTRY_NAMES[window.country] ?? window.country.toUpperCase(),
    name: overlay.name ?? window.election.en,
    pollingDay: window.pollingDay,
    official: window.officialResults,
  };
}

export const HUB_ELECTIONS: HubElection[] = ELECTION_WINDOWS.map(toHub)
  .filter((item): item is HubElection => item !== null)
  .sort((a, b) => a.pollingDay.localeCompare(b.pollingDay));

export function hubToday(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/** Held elections, newest first. */
export function recentElections(asOf = hubToday()): HubElection[] {
  return HUB_ELECTIONS.filter((item) => item.pollingDay < asOf).reverse();
}

/** Elections from today on, soonest first. */
export function upcomingElections(asOf = hubToday()): HubElection[] {
  return HUB_ELECTIONS.filter((item) => item.pollingDay >= asOf);
}

export function formatPollingDay(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export const STAGE_BADGE: Record<HubStage, string> = {
  awaiting: "Upcoming",
  preliminary: "Preliminary",
  "official-final": "Official final",
  "not-copied": "Held",
};
