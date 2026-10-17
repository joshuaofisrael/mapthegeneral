import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { GermanyFrame } from "@/app/de/frame";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  BUNDESTAG_2029_SLUG,
  DE_LANGS,
  electionsPath,
  germanyChooser,
  germanyHome,
  otherLang,
  resultsPath,
} from "@/data/de/paths";
import type { DeLang } from "@/data/de/types";
import { notFound } from "next/navigation";

function asDeLang(value: string): DeLang {
  if (value !== "de" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return DE_LANGS.map((lang) => ({ lang, slug: BUNDESTAG_2029_SLUG }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asDeLang(raw);
  if (slug !== BUNDESTAG_2029_SLUG) return {};
  const path = `${electionsPath(lang)}${BUNDESTAG_2029_SLUG}/`;
  return dePageMetadata({
    title: lang === "de" ? "Wahl zum 22. Deutschen Bundestag 2029" : "Election of the 22nd German Bundestag, 2029",
    description:
      lang === "de"
        ? "Gesetzlicher Rahmen der nächsten Bundestagswahl: 26. Januar 2029 bis 25. März 2029. Ein Wahltag ist nicht festgesetzt. Keine amtliche Information."
        : "Legal window for the next Bundestag election: 26 January 2029 to 25 March 2029. No polling day is set. Unofficial information.",
    path,
    lang,
    alternatePath: `${electionsPath(otherLang(lang))}${BUNDESTAG_2029_SLUG}/`,
  });
}

export default async function Bundestag2029Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = asDeLang(raw);
  if (slug !== BUNDESTAG_2029_SLUG) notFound();
  const copy = ui(lang);
  const de = lang === "de";
  const path = `${electionsPath(lang)}${BUNDESTAG_2029_SLUG}/`;
  const office = sourceById("bwl-2029");

  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.elections, path: electionsPath(lang) },
        { name: "2029", path },
      ]}
      eyebrow={de ? "Kein festgesetzter Wahltag" : "No polling day set"}
      title={de ? "Wahl zum 22. Deutschen Bundestag 2029" : "Election of the 22nd German Bundestag, 2029"}
      lede={
        de
          ? "Die Seite der Bundeswahlleiterin beschreibt den Zeitrahmen. Sie nennt keinen Sonntag, an dem gewählt wird."
          : "The Federal Returning Officer’s page describes the time window. It does not name a Sunday on which the election will be held."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById(["bwl-2029", "gg-39", "bwahlg-1", "bundestag-termine"])}
    >
      <section className="prose-legal">
        <h2>{de ? "Was die Bundeswahlleiterin schreibt" : "What the Federal Returning Officer writes"}</h2>
        <ul>
          <li>
            {de
              ? "Artikel 39 Absatz 1 des Grundgesetzes gibt den Zeitrahmen vor. Eine Neuwahl findet frühestens 46 und spätestens 48 Monate nach Beginn der laufenden Wahlperiode statt."
              : "Article 39(1) of the Basic Law sets the time frame. A new election takes place at the earliest 46 months and at the latest 48 months after the current electoral term begins."}
          </li>
          <li>
            {de
              ? "Die Wahlperiode des 21. Deutschen Bundestages hat mit der konstituierenden Sitzung am 25. März 2025 begonnen."
              : "The electoral term of the 21st German Bundestag began with its constitutive sitting on 25 March 2025."}
          </li>
          <li>
            {de
              ? "Der Wahltermin muss innerhalb der Zeitspanne von Freitag, dem 26. Januar 2029, und Sonntag, dem 25. März 2029, liegen."
              : "The polling day must fall in the span from Friday 26 January 2029 to Sunday 25 March 2029."}
          </li>
          <li>
            {de
              ? "Der Wahltag muss ein Sonntag oder gesetzlicher Feiertag sein (§ 16 Bundeswahlgesetz)."
              : "The polling day must be a Sunday or a statutory public holiday (§ 16 of the Federal Elections Act)."}
          </li>
          <li>
            {de
              ? "Bei einer Auflösung des Bundestages findet die Neuwahl innerhalb von 60 Tagen statt. Eine solche Auflösung ist auf der gelesenen Seite nicht mitgeteilt."
              : "If the Bundestag is dissolved, the new election takes place within 60 days. The page that was read does not report such a dissolution."}
          </li>
          <li>
            {de
              ? "Wahlen der Bewerberinnen und Bewerber dürfen frühestens 32 Monate nach Beginn der Wahlperiode stattfinden, ab dem 26. November 2027 (§ 21 Absatz 3 Satz 4 Bundeswahlgesetz, so zitiert)."
              : "Elections of the candidates themselves may be held at the earliest 32 months after the term begins, from 26 November 2027 (§ 21(3), fourth sentence, of the Federal Elections Act, as cited)."}
          </li>
        </ul>
        <p>
          <a href={office.url} rel="noopener noreferrer">
            {de ? "Seite der Bundeswahlleiterin" : "Federal Returning Officer’s page"}
          </a>
        </p>
        <h2>{de ? "Grundgesetz, Artikel 39 Absatz 1" : "Basic Law, article 39(1)"}</h2>
        <p>
          {de
            ? "Der gelesene Gesetzestext sagt: Der Bundestag wird vorbehaltlich der nachfolgenden Bestimmungen auf vier Jahre gewählt. Seine Wahlperiode endet mit dem Zusammentritt eines neuen Bundestages. Die Neuwahl findet frühestens sechsundvierzig, spätestens achtundvierzig Monate nach Beginn der Wahlperiode statt. Im Falle einer Auflösung des Bundestages findet die Neuwahl innerhalb von sechzig Tagen statt."
            : "The statutory text that was read says: subject to the following provisions, the Bundestag is elected for four years. Its electoral term ends when a new Bundestag convenes. The new election takes place at the earliest forty-six and at the latest forty-eight months after the term begins. If the Bundestag is dissolved, the new election takes place within sixty days."}
        </p>
        <h2>{de ? "Kalender des Bundestages" : "Bundestag calendar"}</h2>
        <p>
          {de
            ? "Die Seite „Wahltermine in Deutschland“ setzt unter 2029 in die Zeile Bundestag das Wort „Frühjahr“ und den Turnus „4 Jahre“, für alle Bundesländer. Sie nennt dort keinen Tag im Januar, Februar oder März."
            : "The page “Wahltermine in Deutschland” puts “Frühjahr” (spring) and a four-year turnus in the 2029 Bundestag row, for all Länder. It does not name a day in January, February, or March."}
        </p>
      </section>
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={resultsPath(lang)}>
          {de ? "Endgültiges Ergebnis von 2025" : "Final result of 2025"}
        </Link>
      </p>
    </GermanyFrame>
  );
}
