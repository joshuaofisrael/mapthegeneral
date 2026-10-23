import { switzerlandEntries } from "../../data/ch/search";
import { italySearchEntries } from "../data/italy/entries";
import { AU_INDEX_ENTRIES } from "../countries/au";
import { indexEntries as mexicoIndexEntries } from "../countries/mx";
import { gbSearchEntries } from "../data/gb/search";
import { absoluteUrl } from "../data/site";
import { autonomousCityMunicipality, pageMunicipalities } from "../data/spain/municipalities";
import {
  alphaCommunities,
  CITIES,
  PROVINCES,
  communityBySlug,
  provinceBySlug,
} from "../data/spain/places";
import { canadaIndexEntries } from "../countries/ca";
import { polandEntries } from "../../data/pl/paths";
import { HUBS, hubEn, hubHome, type HubCode } from "../data/new-hubs";
import type { Lang } from "../data/spain/types";

export const LANGS: Lang[] = ["es", "en"];

export function spainHome(lang: Lang): string {
  return `/es/${lang}/`;
}

export function communityPath(lang: Lang, slug: string): string {
  return `/es/${lang}/${slug}/`;
}

export function provincePath(lang: Lang, communitySlug: string, provinceSlug: string): string {
  return `/es/${lang}/${communitySlug}/${provinceSlug}/`;
}

export function municipalityPath(
  lang: Lang,
  communitySlug: string,
  provinceSlug: string,
  municipalitySlug: string,
): string {
  return `/es/${lang}/${communitySlug}/${provinceSlug}/${municipalitySlug}/`;
}

export type IndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

const STATIC_EN: IndexEntry[] = [
  { path: "/", lang: "en-only", title: "Map the General", kind: "home", text: "countries spain mexico poland italy united kingdom canada australia switzerland ireland norway sweden elections" },
  { path: "/pl/", lang: "en-only", title: "Poland", kind: "country", text: "Polska Poland Sejm Senat wojewodztwo" },
  { path: "/search/", lang: "en-only", title: "Search", kind: "search", text: "search postcode municipio" },
  { path: "/about/", lang: "en-only", title: "About", kind: "legal", text: "unofficial independent guide" },
  { path: "/disclaimer/", lang: "en-only", title: "Disclaimer", kind: "legal", text: "unofficial nonpartisan" },
  { path: "/privacy/", lang: "en-only", title: "Privacy", kind: "legal", text: "privacy GDPR cookies advertising adsense consent" },
  { path: "/terms/", lang: "en-only", title: "Terms of Use", kind: "legal", text: "terms" },
  { path: "/contact/", lang: "en-only", title: "Contact", kind: "legal", text: "contact error report" },
  { path: "/imprint/", lang: "en-only", title: "Legal notice", kind: "legal", text: "legal notice publisher election law" },
  { path: "/copyright/", lang: "en-only", title: "Copyright and corrections", kind: "legal", text: "copyright DMCA corrections content use" },
  { path: "/advertising/", lang: "en-only", title: "Advertising", kind: "legal", text: "advertising adsense affiliate disclosure no endorsement" },
  { path: "/es/", lang: "en-only", title: "Spain", kind: "country", text: "España Spain elecciones generales" },
];

function spainEntries(lang: Lang): IndexEntry[] {
  const home = spainHome(lang);
  const labels =
    lang === "es"
      ? {
          home: "España",
          elections: "Elecciones",
          election: "Elecciones a Cortes Generales del 29 de noviembre de 2026",
          parties: "Partidos",
          candidates: "Candidaturas",
          results: "Resultados",
          faq: "Preguntas frecuentes",
          sources: "Fuentes",
        }
      : {
          home: "Spain",
          elections: "Elections",
          election: "General election of 29 November 2026",
          parties: "Parties",
          candidates: "Candidates",
          results: "Results",
          faq: "FAQ",
          sources: "Sources",
        };
  const fixed: IndexEntry[] = [
    { path: home, lang, title: labels.home, kind: "country", text: "España Spain" },
    { path: `${home}elections/`, lang, title: labels.elections, kind: "elections", text: "elecciones elections" },
    {
      path: `${home}elections/cortes-generales-2026/`,
      lang,
      title: labels.election,
      kind: "election",
      text: "Congreso Senado 29 noviembre 2026 Real Decreto 806/2026",
    },
    { path: `${home}parties/`, lang, title: labels.parties, kind: "parties", text: "partidos parties" },
    { path: `${home}candidates/`, lang, title: labels.candidates, kind: "candidates", text: "candidaturas candidates BOE" },
    {
      path: `${home}candidates/awaiting-proclamation/`,
      lang,
      title: lang === "es" ? "Sin candidatura proclamada" : "No candidacy proclaimed",
      kind: "candidates",
      text: "candidaturas proclamación BOE",
    },
    { path: `${home}results/`, lang, title: labels.results, kind: "results", text: "resultados escrutinio" },
    { path: `${home}faq/`, lang, title: labels.faq, kind: "faq", text: "faq preguntas" },
    { path: `${home}sources/`, lang, title: labels.sources, kind: "sources", text: "fuentes sources BOE INE" },
  ];
  const communities = alphaCommunities().map((community) => ({
    path: communityPath(lang, community.slug),
    lang,
    title: community.officialName,
    kind: community.kind,
    text: `${community.officialName} ${community.parliamentName}`,
  }));
  const provinces = PROVINCES.map((province) => {
    const community = communityBySlug(province.communitySlug);
    return {
      path: provincePath(lang, province.communitySlug, province.slug),
      lang,
      title: province.decreeName,
      kind: "province",
      text: `${province.decreeName} ${province.capital} ${community?.officialName ?? ""} ${province.ineCode}`,
    };
  });
  const cities = CITIES.map((city) => ({
    path: communityPath(lang, city.slug),
    lang,
    title: city.decreeName,
    kind: "city",
    text: `${city.decreeName} ${autonomousCityMunicipality(city.slug)?.code ?? ""}`,
  }));
  const municipalities = pageMunicipalities().map((municipality) => {
    const province = provinceBySlug(municipality.provinceSlug);
    const community = communityBySlug(municipality.communitySlug);
    return {
      path: municipalityPath(lang, municipality.communitySlug, municipality.provinceSlug, municipality.slug),
      lang,
      title: municipality.name,
      kind: "municipality",
      text: `${municipality.name} ${municipality.code} ${province?.decreeName ?? ""} ${community?.officialName ?? ""}`,
    };
  });
  return [...fixed, ...communities, ...provinces, ...cities, ...municipalities];
}

/** Country modules under src/countries/. Keep every country's entries. */
function registryEntries(): IndexEntry[] {
  return [...mexicoIndexEntries()];
}

const HUB_CODES: HubCode[] = ["ie", "no", "se"];

function hubIndexEntries(): IndexEntry[] {
  return HUB_CODES.flatMap((code) => {
    const hub = HUBS[code];
    const home = hubHome(code);
    const en = hubEn(code);
    const elections = hubEn(code, "elections");
    const election = hubEn(code, `elections/${hub.electionSlug}`);
    return [
      { path: home, lang: "en-only", title: hub.name, kind: "country", text: `${hub.name} ${hub.blurb}` },
      { path: en, lang: "en", title: hub.name, kind: "country", text: hub.blurb },
      { path: elections, lang: "en", title: `Elections in ${hub.name}`, kind: "elections", text: hub.electionName },
      { path: election, lang: "en", title: hub.electionName, kind: "election", text: `${hub.name} ${hub.electionName}` },
      { path: hubEn(code, "faq"), lang: "en", title: `${hub.name} questions`, kind: "faq", text: `${hub.name} faq` },
      { path: hubEn(code, "sources"), lang: "en", title: `${hub.name} sources`, kind: "sources", text: `${hub.name} official sources` },
    ];
  });
}

export function searchIndex(): IndexEntry[] {
  const seen = new Set<string>();
  const rows = [
    ...STATIC_EN,
    ...spainEntries("en"),
    ...spainEntries("es"),
    ...gbSearchEntries(),
    ...polandEntries("en"),
    ...polandEntries("pl"),
    ...registryEntries(),
    ...AU_INDEX_ENTRIES,
    ...italySearchEntries(),
    ...canadaIndexEntries(),
    ...switzerlandEntries(),
    ...hubIndexEntries(),
  ];
  return rows.filter((row) => {
    if (seen.has(row.path)) return false;
    seen.add(row.path);
    return true;
  });
}

export function allPublicPaths(): string[] {
  return searchIndex().map((item) => item.path);
}

export function absolutePaths(): string[] {
  return allPublicPaths().map((path) => absoluteUrl(path));
}
