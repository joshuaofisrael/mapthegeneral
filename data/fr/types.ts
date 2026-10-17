export type Lang = "fr" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};
