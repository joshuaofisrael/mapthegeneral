import { alphaRegions, REGIONS } from "../kr/places";
import {
  electionsPath,
  krHome,
  krRoot,
  naElectionPath,
  regionPath,
  sectionPath,
} from "../kr/paths";
import type { KrLang } from "../kr/types";

export const KR_REGISTRY = {
  href: "/kr/",
  label: "South Korea",
  nameKo: "대한민국",
  nameEn: "South Korea",
  electionHref: "/kr/en/elections/national-assembly-2028/",
  electionLabel: "12 April 2028",
  summary:
    "National Assembly election on 12 April 2028, from the 22nd term printed by the National Assembly minutes index and article 34 of the Public Official Election Act. This release has the national pages and 16 upper-level local governments, in Korean and English.",
} as const;

type IndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

function labels(lang: KrLang) {
  if (lang === "ko") {
    return {
      home: "대한민국",
      elections: "선거",
      election: "국회의원선거, 2028년 4월 12일",
      parties: "정당",
      candidates: "후보자",
      results: "결과",
      faq: "질문",
      sources: "출처",
    };
  }
  return {
    home: "South Korea",
    elections: "Elections",
    election: "National Assembly election, 12 April 2028",
    parties: "Parties",
    candidates: "Candidates",
    results: "Results",
    faq: "FAQ",
    sources: "Sources",
  };
}

function languageEntries(lang: KrLang): IndexEntry[] {
  const home = krHome(lang);
  const copy = labels(lang);
  const fixed: IndexEntry[] = [
    { path: home, lang, title: copy.home, kind: "country", text: "대한민국 South Korea 한국" },
    { path: electionsPath(lang), lang, title: copy.elections, kind: "elections", text: "선거 elections 국회의원" },
    {
      path: naElectionPath(lang),
      lang,
      title: copy.election,
      kind: "election",
      text: "국회의원선거 National Assembly 2028-04-12 공직선거법 제34조",
    },
    { path: sectionPath(lang, "parties"), lang, title: copy.parties, kind: "parties", text: "정당 parties" },
    { path: sectionPath(lang, "candidates"), lang, title: copy.candidates, kind: "candidates", text: "후보자 candidates" },
    { path: sectionPath(lang, "results"), lang, title: copy.results, kind: "results", text: "개표 결과 results" },
    { path: sectionPath(lang, "faq"), lang, title: copy.faq, kind: "faq", text: "faq 질문" },
    { path: sectionPath(lang, "sources"), lang, title: copy.sources, kind: "sources", text: "출처 sources 중앙선거관리위원회 행정안전부" },
  ];
  const regions = alphaRegions().map((region) => ({
    path: regionPath(lang, region.slug),
    lang,
    title: region.officialName,
    kind: "region",
    text: `${region.officialName} ${region.kindKo} ${region.kindEn} ${region.offices.map((office) => office.host).join(" ")}`,
  }));
  return [...fixed, ...regions];
}

export function krIndexEntries(): IndexEntry[] {
  return [
    {
      path: krRoot(),
      lang: "en-only",
      title: "South Korea",
      kind: "country",
      text: "대한민국 South Korea 한국 국회의원선거",
    },
    ...languageEntries("en"),
    ...languageEntries("ko"),
  ];
}

export const KR_REGION_COUNT = REGIONS.length;
