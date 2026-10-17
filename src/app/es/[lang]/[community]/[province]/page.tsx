import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { SpainFrame } from "@/components/SpainFrame";
import { emptyTotalsIn, municipalitiesIn } from "@/data/spain/municipalities";
import {
  PROVINCES,
  alphaNeighbors,
  communityBySlug,
  provinceBySlug,
  provincesIn,
} from "@/data/spain/places";
import { sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { communityPath, municipalityPath, provincePath, spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return ["es", "en"].flatMap((lang) =>
    PROVINCES.map((province) => ({
      lang,
      community: province.communitySlug,
      province: province.slug,
    })),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; community: string; province: string }>;
}) {
  const { lang: raw, community: communitySlug, province: provinceSlug } = await params;
  const lang = asLang(raw);
  const province = provinceBySlug(provinceSlug);
  if (!province || province.communitySlug !== communitySlug) return {};
  const path = provincePath(lang, communitySlug, provinceSlug);
  return pageMetadata({
    title: province.decreeName,
    description:
      lang === "es"
        ? `${province.decreeName}: población del Padrón a 1 de enero de 2025, diputados del Real Decreto 806/2026 y municipios de la tabla 29005 del INE. Información no oficial.`
        : `${province.decreeName}: municipal-register population at 1 January 2025, deputies in Royal Decree 806/2026, and municipalities from INE table 29005. Unofficial information.`,
    path,
    lang,
    alternatePath: provincePath(lang === "es" ? "en" : "es", communitySlug, provinceSlug),
  });
}

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ lang: string; community: string; province: string }>;
}) {
  const { lang: raw, community: communitySlug, province: provinceSlug } = await params;
  const lang = asLang(raw);
  const province = provinceBySlug(provinceSlug);
  const community = communityBySlug(communitySlug);
  if (!province || !community || province.communitySlug !== communitySlug) notFound();
  const copy = ui(lang);
  const es = lang === "es";
  const path = provincePath(lang, communitySlug, provinceSlug);
  const siblings = provincesIn(communitySlug).filter((item) => item.slug !== province.slug);
  const municipalities = municipalitiesIn(province.slug);
  const emptyTotals = emptyTotalsIn(province.slug);
  const neighbors = alphaNeighbors(province.slug);
  const sourceIds = ["rd-1117-2025", "ine-29005", "rd-806-2026", "loreg-jec", "rd-207-2023", "loreg-boe", "ine-2917", "jec-candidaturas"];
  if (province.cylProcuradores) sourceIds.push("boe-cyl-2026");
  if (province.islands?.some((island) => island.regionalDeputies)) sourceIds.push("boe-balears-2023");

  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: community.officialName, path: communityPath(lang, community.slug) },
        { name: province.decreeName, path },
      ]}
      eyebrow={es ? "Provincia" : "Province"}
      title={province.decreeName}
      lede={community.officialName}
      officeHref="https://www.juntaelectoralcentral.es/cs/jec/eleccionesEnCurso/Elecciones_generales_2026"
      officeLabel="Junta Electoral Central"
      sources={sourcesById(sourceIds)}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(province.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es ? "1 de enero de 2025. Real Decreto 1117/2025." : "1 January 2025. Royal Decree 1117/2025."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.capital}</dt>
          <dd className="mt-1 font-serif text-2xl">{province.capital}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {formatNumber(province.capitalPopulation, lang)}
            {es ? " en el mismo anexo." : " in the same annex."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.congress}</dt>
          <dd className="mt-1 font-serif text-2xl">{province.congressSeats}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es
              ? `El anexo del Real Decreto 806/2026 escribe «${province.decreeName}».`
              : `The annex of Royal Decree 806/2026 prints “${province.decreeName}”.`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.senate}</dt>
          <dd className="mt-1 text-sm leading-6">
            {province.provincialSenators
              ? es
                ? `El artículo 3.2 elige cuatro senadores en la circunscripción provincial.`
                : `Article 3.2 elects four senators in the provincial constituency.`
              : es
                ? "El artículo 3.2 no asigna cuatro senadores a la provincia. Los asigna a las circunscripciones insulares de abajo."
                : "Article 3.2 does not assign four senators to the province. It assigns them to the island constituencies below."}
          </dd>
        </div>
      </dl>

      <p className="text-sm text-ink-muted">
        {copy.ineCode}: {province.ineCode}.{" "}
        {es
          ? "El código es el que la tabla 2917 del INE imprime junto a este nombre de provincia."
          : "The code is the one INE table 2917 prints next to this province name."}
      </p>

      {province.islands && (
        <section>
          <h2 className="font-serif text-2xl font-semibold">{es ? "Islas" : "Islands"}</h2>
          <table className="fact-table mt-3">
            <thead>
              <tr>
                <th scope="col">{es ? "Nombre en el anexo" : "Name in the annex"}</th>
                <th scope="col">{copy.population}</th>
                <th scope="col">{copy.senators}</th>
                {province.islands.some((island) => island.regionalDeputies) && (
                  <th scope="col">{es ? "Diputados autonómicos" : "Regional deputies"}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {province.islands.map((island) => (
                <tr key={island.name}>
                  <td>{island.name}</td>
                  <td>{island.population ? formatNumber(island.population, lang) : "—"}</td>
                  <td>{island.senators}</td>
                  {province.islands?.some((item) => item.regionalDeputies) && <td>{island.regionalDeputies ?? "—"}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-sm text-ink-muted">
            {es
              ? "Población de isla: nombres y cifras del anexo del Real Decreto 1117/2025 (escribe «Gomera, La», «Hierro, El» y «Palma, La»). Senadores: artículo 3.2 del Real Decreto 806/2026, que escribe La Gomera, El Hierro y La Palma. Los diputados autonómicos de las Illes Balears salen del Decreto 2/2023."
              : "Island population: names and figures from the annex of Royal Decree 1117/2025 (it prints “Gomera, La”, “Hierro, El” and “Palma, La”). Senators: article 3.2 of Royal Decree 806/2026, which prints La Gomera, El Hierro and La Palma. The regional deputies for the Balearic Islands come from Decree 2/2023."}
          </p>
        </section>
      )}

      {province.cylProcuradores && (
        <p className="text-sm leading-6">
          {es
            ? `El Decreto 1/2026 asigna ${province.cylProcuradores} procuradores de las Cortes de Castilla y León a esta circunscripción.`
            : `Decree 1/2026 assigns ${province.cylProcuradores} procuradores of the Cortes of Castile and León to this constituency.`}
        </p>
      )}

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{es ? "Elecciones municipales" : "Municipal elections"}</h2>
        <p className="text-sm leading-6">{copy.localElection}</p>
        <GapNote label={copy.gap} text={copy.mayorGap} />
        <GapNote label={copy.gap} text={copy.candidateGap} />
        {emptyTotals.length > 0 && (
          <GapNote
            label={copy.gap}
            text={
              es
                ? `La tabla 29005 imprime estos códigos con el Total de 2025 vacío: ${emptyTotals.map((item) => `${item.code} ${item.name}`).join(", ")}. Esta entrega no publica una página cuando esa celda está vacía.`
                : `Table 29005 prints these codes with an empty Total for 2025: ${emptyTotals.map((item) => `${item.code} ${item.name}`).join(", ")}. This release does not publish a page when that cell is empty.`
            }
          />
        )}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {copy.municipalities} ({formatNumber(municipalities.length, lang)})
        </h2>
        <ul className="mt-3 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {municipalities.map((municipality) => (
            <li key={municipality.code} className="break-inside-avoid py-1">
              <Link
                className="text-navy underline"
                href={municipalityPath(lang, community.slug, province.slug, municipality.slug)}
              >
                {municipality.name}
              </Link>
              <span className="text-ink-muted">
                {" "}
                · {municipality.code} · {formatNumber(municipality.population, lang)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={`${spainHome(lang)}results/`}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${spainHome(lang)}candidates/`}>
          {copy.candidates}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={community.parliamentUrl}>
          {community.parliamentName}
        </Link>
      </p>

      <LinkGrid
        heading={copy.otherProvinces}
        items={siblings.map((item) => ({
          href: provincePath(lang, community.slug, item.slug),
          title: item.decreeName,
          detail: `${item.congressSeats} ${es ? "diputados" : "deputies"}`,
        }))}
      />

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={provincePath(lang, neighbors.prev.communitySlug, neighbors.prev.slug)}>
                {neighbors.prev.decreeName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={provincePath(lang, neighbors.next.communitySlug, neighbors.next.slug)}>
                {neighbors.next.decreeName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </SpainFrame>
  );
}
