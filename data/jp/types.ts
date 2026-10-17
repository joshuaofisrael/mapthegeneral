export type Lang = "ja" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

export type PrefectureKind = "to" | "do" | "fu" | "ken";

export type ProportionalBlock = {
  id: string;
  /** Name printed in the Ministry’s block table. */
  nameJa: string;
  seats: number;
};

export type Prefecture = {
  slug: string;
  /** Name as printed in the 2025 census outline table, with line-break spaces removed. */
  officialName: string;
  /** English rendering used only on the English pages. The official name stays Japanese. */
  englishName: string;
  kind: PrefectureKind;
  /** Preliminary population at 1 October 2025, from the census outline. */
  population: number;
  blockId: string;
  /** House of Councillors district is shared with another prefecture. */
  councillorsWith?: string;
};
