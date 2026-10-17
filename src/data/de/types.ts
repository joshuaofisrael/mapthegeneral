export type DeLang = "de" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

export type ChamberKind = "landtag" | "abgeordnetenhaus" | "buergerschaft";

export type Land = {
  slug: string;
  /** Name as printed in the Bundesrat table of Landtag election dates. */
  name: string;
  chamber: ChamberKind;
  parliamentUrl: string;
  governmentUrl: string;
  /** Cell in the column "Nächste Landtagswahl", Stand 21.09.2026. */
  nextLabel: string;
  /** Column "Turnus" in that table. */
  turnus: "4 Jahre" | "5 Jahre";
  /** False when the cell begins with "voraussichtlich" and is not a calendar day. */
  nextIsDate: boolean;
};

export type SeatRow = {
  /** Short name in the seat table of press release 29/25. */
  shortName: string;
  /** Full name in the second-vote table of the same release. */
  fullName: string;
  seats: number;
  /** Null when the release prints an em dash. */
  constituencySeats: number | null;
  /** Second-vote share as printed, including the comma decimal and the percent sign. */
  secondVoteShare: string;
};
