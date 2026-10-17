import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { nationPath } from "@/data/gb/paths";
import {
  COMMONS_PARTIES,
  COMMONS_SEAT_SUM,
  GE2024_ELECTORATE,
  GE2024_INVALID_VOTES,
  GE2024_VALID_VOTES,
  GE2024_WON_SUM,
  GE2024_WINNERS,
  NATIONS,
  UK_POPULATION_MID_2024,
} from "@/data/gb/places";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";
import { formatNumber } from "@/lib/format";
import { gbLang } from "@/app/gb/_components/lang";

export function generateStaticParams() {
  return [{ lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  return gbMetadata({
    title: "United Kingdom",
    description:
      "United Kingdom: UK Parliament general election no later than 15 August 2029, the 4 July 2024 result, and the current House of Commons. Unofficial information.",
    path: "/gb/en/",
  });
}

export default async function UnitedKingdomPage({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const commission = sourceById("ec-schedule");
  const sources = sourcesById([
    "dacop-s4",
    "ec-schedule",
    "ec-2026-dates",
    "ge2024-results",
    "members-api",
    "govuk-pm",
    "govuk-burnham",
    "govuk-starmer",
    "ons-mid-2024",
  ]);

  return (
    <GbFrame
      path="/gb/en/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/" },
        { name: "United Kingdom", path: "/gb/en/" },
      ]}
      eyebrow="UK Parliament · no later than 15 August 2029"
      title="United Kingdom"
      lede="The Electoral Commission’s schedule for April 2025 to March 2030 lists the UK Parliament at no later than 15 August 2029. No polling day has been fixed in the sources read for this page."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={sources}
    >
      <section className="prose-legal">
        <h2>Next UK Parliament election</h2>
        <p>
          Section 4 of the Dissolution and Calling of Parliament Act 2022 says: if it has not been dissolved earlier, a
          Parliament dissolves at the beginning of the day that is the fifth anniversary of the day on which it first
          met. The Electoral Commission page read on 17 October 2026, last updated 9 April 2025, lists “No later than 15
          August 2029” against “UK Parliament”.
        </p>
        <p>
          <Link href="/gb/en/elections/general-election/">Page for this election</Link>
        </p>
        <GapNote
          label="Gap"
          text="The day the current Parliament first met is not printed in section 4 or in that Electoral Commission table. This page does not supply it."
        />
      </section>

      <section className="prose-legal">
        <h2>General election of 4 July 2024</h2>
        <p>
          The UK Parliament election-results site titles the count “Results for the UK general election on 4 July 2024”
          and describes “a general election to the 59th Parliament of the United Kingdom” with an electorate of{" "}
          {formatNumber(GE2024_ELECTORATE, "en")}, {formatNumber(GE2024_VALID_VOTES, "en")} valid votes and{" "}
          {formatNumber(GE2024_INVALID_VOTES, "en")} invalid votes. The party table on that page lists constituencies
          won. The page says the list does not include candidates standing as independents or the candidate standing as
          House of Commons Speaker. The “constituencies won” figures copied below add up to {GE2024_WON_SUM}.
        </p>
        <p>
          <Link href="/gb/en/results/">Results page</Link>
          {" · "}
          <Link href="/gb/en/parties/">Parties in that table and in the current House</Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Constituencies won on 4 July 2024</h2>
        <p className="mt-2 text-sm text-ink-muted">
          Copied from the party table. Parties with zero constituencies won are on the source page and are not reprinted
          here.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th>Party</th>
                <th>Constituencies won</th>
                <th>Vote share</th>
              </tr>
            </thead>
            <tbody>
              {GE2024_WINNERS.map((row) => (
                <tr key={row.party}>
                  <td>{row.party}</td>
                  <td>{formatNumber(row.won, "en")}</td>
                  <td>{row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-legal">
        <h2>House of Commons on 17 October 2026</h2>
        <p>
          The Members API query for current members of House 1 returned totalResults {COMMONS_SEAT_SUM}. Counting
          latestParty.name in that response gives the table below. “Labour” and “Labour (Co-op)” are separate names in
          the response. This is the current House, not the 4 July 2024 column.
        </p>
        <p>
          The same response records one member whose latest party is “Speaker”: Rt Hon Sir Lindsay Hoyle MP, constituency
          Chorley, with a membership status start of 4 July 2024. It records Rt Hon Andy Burnham, constituency
          Makerfield, latest party “Labour (Co-op)”, membership status start 18 June 2026.
        </p>
      </section>
      <div className="overflow-x-auto">
        <table className="fact-table">
          <thead>
            <tr>
              <th>latestParty.name</th>
              <th>Current members</th>
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

      <section className="prose-legal">
        <h2>Prime Minister</h2>
        <p>
          The GOV.UK role page says the current role holder is The Rt Hon Andy Burnham MP, and that the Prime Minister is
          the leader of His Majesty’s Government. His people page says Andy Burnham became Prime Minister on 20 July
          2026, returned to Parliament as Member of Parliament for Makerfield in June 2026, and was elected Leader of the
          Labour Party on 16 July 2026. The people page for The Rt Hon Sir Keir Starmer KCB KC MP says he was Prime
          Minister from 5 July 2024 to 20 July 2026.
        </p>
        <GapNote
          label="Gap"
          text="Candidate lists for a future UK Parliament election are not on this page. No proclamation of a polling day was in the sources read on 17 October 2026. Constituency pages are not in this release."
        />
      </section>

      <section className="prose-legal">
        <h2>Population</h2>
        <p>
          The ONS mid-2024 bulletin, released 26 September 2025, says the UK population reached an estimated{" "}
          {formatNumber(UK_POPULATION_MID_2024, "en")} in the year to mid-2024, an increase of 755,300 (1.1%) from
          mid-2023. It says the population grew faster in England (1.2%) than in Scotland (0.7%), Wales (0.6%) or
          Northern Ireland (0.4%). The bulletin text that was read does not print a separate headcount for each country.
        </p>
      </section>

      <section className="prose-legal">
        <h2>Other elections in the same schedule</h2>
        <p>
          The same Electoral Commission table lists May 2026 for the Scottish Parliament, the Senedd, English local
          government (including London boroughs), combined-authority mayoral elections and local mayoral elections. A
          separate Electoral Commission page sets polling day for those 2026 elections on Thursday 7 May 2026. The table
          lists May 2027 for English local government, local mayoral elections, Scottish council elections, Welsh local
          government, the Northern Ireland Assembly and Northern Ireland local government. It lists May 2028 for the Mayor
          of London and the London Assembly, and for Police and Crime Commissioners in England and Wales.
        </p>
        <p>This page does not turn “May 2027” into a calendar day. The table does not print one.</p>
      </section>

      <LinkGrid
        heading="Countries of the United Kingdom"
        items={NATIONS.map((nation) => ({
          href: nationPath(nation.slug),
          title: nation.name,
          detail: "Nation page",
        }))}
      />
      <p className="text-sm">
        <Link className="text-navy underline" href="/gb/en/elections/">
          Elections
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/gb/en/faq/">
          FAQ
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/gb/en/sources/">
          Sources
        </Link>
      </p>
    </GbFrame>
  );
}
