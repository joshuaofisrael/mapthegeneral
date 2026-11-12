import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ELECTION_WINDOWS, type Citation } from "@/data/election-law";
import { SITE, absoluteUrl } from "@/data/site";
import { HUB_ELECTIONS, formatPollingDay, hubToday, type HubElection } from "@/data/results-hub";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/election-calendar/";
/** Countries this site does not cover, kept out even if a registry row is added by mistake. */
const EXCLUDED = new Set(["gm", "ht", "ng"]);

export const metadata = pageMetadata({
  title: "Election calendar 2026 and 2027: upcoming elections worldwide",
  description:
    "Upcoming elections worldwide in date order, 2026 to 2027: polling days, the official source for each date, and links to guides and results. Unofficial.",
  path: PATH,
});

const FAQ = [
  {
    question: "Where do these election dates come from?",
    answer:
      "Each date is taken from the election authority or the legal instrument that calls the election. The sources are listed under each election. If a date here differs from the official source, the official source controls.",
  },
  {
    question: "Which countries are on the calendar?",
    answer:
      "Only the elections Map the General covers with a guide. The calendar is not a complete list of every election in the world. US elections are covered on the sibling site Map the Midterms.",
  },
  {
    question: "Can an election date change?",
    answer:
      "Yes. A by-election, an early dissolution or a court ruling can move or add a polling day. This page is rebuilt when the site is updated; check the official source before you plan around a date.",
  },
];

type Row = HubElection & { sources: Citation[]; confirmedOn?: string };

function rows(): Row[] {
  return HUB_ELECTIONS.filter((item) => !EXCLUDED.has(item.country)).map((item) => {
    const window = ELECTION_WINDOWS.find((w) => w.id === item.id);
    const sources = window?.verified?.sources?.length ? window.verified.sources : [item.official];
    return { ...item, sources, confirmedOn: window?.verified?.readOn };
  });
}

function monthLabel(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
}

function ElectionItem({ item }: { item: Row }) {
  return (
    <li className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">
        <time dateTime={item.pollingDay}>{formatPollingDay(item.pollingDay)}</time> · {item.countryName}
      </p>
      <h3 className="mt-1 font-serif text-xl font-semibold">
        <Link className="hover:text-navy" href={item.guidePath}>
          {item.countryName}: {item.name}
        </Link>
      </h3>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <Link className="text-navy underline" href={item.guidePath}>
          Election guide
        </Link>
        {item.resultsPath ? (
          <Link className="text-navy underline" href={item.resultsPath}>
            {item.searchLabel}
          </Link>
        ) : null}
        <a className="text-navy underline" href={item.official.url} rel="noopener noreferrer">
          Official results: {item.official.label}
        </a>
      </p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        Date source{item.sources.length > 1 ? "s" : ""}
        {item.confirmedOn ? `, read ${formatPollingDay(item.confirmedOn)}` : ""}
      </p>
      <ul className="mt-1 list-disc pl-5 text-sm leading-6 text-ink-muted">
        {item.sources.map((source) => (
          <li key={source.url + source.label}>
            <a className="underline" href={source.url} rel="noopener noreferrer">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function ElectionCalendarPage() {
  const asOf = hubToday();
  const all = rows();
  const upcoming = all.filter((item) => item.pollingDay >= asOf);
  const held = all.filter((item) => item.pollingDay < asOf).reverse();
  const months: { key: string; items: Row[] }[] = [];
  for (const item of upcoming) {
    const key = item.pollingDay.slice(0, 7);
    const last = months[months.length - 1];
    if (last && last.key === key) last.items.push(item);
    else months.push({ key, items: [item] });
  }
  return (
    <div className="mx-auto max-w-4xl">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Election calendar", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Election calendar: upcoming elections worldwide",
            url: absoluteUrl(PATH),
            isPartOf: { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: upcoming.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: `${item.countryName}: ${item.name}, ${item.pollingDay}`,
                url: absoluteUrl(item.guidePath),
              })),
            },
          },
          faqJsonLd(FAQ),
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Election calendar" }]} />
      <PageHeader
        eyebrow="Election calendar"
        title="Election calendar: upcoming elections worldwide"
        lede="Every upcoming election this site covers, in date order, with the official source for each polling day and links to the guide and results. Unofficial; confirm dates with the election authority."
      />

      {months.map((month) => (
        <section key={month.key} id={`m-${month.key}`} className="mt-10">
          <h2 className="font-serif text-2xl font-semibold">{monthLabel(month.key + "-01")}</h2>
          <ul className="mt-4 grid gap-4">
            {month.items.map((item) => (
              <ElectionItem key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}

      {held.length ? (
        <section id="held" className="mt-12">
          <h2 className="font-serif text-2xl font-semibold">Recently held</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Counts and official results are on the <Link className="text-navy underline" href="/results/">election results hub</Link>.
          </p>
          <ul className="mt-4 grid gap-2 text-sm">
            {held.map((item) => (
              <li key={item.id}>
                <time dateTime={item.pollingDay}>{formatPollingDay(item.pollingDay)}</time>:{" "}
                <Link className="text-navy underline" href={item.resultsPath ?? item.guidePath}>
                  {item.countryName}, {item.name}
                </Link>
              </li>
            ))}
            <li>
              United States:{" "}
              <a className="text-navy underline" href={SITE.siblingUrl}>
                US elections on {SITE.siblingName}
              </a>
            </li>
          </ul>
        </section>
      ) : null}

      <section className="mt-12 rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Election calendar: frequently asked questions</h2>
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
