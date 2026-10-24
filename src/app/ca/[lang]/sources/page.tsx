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
    title: lang === "fr" ? "Sources du Canada" : "Canada sources",
    description:
      lang === "fr"
        ? "Sources officielles des pages du Canada, avec la date de lecture de chaque source."
        : "Official sources for the Canada pages, with the date each source was read.",
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
          ? "Chaque page du Canada ne cite que les sources utilisées pour ses phrases. La liste complète lue pour cette livraison est ici. La date de lecture est indiquée pour chaque source."
          : "Each Canada page cites only the sources used for its sentences. The full list read for this release is here. The read date is shown on each source."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={SOURCES}
    >
      <p className="text-sm text-ink-muted">
        {fr
          ? `${SOURCES.length} sources. Cette livraison a des circonscriptions d’assemblée pour neuf provinces et territoires, et des pages de municipalités constituées pour l’Ontario, le Québec, la Colombie-Britannique, l’Alberta, le Manitoba, la Saskatchewan, la Nouvelle-Écosse et le Nouveau-Brunswick, à partir de la liste de la CGT 2021 utilisée ici. Terre-Neuve-et-Labrador, l’Île-du-Prince-Édouard et les territoires restent pour une livraison suivante. Les réserves, les terres visées par un traité, les territoires non organisés, les secteurs électoraux de district régional, les improvement districts, les special areas, les fire districts, les paroisses géographiques du Nouveau-Brunswick (type P) et les subdivisions statistiques de Statistique Canada n’ont pas de page. Les maires ne sont pas copiés. Les circonscriptions d’assemblée du Nouveau-Brunswick, de Terre-Neuve-et-Labrador, des Territoires du Nord-Ouest et du Yukon ne font pas partie de cette livraison.`
          : `${SOURCES.length} sources. This release has legislative assembly districts for nine provinces and territories, and incorporated-municipality pages for Ontario, Quebec, British Columbia, Alberta, Manitoba, Saskatchewan, Nova Scotia, and New Brunswick, from the SGC 2021 list used here. Newfoundland and Labrador, Prince Edward Island, and the territories remain for a later release. Indian reserves, treaty lands, unorganized areas, regional district electoral areas, improvement districts, special areas, fire districts, New Brunswick geographic parishes (type P), and Statistics Canada statistical subdivisions do not have pages. Mayors are not copied. Legislative assembly districts for New Brunswick, Newfoundland and Labrador, the Northwest Territories, and Yukon are not in this release.`}
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">{fr ? "Licences et attribution" : "Licences and attribution"}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {lang === "fr"
          ? "Contient des informations visées par la Licence du gouvernement ouvert – Canada."
          : "Contains information licensed under the Open Government Licence – Canada."}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {lang === "fr"
          ? "Adapté de Statistique Canada, Classification géographique type (CGT) 2021, fichier de structure, date de référence 2021. Ceci ne constitue pas une approbation de ce produit par Statistique Canada."
          : "Adapted from Statistics Canada, Standard Geographical Classification (SGC) 2021, structure file, reference date 2021. This does not constitute an endorsement by Statistics Canada of this product."}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {lang === "fr"
          ? "Adapté de Statistique Canada, fichier numérique des limites du Recensement de 2021, table d’attributs des subdivisions de recensement, date de référence 2021, et du tableau 1.5 du Dictionnaire du Recensement de la population de 2021, no 98-301-X au catalogue. Ceci ne constitue pas une approbation de ce produit par Statistique Canada."
          : "Adapted from Statistics Canada, 2021 Census digital boundary file, census subdivision attribute table, reference date 2021, and from Dictionary, Census of Population, 2021, table 1.5, catalogue no. 98-301-X. This does not constitute an endorsement by Statistics Canada of this product."}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {fr ? (
          <>
            Le fichier de limites des circonscriptions fédérales de 2023 d’Élections Canada est offert sous la{" "}
            <a className="underline" href="https://ouvert.canada.ca/fr/licence-du-gouvernement-ouvert-canada">
              Licence du gouvernement ouvert – Canada
            </a>
            . La page de données ouvertes de la Chambre des communes indique que ces données sont librement partagées,
            utilisées et réutilisées sans restriction. Aucune image, aucun logo ni aucune armoirie n’est reproduit. Map
            the General n’est affilié à aucun de ces organismes et n’a pas leur approbation.
          </>
        ) : (
          <>
            The Elections Canada 2023 federal electoral district boundary file is offered under the{" "}
            <a className="underline" href="https://open.canada.ca/en/open-government-licence-canada">
              Open Government Licence – Canada
            </a>
            . The House of Commons open-data page says that open data is freely shared, used and built on without
            restrictions. No images, logos or coats of arms are reproduced. Map the General is not affiliated with any
            of these bodies, and they do not endorse it.
          </>
        )}
      </p>
    </CanadaFrame>
  );
}
