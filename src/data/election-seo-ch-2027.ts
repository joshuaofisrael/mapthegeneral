/**
 * Federal popular vote of 28 February 2027.
 * Dates and titles are copied from the Federal Chancellery releases
 * read on 12 November 2026. The English release page states that the
 * content is not available in English. No circular with postal deadlines
 * or a polling-hour was in the texts that were read, so none is printed.
 * No poll, projection, or result is stored here.
 */
import type { ElectionSeoProfile } from "./election-seo";

const PRESS_DE = "https://www.bk.admin.ch/de/newnsb/jySr77K8EibE";
const PRESS_FR = "https://www.bk.admin.ch/fr/newnsb/jySr77K8EibE";
const PRESS_IT = "https://www.bk.admin.ch/it/newnsb/jySr77K8EibE";
const PRESS_EN = "https://www.bk.admin.ch/en/newnsb/jySr77K8EibE";
const BFS = "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html";
const LIST_DE = `<ul>
<li>Volksinitiative «Ja zum Importverbot für Stopfleber (Stopfleber-Initiative)» (BBl 2026 2712)</li>
<li>Volksinitiative «Für ein modernes Bürgerrecht (Demokratie-Initiative)» (BBl 2026 2714)</li>
<li>Bundesbeschluss vom 19. Juni 2026 über die Genehmigung des Wirtschafts-partnerschaftsabkommens zwischen den EFTA-Staaten und Malaysia (BBl 2026 1777)</li>
<li>Änderung vom 19. Juni 2026 des Kernenergiegesetzes (KEG) (BBl 2026 1772)</li>
<li>Änderung vom 19. Juni 2026 des Bundesgesetzes über die Allgemeinverbindlich-erklärung von Gesamtarbeitsverträgen (Allgemeinverbindlicherklärung von Mindestlöhnen, die unter kantonalen Mindestlöhnen liegen) (BBl 2026 1770)</li>
</ul>`;

const LIST_FR = `<ul>
<li>Initiative populaire « Oui à l’interdiction d’importer du foie gras (initiative foie gras) » (FF 2026 2712)</li>
<li>Initiative populaire « Pour un droit de la nationalité moderne (initiative pour la démocratie) » (FF 2026 2714)</li>
<li>Arrêté fédéral du 19 juin 2026 portant approbation de l’Accord de partenariat économique entre les États de l’AELE et la Malaisie (FF 2026 1777)</li>
<li>Modification du 19 juin 2026 de la loi sur l’énergie nucléaire (LENu) (FF 2026 1772)</li>
<li>Modification du 19 juin 2026 de la loi fédérale permettant d’étendre le champ d’application de la convention collective de travail (Extension de salaires minimaux inférieurs aux salaires minimaux cantonaux) (FF 2026 1770)</li>
</ul>`;

const LIST_IT = `<ul>
<li>Iniziativa popolare «Sì al divieto di importazione di foie gras (Iniziativa foie gras)» (FF 2026 2712)</li>
<li>Iniziativa popolare «Per un diritto di cittadinanza moderno (Iniziativa per la democrazia)» (FF 2026 2714)</li>
<li>Decreto federale del 19 giugno 2026 che approva l’Accordo di partenariato economico tra gli Stati dell’AELS e la Malaysia (FF 2026 1777)</li>
<li>Modifica del 19 giugno 2026 della legge federale sull’energia nucleare (LENu) (FF 2026 1772)</li>
<li>Modifica del 19 giugno 2026 della legge federale concernente il conferimento del carattere obbligatorio generale al contratto collettivo di lavoro (Conferimento del carattere obbligatorio generale ai salari minimi inferiori ai salari minimi cantonali) (FF 2026 1770)</li>
</ul>`;

const CH_DE = `<h2>Worüber abgestimmt wird</h2>
<p>Die Medienmitteilung der Bundeskanzlei vom 28. Oktober 2026, gelesen am 12. November 2026, sagt: der Bundesrat hat an seiner Sitzung vom 28. Oktober 2026 beschlossen, fünf Vorlagen am 28. Februar 2027 zur Abstimmung zu bringen. Die Titel unten sind die Titel dieser Mitteilung. Diese Seite gibt zu keiner Vorlage eine Empfehlung.</p>
${LIST_DE}
<p class="tools"><a href="/ch/de/">Schweiz</a> · <a href="/ch/de/elections/volksabstimmung-2026-11-29/">Volksabstimmung, 29. November 2026</a> · <a href="/ch/de/elections/nationalrat-2027/">Nationalrat, 24. Oktober 2027</a> · <a href="/ch/fr/elections/volksabstimmung-2027-02-28/">Français</a> · <a href="/ch/it/elections/volksabstimmung-2027-02-28/">Italiano</a> · <a href="/ch/en/elections/volksabstimmung-2027-02-28/">English</a></p>
<h2>Wie abgestimmt wird</h2>
<p>Die gelesene Mitteilung nennt den Abstimmungstag und die fünf Vorlagen. Sie nennt keine nationale Uhrzeit für die Öffnung der Urnen und keine Frist für die Zustellung der Stimmunterlagen. Diese Seite erfindet keine solche Angabe. Ein Ergebnis wird hier nicht vor 00:00 mitteleuropäischer Zeit am 1. März 2027 gezeigt. Der Ergebnisdienst ist die Seite des Bundesamts für Statistik zu Abstimmungen.</p>
<h2>Frühere Abstimmungen</h2>
<p>Die Volksabstimmung vom 29. November 2026 hat auf dieser Website eine eigene Seite. Frühere eidgenössische Volksabstimmungen stehen auf der <a href="${BFS}">Seite des Bundesamts für Statistik</a>. Diese Seite übernimmt daraus keinen Anteil.</p>
<h2>Ergebnis</h2>
<p>Diese Seite zeigt keine Zahlen und spricht keine Empfehlung aus.</p>`;

const CH_FR = `<h2>Sur quoi porte le vote</h2>
<p>Le communiqué de la Chancellerie fédérale du 28 octobre 2026, lu le 12 novembre 2026, dit que le Conseil fédéral a décidé, lors de sa séance du 28 octobre 2026, de soumettre cinq objets à la votation populaire du 28 février 2027. Les titres ci-dessous sont ceux de ce communiqué. Cette page ne formule aucune recommandation.</p>
${LIST_FR}
<p class="tools"><a href="/ch/fr/">Suisse</a> · <a href="/ch/fr/elections/volksabstimmung-2026-11-29/">Votation du 29 novembre 2026</a> · <a href="/ch/fr/elections/nationalrat-2027/">Conseil national, 24 octobre 2027</a> · <a href="/ch/de/elections/volksabstimmung-2027-02-28/">Deutsch</a></p>
<h2>Comment on vote</h2>
<p>Le communiqué lu nomme le jour de la votation et les cinq objets. Il ne donne pas une heure nationale d’ouverture des urnes ni un délai d’envoi du matériel de vote. Cette page n’en invente pas. Aucun résultat n’est montré ici avant minuit, heure de l’Europe centrale, au début du 1er mars 2027. Le service des résultats est la page de l’Office fédéral de la statistique sur les votations.</p>
<h2>Votes précédents</h2>
<p>La votation du 29 novembre 2026 a sa propre page sur ce site. Les votations fédérales antérieures sont sur la <a href="${BFS}">page de l’Office fédéral de la statistique</a>. Cette page n’en reprend aucune part.</p>
<h2>Résultat</h2>
<p>Cette page ne montre aucun chiffre et ne formule aucune recommandation.</p>`;

const CH_IT = `<h2>Su che cosa si vota</h2>
<p>Il comunicato della Cancelleria federale del 28 ottobre 2026, letto il 12 novembre 2026, dice che il Consiglio federale, nella seduta del 28 ottobre 2026, ha deciso di sottoporre cinque oggetti alla votazione popolare del 28 febbraio 2027. I titoli sotto sono quelli di quel comunicato. Questa pagina non formula alcuna raccomandazione.</p>
${LIST_IT}
<p class="tools"><a href="/ch/it/">Svizzera</a> · <a href="/ch/it/elections/volksabstimmung-2026-11-29/">Votazione del 29 novembre 2026</a> · <a href="/ch/it/elections/nationalrat-2027/">Consiglio nazionale, 24 ottobre 2027</a> · <a href="/ch/de/elections/volksabstimmung-2027-02-28/">Deutsch</a></p>
<h2>Come si vota</h2>
<p>Il comunicato letto indica il giorno della votazione e i cinque oggetti. Non fissa un’unica ora nazionale di apertura delle urne né un termine per la consegna del materiale di voto. Questa pagina non ne inventa uno. Nessun risultato è mostrato qui prima della mezzanotte, ora dell’Europa centrale, all’inizio del 1° marzo 2027. Il servizio dei risultati è la pagina dell’Ufficio federale di statistica sulle votazioni.</p>
<h2>Votazioni precedenti</h2>
<p>La votazione del 29 novembre 2026 ha una propria pagina su questo sito. Le votazioni federali precedenti sono sulla <a href="${BFS}">pagina dell’Ufficio federale di statistica</a>. Questa pagina non ne copia una quota.</p>
<h2>Risultato</h2>
<p>Questa pagina non mostra cifre e non formula una raccomandazione.</p>`;

const CH_EN = `<h2>What is being decided</h2>
<p>The Federal Chancellery’s English page for this release, read on 12 November 2026, says the content is not available in English. The German, French and Italian releases, read the same day, say the Federal Council decided at its meeting of 28 October 2026 to put five proposals to a popular vote on 28 February 2027. The titles below are those in the German release. This page does not recommend a yes or a no.</p>
${LIST_DE}
<p class="tools"><a href="/ch/en/">Switzerland</a> · <a href="/ch/en/elections/volksabstimmung-2026-11-29/">Popular vote of 29 November 2026</a> · <a href="/ch/en/elections/nationalrat-2027/">National Council, 24 October 2027</a> · <a href="/ch/de/elections/volksabstimmung-2027-02-28/">Deutsch</a></p>
<h2>How people vote</h2>
<p>The releases that were read name polling day and the five proposals. They do not print one national hour for opening the ballot boxes, and they do not print a deadline for sending the voting papers. This page does not invent either. No count is shown here before midnight Central European Time at the start of 1 March 2027. The results service is the Federal Statistical Office page on popular votes.</p>
<h2>Earlier votes</h2>
<p>The popular vote of 29 November 2026 has its own page on this site. Earlier federal popular votes are on the <a href="${BFS}">Federal Statistical Office page</a>. This page does not copy a share from an earlier vote.</p>
<h2>Result</h2>
<p>This page shows no figures and makes no recommendation.</p>`;

const chAlternates = [
  { hreflang: "de", path: "/ch/de/elections/volksabstimmung-2027-02-28/" },
  { hreflang: "fr", path: "/ch/fr/elections/volksabstimmung-2027-02-28/" },
  { hreflang: "it", path: "/ch/it/elections/volksabstimmung-2027-02-28/" },
  { hreflang: "en", path: "/ch/en/elections/volksabstimmung-2027-02-28/" },
  { hreflang: "x-default", path: "/ch/de/elections/volksabstimmung-2027-02-28/" },
];

export const CH_2027_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "ch-2027-02-28",
    pollingDay: "2027-02-28",
    startDate: "2027-02-28T00:00:00+01:00",
    endDate: "2027-03-01T00:00:00+01:00",
    organizerName: "Swiss Federal Chancellery",
    organizerUrl: PRESS_DE,
    imagePath: "/images/og/ch.webp",
    lastmod: "2026-11-12",
    pinOnHome: true,
    homeLinks: [
      {
        href: "/ch/de/elections/volksabstimmung-2027-02-28/",
        label: "Schweiz: Volksabstimmung vom 28. Februar 2027",
        detail: "Sonntag, 28. Februar 2027. Fünf Vorlagen. Datum aus der Medienmitteilung der Bundeskanzlei vom 28. Oktober 2026.",
      },
      {
        href: "/ch/en/elections/volksabstimmung-2027-02-28/",
        label: "Switzerland federal popular vote, 28 February 2027",
        detail: "Sunday 28 February 2027. Five proposals. The date is in the Federal Chancellery release of 28 October 2026.",
      },
    ],
    pages: [
      {
        lang: "de",
        htmlLang: "de",
        path: "/ch/de/elections/volksabstimmung-2027-02-28/",
        title: "Schweiz: Volksabstimmung vom 28. Februar 2027",
        description:
          "Volksabstimmung in der Schweiz am Sonntag, 28. Februar 2027, über fünf Vorlagen. Amtliche Quellen, kein Ergebnis. Inoffizielle Information.",
        ogDescription: "Volksabstimmung in der Schweiz, Sonntag 28. Februar 2027, fünf Vorlagen. Inoffizielle Information.",
        ogLocale: "de_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Start", path: "/" },
          { name: "Schweiz", path: "/ch/" },
          { name: "Schweiz", path: "/ch/de/" },
          { name: "Wahlen", path: "/ch/de/elections/" },
          { name: "28. Februar 2027", path: "/ch/de/elections/volksabstimmung-2027-02-28/" },
        ],
        eyebrow: "Sonntag, 28. Februar 2027",
        h1: "Eidgenössische Volksabstimmung",
        lede: "Fünf Vorlagen. Die Medienmitteilung der Bundeskanzlei vom 28. Oktober 2026 nennt den Abstimmungssonntag.",
        updated: "Zuletzt aktualisiert: 12. November 2026.",
        reportLabel: "Fehler melden",
        officeHref: PRESS_DE,
        bannerBefore: "Inoffizielle Information. Bitte prüfen Sie die Angaben bei der ",
        bannerAfter: "Bundeskanzlei",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/de/", label: "Schweiz" },
          { href: "/ch/en/elections/volksabstimmung-2027-02-28/", label: "English" },
        ],
        eventName: "Eidgenössische Volksabstimmung vom 28. Februar 2027",
        locationName: "Schweiz",
        addressRegion: "Schweiz",
        addressCountry: "CH",
        keyDatesHeading: "Abstimmen, Daten und amtliche Quellen",
        keyDatesIntro: "Die Daten stehen in der Medienmitteilung der Bundeskanzlei. Eine Uhrzeit, die dort nicht steht, steht hier nicht.",
        keyDates: [
          {
            label: "Abstimmungssonntag",
            text: "Die Medienmitteilung der Bundeskanzlei vom 28. Oktober 2026 sagt, der Bundesrat habe beschlossen, fünf Vorlagen am 28. Februar 2027 zur Abstimmung zu bringen.",
            links: [{ label: "Medienmitteilung der Bundeskanzlei", href: PRESS_DE }],
          },
          {
            label: "Fünf Vorlagen",
            text: "Die Medienmitteilung der Bundeskanzlei nennt fünf Vorlagen, darunter zwei Volksinitiativen und drei Bundesvorlagen, mit den Nummern im Bundesblatt.",
            links: [{ label: "Medienmitteilung der Bundeskanzlei", href: PRESS_DE }],
          },
          {
            label: "Ergebnisse",
            text: "Die Seite des Bundesamts für Statistik zu Abstimmungen ist der Ergebnisdienst. Die gelesene Mitteilung nennt keine Ergebnisstunde. Diese Seite zeigt vor 00:00 mitteleuropäischer Zeit am 1. März 2027 kein Ergebnis.",
            links: [{ label: "Seite des Bundesamts für Statistik zu Abstimmungen", href: BFS }],
          },
        ],
        faqHeading: "Häufige Fragen",
        faqs: [
          {
            question: "Wann ist die Volksabstimmung vom Februar 2027?",
            text: "Die Medienmitteilung der Bundeskanzlei vom 28. Oktober 2026 nennt den 28. Februar 2027.",
            links: [{ label: "Medienmitteilung der Bundeskanzlei", href: PRESS_DE }],
          },
          {
            question: "Worüber stimmt die Schweiz am 28. Februar 2027 ab?",
            text: "Die Medienmitteilung der Bundeskanzlei nennt fünf Vorlagen, darunter die Stopfleber-Initiative, die Demokratie-Initiative, ein Wirtschaftspartnerschaftsabkommen mit Malaysia, eine Änderung des Kernenergiegesetzes und eine Änderung zur Allgemeinverbindlicherklärung von Gesamtarbeitsverträgen.",
            links: [{ label: "Medienmitteilung der Bundeskanzlei", href: PRESS_DE }],
          },
          {
            question: "Wer hat den Abstimmungstermin festgesetzt?",
            text: "Die Medienmitteilung der Bundeskanzlei sagt, der Bundesrat habe an seiner Sitzung vom 28. Oktober 2026 beschlossen, die fünf Vorlagen am 28. Februar 2027 zur Abstimmung zu bringen.",
            links: [{ label: "Medienmitteilung der Bundeskanzlei", href: PRESS_DE }],
          },
          {
            question: "Wo stehen die Ergebnisse der Volksabstimmung?",
            text: "Diese Seite zeigt kein Ergebnis. Die Seite des Bundesamts für Statistik zu Abstimmungen ist der amtliche Ergebnisdienst.",
            links: [{ label: "Seite des Bundesamts für Statistik zu Abstimmungen", href: BFS }],
          },
        ],
        relatedHeading: "Weitere Seiten",
        related: [
          { href: "/", label: "Start" },
          { href: "/ch/de/", label: "Schweiz" },
          { href: "/ch/de/elections/", label: "Wahlen" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "29. November 2026" },
          { href: "/ch/de/elections/nationalrat-2027/", label: "Nationalrat 2027" },
          { href: "/ch/en/elections/volksabstimmung-2027-02-28/", label: "English" },
        ],
        bodyHtml: CH_DE,
        sourcesHeading: "Quellen",
        sources: [
          { href: PRESS_DE, label: "Bundeskanzlei, Medienmitteilung, Abstimmungsvorlagen für den 28. Februar 2027, 28. Oktober 2026", readOn: "2026-11-12" },
          { href: PRESS_FR, label: "Chancellerie fédérale, communiqué, 28 octobre 2026", readOn: "2026-11-12" },
          { href: PRESS_IT, label: "Cancelleria federale, comunicato, 28 ottobre 2026", readOn: "2026-11-12" },
          { href: BFS, label: "Bundesamt für Statistik, Abstimmungen", readOn: "2026-11-12" },
        ],
      },
      {
        lang: "fr",
        htmlLang: "fr",
        path: "/ch/fr/elections/volksabstimmung-2027-02-28/",
        title: "Suisse : votation populaire du 28 février 2027",
        description:
          "Votation populaire en Suisse le dimanche 28 février 2027, cinq objets. Aucun résultat. Information non officielle.",
        ogDescription: "Votation populaire en Suisse, dimanche 28 février 2027, cinq objets. Information non officielle.",
        ogLocale: "fr_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Accueil", path: "/" },
          { name: "Suisse", path: "/ch/" },
          { name: "Suisse", path: "/ch/fr/" },
          { name: "Élections", path: "/ch/fr/elections/" },
          { name: "28 février 2027", path: "/ch/fr/elections/volksabstimmung-2027-02-28/" },
        ],
        eyebrow: "Dimanche 28 février 2027",
        h1: "Votation populaire fédérale",
        lede: "Cinq objets. Le communiqué de la Chancellerie fédérale du 28 octobre 2026 nomme le dimanche de votation.",
        updated: "Dernière mise à jour : 12 novembre 2026.",
        reportLabel: "Signaler une erreur",
        officeHref: PRESS_FR,
        bannerBefore: "Information non officielle. Vérifiez auprès de la ",
        bannerAfter: "Chancellerie fédérale",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/fr/", label: "Suisse" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        eventName: "Votation populaire fédérale du 28 février 2027",
        locationName: "Suisse",
        addressRegion: "Suisse",
        addressCountry: "CH",
        keyDatesHeading: "Voter, dates et sources officielles",
        keyDatesIntro: "Les dates viennent du communiqué de la Chancellerie fédérale. Une heure qui n’y figure pas n’est pas inventée ici.",
        keyDates: [
          {
            label: "Jour de la votation",
            text: "Le communiqué de la Chancellerie fédérale du 28 octobre 2026 dit que le Conseil fédéral a décidé de soumettre cinq objets à la votation populaire du 28 février 2027.",
            links: [{ label: "communiqué de la Chancellerie fédérale", href: PRESS_FR }],
          },
          {
            label: "Cinq objets",
            text: "Le communiqué de la Chancellerie fédérale nomme cinq objets, dont deux initiatives populaires et trois objets fédéraux, avec les numéros de la Feuille fédérale.",
            links: [{ label: "communiqué de la Chancellerie fédérale", href: PRESS_FR }],
          },
          {
            label: "Résultats",
            text: "La page de l’Office fédéral de la statistique sur les votations est le service des résultats. Le communiqué lu ne donne pas une heure de publication. Cette page ne montre aucun résultat avant minuit, heure de l’Europe centrale, au début du 1er mars 2027.",
            links: [{ label: "page de l’Office fédéral de la statistique sur les votations", href: BFS }],
          },
        ],
        faqHeading: "Questions fréquentes",
        faqs: [
          {
            question: "Quand a lieu la votation populaire de février 2027 ?",
            text: "Le communiqué de la Chancellerie fédérale du 28 octobre 2026 nomme le 28 février 2027.",
            links: [{ label: "communiqué de la Chancellerie fédérale", href: PRESS_FR }],
          },
          {
            question: "Sur quoi la Suisse vote-t-elle le 28 février 2027 ?",
            text: "Le communiqué de la Chancellerie fédérale nomme cinq objets, dont l’initiative foie gras, l’initiative pour la démocratie, un accord de partenariat économique avec la Malaisie, une modification de la loi sur l’énergie nucléaire et une modification relative à l’extension de conventions collectives.",
            links: [{ label: "communiqué de la Chancellerie fédérale", href: PRESS_FR }],
          },
          {
            question: "Qui a fixé la date de la votation ?",
            text: "Le communiqué de la Chancellerie fédérale dit que le Conseil fédéral a décidé, lors de sa séance du 28 octobre 2026, de soumettre les cinq objets à la votation du 28 février 2027.",
            links: [{ label: "communiqué de la Chancellerie fédérale", href: PRESS_FR }],
          },
          {
            question: "Où sont publiés les résultats de la votation ?",
            text: "Cette page ne montre aucun résultat. La page de l’Office fédéral de la statistique sur les votations est le service officiel des résultats.",
            links: [{ label: "page de l’Office fédéral de la statistique sur les votations", href: BFS }],
          },
        ],
        relatedHeading: "Autres pages",
        related: [
          { href: "/", label: "Accueil" },
          { href: "/ch/fr/", label: "Suisse" },
          { href: "/ch/fr/elections/", label: "Élections" },
          { href: "/ch/fr/elections/volksabstimmung-2026-11-29/", label: "29 novembre 2026" },
          { href: "/ch/fr/elections/nationalrat-2027/", label: "Conseil national 2027" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        bodyHtml: CH_FR,
        sourcesHeading: "Sources",
        sources: [
          { href: PRESS_FR, label: "Chancellerie fédérale, communiqué, objets de la votation populaire du 28 février 2027, 28 octobre 2026", readOn: "2026-11-12" },
          { href: PRESS_DE, label: "Bundeskanzlei, Medienmitteilung, 28. Oktober 2026", readOn: "2026-11-12" },
          { href: PRESS_IT, label: "Cancelleria federale, comunicato, 28 ottobre 2026", readOn: "2026-11-12" },
          { href: BFS, label: "Office fédéral de la statistique, votations", readOn: "2026-11-12" },
        ],
      },
      {
        lang: "it",
        htmlLang: "it",
        path: "/ch/it/elections/volksabstimmung-2027-02-28/",
        title: "Svizzera: votazione popolare del 28 febbraio 2027",
        description:
          "Votazione popolare in Svizzera domenica 28 febbraio 2027, cinque oggetti. Nessun risultato. Informazione non ufficiale.",
        ogDescription: "Votazione popolare in Svizzera, domenica 28 febbraio 2027, cinque oggetti. Informazione non ufficiale.",
        ogLocale: "it_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Svizzera", path: "/ch/" },
          { name: "Svizzera", path: "/ch/it/" },
          { name: "Elezioni", path: "/ch/it/elections/" },
          { name: "28 febbraio 2027", path: "/ch/it/elections/volksabstimmung-2027-02-28/" },
        ],
        eyebrow: "Domenica 28 febbraio 2027",
        h1: "Votazione popolare federale",
        lede: "Cinque oggetti. Il comunicato della Cancelleria federale del 28 ottobre 2026 indica la domenica di votazione.",
        updated: "Ultimo aggiornamento: 12 novembre 2026.",
        reportLabel: "Segnalare un errore",
        officeHref: PRESS_IT,
        bannerBefore: "Informazione non ufficiale. Verificate presso la ",
        bannerAfter: "Cancelleria federale",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/it/", label: "Svizzera" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        eventName: "Votazione popolare federale del 28 febbraio 2027",
        locationName: "Svizzera",
        addressRegion: "Svizzera",
        addressCountry: "CH",
        keyDatesHeading: "Votare, date e fonti ufficiali",
        keyDatesIntro: "Le date provengono dal comunicato della Cancelleria federale. Un’ora che non vi figura non è inventata qui.",
        keyDates: [
          {
            label: "Giorno della votazione",
            text: "Il comunicato della Cancelleria federale del 28 ottobre 2026 dice che il Consiglio federale ha deciso di sottoporre cinque oggetti alla votazione popolare del 28 febbraio 2027.",
            links: [{ label: "comunicato della Cancelleria federale", href: PRESS_IT }],
          },
          {
            label: "Cinque oggetti",
            text: "Il comunicato della Cancelleria federale indica cinque oggetti, tra cui due iniziative popolari e tre oggetti federali, con i numeri del Foglio federale.",
            links: [{ label: "comunicato della Cancelleria federale", href: PRESS_IT }],
          },
          {
            label: "Risultati",
            text: "La pagina dell’Ufficio federale di statistica sulle votazioni è il servizio dei risultati. Il comunicato letto non indica un’ora di pubblicazione. Questa pagina non mostra risultati prima della mezzanotte, ora dell’Europa centrale, all’inizio del 1° marzo 2027.",
            links: [{ label: "pagina dell’Ufficio federale di statistica sulle votazioni", href: BFS }],
          },
        ],
        faqHeading: "Domande frequenti",
        faqs: [
          {
            question: "Quando si tiene la votazione popolare di febbraio 2027?",
            text: "Il comunicato della Cancelleria federale del 28 ottobre 2026 indica il 28 febbraio 2027.",
            links: [{ label: "comunicato della Cancelleria federale", href: PRESS_IT }],
          },
          {
            question: "Su che cosa vota la Svizzera il 28 febbraio 2027?",
            text: "Il comunicato della Cancelleria federale indica cinque oggetti, tra cui l’iniziativa foie gras, l’iniziativa per la democrazia, un accordo di partenariato economico con la Malaysia, una modifica della legge sull’energia nucleare e una modifica relativa al carattere obbligatorio generale dei contratti collettivi.",
            links: [{ label: "comunicato della Cancelleria federale", href: PRESS_IT }],
          },
          {
            question: "Chi ha fissato la data della votazione?",
            text: "Il comunicato della Cancelleria federale dice che il Consiglio federale, nella seduta del 28 ottobre 2026, ha deciso di sottoporre i cinque oggetti alla votazione del 28 febbraio 2027.",
            links: [{ label: "comunicato della Cancelleria federale", href: PRESS_IT }],
          },
          {
            question: "Dove sono pubblicati i risultati della votazione?",
            text: "Questa pagina non mostra risultati. La pagina dell’Ufficio federale di statistica sulle votazioni è il servizio ufficiale dei risultati.",
            links: [{ label: "pagina dell’Ufficio federale di statistica sulle votazioni", href: BFS }],
          },
        ],
        relatedHeading: "Altre pagine",
        related: [
          { href: "/", label: "Home" },
          { href: "/ch/it/", label: "Svizzera" },
          { href: "/ch/it/elections/", label: "Elezioni" },
          { href: "/ch/it/elections/volksabstimmung-2026-11-29/", label: "29 novembre 2026" },
          { href: "/ch/it/elections/nationalrat-2027/", label: "Consiglio nazionale 2027" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        bodyHtml: CH_IT,
        sourcesHeading: "Fonti",
        sources: [
          { href: PRESS_IT, label: "Cancelleria federale, comunicato, oggetti della votazione popolare del 28 febbraio 2027, 28 ottobre 2026", readOn: "2026-11-12" },
          { href: PRESS_DE, label: "Bundeskanzlei, Medienmitteilung, 28. Oktober 2026", readOn: "2026-11-12" },
          { href: PRESS_FR, label: "Chancellerie fédérale, communiqué, 28 octobre 2026", readOn: "2026-11-12" },
          { href: BFS, label: "Ufficio federale di statistica, votazioni", readOn: "2026-11-12" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: "/ch/en/elections/volksabstimmung-2027-02-28/",
        title: "Switzerland: federal popular vote of 28 February 2027",
        description:
          "Federal popular vote in Switzerland on Sunday 28 February 2027, five proposals. No result. Unofficial information.",
        ogDescription: "Federal popular vote in Switzerland, Sunday 28 February 2027, five proposals. Unofficial information.",
        ogLocale: "en_GB",
        alternates: chAlternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Switzerland", path: "/ch/" },
          { name: "Switzerland", path: "/ch/en/" },
          { name: "Elections", path: "/ch/en/elections/" },
          { name: "28 February 2027", path: "/ch/en/elections/volksabstimmung-2027-02-28/" },
        ],
        eyebrow: "Sunday 28 February 2027",
        h1: "Federal popular vote",
        lede: "Five proposals. The Federal Chancellery release of 28 October 2026 names polling day.",
        updated: "Last updated: 12 November 2026.",
        reportLabel: "Report an error",
        officeHref: PRESS_DE,
        bannerBefore: "Unofficial information. Please check the details with the ",
        bannerAfter: "Federal Chancellery",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/en/", label: "Switzerland" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        eventName: "Swiss federal popular vote of 28 February 2027",
        locationName: "Switzerland",
        addressRegion: "Switzerland",
        addressCountry: "CH",
        keyDatesHeading: "Voting, dates and official sources",
        keyDatesIntro: "The dates come from the Federal Chancellery release. A clock time that is not in that text is not invented here.",
        keyDates: [
          {
            label: "Polling day",
            text: "The Federal Chancellery release of 28 October 2026 says the Federal Council decided to put five proposals to a popular vote on 28 February 2027.",
            links: [{ label: "Federal Chancellery release", href: PRESS_DE }],
          },
          {
            label: "Five proposals",
            text: "The Federal Chancellery release (German), and the French and Italian releases, name five proposals, including two popular initiatives and three federal measures, with Federal Gazette numbers.",
            links: [{ label: "Federal Chancellery release (German)", href: PRESS_DE }],
          },
          {
            label: "Results",
            text: "The Federal Statistical Office page on popular votes is the results service. The releases that were read do not print a results hour. This page shows no result before midnight Central European Time at the start of 1 March 2027.",
            links: [{ label: "Federal Statistical Office page on popular votes", href: BFS }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the Swiss federal vote in February 2027?",
            text: "The Federal Chancellery release of 28 October 2026 names 28 February 2027.",
            links: [{ label: "Federal Chancellery release", href: PRESS_DE }],
          },
          {
            question: "What is Switzerland voting on on 28 February 2027?",
            text: "The Federal Chancellery release names five proposals, including an initiative on foie gras imports, an initiative on citizenship law, an economic partnership agreement with Malaysia, an amendment of the Nuclear Energy Act, and an amendment on generally binding collective agreements.",
            links: [{ label: "Federal Chancellery release", href: PRESS_DE }],
          },
          {
            question: "Who set the date of the 28 February 2027 vote?",
            text: "The Federal Chancellery release says the Federal Council decided at its meeting of 28 October 2026 to put the five proposals to a vote on 28 February 2027.",
            links: [{ label: "Federal Chancellery release", href: PRESS_DE }],
          },
          {
            question: "Is there an official English text of this release?",
            text: "The Federal Chancellery’s English page for the same release, read on 12 November 2026, says the content is not available in English. This page uses the German, French and Italian releases.",
            links: [{ label: "Federal Chancellery’s English page", href: PRESS_EN }],
          },
          {
            question: "Where are Swiss federal vote results published?",
            text: "This page shows no count. The Federal Statistical Office page on popular votes is the official results service.",
            links: [{ label: "Federal Statistical Office page on popular votes", href: BFS }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/ch/en/", label: "Switzerland" },
          { href: "/ch/en/elections/", label: "Elections" },
          { href: "/ch/en/elections/volksabstimmung-2026-11-29/", label: "29 November 2026" },
          { href: "/ch/en/elections/nationalrat-2027/", label: "National Council 2027" },
          { href: "/ch/de/elections/volksabstimmung-2027-02-28/", label: "Deutsch" },
        ],
        bodyHtml: CH_EN,
        sourcesHeading: "Sources",
        sources: [
          { href: PRESS_DE, label: "Federal Chancellery, German release, proposals for 28 February 2027, 28 October 2026", readOn: "2026-11-12" },
          { href: PRESS_FR, label: "Federal Chancellery, French release, 28 October 2026", readOn: "2026-11-12" },
          { href: PRESS_IT, label: "Federal Chancellery, Italian release, 28 October 2026", readOn: "2026-11-12" },
          { href: PRESS_EN, label: "Federal Chancellery, English page of the same release (content not available in English)", readOn: "2026-11-12" },
          { href: BFS, label: "Federal Statistical Office, popular votes", readOn: "2026-11-12" },
        ],
      },
    ],
  },
];
