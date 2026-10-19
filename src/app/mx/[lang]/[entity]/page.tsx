import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { ENTITIES, entityBySlug, entityNeighbors } from "@/data/mx/entities";
import { districtsByEntity, padDistrict } from "@/data/mx/distritos";
import { circunscripcionForEntity } from "@/data/mx/circunscripciones";
import { municipiosByEntitySlug } from "@/data/mx/municipios";
import { circunscripcionesPath, districtPath, districtsIndexPath, entityPath, mexicoHome, municipioPath, municipiosIndexPath } from "@/data/mx/paths";
import { sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return ["es", "en"].flatMap((lang) => ENTITIES.map((entity) => ({ lang, entity: entity.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; entity: string }>;
}) {
  const { lang: raw, entity: slug } = await params;
  const lang = asLang(raw);
  const entity = entityBySlug(slug);
  if (!entity) return {};
  const path = entityPath(lang, slug);
  return pageMetadata({
    title: entity.name,
    description:
      lang === "es"
        ? `${entity.name}: población del Censo 2020 en el Catálogo Único del INEGI y cargos de 2027 impresos por el INE. Información no oficial.`
        : `${entity.name}: 2020 Census population in the INEGI Unique Catalog and 2027 offices printed by the INE. Unofficial information.`,
    path,
    lang,
    alternatePath: entityPath(lang === "es" ? "en" : "es", slug),
  });
}

function num(value: number | undefined, lang: "es" | "en"): string {
  return value === undefined ? "—" : formatNumber(value, lang);
}

export default async function EntityPage({
  params,
}: {
  params: Promise<{ lang: string; entity: string }>;
}) {
  const { lang: raw, entity: slug } = await params;
  const lang = asLang(raw);
  const entity = entityBySlug(slug);
  if (!entity) notFound();
  const copy = ui(lang);
  const es = lang === "es";
  const path = entityPath(lang, slug);
  const neighbors = entityNeighbors(slug);
  const ine = entity.ine;
  const nameDiffers = ine.heading !== entity.name;
  const presidenciaDiffers =
    ine.presidencias !== undefined && ine.presidencias !== entity.municipalities;

  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: entity.name, path },
      ]}
      eyebrow={entity.code === "09" ? (es ? "Ciudad de México" : "Mexico City") : es ? "Entidad federativa" : "Entidad federativa"}
      title={entity.name}
      lede={
        es
          ? `Clave ${entity.code} en el Catálogo Único del INEGI. En la página del INE para 2027 el encabezado es «${ine.heading}».`
          : `Code ${entity.code} in the INEGI Unique Catalog. On the INE page for 2027 the heading is “${ine.heading}”.`
      }
      officeHref="https://ine.mx/voto-y-elecciones/elecciones-2027/"
      officeLabel="Instituto Nacional Electoral"
      sources={sourcesById([
        "ine-2027",
        "inegi-catalogo",
        "inegi-mgem",
        "ine-cg875-anexo",
        "ine-cg526-2026",
        "ine-cg130-2023",
        "ine-cartografia-mun",
        "inafed-presidentes",
        "camara-lxvi",
      ])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(entity.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es
              ? "Campo pob_total. Censo de Población y Vivienda, 2020, según el metadato del servicio."
              : "Field pob_total. 2020 Census of Population and Housing, according to the service metadata."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.inegiCode}</dt>
          <dd className="mt-1 font-serif text-2xl">{entity.code}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {es ? `Abreviatura del servicio: ${entity.abbr}` : `Abbreviation from the service: ${entity.abbr}`}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{es ? "Catálogo municipal" : "Municipal catalog"}</h2>
        <p>
          {es
            ? `El servicio mgem, leído el 19 de octubre de 2026, devolvió ${formatNumber(entity.municipalities, lang)} filas para la clave ${entity.code}. Cada fila tiene página.`
            : `The mgem service, read on 19 October 2026, returned ${formatNumber(entity.municipalities, lang)} rows for code ${entity.code}. Each row has a page.`}
          {entity.code === "09"
            ? es
              ? " Esas filas son las alcaldías de la Ciudad de México en el catálogo."
              : " Those rows are the alcaldías of Mexico City in the catalog."
            : ""}
        </p>
        <p>
          <Link className="text-navy underline" href={municipiosIndexPath(lang, slug)}>
            {entity.code === "09" ? (es ? "Índice de alcaldías" : "Alcaldía index") : es ? "Índice de municipios" : "Municipality index"}
          </Link>
        </p>
        <ul className="mt-4 columns-1 gap-x-6 sm:columns-2">
          {municipiosByEntitySlug(slug).map((row) => (
            <li key={row.code} className="break-inside-avoid">
              <Link className="text-navy underline" href={municipioPath(lang, slug, row.slug)}>
                {row.name}
              </Link>
              <span className="text-sm text-ink-muted"> {row.code}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-ink-muted">
          {es
            ? "Esas páginas no nombran a quien está en el cargo. No copian el campo nom_cab ni la fecha de la elección local anterior."
            : "Those pages do not name the person in office. They do not copy the nom_cab field or the date of the previous local election."}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {es ? "Cargos en la página del INE para el 6 de junio de 2027" : "Offices on the INE page for 6 June 2027"}
        </h2>
        {nameDiffers && (
          <p className="mt-3 text-sm leading-6">
            {es
              ? `El encabezado del INE es «${ine.heading}». El nombre del catálogo es «${entity.name}». Las dos cadenas no son iguales.`
              : `The INE heading is “${ine.heading}”. The catalog name is “${entity.name}”. The two strings are not the same.`}
          </p>
        )}
        <table className="fact-table mt-3">
          <tbody>
            <tr>
              <th scope="row">{es ? "Gubernatura" : "Gubernatura"}</th>
              <td>{num(ine.gubernatura, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Diputaciones de mayoría relativa" : "Relative-majority deputies"}</th>
              <td>{num(ine.dipMr, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Diputaciones de representación proporcional" : "Proportional deputies"}</th>
              <td>{num(ine.dipRp, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Presidencias municipales" : "Municipal presidencies"}</th>
              <td>{num(ine.presidencias, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Sindicaturas" : "Sindicaturas"}</th>
              <td>{num(ine.sindicaturas, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Regidurías" : "Regidurías"}</th>
              <td>{num(ine.regidurias, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Alcaldías" : "Alcaldías"}</th>
              <td>{num(ine.alcaldias, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Concejales" : "Concejales"}</th>
              <td>{num(ine.concejales, lang)}</td>
            </tr>
            <tr>
              <th scope="row">{es ? "Cuarto orden de gobierno" : "Fourth-order offices"}</th>
              <td>{num(ine.cuartoOrden, lang)}</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-2 text-sm text-ink-muted">
          {es
            ? "Un guion significa que el bloque de esta entidad, en la lectura del 17 de octubre de 2026, no imprime esa cifra. No significa que el cargo no exista."
            : "A dash means the block for this entidad, in the reading of 17 October 2026, does not print that figure. It does not mean the office does not exist."}
        </p>
        {presidenciaDiffers && (
          <p className="mt-3 text-sm leading-6">
            {es
              ? `El INE imprime ${formatNumber(ine.presidencias ?? 0, lang)} presidencias municipales. El catálogo del INEGI tiene ${formatNumber(entity.municipalities, lang)} filas. Esta página no explica la diferencia.`
              : `The INE prints ${formatNumber(ine.presidencias ?? 0, lang)} municipal presidencies. The INEGI catalog has ${formatNumber(entity.municipalities, lang)} rows. This page does not explain the difference.`}
          </p>
        )}
        <div className="mt-4 space-y-3">
          <GapNote label={copy.gap} text={ine.gubernatura ? copy.officeholderGap : copy.nextLocalGap} />
          {!ine.gubernatura && <GapNote label={copy.gap} text={copy.officeholderGap} />}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {es ? "Distritos electorales federales" : "Federal electoral districts"}
        </h2>
        <p className="mt-3 text-sm leading-6">
          {es
            ? `El descriptivo del anexo 3 del acuerdo INE/CG875/2022 imprime ${formatNumber(districtsByEntity(slug).length, lang)} distritos para esta entidad. El acuerdo INE/CG526/2026 incorpora esa demarcación. La cabecera es la localidad que el descriptivo nombra.`
            : `The descriptivo in annex 3 of agreement INE/CG875/2022 prints ${formatNumber(districtsByEntity(slug).length, lang)} districts for this entidad. Agreement INE/CG526/2026 incorporates that demarcation. The cabecera is the localidad the descriptivo names.`}
          {circunscripcionForEntity(slug)
            ? es
              ? ` El acuerdo INE/CG130/2023 sitúa esta entidad en la circunscripción ${circunscripcionForEntity(slug)?.number}.`
              : ` Agreement INE/CG130/2023 places this entidad in constituency ${circunscripcionForEntity(slug)?.number}.`
            : ""}
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {districtsByEntity(slug).map((district) => (
            <li key={district.number}>
              <Link className="text-navy underline" href={districtPath(lang, slug, district.number)}>
                {es ? `Distrito ${padDistrict(district.number)}` : `District ${padDistrict(district.number)}`}
              </Link>
              <span className="text-sm text-ink-muted"> — {district.cabeceraLocalidad}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <Link className="text-navy underline" href={districtsIndexPath(lang)}>
            {copy.districts}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={circunscripcionesPath(lang)}>
            {copy.circunscripciones}
          </Link>
        </p>
      </section>

      <p className="text-sm">
        {copy.parent}:{" "}
        <Link className="text-navy underline" href={mexicoHome(lang)}>
          {es ? "México" : "Mexico"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${mexicoHome(lang)}elections/diputaciones-federales-2027/`}>
          {es ? "6 de junio de 2027" : "6 June 2027"}
        </Link>
      </p>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={entityPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.name}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={entityPath(lang, neighbors.next.slug)}>
                {neighbors.next.name}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </MexicoFrame>
  );
}
