import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import {
  alphaEntities,
  gubernaturaEntities,
  MUNICIPALITY_CATALOG_COUNT,
  POPULATION_SUM,
} from "@/data/mx/entities";
import { entityPath, mexicoHome } from "@/data/mx/paths";
import { sourceById, sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  return pageMetadata({
    title: lang === "es" ? "México" : "Mexico",
    description:
      lang === "es"
        ? "Elección federal del 6 de junio de 2027: 500 diputaciones, 32 entidades federativas y 17 gubernaturas en la página del INE. Información no oficial."
        : "Mexican federal election of 6 June 2027: 500 deputies, 32 entidades federativas, and 17 gubernaturas on the INE page. Unofficial information.",
    path: mexicoHome(lang),
    lang,
    alternatePath: mexicoHome(lang === "es" ? "en" : "es"),
  });
}

export default async function MexicoNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = mexicoHome(lang);
  const es = lang === "es";
  const ine = sourceById("ine-2027");
  const governors = gubernaturaEntities();

  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path },
      ]}
      eyebrow={es ? "Elección federal · 6 de junio de 2027" : "Federal election · 6 June 2027"}
      title={es ? "México" : "Mexico"}
      lede={
        es
          ? "El Instituto Nacional Electoral informa que la jornada electoral del Proceso Electoral Federal 2026-2027 es el 6 de junio de 2027 y que se renuevan las 500 diputaciones de la Cámara de Diputados."
          : "The National Electoral Institute states that polling day for the 2026-2027 federal electoral process is 6 June 2027 and that all 500 seats in the Chamber of Deputies are renewed."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={sourcesById([
        "ine-2027",
        "ine-2024-plan",
        "ine-jornada-2024",
        "inegi-catalogo",
        "ine-partidos",
        "presidencia",
        "presidencia-biografia",
      ])}
    >
      <section className="prose-legal">
        <h2>{es ? "La elección de 2027" : "The 2027 election"}</h2>
        <p>
          {es
            ? "La página del INE, leída el 17 de octubre de 2026, dice que el proceso inició el 10 de septiembre de 2026 y que el Consejo General aprobó el acuerdo INE/CG480/2026, con el Plan Integral y los Calendarios de Coordinación de los procesos locales con el federal. La misma página imprime 300 cargos de mayoría relativa y 200 de representación proporcional."
            : "The INE page, read on 17 October 2026, says the process began on 10 September 2026 and that the General Council approved agreement INE/CG480/2026, with the comprehensive plan and the calendars coordinating local processes with the federal one. The same page prints 300 relative-majority seats and 200 proportional-representation seats."}
        </p>
        <ul>
          <li>{es ? "Aprobación del calendario electoral: 30 de julio de 2026." : "Approval of the electoral calendar: 30 July 2026."}</li>
          <li>{es ? "Inicio del proceso electoral federal: 10 de septiembre de 2026." : "Start of the federal electoral process: 10 September 2026."}</li>
          <li>{es ? "Instalación de consejos locales: 30 de septiembre de 2026." : "Installation of local councils: 30 September 2026."}</li>
          <li>{es ? "Jornada electoral: 6 de junio de 2027." : "Polling day: 6 June 2027."}</li>
          <li>{es ? "Cómputos distritales: 9 de junio de 2027." : "District counts: 9 June 2027."}</li>
          <li>{es ? "Cómputo plurinominal: 13 de junio de 2027." : "Plurinominal count: 13 June 2027."}</li>
        </ul>
        <p>
          <Link className="text-navy underline" href={`${path}elections/diputaciones-federales-2027/`}>
            {es ? "Página de esta elección" : "Page for this election"}
          </Link>
        </p>
        <p>
          {es
            ? "Esa página no lista senadurías entre los cargos federales a renovar. El plan del proceso 2023-2024, en su cuadro 1, sí contaba 128 senadurías (64 de mayoría relativa, 32 de primera minoría y 32 de representación proporcional) para la jornada del 2 de junio de 2024."
            : "That page does not list Senate seats among the federal offices to be renewed. The plan for the 2023-2024 process, in its table 1, did count 128 Senate seats (64 relative majority, 32 first minority, and 32 proportional representation) for polling day on 2 June 2024."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{es ? "Elecciones locales del mismo día" : "Local elections the same day"}</h2>
        <p>
          {es
            ? "El INE dice que habrá elecciones federales y concurrencia de elecciones locales en las 32 entidades federativas, para gubernaturas, congresos locales, ayuntamientos, juntas municipales, alcaldías y cargos del cuarto orden de gobierno. Escribe «más de 19 mil cargos». No imprime en el texto leído la cifra exacta."
            : "The INE says there will be federal elections and concurrent local elections in all 32 entidades federativas, for gubernaturas, state congresses, ayuntamientos, juntas municipales, alcaldías, and fourth-order offices. It writes “más de 19 mil cargos”. The text that was read does not print an exact figure."}
        </p>
        <p>
          {es
            ? `En los bloques por entidad, una gubernatura aparece en ${governors.length} encabezados: ${governors.map((entity) => entity.ine.heading).join(", ")}.`
            : `In the per-entidad blocks, a gubernatura appears under ${governors.length} headings: ${governors.map((entity) => entity.ine.heading).join(", ")}.`}
        </p>
        <GapNote label={copy.gap} text={copy.officeholderGap} />
        <GapNote label={copy.gap} text={copy.municipalityGap} />
        <GapNote label={copy.gap} text={copy.districtGap} />
      </section>

      <section className="prose-legal">
        <h2>{es ? "Elección federal de 2024" : "Federal election of 2024"}</h2>
        <p>
          {es
            ? "El plan del INE para 2023-2024 dice que en ese proceso se renovarían la Presidencia de la República y el Congreso de la Unión: 1 presidencia, 128 senadurías y 500 diputaciones, 629 cargos en el cuadro 1. El cuadro cita los artículos 51, 52, 56 y 83 de la Constitución como base de esas cifras. Una nota del INE del 5 de junio de 2024 dice que la jornada fue el domingo 2 de junio de 2024, para la Presidencia, las senadurías y las diputaciones federales."
            : "The INE plan for 2023-2024 says that process would renew the Presidency of the Republic and the Congress of the Union: 1 presidency, 128 Senate seats, and 500 deputies, 629 offices in table 1. The table cites articles 51, 52, 56, and 83 of the Constitution as the basis of those figures. An INE note of 5 June 2024 says polling day was Sunday, 2 June 2024, for the Presidency, the Senate, and the federal deputies."}
        </p>
        <p>
          {es
            ? "El sitio de la Presidencia, leído el 17 de octubre de 2026, nombra a Claudia Sheinbaum Pardo como Presidenta de México. La biografía de ese sitio dice que fue electa el 2 de junio de 2024. Esta página no copia la cifra de votos que esa biografía resume."
            : "The presidency website, read on 17 October 2026, names Claudia Sheinbaum Pardo as Presidenta de México. The biography on that site says she was elected on 2 June 2024. This page does not copy the vote figure that biography summarises."}
        </p>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <GapNote label={copy.gap} text={copy.resultsGap} />
      </section>

      <section className="prose-legal">
        <h2>{es ? "Población" : "Population"}</h2>
        <p>
          {es
            ? `El servicio del Catálogo Único, leído el 17 de octubre de 2026, devolvió 32 entidades. Su metadato dice que la fuente estadística es el Censo de Población y Vivienda, 2020. El servicio no imprime un total nacional. La suma de los 32 campos pob_total es ${formatNumber(POPULATION_SUM, lang)}. El catálogo municipal devolvió ${formatNumber(MUNICIPALITY_CATALOG_COUNT, lang)} filas.`
            : `The Unique Catalog service, read on 17 October 2026, returned 32 entidades. Its metadata says the statistical source is the 2020 Census of Population and Housing. The service does not print a national total. The 32 pob_total fields add up to ${formatNumber(POPULATION_SUM, lang)}. The municipal catalog returned ${formatNumber(MUNICIPALITY_CATALOG_COUNT, lang)} rows.`}
        </p>
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={`${path}parties/`}>
          {copy.parties}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${path}results/`}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${path}faq/`}>
          {copy.faq}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${path}sources/`}>
          {copy.sources}
        </Link>
      </p>

      <LinkGrid
        heading={copy.entities}
        items={alphaEntities().map((entity) => ({
          href: entityPath(lang, entity.slug),
          title: entity.name,
          detail: entity.ine.gubernatura
            ? es
              ? "Gubernatura en la página del INE para 2027"
              : "Gubernatura on the INE page for 2027"
            : es
              ? "Sin gubernatura en ese listado"
              : "No gubernatura in that list",
        }))}
      />
    </MexicoFrame>
  );
}
