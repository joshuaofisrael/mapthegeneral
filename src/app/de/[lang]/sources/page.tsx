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
        ? "Amtliche Seiten, die für die Deutschland-Ausgabe am 17. und 18. Oktober 2026 gelesen wurden."
        : "Official pages read for the Germany release on 17 and 18 October 2026.",
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
          ? "Die Kopfzeilen der Dateien zu Wahlkreisnamen, kerg2 und den Gewählten nennen die Datenlizenz Deutschland – Namensnennung – Version 2.0. Quellenvermerk: Die Bundeswahlleiterin, Wiesbaden 2024 (Wahlkreisnamen) bzw. 2025 (Ergebnisdateien); "
          : "The headers of the constituency-name file, kerg2, and the elected-members file name the Data licence Germany – attribution – version 2.0. Source note: the Federal Returning Officer, Wiesbaden 2024 (constituency names) and 2025 (result files); "}
        <a className="underline" href="https://www.govdata.de/dl-de/by-2-0">
          dl-de/by-2-0
        </a>
        {de
          ? ". Die Datei der Wahlkreisnamen druckt „(c) Der Bundeswahlleiterin, Wiesbaden 2024“. Aus der Datei der Gewählten werden Anschrift, Geburtsjahr, Geschlecht, Beruf und Geburtsort nicht übernommen."
          : ". The constituency-name file prints “(c) Der Bundeswahlleiterin, Wiesbaden 2024”. Address, year of birth, sex, occupation, and place of birth from the elected-members file are not reprinted."}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {de
          ? "GV100AD: Die Hinweise.txt im Zip, Erscheinungsmonat August 2026, sagt: „(c) Daten (im Auftrag der Herausgebergemeinschaft Statistische Ämter des Bundes und der Länder) Statistisches Bundesamt (Destatis), 2026. Vervielfältigung und Verbreitung, auch auszugsweise, mit Quellenangabe gestattet.“ Diese Hinweise nennen nicht den Namen dl-de/by-2-0. Die Kreisbevölkerung ist die Summe des Feldes Bevölkerung, insgesamt der Gemeinden mit demselben Kreisschlüssel. Die Satzart 40 druckt diese Summe nicht."
          : "GV100AD: Hinweise.txt in the zip, edition month August 2026, says reproduction and distribution, including excerpts, are permitted with a source attribution, copyright the Federal Statistical Office (Destatis), 2026, on behalf of the joint publishers of the statistical offices of the Federation and the Länder. Those notes do not print the name dl-de/by-2-0. A Kreis population on this site is the sum of the field Bevölkerung, insgesamt for municipalities with that Kreis key. The Satzart-40 row does not print that sum."}
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {de
          ? "Gesetze, Verordnungen, amtliche Erlasse und Bekanntmachungen genießen nach § 5 Absatz 1 des Urheberrechtsgesetzes keinen urheberrechtlichen Schutz. Bilder, Logos und Wappen werden nicht übernommen. § 1 des Bundesdatenschutzgesetzes, am selben Tag gelesen, bestimmt den Anwendungsbereich und nennt die Verordnung (EU) 2016/679. Die Wahlkreisseiten übernehmen aus der Datei der Gewählten den Namen in der öffentlichen Funktion und die Partei und lassen Anschrift, Geburtsjahr, Geschlecht, Beruf und Geburtsort weg."
          : "Under section 5(1) of the Copyright Act (UrhG), statutes, ordinances, official decrees, and official notices have no copyright protection. No images, logos, or coats of arms are reproduced. Section 1 of the Federal Data Protection Act, read the same day, sets that Act’s scope and names Regulation (EU) 2016/679. Constituency pages reprint the public-role name and party from the elected-members file and leave out address, year of birth, sex, occupation, and place of birth."}
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">{de ? "Schweigen am Wahltag" : "Election-day silence"}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {de
          ? "§ 32 Absatz 2 des Bundeswahlgesetzes, gelesen am 18. Oktober 2026, untersagt die Veröffentlichung von Ergebnissen von Wählerbefragungen nach der Stimmabgabe über den Inhalt der Wahlentscheidung vor Ablauf der Wahlzeit. § 49a nennt das eine Ordnungswidrigkeit. Diese Ausgabe veröffentlicht keine Umfragen und keine Hochrechnungen. Die Zahlen zur Bundestagswahl 2025 sind das festgestellte endgültige Ergebnis. Die Seite „Künftige Wahltermine“ der Bundeswahlleiterin nennt keinen Wahltag vor dem 18. April 2027 und versieht Angaben zu Landtags- und Kommunalwahlen mit dem Zusatz ohne Gewähr. Das Bayerische Landesamt für Statistik führt für den 25. Oktober 2026 eine Bürgermeister-Stichwahl in Oberaurach und eine Gemeinderatswahl in Bachhagel. Das Hessische Statistische Landesamt führt Direktwahlen ab dem 1. November 2026, darunter die Landratswahl im Schwalm-Eder-Kreis am 8. November 2026. Bewerbungen, Umfragen und Ergebnisse dieser Wahlen stehen hier nicht."
          : "Section 32(2) of the Federal Elections Act, read on 18 October 2026, forbids publishing results of voter surveys taken after the ballot, about the content of the vote, before polling hours end. Section 49a calls that an administrative offence. This release publishes no polls and no projections. The 2025 Bundestag figures are the final result already established. The Federal Returning Officer’s page of future election dates lists no polling day before 18 April 2027 and marks Landtag and local dates as given without guarantee. The Bavarian statistical office lists, for 25 October 2026, a mayoral runoff in Oberaurach and a municipal-council election in Bachhagel. The Hessian statistical office lists direct elections from 1 November 2026, including the Landrat election in the Schwalm-Eder-Kreis on 8 November 2026. Candidacies, polls, and results of those elections are not published here."}
      </p>
    </GermanyFrame>
  );
}
