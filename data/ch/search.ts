import { alphaCantons, CANTONS } from "./cantons";
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
  return [...fixed, ...cantons];
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
