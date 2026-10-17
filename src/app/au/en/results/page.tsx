import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { HOUSE_DETAIL, HOUSE_SUMMARY, STATE_COLUMNS } from "@/data/au/places";
import { sourceById, sourcesById } from "@/data/au/sources";
import { auHome } from "@/countries/au";

export const metadata = auPageMetadata({
  title: "Results",
  description:
    "House of Representatives final results for the federal election of 3 May 2025, copied from the AEC tally room. This page does not call a race. Unofficial information.",
  path: "/au/en/results",
});

export default function AustraliaResultsPage() {
  const path = `${auHome()}results/`;
  const tally = sourceById("aec-tally-house-2025");
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: "Results", path },
      ]}
      eyebrow="AEC tally room · final results"
      title="Results"
      lede="The House figures below are the tally room’s final results for Saturday 3 May 2025. Putting them on this page does not declare a winner, a majority, or a government."
      officeHref={tally.url}
      officeLabel="AEC Tally Room"
      sources={sourcesById(["aec-tally-house-2025", "aec-2025", "aec-entitlement-2026"])}
    >
      <section className="prose-legal">
        <p>
          The Commission’s 2025 election page says these are the official results as they were at the return of the
          writs (12 June 2025). The tally room stamps the House table “Updated: Tue, 10 Jun 2025 10:49:32 AM AEST” and
          says the results are final. Party names are printed as the tally room prints them.
        </p>
        <p>
          The first table is the party-representation summary. Those six rows add to 150. The second table is the state
          breakdown. The Liberal/National Coalition row is the tally room’s combined row. The Liberal, Liberal National
          Party of Queensland, Nationals and Country Liberal Party rows are the parts printed under it. Adding the
          combined row to those parts would count the same seats twice. The state totals row is 150.
        </p>
      </section>
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">Party</th>
            <th scope="col">Seats won</th>
            <th scope="col">Previous election</th>
          </tr>
        </thead>
        <tbody>
          {HOUSE_SUMMARY.map((row) => (
            <tr key={row.party}>
              <td>{row.party}</td>
              <td>{row.seats}</td>
              <td>{row.previous}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="overflow-x-auto">
        <table className="fact-table">
          <thead>
            <tr>
              <th scope="col">Party</th>
              {STATE_COLUMNS.map((label) => (
                <th key={label} scope="col">
                  {label}
                </th>
              ))}
              <th scope="col">National</th>
            </tr>
          </thead>
          <tbody>
            {HOUSE_DETAIL.map((row) => (
              <tr key={row.party}>
                <td>{row.party}</td>
                {row.byState.map((seats, index) => (
                  <td key={STATE_COLUMNS[index]}>{seats}</td>
                ))}
                <td>{row.national}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Total</th>
              {[46, 38, 30, 16, 10, 5, 3, 2].map((seats, index) => (
                <td key={STATE_COLUMNS[index]}>{seats}</td>
              ))}
              <td>150</td>
            </tr>
          </tbody>
        </table>
      </div>
      <GapNote
        label="Gap"
        text="There are no results for the next federal election. The Commission has not named its polling day. Senate counts from 3 May 2025 are not reprinted here. State election counts are not reprinted here, except the South Australian note on that state’s page that 11 Legislative Council candidates were declared elected on 4 May 2026."
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={`${auHome()}elections/federal-next/`}>
          Next federal election
        </Link>
      </p>
    </AuFrame>
  );
}
