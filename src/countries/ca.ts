import { CA_LANGS } from "../data/ca/lang";
import { districtName, DISTRICTS, divisionName, DIVISIONS } from "../data/ca/level2";
import { canadaHome, districtIndexPath, districtPath, divisionIndexPath, divisionPath, electionPath, regionPath } from "../data/ca/paths";
import { alphaRegions, regionName } from "../data/ca/places";
import type { CaLang } from "../data/ca/types";

export const CANADA_HOME_CARD = {
  href: "/ca/",
  title: "Canada",
  text: "Federal general election fixed for Monday, 15 October 2029, unless Parliament is dissolved earlier. The last general election was 28 April 2025. This release has the national page, 13 provinces and territories, 343 federal electoral districts, and 293 census divisions, in English and French.",
  links: [
    { href: "/ca/en/", label: "English" },
    { href: "/ca/fr/", label: "Français" },
    { href: "/ca/en/elections/federal-2029/", label: "15 October 2029" },
  ],
};

type Entry = {
  path: string;
  lang: CaLang | "en-only";
  title: string;
  kind: string;
  text: string;
};

function fixedEntries(lang: CaLang): Entry[] {
  const home = canadaHome(lang);
  const fr = lang === "fr";
  return [
    {
      path: home,
      lang,
      title: "Canada",
      kind: "country",
      text: "Canada federal election 15 October 2029 28 April 2025 provinces territories",
    },
    {
      path: `${home}elections/`,
      lang,
      title: fr ? "Élections" : "Elections",
      kind: "elections",
      text: "élections elections Canada Elections Act 56.1",
    },
    {
      path: electionPath(lang),
      lang,
      title: fr ? "Élection générale fédérale du 15 octobre 2029" : "Federal general election of 15 October 2029",
      kind: "election",
      text: "15 October 2029 Canada Elections Act section 56.1 fixed date April 28 2025",
    },
    {
      path: `${home}parties/`,
      lang,
      title: fr ? "Partis" : "Parties",
      kind: "parties",
      text: "registered political parties Elections Canada",
    },
    {
      path: `${home}results/`,
      lang,
      title: fr ? "Résultats" : "Results",
      kind: "results",
      text: "official voting results forty-fifth general election 28 April 2025",
    },
    {
      path: `${home}faq/`,
      lang,
      title: fr ? "Questions fréquentes" : "FAQ",
      kind: "faq",
      text: "faq Canada election",
    },
    {
      path: `${home}sources/`,
      lang,
      title: fr ? "Sources" : "Sources",
      kind: "sources",
      text: "Elections Canada Statistics Canada House of Commons",
    },
  ];
}

export function canadaIndexEntries(): Entry[] {
  const regions = CA_LANGS.flatMap((lang) =>
    alphaRegions(lang).map((region) => ({
      path: regionPath(lang, region.slug),
      lang,
      title: regionName(region, lang),
      kind: region.kind,
      text: `${region.nameEn} ${region.nameFr} ${region.dailyLabel}`,
    })),
  );
  const indexes = CA_LANGS.flatMap((lang) => {
    const fr = lang === "fr";
    return [
      {
        path: districtIndexPath(lang),
        lang,
        title: fr ? "Circonscriptions électorales fédérales" : "Federal electoral districts",
        kind: "district-index",
        text: "343 federal electoral districts Elections Canada House of Commons",
      },
      {
        path: divisionIndexPath(lang),
        lang,
        title: fr ? "Divisions de recensement" : "Census divisions",
        kind: "division-index",
        text: "Statistics Canada SGC 2021 census divisions",
      },
    ];
  });
  const districts = CA_LANGS.flatMap((lang) =>
    DISTRICTS.map((district) => ({
      path: districtPath(lang, district.region, district.slug),
      lang,
      title: districtName(district, lang),
      kind: "district",
      text: `${district.nameEn} ${district.nameFr} ${district.fed}`,
    })),
  );
  const divisions = CA_LANGS.flatMap((lang) =>
    DIVISIONS.map((division) => ({
      path: divisionPath(lang, division.region, division.slug),
      lang,
      title: divisionName(division, lang),
      kind: "division",
      text: `${division.nameEn} ${division.nameFr} ${division.code}`,
    })),
  );
  return [
    {
      path: "/ca/",
      lang: "en-only",
      title: "Canada",
      kind: "country",
      text: "Canada élections fédérales provinces territories English Français",
    },
    ...fixedEntries("en"),
    ...fixedEntries("fr"),
    ...regions,
    ...indexes,
    ...districts,
    ...divisions,
  ];
}
