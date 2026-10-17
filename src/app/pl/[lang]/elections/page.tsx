import Link from "next/link";
import { notFound } from "next/navigation";
import { PolandFrame } from "../../frame";
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
        ? "Indeks wyborów na stronach Polski. Najbliższe wybory do Sejmu i Senatu mieszczą się w oknie od 14 października do 12 listopada 2027 r."
        : "Index of elections on the Poland pages. The next Sejm and Senate election falls in the window from 14 October to 12 November 2027.",
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
          ? "To wydanie publikuje wybory do Sejmu i Senatu w oknie konstytucyjnym 2027 r. Nie jest kalendarzem wszystkich przyszłych wyborów samorządowych."
          : "This release publishes the Sejm and Senate election inside the 2027 constitutional window. It is not a calendar of every future local election."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={[pkw, sourceById("constitution"), sourceById("kodeks")]}
    >
      <ul className="space-y-3">
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
