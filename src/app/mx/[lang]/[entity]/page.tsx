import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { ENTITIES, entityBySlug, entityNeighbors } from "@/data/mx/entities";
import { entityPath, mexicoHome } from "@/data/mx/paths";
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
      sources={sourcesById(["ine-2027", "inegi-catalogo"])}
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
            ? `El servicio mgem devolvió ${formatNumber(entity.municipalities, lang)} filas para la clave ${entity.code}.`
            : `The mgem service returned ${formatNumber(entity.municipalities, lang)} rows for code ${entity.code}.`}
          {entity.code === "09"
            ? es
              ? " Esas filas son las alcaldías de la Ciudad de México en el catálogo."
              : " Those rows are the alcaldías of Mexico City in the catalog."
            : ""}
        </p>
        <GapNote label={copy.gap} text={copy.municipalityGap} />
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
          <GapNote label={copy.gap} text={copy.districtGap} />
        </div>
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
