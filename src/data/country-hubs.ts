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
      {
        path: "/bg/bg/results/",
        lang: "bg",
        title: "Резултати от балотажа 2026",
        kind: "election",
        text: "резултати от балотажа 2026 президентски избори 2026 резултати кой печели втория тур Централна избирателна комисия",
      },
      {
        path: "/bg/en/results/",
        lang: "en",
        title: "Bulgaria presidential runoff results 2026",
        kind: "election",
        text: "Bulgaria presidential election 2026 results runoff 1 November Central Election Commission",
      },
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
<p>Страницата за избора е <a href="${LOCAL}">евентуален нов избор на 1 ноември 2026 г.</a></p>
<p>Официалният брой е на <a href="/bg/bg/results/">Резултати от балотажа 2026</a>. <a href="/bg/en/results/">English</a>.</p>`,
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
          { href: "/bg/bg/results/", label: "Резултати" },
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
<p><a href="/bg/bg/results/">Резултати от балотажа 2026</a>. <a href="/bg/en/results/">English</a>.</p>
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
          { href: "/bg/en/results/", label: "Results" },
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
<p><a href="/bg/en/results/">Presidential runoff results</a>. <a href="/bg/bg/results/">Български</a>.</p>
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

const NZ = "/nz/en/elections/general-election/";

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
<p>Results: <a href="/nz/en/results/">New Zealand election results page</a>. No vote count before 7:00 pm New Zealand daylight time on 7 November 2026.</p>
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
        { href: "/nz/en/results/", label: "Results" },
        { href: "/nz/en/electorates/", label: "Electorates" },
        { href: "/nz/en/parties/", label: "Parties" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "New Zealand", path: "/nz/" },
        { name: "New Zealand", path: "/nz/en/" },
      ],
      bodyHtml: `<h2>The election in this release</h2>
<p>The Electoral Commission’s Election Service Plan says the 2026 General Election, Te Pōtitanga ā-Motu, is on Saturday 7 November 2026. Voting places that day are open from 9am to 7pm. The election page lists the parties seeking the party vote in the Commission’s 9 October alphabetical order and links each one to the party-list file. It also lists every electorate candidate from the Commission’s Electorate Candidates 2026 spreadsheet, for the 64 general electorates and the seven Māori electorates.</p>
<p><a href="${NZ}">General election, 7 November 2026</a></p>
<p><a href="/nz/en/results/">Results page</a>. It shows no vote count before 7:00 pm New Zealand daylight time on 7 November 2026.</p>
<h2>More New Zealand pages</h2>
<ul><li><a href="/nz/en/electorates/">Electorates and candidates</a></li><li><a href="/nz/en/parties/">Parties on the party vote</a></li><li><a href="/nz/en/results-night/">How results night works</a></li><li><a href="/nz/en/preview/">Election preview</a></li></ul>
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

const EE_ET = "/ee/et/elections/riigikogu-2027/";
const EE_EN = "/ee/en/elections/riigikogu-2027/";

const eeAlternates = [
  { hreflang: "et", path: "/ee/et/" },
  { hreflang: "en", path: "/ee/en/" },
  { hreflang: "x-default", path: "/ee/et/" },
];

export const EE_COUNTRY_HUB: CountryHub = {
  index: [
    {
      path: "/ee/",
      lang: "et",
      title: "Eesti",
      kind: "country",
      text: "Eesti Riigikogu valimised 7. märts 2027 valimised.ee",
    },
    {
      path: "/ee/et/",
      lang: "et",
      title: "Eesti",
      kind: "country",
      text: "Eesti Riigikogu valimised 7. märts 2027 Riigi valimisteenistus",
    },
    {
      path: "/ee/en/",
      lang: "en",
      title: "Estonia",
      kind: "country",
      text: "Estonia Riigikogu election 7 March 2027 National Electoral Service",
    },
    {
      path: EE_ET,
      lang: "et",
      title: "Riigikogu valimised, 7. märts 2027",
      kind: "election",
      text: "Eesti Riigikogu valimised 7. märts 2027 eelhääletamine",
    },
    {
      path: EE_EN,
      lang: "en",
      title: "Estonia Riigikogu election, 7 March 2027",
      kind: "election",
      text: "Estonia Riigikogu election 7 March 2027 advance voting",
    },
  ],
  pages: [
    {
      path: "/ee/",
      htmlLang: "et",
      title: "Eesti",
      description:
        "Eesti Map the General lehel. Riigikogu valimised pühapäeval, 7. märtsil 2027. Mitteametlik teave.",
      h1: "Eesti",
      lede: "Eestikeelne leht on peamine. English on kõrval.",
      alternates: [
        { hreflang: "et", path: "/ee/" },
        { hreflang: "en", path: "/ee/en/" },
        { hreflang: "x-default", path: "/ee/" },
      ],
      nav: [
        { href: "/", label: "Map the General" },
        { href: "/ee/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Eesti", path: "/ee/" },
      ],
      bodyHtml: `<p><a href="/ee/et/">Eesti</a> · <a href="/ee/en/">English</a></p>
<p><a href="${EE_ET}">Riigikogu valimised 7. märtsil 2027</a> on eestikeelsel lehel.</p>`,
    },
    {
      path: "/ee/et/",
      htmlLang: "et",
      title: "Eesti — Riigikogu valimised 2027",
      description:
        "Eesti üleriigiline juhend. Riigikogu valimised pühapäeval, 7. märtsil 2027. Omavalitsuste lehti ei ole.",
      h1: "Eesti",
      lede: "Üleriigiline juhend eesti keeles. Omavalitsuste lehti ei ole. Hääli ei näidata enne kella 20.15 Ida-Euroopa aja järgi 7. märtsil 2027.",
      alternates: eeAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: EE_ET, label: "Valimised" },
        { href: "/ee/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Eesti", path: "/ee/" },
        { name: "Eesti", path: "/ee/et/" },
      ],
      bodyHtml: `<h2>Selle väljaande valimised</h2>
<p>Riigi valimisteenistus nimetab Riigikogu valimiste päevaks 7. märtsi 2027. Valimispäeval lõpeb hääletamine kell 20.00 ja valija võib lõpetada 15 minuti jooksul.</p>
<p><a href="${EE_ET}">Riigikogu valimised, 7. märts 2027</a></p>
<h2>Isikuandmed</h2>
<p>Isikuandmete kaitse seadust ei loetud paragrahvide kaupa. See juhend ei avalda valijate nimekirja ega isikukoodi.</p>
<h2>Allikad</h2>
<ul>
<li><a href="https://www.valimised.ee/et/riigikogu-valimised-2027">Riigi valimisteenistus, Riigikogu valimised 2027</a></li>
<li><a href="https://www.riigiteataja.ee/et/akt/RKVS">Riigikogu valimise seadus</a></li>
<li><a href="https://www.valimised.ee/">valimised.ee</a></li>
</ul>`,
    },
    {
      path: "/ee/en/",
      htmlLang: "en",
      title: "Estonia — Riigikogu election 2027",
      description:
        "National hub for Estonia. Riigikogu election on Sunday 7 March 2027. No municipality pages.",
      h1: "Estonia",
      lede: "National hub in English. No municipality pages. No count before 20:15 Eastern European Time on 7 March 2027.",
      alternates: eeAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: EE_EN, label: "The election" },
        { href: "/ee/et/", label: "Eesti" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Eesti", path: "/ee/" },
        { name: "Estonia", path: "/ee/en/" },
      ],
      bodyHtml: `<h2>The election in this release</h2>
<p>The National Electoral Service names 7 March 2027 as Riigikogu election day. Voting on election day ends at 20.00, and a voter may finish within 15 minutes.</p>
<p><a href="${EE_EN}">Riigikogu election, 7 March 2027</a></p>
<h2>Personal data</h2>
<p>The Personal Data Protection Act was not section-read. This hub publishes no roll and no personal identity code.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://www.valimised.ee/et/riigikogu-valimised-2027">National Electoral Service, Riigikogu elections 2027</a></li>
<li><a href="https://www.riigiteataja.ee/et/akt/RKVS">Riigikogu Election Act</a></li>
<li><a href="https://www.valimised.ee/">valimised.ee</a></li>
</ul>`,
    },
  ],
};

COUNTRY_HUBS.push(EE_COUNTRY_HUB);

const NL_NL = "/nl/nl/elections/provinciale-staten-2027/";
const NL_EN = "/nl/en/elections/provincial-2027/";

const nlAlternates = [
  { hreflang: "nl", path: "/nl/nl/" },
  { hreflang: "en", path: "/nl/en/" },
  { hreflang: "x-default", path: "/nl/nl/" },
];

export const NL_COUNTRY_HUB: CountryHub = {
  index: [
    {
      path: "/nl/",
      lang: "nl",
      title: "Nederland",
      kind: "country",
      text: "Nederland Provinciale Staten waterschappen 17 maart 2027 Kiesraad",
    },
    {
      path: "/nl/nl/",
      lang: "nl",
      title: "Nederland",
      kind: "country",
      text: "Nederland Provinciale Staten en waterschappen 17 maart 2027",
    },
    {
      path: "/nl/en/",
      lang: "en",
      title: "Netherlands",
      kind: "country",
      text: "Netherlands Provincial States and water boards 17 March 2027 Kiesraad",
    },
    {
      path: NL_NL,
      lang: "nl",
      title: "Provinciale Staten en waterschappen, 17 maart 2027",
      kind: "election",
      text: "Nederland Provinciale Staten waterschappen 17 maart 2027",
    },
    {
      path: NL_EN,
      lang: "en",
      title: "Netherlands Provincial States and water boards, 17 March 2027",
      kind: "election",
      text: "Netherlands Provincial States water boards 17 March 2027",
    },
  ],
  pages: [
    {
      path: "/nl/",
      htmlLang: "nl",
      title: "Nederland",
      description:
        "Nederland op Map the General. Provinciale Staten en waterschappen op woensdag 17 maart 2027. Onofficiële informatie.",
      h1: "Nederland",
      lede: "De Nederlandse pagina is de hoofdpagina. English staat ernaast.",
      alternates: [
        { hreflang: "nl", path: "/nl/" },
        { hreflang: "en", path: "/nl/en/" },
        { hreflang: "x-default", path: "/nl/" },
      ],
      nav: [
        { href: "/", label: "Map the General" },
        { href: "/nl/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Nederland", path: "/nl/" },
      ],
      bodyHtml: `<p><a href="/nl/nl/">Nederlands</a> · <a href="/nl/en/">English</a></p>
<p>De verkiezingen van <a href="${NL_NL}">17 maart 2027</a> staan op de Nederlandse pagina.</p>`,
    },
    {
      path: "/nl/nl/",
      htmlLang: "nl",
      title: "Nederland — verkiezingen van 2027",
      description:
        "Landelijke gids voor Nederland. Provinciale Staten en waterschappen op woensdag 17 maart 2027. Geen pagina’s per gemeente.",
      h1: "Nederland",
      lede: "Landelijke gids in het Nederlands. Geen pagina’s per gemeente. Geen stemmen voor 21:00 Midden-Europese tijd op 17 maart 2027.",
      alternates: nlAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: NL_NL, label: "De verkiezing" },
        { href: "/nl/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Nederland", path: "/nl/" },
        { name: "Nederland", path: "/nl/nl/" },
      ],
      bodyHtml: `<h2>De verkiezing in deze uitgave</h2>
<p>De Kiesraad noemt 17 maart 2027 voor de Provinciale Staten. De kalender zet de waterschappen op dezelfde dag. De stemming duurt tot 21:00.</p>
<p><a href="${NL_NL}">Provinciale Staten en waterschappen, 17 maart 2027</a></p>
<h2>Persoonsgegevens</h2>
<p>De Nederlandse uitvoeringswet is niet artikel voor artikel gelezen. Deze gids publiceert geen kiezersregister en geen burgerservicenummer.</p>
<h2>Bronnen</h2>
<ul>
<li><a href="https://www.kiesraad.nl/verkiezingen/provinciale-staten">Kiesraad, Provinciale Statenverkiezingen</a></li>
<li><a href="https://www.kiesraad.nl/site/binaries/site-content/collections/documents/2026/08/24/verkiezingskalender-ps-ws27/verkiezingskalender-2027-psws27.pdf">Verkiezingskalender 2027</a></li>
<li><a href="https://www.kiesraad.nl/">Kiesraad</a></li>
</ul>`,
    },
    {
      path: "/nl/en/",
      htmlLang: "en",
      title: "Netherlands — elections of 2027",
      description:
        "National hub for the Netherlands. Provincial States and water boards on Wednesday 17 March 2027. No municipality pages.",
      h1: "Netherlands",
      lede: "National hub in English. No municipality pages. No count before 21:00 Central European Time on 17 March 2027.",
      alternates: nlAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: NL_EN, label: "The election" },
        { href: "/nl/nl/", label: "Nederlands" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Nederland", path: "/nl/" },
        { name: "Netherlands", path: "/nl/en/" },
      ],
      bodyHtml: `<h2>The election in this release</h2>
<p>The Kiesraad names 17 March 2027 for the Provincial States. The calendar places the water boards on the same day. Voting lasts until 21:00.</p>
<p><a href="${NL_EN}">Provincial States and water boards, 17 March 2027</a></p>
<h2>Personal data</h2>
<p>The Dutch implementation act was not section-read. This hub publishes no roll and no citizen-service number.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://www.kiesraad.nl/verkiezingen/provinciale-staten">Kiesraad, Provincial States elections</a></li>
<li><a href="https://www.kiesraad.nl/site/binaries/site-content/collections/documents/2026/08/24/verkiezingskalender-ps-ws27/verkiezingskalender-2027-psws27.pdf">2027 election calendar</a></li>
<li><a href="https://www.kiesraad.nl/">Kiesraad</a></li>
</ul>`,
    },
  ],
};

COUNTRY_HUBS.push(NL_COUNTRY_HUB);

const FI_FI = "/fi/fi/elections/eduskunta-2027/";
const FI_SV = "/fi/sv/elections/riksdagsval-2027/";
const FI_EN = "/fi/en/elections/parliamentary-2027/";

const fiAlternates = [
  { hreflang: "fi", path: "/fi/fi/" },
  { hreflang: "sv", path: "/fi/sv/" },
  { hreflang: "en", path: "/fi/en/" },
  { hreflang: "x-default", path: "/fi/fi/" },
];

export const FI_COUNTRY_HUB: CountryHub = {
  index: [
    {
      path: "/fi/",
      lang: "fi",
      title: "Suomi",
      kind: "country",
      text: "Suomi eduskuntavaalit 18. huhtikuuta 2027 oikeusministeriö",
    },
    {
      path: "/fi/fi/",
      lang: "fi",
      title: "Suomi",
      kind: "country",
      text: "Suomi eduskuntavaalit 18. huhtikuuta 2027",
    },
    {
      path: "/fi/sv/",
      lang: "sv",
      title: "Finland",
      kind: "country",
      text: "Finland riksdagsval 18 april 2027 justitieministeriet",
    },
    {
      path: "/fi/en/",
      lang: "en",
      title: "Finland",
      kind: "country",
      text: "Finland parliamentary election 18 April 2027 Ministry of Justice",
    },
    {
      path: FI_FI,
      lang: "fi",
      title: "Eduskuntavaalit, 18. huhtikuuta 2027",
      kind: "election",
      text: "Suomi eduskuntavaalit 18. huhtikuuta 2027",
    },
    {
      path: FI_SV,
      lang: "sv",
      title: "Riksdagsval, 18 april 2027",
      kind: "election",
      text: "Finland riksdagsval 18 april 2027",
    },
    {
      path: FI_EN,
      lang: "en",
      title: "Finland parliamentary election, 18 April 2027",
      kind: "election",
      text: "Finland parliamentary election 18 April 2027",
    },
  ],
  pages: [
    {
      path: "/fi/",
      htmlLang: "fi",
      title: "Suomi",
      description:
        "Suomi Map the Generalissa. Eduskuntavaalit sunnuntaina 18. huhtikuuta 2027. Epävirallinen tieto.",
      h1: "Suomi",
      lede: "Suomenkielinen sivu on pääsivu. Svenska ja English ovat sen rinnalla.",
      alternates: [
        { hreflang: "fi", path: "/fi/" },
        { hreflang: "sv", path: "/fi/sv/" },
        { hreflang: "en", path: "/fi/en/" },
        { hreflang: "x-default", path: "/fi/" },
      ],
      nav: [
        { href: "/", label: "Map the General" },
        { href: "/fi/sv/", label: "Svenska" },
        { href: "/fi/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Suomi", path: "/fi/" },
      ],
      bodyHtml: `<p><a href="/fi/fi/">Suomi</a> · <a href="/fi/sv/">Svenska</a> · <a href="/fi/en/">English</a></p>
<p><a href="${FI_FI}">18. huhtikuuta 2027</a> eduskuntavaalit ovat suomenkielisellä sivulla.</p>`,
    },
    {
      path: "/fi/fi/",
      htmlLang: "fi",
      title: "Suomi — vuoden 2027 vaalit",
      description:
        "Valtakunnallinen opas Suomeen. Eduskuntavaalit sunnuntaina 18. huhtikuuta 2027. Ei kuntasivuja.",
      h1: "Suomi",
      lede: "Valtakunnallinen opas suomeksi. Ei kuntasivuja. Ei ääniä ennen kello 20 Itä-Euroopan kesäaikaa 18. huhtikuuta 2027.",
      alternates: fiAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: FI_FI, label: "Vaalit" },
        { href: "/fi/sv/", label: "Svenska" },
        { href: "/fi/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Suomi", path: "/fi/" },
        { name: "Suomi", path: "/fi/fi/" },
      ],
      bodyHtml: `<h2>Vaalit tässä julkaisussa</h2>
<p>Oikeusministeriön kirje 16. syyskuuta 2026 nimeää eduskuntavaalien vaalipäiväksi 18. huhtikuuta 2027. Aikataulu merkitsee äänestykseksi kello 9–20.</p>
<p><a href="${FI_FI}">Eduskuntavaalit, 18. huhtikuuta 2027</a></p>
<h2>Henkilötiedot</h2>
<p>Suomi on Euroopan unionissa, joten yleistä tietosuoja-asetusta sovelletaan. Tietosuojalakia ei luettu pykälittäin. Tämä opas ei julkaise äänioikeusrekisteriä eikä henkilötunnusta.</p>
<h2>Lähteet</h2>
<ul>
<li><a href="https://loviisa.oncloudos.com/fi/kuulutus/202681054.80020.PDF">Oikeusministeriö, kirje 16. syyskuuta 2026</a></li>
<li><a href="https://www.kuntaliitto.fi/yleiskirjeet/2026/vuoden-2027-eduskuntavaalit">Kuntaliitto, yleiskirje</a></li>
<li><a href="https://tulospalvelu.vaalit.fi/">tulospalvelu.vaalit.fi</a></li>
</ul>`,
    },
    {
      path: "/fi/en/",
      htmlLang: "en",
      title: "Finland — elections of 2027",
      description:
        "National hub for Finland. Parliamentary election on Sunday 18 April 2027. No municipality pages.",
      h1: "Finland",
      lede: "National hub in English. No municipality pages. No count before 20:00 Eastern European Summer Time on 18 April 2027.",
      alternates: fiAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: FI_EN, label: "The election" },
        { href: "/fi/fi/", label: "Suomi" },
        { href: "/fi/sv/", label: "Svenska" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Suomi", path: "/fi/" },
        { name: "Finland", path: "/fi/en/" },
      ],
      bodyHtml: `<h2>The election in this release</h2>
<p>The Ministry of Justice letter of 16 September 2026 names 18 April 2027 as polling day for the parliamentary election. The timetable prints voting as 09:00–20:00.</p>
<p><a href="${FI_EN}">Parliamentary election, 18 April 2027</a></p>
<h2>Personal data</h2>
<p>Finland is in the European Union, so the GDPR applies. The Data Protection Act was not section-read. This hub publishes no roll and no personal identity code.</p>
<h2>Sources</h2>
<ul>
<li><a href="https://loviisa.oncloudos.com/fi/kuulutus/202681054.80020.PDF">Ministry of Justice, letter of 16 September 2026</a></li>
<li><a href="https://www.kuntaliitto.fi/yleiskirjeet/2026/vuoden-2027-eduskuntavaalit">Kuntaliitto circular</a></li>
<li><a href="https://tulospalvelu.vaalit.fi/">tulospalvelu.vaalit.fi</a></li>
</ul>`,
    },
    {
      path: "/fi/sv/",
      htmlLang: "sv",
      title: "Finland — valen 2027",
      description:
        "Nationell guide för Finland. Riksdagsval söndagen den 18 april 2027. Inga kommunsidor.",
      h1: "Finland",
      lede: "Nationell guide på svenska. Inga kommunsidor. Inga röster före klockan 20 östeuropeisk sommartid den 18 april 2027.",
      alternates: fiAlternates,
      nav: [
        { href: "/", label: "Map the General" },
        { href: FI_SV, label: "Valet" },
        { href: "/fi/fi/", label: "Suomi" },
        { href: "/fi/en/", label: "English" },
      ],
      crumbs: [
        { name: "Home", path: "/" },
        { name: "Suomi", path: "/fi/" },
        { name: "Svenska", path: "/fi/sv/" },
      ],
      bodyHtml: `<h2>Valet i denna utgåva</h2>
<p>Justitieministeriets brev den 16 september 2026 anger den 18 april 2027 som valdag för riksdagsvalet. Tidsplanen anger röstningen som klockan 9–20.</p>
<p><a href="${FI_SV}">Riksdagsval, 18 april 2027</a></p>
<h2>Personuppgifter</h2>
<p>Finland är i Europeiska unionen, så den allmänna dataskyddsförordningen gäller. Dataskyddslagen lästes inte paragraf för paragraf. Denna guide publicerar ingen röstlängd och ingen personbeteckning.</p>
<h2>Källor</h2>
<ul>
<li><a href="https://loviisa.oncloudos.com/fi/kuulutus/202681054.80020.PDF">Justitieministeriet, brev den 16 september 2026</a></li>
<li><a href="https://www.kuntaliitto.fi/yleiskirjeet/2026/vuoden-2027-eduskuntavaalit">Kuntaliitto, cirkulär</a></li>
<li><a href="https://tulospalvelu.vaalit.fi/">tulospalvelu.vaalit.fi</a></li>
</ul>`,
    },
  ],
};

COUNTRY_HUBS.push(FI_COUNTRY_HUB);

export function countryHubIndex(): HubIndexEntry[] {
  return COUNTRY_HUBS.flatMap((hub) => hub.index);
}
