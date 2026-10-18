import { LEVEL2 } from "./level2";
import type { Lang } from "./types";
import { blockById, PREFECTURES, prefectureBySlug } from "./places";

export const LANGS: Lang[] = ["ja", "en"];

export function japanHome(lang: Lang): string {
  return `/jp/${lang}/`;
}

export function prefecturePath(lang: Lang, slug: string): string {
  return `/jp/${lang}/${slug}/`;
}

export function districtsIndexPath(lang: Lang): string {
  return `/jp/${lang}/districts/`;
}

export function smdPath(lang: Lang, slug: string, n: number): string {
  return `/jp/${lang}/${slug}/s${n}/`;
}

export function blockPath(lang: Lang, id: string): string {
  return `/jp/${lang}/pr/${id}/`;
}

export function hcPath(lang: Lang, canonicalSlug: string): string {
  return `/jp/${lang}/${canonicalSlug}/sangiin/`;
}

export type JapanIndexEntry = {
  path: string;
  lang: Lang;
  title: string;
  kind: string;
  text: string;
};

export function japanEntries(lang: Lang): JapanIndexEntry[] {
  const home = japanHome(lang);
  const ja = lang === "ja";
  const fixed: JapanIndexEntry[] = [
    { path: home, lang, title: ja ? "日本" : "Japan", kind: "country", text: "日本 Japan 衆議院 参議院" },
    { path: `${home}elections/`, lang, title: ja ? "選挙" : "Elections", kind: "elections", text: "選挙 elections" },
    {
      path: `${home}elections/shuugiin-2026/`,
      lang,
      title: ja ? "第51回衆議院議員総選挙（2026年2月8日）" : "51st House of Representatives election (8 February 2026)",
      kind: "election",
      text: "第51回 令和8年2月8日 衆議院 解散",
    },
    {
      path: `${home}elections/sangiin-2025/`,
      lang,
      title: ja ? "第27回参議院議員通常選挙（2025年7月20日）" : "27th House of Councillors election (20 July 2025)",
      kind: "election",
      text: "第27回 令和7年7月20日 参議院",
    },
    {
      path: `${home}elections/kokusei-next/`,
      lang,
      title: ja ? "次の国政選挙" : "Next national election",
      kind: "election",
      text: "次の選挙 任期 衆議院 参議院 令和10年7月25日",
    },
    { path: `${home}parties/`, lang, title: ja ? "政党" : "Parties", kind: "parties", text: "政党 parties" },
    { path: `${home}candidates/`, lang, title: ja ? "候補者" : "Candidates", kind: "candidates", text: "候補者 candidates" },
    { path: `${home}results/`, lang, title: ja ? "結果" : "Results", kind: "results", text: "結果 results 開票" },
    { path: `${home}faq/`, lang, title: ja ? "よくある質問" : "FAQ", kind: "faq", text: "faq" },
    { path: `${home}sources/`, lang, title: ja ? "出典" : "Sources", kind: "sources", text: "出典 sources 総務省 衆議院 参議院" },
  ];
  const prefectures = PREFECTURES.map((prefecture) => {
    const block = blockById(prefecture.blockId);
    return {
      path: prefecturePath(lang, prefecture.slug),
      lang,
      title: prefecture.officialName,
      kind: "prefecture",
      text: `${prefecture.officialName} ${prefecture.englishName} ${block.nameJa}`,
    };
  });
  const index: JapanIndexEntry = {
    path: districtsIndexPath(lang),
    lang,
    title: ja ? "選挙区" : "Districts",
    kind: "index",
    text: "選挙区 小選挙区 比例代表 参議院 districts",
  };
  const districts = LEVEL2.smd.map((district) => {
    const prefecture = prefectureBySlug(district.prefecture);
    const name = prefecture?.officialName ?? district.prefecture;
    return {
      path: smdPath(lang, district.prefecture, district.n),
      lang,
      title: `${name} ${district.lawHeading}`,
      kind: "district",
      text: `${name} ${district.lawHeading} ${district.listLabel} ${district.member.name} ${prefecture?.englishName ?? ""}`,
    };
  });
  const blocks = LEVEL2.blocks.map((block) => ({
    path: blockPath(lang, block.id),
    lang,
    title: block.nameJa,
    kind: "block",
    text: `${block.nameJa} ${block.listLabel} ${block.seatsKanji} ${block.members.map((member) => member.name).join(" ")}`,
  }));
  const councillors = LEVEL2.hc.map((district) => ({
    path: hcPath(lang, district.canonical),
    lang,
    title: district.lawName,
    kind: "constituency",
    text: `${district.lawName} ${district.listName} ${district.seatsKanji} ${district.members.map((member) => member.name).join(" ")}`,
  }));
  return [...fixed, ...prefectures, index, ...districts, ...blocks, ...councillors];
}
