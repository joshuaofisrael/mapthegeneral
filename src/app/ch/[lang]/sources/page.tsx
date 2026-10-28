import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { CANTONS, MUNICIPALITY_COUNT } from "../../../../../data/ch/cantons";
import { COMMUNE_CANTONS } from "../../../../../data/ch/communes";
import { chHome } from "../../../../../data/ch/search";
import { SOURCES, sourceById } from "../../../../../data/ch/sources";
import { formatNumber, ui } from "../../../../../data/ch/ui";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title:
      lang === "fr" ? "Sources, Suisse" : lang === "it" ? "Fonti, Svizzera" : lang === "en" ? "Switzerland sources" : copy.sources,
    description:
      lang === "de"
        ? "Amtliche Quellen der Schweiz-Seiten, gelesen am 17. Oktober 2026. Inoffizielle Information."
        : lang === "fr"
          ? "Sources officielles des pages Suisse, lues le 17 octobre 2026. Information non officielle."
          : lang === "it"
            ? "Fonti ufficiali delle pagine Svizzera, lette il 17 ottobre 2026. Informazione non ufficiale."
            : "Official sources for the Switzerland pages, read on 17 October 2026. Unofficial information.",
    path: `${chHome(lang)}sources/`,
    lang,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}sources/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        lang === "de"
          ? "Jede Quelle nennt ihr Lesedatum. Presse und Wikipedia sind keine Quelle für eine Tatsache."
          : lang === "fr"
            ? "Chaque source indique sa date de lecture. La presse et Wikipédia ne sont pas la source d’un fait."
            : lang === "it"
              ? "Ogni fonte indica la data di lettura. Stampa e Wikipedia non sono la fonte di un fatto."
              : "Each source shows the date it was read. News reports and Wikipedia are not the source of a fact."
      }
      officeHref={office.url}
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {(() => {
            const names = COMMUNE_CANTONS.map((abbr) => CANTONS.find((canton) => canton.abbr === abbr)?.officialName).join(", ");
            return lang === "de"
              ? `Was in diesen Quellen nicht steht, wird nicht erfunden. Diese Ausgabe hat eine Seite für jede der ${formatNumber(MUNICIPALITY_COUNT, lang)} politischen Gemeinden im historisierten Verzeichnis, Stand 1. Januar 2026, in den Kantonen ${names}. Für Genève, Luzern, Ticino und Valais / Wallis nennt die Gemeindeseite ein kommunales Datum aus einer kantonalen Quelle, gelesen am 25. Oktober 2026. Für Zug, Jura (ohne Moutier) und Appenzell Ausserrhoden nennt sie ein Datum aus einer kantonalen Quelle, gelesen am 26. Oktober 2026. Für Moutier und die übrigen Kantone ist kein kommunales Wahldatum eingesetzt. Namen von Gemeindevorständen werden nicht übernommen. Offene Lücken: Kandidaturen 2027, kantonale Regierungen, weitere kantonale und kommunale Wahldaten, Amtsträger der Bezirke, Postleitzahl, rätoromanische Fassung, Wortlaut von Artikel 17 des Bundesgesetzes über die politischen Rechte. Umfragen, Hochrechnungen und Ergebnisse der Volksabstimmung vom 29. November 2026 werden nicht veröffentlicht.`
              : lang === "fr"
                ? `Ce qui n’est pas dans ces sources n’est pas inventé. Cette édition a une page pour chacune des ${formatNumber(MUNICIPALITY_COUNT, lang)} communes politiques du répertoire historisé, état au 1er janvier 2026, dans les cantons ${names}. Pour Genève, Luzern, Ticino et Valais / Wallis, la page de la commune donne une date communale tirée d’une source cantonale lue le 25 octobre 2026. Pour Zug, Jura (sauf Moutier) et Appenzell Ausserrhoden, elle donne une date tirée d’une source cantonale lue le 26 octobre 2026. Pour Moutier et les autres cantons, aucune date communale n’est inscrite. Aucun nom d’exécutif communal n’est repris. Lacunes ouvertes : candidatures 2027, gouvernements cantonaux, autres dates d’élections cantonales et communales, titulaires des districts, numéro postal, version romanche, texte de l’article 17 de la loi fédérale sur les droits politiques. Aucun sondage, aucune projection et aucun résultat de la votation populaire du 29 novembre 2026 ne sont publiés.`
                : lang === "it"
                  ? `Ciò che non sta in queste fonti non è inventato. Questa edizione ha una pagina per ciascuno dei ${formatNumber(MUNICIPALITY_COUNT, lang)} comuni politici del repertorio storicizzato, stato al 1° gennaio 2026, nei cantoni ${names}. Per Genève, Luzern, Ticino e Valais / Wallis la pagina del comune indica una data comunale tratta da una fonte cantonale letta il 25 ottobre 2026. Per Zug, Jura (senza Moutier) e Appenzell Ausserrhoden indica una data tratta da una fonte cantonale letta il 26 ottobre 2026. Per Moutier e gli altri cantoni non è indicata una data comunale. Nessun nome di esecutivo comunale è ripreso. Lacune aperte: candidature 2027, governi cantonali, altre date delle elezioni cantonali e comunali, titolari dei distretti, numero postale, versione romancia, testo dell’articolo 17 della legge federale sui diritti politici. Non si pubblicano sondaggi, proiezioni o risultati della votazione popolare del 29 novembre 2026.`
                  : `What is not in these sources is not invented. This release has a page for each of the ${formatNumber(MUNICIPALITY_COUNT, lang)} political municipalities in the historized register, state at 1 January 2026, in the cantons ${names}. For Genève, Luzern, Ticino and Valais / Wallis, the municipality page gives a communal date from a cantonal source read on 25 October 2026. For Zug, Jura (except Moutier) and Appenzell Ausserrhoden, it gives a date from a cantonal source read on 26 October 2026. For Moutier and the other cantons, no communal polling date is printed. No communal-executive name is copied. Open gaps: 2027 candidacies, cantonal governments, further cantonal and communal election dates, district officeholders, postcodes, a Romansh version, and the wording of article 17 of the Federal Act on Political Rights. No poll, projection, or result of the 29 November 2026 popular vote is published.`;
          })()}
        </p>
        <h2>
          {lang === "de"
            ? "Nutzungsbedingungen und Quellenangabe"
            : lang === "fr"
              ? "Conditions d’utilisation et indication de la source"
              : lang === "it"
                ? "Condizioni d’uso e indicazione della fonte"
                : "Terms of use and attribution"}
        </h2>
        <p>
          {lang === "de"
            ? "Erlasse, Verordnungen, Mitteilungen und Entscheide von Behörden sind nach Artikel 5 des Urheberrechtsgesetzes nicht geschützt. Daten des Bundesamtes für Statistik: Quelle BFS, genutzt nach den Nutzungsbedingungen «Freie Nutzung. Quellenangabe ist Pflicht.» ("
            : lang === "fr"
              ? "Les actes législatifs, ordonnances, communiqués et décisions des autorités ne sont pas protégés selon l’article 5 de la loi sur le droit d’auteur. Données de l’Office fédéral de la statistique : source OFS, utilisées selon les conditions « Utilisation libre. Obligation d’indiquer la source. » ("
              : lang === "it"
                ? "Atti normativi, ordinanze, comunicati e decisioni delle autorità non sono protetti secondo l’articolo 5 della legge sul diritto d’autore. Dati dell’Ufficio federale di statistica: fonte UST, usati secondo le condizioni «Libera utilizzazione. Indicazione della fonte obbligatoria.» ("
                : "Enactments, ordinances, announcements and decisions of authorities are not protected under article 5 of the Copyright Act. Federal Statistical Office data: source FSO, used under the terms “Open use. Must provide the source.” ("}
          <a href="https://www.bfs.admin.ch/bfs/en/home/fso/swiss-federal-statistical-office/terms-of-use.html">
            {lang === "de" ? "BFS-Nutzungsbedingungen" : lang === "fr" ? "conditions d’utilisation de l’OFS" : lang === "it" ? "condizioni d’uso dell’UST" : "FSO terms of use"}
          </a>
          {lang === "de"
            ? "). Bilder, Logos und Wappen werden nicht übernommen."
            : lang === "fr"
              ? "). Aucune image, aucun logo ni aucune armoirie n’est reproduit."
              : lang === "it"
                ? "). Non sono riprodotti immagini, loghi o stemmi."
                : "). No images, logos or coats of arms are reproduced."}
          {" "}
          {lang === "de"
            ? "Der Datensatz «Swiss official commune’s historicized list» auf opendata.swiss trägt das Kennzeichen «Open use» (kommerzielle Nutzung erlaubt, Quellenangabe empfohlen), gelesen am 25. Oktober 2026 und erneut am 26. Oktober 2026. Diese Seiten nennen das Bundesamt für Statistik, den Titel, den Link und das Kopierdatum. Die Zeilen der politischen Gemeinden, die am 1. Januar 2026 gelten, stimmen in der Kopie vom 26. Oktober 2026 für die bereits veröffentlichten Kantone mit den früheren Seiten überein. Dieselbe Kopie ergänzt die politischen Gemeinden von Zug, Schaffhausen, Jura, Appenzell Ausserrhoden, Nidwalden, Glarus, Obwalden, Uri und Appenzell Innerrhoden. Ratsmitglieder: Parlamentsdienste der Bundesversammlung, Bern, Webservice vom 18. Oktober 2026; die Angaben dürfen nicht als amtliche Veröffentlichung erscheinen, der Inhalt der übernommenen Zeichenfolgen ist nicht verändert, und private Homepages sowie Fotos sind weggelassen. Datenschutzgesetz (SR 235.1): nur Daten, die eine Behörde zur amtlichen Funktion bereits veröffentlicht hat. Namen von Gemeindevorständen werden nicht gespeichert."
            : lang === "fr"
              ? "Le jeu «Swiss official commune’s historicized list» sur opendata.swiss porte le symbole «Open use» (usage commercial permis, indication de la source recommandée), lu le 25 octobre 2026 et à nouveau le 26 octobre 2026. Ces pages nomment l’Office fédéral de la statistique, le titre, le lien et la date de copie. Les lignes des communes politiques valables au 1er janvier 2026, dans la copie du 26 octobre 2026, correspondent pour les cantons déjà publiés aux pages antérieures. La même copie ajoute les communes politiques de Zug, Schaffhausen, Jura, Appenzell Ausserrhoden, Nidwalden, Glarus, Obwalden, Uri et Appenzell Innerrhoden. Membres des conseils : Services du Parlement de l’Assemblée fédérale, Berne, service web du 18 octobre 2026 ; l’usage ne doit pas paraître une publication officielle, les chaînes reprises ne sont pas modifiées, et les sites personnels ainsi que les photos sont omis. Loi sur la protection des données (RS 235.1) : uniquement des données qu’une autorité a déjà publiées pour la fonction officielle. Aucun nom d’exécutif communal n’est enregistré."
              : lang === "it"
                ? "Il set «Swiss official commune’s historicized list» su opendata.swiss porta il simbolo «Open use» (uso commerciale ammesso, indicazione della fonte raccomandata), letto il 25 ottobre 2026 e di nuovo il 26 ottobre 2026. Queste pagine indicano l’Ufficio federale di statistica, il titolo, il link e la data di copia. Le righe dei comuni politici valide il 1° gennaio 2026, nella copia del 26 ottobre 2026, coincidono per i cantoni già pubblicati con le pagine precedenti. La stessa copia aggiunge i comuni politici di Zug, Schaffhausen, Jura, Appenzell Ausserrhoden, Nidwalden, Glarus, Obwalden, Uri e Appenzell Innerrhoden. Membri dei consigli: Servizi del Parlamento dell’Assemblea federale, Berna, servizio web del 18 ottobre 2026; l’uso non deve apparire una pubblicazione ufficiale, le stringhe riprese non sono modificate e si omettono siti personali e fotografie. Legge sulla protezione dei dati (RS 235.1): solo dati che un’autorità ha già pubblicato per la funzione ufficiale. Nessun nome di esecutivo comunale è registrato."
                : "The dataset “Swiss official commune’s historicized list” on opendata.swiss carries the symbol “Open use” (commercial use allowed, source recommended), read on 25 October 2026 and again on 26 October 2026. These pages name the Federal Statistical Office, the title, the link, and the copy date. The political-municipality rows current on 1 January 2026 in the 26 October 2026 copy match the pages already published for those cantons. The same copy adds the political municipalities of Zug, Schaffhausen, Jura, Appenzell Ausserrhoden, Nidwalden, Glarus, Obwalden, Uri and Appenzell Innerrhoden. Council members: Parliamentary Services of the Federal Assembly, Bern, web service of 18 October 2026; the use must not look like an official publication, the copied strings are not altered, and personal websites and photographs are omitted. Data Protection Act (SR 235.1): only data an authority has already published for the official function. No municipal executive names are stored."}
        </p>
      </div>
    </ChFrame>
  );
}
