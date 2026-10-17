import Link from "@/components/AnchorLink";
import { GermanyFrame } from "@/app/de/frame";
import { alphaLands } from "@/data/de/lands";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  BUNDESTAG_2029_SLUG,
  DE_LANGS,
  bundestag2029Path,
  electionsPath,
  germanyChooser,
  germanyHome,
  landPath,
  otherLang,
} from "@/data/de/paths";
import type { DeLang } from "@/data/de/types";
import { notFound } from "next/navigation";

function asDeLang(value: string): DeLang {
  if (value !== "de" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return DE_LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const path = electionsPath(lang);
  return dePageMetadata({
    title: lang === "de" ? "Wahlen in Deutschland" : "Elections in Germany",
    description:
      lang === "de"
        ? "Index der Wahlen auf den Deutschland-Seiten. Die nächste Bundestagswahl hat noch keinen festgesetzten Tag."
        : "Index of elections on the Germany pages. The next Bundestag election does not yet have a set day.",
    path,
    lang,
    alternatePath: electionsPath(otherLang(lang)),
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = electionsPath(lang);
  const office = sourceById("bwl-2029");
  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        de
          ? "Diese Ausgabe veröffentlicht die Wahl zum 22. Deutschen Bundestag. Die Landtagstermine stehen auf den Länderseiten, mit dem Wortlaut der Bundesratstabelle."
          : "This release publishes the election of the 22nd German Bundestag. Land election dates are on the Land pages, in the words of the Bundesrat table."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById(["bwl-2029", "gg-39", "bundesrat-landtag"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}${BUNDESTAG_2029_SLUG}/`}>
            {de ? "Wahl zum 22. Deutschen Bundestag, 2029" : "Election of the 22nd German Bundestag, 2029"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {de
              ? "Rahmen: 26. Januar 2029 bis 25. März 2029. Kein festgesetzter Tag."
              : "Window: 26 January 2029 to 25 March 2029. No day has been set."}
          </p>
        </li>
      </ul>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{de ? "Länder" : "Länder"}</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2">
          {alphaLands().map((land) => (
            <li key={land.slug} className="mb-1">
              <Link className="text-navy underline" href={landPath(lang, land.slug)}>
                {land.name}
              </Link>
              <span className="text-ink-muted"> — {land.nextLabel}</span>
            </li>
          ))}
        </ul>
      </section>
      <p className="text-sm">
        <Link className="text-navy underline" href={bundestag2029Path(lang)}>
          {de ? "Zur Wahlseite" : "Election page"}
        </Link>
      </p>
    </GermanyFrame>
  );
}
