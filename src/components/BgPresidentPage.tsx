import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { EditorialPreview } from "@/components/EditorialPreview";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { VerifiedCandidate } from "@/components/VerifiedCandidate";
import {
  BG_ARCHIVE,
  BG_ART_205,
  BG_CIK,
  BG_CODE,
  BG_DECISION,
  BG_FAQ,
  BG_FIRST_ROUND,
  BG_PARLIAMENT,
  BG_REGISTER,
  BG_RESULTS_URL,
} from "@/data/bg-president-2026";
import { SITE, absoluteUrl } from "@/data/site";
import type { SourceRef } from "@/data/spain/types";
import { bilingualMetadata } from "@/lib/bilingual-meta";
import { breadcrumbJsonLd } from "@/lib/metadata";

const BG = "/bg/bg/elections/prezident-2026/";
const EN = "/bg/en/elections/president-2026/";

type Lang = "bg" | "en";

const COPY = {
  bg: {
    title: "България: избори за президент и вицепрезидент, 1 ноември 2026",
    description:
      "Избори за президент и вицепрезидент на Република България. Първи вот на 25 октомври 2026 г. Нов избор на 1 ноември 2026 г., ако няма избрана двойка. Разпределение на ЦИК и ред в бюлетината. Неофициална информация.",
    h1: "Избори за президент и вицепрезидент, 1 ноември 2026",
    lede: "Датата е от решението на Народното събрание. Числата от 25 октомври са таблицата на Централната избирателна комисия. Няма допитвания и няма прогноза.",
    eyebrow: "Неделя, 1 ноември 2026 г. · първи вот 25 октомври",
    home: "Начало",
    country: "България",
    elections: "Избори",
    crumb: "Президент и вицепрезидент, 2026",
    other: "English",
    otherHref: EN,
    sources: "Официални страници",
    trust: {
      updated: "Обновено",
      before: "Неофициална информация. Потвърдете при ",
      link: "Централната избирателна комисия",
      after: ".",
      report: "Съобщете за грешка на тази страница",
    },
  },
  en: {
    title: "Bulgaria presidential election, 1 November 2026",
    description:
      "Election of a president and vice president of Bulgaria. First vote on 25 October 2026. A new election on 1 November 2026 if no pair was elected. Central Election Commission distribution and ballot order. Unofficial information.",
    h1: "Presidential and vice-presidential election, 1 November 2026",
    lede: "The date is the National Assembly’s. The 25 October figures are the Central Election Commission’s table. There are no surveys and no forecast.",
    eyebrow: "Sunday 1 November 2026 · first vote 25 October",
    home: "Home",
    country: "Bulgaria",
    elections: "Elections",
    crumb: "President and vice president, 2026",
    other: "Български",
    otherHref: BG,
    sources: "Official pages",
    trust: undefined,
  },
} as const;

const SOURCES: SourceRef[] = [
  { id: "bg-res", name: "ЦИК, резултати, 25 октомври 2026", url: BG_RESULTS_URL, readOn: "2026-10-27" },
  { id: "bg-reg", name: "ЦИК, публичен регистър на кандидатските двойки", url: BG_REGISTER, readOn: "2026-10-27" },
  { id: "bg-parl", name: "Народно събрание, 31 юли 2026", url: BG_PARLIAMENT, readOn: "2026-10-27" },
  { id: "bg-code", name: "Изборен кодекс, консолидиран текст", url: BG_CODE, readOn: "2026-10-27" },
  { id: "bg-205", name: "Изборен кодекс, чл. 205", url: BG_ART_205, readOn: "2026-10-27" },
  { id: "bg-arc", name: "ЦИК, указател на резултатите", url: BG_ARCHIVE, readOn: "2026-10-27" },
  { id: "bg-faq", name: "ЦИК, въпрос за изборния ден", url: BG_FAQ, readOn: "2026-10-27" },
  { id: "bg-dec", name: "ЦИК, Решение № 30-ПВР, 13 август 2026", url: BG_DECISION, readOn: "2026-10-27" },
];

export function bgPresidentMetadata(lang: Lang) {
  const copy = COPY[lang];
  return bilingualMetadata({
    title: copy.title,
    description: copy.description,
    path: lang === "bg" ? BG : EN,
    locale: lang === "bg" ? "bg_BG" : "en_US",
    languages: { bg: BG, en: EN, "x-default": BG },
  });
}

function faq(lang: Lang) {
  if (lang === "bg") {
    return [
      {
        q: "Кога е новият избор?",
        a: "Народното събрание на 31 юли 2026 г. насрочи изборите за 25 октомври 2026 г. и нов избор за 1 ноември 2026 г., ако на първия вот няма избрана двойка.",
      },
      {
        q: "Кой публикува числата от 25 октомври?",
        a: "Централната избирателна комисия. Таблицата е към 15:00 на 26 октомври 2026 г. при обработени 100,00% протоколи на секционните комисии в районните комисии. Водещата двойка е с 34,759% от отпечатаното разпределение, което не е повече от половината.",
      },
      {
        q: "В кои часове се гласува?",
        a: "Чл. 220 от Изборния кодекс: избирателите гласуват от 7:00 до 20:00 ч. В чужбина денят започва в 7:00 и свършва в 20:00 местно време. Който е пред секцията в 20:00, може да гласува, но не по-късно от 21:00.",
      },
      {
        q: "Какъв е редът на двойките?",
        a: "Редът на тази страница е номерът в таблицата на ЦИК, от 1 до 27. Всяко име води към публичния регистър на кандидатите. Редът „Не подкрепям никого“ е в същата таблица и не е кандидатска двойка.",
      },
      {
        q: "Има ли резултат от 1 ноември?",
        a: "Не. Този раздел показва резултат само след като ЦИК го публикува и след края на изборния ден. Сайтът не публикува допитване и не прави прогноза.",
      },
      {
        q: "Къде са предишните президентски избори?",
        a: "Указателят на резултатите на ЦИК сочи 14 ноември 2021 г., 6 ноември 2016 г. и 23 октомври 2011 г. Тази страница не преписва архивен сбор, който не е отворен ред по ред.",
      },
    ];
  }
  return [
    {
      q: "When is the new election?",
      a: "On 31 July 2026 the National Assembly scheduled the election for 25 October 2026 and a new election for 1 November 2026 if the first vote elected no pair.",
    },
    {
      q: "Who published the 25 October figures?",
      a: "The Central Election Commission. The table is timed 15:00 on 26 October 2026, with 100.00% of section-commission protocols processed in the district commissions. The leading pair has 34.759% of the printed distribution, which is not more than half.",
    },
    {
      q: "What are the voting hours?",
      a: "Election Code article 220: voters vote from 7:00 to 20:00. Abroad the day starts at 7:00 and ends at 20:00 local time. A person still outside the room at 20:00 may vote, and not later than 21:00.",
    },
    {
      q: "What order are the pairs in?",
      a: "The order on this page is the number on the Commission’s table, from 1 to 27. Each name links to the public register of candidates. The line “Не подкрепям никого” (I do not support anyone) is on the same table and is not a candidate pair.",
    },
    {
      q: "Is there a result for 1 November?",
      a: "No. That section shows a count only after the Commission publishes one, and only after the end of election day. This site publishes no survey and makes no forecast.",
    },
    {
      q: "Where are the earlier presidential elections?",
      a: "The Commission’s results index lists 14 November 2021, 6 November 2016 and 23 October 2011. This page does not copy an archive total it did not open row by row.",
    },
  ];
}

export function BgPresidentPage({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const path = lang === "bg" ? BG : EN;
  const bg = lang === "bg";
  const items = faq(lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.country, path: "/bg/" },
    { name: copy.elections, path: bg ? "/bg/bg/elections/" : "/bg/en/elections/" },
    { name: copy.crumb, path },
  ];
  return (
    <article lang={bg ? "bg" : "en"} className="country-article" data-country="bg">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: bg
            ? "Избори за президент и вицепрезидент на България, 1 ноември 2026"
            : "Bulgaria presidential election, 1 November 2026",
          startDate: "2026-11-01",
          endDate: "2026-11-01",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [`${SITE.url}/og.png`],
          location: {
            "@type": "Country",
            name: bg ? "България" : "Bulgaria",
            address: { "@type": "PostalAddress", addressCountry: "BG" },
          },
          organizer: { "@type": "Organization", name: "Централна избирателна комисия", url: BG_CIK },
          url: absoluteUrl(path),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: bg ? "bg" : "en",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <Breadcrumbs
        items={crumbs.map((item, index) => ({ href: index === crumbs.length - 1 ? undefined : item.path, label: item.name }))}
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={copy.otherHref} hrefLang={bg ? "en" : "bg"}>
          {copy.other}
        </Link>
      </p>
      <PageHeader eyebrow={copy.eyebrow} title={copy.h1} lede={copy.lede} />
      <ContentTrust
        updated="27 October 2026"
        pagePath={path}
        officeHref={BG_CIK}
        officeLabel="Централна избирателна комисия"
        copy={copy.trust}
      />
      <div className="mt-8 space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{bg ? "Датата" : "The date"}</h2>
          <p>
            {bg
              ? "На 31 юли 2026 г. Народното събрание реши изборите за президент и вицепрезидент да са на 25 октомври 2026 г. Ако има нов избор, той е на 1 ноември."
              : "On 31 July 2026 the National Assembly decided that the election of a president and vice president would be on 25 October 2026. If there is a new election, it is on 1 November."}{" "}
            <a className="text-navy underline" href={BG_PARLIAMENT} rel="noopener noreferrer">
              {bg ? "Съобщение на Народното събрание" : "National Assembly notice"}
            </a>
            .
          </p>
          <p>
            {bg
              ? "Приложение № 2 към Изборния кодекс казва, че е избрана двойката с повече от половината действителни гласове, ако са гласували повече от половината избиратели. Ако няма избрана листа, ЦИК насрочва нов избор в 7-дневен срок между двете листи с най-много гласове. На новия избор е избрана двойката с най-много гласове."
              : "Annex 2 to the Election Code says a pair is elected with more than half of the valid votes, if more than half of the voters took part. If no list is elected, the Commission schedules a new election within seven days between the two lists with the most votes. At that election the pair with the most votes is elected."}{" "}
            <a className="text-navy underline" href={BG_CODE} rel="noopener noreferrer">
              {bg ? "Изборен кодекс" : "Election Code"}
            </a>
            .
          </p>
          <p>
            {bg
              ? "Въпросът на ЦИК, прочетен на 27 октомври 2026 г., още казва, че изборният ден е 25 октомври. Решение № 30-ПВР от 13 август 2026 г. приема хронограма за тази дата. Решение № 415-ПВР от 26 октомври 2026 г., обявено на страницата на изборите, изменя техническите характеристики на хартиените бюлетини за евентуален нов избор на 1 ноември. Тази страница не твърди, че това решение само по себе си обявява победител."
              : "The Commission question read on 27 October 2026 still says election day is 25 October. Decision 30-ПВР of 13 August 2026 adopts the timetable for that date. Decision 415-ПВР of 26 October 2026, listed on the election page, amends the technical specification of the paper ballots for a possible new election on 1 November. This page does not treat that decision, by itself, as a declaration of a winner."}{" "}
            <a className="text-navy underline" href={BG_FAQ} rel="noopener noreferrer">
              {bg ? "Въпрос на ЦИК" : "Commission question"}
            </a>
            .
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{bg ? "Как се гласува" : "How to vote"}</h2>
          <p>
            {bg
              ? "Чл. 220: избирателите гласуват от 7:00 до 20:00 ч. Извън страната изборният ден започва в 7:00 и приключва в 20:00 местно време. Когато в 20:00 пред помещението има негласували, техният брой и самоличност се установяват и само те се допускат след 20:00, но не по-късно от 21:00. Чл. 229 открива помещението в 7:00, ако присъстват повече от половината членове на секционната комисия. ЦИК може да разреши на някои секции да започнат в 5:00."
              : "Article 220: voters vote from 7:00 to 20:00. Abroad, election day starts at 7:00 and ends at 20:00 local time. When people who have not voted are still outside the room at 20:00, their number and identity are recorded and only they may vote after 20:00, and not later than 21:00. Article 229 opens the room at 7:00 if more than half the members of the section commission are present. The Commission may allow some sections to start at 5:00."}
          </p>
          <p>
            {bg
              ? "Тази страница не преписва документите за самоличност и не описва стъпките в помещението. Легендата на страницата с резултати различава хартиено и машинно гласуване. За местното правило отворете ЦИК."
              : "This page does not copy the identity documents and does not describe the steps inside the room. The legend on the results page distinguishes paper voting and machine voting. For the local rule, open the Commission."}
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">
            {bg ? "Кандидатски двойки по ред в бюлетината" : "Candidate pairs in ballot order"}
          </h2>
          <p>
            {bg
              ? "Редът и имената са от таблицата с резултати на ЦИК за 25 октомври 2026 г. Връзката на всяка двойка е публичният регистър на кандидатите, прочетен на 27 октомври 2026 г."
              : "The order and the names are from the Commission’s results table for 25 October 2026. Each pair’s link is the public register of candidates, read on 27 October 2026."}{" "}
            <a className="text-navy underline" href={BG_REGISTER} rel="noopener noreferrer">
              {bg ? "Регистър" : "Register"}
            </a>
            .
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="mb-2 text-left font-semibold">
                {bg
                  ? "Ред в бюлетината, 25 октомври 2026 (ЦИК)"
                  : "Ballot order, 25 October 2026 (Central Election Commission)"}
              </caption>
              <thead>
                <tr>
                  <th className="py-1 pr-4">№</th>
                  <th className="py-1 pr-4">{bg ? "Двойка" : "Pair"}</th>
                </tr>
              </thead>
              <tbody>
                {BG_FIRST_ROUND.filter((row) => row.order !== null).map((row) => (
                  <tr key={row.order} className="border-t border-line">
                    <td className="py-1 pr-4 tabular-nums">{row.order}</td>
                    <td className="py-1 pr-4">
                      <VerifiedCandidate listId="bg-president-2026" name={row.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">
            {bg ? "Официално разпределение от 25 октомври" : "Official distribution of 25 October"}
          </h2>
          <p>
            {bg
              ? "Всички числа по-долу са от таблицата на ЦИК, прочетена на 27 октомври 2026 г.: данни към 15:00 на 26 октомври при обработени 100,00% протоколи на секционните комисии в районните комисии. Колоната „Разпределение“ е отпечатана така. Страницата за активност показа снимки в 11:00 (5,80%) и в 16:00 (15,95%) и каза, че активността към 20:00 се смята по-късно от протоколите. Крайна активност не е преписана тук, затова условието „повече от половината избиратели“ не е отсъдено на тази страница."
              : "Every figure below is from the Commission’s table, read on 27 October 2026: data as of 15:00 on 26 October, with 100.00% of section-commission protocols processed in the district commissions. The distribution column is printed as the Commission printed it. The activity page showed snapshots at 11:00 (5.80%) and at 16:00 (15.95%) and said the 20:00 activity is calculated later from the protocols. A final turnout is not copied here, so this page does not decide the condition that more than half of the voters took part."}{" "}
            <a className="text-navy underline" href={BG_RESULTS_URL} rel="noopener noreferrer">
              {bg ? "Таблица на ЦИК" : "Commission table"}
            </a>
            .
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="mb-2 text-left font-semibold">
                {bg
                  ? "25 октомври 2026, ЦИК, 100,00% протоколи в РИК"
                  : "25 October 2026, Commission, 100.00% of protocols in the district commissions"}
              </caption>
              <thead>
                <tr>
                  <th className="py-1 pr-4">№</th>
                  <th className="py-1 pr-4">{bg ? "Ред" : "Row"}</th>
                  <th className="py-1 pr-4 text-right">{bg ? "Гласове" : "Votes"}</th>
                  <th className="py-1 text-right">{bg ? "Разпределение" : "Distribution"}</th>
                </tr>
              </thead>
              <tbody>
                {BG_FIRST_ROUND.map((row) => (
                  <tr key={row.name} className="border-t border-line">
                    <td className="py-1 pr-4 tabular-nums">{row.order ?? "–"}</td>
                    <td className="py-1 pr-4">
                      {row.order === null ? (
                        row.name
                      ) : (
                        <VerifiedCandidate listId="bg-president-2026" name={row.name} />
                      )}
                    </td>
                    <td className="py-1 pr-4 text-right tabular-nums">{row.votes}</td>
                    <td className="py-1 text-right tabular-nums">{row.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {bg
              ? "Двете двойки с най-голямо разпределение са № 25 (Илияна Малинова Йотова и Кирил Александров Вълчев, 528 929, 34,759%) и № 4 (Андрей Атанасов Гюров и Георги Димитров Кандев, 486 214, 31,952%). Нито една двойка няма повече от половината от отпечатаното разпределение. Тази страница не обявява избрана двойка."
              : "The two pairs with the largest shares are no. 25 (Илияна Малинова Йотова и Кирил Александров Вълчев, 528 929, 34.759%) and no. 4 (Андрей Атанасов Гюров и Георги Димитров Кандев, 486 214, 31.952%). No pair has more than half of the printed distribution. This page does not declare a pair elected."}
          </p>
        </section>
        <section className="space-y-3" id="results-1-november">
          <h2 className="font-serif text-2xl font-semibold">
            {bg ? "Резултати от 1 ноември 2026" : "Results of 1 November 2026"}
          </h2>
          <p>
            {bg
              ? "Тук се показва само официален резултат на ЦИК, и само след края на изборния ден. Към прочита на 27 октомври 2026 г. такъв резултат няма. Няма прогноза и няма междинна сметка от другаде."
              : "This section shows only an official Commission result, and only after the end of election day. On the reading of 27 October 2026 there is no such result. There is no forecast and no running tally from anywhere else."}
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{bg ? "Предишни избори" : "Earlier elections"}</h2>
          <p>
            {bg
              ? "Указателят на резултатите на ЦИК, прочетен на 27 октомври 2026 г., сочи избори за президент и вицепрезидент на 14 ноември 2021 г. (заедно с избори за народни представители), на 6 ноември 2016 г. и на 23 октомври 2011 г. Сборовете от тези архиви не са преписани тук."
              : "The Commission’s results index, read on 27 October 2026, lists presidential and vice-presidential elections on 14 November 2021 (together with a National Assembly election), on 6 November 2016 and on 23 October 2011. Totals from those archives are not copied here."}{" "}
            <a className="text-navy underline" href={BG_ARCHIVE} rel="noopener noreferrer">
              {bg ? "Указател на ЦИК" : "Commission index"}
            </a>
            .
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{bg ? "Забрана за допитвания" : "Survey blackout"}</h2>
          <p>
            {bg
              ? "Чл. 205, ал. 5 от Изборния кодекс: резултати от допитвания до общественото мнение по повод на изборите не може да се огласяват под каквато и да е форма 24 часа преди изборния ден до обявяване края на изборния ден на територията на страната. Този сайт не огласява такива резултати в нито един ден."
              : "Election Code article 205(5): results of public-opinion surveys about the elections may not be made public in any form from 24 hours before election day until the end of election day is declared in the country. This site does not publish such results on any day."}{" "}
            <a className="text-navy underline" href={BG_ART_205} rel="noopener noreferrer">
              {bg ? "Чл. 205" : "Article 205"}
            </a>
            .
          </p>
        </section>
        <section className="space-y-4">
          <h2 className="font-serif text-2xl font-semibold">{bg ? "Въпроси" : "Questions"}</h2>
          <dl className="space-y-4">
            {items.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <EditorialPreview path={path} />
        <section>
          <h2 className="font-serif text-2xl font-semibold">{copy.sources}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {SOURCES.map((source) => (
              <li key={source.id}>
                <a className="text-navy underline" href={source.url} rel="noopener noreferrer">
                  {source.name}
                </a>
                <span className="text-ink-muted"> — {bg ? "прочетено" : "read"} {source.readOn}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
