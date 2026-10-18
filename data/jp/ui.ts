import type { Lang } from "./types";

const JA = {
  home: "ホーム",
  japan: "日本",
  elections: "選挙",
  parties: "政党",
  candidates: "候補者",
  results: "結果",
  faq: "よくある質問",
  sources: "出典",
  prefectures: "都道府県",
  population: "人口",
  parliament: "議会",
  government: "政府",
  lastElection: "直近の選挙",
  nextElection: "次の選挙",
  representatives: "衆議院",
  councillors: "参議院",
  sourcesHeading: "出典",
  gap: "未掲載",
  censusNearby: "人口速報の表で前後の行",
  parent: "上位のページ",
  readOn: "読んだ日",
  unofficial: "非公式の情報です。公式の選挙管理委員会で確認してください。",
  candidateGap:
    "このページは候補者名を載せません。2026年10月17日に読んだ資料に、次の衆議院議員総選挙の公示も、参議院議員通常選挙の公示もありませんでした。",
  governorGap:
    "知事の氏名、議会の会派別議席、次の投票日は、このページには書きません。2026年10月17日に読んだ資料は、都道府県の長と議員が選挙で選ばれ、任期満了による選挙は任期が終わる日の前30日以内に行われる、と書いています。任期がいつ終わるかは、都道府県ごとにこの資料には出ていません。",
  localGap:
    "市区町村のページは、この公開にはありません。衆議院の小選挙区と比例代表、参議院の選挙区は、選挙区の一覧から開けます。憲法第93条は、地方公共団体に議会を置き、長と議員を住民が直接選挙すると定めています。",
  nextElectionGap:
    "2026年10月17日に読んだ資料に、次の国政選挙の投票日を公示した文書はありません。このページは投票日を予想しません。",
  postcodeGap:
    "郵便番号の検索は接続していません。この公開には、郵便番号から市区町村への公式ファイルを入れていません。",
  resultsGap:
    "このページは当選者を宣言せず、過半数も政府の成立も判断しません。数字を載せるときは、読んだ公的資料に印刷されている表だけです。",
};

const EN = {
  home: "Home",
  japan: "Japan",
  elections: "Elections",
  parties: "Parties",
  candidates: "Candidates",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  prefectures: "Prefectures",
  population: "Population",
  parliament: "Assembly",
  government: "Government",
  lastElection: "Latest election on the cited list",
  nextElection: "Next election",
  representatives: "House of Representatives",
  councillors: "House of Councillors",
  sourcesHeading: "Sources",
  gap: "Gap",
  censusNearby: "Previous and next rows in the census outline",
  parent: "Parent pages",
  readOn: "Read on",
  unofficial: "Unofficial information. Confirm with your official election office.",
  candidateGap:
    "This page does not list candidate names. None of the sources read on 17 October 2026 was a proclamation of the next House of Representatives general election or the next House of Councillors ordinary election.",
  governorGap:
    "The governor’s name, the assembly’s party totals, and the next polling day are not printed here. The sources read on 17 October 2026 say the chief executive and the assembly members of a local public body are elected, and that an election caused by the end of a term is held within 30 days before the term ends. Those sources do not print each prefecture’s term-end date.",
  localGap:
    "Municipality pages are not in this release. House single-member districts, proportional districts, and Councillors’ districts open from the district index. Article 93 of the Constitution says a local public body has an assembly and that residents directly elect the chief executive and the assembly members.",
  nextElectionGap:
    "No document read on 17 October 2026 proclaimed a polling day for the next national election. This page does not forecast one.",
  postcodeGap:
    "A postcode search is not wired up. This release does not include an official postcode-to-municipality file.",
  resultsGap:
    "This page does not declare a winner, a majority, or a government. Where it prints figures, they are the table in the official document that was read.",
};

export function ui(lang: Lang) {
  return lang === "ja" ? JA : EN;
}

export function kindLabel(kind: "to" | "do" | "fu" | "ken", lang: Lang): string {
  if (lang === "ja") {
    if (kind === "to") return "都";
    if (kind === "do") return "道";
    if (kind === "fu") return "府";
    return "県";
  }
  if (kind === "to") return "Metropolis (都)";
  if (kind === "do") return "Circuit (道)";
  if (kind === "fu") return "Urban prefecture (府)";
  return "Prefecture (県)";
}
