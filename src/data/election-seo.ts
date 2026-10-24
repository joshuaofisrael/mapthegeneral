/**
 * SEO profiles for elections that should carry Event JSON-LD, a sourced
 * key-dates section, and an FAQ. Add a profile when an election enters the
 * 60-day window. Pages are rendered by scripts/render-upcoming-elections.ts.
 * Dates below are copied from the official pages named on each fact.
 * No poll, projection, or result is stored here.
 */

export const ELECTION_SEO_WINDOW_DAYS = 60;

export type LinkedPhrase = { label: string; href: string };

export type SourcedText = {
  text: string;
  links: LinkedPhrase[];
};

export type FaqItem = SourcedText & { question: string };

export type KeyDate = SourcedText & { label: string };

export type ElectionSeoPage = {
  lang: "en" | "pl";
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
<p>Article 256: 100 senators are elected by majority. Article 260 § 1: Senate constituencies are single-member. The Commission’s constituency file, read on 23 October 2026, prints for number 20: 1 seat and 4 candidates.</p>
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
<h2>Names in the Commission file</h2>
<p>The file kandydaci_senat_utf8.csv, read on 23 October 2026, lists four people. The ballot-position column is empty. This is a reading of the file, not the district commission’s announcement. The calendar requires that announcement of registered candidates by 12 November 2026. That announcement was not read on 23 October 2026. Sex, occupation and place of residence from the file are not reprinted.</p>
<ul>
<li>Janusz Krzysztof KUBICKI — KOMITET WYBORCZY WYBORCÓW PO PIERWSZE LUBUSKIE</li>
<li>Tomasz Jacek NARUSZEWICZ — KOMITET WYBORCZY WYBORCÓW TOMASZA NARUSZEWICZA</li>
<li>Zdzisława Maria RÓŻAŃSKA — KOMITET WYBORCZY WYBORCÓW KOALICJI 15 PAŹDZIERNIKA</li>
<li>Joanna SENYSZYN — KOMITET WYBORCZY NOWA FALA PROFESOR SENYSZYN</li>
</ul>
<p>The order is the order of rows in the file, not the alphabetical ballot order in article 267. The open-data act allows reuse of public-sector information. Source: the National Electoral Commission, file read on 23 October 2026.</p>
<h2>Result</h2>
<p>The vote columns in that file are empty. This page shows no count and names no elected senator. Article 276: the Commission announces the result in the Dziennik Ustaw. No count will be shown here before voting ends. Commission service: <a href="${PKW_SERVICE}">wybory.gov.pl/senat20261122</a>.</p>`;

const POLAND_PL_BODY = `<h2>Co się wybiera</h2>
<p>Postanowienie Prezydenta RP z 25 września 2026 r. (Dz.U. 2026 poz. 1255) zarządza wybory uzupełniające do Senatu w województwie lubuskim, w okręgu nr 20: powiaty krośnieński, świebodziński i zielonogórski oraz miasto na prawach powiatu Zielona Góra. Siedziba Okręgowej Komisji Wyborczej: Zielona Góra. Podstawą jest art. 283 § 1 pkt 1 Kodeksu wyborczego, w związku z postanowieniem Marszałka Senatu z 27 sierpnia 2026 r. o stwierdzeniu wygaśnięcia mandatu senatora Mirosława Różańskiego. Art. 283 § 1 pkt 1 mówi o śmierci senatora. Datą wyborów jest niedziela 22 listopada 2026 r.</p>
<p>Art. 256: do Senatu wybiera się 100 senatorów według zasady większości. Art. 260 § 1: okręgi do Senatu są jednomandatowe. Plik okręgów PKW odczytany 23 października 2026 r. podaje dla numeru 20: 1 mandat i 4 kandydatów.</p>
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
<h2>Kandydaci w pliku PKW</h2>
<p>Plik <span lang="en">kandydaci_senat_utf8.csv</span> odczytany 23 października 2026 r. wymienia cztery osoby. Kolumna „Pozycja na liście” jest pusta. To odczyt pliku, nie obwieszczenie Okręgowej Komisji Wyborczej. Kalendarz każe podać obwieszczenie o zarejestrowanych kandydatach do 12 listopada 2026 r. Tego obwieszczenia tego dnia nie odczytano. Z pliku nie przepisano płci, zawodu ani miejsca zamieszkania.</p>
<ul>
<li>Janusz Krzysztof KUBICKI — KOMITET WYBORCZY WYBORCÓW PO PIERWSZE LUBUSKIE</li>
<li>Tomasz Jacek NARUSZEWICZ — KOMITET WYBORCZY WYBORCÓW TOMASZA NARUSZEWICZA</li>
<li>Zdzisława Maria RÓŻAŃSKA — KOMITET WYBORCZY WYBORCÓW KOALICJI 15 PAŹDZIERNIKA</li>
<li>Joanna SENYSZYN — KOMITET WYBORCZY NOWA FALA PROFESOR SENYSZYN</li>
</ul>
<p>Kolejność jest kolejnością wierszy pliku, nie porządkiem alfabetycznym z art. 267. Ustawa o otwartych danych dopuszcza ponowne wykorzystywanie informacji sektora publicznego. Źródło: Państwowa Komisja Wyborcza, plik odczytany 23 października 2026 r.</p>
<h2>Wynik</h2>
<p>Kolumny głosów w tym pliku są puste. Ta strona nie pokazuje liczenia i nie wskazuje wybranego senatora. Art. 276: wynik ogłasza PKW obwieszczeniem w Dzienniku Ustaw. Liczenie nie pojawi się tutaj przed zakończeniem głosowania. Serwis PKW: <a href="${PKW_SERVICE}">wybory.gov.pl/senat20261122</a>.</p>`;

export const ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "au-vic-2026",
    pollingDay: "2026-11-28",
    startDate: "2026-11-28T08:00:00+11:00",
    endDate: "2026-11-28T18:00:00+11:00",
    organizerName: "Victorian Electoral Commission",
    organizerUrl: VEC_HOME,
    imagePath: "/images/og/au.webp",
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
        title: "Senate by-election, constituency 20",
        description:
          "Senate by-election in constituency 20, Sunday 22 November 2026, 7:00–21:00. Calendar from the presidential order and the Commission candidate file. Unofficial information.",
        ogDescription: "Senate by-election in constituency 20, Sunday 22 November 2026, 7:00–21:00. Unofficial information.",
        ogLocale: "en_US",
        alternates: [
          { hreflang: "pl", path: "/pl/pl/elections/senat-20-2026/" },
          { hreflang: "en", path: "/pl/en/elections/senat-20-2026/" },
          { hreflang: "x-default", path: "/pl/en/elections/senat-20-2026/" },
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
        updated: "Last updated: 24 October 2026.",
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
            text: "The election calendar says that by 12 November 2026 the district commission publishes a notice of registered candidates. That notice was not read for this page on 23 October 2026.",
            links: [{ label: "election calendar", href: DECREE }],
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
          { href: PKW_SERVICE, label: "National Electoral Commission, Senate by-election, constituency 20", readOn: "2026-10-23" },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/kandydaci_senat_csv.1791978806.zip",
            label: "Commission, kandydaci_senat_csv.zip",
            readOn: "2026-10-23",
          },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/okregi_senat_csv.1791978806.zip",
            label: "Commission, okregi_senat_csv.zip",
            readOn: "2026-10-23",
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
        title: "Wybory uzupełniające do Senatu, okręg nr 20",
        description:
          "Wybory uzupełniające do Senatu w okręgu nr 20, niedziela 22 listopada 2026 r., godz. 7:00–21:00. Kalendarz z postanowienia Prezydenta i plik kandydatów PKW. Informacja nieoficjalna.",
        ogDescription:
          "Wybory uzupełniające do Senatu w okręgu nr 20, niedziela 22 listopada 2026 r., godz. 7:00–21:00. Informacja nieoficjalna.",
        ogLocale: "pl_PL",
        alternates: [
          { hreflang: "pl", path: "/pl/pl/elections/senat-20-2026/" },
          { hreflang: "en", path: "/pl/en/elections/senat-20-2026/" },
          { hreflang: "x-default", path: "/pl/en/elections/senat-20-2026/" },
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
        updated: "Ostatnia aktualizacja tej strony: 24 października 2026 r.",
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
            text: "Kalendarz wyborczy podaje, że do 12 listopada 2026 r. Okręgowa Komisja Wyborcza ogłasza obwieszczenie o zarejestrowanych kandydatach. Tego obwieszczenia nie odczytano 23 października 2026 r.",
            links: [{ label: "Kalendarz wyborczy", href: DECREE }],
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
          { href: PKW_SERVICE, label: "PKW, Wybory uzupełniające do Senatu w okręgu nr 20", readOn: "2026-10-23" },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/kandydaci_senat_csv.1791978806.zip",
            label: "PKW, kandydaci_senat_csv.zip",
            readOn: "2026-10-23",
          },
          {
            href: "https://wybory.gov.pl/senat20261122/data/csv/okregi_senat_csv.1791978806.zip",
            label: "PKW, okregi_senat_csv.zip",
            readOn: "2026-10-23",
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

export function profilesWithinDays(asOf = utcToday(), days = ELECTION_SEO_WINDOW_DAYS): ElectionSeoProfile[] {
  return ELECTION_SEO_PROFILES.filter((profile) => isWithinDays(profile.pollingDay, asOf, days)).sort((a, b) =>
    a.pollingDay.localeCompare(b.pollingDay),
  );
}

export function upcomingElectionCards(asOf = utcToday()): HomeElectionLink[] {
  return profilesWithinDays(asOf).flatMap((profile) => profile.homeLinks);
}

export function profileById(id: string): ElectionSeoProfile | undefined {
  return ELECTION_SEO_PROFILES.find((profile) => profile.id === id);
}
