import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { SpainFrame } from "@/components/SpainFrame";
import {
  isOnlyMunicipalityWithCapitalPopulation,
  municipalityBySlug,
  municipalityNeighbors,
  pageMunicipalities,
} from "@/data/spain/municipalities";
import { communityBySlug, provinceBySlug } from "@/data/spain/places";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { communityPath, municipalityPath, provincePath, spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return ["es", "en"].flatMap((lang) =>
    pageMunicipalities().map((municipality) => ({
      lang,
      community: municipality.communitySlug,
      province: municipality.provinceSlug,
      municipality: municipality.slug,
    })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; community: string; province: string; municipality: string }>;
}) {
  const { lang: raw, community: communitySlug, province: provinceSlug, municipality: municipalitySlug } = await params;
  const lang = asLang(raw);
  const municipality = municipalityBySlug(provinceSlug, municipalitySlug);
  if (!municipality || municipality.communitySlug !== communitySlug) return {};
  const path = municipalityPath(lang, communitySlug, provinceSlug, municipalitySlug);
  const population = formatNumber(municipality.population, lang);
  return pageMetadata({
    title: municipality.name,
    description:
      lang === "es"
        ? `${municipality.name} (${municipality.code}): Total ${population} en la tabla 29005 del INE, periodo 2025. Información no oficial.`
        : `${municipality.name} (${municipality.code}): Total ${population} in INE table 29005, period 2025. Unofficial information.`,
    path,
    lang,
    alternatePath: municipalityPath(lang === "es" ? "en" : "es", communitySlug, provinceSlug, municipalitySlug),
  });
}

export default async function MunicipalityPage({
  params,
}: {
  params: Promise<{ lang: string; community: string; province: string; municipality: string }>;
}) {
  const { lang: raw, community: communitySlug, province: provinceSlug, municipality: municipalitySlug } = await params;
  const lang = asLang(raw);
  const municipality = municipalityBySlug(provinceSlug, municipalitySlug);
  const province = provinceBySlug(provinceSlug);
  const community = communityBySlug(communitySlug);
  if (!municipality || !province || !community || municipality.communitySlug !== communitySlug || province.communitySlug !== communitySlug) {
    notFound();
  }
  const copy = ui(lang);
  const es = lang === "es";
  const path = municipalityPath(lang, communitySlug, provinceSlug, municipalitySlug);
  const jec = sourceById("jec-home");
  const neighbors = municipalityNeighbors(municipality);
  const population = formatNumber(municipality.population, lang);
  const sameName =
    province.capital === municipality.name && province.capitalPopulation === municipality.population;
  const uniqueCapitalFigure =
    !sameName &&
    municipality.population === province.capitalPopulation &&
    isOnlyMunicipalityWithCapitalPopulation(municipality.code);

  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: community.officialName, path: communityPath(lang, community.slug) },
        { name: province.decreeName, path: provincePath(lang, community.slug, province.slug) },
        { name: municipality.name, path },
      ]}
      eyebrow={copy.municipality}
      title={municipality.name}
      lede={province.decreeName}
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["ine-29005", "rd-1117-2025", "rd-207-2023", "loreg-boe"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{population}</dd>
          <dd className="mt-1 text-sm text-ink-muted">{es ? "Tabla 29005, periodo 2025." : "Table 29005, period 2025."}</dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.ineMunicipalityCode}</dt>
          <dd className="mt-1 font-serif text-2xl">{municipality.code}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {copy.ineCode}: {province.ineCode}
          </dd>
        </div>
      </dl>

      <p className="text-sm leading-6">{copy.populationSeries}</p>
      <p className="text-sm leading-6">
        {es
          ? `El nombre de arriba es el que la tabla imprime después del código. Provincia: ${province.decreeName}. Comunidad: ${community.officialName}.`
          : `The name above is the one the table prints after the code. Province: ${province.decreeName}. Community: ${community.officialName}.`}
      </p>

      {sameName && (
        <p className="text-sm leading-6">
          {es
            ? `El anexo del Real Decreto 1117/2025 usa este mismo nombre como capital de provincia y la misma cifra, ${population}.`
            : `The annex of Royal Decree 1117/2025 uses this same name for the provincial capital and the same figure, ${population}.`}
        </p>
      )}
      {!sameName && uniqueCapitalFigure && (
        <p className="text-sm leading-6">
          {es
            ? `El anexo nombra la capital «${province.capital}» con ${formatNumber(province.capitalPopulation, lang)}. La tabla 29005 imprime esa misma cifra en este municipio, con el nombre «${municipality.name}». Las dos cadenas no son iguales.`
            : `The annex names the capital “${province.capital}” with ${formatNumber(province.capitalPopulation, lang)}. Table 29005 prints that same figure for this municipality, under the name “${municipality.name}”. The two strings are not the same.`}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{es ? "Elecciones municipales" : "Municipal elections"}</h2>
        <p className="text-sm leading-6">{copy.localElection}</p>
        <GapNote label={copy.gap} text={copy.mayorGap} />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.parent}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link className="text-navy underline" href={provincePath(lang, community.slug, province.slug)}>
              {province.decreeName}
            </Link>
          </li>
          <li>
            <Link className="text-navy underline" href={communityPath(lang, community.slug)}>
              {community.officialName}
            </Link>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link
                className="text-navy underline"
                href={municipalityPath(lang, community.slug, province.slug, neighbors.prev.slug)}
              >
                {neighbors.prev.name}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link
                className="text-navy underline"
                href={municipalityPath(lang, community.slug, province.slug, neighbors.next.slug)}
              >
                {neighbors.next.name}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </SpainFrame>
  );
}
