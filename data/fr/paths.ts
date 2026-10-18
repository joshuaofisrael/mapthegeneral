import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CONSTITUENCIES, holderName, officesFor } from "./level2";
import { DEPARTMENTS, REGIONS, alphaRegions } from "./places";
import type { Lang } from "./types";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "../..");

function renderLevel2Once(): void {
  if (process.env.MTG_FR_LEVEL2_RENDERED === "1") return;
  const event = process.env.npm_lifecycle_event;
  if (event !== "prebuild" && event !== "indexes") return;
  process.env.MTG_FR_LEVEL2_RENDERED = "1";
  const result = spawnSync(process.execPath, [join(repoRoot, "scripts/render-france-level2.mjs")], {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env,
  });
  if (result.status !== 0) {
    throw new Error("France level 2 HTML render failed");
  }
}

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

export function sourcesPath(lang: Lang): string {
  return `${franceHome(lang)}sources/`;
}

export function departementsIndexPath(lang: Lang): string {
  return `${franceHome(lang)}departements/`;
}

export function circonscriptionsIndexPath(lang: Lang): string {
  return `${franceHome(lang)}circonscriptions/`;
}

export function departmentPath(lang: Lang, regionSlug: string, departmentSlug: string): string {
  return `${regionPath(lang, regionSlug)}${departmentSlug}/`;
}

export function constituencyPath(lang: Lang, slug: string): string {
  return `${circonscriptionsIndexPath(lang)}${slug}/`;
}

export const FRANCE_LLMS_LINE =
  "France in this release: national pages, 18 regions, 101 departments and 577 legislative constituencies, in French and English. Commune pages are not published. The next national election printed here is the presidential election of 18 April 2027 and 2 May 2027 (Service-Public).";

export function franceIndexEntries(): FranceIndexEntry[] {
  renderLevel2Once();
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
      {
        path: sourcesPath(lang),
        lang,
        title: fr ? "Sources, lois et licences" : "Sources, laws and licences",
        kind: "sources",
        text: "Licence Ouverte Etalab Assemblée nationale Répertoire national des élus Code électoral RGPD",
      },
      {
        path: departementsIndexPath(lang),
        lang,
        title: fr ? "Départements" : "Departments",
        kind: "departments",
        text: "101 départements conseil départemental COG",
      },
      {
        path: circonscriptionsIndexPath(lang),
        lang,
        title: fr ? "Circonscriptions législatives" : "Legislative constituencies",
        kind: "constituencies",
        text: "577 circonscriptions députés Assemblée nationale",
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
    for (const department of DEPARTMENTS) {
      const region = REGIONS.find((item) => item.code === department.regionCode);
      if (!region) throw new Error(`Missing region for ${department.code}`);
      const offices = officesFor(department.code)
        .flatMap((office) => [office.bodyName, ...office.holders.map((holder) => holderName(holder))])
        .join(" ");
      entries.push({
        path: departmentPath(lang, region.slug, department.slug),
        lang,
        title: department.officialName,
        kind: "department",
        text: `${department.officialName} ${department.code} ${department.chefLieu} ${region.officialName} ${offices}`,
      });
    }
    for (const constituency of CONSTITUENCIES) {
      const deputy = constituency.deputy
        ? `${constituency.deputy.givenName} ${constituency.deputy.familyName}`
        : "";
      entries.push({
        path: constituencyPath(lang, constituency.slug),
        lang,
        title: constituency.libelle,
        kind: "constituency",
        text: `${constituency.libelle} ${constituency.depName} ${constituency.depCode} ${constituency.numero} ${deputy}`,
      });
    }
  }
  return entries;
}

export const REGION_SLUGS = REGIONS.map((region) => region.slug);
