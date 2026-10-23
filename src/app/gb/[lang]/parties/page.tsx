import { GapNote } from "@/components/GapNote";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { COMMONS_PARTIES, COMMONS_SEAT_SUM, GE2024_WINNERS } from "@/data/gb/places";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";
import { formatNumber } from "@/lib/format";

export function generateStaticParams() {
  return [{ lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  return gbMetadata({
    title: "United Kingdom parties",
    description:
      "Parties with constituencies won on 4 July 2024, and current House of Commons party names from the UK Parliament Members API. Unofficial information.",
    path: "/gb/en/parties/",
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const api = sourceById("members-api");
  return (
    <GbFrame
      path="/gb/en/parties/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Parties", path: "/gb/en/parties/" },
      ]}
      title="Parties"
      lede="Two lists, from two dates. Neither list is a slate of candidates for a future election."
      officeHref={api.url}
      officeLabel="UK Parliament Members API"
      sources={sourcesById(["ge2024-results", "members-api"])}
    >
      <section>
        <h2 className="font-serif text-2xl font-semibold">4 July 2024, constituencies won</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Names as printed on the UK Parliament election-results page. The page says this list does not include
          independents or the Speaker.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th>Party</th>
                <th>Constituencies won</th>
              </tr>
            </thead>
            <tbody>
              {GE2024_WINNERS.map((row) => (
                <tr key={row.party}>
                  <td>{row.party}</td>
                  <td>{formatNumber(row.won, "en")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">Current House of Commons</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Counted on 17 October 2026 from latestParty.name. The API totalResults figure was {COMMONS_SEAT_SUM}. Labour
          and Labour (Co-op) are not added together.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th>latestParty.name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {COMMONS_PARTIES.map((row) => (
                <tr key={row.party}>
                  <td>{row.party}</td>
                  <td>{formatNumber(row.seats, "en")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <GapNote
        label="Gap"
        text="The Electoral Commission register of political parties is not reprinted here. This page does not say which parties will nominate candidates at a future election."
      />
    </GbFrame>
  );
}
