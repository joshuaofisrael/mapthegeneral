import { OddsMeter } from "@/components/OddsMeter";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { socialImageUrl } from "@/lib/social";
import manual from "@/data/nz-results-manual.json";
import { NzLiveUpdates } from "@/components/NzLiveUpdates";

type Row = { party: string; votes: number; share?: string; electorates?: number; listSeats?: number; totalSeats?: number };

const RESULTS = "https://electionresults.govt.nz/";
const COMMISSION = "https://elections.nz/";
const PATH = "/nz/en/results/";
const URL = `https://mapthegeneral.com${PATH}`;
const MODIFIED = new Date().toISOString();

export const metadata = pageMetadata({
  title: "NZ election results 2026: New Zealand election results live",
  description:
    "NZ election results live for the 7 November 2026 general election: preliminary party vote as counting goes on, with sources. Unofficial; no winner called.",
  path: PATH,
});

const FAQ: [string, string][] = [
  [
    "Who won the NZ election?",
    "Counting is under way. This unofficial page shows preliminary party vote figures as they are reported and does not call a winner. Preliminary results exclude special votes; the Electoral Commission declares official results later (expected 27 November).",
  ],
  [
    "Where can I find NZ election results live?",
    "The official source is the Electoral Commission's results service, electionresults.govt.nz. This page copies preliminary figures from a named source (currently RNZ's results page, which carries Electoral Commission data), with the time they were read, and labels them unofficial.",
  ],
  [
    "What are NZ election results 2026?",
    "NZ election results 2026 are the party vote and electorate counts for the New Zealand general election held on 7 November 2026, published by the Electoral Commission. This page is unofficial and shows preliminary figures with their source.",
  ],
  [
    "Does this page show exit polls, projections, or a forecast?",
    "No. This page does not publish a poll, an exit poll, a projection, or a forecast for the New Zealand election. It shows only counted results from the Electoral Commission, as published by the Commission or a named outlet carrying its data, each with a source and the time it was read.",
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
        lede="Preliminary results are coming in. This unofficial page shows the party vote as counted so far, with its source and the time it was read. Figures will change and no winner is called."
      />
      <OddsMeter slug="next-prime-minister-of-new-zealand-174" title="next New Zealand prime minister" hideFrom="2026-11-06T10:30:00Z" hideUntil="2026-11-07T06:05:00Z" pausedNote="Odds paused: New Zealand election-day rules. Market odds return after polls close at 7pm NZDT." />
      <div className="prose-legal">
        <p>
          <strong>Unofficial page. Preliminary count.</strong> Voting closed at 7:00 pm New Zealand daylight time on
          7 November 2026. Figures below are preliminary, exclude special votes, and will change. No poll or forecast is
          shown here.
        </p>
        <p>
          The official source for NZ election results is the Electoral Commission’s results site,{" "}
          <a href={RESULTS} rel="noopener">electionresults.govt.nz</a>. Figures on this page are
          labelled unofficial, with the source and the time they were read. Map the General is not an official website
          and is not affiliated with the Electoral Commission.
        </p>
        <p>
          For dates and how to vote NZ, see the <Link href="/nz/en/elections/general-election/">general election guide</Link>.
        </p>
        <NzLiveUpdates />
        {(manual.rows as Row[]).length > 0 && (
          <section>
            <h2>Party vote, {manual.stage || "preliminary"} count (unofficial copy)</h2>
            <p>
              Read from <a href={manual.sourceUrl} rel="noopener">{manual.sourceLabel || "electionresults.govt.nz"}</a> at {manual.readAt} New Zealand
              time{manual.votingPlacesCounted ? `, with ${manual.votingPlacesCounted} of voting places reported (not ${manual.votingPlacesCounted} of votes)` : ""}. Preliminary
              figures exclude special votes and will change. Seat columns are the source’s own numbers (Electoral Commission
              data as published by the source); electorate seats are current leads, not confirmed wins. This site does not
              calculate seats.
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
