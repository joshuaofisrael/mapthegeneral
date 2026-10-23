import Link from "@/components/AnchorLink";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { sourceById, sourcesById } from "@/data/au/sources";
import { auHome, jurisdictionPath } from "@/countries/au";

export const metadata = auPageMetadata({
  title: "Elections in Australia",
  description:
    "Index of elections on the Australia pages. The next federal election is due between August 2027 and May 2028. No polling day has been named. Unofficial information.",
  path: "/au/en/elections",
});

export default function AustraliaElectionsPage() {
  const path = `${auHome()}elections/`;
  const aec = sourceById("aec-entitlement-2026");
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: "Elections", path },
      ]}
      title="Elections"
      lede="This release publishes the next federal election as the Commission described it on 23 July 2026, and the state dates that an electoral commission or parliament printed. It is not a calendar of every future election."
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={sourcesById(["aec-entitlement-2026", "aec-timetable", "vec-state", "vic-parliament-2026", "nswec-2027"])}
    >
      <ul className="space-y-4">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}federal-next/`}>
            Next federal election
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            Due between August 2027 and May 2028. No polling day named in the sources read.
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}victoria-2026/`}>
            Victoria, Saturday 28 November 2026
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            Victorian Electoral Commission and Parliament of Victoria, re-read on 23 October 2026.{" "}
            <Link className="text-navy underline" href={jurisdictionPath("victoria")}>
              Victoria
            </Link>
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={jurisdictionPath("new-south-wales")}>
            New South Wales, Saturday, 13 March 2027
          </Link>
          <p className="mt-1 text-sm text-ink-muted">NSW Electoral Commission, election of the 59th Parliament.</p>
        </li>
      </ul>
      <p className="text-sm">
        <Link className="text-navy underline" href={`${auHome()}results/`}>
          Results
        </Link>
      </p>
    </AuFrame>
  );
}
