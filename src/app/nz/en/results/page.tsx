import { OddsMeter } from "@/components/OddsMeter";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { socialImageUrl } from "@/lib/social";
import manual from "@/data/nz-results-manual.json";

type Row = { party: string; votes: number; share?: string; electorates?: number; listSeats?: number; totalSeats?: number };

const RESULTS = "https://electionresults.govt.nz/";
const COMMISSION = "https://elections.nz/";
const PATH = "/nz/en/results/";
const URL = `https://mapthegeneral.com${PATH}`;
const MODIFIED = new Date().toISOString();

export const metadata = pageMetadata({
  title: "NZ election results 2026: New Zealand election results live",
  description:
    "NZ election results for the New Zealand general election, 7 November 2026. Awaiting the count from the Electoral Commission at electionresults.govt.nz. No figures yet.",
  path: PATH,
});

const FAQ: [string, string][] = [
  [
    "Who won the NZ election?",
    "Not yet. This is an unofficial page and names no winner until the Electoral Commission's results service does. No count is shown before 7:00 pm New Zealand daylight time on 7 November 2026, and official results are declared later.",
  ],
  [
    "Where can I find NZ election results live?",
    "The official source is the Electoral Commission's results service, electionresults.govt.nz. This page copies any figures from there after polls close and labels them unofficial until the Commission's figures are official.",
  ],
  [
    "What are NZ election results 2026?",
    "NZ election results 2026 are the party vote and electorate counts for the New Zealand general election held on 7 November 2026, published by the Electoral Commission. This page is unofficial and currently shows no figures.",
  ],
  [
    "Does this page show exit polls, projections, or a forecast?",
    "No. This page does not publish a poll, an exit poll, a projection, or a forecast for the New Zealand election. It shows only figures copied from the Electoral Commission's results service, each with a source and the time it was read.",
  ],
];

export default function NzResultsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "New Zealand", path: "/nz/en/" },
            { name: "NZ election results", path: PATH },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Event",
            "@id": `${URL}#event`,
            name: "New Zealand general election, 7 November 2026",
            startDate: "2026-11-07T09:00:00+13:00",
            endDate: "2026-11-07T19:00:00+13:00",
            image: socialImageUrl(PATH),
            organizer: { "@type": "Organization", name: "Electoral Commission", url: COMMISSION },
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: { "@type": "Place", name: "New Zealand", address: { "@type": "PostalAddress", addressCountry: "NZ" } },
            description:
              "General election for the New Zealand House of Representatives on 7 November 2026, administered by the Electoral Commission. Map the General shows figures only after voting places close, only from the Commission's results service, and does not call a winner.",
            url: URL,
          },
          {
            "@context": "https://schema.org",
            "@type": "LiveBlogPosting",
            headline: "New Zealand election results live, 7 November 2026",
            url: URL,
            mainEntityOfPage: URL,
            datePublished: "2026-10-28T12:00:00Z",
            dateModified: MODIFIED,
            coverageStartTime: "2026-11-07T06:00:00Z",
            coverageEndTime: "2026-11-08T12:00:00Z",
            image: socialImageUrl(PATH),
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
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/nz/en/", label: "New Zealand" }, { label: "NZ election results" }]} />
      <PageHeader
        eyebrow="Live results · New Zealand"
        title="NZ election results live: New Zealand election results, 7 November 2026"
        lede="Awaiting results. This page shows no figures yet. The official source is the Electoral Commission's results service, electionresults.govt.nz."
      />
      <OddsMeter slug="next-prime-minister-of-new-zealand-174" title="next New Zealand prime minister" hideFrom="2026-11-06T10:30:00Z" hideUntil="2026-11-07T06:05:00Z" pausedNote="Odds paused: New Zealand election-day rules. Market odds return after polls close at 7pm NZDT." />
      <div className="prose-legal">
        <p>
          <strong>Unofficial page. Awaiting results.</strong> No vote count, seat number, poll or forecast is shown here.
          No count will be shown before 7:00 pm New Zealand daylight time on 7 November 2026, and none until the
          Electoral Commission has confirmed that voting places have closed.
        </p>
        <p>
          The official source for NZ election results is the Electoral Commission’s results site,{" "}
          <a href={RESULTS} rel="noopener">electionresults.govt.nz</a>. Any figures added to this page later will be
          labelled unofficial, with the source and the time they were read. Map the General is not an official website
          and is not affiliated with the Electoral Commission.
        </p>
        <p>
          For dates and how to vote NZ, see the <Link href="/nz/en/elections/general-election/">general election guide</Link>.
        </p>
        {(manual.rows as Row[]).length > 0 && (
          <section>
            <h2>Party vote, {manual.stage || "preliminary"} count (unofficial copy)</h2>
            <p>
              Read from <a href={manual.sourceUrl} rel="noopener">electionresults.govt.nz</a> at {manual.readAt} New Zealand
              time{manual.votingPlacesCounted ? `, with ${manual.votingPlacesCounted} of voting places counted` : ""}. Preliminary
              figures exclude special votes and will change. Seat columns are the Commission’s own numbers; this site does
              not calculate seats.
            </p>
            <table>
              <thead>
                <tr><th scope="col">Party</th><th scope="col">Party votes</th><th scope="col">Share</th><th scope="col">Electorate seats</th><th scope="col">List seats</th><th scope="col">Total seats</th></tr>
              </thead>
              <tbody>
                {(manual.rows as Row[]).map((r) => (
                  <tr key={r.party}><td>{r.party}</td><td>{r.votes.toLocaleString("en-NZ")}</td><td>{r.share ?? ""}</td><td>{r.electorates ?? ""}</td><td>{r.listSeats ?? ""}</td><td>{r.totalSeats ?? ""}</td></tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
        <p>
          How the count works: <Link href="/nz/en/results-night/">how results night works</Link>. Candidates by seat:{" "}
          <Link href="/nz/en/electorates/">electorates</Link>. Parties: <Link href="/nz/en/parties/">party vote</Link>.
        </p>
      </div>

      <section className="mt-8 rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">NZ election results live: frequently asked questions</h2>
        <dl className="mt-3 space-y-3">
          {FAQ.map(([q, a]) => (
            <div key={q}>
              <dt className="font-semibold">{q}</dt>
              <dd className="mt-1">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
