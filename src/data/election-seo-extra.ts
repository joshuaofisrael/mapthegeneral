/**
 * Election pages added after the first SEO profiles.
 * NSW is pinned to the homepage because 13 March 2027 is outside the 60-day list.
 * Serbia’s presidential election is not here: no polling day has been called,
 * so it has no Event JSON-LD. Add an Event on that page once the date is
 * published in the Official Gazette (Službeni glasnik).
 */
import type { ElectionSeoProfile } from "./election-seo";

const NSW = "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election";
const NSW_ACT = "https://legislation.nsw.gov.au/view/html/inforce/current/act-1902-032#sec.24A";
const NSW_HOME = "https://elections.nsw.gov.au/";
const GOV_SEANAD =
  "https://www.gov.ie/en/department-of-housing-local-government-and-heritage/press-releases/polling-day-order-for-seanad-bye-election-made-by-minister-browne/";
const OIR = "https://www.oireachtas.ie/en/elections/";
const SEANAD_LIST =
  "https://data.oireachtas.ie/ie/oireachtas/electoralProcess/electionResults/seanad/2026/2026-10-16_seanad-bye-elections-2026-list-of-candidates_en.pdf";
const ADMIN_VOTE = "https://www.admin.ch/de/volksabstimmung-vom-29-november-2026";
const BBL = "https://www.fedlex.admin.ch/eli/fga/2026/2406/de";
const PRESS = "https://www.admin.ch/de/newnsb/KpnrPOW9cpZAvB6IXOekf";
const BFS = "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html";

const NSW_BODY = `<h2>What is elected</h2>
<p>The NSW Electoral Commission’s page for the 2027 NSW State election, read on 27 October 2026, prints Saturday, 13 March 2027, and calls it the election of the 59th Parliament of NSW. It says New South Wales is divided into 93 state electoral districts. Voters in each district elect one person to the Legislative Assembly. Voters also elect 21 of the 42 members of the Legislative Council. The same page says a person must vote only once.</p>
<p>That date is the day the Commission prints. Section 24A of the Constitution Act 1902 (NSW) is the timing provision for the general election. This page does not restate the section.</p>
<p class="tools"><a href="/au/en/new-south-wales/">New South Wales</a> · <a href="/au/en/new-south-wales/assembly/">93 Legislative Assembly districts</a> · <a href="/au/en/elections/victoria-2026/">Victoria, 28 November 2026</a></p>
<h2>Who votes, and how</h2>
<p>The Commission’s page says voting is compulsory at all NSW State elections. It says Australians aged 18 and over are required to enrol and vote. It says a person who is eligible to vote in New South Wales must vote in this election, and that a person who does not vote may receive a penalty notice. This page does not print a penalty amount.</p>
<p>Voting options on that page are: voting in person at a voting centre on election day; early voting at an early voting centre; postal voting; and telephone assisted voting for electors who are blind or have low vision. The page says eligibility criteria apply to early voting, postal voting and telephone assisted voting. It says there is a check-your-enrolment service. Venue lists were not copied.</p>
<p>On the key-dates list read the same day, postal vote applications open on Tuesday 12 January 2027 and close at 6 pm on Monday 8 March 2027. Lodgement of nominations commences at 8 am on Monday 15 February 2027. Writs are expected on Monday 22 February 2027, and the roll closes at 6 pm that day for confirming candidates and nominators and for authorised roll printing. Nominations close at 12 noon on Wednesday 24 February 2027. The early voting period opens on Saturday 6 March 2027 and closes at 6 pm on Friday 12 March 2027. On Saturday 13 March 2027 election day is 8 am to 6 pm. Receipt of postal votes closes at 6 pm on Thursday 25 March 2027. The expected last day for the return of the writs is Friday 23 April 2027.</p>
<h2>Candidates</h2>
<p>The pages read on 27 October 2026 did not list candidates for 13 March 2027. Lodgement of nominations commences at 8 am on Monday 15 February 2027 and closes at 12 noon on Wednesday 24 February 2027. Names will be added here when the Commission publishes them. The official page is <a href="${NSW}">2027 NSW State election</a>.</p>
<h2>Result</h2>
<p>This page shows no count and names no winner. No count is shown here before 6 pm on 13 March 2027.</p>`;

const SEANAD_BODY = `<h2>What is being filled</h2>
<p>The <a href="${GOV_SEANAD}">press release of the Department of Housing, Local Government and Heritage</a>, published on 24 September 2026 and updated on 28 September 2026, says Minister James Browne made a Polling Day Order for a Seanad bye-election. The vacancy arises from the election of Senator Seán Kyne to the Dáil. The release says Senator Kyne was elected from the Nominating Bodies Sub-Panel of the Cultural and Educational Panel at the Seanad general election in 2025. It says an earlier version of the release had named the Oireachtas Sub-Panel, and that this was incorrect.</p>
<p>The <a href="${OIR}">Houses of the Oireachtas elections page</a>, read on 27 October 2026, says the Returning Officer for Seanad elections is the Clerk of the Seanad. It says that in a Seanad bye-election only members of Dáil Éireann and Seanad Éireann may vote. The public does not vote in this bye-election.</p>
<h2>Who votes, and how</h2>
<p>The Department’s release says the electorate is the members of Dáil Éireann and Seanad Éireann. It says the last day for receiving nominations was Tuesday 6 October 2026 at 12 noon. The Seanad Returning Officer sat for the ruling on nominations on Friday 16 October 2026. Ballot papers are issued on Friday 23 October 2026. The polls close at 11 a.m. on Friday 6 November 2026.</p>
<p>This is not a polling-station election for the public. A person who is not a member of the Dáil or the Seanad does not receive a ballot for this bye-election.</p>
{{candidates}}
<h2>Past result</h2>
<p>The Department’s release says Senator Seán Kyne was elected from the Nominating Bodies Sub-Panel of the Cultural and Educational Panel at the Seanad general election in 2025. This page does not copy the 2025 count. The record stays on the <a href="${OIR}">Oireachtas elections page</a>.</p>
<h2>Result</h2>
<p>The poll has not closed. This page shows no count and names no senator elected. A result will be added only from a count the Clerk of the Seanad or the Houses of the Oireachtas publish after 11 a.m. on 6 November 2026.</p>`;

const CH_PROPOSALS = `<ul>
<li>Bundesbeschluss vom 19. Juni 2026 über die Zusatzfinanzierung der AHV durch eine Erhöhung der Mehrwertsteuer (BBl 2026 1757)</li>
<li>Volksinitiative vom 3. November 2023 «Für eine Einschränkung von Feuerwerk» (BBl 2026 1760)</li>
<li>Volksinitiative vom 27. März 2024 «Ja zu fairen Bundessteuern auch für Ehepaare – Diskriminierung der Ehe endlich abschaffen!» (BBl 2026 1758)</li>
<li>Änderung vom 19. Dezember 2025 des Bundesgesetzes über das Kriegsmaterial (Kriegsmaterialgesetz, KMG) (BBl 2026 22)</li>
</ul>`;

const CH_DE = `<h2>Worüber abgestimmt wird</h2>
<p>Die Seite der Bundesverwaltung zur Volksabstimmung vom 29. November 2026, gelesen am 27. Oktober 2026, sagt, dass die Stimmberechtigten der Schweiz an diesem Tag über vier Vorlagen abstimmen. Das Kreisschreiben des Bundesrates vom 3. September 2026 (BBl 2026 2406) setzt den Sonntag, 29. November 2026, und innerhalb der gesetzlichen Schranken die vorangehenden Tage, als Datum fest. Die Medienmitteilung vom 30. Juni 2026 nennt denselben Tag und dieselben vier Vorlagen.</p>
${CH_PROPOSALS}
<p class="tools"><a href="/ch/de/">Schweiz</a> · <a href="/ch/de/elections/nationalrat-2027/">Nationalrat, 24. Oktober 2027</a> · <a href="/ch/fr/elections/volksabstimmung-2026-11-29/">Français</a> · <a href="/ch/it/elections/volksabstimmung-2026-11-29/">Italiano</a> · <a href="/ch/en/elections/volksabstimmung-2026-11-29/">English</a></p>
<h2>Wie abgestimmt wird</h2>
<p>Das Kreisschreiben bittet die Kantone, die Stimmunterlagen frühestens vier und spätestens drei Wochen vor dem Abstimmungstag zuzustellen. Für Auslandschweizerinnen und Auslandschweizer nennt es den frühesten Versand in der Kalenderwoche 43. Eine einzige nationale Uhrzeit für die Öffnung der Urnen steht in den gelesenen Texten nicht. Diese Seite erfindet keine solche Uhrzeit. Ein Ergebnis wird hier nicht vor 12:00 mitteleuropäischer Zeit am 29. November 2026 gezeigt. Der Ergebnisdienst ist die Seite des Bundesamts für Statistik zu Abstimmungen.</p>
<h2>Frühere Abstimmungen</h2>
<p>Frühere eidgenössische Volksabstimmungen stehen auf der <a href="${BFS}">Seite des Bundesamts für Statistik</a>. Diese Seite übernimmt daraus keinen Anteil.</p>
<h2>Ergebnis</h2>
<p>Diese Seite zeigt keine Zahlen und spricht keine Empfehlung aus.</p>`;

const CH_FR = `<h2>Sur quoi porte le vote</h2>
<p>La page de l’administration fédérale sur la votation du 29 novembre 2026, lue le 27 octobre 2026, dit que les personnes ayant le droit de vote en Suisse se prononcent ce jour-là sur quatre objets. La circulaire du Conseil fédéral du 3 septembre 2026 (FF 2026 2406) fixe le dimanche 29 novembre 2026, et dans les limites légales les jours qui précèdent. Le communiqué du 30 juin 2026 nomme le même jour et les quatre mêmes objets. Les titres ci-dessous sont ceux de la circulaire allemande.</p>
${CH_PROPOSALS}
<p class="tools"><a href="/ch/fr/">Suisse</a> · <a href="/ch/fr/elections/nationalrat-2027/">Conseil national, 24 octobre 2027</a> · <a href="/ch/de/elections/volksabstimmung-2026-11-29/">Deutsch</a></p>
<h2>Comment on vote</h2>
<p>La circulaire demande aux cantons de remettre le matériel de vote au plus tôt quatre semaines et au plus tard trois semaines avant le jour du scrutin. Elle cite la semaine civile 43 comme premier envoi pour les Suisses de l’étranger. Les textes lus ne donnent pas une seule heure nationale d’ouverture des urnes. Cette page n’en invente pas. Aucun résultat n’est montré ici avant 12 h, heure de l’Europe centrale, le 29 novembre 2026. Le service des résultats est la page de l’Office fédéral de la statistique sur les votations.</p>
<h2>Votes précédents</h2>
<p>Les votations fédérales antérieures sont sur la <a href="${BFS}">page de l’Office fédéral de la statistique</a>. Cette page n’en reprend aucune part.</p>
<h2>Résultat</h2>
<p>Cette page ne montre aucun chiffre et ne formule aucune recommandation.</p>`;

const CH_IT = `<h2>Su che cosa si vota</h2>
<p>La pagina dell’amministrazione federale sulla votazione del 29 novembre 2026, letta il 27 ottobre 2026, dice che gli aventi diritto di voto in Svizzera si pronunciano quel giorno su quattro oggetti. La circolare del Consiglio federale del 3 settembre 2026 (FF 2026 2406) fissa la domenica 29 novembre 2026 e, nei limiti di legge, i giorni precedenti. Il comunicato del 30 giugno 2026 indica lo stesso giorno e gli stessi quattro oggetti. I titoli sotto sono quelli della circolare tedesca.</p>
${CH_PROPOSALS}
<p class="tools"><a href="/ch/it/">Svizzera</a> · <a href="/ch/it/elections/nationalrat-2027/">Consiglio nazionale, 24 ottobre 2027</a> · <a href="/ch/de/elections/volksabstimmung-2026-11-29/">Deutsch</a></p>
<h2>Come si vota</h2>
<p>La circolare chiede ai Cantoni di consegnare il materiale di voto al più presto quattro settimane e al più tardi tre settimane prima del giorno della votazione. Per gli Svizzeri all’estero indica come primo invio la settimana civile 43. I testi letti non fissano un’unica ora nazionale di apertura delle urne. Questa pagina non ne inventa una. Nessun risultato è mostrato qui prima delle ore 12:00, ora dell’Europa centrale, del 29 novembre 2026. Il servizio dei risultati è la pagina dell’Ufficio federale di statistica sulle votazioni.</p>
<h2>Votazioni precedenti</h2>
<p>Le votazioni federali precedenti sono sulla <a href="${BFS}">pagina dell’Ufficio federale di statistica</a>. Questa pagina non ne copia una quota.</p>
<h2>Risultato</h2>
<p>Questa pagina non mostra cifre e non formula una raccomandazione.</p>`;

const CH_EN = `<h2>What is being decided</h2>
<p>The federal administration’s page on the popular vote of 29 November 2026, read on 27 October 2026, says people entitled to vote in Switzerland decide four proposals that day. The Federal Council circular of 3 September 2026 (BBl 2026 2406) sets Sunday 29 November 2026, and the preceding days within the statutory limits. The release of 30 June 2026 names the same day and the same four proposals. The titles below are those in the German circular.</p>
${CH_PROPOSALS}
<p class="tools"><a href="/ch/en/">Switzerland</a> · <a href="/ch/en/elections/nationalrat-2027/">National Council, 24 October 2027</a> · <a href="/ch/de/elections/volksabstimmung-2026-11-29/">Deutsch</a></p>
<h2>How people vote</h2>
<p>The circular asks the cantons to deliver the voting papers at the earliest four weeks and at the latest three weeks before polling day. For Swiss abroad it names calendar week 43 as the earliest dispatch. The texts that were read do not print one national hour for opening the ballot boxes. This page does not invent one. No count is shown here before 12:00 Central European Time on 29 November 2026. The results service is the Federal Statistical Office page on popular votes.</p>
<h2>Earlier votes</h2>
<p>Earlier federal popular votes are on the <a href="${BFS}">Federal Statistical Office page</a>. This page does not copy a share from an earlier vote.</p>
<h2>Result</h2>
<p>This page shows no figures and makes no recommendation.</p>`;

const chAlternates = [
  { hreflang: "de", path: "/ch/de/elections/volksabstimmung-2026-11-29/" },
  { hreflang: "fr", path: "/ch/fr/elections/volksabstimmung-2026-11-29/" },
  { hreflang: "it", path: "/ch/it/elections/volksabstimmung-2026-11-29/" },
  { hreflang: "en", path: "/ch/en/elections/volksabstimmung-2026-11-29/" },
  { hreflang: "x-default", path: "/ch/de/elections/volksabstimmung-2026-11-29/" },
];

export const EXTRA_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "au-nsw-2027",
    pollingDay: "2027-03-13",
    startDate: "2027-03-13T08:00:00+11:00",
    endDate: "2027-03-13T18:00:00+11:00",
    organizerName: "NSW Electoral Commission",
    organizerUrl: NSW_HOME,
    imagePath: "/images/og/au.webp",
    lastmod: "2026-10-27",
    pinOnHome: true,
    homeLinks: [
      {
        href: "/au/en/elections/nsw-2027/",
        label: "New South Wales state election, 13 March 2027",
        detail: "Saturday 13 March 2027, 8 am to 6 pm Australian Eastern Daylight Time. Dates from the NSW Electoral Commission.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/au/en/elections/nsw-2027/",
        title: "New South Wales state election, 13 March 2027",
        description:
          "New South Wales state election, Saturday 13 March 2027. Nominations are not yet open. Unofficial information.",
        ogDescription:
          "New South Wales state election, Saturday 13 March 2027, 8 am to 6 pm. Nominations open on 15 February 2027. Unofficial information.",
        ogLocale: "en_AU",
        alternates: [
          { hreflang: "en", path: "/au/en/elections/nsw-2027/" },
          { hreflang: "x-default", path: "/au/en/elections/nsw-2027/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Australia", path: "/au/" },
          { name: "Australia", path: "/au/en/" },
          { name: "Elections", path: "/au/en/elections/" },
          { name: "New South Wales, 13 March 2027", path: "/au/en/elections/nsw-2027/" },
        ],
        eyebrow: "Saturday 13 March 2027",
        h1: "New South Wales state election",
        lede: "The 59th Parliament: 93 Legislative Assembly members and 21 of the 42 Legislative Council members. Voting on election day is from 8 am to 6 pm.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: NSW,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "NSW Electoral Commission",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/au/en/", label: "Australia" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "New South Wales state election, 13 March 2027",
        locationName: "New South Wales, Australia",
        addressRegion: "New South Wales",
        addressCountry: "AU",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "Each date below is printed on the NSW Electoral Commission’s 2027 state election page. A date that page did not print is not listed.",
        keyDates: [
          {
            label: "Enrolment",
            text: "The 2027 NSW State election page says Australians aged 18 and over are required to enrol and vote, and it points readers to a check-your-enrolment service.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            label: "Nominations",
            text: "The 2027 NSW State election page says lodgement of nominations commences at 8 am on Monday 15 February 2027 and closes at 12 noon on Wednesday 24 February 2027.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            label: "Writs and the roll",
            text: "The 2027 NSW State election page says the issue of writs is expected on Monday 22 February 2027, and that the roll closes at 6 pm that day for confirming candidates and nominators and for authorised roll printing.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            label: "Postal voting",
            text: "The 2027 NSW State election page says postal vote applications open on Tuesday 12 January 2027 and close at 6 pm on Monday 8 March 2027. Receipt of postal votes closes at 6 pm on Thursday 25 March 2027. Eligibility criteria apply.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            label: "Early voting",
            text: "The 2027 NSW State election page says the early voting period opens on Saturday 6 March 2027 and closes at 6 pm on Friday 12 March 2027. Eligibility criteria apply.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            label: "Election day",
            text: "The 2027 NSW State election page says election day on Saturday 13 March 2027 runs from 8 am to 6 pm.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the NSW state election 2027?",
            text: "The 2027 NSW State election page says the election is on Saturday 13 March 2027, and that election day runs from 8 am to 6 pm.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            question: "Is voting compulsory in New South Wales?",
            text: "The 2027 NSW State election page says voting is compulsory at all NSW State elections, and that a person who does not vote may receive a penalty notice. This page does not print a penalty amount.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            question: "When does early voting open for the NSW election?",
            text: "The 2027 NSW State election page says the early voting period opens on Saturday 6 March 2027 and closes at 6 pm on Friday 12 March 2027. It says eligibility criteria apply.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            question: "When do postal vote applications close in NSW?",
            text: "The 2027 NSW State election page says postal vote applications close at 6 pm on Monday 8 March 2027. They open on Tuesday 12 January 2027.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            question: "When do nominations open for the NSW state election?",
            text: "The 2027 NSW State election page says lodgement of nominations commences at 8 am on Monday 15 February 2027 and closes at 12 noon on Wednesday 24 February 2027. No candidate list was on the page read on 27 October 2026.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
          {
            question: "Where will NSW state election results be published?",
            text: "This page shows no count and names no winner. The 2027 NSW State election page is the Commission’s page for the election. No count is shown here before 6 pm on 13 March 2027.",
            links: [{ label: "2027 NSW State election page", href: NSW }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/au/en/", label: "Australia" },
          { href: "/au/en/new-south-wales/", label: "New South Wales" },
          { href: "/au/en/elections/victoria-2026/", label: "Victoria, 28 November 2026" },
          { href: "/au/en/elections/", label: "Elections in Australia" },
        ],
        bodyHtml: NSW_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: NSW, label: "NSW Electoral Commission, “2027 NSW State election”", readOn: "2026-10-27" },
          { href: NSW_ACT, label: "Constitution Act 1902 (NSW), section 24A", readOn: "2026-10-27" },
          { href: NSW_HOME, label: "NSW Electoral Commission", readOn: "2026-10-27" },
        ],
      },
    ],
  },
  {
    id: "ie-2026-seanad",
    candidateListId: "seanad-2026",
    pollingDay: "2026-11-06",
    startDate: "2026-10-23T00:00:00+01:00",
    endDate: "2026-11-06T11:00:00+00:00",
    organizerName: "Clerk of the Seanad",
    organizerUrl: OIR,
    imagePath: "/og.png",
    lastmod: "2026-10-27",
    homeLinks: [
      {
        href: "/ie/en/elections/seanad-2026/",
        label: "Seanad bye-election, 6 November 2026",
        detail:
          "Friday 6 November 2026, polls close at 11 a.m. The electorate is members of the Oireachtas, not the public. Dates from the Department of Housing, Local Government and Heritage.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/ie/en/elections/seanad-2026/",
        title: "Ireland Seanad bye-election, 6 November 2026",
        description:
          "Seanad Éireann bye-election, Friday 6 November 2026, Cultural and Educational Panel. Polls close at 11 a.m. Unofficial information.",
        ogDescription:
          "Ireland Seanad bye-election, Cultural and Educational Panel, Friday 6 November 2026. Polls close at 11 a.m. Unofficial information.",
        ogLocale: "en_IE",
        alternates: [
          { hreflang: "en", path: "/ie/en/elections/seanad-2026/" },
          { hreflang: "x-default", path: "/ie/en/elections/seanad-2026/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Ireland", path: "/ie/" },
          { name: "Ireland", path: "/ie/en/" },
          { name: "Elections", path: "/ie/en/elections/" },
          { name: "Seanad, 6 November 2026", path: "/ie/en/elections/seanad-2026/" },
        ],
        eyebrow: "Friday 6 November 2026 · Oireachtas electorate",
        h1: "Seanad Éireann bye-election",
        lede: "One vacancy on the Cultural and Educational Panel, Nominating Bodies Sub-Panel. Polls close at 11 a.m. Members of the Dáil and the Seanad vote. The public does not.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: OIR,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Houses of the Oireachtas",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ie/en/", label: "Ireland" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Seanad Éireann bye-election, 6 November 2026",
        locationName: "Ireland",
        addressRegion: "Ireland",
        addressCountry: "IE",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "The dates below are those in the Department’s Polling Day Order release. The electorate is members of the Oireachtas.",
        keyDates: [
          {
            label: "Close of nominations",
            text: "The Department’s release says the last day for receiving nominations was Tuesday 6 October 2026 at 12 noon.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            label: "Ruling on nominations",
            text: "The Department’s release says the Seanad Returning Officer sat for the ruling on nominations on Friday 16 October 2026.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            label: "Ballot papers",
            text: "The Department’s release says ballot papers are issued on Friday 23 October 2026.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            label: "Close of poll",
            text: "The Department’s release says the polls close at 11 a.m. on Friday 6 November 2026.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            label: "Who votes",
            text: "The Oireachtas elections page says that in a Seanad bye-election only members of Dáil Éireann and Seanad Éireann may vote.",
            links: [{ label: "Oireachtas elections page", href: OIR }],
          },
          {
            label: "Returning officer",
            text: "The Oireachtas elections page says the Returning Officer for Seanad elections is the Clerk of the Seanad.",
            links: [{ label: "Oireachtas elections page", href: OIR }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the Seanad bye-election in 2026?",
            text: "The Department’s release says the polls close at 11 a.m. on Friday 6 November 2026. Ballot papers are issued on Friday 23 October 2026.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            question: "Who can vote in the Seanad bye-election?",
            text: "The Department’s release says the electorate is the members of Dáil Éireann and Seanad Éireann. The public does not vote.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            question: "Which Seanad seat is vacant?",
            text: "The Department’s release says the vacancy arises from the election of Senator Seán Kyne to the Dáil, and that he was elected from the Nominating Bodies Sub-Panel of the Cultural and Educational Panel.",
            links: [{ label: "Department’s release", href: GOV_SEANAD }],
          },
          {
            question: "Who is the returning officer for the Seanad bye-election?",
            text: "The Oireachtas elections page says the Returning Officer for Seanad elections is the Clerk of the Seanad.",
            links: [{ label: "Oireachtas elections page", href: OIR }],
          },
          {
            question: "Who are the candidates in the Seanad bye-election?",
            text: "The Seanad Returning Officer’s list of 16 October 2026 names Ray McAdam, Caitlín Ní Bhroin, Maeve Maria O’Rourke and Patrick Paul Walsh, in that order. It does not print a ballot number or a personal page.",
            links: [{ label: "Returning Officer’s list", href: SEANAD_LIST }],
          },
          {
            question: "Where will the Seanad bye-election result be published?",
            text: "This page shows no count. A result will be added only when the Houses of the Oireachtas or the Clerk of the Seanad publish one. The Oireachtas elections page is the official list.",
            links: [{ label: "Oireachtas elections page", href: OIR }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/ie/en/", label: "Ireland" },
          { href: "/ie/en/elections/", label: "Elections in Ireland" },
          { href: "/ie/en/elections/next-dail/", label: "Next Dáil election" },
        ],
        bodyHtml: SEANAD_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: GOV_SEANAD, label: "Department of Housing, Local Government and Heritage, Polling Day Order, 24 September 2026", readOn: "2026-10-27" },
          { href: OIR, label: "Houses of the Oireachtas, elections", readOn: "2026-10-27" },
          { href: SEANAD_LIST, label: "Seanad Returning Officer, list of candidates, 16 October 2026", readOn: "2026-10-27" },
        ],
      },
    ],
  },
  {
    id: "ch-2026-11-29",
    pollingDay: "2026-11-29",
    startDate: "2026-11-29T00:00:00+01:00",
    endDate: "2026-11-29T12:00:00+01:00",
    organizerName: "Swiss Federal Chancellery",
    organizerUrl: ADMIN_VOTE,
    imagePath: "/images/og/ch.webp",
    lastmod: "2026-10-27",
    homeLinks: [
      {
        href: "/ch/de/elections/volksabstimmung-2026-11-29/",
        label: "Schweiz: Volksabstimmung vom 29. November 2026",
        detail: "Sonntag, 29. November 2026. Vier Vorlagen. Datum aus dem Kreisschreiben des Bundesrates vom 3. September 2026.",
      },
      {
        href: "/ch/en/elections/volksabstimmung-2026-11-29/",
        label: "Switzerland federal popular vote, 29 November 2026",
        detail: "Sunday 29 November 2026. Four proposals. The date is in the Federal Council circular of 3 September 2026.",
      },
    ],
    pages: [
      {
        lang: "de",
        htmlLang: "de",
        path: "/ch/de/elections/volksabstimmung-2026-11-29/",
        title: "Schweiz: Volksabstimmung vom 29. November 2026",
        description:
          "Volksabstimmung in der Schweiz am Sonntag, 29. November 2026, über vier Vorlagen. Unterlagen, amtliche Quellen, kein Ergebnis. Inoffizielle Information.",
        ogDescription: "Volksabstimmung in der Schweiz, Sonntag 29. November 2026, vier Vorlagen. Inoffizielle Information.",
        ogLocale: "de_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Start", path: "/" },
          { name: "Schweiz", path: "/ch/" },
          { name: "Schweiz", path: "/ch/de/" },
          { name: "Wahlen", path: "/ch/de/elections/" },
          { name: "29. November 2026", path: "/ch/de/elections/volksabstimmung-2026-11-29/" },
        ],
        eyebrow: "Sonntag, 29. November 2026",
        h1: "Eidgenössische Volksabstimmung",
        lede: "Vier Vorlagen. Das Kreisschreiben des Bundesrates vom 3. September 2026 setzt den Abstimmungssonntag fest.",
        updated: "Zuletzt aktualisiert: 27. Oktober 2026.",
        reportLabel: "Fehler melden",
        officeHref: ADMIN_VOTE,
        bannerBefore: "Inoffizielle Information. Bitte prüfen Sie die Angaben bei der ",
        bannerAfter: "Bundesverwaltung",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/de/", label: "Schweiz" },
          { href: "/ch/en/elections/volksabstimmung-2026-11-29/", label: "English" },
        ],
        eventName: "Eidgenössische Volksabstimmung vom 29. November 2026",
        locationName: "Schweiz",
        addressRegion: "Schweiz",
        addressCountry: "CH",
        keyDatesHeading: "Abstimmen, Daten und amtliche Quellen",
        keyDatesIntro: "Die Daten stehen im Kreisschreiben oder auf der Seite der Bundesverwaltung. Eine Uhrzeit, die dort nicht steht, steht hier nicht.",
        keyDates: [
          {
            label: "Abstimmungssonntag",
            text: "Das Kreisschreiben setzt den Sonntag, 29. November 2026, als Datum der Volksabstimmung fest.",
            links: [{ label: "Kreisschreiben", href: BBL }],
          },
          {
            label: "Vier Vorlagen",
            text: "Die Abstimmungsseite der Bundesverwaltung sagt, dass über vier Vorlagen abgestimmt wird.",
            links: [{ label: "Abstimmungsseite der Bundesverwaltung", href: ADMIN_VOTE }],
          },
          {
            label: "Zustellung der Unterlagen",
            text: "Das Kreisschreiben bittet, die Stimmunterlagen frühestens vier und spätestens drei Wochen vor dem Abstimmungstag zuzustellen.",
            links: [{ label: "Kreisschreiben", href: BBL }],
          },
          {
            label: "Auslandschweizerinnen und Auslandschweizer",
            text: "Das Kreisschreiben nennt für den Versand an Auslandschweizerinnen und Auslandschweizer frühestens die Kalenderwoche 43.",
            links: [{ label: "Kreisschreiben", href: BBL }],
          },
          {
            label: "Ergebnisse",
            text: "Die Seite des Bundesamts für Statistik zu Abstimmungen ist der Ergebnisdienst. Diese Seite zeigt vor 12:00 mitteleuropäischer Zeit am 29. November 2026 kein Ergebnis.",
            links: [{ label: "Seite des Bundesamts für Statistik zu Abstimmungen", href: BFS }],
          },
        ],
        faqHeading: "Häufige Fragen",
        faqs: [
          {
            question: "Wann ist die Volksabstimmung vom November 2026?",
            text: "Das Kreisschreiben setzt den Sonntag, 29. November 2026, als Abstimmungstag fest.",
            links: [{ label: "Kreisschreiben", href: BBL }],
          },
          {
            question: "Worüber stimmt die Schweiz am 29. November 2026 ab?",
            text: "Die Abstimmungsseite der Bundesverwaltung nennt vier Vorlagen, darunter die Zusatzfinanzierung der AHV, die Feuerwerksinitiative, die Ehepaarbesteuerung und das Kriegsmaterialgesetz.",
            links: [{ label: "Abstimmungsseite der Bundesverwaltung", href: ADMIN_VOTE }],
          },
          {
            question: "Wann kommen die Stimmunterlagen?",
            text: "Das Kreisschreiben bittet die Kantone, die Unterlagen frühestens vier und spätestens drei Wochen vor dem Abstimmungstag zuzustellen.",
            links: [{ label: "Kreisschreiben", href: BBL }],
          },
          {
            question: "Wo stehen die Ergebnisse der Volksabstimmung?",
            text: "Diese Seite zeigt kein Ergebnis. Die Seite des Bundesamts für Statistik zu Abstimmungen ist der amtliche Ergebnisdienst.",
            links: [{ label: "Seite des Bundesamts für Statistik zu Abstimmungen", href: BFS }],
          },
          {
            question: "Wer hat den Abstimmungstermin festgesetzt?",
            text: "Die Medienmitteilung vom 30. Juni 2026 sagt, der Bundesrat habe an seiner Sitzung vom 24. Juni 2026 beschlossen, die vier Vorlagen am 29. November 2026 zur Abstimmung zu bringen.",
            links: [{ label: "Medienmitteilung vom 30. Juni 2026", href: PRESS }],
          },
        ],
        relatedHeading: "Weitere Seiten",
        related: [
          { href: "/", label: "Start" },
          { href: "/ch/de/", label: "Schweiz" },
          { href: "/ch/de/elections/", label: "Wahlen" },
          { href: "/ch/de/elections/nationalrat-2027/", label: "Nationalrat 2027" },
          { href: "/ch/en/elections/volksabstimmung-2026-11-29/", label: "English" },
        ],
        bodyHtml: CH_DE,
        sourcesHeading: "Quellen",
        sources: [
          { href: ADMIN_VOTE, label: "Bundesverwaltung, Volksabstimmung vom 29. November 2026", readOn: "2026-10-27" },
          { href: BBL, label: "Kreisschreiben des Bundesrates vom 3. September 2026, BBl 2026 2406", readOn: "2026-10-27" },
          { href: PRESS, label: "Bundesrat, Medienmitteilung vom 30. Juni 2026", readOn: "2026-10-27" },
          { href: BFS, label: "Bundesamt für Statistik, Abstimmungen", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "fr",
        htmlLang: "fr",
        path: "/ch/fr/elections/volksabstimmung-2026-11-29/",
        title: "Suisse : votation populaire du 29 novembre 2026",
        description:
          "Votation populaire en Suisse le dimanche 29 novembre 2026, quatre objets. Aucun résultat. Information non officielle.",
        ogDescription: "Votation populaire en Suisse, dimanche 29 novembre 2026, quatre objets. Information non officielle.",
        ogLocale: "fr_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Accueil", path: "/" },
          { name: "Suisse", path: "/ch/" },
          { name: "Suisse", path: "/ch/fr/" },
          { name: "Élections", path: "/ch/fr/elections/" },
          { name: "29 novembre 2026", path: "/ch/fr/elections/volksabstimmung-2026-11-29/" },
        ],
        eyebrow: "Dimanche 29 novembre 2026",
        h1: "Votation populaire fédérale",
        lede: "Quatre objets. La circulaire du Conseil fédéral du 3 septembre 2026 fixe le dimanche de votation.",
        updated: "Dernière mise à jour : 27 octobre 2026.",
        reportLabel: "Signaler une erreur",
        officeHref: ADMIN_VOTE,
        bannerBefore: "Information non officielle. Vérifiez auprès de l’",
        bannerAfter: "administration fédérale",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/fr/", label: "Suisse" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        eventName: "Votation populaire fédérale du 29 novembre 2026",
        locationName: "Suisse",
        addressRegion: "Suisse",
        addressCountry: "CH",
        keyDatesHeading: "Voter, dates et sources officielles",
        keyDatesIntro: "Les dates viennent de la circulaire ou de la page de l’administration fédérale.",
        keyDates: [
          {
            label: "Jour de la votation",
            text: "La circulaire fixe le dimanche 29 novembre 2026 comme date de la votation populaire.",
            links: [{ label: "circulaire", href: BBL }],
          },
          {
            label: "Quatre objets",
            text: "La page de l’administration fédérale dit que le vote porte sur quatre objets.",
            links: [{ label: "page de l’administration fédérale", href: ADMIN_VOTE }],
          },
          {
            label: "Envoi du matériel",
            text: "La circulaire demande de remettre le matériel au plus tôt quatre semaines et au plus tard trois semaines avant le scrutin.",
            links: [{ label: "circulaire", href: BBL }],
          },
          {
            label: "Suisses de l’étranger",
            text: "La circulaire cite la semaine civile 43 comme premier envoi pour les Suisses de l’étranger.",
            links: [{ label: "circulaire", href: BBL }],
          },
          {
            label: "Résultats",
            text: "La page de l’Office fédéral de la statistique sur les votations est le service des résultats. Cette page n’en montre aucun avant 12 h, heure de l’Europe centrale, le 29 novembre 2026.",
            links: [{ label: "page de l’Office fédéral de la statistique sur les votations", href: BFS }],
          },
        ],
        faqHeading: "Questions fréquentes",
        faqs: [
          {
            question: "Quand a lieu la votation de novembre 2026 ?",
            text: "La circulaire fixe le dimanche 29 novembre 2026.",
            links: [{ label: "circulaire", href: BBL }],
          },
          {
            question: "Sur quoi vote la Suisse le 29 novembre 2026 ?",
            text: "La page de l’administration fédérale indique quatre objets, dont le financement additionnel de l’AVS, les feux d’artifice, l’imposition des couples mariés et la loi sur le matériel de guerre.",
            links: [{ label: "page de l’administration fédérale", href: ADMIN_VOTE }],
          },
          {
            question: "Quand arrive le matériel de vote ?",
            text: "La circulaire demande aux cantons de le remettre au plus tôt quatre semaines et au plus tard trois semaines avant le jour du scrutin.",
            links: [{ label: "circulaire", href: BBL }],
          },
          {
            question: "Où sont publiés les résultats ?",
            text: "Cette page ne montre aucun résultat. La page de l’Office fédéral de la statistique sur les votations est le service officiel.",
            links: [{ label: "page de l’Office fédéral de la statistique sur les votations", href: BFS }],
          },
          {
            question: "Qui a fixé la date ?",
            text: "Le communiqué du 30 juin 2026 dit que le Conseil fédéral a décidé, le 24 juin 2026, de soumettre les quatre objets au vote le 29 novembre 2026.",
            links: [{ label: "communiqué du 30 juin 2026", href: PRESS }],
          },
        ],
        relatedHeading: "Pages liées",
        related: [
          { href: "/", label: "Accueil" },
          { href: "/ch/fr/", label: "Suisse" },
          { href: "/ch/fr/elections/", label: "Élections" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        bodyHtml: CH_FR,
        sourcesHeading: "Sources",
        sources: [
          { href: ADMIN_VOTE, label: "Administration fédérale, votation du 29 novembre 2026", readOn: "2026-10-27" },
          { href: BBL, label: "Circulaire du Conseil fédéral du 3 septembre 2026, FF 2026 2406", readOn: "2026-10-27" },
          { href: PRESS, label: "Conseil fédéral, communiqué du 30 juin 2026", readOn: "2026-10-27" },
          { href: BFS, label: "Office fédéral de la statistique, votations", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "it",
        htmlLang: "it",
        path: "/ch/it/elections/volksabstimmung-2026-11-29/",
        title: "Svizzera: votazione popolare del 29 novembre 2026",
        description:
          "Votazione popolare in Svizzera domenica 29 novembre 2026, quattro oggetti. Nessun risultato. Informazione non ufficiale.",
        ogDescription: "Votazione popolare in Svizzera, domenica 29 novembre 2026, quattro oggetti. Informazione non ufficiale.",
        ogLocale: "it_CH",
        alternates: chAlternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Svizzera", path: "/ch/" },
          { name: "Svizzera", path: "/ch/it/" },
          { name: "Elezioni", path: "/ch/it/elections/" },
          { name: "29 novembre 2026", path: "/ch/it/elections/volksabstimmung-2026-11-29/" },
        ],
        eyebrow: "Domenica 29 novembre 2026",
        h1: "Votazione popolare federale",
        lede: "Quattro oggetti. La circolare del Consiglio federale del 3 settembre 2026 fissa la domenica di votazione.",
        updated: "Ultimo aggiornamento: 27 ottobre 2026.",
        reportLabel: "Segnala un errore",
        officeHref: ADMIN_VOTE,
        bannerBefore: "Informazione non ufficiale. Verificare presso l’",
        bannerAfter: "amministrazione federale",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/it/", label: "Svizzera" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        eventName: "Votazione popolare federale del 29 novembre 2026",
        locationName: "Svizzera",
        addressRegion: "Svizzera",
        addressCountry: "CH",
        keyDatesHeading: "Votare, date e fonti ufficiali",
        keyDatesIntro: "Le date sono quelle della circolare o della pagina dell’amministrazione federale.",
        keyDates: [
          {
            label: "Giorno della votazione",
            text: "La circolare fissa la domenica 29 novembre 2026 come data della votazione popolare.",
            links: [{ label: "circolare", href: BBL }],
          },
          {
            label: "Quattro oggetti",
            text: "La pagina dell’amministrazione federale dice che si vota su quattro oggetti.",
            links: [{ label: "pagina dell’amministrazione federale", href: ADMIN_VOTE }],
          },
          {
            label: "Consegna del materiale",
            text: "La circolare chiede di consegnare il materiale al più presto quattro settimane e al più tardi tre settimane prima della votazione.",
            links: [{ label: "circolare", href: BBL }],
          },
          {
            label: "Svizzeri all’estero",
            text: "La circolare indica la settimana civile 43 come primo invio per gli Svizzeri all’estero.",
            links: [{ label: "circolare", href: BBL }],
          },
          {
            label: "Risultati",
            text: "La pagina dell’Ufficio federale di statistica sulle votazioni è il servizio dei risultati. Questa pagina non ne mostra prima delle ore 12:00, ora dell’Europa centrale, del 29 novembre 2026.",
            links: [{ label: "pagina dell’Ufficio federale di statistica sulle votazioni", href: BFS }],
          },
        ],
        faqHeading: "Domande frequenti",
        faqs: [
          {
            question: "Quando si vota nel novembre 2026?",
            text: "La circolare fissa la domenica 29 novembre 2026.",
            links: [{ label: "circolare", href: BBL }],
          },
          {
            question: "Su che cosa vota la Svizzera il 29 novembre 2026?",
            text: "La pagina dell’amministrazione federale indica quattro oggetti, tra cui il finanziamento aggiuntivo dell’AVS, i fuochi d’artificio, l’imposizione dei coniugi e la legge sul materiale bellico.",
            links: [{ label: "pagina dell’amministrazione federale", href: ADMIN_VOTE }],
          },
          {
            question: "Quando arriva il materiale di voto?",
            text: "La circolare chiede ai Cantoni di consegnarlo al più presto quattro settimane e al più tardi tre settimane prima del giorno della votazione.",
            links: [{ label: "circolare", href: BBL }],
          },
          {
            question: "Dove sono pubblicati i risultati?",
            text: "Questa pagina non mostra un risultato. La pagina dell’Ufficio federale di statistica sulle votazioni è il servizio ufficiale.",
            links: [{ label: "pagina dell’Ufficio federale di statistica sulle votazioni", href: BFS }],
          },
          {
            question: "Chi ha fissato la data?",
            text: "Il comunicato del 30 giugno 2026 dice che il Consiglio federale ha deciso, il 24 giugno 2026, di sottoporre i quattro oggetti al voto il 29 novembre 2026.",
            links: [{ label: "comunicato del 30 giugno 2026", href: PRESS }],
          },
        ],
        relatedHeading: "Pagine collegate",
        related: [
          { href: "/", label: "Home" },
          { href: "/ch/it/", label: "Svizzera" },
          { href: "/ch/it/elections/", label: "Elezioni" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        bodyHtml: CH_IT,
        sourcesHeading: "Fonti",
        sources: [
          { href: ADMIN_VOTE, label: "Amministrazione federale, votazione del 29 novembre 2026", readOn: "2026-10-27" },
          { href: BBL, label: "Circolare del Consiglio federale del 3 settembre 2026, FF 2026 2406", readOn: "2026-10-27" },
          { href: PRESS, label: "Consiglio federale, comunicato del 30 giugno 2026", readOn: "2026-10-27" },
          { href: BFS, label: "Ufficio federale di statistica, votazioni", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: "/ch/en/elections/volksabstimmung-2026-11-29/",
        title: "Switzerland federal popular vote, 29 November 2026",
        description:
          "Federal popular vote in Switzerland on Sunday 29 November 2026, four proposals. No result is shown. Unofficial information.",
        ogDescription: "Switzerland federal popular vote, Sunday 29 November 2026, four proposals. Unofficial information.",
        ogLocale: "en_US",
        alternates: chAlternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Switzerland", path: "/ch/" },
          { name: "Switzerland", path: "/ch/en/" },
          { name: "Elections", path: "/ch/en/elections/" },
          { name: "29 November 2026", path: "/ch/en/elections/volksabstimmung-2026-11-29/" },
        ],
        eyebrow: "Sunday 29 November 2026",
        h1: "Swiss federal popular vote",
        lede: "Four proposals. The Federal Council circular of 3 September 2026 sets the Sunday.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: ADMIN_VOTE,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "federal administration",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ch/en/", label: "Switzerland" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        eventName: "Swiss federal popular vote, 29 November 2026",
        locationName: "Switzerland",
        addressRegion: "Switzerland",
        addressCountry: "CH",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "The dates are those in the circular or on the federal administration’s vote page.",
        keyDates: [
          {
            label: "Polling day",
            text: "The circular sets Sunday 29 November 2026 as the day of the popular vote.",
            links: [{ label: "circular", href: BBL }],
          },
          {
            label: "Four proposals",
            text: "The federal vote page says the vote is on four proposals.",
            links: [{ label: "federal vote page", href: ADMIN_VOTE }],
          },
          {
            label: "Voting papers",
            text: "The circular asks the cantons to deliver the papers at the earliest four weeks and at the latest three weeks before polling day.",
            links: [{ label: "circular", href: BBL }],
          },
          {
            label: "Swiss abroad",
            text: "The circular names calendar week 43 as the earliest dispatch to Swiss abroad.",
            links: [{ label: "circular", href: BBL }],
          },
          {
            label: "Results",
            text: "The Federal Statistical Office page on popular votes is the results service. This page shows no count before 12:00 Central European Time on 29 November 2026.",
            links: [{ label: "Federal Statistical Office page on popular votes", href: BFS }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the Swiss federal vote in November 2026?",
            text: "The circular sets Sunday 29 November 2026 as polling day.",
            links: [{ label: "circular", href: BBL }],
          },
          {
            question: "What is Switzerland voting on on 29 November 2026?",
            text: "The federal vote page names four proposals, including AHV financing, fireworks, the taxation of married couples, and the War Material Act.",
            links: [{ label: "federal vote page", href: ADMIN_VOTE }],
          },
          {
            question: "When are Swiss voting papers sent?",
            text: "The circular asks cantons to deliver them at the earliest four weeks and at the latest three weeks before polling day.",
            links: [{ label: "circular", href: BBL }],
          },
          {
            question: "Where are Swiss federal vote results published?",
            text: "This page shows no count. The Federal Statistical Office page on popular votes is the official results service.",
            links: [{ label: "Federal Statistical Office page on popular votes", href: BFS }],
          },
          {
            question: "Who set the date of the 29 November 2026 vote?",
            text: "The release of 30 June 2026 says the Federal Council decided on 24 June 2026 to put the four proposals to a vote on 29 November 2026.",
            links: [{ label: "release of 30 June 2026", href: PRESS }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/ch/en/", label: "Switzerland" },
          { href: "/ch/en/elections/", label: "Elections" },
          { href: "/ch/en/elections/nationalrat-2027/", label: "National Council 2027" },
          { href: "/ch/de/elections/volksabstimmung-2026-11-29/", label: "Deutsch" },
        ],
        bodyHtml: CH_EN,
        sourcesHeading: "Sources",
        sources: [
          { href: ADMIN_VOTE, label: "Federal administration, popular vote of 29 November 2026", readOn: "2026-10-27" },
          { href: BBL, label: "Federal Council circular of 3 September 2026, BBl 2026 2406", readOn: "2026-10-27" },
          { href: PRESS, label: "Federal Council release of 30 June 2026", readOn: "2026-10-27" },
          { href: BFS, label: "Federal Statistical Office, popular votes", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
