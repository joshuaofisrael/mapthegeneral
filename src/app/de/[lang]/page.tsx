import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { GermanyFrame } from "@/app/de/frame";
import { formatNumber } from "@/data/de/format";
import { alphaLands } from "@/data/de/lands";
import { KREIS_COUNT_2026_09_30, MUNICIPALITY_COUNT_2026_09_30, POPULATION_2025_12_31 } from "@/data/de/result";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  bundestag2029Path,
  electionsPath,
  faqPath,
  germanyChooser,
  germanyHome,
  kreiseIndexPath,
  landPath,
  otherLang,
  wahlkreiseIndexPath,
  partiesPath,
  resultsPath,
  sourcesPath,
  DE_LANGS,
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
  const path = germanyHome(lang);
  return dePageMetadata({
    title: lang === "de" ? "Deutschland" : "Germany",
    description:
      lang === "de"
        ? "Deutschland: Bundestagswahl 2029, Ergebnis von 2025 und 16 Länder. Keine amtliche Information."
        : "Germany: the 2029 Bundestag election window, the 2025 result, and 16 Länder. Unofficial information.",
    path,
    lang,
    alternatePath: germanyHome(otherLang(lang)),
  });
}

export default async function GermanyNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = germanyHome(lang);
  const office = sourceById("bwl-2029");
  const lands = alphaLands();

  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path },
      ]}
      eyebrow={de ? "Wahl zum 22. Deutschen Bundestag" : "Election of the 22nd German Bundestag"}
      title={de ? "Deutschland" : "Germany"}
      lede={
        de
          ? "Die Bundeswahlleiterin setzt auf der Seite zur Wahl 2029 noch keinen Wahltag. Der Rahmen aus Artikel 39 Absatz 1 des Grundgesetzes liegt, nach dieser Seite, zwischen Freitag, dem 26. Januar 2029, und Sonntag, dem 25. März 2029."
          : "The Federal Returning Officer’s page on the 2029 election does not set a polling day. Under article 39(1) of the Basic Law, that page places the day between Friday 26 January 2029 and Sunday 25 March 2029."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById([
        "bwl-2029",
        "bwl-2025-result",
        "bwahlg-1",
        "gg-39",
        "bundesrat-landtag",
        "bundeskanzler",
        "bundespraesident",
        "destatis-pop",
        "destatis-gv",
        "bundestag-termine",
      ])}
    >
      <section className="prose-legal">
        <h2>{de ? "Nächste Bundestagswahl" : "Next Bundestag election"}</h2>
        <p>
          {de
            ? "Die Seite der Bundeswahlleiterin sagt: die Wahlperiode des 21. Deutschen Bundestages hat mit der konstituierenden Sitzung am 25. März 2025 begonnen. Eine Neuwahl findet frühestens 46 und spätestens 48 Monate nach Beginn der Wahlperiode statt. Der Wahltag muss ein Sonntag oder gesetzlicher Feiertag sein (§ 16 Bundeswahlgesetz, so zitiert auf dieser Seite). Ein Beschluss, der einen bestimmten Tag festsetzt, stand dort am 17. Oktober 2026 nicht."
            : "The Federal Returning Officer’s page says the electoral term of the 21st German Bundestag began with the constitutive sitting on 25 March 2025. A new election takes place at the earliest 46 months and at the latest 48 months after the term begins. The polling day must be a Sunday or a statutory public holiday (§ 16 of the Federal Elections Act, as cited on that page). No decision setting one day was on that page on 17 October 2026."}
        </p>
        <p>
          <Link className="text-navy underline" href={bundestag2029Path(lang)}>
            {de ? "Seite dieser Wahl" : "Page for this election"}
          </Link>
        </p>
        <h2>{de ? "Bundestag" : "Bundestag"}</h2>
        <p>
          {de
            ? "§ 1 Absatz 1 des Bundeswahlgesetzes sagt, dass der Deutsche Bundestag aus 630 Abgeordneten besteht. Absatz 2 sagt, dass jede Wählerin und jeder Wähler zwei Stimmen hat: eine Erststimme für die Wahl nach Kreiswahlvorschlägen und eine Zweitstimme für die Wahl nach Landeslisten. Absatz 3 nennt 299 Wahlkreise. Die Pressemitteilung Nr. 29/25 sagt, dass der am 23. Februar 2025 gewählte Bundestag nach diesem Absatz aus 630 Abgeordneten besteht."
            : "Section 1(1) of the Federal Elections Act says the German Bundestag consists of 630 members. Subsection 2 says each voter has two votes: a first vote for a constituency nomination and a second vote for a Land list. Subsection 3 names 299 constituencies. Press release 29/25 says the Bundestag elected on 23 February 2025 consists of 630 members under that subsection."}
        </p>
        <h2>{de ? "Amtsträgerinnen und Amtsträger des Bundes" : "Federal officeholders"}</h2>
        <p>
          {de
            ? "Die Seite der Bundesregierung „Friedrich Merz: Bundeskanzler“, gelesen am 17. Oktober 2026, sagt: „Friedrich Merz ist Bundeskanzler der Bundesrepublik Deutschland“ und im Lebenslauf „Seit dem 6. Mai 2025 Bundeskanzler der Bundesrepublik Deutschland“."
            : "The Federal Government page “Friedrich Merz: Bundeskanzler”, read on 17 October 2026, says “Friedrich Merz ist Bundeskanzler der Bundesrepublik Deutschland” and, in the biography, “Seit dem 6. Mai 2025 Bundeskanzler der Bundesrepublik Deutschland”."}
        </p>
        <p>
          {de
            ? "Die Startseite des Bundespräsidenten, gelesen am selben Tag, nennt Frank-Walter Steinmeier als Bundespräsidenten. Diese Seite übernimmt daraus kein Wahl- oder Amtszeitdatum."
            : "The Federal President’s homepage, read the same day, names Frank-Walter Steinmeier as Bundespräsident. This page does not copy an election date or a term date from it."}
        </p>
        <GapNote
          label={copy.gap}
          text={
            de
              ? "Der Name der Präsidentin oder des Präsidenten des Deutschen Bundestages und die Namen der Mitglieder der Bundesregierung außer dem Bundeskanzler stehen hier nicht."
              : "The name of the President of the German Bundestag, and the names of members of the Federal Government other than the Federal Chancellor, are not copied here."
          }
        />
        <h2>{de ? "Bundesversammlung" : "Federal Convention"}</h2>
        <p>
          {de
            ? "Die Seite „Wahltermine in Deutschland“ des Deutschen Bundestages führt unter 2027 den 30. Januar, Deutschland, Bundesversammlung, Turnus 5 Jahre. Ein Einberufungsbeschluss über diese Zeile hinaus wurde am 17. Oktober 2026 nicht gelesen."
            : "The German Bundestag’s page “Wahltermine in Deutschland” lists, under 2027, 30 January, Germany, Federal Convention, turnus 5 years. A convening decision beyond that row was not read on 17 October 2026."}
        </p>
        <h2>{copy.population}</h2>
        <p>
          {de
            ? `Die Destatis-Tabelle „Bevölkerung nach Nationalität und Geschlecht (Quartalszahlen)“, Stand 16. Juni 2026, druckt für den 31. Dezember 2025 die Zahl ${formatNumber(POPULATION_2025_12_31, lang)}. Die Quelle der Tabelle ist die Bevölkerungsfortschreibung auf Grundlage des Zensus 2022.`
            : `The Destatis table “Bevölkerung nach Nationalität und Geschlecht (Quartalszahlen)”, as of 16 June 2026, prints ${formatNumber(POPULATION_2025_12_31, lang)} for 31 December 2025. The table’s source line is the population update based on the 2022 census.`}
        </p>
        <h2>{de ? "Länder" : "Länder"}</h2>
        <p>
          {de
            ? "Die nächste Landtagswahl jedes Landes steht so, wie der Bundesrat sie am 21. September 2026 in der Tabelle „Termine der Landtagswahlen“ druckt. Fünf Felder sind Kalendertage im Jahr 2027: Saarland und Schleswig-Holstein am 18. April, Nordrhein-Westfalen am 25. April, Bremen am 30. Mai, Niedersachsen am 26. September. Die übrigen Felder beginnen mit „voraussichtlich“. Diese Seite macht daraus keinen Tag."
            : "Each Land’s next parliamentary election is printed as the Bundesrat printed it on 21 September 2026 in the table “Termine der Landtagswahlen”. Five cells are calendar days in 2027: Saarland and Schleswig-Holstein on 18 April, North Rhine-Westphalia on 25 April, Bremen on 30 May, and Lower Saxony on 26 September. The other cells begin with “voraussichtlich”. This page does not turn those words into a day."}
        </p>
        <p>
          {de
            ? `Die Destatis-Tabelle „Verwaltungsgliederung“, Gebietsstand 30. September 2026, druckt für Deutschland ${formatNumber(MUNICIPALITY_COUNT_2026_09_30, lang)} Gemeinden und ${formatNumber(KREIS_COUNT_2026_09_30, lang)} Kreise. Fußnote 3 sagt: ohne unbewohnte gemeindefreie Gebiete, einschließlich Städte. Seiten für die Kreise und für die 299 Bundestagswahlkreise sind verlinkt. Seiten für die Gemeinden sind in dieser Ausgabe nicht dabei.`
            : `The Destatis table “Verwaltungsgliederung”, territorial status 30 September 2026, prints ${formatNumber(MUNICIPALITY_COUNT_2026_09_30, lang)} municipalities and ${formatNumber(KREIS_COUNT_2026_09_30, lang)} Kreise for Germany. Footnote 3 says: excluding uninhabited unincorporated areas, including cities. Pages for the Kreise and for the 299 Bundestag constituencies are linked. Municipality pages are not in this release.`}
        </p>
        <GapNote label={copy.gap} text={copy.localGap} />
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={electionsPath(lang)}>
          {copy.elections}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={resultsPath(lang)}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={partiesPath(lang)}>
          {copy.parties}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={faqPath(lang)}>
          {copy.faq}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={sourcesPath(lang)}>
          {copy.sources}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={kreiseIndexPath(lang)}>
          {copy.kreiseHeading}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={wahlkreiseIndexPath(lang)}>
          {copy.wahlkreiseHeading}
        </Link>
      </p>

      <LinkGrid
        heading={copy.lands}
        items={lands.map((land) => ({
          href: landPath(lang, land.slug),
          title: land.name,
          detail: land.nextLabel,
        }))}
      />
    </GermanyFrame>
  );
}
