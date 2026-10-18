import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import {
  ERP_NATIONAL_PERSONS,
  FEDERAL_DIVISIONS,
  HOUSE_SUMMARY,
  JURISDICTIONS,
  STATE_COLUMNS,
  alphaJurisdictions,
} from "@/data/au/places";
import { sourceById, sourcesById } from "@/data/au/sources";
import { assemblyIndexPath, councilIndexPath, houseIndexPath } from "@/data/au/level2";
import { auHome, jurisdictionPath } from "@/countries/au";

const aec = sourceById("aec-entitlement-2026");

export const metadata = auPageMetadata({
  title: "Australia",
  description:
    "Australia: next federal election due between August 2027 and May 2028, the 3 May 2025 House results, and the states and territories. Unofficial information.",
  path: "/au/en",
});

export default function AustraliaNationalPage() {
  const path = auHome();
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path },
      ]}
      eyebrow="Federal election · due between August 2027 and May 2028"
      title="Australia"
      lede="The Australian Electoral Commission says the next federal election is due to be held between August 2027 and May 2028. No writ read on 17 October 2026 names a polling day."
      updated="18 October 2026"
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={sourcesById([
        "aec-entitlement-2026",
        "aec-2025",
        "aec-tally-house-2025",
        "aec-timetable",
        "abs-erp-2026-03",
        "abs-lga",
        "abs-non-abs",
        "pm-about",
        "vec-state",
        "auspost-postcodes",
        "aec-profiles",
        "vec-districts",
        "vec-regions",
        "acma-blackout",
      ])}
    >
      <section className="prose-legal">
        <h2>Next federal election</h2>
        <p>
          The Commission’s media release updated 23 July 2026 says the next federal election is due to be held between
          August 2027 and May 2028. The Commission’s timetable page says the AEC has no role in determining the date of
          an election. It says a full federal election is conducted approximately once every three years on a date
          determined by the Governor-General, upon request by the Government, and that this typically elects all members
          of the House of Representatives and half of the Senate.
        </p>
        <p>
          The same timetable page says the House of Representatives expires three years after its first meeting but can
          be dissolved earlier, citing section 28 of the Constitution. The 23 July 2026 release says the first sitting
          of the 48th Parliament occurred on Tuesday 22 July 2025. This page does not turn that sitting day into an
          expiry date or a polling day.
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}elections/federal-next/`}>
            Page for the next federal election
          </Link>
        </p>
        <h2>House of Representatives</h2>
        <p>
          Electoral Commissioner Jeff Pope’s determination of 23 July 2026 says the number of seats in the House of
          Representatives will remain unchanged, at 150, for the next federal election. The release prints this
          entitlement:
        </p>
      </section>
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">State or territory, as printed</th>
            <th scope="col">Electorates</th>
          </tr>
        </thead>
        <tbody>
          {STATE_COLUMNS.map((label, index) => (
            <tr key={label}>
              <td>{label}</td>
              <td>{FEDERAL_DIVISIONS[index]}</td>
            </tr>
          ))}
          <tr>
            <th scope="row">Total printed by the release</th>
            <td>150</td>
          </tr>
        </tbody>
      </table>
      <p className="text-sm text-ink-muted">
        The release marks Tasmania with a note that Tasmania is guaranteed a minimum of five members under section 24 of
        the Constitution.
      </p>

      <section className="prose-legal">
        <h2>Election of 3 May 2025</h2>
        <p>
          The Commission’s 2025 federal election page is headed Saturday 3 May 2025. It says the official results are as
          they were at the return of the writs (12 June 2025). The House tally room labels its party table as final
          results and stamps it updated Tue, 10 Jun 2025 10:49:32 AM AEST. The summary rows add to 150. Copying them
          here does not declare a government.
        </p>
      </section>
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">Party, as printed</th>
            <th scope="col">Seats won</th>
            <th scope="col">Previous election, as printed</th>
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
      <p className="text-sm">
        <Link className="text-navy underline" href={`${path}results/`}>
          Results page
        </Link>
      </p>

      <section className="prose-legal">
        <h2>Senate</h2>
        <p>
          The timetable page says senators for the states serve terms of six years, citing section 7 of the
          Constitution, staggered so that half of the 72 senators retire every three years. It says the terms of
          senators representing the ACT and the NT commence on the day of their election and expire at the close of the
          day immediately before the polling day for the next general election, and that their election is held at the
          same time as every general House election.
        </p>
        <GapNote
          label="Gap"
          text="A current list of all senators, and the Senate result of 3 May 2025, were not copied for this release. The House table above is the only count reprinted here."
        />
      </section>

      <section className="prose-legal">
        <h2>Prime Minister</h2>
        <p>
          The Prime Minister of Australia website, read on 17 October 2026, names The Hon Anthony Albanese MP as Prime
          Minister. The “About the Prime Minister” page says he was sworn in as Australia’s 31st Prime Minister on 23
          May 2022. This page does not describe the 2025 seat table as forming a government.
        </p>
        <GapNote
          label="Gap"
          text="The name of the Governor-General was not on a page read for this release. Premiers and chief ministers are not named on this page. No ministry list is reprinted."
        />
      </section>

      <section className="prose-legal">
        <h2>Population</h2>
        <p>
          The Australian Bureau of Statistics release for March 2026, released 17 September 2026, says Australia’s
          population was {ERP_NATIONAL_PERSONS.toLocaleString("en-AU")} people at 31 March 2026. The same release’s
          state table prints figures in thousands, to one decimal. Those figures are on each state and territory page.
          The table’s Australia row is marked as including Other Territories comprising Jervis Bay Territory, Christmas
          Island, the Cocos (Keeling) Islands and Norfolk Island. Those territories do not have their own pages in this
          release.
        </p>
      </section>

      <section className="prose-legal">
        <h2>Victoria, 28 November 2026</h2>
        <p>
          The Victorian Electoral Commission says the next Victorian state election is on Saturday 28 November 2026.
          The Parliament of Victoria prints the same day. Nominations, on the Parliament’s timeline, open on Wednesday
          4 November 2026.
        </p>
        <p>
          <Link className="text-navy underline" href={jurisdictionPath("victoria")}>
            Victoria
          </Link>
          {" · "}
          <Link className="text-navy underline" href={assemblyIndexPath()}>
            88 Legislative Assembly districts
          </Link>
          {" · "}
          <Link className="text-navy underline" href={councilIndexPath()}>
            8 Legislative Council regions
          </Link>
        </p>
        <p>
          The Australian Communications and Media Authority blackout page, read on 18 October 2026, says there are no
          current listings. It says the blackout applies to television and radio, from the end of the Wednesday before
          polling day until the close of the poll, and that it does not apply to online services. This page does not
          publish a poll, a projection, or a result call.
        </p>
      </section>

      <section className="prose-legal">
        <h2>House divisions</h2>
        <p>
          The Commission’s profiles page, read on 18 October 2026, lists 150 House of Representatives divisions in place
          for the 2025 federal election. Each division has its own page. The current member on those pages is taken from
          the Parliament of Australia list dated 29 September 2026.
        </p>
        <p>
          <Link className="text-navy underline" href={houseIndexPath()}>
            House of Representatives divisions
          </Link>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Candidates, local pages, and postcodes</h2>
        <GapNote
          label="Gap"
          text="No writ for the next federal election was read, so there is no federal candidate list to publish. Candidate profiles are not in this release."
        />
        <GapNote
          label="Gap"
          text="The ABS Local Government Areas page says there are 567 Local Government Areas covering the whole of Australia, including unincorporated areas, and 19 non-spatial special purpose codes. It says ABS approximations do not match official legal boundaries and should only be used for statistical purposes. Local government council pages are not in this release. No elected government between the state or territory and the local council was described on the pages read."
        />
        <GapNote
          label="Gap"
          text="A postcode search is not wired up. Australia Post’s assignment-of-postcodes policy says postcodes remain the property of Australia Post and shall not be reproduced without permission, and it forbids using the extract to provide a publicly available postcode lookup. No official open postcode-to-council file was added. A four-digit query is not matched to a place."
        />
      </section>

      <LinkGrid
        heading="States and territories"
        items={alphaJurisdictions().map((item) => ({
          href: jurisdictionPath(item.slug),
          title: item.officialName,
          detail: `${item.federalDivisions} House electorates in the 23 July 2026 determination`,
        }))}
      />
      <p className="text-sm text-ink-muted">{JURISDICTIONS.length} pages: six states and two territories.</p>
    </AuFrame>
  );
}
