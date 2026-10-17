export type CaLang = "en" | "fr";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

export type Affiliation = {
  liberal: number;
  conservative: number;
  bloc: number;
  ndp: number;
  green: number;
};

export type CurrentStanding = Affiliation & { vacant: number };
