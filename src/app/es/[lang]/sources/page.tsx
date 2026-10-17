import { SpainFrame } from "@/components/SpainFrame";
import { SOURCES, sourceById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${spainHome(lang)}sources/`;
  return pageMetadata({
    title: lang === "es" ? "Fuentes" : "Sources",
    description:
      lang === "es"
        ? "Fuentes oficiales leídas para las páginas de España el 17 de octubre de 2026: BOE, Junta Electoral Central, Infoelectoral, INE, Congreso y Senado."
        : "Official sources read for the Spain pages on 17 October 2026: BOE, Central Electoral Board, Infoelectoral, INE, Congress and Senate.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}sources/`;
  const es = lang === "es";
  const jec = sourceById("jec-home");
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.sources, path },
      ]}
      title={es ? "Fuentes de las páginas de España" : "Sources for the Spain pages"}
      lede={
        es
          ? "Cada ficha de abajo se leyó el 17 de octubre de 2026, salvo que la propia ficha diga otra fecha. No se usan prensa ni Wikipedia como fuente de un hecho."
          : "Each item below was read on 17 October 2026 unless the item itself gives another date. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {es
            ? "Lo que no está en estas fuentes no se inventa. Las lagunas que siguen abiertas son el presidente autonómico en ejercicio, el resto del pleno municipal, las listas de candidatos, el escrutinio y el código postal. La población municipal es el Total de 2025 de la tabla 29005 del INE. La alcaldía sale de la Ficha de Alcaldes de la Legislatura 2023. Seis códigos de la tabla 29005 (12066 Gatova, 15026 Cesuras, 15063 Oza dos Ríos, 17122 Palmerola, 36011 Cerdedo y 36012 Cotobade) tienen el Total de 2025 vacío y no tienen página."
            : "What is not in these sources is not invented. The gaps that stay open are the sitting regional president, the rest of the municipal council, candidate lists, the count, and postcodes. Municipal population is the 2025 Total from INE table 29005. The mayor comes from the Ficha de Alcaldes de la Legislatura 2023. Six codes in table 29005 (12066 Gatova, 15026 Cesuras, 15063 Oza dos Ríos, 17122 Palmerola, 36011 Cerdedo and 36012 Cotobade) have an empty 2025 Total and have no page."}
        </p>
      </div>
    </SpainFrame>
  );
}
