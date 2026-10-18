import Link from "@/components/AnchorLink";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { districtName, districtsIn } from "@/data/ca/level2";
import { canadaHome, districtIndexPath, districtPath } from "@/data/ca/paths";
import { alphaRegions, regionName } from "@/data/ca/places";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const fr = lang === "fr";
  return caMetadata({
    title: fr ? "Circonscriptions électorales fédérales" : "Federal electoral districts",
    description: fr
      ? "Index des 343 circonscriptions électorales fédérales du décret de représentation de 2023. Information non officielle."
      : "Index of the 343 federal electoral districts in the 2023 Representation Order. Unofficial information.",
    path: districtIndexPath(lang),
    lang,
  });
}

export default async function DistrictIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = districtIndexPath(lang);
  const title = fr ? "Circonscriptions électorales fédérales" : "Federal electoral districts";
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: title, path },
      ]}
      title={title}
      lede={
        fr
          ? "343 circonscriptions. Le nom est celui de la liste des circonscriptions actuelles de la Chambre des communes, lu le 18 octobre 2026. Il correspond au fichier de limites d’Élections Canada pour le décret de représentation de 2023."
          : "343 districts. The name is the one in the House of Commons list of current constituencies, read on 18 October 2026. It matches the Elections Canada boundary file for the 2023 Representation Order."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["ec-fed-2023", "hoc-constituencies", "ogl-canada"])}
    >
      <p className="text-sm text-ink-muted">
        {fr
          ? "Chaque page de circonscription nomme le député actuel lorsque la Chambre en inscrit un. Cette page ne publie pas de sondages ni de résultats."
          : "Each district page names the current member when the House lists one. This page does not publish polls or results."}
      </p>
      {alphaRegions(lang).map((region) => (
        <section key={region.slug}>
          <h2 className="mt-8 font-serif text-2xl font-semibold">
            <Link className="underline" href={`/ca/${lang}/${region.slug}/`}>
              {regionName(region, lang)}
            </Link>
          </h2>
          <ul className="mt-2 columns-1 gap-8 text-sm sm:columns-2">
            {districtsIn(region.slug, lang).map((district) => (
              <li key={district.slug} className="mb-1 break-inside-avoid">
                <Link className="text-navy underline" href={districtPath(lang, region.slug, district.slug)}>
                  {districtName(district, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </CanadaFrame>
  );
}
