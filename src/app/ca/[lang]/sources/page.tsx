import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome } from "@/data/ca/paths";
import { caMetadata } from "@/data/ca/seo";
import { SOURCES, sourceById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  return caMetadata({
    title: lang === "fr" ? "Sources" : "Sources",
    description:
      lang === "fr"
        ? "Sources officielles lues le 17 octobre 2026 pour les pages du Canada."
        : "Official sources read on 17 October 2026 for the Canada pages.",
    path: `${canadaHome(lang)}sources/`,
    lang,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}sources/`;
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        fr
          ? "Chaque page du Canada ne cite que les sources utilisées pour ses phrases. La liste complète lue pour cette livraison est ici. La date de lecture est le 17 octobre 2026."
          : "Each Canada page cites only the sources used for its sentences. The full list read for this release is here. The read date is 17 October 2026."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={SOURCES}
    >
      <p className="text-sm text-ink-muted">
        {fr
          ? `${SOURCES.length} sources. Les pages de municipalités et de circonscriptions ne sont pas dans cette livraison.`
          : `${SOURCES.length} sources. Municipality and electoral-district pages are not in this release.`}
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">{fr ? "Licences et attribution" : "Licences and attribution"}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {fr ? "Contient de l’information visée par la " : "Contains information licensed under the "}
        <a className="underline" href={fr ? "https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada" : "https://open.canada.ca/en/open-government-licence-canada"}>
          {fr ? "Licence du gouvernement ouvert – Canada" : "Open Government Licence – Canada"}
        </a>
        {fr
          ? " (données de Statistique Canada). Les faits tirés d’Élections Canada, du Parlement, des lois et des sites provinciaux sont résumés dans nos propres mots, avec la source citée pour chaque page. Aucune image, aucun logo ni aucune armoirie n’est reproduit. Map the General n’est affilié à aucun de ces organismes et n’a pas leur approbation."
          : " (Statistics Canada data). Facts from Elections Canada, Parliament, statutes and provincial sites are summarised in our own words, with the source cited for each page. No images, logos or coats of arms are reproduced. Map the General is not affiliated with any of these bodies, and they do not endorse it."}
      </p>
    </CanadaFrame>
  );
}
