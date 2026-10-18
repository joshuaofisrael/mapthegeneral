import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LEVEL2,
  areaLine,
  blockRecord,
  hcFor,
  smdsIn,
  usesAnnexNote,
  type HcDistrict,
  type HcMember,
  type HrMember,
  type PrBlock,
  type Smd,
} from "../data/jp/level2";
import { blockPath, districtsIndexPath, hcPath, japanHome, prefecturePath, smdPath } from "../data/jp/paths";
import { prefectureBySlug, PREFECTURES } from "../data/jp/places";
import { sourcesById } from "../data/jp/sources";
import type { Lang } from "../data/jp/types";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.soumu.go.jp/senkyo/";
const READ = LEVEL2.readOn;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(input: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede?: string;
  crumbs: { name: string; path: string }[];
  body: string;
  sourceIds: string[];
}): string {
  const ja = input.lang === "ja";
  const other: Lang = ja ? "en" : "ja";
  const otherPath = input.path.replace(`/jp/${input.lang}/`, `/jp/${other}/`);
  const jaPath = ja ? input.path : otherPath;
  const enPath = ja ? otherPath : input.path;
  const canonical = absoluteUrl(input.path);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: input.crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
  const sources = sourcesById(input.sourceIds)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${ja ? "読んだ日" : "Read on"} ${esc(source.readOn)}</li>`,
    )
    .join("");
  const crumbNav = input.crumbs
    .map((item, index) =>
      index === input.crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const title = `${input.title} · ${SITE.name}`;
  return `<!DOCTYPE html>
<html lang="${input.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="ja" href="${esc(absoluteUrl(jaPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${ja ? "ja_JP" : "en_US"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${ja ? `非公式の情報です。<a href="${OFFICE}">公式の選挙管理委員会</a>で確認してください。` : esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(japanHome(input.lang))}">${ja ? "日本" : "Japan"}</a> · <a href="/search/">${ja ? "検索" : "Search"}</a> · <a href="${esc(otherPath)}">${ja ? "English" : "日本語"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p class="eyebrow">${esc(input.eyebrow)}</p>
<h1>${esc(input.h1)}</h1>
${input.lede ? `<p class="lede">${esc(input.lede)}</p>` : ""}
<p><strong>${ja ? "読んだ日" : "Read on"}: ${esc(READ)}.</strong> <a href="${esc(reportErrorHref(input.path))}">${ja ? "誤りを知らせる" : "Report an error"}</a></p>
${input.body}
<p>${ja ? "編集は当サイト（Joshua Israel Ventures LLC）によるものです。国が作成した未加工の情報ではありません。" : "Edits are by this site (Joshua Israel Ventures LLC), not an unedited government text."}</p>
<h2>${ja ? "出典" : "Sources"}</h2>
<ul>${sources}</ul>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function write(lang: Lang, path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function hrRows(members: HrMember[]): string {
  return members
    .map(
      (member) =>
        `<tr><td><a href="${esc(member.profile)}">${esc(member.name)}</a></td><td>${esc(member.kana)}</td><td>${esc(member.faction)}</td><td>${esc(member.times)}</td></tr>`,
    )
    .join("");
}

function hcRows(members: HcMember[]): string {
  return members
    .map((member) => {
      const legal = member.legal ? `<br>[${esc(member.legal)}]` : "";
      const seiji = member.seiji ? ` <a href="${esc(member.seiji)}">＜正字＞</a>` : "";
      return `<tr><td><a href="${esc(member.profile)}">${esc(member.name)}</a>${legal}${seiji}</td><td>${esc(member.kana)}</td><td>${esc(member.faction)}</td><td>${esc(member.term)}</td></tr>`;
    })
    .join("");
}

function baseCrumbs(lang: Lang): { name: string; path: string }[] {
  const ja = lang === "ja";
  return [
    { name: ja ? "ホーム" : "Home", path: "/" },
    { name: ja ? "日本" : "Japan", path: "/jp/" },
    { name: ja ? "日本" : "Japan", path: japanHome(lang) },
    { name: ja ? "選挙区" : "Districts", path: districtsIndexPath(lang) },
  ];
}

function smdBody(lang: Lang, district: Smd): string {
  const ja = lang === "ja";
  const prefecture = prefectureBySlug(district.prefecture);
  if (!prefecture) throw new Error(district.prefecture);
  const block = blockRecord(prefecture.blockId);
  const siblings = smdsIn(district.prefecture);
  const prev = siblings.find((item) => item.n === district.n - 1);
  const next = siblings.find((item) => item.n === district.n + 1);
  const near = [prev, next]
    .filter((item): item is Smd => Boolean(item))
    .map((item) => `<a href="${esc(smdPath(lang, district.prefecture, item.n))}">${esc(item.lawHeading)}</a>`)
    .join(" · ");
  const note = usesAnnexNote(district.areas) ? `<p>${esc(LEVEL2.annexNote)}</p>` : "";
  const truncated = district.truncated
    ? ja
      ? "<p>※は、別表第一がその見出しの下に町丁目等を列記している箇所です。このページはその列記を転記していません。</p>"
      : "<p>※ marks a heading under which Annex 1 lists chome or similar units. This page does not copy that list.</p>"
    : ja
      ? "<p>この選挙区について、別表第一が町丁目の列記を置いている箇所は、上の見出しにはありません。</p>"
      : "<p>For this district, the headings above do not sit over a chome-level list in Annex 1.</p>";
  return `
<h2>${ja ? "議員" : "Member"}</h2>
<table>
<tr><th>${ja ? "氏名" : "Name"}</th><th>${ja ? "ふりがな" : "Reading"}</th><th>${ja ? "会派" : "Caucus"}</th><th>${ja ? "当選回数" : "Times elected"}</th></tr>
${hrRows([district.member])}
</table>
<p>${
    ja
      ? `衆議院の議員一覧（${esc(LEVEL2.hrListAsOf)}）の選挙区欄は「${esc(district.listLabel)}」です。氏名の末尾の「君」はその一覧の表記です。セル内の連続した空白は一つにしています。会派は一覧の略称のままで、正式名称には直していません。`
      : `The House list (${esc(LEVEL2.hrListAsOf)}) prints “${esc(district.listLabel)}” in the district column. The name keeps the list’s 君. Runs of spaces in the cell are collapsed to one. The caucus is the abbreviation printed there, not a full name.`
  }</p>
<h2>${ja ? "定数と区域" : "Seat and area"}</h2>
<p>${
    ja
      ? `公職選挙法第13条は、衆議院（小選挙区選出）議員の選挙区は別表第一で定め、各選挙区において選挙すべき議員の数は一人とする、と書いています。別表第一は「${esc(prefecture.officialName)}」の次に「${esc(district.lawHeading)}」と印刷しています。`
      : `Article 13 says single-member districts are fixed by Annex 1 and that each district elects one member. Annex 1 prints “${esc(district.lawHeading)}” after “${esc(prefecture.officialName)}”.`
  }</p>
<p>${esc(areaLine(district.areas))}</p>
${truncated}
${note}
<p>${
    ja
      ? "見出しは、2026年10月18日に読んだ e-Gov の法令データの別表第一です。総務省のページは、区割り改定の法律が令和4年11月28日に公布され、同年12月28日から施行された、と書いています。区割り図のPDFは転記していません。"
      : "The headings are Annex 1 in the e-Gov law data read on 18 October 2026. The Ministry’s page says the redistricting law was promulgated on 28 November 2022 and took effect on 28 December 2022. The map PDFs are not copied here."
  }</p>
<h2>${ja ? "選挙" : "Elections"}</h2>
<p>${
    ja
      ? "衆議院の総選挙一覧表は、第51回の期日を令和8年2月8日としています。上の一覧は、この人がその日にこの区で当選したとは書いていません。"
      : "The House election list gives 8 February 2026 as the date of the 51st general election. The member list above does not say this person was returned for this district on that day."
  }</p>
<p class="gap"><strong>${ja ? "未掲載" : "Gap"}.</strong> ${
    ja
      ? "2026年10月18日に読んだ資料に、次の衆議院議員総選挙の投票日を公示した文書はありません。このページは投票日を書きません。"
      : "No document read on 18 October 2026 proclaimed a polling day for the next general election. This page does not print one."
  }</p>
<h2>${ja ? "連絡先" : "Office contact"}</h2>
<p>${
    ja
      ? `衆議院のページは、${esc(LEVEL2.hrOffice.address)}、電話（代表）${esc(LEVEL2.hrOffice.phone)}、と印刷しています。個人の連絡先は転記していません。`
      : `The House pages print ${esc(LEVEL2.hrOffice.address)} and the switchboard ${esc(LEVEL2.hrOffice.phone)}. Personal contact details are not copied.`
  }</p>
<p class="tools">${ja ? "上位" : "Up"}: <a href="${esc(prefecturePath(lang, prefecture.slug))}">${esc(prefecture.officialName)}</a> · <a href="${esc(blockPath(lang, block.id))}">${ja ? "比例" : "PR"} ${esc(block.nameJa)}</a> · <a href="${esc(districtsIndexPath(lang))}">${ja ? "選挙区" : "Districts"}</a>${near ? ` · ${near}` : ""}</p>`;
}

function blockBody(lang: Lang, block: PrBlock): string {
  const ja = lang === "ja";
  const prefs = block.prefectures
    .map((slug) => {
      const prefecture = prefectureBySlug(slug);
      if (!prefecture) throw new Error(slug);
      return `<a href="${esc(prefecturePath(lang, slug))}">${esc(prefecture.officialName)}</a>`;
    })
    .join(" · ");
  const composition = block.prefectures.length === 1
    ? ja
      ? "別表第二は、この名称の行に議員数を書き、その下に別の都道府県の行を置いていません。リンク先は、その名称と同じ都道府県です。"
      : "Annex 2 prints the seat number on this name’s row and does not add a further prefecture row. The link is the prefecture of the same name."
    : ja
      ? "別表第二は、この選挙区の行の次に、次の都道府県を掲げています。"
      : "Annex 2 lists these prefectures on the rows after this district.";
  const mismatch =
    block.members.length === block.seats
      ? ""
      : `<p class="gap"><strong>${ja ? "未掲載" : "Gap"}.</strong> ${
          ja
            ? `別表第二の議員数は「${esc(block.seatsKanji)}」です。一覧は ${block.members.length} 人を印刷しています。二つの数字は一致しません。このページは欠員とは書かず、一覧にない氏名は補いません。`
            : `Annex 2 prints “${esc(block.seatsKanji)}”. The list prints ${block.members.length} names. The two figures are not the same. This page does not call that a vacancy and does not supply a missing name.`
        }</p>`;
  return `
<p>${
    ja
      ? `公職選挙法第13条第2項は、衆議院（比例代表選出）議員の選挙区と議員の数は別表第二で定める、と書いています。別表第二の議員数は「${esc(block.seatsKanji)}」です。議員一覧の選挙区欄は「${esc(block.listLabel)}」です。`
      : `Article 13, paragraph 2, says proportional districts and their seats are fixed by Annex 2. Annex 2 prints “${esc(block.seatsKanji)}”. The member list’s district column prints “${esc(block.listLabel)}”.`
  }</p>
<h2>${ja ? "議員" : "Members"}</h2>
<table>
<tr><th>${ja ? "氏名" : "Name"}</th><th>${ja ? "ふりがな" : "Reading"}</th><th>${ja ? "会派" : "Caucus"}</th><th>${ja ? "当選回数" : "Times elected"}</th></tr>
${hrRows(block.members)}
</table>
<p>${
    ja
      ? `一覧の日付は${esc(LEVEL2.hrListAsOf)}です。氏名の「君」と会派の略称は一覧の表記です。空白は一つにしています。`
      : `The list is dated ${esc(LEVEL2.hrListAsOf)}. 君 and the caucus abbreviation are printed as on that list. Spaces are collapsed to one.`
  }</p>
${mismatch}
<h2>${ja ? "都道府県" : "Prefectures"}</h2>
<p>${composition}</p>
<p>${prefs}</p>
<h2>${ja ? "選挙" : "Elections"}</h2>
<p>${
    ja
      ? "衆議院の総選挙一覧表は、第51回の期日を令和8年2月8日としています。上の一覧は、各人がその日に当選したとは書いていません。"
      : "The House election list gives 8 February 2026 as the date of the 51st general election. The member list does not say each person was returned that day."
  }</p>
<p class="gap"><strong>${ja ? "未掲載" : "Gap"}.</strong> ${
    ja
      ? "次の総選挙の投票日を公示した文書は、2026年10月18日に読んだ資料にありません。"
      : "No document read on 18 October 2026 proclaimed the next general election’s polling day."
  }</p>
<p class="tools">${ja ? "上位" : "Up"}: <a href="${esc(japanHome(lang))}">${ja ? "日本" : "Japan"}</a> · <a href="${esc(districtsIndexPath(lang))}">${ja ? "選挙区" : "Districts"}</a></p>`;
}

function hcBody(lang: Lang, district: HcDistrict): string {
  const ja = lang === "ja";
  const parents = district.parents
    .map((slug) => {
      const prefecture = prefectureBySlug(slug);
      if (!prefecture) throw new Error(slug);
      return `<a href="${esc(prefecturePath(lang, slug))}">${esc(prefecture.officialName)}</a>`;
    })
    .join(" · ");
  const nameNote =
    district.lawName === district.listName
      ? ""
      : `<p>${
          ja
            ? `別表第三の選挙区は「${esc(district.lawName)}」です。参議院の一覧の選挙区名は「${esc(district.listName)}」です。`
            : `Annex 3 prints “${esc(district.lawName)}”. The House list prints “${esc(district.listName)}”.`
        }</p>`;
  const mismatch =
    district.members.length === district.seats
      ? ""
      : `<p class="gap"><strong>${ja ? "未掲載" : "Gap"}.</strong> ${
          ja
            ? `別表第三の議員数は「${esc(district.seatsKanji)}」です。一覧は ${district.members.length} 人を印刷しています。このページは欠員とは書かず、氏名を補いません。`
            : `Annex 3 prints “${esc(district.seatsKanji)}”. The list prints ${district.members.length} names. This page does not call that a vacancy and does not add a name.`
        }</p>`;
  return `
<p>${
    ja
      ? `公職選挙法第14条は、参議院（選挙区選出）議員の選挙区と議員の数は別表第三で定める、と書いています。別表第三の議員数は「${esc(district.seatsKanji)}」です。一覧の日付は${esc(LEVEL2.hcListAsOf)}です。`
      : `Article 14 says Councillors’ districts and their seats are fixed by Annex 3. Annex 3 prints “${esc(district.seatsKanji)}”. The list is dated ${esc(LEVEL2.hcListAsOf)}.`
  }</p>
${nameNote}
<h2>${ja ? "議員" : "Members"}</h2>
<table>
<tr><th>${ja ? "氏名" : "Name"}</th><th>${ja ? "読み方" : "Reading"}</th><th>${ja ? "会派" : "Caucus"}</th><th>${ja ? "任期満了" : "Term ends"}</th></tr>
${hcRows(district.members)}
</table>
<p>${
    ja
      ? "角括弧は一覧が氏名の下に印刷した本名です。空白は一つにしています。会派は略称のままです。「＜正字＞」は一覧のリンクで、字形はこのページに転記していません。"
      : "Square brackets are the legal name printed under the name on the list. Spaces are collapsed to one. The caucus stays abbreviated. “＜正字＞” is the list’s link; the glyph is not copied here."
  }</p>
${mismatch}
<h2>${ja ? "選挙" : "Elections"}</h2>
<p>${
    ja
      ? "参議院の概観は、一つの組の任期満了を令和10年7月25日、もう一つの組を令和13年7月28日としています。総務省の説明では、任期満了による選挙は任期が終わる日の前30日以内です。上の表の「任期満了」は、各人の欄に印刷された日付です。"
      : "The House overview gives one class’s term end as 25 July 2028 and the other as 28 July 2031. The Ministry says an election at the end of a term is held within 30 days before that date. The term-end column above is the date printed for each person."
  }</p>
<p class="gap"><strong>${ja ? "未掲載" : "Gap"}.</strong> ${
    ja
      ? "次の通常選挙の投票日は、2026年10月18日に読んだ資料では公示されていません。第27回通常選挙の期日は令和7年7月20日です。一覧は、各人がその選挙で当選したとは書いていません。"
      : "No polling day for the next ordinary election was proclaimed in the sources read on 18 October 2026. The 27th ordinary election’s date is 20 July 2025. The list does not say each person was returned at that election."
  }</p>
<h2>${ja ? "連絡先" : "Office contact"}</h2>
<p>${
    ja
      ? `参議院のページは、${esc(LEVEL2.hcOffice.address)}、電話（大代表）${esc(LEVEL2.hcOffice.phone)}、と印刷しています。個人の連絡先は転記していません。`
      : `The House pages print ${esc(LEVEL2.hcOffice.address)} and the main switchboard ${esc(LEVEL2.hcOffice.phone)}. Personal contact details are not copied.`
  }</p>
<p class="tools">${ja ? "都道府県" : "Prefectures"}: ${parents}</p>`;
}

function indexBody(lang: Lang): string {
  const ja = lang === "ja";
  const byPref = PREFECTURES.map((prefecture) => {
    const districts = smdsIn(prefecture.slug)
      .map((district) => `<a href="${esc(smdPath(lang, prefecture.slug, district.n))}">${esc(district.lawHeading)}</a>`)
      .join(" ");
    const hc = hcFor(prefecture.slug);
    const hcLink = hc
      ? ` · <a href="${esc(hcPath(lang, hc.canonical))}">${esc(hc.lawName)}</a>`
      : "";
    return `<li><a href="${esc(prefecturePath(lang, prefecture.slug))}">${esc(prefecture.officialName)}</a> ${districts}${hcLink}</li>`;
  }).join("");
  const blocks = LEVEL2.blocks
    .map((block) => `<li><a href="${esc(blockPath(lang, block.id))}">${esc(block.nameJa)}</a>（${esc(block.seatsKanji)}）</li>`)
    .join("");
  return `
<p>${
    ja
      ? "小選挙区は289、比例代表の選挙区は11、参議院の選挙区は45です。市区町村のページはまだありません。"
      : "There are 289 single-member districts, 11 proportional districts, and 45 Councillors’ districts. Municipality pages are not in this release."
  }</p>
<h2>${ja ? "衆議院比例代表" : "House proportional districts"}</h2>
<ul>${blocks}</ul>
<h2>${ja ? "都道府県ごとの小選挙区と参議院選挙区" : "Single-member districts and Councillors’ districts"}</h2>
<ul>${byPref}</ul>`;
}

function renderSmd(lang: Lang, district: Smd) {
  const ja = lang === "ja";
  const prefecture = prefectureBySlug(district.prefecture);
  if (!prefecture) throw new Error(district.prefecture);
  const path = smdPath(lang, district.prefecture, district.n);
  const h1 = `${prefecture.officialName} ${district.lawHeading}`;
  const html = page({
    lang,
    path,
    title: h1,
    description: ja
      ? `${h1}: 衆議院小選挙区。別表第一の見出しと、議員一覧（${LEVEL2.hrListAsOf}）の氏名。非公式の情報です。`
      : `${h1}: a House of Representatives single-member district. Annex 1 headings and the member list (${LEVEL2.hrListAsOf}). Unofficial information.`,
    eyebrow: ja ? "衆議院小選挙区" : "House of Representatives single-member district",
    h1,
    lede: ja ? undefined : prefecture.englishName,
    crumbs: [
      ...baseCrumbs(lang),
      { name: prefecture.officialName, path: prefecturePath(lang, prefecture.slug) },
      { name: district.lawHeading, path },
    ],
    body: smdBody(lang, district),
    sourceIds: ["koukyo", "soumu-kuwari", "shugiin-members", "shugiin-list", "soumu-guide"],
  });
  write(lang, path, html);
}

function renderBlock(lang: Lang, block: PrBlock) {
  const ja = lang === "ja";
  const path = blockPath(lang, block.id);
  const html = page({
    lang,
    path,
    title: block.nameJa,
    description: ja
      ? `${block.nameJa}: 衆議院比例代表の選挙区。別表第二の「${block.seatsKanji}」と、議員一覧の氏名。非公式の情報です。`
      : `${block.nameJa}: a House proportional district. Annex 2 prints “${block.seatsKanji}”. Unofficial information.`,
    eyebrow: ja ? "衆議院比例代表" : "House of Representatives proportional district",
    h1: block.nameJa,
    crumbs: [...baseCrumbs(lang), { name: block.nameJa, path }],
    body: blockBody(lang, block),
    sourceIds: ["koukyo", "shugiin-members", "shugiin-list", "soumu-kinds"],
  });
  write(lang, path, html);
}

function renderHc(lang: Lang, district: HcDistrict) {
  const ja = lang === "ja";
  const path = hcPath(lang, district.canonical);
  const prefecture = prefectureBySlug(district.canonical);
  if (!prefecture) throw new Error(district.canonical);
  const html = page({
    lang,
    path,
    title: district.lawName,
    description: ja
      ? `${district.lawName}: 参議院選挙区。別表第三の「${district.seatsKanji}」と、議員一覧（${LEVEL2.hcListAsOf}）。非公式の情報です。`
      : `${district.lawName}: a House of Councillors district. Annex 3 prints “${district.seatsKanji}”. Unofficial information.`,
    eyebrow: ja ? "参議院選挙区" : "House of Councillors district",
    h1: district.lawName,
    crumbs: [
      ...baseCrumbs(lang),
      { name: prefecture.officialName, path: prefecturePath(lang, prefecture.slug) },
      { name: district.lawName, path },
    ],
    body: hcBody(lang, district),
    sourceIds: ["koukyo", "sangiin-hireiku", "sangiin-218", "soumu-hc-2025", "soumu-guide"],
  });
  write(lang, path, html);
}

function renderIndex(lang: Lang) {
  const ja = lang === "ja";
  const path = districtsIndexPath(lang);
  const html = page({
    lang,
    path,
    title: ja ? "選挙区" : "Districts",
    description: ja
      ? "衆議院の小選挙区289と比例代表11、参議院の選挙区45への一覧です。非公式の情報です。"
      : "Index of 289 House single-member districts, 11 proportional districts, and 45 Councillors’ districts. Unofficial information.",
    eyebrow: ja ? "第二層" : "Level 2",
    h1: ja ? "選挙区" : "Districts",
    crumbs: baseCrumbs(lang),
    body: indexBody(lang),
    sourceIds: ["koukyo", "shugiin-members", "sangiin-hireiku", "soumu-kinds"],
  });
  write(lang, path, html);
}

for (const lang of ["ja", "en"] as const) {
  rmSync(join(publicDir, "jp", lang), { recursive: true, force: true });
}

let written = 0;
for (const lang of ["ja", "en"] as const) {
  renderIndex(lang);
  written += 1;
  for (const district of LEVEL2.smd) {
    renderSmd(lang, district);
    written += 1;
  }
  for (const block of LEVEL2.blocks) {
    renderBlock(lang, block);
    written += 1;
  }
  for (const district of LEVEL2.hc) {
    renderHc(lang, district);
    written += 1;
  }
}

console.log(`japan district html: ${written}`);
