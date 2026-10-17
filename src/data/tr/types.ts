export type TrLang = "tr" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this source was read. */
  readOn: string;
};

export type Province = {
  /** Name as printed in TÜİK, İstatistiklerle Türkiye 2025, table 1.4. */
  name: string;
  slug: string;
  /** ADNKS population at the 2025 reference date in that table. */
  population: number;
  /** Deputies in the 2023 column of YSK election statistics, table 2.6. */
  deputies2023: number;
  /**
   * True when Law 6360 article 1, in the consolidated text that was read,
   * names the province as a metropolitan municipality bounded by the province.
   */
  metropolitan: boolean;
};
