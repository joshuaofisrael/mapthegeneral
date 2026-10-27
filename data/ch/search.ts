import { alphaCantons, CANTONS } from "./cantons";
import { COMMUNES } from "./communes";
import { DISTRICTS } from "./districts";
import type { ChLang } from "./types";
import { ui } from "./ui";

export const ELECTION_SLUG = "nationalrat-2027";

export function chHome(lang: ChLang): string {
  return `/ch/${lang}/`;
}

export function electionPath(lang: ChLang): string {
  return `${chHome(lang)}elections/${ELECTION_SLUG}/`;
}

export function cantonPath(lang: ChLang, slug: string): string {
  return `${chHome(lang)}${slug}/`;
}

export function districtsIndexPath(lang: ChLang): string {
  return `${chHome(lang)}districts/`;
}

export function districtPath(lang: ChLang, cantonSlug: string, districtSlug: string): string {
  return `${cantonPath(lang, cantonSlug)}${districtSlug}/`;
}

export function communePath(lang: ChLang, cantonSlug: string, districtSlug: string, communeSlug: string): string {
  const base = districtSlug ? districtPath(lang, cantonSlug, districtSlug) : cantonPath(lang, cantonSlug);
  return `${base}${communeSlug}/`;
}

export function communesIndexPath(lang: ChLang, cantonSlug: string, districtSlug: string): string {
  const base = districtSlug ? districtPath(lang, cantonSlug, districtSlug) : cantonPath(lang, cantonSlug);
  return `${base}communes/`;
}

export type ChIndexEntry = {
  path: string;
  lang: ChLang | "en-only";
  title: string;
  kind: string;
  text: string;
};

const LABELS: Record<
  ChLang,
  {
    home: string;
    elections: string;
    election: string;
    parties: string;
    candidates: string;
    results: string;
    faq: string;
    sources: string;
  }
> = {
  de: {
    home: "Schweiz",
    elections: "Wahlen",
    election: "Nationalratswahlen vom 24. Oktober 2027",
    parties: "Parteien",
    candidates: "Kandidaturen",
    results: "Ergebnisse",
    faq: "Häufige Fragen",
    sources: "Quellen",
  },
  fr: {
    home: "Suisse",
    elections: "Élections",
    election: "Élection du Conseil national du 24 octobre 2027",
    parties: "Partis",
    candidates: "Candidatures",
    results: "Résultats",
    faq: "Questions fréquentes",
    sources: "Sources",
  },
  it: {
    home: "Svizzera",
    elections: "Elezioni",
    election: "Elezione del Consiglio nazionale del 24 ottobre 2027",
    parties: "Partiti",
    candidates: "Candidature",
    results: "Risultati",
    faq: "Domande frequenti",
    sources: "Fonti",
  },
  en: {
    home: "Switzerland",
    elections: "Elections",
    election: "National Council election of 24 October 2027",
    parties: "Parties",
    candidates: "Candidates",
    results: "Results",
    faq: "FAQ",
    sources: "Sources",
  },
};

function entriesFor(lang: ChLang): ChIndexEntry[] {
  const home = chHome(lang);
  const labels = LABELS[lang];
  const copy = ui(lang);
  const fixed: ChIndexEntry[] = [
    { path: home, lang, title: labels.home, kind: "country", text: "Schweiz Suisse Svizzera Switzerland Eidgenossenschaft" },
    { path: `${home}elections/`, lang, title: labels.elections, kind: "elections", text: "Wahlen élections elezioni elections Nationalrat" },
    {
      path: electionPath(lang),
      lang,
      title: labels.election,
      kind: "election",
      text: "24 October 2027 24. Oktober 2027 Nationalrat Conseil national Consiglio nazionale SR 161.12",
    },
    {
      path: `${home}elections/volksabstimmung-2026-11-29/`,
      lang,
      title:
        lang === "de"
          ? "Volksabstimmung, 29. November 2026"
          : lang === "fr"
            ? "Votation populaire, 29 novembre 2026"
            : lang === "it"
              ? "Votazione popolare, 29 novembre 2026"
              : "Federal popular vote, 29 November 2026",
      kind: "election",
      text: "29 November 2026 Volksabstimmung votation votazione Switzerland Schweiz",
    },
    { path: `${home}parties/`, lang, title: labels.parties, kind: "parties", text: "Parteien partis partiti parties" },
    { path: `${home}candidates/`, lang, title: labels.candidates, kind: "candidates", text: "Kandidaturen candidatures candidature" },
    { path: `${home}results/`, lang, title: labels.results, kind: "results", text: "Ergebnisse résultats risultati Nationalrat 2023" },
    { path: `${home}faq/`, lang, title: labels.faq, kind: "faq", text: "faq" },
    { path: `${home}sources/`, lang, title: labels.sources, kind: "sources", text: "Quellen sources fonti Bundeskanzlei BFS" },
  ];
  const cantons = alphaCantons().map((canton) => ({
    path: cantonPath(lang, canton.slug),
    lang,
    title: canton.officialName,
    kind: "canton",
    text: `${canton.officialName} ${canton.article1Name} ${canton.ordinanceName} ${canton.abbr} ${copy.cantons}`,
  }));
  const byAbbr = new Map(CANTONS.map((canton) => [canton.abbr, canton]));
  const districts = DISTRICTS.map((district) => {
    const canton = byAbbr.get(district.canton);
    return {
      path: districtPath(lang, canton?.slug ?? district.canton.toLowerCase(), district.slug),
      lang,
      title: district.officialName,
      kind: "district",
      text: `${district.officialName} ${district.shortName} ${district.bfsNumber} ${canton?.officialName ?? ""} ${canton?.abbr ?? ""}`,
    };
  });
  const index = {
    path: districtsIndexPath(lang),
    lang,
    title: copy.districts,
    kind: "districts",
    text: "Bezirke districts distretti Wahlkreis Verwaltungskreis Region",
  };
  const communeIndexes = new Map<string, (typeof COMMUNES)[number]>();
  for (const commune of COMMUNES) communeIndexes.set(`${commune.canton}/${commune.districtSlug}`, commune);
  const communeIndexEntries = [...communeIndexes.values()].map((commune) => {
    const canton = byAbbr.get(commune.canton);
    const cantonSlug = canton?.slug ?? commune.canton.toLowerCase();
    const place = commune.districtSlug ? commune.districtName : (canton?.officialName ?? commune.districtName);
    const title =
      lang === "de"
        ? `Gemeinden · ${place}`
        : lang === "fr"
          ? `Communes · ${place}`
          : lang === "it"
            ? `Comuni · ${place}`
            : `Municipalities · ${place}`;
    return {
      path: communesIndexPath(lang, cantonSlug, commune.districtSlug),
      lang,
      title,
      kind: "communes",
      text: `${place} ${commune.canton} ${commune.districtBfs}`,
    };
  });
  const communeEntries = COMMUNES.map((commune) => {
    const canton = byAbbr.get(commune.canton);
    const cantonSlug = canton?.slug ?? commune.canton.toLowerCase();
    return {
      path: communePath(lang, cantonSlug, commune.districtSlug, commune.slug),
      lang,
      title: commune.name,
      kind: "commune",
      text: `${commune.name} ${commune.bfs} ${commune.canton} ${commune.districtName}`,
    };
  });
  return [...fixed, index, ...cantons, ...districts, ...communeIndexEntries, ...communeEntries];
}

export function switzerlandEntries(): ChIndexEntry[] {
  return [
    {
      path: "/ch/",
      lang: "en-only",
      title: "Switzerland",
      kind: "country",
      text: "Schweiz Suisse Svizzera Switzerland cantons Nationalrat 24 October 2027",
    },
    ...entriesFor("de"),
    ...entriesFor("fr"),
    ...entriesFor("it"),
    ...entriesFor("en"),
  ];
}

export function switzerlandPageCount(): number {
  return switzerlandEntries().length;
}

export const CANTON_COUNT = CANTONS.length;
