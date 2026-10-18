import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { formatNumber } from "@/data/ca/format";
import { asCaLang } from "@/data/ca/lang";
import { districtName, districtsIn, divisionName, divisionsIn } from "@/data/ca/level2";
import { canadaHome, districtPath, divisionPath, regionPath } from "@/data/ca/paths";
import { REGIONS, regionBySlug, regionName, regionNeighbors } from "@/data/ca/places";
import { regionNotes } from "@/data/ca/region-notes";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import type { Affiliation } from "@/data/ca/types";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return ["en", "fr"].flatMap((lang) => REGIONS.map((region) => ({ lang, region: region.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; region: string }>;
}) {
  const { lang: raw, region: slug } = await params;
  const lang = asCaLang(raw);
  const region = regionBySlug(slug);
  if (!region) return {};
  const name = regionName(region, lang);
  return caMetadata({
    title: name,
    description:
      lang === "fr"
        ? `${name} : estimation de population au 1er juillet 2026, sièges à la Chambre des communes et au Sénat. Information non officielle.`
        : `${name}: population estimate at 1 July 2026, House of Commons seats, and Senate seats. Unofficial information.`,
    path: regionPath(lang, slug),
    lang,
  });
}

function affiliationCells(row: Affiliation, fr: boolean): { label: string; value: number }[] {
  return [
    { label: fr ? "Libéral" : "Liberal", value: row.liberal },
    { label: fr ? "Conservateur" : "Conservative", value: row.conservative },
    { label: "Bloc Québécois", value: row.bloc },
    { label: fr ? "NPD" : "NDP", value: row.ndp },
    { label: fr ? "Parti vert" : "Green Party", value: row.green },
  ];
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ lang: string; region: string }>;
}) {
  const { lang: raw, region: slug } = await params;
  const lang = asCaLang(raw);
  const region = regionBySlug(slug);
  if (!region) notFound();
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = regionPath(lang, slug);
  const name = regionName(region, lang);
  const neighbors = regionNeighbors(slug, lang);
  const notes = regionNotes(slug, lang);
  const office = sourceById("ec-home");
  const showsNextGap = ["new-brunswick", "nova-scotia", "nunavut", "yukon", "ontario", "newfoundland-and-labrador"].includes(
    slug,
  );

  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name, path },
      ]}
      eyebrow={region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}
      title={name}
      lede={
        fr
          ? `Nom anglais sur la page de la Chambre : ${region.nameEn}.`
          : `French name on the House page: ${region.nameFr}.`
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(region.sourceIds)}
    >
      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(region.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {fr
              ? `1er juillet 2026. Le Quotidien imprime « ${region.dailyLabel} ». Estimation provisoire.`
              : `1 July 2026. The Daily prints “${region.dailyLabel}”. Preliminary estimate.`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.commons}</dt>
          <dd className="mt-1 font-serif text-2xl">{region.commonsSeats}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {fr ? "Liste « Sièges par province ou territoire »." : "“Seats by Province or Territory” list."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.senate}</dt>
          <dd className="mt-1 font-serif text-2xl">{region.senateSeats}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {fr ? "Répartition constitutionnelle lue sur canada.ca." : "Constitutional distribution read on canada.ca."}
          </dd>
        </div>
      </dl>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.currentStandings}</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {affiliationCells(region.current, fr)
            .filter((cell) => cell.value > 0)
            .map((cell) => (
              <li key={cell.label}>
                {cell.label} {cell.value}
              </li>
            ))}
          {region.current.vacant > 0 && <li>Vacant {region.current.vacant}</li>}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.lastResults}</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {fr
            ? "Somme des colonnes Male, Female, Another Gender et Unknown du tableau 7. La page des résultats fédéraux ne proclame pas de vainqueur."
            : "Sum of the Male, Female, Another Gender, and Unknown columns in table 7. The federal results page does not declare a winner."}
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {affiliationCells(region.results2025, fr)
            .filter((cell) => cell.value > 0)
            .map((cell) => (
              <li key={cell.label}>
                {cell.label} {cell.value}
              </li>
            ))}
        </ul>
        <p className="mt-3 text-sm">
          <Link className="text-navy underline" href={`${canadaHome(lang)}results/`}>
            {copy.results}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Élection de l’assemblée" : "Legislature election"}</h2>
        {notes.map((note) => (
          <p key={note}>{note}</p>
        ))}
        {showsNextGap && <GapNote label={copy.gap} text={copy.nextGap} />}
        <GapNote label={copy.gap} text={copy.senateGap} />
        <GapNote label={copy.gap} text={copy.municipalityGap} />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {fr ? "Circonscriptions électorales fédérales" : "Federal electoral districts"}
        </h2>
        <ul className="mt-3 columns-1 gap-8 text-sm sm:columns-2">
          {districtsIn(slug, lang).map((district) => (
            <li key={district.slug} className="mb-1 break-inside-avoid">
              <Link className="text-navy underline" href={districtPath(lang, slug, district.slug)}>
                {districtName(district, lang)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{fr ? "Divisions de recensement" : "Census divisions"}</h2>
        <ul className="mt-3 columns-1 gap-8 text-sm sm:columns-2">
          {divisionsIn(slug, lang).map((division) => (
            <li key={division.slug} className="mb-1 break-inside-avoid">
              <Link className="text-navy underline" href={divisionPath(lang, slug, division.slug)}>
                {divisionName(division, lang)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm text-ink-muted">
        {copy.parent}:{" "}
        <Link className="text-navy underline" href={canadaHome(lang)}>
          Canada
        </Link>
        . {copy.alphaNearby}:{" "}
        {neighbors.prev && (
          <Link className="text-navy underline" href={regionPath(lang, neighbors.prev.slug)}>
            {regionName(neighbors.prev, lang)}
          </Link>
        )}
        {neighbors.prev && neighbors.next ? " · " : ""}
        {neighbors.next && (
          <Link className="text-navy underline" href={regionPath(lang, neighbors.next.slug)}>
            {regionName(neighbors.next, lang)}
          </Link>
        )}
      </p>
    </CanadaFrame>
  );
}
