import { notFound } from "next/navigation";
import { PolandFrame } from "../../frame";
import { allSejmOkregi, sejmIndexPath, sejmOkregPath } from "../../../../../data/pl/level2";
import { sourcesById } from "../../../../../data/pl/sources";
import { ui } from "../../../../../data/pl/ui";
import { polandMetadata } from "../../../../../data/pl/seo";
import { polandHome } from "../../../../../data/pl/paths";
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
  const path = sejmIndexPath(lang);
  return polandMetadata({
    title: lang === "pl" ? "Okręgi do Sejmu" : "Sejm constituencies",
    description:
      lang === "pl"
        ? "41 okręgów do Sejmu z załącznika nr 1 do Kodeksu wyborczego. 460 posłów. Informacja nieoficjalna."
        : "41 Sejm constituencies from annex 1 of the electoral code. 460 deputies. Unofficial information.",
    path,
    lang,
    alternatePath: sejmIndexPath(lang === "pl" ? "en" : "pl"),
  });
}

export default async function SejmIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const pl = lang === "pl";
  const path = sejmIndexPath(lang);
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: pl ? "Okręgi do Sejmu" : "Sejm constituencies", path },
      ]}
      title={pl ? "Okręgi do Sejmu" : "Sejm constituencies"}
      lede={
        pl
          ? "Załącznik nr 1 podaje liczbę posłów i siedzibę OKW. Nazwa districtName i lista aktywnych posłów są z API Sejmu odczytanego 18 października 2026 r."
          : "Annex 1 gives the number of deputies and the OKW seat. The districtName field and the active-deputy list are from the Sejm API read on 18 October 2026."
      }
      officeHref="https://pkw.gov.pl/"
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById(["kodeks", "sejm-api-mp", "sejm-api-clubs"])}
    >
      <ul className="mt-6 space-y-2 text-sm">
        {allSejmOkregi().map((okreg) => (
          <li key={okreg.num}>
            <a className="text-navy underline" href={sejmOkregPath(lang, okreg.num)}>
              {pl ? `Okręg nr ${okreg.num}` : `Constituency ${okreg.num}`}
            </a>
            {` — ${okreg.districtName} — ${okreg.voivodeship} — ${okreg.seats}`}
          </li>
        ))}
      </ul>
    </PolandFrame>
  );
}
