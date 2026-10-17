import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { alphaEntities, gubernaturaEntities } from "@/data/mx/entities";
import { ELECTION_SLUG, entityPath, mexicoHome } from "@/data/mx/paths";
import { sourceById, sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [
    { lang: "es", slug: ELECTION_SLUG },
    { lang: "en", slug: ELECTION_SLUG },
  ];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== ELECTION_SLUG) return {};
  const path = `${mexicoHome(lang)}elections/${ELECTION_SLUG}/`;
  return pageMetadata({
    title: lang === "es" ? "Diputaciones federales, 6 de junio de 2027" : "Federal deputies, 6 June 2027",
    description:
      lang === "es"
        ? "500 diputaciones el 6 de junio de 2027: 300 de mayoría relativa y 200 de representación proporcional, según la página del INE. Información no oficial."
        : "500 deputies on 6 June 2027: 300 by relative majority and 200 by proportional representation, as printed on the INE page. Unofficial information.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}elections/${ELECTION_SLUG}/`,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== ELECTION_SLUG) notFound();
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}elections/${ELECTION_SLUG}/`;
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
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.elections, path: `${mexicoHome(lang)}elections/` },
        { name: es ? "6 de junio de 2027" : "6 June 2027", path },
      ]}
      eyebrow="INE/CG480/2026"
      title={es ? "Diputaciones federales del 6 de junio de 2027" : "Federal deputies on 6 June 2027"}
      lede={
        es
          ? "Proceso Electoral Federal 2026-2027. La fuente de las fechas y de los 500 cargos es la página del INE, no un decreto del Diario Oficial copiado en esta entrega."
          : "Federal electoral process 2026-2027. The source for the dates and the 500 seats is the INE page, not a Federal Official Gazette decree copied in this release."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={sourcesById(["ine-2027", "ine-2024-plan"])}
    >
      <section className="prose-legal">
        <h2>{es ? "Qué imprime la página del INE" : "What the INE page prints"}</h2>
        <ul>
          <li>{es ? "Se renuevan las 500 diputaciones de la Cámara de Diputados." : "All 500 seats in the Chamber of Deputies are renewed."}</li>
          <li>{es ? "300 cargos por el principio de mayoría relativa." : "300 seats by relative majority."}</li>
          <li>{es ? "200 cargos por el principio de representación proporcional." : "200 seats by proportional representation."}</li>
          <li>{es ? "Jornada electoral: 6 de junio de 2027." : "Polling day: 6 June 2027."}</li>
          <li>{es ? "Cómputos distritales: 9 de junio de 2027." : "District counts: 9 June 2027."}</li>
          <li>{es ? "Cómputo plurinominal: 13 de junio de 2027." : "Plurinominal count: 13 June 2027."}</li>
        </ul>
        <p>
          <a href={ine.url} rel="noopener noreferrer">
            {es ? "Página del proceso en ine.mx" : "Process page at ine.mx"}
          </a>
        </p>
      </section>
      <section className="prose-legal">
        <h2>{es ? "Concurrencia local" : "Concurrent local elections"}</h2>
        <p>
          {es
            ? `La misma página anuncia elecciones locales en las 32 entidades. Hay una gubernatura en ${governors.length} bloques. Los nombres son los encabezados del INE, que a veces son más cortos que el nombre del Catálogo Único.`
            : `The same page announces local elections in all 32 entidades. A gubernatura appears in ${governors.length} blocks. The names are the INE headings, which are sometimes shorter than the Unique Catalog name.`}
        </p>
        <ul>
          {governors.map((entity) => (
            <li key={entity.code}>
              <Link className="text-navy underline" href={entityPath(lang, entity.slug)}>
                {entity.ine.heading}
              </Link>
              {entity.ine.heading !== entity.name ? ` — ${entity.name}` : ""}
            </li>
          ))}
        </ul>
      </section>
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <GapNote label={copy.gap} text={copy.resultsGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={`${mexicoHome(lang)}results/`}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={mexicoHome(lang)}>
          {es ? `${alphaEntities().length} entidades` : `${alphaEntities().length} entidades`}
        </Link>
      </p>
    </MexicoFrame>
  );
}
