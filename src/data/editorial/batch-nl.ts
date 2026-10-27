import type { EditorialPreview } from "./model";

const PAGE = "https://www.kiesraad.nl/verkiezingen/provinciale-staten";
const CAL =
  "https://www.kiesraad.nl/site/binaries/site-content/collections/documents/2026/08/24/verkiezingskalender-ps-ws27/verkiezingskalender-2027-psws27.pdf";
const ACT = "https://wetten.overheid.nl/BWBR0004627/2026-10-01/0/AfdelingII/HoofdstukJ/Paragraaf1/ArtikelJ1";

const EN_CITES = [
  { label: "Kiesraad, Provincial States elections", href: PAGE },
  { label: "Kiesraad, election calendar of 24 August 2026", href: CAL },
  { label: "Elections Act, article J 1, in force from 1 October 2026", href: ACT },
];

const NL_CITES = [
  { label: "Kiesraad, Provinciale Statenverkiezingen", href: PAGE },
  { label: "Kiesraad, verkiezingskalender van 24 augustus 2026", href: CAL },
  { label: "Kieswet, artikel J 1, geldend vanaf 1 oktober 2026", href: ACT },
];

export const BATCH_NL: EditorialPreview[] = [
  {
    path: "/nl/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "This hub is the English guide to the Dutch elections of Wednesday 17 March 2027. The Kiesraad page on the Provincial States says those elections are held once every four years and that the next ones fall on 17 March 2027. The Kiesraad calendar dated 24 August 2026 is headed for the Provincial States and the water boards on that same Wednesday. The Provincial States later choose the Senate, together with the members of the electoral colleges. The Kiesraad page says that Senate election is organized two to three months afterwards and does not print the later date. This release has no municipality pages and adds no day the Kiesraad did not print.",
      "Article J 1(2) of the Elections Act, in the consolidation in force from 1 October 2026, says voting starts at 07:30 and lasts until 21:00. Article J 1(1) places the vote on the forty-fourth day after nomination day. The calendar’s nomination day is Monday 1 February 2027, and the forty-fourth day after that Monday is 17 March 2027. Article J 1a lets a municipal executive open a station earlier or later than 07:30 and close it earlier than 21:00, for at least eight consecutive hours, announced in the municipal blad at least fourteen days ahead. The count at such a station is not before 21:00. The calendar says the station count starts immediately after voting and not before 21:00. The Act text that was read does not name a time zone. This hub uses Central European Time, offset +01:00, because daylight-saving time in 2027 starts on the last Sunday of March, after this Wednesday. No count is shown before 21:00 on 17 March 2027.",
      "Lists are not a table that can be copied yet. Nomination day is Monday 1 February 2027. On Tuesday 2 February at 16:00 the central electoral committee holds a non-public examination of the lists that were handed in. On Friday 5 February at 17:00 the public sitting decides validity and numbers the lists. An appeal may be lodged by Tuesday 9 February, and the Administrative Jurisdiction Division of the Council of State has until Monday 15 February to rule. As soon as the lists are irrevocable, the central electoral committee publishes them in the Staatscourant, the provincial blad or the water-board blad. That publication was not open on 27 October 2026. This hub prints no names and no ballot order.",
      "The Kiesraad page says the number of Provincial States seats follows the population on 1 January of the year before the election, and it points to article 8 of the Provinces Act for the bands. This preview did not open that article. The same page prints a seat table labelled as the 2023 overview. That table is not the 2027 allocation and is not copied here. Articles J 1 and J 1a, which set the hours, contain no ban on a public survey. This site publishes no survey figure and no projection on any day. An official figure may appear only after 21:00, and only as a copy of the official count. No earlier total was copied. Polling cards are to be in the voter’s possession by Wednesday 3 March, and the mayor delivers the candidate lists to voters’ addresses by Friday 12 March. The Dutch implementation act was not section-read. This hub publishes no roll and no citizen-service number.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/nl/nl/",
    lang: "nl",
    heading: "Redactioneel overzicht",
    updatedLocal: "Laatst bijgewerkt: 27 oktober 2026.",
    sourcesHeading: "Bronnen bij dit overzicht",
    paragraphs: [
      "Deze gids is het Nederlandse overzicht van de verkiezingen op woensdag 17 maart 2027. De Kiesraad-pagina over de Provinciale Staten zegt dat die verkiezingen eens in de vier jaar zijn en dat de volgende op 17 maart 2027 vallen. De verkiezingskalender van de Kiesraad van 24 augustus 2026 gaat over de Provinciale Staten en de waterschappen op diezelfde woensdag. De Provinciale Staten kiezen later, samen met de leden van de kiescolleges, de Eerste Kamer. De Kiesraad-pagina zegt dat die Eerste Kamerverkiezing twee tot drie maanden later wordt georganiseerd en drukt die latere datum niet af. Deze uitgave heeft geen pagina’s per gemeente en voegt geen dag toe die de Kiesraad niet heeft gedrukt.",
      "Artikel J 1, tweede lid, van de Kieswet, in de tekst die geldt vanaf 1 oktober 2026, zegt dat de stemming om 07:30 begint en tot 21:00 duurt. Het eerste lid legt de stemming op de vierenveertigste dag na de kandidaatstelling. De kalender noemt maandag 1 februari 2027 als dag van kandidaatstelling, en de vierenveertigste dag na die maandag is 17 maart 2027. Artikel J 1a laat burgemeester en wethouders een stembureau eerder of later dan 07:30 openen en eerder dan 21:00 sluiten, ten minste acht uur aaneen, met een mededeling in het gemeenteblad minstens veertien dagen van tevoren. De stemopneming van zo’n bureau is niet voor 21:00. De kalender zegt dat het stembureau de stemopneming direct na het stemmen verricht en niet eerder dan 21:00. De gelezen wetstekst noemt geen tijdzone. Deze gids gebruikt Midden-Europese tijd, verschuiving +01:00, omdat de zomertijd van 2027 ingaat op de laatste zondag van maart, na deze woensdag. Er komen geen stemmen voor 21:00 op 17 maart 2027.",
      "Lijsten zijn nog geen tabel die gekopieerd kan worden. De dag van kandidaatstelling is maandag 1 februari 2027. Op dinsdag 2 februari om 16:00 houdt het centraal stembureau een niet-openbare zitting over de ingeleverde lijsten. Op vrijdag 5 februari om 17:00 beslist de openbare zitting over de geldigheid en nummert zij de lijsten. Beroep kan tot dinsdag 9 februari, en de Afdeling bestuursrechtspraak van de Raad van State heeft tot maandag 15 februari voor de uitspraak. Zodra de lijsten onherroepelijk zijn, publiceert het centraal stembureau ze in de Staatscourant, het provinciaal blad of het waterschapsblad. Die publicatie was op 27 oktober 2026 nog niet open. Deze gids drukt geen namen en geen volgorde op het stembiljet.",
      "De Kiesraad-pagina zegt dat het aantal Statenzetels volgt uit het inwonertal op 1 januari van het jaar vóór de verkiezing, en wijst voor de bandbreedtes naar artikel 8 van de Provinciewet. Dat artikel is voor dit overzicht niet geopend. Dezelfde pagina drukt een zeteltabel af die als overzicht van 2023 is gemerkt. Die tabel is niet de verdeling voor 2027 en wordt hier niet gekopieerd. De artikelen J 1 en J 1a, die de tijden regelen, bevatten geen verbod op een openbare peiling. Deze site publiceert geen peilingcijfer en geen projectie, op geen enkele dag. Een officieel getal mag pas na 21:00, en alleen als kopie van de officiële telling. Er is geen eerdere uitslag overgenomen. Stempassen moeten uiterlijk woensdag 3 maart bij de kiezer zijn, en de burgemeester bezorgt de kandidatenlijsten uiterlijk vrijdag 12 maart op het adres van de kiezers. De Nederlandse uitvoeringswet is niet artikel voor artikel gelezen. Deze gids publiceert geen kiezersregister en geen burgerservicenummer.",
    ],
    citations: NL_CITES,
  },
  {
    path: "/nl/en/elections/provincial-2027/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "Wednesday 17 March 2027 is the day the Kiesraad prints for the next Provincial States elections, which it says are held every four years. The calendar of 24 August 2026 puts the water-board elections on that same Wednesday. One page covers both. It is not a page for each province or each water board. The Kiesraad also says the members of the Provincial States, with the electoral colleges, elect the Senate two to three months later. No Senate date is printed on the page that was read, and none is added here.",
      "The clock is article J 1 of the Elections Act as in force from 1 October 2026. Voting opens at 07:30 and lasts until 21:00. The same article puts polling day on the forty-fourth day after nomination. Counting forward from Monday 1 February 2027, that forty-fourth day is 17 March, so the Act and the calendar agree. A municipality may shift a station’s opening around 07:30 and may close it before 21:00, provided the station is open for eight hours in a row and the times are published at least fourteen days ahead. Even then the count is not before 21:00. The calendar repeats that the count follows voting at once and not before 21:00. This page shows nothing before 21:00 Central European Time. The offset is +01:00 because 2027 daylight-saving time begins on the last Sunday of March.",
      "Ballot order waits on the February sittings in the calendar. Lists are handed in on nomination day, Monday 1 February 2027. The non-public check is Tuesday 2 February at 16:00. The public sitting on Friday 5 February at 17:00 decides which lists are valid and gives them numbers. Appeal runs to Tuesday 9 February, and the Council of State’s administrative division rules by Monday 15 February. Publication of the irrevocable lists, in the Staatscourant or in the provincial or water-board blad, comes as soon as that step is finished. On 27 October 2026 there was no such list to copy, so this page has no names.",
      "Seats for 2027 are not the table on the Kiesraad page. That table is marked as the 2023 overview. The page itself says the next number of seats follows the population on 1 January of the preceding year, which for this election is 1 January 2026, under article 8 of the Provinces Act. Article 8 was not opened for this note, and the 2023 rows were not copied. The hour-setting articles contain no rule against a survey. This site still prints no survey figure and no projection, before 21:00 or after it. A Kiesraad figure can be shown only after the close, and only as that office’s count. Voters should have their polling card by Wednesday 3 March. The mayor sends the candidate lists to their addresses by Friday 12 March. No roll and no citizen-service number are published here.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/nl/nl/elections/provinciale-staten-2027/",
    lang: "nl",
    heading: "Redactioneel overzicht",
    updatedLocal: "Laatst bijgewerkt: 27 oktober 2026.",
    sourcesHeading: "Bronnen bij dit overzicht",
    paragraphs: [
      "Woensdag 17 maart 2027 is de dag die de Kiesraad drukt voor de volgende Provinciale Statenverkiezingen, die volgens die pagina eens in de vier jaar zijn. De kalender van 24 augustus 2026 zet de waterschapsverkiezingen op diezelfde woensdag. Eén pagina dekt beide. Het is geen pagina per provincie of per waterschap. De Kiesraad zegt ook dat de leden van de Provinciale Staten, met de kiescolleges, twee tot drie maanden later de Eerste Kamer kiezen. Op de gelezen pagina staat geen datum voor de Eerste Kamer, en hier wordt er geen toegevoegd.",
      "De klok staat in artikel J 1 van de Kieswet, zoals die geldt vanaf 1 oktober 2026. De stemming begint om 07:30 en duurt tot 21:00. Hetzelfde artikel legt de stemdag op de vierenveertigste dag na de kandidaatstelling. Vanaf maandag 1 februari 2027 gerekend is die vierenveertigste dag 17 maart, zodat wet en kalender samenvallen. Een gemeente mag de opening van een bureau rond 07:30 schuiven en het bureau vóór 21:00 sluiten, als het acht uur aaneen open is en de tijden minstens veertien dagen van tevoren zijn gepubliceerd. Ook dan is de stemopneming niet voor 21:00. De kalender herhaalt dat de telling direct na het stemmen komt en niet eerder dan 21:00. Deze pagina toont niets voor 21:00 Midden-Europese tijd. De verschuiving is +01:00 omdat de zomertijd van 2027 begint op de laatste zondag van maart.",
      "De volgorde op het stembiljet wacht op de februari-zittingen in de kalender. Lijsten worden ingeleverd op de dag van kandidaatstelling, maandag 1 februari 2027. De niet-openbare controle is dinsdag 2 februari om 16:00. De openbare zitting op vrijdag 5 februari om 17:00 beslist welke lijsten geldig zijn en geeft ze nummers. Beroep loopt tot dinsdag 9 februari, en de Afdeling bestuursrechtspraak van de Raad van State doet uitspraak uiterlijk maandag 15 februari. Publicatie van de onherroepelijke lijsten, in de Staatscourant of in het provinciaal blad of het waterschapsblad, volgt zodra die stap klaar is. Op 27 oktober 2026 was er geen lijst om te kopiëren, dus deze pagina heeft geen namen.",
      "De zetels voor 2027 zijn niet de tabel op de Kiesraad-pagina. Die tabel is gemerkt als het overzicht van 2023. De pagina zelf zegt dat het volgende aantal zetels volgt uit het inwonertal op 1 januari van het voorafgaande jaar, voor deze verkiezing dus 1 januari 2026, volgens artikel 8 van de Provinciewet. Artikel 8 is voor deze notitie niet geopend, en de rijen van 2023 zijn niet gekopieerd. De artikelen die de klok regelen bevatten geen regel tegen een peiling. Deze site drukt toch geen peilingcijfer en geen projectie, niet voor 21:00 en niet erna. Een getal van de Kiesraad kan pas na het sluiten, en alleen als de telling van dat orgaan. Kiezers moeten hun stempas uiterlijk woensdag 3 maart hebben. De burgemeester stuurt de kandidatenlijsten uiterlijk vrijdag 12 maart naar hun adres. Hier worden geen kiezersregister en geen burgerservicenummer gepubliceerd.",
    ],
    citations: NL_CITES,
  },
];
