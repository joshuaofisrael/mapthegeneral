import { notFound } from "next/navigation";
import { PolandFrame } from "../../frame";
import { alphaVoivodeships } from "../../../../../data/pl/places";
import { sourcesById } from "../../../../../data/pl/sources";
import { ui } from "../../../../../data/pl/ui";
import { polandMetadata } from "../../../../../data/pl/seo";
import { polandHome } from "../../../../../data/pl/paths";
import { powiatHeading, powiatIndexPath, powiatPath, powiatsIn } from "../../../../../data/pl/level2";
import type { Lang } from "../../../../../data/pl/types";

function asLang(value: string): Lang {
  if (value !== "pl" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = powiatIndexPath(lang);
  return polandMetadata({
    title: lang === "pl" ? "Powiaty" : "Powiats",
    description:
      lang === "pl"
        ? "380 jednostek szczebla powiatu z pliku TERC: 314 powiatów i 66 miast na prawach powiatu. Informacja nieoficjalna."
        : "380 powiat-level units from the TERC file: 314 powiats and 66 cities with powiat status. Unofficial information.",
    path,
    lang,
    alternatePath: powiatIndexPath(lang === "pl" ? "en" : "pl"),
  });
}

export default async function PowiatIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const pl = lang === "pl";
  const path = powiatIndexPath(lang);
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: pl ? "Powiaty" : "Powiats", path },
      ]}
      title={pl ? "Powiaty" : "Powiats"}
      lede={
        pl
          ? "Plik TERC_Urzedowy_2026-10-18, katalog z datą 2026-01-01, ma 314 wierszy „powiat”, 65 wierszy „miasto na prawach powiatu” i 1 wiersz „miasto stołeczne, na prawach powiatu”."
          : "The file TERC_Urzedowy_2026-10-18, catalog date 2026-01-01, has 314 “powiat” rows, 65 “miasto na prawach powiatu” rows and 1 “miasto stołeczne, na prawach powiatu” row."
      }
      officeHref="https://pkw.gov.pl/"
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById(["teryt-terc", "teryt-zasady", "mswia-jst"])}
    >
      {alphaVoivodeships().map((voj) => (
        <section key={voj.slug} className="mt-8">
          <h2 className="font-serif text-2xl font-semibold">{voj.name}</h2>
          <ul className="mt-3 columns-1 gap-x-6 text-sm sm:columns-2 lg:columns-3">
            {powiatsIn(voj.slug).map((powiat) => (
              <li key={powiat.code} className="mb-1">
                <a className="text-navy underline" href={powiatPath(lang, voj.slug, powiat.slug)}>
                  {powiatHeading(powiat)}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="mt-8 text-sm">
        <a className="text-navy underline" href={polandHome(lang)}>
          {pl ? "Polska" : "Poland"}
        </a>
      </p>
    </PolandFrame>
  );
}
