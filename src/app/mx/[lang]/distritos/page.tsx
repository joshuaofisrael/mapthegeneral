import Link from "@/components/AnchorLink";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { districtsByEntity, padDistrict } from "@/data/mx/distritos";
import { alphaEntities } from "@/data/mx/entities";
import { districtPath, districtsIndexPath, entityPath, mexicoHome } from "@/data/mx/paths";
import { sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = districtsIndexPath(lang);
  return pageMetadata({
    title: lang === "es" ? "Distritos electorales federales" : "Federal electoral districts",
    description:
      lang === "es"
        ? "Índice de los 300 distritos electorales federales uninominales, con la cabecera del descriptivo del INE. Información no oficial."
        : "Index of the 300 federal single-member electoral districts, with the cabecera from the INE descriptivo. Unofficial information.",
    path,
    lang,
    alternatePath: districtsIndexPath(lang === "es" ? "en" : "es"),
  });
}

export default async function DistrictIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = districtsIndexPath(lang);
  const es = lang === "es";
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.districts, path },
      ]}
      eyebrow={es ? "Mayoría relativa" : "Relative majority"}
      title={es ? "Distritos electorales federales" : "Federal electoral districts"}
      lede={
        es
          ? "300 distritos uninominales. El número y la cabecera salen del descriptivo del anexo 3 del acuerdo INE/CG875/2022. El acuerdo INE/CG526/2026 incorpora esa demarcación para 2026-2027."
          : "300 single-member districts. The number and the cabecera come from the descriptivo in annex 3 of agreement INE/CG875/2022. Agreement INE/CG526/2026 incorporates that demarcation for 2026-2027."
      }
      officeHref="https://repositoriodocumental.ine.mx/xmlui/handle/123456789/147331"
      officeLabel="Instituto Nacional Electoral"
      sources={sourcesById(["ine-cg875-anexo", "ine-cg875-2022", "ine-cg526-2026", "ine-cartografia-2026", "camara-lxvi"])}
    >
      {alphaEntities().map((entity) => (
        <section key={entity.slug}>
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href={entityPath(lang, entity.slug)}>
              {entity.name}
            </Link>
          </h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {districtsByEntity(entity.slug).map((district) => (
              <li key={district.number}>
                <Link className="text-navy underline" href={districtPath(lang, entity.slug, district.number)}>
                  {es ? `Distrito ${padDistrict(district.number)}` : `District ${padDistrict(district.number)}`}
                </Link>
                <span className="text-sm text-ink-muted"> — {district.cabeceraLocalidad}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </MexicoFrame>
  );
}
