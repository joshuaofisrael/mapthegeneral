/**
 * SEO profiles for elections that should carry Event JSON-LD, a sourced
 * key-dates section, and an FAQ. Add a profile when an election enters the
 * 60-day window, or in the 14 days after polling day. Pages are rendered by scripts/render-upcoming-elections.ts.
 * Dates below are copied from the official pages named on each fact.
 * No poll, projection, or result is stored here.
 */

import { BG_ELECTION_SEO_PROFILES } from "./election-seo-bg";
import { EXTRA_ELECTION_SEO_PROFILES } from "./election-seo-extra";

export const ELECTION_SEO_WINDOW_DAYS = 60;

export type LinkedPhrase = { label: string; href: string; rel?: string };

export type SourcedText = {
  text: string;
  links: LinkedPhrase[];
};

export type FaqItem = SourcedText & { question: string };

export type KeyDate = SourcedText & { label: string };

export type ElectionSeoPage = {
  lang: "en" | "pl" | "fr" | "it" | "de" | "bg" | "zh" | "es" | "et" | "nl" | "fi" | "mi";
  /** Word before the source date in the sources list. Defaults to “read”. */
  readWord?: string;
  htmlLang: string;
  path: string;
  title: string;
  description: string;
  ogDescription: string;
  ogLocale: string;
  alternates: { hreflang: string; path: string }[];
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  h1: string;
  lede: string;
  updated: string;
  reportLabel: string;
  officeHref: string;
  bannerBefore: string;
  bannerAfter: string;
  nav: { href: string; label: string }[];
  eventName: string;
  locationName: string;
  addressRegion: string;
  addressCountry: string;
  keyDatesHeading: string;
  keyDatesIntro: string;
  keyDates: KeyDate[];
  faqHeading: string;
  faqs: FaqItem[];
  relatedHeading: string;
  related: { href: string; label: string }[];
  /** Existing narrative, already escaped. Inserted before the key-dates section. */
  bodyHtml: string;
  sourcesHeading: string;
  sources: { href: string; label: string; readOn: string }[];
};

export type HomeElectionLink = { href: string; label: string; detail: string };

export type HomeElectionCard = HomeElectionLink & { recent: boolean };

/** Days after polling day that a just-held election stays on the home list. */
export const ELECTION_SEO_RECENT_DAYS = 14;

export type ElectionSeoProfile = {
  /** Matches `ELECTION_WINDOWS[].id`. */
  id: string;
  pollingDay: string;
  startDate: string;
  endDate: string;
  organizerName: string;
  organizerUrl: string;
  /** Existing country OG image. Omitted from JSON-LD when the file is missing. */
  imagePath?: string;
  /**
   * Show on the homepage list even when polling day is outside the 60-day
   * window. Used for a dated election this release publishes early.
   */
  pinOnHome?: boolean;
  /**
   * ISO content date for sitemap lastmod. A shallow clone cannot date the
   * page from git, and a commit made west of UTC can fall on the previous
   * calendar day. This value is used in those cases when it is newer.
   */
  lastmod: string;
  /**
   * File id under src/data/candidates/. The page renders that list only
   * when it has rows. An empty file adds no candidate section. Put
   * `{{candidates}}` in bodyHtml where the list should sit.
   */
  candidateListId?: string;
  homeLinks: HomeElectionLink[];
  pages: ElectionSeoPage[];
};

const VEC_2026 = "https://www.vec.vic.gov.au/voting/2026-state-election";
const VEC_STATE = "https://www.vec.vic.gov.au/voting/types-of-elections/state-elections";
const VEC_POSTAL = "https://www.vec.vic.gov.au/voting/2026-state-election/postal-voting";
const VEC_RESULTS = "https://www.vec.vic.gov.au/results";
const VEC_HOME = "https://www.vec.vic.gov.au";
const DECREE = "https://api.sejm.gov.pl/eli/acts/DU/2026/1255/text.pdf";
const CODE = "https://api.sejm.gov.pl/eli/acts/DU/2026/1261/text.pdf";
const PKW_SERVICE = "https://wybory.gov.pl/senat20261122/pl";
const PKW_HOME = "https://pkw.gov.pl";
const EBC_HOME = "https://elections.bc.ca";
const EBC_2026 = "https://elections.bc.ca/2026-provincial-election/";
const EBC_WRITS = "https://elections.bc.ca/2026-provincial-election/writs-of-election/";
const EBC_NEWS = "https://elections.bc.ca/news/final-voting-day-is-saturday-october-24/";
const EBC_GUIDE = "https://elections.bc.ca/docs/8008790_Guide-to-Voting-and-Counting.pdf";
const EBC_RESULTS = "https://www.results.elections.bc.ca/";
const EBC_RESULTS_NAMED = "https://results.elections.bc.ca";
const EBC_ARCHIVE = "https://elections.bc.ca/resources/results/provincial-election-results/";
const PKW_CALENDAR = "https://wybory.gov.pl/senat20261122/pl/kalendarz";
const PKW_NOTICES = "https://wybory.gov.pl/senat20261122/pl/pkw_obwieszczenia";
const GU_CHIETI = "https://www.gazzettaufficiale.it/eli/id/2026/09/26/26A05139/sg";
const DL_196 = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2025-12-27;196";
const DAIT_SPECIALE = "https://dait.interno.gov.it/elezioni/speciale-elezioni";
const PREF_CHIETI = "https://prefettura.interno.gov.it/it/prefetture/chieti/comunicazioni/elezione-suppletiva-camera-deputati-15-16-novembre-2026";
const PREF_CHIETI_DOCS = "https://prefettura.interno.gov.it/it/prefetture/chieti/elezione-suppletiva-camera-deputati-15-16-novembre-2026";
const PUBB_3 = "https://prefettura.interno.gov.it/sites/default/files/82/2026-09/pubb-03-suppletive-ed.agosto-2026.pdf";
const DAIT_CANDIDATES = "https://dait.interno.gov.it/elezioni/trasparenza/suppletive-20261116-15";
const CAMERA_VARIAZIONI = "https://www.camera.it/deputati/variazioni-composizione";
const ELIGENDO = "https://elezioni.interno.gov.it/";
const L_28 = "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2000-02-22;28";
const DLGS_177 = "https://www.gazzettaufficiale.it/eli/id/2020/12/29/20G00198/sg";

const VICTORIA_BODY = `<h2>What is elected</h2>
<p>The Victorian Electoral Commission’s state-elections page, read on 24 October 2026, says state elections are held on the last Saturday in November every 4 years, and that the Electoral Act 2002 (Vic) sets that date. It says the next state election is Saturday 28 November 2026. It says the Legislative Assembly has 88 members, one for each district, and the Legislative Council has 40 members, five for each region.</p>
<p>The Parliament of Victoria page, read on 23 October 2026, says Victorians will elect the members for Victoria’s 61st Parliament. It prints the same day, 88 Legislative Assembly electorates, and eight Legislative Council regions with five members each. It says the current parliament expires on 3 November 2026.</p>
<p class="tools"><a href="/au/en/victoria/">Victoria</a> · <a href="/au/en/victoria/assembly/">88 Legislative Assembly districts</a> · <a href="/au/en/victoria/council/">8 Legislative Council regions</a></p>
<h2>Electoral system</h2>
<p>The Commission’s preferential-voting page, read on 23 October 2026, says amendments to the Electoral Act 2002 changed the rules, and that group voting tickets no longer exist for state upper-house elections. It says a formal lower-house vote numbers every box. It says a formal upper-house vote numbers at least five boxes above the line, or at least five boxes below the line. This page does not rank any candidate.</p>
<h2>Who votes, and how</h2>
<p>The state-elections page says a person must enrol and vote if they are 18 or older, an Australian citizen, and have lived in Victoria for longer than a month. It says the Commission may send a fine if an enrolled person does not vote.</p>
<p>The Commission’s 2026 page says enrolment must be correct by 8 pm on Tuesday 3 November. The state-elections timeline says the rolls close at 8 pm on the day the writs are issued, 3 November 2026. Nominations, on the 2026 page, open at 9 am on Wednesday 4 November and close at 12 noon on Monday 9 November for all candidates. The timeline says early voting opens on Wednesday 18 November and runs until 6 pm on the day before election day. The 2026 page says early voting is from Wednesday 18 to Friday 27 November, and that each district has a low-sensory mobile voting session on Tuesday 17 November from 10 am to 4 pm. On election day the timeline says any voting centre in Victoria is open from 8 am to 6 pm. Writs are returned on 19 December 2026.</p>
<p>The postal-voting page, read on 24 October 2026, says a postal application can be made from 9 am on Wednesday 4 November until 6 pm on Wednesday 25 November. A general postal voter applies before 8 pm on Tuesday 3 November. Ballot packs are posted from Wednesday 11 November. The page says there is no online voting. A postal vote is posted back, or left at a voting centre in Victoria, before 6 pm on Saturday 28 November, and must reach the Commission by Friday 4 December. The state-elections page also names interstate and overseas voting. Venue lists were not copied.</p>
<h2>Candidates</h2>
<p class="gap"><strong>Not published yet.</strong> On 23 October 2026 the pages read did not list candidates for 28 November 2026. Nominations open on 4 November 2026. Names will be added here when the Commission publishes them. The official page is <a href="${VEC_2026}">2026 state election</a>.</p>
<h2>Districts and regions</h2>
<p>Each Legislative Assembly district and each Legislative Council region already has a page. Those pages link back here. They name the member the Commission’s earlier count declared, where that count was copied, and they do not list 2026 candidates.</p>
<h2>Result</h2>
<p>This page shows no count and names no winner. The Commission’s results service is <a href="${VEC_RESULTS}">vec.vic.gov.au/results</a>. No count is shown here before 6 pm on 28 November 2026.</p>
<p>© Victorian Electoral Commission. The Commission’s legal page, read on 23 October 2026, says website text other than images, video, branding and third-party content is available under <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a>. No image is copied.</p>`;

const POLAND_EN_BODY = `<h2>What is elected</h2>
<p>The President’s order of 25 September 2026 (Dziennik Ustaw 2026 item 1255) calls a Senate by-election in Lubusz Voivodeship, constituency 20: the counties of Krosno Odrzańskie, Świebodzin and Zielona Góra, and the city with county status Zielona Góra. The seat of the district commission is Zielona Góra. The order cites article 283 § 1 point 1 of the electoral code, together with the Marshal of the Senate’s decision of 27 August 2026 stating that the mandate of senator Mirosław Różański had expired. Article 283 § 1 point 1 is the death of a senator. Polling day is Sunday 22 November 2026.</p>
<p>Article 256: 100 senators are elected by majority. Article 260 § 1: Senate constituencies are single-member. The Commission’s constituency file, read on 25 October 2026, prints for number 20: 1 seat and 4 candidates.</p>
<p class="tools"><a href="/pl/en/senat/20/">Constituency 20</a> · <a href="/pl/en/lubuskie/">Lubusz</a> · <a href="/pl/en/lubuskie/krosnienski/">Krosno county</a> · <a href="/pl/en/lubuskie/swiebodzinski/">Świebodzin county</a> · <a href="/pl/en/lubuskie/zielonogorski/">Zielona Góra county</a> · <a href="/pl/en/lubuskie/zielona-gora/">Zielona Góra</a></p>
<h2>How the seat is filled</h2>
<p>Article 264: one candidate per committee in the constituency. Article 267: registered candidates go on the ballot in alphabetical order, with the committee name. Article 268 § 1: one “x” beside one surname. Article 273 § 1 counts as elected the candidate with the most valid votes. This page does not apply that rule to any name. Article 11 § 1 point 2: a Polish citizen with the right to vote who turns 30 by election day may stand.</p>
<h2>Who can vote, and how</h2>
<p>Article 10 § 1 point 1: a Polish citizen who turns 18 by polling day. Article 10 § 2 excludes a person deprived of public rights, deprived of electoral rights by the Tribunal of State, or fully incapacitated. Article 283 § 4: voting is only in Poland, and only for permanent residents of this constituency. Article 26: one roll, in the permanent polling district; the gmina prepares it. Article 39 § 2: 7:00 to 21:00, without a break. The order’s calendar prints the same hours.</p>
<p>That calendar, read on 24 October 2026 in the order’s PDF:</p>
<ul>
<li>9 October to 19 November 2026 — applications by voters permanently resident in the constituency for a certificate to vote where they will be staying, or to change the voting place, and applications to change the voting place from soldiers in basic service or on military exercises and from specified uniformed services housed in barracks;</li>
<li>by 9 November 2026 — notice of intention to vote by post from a voter with a disability, including a request for Braille overlays, and from a voter who turns 60 by polling day;</li>
<li>by 13 November 2026 — application for a voting proxy from a voter with a disability and from a voter who turns 60 by polling day;</li>
<li>by 12 November 2026 — the district commission’s notice of registered candidates;</li>
<li>20 November 2026 at 24:00 — the campaign ends;</li>
<li>22 November 2026, 7:00–21:00 — voting.</li>
</ul>
<p>Article 107 § 1 forbids campaigning on polling day and for the 24 hours before it. Article 115 § 1 forbids publishing pre-election research results, and research results from polling day, during that same period. This page carries no campaign and prints no such results.</p>
{{candidates}}
<h2>Result</h2>
<p>The vote columns in that file are empty. This page shows no count and names no elected senator. Article 276: the Commission announces the result in the Dziennik Ustaw. No count will be shown here before voting ends. Commission service: <a href="${PKW_SERVICE}">wybory.gov.pl/senat20261122</a>.</p>`;

const POLAND_PL_BODY = `<h2>Co się wybiera</h2>
<p>Postanowienie Prezydenta RP z 25 września 2026 r. (Dz.U. 2026 poz. 1255) zarządza wybory uzupełniające do Senatu w województwie lubuskim, w okręgu nr 20: powiaty krośnieński, świebodziński i zielonogórski oraz miasto na prawach powiatu Zielona Góra. Siedziba Okręgowej Komisji Wyborczej: Zielona Góra. Podstawą jest art. 283 § 1 pkt 1 Kodeksu wyborczego, w związku z postanowieniem Marszałka Senatu z 27 sierpnia 2026 r. o stwierdzeniu wygaśnięcia mandatu senatora Mirosława Różańskiego. Art. 283 § 1 pkt 1 mówi o śmierci senatora. Datą wyborów jest niedziela 22 listopada 2026 r.</p>
<p>Art. 256: do Senatu wybiera się 100 senatorów według zasady większości. Art. 260 § 1: okręgi do Senatu są jednomandatowe. Plik okręgów PKW odczytany 25 października 2026 r. podaje dla numeru 20: 1 mandat i 4 kandydatów.</p>
<p class="tools"><a href="/pl/pl/senat/20/">Okręg nr 20</a> · <a href="/pl/pl/lubuskie/">lubuskie</a> · <a href="/pl/pl/lubuskie/krosnienski/">powiat krośnieński</a> · <a href="/pl/pl/lubuskie/swiebodzinski/">powiat świebodziński</a> · <a href="/pl/pl/lubuskie/zielonogorski/">powiat zielonogórski</a> · <a href="/pl/pl/lubuskie/zielona-gora/">Zielona Góra</a></p>
<h2>Zasada wyboru</h2>
<p>Art. 264: jeden kandydat komitetu w okręgu. Art. 267: zarejestrowani kandydaci na karcie alfabetycznie, z nazwą komitetu. Art. 268 § 1: znak „x” przy jednym nazwisku. Art. 273 § 1: mandat bierze najwięcej ważnych głosów. Ta strona nie stosuje tej reguły do żadnego nazwiska. Art. 11 § 1 pkt 2: bierne prawo wyborcze ma obywatel polski z prawem wybierania, który w dniu wyborów kończy co najmniej 30 lat.</p>
<h2>Kto głosuje i w jaki sposób</h2>
<p>Art. 10 § 1 pkt 1: obywatel polski, który w dniu głosowania kończy co najmniej 18 lat. Art. 10 § 2 wyłącza pozbawionych praw publicznych, pozbawionych praw wyborczych przez Trybunał Stanu i ubezwłasnowolnionych. Art. 283 § 4: głosowanie tylko w kraju i tylko dla stale zamieszkałych w tym okręgu. Art. 26: jeden spis, w stałym obwodzie; spis sporządza gmina. Art. 39 § 2: od 7:00 do 21:00, bez przerwy. Ten sam przedział jest w kalendarzu postanowienia.</p>
<p>Kalendarz, odczytany 24 października 2026 r. w pliku PDF postanowienia:</p>
<ul>
<li>od 9 października do 19 listopada 2026 r. — wnioski wyborców stale zamieszkałych w okręgu o zaświadczenie o prawie do głosowania w miejscu pobytu albo o zmianę miejsca głosowania, a także wnioski o zmianę miejsca głosowania żołnierzy zasadniczej służby wojskowej albo ćwiczeń oraz wskazanych służb mundurowych w systemie skoszarowanym;</li>
<li>do 9 listopada 2026 r. — zamiar głosowania korespondencyjnego wyborców niepełnosprawnych, w tym z nakładkami w alfabecie Braille’a, oraz wyborców, którzy najpóźniej w dniu głosowania kończą 60 lat;</li>
<li>do 13 listopada 2026 r. — wniosek o akt pełnomocnictwa do głosowania wyborców niepełnosprawnych oraz wyborców, którzy najpóźniej w dniu głosowania kończą 60 lat;</li>
<li>do 12 listopada 2026 r. — obwieszczenie Okręgowej Komisji Wyborczej o zarejestrowanych kandydatach;</li>
<li>20 listopada 2026 r. o godz. 24:00 — zakończenie kampanii wyborczej;</li>
<li>22 listopada 2026 r., godz. 7:00–21:00 — głosowanie.</li>
</ul>
<p>Art. 107 § 1: w dniu głosowania i na 24 godziny przed tym dniem agitacja wyborcza jest zabroniona. Art. 115 § 1: w tym samym czasie zabronione jest podawanie wyników przedwyborczych badań opinii publicznej i wyników badań z dnia głosowania. Ta strona nie prowadzi agitacji i nie podaje takich wyników.</p>
{{candidates}}
<h2>Wynik</h2>
<p>Kolumny głosów w tym pliku są puste. Ta strona nie pokazuje liczenia i nie wskazuje wybranego senatora. Art. 276: wynik ogłasza PKW obwieszczeniem w Dzienniku Ustaw. Liczenie nie pojawi się tutaj przed zakończeniem głosowania. Serwis PKW: <a href="${PKW_SERVICE}">wybory.gov.pl/senat20261122</a>.</p>`;

const BC_EN_BODY = `<h2>What was elected</h2>
<p>The <a href="${EBC_WRITS}">writs of election page</a>, read on 25 October 2026, says writs of election have been issued for the 44th Provincial General Election, and that Final Voting Day is Saturday 24 October 2026. It says that in a general election a writ is issued for each of the province's 93 electoral districts, and that when the writs are returned the election period is officially over.</p>
<p>The <a href="${EBC_2026}">2026 provincial election page</a>, read the same day, says voters will elect 93 Members of the Legislative Assembly. It says each member represents an electoral district. It does not publish a count of votes.</p>
<p class="tools"><a href="/ca/en/british-columbia/">British Columbia</a> · <a href="/ca/en/british-columbia/legislature/">Legislative Assembly districts</a> · <a href="/ca/en/elections/">Elections in Canada</a></p>
<h2>Who could vote</h2>
<p>The 2026 provincial election page says a person can vote if they are a Canadian citizen, 18 or older on 24 October 2026, and a resident of British Columbia since 23 April 2026. This page does not copy any other eligibility rule.</p>
<h2>When people voted</h2>
<p>The <a href="${EBC_NEWS}">Final Voting Day news release</a> says voting places are open from 8 a.m. to 8 p.m. Pacific time on 24 October. The 2026 provincial election page says advance voting is 16–21 October 2026. The <a href="${EBC_GUIDE}">Guide to Voting and Counting</a> says there is no online voting option in British Columbia.</p>
<h2>Result</h2>
<p>This page shows no count and names no one ahead. The news release says that after voting closes at 8 p.m. Pacific time, preliminary results are reported at <a href="${EBC_RESULTS_NAMED}">results.elections.bc.ca</a>. On 25 October 2026 that address did not load a results page, and the <a href="${EBC_RESULTS}">event-night reporting page</a> did. That page is Elections BC's own service for the 2026 Provincial General Election. Official results follow final count. The 2026 provincial election page says final count is planned for 6–10 November 2026 and that Return Day is 18 November 2026. Earlier statements of votes are on the <a href="${EBC_ARCHIVE}">provincial election results archive</a>.</p>`;

const BC_FR_BODY = `<h2>Ce qui était en élection</h2>
<p>La <a href="${EBC_WRITS}">page des brefs d'élection</a>, lue le 25 octobre 2026, dit que des brefs ont été émis pour la 44e élection générale provinciale, et que le jour du scrutin final est le samedi 24 octobre 2026. Elle dit que, lors d'une élection générale, un bref est émis pour chacune des 93 circonscriptions de la province, et que la période électorale est officiellement terminée lorsque les brefs sont retournés.</p>
<p>La <a href="${EBC_2026}">page de l'élection provinciale de 2026</a>, lue le même jour, dit que les électeurs éliront 93 membres de l'Assemblée législative. Elle dit que chaque membre représente une circonscription. Elle ne publie pas un décompte des voix.</p>
<p class="tools"><a href="/ca/fr/british-columbia/">Colombie-Britannique</a> · <a href="/ca/fr/british-columbia/legislature/">Circonscriptions de l'Assemblée législative</a> · <a href="/ca/fr/elections/">Élections au Canada</a></p>
<h2>Qui pouvait voter</h2>
<p>La page de l'élection provinciale de 2026 dit qu'une personne peut voter si elle est citoyenne canadienne, âgée de 18 ans ou plus le 24 octobre 2026, et résidente de la Colombie-Britannique depuis le 23 avril 2026. Cette page ne copie aucune autre règle d'admissibilité.</p>
<h2>Quand les gens ont voté</h2>
<p>Le <a href="${EBC_NEWS}">communiqué sur le jour du scrutin final</a> dit que les bureaux de vote sont ouverts de 8 h à 20 h, heure du Pacifique, le 24 octobre. La page de l'élection provinciale de 2026 dit que le vote par anticipation a lieu du 16 au 21 octobre 2026. Le <a href="${EBC_GUIDE}">Guide to Voting and Counting</a> dit qu'il n'y a pas de vote en ligne en Colombie-Britannique.</p>
<h2>Résultat</h2>
<p>Cette page ne montre aucun décompte et ne nomme personne en tête. Le communiqué dit qu'après la fermeture du scrutin à 20 h, heure du Pacifique, les résultats préliminaires sont publiés sur <a href="${EBC_RESULTS_NAMED}">results.elections.bc.ca</a>. Le 25 octobre 2026, cette adresse n'a pas chargé une page de résultats, et la <a href="${EBC_RESULTS}">page de rapport du soir du scrutin</a> s'est chargée. Cette page est le service d'Elections BC pour la 2026 Provincial General Election. Les résultats officiels suivent le décompte final. La page de l'élection provinciale de 2026 dit que le décompte final est prévu du 6 au 10 novembre 2026 et que le Return Day est le 18 novembre 2026. Les relevés des votes des élections antérieures sont dans l'<a href="${EBC_ARCHIVE}">archive des résultats des élections provinciales</a>.</p>`;

const CHIETI_EN_BODY = `<h2>When people vote in Chieti</h2>
<p>The <a href="${GU_CHIETI}">decree of the President of the Republic of 25 September 2026</a> (Gazzetta Ufficiale, general series, no. 224 of 26 September 2026, 26A05139) calls a by-election for the Chamber of Deputies in single-member constituency 01-Chieti of the XVII Abruzzo constituency. The polling days are Sunday 15 November and Monday 16 November 2026. It is signed Mattarella, on the proposal of Meloni, President of the Council of Ministers, and Piantedosi, Minister of the Interior. The <a href="${DAIT_SPECIALE}">Department’s special-elections page</a>, read on 26 October 2026, prints the same days and the same constituency. That page also describes other votes on those days. They are not this by-election, and this page does not describe them.</p>
<p><a href="${DL_196}">Article 1(1) of decree-law no. 196 of 27 December 2025</a>, converted with amendments by law no. 18 of 13 February 2026, says that voting in 2026 runs on Sunday from 7:00 to 23:00 and on Monday from 7:00 to 15:00. The calling decree cites that article. In November those hours are Central European Time. The <a href="${PREF_CHIETI}">Prefecture of Chieti</a> repeats the two days and points to its circulars and publications.</p>
<h2>The constituency</h2>
<p>One seat is filled, by majority, in uninominal constituency 01-Chieti. The constituency page drawn from the tables of <a href="${DLGS_177}">legislative decree no. 177 of 23 December 2020</a> prints 104 detail rows and 104 distinct ISTAT codes for Abruzzo - U01. The municipality of greatest demographic size in that table is Chieti. The municipality list is not copied again here.</p>
<p class="tools"><a href="/it/en/collegi/camera/abruzzo-u01/">Constituency Abruzzo - U01</a> · <a href="/it/en/abruzzo/">Abruzzo</a> · <a href="/it/en/elections/">Elections in Italy</a></p>
<h2>Why the seat is vacant</h2>
<p>The decree says the Giunta delle elezioni communicated the vacancy on 15 September 2026, and that the President of the Chamber notified it on 16 September 2026. The decree does not print a name. The <a href="${CAMERA_VARIAZIONI}">Chamber’s page on changes in membership</a>, read on 26 October 2026, says that on 15 September 2026 the mandate of deputy Alberto Bagnai ended. It says he resigned in order to take the post of member of the Competition and Market Authority, that the Chamber took note because the two offices are incompatible, and that he had been returned for Abruzzo, uninominal constituency 1. This page does not name a mayor, a provincial president, or any other local office-holder.</p>
{{candidates}}
<h2>Result</h2>
<p>This page shows no count and names no one elected. The Department’s special-elections page says turnout and results are followed on <a href="${ELIGENDO}">Eligendo</a>. No count is shown here before 15:00 on 16 November 2026. <a href="${L_28}">Law no. 28 of 22 February 2000, article 8</a>, forbids publishing opinion-poll results in the fifteen days before the vote. This site prints no polls for this election.</p>`;

const CHIETI_IT_BODY = `<h2>Quando si vota a Chieti</h2>
<p>Il <a href="${GU_CHIETI}">decreto del Presidente della Repubblica del 25 settembre 2026</a> (Gazzetta Ufficiale, serie generale, n. 224 del 26 settembre 2026, 26A05139) indice l'elezione suppletiva della Camera dei deputati nel collegio uninominale 01-Chieti della XVII circoscrizione Abruzzo. I giorni sono domenica 15 novembre e lunedì 16 novembre 2026. È firmato Mattarella, su proposta di Meloni, Presidente del Consiglio dei ministri, e di Piantedosi, Ministro dell'interno. La <a href="${DAIT_SPECIALE}">pagina Speciale elezioni del Dipartimento</a>, letta il 26 ottobre 2026, stampa gli stessi giorni e lo stesso collegio. Quella pagina descrive anche altre votazioni in quei giorni. Non sono questa elezione suppletiva, e questa pagina non le descrive.</p>
<p>L'<a href="${DL_196}">articolo 1, comma 1, del decreto-legge 27 dicembre 2025, n. 196</a>, convertito con modificazioni dalla legge 13 febbraio 2026, n. 18, dice che nel 2026 si vota la domenica dalle ore 7 alle ore 23 e il lunedì dalle ore 7 alle ore 15. Il decreto di convocazione cita quell'articolo. A novembre quegli orari sono l'ora dell'Europa centrale. La <a href="${PREF_CHIETI}">Prefettura di Chieti</a> ripete i due giorni e rinvia alle circolari e alle pubblicazioni.</p>
<h2>Il collegio</h2>
<p>Si assegna un seggio, con il sistema maggioritario, nel collegio uninominale 01-Chieti. La pagina del collegio ricavata dalle tabelle del <a href="${DLGS_177}">decreto legislativo 23 dicembre 2020, n. 177</a> stampa 104 righe di dettaglio e 104 codici ISTAT distinti per Abruzzo - U01. Il comune o l'area di maggiore ampiezza in quella tabella è Chieti. L'elenco dei comuni non è ricopiato qui.</p>
<p class="tools"><a href="/it/it/collegi/camera/abruzzo-u01/">Collegio Abruzzo - U01</a> · <a href="/it/it/abruzzo/">Abruzzo</a> · <a href="/it/it/elections/">Elezioni in Italia</a></p>
<h2>Perché il seggio è vacante</h2>
<p>Il decreto dice che la Giunta delle elezioni ha comunicato la vacanza il 15 settembre 2026 e che il Presidente della Camera l'ha segnalata il 16 settembre 2026. Il decreto non stampa un nome. La <a href="${CAMERA_VARIAZIONI}">pagina della Camera sulle variazioni nella composizione</a>, letta il 26 ottobre 2026, dice che il 15 settembre 2026 è cessato dal mandato il deputato Alberto Bagnai. Dice che si è dimesso per la carica di componente dell'Autorità garante della concorrenza e del mercato, che la Camera ha preso atto delle dimissioni per incompatibilità, e che era stato eletto nella circoscrizione Abruzzo, collegio uninominale 1. Questa pagina non nomina un sindaco, un presidente di provincia o un altro amministratore locale.</p>
{{candidates}}
<h2>Risultato</h2>
<p>Questa pagina non mostra un conteggio e non indica un eletto. La pagina Speciale elezioni del Dipartimento dice che affluenza e risultati si seguono su <a href="${ELIGENDO}">Eligendo</a>. Nessun conteggio compare qui prima delle ore 15 del 16 novembre 2026. L'<a href="${L_28}">articolo 8 della legge 22 febbraio 2000, n. 28</a>, vieta di rendere pubblici i risultati dei sondaggi nei quindici giorni precedenti il voto. Questo sito non pubblica sondaggi su questa elezione.</p>`;

export const ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "au-vic-2026",
    pollingDay: "2026-11-28",
    startDate: "2026-11-28T08:00:00+11:00",
    endDate: "2026-11-28T18:00:00+11:00",
    organizerName: "Victorian Electoral Commission",
    organizerUrl: VEC_HOME,
    imagePath: "/images/og/au.webp",
    lastmod: "2026-10-27",
    homeLinks: [
      {
        href: "/au/en/elections/victoria-2026/",
        label: "Victorian state election, 28 November 2026",
        detail: "Saturday 28 November 2026, 8 am to 6 pm Australian Eastern Daylight Time. Dates from the Victorian Electoral Commission.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/au/en/elections/victoria-2026/",
        title: "Victorian state election, 28 November 2026",
        description:
          "Victorian state election, Saturday 28 November 2026. Enrolment, nominations, early and postal voting, and the 88 districts and 8 regions. No candidate list has been published. Unofficial information.",
        ogDescription:
          "Victorian state election, Saturday 28 November 2026. Enrolment closes at 8 pm on 3 November 2026. Unofficial information.",
        ogLocale: "en_AU",
        alternates: [
          { hreflang: "en", path: "/au/en/elections/victoria-2026/" },
          { hreflang: "x-default", path: "/au/en/elections/victoria-2026/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Australia", path: "/au/" },
          { name: "Australia", path: "/au/en/" },
          { name: "Elections", path: "/au/en/elections/" },
          { name: "Victoria, 28 November 2026", path: "/au/en/elections/victoria-2026/" },
        ],
        eyebrow: "Saturday 28 November 2026",
        h1: "Victorian state election",
        lede: "The 61st Parliament: 88 Legislative Assembly members and 40 Legislative Council members. Voting on election day is from 8 am to 6 pm.",
        updated: "Last updated: 24 October 2026.",
        reportLabel: "Report an error",
        officeHref: VEC_STATE,
        bannerBefore: "Unofficial information. Confirm with your ",
        bannerAfter: "official election office",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/au/en/", label: "Australia" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Victorian state election, 28 November 2026",
        locationName: "Victoria, Australia",
        addressRegion: "Victoria",
        addressCountry: "AU",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "Each date below is printed by the Victorian Electoral Commission. A date the Commission did not print is not listed.",
        keyDates: [
          {
            label: "Enrolment closes",
            text: "The 2026 state election page says a person needs to be correctly enrolled by 8 pm on Tuesday 3 November 2026. The state-elections page says the rolls close at 8 pm that day, when the writs are issued.",
            links: [
              { label: "2026 state election page", href: VEC_2026 },
              { label: "state-elections page", href: VEC_STATE },
            ],
          },
          {
            label: "Early voting",
            text: "The 2026 state election page says early voting runs from Wednesday 18 November to Friday 27 November 2026. The state-elections page says early voting centres in Victoria stay open until 6 pm on the day before election day.",
            links: [
              { label: "2026 state election page", href: VEC_2026 },
              { label: "state-elections page", href: VEC_STATE },
            ],
          },
          {
            label: "Postal vote applications",
            text: "The vote-by-post page says a postal application can be made from 9 am on Wednesday 4 November until 6 pm on Wednesday 25 November 2026. A general postal voter applies before 8 pm on Tuesday 3 November. The same page says there is no online voting.",
            links: [{ label: "vote-by-post page", href: VEC_POSTAL }],
          },
          {
            label: "Election day hours",
            text: "The state-elections page says that on Saturday 28 November 2026 any voting centre in Victoria is open from 8 am to 6 pm.",
            links: [{ label: "state-elections page", href: VEC_STATE }],
          },
          {
            label: "Low-sensory voting",
            text: "The 2026 state election page says each district has a low-sensory mobile voting session on Tuesday 17 November 2026 from 10 am to 4 pm.",
            links: [{ label: "2026 state election page", href: VEC_2026 }],
          },
          {
            label: "Return of the writs",
            text: "The state-elections page says the writs are returned on 19 December 2026.",
            links: [{ label: "state-elections page", href: VEC_STATE }],
          },
          {
            label: "Official results",
            text: "The results service is where the Victorian Electoral Commission publishes the count. This page shows no count before 6 pm on 28 November 2026.",
            links: [{ label: "results service", href: VEC_RESULTS }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the Victorian state election 2026?",
            text: "The state-elections page says the next state election is Saturday 28 November 2026, and that voting centres in Victoria are open from 8 am to 6 pm.",
            links: [{ label: "state-elections page", href: VEC_STATE }],
          },
          {
            question: "How do I vote early in Victoria?",
            text: "The 2026 state election page says early voting is available from Wednesday 18 November to Friday 27 November 2026. The state-elections page says people can vote at any early voting centre in Victoria until 6 pm on the day before election day.",
            links: [
              { label: "2026 state election page", href: VEC_2026 },
              { label: "state-elections page", href: VEC_STATE },
            ],
          },
          {
            question: "Is voting compulsory in Victoria?",
            text: "The state-elections page says a person must enrol and vote if they are 18 or older, an Australian citizen, and have lived in Victoria for longer than a month. It says the Commission may send a fine if an enrolled person does not vote. This page does not print a fine amount.",
            links: [{ label: "state-elections page", href: VEC_STATE }],
          },
          {
            question: "When does enrolment close for the Victorian state election?",
            text: "The 2026 state election page says enrolment must be correct by 8 pm on Tuesday 3 November 2026. The state-elections page says the rolls close at 8 pm on the day the writs are issued, 3 November 2026.",
            links: [
              { label: "2026 state election page", href: VEC_2026 },
              { label: "state-elections page", href: VEC_STATE },
            ],
          },
          {
            question: "When do postal vote applications close in Victoria?",
            text: "The vote-by-post page says a postal application can be made from 9 am on Wednesday 4 November until 6 pm on Wednesday 25 November 2026.",
            links: [{ label: "vote-by-post page", href: VEC_POSTAL }],
          },
          {
            question: "Where are Victorian state election results published?",
            text: "This page shows no count and names no winner. The results service is the Commission’s page for the official count. No count is shown here before 6 pm on 28 November 2026.",
            links: [{ label: "results service", href: VEC_RESULTS }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/au/", label: "Australia" },
          { href: "/au/en/", label: "Australia, English" },
          { href: "/au/en/victoria/", label: "Victoria" },
          { href: "/au/en/elections/", label: "Elections in Australia" },
          { href: "/au/en/elections/federal-next/", label: "Next federal election" },
          { href: "/au/en/elections/nsw-2027/", label: "New South Wales state election, 13 March 2027" },
        ],
        bodyHtml: VICTORIA_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: VEC_STATE, label: "Victorian Electoral Commission, “State elections”", readOn: "2026-10-24" },
          { href: VEC_2026, label: "Victorian Electoral Commission, “2026 state election”", readOn: "2026-10-24" },
          {
            href: "https://www.vec.vic.gov.au/voting/how-voting-works/preferential-voting",
            label: "Victorian Electoral Commission, “Preferential voting”",
            readOn: "2026-10-23",
          },
          { href: VEC_POSTAL, label: "Victorian Electoral Commission, “Vote by post”", readOn: "2026-10-24" },
          { href: "https://www.parliament.vic.gov.au/election", label: "Parliament of Victoria, “2026 Victorian state election”", readOn: "2026-10-23" },
          { href: VEC_RESULTS, label: "Victorian Electoral Commission, results", readOn: "2026-10-23" },
          { href: "https://www.vec.vic.gov.au/legal", label: "Victorian Electoral Commission, “Legal”", readOn: "2026-10-23" },
          { href: "https://www.vec.vic.gov.au/electoral-boundaries/state-districts", label: "Victorian Electoral Commission, state districts", readOn: "2026-10-18" },
          { href: "https://www.vec.vic.gov.au/electoral-boundaries/state-regions", label: "Victorian Electoral Commission, state regions", readOn: "2026-10-18" },
        ],
      },
    ],
  },
  {
    id: "pl-2026-senat-20",
    pollingDay: "2026-11-22",
    startDate: "2026-11-22T07:00:00+01:00",
    endDate: "2026-11-22T21:00:00+01:00",
    organizerName: "Państwowa Komisja Wyborcza",
    organizerUrl: PKW_HOME,
    imagePath: "/images/og/pl.webp",
    lastmod: "2026-10-27",
    candidateListId: "senat-20-2026",
    homeLinks: [
      {
        href: "/pl/en/elections/senat-20-2026/",
        label: "Senate by-election, constituency 20, 22 November 2026",
        detail: "Sunday 22 November 2026, 7:00–21:00 Central European Time. Calendar from the presidential order, Dziennik Ustaw 2026 item 1255.",
      },
      {
        href: "/pl/pl/elections/senat-20-2026/",
        label: "Wybory uzupełniające do Senatu, okręg 20, 22 listopada 2026",
        detail: "Niedziela 22 listopada 2026 r., godz. 7:00–21:00 czasu środkowoeuropejskiego. Kalendarz z postanowienia, Dz.U. 2026 poz. 1255.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/pl/en/elections/senat-20-2026/",
        title: "Poland Senate by-election, Lubusz constituency 20, 22 November 2026",
        description:
          "Poland Senate by-election in Lubusz constituency 20, Zielona Góra, Sunday 22 November 2026, 7:00–21:00. Calendar from the presidential order and the Commission candidate file. Unofficial information.",
        ogDescription: "Poland Senate by-election in Lubusz constituency 20, Sunday 22 November 2026, 7:00–21:00. Unofficial information.",
        ogLocale: "en_US",
        alternates: [
          { hreflang: "pl", path: "/pl/pl/elections/senat-20-2026/" },
          { hreflang: "en", path: "/pl/en/elections/senat-20-2026/" },
          { hreflang: "x-default", path: "/pl/pl/elections/senat-20-2026/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Poland", path: "/pl/" },
          { name: "Poland", path: "/pl/en/" },
          { name: "Elections", path: "/pl/en/elections/" },
          { name: "Senate, constituency 20, 2026", path: "/pl/en/elections/senat-20-2026/" },
        ],
        eyebrow: "Sunday 22 November 2026",
        h1: "Senate by-election in constituency 20",
        lede: "Lubusz Voivodeship. One Senate seat. Voting from 7:00 to 21:00.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: PKW_HOME,
        bannerBefore: "Unofficial information. Confirm with your ",
        bannerAfter: "official election office",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/pl/en/", label: "Poland" },
          { href: "/search/", label: "Search" },
          { href: "/pl/pl/elections/senat-20-2026/", label: "Polski" },
        ],
        eventName: "Senate by-election in constituency 20, 22 November 2026",
        locationName:
          "Senate constituency no. 20, Lubusz Voivodeship (Krosno Odrzańskie, Świebodzin and Zielona Góra counties, and the city of Zielona Góra)",
        addressRegion: "Lubuskie",
        addressCountry: "PL",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "The dates below are lines in the election calendar attached to the President’s order of 25 September 2026 (Dziennik Ustaw 2026 item 1255). That calendar does not print an enrolment deadline or an early-voting period, so neither is listed. This page carries no campaign material.",
        keyDates: [
          {
            label: "Certificate or a change of voting place",
            text: "The election calendar says that from 9 October to 19 November 2026 voters permanently resident in the constituency may apply for a certificate to vote where they will be staying, or to change their voting place.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            label: "Postal voting notice",
            text: "The election calendar says that by 9 November 2026 a voter with a disability, including a voter who wants Braille overlays, and a voter who turns 60 by polling day, gives notice of voting by post.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            label: "Voting proxy",
            text: "The election calendar says that by 13 November 2026 a voter with a disability, and a voter who turns 60 by polling day, may apply for a voting proxy.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            label: "Notice of registered candidates",
            text: "The election calendar says that by 12 November 2026 the district commission publishes a notice of registered candidates. That notice was not on the Commission notice list read on 25 October 2026.",
            links: [
              { label: "election calendar", href: DECREE },
              { label: "Commission notice list", href: PKW_NOTICES, rel: "nofollow noopener" },
            ],
          },
          {
            label: "End of the campaign",
            text: "The election calendar ends the campaign at 24:00 on 20 November 2026. This page does not publish campaign material or survey results.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            label: "Voting hours",
            text: "The election calendar prints voting on Sunday 22 November 2026 from 7:00 to 21:00.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            label: "Official results",
            text: "The Commission’s election service is the official page for this by-election. This page shows no count before voting ends at 21:00 on 22 November 2026.",
            links: [{ label: "election service", href: PKW_SERVICE }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the Senate by-election in constituency 20?",
            text: "The President’s order of 25 September 2026 sets polling day as Sunday 22 November 2026. Its election calendar prints voting from 7:00 to 21:00.",
            links: [{ label: "President’s order of 25 September 2026", href: DECREE }],
          },
          {
            question: "What time does voting run in the constituency 20 by-election?",
            text: "The election calendar prints voting on 22 November 2026 from 7:00 to 21:00.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            question: "Who can vote in the Senate by-election in constituency 20?",
            text: "The electoral code, article 10 § 1 point 1, as read on 23 October 2026, gives the vote to a Polish citizen who turns 18 by polling day. Article 283 § 4 in that reading limits this by-election to permanent residents of the constituency, voting only in Poland.",
            links: [{ label: "electoral code", href: CODE }],
          },
          {
            question: "How do I vote by post in the constituency 20 by-election?",
            text: "The election calendar says that by 9 November 2026 a voter with a disability, including a voter asking for Braille overlays, and a voter who turns 60 by polling day, gives notice of voting by post. A voting-proxy application from those groups is due by 13 November 2026.",
            links: [{ label: "election calendar", href: DECREE }],
          },
          {
            question: "Where do I vote in Senate constituency 20?",
            text: "The President’s order of 25 September 2026 defines constituency 20 as the counties of Krosno Odrzańskie, Świebodzin and Zielona Góra, and the city of Zielona Góra, in Lubusz Voivodeship. The election calendar requires polling-district numbers, boundaries and seats to be published by 23 October 2026. This page does not copy a station list.",
            links: [{ label: "President’s order of 25 September 2026", href: DECREE }],
          },
          {
            question: "Where is the constituency 20 Senate result published?",
            text: "This page shows no count and names no elected senator. The election service is the Commission’s page for this by-election. No count is shown here before voting ends at 21:00 on 22 November 2026.",
            links: [{ label: "election service", href: PKW_SERVICE }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/pl/", label: "Poland" },
          { href: "/pl/en/", label: "Poland, English" },
          { href: "/pl/en/elections/", label: "Elections in Poland" },
          { href: "/pl/en/elections/sejm-senat-2027/", label: "Sejm and Senate, 2027" },
          { href: "/pl/en/senat/20/", label: "Constituency 20" },
          { href: "/pl/pl/elections/senat-20-2026/", label: "Polski" },
        ],
        bodyHtml: POLAND_EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: DECREE, label: "President’s order of 25 September 2026 (Dz.U. 2026 item 1255), PDF", readOn: "2026-10-24" },
          { href: CODE, label: "Electoral code, consolidated text (Dz.U. 2026 item 1261)", readOn: "2026-10-23" },
          { href: PKW_SERVICE, label: "National Electoral Commission, Senate by-election, constituency 20", readOn: "2026-10-25" },
          { href: PKW_CALENDAR, label: "Commission election calendar", readOn: "2026-10-25" },
          { href: PKW_NOTICES, label: "Commission notice list", readOn: "2026-10-25" },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/kandydaci_senat_csv.1791978806.zip",
            label: "Commission, kandydaci_senat_csv.zip",
            readOn: "2026-10-25",
          },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/okregi_senat_csv.1791978806.zip",
            label: "Commission, okregi_senat_csv.zip",
            readOn: "2026-10-25",
          },
          {
            href: "https://api.sejm.gov.pl/eli/acts/DU/2021/1641/text.html",
            label: "Open Data and Re-use of Public Sector Information Act",
            readOn: "2026-10-23",
          },
          { href: "https://www.senat.gov.pl/sklad/okregi-wyborcze/", label: "Senate, constituencies", readOn: "2026-10-18" },
        ],
      },
      {
        lang: "pl",
        htmlLang: "pl",
        path: "/pl/pl/elections/senat-20-2026/",
        title: "Polska: wybory uzupełniające do Senatu, okręg 20, 22 listopada 2026",
        description:
          "Polska, wybory uzupełniające do Senatu w województwie lubuskim, okręg nr 20, Zielona Góra, niedziela 22 listopada 2026 r., godz. 7:00–21:00. Kalendarz z postanowienia Prezydenta i plik kandydatów PKW. Informacja nieoficjalna.",
        ogDescription:
          "Polska, wybory uzupełniające do Senatu, okręg 20, niedziela 22 listopada 2026 r., godz. 7:00–21:00. Informacja nieoficjalna.",
        ogLocale: "pl_PL",
        alternates: [
          { hreflang: "pl", path: "/pl/pl/elections/senat-20-2026/" },
          { hreflang: "en", path: "/pl/en/elections/senat-20-2026/" },
          { hreflang: "x-default", path: "/pl/pl/elections/senat-20-2026/" },
        ],
        crumbs: [
          { name: "Strona główna", path: "/" },
          { name: "Polska", path: "/pl/" },
          { name: "Polska", path: "/pl/pl/" },
          { name: "Wybory", path: "/pl/pl/elections/" },
          { name: "Senat, okręg 20, 2026", path: "/pl/pl/elections/senat-20-2026/" },
        ],
        eyebrow: "Niedziela 22 listopada 2026 r.",
        h1: "Wybory uzupełniające do Senatu w okręgu nr 20",
        lede: "Województwo lubuskie. Jeden mandat senatora. Głosowanie w godz. 7:00–21:00.",
        updated: "Ostatnia aktualizacja tej strony: 27 października 2026 r.",
        reportLabel: "Zgłoś błąd",
        officeHref: PKW_HOME,
        bannerBefore: "Informacja nieoficjalna. Potwierdź ją w ",
        bannerAfter: "urzędowym organie wyborczym",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/pl/pl/", label: "Polska" },
          { href: "/search/", label: "Szukaj" },
          { href: "/pl/en/elections/senat-20-2026/", label: "English" },
        ],
        eventName: "Wybory uzupełniające do Senatu w okręgu nr 20, 22 listopada 2026 r.",
        locationName:
          "Okręg wyborczy nr 20 do Senatu (powiat krośnieński, powiat świebodziński, powiat zielonogórski oraz miasto na prawach powiatu Zielona Góra)",
        addressRegion: "lubuskie",
        addressCountry: "PL",
        keyDatesHeading: "Jak głosować, terminy i źródła urzędowe",
        keyDatesIntro:
          "Terminy poniżej są wierszami kalendarza załączonego do postanowienia Prezydenta z 25 września 2026 r. (Dz.U. 2026 poz. 1255). Ten kalendarz nie podaje terminu zamknięcia spisu ani głosowania przed dniem wyborów, więc tych dat tu nie ma. Ta strona nie prowadzi agitacji.",
        keyDates: [
          {
            label: "Zaświadczenie albo zmiana miejsca głosowania",
            text: "Kalendarz wyborczy podaje, że od 9 października do 19 listopada 2026 r. wyborca stale zamieszkały w okręgu może złożyć wniosek o zaświadczenie o prawie do głosowania w miejscu pobytu albo o zmianę miejsca głosowania.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            label: "Zamiar głosowania korespondencyjnego",
            text: "Kalendarz wyborczy podaje, że do 9 listopada 2026 r. wyborca niepełnosprawny, w tym proszący o nakładki w alfabecie Braille’a, oraz wyborca, który najpóźniej w dniu głosowania kończy 60 lat, zgłasza zamiar głosowania korespondencyjnego.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            label: "Pełnomocnictwo do głosowania",
            text: "Kalendarz wyborczy podaje, że do 13 listopada 2026 r. wyborca niepełnosprawny oraz wyborca, który najpóźniej w dniu głosowania kończy 60 lat, może złożyć wniosek o akt pełnomocnictwa do głosowania.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            label: "Obwieszczenie o kandydatach",
            text: "Kalendarz wyborczy podaje, że do 12 listopada 2026 r. Okręgowa Komisja Wyborcza ogłasza obwieszczenie o zarejestrowanych kandydatach. Tego obwieszczenia nie było na liście obwieszczeń PKW odczytanej 25 października 2026 r.",
            links: [
              { label: "Kalendarz wyborczy", href: DECREE },
              { label: "liście obwieszczeń PKW", href: PKW_NOTICES, rel: "nofollow noopener" },
            ],
          },
          {
            label: "Zakończenie kampanii",
            text: "Kalendarz wyborczy kończy kampanię 20 listopada 2026 r. o godz. 24:00. Ta strona nie publikuje materiałów kampanijnych ani wyników badań.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            label: "Godziny głosowania",
            text: "Kalendarz wyborczy podaje głosowanie w niedzielę 22 listopada 2026 r. w godz. 7:00–21:00.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            label: "Wynik urzędowy",
            text: "Serwis wyborów jest urzędową stroną tych wyborów. Ta strona nie pokazuje liczenia przed zakończeniem głosowania o 21:00 22 listopada 2026 r.",
            links: [{ label: "Serwis wyborów", href: PKW_SERVICE }],
          },
        ],
        faqHeading: "Pytania",
        faqs: [
          {
            question: "Kiedy są wybory uzupełniające do Senatu w okręgu 20?",
            text: "Postanowienie Prezydenta z 25 września 2026 r. wyznacza wybory na niedzielę 22 listopada 2026 r. Kalendarz tego postanowienia podaje głosowanie w godz. 7:00–21:00.",
            links: [{ label: "Postanowienie Prezydenta z 25 września 2026 r.", href: DECREE }],
          },
          {
            question: "O której trwa głosowanie w okręgu 20?",
            text: "Kalendarz wyborczy podaje głosowanie 22 listopada 2026 r. w godz. 7:00–21:00.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            question: "Kto może głosować w wyborach uzupełniających do Senatu w okręgu 20?",
            text: "Kodeks wyborczy, art. 10 § 1 pkt 1, w tekście odczytanym 23 października 2026 r., daje czynne prawo wyborcze obywatelowi polskiemu, który w dniu głosowania kończy co najmniej 18 lat. Art. 283 § 4 w tym odczycie ogranicza te wybory do osób stale zamieszkałych w okręgu i do głosowania w kraju.",
            links: [{ label: "Kodeks wyborczy", href: CODE }],
          },
          {
            question: "Jak zgłosić głosowanie korespondencyjne w okręgu 20?",
            text: "Kalendarz wyborczy podaje, że do 9 listopada 2026 r. wyborca niepełnosprawny, w tym proszący o nakładki Braille’a, oraz wyborca, który najpóźniej w dniu głosowania kończy 60 lat, zgłasza zamiar głosowania korespondencyjnego. Wniosek o pełnomocnictwo tych grup ma termin do 13 listopada 2026 r.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
          },
          {
            question: "Gdzie głosować w okręgu senackim nr 20?",
            text: "Postanowienie Prezydenta z 25 września 2026 r. opisuje okręg nr 20 jako powiaty krośnieński, świebodziński i zielonogórski oraz miasto na prawach powiatu Zielona Góra, w województwie lubuskim. Kalendarz wymaga podania numerów, granic i siedzib obwodów do 23 października 2026 r. Ta strona nie kopiuje listy lokali.",
            links: [{ label: "Postanowienie Prezydenta z 25 września 2026 r.", href: DECREE }],
          },
          {
            question: "Gdzie podawany jest wynik wyborów w okręgu 20?",
            text: "Ta strona nie pokazuje liczenia i nie wskazuje wybranego senatora. Serwis wyborów jest stroną Komisji dla tych wyborów. Liczenie nie pojawi się tutaj przed zakończeniem głosowania o 21:00 22 listopada 2026 r.",
            links: [{ label: "Serwis wyborów", href: PKW_SERVICE }],
          },
        ],
        relatedHeading: "Powiązane strony",
        related: [
          { href: "/", label: "Strona główna" },
          { href: "/pl/", label: "Polska" },
          { href: "/pl/pl/", label: "Polska" },
          { href: "/pl/pl/elections/", label: "Wybory w Polsce" },
          { href: "/pl/pl/elections/sejm-senat-2027/", label: "Sejm i Senat, 2027" },
          { href: "/pl/pl/senat/20/", label: "Okręg nr 20" },
          { href: "/pl/en/elections/senat-20-2026/", label: "English" },
        ],
        bodyHtml: POLAND_PL_BODY,
        sourcesHeading: "Źródła",
        sources: [
          { href: DECREE, label: "Postanowienie Prezydenta RP z 25 września 2026 r. (Dz.U. 2026 poz. 1255), PDF", readOn: "2026-10-24" },
          { href: CODE, label: "Kodeks wyborczy, tekst jednolity (Dz.U. 2026 poz. 1261)", readOn: "2026-10-23" },
          { href: PKW_SERVICE, label: "PKW, Wybory uzupełniające do Senatu w okręgu nr 20", readOn: "2026-10-25" },
          { href: PKW_CALENDAR, label: "PKW, kalendarz wyborczy", readOn: "2026-10-25" },
          { href: PKW_NOTICES, label: "PKW, obwieszczenia", readOn: "2026-10-25" },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/kandydaci_senat_csv.1791978806.zip",
            label: "PKW, kandydaci_senat_csv.zip",
            readOn: "2026-10-25",
          },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/okregi_senat_csv.1791978806.zip",
            label: "PKW, okregi_senat_csv.zip",
            readOn: "2026-10-25",
          },
          {
            href: "https://api.sejm.gov.pl/eli/acts/DU/2021/1641/text.html",
            label: "Ustawa o otwartych danych i ponownym wykorzystywaniu informacji sektora publicznego",
            readOn: "2026-10-23",
          },
          { href: "https://www.senat.gov.pl/sklad/okregi-wyborcze/", label: "Senat, Okręgi wyborcze", readOn: "2026-10-18" },
        ],
      },
    ],
  },
  {
    id: "ca-bc-2026",
    pollingDay: "2026-10-24",
    startDate: "2026-10-24T08:00:00-07:00",
    endDate: "2026-10-24T20:00:00-07:00",
    organizerName: "Elections BC",
    organizerUrl: EBC_HOME,
    imagePath: "/images/og/ca.webp",
    lastmod: "2026-10-27",
    homeLinks: [
      {
        href: "/ca/en/elections/bc-2026/",
        label: "British Columbia provincial election, 24 October 2026",
        detail:
          "Final Voting Day was Saturday 24 October 2026, 8 a.m. to 8 p.m. Pacific time. Final count is planned for 6–10 November 2026. Dates from Elections BC.",
      },
      {
        href: "/ca/fr/elections/bc-2026/",
        label: "Élection provinciale de la Colombie-Britannique, 24 octobre 2026",
        detail:
          "Le jour du scrutin final était le samedi 24 octobre 2026, de 8 h à 20 h, heure du Pacifique. Le décompte final est prévu du 6 au 10 novembre 2026. Dates d'Elections BC.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/ca/en/elections/bc-2026/",
        title: "British Columbia election results, 24 October 2026",
        description:
          "British Columbia provincial general election results, Final Voting Day 24 October 2026. Final count is planned for 6–10 November 2026. This page copies no count. Unofficial information.",
        ogDescription:
          "British Columbia election, 24 October 2026. Final count is planned for 6–10 November 2026. This page copies no count. Unofficial information.",
        ogLocale: "en_CA",
        alternates: [
          { hreflang: "en", path: "/ca/en/elections/bc-2026/" },
          { hreflang: "fr", path: "/ca/fr/elections/bc-2026/" },
          { hreflang: "x-default", path: "/ca/en/elections/bc-2026/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Canada", path: "/ca/" },
          { name: "Canada", path: "/ca/en/" },
          { name: "Elections", path: "/ca/en/elections/" },
          { name: "British Columbia, 24 October 2026", path: "/ca/en/elections/bc-2026/" },
        ],
        eyebrow: "Final Voting Day was Saturday 24 October 2026",
        h1: "British Columbia provincial general election",
        lede: "The 44th provincial general election. Elections BC says voters elect 93 Members of the Legislative Assembly. Final count is still ahead. This page shows no count.",
        updated: "Last updated: 25 October 2026.",
        reportLabel: "Report an error",
        officeHref: EBC_2026,
        bannerBefore: "Unofficial information. Confirm with your ",
        bannerAfter: "official election office",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ca/en/", label: "Canada" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "British Columbia provincial general election, 24 October 2026",
        locationName: "British Columbia, Canada",
        addressRegion: "British Columbia",
        addressCountry: "CA",
        keyDatesHeading: "Key dates and official sources",
        keyDatesIntro: "Each date below is printed by Elections BC. A date Elections BC did not print is not listed.",
        keyDates: [
          {
            label: "Final Voting Day",
            text: "The 2026 provincial election page says Final Voting Day is 24 October 2026. The Final Voting Day news release says voting places are open from 8 a.m. to 8 p.m. Pacific time that day.",
            links: [
              { label: "2026 provincial election page", href: EBC_2026 },
              { label: "Final Voting Day news release", href: EBC_NEWS },
            ],
          },
          {
            label: "Advance voting",
            text: "The 2026 provincial election page says advance voting is 16–21 October 2026.",
            links: [{ label: "2026 provincial election page", href: EBC_2026 }],
          },
          {
            label: "Final count",
            text: "The 2026 provincial election page says final count is planned for 6–10 November 2026. The Guide to Voting and Counting says ballots that were not counted at the initial count are counted at final count, and that the Chief Electoral Officer declares the official results.",
            links: [
              { label: "2026 provincial election page", href: EBC_2026 },
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
            ],
          },
          {
            label: "Return Day",
            text: "The 2026 provincial election page says Return Day is 18 November 2026. The writs of election page says that when the writs are returned, the election period is officially over.",
            links: [
              { label: "2026 provincial election page", href: EBC_2026 },
              { label: "writs of election page", href: EBC_WRITS },
            ],
          },
          {
            label: "Official results",
            text: "The Final Voting Day news release says that after voting closes at 8 p.m. Pacific time, preliminary results are reported on the results site it names. The event-night reporting page loaded on 25 October 2026 and names the 2026 Provincial General Election. The provincial election results archive holds earlier statements of votes. This page copies no count and names no one ahead.",
            links: [
              { label: "Final Voting Day news release", href: EBC_NEWS },
              { label: "results site it names", href: EBC_RESULTS_NAMED },
              { label: "event-night reporting page", href: EBC_RESULTS },
              { label: "provincial election results archive", href: EBC_ARCHIVE },
            ],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When are the final results of the BC election 2026?",
            text: "The 2026 provincial election page says final count is planned for 6–10 November 2026, and that Return Day is 18 November 2026. The Guide to Voting and Counting says the Chief Electoral Officer declares the official results at the end of final count. This page does not print a count.",
            links: [
              { label: "2026 provincial election page", href: EBC_2026 },
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
            ],
          },
          {
            question: "What is the final count in the British Columbia election?",
            text: "The Guide to Voting and Counting says ballots that were not counted at the initial count are counted at final count. The 2026 provincial election page says that count is planned for 6–10 November 2026. This page does not describe a result.",
            links: [
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
              { label: "2026 provincial election page", href: EBC_2026 },
            ],
          },
          {
            question: "When is Return Day for the 2026 British Columbia election?",
            text: "The 2026 provincial election page says Return Day is 18 November 2026. The writs of election page says that when the writs are returned, the election period is officially over.",
            links: [
              { label: "2026 provincial election page", href: EBC_2026 },
              { label: "writs of election page", href: EBC_WRITS },
            ],
          },
          {
            question: "Where are the official BC election 2026 results?",
            text: "The Final Voting Day news release says preliminary results are reported after 8 p.m. Pacific time on the results site it names. The event-night reporting page is Elections BC's reporting service for this election. This page copies no count.",
            links: [
              { label: "Final Voting Day news release", href: EBC_NEWS },
              { label: "results site it names", href: EBC_RESULTS_NAMED },
              { label: "event-night reporting page", href: EBC_RESULTS },
            ],
          },
          {
            question: "How many electoral districts are in the 2026 British Columbia election?",
            text: "The writs of election page says a writ is issued for each of the province's 93 electoral districts. The 2026 provincial election page says voters elect 93 Members of the Legislative Assembly, and that each member represents an electoral district. This page does not say how many districts have been decided.",
            links: [
              { label: "writs of election page", href: EBC_WRITS },
              { label: "2026 provincial election page", href: EBC_2026 },
            ],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/ca/", label: "Canada" },
          { href: "/ca/en/", label: "Canada, English" },
          { href: "/ca/en/elections/", label: "Elections in Canada" },
          { href: "/ca/en/british-columbia/", label: "British Columbia" },
          { href: "/ca/fr/elections/bc-2026/", label: "Français" },
          { href: "/ca/en/elections/federal-2029/", label: "Federal general election, 15 October 2029" },
        ],
        bodyHtml: BC_EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: EBC_2026, label: "Elections BC, “2026 Provincial Election”", readOn: "2026-10-25" },
          { href: EBC_WRITS, label: "Elections BC, “Writs of Election”", readOn: "2026-10-25" },
          { href: EBC_NEWS, label: "Elections BC, “Final Voting Day is Saturday, October 24”", readOn: "2026-10-25" },
          { href: EBC_GUIDE, label: "Elections BC, Guide to Voting and Counting (PDF)", readOn: "2026-10-25" },
          { href: EBC_RESULTS, label: "Elections BC, event night reporting", readOn: "2026-10-25" },
          {
            href: EBC_RESULTS_NAMED,
            label: "Elections BC, results.elections.bc.ca (named in the Final Voting Day news release)",
            readOn: "2026-10-25",
          },
          { href: EBC_ARCHIVE, label: "Elections BC, provincial election results", readOn: "2026-10-25" },
        ],
      },
      {
        lang: "fr",
        htmlLang: "fr",
        path: "/ca/fr/elections/bc-2026/",
        title: "Résultats de l'élection en Colombie-Britannique, 24 octobre 2026",
        description:
          "Résultats de l'élection générale provinciale de la Colombie-Britannique, jour du scrutin final le 24 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026. Cette page ne copie aucun décompte. Information non officielle.",
        ogDescription:
          "Élection en Colombie-Britannique, 24 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026. Aucun décompte n'est copié ici. Information non officielle.",
        ogLocale: "fr_CA",
        alternates: [
          { hreflang: "en", path: "/ca/en/elections/bc-2026/" },
          { hreflang: "fr", path: "/ca/fr/elections/bc-2026/" },
          { hreflang: "x-default", path: "/ca/en/elections/bc-2026/" },
        ],
        crumbs: [
          { name: "Accueil", path: "/" },
          { name: "Canada", path: "/ca/" },
          { name: "Canada", path: "/ca/fr/" },
          { name: "Élections", path: "/ca/fr/elections/" },
          { name: "Colombie-Britannique, 24 octobre 2026", path: "/ca/fr/elections/bc-2026/" },
        ],
        eyebrow: "Le jour du scrutin final était le samedi 24 octobre 2026",
        h1: "Élection générale provinciale de la Colombie-Britannique",
        lede: "La 44e élection générale provinciale. Elections BC dit que les électeurs élisent 93 membres de l'Assemblée législative. Le décompte final est encore à venir. Cette page ne montre aucun décompte.",
        updated: "Dernière mise à jour : 25 octobre 2026.",
        reportLabel: "Signaler une erreur",
        officeHref: EBC_2026,
        bannerBefore: "Information non officielle. Confirmez auprès du ",
        bannerAfter: "bureau électoral officiel",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ca/fr/", label: "Canada" },
          { href: "/search/", label: "Recherche" },
        ],
        eventName: "Élection générale provinciale de la Colombie-Britannique, 24 octobre 2026",
        locationName: "Colombie-Britannique, Canada",
        addressRegion: "Colombie-Britannique",
        addressCountry: "CA",
        keyDatesHeading: "Dates importantes et sources officielles",
        keyDatesIntro:
          "Chaque date ci-dessous est imprimée par Elections BC. Une date qu'Elections BC n'a pas imprimée n'est pas inscrite.",
        keyDates: [
          {
            label: "Jour du scrutin final",
            text: "La page de l'élection provinciale de 2026 dit que le jour du scrutin final est le 24 octobre 2026. Le communiqué sur le jour du scrutin final dit que les bureaux de vote sont ouverts de 8 h à 20 h, heure du Pacifique, ce jour-là.",
            links: [
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
              { label: "communiqué sur le jour du scrutin final", href: EBC_NEWS },
            ],
          },
          {
            label: "Vote par anticipation",
            text: "La page de l'élection provinciale de 2026 dit que le vote par anticipation a lieu du 16 au 21 octobre 2026.",
            links: [{ label: "page de l'élection provinciale de 2026", href: EBC_2026 }],
          },
          {
            label: "Décompte final",
            text: "La page de l'élection provinciale de 2026 dit que le décompte final est prévu du 6 au 10 novembre 2026. Le Guide to Voting and Counting dit que les bulletins non comptés au décompte initial le sont au décompte final, et que le directeur général des élections déclare les résultats officiels.",
            links: [
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
            ],
          },
          {
            label: "Return Day",
            text: "La page de l'élection provinciale de 2026 dit que le Return Day est le 18 novembre 2026. La page des brefs d'élection dit que, lorsque les brefs sont retournés, la période électorale est officiellement terminée.",
            links: [
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
              { label: "page des brefs d'élection", href: EBC_WRITS },
            ],
          },
          {
            label: "Résultats officiels",
            text: "Le communiqué sur le jour du scrutin final dit qu'après la fermeture du scrutin à 20 h, heure du Pacifique, les résultats préliminaires sont publiés sur le site de résultats qu'il nomme. La page de rapport du soir du scrutin s'est chargée le 25 octobre 2026 et nomme la 2026 Provincial General Election. L'archive des résultats des élections provinciales conserve les relevés des votes des élections antérieures. Cette page ne copie aucun décompte et ne nomme personne en tête.",
            links: [
              { label: "communiqué sur le jour du scrutin final", href: EBC_NEWS },
              { label: "site de résultats qu'il nomme", href: EBC_RESULTS_NAMED },
              { label: "page de rapport du soir du scrutin", href: EBC_RESULTS },
              { label: "archive des résultats des élections provinciales", href: EBC_ARCHIVE },
            ],
          },
        ],
        faqHeading: "Questions fréquentes",
        faqs: [
          {
            question: "Quand paraissent les résultats définitifs de l'élection de 2026 en Colombie-Britannique ?",
            text: "La page de l'élection provinciale de 2026 dit que le décompte final est prévu du 6 au 10 novembre 2026 et que le Return Day est le 18 novembre 2026. Le Guide to Voting and Counting dit que le directeur général des élections déclare les résultats officiels à la fin du décompte final. Cette page n'imprime aucun décompte.",
            links: [
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
            ],
          },
          {
            question: "Qu'est-ce que le décompte final de l'élection en Colombie-Britannique ?",
            text: "Le Guide to Voting and Counting dit que les bulletins non comptés au décompte initial le sont au décompte final. La page de l'élection provinciale de 2026 dit que ce décompte est prévu du 6 au 10 novembre 2026. Cette page ne décrit pas un résultat.",
            links: [
              { label: "Guide to Voting and Counting", href: EBC_GUIDE },
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
            ],
          },
          {
            question: "Quand a lieu le Return Day de l'élection de 2026 en Colombie-Britannique ?",
            text: "La page de l'élection provinciale de 2026 dit que le Return Day est le 18 novembre 2026. La page des brefs d'élection dit que, lorsque les brefs sont retournés, la période électorale est officiellement terminée.",
            links: [
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
              { label: "page des brefs d'élection", href: EBC_WRITS },
            ],
          },
          {
            question: "Où voir les résultats officiels de l'élection de 2026 en Colombie-Britannique ?",
            text: "Le communiqué sur le jour du scrutin final dit que les résultats préliminaires sont publiés après 20 h, heure du Pacifique, sur le site de résultats qu'il nomme. La page de rapport du soir du scrutin est le service d'Elections BC pour cette élection. Cette page ne copie aucun décompte.",
            links: [
              { label: "communiqué sur le jour du scrutin final", href: EBC_NEWS },
              { label: "site de résultats qu'il nomme", href: EBC_RESULTS_NAMED },
              { label: "page de rapport du soir du scrutin", href: EBC_RESULTS },
            ],
          },
          {
            question: "Combien de circonscriptions compte l'élection de 2026 en Colombie-Britannique ?",
            text: "La page des brefs d'élection dit qu'un bref est émis pour chacune des 93 circonscriptions de la province. La page de l'élection provinciale de 2026 dit que les électeurs élisent 93 membres de l'Assemblée législative, et que chaque membre représente une circonscription. Cette page ne dit pas combien de circonscriptions sont décidées.",
            links: [
              { label: "page des brefs d'élection", href: EBC_WRITS },
              { label: "page de l'élection provinciale de 2026", href: EBC_2026 },
            ],
          },
        ],
        relatedHeading: "Pages liées",
        related: [
          { href: "/", label: "Accueil" },
          { href: "/ca/", label: "Canada" },
          { href: "/ca/fr/", label: "Canada, français" },
          { href: "/ca/fr/elections/", label: "Élections au Canada" },
          { href: "/ca/fr/british-columbia/", label: "Colombie-Britannique" },
          { href: "/ca/en/elections/bc-2026/", label: "English" },
          { href: "/ca/fr/elections/federal-2029/", label: "Élection fédérale, 15 octobre 2029" },
        ],
        bodyHtml: BC_FR_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: EBC_2026, label: "Elections BC, « 2026 Provincial Election »", readOn: "2026-10-25" },
          { href: EBC_WRITS, label: "Elections BC, « Writs of Election »", readOn: "2026-10-25" },
          {
            href: EBC_NEWS,
            label: "Elections BC, communiqué « Final Voting Day is Saturday, October 24 »",
            readOn: "2026-10-25",
          },
          { href: EBC_GUIDE, label: "Elections BC, Guide to Voting and Counting (PDF)", readOn: "2026-10-25" },
          { href: EBC_RESULTS, label: "Elections BC, rapport du soir du scrutin", readOn: "2026-10-25" },
          {
            href: EBC_RESULTS_NAMED,
            label: "Elections BC, results.elections.bc.ca (nommé dans le communiqué)",
            readOn: "2026-10-25",
          },
          { href: EBC_ARCHIVE, label: "Elections BC, archive des résultats provinciaux", readOn: "2026-10-25" },
        ],
      },
    ],
  },
  {
    id: "it-2026-chieti",
    pollingDay: "2026-11-15",
    startDate: "2026-11-15T07:00:00+01:00",
    endDate: "2026-11-16T15:00:00+01:00",
    organizerName: "Ministero dell'Interno",
    organizerUrl: "https://www.interno.gov.it/",
    imagePath: "/images/og/it.webp",
    lastmod: "2026-10-27",
    candidateListId: "camera-chieti-2026",
    homeLinks: [
      {
        href: "/it/en/elections/camera-chieti-2026/",
        label: "Chamber by-election, 01-Chieti, 15–16 November 2026",
        detail:
          "Sunday 15 November 2026, 7:00–23:00, and Monday 16 November 2026, 7:00–15:00, Central European Time. Called by the decree in Gazzetta Ufficiale no. 224 of 26 September 2026. This site prints no polls and no count.",
      },
      {
        href: "/it/it/elections/camera-chieti-2026/",
        label: "Elezione suppletiva Camera, 01-Chieti, 15-16 novembre 2026",
        detail:
          "Domenica 15 novembre 2026, ore 7-23, e lunedì 16 novembre 2026, ore 7-15, ora dell'Europa centrale. Convocata dal decreto nella Gazzetta Ufficiale n. 224 del 26 settembre 2026. Questo sito non pubblica sondaggi né un conteggio.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: "/it/en/elections/camera-chieti-2026/",
        title: "Italy Chamber by-election, 01-Chieti, Abruzzo, 15–16 November 2026",
        description:
          "Italy, Chamber of Deputies by-election in single-member constituency 01-Chieti, Abruzzo, Sunday 15 and Monday 16 November 2026. Polling hours, electoral card, and the candidates the Interior Ministry has published. Unofficial information.",
        ogDescription:
          "Chamber by-election in constituency 01-Chieti, Abruzzo, on 15–16 November 2026. Sunday 7:00–23:00 and Monday 7:00–15:00. Unofficial information.",
        ogLocale: "en_US",
        alternates: [
          { hreflang: "it", path: "/it/it/elections/camera-chieti-2026/" },
          { hreflang: "en", path: "/it/en/elections/camera-chieti-2026/" },
          { hreflang: "x-default", path: "/it/it/elections/camera-chieti-2026/" },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Italy", path: "/it/" },
          { name: "Italy", path: "/it/en/" },
          { name: "Elections", path: "/it/en/elections/" },
          { name: "01-Chieti, 15–16 November 2026", path: "/it/en/elections/camera-chieti-2026/" },
        ],
        eyebrow: "15–16 November 2026",
        h1: "Chamber by-election in constituency 01-Chieti",
        lede: "One seat in the Chamber of Deputies, XVII Abruzzo constituency. Voting on Sunday 15 November 2026 from 7:00 to 23:00 and on Monday 16 November 2026 from 7:00 to 15:00, Central European Time.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: DAIT_SPECIALE,
        bannerBefore: "Unofficial information. Confirm with your ",
        bannerAfter: "official election office",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/it/en/", label: "Italy" },
          { href: "/search/", label: "Search" },
          { href: "/it/it/elections/camera-chieti-2026/", label: "Italiano" },
        ],
        eventName: "Chamber of Deputies by-election, constituency 01-Chieti, 15–16 November 2026",
        locationName: "Single-member constituency 01-Chieti, XVII constituency Abruzzo",
        addressRegion: "Abruzzo",
        addressCountry: "IT",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro:
          "The days come from the calling decree. The hours come from the 2026 voting-hours decree-law. Who may vote, and what to bring, come from the Interior Ministry polling manual that the Prefecture of Chieti attaches to this election. This page carries no campaign material.",
        keyDates: [
          {
            label: "Days of the vote",
            text: "The decree of the President of the Republic of 25 September 2026, published in the Gazzetta Ufficiale, general series, no. 224 of 26 September 2026, calls the election for Sunday 15 November and Monday 16 November 2026.",
            links: [{ label: "decree of the President of the Republic of 25 September 2026", href: GU_CHIETI }],
          },
          {
            label: "Polling hours",
            text: "Article 1(1) of decree-law no. 196 of 27 December 2025, converted by law no. 18 of 13 February 2026, says that in 2026 voting runs on Sunday from 7:00 to 23:00 and on Monday from 7:00 to 15:00.",
            links: [{ label: "Article 1(1) of decree-law no. 196 of 27 December 2025", href: DL_196 }],
          },
          {
            label: "Who can vote",
            text: "The Interior Ministry publication no. 3, August 2026 edition, attached by the Prefecture of Chieti, reprints article 1 of the consolidated text on the active electorate: electors are Italian citizens who have reached the age of eighteen and who are not in any of the conditions in articles 2 and 3. Those two articles are not copied here.",
            links: [{ label: "Interior Ministry publication no. 3, August 2026 edition", href: PUBB_3 }],
          },
          {
            label: "Identity document and electoral card",
            text: "The polling manual says that, in order to vote, an elector shows an identity document and the tessera elettorale showing enrolment in the polling section, or a mayor’s certificate that stands in for the card for that consultation.",
            links: [{ label: "polling manual", href: PUBB_3 }],
          },
          {
            label: "Official results",
            text: "The Department’s special-elections page says turnout and results for this by-election are followed on Eligendo. This page shows no count before 15:00 on 16 November 2026.",
            links: [
              { label: "Department’s special-elections page", href: DAIT_SPECIALE },
              { label: "Eligendo", href: ELIGENDO },
            ],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When do people vote in Chieti?",
            text: "The decree of 25 September 2026 calls the by-election for Sunday 15 November and Monday 16 November 2026 in constituency 01-Chieti. Article 1(1) of decree-law no. 196 of 27 December 2025 sets the hours: Sunday from 7:00 to 23:00 and Monday from 7:00 to 15:00.",
            links: [
              { label: "decree of 25 September 2026", href: GU_CHIETI },
              { label: "Article 1(1) of decree-law no. 196 of 27 December 2025", href: DL_196 },
            ],
          },
          {
            question: "What are the polling hours on 15 and 16 November?",
            text: "Decree-law no. 196 of 27 December 2025, article 1(1), says that in 2026 polling stations are open on Sunday from 7:00 to 23:00 and on Monday from 7:00 to 15:00. The calling decree fixes those two days for constituency 01-Chieti.",
            links: [
              { label: "Decree-law no. 196 of 27 December 2025, article 1(1)", href: DL_196 },
              { label: "calling decree", href: GU_CHIETI },
            ],
          },
          {
            question: "Who can vote in the Chieti by-election?",
            text: "The August 2026 polling manual reprints the rule that electors are Italian citizens who have reached the age of eighteen, apart from the conditions in articles 2 and 3, which are not copied here. At the station it says an elector shows an identity document and the tessera elettorale, or a mayor’s certificate in place of the card.",
            links: [{ label: "August 2026 polling manual", href: PUBB_3 }],
          },
          {
            question: "Which candidates are published for the 2026 Chieti by-election?",
            text: "The Interior Ministry transparency page, read on 26 October 2026, lists four people presented in constituency 01-Chieti. It does not print a ballot number. Birth details on that page are not copied here.",
            links: [{ label: "Interior Ministry transparency page", href: DAIT_CANDIDATES }],
          },
          {
            question: "Where are the Chieti by-election results published?",
            text: "This page shows no count and names no one elected. The Department’s special-elections page says the count is published on Eligendo. No count is shown here before 15:00 on 16 November 2026.",
            links: [
              { label: "Department’s special-elections page", href: DAIT_SPECIALE },
              { label: "Eligendo", href: ELIGENDO },
            ],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/it/", label: "Italy" },
          { href: "/it/en/", label: "Italy, English" },
          { href: "/it/en/elections/", label: "Elections in Italy" },
          { href: "/it/en/abruzzo/", label: "Abruzzo" },
          { href: "/it/en/collegi/camera/abruzzo-u01/", label: "Constituency 01-Chieti" },
          { href: "/it/en/elections/prossime-politiche/", label: "Next general election" },
          { href: "/it/en/results/", label: "Results" },
          { href: "/it/it/elections/camera-chieti-2026/", label: "Italiano" },
        ],
        bodyHtml: CHIETI_EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: GU_CHIETI, label: "Gazzetta Ufficiale, decree of 25 September 2026 (26A05139)", readOn: "2026-10-26" },
          { href: DL_196, label: "Normattiva, decree-law no. 196 of 27 December 2025, article 1", readOn: "2026-10-26" },
          { href: DAIT_SPECIALE, label: "DAIT, Speciale elezioni", readOn: "2026-10-26" },
          { href: PREF_CHIETI, label: "Prefecture of Chieti, by-election notice", readOn: "2026-10-26" },
          { href: PREF_CHIETI_DOCS, label: "Prefecture of Chieti, circulars and publications", readOn: "2026-10-26" },
          { href: PUBB_3, label: "Interior Ministry, publication no. 3, August 2026, polling-station instructions", readOn: "2026-10-26" },
          { href: DAIT_CANDIDATES, label: "DAIT, transparency, candidates presented for 15–16 November 2026", readOn: "2026-10-26" },
          { href: CAMERA_VARIAZIONI, label: "Chamber of Deputies, changes in membership", readOn: "2026-10-26" },
          { href: ELIGENDO, label: "Interior Ministry, Eligendo", readOn: "2026-10-26" },
          { href: DLGS_177, label: "Legislative decree no. 177 of 23 December 2020", readOn: "2026-10-18" },
          { href: L_28, label: "Law no. 28 of 22 February 2000", readOn: "2026-10-18" },
        ],
      },
      {
        lang: "it",
        htmlLang: "it",
        path: "/it/it/elections/camera-chieti-2026/",
        title: "Italia: elezione suppletiva della Camera, 01-Chieti, 15-16 novembre 2026",
        description:
          "Italia, elezione suppletiva della Camera dei deputati nel collegio uninominale 01-Chieti, Abruzzo, domenica 15 e lunedì 16 novembre 2026. Orari dei seggi, tessera elettorale e candidati pubblicati dal Ministero dell'interno. Informazione non ufficiale.",
        ogDescription:
          "Elezione suppletiva nel collegio 01-Chieti, Abruzzo, il 15-16 novembre 2026. Domenica ore 7-23 e lunedì ore 7-15. Informazione non ufficiale.",
        ogLocale: "it_IT",
        alternates: [
          { hreflang: "it", path: "/it/it/elections/camera-chieti-2026/" },
          { hreflang: "en", path: "/it/en/elections/camera-chieti-2026/" },
          { hreflang: "x-default", path: "/it/it/elections/camera-chieti-2026/" },
        ],
        crumbs: [
          { name: "Inizio", path: "/" },
          { name: "Italia", path: "/it/" },
          { name: "Italia", path: "/it/it/" },
          { name: "Elezioni", path: "/it/it/elections/" },
          { name: "01-Chieti, 15-16 novembre 2026", path: "/it/it/elections/camera-chieti-2026/" },
        ],
        eyebrow: "15-16 novembre 2026",
        h1: "Elezione suppletiva nel collegio 01-Chieti",
        lede: "Un seggio alla Camera dei deputati, XVII circoscrizione Abruzzo. Si vota domenica 15 novembre 2026 dalle ore 7 alle ore 23 e lunedì 16 novembre 2026 dalle ore 7 alle ore 15, ora dell'Europa centrale.",
        updated: "Ultimo aggiornamento: 27 ottobre 2026.",
        reportLabel: "Segnala un errore",
        officeHref: DAIT_SPECIALE,
        bannerBefore: "Informazione non ufficiale. Confermare presso l'",
        bannerAfter: "ufficio elettorale ufficiale",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/it/it/", label: "Italia" },
          { href: "/search/", label: "Ricerca" },
          { href: "/it/en/elections/camera-chieti-2026/", label: "English" },
        ],
        eventName: "Elezione suppletiva della Camera dei deputati, collegio 01-Chieti, 15-16 novembre 2026",
        locationName: "Collegio uninominale 01-Chieti, XVII circoscrizione Abruzzo",
        addressRegion: "Abruzzo",
        addressCountry: "IT",
        keyDatesHeading: "Come si vota, date e fonti ufficiali",
        keyDatesIntro:
          "I giorni vengono dal decreto di convocazione. Gli orari vengono dal decreto-legge sugli orari di voto del 2026. Chi può votare, e che cosa portare, viene dal manuale del Ministero dell'interno che la Prefettura di Chieti allega a questa elezione. Questa pagina non è materiale di propaganda.",
        keyDates: [
          {
            label: "Giorni della votazione",
            text: "Il decreto del Presidente della Repubblica del 25 settembre 2026, pubblicato nella Gazzetta Ufficiale, serie generale, n. 224 del 26 settembre 2026, convoca i comizi per domenica 15 novembre e lunedì 16 novembre 2026.",
            links: [{ label: "decreto del Presidente della Repubblica del 25 settembre 2026", href: GU_CHIETI }],
          },
          {
            label: "Orari dei seggi",
            text: "L'articolo 1, comma 1, del decreto-legge 27 dicembre 2025, n. 196, convertito dalla legge 13 febbraio 2026, n. 18, dispone che nel 2026 si vota la domenica dalle ore 7 alle ore 23 e il lunedì dalle ore 7 alle ore 15.",
            links: [{ label: "articolo 1, comma 1, del decreto-legge 27 dicembre 2025, n. 196", href: DL_196 }],
          },
          {
            label: "Chi può votare",
            text: "La pubblicazione n. 3 del Ministero dell'interno, edizione di agosto 2026, allegata dalla Prefettura di Chieti, riproduce l'articolo 1 del testo unico sull'elettorato attivo: sono elettori i cittadini italiani che hanno compiuto diciotto anni e che non si trovano nelle condizioni degli articoli 2 e 3. Quei due articoli non sono ricopiati qui.",
            links: [{ label: "pubblicazione n. 3 del Ministero dell'interno, edizione di agosto 2026", href: PUBB_3 }],
          },
          {
            label: "Documento e tessera elettorale",
            text: "Il manuale di sezione dice che per votare si esibiscono un documento di riconoscimento e la tessera elettorale da cui risulta l'iscrizione alla sezione, oppure un attestato del sindaco che sostituisce la tessera per quella consultazione.",
            links: [{ label: "manuale di sezione", href: PUBB_3 }],
          },
          {
            label: "Risultati su Eligendo",
            text: "La pagina Speciale elezioni del Dipartimento dice che affluenza e risultati si seguono su Eligendo. Questa pagina non mostra un conteggio prima delle ore 15 del 16 novembre 2026.",
            links: [
              { label: "pagina Speciale elezioni del Dipartimento", href: DAIT_SPECIALE },
              { label: "Eligendo", href: ELIGENDO },
            ],
          },
        ],
        faqHeading: "Domande frequenti",
        faqs: [
          {
            question: "Quando si vota a Chieti?",
            text: "Il decreto del 25 settembre 2026 convoca l'elezione suppletiva per domenica 15 novembre e lunedì 16 novembre 2026, nel collegio uninominale 01-Chieti. L'articolo 1, comma 1, del decreto-legge n. 196 del 2025 fissa gli orari: domenica dalle ore 7 alle ore 23 e lunedì dalle ore 7 alle ore 15.",
            links: [
              { label: "decreto del 25 settembre 2026", href: GU_CHIETI },
              { label: "articolo 1, comma 1, del decreto-legge n. 196 del 2025", href: DL_196 },
            ],
          },
          {
            question: "Quali sono gli orari dei seggi il 15 e il 16 novembre?",
            text: "Il decreto-legge 27 dicembre 2025, n. 196, all'articolo 1, comma 1, dice che nel 2026 i seggi sono aperti la domenica dalle ore 7 alle ore 23 e il lunedì dalle ore 7 alle ore 15. Il decreto di convocazione fissa quei due giorni per il collegio 01-Chieti.",
            links: [
              { label: "decreto-legge 27 dicembre 2025, n. 196, all'articolo 1, comma 1", href: DL_196 },
              { label: "decreto di convocazione", href: GU_CHIETI },
            ],
          },
          {
            question: "Chi può votare all'elezione suppletiva di Chieti?",
            text: "La pubblicazione n. 3 di agosto 2026 riproduce la regola per cui sono elettori i cittadini italiani che hanno compiuto diciotto anni, salvo le condizioni degli articoli 2 e 3, che qui non sono ricopiate. Al seggio la stessa pubblicazione chiede un documento di riconoscimento e la tessera elettorale, oppure un attestato del sindaco al posto della tessera.",
            links: [{ label: "pubblicazione n. 3 di agosto 2026", href: PUBB_3 }],
          },
          {
            question: "Quali candidati sono pubblicati per le elezioni suppletive di Chieti del 2026?",
            text: "La pagina di trasparenza del Ministero dell'interno, letta il 26 ottobre 2026, elenca quattro persone presentate nel collegio 01-Chieti. Non stampa un numero di scheda. Il luogo e la data di nascita restano su quella pagina e non sono copiati qui.",
            links: [{ label: "pagina di trasparenza del Ministero dell'interno", href: DAIT_CANDIDATES }],
          },
          {
            question: "Dove si pubblicano i risultati?",
            text: "Questa pagina non mostra un conteggio e non indica un eletto. La pagina Speciale elezioni dice che il conteggio è su Eligendo. Nessun conteggio compare qui prima delle ore 15 del 16 novembre 2026.",
            links: [
              { label: "pagina Speciale elezioni", href: DAIT_SPECIALE },
              { label: "Eligendo", href: ELIGENDO },
            ],
          },
        ],
        relatedHeading: "Pagine collegate",
        related: [
          { href: "/", label: "Inizio" },
          { href: "/it/", label: "Italia" },
          { href: "/it/it/", label: "Italia, italiano" },
          { href: "/it/it/elections/", label: "Elezioni in Italia" },
          { href: "/it/it/abruzzo/", label: "Abruzzo" },
          { href: "/it/it/collegi/camera/abruzzo-u01/", label: "Collegio 01-Chieti" },
          { href: "/it/it/elections/prossime-politiche/", label: "Prossime elezioni politiche" },
          { href: "/it/it/results/", label: "Risultati" },
          { href: "/it/en/elections/camera-chieti-2026/", label: "English" },
        ],
        bodyHtml: CHIETI_IT_BODY,
        sourcesHeading: "Fonti",
        sources: [
          { href: GU_CHIETI, label: "Gazzetta Ufficiale, decreto del 25 settembre 2026 (26A05139)", readOn: "2026-10-26" },
          { href: DL_196, label: "Normattiva, decreto-legge 27 dicembre 2025, n. 196, articolo 1", readOn: "2026-10-26" },
          { href: DAIT_SPECIALE, label: "DAIT, Speciale elezioni", readOn: "2026-10-26" },
          { href: PREF_CHIETI, label: "Prefettura di Chieti, comunicazione sull'elezione suppletiva", readOn: "2026-10-26" },
          { href: PREF_CHIETI_DOCS, label: "Prefettura di Chieti, circolari e pubblicazioni", readOn: "2026-10-26" },
          { href: PUBB_3, label: "Ministero dell'interno, pubblicazione n. 3, agosto 2026, istruzioni per i seggi", readOn: "2026-10-26" },
          { href: DAIT_CANDIDATES, label: "DAIT, trasparenza, candidati presentati per il 15-16 novembre 2026", readOn: "2026-10-26" },
          { href: CAMERA_VARIAZIONI, label: "Camera dei deputati, variazioni nella composizione", readOn: "2026-10-26" },
          { href: ELIGENDO, label: "Ministero dell'interno, Eligendo", readOn: "2026-10-26" },
          { href: DLGS_177, label: "Decreto legislativo 23 dicembre 2020, n. 177", readOn: "2026-10-18" },
          { href: L_28, label: "Legge 22 febbraio 2000, n. 28", readOn: "2026-10-18" },
        ],
      },
    ],
  },
  ...EXTRA_ELECTION_SEO_PROFILES,
  ...BG_ELECTION_SEO_PROFILES,
];

export function utcToday(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addDays(isoDate: string, days: number): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Polling day is today or later, and no more than `days` civil days after `asOf`. */
export function isWithinDays(pollingDay: string, asOf: string, days = ELECTION_SEO_WINDOW_DAYS): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pollingDay) || !/^\d{4}-\d{2}-\d{2}$/.test(asOf)) return false;
  return pollingDay >= asOf && pollingDay <= addDays(asOf, days);
}

/** Polling day is strictly before `asOf`, and no more than `recentDays` civil days before it. */
export function isRecentlyHeld(pollingDay: string, asOf: string, recentDays = ELECTION_SEO_RECENT_DAYS): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pollingDay) || !/^\d{4}-\d{2}-\d{2}$/.test(asOf)) return false;
  return pollingDay < asOf && pollingDay >= addDays(asOf, -recentDays);
}

/** Upcoming window, or the short recently-held window. The 60-day check itself stays upcoming-only. */
export function isListedElection(
  pollingDay: string,
  asOf: string,
  days = ELECTION_SEO_WINDOW_DAYS,
  recentDays = ELECTION_SEO_RECENT_DAYS,
): boolean {
  return isWithinDays(pollingDay, asOf, days) || isRecentlyHeld(pollingDay, asOf, recentDays);
}

export function profilesWithinDays(asOf = utcToday(), days = ELECTION_SEO_WINDOW_DAYS): ElectionSeoProfile[] {
  return ELECTION_SEO_PROFILES.filter((profile) => isWithinDays(profile.pollingDay, asOf, days)).sort((a, b) =>
    a.pollingDay.localeCompare(b.pollingDay),
  );
}

export function upcomingElectionCards(asOf = utcToday()): HomeElectionCard[] {
  return ELECTION_SEO_PROFILES.filter((profile) => profile.pinOnHome || isListedElection(profile.pollingDay, asOf))
    .sort((a, b) => a.pollingDay.localeCompare(b.pollingDay))
    .flatMap((profile) => profile.homeLinks.map((link) => ({ ...link, recent: isRecentlyHeld(profile.pollingDay, asOf) })));
}

export function profileById(id: string): ElectionSeoProfile | undefined {
  return ELECTION_SEO_PROFILES.find((profile) => profile.id === id);
}

/** Explicit sitemap lastmod for a rendered election page, if the registry names one. */
export function electionSitemapLastmod(path: string): string | undefined {
  for (const profile of ELECTION_SEO_PROFILES) {
    if (profile.pages.some((page) => page.path === path)) return profile.lastmod;
  }
  return undefined;
}
