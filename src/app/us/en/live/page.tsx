import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { LiveResults, type LiveSource } from "@/components/us/LiveResults";
import { EDITORIAL_BYLINE } from "@/data/editorial/model";
import sources from "@/data/us/live-sources.json";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const PATH = "/us/en/live/";

export const metadata = pageMetadata({
  title: "US midterm election results live, 3 November 2026",
  description:
    "Live US midterm results for 3 November 2026, read from state election-office files after polls close. No winner is shown unless the official file marks one.",
  path: PATH,
});

const rows = sources as LiveSource[];

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
            url: `https://mapthegeneral.com${PATH}`,
          },
        ]}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "US midterm results live" }]} />
      <PageHeader
        eyebrow="Live results · United States"
        title="US midterm election results, 3 November 2026"
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

      <LiveResults sources={rows} />

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
