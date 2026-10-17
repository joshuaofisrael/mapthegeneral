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
            ? "Lo que no está en estas fuentes no se inventa. Las lagunas marcadas en las páginas —presidente autonómico en ejercicio, listas de candidatos, escrutinio, código postal— siguen abiertas hasta que se lea un documento oficial que las cierre."
            : "What is not in these sources is not invented. Gaps marked on the pages — the sitting regional president, candidate lists, the count, postcodes — stay open until an official document that closes them has been read."}
        </p>
      </div>
    </SpainFrame>
  );
}
