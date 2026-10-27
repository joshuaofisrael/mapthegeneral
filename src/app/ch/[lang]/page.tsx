import Link from "@/components/AnchorLink";
import { CountryGuide } from "@/components/CountryGuide";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { ChFrame } from "../frame";
import { chMetadata } from "../meta";
import { asChLang } from "../lang";
import { CantonSeatTable } from "../SeatTable";
import {
  CANTONS,
  COUNCIL_OF_STATES_SEATS,
  MUNICIPALITY_COUNT,
  NATIONAL_COUNCIL_SEATS,
  POPULATION_2024,
  alphaCantons,
} from "../../../../data/ch/cantons";
import { COMMUNE_CANTONS } from "../../../../data/ch/communes";
import { districtsForCanton } from "../../../../data/ch/districts";
import { cantonPath, chHome, districtsIndexPath, electionPath } from "../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../data/ch/sources";
import { formatNumber, ui } from "../../../../data/ch/ui";
import type { ChLang } from "../../../../data/ch/types";

const OFFICE = sourceById("bk-nationalrat");

const FEDERAL_COUNCIL = [
  "Guy Parmelin (SVP/VD), Bundespräsident 2026, Bundesrat seit 2016, Vorsteher des Eidgenössischen Departements für Wirtschaft, Bildung und Forschung (WBF) seit 2019",
  "Ignazio Cassis (FDP/TI), Vizepräsident des Bundesrates 2026, Bundesrat seit 2017, Vorsteher des Eidgenössischen Departements für auswärtige Angelegenheiten (EDA)",
  "Karin Keller-Sutter (FDP/SG), Bundesrätin seit 2019, Vorsteherin des Eidgenössischen Finanzdepartements (EFD) seit 2023",
  "Albert Rösti (SVP/BE), Bundesrat seit 2023, Vorsteher des Eidgenössischen Departements für Umwelt, Verkehr, Energie und Kommunikation (UVEK)",
  "Elisabeth Baume-Schneider (SP/JU), Bundesrätin seit 2023, Vorsteherin des Eidgenössischen Departements des Innern (EDI) seit 2024",
  "Beat Jans (SP/BS), Bundesrat seit 2024, Vorsteher des Eidgenössischen Justiz- und Polizeidepartements (EJPD)",
  "Martin Pfister (Mitte/ZG), Bundesrat seit 2025, Vorsteher des Eidgenössischen Departements für Verteidigung, Bevölkerungsschutz und Sport (VBS)",
] as const;

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const title = ui(lang).switzerland;
  const description =
    lang === "de"
      ? "Schweiz: Nationalratswahlen vom 24. Oktober 2027, Bundesrat, 26 Kantone. Inoffizielle Information."
      : lang === "fr"
        ? "Suisse : élection du Conseil national du 24 octobre 2027, Conseil fédéral, 26 cantons. Information non officielle."
        : lang === "it"
          ? "Svizzera: elezione del Consiglio nazionale del 24 ottobre 2027, Consiglio federale, 26 cantoni. Informazione non ufficiale."
          : "Switzerland: National Council election of 24 October 2027, Federal Council, and 26 cantons. Unofficial information.";
  return chMetadata({ title, description, path: chHome(lang), lang });
}

function lede(lang: ChLang): string {
  if (lang === "de") {
    return "Die Medienmitteilung des Bundesrates vom 27. August 2025 nennt die Nationalratswahlen vom 24. Oktober 2027. Die Sitze dieser Erneuerung stehen in der Verordnung vom selben Tag.";
  }
  if (lang === "fr") {
    return "Le communiqué du Conseil fédéral du 27 août 2025 nomme l’élection du Conseil national du 24 octobre 2027. Les sièges de ce renouvellement figurent dans l’ordonnance du même jour.";
  }
  if (lang === "it") {
    return "Il comunicato del Consiglio federale del 27 agosto 2025 indica l’elezione del Consiglio nazionale del 24 ottobre 2027. I seggi di quel rinnovo stanno nell’ordinanza dello stesso giorno.";
  }
  return "The Federal Council release of 27 August 2025 names the National Council election of 24 October 2027. The seats for that renewal are in the ordinance of the same day.";
}

export default async function SwitzerlandNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = chHome(lang);
  const sources = sourcesById([
    "bv-1999",
    "bbl-2025-2545",
    "sr-161-12",
    "admin-20250827",
    "bbl-2022-2547",
    "parlament-2023",
    "bundesrat-mitglieder",
    "praesidialjahr-2026",
    "bk-nationalrat",
    "agvch",
    "agvch-hist",
    "opendata-hgv",
    "parlament-members",
    "admin-votes",
  ]);

  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path },
      ]}
      eyebrow={
        lang === "de"
          ? "Nationalrat · 24. Oktober 2027"
          : lang === "fr"
            ? "Conseil national · 24 octobre 2027"
            : lang === "it"
              ? "Consiglio nazionale · 24 ottobre 2027"
              : "National Council · 24 October 2027"
      }
      title={copy.switzerland}
      lede={lede(lang)}
      officeHref={OFFICE.url}
      sources={sources}
    >
      <CountryGuide code="ch" lang={lang} />
      <section className="prose-legal">
        <h2>{lang === "de" ? "Bund" : lang === "fr" ? "Confédération" : lang === "it" ? "Confederazione" : "Confederation"}</h2>
        <p>
          {lang === "de"
            ? "Artikel 1 der Bundesverfassung, im Text mit Stand vom 1. Januar 2024, sagt: Das Schweizervolk und die Kantone Zürich, Bern, Luzern, Uri, Schwyz, Obwalden und Nidwalden, Glarus, Zug, Freiburg, Solothurn, Basel-Stadt und Basel-Landschaft, Schaffhausen, Appenzell Ausserrhoden und Appenzell Innerrhoden, St. Gallen, Graubünden, Aargau, Thurgau, Tessin, Waadt, Wallis, Neuenburg, Genf und Jura bilden die Schweizerische Eidgenossenschaft."
            : lang === "fr"
              ? "L’article 1 de la Constitution fédérale, dans le texte allemand en vigueur au 1er janvier 2024, énumère le peuple suisse et les 26 cantons qui forment la Confédération suisse. Les noms de cette page de canton sont ceux du fichier cantonal de l’OFS, pas une retraduction de cet article."
              : lang === "it"
                ? "L’articolo 1 della Costituzione federale, nel testo tedesco in vigore il 1° gennaio 2024, elenca il popolo svizzero e i 26 cantoni che formano la Confederazione Svizzera. I nomi sulle pagine dei cantoni sono quelli del file cantonale dell’UST, non una ritraduzione di quell’articolo."
                : "Article 1 of the Federal Constitution, in the German text in force on 1 January 2024, says the Swiss people and the cantons of Zürich, Bern, Luzern, Uri, Schwyz, Obwalden and Nidwalden, Glarus, Zug, Freiburg, Solothurn, Basel-Stadt and Basel-Landschaft, Schaffhausen, Appenzell Ausserrhoden and Appenzell Innerrhoden, St. Gallen, Graubünden, Aargau, Thurgau, Tessin, Waadt, Wallis, Neuenburg, Genf and Jura form the Swiss Confederation."}
        </p>
        <p>
          {lang === "de"
            ? "Artikel 4 nennt die Landessprachen Deutsch, Französisch, Italienisch und Rätoromanisch. Diese Ausgabe hat Seiten auf Deutsch, Französisch, Italienisch und Englisch. Eine rätoromanische Fassung liegt nicht vor."
            : lang === "fr"
              ? "L’article 4 nomme l’allemand, le français, l’italien et le romanche comme langues nationales. Cette édition a des pages en allemand, en français, en italien et en anglais. Il n’y a pas de version romanche."
              : lang === "it"
                ? "L’articolo 4 indica come lingue nazionali il tedesco, il francese, l’italiano e il romancio. Questa edizione ha pagine in tedesco, francese, italiano e inglese. Non c’è una versione romancia."
                : "Article 4 names German, French, Italian, and Romansh as the national languages. This release has pages in German, French, Italian, and English. There is no Romansh version."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{lang === "de" ? "Bundesversammlung" : lang === "fr" ? "Assemblée fédérale" : lang === "it" ? "Assemblea federale" : "Federal Assembly"}</h2>
        <p>
          {lang === "de"
            ? `Artikel 148: Die Bundesversammlung besteht aus Nationalrat und Ständerat; beide Räte sind einander gleichgestellt. Artikel 149: Der Nationalrat besteht aus ${NATIONAL_COUNCIL_SEATS} Abgeordneten des Volkes. Sie werden vom Volk in direkter Wahl nach dem Grundsatz des Proporzes bestimmt. Alle vier Jahre findet eine Gesamterneuerung statt. Jeder Kanton bildet einen Wahlkreis. Die Sitze werden nach der Bevölkerungszahl verteilt. Jeder Kanton hat mindestens einen Sitz. Artikel 150: Der Ständerat besteht aus ${COUNCIL_OF_STATES_SEATS} Abgeordneten der Kantone. Obwalden, Nidwalden, Basel-Stadt, Basel-Landschaft, Appenzell Ausserrhoden und Appenzell Innerrhoden wählen je eine Person; die übrigen Kantone wählen je zwei. Die Wahl in den Ständerat regelt der Kanton.`
            : lang === "fr"
              ? `Article 148 : l’Assemblée fédérale se compose du Conseil national et du Conseil des États, sur un pied d’égalité. Article 149 : le Conseil national compte ${NATIONAL_COUNCIL_SEATS} députés du peuple, élus directement selon le principe proportionnel, renouvelés intégralement tous les quatre ans. Chaque canton est une circonscription. Les sièges suivent la population et chaque canton en a au moins un. Article 150, dans le texte allemand lu : le Conseil des États compte ${COUNCIL_OF_STATES_SEATS} députés. Obwalden, Nidwalden, Basel-Stadt, Basel-Landschaft, Appenzell Ausserrhoden et Appenzell Innerrhoden en élisent un ; les autres cantons en élisent deux. Le canton règle cette élection.`
              : lang === "it"
                ? `Articolo 148: l’Assemblea federale si compone del Consiglio nazionale e del Consiglio degli Stati, sullo stesso piano. Articolo 149: il Consiglio nazionale conta ${NATIONAL_COUNCIL_SEATS} deputati del popolo, eletti direttamente secondo il principio proporzionale e rinnovati integralmente ogni quattro anni. Ogni cantone è un circondario. I seggi seguono la popolazione e ogni cantone ne ha almeno uno. Articolo 150, nel testo tedesco letto: il Consiglio degli Stati conta ${COUNCIL_OF_STATES_SEATS} deputati. Obwalden, Nidwalden, Basel-Stadt, Basel-Landschaft, Appenzell Ausserrhoden e Appenzell Innerrhoden ne eleggono uno; gli altri cantoni ne eleggono due. Il cantone disciplina l’elezione.`
                : `Article 148: the Federal Assembly consists of the National Council and the Council of States; the two chambers have equal standing. Article 149: the National Council has ${NATIONAL_COUNCIL_SEATS} deputies of the people, elected directly by the people under proportional representation, with a full renewal every four years. Each canton is a constituency. Seats are distributed by population. Every canton has at least one seat. Article 150: the Council of States has ${COUNCIL_OF_STATES_SEATS} deputies of the cantons. Obwalden, Nidwalden, Basel-Stadt, Basel-Landschaft, Appenzell Ausserrhoden and Appenzell Innerrhoden each elect one; the other cantons each elect two. The canton regulates election to the Council of States.`}
        </p>
        <p>
          {lang === "de"
            ? "Die Bundeskanzlei schreibt, dass die Ständeratswahlen nicht vom Bundesrecht geregelt sind und sich nach dem Recht der Kantone richten. Die Seite des Parlaments zu den Wahlen 2023 schreibt, dass 45 Mitglieder des Ständerats gleichzeitig mit dem Nationalrat gewählt werden und dass in Appenzell Innerrhoden die Landsgemeinde die Ständevertretung jeweils im April vor den Nationalratswahlen wählt. Diese Seite setzt daraus kein Datum im April 2027."
            : lang === "fr"
              ? "La Chancellerie fédérale écrit que l’élection du Conseil des États n’est pas réglée par le droit fédéral et suit le droit cantonal. La page du Parlement sur les élections de 2023 écrit que 45 membres du Conseil des États sont élus en même temps que le Conseil national et que, à Appenzell Rhodes-Intérieures, la Landsgemeinde élit la députation en avril avant les élections du Conseil national. Cette page n’en tire pas une date d’avril 2027."
              : lang === "it"
                ? "La Cancelleria federale scrive che l’elezione del Consiglio degli Stati non è retta dal diritto federale e segue il diritto cantonale. La pagina del Parlamento sulle elezioni 2023 scrive che 45 membri del Consiglio degli Stati sono eletti insieme al Consiglio nazionale e che in Appenzell Innerrhoden la Landsgemeinde elegge la deputazione in aprile prima delle elezioni del Consiglio nazionale. Questa pagina non ne ricava una data di aprile 2027."
                : "The Federal Chancellery writes that Council of States elections are not governed by federal law and follow cantonal law. The parliament page on the 2023 elections writes that 45 members of the Council of States are elected at the same time as the National Council, and that in Appenzell Innerrhoden the Landsgemeinde elects its deputy each April before the National Council elections. This page does not turn that sentence into an April 2027 date."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionPath(lang)}>
            {lang === "de"
              ? "Seite der Wahl vom 24. Oktober 2027"
              : lang === "fr"
                ? "Page de l’élection du 24 octobre 2027"
                : lang === "it"
                  ? "Pagina dell’elezione del 24 ottobre 2027"
                  : "Page for the election of 24 October 2027"}
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.nationalCouncil}</h2>
        <div className="prose-legal">
          <p>
            {lang === "de"
              ? `Die Verordnung vom 27. August 2025 legt die Sitzverteilung für die Gesamterneuerung des Nationalrates zur 53. Legislaturperiode fest. Die Summe der 26 Zahlen in Artikel 1 ist ${NATIONAL_COUNCIL_SEATS}. Die Medienmitteilung vom selben Tag sagt, dass Luzern und Freiburg je einen Sitz mehr erhalten als bisher (neu 10 bzw. 8) und Bern und Graubünden je einen Sitz weniger (neu 23 bzw. 4). Für die anderen Kantone nennt die Mitteilung keine Veränderung.`
              : lang === "fr"
                ? `L’ordonnance du 27 août 2025 fixe la répartition des sièges pour le renouvellement intégral du Conseil national de la 53e législature. Les 26 chiffres de l’article 1 totalisent ${NATIONAL_COUNCIL_SEATS}. Le communiqué du même jour, en allemand, dit que Luzern et Freiburg ont chacun un siège de plus qu’auparavant (neu 10 bzw. 8) et que Bern et Graubünden en ont chacun un de moins (neu 23 bzw. 4). Pour les autres cantons, le communiqué ne nomme pas de changement.`
                : lang === "it"
                  ? `L’ordinanza del 27 agosto 2025 fissa la ripartizione dei seggi per il rinnovo integrale del Consiglio nazionale della 53ª legislatura. Le 26 cifre dell’articolo 1 danno ${NATIONAL_COUNCIL_SEATS}. Il comunicato dello stesso giorno, in tedesco, dice che Luzern e Freiburg hanno un seggio in più di prima (neu 10 bzw. 8) e che Bern e Graubünden ne hanno uno in meno (neu 23 bzw. 4). Per gli altri cantoni il comunicato non indica un cambiamento.`
                  : `The ordinance of 27 August 2025 sets the seat allocation for the full renewal of the National Council for the 53rd legislative period. The 26 figures in article 1 add up to ${NATIONAL_COUNCIL_SEATS}. The German release of the same day says Luzern and Freiburg each have one more seat than before (neu 10 bzw. 8) and Bern and Graubünden each have one fewer (neu 23 bzw. 4). The release does not name a change for the other cantons.`}
          </p>
          <p>
            {lang === "de"
              ? "Steht in der Tabelle hinter einer Sitzzahl ein Name in Klammern, ist das der Name, den Artikel 1 der Verordnung druckt. Der verlinkte Name ist der des BFS-Kantonsverzeichnisses."
              : lang === "fr"
                ? "Si un nom figure entre parenthèses après un nombre de sièges, c’est le nom imprimé à l’article 1 de l’ordonnance. Le nom du lien est celui du fichier cantonal de l’OFS."
                : lang === "it"
                  ? "Se dopo un numero di seggi c’è un nome tra parentesi, è il nome stampato nell’articolo 1 dell’ordinanza. Il nome del link è quello del file cantonale dell’UST."
                  : "Where a name in parentheses follows a seat count, it is the name article 1 of the ordinance prints. The linked name is the one in the BFS canton file."}
          </p>
        </div>
        <div className="mt-4">
          <CantonSeatTable lang={lang} />
        </div>
      </section>

      <section className="prose-legal">
        <h2>{copy.federalCouncil}</h2>
        <p>
          {lang === "de"
            ? "Artikel 174: Der Bundesrat ist die oberste leitende und vollziehende Behörde des Bundes. Artikel 175: Er besteht aus sieben Mitgliedern. Die Bundesversammlung wählt sie nach jeder Gesamterneuerung des Nationalrates für vier Jahre. Artikel 176: Die Bundesversammlung wählt die Bundespräsidentin oder den Bundespräsidenten und die Vizepräsidentin oder den Vizepräsidenten aus den Mitgliedern für ein Jahr. Die Wiederwahl für das folgende Jahr ist ausgeschlossen."
            : lang === "fr"
              ? "Article 174 : le Conseil fédéral est l’autorité directoriale et exécutive suprême de la Confédération. Article 175 : il compte sept membres, élus par l’Assemblée fédérale après chaque renouvellement intégral du Conseil national pour quatre ans. Article 176 : l’Assemblée fédérale élit pour un an, parmi les membres, le président ou la présidente et le vice-président ou la vice-présidente. La réélection pour l’année suivante est exclue."
              : lang === "it"
                ? "Articolo 174: il Consiglio federale è l’autorità direttiva ed esecutiva suprema della Confederazione. Articolo 175: conta sette membri, eletti dall’Assemblea federale dopo ogni rinnovo integrale del Consiglio nazionale per quattro anni. Articolo 176: l’Assemblea federale elegge per un anno, fra i membri, il presidente o la presidente e il vicepresidente o la vicepresidente. La rielezione per l’anno successivo è esclusa."
                : "Article 174: the Federal Council is the supreme governing and executive authority of the Confederation. Article 175: it has seven members, elected by the Federal Assembly after each full renewal of the National Council for a term of four years. Article 176: the Federal Assembly elects the President and the Vice-President from among the members for one year. Re-election for the following year is excluded."}
        </p>
        <p>
          {lang === "de"
            ? "Die Seite «Die sieben Mitglieder des Bundesrates», gelesen am 17. Oktober 2026, druckt die folgenden Angaben. Die Parteikürzel stehen so, wie diese Seite sie setzt. Die Angabe zum Vizepräsidenten 2026 steht auf der Seite «Präsidialjahr 2026», die auch schreibt, dass Guy Parmelin am 10. Dezember 2025 in das Amt des Bundespräsidenten gewählt wurde."
            : lang === "fr"
              ? "La page «Die sieben Mitglieder des Bundesrates», lue le 17 octobre 2026, imprime les mentions ci-dessous. Les sigles de parti sont recopiés tels quels. La mention du vice-président pour 2026 figure sur la page «Präsidialjahr 2026», qui écrit aussi que Guy Parmelin a été élu président de la Confédération le 10 décembre 2025."
              : lang === "it"
                ? "La pagina «Die sieben Mitglieder des Bundesrates», letta il 17 ottobre 2026, stampa le indicazioni sotto. Le sigle dei partiti sono ricopiate come stanno. L’indicazione del vicepresidente per il 2026 sta nella pagina «Präsidialjahr 2026», che scrive anche che Guy Parmelin è stato eletto presidente della Confederazione il 10 dicembre 2025."
                : "The page “Die sieben Mitglieder des Bundesrates”, read on 17 October 2026, prints the lines below. Party abbreviations are copied as that page sets them. The 2026 vice-presidency is on the page “Präsidialjahr 2026”, which also writes that Guy Parmelin was elected President of the Confederation on 10 December 2025."}
        </p>
        <ul>
          {FEDERAL_COUNCIL.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p>
          {lang === "de"
            ? "Viktor Rossi ist Bundeskanzler seit dem 1. Januar 2024. Die gleiche Seite bezeichnet ihn als Stabschef des Bundesrates, nicht als achtes Mitglied."
            : lang === "fr"
              ? "Viktor Rossi est chancelier de la Confédération depuis le 1er janvier 2024. La même page le désigne comme chef d’état-major du Conseil fédéral, pas comme un huitième membre."
              : lang === "it"
                ? "Viktor Rossi è cancelliere della Confederazione dal 1° gennaio 2024. La stessa pagina lo indica come capo di stato maggiore del Consiglio federale, non come ottavo membro."
                : "Viktor Rossi has been Federal Chancellor since 1 January 2024. The same page calls him chief of staff of the Federal Council, not an eighth member."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{copy.population}</h2>
        <p>
          {lang === "de"
            ? `Der Bundesratsbeschluss vom 27. August 2025 (BBl 2025 2545) erklärt die Zahlen der ständigen Wohnbevölkerung Ende 2024 für gültig. Die Tabelle schliesst mit Schweiz ${formatNumber(POPULATION_2024, lang)}. Die Summe der 26 Kantonszahlen auf dieser Seite ist dieselbe Zahl. Unterzeichnet haben die Bundespräsidentin Karin Keller-Sutter und der Bundeskanzler Viktor Rossi.`
              : lang === "fr"
              ? `L’arrêté du Conseil fédéral du 27 août 2025 (BBl 2025 2545) déclare valables les chiffres de la population résidante permanente à la fin de 2024. Le tableau se termine par «Schweiz» ${formatNumber(POPULATION_2024, lang)}. La somme des 26 cantons sur cette page est le même chiffre. Ont signé «Die Bundespräsidentin: Karin Keller-Sutter» et «Der Bundeskanzler: Viktor Rossi».`
              : lang === "it"
                ? `Il decreto del Consiglio federale del 27 agosto 2025 (FF 2025 2545) dichiara validi i dati della popolazione residente permanente alla fine del 2024. La tabella chiude con Svizzera ${formatNumber(POPULATION_2024, lang)}. La somma dei 26 cantoni in questa pagina è la stessa cifra. Hanno firmato la presidente della Confederazione Karin Keller-Sutter e il cancelliere Viktor Rossi.`
                : `The Federal Council decree of 27 August 2025 (BBl 2025 2545) declares valid the permanent-resident population figures at the end of 2024. The table ends with Switzerland ${formatNumber(POPULATION_2024, lang)}. The 26 cantonal figures on this page add up to the same number. It is signed by President of the Confederation Karin Keller-Sutter and Federal Chancellor Viktor Rossi.`}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{lang === "de" ? "Letzte Gesamterneuerung" : lang === "fr" ? "Dernier renouvellement" : lang === "it" ? "Ultimo rinnovo" : "Latest full renewal"}</h2>
        <p>
          {lang === "de"
            ? "Das Kreisschreiben des Bundesrates vom 19. Oktober 2022 (BBl 2022 2547) sagt, dass die ordentliche Gesamterneuerung für die 52. Amtsdauer am 22. Oktober 2023 stattfindet. Die Seite des Parlaments schreibt, dass am 22. Oktober 2023 die Parlamentswahlen (Nationalrats- und Ständeratswahlen) stattfanden."
            : lang === "fr"
              ? "La circulaire du Conseil fédéral du 19 octobre 2022 (FF 2022 2547) dit que le renouvellement ordinaire pour la 52e législature a lieu le 22 octobre 2023. La page du Parlement écrit que les élections parlementaires (Conseil national et Conseil des États) ont eu lieu le 22 octobre 2023."
              : lang === "it"
                ? "La circolare del Consiglio federale del 19 ottobre 2022 (FF 2022 2547) dice che il rinnovo ordinario per la 52ª legislatura si svolge il 22 ottobre 2023. La pagina del Parlamento scrive che le elezioni parlamentari (Consiglio nazionale e Consiglio degli Stati) si sono tenute il 22 ottobre 2023."
                : "The Federal Council circular of 19 October 2022 (BBl 2022 2547) says the ordinary full renewal for the 52nd term takes place on 22 October 2023. The parliament page writes that the parliamentary elections (National Council and Council of States) were held on 22 October 2023."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">
          {lang === "de" ? "Kandidaturen und Parteien" : lang === "fr" ? "Candidatures et partis" : lang === "it" ? "Candidature e partiti" : "Candidates and parties"}
        </h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={districtsIndexPath(lang)}>
            {copy.districts}
          </Link>
        </p>
        <p>
          {lang === "de"
            ? "Die Seite des Bundesrates «Die Volksabstimmungen», gelesen am 18. Oktober 2026, nennt eine Volksabstimmung vom 29. November 2026 und die Bezeichnungen AHV-Zusatzfinanzierung, Feuerwerksinitiative, Ehepaarbesteuerung und Kriegsmaterialgesetz. Diese Ausgabe veröffentlicht dazu keine Umfrage, keine Hochrechnung und kein Ergebnis."
            : lang === "fr"
              ? "La page allemande du Conseil fédéral «Die Volksabstimmungen», lue le 18 octobre 2026, indique une votation populaire du 29 novembre 2026 et les désignations AHV-Zusatzfinanzierung, Feuerwerksinitiative, Ehepaarbesteuerung et Kriegsmaterialgesetz. Cette édition n’en publie ni sondage, ni projection, ni résultat."
              : lang === "it"
                ? "La pagina tedesca del Consiglio federale «Die Volksabstimmungen», letta il 18 ottobre 2026, indica una votazione popolare del 29 novembre 2026 e le designazioni AHV-Zusatzfinanzierung, Feuerwerksinitiative, Ehepaarbesteuerung e Kriegsmaterialgesetz. Questa edizione non ne pubblica un sondaggio, una proiezione o un risultato."
                : "The Federal Council’s German page “Die Volksabstimmungen”, read on 18 October 2026, lists a popular vote on 29 November 2026 and the labels AHV-Zusatzfinanzierung, Feuerwerksinitiative, Ehepaarbesteuerung and Kriegsmaterialgesetz. This release publishes no poll, projection, or result for that vote."}
        </p>
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}elections/volksabstimmung-2026-11-29/`}>
            {lang === "de"
              ? "Volksabstimmung vom 29. November 2026"
              : lang === "fr"
                ? "Votation du 29 novembre 2026"
                : lang === "it"
                  ? "Votazione del 29 novembre 2026"
                  : "Popular vote of 29 November 2026"}
          </Link>
        </p>
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}parties/`}>
            {copy.parties}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}candidates/`}>
            {copy.candidates}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>
            {copy.results}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>
            {copy.faq}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>
            {copy.sources}
          </Link>
        </p>
        <p className="text-sm text-ink-muted">
          {lang === "de"
            ? `Gemeindestand des BFS am 1. Januar 2026: ${formatNumber(MUNICIPALITY_COUNT, lang)} Einträge. Dieselbe Zahl ergibt sich aus den Zeilen des historisierten Verzeichnisses, die an diesem Tag gelten und deren Typfeld 11 ist.`
            : lang === "fr"
              ? `État des communes de l’OFS au 1er janvier 2026 : ${formatNumber(MUNICIPALITY_COUNT, lang)} entrées. Le même nombre sort des lignes du répertoire historisé valables ce jour-là dont le champ de type vaut 11.`
              : lang === "it"
                ? `Stato dei comuni dell’UST al 1° gennaio 2026: ${formatNumber(MUNICIPALITY_COUNT, lang)} voci. Lo stesso numero esce dalle righe del repertorio storicizzato valide quel giorno il cui campo di tipo è 11.`
                : `BFS commune snapshot at 1 January 2026: ${formatNumber(MUNICIPALITY_COUNT, lang)} entries. The same number comes from the historized-register rows current on that day whose type field is 11.`}
        </p>
      </section>

      <LinkGrid
        heading={copy.cantons}
        items={alphaCantons().map((canton) => ({
          href: cantonPath(lang, canton.slug),
          title: canton.officialName,
          detail: `${canton.nationalCouncil2027} ${copy.seats} · ${formatNumber(canton.population2024, lang)}`,
        }))}
      />
      <p className="text-sm text-ink-muted">
        {(() => {
          const nameOf = (abbr: string) => CANTONS.find((canton) => canton.abbr === abbr)?.officialName ?? abbr;
          const names = COMMUNE_CANTONS.map(nameOf).join(", ");
          const onCanton = COMMUNE_CANTONS.filter((abbr) => districtsForCanton(abbr).length === 0).map(nameOf).join(", ");
          return lang === "de"
            ? `${CANTONS.length} Kantone. Die Bezirksseiten dieser Ausgabe stehen im Verzeichnis. Gemeindeseiten in dieser Ausgabe: ${names}. Wo der Kanton Bezirksseiten hat, hängen die Gemeinden am Bezirk. ${onCanton} stehen auf der Kantonsseite, weil das Verzeichnis dort nur einen Bezirkseintrag hat. Diese Ausgabe hat eine Seite für jede politische Gemeinde dieses Verzeichnisses.`
            : lang === "fr"
              ? `${CANTONS.length} cantons. Les pages de districts de cette édition sont dans le répertoire. Pages de communes dans cette édition : ${names}. Là où le canton a des pages de district, les communes y sont reliées. ${onCanton} figurent sur la page du canton, parce que le répertoire n’y a qu’une entrée de district. Cette édition a une page pour chaque commune politique de ce répertoire.`
              : lang === "it"
                ? `${CANTONS.length} cantoni. Le pagine dei distretti di questa edizione stanno nel repertorio. Pagine di comuni in questa edizione: ${names}. Dove il cantone ha pagine di distretto, i comuni vi sono collegati. ${onCanton} stanno sulla pagina del cantone, perché il repertorio vi ha una sola voce di distretto. Questa edizione ha una pagina per ogni comune politico di questo repertorio.`
                : `${CANTONS.length} cantons. This release’s district pages are in the register index. Municipality pages in this release: ${names}. Where the canton has district pages, the municipalities are linked from the district. ${onCanton} are listed on the canton page, because the register has a single district entry there. This release has a page for every political municipality in that register.`;
        })()}
      </p>
    </ChFrame>
  );
}
