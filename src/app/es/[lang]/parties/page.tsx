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
  const path = `${spainHome(lang)}parties/`;
  return pageMetadata({
    title: lang === "es" ? "Partidos" : "Parties",
    description:
      lang === "es"
        ? "Las candidaturas de las elecciones del 29 de noviembre de 2026 no están proclamadas en las fuentes leídas el 17 de octubre de 2026. Esta página no enumera partidos."
        : "Candidacies for the 29 November 2026 election were not proclaimed in the sources read on 17 October 2026. This page does not list parties.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}parties/`,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}parties/`;
  const es = lang === "es";
  const jec = sourceById("jec-candidaturas");
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.parties, path },
      ]}
      title={es ? "Partidos y coaliciones" : "Parties and coalitions"}
      lede={
        es
          ? "Una candidatura al Congreso o al Senado existe, a efectos de estas páginas, cuando la Junta Electoral Provincial la proclama y el BOE la publica."
          : "For these pages, a Congress or Senate candidacy exists when the provincial electoral board proclaims it and the Official State Gazette publishes it."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["jec-candidaturas", "jec-calendario", "loreg-jec", "rd-806-2026"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {es
            ? "El artículo 44 y concordantes de la LOREG regulan quién puede presentar candidaturas. Esta página no resume los requisitos ni explica cómo presentar una lista. El registro de partidos políticos corresponde al Ministerio del Interior; el listado completo no se reproduce aquí."
            : "The electoral law regulates who may file a candidacy. This page does not summarise the requirements and does not explain how to file a list. The political-party register is kept by the Ministry of the Interior; the full register is not reprinted here."}
        </p>
      </div>
    </SpainFrame>
  );
}
