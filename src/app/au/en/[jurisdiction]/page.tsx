import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { alphaNeighbors, jurisdictionBySlug, JURISDICTIONS } from "@/data/au/places";
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
      sources={sourcesById(item.sourceIds)}
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
