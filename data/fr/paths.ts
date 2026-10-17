import { DEPARTMENTS, REGIONS, alphaRegions } from "./places";
import type { Lang } from "./types";

export const PRESIDENTIAL_SLUG = "presidentielle-2027";

export type FranceIndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

export function franceHome(lang: Lang): string {
  return `/fr/${lang}/`;
}

export function regionPath(lang: Lang, slug: string): string {
  return `/fr/${lang}/${slug}/`;
}

export function electionsPath(lang: Lang): string {
  return `${franceHome(lang)}elections/`;
}

export function presidentialPath(lang: Lang): string {
  return `${electionsPath(lang)}${PRESIDENTIAL_SLUG}/`;
}

export const FRANCE_LLMS_LINE =
  "France in this release: national pages and 18 regions from the Code officiel géographique au 1er janvier 2026, in French and English. Department pages and commune pages are not published. The next national election printed here is the presidential election of 18 April 2027 and 2 May 2027 (Service-Public).";

export function franceIndexEntries(): FranceIndexEntry[] {
  const entries: FranceIndexEntry[] = [
    {
      path: "/fr/",
      lang: "en-only",
      title: "France",
      kind: "country",
      text: "France élection présidentielle 18 avril 2027",
    },
  ];
  for (const lang of ["fr", "en"] as const) {
    const fr = lang === "fr";
    const home = franceHome(lang);
    entries.push(
      {
        path: home,
        lang,
        title: fr ? "France" : "France",
        kind: "country",
        text: "France élection présidentielle régions départements communes",
      },
      {
        path: electionsPath(lang),
        lang,
        title: fr ? "Élections" : "Elections",
        kind: "elections",
        text: "présidentielle législatives régionales départementales municipales sénatoriales européennes",
      },
      {
        path: presidentialPath(lang),
        lang,
        title: fr
          ? "Élection présidentielle des 18 avril et 2 mai 2027"
          : "Presidential election of 18 April and 2 May 2027",
        kind: "election",
        text: "présidentielle 18 avril 2027 2 mai 2027 Service-Public Conseil des ministres",
      },
    );
    for (const region of alphaRegions()) {
      const departments = DEPARTMENTS.filter((department) => department.regionCode === region.code)
        .map((department) => department.officialName)
        .join(" ");
      entries.push({
        path: regionPath(lang, region.slug),
        lang,
        title: region.officialName,
        kind: "region",
        text: `${region.officialName} ${region.code} ${region.chefLieu} ${departments}`,
      });
    }
  }
  return entries;
}

export const REGION_SLUGS = REGIONS.map((region) => region.slug);
