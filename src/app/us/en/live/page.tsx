import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { LiveResults, type LiveSource } from "@/components/us/LiveResults";
import { EDITORIAL_BYLINE } from "@/data/editorial/model";
import sources from "@/data/us/live-sources.json";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/us/en/live/";

export const metadata = pageMetadata({
  title: "2026 midterm election results live: House, Senate and governor results tonight",
  description:
    "Midterms live results, 3 Nov 2026: House, Senate and governor results from official state files as polls close, plus poll closing times.",
  path: PATH,
});

const rows = sources as LiveSource[];
const URL = `https://mapthegeneral.com${PATH}`;
const MODIFIED = new Date().toISOString();

const FAQ: [string, string][] = [
  ["When do polls close in the 2026 midterm elections?", "The first polls close at 6 pm Eastern (23:00 London) on 3 November 2026, in parts of Indiana and Kentucky. Most states close between 7 pm and 10 pm Eastern. The last polls, in Hawaii and Alaska, close between midnight and 1 am Eastern (05:00 to 06:00 London) on 4 November. Each state sets its own hours; the table below lists them with the official source."],
  ["When will 2026 midterm results come in?", "States start posting unofficial counts shortly after their polls close. Many races are clear on election night, but close contests can take days while mail and provisional ballots are counted. Official results are certified by each state in the weeks after the election."],
  ["What is on the ballot in the 2026 midterms?", "All 435 seats in the US House of Representatives, 35 of the 100 Senate seats (33 regular elections and 2 special elections) and 36 governorships, plus many state and local offices and ballot measures (Ballotpedia)."],
  ["How many seats are needed to control the House and Senate?", "A party needs 218 of 435 seats for a House majority. In the Senate, 51 of 100 seats gives a majority; in a 50-50 split the vice president casts tie-breaking votes."],
  ["Does Map the General call races?", "No. This page copies figures from official state election-office files. A winner is labelled only when the official file marks one. News organisations' projections are not official results."],
  ["How often is this page updated?", "A scheduled job reads the official state files every 5 minutes on election night, and this page checks for new figures about once a minute."],
];

export default function Page() {
  const readable = rows.filter((s) => s.machineReadable).length;
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "US midterm results live", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `${URL}#event`,
            name: "2026 United States general election",
            startDate: "2026-11-03",
            endDate: "2026-11-04",
            image: "https://mapthegeneral.com/og.png",
            organizer: { "@type": "Organization", name: "US state and local election offices", url: "https://www.usa.gov/state-election-office" },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: "United States", address: { "@type": "PostalAddress", addressCountry: "US" } },
            description:
              "General election for federal and state offices on 3 November 2026, administered by state election offices. Map the General shows figures only after polls close, only from state election-office files, and does not call winners.",
            url: URL,
          },
          {
            "@context": "https://schema.org",
            "@type": "LiveBlogPosting",
            headline: "2026 midterm election results live",
            url: URL,
            mainEntityOfPage: URL,
            datePublished: "2026-10-31T12:00:00Z",
            dateModified: MODIFIED,
            coverageStartTime: "2026-11-03T23:00:00Z",
            coverageEndTime: "2026-11-05T12:00:00Z",
            image: "https://mapthegeneral.com/og.png",
            about: { "@id": `${URL}#event` },
            author: { "@type": "Organization", name: "Map the General", url: "https://mapthegeneral.com/" },
            publisher: { "@type": "Organization", name: "Map the General", url: "https://mapthegeneral.com/" },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
          },
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "US midterm results live" }]} />
      <PageHeader
        eyebrow="Live results · United States"
        title="2026 midterm election results live"
        lede="Unofficial figures copied from state election-office files after polls close. Map the General does not call races. A winner is labelled only when the official file marks that candidate."
      />
      <p className="text-sm text-ink-muted">{EDITORIAL_BYLINE} · Updated automatically from official state files.</p>

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">How to read this page</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Nothing is shown for a state until all its polls have closed. Polls close from 23:00 London time (6 pm Eastern) on 3 November.</li>
          <li>Vote totals and percentages are the figures in the official file. A percentage is left blank when the file has none.</li>
          <li>Results say “Unofficial” until the file itself says they are official. Certification comes weeks later.</li>
          <li>A scheduled job reads the official state files every 5 minutes; this page checks for new figures about once a minute. If a check fails, the last figures that loaded stay up, marked as possibly out of date, with a link to the official site.</li>
          <li>{readable} offices publish a results file that can be read automatically. For the rest, follow the link to the state’s official results page.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">What to watch tonight: House, Senate and governor results 2026</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>House:</strong> all 435 seats are up; 218 is a majority (<a className="text-navy underline" href="https://ballotpedia.org/Election_results,_2026:_U.S._Congress" rel="noopener noreferrer">Ballotpedia</a>).</li>
          <li><strong>Senate:</strong> 35 seats are up, 33 regular and 2 special elections; 51 is a majority (<a className="text-navy underline" href="https://ballotpedia.org/Election_results,_2026:_U.S._Senate" rel="noopener noreferrer">Ballotpedia</a>).</li>
          <li><strong>Governors:</strong> 36 states elect a governor (<a className="text-navy underline" href="https://ballotpedia.org/Gubernatorial_elections,_2026" rel="noopener noreferrer">Ballotpedia</a>).</li>
          <li><strong>Poll closing times (London):</strong> first closures at 23:00 on 3 November (6 pm Eastern); a large wave from 00:00 to 03:00; the last polls in Hawaii and Alaska close around 05:00 to 06:00 on 4 November. Exact hours by state, with each state’s official source, are in the table below.</li>
          <li><strong>Counting takes time:</strong> states count mail and provisional ballots at different speeds, so early leads can change. Only certified results are final.</li>
        </ul>
      </section>

      <LiveResults sources={rows} />

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Midterms live results: frequently asked questions</h2>
        <dl className="mt-3 space-y-3">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <dt className="font-semibold">{q}</dt>
              <dd className="mt-1">{a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">Official sources</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">State election-night results sources</caption>
            <thead className="text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th scope="col" className="py-2 pr-4">State</th>
                <th scope="col" className="py-2 pr-4">Polls close</th>
                <th scope="col" className="py-2">Official results page</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.code} className="border-t border-line align-top">
                  <th scope="row" className="py-2 pr-4 font-medium">{s.name}</th>
                  <td className="py-2 pr-4">{s.closeLabel} ({s.citation})</td>
                  <td className="py-2">
                    <a className="text-navy underline" href={s.resultsUrl} rel="noopener noreferrer">{s.resultsLabel}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          Race guides, ballot measures and how to watch on TV:{" "}
          <a className="text-navy underline" href="https://mapthemidterms.com/">Map the Midterms</a>. Map the General is unofficial and not affiliated with any election office.
        </p>
      </section>
    </div>
  );
}
