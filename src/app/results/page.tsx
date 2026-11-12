import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE, absoluteUrl } from "@/data/site";
import { STAGE_BADGE, formatPollingDay, recentElections, upcomingElections, type HubElection } from "@/data/results-hub";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/results/";

export const metadata = pageMetadata({
  title: "Election results live worldwide: latest counts and next elections",
  description:
    "Live election results worldwide from official sources: Israel and New Zealand counts, Spain on 29 November, and a calendar of the next elections. Unofficial.",
  path: PATH,
});

const FAQ = [
  {
    question: "Where can I find live election results worldwide?",
    answer:
      "This page lists every election Map the General covers, with the stage of its count and a link to its results page or guide. Each results page names the official election authority it copies, with the time the figures were read.",
  },
  {
    question: "Are these official election results?",
    answer:
      "No. Map the General is an unofficial, independent site. Figures are copied from the official election authority or a named outlet carrying its data, and labelled preliminary or official final. If this site and the official source differ, the official source controls.",
  },
  {
    question: "When is the next election?",
    answer:
      "The calendar on this page lists upcoming polling days in date order. Each date comes from the election authority or legal instrument cited on that election's guide.",
  },
  {
    question: "Where are US election results?",
    answer: `US results, including the 2026 midterms, are on the sibling site ${SITE.siblingName} at mapthemidterms.com.`,
  },
];

function ElectionCard({ item }: { item: HubElection }) {
  const href = item.resultsPath ?? item.guidePath;
  return (
    <li className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
        {STAGE_BADGE[item.stage]} · {formatPollingDay(item.pollingDay)}
      </p>
      <h3 className="mt-1 font-serif text-xl font-semibold">
        <Link className="hover:text-navy" href={href}>
          {item.countryName}: {item.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{item.stageNote}</p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        {item.resultsPath ? (
          <Link className="text-navy underline" href={item.resultsPath}>
            {item.searchLabel}
          </Link>
        ) : null}
        <Link className="text-navy underline" href={item.guidePath}>
          Election guide
        </Link>
        <a className="text-navy underline" href={item.official.url} rel="noopener noreferrer">
          Official source
        </a>
      </p>
    </li>
  );
}

export default function ResultsHubPage() {
  const recent = recentElections();
  const upcoming = upcomingElections();
  return (
    <div className="mx-auto max-w-4xl">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Election results", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Election results live worldwide",
            url: absoluteUrl(PATH),
            isPartOf: { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: [...recent, ...upcoming].map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${item.countryName}: ${item.name}, ${item.pollingDay}`,
                url: absoluteUrl(item.resultsPath ?? item.guidePath),
              })),
            },
          },
          faqJsonLd(FAQ),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Election results" }]} />
      <PageHeader
        eyebrow="Live election results worldwide"
        title="Election results live: latest counts and the next elections"
        lede="Every election this site covers, newest first, with the stage of its count, the official source, and a calendar of upcoming polling days. Unofficial; no winner is called here."
      />

      <section id="latest">
        <h2 className="font-serif text-2xl font-semibold">Latest results</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {recent.map((item) => (
            <ElectionCard key={item.id} item={item} />
          ))}
          <li className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">United States</p>
            <h3 className="mt-1 font-serif text-xl font-semibold">
              <a className="hover:text-navy" href={`${SITE.siblingUrl}/results/2026/`}>
                US midterm results: who won
              </a>
            </h3>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              US results are covered on the sibling site {SITE.siblingName}.
            </p>
          </li>
        </ul>
      </section>

      <section id="calendar" className="mt-12">
        <h2 className="font-serif text-2xl font-semibold">Next elections: calendar</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
          Polling days in date order. Each date is taken from the election authority or legal instrument cited on that
          election’s guide. The <Link className="text-navy underline" href="/election-calendar/">full election calendar</Link>{" "}
          lists the source for every date.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-4">Polling day</th>
                <th scope="col" className="py-2 pr-4">Country</th>
                <th scope="col" className="py-2 pr-4">Election</th>
                <th scope="col" className="py-2">Official results</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((item) => (
                <tr key={item.id} className="border-b border-line/60 align-top">
                  <td className="py-2 pr-4 whitespace-nowrap">
                    <time dateTime={item.pollingDay}>{formatPollingDay(item.pollingDay)}</time>
                  </td>
                  <td className="py-2 pr-4">{item.countryName}</td>
                  <td className="py-2 pr-4">
                    <Link className="text-navy underline" href={item.resultsPath ?? item.guidePath}>
                      {item.resultsPath ? item.searchLabel : item.name}
                    </Link>
                  </td>
                  <td className="py-2">
                    <a className="text-navy underline" href={item.official.url} rel="noopener noreferrer">
                      {item.official.label}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Election results: frequently asked questions</h2>
        <dl className="mt-3 space-y-3">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-1">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
