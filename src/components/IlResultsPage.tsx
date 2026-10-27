import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { IlExitPolls } from "@/components/IlExitPolls";
import { IlLiveResults } from "@/components/IlLiveResults";
import { Hemicycle, colorMap, type IlDoc, type IlRow } from "@/components/IlShared";
import { absoluteUrl, SITE } from "@/data/site";
import {
  IL_COPY,
  IL_FAQ,
  IL_HOW,
  IL_LIVE_DATA_URL,
  IL_META,
  IL_PATHS,
  IL_SEAT_LABEL,
  IL_SOURCES,
  IL_TIMELINE,
  IL_TRACKER_OPENS_AT,
  type IlLang,
} from "@/data/il-results";
import { breadcrumbJsonLd } from "@/lib/metadata";

export const IL_OG = { path: "/og/il-results-2026.png", width: 1200, height: 630 };

/** Snapshot written at build time by scripts/il-live/snapshot.mjs (empty before polls close). */
function snapshot(): IlDoc | null {
  const file = path.join(process.cwd(), "public", "live", "il-2026-knesset.json");
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, "utf8")) as IlDoc;
  } catch {
    return null;
  }
}

function modified(doc: IlDoc | null): string {
  return doc?.fetchedAt ?? new Date().toISOString();
}

export function ilResultsMetadata(lang: IlLang): Metadata {
  const c = IL_COPY[lang];
  const url = absoluteUrl(IL_PATHS[lang]);
  const image = {
    url: `${SITE.url}${IL_OG.path}`,
    width: IL_OG.width,
    height: IL_OG.height,
    alt: IL_SEAT_LABEL[lang],
  };
  return {
    title: { absolute: `${c.title} | ${SITE.name}` },
    description: c.description,
    keywords:
      lang === "he"
        ? ["תוצאות הבחירות 2026", "תוצאות הבחירות בזמן אמת", "מנדטים", "כנסת ה-26", "אחוז החסימה", "אחוז הצבעה", "ועדת הבחירות המרכזית"]
        : ["Israel election results 2026", "Israel election live results", "Knesset seats", "26th Knesset", "electoral threshold", "turnout"],
    alternates: {
      canonical: url,
      languages: { he: absoluteUrl(IL_PATHS.he), en: absoluteUrl(IL_PATHS.en), "x-default": absoluteUrl(IL_PATHS.he) },
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    openGraph: {
      title: c.title,
      description: c.description,
      url,
      siteName: SITE.name,
      type: "article",
      locale: lang === "he" ? "he_IL" : "en_US",
      alternateLocale: lang === "he" ? ["en_US"] : ["he_IL"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [image.url] },
  };
}

const L = {
  he: {
    live: "תוצאות חיות",
    how: "איך עובדות הבחירות בישראל",
    timeline: "לוח הזמנים של ליל הבחירות",
    past: "תוצאות הבחירות הקודמות (כנסת ה-25, 2022)",
    pastNote: "התוצאות הרשמיות של ועדת הבחירות המרכזית מנובמבר 2022. אחוז הצבעה",
    lists: "37 הרשימות המתמודדות",
    listsNote: "לפי ועדת הבחירות המרכזית. שתי רשימות נוספות (כחול לבן, תנועת אחי) פרשו, וקולות עבורן ייפסלו.",
    agreements: "הסכמי עודפים",
    faq: "שאלות נפוצות",
    sources: "מקורות",
    feed: "קובץ הנתונים (JSON)",
    related: "עוד באתר",
    method: `שיטה: הנתונים נמשכים מקובץ התוצאות של ועדת הבחירות המרכזית כל דקה. ${IL_SEAT_LABEL.he} אין כאן סקרים, מדגמים או תחזיות.`,
    other: "English version",
    seats: "מנדטים",
    votes: "קולות",
    party: "רשימה",
  },
  en: {
    live: "Live results",
    how: "How Israeli elections work",
    timeline: "Election night timeline",
    past: "Previous election results (25th Knesset, 2022)",
    pastNote: "Official Central Elections Committee results from November 2022. Turnout",
    lists: "The 37 competing lists",
    listsNote: "As published by the Central Elections Committee. Two further lists (Blue and White, Ahi Movement) withdrew; votes for them are invalid.",
    agreements: "Surplus-vote agreements",
    faq: "Frequently asked questions",
    sources: "Sources",
    feed: "Data file (JSON)",
    related: "More on Map the General",
    method: `Method: the data is read from the Central Elections Committee results file every minute. ${IL_SEAT_LABEL.en} No polls or forecasts.`,
    other: "גרסה בעברית",
    seats: "Seats",
    votes: "Votes",
    party: "List",
  },
} as const;

const RELATED: { href: string; he: string; en: string }[] = [
  { href: "/il/he/elections/knesset-2026/", he: "מדריך הבחירות לכנסת ה-26", en: "Knesset 2026 guide (Hebrew)" },
  { href: "/il/en/elections/knesset-2026/", he: "מדריך הבחירות לכנסת 2026 (אנגלית)", en: "Knesset 2026 election guide" },
  { href: "/il/en/faq/", he: "שאלות נפוצות על הבחירות בישראל", en: "Israel elections FAQ" },
  { href: "/il/en/sources/", he: "מקורות רשמיים", en: "Official sources for Israel" },
  { href: "/br/en/elections/", he: "ברזיל – הבחירות הכלליות 2026", en: "Brazil 2026 general election" },
  { href: "/rs/en/elections/national-assembly-2026/", he: "סרביה – הבחירות לפרלמנט 2026", en: "Serbia National Assembly election 2026" },
  { href: "/es/en/", he: "ספרד – הבחירות הכלליות", en: "Spain general election" },
  { href: "/au/", he: "אוסטרליה – הבחירות בוויקטוריה", en: "Australia: Victorian state election" },
  { href: "/", he: "כל הבחירות בעולם", en: "All elections worldwide" },
];

export function IlResultsPage({ lang }: { lang: IlLang }) {
  const c = IL_COPY[lang];
  const l = L[lang];
  const doc = snapshot();
  const other: IlLang = lang === "he" ? "en" : "he";
  const url = absoluteUrl(IL_PATHS[lang]);
  const liveFeedHref = IL_LIVE_DATA_URL.startsWith("/") ? `${SITE.url}${IL_LIVE_DATA_URL}` : IL_LIVE_DATA_URL;
  const crumbs = [
    { name: c.breadcrumbs[0], path: "/" },
    { name: c.breadcrumbs[1], path: "/il/" },
    { name: c.breadcrumbs[2], path: IL_PATHS[lang] },
  ];
  const faq = IL_FAQ[lang];
  const past = IL_META.past2022;
  const pastRows: IlRow[] = past.parties.map((p) => ({
    ...p,
    pct: +((100 * p.votes) / past.valid).toFixed(2),
    aboveThreshold: p.seats > 0,
  }));
  const pastColors = colorMap(pastRows);
  const lists = Object.entries(IL_META.parties).filter(([, p]) => !("notRunning" in p && p.notRunning));
  const name = (letter: string) => {
    const p = (IL_META.parties as Record<string, { he: string; en: string }>)[letter];
    return p ? p[lang] : letter;
  };
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LiveBlogPosting",
      headline: c.title,
      description: c.description,
      inLanguage: lang,
      url,
      mainEntityOfPage: url,
      image: [`${SITE.url}${IL_OG.path}`],
      datePublished: "2026-10-26T12:00:00+00:00",
      dateModified: modified(doc),
      coverageStartTime: IL_TRACKER_OPENS_AT,
      coverageEndTime: "2026-11-04T23:59:00+02:00",
      about: {
        "@type": "Event",
        name: lang === "he" ? "הבחירות לכנסת ה-26" : "Election to the 26th Knesset",
        startDate: "2026-10-27T07:00:00+02:00",
        endDate: "2026-10-27T22:00:00+02:00",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: [`${SITE.url}${IL_OG.path}`],
        location: { "@type": "Country", name: lang === "he" ? "ישראל" : "Israel" },
        organizer: {
          "@type": "Organization",
          name: lang === "he" ? "ועדת הבחירות המרכזית" : "Central Elections Committee",
          url: "https://www.bechirot.gov.il/",
        },
      },
      author: { "@type": "Organization", name: SITE.name, url: SITE.url },
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.url, logo: { "@type": "ImageObject", url: `${SITE.url}/og.png` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: lang === "he" ? "תוצאות הבחירות לכנסת ה-26 לפי ועדת הבחירות המרכזית" : "26th Knesset election results from the Central Elections Committee",
      description: l.method,
      url,
      inLanguage: lang,
      dateModified: modified(doc),
      isBasedOn: "https://cdn-votes26.bechirot.gov.il/",
      creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
      distribution: [{ "@type": "DataDownload", encodingFormat: "application/json", contentUrl: liveFeedHref }],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: lang,
      mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
    breadcrumbJsonLd(crumbs),
  ];

  return (
    <article lang={lang} dir={lang === "he" ? "rtl" : "ltr"} className="mx-auto max-w-site px-4 py-6">
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Breadcrumbs items={crumbs.map((item, i) => ({ label: item.name, href: i < crumbs.length - 1 ? item.path : undefined }))} />
      <header className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-navy">{c.kicker}</p>
          <Link href={IL_PATHS[other]} hrefLang={other} lang={other} className="rounded-full border border-line px-3 py-1 text-sm text-navy hover:bg-navy-wash">
            {l.other}
          </Link>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">{c.h1}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-ink-muted">{c.intro}</p>
      </header>

      <section aria-labelledby="live" className="mb-10">
        <h2 id="live" className="mb-3 text-2xl font-bold text-ink">{l.live}</h2>
        <p className="mb-3 text-sm font-semibold text-ink" data-il-seat-label>{IL_SEAT_LABEL[lang]}</p>
        <IlLiveResults lang={lang} initial={doc} />
        <p className="mt-3 text-xs text-ink-soft">
          {l.method}{" "}
          <a className="underline" href={liveFeedHref} rel="noopener noreferrer">
            {l.feed}
          </a>
        </p>
      </section>

      <IlExitPolls lang={lang} />

      <section aria-labelledby="timeline" className="mb-10">
        <h2 id="timeline" className="mb-3 text-2xl font-bold text-ink">{l.timeline}</h2>
        <ol className="relative space-y-4 border-s-2 border-navy-soft ps-5">
          {IL_TIMELINE[lang].map(([when, what]) => (
            <li key={when} className="relative">
              <span className="absolute -start-[1.72rem] top-1.5 h-3 w-3 rounded-full bg-navy" aria-hidden="true" />
              <p className="font-bold text-ink">{when}</p>
              <p className="text-ink-muted">{what}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="how" className="mb-10">
        <h2 id="how" className="mb-3 text-2xl font-bold text-ink">{l.how}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {IL_HOW[lang].map(([h, p]) => (
            <div key={h} className="rounded-xl border border-line bg-paper-card p-4">
              <h3 className="font-bold text-ink">{h}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-muted">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="lists" className="mb-10">
        <h2 id="lists" className="mb-1 text-2xl font-bold text-ink">{l.lists}</h2>
        <p className="mb-3 text-sm text-ink-muted">{l.listsNote}</p>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map(([letter, p]) => (
            <li key={letter} className="flex items-center gap-3 rounded-lg border border-line bg-paper-card px-3 py-2 text-sm">
              <span className="min-w-[3rem] rounded bg-navy-wash px-2 py-1 text-center font-bold text-navy-deep" lang="he">{letter}</span>
              <span>{p[lang]}</span>
            </li>
          ))}
        </ul>
        <h3 className="mt-5 font-bold text-ink">{l.agreements}</h3>
        <ul className="mt-1 list-disc ps-5 text-sm text-ink-muted">
          {IL_META.agreements.map(([a, b]) => (
            <li key={a}>
              {name(a)} ({a}) – {name(b)} ({b})
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="past" className="mb-10">
        <h2 id="past" className="mb-1 text-2xl font-bold text-ink">{l.past}</h2>
        <p className="mb-3 text-sm text-ink-muted">
          {l.pastNote}: {past.turnout}% ·{" "}
          <a className="underline" href={past.source.url} rel="noopener noreferrer">
            {past.source[lang]}
          </a>
        </p>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-xl border border-line bg-paper-card p-4">
            <Hemicycle lang={lang} rows={pastRows.filter((p) => p.seats > 0)} colors={pastColors} />
          </div>
          <table className="w-full self-start rounded-xl border border-line bg-paper-card text-sm">
            <thead className="bg-paper-tint text-ink-muted">
              <tr>
                <th className="p-2 text-start">{l.party}</th>
                <th className="p-2 text-end">{l.votes}</th>
                <th className="p-2 text-end">%</th>
                <th className="p-2 text-end">{l.seats}</th>
              </tr>
            </thead>
            <tbody>
              {pastRows.map((p) => (
                <tr key={p.letter} className="border-t border-line">
                  <td className="p-2">
                    <span className="me-2 inline-block h-3 w-3 rounded-full align-middle" style={{ background: pastColors[p.letter] }} />
                    {lang === "he" ? p.he : p.en}
                  </td>
                  <td className="p-2 text-end tabular-nums">{p.votes.toLocaleString(lang === "he" ? "he-IL" : "en-GB")}</td>
                  <td className="p-2 text-end tabular-nums">{p.pct.toFixed(2)}</td>
                  <td className="p-2 text-end font-bold tabular-nums">{p.seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="faq" className="mb-10">
        <h2 id="faq" className="mb-3 text-2xl font-bold text-ink">{l.faq}</h2>
        <div className="space-y-2">
          {faq.map(([q, a]) => (
            <details key={q} className="rounded-xl border border-line bg-paper-card p-4">
              <summary className="cursor-pointer font-semibold text-ink">{q}</summary>
              <p className="mt-2 leading-7 text-ink-muted">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="sources" className="mb-10">
        <h2 id="sources" className="mb-3 text-2xl font-bold text-ink">{l.sources}</h2>
        <ul className="list-disc space-y-1 ps-5 text-sm">
          {IL_SOURCES.map((s) => (
            <li key={s.url + s.en}>
              <a className="text-navy underline" href={s.url} rel="noopener noreferrer">
                {s[lang]}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <nav aria-labelledby="related" className="mb-6">
        <h2 id="related" className="mb-3 text-xl font-bold text-ink">{l.related}</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {RELATED.map((r) => (
            <li key={r.href}>
              <Link href={r.href} className="block rounded-lg border border-line bg-paper-card px-3 py-2 text-sm text-navy hover:bg-navy-wash">
                {r[lang]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
