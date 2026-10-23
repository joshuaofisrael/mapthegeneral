import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { SpainFrame } from "@/components/SpainFrame";
import { sourceById, sourcesById } from "@/data/spain/sources";
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
  const path = `${spainHome(lang)}results/`;
  return pageMetadata({
    title: lang === "es" ? "Resultados de España" : "Spain results",
    description:
      lang === "es"
        ? "Resultados de las elecciones del 29 de noviembre de 2026. No hay escrutinio que reproducir. Esta página no proclama ganadores."
        : "Results of the 29 November 2026 election. There is no count to reprint. This page does not declare a winner.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}results/`;
  const es = lang === "es";
  const info = sourceById("infoelectoral-home");
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={es ? "Sin escrutinio publicado" : "No count published"}
      title={es ? "Resultados del 29 de noviembre de 2026" : "Results of 29 November 2026"}
      lede={
        es
          ? "Esta página está en espera del escrutinio oficial. No atribuye escaños y no declara una mayoría."
          : "This page is waiting for the official count. It does not assign seats and it does not declare a majority."
      }
      officeHref={info.url}
      officeLabel="Infoelectoral, Ministerio del Interior"
      sources={sourcesById(["infoelectoral-home", "rd-806-2026", "jec-generales-2026"])}
    >
      <GapNote
        label={copy.gap}
        text={
          es
            ? "El 17 de octubre de 2026 no hay resultados del 29 de noviembre que copiar. Infoelectoral publica los resultados de los procesos celebrados. Cuando haya escrutinio, seguirá siendo no oficial en esta web hasta que la autoridad competente lo dé por oficial, y esta web no cantará la elección."
            : "On 17 October 2026 there are no 29 November results to copy. Infoelectoral publishes results of elections already held. When a count exists, it will stay unofficial on this site until the competent authority treats it as official, and this site will not call the election."
        }
      />
      <p className="text-sm">
        <a className="text-navy underline" href={info.url} rel="noopener noreferrer">
          Infoelectoral
        </a>
        {" · "}
        <Link className="text-navy underline" href={`${spainHome(lang)}elections/cortes-generales-2026/`}>
          {es ? "La convocatoria" : "The calling decree"}
        </Link>
      </p>
    </SpainFrame>
  );
}
