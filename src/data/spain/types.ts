export type Lang = "es" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

export type ElectionRecord = {
  iso: string;
  /** Instrument name exactly as printed by the cited source. */
  instrument: string;
  publication: string;
  sourceId: string;
  /** Chamber or office the election filled. */
  officeEs: string;
  officeEn: string;
};

export type IslandRow = {
  /** Name as printed in the population annex or the calling decree. */
  name: string;
  population?: number;
  senators: number;
  regionalDeputies?: number;
};

export type Province = {
  slug: string;
  /** Constituency name in the annex of Royal Decree 806/2026, without the trailing period. */
  decreeName: string;
  ineCode: string;
  communitySlug: string;
  /** Official population of the province at 1 January 2025. */
  population: number;
  capital: string;
  capitalPopulation: number;
  congressSeats: number;
  /** Senators elected in the provincial constituency. Null when the decree uses island constituencies instead. */
  provincialSenators: number | null;
  islands?: IslandRow[];
  /** Procuradores in the Cortes of Castile and León, from Decree 1/2026. */
  cylProcuradores?: number;
};

export type Community = {
  slug: string;
  /** Name used by the cited state source. */
  officialName: string;
  kind: "community" | "city";
  parliamentName: string;
  parliamentUrl: string;
  governmentUrl: string;
  lastElection: ElectionRecord;
  /** Present only when a decree read for this release printed the size. */
  chamberSize?: number;
  chamberSizeNoteEs?: string;
  chamberSizeNoteEn?: string;
};
