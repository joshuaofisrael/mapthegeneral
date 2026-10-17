import { MexicoFrame } from "@/app/mx/_components/Frame";
import { SOURCES, sourceById } from "@/data/mx/sources";
import { mexicoHome } from "@/data/mx/paths";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}sources/`;
  return pageMetadata({
    title: lang === "es" ? "Fuentes" : "Sources",
    description:
      lang === "es"
        ? "Fuentes oficiales leídas para las páginas de México el 17 de octubre de 2026: INE, INEGI y Presidencia."
        : "Official sources read for the Mexico pages on 17 October 2026: INE, INEGI, and the presidency.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}sources/`;
  const es = lang === "es";
  const ine = sourceById("ine-2027");
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.sources, path },
      ]}
      title={es ? "Fuentes de las páginas de México" : "Sources for the Mexico pages"}
      lede={
        es
          ? "Cada ficha se leyó el 17 de octubre de 2026. No se usan prensa ni Wikipedia como fuente de un hecho."
          : "Each item was read on 17 October 2026. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {es
            ? "Lo que no está en estas fuentes no se inventa. Siguen abiertas las lagunas de nombres de gobernantes en ejercicio, listas de candidaturas de 2027, escrutinio, distritos y municipios."
            : "What is not in these sources is not invented. Gaps for sitting executive names, 2027 candidacy lists, the count, districts, and municipalities stay open."}
        </p>
      </div>
    </MexicoFrame>
  );
}
