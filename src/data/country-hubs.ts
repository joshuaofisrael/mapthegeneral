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
<p>Централната избирателна комисия е публикувала решения за хартиените бюлетини за евентуален нов избор за президент и вицепрезидент на 1 ноември 2026 г. Страницата на избора събира часа, начина на гласуване и източниците. Двете листи не са именувани, защото прочетените решения не ги определят.</p>
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
<p>The Central Election Commission has published decisions on the paper ballots for a possible new election for president and vice president on 1 November 2026. The election page collects the hours, the voting method and the sources. The two lists are not named, because the decisions that were read do not determine them.</p>
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

export function countryHubIndex(): HubIndexEntry[] {
  return COUNTRY_HUBS.flatMap((hub) => hub.index);
}
