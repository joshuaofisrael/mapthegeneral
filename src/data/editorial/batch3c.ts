import type { EditorialPreview } from "./model";

const S = "Sources for this preview";
const DECREE = "https://www.boe.es/eli/es/rd/2026/10/05/806";
const LOREG = "https://www.boe.es/eli/es/lo/1985/06/19/5/con";
const JEC = "https://www.juntaelectoralcentral.es/cs/jec/eleccionesEnCurso/Elecciones_generales_2026";
const CAL = "https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf";
const VOTE = "https://www.admin.ch/de/volksabstimmung-vom-29-november-2026";
const BBL = "https://www.fedlex.admin.ch/eli/fga/2026/2406/de";
const PRESS30 = "https://www.admin.ch/de/newnsb/KpnrPOW9cpZAvB6IXOekf";
const BFS_VOTE = "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html";
const BFS_2023 = "https://www.wahlen.admin.ch/de/2023/ch/23-table-results-national-council-election/";
const PRESS27 = "https://www.admin.ch/de/newnsb/vSue6NEwJdNUFXHNhHUUs";

export const BATCH3C: EditorialPreview[] = [
  {
    path: "/es/en/elections/cortes-generales-2026/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What article 1 of Royal Decree 806/2026 does is dissolve the Congress of Deputies and the Senate that were elected on 23 July 2023. Article 2 calls elections to both chambers for Sunday 29 November 2026. The decree is dated 5 October 2026 and was published in the Official State Gazette of 6 October. This preview does not reprint a seat table from the 23 July 2023 election. Infoelectoral is the administration’s record of elections already held. On 17 October 2026 there was no count of the 29 November election to copy, and none is invented. This page does not say who will form a government after the new chambers sit, and it does not call a majority.",
      "How the two chambers are filled is stated in the decree and in the organic electoral law. Article 162 of that law sets the Congress at 350 deputies. Article 3 of the decree says the deputies of each constituency are those in the annex. The annex copied onto this site sums to 350. Article 3.2, citing article 165, sets four senators for each provincial constituency, three in Gran Canaria, Mallorca and Tenerife, one in Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote and La Palma, and two each in Ceuta and Melilla. Article 84 opens voting at 09:00 and keeps it open until 20:00 local time. In the Canary Islands that close is 21:00 in peninsular time. This preview does not explain how to mark a ballot.",
      "The timetable in the decree is separate from the candidacy calendar. Article 4 runs the campaign from midnight at the start of Friday 13 November until 24:00 on Friday 27 November 2026. Article 5 calls the constitutive sittings for 23 December 2026 at 10:00. Articles 51 and 53 end campaign propaganda at midnight before the day of reflection. The Central Electoral Board’s 2026 calendar, as read for these pages, sets presentation of candidacies for 21 to 26 October, proclamation for 2 November, and publication of the proclaimed lists in the Official State Gazette for 3 November. The candidacies section read on 17 October 2026 published forms and lists of representatives. It did not publish proclaimed Congress or Senate lists.",
      "Because those lists had not been proclaimed on the day they were read, this preview does not name a party and does not summarise a programme. A programme is the text a party publishes. The Ministry of the Interior keeps the register of political parties. The full register is not reprinted, and a name from that register is not treated here as a candidacy. Parties and coalitions become candidacies for these pages when the provincial electoral board proclaims them and the gazette publishes them. Until that publication, a list of names would be an addition this page does not make.",
      "Article 69.7 is why publication of election-survey results is barred during the five days before the vote. For this election that span, as this site records it, runs from 24 November until the close in the Canary Islands at 21:00 peninsular time on 29 November 2026. The stricter rule of this site is that it prints no survey figure at any time, including before those five days, and no seat forecast. Autonomous-community, provincial and municipal elections are different votes. Mayors are not the office this decree fills. Readers who want the decree should open the Official State Gazette. Readers who want a proclaimed list, once the gazette prints one, should open the Central Electoral Board.",
    ],
    citations: [
      { label: "Real Decreto 806/2026", href: DECREE },
      { label: "Organic Law 5/1985, consolidated text", href: LOREG },
      { label: "Junta Electoral Central, general election of 29 November 2026", href: JEC },
      { label: "Junta Electoral Central, 2026 calendar", href: CAL },
    ],
  },
  {
    path: "/es/es/elections/cortes-generales-2026/",
    lang: "es",
    heading: "Vista previa editorial",
    updatedLocal: "Actualizado: 27 de octubre de 2026.",
    sourcesHeading: "Fuentes de esta vista previa",
    paragraphs: [
      "Lo que hace el artículo 1 del Real Decreto 806/2026 es disolver el Congreso de los Diputados y el Senado elegidos el 23 de julio de 2023. El artículo 2 convoca elecciones a ambas cámaras para el domingo 29 de noviembre de 2026. El decreto es de 5 de octubre de 2026 y se publicó en el Boletín Oficial del Estado del 6 de octubre. Esta vista previa no reproduce una tabla de escaños de la elección del 23 de julio de 2023. Infoelectoral es el registro de la administración sobre procesos ya celebrados. El 17 de octubre de 2026 no había un escrutinio del 29 de noviembre que copiar, y no se inventa. Esta página no proclama una mayoría.",
      "Cómo se cubren las dos cámaras está en el decreto y en la ley orgánica electoral. El artículo 162 de esa ley fija el Congreso en 350 diputados. El artículo 3 del decreto dice que los diputados de cada circunscripción son los del anexo. El anexo copiado en este sitio suma 350. El artículo 3.2, que cita el artículo 165, fija cuatro senadores por circunscripción provincial, tres en Gran Canaria, Mallorca y Tenerife, uno en Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma, y dos en Ceuta y dos en Melilla. El artículo 84 abre la votación a las nueve y la mantiene hasta las veinte horas, hora local. En Canarias ese cierre es las 21:00 en hora peninsular.",
      "El calendario del decreto es distinto del calendario de candidaturas. El artículo 4 sitúa la campaña desde las cero horas del viernes 13 de noviembre hasta las veinticuatro horas del viernes 27 de noviembre de 2026. El artículo 5 convoca las sesiones constitutivas para el 23 de diciembre de 2026 a las diez horas. Los artículos 51 y 53 cierran la propaganda electoral a las cero horas del día anterior a la votación, la jornada de reflexión. El calendario de 2026 de la Junta Electoral Central fija la presentación de candidaturas del 21 al 26 de octubre, la proclamación el 2 de noviembre y la publicación de las listas proclamadas el 3 de noviembre. El apartado de candidaturas leído el 17 de octubre de 2026 publicaba modelos e impresos y listas de representantes. No publicaba las listas proclamadas al Congreso o al Senado.",
      "Como esas listas no estaban proclamadas el día de la lectura, esta vista previa no nombra un partido y no resume un programa. Un programa es el texto que publica el propio partido. El registro de partidos políticos corresponde al Ministerio del Interior. El registro completo no se reproduce, y un nombre de ese registro no se trata aquí como candidatura. Los partidos y las coaliciones son candidaturas, a efectos de estas páginas, cuando la junta electoral provincial las proclama y el boletín las publica. Hasta esa publicación, una lista de nombres sería un añadido que esta página no hace.",
      "El artículo 69.7 es la razón por la que queda vedada la publicación de resultados de estudios electorales durante los cinco días anteriores a la votación. Para estas elecciones ese tramo va del 24 de noviembre hasta el cierre en Canarias a las 21:00, hora peninsular, del 29 de noviembre de 2026. La regla más estricta del sitio es que no imprime cifras de intención de voto en ningún momento, tampoco antes de esos cinco días, ni un reparto anticipado de escaños. Las alcaldías no son el cargo que cubre este decreto. El decreto está en el Boletín Oficial del Estado y las candidaturas proclamadas, cuando existan, en la Junta Electoral Central.",
    ],
    citations: [
      { label: "Real Decreto 806/2026", href: DECREE },
      { label: "Ley Orgánica 5/1985, texto consolidado", href: LOREG },
      { label: "Junta Electoral Central, elecciones generales del 29 de noviembre de 2026", href: JEC },
      { label: "Junta Electoral Central, calendario de 2026", href: CAL },
    ],
  },
  {
    path: "/ch/en/elections/volksabstimmung-2026-11-29/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is at stake on Sunday 29 November 2026 is a federal popular vote on four proposals, not an election of the National Council and not an election of the Council of States. The federal administration’s page, read on 27 October 2026, says people entitled to vote in Switzerland decide those four proposals that day. The Federal Council circular of 3 September 2026, BBl 2026 2406, sets that Sunday and the preceding days within the statutory limits. The release of 30 June 2026 names the same day and the same four proposals. This page does not recommend a yes or a no on any of them.",
      "The titles, as printed in the German circular, are these. A federal decree of 19 June 2026 on extra financing of the old-age and survivors’ insurance by an increase in value-added tax, BBl 2026 1757. A popular initiative of 3 November 2023 to restrict fireworks, BBl 2026 1760. A popular initiative of 27 March 2024 on fair federal taxes for married couples, BBl 2026 1758. An amendment of 19 December 2025 of the War Material Act, BBl 2026 22. Those are the administration’s titles. A committee’s recommendation, and a party’s recommendation, are texts those bodies publish. None was copied from the administration page that was read, so none is summarised here.",
      "How the papers reach voters, on the circular, is a request to the cantons to deliver them no earlier than four weeks and no later than three weeks before polling day. For Swiss abroad the circular names calendar week 43 as the earliest dispatch. The texts that were read do not print one national hour for opening the ballot boxes. This page does not invent one. No count is shown here before 12:00 Central European Time on 29 November 2026. The results service is the Federal Statistical Office page on popular votes. Cantonal and communal votes are separate. This preview does not name communal executives.",
      "The Federal Assembly, in the Constitution’s articles read for this site, is a different institution. Article 149 sets 200 seats in the National Council, elected directly by proportional representation and renewed as a whole every four years, with each canton a constituency and at least one seat. Article 150 sets 46 seats in the Council of States. This popular vote does not fill those seats. The next National Council election, in the Federal Council’s release of 27 August 2025, is 24 October 2027. That release is about how seats are distributed among the cantons. It is not a candidate list, and no 2027 names are copied here.",
      "The last National Council count this site reprints from the Federal Statistical Office table for 22 October 2023, using the abbreviations on that table, is SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2, and Lega 1. The mandate column sums to 200. Vote shares on that table are not reprinted. Those abbreviations are a count of mandates, not a statement of what a party asks voters to do on 29 November 2026, and not a programme. A programme is the text the party publishes. This preview does not rewrite one and does not rank the parties. This site prints no voting-intention figure for the popular vote or for the 2027 election.",
    ],
    citations: [
      { label: "Federal administration, popular vote of 29 November 2026", href: VOTE },
      { label: "Federal Council circular of 3 September 2026, BBl 2026 2406", href: BBL },
      { label: "Federal Statistical Office, popular votes", href: BFS_VOTE },
      { label: "National Council election results, 22 October 2023", href: BFS_2023 },
      { label: "Federal Council release, 30 June 2026", href: PRESS30 },
      { label: "Federal Council release on the 2027 seat distribution, 27 August 2025", href: PRESS27 },
    ],
  },
  {
    path: "/ch/de/elections/volksabstimmung-2026-11-29/",
    lang: "de",
    heading: "Redaktioneller Überblick",
    updatedLocal: "Stand: 27. Oktober 2026.",
    sourcesHeading: "Quellen dieses Überblicks",
    paragraphs: [
      "Am Sonntag, 29. November 2026, steht eine eidgenössische Volksabstimmung über vier Vorlagen an, keine Wahl des Nationalrats und keine Wahl des Ständerats. Die Seite der Bundesverwaltung, gelesen am 27. Oktober 2026, sagt, dass die Stimmberechtigten der Schweiz an diesem Tag über diese vier Vorlagen entscheiden. Das Kreisschreiben des Bundesrates vom 3. September 2026, BBl 2026 2406, setzt diesen Sonntag und, in den gesetzlichen Schranken, die Tage davor. Die Medienmitteilung vom 30. Juni 2026 nennt denselben Tag und dieselben vier Vorlagen. Diese Seite gibt zu keiner Vorlage eine Ja- oder Nein-Empfehlung.",
      "Die Titel, wie sie das deutsche Kreisschreiben druckt, sind diese. Der Bundesbeschluss vom 19. Juni 2026 über die Zusatzfinanzierung der AHV durch eine Erhöhung der Mehrwertsteuer, BBl 2026 1757. Die Volksinitiative vom 3. November 2023 für eine Einschränkung von Feuerwerk, BBl 2026 1760. Die Volksinitiative vom 27. März 2024 zu fairen Bundessteuern auch für Ehepaare, BBl 2026 1758. Die Änderung vom 19. Dezember 2025 des Kriegsmaterialgesetzes, BBl 2026 22. Das sind die Titel der Verwaltung. Eine Parole eines Komitees und eine Parole einer Partei sind Texte, die diese Stellen selbst veröffentlichen. Aus der gelesenen Seite der Verwaltung wurde keine übernommen, also wird hier keine zusammengefasst.",
      "Wie die Unterlagen zu den Stimmberechtigten kommen, steht im Kreisschreiben als Bitte an die Kantone, sie frühestens vier und spätestens drei Wochen vor dem Abstimmungstag zuzustellen. Für Auslandschweizerinnen und Auslandschweizer nennt es die Kalenderwoche 43 als frühesten Versand. Die gelesenen Texte nennen keine einzige nationale Uhrzeit für die Öffnung der Urnen. Diese Seite erfindet keine. Ein Ergebnis wird hier nicht vor 12:00 mitteleuropäischer Zeit am 29. November 2026 gezeigt. Der Ergebnisdienst ist die Seite des Bundesamts für Statistik zu den Abstimmungen. Kantonale und kommunale Abstimmungen sind eigene Geschäfte. Dieser Überblick nennt keine Gemeindeexekutiven.",
      "Die Bundesversammlung, nach den für diese Website gelesenen Artikeln der Bundesverfassung, ist eine andere Einrichtung. Artikel 149 setzt 200 Sitze im Nationalrat, direkt nach Proporz gewählt, mit Gesamterneuerung alle vier Jahre, jeder Kanton ein Wahlkreis und mindestens ein Sitz. Artikel 150 setzt 46 Sitze im Ständerat. Diese Volksabstimmung besetzt diese Sitze nicht. Die nächste Nationalratswahl ist nach der Medienmitteilung des Bundesrates vom 27. August 2025 auf den 24. Oktober 2027 angesetzt. Die Mitteilung betrifft die Verteilung der Sitze auf die Kantone. Sie ist keine Kandidierendenliste, und Namen für 2027 werden hier nicht kopiert.",
      "Der letzte Nationalratsstand, den diese Website aus der Tabelle des Bundesamts für Statistik zur Wahl vom 22. Oktober 2023 übernimmt, mit den Sigeln dieser Tabelle, ist SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 und Lega 1. Die Mandatsspalte summiert sich auf 200. Stimmenanteile dieser Tabelle werden nicht abgedruckt. Diese Sigel sind ein Mandatsstand, keine Aussage darüber, was eine Partei für den 29. November 2026 verlangt, und kein Programm. Ein Programm ist der Text, den die Partei veröffentlicht. Dieser Überblick schreibt ihn nicht um und reiht die Parteien nicht. Diese Website druckt keine Zahl zur Stimmabsicht, weder zur Volksabstimmung noch zur Wahl 2027.",
    ],
    citations: [
      { label: "Bundesverwaltung, Volksabstimmung vom 29. November 2026", href: VOTE },
      { label: "Kreisschreiben des Bundesrates vom 3. September 2026, BBl 2026 2406", href: BBL },
      { label: "Bundesamt für Statistik, Abstimmungen", href: BFS_VOTE },
      { label: "Ergebnisse der Nationalratswahlen vom 22. Oktober 2023", href: BFS_2023 },
      { label: "Medienmitteilung des Bundesrates, 30. Juni 2026", href: PRESS30 },
      { label: "Medienmitteilung zur Sitzverteilung 2027, 27. August 2025", href: PRESS27 },
    ],
  },
  {
    path: "/ch/fr/elections/volksabstimmung-2026-11-29/",
    lang: "fr",
    heading: "Aperçu éditorial",
    updatedLocal: "Mis à jour : 27 octobre 2026.",
    sourcesHeading: "Sources de cet aperçu",
    paragraphs: [
      "L’enjeu du dimanche 29 novembre 2026 est une votation populaire fédérale sur quatre objets, pas une élection du Conseil national et pas une élection du Conseil des États. La page de l’administration fédérale, lue le 27 octobre 2026, dit que les personnes ayant le droit de vote en Suisse se prononcent ce jour-là sur ces quatre objets. La circulaire du Conseil fédéral du 3 septembre 2026, FF 2026 2406, fixe ce dimanche et, dans les limites légales, les jours qui précèdent. Le communiqué du 30 juin 2026 nomme le même jour et les quatre mêmes objets. Cette page ne recommande ni le oui ni le non.",
      "Les titres, tels que la circulaire allemande les imprime, sont ceux-ci. L’arrêté fédéral du 19 juin 2026 sur le financement additionnel de l’AVS par une hausse de la taxe sur la valeur ajoutée, FF 2026 1757. L’initiative populaire du 3 novembre 2023 visant à restreindre les feux d’artifice, FF 2026 1760. L’initiative populaire du 27 mars 2024 sur un impôt fédéral équitable aussi pour les couples mariés, FF 2026 1758. La modification du 19 décembre 2025 de la loi sur le matériel de guerre, FF 2026 22. Ce sont les titres de l’administration. Une consigne de comité et une consigne de parti sont des textes que ces organes publient. Aucune n’a été copiée depuis la page de l’administration qui a été lue, donc aucune n’est résumée ici.",
      "L’acheminement du matériel, dans la circulaire, est une demande aux cantons de le remettre au plus tôt quatre semaines et au plus tard trois semaines avant le jour du scrutin. Pour les Suisses de l’étranger, elle cite la semaine civile 43 comme premier envoi. Les textes lus ne donnent pas une seule heure nationale d’ouverture des urnes. Cette page n’en invente pas. Aucun résultat n’est montré ici avant 12 h, heure de l’Europe centrale, le 29 novembre 2026. Le service des résultats est la page de l’Office fédéral de la statistique sur les votations. Les votations cantonales et communales sont d’autres objets. Cet aperçu ne nomme pas d’exécutifs communaux.",
      "L’Assemblée fédérale, selon les articles de la Constitution lus pour ce site, est une autre institution. L’article 149 fixe 200 sièges au Conseil national, élus au scrutin proportionnel direct, renouvelés intégralement tous les quatre ans, chaque canton formant une circonscription et disposant d’au moins un siège. L’article 150 fixe 46 sièges au Conseil des États. Cette votation ne pourvoit pas ces sièges. La prochaine élection du Conseil national, dans le communiqué du Conseil fédéral du 27 août 2025, est le 24 octobre 2027. Ce communiqué porte sur la répartition des sièges entre les cantons. Ce n’est pas une liste de candidatures, et aucun nom pour 2027 n’est copié ici.",
      "Le dernier décompte du Conseil national que ce site reprend du tableau de l’Office fédéral de la statistique pour le 22 octobre 2023, avec les sigles de ce tableau, est SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 et Lega 1. La colonne des mandats additionne 200. Les parts de voix de ce tableau ne sont pas reproduites. Ces sigles sont un décompte de mandats, pas une déclaration de ce qu’un parti demande pour le 29 novembre 2026, et pas un programme. Un programme est le texte que le parti publie. Cet aperçu ne le réécrit pas et ne classe pas les partis. Ce site n’imprime aucun chiffre d’intention de vote, ni pour la votation ni pour l’élection de 2027.",
    ],
    citations: [
      { label: "Administration fédérale, votation du 29 novembre 2026", href: VOTE },
      { label: "Circulaire du Conseil fédéral du 3 septembre 2026, FF 2026 2406", href: BBL },
      { label: "Office fédéral de la statistique, votations", href: BFS_VOTE },
      { label: "Résultats de l’élection du Conseil national du 22 octobre 2023", href: BFS_2023 },
      { label: "Communiqué du Conseil fédéral, 30 juin 2026", href: PRESS30 },
      { label: "Communiqué sur la répartition des sièges en 2027, 27 août 2025", href: PRESS27 },
    ],
  },
  {
    path: "/ch/it/elections/volksabstimmung-2026-11-29/",
    lang: "it",
    heading: "Anteprima editoriale",
    updatedLocal: "Aggiornato: 27 ottobre 2026.",
    sourcesHeading: "Fonti di questa anteprima",
    paragraphs: [
      "La posta in gioco di domenica 29 novembre 2026 è una votazione popolare federale su quattro oggetti, non un’elezione del Consiglio nazionale e non un’elezione del Consiglio degli Stati. La pagina dell’amministrazione federale, letta il 27 ottobre 2026, dice che gli aventi diritto di voto in Svizzera si pronunciano quel giorno su questi quattro oggetti. La circolare del Consiglio federale del 3 settembre 2026, FF 2026 2406, fissa quella domenica e, nei limiti di legge, i giorni precedenti. Il comunicato del 30 giugno 2026 indica lo stesso giorno e gli stessi quattro oggetti. Questa pagina non raccomanda né il sì né il no.",
      "I titoli, come li stampa la circolare tedesca, sono questi. Il decreto federale del 19 giugno 2026 sul finanziamento aggiuntivo dell’AVS mediante un aumento dell’imposta sul valore aggiunto, FF 2026 1757. L’iniziativa popolare del 3 novembre 2023 per una limitazione dei fuochi d’artificio, FF 2026 1760. L’iniziativa popolare del 27 marzo 2024 su imposte federali eque anche per le coppie sposate, FF 2026 1758. La modifica del 19 dicembre 2025 della legge sul materiale bellico, FF 2026 22. Sono i titoli dell’amministrazione. Una consegna di un comitato e una consegna di un partito sono testi che quegli organi pubblicano. Nessuna è stata copiata dalla pagina dell’amministrazione che è stata letta, quindi nessuna è riassunta qui.",
      "Come il materiale arriva agli aventi diritto, nella circolare, è una richiesta ai Cantoni di consegnarlo al più presto quattro settimane e al più tardi tre settimane prima del giorno della votazione. Per gli Svizzeri all’estero indica la settimana civile 43 come primo invio. I testi letti non fissano un’unica ora nazionale di apertura delle urne. Questa pagina non ne inventa una. Nessun risultato è mostrato qui prima delle ore 12:00, ora dell’Europa centrale, del 29 novembre 2026. Il servizio dei risultati è la pagina dell’Ufficio federale di statistica sulle votazioni. Le votazioni cantonali e comunali sono altri oggetti. Questa anteprima non nomina esecutivi comunali.",
      "L’Assemblea federale, secondo gli articoli della Costituzione letti per questo sito, è un’altra istituzione. L’articolo 149 fissa 200 seggi nel Consiglio nazionale, eletti direttamente con il sistema proporzionale, rinnovati integralmente ogni quattro anni; ogni Cantone è una circoscrizione e ha almeno un seggio. L’articolo 150 fissa 46 seggi nel Consiglio degli Stati. Questa votazione non assegna quei seggi. La prossima elezione del Consiglio nazionale, nel comunicato del Consiglio federale del 27 agosto 2025, è il 24 ottobre 2027. Quel comunicato riguarda la ripartizione dei seggi tra i Cantoni. Non è una lista di candidature, e nessun nome per il 2027 è copiato qui.",
      "L’ultimo conteggio del Consiglio nazionale che questo sito riprende dalla tabella dell’Ufficio federale di statistica per il 22 ottobre 2023, con le sigle di quella tabella, è SVP 62, SP 41, Mitte 29, FDP 28, GRÜNE 23, GLP 10, EVP 2, EDU 2, MCR 2 e Lega 1. La colonna dei mandati somma 200. Le quote di voto di quella tabella non sono ristampate. Quelle sigle sono un conteggio di mandati, non una dichiarazione di ciò che un partito chiede per il 29 novembre 2026, e non un programma. Un programma è il testo che il partito pubblica. Questa anteprima non lo riscrive e non mette i partiti in ordine. Questo sito non stampa cifre sull’intenzione di voto, né per la votazione né per l’elezione del 2027.",
    ],
    citations: [
      { label: "Amministrazione federale, votazione del 29 novembre 2026", href: VOTE },
      { label: "Circolare del Consiglio federale del 3 settembre 2026, FF 2026 2406", href: BBL },
      { label: "Ufficio federale di statistica, votazioni", href: BFS_VOTE },
      { label: "Risultati dell’elezione del Consiglio nazionale del 22 ottobre 2023", href: BFS_2023 },
      { label: "Comunicato del Consiglio federale, 30 giugno 2026", href: PRESS30 },
      { label: "Comunicato sulla ripartizione dei seggi nel 2027, 27 agosto 2025", href: PRESS27 },
    ],
  },
];
