import Link from "next/link";
import { notFound } from "next/navigation";
import { PolandFrame } from "../../frame";
import { senatOkregPath } from "../../../../../data/pl/level2";
import { sourceById } from "../../../../../data/pl/sources";
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
  const path = `${polandHome(lang)}elections/`;
  return polandMetadata({
    title: lang === "pl" ? "Wybory w Polsce" : "Elections in Poland",
    description:
      lang === "pl"
        ? "Indeks wyborów na stronach Polski. Wybory uzupełniające do Senatu w okręgu nr 20: 22 listopada 2026 r. Okno wyborów do Sejmu i Senatu: 14 października–12 listopada 2027 r."
        : "Index of elections on the Poland pages. Senate by-election in constituency 20: 22 November 2026. Sejm and Senate window: 14 October–12 November 2027.",
    path,
    lang,
    alternatePath: `${polandHome(lang === "pl" ? "en" : "pl")}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${polandHome(lang)}elections/`;
  const pl = lang === "pl";
  const pkw = sourceById("pkw");
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        pl
          ? "Najbliższy dzień w odczytanym serwisie PKW to 22 listopada 2026 r., wybory uzupełniające do Senatu w okręgu nr 20. Okno wyborów do Sejmu i Senatu to 14 października–12 listopada 2027 r."
          : "The nearest day on the Commission service read for this page is 22 November 2026, a Senate by-election in constituency 20. The Sejm and Senate window is 14 October–12 November 2027."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={[
        pkw,
        sourceById("constitution"),
        sourceById("kodeks"),
        sourceById("pkw-senat-20-2026"),
        sourceById("pkw-senat-20-kalendarz"),
        sourceById("pkw-senat-20-obwieszczenia"),
      ]}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}senat-20-2026/`}>
            {pl ? "Senat, okręg nr 20, 22 listopada 2026" : "Senate, constituency 20, 22 November 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {pl
              ? "Postanowienie Prezydenta z 25 września 2026 r. i serwis PKW odczytany 25 października 2026 r. Kalendarz wyborczy każe ogłosić obwieszczenie o zarejestrowanych kandydatach do 12 listopada 2026 r. Ta strona nie podaje sondaży ani prognoz."
              : "Presidential order of 25 September 2026 and the Commission service read on 25 October 2026. The election calendar requires the notice of registered candidates by 12 November 2026. This page prints no polls or projections."}{" "}
            <a className="text-navy underline" href={senatOkregPath(lang, 20)}>
              {pl ? "Strona okręgu" : "Constituency page"}
            </a>
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}sejm-senat-2027/`}>
            {pl ? "Sejm i Senat, 14 października–12 listopada 2027" : "Sejm and Senate, 14 October–12 November 2027"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {pl ? "Artykuł 98 ust. 2 Konstytucji. Dnia jeszcze nie wyznaczono w odczytanym postanowieniu." : "Article 98(2) of the Constitution. No order read for this release sets the day."}
          </p>
        </li>
      </ul>
    </PolandFrame>
  );
}
