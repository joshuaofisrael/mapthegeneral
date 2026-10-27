/**
 * Taiwan local elections, 28 November 2026.
 * The date is from the Central Election Commission chair’s 27 May 2026
 * report to the Legislative Yuan. Voting-clock hours were not in that report.
 */
import type { ElectionSeoProfile } from "./election-seo";

const REPORT = "https://ppg.ly.gov.tw/ppg/SittingAttachment/download/2026052199/0256000260722042002.pdf";
const ART53 = "https://law.moj.gov.tw/LawClass/LawSingle.aspx?FLNO=53&Pcode=D0020010";
const NET = "https://law.cec.gov.tw/LawContent.aspx?id=GL000134";
const CEC = "https://web.cec.gov.tw/";
const ARTICLE = "https://web.cec.gov.tw/central/article/61722";
const ZH = "/tw/zh/elections/difang-2026/";
const EN = "/tw/en/elections/local-2026/";
const OPENS = "2026-11-28T23:59:00+08:00";

function night(copy: {
  countdown: string;
  countdownNote: string;
  units: string[];
  awaiting: string;
  fallback: string;
  preliminary: string;
  finalLabel: string;
  updated: string;
  fetched: string;
  source: string;
  name: string;
  votes: string;
  share: string;
  officialLabel: string;
}): string {
  const config = {
    id: "tw-2026-11-28",
    opens: OPENS,
    feed: "/live/tw-2026-11-28.json",
    official: CEC,
    timeZone: "Asia/Taipei",
    ...copy,
  };
  const json = JSON.stringify(config).replace(/</g, "\\u003c");
  return `<script type="application/json" id="night-config">${json}</script>
<div id="night-board"><p><a href="${CEC}">web.cec.gov.tw</a></p></div>
<script src="/live/night.js" defer></script>`;
}

const NIGHT_ZH = night({
  countdown: "投票日結束前不顯示得票，距離該日最後一分鐘還有",
  countdownNote:
    "2026年10月27日讀到的頁面沒有寫出投票截止的鐘點。因此在11月28日臺灣時間23:59之前，這裡不顯示得票。23:59不是委員會公布的截止時間。",
  units: ["日", "小時", "分", "秒"],
  awaiting: "已過這個頁面自定的開放時間。檔案裡還沒有委員會的列。頁面會自己再試。",
  fallback: "結果檔沒有載入。請改看中央選舉委員會網站。",
  preliminary: "初步官方得票",
  finalLabel: "確定結果",
  updated: "更新",
  fetched: "讀取",
  source: "來源：中央選舉委員會。不是預測。",
  name: "候選人或名單",
  votes: "得票",
  share: "得票比例",
  officialLabel: "web.cec.gov.tw",
});

const NIGHT_EN = night({
  countdown: "No count until the end of voting day, which this page treats as",
  countdownNote:
    "The pages read on 27 October 2026 did not print the clock time when voting ends. This page shows no count before 23:59 Taiwan time on 28 November. 23:59 is not a closing time published by the Commission.",
  units: ["days", "hours", "min", "sec"],
  awaiting: "The opening time this page set has passed. The file still has no Commission rows. This page tries again on its own.",
  fallback: "The results file did not load. The Commission’s site is the link.",
  preliminary: "Preliminary official count",
  finalLabel: "Final results",
  updated: "Updated",
  fetched: "Fetched",
  source: "Source: Central Election Commission. Not a forecast.",
  name: "Candidate or list",
  votes: "Votes",
  share: "Share",
  officialLabel: "web.cec.gov.tw",
});

const BODY_ZH = `<h2>選什麼</h2>
<p>立法院公開的中央選舉委員會業務報告，日期是115年5月27日，主任委員說明：本會114年10月31日第622次委員會議決議，115年地方公職人員選舉定於115年11月28日（星期六）投票。同一份報告的程序表把當天寫成「投票、開票」。報告沒有寫出開票所幾點開門、幾點截止。</p>
<h2>怎麼投票</h2>
<p>這份報告列出的期程包括：115年8月20日發布選舉公告、8月31日至9月4日受理候選人登記、10月23日候選人抽籤決定號次、11月12日公告直轄市長選舉候選人名單、11月17日公告直轄市議員與縣（市）長及縣（市）議員選舉候選人名單、11月28日投票與開票、12月4日公告當選人名單。鐘點不在這份報告裡，所以這裡不補上。</p>
<p>投票所位置不在已讀的頁面裡。請向<a href="${CEC}">中央選舉委員會</a>查。</p>
<h2>候選人</h2>
<p>2026年10月27日沒有打開一份已公告的候選人名單，所以這裡沒有姓名，也沒有號次。報告裡的11月12日與11月17日是程序表上的公告日，不是這頁抄來的名單。</p>
<h2>以前的官方結果</h2>
<p>已讀的頁面沒有附上某一次地方選舉的全國得票表。這裡不轉抄新聞數字。官方網站是<a href="${CEC}">web.cec.gov.tw</a>。中選會新聞稿頁在直接讀取時沒有取出內文，所以不用那一頁的摘要當得票來源。</p>
<h2>開票夜</h2>
<p>11月28日臺灣時間23:59之前，這裡沒有得票。23:59不是委員會寫的截止鐘點，只是投票日的最後一分鐘，用來避免在投票日還沒結束時顯示數字。之後這頁只讀同一個網站上的檔案。檔案若是空的，連結仍指向委員會。這頁沒有預測。</p>
${NIGHT_ZH}`;

const BODY_EN = `<h2>What is being elected</h2>
<p>The Central Election Commission chair’s report to the Legislative Yuan, dated 27 May 2026, says the Commission’s 622nd meeting on 31 October 2025 resolved that the 2026 local elections (year 115 of the Republic of China calendar) will be held on Saturday 28 November 2026. The same report’s timetable marks that day as voting and counting. It does not print the opening or closing clock time.</p>
<h2>How to vote</h2>
<p>The report’s timetable includes an election notice on 20 August 2026, candidate registration from 31 August to 4 September, a ballot-number draw on 23 October, publication of special-municipality mayoral candidates on 12 November, publication of special-municipality councillor, county and city mayor, and county and city councillor candidates on 17 November, voting and counting on 28 November, and publication of the elected list on 4 December. Clock times are not in the report, so none are added here.</p>
<p>Polling-place locations were not on the pages read. Check with the <a href="${CEC}">Central Election Commission</a>.</p>
<h2>Candidates</h2>
<p>No published candidate list was opened on 27 October 2026, so this page has no names and no ballot order. The 12 November and 17 November dates are announcement dates in the report’s timetable, not a list copied onto this page.</p>
<h2>Earlier official results</h2>
<p>The pages read did not include a national results table from an earlier local election. This page does not copy figures from news reports. The Commission’s site is <a href="${CEC}">web.cec.gov.tw</a>. A direct fetch of the Commission’s news page did not return the article body, so that page is not used as a results table.</p>
<h2>Election night</h2>
<p>No count is shown here before 23:59 Taiwan time on 28 November. 23:59 is not a closing time printed by the Commission. It is the last minute of the voting day, so a count is not shown while that calendar day is still running. After that minute the page reads only a same-origin file. If the file is empty, the link remains the Commission. This page has no forecast.</p>
${NIGHT_EN}`;

const alternates = [
  { hreflang: "zh-Hant", path: ZH },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: ZH },
];

export const TW_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "tw-2026-11-28",
    pollingDay: "2026-11-28",
    startDate: "2026-11-28T00:00:00+08:00",
    endDate: OPENS,
    organizerName: "中央選舉委員會",
    organizerUrl: CEC,
    lastmod: "2026-10-27",
    candidateListId: "tw-local-2026",
    homeLinks: [
      {
        href: ZH,
        label: "Taiwan local elections, 28 November 2026",
        detail:
          "Saturday 28 November 2026. The Commission report does not print the closing clock time, so this page shows no count before 23:59 Taiwan time.",
      },
    ],
    pages: [
      {
        lang: "zh",
        readWord: "已讀",
        htmlLang: "zh",
        path: ZH,
        title: "115年地方公職人員選舉，11月28日",
        description: "115年地方公職人員選舉定於11月28日投票。已讀頁面沒有投票截止鐘點，因此23:59前不顯示得票。非官方頁面。",
        ogDescription: "115年11月28日地方公職人員選舉。中央選舉委員會。23:59前不顯示得票。非官方頁面。",
        ogLocale: "zh_TW",
        alternates,
        crumbs: [
          { name: "首頁", path: "/" },
          { name: "臺灣", path: "/tw/" },
          { name: "臺灣", path: "/tw/zh/" },
          { name: "11月28日", path: ZH },
        ],
        eyebrow: "11月28日",
        h1: "地方公職人員選舉",
        lede: "星期六，11月28日。委員會報告寫的是投票日，沒有寫幾點截止。",
        updated: "最近更新：2026年10月27日。",
        reportLabel: "回報錯誤",
        officeHref: CEC,
        bannerBefore: "非官方資訊。請向",
        bannerAfter: "中央選舉委員會查證",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/tw/zh/", label: "臺灣" },
          { href: EN, label: "English" },
        ],
        eventName: "115年地方公職人員選舉",
        locationName: "臺灣",
        addressRegion: "臺灣",
        addressCountry: "TW",
        keyDatesHeading: "投票、期程與官方來源",
        keyDatesIntro: "下面每一行都來自2026年10月27日讀過的頁面。那些頁面沒印的鐘點，這裡不加。",
        keyDates: [
          {
            label: "日期",
            text: "立法院公開的委員會報告寫明，第622次委員會議決議115年11月28日投票。",
            links: [{ label: "立法院公開的委員會報告", href: REPORT }],
          },
          {
            label: "期程",
            text: "同一份報告的程序表列出8月20日選舉公告，以及11月12日與11月17日的候選人公告日。",
            links: [{ label: "同一份報告的程序表", href: REPORT }],
          },
          {
            label: "民調",
            text: "公職人員選舉罷免法第53條規定，投票日前十日起至投票時間截止前，不得發布、報導、散布、評論或引述選舉民調。",
            links: [{ label: "公職人員選舉罷免法第53條", href: ART53 }],
          },
          {
            label: "網路",
            text: "中選會函釋說明，藉由網路發布、報導、散布、評論或引述選舉民調，同樣適用上開限制。",
            links: [{ label: "中選會函釋", href: NET }],
          },
          {
            label: "結果",
            text: "委員會網站是 web.cec.gov.tw。新聞稿頁的內文在2026年10月27日沒有取出，所以不用它補鐘點。",
            links: [{ label: "委員會網站", href: CEC }],
          },
        ],
        faqHeading: "問題",
        faqs: [
          {
            question: "投票日是哪一天？",
            text: "委員會報告寫的是115年11月28日，星期六。",
            links: [{ label: "委員會報告", href: REPORT }],
          },
          {
            question: "幾點開始、幾點結束？",
            text: "2026年10月27日讀到的報告沒有這個鐘點，所以這頁不寫。",
            links: [{ label: "2026年10月27日讀到的報告", href: REPORT }],
          },
          {
            question: "候選人名單在哪裡？",
            text: "沒有打開已公告的名單，所以沒有姓名。程序表上的公告日是11月12日與11月17日。",
            links: [{ label: "程序表上的公告日", href: REPORT }],
          },
          {
            question: "這頁會刊登民調嗎？",
            text: "不會。第53條禁止在投票日前十日到投票截止前發布或引述。這頁任何一天都不印這類數字。",
            links: [{ label: "第53條", href: ART53 }],
          },
          {
            question: "什麼時候看得到得票？",
            text: "不早於11月28日臺灣時間23:59，而且只在委員會網站有得票之後。23:59不是公布的截止時間。",
            links: [{ label: "委員會網站", href: ARTICLE }],
          },
        ],
        relatedHeading: "其他",
        related: [
          { href: "/tw/zh/", label: "臺灣" },
          { href: EN, label: "English" },
        ],
        bodyHtml: BODY_ZH,
        sourcesHeading: "來源",
        sources: [
          { href: REPORT, label: "立法院，中央選舉委員會業務報告，115年5月27日", readOn: "2026-10-27" },
          { href: ART53, label: "全國法規資料庫，公職人員選舉罷免法第53條", readOn: "2026-10-27" },
          { href: NET, label: "中選會函釋，網路發布民調亦適用", readOn: "2026-10-27" },
          { href: ARTICLE, label: "中選會，115年地方選舉投票日新聞頁；內文未取出", readOn: "2026-10-27" },
          { href: CEC, label: "中央選舉委員會網站", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Taiwan local elections, 28 November 2026",
        description:
          "Taiwan local elections on Saturday 28 November 2026. The closing clock time was not on the pages read, so no count appears before 23:59 Taiwan time. Unofficial information.",
        ogDescription:
          "Taiwan local elections on 28 November 2026. Central Election Commission. No count before 23:59 Taiwan time. Unofficial information.",
        ogLocale: "en_GB",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Taiwan", path: "/tw/" },
          { name: "Taiwan", path: "/tw/en/" },
          { name: "28 November 2026", path: EN },
        ],
        eyebrow: "28 November 2026",
        h1: "Local elections",
        lede: "Saturday 28 November 2026. The Commission report names the voting day and does not print a closing clock time.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: CEC,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Central Election Commission",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/tw/en/", label: "Taiwan" },
          { href: ZH, label: "繁體中文" },
        ],
        eventName: "Taiwan local elections, 28 November 2026",
        locationName: "Taiwan",
        addressRegion: "Taiwan",
        addressCountry: "TW",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "Each line below is from a page read on 27 October 2026. A clock time those pages did not print is not added.",
        keyDates: [
          {
            label: "Date",
            text: "The Commission report published by the Legislative Yuan says the 622nd meeting resolved that voting is on 28 November 2026.",
            links: [{ label: "The Commission report published by the Legislative Yuan", href: REPORT }],
          },
          {
            label: "Timetable",
            text: "That report’s timetable lists the election notice on 20 August 2026 and candidate announcements on 12 and 17 November.",
            links: [{ label: "That report’s timetable", href: REPORT }],
          },
          {
            label: "Surveys",
            text: "Article 53 of the Public Officials Election and Recall Act bars publishing or quoting election survey material from ten days before voting day until voting ends.",
            links: [{ label: "Article 53 of the Public Officials Election and Recall Act", href: ART53 }],
          },
          {
            label: "Internet",
            text: "A Commission interpretation says publishing that survey material on the internet is covered by the same limit.",
            links: [{ label: "A Commission interpretation", href: NET }],
          },
          {
            label: "Results",
            text: "The Commission site is web.cec.gov.tw. The news-page body was not retrieved on 27 October 2026, so it is not used to fill in a clock time.",
            links: [{ label: "The Commission site", href: CEC }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is voting day?",
            text: "The Commission report says Saturday 28 November 2026.",
            links: [{ label: "The Commission report", href: REPORT }],
          },
          {
            question: "What are the voting hours?",
            text: "The report read on 27 October 2026 does not print them, so this page does not add them.",
            links: [{ label: "The report read on 27 October 2026", href: REPORT }],
          },
          {
            question: "Where is the candidate list?",
            text: "No published list was opened, so there are no names. The timetable’s announcement dates are 12 and 17 November.",
            links: [{ label: "The timetable’s announcement dates", href: REPORT }],
          },
          {
            question: "Does this page print surveys?",
            text: "No. Article 53 bars publishing or quoting them from ten days before voting day until voting ends. This page prints no such figures on any day.",
            links: [{ label: "Article 53", href: ART53 }],
          },
          {
            question: "When does the vote count appear?",
            text: "Not before 23:59 Taiwan time on 28 November, and only after the Commission site has a count. 23:59 is not a published closing time.",
            links: [{ label: "the Commission site", href: ARTICLE }],
          },
        ],
        relatedHeading: "Also",
        related: [
          { href: "/tw/en/", label: "Taiwan" },
          { href: ZH, label: "繁體中文" },
        ],
        bodyHtml: BODY_EN,
        sourcesHeading: "Sources",
        sources: [
          { href: REPORT, label: "Legislative Yuan, Central Election Commission business report, 27 May 2026", readOn: "2026-10-27" },
          { href: ART53, label: "Laws and regulations database, Public Officials Election and Recall Act article 53", readOn: "2026-10-27" },
          { href: NET, label: "Central Election Commission interpretation on internet publication of surveys", readOn: "2026-10-27" },
          { href: ARTICLE, label: "Central Election Commission news page on the 2026 voting day; body not retrieved", readOn: "2026-10-27" },
          { href: CEC, label: "Central Election Commission website", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
