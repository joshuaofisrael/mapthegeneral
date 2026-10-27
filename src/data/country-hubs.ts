/** National hubs generated into public/ by scripts/render-country-hubs.ts. */

export type HubIndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

export type CountryHubPage = {
  path: string;
  htmlLang: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  bodyHtml: string;
  alternates: { hreflang: string; path: string }[];
  nav: { href: string; label: string }[];
  crumbs: { name: string; path: string }[];
};

export type CountryHub = {
  pages: CountryHubPage[];
  index: HubIndexEntry[];
};

const LOCAL = "/bg/bg/elections/prezident-2026/";
const EN = "/bg/en/elections/president-2026/";

const bgAlternates = [
  { hreflang: "bg", path: "/bg/bg/" },
  { hreflang: "en", path: "/bg/en/" },
  { hreflang: "x-default", path: "/bg/bg/" },
];

export const COUNTRY_HUBS: CountryHub[] = [
  {
    index: [
      { path: "/bg/", lang: "bg", title: "България", kind: "country", text: "България избор за президент 1 ноември 2026 Централна избирателна комисия" },
      { path: "/bg/bg/", lang: "bg", title: "България", kind: "country", text: "България президент вицепрезидент 1 ноември 2026 ЦИК" },
      { path: "/bg/en/", lang: "en", title: "Bulgaria", kind: "country", text: "Bulgaria presidential election 1 November 2026 Central Election Commission" },
      { path: LOCAL, lang: "bg", title: "Избор за президент, 1 ноември 2026 г.", kind: "election", text: "избор за президент и вицепрезидент 1 ноември 2026 балотаж ЦИК" },
      { path: EN, lang: "en", title: "Bulgaria presidential election, 1 November 2026", kind: "election", text: "Bulgaria president vice president 1 November 2026 runoff Central Election Commission" },
    ],
    pages: [
      {
        path: "/bg/",
        htmlLang: "bg",
        title: "България",
        description: "България в Map the General: евентуален нов избор за президент на 1 ноември 2026 г. Неофициална страница.",
        h1: "България",
        lede: "Езиковата страница по подразбиране е българската. Английската е отделна.",
        alternates: [
          { hreflang: "bg", path: "/bg/" },
          { hreflang: "en", path: "/bg/en/" },
          { hreflang: "x-default", path: "/bg/" },
        ],
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/bg/en/", label: "English" },
        ],
        crumbs: [
          { name: "Начало", path: "/" },
          { name: "България", path: "/bg/" },
        ],
        bodyHtml: `<p><a href="/bg/bg/">Български</a> · <a href="/bg/en/">English</a></p>
<p>Страницата за избора е <a href="${LOCAL}">евентуален нов избор на 1 ноември 2026 г.</a></p>`,
      },
      {
        path: "/bg/bg/",
        htmlLang: "bg",
        title: "България — избори",
        description:
          "Национална страница за България. Евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г. Без общини и без допитвания.",
        h1: "България",
        lede: "Национална страница на български. Няма страници за общини. Брой на гласове няма преди 21:00 ч. на 1 ноември 2026 г.",
        alternates: bgAlternates,
        nav: [
          { href: "/", label: "Map the General" },
          { href: EN, label: "Изборът" },
          { href: "/bg/en/", label: "English" },
        ],
        crumbs: [
          { name: "Начало", path: "/" },
          { name: "България", path: "/bg/" },
          { name: "България", path: "/bg/bg/" },
        ],
        bodyHtml: `<h2>Изборът в това издание</h2>
<p>Централната избирателна комисия е публикувала таблицата за 25 октомври 2026 г. и решения за хартиените бюлетини за евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г. Страницата на избора дава реда от октомврийската таблица, часовете и източниците. Заглавията за 1 ноември още казват „евентуален“ и не се четат тук като решение коя двойка е избрана.</p>
<p><a href="${LOCAL}">Избор за президент, 1 ноември 2026 г.</a></p>
<h2>Лични данни</h2>
<p>България е в Европейския съюз, затова Общият регламент относно защитата на данните важи за лични данни. Тази страница не публикува избирателни списъци, снимки или единен граждански номер. Имена на кандидати се добавят само когато Комисията ги публикува.</p>
<h2>Източници</h2>
<ul>
<li><a href="https://www.cik.bg/bg/pvr2026">Централна избирателна комисия, избори 2026</a></li>
<li><a href="https://results.cik.bg/">Резултати от избори</a></li>
</ul>`,
      },
      {
        path: "/bg/en/",
        htmlLang: "en",
        title: "Bulgaria",
        description:
          "National hub for Bulgaria. A possible new election for president and vice president on 1 November 2026. No municipalities and no surveys.",
        h1: "Bulgaria",
        lede: "National hub in English. No municipality pages. No vote count before 21:00 Bulgaria time on 1 November 2026.",
        alternates: bgAlternates,
        nav: [
          { href: "/", label: "Map the General" },
          { href: LOCAL, label: "The election" },
          { href: "/bg/bg/", label: "Български" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Bulgaria", path: "/bg/" },
          { name: "Bulgaria", path: "/bg/en/" },
        ],
        bodyHtml: `<h2>The election in this release</h2>
<p>The Central Election Commission has published the 25 October 2026 table and decisions on the paper ballots for a possible new election for president and vice president on 1 November 2026. The election page gives the October table’s order, the hours and the sources. The November titles still say the new election is possible and are not read here as a decision that a pair was elected.</p>
<p><a href="${EN}">Presidential election, 1 November 2026</a></p>
<h2>Personal data</h2>
<p>Bulgaria is in the European Union, so the General Data Protection Regulation applies to personal data. This hub publishes no electoral roll, no photographs and no national identity number. Candidate names are added only when the Commission publishes them.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://www.cik.bg/bg/pvr2026">Central Election Commission, 2026 presidential election</a></li>
<li><a href="https://results.cik.bg/">Election results</a></li>
</ul>`,
      },
    ],
  },
];

const NZ = "/nz/en/elections/general-2026/";

export const NZ_COUNTRY_HUB: CountryHub = {
  index: [
    {
      path: "/nz/",
      lang: "en",
      title: "New Zealand",
      kind: "country",
      text: "New Zealand general election 7 November 2026 Electoral Commission",
    },
    {
      path: "/nz/en/",
      lang: "en",
      title: "New Zealand",
      kind: "country",
      text: "New Zealand general election 7 November 2026 vote.nz Electoral Commission",
    },
    {
      path: NZ,
      lang: "en",
      title: "New Zealand general election, 7 November 2026",
      kind: "election",
      text: "New Zealand general election Saturday 7 November 2026 Electoral Commission",
    },
  ],
  pages: [
    {
      path: "/nz/",
      htmlLang: "en",
      title: "New Zealand",
      description: "New Zealand on Map the General. General election on Saturday 7 November 2026. Unofficial information.",
      h1: "New Zealand",
      lede: "English is the language of this hub. The Candidate Handbook’s title for the election is Te Pōtitanga ā-Motu 2026.",
      alternates: [
        { hreflang: "en", path: "/nz/" },
        { hreflang: "x-default", path: "/nz/" },
      ],
      nav: [
        { href: "/", label: "Map the General" },
        { href: "/nz/en/", label: "New Zealand" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "New Zealand", path: "/nz/" },
      ],
      bodyHtml: `<p><a href="/nz/en/">New Zealand</a></p>
<p>The election page is the <a href="${NZ}">general election on 7 November 2026</a>.</p>
<p>The Candidate Handbook titles the election Te Pōtitanga ā-Motu 2026 and the Commission Te Kaitiaki Take Kōwhiri. The Election Service Plan uses Māori Electoral Option, Māori roll and Whare pōti Māori. This site does not translate the guide.</p>`,
    },
    {
      path: "/nz/en/",
      htmlLang: "en",
      title: "New Zealand — general election",
      description:
        "National hub for New Zealand. Te Pōtitanga ā-Motu, the general election, is on Saturday 7 November 2026, 9am to 7pm. No municipality pages.",
      h1: "New Zealand",
      lede: "National hub in English. No municipality pages. No vote count before 7:00 pm New Zealand daylight time on 7 November 2026.",
      alternates: [
        { hreflang: "en", path: "/nz/en/" },
        { hreflang: "x-default", path: "/nz/en/" },
      ],
      nav: [
        { href: "/", label: "Map the General" },
        { href: NZ, label: "The election" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "New Zealand", path: "/nz/" },
        { name: "New Zealand", path: "/nz/en/" },
      ],
      bodyHtml: `<h2>The election in this release</h2>
<p>The Electoral Commission’s Election Service Plan says the 2026 General Election, Te Pōtitanga ā-Motu, is on Saturday 7 November 2026. Voting places that day are open from 9am to 7pm. The election page lists the parties seeking the party vote in the Commission’s 9 October alphabetical order and links each one to the party-list file.</p>
<p><a href="${NZ}">General election, 7 November 2026</a></p>
<h2>Te reo Māori</h2>
<p>The Candidate Handbook titles the election Te Pōtitanga ā-Motu 2026 and the Commission Te Kaitiaki Take Kōwhiri. The plan says the Commission will produce enrolling and voting material in English, te reo Māori, and 29 other languages, and that a Whare pōti Māori provides voting services in te reo Māori and English. The Māori Electoral Option is the choice of the Māori roll or the general roll. This hub is not a translation, so it does not offer a Māori hreflang.</p>
<h2>Personal data</h2>
<p>The Privacy Act 2020 was not section-checked. This hub publishes no electoral roll and no voter details.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://elections.nz/assets/2026-General-Election/EC0131_Election_Service_Plan_A4.pdf">Election Service Plan, 2026 General Election</a></li>
<li><a href="https://www.legislation.govt.nz/act/public/1993/87/en/latest/">Electoral Act 1993</a></li>
</ul>`,
    },
  ],
};

COUNTRY_HUBS.push(NZ_COUNTRY_HUB);

export function countryHubIndex(): HubIndexEntry[] {
  return COUNTRY_HUBS.flatMap((hub) => hub.index);
}
