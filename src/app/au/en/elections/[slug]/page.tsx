import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { FEDERAL_DIVISIONS, STATE_COLUMNS } from "@/data/au/places";
import { sourceById, sourcesById } from "@/data/au/sources";
import { auHome } from "@/countries/au";

const SLUG = "federal-next";

export function generateStaticParams() {
  return [{ slug: SLUG }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== SLUG) return {};
  return auPageMetadata({
    title: "Next federal election",
    description:
      "The Australian Electoral Commission says the next federal election is due between August 2027 and May 2028. No writ naming a polling day was read on 17 October 2026. Unofficial information.",
    path: "/au/en/elections/federal-next",
  });
}

export default async function FederalNextPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug !== SLUG) notFound();
  const path = `${auHome()}elections/${SLUG}/`;
  const aec = sourceById("aec-entitlement-2026");
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: "Elections", path: `${auHome()}elections/` },
        { name: "Next federal election", path },
      ]}
      eyebrow="No polling day named"
      title="Next federal election"
      lede="Due to be held between August 2027 and May 2028, in the words of the Australian Electoral Commission’s release of 23 July 2026. This page does not name a Saturday."
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={sourcesById(["aec-entitlement-2026", "aec-timetable", "aec-2025", "pm-about"])}
    >
      <section className="prose-legal">
        <h2>What the Commission printed</h2>
        <p>
          Electoral Commissioner Jeff Pope said the Commission is working towards the next federal election, which is
          due to be held between August 2027 and May 2028. The release is the entitlement determination: the House of
          Representatives stays at 150 seats.
        </p>
        <ul>
          {STATE_COLUMNS.map((label, index) => (
            <li key={label}>
              {label}: {FEDERAL_DIVISIONS[index]}
            </li>
          ))}
        </ul>
        <p>
          The timetable page says the AEC has no role in determining the date. Writs, it says, contain the dates for the
          close of rolls, the close of nominations, polling day and the return of the writ. No writ for this election
          was read on 17 October 2026.
        </p>
        <p>
          The timetable page says the House expires three years from its first meeting (section 28 of the Constitution)
          and may be dissolved sooner by the Governor-General, usually acting on the advice of the Prime Minister. The
          23 July 2026 release says the first sitting of the 48th Parliament was Tuesday 22 July 2025. This page does
          not calculate the last possible Saturday from those rules.
        </p>
        <h2>The election already held</h2>
        <p>
          The last federal election page on the Commission’s site is the 2025 federal election, Saturday 3 May 2025.
          Official results are those at the return of the writs on 12 June 2025.
        </p>
        <p>
          <Link className="text-navy underline" href={`${auHome()}results/`}>
            House results copied from the tally room
          </Link>
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Candidates</h2>
        <GapNote
          label="Gap"
          text="There is no candidate list because no writ was read. The Prime Minister’s site, read the same day, still names The Hon Anthony Albanese MP as Prime Minister. That is the officeholder page, not a candidacy."
        />
      </section>
    </AuFrame>
  );
}
