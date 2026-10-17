import { alphaVoivodeships } from "./places";
import type { Lang } from "./types";

export const LANGS: Lang[] = ["pl", "en"];

export function polandHome(lang: Lang): string {
  return `/pl/${lang}/`;
}

export function voivodeshipPath(lang: Lang, slug: string): string {
  return `/pl/${lang}/${slug}/`;
}

export type PolandIndexEntry = {
  path: string;
  lang: Lang;
  title: string;
  kind: string;
  text: string;
};

export function polandEntries(lang: Lang): PolandIndexEntry[] {
  const home = polandHome(lang);
  const pl = lang === "pl";
  const fixed: PolandIndexEntry[] = [
    {
      path: home,
      lang,
      title: pl ? "Polska" : "Poland",
      kind: "country",
      text: "Polska Poland Sejm Senat wojewodztwo",
    },
    {
      path: `${home}elections/`,
      lang,
      title: pl ? "Wybory" : "Elections",
      kind: "elections",
      text: "wybory elections Sejm Senat",
    },
    {
      path: `${home}elections/sejm-senat-2027/`,
      lang,
      title: pl ? "Wybory do Sejmu i Senatu, 14 października–12 listopada 2027" : "Sejm and Senate election, 14 October–12 November 2027",
      kind: "election",
      text: "Sejm Senat 2027 Prezydent art. 98",
    },
    {
      path: `${home}results/`,
      lang,
      title: pl ? "Wyniki" : "Results",
      kind: "results",
      text: "wyniki PKW 2023 2025 Sejm Senat Prezydent",
    },
  ];
  const regions = alphaVoivodeships().map((item) => ({
    path: voivodeshipPath(lang, item.slug),
    lang,
    title: item.name,
    kind: "voivodeship",
    text: `${item.name} sejmik wojewoda marszalek`,
  }));
  return [...fixed, ...regions];
}
