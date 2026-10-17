import { alphaProvinces } from "./provinces";
import type { TrLang } from "./types";

export type TurkeyIndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

function fixed(lang: TrLang): TurkeyIndexEntry[] {
  const home = `/tr/${lang}/`;
  const tr = lang === "tr";
  return [
    {
      path: home,
      lang,
      title: tr ? "Türkiye" : "Turkey",
      kind: "country",
      text: "Türkiye Turkey Cumhuriyeti seçim election",
    },
    {
      path: `${home}elections/`,
      lang,
      title: tr ? "Seçimler" : "Elections",
      kind: "elections",
      text: "seçim election 2028 2023",
    },
    {
      path: `${home}elections/2028/`,
      lang,
      title: tr ? "2028 Cumhurbaşkanı ve milletvekili seçimi" : "2028 presidential and parliamentary elections",
      kind: "election",
      text: "2028 Cumhurbaşkanı milletvekili TBMM 6271",
    },
    {
      path: `${home}parties/`,
      lang,
      title: tr ? "Partiler" : "Parties",
      kind: "parties",
      text: "siyasi parti 2023 ilan",
    },
    {
      path: `${home}candidates/`,
      lang,
      title: tr ? "Adaylar" : "Candidates",
      kind: "candidates",
      text: "aday candidate 2028",
    },
    {
      path: `${home}results/`,
      lang,
      title: tr ? "Sonuçlar" : "Results",
      kind: "results",
      text: "sonuç 2023 2028 YSK ilan",
    },
    {
      path: `${home}faq/`,
      lang,
      title: tr ? "Sık sorulanlar" : "FAQ",
      kind: "faq",
      text: "sss faq seçim",
    },
    {
      path: `${home}sources/`,
      lang,
      title: tr ? "Kaynaklar" : "Sources",
      kind: "sources",
      text: "kaynak YSK TÜİK Anayasa",
    },
  ];
}

function provinces(lang: TrLang): TurkeyIndexEntry[] {
  return alphaProvinces().map((province) => ({
    path: `/tr/${lang}/${province.slug}/`,
    lang,
    title: province.name,
    kind: "province",
    text: `${province.name} il Türkiye ${province.metropolitan ? "büyükşehir" : "il"}`,
  }));
}

export function turkeySearchEntries(): TurkeyIndexEntry[] {
  return [
    {
      path: "/tr/",
      lang: "en-only",
      title: "Türkiye",
      kind: "country",
      text: "Türkiye Turkey Cumhuriyeti",
    },
    ...fixed("en"),
    ...fixed("tr"),
    ...provinces("en"),
    ...provinces("tr"),
  ];
}
