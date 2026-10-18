import Link from "@/components/AnchorLink";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { divisionName, divisionsIn } from "@/data/ca/level2";
import { canadaHome, divisionIndexPath, divisionPath } from "@/data/ca/paths";
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
    title: fr ? "Divisions de recensement" : "Census divisions",
    description: fr
      ? "Index des 293 divisions de recensement de la Classification géographique type de 2021. Information non officielle."
      : "Index of the 293 census divisions in the 2021 Standard Geographical Classification. Unofficial information.",
    path: divisionIndexPath(lang),
    lang,
  });
}

export default async function DivisionIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = divisionIndexPath(lang);
  const title = fr ? "Divisions de recensement" : "Census divisions";
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
          ? "293 divisions de recensement (niveau 3) de la CGT 2021. Le titre de classe est celui du fichier de structure de Statistique Canada, lu le 18 octobre 2026. Ce fichier ne nomme pas de titulaire."
          : "293 census divisions (level 3) in SGC 2021. The class title is the one in the Statistics Canada structure file, read on 18 October 2026. That file does not name an officeholder."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["sgc-2021-en", "sgc-2021-fr", "statcan-licence"])}
    >
      <p className="text-sm">
        Adapted from Statistics Canada, Standard Geographical Classification (SGC) 2021, structure file, reference date
        2021. This does not constitute an endorsement by Statistics Canada of this product.
      </p>
      {alphaRegions(lang).map((region) => (
        <section key={region.slug}>
          <h2 className="mt-8 font-serif text-2xl font-semibold">
            <Link className="underline" href={`/ca/${lang}/${region.slug}/`}>
              {regionName(region, lang)}
            </Link>
          </h2>
          <ul className="mt-2 columns-1 gap-8 text-sm sm:columns-2">
            {divisionsIn(region.slug, lang).map((division) => (
              <li key={division.slug} className="mb-1 break-inside-avoid">
                <Link className="text-navy underline" href={divisionPath(lang, region.slug, division.slug)}>
                  {divisionName(division, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </CanadaFrame>
  );
}
