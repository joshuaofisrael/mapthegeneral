import type { EditorialPreview } from "./model";

const VOTE = "https://www.admin.ch/de/volksabstimmung-vom-29-november-2026";
const BFS = "https://www.wahlen.admin.ch/de/2023/ch/23-table-results-national-council-election/";
const CONST = "https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1999/404/20240101/de/pdf-a/fedlex-data-admin-ch-eli-cc-1999-404-20240101-de-pdf-a-4.pdf";
const PRESS = "https://www.admin.ch/de/newnsb/vSue6NEwJdNUFXHNhHUUs";

const seatsEn =
  "The Federal Statistical Office table of National Council results for 22 October 2023, read for this release, records these mandates: SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2, and Lega 1. The mandate column sums to 200. Vote shares on that table are not reprinted in this preview. A change in mandates between elections is a count, not a statement of what a party intends to do.";

export const BATCH2C: EditorialPreview[] = [
  {
    path: "/ch/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "What is at stake in Switzerland this season is a federal popular vote, and later a renewal of the National Council. On Sunday 29 November 2026, people entitled to vote decide four proposals. The Federal Council circular of 3 September 2026 sets that Sunday, and the preceding days within the statutory limits. The titles in the German circular are a federal decree on extra financing of the old-age pension by an increase in value-added tax; a popular initiative to restrict fireworks; a popular initiative on fair federal taxes for married couples; and an amendment of the War Material Act. This page does not recommend a yes or a no.",
      "How the Federal Assembly is composed, in the Constitution’s articles read for this hub, is two chambers on an equal footing. Article 149 sets 200 seats in the National Council, elected directly by proportional representation, renewed as a whole every four years. Each canton is a constituency. Seats follow population, with at least one seat. Article 150 sets 46 seats in the Council of States. Six cantons elect one person and the others elect two. The canton regulates that election. Cantons and communes hold their own votes. This release does not name communal executives.",
      "The next National Council election, in the Federal Council’s release of 27 August 2025, is 24 October 2027. That release is about a change in how seats are distributed among the cantons. It is not a list of candidates. No candidate names for 2027 are copied here. The popular vote of 29 November 2026 is not that election. Ballot papers, on the circular, are to be delivered by the cantons no earlier than four weeks and no later than three weeks before voting day. The texts that were read do not print one national hour for the opening of the urns, so this page does not invent one. No result is shown here before 12:00 central European time on 29 November 2026. The results service is the Federal Statistical Office page on votes.",
      seatsEn,
      "Those abbreviations are the party names on the official table. A programme is the text the party publishes. This preview does not rewrite one, does not record a party’s recommendation on the four November proposals, and does not rank the parties. Committees and parties publish their own voting recommendations. None was copied from the administration page that was read. This site prints no voting-intention figure for the popular vote or for the 2027 election. Readers who want the proposals should open the federal administration’s page. Readers who want the 2023 mandates should open the results table.",
    ],
    citations: [
      { label: "Federal administration, popular vote of 29 November 2026", href: VOTE },
      { label: "Federal Constitution, articles on the Federal Assembly", href: CONST },
      { label: "National Council election results, 2023", href: BFS },
      { label: "Federal Council release on the 2027 seat distribution, 27 August 2025", href: PRESS },
    ],
  },
  {
    path: "/ch/de/",
    lang: "de",
    heading: "Redaktioneller Überblick",
    updatedLocal: "Stand: 27. Oktober 2026.",
    sourcesHeading: "Quellen dieses Überblicks",
    paragraphs: [
      "In dieser Saison steht eine eidgenössische Volksabstimmung an, und später die Gesamterneuerung des Nationalrats. Am Sonntag, 29. November 2026, stimmen die Stimmberechtigten über vier Vorlagen ab. Das Kreisschreiben des Bundesrates vom 3. September 2026 setzt diesen Sonntag und, in den gesetzlichen Schranken, die Tage davor. Die Titel im deutschen Kreisschreiben sind der Bundesbeschluss über die Zusatzfinanzierung der AHV durch eine Erhöhung der Mehrwertsteuer, die Volksinitiative für eine Einschränkung von Feuerwerk, die Volksinitiative zu fairen Bundessteuern auch für Ehepaare und die Änderung des Kriegsmaterialgesetzes. Diese Seite gibt keine Ja- oder Nein-Empfehlung.",
      "Die Bundesversammlung besteht nach den gelesenen Artikeln der Bundesverfassung aus zwei gleichgestellten Räten. Artikel 149 setzt 200 Sitze im Nationalrat, direkt nach Proporz gewählt, mit Gesamterneuerung alle vier Jahre. Jeder Kanton ist ein Wahlkreis. Die Sitze folgen der Bevölkerung, mindestens ein Sitz je Kanton. Artikel 150 setzt 46 Sitze im Ständerat. Sechs Kantone wählen eine Person, die übrigen zwei. Der Kanton regelt diese Wahl. Kantone und Gemeinden stimmen über eigene Geschäfte ab. Diese Ausgabe nennt keine Gemeindeexekutiven.",
      "Die nächste Nationalratswahl ist nach der Medienmitteilung des Bundesrates vom 27. August 2025 auf den 24. Oktober 2027 angesetzt. Die Mitteilung betrifft eine Änderung der Sitzverteilung auf die Kantone. Sie ist keine Kandidierendenliste. Namen für 2027 werden hier nicht kopiert. Die Volksabstimmung vom 29. November 2026 ist nicht diese Wahl. Das Kreisschreiben bittet die Kantone, die Stimmunterlagen frühestens vier und spätestens drei Wochen vor dem Abstimmungstag zuzustellen. Die gelesenen Texte nennen keine einzige nationale Uhrzeit für die Öffnung der Urnen. Diese Seite erfindet keine. Ein Ergebnis wird hier nicht vor 12:00 mitteleuropäischer Zeit am 29. November 2026 gezeigt. Der Ergebnisdienst ist die Seite des Bundesamts für Statistik zu den Abstimmungen.",
      "Die Tabelle des Bundesamts für Statistik zu den Nationalratswahlen vom 22. Oktober 2023, gelesen für diese Ausgabe, verzeichnet diese Mandate: SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 und Lega 1. Die Mandatsspalte summiert sich auf 200. Stimmenanteile dieser Tabelle werden hier nicht abgedruckt. Eine Veränderung der Mandate zwischen Wahlen ist ein Zählstand, keine Aussage darüber, was eine Partei vorhat.",
      "Diese Abkürzungen sind die Parteinamen der amtlichen Tabelle. Ein Programm ist der Text, den die Partei selbst veröffentlicht. Dieser Überblick schreibt ihn nicht um, hält keine Parteiparole zu den vier November-Vorlagen fest und reiht die Parteien nicht. Parteien und Komitees veröffentlichen ihre Parolen selbst. Aus der gelesenen Seite der Bundesverwaltung wurde keine Parole übernommen. Diese Website druckt keine Zahl zur Stimmabsicht, weder zur Volksabstimmung noch zur Wahl 2027. Wer die Vorlagen will, öffnet die Seite der Bundesverwaltung. Wer die Mandate von 2023 will, öffnet die Ergebnistabelle.",
    ],
    citations: [
      { label: "Bundesverwaltung, Volksabstimmung vom 29. November 2026", href: VOTE },
      { label: "Bundesverfassung, Artikel zur Bundesversammlung", href: CONST },
      { label: "Ergebnisse der Nationalratswahlen 2023", href: BFS },
      { label: "Medienmitteilung des Bundesrates zur Sitzverteilung 2027, 27. August 2025", href: PRESS },
    ],
  },
  {
    path: "/ch/fr/",
    lang: "fr",
    heading: "Aperçu éditorial",
    updatedLocal: "Mis à jour : 27 octobre 2026.",
    sourcesHeading: "Sources de cet aperçu",
    paragraphs: [
      "Cette saison, l’enjeu est une votation populaire fédérale, puis le renouvellement intégral du Conseil national. Le dimanche 29 novembre 2026, les personnes ayant le droit de vote se prononcent sur quatre objets. La circulaire du Conseil fédéral du 3 septembre 2026 fixe ce dimanche et, dans les limites légales, les jours qui précèdent. Les titres de la circulaire allemande sont l’arrêté fédéral sur le financement additionnel de l’AVS par une hausse de la taxe sur la valeur ajoutée, l’initiative populaire pour une limitation des feux d’artifice, l’initiative populaire pour un impôt fédéral équitable aussi pour les couples mariés, et la modification de la loi sur le matériel de guerre. Cette page ne recommande ni le oui ni le non.",
      "L’Assemblée fédérale, dans les articles de la Constitution lus pour ce guide, compte deux chambres sur un pied d’égalité. L’article 149 fixe 200 sièges au Conseil national, élu directement à la proportionnelle, renouvelé intégralement tous les quatre ans. Chaque canton est une circonscription. Les sièges suivent la population, avec au moins un siège. L’article 150 fixe 46 sièges au Conseil des États. Six cantons en élisent un, les autres deux. Le canton règle cette élection. Les cantons et les communes votent sur leurs propres objets. Cette édition ne nomme pas les exécutifs communaux.",
      "La prochaine élection du Conseil national, selon le communiqué du Conseil fédéral du 27 août 2025, est fixée au 24 octobre 2027. Le communiqué porte sur un changement de la répartition des sièges entre les cantons. Ce n’est pas une liste de candidatures. Aucun nom pour 2027 n’est copié ici. La votation du 29 novembre 2026 n’est pas cette élection. La circulaire demande aux cantons de remettre le matériel de vote au plus tôt quatre semaines et au plus tard trois semaines avant le jour du scrutin. Les textes lus ne donnent pas une seule heure nationale d’ouverture des urnes. Cette page n’en invente pas. Aucun résultat n’est montré ici avant 12 h, heure de l’Europe centrale, le 29 novembre 2026. Le service des résultats est la page de l’Office fédéral de la statistique sur les votations.",
      "Le tableau de l’Office fédéral de la statistique sur l’élection du Conseil national du 22 octobre 2023, lu pour cette édition, indique ces mandats, avec les sigles imprimés sur la table : SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 et Lega 1. La colonne des mandats additionne 200. Les parts de voix de ce tableau ne sont pas reproduites ici. Un changement de mandats d’une élection à l’autre est un décompte, pas une déclaration de ce qu’un parti compte faire.",
      "Ces sigles sont les noms de partis du tableau officiel. Un programme est le texte que le parti publie. Cet aperçu ne le réécrit pas, ne retient aucune consigne de vote partisane sur les quatre objets de novembre et ne classe pas les partis. Les partis et les comités publient eux-mêmes leurs consignes. Aucune n’a été copiée depuis la page de l’administration qui a été lue. Ce site n’imprime aucun chiffre d’intention de vote, ni pour la votation ni pour l’élection de 2027. Pour les objets, ouvrir la page de l’administration fédérale. Pour les mandats de 2023, ouvrir le tableau des résultats.",
    ],
    citations: [
      { label: "Administration fédérale, votation du 29 novembre 2026", href: VOTE },
      { label: "Constitution fédérale, articles sur l’Assemblée fédérale", href: CONST },
      { label: "Résultats de l’élection du Conseil national, 2023", href: BFS },
      { label: "Communiqué du Conseil fédéral sur la répartition des sièges en 2027", href: PRESS },
    ],
  },
  {
    path: "/ch/it/",
    lang: "it",
    heading: "Anteprima editoriale",
    updatedLocal: "Aggiornato: 27 ottobre 2026.",
    sourcesHeading: "Fonti di questa anteprima",
    paragraphs: [
      "In questa stagione è in gioco una votazione popolare federale, e più avanti il rinnovo integrale del Consiglio nazionale. Domenica 29 novembre 2026 le persone con diritto di voto si pronunciano su quattro oggetti. La circolare del Consiglio federale del 3 settembre 2026 fissa quella domenica e, nei limiti di legge, i giorni precedenti. I titoli della circolare tedesca sono il decreto federale sul finanziamento aggiuntivo dell’AVS mediante un aumento dell’imposta sul valore aggiunto, l’iniziativa popolare per una limitazione dei fuochi d’artificio, l’iniziativa popolare per un’imposta federale equa anche per le coppie sposate, e la modifica della legge sul materiale bellico. Questa pagina non raccomanda né il sì né il no.",
      "L’Assemblea federale, negli articoli della Costituzione letti per questa guida, è formata da due camere sullo stesso piano. L’articolo 149 fissa 200 seggi nel Consiglio nazionale, eletti direttamente in modo proporzionale, con rinnovo integrale ogni quattro anni. Ogni Cantone è una circoscrizione. I seggi seguono la popolazione, con almeno un seggio. L’articolo 150 fissa 46 seggi nel Consiglio degli Stati. Sei Cantoni ne eleggono uno, gli altri due. Il Cantone disciplina questa elezione. Cantoni e comuni votano sui propri oggetti. Questa edizione non indica gli esecutivi comunali.",
      "La prossima elezione del Consiglio nazionale, secondo il comunicato del Consiglio federale del 27 agosto 2025, è fissata al 24 ottobre 2027. Il comunicato riguarda una modifica della ripartizione dei seggi tra i Cantoni. Non è un elenco di candidature. Nessun nome per il 2027 è copiato qui. La votazione del 29 novembre 2026 non è quell’elezione. La circolare chiede ai Cantoni di consegnare il materiale di voto al più presto quattro settimane e al più tardi tre settimane prima del giorno della votazione. I testi letti non fissano un’unica ora nazionale di apertura delle urne. Questa pagina non ne inventa una. Nessun risultato è mostrato qui prima delle ore 12:00, ora dell’Europa centrale, del 29 novembre 2026. Il servizio dei risultati è la pagina dell’Ufficio federale di statistica sulle votazioni.",
      "La tabella dell’Ufficio federale di statistica sull’elezione del Consiglio nazionale del 22 ottobre 2023, letta per questa edizione, indica questi mandati, con le sigle stampate sulla tabella: SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 e Lega 1. La colonna dei mandati somma 200. Le quote di voto di quella tabella non sono ristampate qui. Un cambiamento di mandati da un’elezione all’altra è un conteggio, non una dichiarazione di ciò che un partito intende fare.",
      "Quelle sigle sono i nomi di partito della tabella ufficiale. Un programma è il testo che il partito pubblica. Questa anteprima non lo riscrive, non registra una consegna di voto di partito sui quattro oggetti di novembre e non mette i partiti in ordine. Partiti e comitati pubblicano da sé le proprie consegne. Nessuna è stata copiata dalla pagina dell’amministrazione che è stata letta. Questo sito non stampa cifre sull’intenzione di voto, né per la votazione né per l’elezione del 2027. Per gli oggetti, aprire la pagina dell’amministrazione federale. Per i mandati del 2023, aprire la tabella dei risultati.",
    ],
    citations: [
      { label: "Amministrazione federale, votazione del 29 novembre 2026", href: VOTE },
      { label: "Costituzione federale, articoli sull’Assemblea federale", href: CONST },
      { label: "Risultati dell’elezione del Consiglio nazionale, 2023", href: BFS },
      { label: "Comunicato del Consiglio federale sulla ripartizione dei seggi nel 2027", href: PRESS },
    ],
  },
];
