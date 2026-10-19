import { allGminy, gminaIndexPath, gminaPath, powiatGminaIndexPath } from "./gminy";
import {
  allPowiats,
  allSejmOkregi,
  allSenatOkregi,
  powiatHeading,
  powiatIndexPath,
  powiatPath,
  sejmIndexPath,
  sejmOkregPath,
  senatIndexPath,
  senatOkregPath,
} from "./level2";
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
  const indexes: PolandIndexEntry[] = [
    {
      path: powiatIndexPath(lang),
      lang,
      title: pl ? "Powiaty" : "Powiats",
      kind: "index",
      text: "powiat miasto na prawach powiatu TERC",
    },
    {
      path: sejmIndexPath(lang),
      lang,
      title: pl ? "Okręgi do Sejmu" : "Sejm constituencies",
      kind: "index",
      text: "Sejm okręg wyborczy posłowie",
    },
    {
      path: senatIndexPath(lang),
      lang,
      title: pl ? "Okręgi do Senatu" : "Senate constituencies",
      kind: "index",
      text: "Senat okręg wyborczy senator",
    },
    {
      path: gminaIndexPath(lang),
      lang,
      title: pl ? "Gminy" : "Gminas",
      kind: "index",
      text: "gmina TERC wójt burmistrz prezydent miasta rada",
    },
  ];
  const powiats = allPowiats().map((item) => ({
    path: powiatPath(lang, item.voivodeshipSlug, item.slug),
    lang,
    title: powiatHeading(item),
    kind: item.kind === "powiat" ? "powiat" : "city-powiat",
    text: `${powiatHeading(item)} ${item.name} ${item.kind} ${item.code} ${item.voivodeshipSlug}`,
  }));
  const sejm = allSejmOkregi().map((item) => ({
    path: sejmOkregPath(lang, item.num),
    lang,
    title: pl ? `Okręg wyborczy nr ${item.num} do Sejmu` : `Sejm constituency ${item.num}`,
    kind: "sejm-okreg",
    text: `Sejm ${item.num} ${item.districtName} ${item.okw} ${item.voivodeship} ${item.members.map((member) => member.name).join(" ")}`,
  }));
  const gminaIndexes = allPowiats().map((item) => ({
    path: powiatGminaIndexPath(lang, item.voivodeshipSlug, item.slug),
    lang,
    title: pl ? `Gminy — ${powiatHeading(item)}` : `Gminas — ${powiatHeading(item)}`,
    kind: "index",
    text: `gminy ${powiatHeading(item)} ${item.voivodeshipSlug}`,
  }));
  const gminas = allGminy().map((item) => ({
    path: gminaPath(lang, item),
    lang,
    title: `${item.name} — ${item.kind}`,
    kind: "gmina",
    text: `${item.name} ${item.kind} ${item.code} ${item.powiatSlug} ${item.elected ?? ""}`,
  }));
  const senat = allSenatOkregi().map((item) => ({
    path: senatOkregPath(lang, item.num),
    lang,
    title: pl ? `Okręg wyborczy nr ${item.num} do Senatu` : `Senate constituency ${item.num}`,
    kind: "senat-okreg",
    text: `Senat ${item.num} ${item.vacant ? "mandat nieobsadzony wybory uzupełniające 22 listopada 2026" : item.senator} ${item.alsoPrinted?.name ?? ""} ${item.area}`,
  }));
  return [...fixed, ...indexes, ...regions, ...powiats, ...gminaIndexes, ...gminas, ...sejm, ...senat];
}
