import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "constitution",
    name: "日本国憲法（e-Gov 法令検索）",
    url: "https://laws.e-gov.go.jp/law/321CONSTITUTION",
    readOn: READ,
  },
  {
    id: "soumu-kinds",
    name: "総務省「選挙の種類」",
    url: "https://www.soumu.go.jp/senkyo/senkyo_s/naruhodo/naruhodo03.html",
    readOn: READ,
  },
  {
    id: "soumu-guide",
    name: "総務省「未来を担う私たち 〜責任ある一票を〜」（公示・告示と定数の表）",
    url: "https://www.soumu.go.jp/main_content/000815499.pdf",
    readOn: READ,
  },
  {
    id: "shugiin-list",
    name: "衆議院「衆議院議員総選挙一覧表」",
    url: "https://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/shiryo/senkyolist.htm",
    readOn: READ,
  },
  {
    id: "shugiin-sessions",
    name: "衆議院「国会会期一覧」",
    url: "https://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/shiryo/kaiki.htm",
    readOn: READ,
  },
  {
    id: "shugiin",
    name: "衆議院",
    url: "https://www.shugiin.go.jp/",
    readOn: READ,
  },
  {
    id: "sangiin-218",
    name: "参議院「第27回参議院議員通常選挙」を含む国会概観（第218回）",
    url: "https://www.sangiin.go.jp/jpn/shiryo/s_gaiyo/218/2180000-1-n.pdf",
    readOn: READ,
  },
  {
    id: "sangiin",
    name: "参議院",
    url: "https://www.sangiin.go.jp/",
    readOn: READ,
  },
  {
    id: "soumu-hc-2025",
    name: "総務省「令和7年7月20日執行 参議院議員通常選挙 発表資料」",
    url: "https://www.soumu.go.jp/senkyo/27sansokuhou/index.html",
    readOn: READ,
  },
  {
    id: "soumu-senkyo",
    name: "総務省 選挙",
    url: "https://www.soumu.go.jp/senkyo/",
    readOn: READ,
  },
  {
    id: "kantei-roster",
    name: "首相官邸「第2次高市改造内閣 閣僚等名簿」（令和8年10月15日現在）",
    url: "https://www.kantei.go.jp/jp/105/meibo/index.html",
    readOn: READ,
  },
  {
    id: "kantei-designate",
    name: "首相官邸「令和8年2月18日 内閣総理大臣の指名」",
    url: "https://www.kantei.go.jp/jp/105/actions/202602/18shimei.html",
    readOn: READ,
  },
  {
    id: "census-outline",
    name: "総務省統計局「令和7年国勢調査 人口速報集計結果 結果の概要」（令和8年5月29日）",
    url: "https://www.stat.go.jp/data/kokusei/2025/kekka/pdf/outline.pdf",
    readOn: READ,
  },
  {
    id: "census-results",
    name: "総務省統計局「令和7年国勢調査 調査の結果」",
    url: "https://www.stat.go.jp/data/kokusei/2025/kekka.html",
    readOn: READ,
  },
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
