/**
 * Bulgaria presidential runoff, 1 November 2026.
 * Facts are limited to pages read on 27 October 2026. No survey figures.
 */
import type { ElectionSeoProfile } from "./election-seo";
import { BG_ARCHIVE, BG_REGISTER, BG_RESULTS_URL, bgResultsTableHtml } from "./bg-president-2026";

const CIK = "https://www.cik.bg/bg/pvr2026";
const Q03 = "https://www.cik.bg/bg/pvr2026/faq/voters/q03";
const Q21 = "https://www.cik.bg/bg/pvr2026/faq/voters/q21";
const Q26 = "https://www.cik.bg/bg/pvr2026/faq/voters/q26";
const D231 = "https://www.cik.bg/bg/decisions/231/2026-09-21";
const ART220 = "https://magistrat.bg/laws/00af9385cb23:220";
const ART205 = "https://www.pravko.bg/law/c4627863-f8dc-4def-bbc8-748a486cd4a9?article=205";
const BROCHURE =
  "https://www.cik.bg/brochure/pvr_25.10.2026/%D0%98%D0%B7%D0%B1%D0%BE%D1%80%D0%B8-2026-%D0%B1%D1%80%D0%BE%D1%88%D1%83%D1%80%D0%B0.pdf";
const RESULTS = "https://results.cik.bg/";
const LOCAL = "/bg/bg/elections/prezident-2026/";
const EN = "/bg/en/elections/president-2026/";
const OPENS = "2026-11-01T21:00:00+02:00";

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
    id: "bg-2026-11-01",
    opens: OPENS,
    feed: "/il-live/bg-2026-11-01/results.json",
    snapshot: "/live/bg-2026-11-01.json",
    official: RESULTS,
    timeZone: "Europe/Sofia",
    ...copy,
  };
  const json = JSON.stringify(config).replace(/</g, "\\u003c");
  return `<script type="application/json" id="night-config">${json}</script>
<div id="night-board"><p><a href="${RESULTS}">results.cik.bg</a></p></div>
<script src="/live/night.js" defer></script>`;
}

const NIGHT_BG = night({
  countdown: "Краят на възможното гласуване е след",
  countdownNote:
    "До 21:00 ч. българско време на 1 ноември 2026 г. тук няма брой на гласове. След това страницата чете само файл от същия сайт, попълван с резултатите на Централната избирателна комисия.",
  units: ["дни", "часа", "мин", "сек"],
  awaiting: "Часът за показване настъпи. Файлът още няма редове от Комисията. Страницата се опитва отново сама.",
  fallback: "Файлът с резултатите не се зареди. Броят е на страницата на Комисията.",
  preliminary: "Предварителен официален брой",
  finalLabel: "Окончателни резултати",
  updated: "Обновено",
  fetched: "Заредено",
  source: "Източник: Централна избирателна комисия. Не е прогноза.",
  name: "Кандидатска двойка",
  votes: "Гласове",
  share: "Дял",
  officialLabel: "results.cik.bg",
});

const NIGHT_EN = night({
  countdown: "The latest possible close is in",
  countdownNote:
    "Until 21:00 Bulgaria time on 1 November 2026 this page shows no vote count. After that it reads only a same-origin file filled from Central Election Commission results.",
  units: ["days", "hours", "min", "sec"],
  awaiting: "The opening time has passed. The file still has no Commission rows. This page tries again on its own.",
  fallback: "The results file did not load. The count is on the Commission’s results service.",
  preliminary: "Preliminary official count",
  finalLabel: "Final results",
  updated: "Updated",
  fetched: "Fetched",
  source: "Source: Central Election Commission. Not a forecast.",
  name: "Candidate list",
  votes: "Votes",
  share: "Share",
  officialLabel: "results.cik.bg",
});

const BODY_BG = `<h2>Какво се избира</h2>
<p>Списъкът с решения на Централната избирателна комисия за избора на президент и вицепрезидент, прочетен на 27 октомври 2026 г., включва Решение № 405-ПВР от 23 октомври 2026 г. и Решение № 415-ПВР от 26 октомври 2026 г. И двете са за техническите характеристики на хартиените бюлетини за евентуален нов избор на 1 ноември 2026 г. Брошурата на Комисията за 25 октомври 2026 г. казва, че кандидат за президент е избран, ако получи повече от половината от действителните гласове и ако в избора са участвали повече от половината избиратели. Ако никой не постигне това мнозинство, се произвежда нов избор с двете кандидатски листи с най-много гласове, а начинът на гласуване остава същият.</p>
<p>Тази страница не твърди, че Комисията вече е определила двете листи за 1 ноември. Заглавията на решенията, прочетени на 27 октомври 2026 г., още казват „евентуален“. Октомврийската таблица е отделна публикация и не се превръща тук в решение за ноемврийската бюлетина.</p>
<h2>Как се гласува</h2>
<p>Въпрос 3 към избирателите на страницата за този избор казва, че гласуването започва в 7:00 ч. и приключва в 20:00 ч. Член 220 от Изборния кодекс, в текста на страницата „Магистрат“, прочетена на 27 октомври 2026 г., казва същото и добавя, че избиратели, които в 20:00 ч. са пред помещението и предадат документите си, могат да гласуват след 20:00 ч., но не по-късно от 21:00 ч. Извън страната изборният ден в същия текст е от 7:00 до 20:00 ч. местно време.</p>
<p>Брошурата казва, че в секции с 300 и повече избиратели по списък се гласува с устройство за машинно гласуване. Хартиена бюлетина е за по-малките секции, подвижна кутия, лечебни заведения, домове и специализирани институции, кораби под българско знаме, част от секциите в чужбина и при спряно машинно гласуване. Свидетелство за управление на моторно превозно средство не се приема. Сроковете в брошурата са за 25 октомври 2026 г. и не се пренасят тук като срокове за 1 ноември.</p>
{{candidates}}
<h2>Официално разпределение от 25 октомври</h2>
<p>Всички числа са от таблицата на Комисията, прочетена на 27 октомври 2026 г.: данни към 15:00 на 26 октомври, при обработени 100,00% протоколи на секционните комисии в районните комисии. Страницата за активност не е преписана като крайна активност, затова условието „повече от половината избиратели“ не е отсъдено тук. <a href="${BG_RESULTS_URL}">Таблицата на Комисията</a>.</p>
${bgResultsTableHtml()}
<p>Двете най-големи разпределения са № 25 и № 4. Нито една двойка няма повече от половината от отпечатаното разпределение. Тази страница не обявява избрана двойка.</p>
<h2>Предишни официални резултати</h2>
<p>Указателят на резултатите показва президентски избори на 14 ноември 2021 г., 6 ноември 2016 г. и 23 октомври 2011 г. Техните сборове не са преписани тук. <a href="${BG_ARCHIVE}">Указател на Комисията</a>.</p>
<h2>Изборна нощ</h2>
<p>Тук няма брой преди 21:00 ч. българско време на 1 ноември 2026 г. След това страницата чете само файл от същия сайт. Ако файлът липсва, връзката е към услугата на Комисията. На страницата няма прогноза.</p>
${NIGHT_BG}`;

const BODY_EN = `<h2>What is being elected</h2>
<p>The Central Election Commission’s decision list for the presidential election, read on 27 October 2026, includes Decision No. 405-PVR of 23 October 2026 and Decision No. 415-PVR of 26 October 2026. Both concern the technical specifications of the paper ballots for a possible new election for president and vice president on 1 November 2026. The Commission’s brochure for 25 October 2026 says a candidate for president is elected with more than half of the valid votes if more than half of the voters took part. If nobody reaches that majority, a new election is held with the two candidate lists that received the most votes, and the method of voting stays the same.</p>
<p>This page does not say the Commission has already named the two lists for 1 November. The decision titles read on 27 October 2026 still say the new election is possible. The October table is a separate publication and is not treated here as a decision on the November ballot.</p>
<h2>How to vote</h2>
<p>Voter question 3 on the Commission’s page for this election says voting starts at 7:00 and ends at 20:00. Article 220 of the Election Code, in the text on the Magistrat page read on 27 October 2026, says the same and adds that voters who are outside the polling room at 20:00 and hand over their identity papers may vote after 20:00, but not later than 21:00. Abroad, that text sets the election day from 7:00 to 20:00 local time.</p>
<p>The brochure says sections with 300 or more voters on the list use a machine. A paper ballot is for smaller sections, a mobile box, hospitals, homes and specialised institutions, ships under the Bulgarian flag, some sections abroad, and a stopped machine. A driving licence is not accepted. Deadlines in the brochure are for 25 October 2026 and are not repeated here as deadlines for 1 November.</p>
{{candidates}}
<h2>Official distribution of 25 October</h2>
<p>Every figure below is from the Commission’s table, read on 27 October 2026: data as of 15:00 on 26 October, with 100.00% of section-commission protocols processed in the district commissions. A final turnout was not copied, so this page does not decide whether more than half of the voters took part. <a href="${BG_RESULTS_URL}">Commission table</a>. The pairs, in that table’s ballot order, are listed below and each one links to the <a href="${BG_REGISTER}">public register</a>. The line „Не подкрепям никого“ is not a pair.</p>
${bgResultsTableHtml()}
<p>The two largest shares are no. 25 and no. 4. No pair has more than half of the printed distribution. This page does not declare a pair elected. Decisions No. 405-PVR and No. 415-PVR do not print a separate two-name order for 1 November.</p>
<h2>Earlier official results</h2>
<p>The results index lists presidential elections on 14 November 2021, 6 November 2016 and 23 October 2011. Those totals are not copied here. <a href="${BG_ARCHIVE}">Commission results index</a>.</p>
<h2>Election night</h2>
<p>No count is shown here before 21:00 Bulgaria time on 1 November 2026. After that hour the page reads only a same-origin file. If the file is missing, the link is the Commission’s results service. This page has no forecast.</p>
${NIGHT_EN}`;

const alternates = [
  { hreflang: "bg", path: LOCAL },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: LOCAL },
];

export const BG_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "bg-2026-11-01",
    pollingDay: "2026-11-01",
    startDate: "2026-11-01T07:00:00+02:00",
    endDate: OPENS,
    organizerName: "Централна избирателна комисия",
    organizerUrl: "https://www.cik.bg/",
    lastmod: "2026-10-27",
    candidateListId: "bg-president-2026",
    homeLinks: [
      {
        href: LOCAL,
        label: "Bulgaria presidential election, 1 November 2026",
        detail:
          "Possible new election on Sunday 1 November 2026, 7:00 to 20:00 Bulgaria time, with voting in a queue until 21:00. The 25 October distribution is the Commission’s published table. No November count before 21:00.",
      },
    ],
    pages: [
      {
        lang: "bg",
        readWord: "прочетено",
        htmlLang: "bg",
        path: LOCAL,
        title: "Избор за президент, 1 ноември 2026 г.",
        description:
          "Евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г. Гласуване от 7:00 до 20:00 ч. Без числа преди 21:00 ч. Неофициална страница.",
        ogDescription:
          "Евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г. Централна избирателна комисия. Неофициална страница.",
        ogLocale: "bg_BG",
        alternates,
        crumbs: [
          { name: "Начало", path: "/" },
          { name: "България", path: "/bg/" },
          { name: "България", path: "/bg/bg/" },
          { name: "1 ноември 2026 г.", path: LOCAL },
        ],
        eyebrow: "1 ноември 2026 г.",
        h1: "Избор за президент и вицепрезидент",
        lede: "Евентуален нов избор в неделя, 1 ноември 2026 г. Гласуването е от 7:00 до 20:00 ч., а опашката пред секцията може да гласува до 21:00 ч.",
        updated: "Последна редакция: 27 октомври 2026 г.",
        reportLabel: "Съобщете за грешка",
        officeHref: CIK,
        bannerBefore: "Неофициална информация. Потвърдете при ",
        bannerAfter: "Централната избирателна комисия",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/bg/bg/", label: "България" },
          { href: EN, label: "English" },
        ],
        eventName: "Избор за президент и вицепрезидент, 1 ноември 2026 г.",
        locationName: "България",
        addressRegion: "България",
        addressCountry: "BG",
        keyDatesHeading: "Как се гласува, срокове и официални източници",
        keyDatesIntro: "Всеки ред по-долу е от страница, прочетена на 27 октомври 2026 г. Час, който тези страници не печатат, не е добавен.",
        keyDates: [
          {
            label: "Дата",
            text: "Решения № 405-ПВР и № 415-ПВР в списъка на Комисията са за евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г.",
            links: [{ label: "списъка на Комисията", href: CIK }],
          },
          {
            label: "Часове",
            text: "Въпрос 3 на Комисията казва, че гласуването започва в 7:00 ч. и приключва в 20:00 ч. Член 220 допуска гласуване след 20:00 ч. само за избирателите пред помещението, но не по-късно от 21:00 ч.",
            links: [
              { label: "Въпрос 3 на Комисията", href: Q03 },
              { label: "Член 220", href: ART220 },
            ],
          },
          {
            label: "Начин",
            text: "Брошурата на Комисията за 25 октомври 2026 г. описва машинното гласуване в секции с 300 и повече избиратели и казва, че при нов избор начинът остава същият.",
            links: [{ label: "Брошурата на Комисията за 25 октомври 2026 г.", href: BROCHURE }],
          },
          {
            label: "Тишина",
            text: "Въпрос 21 на Комисията казва, че резултати от допитвания не се огласяват от 00:00 ч. на 24 октомври до обявяване на края на изборния ден. Член 205, в текста на Правко, поставя същата забрана за 24 часа преди изборния ден. За 1 ноември тази страница не показва такива резултати от 31 октомври, 00:00 ч., до 21:00 ч.",
            links: [
              { label: "Въпрос 21 на Комисията", href: Q21 },
              { label: "Член 205, в текста на Правко", href: ART205 },
            ],
          },
          {
            label: "Резултати",
            text: "Услугата за резултати на Комисията е мястото, от което тази страница може да покаже брой след 21:00 ч. на 1 ноември 2026 г.",
            links: [{ label: "Услугата за резултати на Комисията", href: RESULTS }],
          },
        ],
        faqHeading: "Въпроси",
        faqs: [
          {
            question: "Кога е евентуалният нов избор?",
            text: "Решения № 405-ПВР и № 415-ПВР сочат 1 ноември 2026 г. Въпрос 26 казва, че ако няма избран президент, Комисията определя двете листи с най-много гласове и насрочва балотаж.",
            links: [
              { label: "Решения № 405-ПВР и № 415-ПВР", href: CIK },
              { label: "Въпрос 26", href: Q26 },
            ],
          },
          {
            question: "Кои са кандидатските двойки?",
            text: "Таблицата на Комисията за 25 октомври 2026 г. дава двойките по ред в бюлетината и връзката е публичният регистър. Най-големите разпределения са № 25 и № 4. Заглавията на решенията за 1 ноември още казват „евентуален“ и не печатат отделен ред за две имена. Страницата не обявява избрана двойка.",
            links: [
              { label: "Таблицата на Комисията за 25 октомври 2026 г.", href: BG_RESULTS_URL },
              { label: "публичният регистър", href: BG_REGISTER },
            ],
          },
          {
            question: "От колко до колко часа се гласува?",
            text: "Въпрос 3 казва от 7:00 до 20:00 ч. Член 220 допуска след 20:00 ч. само избирателите, които вече са пред помещението, до 21:00 ч.",
            links: [
              { label: "Въпрос 3", href: Q03 },
              { label: "Член 220", href: ART220 },
            ],
          },
          {
            question: "Показва ли страницата допитвания?",
            text: "Не. Член 205 забранява огласяването им 24 часа преди изборния ден до обявяване на края му. Тази страница не печата такива числа в нито един ден.",
            links: [{ label: "Член 205", href: ART205 }],
          },
          {
            question: "Кога се появява броят на гласовете?",
            text: "Не преди 21:00 ч. българско време на 1 ноември 2026 г. и само от услугата за резултати на Комисията. Решение № 231-ПВР казва, че резултати от проучване на изхода не се оповестяват преди 20:00 ч. и преди обявяване на края на изборния ден.",
            links: [
              { label: "услугата за резултати на Комисията", href: RESULTS },
              { label: "Решение № 231-ПВР", href: D231 },
            ],
          },
        ],
        relatedHeading: "Още",
        related: [
          { href: "/bg/bg/", label: "България" },
          { href: EN, label: "English" },
          { href: "/bg/en/", label: "Bulgaria in English" },
        ],
        bodyHtml: BODY_BG,
        sourcesHeading: "Източници",
        sources: [
          { href: CIK, label: "Централна избирателна комисия, избори за президент и вицепрезидент 2026", readOn: "2026-10-27" },
          { href: Q03, label: "ЦИК, въпрос 3: от колко часа се гласува", readOn: "2026-10-27" },
          { href: Q21, label: "ЦИК, въпрос 21: допитвания в деня за размисъл", readOn: "2026-10-27" },
          { href: Q26, label: "ЦИК, въпрос 26: ако никой не бъде избран", readOn: "2026-10-27" },
          { href: D231, label: "ЦИК, Решение № 231-ПВР от 21 септември 2026 г.", readOn: "2026-10-27" },
          { href: ART205, label: "Правко, препечатване на чл. 205 от Изборния кодекс", readOn: "2026-10-27" },
          { href: ART220, label: "Магистрат, препечатване на чл. 220 от Изборния кодекс", readOn: "2026-10-27" },
          { href: BROCHURE, label: "ЦИК, информационна брошура за 25 октомври 2026 г.", readOn: "2026-10-27" },
          { href: RESULTS, label: "ЦИК, резултати от избори", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Bulgaria presidential election, 1 November 2026",
        description:
          "Possible new election for president and vice president of Bulgaria on 1 November 2026. Voting from 7:00 to 20:00. No count before 21:00. Unofficial information.",
        ogDescription:
          "Possible Bulgaria presidential election on Sunday 1 November 2026. Central Election Commission. No count before 21:00. Unofficial information.",
        ogLocale: "en_GB",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Bulgaria", path: "/bg/" },
          { name: "Bulgaria", path: "/bg/en/" },
          { name: "1 November 2026", path: EN },
        ],
        eyebrow: "1 November 2026",
        h1: "Presidential election",
        lede: "A possible new election on Sunday 1 November 2026. Voting runs from 7:00 to 20:00, and a queue outside the room may vote until 21:00.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: CIK,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Central Election Commission",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/bg/en/", label: "Bulgaria" },
          { href: LOCAL, label: "Български" },
        ],
        eventName: "Bulgaria presidential election, 1 November 2026",
        locationName: "Bulgaria",
        addressRegion: "Bulgaria",
        addressCountry: "BG",
        keyDatesHeading: "How to vote, key times and official sources",
        keyDatesIntro: "Each line below is from a page read on 27 October 2026. A time those pages did not print is not added.",
        keyDates: [
          {
            label: "Date",
            text: "Decisions No. 405-PVR and No. 415-PVR on the Commission’s list are for a possible new election for president and vice president on 1 November 2026.",
            links: [{ label: "the Commission’s list", href: CIK }],
          },
          {
            label: "Hours",
            text: "Commission question 3 says voting starts at 7:00 and ends at 20:00. Article 220 allows voting after 20:00 only for voters already outside the room, and not later than 21:00.",
            links: [
              { label: "Commission question 3", href: Q03 },
              { label: "Article 220", href: ART220 },
            ],
          },
          {
            label: "Method",
            text: "The Commission brochure for 25 October 2026 describes machine voting in sections with 300 or more voters and says a new election uses the same method.",
            links: [{ label: "The Commission brochure for 25 October 2026", href: BROCHURE }],
          },
          {
            label: "Silence",
            text: "Commission question 21 says survey results are not announced from 00:00 on 24 October until the end of election day is declared. Article 205, in the Pravko text, sets the same ban for the 24 hours before election day. For 1 November this page shows no such results from 31 October at 00:00 until 21:00.",
            links: [
              { label: "Commission question 21", href: Q21 },
              { label: "Article 205, in the Pravko text", href: ART205 },
            ],
          },
          {
            label: "Results",
            text: "The Commission results service is the only count this page may show after 21:00 on 1 November 2026.",
            links: [{ label: "The Commission results service", href: RESULTS }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the possible new election?",
            text: "Decisions No. 405-PVR and No. 415-PVR name 1 November 2026. Question 26 says that if nobody is elected, the Commission names the two lists with the most votes and schedules a runoff.",
            links: [
              { label: "Decisions No. 405-PVR and No. 415-PVR", href: CIK },
              { label: "Question 26", href: Q26 },
            ],
          },
          {
            question: "Who are the candidate pairs?",
            text: "The Commission’s table for 25 October 2026 gives the pairs in ballot order, and each pair links to the public register. The largest shares are no. 25 and no. 4. The decision titles for 1 November still say the new election is possible and do not print a separate two-name order. This page does not declare a pair elected.",
            links: [
              { label: "The Commission’s table for 25 October 2026", href: BG_RESULTS_URL },
              { label: "the public register", href: BG_REGISTER },
            ],
          },
          {
            question: "What are the voting hours?",
            text: "Question 3 says 7:00 to 20:00. Article 220 allows after 20:00 only the voters already outside the room, until 21:00.",
            links: [
              { label: "Question 3", href: Q03 },
              { label: "Article 220", href: ART220 },
            ],
          },
          {
            question: "Does this page print surveys?",
            text: "No. Article 205 bars announcing them for the 24 hours before election day until the end of that day is declared. This page prints no such figures on any day.",
            links: [{ label: "Article 205", href: ART205 }],
          },
          {
            question: "When does the vote count appear?",
            text: "Not before 21:00 Bulgaria time on 1 November 2026, and only from the Commission results service. Decision No. 231-PVR says exit-survey results are not announced before 20:00 or before the end of election day is declared.",
            links: [
              { label: "the Commission results service", href: RESULTS },
              { label: "Decision No. 231-PVR", href: D231 },
            ],
          },
        ],
        relatedHeading: "Also",
        related: [
          { href: "/bg/en/", label: "Bulgaria" },
          { href: LOCAL, label: "Български" },
          { href: "/bg/bg/", label: "България" },
        ],
        bodyHtml: BODY_EN,
        sourcesHeading: "Sources",
        sources: [
          { href: CIK, label: "Central Election Commission, presidential election 2026", readOn: "2026-10-27" },
          { href: Q03, label: "CEC, question 3, voting hours", readOn: "2026-10-27" },
          { href: Q21, label: "CEC, question 21, surveys on the day of reflection", readOn: "2026-10-27" },
          { href: Q26, label: "CEC, question 26, if nobody is elected", readOn: "2026-10-27" },
          { href: D231, label: "CEC, Decision No. 231-PVR of 21 September 2026", readOn: "2026-10-27" },
          { href: ART205, label: "Pravko reprint of Election Code article 205", readOn: "2026-10-27" },
          { href: ART220, label: "Magistrat reprint of Election Code article 220", readOn: "2026-10-27" },
          { href: BROCHURE, label: "CEC information brochure for 25 October 2026", readOn: "2026-10-27" },
          { href: RESULTS, label: "CEC election results", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
