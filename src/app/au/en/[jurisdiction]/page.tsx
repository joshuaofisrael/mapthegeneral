import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { alphaNeighbors, jurisdictionBySlug, JURISDICTIONS } from "@/data/au/places";
import {
  ASSEMBLY,
  COUNCIL,
  assemblyIndexPath,
  assemblyPath,
  councilIndexPath,
  councilPath,
  divisionPath,
  divisionsIn,
  stateHouseIndexPath,
} from "@/data/au/level2";
import { sourcesById } from "@/data/au/sources";
import { auHome, jurisdictionPath } from "@/countries/au";

export function generateStaticParams() {
  return JURISDICTIONS.map((item) => ({ jurisdiction: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ jurisdiction: string }> }) {
  const { jurisdiction: slug } = await params;
  const item = jurisdictionBySlug(slug);
  if (!item) return {};
  return auPageMetadata({
    title: item.officialName,
    description: `${item.officialName}: population at 31 March 2026, House electorates in the 23 July 2026 determination, and the election dates that were read. Unofficial information.`,
    path: `/au/en/${slug}`,
  });
}

export default async function JurisdictionPage({ params }: { params: Promise<{ jurisdiction: string }> }) {
  const { jurisdiction: slug } = await params;
  const item = jurisdictionBySlug(slug);
  if (!item) notFound();
  const path = jurisdictionPath(slug);
  const neighbors = alphaNeighbors(slug);
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: item.officialName, path },
      ]}
      eyebrow={item.kind === "state" ? "State" : "Territory"}
      title={item.officialName}
      lede={`${item.federalDivisions} House of Representatives electorates in the Australian Electoral Commission’s determination of 23 July 2026.`}
      officeHref={item.officeHref}
      officeLabel={item.officeLabel}
      updated="18 October 2026"
      sources={sourcesById(
        [
          ...item.sourceIds,
          "aec-profiles",
          "aph-members",
          ...(slug === "victoria" ? ["vec-districts", "vec-regions", "pov-assembly", "pov-council", "acma-blackout"] : []),
        ].filter((id, index, all) => all.indexOf(id) === index),
      )}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Population</dt>
          <dd className="mt-1 font-serif text-2xl">{item.populationThousands} thousand</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            ABS National, state and territory population, March 2026. The table prints thousands, to one decimal, at 31
            March 2026.
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">House electorates</dt>
          <dd className="mt-1 font-serif text-2xl">{item.federalDivisions}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            Entitlement for the next federal election, AEC release of 23 July 2026. The 2025 tally room total for this
            column is the same number.
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>Elections read for this page</h2>
        {item.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">House of Representatives, 3 May 2025</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          Final results in the AEC tally room. The Liberal/National Coalition cell for this column is{" "}
          {item.coalition2025}. The rows below are the parties with a non-zero cell. They add to {item.federalDivisions}.
          This list does not declare a state or federal government.
        </p>
        <table className="fact-table mt-3">
          <thead>
            <tr>
              <th scope="col">Party, as printed</th>
              <th scope="col">Seats</th>
            </tr>
          </thead>
          <tbody>
            {item.house2025.map((row) => (
              <tr key={row.party}>
                <td>{row.party}</td>
                <td>{row.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {slug === "victoria" ? (
        <>
          <section>
            <h2 className="font-serif text-2xl font-semibold">Legislative Assembly districts</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              88 names on the Victorian Electoral Commission state-districts page, read on 18 October 2026. The next
              state election printed by the Commission is Saturday 28 November 2026. No poll, projection, or result call
              is published here.
            </p>
            <p className="mt-2 text-sm">
              <Link className="text-navy underline" href={assemblyIndexPath()}>
                District index
              </Link>
            </p>
            <ul className="mt-3 columns-1 gap-x-6 text-sm sm:columns-2">
              {ASSEMBLY.map((district) => (
                <li key={district.slug} className="py-0.5">
                  <Link className="text-navy underline" href={assemblyPath(district.slug)}>
                    {district.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold">Legislative Council regions</h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              8 names on the Commission’s state-regions page, read on 18 October 2026. Local government councils are a
              later page.
            </p>
            <p className="mt-2 text-sm">
              <Link className="text-navy underline" href={councilIndexPath()}>
                Region index
              </Link>
            </p>
            <ul className="mt-3 text-sm">
              {COUNCIL.map((region) => (
                <li key={region.slug} className="py-0.5">
                  <Link className="text-navy underline" href={councilPath(region.slug)}>
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}

      <section>
        <h2 className="font-serif text-2xl font-semibold">House of Representatives divisions</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {divisionsIn(slug).length} names on the Australian Electoral Commission profiles page, read on 18 October
          2026. That page says these are the electorates in place for the 2025 federal election, and that the site will
          be updated for the determined redistributions in South Australia, Tasmania and the Australian Capital
          Territory before the next federal election. The current member on each page is the Parliament of Australia
          list of 29 September 2026.
        </p>
        <p className="mt-2 text-sm">
          <Link className="text-navy underline" href={stateHouseIndexPath(slug)}>
            Division index
          </Link>
        </p>
        <ul className="mt-3 columns-1 gap-x-6 text-sm sm:columns-2">
          {divisionsIn(slug).map((division) => (
            <li key={division.slug} className="py-0.5">
              <Link className="text-navy underline" href={divisionPath(slug, division.slug)}>
                {division.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">Gaps</h2>
        {item.gaps.map((gap) => (
          <GapNote key={gap} label="Gap" text={gap} />
        ))}
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={`${auHome()}results/`}>
          National House table
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${auHome()}elections/federal-next/`}>
          Next federal election
        </Link>
        {" · "}
        <a className="text-navy underline" href={item.officeHref}>
          {item.officeLabel}
        </a>
      </p>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Previous and next names in the alphabetical index</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={jurisdictionPath(neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={jurisdictionPath(neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </AuFrame>
  );
}
