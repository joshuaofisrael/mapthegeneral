import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ2 = "2026-10-18";

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
  {
    id: "shugiin-members",
    name: "衆議院「議員一覧」（五十音。令和8年9月28日現在）",
    url: "https://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/syu/giinselect_m.htm",
    readOn: READ2,
  },
  {
    id: "sangiin-hireiku",
    name: "参議院「選挙区・比例代表別議員一覧」（令和８年９月４日現在）",
    url: "https://www.sangiin.go.jp/japanese/giin/hireiku/hireiku.htm",
    readOn: READ2,
  },
  {
    id: "koukyo",
    name: "公職選挙法（昭和二十五年法律第百号、e-Gov）",
    url: "https://laws.e-gov.go.jp/law/325AC1000000100",
    readOn: READ2,
  },
  {
    id: "soumu-kuwari",
    name: "総務省「衆議院小選挙区の区割りの改定等について」",
    url: "https://www.soumu.go.jp/senkyo/senkyo_s/news/senkyo/shu_kuwari/shu_kuwari_4.html",
    readOn: READ2,
  },
  {
    id: "shugiin-rights",
    name: "衆議院「リンク・著作権等について」",
    url: "https://www.shugiin.go.jp/internet/itdb_annai.nsf/html/statics/link.html",
    readOn: READ2,
  },
  {
    id: "sangiin-rights",
    name: "参議院「著作権」",
    url: "https://www.sangiin.go.jp/jpn/footer/chosaku.html",
    readOn: READ2,
  },
  {
    id: "soumu-rights",
    name: "総務省「著作権について」",
    url: "https://www.soumu.go.jp/menu_kyotsuu/policy/tyosaku.html",
    readOn: READ2,
  },
  {
    id: "public-license",
    name: "デジタル庁「公共データ利用規約（第1.0版）」",
    url: "https://www.digital.go.jp/resources/open_data/public_data_license_v1.0",
    readOn: READ2,
  },
  {
    id: "copyright-act",
    name: "著作権法（e-Gov）",
    url: "https://laws.e-gov.go.jp/law/345AC0000000048",
    readOn: READ2,
  },
  {
    id: "appi",
    name: "個人情報の保護に関する法律（e-Gov）",
    url: "https://laws.e-gov.go.jp/law/415AC0000000057",
    readOn: READ2,
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
