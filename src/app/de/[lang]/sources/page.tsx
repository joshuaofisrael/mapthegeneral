import { GermanyFrame } from "@/app/de/frame";
import { SOURCES, sourceById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  DE_LANGS,
  germanyChooser,
  germanyHome,
  otherLang,
  sourcesPath,
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
  const path = sourcesPath(lang);
  return dePageMetadata({
    title: lang === "de" ? "Quellen" : "Sources",
    description:
      lang === "de"
        ? "Amtliche Seiten, die für die Deutschland-Ausgabe am 17. Oktober 2026 gelesen wurden."
        : "Official pages read for the Germany release on 17 October 2026.",
    path,
    lang,
    alternatePath: sourcesPath(otherLang(lang)),
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = sourcesPath(lang);
  const office = sourceById("bwl-home");
  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        de
          ? "Jede Seite dieser Ausgabe hängt an einer dieser Lesungen. Was dort nicht stand, ist als Lücke markiert."
          : "Every page in this release hangs on one of these readings. What was not there is marked as a gap."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={SOURCES}
    >
      <p className="text-sm leading-6 text-ink-muted">
        {de
          ? "Parlament und Regierung eines Landes sind auf der Länderseite verlinkt. Aus diesen Auftritten wurden keine Namen und keine Sitzzahlen übernommen."
          : "Each Land’s parliament and government are linked from that Land’s page. No names and no seat totals were copied from those sites."}
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">{de ? "Lizenzen und Quellenvermerk" : "Licences and attribution"}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {de
          ? "Daten der Bundeswahlleiterin und des Statistischen Bundesamtes (Destatis): © Die Bundeswahlleiterin bzw. © Statistisches Bundesamt (Destatis), Wiesbaden 2026, genutzt unter der "
          : "Data from the Federal Returning Officer and the Federal Statistical Office (Destatis): © Die Bundeswahlleiterin and © Statistisches Bundesamt (Destatis), Wiesbaden 2026, used under the "}
        <a className="underline" href="https://www.govdata.de/dl-de/by-2-0">
          {de ? "Datenlizenz Deutschland – Namensnennung – Version 2.0" : "Data licence Germany – attribution – version 2.0"}
        </a>
        {de
          ? ". Gesetze, Verordnungen und amtliche Bekanntmachungen sind nach § 5 des Urheberrechtsgesetzes gemeinfrei. Fakten aus den übrigen amtlichen Quellen sind mit eigenen Worten wiedergegeben und je Seite belegt. Bilder, Logos und Wappen werden nicht übernommen."
          : ". Statutes, ordinances and official notices are in the public domain under section 5 of the Copyright Act (UrhG). Facts from the other official sources are given in our own words and cited on each page. No images, logos or coats of arms are reproduced."}
      </p>
    </GermanyFrame>
  );
}
