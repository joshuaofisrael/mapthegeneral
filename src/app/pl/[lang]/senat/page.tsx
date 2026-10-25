import { notFound } from "next/navigation";
import { PolandFrame } from "../../frame";
import { allSenatOkregi, senatIndexPath, senatOkregPath, senatorLabel } from "../../../../../data/pl/level2";
import { voivodeshipBySlug } from "../../../../../data/pl/places";
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
  const path = senatIndexPath(lang);
  return polandMetadata({
    title: lang === "pl" ? "Okręgi do Senatu" : "Senate constituencies",
    description:
      lang === "pl"
        ? "100 okręgów do Senatu. Senatorowie z tabeli senat.gov.pl odczytanej 18 października 2026 r. Informacja nieoficjalna."
        : "100 Senate constituencies. Senators from the senat.gov.pl table read on 18 October 2026. Unofficial information.",
    path,
    lang,
    alternatePath: senatIndexPath(lang === "pl" ? "en" : "pl"),
  });
}

export default async function SenatIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const pl = lang === "pl";
  const path = senatIndexPath(lang);
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: pl ? "Okręgi do Senatu" : "Senate constituencies", path },
      ]}
      title={pl ? "Okręgi do Senatu" : "Senate constituencies"}
      lede={
        pl
          ? "Każdy wiersz prowadzi do strony okręgu. Nazwisko jest komórką tabeli Senatu. Okręg nr 20 ma wybory uzupełniające 22 listopada 2026 r."
          : "Each row leads to a constituency page. The name is the Senate table cell. Constituency 20 has a by-election on 22 November 2026."
      }
      officeHref="https://pkw.gov.pl/"
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById([
        "senate-okregi",
        "kodeks",
        "pkw-senat-20-2026",
        "postanowienie-senat-20-2026",
        "pkw-senat-20-kalendarz",
        "pkw-senat-20-obwieszczenia",
      ])}
    >
      <ul className="mt-6 space-y-2 text-sm">
        {allSenatOkregi().map((okreg) => {
          const voj = voivodeshipBySlug(okreg.voivodeshipSlug);
          return (
            <li key={okreg.num}>
              <a className="text-navy underline" href={senatOkregPath(lang, okreg.num)}>
                {pl ? `Okręg nr ${okreg.num}` : `Constituency ${okreg.num}`}
              </a>
              {` — ${senatorLabel(okreg, lang)} — ${voj?.name ?? okreg.voivodeshipSlug}`}
            </li>
          );
        })}
      </ul>
    </PolandFrame>
  );
}
