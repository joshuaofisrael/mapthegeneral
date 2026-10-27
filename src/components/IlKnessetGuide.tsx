import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { EditorialPreview } from "@/components/EditorialPreview";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { IL_OG } from "@/components/IlResultsPage";
import { SITE, absoluteUrl } from "@/data/site";
import type { SourceRef } from "@/data/spain/types";
import { bilingualMetadata } from "@/lib/bilingual-meta";
import { breadcrumbJsonLd } from "@/lib/metadata";

const HE = "/il/he/elections/knesset-2026/";
const EN = "/il/en/elections/knesset-2026/";
const HE_RESULTS = "/il/he/results/";
const EN_RESULTS = "/il/en/results/";
const CEC = "https://www.bechirot.gov.il/";
const DATE = "https://www.gov.il/en/pages/knesset26-date";
const ABOUT = "https://www.gov.il/en/pages/election-about-info";

type Lang = "he" | "en";

const COPY = {
  he: {
    title: "ישראל: הבחירות לכנסת ה-26, 27 באוקטובר 2026",
    description: "הבחירות לכנסת ה-26 בישראל ביום שלישי 27 באוקטובר 2026. 120 מושבים. הקלפיות מ-07:00 עד 22:00. מידע לא רשמי.",
    h1: "הבחירות לכנסת ה-26, 27 באוקטובר 2026",
    lede: "יום הבחירות שקבעה ועדת הבחירות המרכזית. אין כאן סקרים או מדגמים.",
    eyebrow: "יום שלישי 27 באוקטובר 2026 · 16 בחשוון תשפ״ז",
    home: "דף הבית",
    country: "ישראל",
    elections: "בחירות",
    crumb: "הכנסת ה-26",
    other: "English",
    otherHref: EN,
    sources: "מקורות רשמיים",
    trust: {
      updated: "עודכן",
      before: "מידע לא רשמי. יש לאמת מול ",
      link: "ועדת הבחירות המרכזית",
      after: ".",
      report: "דיווח על שגיאה בעמוד זה",
    },
  },
  en: {
    title: "Israel Knesset election, 27 October 2026",
    description:
      "Election to the 26th Knesset in Israel on Tuesday 27 October 2026. 120 seats. Polling stations from 07:00 to 22:00 Israel time. Unofficial information.",
    h1: "Election to the 26th Knesset, 27 October 2026",
    lede: "The election day set by the Central Elections Committee. This page has no polls and no exit samples.",
    eyebrow: "Tuesday 27 October 2026 · 16 Heshvan 5787",
    home: "Home",
    country: "Israel",
    elections: "Elections",
    crumb: "26th Knesset",
    other: "עברית",
    otherHref: HE,
    sources: "Official pages",
    trust: undefined,
  },
} as const;

const SOURCES: SourceRef[] = [
  { id: "il-date", name: "Central Elections Committee, date of the 26th Knesset election", url: DATE, readOn: "2026-10-26" },
  { id: "il-about", name: "Central Elections Committee, elections in Israel", url: ABOUT, readOn: "2026-10-26" },
  { id: "il-cec", name: "Central Elections Committee", url: CEC, readOn: "2026-10-27" },
];

export function ilKnessetMetadata(lang: Lang) {
  const copy = COPY[lang];
  return bilingualMetadata({
    title: copy.title,
    description: copy.description,
    path: lang === "he" ? HE : EN,
    locale: lang === "he" ? "he_IL" : "en_US",
    languages: { he: HE, en: EN, "x-default": HE },
    image: {
      url: `${SITE.url}${IL_OG.path}`,
      width: IL_OG.width,
      height: IL_OG.height,
      alt: lang === "he" ? "הבחירות לכנסת ה-26, 27 באוקטובר 2026" : "Election to the 26th Knesset, 27 October 2026",
    },
  });
}

function faq(lang: Lang) {
  if (lang === "he") {
    return [
      {
        q: "מתי הבחירות לכנסת?",
        a: "יום שלישי 27 באוקטובר 2026, 16 בחשוון תשפ״ז, כפי שקבעה ועדת הבחירות המרכזית.",
      },
      {
        q: "מתי נפתחות ונסגרות הקלפיות?",
        a: "הקלפיות נפתחות ב-07:00. רוב הקלפיות פתוחות עד 22:00; קלפיות קטנות נסגרות ב-20:00.",
      },
      {
        q: "כמה מושבים יש ומהו אחוז החסימה?",
        a: "לכנסת 120 מושבים. רשימה צריכה 3.25% מהקולות הכשרים כדי לזכות במושבים, לפי עמוד הוועדה על הבחירות בישראל.",
      },
      {
        q: "איך מצביעים?",
        a: "כל הארץ היא אזור בחירה אחד. הבוחרים מצביעים לרשימה. האתר אינו מעתיק את סדר ההצבעה בקלפי.",
      },
      {
        q: "איפה התוצאות?",
        a: "ספירת הקולות מגיעה מקובץ התוצאות של ועדת הבחירות המרכזית, בעמוד התוצאות של אתר זה אחרי 22:00. חלוקת מנדטים שהאתר מחשב מתוך ספירה חלקית היא בלתי רשמית, אינה סופית ואינה חלוקת מנדטים רשמית. עמוד התוצאות יכול להציג במדור נפרד מספרי מנדטים שפרסמו ערוצי הטלוויזיה. הם אינם תוצאות רשמיות. מדריך זה אינו מציג אותם.",
      },
      {
        q: "מתי מתפרסמות התוצאות הרשמיות?",
        a: "המועד האחרון בחוק לפרסום התוצאות הרשמיות ברשומות הוא 4 בנובמבר 2026.",
      },
    ];
  }
  return [
    {
      q: "When is the Knesset election?",
      a: "Tuesday 27 October 2026, 16 Heshvan 5787, as set by the Central Elections Committee.",
    },
    {
      q: "When do polling stations open and close?",
      a: "Stations open at 07:00. Most stay open until 22:00; some small stations close at 20:00.",
    },
    {
      q: "How many seats are there, and what is the threshold?",
      a: "The Knesset has 120 seats. A list needs 3.25 percent of the valid votes to win seats, according to the Committee’s page on elections in Israel.",
    },
    {
      q: "How do people vote?",
      a: "The whole country is one constituency. Voters choose a list. This site does not copy the steps used inside the polling station.",
    },
    {
      q: "Where are the results?",
      a: "Vote totals come from the Central Elections Committee results file, on this site’s results page after 22:00. Any seat allocation this site calculates from those partial totals is unofficial, not final, and not an official seat allocation. The results page may also show television seat samples in a separate section marked unofficial. This guide does not.",
    },
    {
      q: "When are the official results published?",
      a: "The legal deadline for publishing the official results in the Reshumot gazette is 4 November 2026.",
    },
  ];
}

export function IlKnessetGuide({ lang }: { lang: Lang }) {
  const copy = COPY[lang];
  const path = lang === "he" ? HE : EN;
  const he = lang === "he";
  const items = faq(lang);
  const results = he ? HE_RESULTS : EN_RESULTS;
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.country, path: "/il/" },
    { name: copy.elections, path: "/il/en/elections/" },
    { name: copy.crumb, path },
  ];
  return (
    <article lang={he ? "he" : "en"} dir={he ? "rtl" : "ltr"} className="country-article" data-country="il">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: he ? "הבחירות לכנסת ה-26" : "Election to the 26th Knesset",
          startDate: "2026-10-27T07:00:00+02:00",
          endDate: "2026-10-27T22:00:00+02:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [`${SITE.url}${IL_OG.path}`],
          location: {
            "@type": "Country",
            name: he ? "ישראל" : "Israel",
            address: { "@type": "PostalAddress", addressCountry: "IL" },
          },
          organizer: {
            "@type": "Organization",
            name: he ? "ועדת הבחירות המרכזית" : "Central Elections Committee",
            url: CEC,
          },
          url: absoluteUrl(path),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: he ? "he" : "en",
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
        <Link className="text-navy underline" href={copy.otherHref} hrefLang={he ? "en" : "he"} lang={he ? "en" : "he"}>
          {copy.other}
        </Link>
      </p>
      <PageHeader eyebrow={copy.eyebrow} title={copy.h1} lede={copy.lede} />
      <ContentTrust updated="27 October 2026" pagePath={path} officeHref={CEC} officeLabel="Central Elections Committee" copy={copy.trust} />
      <EditorialPreview path={path} />
      <div className="mt-8 space-y-8">
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{he ? "יום הבחירות" : "Election day"}</h2>
          <p>
            {he
              ? "ועדת הבחירות המרכזית קבעה את יום שלישי 16 בחשוון תשפ״ז, 27 באוקטובר 2026, כיום הבחירות לכנסת ה-26."
              : "The Central Elections Committee set Tuesday 16 Heshvan 5787, 27 October 2026, as election day for the 26th Knesset."}{" "}
            <a className="text-navy underline" href={DATE} rel="noopener noreferrer">
              gov.il
            </a>
          </p>
          <p>
            {he
              ? "לכנסת 120 מושבים. לפי עמוד הוועדה על הבחירות בישראל, רשימה צריכה 3.25% מהקולות הכשרים כדי להיות מיוצגת, והרשימות שעוברות את הסף חולקות את המושבים ביחס לקולותיהן."
              : "The Knesset has 120 seats. According to the Committee’s page on elections in Israel, a list needs 3.25 percent of the votes cast to be represented, and lists that pass share the seats in proportion to their votes."}{" "}
            <a className="text-navy underline" href={ABOUT} rel="noopener noreferrer">
              {he ? "על הבחירות בישראל" : "Elections in Israel"}
            </a>
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{he ? "איך מצביעים" : "How to vote"}</h2>
          <p>
            {he
              ? "כל הארץ היא אזור בחירה אחד, והבוחרים מצביעים לרשימה. הקלפיות נפתחות ב-07:00. רוב הקלפיות פתוחות עד 22:00, וקלפיות קטנות נסגרות ב-20:00. האתר אינו מעתיק את נוהל הזיהוי בקלפי."
              : "The whole country is one constituency, and voters choose a list. Stations open at 07:00. Most stay open until 22:00, and some small stations close at 20:00. This site does not copy the identification steps used at a station."}
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{he ? "תאריכים" : "Key dates"}</h2>
          <ul className="list-disc space-y-2 ps-5 text-sm leading-6">
            <li>{he ? "27 באוקטובר 2026, 07:00: פתיחת הקלפיות." : "27 October 2026, 07:00: stations open."}</li>
            <li>{he ? "27 באוקטובר 2026, 20:00: סגירת קלפיות קטנות." : "27 October 2026, 20:00: some small stations close."}</li>
            <li>{he ? "27 באוקטובר 2026, 22:00: סגירת שאר הקלפיות. הספירה מתחילה." : "27 October 2026, 22:00: the other stations close. The count starts."}</li>
            <li>{he ? "4 בנובמבר 2026: המועד האחרון לפרסום התוצאות הרשמיות ברשומות." : "4 November 2026: the legal deadline for the official results in the Reshumot gazette."}</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-2xl font-semibold">{he ? "שאלות" : "Questions"}</h2>
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
          <Link className="text-navy underline" href={results}>
            {he ? "תוצאות הבחירות לכנסת ה-26" : "26th Knesset results"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href="/il/">
            {copy.country}
          </Link>
        </p>
      </div>
      <SourceList sources={SOURCES} heading={copy.sources} />
    </article>
  );
}
