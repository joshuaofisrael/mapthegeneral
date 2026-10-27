import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { EditorialPreview } from "@/components/EditorialPreview";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import type { SourceRef } from "@/data/spain/types";
import { bilingualMetadata } from "@/lib/bilingual-meta";
import { breadcrumbJsonLd } from "@/lib/metadata";

/**
 * No Event JSON-LD: a polling day has not been called.
 * Add an Event, with organizer Republička izborna komisija
 * (https://www.rik.parlament.gov.rs/), once the date is published
 * in the Official Gazette (Službeni glasnik).
 */

const SR = "/rs/sr/elections/predsednicki-2026/";
const EN = "/rs/en/elections/president-2026/";
const GOV = "https://www.srbija.gov.rs/vest/en/288494";
const RTS_LAW = "https://www.rts.rs/lat/vesti/politika/6049890.html";
const RTS_RIK = "https://www.rts.rs/lat/vesti/izbori-2026/6049980/dimitrijevic-za-rts-sve-tece-po-planu-do-25-oktobra-bice-sve-spremno-za-izbore.html";
const RIK = "https://www.rik.parlament.gov.rs/";

type Lang = "sr" | "en";

const COPY = {
  sr: {
    title: "Srbija: izbori za predsednika Republike 2026, datum nije raspisan",
    description:
      "Izbori za predsednika Republike Srbije 2026. Datum glasanja nije raspisan. Zakon traži da se glasa najkasnije 27. decembra 2026. Vršilac dužnosti je Ana Brnabić. Nezvanične informacije.",
    h1: "Izbori za predsednika Republike Srbije, 2026",
    lede: "Dan glasanja nije raspisan. Ova stranica ne navodi pretpostavljeni datum.",
    eyebrow: "Datum nije raspisan · najkasnije 27. decembar 2026",
    home: "Početna",
    serbia: "Srbija",
    elections: "Izbori",
    crumb: "Predsednički izbori 2026",
    otherHref: EN,
    other: "English",
    htmlLang: "sr",
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
    title: "Serbia presidential election 2026: no polling day called",
    description:
      "Presidential election in Serbia, 2026. No polling day has been called. The vote must be held by 27 December 2026 at the latest. Ana Brnabić is acting president. Unofficial information.",
    h1: "Presidential election of Serbia, 2026",
    lede: "No polling day has been called. This page does not print a guessed date.",
    eyebrow: "Polling day not called · 27 December 2026 at the latest",
    home: "Home",
    serbia: "Serbia",
    elections: "Elections",
    crumb: "Presidential election 2026",
    otherHref: SR,
    other: "Srpski",
    htmlLang: "en",
    sources: "Official pages",
    trust: undefined,
  },
} as const;

const SOURCES: SourceRef[] = [
  {
    id: "rs-gov-288494",
    name: "Government of Serbia, Vučić hands over duty to the Speaker, 28 September 2026",
    url: GOV,
    readOn: "2026-10-27",
  },
  {
    id: "rs-rts-law",
    name: "RTS, Ostavka i rokovi – kada se bira novi predsednik, 27 September 2026",
    url: RTS_LAW,
    readOn: "2026-10-27",
  },
  {
    id: "rs-rts-rik",
    name: "RTS, interview with RIK chair Vladimir Dimitrijević, 28 September 2026",
    url: RTS_RIK,
    readOn: "2026-10-27",
  },
  { id: "rs-rik", name: "Republička izborna komisija", url: RIK, readOn: "2026-10-27" },
];

export function rsPresidentMetadata(lang: Lang) {
  const copy = COPY[lang];
  const path = lang === "sr" ? SR : EN;
  return bilingualMetadata({
    title: copy.title,
    description: copy.description,
    path,
    locale: lang === "sr" ? "sr_RS" : "en_US",
    languages: { sr: SR, en: EN, "x-default": SR },
  });
}

function faq(lang: Lang): { q: string; a: string }[] {
  if (lang === "sr") {
    return [
      {
        q: "Kada su izbori za predsednika Srbije 2026?",
        a: "Dan glasanja nije raspisan. RTS je 27. septembra 2026. naveo da je najkasniji datum 27. decembar 2026. Ova stranica ne objavljuje drugi datum.",
      },
      {
        q: "Ko obavlja dužnost predsednika?",
        a: "Vlada Srbije je 28. septembra 2026. objavila da je Aleksandar Vučić prethodne noći podneo ostavku i da je dužnost predao predsednici Narodne skupštine Ani Brnabić, koja je vršilac dužnosti.",
      },
      {
        q: "Koji rok propisuje zakon?",
        a: "Ista vest kaže da, po Zakonu o predsedniku, predsednik Narodne skupštine vrši dužnost najduže tri meseca i raspisuje izbore tako da se glasa najkasnije tri meseca od prestanka mandata. Član 14. kaže da mandat prestaje kad ostavka stigne u Narodnu skupštinu.",
      },
      {
        q: "Koliko traje od raspisivanja do glasanja?",
        a: "RTS navodi član 10. Zakona o izboru predsednika Republike: od dana raspisivanja do dana glasanja ne može proći manje od 30 ni više od 60 dana.",
      },
      {
        q: "Šta ako niko ne dobije više od polovine važećih glasova?",
        a: "Zakon o izboru predsednika Republike predviđa drugi krug u roku od 15 dana. RIK još nije objavio kandidaturu niti dan glasanja.",
      },
      {
        q: "Da li ova stranica objavljuje ankete?",
        a: "Ne. Ovaj sajt ne objavljuje ankete, projekcije niti izlazne procene, ni pre ni posle izbora.",
      },
    ];
  }
  return [
    {
      q: "When is the Serbia presidential election in 2026?",
      a: "No polling day has been called. On 27 September 2026 RTS stated that the latest date is 27 December 2026. This page does not publish any other date.",
    },
    {
      q: "Who is acting president?",
      a: "On 28 September 2026 the Government of Serbia reported that Aleksandar Vučić had resigned the night before and handed the duty to Ana Brnabić, Speaker of the National Assembly, who is acting president.",
    },
    {
      q: "What deadline does the law set?",
      a: "That notice says that, under the Law on the President, the Speaker acts for not more than three months and must call the election so that voting is no later than three months after the term ends. Article 14 says the term ends when the resignation is received by the National Assembly.",
    },
    {
      q: "How long is the period from the call to polling day?",
      a: "RTS cites article 10 of the Law on the Election of the President of the Republic: from the day the election is called to polling day, not fewer than 30 days and not more than 60 days.",
    },
    {
      q: "What if no candidate wins more than half of the valid votes?",
      a: "The Law on the Election of the President of the Republic provides a second round within 15 days. RIK has not published a candidacy or a polling day.",
    },
    {
      q: "Does this page publish polls?",
      a: "No. This site publishes no polls, projections or exit estimates, before or after the vote.",
    },
  ];
}

export function RsPresidentPage({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const path = lang === "sr" ? SR : EN;
  const items = faq(lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.serbia, path: "/rs/" },
    { name: copy.elections, path: "/rs/en/elections/" },
    { name: copy.crumb, path },
  ];
  const sr = lang === "sr";
  return (
    <article lang={copy.htmlLang} className="country-article" data-country="rs">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: copy.htmlLang,
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <Breadcrumbs
        items={crumbs.map((item, index) => ({
          href: index === crumbs.length - 1 ? undefined : item.path,
          label: item.name,
        }))}
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={copy.otherHref} hrefLang={sr ? "en" : "sr"}>
          {copy.other}
        </Link>
      </p>
      <PageHeader eyebrow={copy.eyebrow} title={copy.h1} lede={copy.lede} />
      <ContentTrust
        updated="27 October 2026"
        pagePath={path}
        officeHref={RIK}
        officeLabel="Republička izborna komisija"
        copy={copy.trust}
      />
      <EditorialPreview path={path} />
      <div className="mt-8 space-y-8 prose-legal">
        <section className="space-y-3">
          <h2>{sr ? "Šta je poznato" : "What is on the record"}</h2>
          <p>
            {sr
              ? "Vlada Srbije je 28. septembra 2026. objavila da je Aleksandar Vučić prethodne noći podneo ostavku na funkciju predsednika Republike i da je tog dana dužnost predao predsednici Narodne skupštine Ani Brnabić. Ona obavlja dužnost vršioca predsednika dok se ne izabere novi predsednik."
              : "On 28 September 2026 the Government of Serbia reported that Aleksandar Vučić had resigned the night before as President of the Republic and that day handed the duty to Ana Brnabić, Speaker of the National Assembly. She serves as acting president until a new president is elected."}{" "}
            <a href={GOV} rel="noopener noreferrer">
              srbija.gov.rs
            </a>
          </p>
          <p>
            {sr
              ? "Ista vest kaže da, po Zakonu o predsedniku, predsednik Narodne skupštine vrši dužnost predsednika najduže tri meseca i da je dužan da raspiše izbore tako da se glasa najkasnije tri meseca od dana kada mandat prestane. Po članu 14. tog zakona mandat prestaje kada ostavka stigne u Narodnu skupštinu."
              : "The same notice says that, under the Law on the President, the Speaker performs the duties of president for not more than three months and must call the election so that voting takes place no later than three months from the day the term ends. Under article 14 of that law, the term ends when the resignation is received by the National Assembly."}
          </p>
        </section>
        <section className="space-y-3">
          <h2>{sr ? "Kako se predsednik bira" : "How the president is elected"}</h2>
          <p>
            {sr
              ? "RTS je 27. septembra 2026. prenela član 10. Zakona o izboru predsednika Republike: ako mandat prestane pre vremena, izbori se raspisuju tako da se glasa najkasnije tri meseca od prestanka mandata, a od dana raspisivanja do dana glasanja ne može proći manje od 30 ni više od 60 dana. Isti tekst navodi da je najkasniji datum 27. decembar. To je rok, a ne raspisan dan."
              : "On 27 September 2026 RTS reported article 10 of the Law on the Election of the President of the Republic: if the term ends early, the election is called so that voting is held no later than three months after the term ends, and from the day of the call to polling day not fewer than 30 and not more than 60 days may pass. The same text says the latest date is 27 December. That is a deadline, not a called polling day."}{" "}
            <a href={RTS_LAW} rel="noopener noreferrer">
              RTS
            </a>
          </p>
          <p>
            {sr
              ? "Predsednik Republičke izborne komisije Vladimir Dimitrijević rekao je RTS-u 28. septembra 2026. da glasanje mora da se održi najkasnije do 27. decembra 2026. Ova stranica ne ponavlja drugi datum iz tog intervjua."
              : "Republic Electoral Commission chair Vladimir Dimitrijević told RTS on 28 September 2026 that voting must be held by 27 December 2026 at the latest. This page does not repeat another date from that interview."}{" "}
            <a href={RTS_RIK} rel="noopener noreferrer">
              RTS
            </a>
          </p>
          <p>
            {sr
              ? "Ako nijedan kandidat ne dobije više od polovine važećih glasova, Zakon o izboru predsednika Republike predviđa drugi krug u roku od 15 dana."
              : "If no candidate wins more than half of the valid votes, the Law on the Election of the President of the Republic provides a second round within 15 days."}
          </p>
        </section>
        <section className="space-y-3">
          <h2>{sr ? "Kako se glasa" : "How to vote"}</h2>
          <p>
            {sr
              ? "Dan, biračka mesta i spisak kandidata objavljuje Republička izborna komisija kada izbori budu raspisani. Do čitanja 27. oktobra 2026. RIK nije objavila predsednički dan glasanja. Kandidati se ovde ne navode."
              : "The polling day, the polling stations and the candidate list are published by the Republic Electoral Commission once the election is called. As read on 27 October 2026, RIK had not published a presidential polling day. No candidates are listed here."}{" "}
            <a href={RIK} rel="noopener noreferrer">
              rik.parlament.gov.rs
            </a>
          </p>
        </section>
        <section className="space-y-3">
          <h2>{sr ? "Ključni datumi" : "Key dates"}</h2>
          <ul>
            <li>{sr ? "27. septembar 2026: ostavka, prema vesti Vlade od 28. septembra." : "27 September 2026: the resignation, according to the Government notice of 28 September."}</li>
            <li>{sr ? "28. septembar 2026: predaja dužnosti Ani Brnabić." : "28 September 2026: the duty is handed to Ana Brnabić."}</li>
            <li>{sr ? "Od raspisivanja do glasanja: ne manje od 30 i ne više od 60 dana." : "From the call to polling day: not fewer than 30 days and not more than 60 days."}</li>
            <li>{sr ? "Najkasnije 27. decembar 2026: rok koji su naveli RTS i predsednik RIK. Dan nije raspisan." : "27 December 2026 at the latest: the deadline stated by RTS and the RIK chair. No day has been called."}</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2>{sr ? "Pitanja" : "Questions"}</h2>
          <dl className="space-y-4">
            {items.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold">{item.q}</dt>
                <dd className="mt-1 text-sm leading-6 text-ink-muted">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="text-sm">
          <Link className="text-navy underline" href={sr ? "/rs/sr/elections/narodna-skupstina-2026/" : "/rs/en/elections/national-assembly-2026/"}>
            {sr ? "Narodna skupština, 25. oktobar 2026" : "National Assembly, 25 October 2026"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href="/rs/">
            {sr ? "Srbija" : "Serbia"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href="/">
            {copy.home}
          </Link>
        </p>
      </div>
      <SourceList sources={SOURCES} heading={copy.sources} />
    </article>
  );
}
