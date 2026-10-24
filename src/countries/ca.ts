import { CA_LANGS } from "../data/ca/lang";
import { districtName, DISTRICTS, divisionName, DIVISIONS } from "../data/ca/level2";
import { LEGISLATURE, MUNICIPALITIES, municipalityName } from "../data/ca/level3";
import {
  canadaHome,
  districtIndexPath,
  districtPath,
  divisionIndexPath,
  divisionPath,
  electionPath,
  legislatureIndexPath,
  legislaturePath,
  municipalityIndexPath,
  municipalityPath,
  regionPath,
} from "../data/ca/paths";
import { alphaRegions, regionBySlug, regionName } from "../data/ca/places";
import type { CaLang } from "../data/ca/types";

export const CANADA_HOME_CARD = {
  href: "/ca/",
  title: "Canada",
  text: "Federal general election fixed for Monday, 15 October 2029, unless Parliament is dissolved earlier. The last general election was 28 April 2025. This release has the national page, 13 provinces and territories, 343 federal electoral districts, 293 census divisions, legislative assembly districts for nine provinces and territories, and incorporated municipalities in Ontario, Quebec, British Columbia, Alberta, Manitoba, Saskatchewan, Nova Scotia, and New Brunswick, in English and French. Municipality pages for Newfoundland and Labrador, Prince Edward Island, and the territories, and legislative assembly districts for New Brunswick, Newfoundland and Labrador, the Northwest Territories, and Yukon, are not in this release.",
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
  const divisionByCode = new Map(DIVISIONS.map((division) => [division.code, division]));
  const legislatures = CA_LANGS.flatMap((lang) => {
    const fr = lang === "fr";
    const indexes = [...new Set(LEGISLATURE.map((seat) => seat.region))].map((regionSlug) => {
      const region = regionBySlug(regionSlug);
      if (!region) throw new Error(regionSlug);
      const label = regionName(region, lang);
      return {
        path: legislatureIndexPath(lang, regionSlug),
        lang,
        title: fr ? `Assemblée, ${label}` : `Legislature, ${label}`,
        kind: "legislature-index",
        text: `${label} ${region.nameEn}`,
      };
    });
    const seats = LEGISLATURE.map((seat) => ({
      path: legislaturePath(lang, seat.region, seat.slug),
      lang,
      title: seat.name,
      kind: "legislature",
      text: `${seat.name} ${seat.code}`,
    }));
    return [...indexes, ...seats];
  });
  const municipalities = CA_LANGS.flatMap((lang) => {
    const fr = lang === "fr";
    const indexes = [...new Set(MUNICIPALITIES.map((place) => place.cd))].map((code) => {
      const division = divisionByCode.get(code);
      if (!division) throw new Error(code);
      return {
        path: municipalityIndexPath(lang, division.region, division.slug),
        lang,
        title: fr ? `Municipalités, ${divisionName(division, lang)}` : `Municipalities, ${divisionName(division, lang)}`,
        kind: "municipality-index",
        text: `${division.code} ${division.nameEn}`,
      };
    });
    const places = MUNICIPALITIES.map((place) => {
      const division = divisionByCode.get(place.cd);
      if (!division) throw new Error(place.code);
      return {
        path: municipalityPath(lang, place.region, division.slug, place.slug),
        lang,
        title: municipalityName(place, lang),
        kind: "municipality",
        text: `${place.nameEn} ${place.nameFr} ${place.code}`,
      };
    });
    return [...indexes, ...places];
  });
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
    ...legislatures,
    ...municipalities,
  ];
}
