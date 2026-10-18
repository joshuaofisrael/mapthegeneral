import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import {
  GE2024_ELECTORATE,
  GE2024_INVALID_VOTES,
  GE2024_VALID_VOTES,
  GE2024_WON_SUM,
  GE2024_WINNERS,
} from "@/data/gb/places";
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
    title: "Results",
    description:
      "Published results of the UK general election of 4 July 2024. There is no count for a later UK Parliament election. This page does not call an election.",
    path: "/gb/en/results/",
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const results = sourceById("ge2024-results");
  return (
    <GbFrame
      path="/gb/en/results/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Results", path: "/gb/en/results/" },
      ]}
      eyebrow="Published count only"
      title="Results"
      lede="The 4 July 2024 figures below are copied from the UK Parliament election-results site. This page does not declare a winner of any election that has not been held."
      officeHref={results.url}
      officeLabel="UK Parliament election results"
      sources={sourcesById(["ge2024-results", "ec-schedule"])}
    >
      <section className="prose-legal">
        <h2>4 July 2024</h2>
        <p>
          The source describes a general election to the 59th Parliament of the United Kingdom with an electorate of{" "}
          {formatNumber(GE2024_ELECTORATE, "en")}, {formatNumber(GE2024_VALID_VOTES, "en")} valid votes and{" "}
          {formatNumber(GE2024_INVALID_VOTES, "en")} invalid votes. It says the party list does not include independents
          or the House of Commons Speaker. Constituencies won in the rows below sum to {GE2024_WON_SUM}.
        </p>
      </section>
      <div className="overflow-x-auto">
        <table className="fact-table">
          <thead>
            <tr>
              <th>Party</th>
              <th>Constituencies contested</th>
              <th>Votes</th>
              <th>Vote share</th>
              <th>Constituencies won</th>
            </tr>
          </thead>
          <tbody>
            {GE2024_WINNERS.map((row) => (
              <tr key={row.party}>
                <td>{row.party}</td>
                <td>{formatNumber(row.contested, "en")}</td>
                <td>{formatNumber(row.votes, "en")}</td>
                <td>{row.share}</td>
                <td>{formatNumber(row.won, "en")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GapNote
        label="Gap"
        text="Parties with no constituency won are on the source page and are not copied here. This page does not invent a figure for the seats outside the printed winner column. By-election vote counts after 4 July 2024 are not copied here."
      />
      <p className="text-sm">
        <Link className="text-navy underline" href="/gb/en/elections/general-election/">
          The next UK Parliament date in the schedule
        </Link>
      </p>
    </GbFrame>
  );
}
