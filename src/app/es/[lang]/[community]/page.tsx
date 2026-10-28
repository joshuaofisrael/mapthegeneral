import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { SpainFrame } from "@/components/SpainFrame";
import { autonomousCityMunicipality } from "@/data/spain/municipalities";
import {
  CITIES,
  alphaCommunityNeighbors,
  communityBySlug,
  congressSeatsOfCommunity,
  populationOfCommunity,
  provincesIn,
} from "@/data/spain/places";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { formatIsoDate, formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { fitMetaTitle } from "@/lib/snippet";
import { communityPath, provincePath, spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return ["es", "en"].flatMap((lang) =>
    ["andalucia", "aragon", "asturias", "illes-balears", "canarias", "cantabria", "castilla-la-mancha", "castilla-y-leon", "cataluna", "extremadura", "galicia", "madrid", "murcia", "navarra", "pais-vasco", "la-rioja", "comunidad-valenciana", "ceuta", "melilla"].map(
      (community) => ({ lang, community }),
    ),
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; community: string }>;
}) {
  const { lang: raw, community: slug } = await params;
  const lang = asLang(raw);
  const community = communityBySlug(slug);
  if (!community) return {};
  const path = communityPath(lang, slug);
  return pageMetadata({
    title: fitMetaTitle(community.officialName, lang === "es" ? "elecciones generales" : "general election"),
    description:
      lang === "es"
        ? `${community.officialName}: ${community.parliamentName}, última elección citada y provincias. Información no oficial.`
        : `${community.officialName}: ${community.parliamentName}, the latest cited election, and provinces. Unofficial information.`,
    path,
    lang,
    alternatePath: communityPath(lang === "es" ? "en" : "es", slug),
  });
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ lang: string; community: string }>;
}) {
  const { lang: raw, community: slug } = await params;
  const lang = asLang(raw);
  const community = communityBySlug(slug);
  if (!community) notFound();
  const copy = ui(lang);
  const es = lang === "es";
  const path = communityPath(lang, slug);
  const provinces = provincesIn(slug);
  const city = CITIES.find((item) => item.slug === slug);
  const cityRow = autonomousCityMunicipality(slug);
  const population = populationOfCommunity(slug);
  const seats = congressSeatsOfCommunity(slug);
  const neighbors = alphaCommunityNeighbors(slug);
  const electionSource = sourceById(community.lastElection.sourceId);
  const sourceIds = ["rd-1117-2025", "rd-806-2026", "infoelectoral-procesos", community.lastElection.sourceId];
  if (slug === "castilla-y-leon") sourceIds.push("boe-cyl-2026");
  if (slug === "aragon") sourceIds.push("boe-aragon-xii");
  if (slug === "illes-balears") sourceIds.push("boe-balears-2023");
  if (slug === "ceuta" || slug === "melilla") sourceIds.push("rd-207-2023", "loreg-boe", "ine-29005", "mpt-alcaldes-2023");

  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: community.officialName, path },
      ]}
      eyebrow={community.kind === "city" ? (es ? "Ciudad autónoma" : "Autonomous city") : es ? "Comunidad autónoma" : "Autonomous community"}
      title={community.officialName}
      lede={community.parliamentName}
      officeHref={community.parliamentUrl}
      officeLabel={community.parliamentName}
      sources={sourcesById([...new Set(sourceIds)])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es
              ? "Padrón a 1 de enero de 2025, Real Decreto 1117/2025. En las comunidades, es la suma de las provincias del anexo."
              : "Municipal register at 1 January 2025, Royal Decree 1117/2025. For a community, this is the sum of the annex’s provincial figures."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.congress}</dt>
          <dd className="mt-1 font-serif text-2xl">
            {formatNumber(seats, lang)} {es ? "diputados" : "deputies"}
          </dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es ? "Anexo del Real Decreto 806/2026." : "Annex of Royal Decree 806/2026."}
            {city ? (es ? ` Senadores en el artículo 3.2: ${city.senators}.` : ` Senators in article 3.2: ${city.senators}.`) : ""}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{copy.parliament}</h2>
        <p>
          <a href={community.parliamentUrl} rel="noopener noreferrer">
            {community.parliamentName}
          </a>
        </p>
        {community.chamberSize && (
          <p>
            {es
              ? `El decreto leído fija ${community.chamberSize} escaños. ${community.chamberSizeNoteEs}`
              : `The decree that was read sets ${community.chamberSize} seats. ${community.chamberSizeNoteEn}`}
          </p>
        )}
        <h2>{copy.lastElection}</h2>
        <p>
          {es ? community.lastElection.officeEs : community.lastElection.officeEn}:{" "}
          {formatIsoDate(community.lastElection.iso, lang)}. {community.lastElection.instrument}.{" "}
          {community.lastElection.publication}.{" "}
          <a href={electionSource.url} rel="noopener noreferrer">
            {electionSource.name}
          </a>
        </p>
        {slug === "illes-balears" && (
          <p>
            {es
              ? "La tabla de procesos de Infoelectoral, leída el 17 de octubre de 2026, lista elecciones al Parlamento de las Illes Balears hasta 2019 y, para 2023, las de los consejos insulares. La convocatoria del Parlamento del 28 de mayo de 2023 está en el Decreto 2/2023 del BOE, que es la fuente usada aquí."
              : "Infoelectoral’s process table, read on 17 October 2026, lists Balearic Parliament elections through 2019 and, for 2023, the island-council elections. The Parliament election of 28 May 2023 is in Decree 2/2023 in the BOE, which is the source used here."}
          </p>
        )}
        {slug === "aragon" && (
          <p>
            {es
              ? "Una resolución del BOE de 3 de marzo de 2026 comunica que ese día se constituyeron las Cortes de Aragón en su XII Legislatura. La presidenta de las Cortes que firma esa resolución es María Navarro Viscasillas. Es la presidencia de la cámara, no la presidencia del Gobierno de Aragón."
              : "A BOE resolution of 3 March 2026 reports that the Cortes of Aragon were constituted that day in their 12th legislature. The president of the Cortes who signs it is María Navarro Viscasillas. That is the speakership of the chamber, not the presidency of the Government of Aragon."}
          </p>
        )}
        <h2>{copy.nextElection}</h2>
        {cityRow ? (
          <p>{copy.localElection}</p>
        ) : (
          <GapNote label={copy.gap} text={copy.nextElectionGap} />
        )}
        <h2>{copy.government}</h2>
        <p>
          <a href={community.governmentUrl} rel="noopener noreferrer">
            {community.governmentUrl}
          </a>
        </p>
        <GapNote label={copy.gap} text={copy.governmentGap} />
      </section>

      {cityRow && (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl font-semibold">{copy.municipality}</h2>
          <p className="text-sm leading-6">
            {es
              ? `La tabla 29005 imprime un municipio en este código de ciudad: ${cityRow.code} ${cityRow.name}, Total ${formatNumber(cityRow.population, lang)} para 2025. No hay provincia entre la ciudad autónoma y ese municipio, así que esta página es la del municipio.`
              : `Table 29005 prints one municipality on this city code: ${cityRow.code} ${cityRow.name}, Total ${formatNumber(cityRow.population, lang)} for 2025. There is no province between the autonomous city and that municipality, so this page is the municipality page.`}
          </p>
          <p className="text-sm leading-6">{copy.populationSeriesCity}</p>
          <p className="text-sm leading-6">
            {copy.mayorOfficial}{" "}
            <a className="underline" href={sourceById("mpt-alcaldes-2023").url}>
              Consulta de Cargos Representativos Locales
            </a>
            .
          </p>
        </section>
      )}

      {provinces.length > 0 && (
        <LinkGrid
          heading={copy.children}
          items={provinces.map((province) => ({
            href: provincePath(lang, slug, province.slug),
            title: province.decreeName,
            detail: `${province.congressSeats} ${es ? "diputados" : "deputies"} · ${formatNumber(province.population, lang)}`,
          }))}
        />
      )}

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={communityPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={communityPath(lang, neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </SpainFrame>
  );
}
