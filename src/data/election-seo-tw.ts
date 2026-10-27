/**
 * Taiwan local public-office elections, Saturday 28 November 2026.
 * Dates are the timetable in the Central Election Commission’s 16 July 2026
 * report to the Legislative Yuan. That report does not print an opening or
 * closing hour, so the Event ends at 00:00 on 29 November, Taiwan time.
 * No candidate names: the public notices in the timetable are 12 and 17 November 2026.
 */
import type { ElectionSeoProfile } from "./election-seo";

const REPORT = "https://ppg.ly.gov.tw/ppg/SittingAttachment/download/2026071421/68105040273002713004.pdf";
const ACT = "https://law.moj.gov.tw/ENG/LawClass/LawAll.aspx?pcode=D0020010";
const ART53 = "https://law.moj.gov.tw/LawClass/LawSingle.aspx?FLNO=53&Pcode=D0020010";
const CEC = "https://www.cec.gov.tw/";
const PREV = "https://web.cec.gov.tw/central/article/36817";

const ZH = "/tw/zh/elections/difang-gongzhi-2026/";
const EN = "/tw/en/elections/local-2026/";
const OPEN = "2026-11-29T00:00:00+08:00";

const alternates = [
  { hreflang: "zh-Hant", path: ZH },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: ZH },
];

const ZH_BODY = `<h2>這次選什麼</h2>
<p>中央選舉委員會2026年7月16日送立法院的<a href="${REPORT}">專題報告</a>寫明，本會2025年10月31日第622次委員會議決議，115年地方公職人員選舉於2026年11月28日星期六投票。本頁只用報告印出的日期。</p>
<p class="tools"><a href="${EN}">English</a> · <a href="/tw/">臺灣</a> · <a href="/tw/en/elections/">Elections</a></p>
<h2>誰投票、怎麼投</h2>
<p><a href="${ACT}">公職人員選舉罷免法</a>英譯規定，年滿二十歲的中華民國公民有選舉權，並須在選舉區連續居住滿四個月。選舉公告發布後才遷入的人，對該次選舉沒有選舉權。選舉人在戶籍地的投票所投票，法律另有規定的除外。在同一直轄市或縣市投票所工作的人，可以在工作地或戶籍地投票所投票。領票要出示國民身分證。必須在規定的投票時間內到達，逾時不予進入；已經在所內的人仍可投票。數種選舉同所舉行時，進入一次。</p>
<p>這份報告沒有印出開所或閉所的鐘點。英文頁面讀到的委員會文章也沒有給出可引用的鐘點。本頁不補鐘點。得票在台灣時間2026年11月29日0時之前不顯示。那個時刻是投票日的次日開始，不是委員會印出的閉所時間。</p>
<p>報告寫明，各直轄市、縣市選舉委員會在2026年4月30日前函報評估，全國預計設置投票所18,227所，比111年地方公職人員選舉及憲法修正案公民複決的17,649所多578所，比114年全國性公民投票的17,832所多395所。18,227所是預計，不是最終清冊。</p>
<h2>候選人</h2>
<p>2026年10月27日讀到的頁面沒有姓名清冊。報告把登記申請定在2026年8月31日至9月4日，抽籤定在10月23日。直轄市長候選人的公告日是11月12日，直轄市議員、縣市長和縣市議員候選人的公告日是11月17日。姓名等這些公告成為可連結的原文再列。這裡不排一個尚未公告的號次。</p>
<h2>上一次選舉</h2>
<p>委員會<a href="${PREV}">111年地方公職人員選舉公告</a>的標題印有111年11月26日星期六，即2022年11月26日，為該次地方選舉及憲法修正案公民複決的投票日。本頁不抄那次的得票。</p>
<h2>調查資料</h2>
<p><a href="${ART53}">公職人員選舉罷免法第53條</a>規定，自投票日前十日起至投票時間截止前，不得發布、報導、散布、評論或引述調查資料。同法第5條把投票日前的日數從前一日起算，所以這十天自2026年11月18日開始。本站不刊登調查數字，也不做預測。</p>
<p>下一節在台灣時間2026年11月29日0時之前只顯示倒數，不列得票。得票只讀同一網域上的檔案。那個時刻之前檔案沒有列。讀不到檔案時，頁面留著中央選舉委員會的連結。</p>`;

const EN_BODY = `<h2>What is being elected</h2>
<p>The Central Election Commission’s <a href="${REPORT}">report to the Legislative Yuan</a>, dated 16 July 2026, says the Commission’s 622nd meeting on 31 October 2025 set polling for the local public-office elections on Saturday 28 November 2026. The report calls that election the ROC year 115 local elections. This page uses the date the report prints.</p>
<p class="tools"><a href="${ZH}">繁體中文</a> · <a href="/tw/en/">Taiwan</a> · <a href="/tw/en/elections/">Elections</a></p>
<h2>Who votes, and how</h2>
<p>The <a href="${ACT}">Civil Servants Election and Recall Act</a> gives suffrage to a citizen of the Republic of China who has reached the age of 20, and requires at least four consecutive months of residence in the electoral district. A person who moves into the district after the election notice has no suffrage for that election. A voter votes at the polling station for the registered domicile unless the Act provides otherwise. A worker at a station in the same municipality or county may vote at the station where they work or at the domicile station. The voter presents a national identification card to receive a ballot. A person must arrive during the hours specified for voting. Someone who arrives late is not admitted. Someone already inside may still vote. When several elections share a station, entry is once.</p>
<p>The report does not print an opening hour or a closing hour. This page does not supply one. No count is shown before 00:00 on 29 November 2026, Taiwan time. That instant is the start of the next calendar day. It is not a closing time the Commission printed.</p>
<p>The report says commissions had reported, by 30 April 2026, an expected 18,227 polling stations. It says that is 578 more than the 17,649 stations of the ROC year 111 local elections and constitutional referendum, and 395 more than the 17,832 stations of the ROC year 114 national referendum. The figure 18,227 is marked as expected. It is not a final list of stations.</p>
<h2>Candidates</h2>
<p>The pages read on 27 October 2026 did not include a name list. The report sets registration applications from 31 August through 4 September 2026 and the ballot-number draw on 23 October 2026. The public notice of special-municipality mayoral candidates is 12 November 2026. The public notice of special-municipality councillors, county and city mayors, and county and city councillors is 17 November 2026. Names will be copied here when those notices are the text being linked. No ballot order is printed before that.</p>
<h2>The previous election</h2>
<p>The title of the Commission’s <a href="${PREV}">notice of the ROC year 111 local elections</a> prints Saturday 26 November 2022 as the polling day of those elections and the constitutional-amendment referendum. This page does not copy a vote count from that election.</p>
<h2>Survey material</h2>
<p><a href="${ART53}">Article 53 of the Civil Servants Election and Recall Act</a> says that from ten days before election day until the polls close, no party or person may report, disseminate, comment on, or quote the survey material in the two paragraphs before that sentence. Article 5 of the Act counts a date before election day by starting on the day before election day and counting backwards, so the ten days begin on 18 November 2026. This site publishes no survey figure and no projection.</p>
<p>The next section shows a countdown, and no count, until 00:00 on 29 November 2026, Taiwan time. A count is read only from a file on this site. That file lists nothing before that instant. If the file cannot be read, the section keeps the link to the Central Election Commission.</p>`;

const reportLink = { label: "Legislative Yuan report", href: REPORT };
const zhReport = { label: "立法院專題報告", href: REPORT };

export const TW_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "tw-2026-local",
    pollingDay: "2026-11-28",
    startDate: "2026-11-28T00:00:00+08:00",
    endDate: OPEN,
    organizerName: "Central Election Commission",
    organizerUrl: CEC,
    lastmod: "2026-10-27",
    homeLinks: [
      {
        href: ZH,
        label: "地方公職人員選舉，2026年11月28日",
        detail: "星期六。日期出自中央選舉委員會2026年7月16日送立法院的專題報告。",
      },
      {
        href: EN,
        label: "Taiwan local elections, 28 November 2026",
        detail: "Saturday. The date is from the Central Election Commission’s 16 July 2026 report to the Legislative Yuan.",
      },
    ],
    pages: [
      {
        lang: "zh",
        htmlLang: "zh-Hant",
        readWord: "讀於",
        path: ZH,
        title: "地方公職人員選舉，2026年11月28日",
        description:
          "2026年11月28日星期六地方公職人員選舉。投票方式、候選人公告日與上一次投票日，出自中央選舉委員會送立法院的專題報告與公職人員選舉罷免法。非官方資訊。",
        ogDescription: "地方公職人員選舉，2026年11月28日星期六。候選人公告日為11月12日與11月17日。非官方資訊。",
        ogLocale: "zh_TW",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "臺灣", path: "/tw/" },
          { name: "地方公職人員選舉", path: ZH },
        ],
        eyebrow: "2026年11月28日星期六",
        h1: "地方公職人員選舉",
        lede: "中央選舉委員會第622次委員會議決議於這一天投票。報告沒有印出開閉所鐘點。",
        updated: "最近更新：2026年10月27日。",
        reportLabel: "回報錯誤",
        officeHref: CEC,
        bannerBefore: "非官方資訊。查證請見",
        bannerAfter: "中央選舉委員會",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/tw/", label: "臺灣" },
          { href: EN, label: "English" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "地方公職人員選舉，2026年11月28日",
        locationName: "臺灣",
        addressRegion: "臺灣",
        addressCountry: "TW",
        keyDatesHeading: "投票方式、重要日期與官方來源",
        keyDatesIntro: "下列日期都印在立法院專題報告。報告沒有印出的鐘點，這裡不補。",
        keyDates: [
          {
            label: "登記",
            text: "立法院專題報告把候選人登記申請定在2026年8月31日至9月4日，登記公告日是8月27日。",
            links: [zhReport],
          },
          {
            label: "抽籤",
            text: "立法院專題報告把候選人抽籤定在2026年10月23日，並寫明10月16日前審定名單並通知抽籤。",
            links: [zhReport],
          },
          {
            label: "名冊",
            text: "立法院專題報告把選舉人名冊編造完成定在2026年11月8日，選舉人人數於11月24日前公告。",
            links: [zhReport],
          },
          {
            label: "公告候選人",
            text: "立法院專題報告把直轄市長候選人公告定在2026年11月12日，把直轄市議員、縣市長和縣市議員候選人公告定在11月17日。",
            links: [zhReport],
          },
          {
            label: "投票",
            text: "立法院專題報告把投票和開票定在2026年11月28日星期六。報告沒有印出開所或閉所鐘點。",
            links: [zhReport],
          },
          {
            label: "當選人",
            text: "立法院專題報告把當選人名單的公告定在2026年12月4日。",
            links: [zhReport],
          },
        ],
        faqHeading: "常見問題",
        faqs: [
          {
            question: "地方公職人員選舉哪一天投票？",
            text: "立法院專題報告寫明，中央選舉委員會在2025年10月31日第622次委員會議決議，於2026年11月28日星期六投票。",
            links: [zhReport],
          },
          {
            question: "誰有投票權？",
            text: "公職人員選舉罷免法規定，年滿二十歲的中華民國公民有選舉權，並須在選舉區連續居住滿四個月。選舉公告發布後才遷入的人，對該次選舉沒有選舉權。",
            links: [{ label: "公職人員選舉罷免法", href: ACT }],
          },
          {
            question: "要到哪裡投票？",
            text: "公職人員選舉罷免法規定，選舉人在戶籍地投票所投票，法律另有規定的除外，並出示國民身分證領票。立法院專題報告沒有印出開閉所鐘點，本頁不補鐘點。",
            links: [
              { label: "公職人員選舉罷免法", href: ACT },
              zhReport,
            ],
          },
          {
            question: "候選人名單什麼時候公告？",
            text: "立法院專題報告把直轄市長候選人的公告定在2026年11月12日，把直轄市議員、縣市長和縣市議員候選人的公告定在2026年11月17日。2026年10月27日讀到的頁面沒有姓名清冊。",
            links: [zhReport],
          },
          {
            question: "這個網站會刊登調查數字嗎？",
            text: "本站不刊登調查數字，也不做預測。公職人員選舉罷免法第53條規定，自投票日前十日起至投票時間截止前，不得發布、報導、散布、評論或引述調查資料。依同法計算投票日前的日數，這十天自2026年11月18日開始。",
            links: [{ label: "公職人員選舉罷免法第53條", href: ART53 }],
          },
          {
            question: "開票結果什麼時候顯示？",
            text: "立法院專題報告沒有印出投票截止鐘點，所以本頁在台灣時間2026年11月29日0時之前不列得票。那個時刻之後，正式開票一節只抄中央選舉委員會公布的數字。",
            links: [zhReport, { label: "中央選舉委員會", href: CEC }],
          },
        ],
        relatedHeading: "相關頁面",
        related: [
          { href: "/", label: "Home" },
          { href: "/tw/", label: "臺灣" },
          { href: EN, label: "English" },
          { href: "/tw/en/faq/", label: "Questions" },
          { href: "/tw/en/sources/", label: "Sources" },
        ],
        bodyHtml: ZH_BODY,
        sourcesHeading: "來源",
        sources: [
          { href: REPORT, label: "中央選舉委員會，115年地方公職人員選舉專題報告，2026年7月16日", readOn: "2026-10-27" },
          { href: ACT, label: "公職人員選舉罷免法，法務部英譯", readOn: "2026-10-27" },
          { href: ART53, label: "公職人員選舉罷免法第53條", readOn: "2026-10-27" },
          { href: CEC, label: "中央選舉委員會", readOn: "2026-10-27" },
          { href: PREV, label: "中央選舉委員會，111年11月26日地方公職人員選舉公告", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Taiwan local elections, 28 November 2026",
        description:
          "Taiwan local public-office elections on Saturday 28 November 2026. Voting rules, candidate-notice dates and the previous polling day, from the Central Election Commission and the election statute. Unofficial information.",
        ogDescription:
          "Taiwan local elections, Saturday 28 November 2026. Candidate notices are 12 and 17 November 2026. Unofficial information.",
        ogLocale: "en_US",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Taiwan", path: "/tw/" },
          { name: "Elections", path: "/tw/en/elections/" },
          { name: "Local elections, 28 November 2026", path: EN },
        ],
        eyebrow: "Saturday 28 November 2026",
        h1: "Taiwan local elections",
        lede: "The Central Election Commission’s 622nd meeting set this Saturday. The report does not print opening or closing hours.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: CEC,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Central Election Commission",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/tw/en/", label: "Taiwan" },
          { href: ZH, label: "繁體中文" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Taiwan local public-office elections, 28 November 2026",
        locationName: "Taiwan",
        addressRegion: "Taiwan",
        addressCountry: "TW",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "Each date below is printed in the Commission’s report to the Legislative Yuan. A clock time that report did not print is not listed.",
        keyDates: [
          {
            label: "Registration",
            text: "The Legislative Yuan report sets candidate-registration applications from 31 August through 4 September 2026, after a registration notice on 27 August 2026.",
            links: [reportLink],
          },
          {
            label: "Ballot numbers",
            text: "The Legislative Yuan report sets the ballot-number draw for 23 October 2026, after the candidate list was to be settled and the draw notified by 16 October 2026.",
            links: [reportLink],
          },
          {
            label: "Electoral roll",
            text: "The Legislative Yuan report sets completion of the electoral roll for 8 November 2026, and a notice of elector numbers by 24 November 2026.",
            links: [reportLink],
          },
          {
            label: "Candidate notices",
            text: "The Legislative Yuan report sets a public notice of special-municipality mayoral candidates for 12 November 2026, and a public notice of special-municipality councillors, county and city mayors, and county and city councillors for 17 November 2026.",
            links: [reportLink],
          },
          {
            label: "Polling day",
            text: "The Legislative Yuan report sets polling and the count for Saturday 28 November 2026. It does not print an opening hour or a closing hour.",
            links: [reportLink],
          },
          {
            label: "People elected",
            text: "The Legislative Yuan report sets a notice of the people elected for 4 December 2026.",
            links: [reportLink],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When are Taiwan’s local elections?",
            text: "The Legislative Yuan report says the Commission’s 622nd meeting on 31 October 2025 set polling for Saturday 28 November 2026.",
            links: [reportLink],
          },
          {
            question: "Who can vote?",
            text: "The Civil Servants Election and Recall Act gives suffrage to a citizen of the Republic of China who has reached the age of 20, and requires at least four consecutive months of residence in the electoral district. A person who moves into the district after the election notice has no suffrage for that election.",
            links: [{ label: "Civil Servants Election and Recall Act", href: ACT }],
          },
          {
            question: "Where do voters cast a ballot?",
            text: "The Civil Servants Election and Recall Act says a voter votes at the polling station for the registered domicile, unless the Act provides otherwise, and presents a national identification card to receive a ballot. The Legislative Yuan report does not print opening or closing hours, and this page does not supply them.",
            links: [
              { label: "Civil Servants Election and Recall Act", href: ACT },
              reportLink,
            ],
          },
          {
            question: "When will candidate names be published?",
            text: "The Legislative Yuan report sets the public notice of special-municipality mayoral candidates for 12 November 2026 and the public notice of councillors, county and city mayors, and county and city councillors for 17 November 2026. The pages read on 27 October 2026 did not include a name list.",
            links: [reportLink],
          },
          {
            question: "Does this site publish survey figures?",
            text: "This site publishes no survey figure and no projection. Article 53 of the Civil Servants Election and Recall Act forbids any party or person, from ten days before election day until the polls close, to report, disseminate, comment on, or quote the survey material in the two paragraphs before that sentence. Counted under the Act’s rule for days before election day, those ten days begin on 18 November 2026.",
            links: [{ label: "Article 53 of the Civil Servants Election and Recall Act", href: ART53 }],
          },
          {
            question: "When will results appear here?",
            text: "The Legislative Yuan report does not print a closing hour, so this page lists no count before 00:00 on 29 November 2026, Taiwan time. After that instant, any figure in the official-results section is copied only from the Central Election Commission.",
            links: [reportLink, { label: "Central Election Commission", href: CEC }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/tw/en/", label: "Taiwan" },
          { href: ZH, label: "繁體中文" },
          { href: "/tw/en/elections/", label: "Elections in Taiwan" },
          { href: "/tw/en/sources/", label: "Sources" },
        ],
        bodyHtml: EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: REPORT, label: "Central Election Commission, report to the Legislative Yuan, 16 July 2026", readOn: "2026-10-27" },
          { href: ACT, label: "Civil Servants Election and Recall Act, English text, Ministry of Justice", readOn: "2026-10-27" },
          { href: ART53, label: "Civil Servants Election and Recall Act, Article 53", readOn: "2026-10-27" },
          { href: CEC, label: "Central Election Commission", readOn: "2026-10-27" },
          { href: PREV, label: "Central Election Commission, notice of the 26 November 2022 local elections", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
