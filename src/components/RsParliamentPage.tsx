import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE, absoluteUrl } from "@/data/site";
import type { SourceRef } from "@/data/spain/types";
import { bilingualMetadata } from "@/lib/bilingual-meta";
import { breadcrumbJsonLd } from "@/lib/metadata";

const SR = "/rs/sr/elections/narodna-skupstina-2026/";
const EN = "/rs/en/elections/national-assembly-2026/";
const RIK_RES = "https://www.rik.parlament.gov.rs/542645/rezultati/";
const RIK_ABOUT = "https://www.rik.parlament.gov.rs/tekst/77/o-izborima-za-narodne-poslanike.php";
const RIK = "https://www.rik.parlament.gov.rs/";

type Lang = "sr" | "en";

const ROWS = [
  ["Studentska lista – Studenti pobeđuju (Student List – Students Win)", "2,246,423", "52.65%"],
  ["Aleksandar Vučić – Ujedinjena Srbija (United Serbia)", "1,673,241", "39.22%"],
  ["Ivica Dačić – Faktor stabilnosti (SPS coalition)", "92,532", "2.17%"],
  ["Autentična desnica (Authentic Right)", "—", "0.90%"],
  ["Alliance of Vojvodina Hungarians (VMSZ), minority list", "—", "0.81%"],
  ["Albanian coalition, minority list", "—", "0.65%"],
] as const;

const COPY = {
  sr: {
    title: "Srbija: izbori za Narodnu skupštinu, 25. oktobar 2026",
    description:
      "Izbori za Narodnu skupštinu Srbije, 25. oktobar 2026. Preliminarni rezultati RIK, nisu konačni. Nezvanične informacije.",
    h1: "Izbori za Narodnu skupštinu, 25. oktobar 2026",
    lede: "Preliminarni zbir Republičke izborne komisije. Konačan izveštaj još nije ovde.",
    eyebrow: "25. oktobar 2026 · preliminarni zbir",
    home: "Početna",
    serbia: "Srbija",
    elections: "Izbori",
    crumb: "Narodna skupština, 25. oktobar 2026",
    other: "English",
    otherHref: EN,
    sources: "Zvanične stranice",
    trust: {
      updated: "Ažurirano",
      before: "Nezvanične informacije. Proverite kod ",
      link: "Republičke izborne komisije",
      after: ".",
      report: "Prijavite grešku na ovoj stranici",
    },
  },
  en: {
    title: "Serbia National Assembly election, 25 October 2026",
    description:
      "Serbia National Assembly election, 25 October 2026. Preliminary RIK results, not the final result. Unofficial information.",
    h1: "National Assembly election, 25 October 2026",
    lede: "A preliminary count from the Republic Electoral Commission. The final report is not on this page.",
    eyebrow: "25 October 2026 · preliminary count",
    home: "Home",
    serbia: "Serbia",
    elections: "Elections",
    crumb: "National Assembly, 25 October 2026",
    other: "Srpski",
    otherHref: SR,
    sources: "Official pages",
    trust: undefined,
  },
} as const;

const SOURCES: SourceRef[] = [
  { id: "rs-res", name: "RIK, election results, Parlamentarni 2026", url: RIK_RES, readOn: "2026-10-26" },
  { id: "rs-about", name: "RIK, about National Assembly elections", url: RIK_ABOUT, readOn: "2026-10-26" },
  { id: "rs-home", name: "Republička izborna komisija", url: RIK, readOn: "2026-10-27" },
];

export function rsParliamentMetadata(lang: Lang) {
  const copy = COPY[lang];
  return bilingualMetadata({
    title: copy.title,
    description: copy.description,
    path: lang === "sr" ? SR : EN,
    locale: lang === "sr" ? "sr_RS" : "en_US",
    languages: { sr: SR, en: EN, "x-default": SR },
  });
}

function faq(lang: Lang) {
  if (lang === "sr") {
    return [
      {
        q: "Kada su bili izbori za Narodnu skupštinu?",
        a: "25. oktobra 2026. RIK navodi da su biračka mesta otvorena u 07:00 i zatvorena u 20:00.",
      },
      {
        q: "Da li su ovo konačni rezultati?",
        a: "Ne. To je preliminarni zbir RIK od 10:25 po beogradskom vremenu 26. oktobra 2026, kada je obrađeno 8.135 od 8.392 biračka mesta. Konačan ukupan izveštaj RIK objavljuje u Službenom glasniku.",
      },
      {
        q: "Kako se bira 250 poslanika?",
        a: "RIK kaže da se 250 poslanika bira u Srbiji kao jednoj izbornoj jedinici, sa izbornih lista, a mandati se dele D’Ontovim sistemom listama koje imaju najmanje 3 odsto glasova onih koji su glasali. Liste nacionalnih manjina učestvuju i ispod tog praga, uz količnik uvećan za 35 odsto.",
      },
      {
        q: "Kako se glasalo?",
        a: "RIK kaže da svaki birač bira jednu listu. Biračka mesta su 25. oktobra 2026. radila od 07:00 do 20:00.",
      },
      {
        q: "Gde su predsednički izbori?",
        a: "Dan predsedničkih izbora nije raspisan. Stranica o tom izboru ne navodi pretpostavljeni datum.",
      },
      {
        q: "Da li sajt objavljuje procene mandata?",
        a: "Ne. Mandati se prikazuju tek kada ih RIK dodeli. Sajt ne objavljuje projekcije.",
      },
    ];
  }
  return [
    {
      q: "When was the National Assembly election?",
      a: "25 October 2026. RIK says polling stations opened at 07:00 and closed at 20:00.",
    },
    {
      q: "Are these the final results?",
      a: "No. This is RIK’s preliminary count at 10:25 Belgrade time on 26 October 2026, when 8,135 of 8,392 polling stations had been processed. RIK publishes the final total report in the Official Gazette.",
    },
    {
      q: "How are the 250 members elected?",
      a: "RIK says 250 members are elected from Serbia as one constituency, from electoral lists, and seats are divided by the D’Hondt method among lists with at least 3 percent of the votes of those who voted. National-minority lists take part below that threshold, with their quotients increased by 35 percent.",
    },
    {
      q: "How did people vote?",
      a: "RIK says each voter chooses one list. On 25 October 2026 polling stations were open from 07:00 to 20:00.",
    },
    {
      q: "Where is the presidential election?",
      a: "No presidential polling day has been called. The page on that election does not print a guessed date.",
    },
    {
      q: "Does this site publish seat estimates?",
      a: "No. Seats are shown only once RIK assigns them. This site publishes no projections.",
    },
  ];
}

export function RsParliamentPage({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const path = lang === "sr" ? SR : EN;
  const sr = lang === "sr";
  const items = faq(lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.serbia, path: "/rs/" },
    { name: copy.elections, path: "/rs/en/elections/" },
    { name: copy.crumb, path },
  ];
  const eventName = sr ? "Izbori za Narodnu skupštinu Republike Srbije, 25. oktobar 2026" : "National Assembly election of Serbia, 25 October 2026";
  return (
    <article lang={sr ? "sr" : "en"} className="country-article" data-country="rs">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: eventName,
          startDate: "2026-10-25T07:00:00+01:00",
          endDate: "2026-10-25T20:00:00+01:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [`${SITE.url}/og.png`],
          location: {
            "@type": "Country",
            name: sr ? "Srbija" : "Serbia",
            address: { "@type": "PostalAddress", addressCountry: "RS" },
          },
          organizer: { "@type": "Organization", name: "Republička izborna komisija", url: RIK },
          url: absoluteUrl(path),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: sr ? "sr" : "en",
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
        <Link className="text-navy underline" href={copy.otherHref} hrefLang={sr ? "en" : "sr"}>
          {copy.other}
        </Link>
      </p>
      <PageHeader eyebrow={copy.eyebrow} title={copy.h1} lede={copy.lede} />
      <ContentTrust updated="27 October 2026" pagePath={path} officeHref={RIK} officeLabel="Republička izborna komisija" copy={copy.trust} />
      <div className="mt-8 space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{sr ? "Preliminarni zbir" : "Preliminary count"}</h2>
          <p>
            {sr
              ? "Brojevi su sa stranice rezultata RIK, stanje u 10:25 po beogradskom vremenu 26. oktobra 2026, kada je obrađeno 8.135 od 8.392 biračka mesta. RIK ih označava kao preliminarne. Konačan rezultat je ukupan izveštaj u Službenom glasniku. Procenti su udeo onih koji su glasali, kako ih RIK prikazuje. Mandati se ne prikazuju dok ih RIK ne dodeli."
              : "Figures are from the RIK results page as of 10:25 Belgrade time on 26 October 2026, when 8,135 of 8,392 polling stations had been processed. RIK labels them preliminary. The final result is the total report in the Official Gazette. Percentages are the share of people who voted, as RIK shows them. Seats are not shown until RIK assigns them."}{" "}
            <a className="text-navy underline" href={RIK_RES} rel="noopener noreferrer">
              {sr ? "Rezultati RIK" : "RIK results"}
            </a>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <caption className="mb-2 text-left font-semibold">
                {sr
                  ? "Narodna skupština, 25. oktobar 2026 — RIK, preliminarno, liste iznad 0,6 odsto"
                  : "National Assembly, 25 October 2026 — RIK preliminary, lists above 0.6 percent"}
              </caption>
              <thead>
                <tr>
                  <th className="py-1 pr-4">{sr ? "Lista" : "List"}</th>
                  <th className="py-1 pr-4 text-right">{sr ? "Glasovi" : "Votes"}</th>
                  <th className="py-1 text-right">{sr ? "Udeo" : "Share"}</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row[0]} className="border-t border-line">
                    <td className="py-1 pr-4">{row[0]}</td>
                    <td className="py-1 pr-4 text-right tabular-nums">{row[1]}</td>
                    <td className="py-1 text-right tabular-nums">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            {sr
              ? "Preliminarni zbirovi RIK: 6.451.292 upisanih birača; glasalo 4.269.403 (68,81 odsto); 4.211.697 važećih listića; 55.107 nevažećih. Ostale liste su na stranici RIK. Liste ispod 3 odsto dobijaju mandate samo ako RIK potvrdi status nacionalne manjine, kako je opisano na stranici o izborima za narodne poslanike. Sadržaj RIK je pod licencom CC BY-NC-ND 3.0 RS."
              : "RIK preliminary totals: 6,451,292 registered voters; 4,269,403 voted (68.81 percent); 4,211,697 valid ballots; 55,107 invalid ballots. Other lists are on the RIK page. Lists below 3 percent win seats only if RIK confirms national-minority status, as described on the page about National Assembly elections. RIK content is licensed CC BY-NC-ND 3.0 RS."}{" "}
            <a className="text-navy underline" href={RIK_ABOUT} rel="noopener noreferrer">
              {sr ? "O izborima za narodne poslanike" : "About National Assembly elections"}
            </a>
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{sr ? "Kako se glasalo" : "How to vote"}</h2>
          <p>
            {sr
              ? "Stranica RIK o izborima za narodne poslanike kaže da se bira jedna lista i da su biračka mesta otvorena od 07:00 do 20:00. Izbori 25. oktobra 2026. su održani. Ova stranica ne opisuje način glasanja koji ta stranica nije navela."
              : "The RIK page on National Assembly elections says a voter chooses one list and that polling stations are open from 07:00 to 20:00. The election of 25 October 2026 has been held. This page does not describe a voting method that page did not state."}
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{sr ? "Ključni datumi" : "Key dates"}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6">
            <li>{sr ? "25. oktobar 2026, 07:00–20:00: dan glasanja." : "25 October 2026, 07:00–20:00: polling day."}</li>
            <li>{sr ? "26. oktobar 2026, 10:25: preliminarni zbir na ovoj stranici." : "26 October 2026, 10:25: the preliminary count on this page."}</li>
            <li>
              {sr
                ? "RIK objavljuje ukupan izveštaj u Službenom glasniku u roku od 96 sati od prijema svih lokalnih zbirnih izveštaja, a mandate dodeljuje u narednih deset dana."
                : "RIK publishes the total report in the Official Gazette within 96 hours of receiving every local summary report, and assigns seats within the next ten days."}
            </li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-2xl font-semibold">{sr ? "Pitanja" : "Questions"}</h2>
          <dl className="mt-4 space-y-4">
            {items.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="text-sm">
          <Link className="text-navy underline" href={sr ? "/rs/sr/elections/predsednicki-2026/" : "/rs/en/elections/president-2026/"}>
            {sr ? "Predsednički izbori 2026, datum nije raspisan" : "Presidential election 2026, no polling day called"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href="/rs/">
            {copy.serbia}
          </Link>
        </p>
      </div>
      <SourceList sources={SOURCES} heading={copy.sources} />
    </article>
  );
}
