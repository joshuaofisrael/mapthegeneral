import type { Lang } from "./types";
import { blockById, PREFECTURES } from "./places";

export const LANGS: Lang[] = ["ja", "en"];

export function japanHome(lang: Lang): string {
  return `/jp/${lang}/`;
}

export function prefecturePath(lang: Lang, slug: string): string {
  return `/jp/${lang}/${slug}/`;
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
  return [...fixed, ...prefectures];
}
