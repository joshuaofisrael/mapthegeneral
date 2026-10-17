export type KrLang = "ko" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

export type OfficeLine = {
  /** Label as printed in section 7-5, including a building name when the book prints one. */
  label: string;
  address: string;
  postcode: string;
  /** Homepage cell as printed. The column heading is 홈페이지(www.-.-.-). */
  host: string;
};

export type Region = {
  slug: string;
  /** Name as printed in the MOIS book’s chapter list and summary table. */
  officialName: string;
  kindKo: string;
  kindEn: string;
  /** 시·군·구 계. Null when the summary table leaves that cell blank. */
  basicTotal: number | null;
  si: number;
  gun: number;
  gu: number;
  /** 행정시. The summary table prints 2 for Jeju and blank elsewhere. */
  adminSi: number;
  /** 자치구가 아닌 구. */
  nonAutoGu: number;
  eup: number;
  myeon: number;
  dong: number;
  offices: OfficeLine[];
};
