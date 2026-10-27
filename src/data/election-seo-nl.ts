/**
 * Netherlands: Provincial States and water-board elections, 17 March 2027.
 * Hours are Elections Act article J 1. The candidate file stays empty.
 */
import type { ElectionSeoProfile } from "./election-seo";

const PAGE = "https://www.kiesraad.nl/verkiezingen/provinciale-staten";
const CAL = "https://www.kiesraad.nl/site/binaries/site-content/collections/documents/2026/08/24/verkiezingskalender-ps-ws27/verkiezingskalender-2027-psws27.pdf";
const ACT = "https://wetten.overheid.nl/BWBR0004627/2026-10-01/0/AfdelingII/HoofdstukJ/Paragraaf1/ArtikelJ1";
const ARCHIVE = "https://www.verkiezingsuitslagen.nl/";
const HOME = "https://www.kiesraad.nl/";
const NL = "/nl/nl/elections/provinciale-staten-2027/";
const EN = "/nl/en/elections/provincial-2027/";
const OPEN = "2027-03-17T21:00:00+01:00";

const alternates = [
  { hreflang: "nl", path: NL },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: NL },
];

const pageNl = { label: "Provinciale Statenverkiezingen", href: PAGE };
const calNl = { label: "verkiezingskalender 2027", href: CAL };
const actNl = { label: "Artikel J 1 van de Kieswet", href: ACT };
const pageEn = { label: "Provincial States elections", href: PAGE };
const calEn = { label: "2027 election calendar", href: CAL };
const actEn = { label: "Article J 1 of the Elections Act", href: ACT };

const NL_BODY = `<h2>Wat wordt gekozen</h2>
<p>De pagina <a href="${PAGE}">Provinciale Statenverkiezingen</a> noemt 17 maart 2027 als dag voor de Provinciale Staten. De <a href="${CAL}">verkiezingskalender 2027</a> van 24 augustus 2026 gaat over de Provinciale Staten en de waterschappen op woensdag 17 maart 2027. De Provinciale Staten kiezen later de Eerste Kamer. Dit is geen pagina per provincie of waterschap.</p>
<p class="tools"><a href="${EN}">English</a> · <a href="/nl/nl/">Nederland</a></p>
<h2>Hoe stemmen</h2>
<p><a href="${ACT}">Artikel J 1 van de Kieswet</a>, tweede lid, zegt dat de stemming begint om 07:30 en duurt tot 21:00. Artikel J 1a laat een gemeente een stembureau eerder of later dan 07:30 openen en eerder dan 21:00 sluiten. De stemopneming op die bureaus is niet voor 21:00. Deze pagina toont geen stemmen voor 21:00 Midden-Europese tijd. De gelezen tekst noemt geen tijdzone. Deze pagina gebruikt +01:00, omdat de zomertijd van 2027 ingaat op de laatste zondag van maart, na deze dag.</p>
<h2>Kandidaten</h2>
<p>De kalender noemt maandag 1 februari 2027 als dag van kandidaatstelling. Op 27 oktober 2026 is geen lijst geopend. Hier staan geen namen. De Kiesraad-pagina drukt een zeteloverzicht van 2023 af. Dat overzicht is niet de verdeling voor 2027 en is hier niet overgenomen.</p>
<h2>Vorige verkiezingen</h2>
<p>Er is geen oude uitslag overgenomen. De link is <a href="${ARCHIVE}">verkiezingsuitslagen.nl</a>.</p>
<h2>Peilingen</h2>
<p>In de Kieswet-tekst die geldt vanaf 1 oktober 2026 is geen verbod op het publiceren van peilingen gevonden. Deze site publiceert geen peiling en geen projectie, op geen enkele dag.</p>
<p>Het volgende deel toont een afteller en geen stemmen tot 21:00 op 17 maart 2027. Een stem wordt alleen gelezen uit een bestand op deze site. Als het bestand niet leesbaar is, blijft de link naar de Kiesraad.</p>`;

const EN_BODY = `<h2>What is being elected</h2>
<p>The <a href="${PAGE}">Provincial States elections</a> page names 17 March 2027 for the Provincial States. The <a href="${CAL}">2027 election calendar</a> of 24 August 2026 covers the Provincial States and the water boards on Wednesday 17 March 2027. The Provincial States later elect the Senate. This is not a page for each province or water board.</p>
<p class="tools"><a href="${NL}">Nederlands</a> · <a href="/nl/en/">Netherlands</a></p>
<h2>How to vote</h2>
<p>Article J 1(2) of the <a href="${ACT}">Elections Act</a> says voting starts at 07:30 and lasts until 21:00. Article J 1a lets a municipality open a station earlier or later than 07:30 and close it earlier than 21:00. The count at those stations is not before 21:00. This page shows no votes before 21:00 Central European Time. The text that was read does not name a time zone. This page uses the offset +01:00 because daylight-saving time in 2027 starts on the last Sunday of March, after this day.</p>
<h2>Candidates</h2>
<p>The calendar names Monday 1 February 2027 as nomination day. No list was opened on 27 October 2026. No names are printed here. The Kiesraad page prints a 2023 seat overview. That overview is not the 2027 allocation and was not copied.</p>
<h2>The previous election</h2>
<p>No previous total was copied. The link is <a href="${ARCHIVE}">verkiezingsuitslagen.nl</a>.</p>
<h2>Polls</h2>
<p>No ban on publishing polls was found in the Elections Act text in force from 1 October 2026. This site publishes no poll and no projection on any day.</p>
<p>The next section shows a countdown, and no votes, until 21:00 on 17 March 2027. A vote is read only from a file on this site. If the file cannot be read, the section keeps the link to the Kiesraad.</p>`;

export const NL_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "nl-2027-03-17",
    pollingDay: "2027-03-17",
    startDate: "2027-03-17T07:30:00+01:00",
    endDate: OPEN,
    organizerName: "Kiesraad",
    organizerUrl: HOME,
    lastmod: "2026-10-27",
    candidateListId: "nl-2027-03-17",
    homeLinks: [
      {
        href: NL,
        label: "Provinciale Staten en waterschappen, 17 maart 2027",
        detail: "De datum staat bij de Kiesraad. Geen stemmen voor 21:00.",
      },
      {
        href: EN,
        label: "Netherlands Provincial States and water boards, 17 March 2027",
        detail: "The date is on the Kiesraad page. No count before 21:00.",
      },
    ],
    pages: [
      {
        lang: "nl",
        htmlLang: "nl",
        readWord: "gelezen",
        path: NL,
        title: "Provinciale Staten en waterschappen, 17 maart 2027",
        description:
          "Verkiezingen voor Provinciale Staten en waterschappen op 17 maart 2027. Tijden uit de Kieswet en de kalender van de Kiesraad. Onofficiële informatie.",
        ogDescription: "Provinciale Staten en waterschappen, 17 maart 2027. Geen stemmen voor 21:00. Onofficiële informatie.",
        ogLocale: "nl_NL",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Nederland", path: "/nl/" },
          { name: "Provinciale Staten 2027", path: NL },
        ],
        eyebrow: "17 maart 2027",
        h1: "Provinciale Staten en waterschappen",
        lede: "De stemming is op 17 maart 2027. Geen stemmen voor 21:00.",
        updated: "Laatst bijgewerkt: 27 oktober 2026.",
        reportLabel: "Meld een fout",
        officeHref: HOME,
        bannerBefore: "Onofficiële informatie. Bevestig bij de ",
        bannerAfter: "Kiesraad",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/nl/nl/", label: "Nederland" },
          { href: EN, label: "English" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Verkiezingen Provinciale Staten en waterschappen, 17 maart 2027",
        locationName: "Nederland",
        addressRegion: "Nederland",
        addressCountry: "NL",
        keyDatesHeading: "Hoe stemmen, data en bronnen",
        keyDatesIntro: "De dag staat bij de Kiesraad. De klok staat in de Kieswet.",
        keyDates: [
          {
            label: "Stemdag",
            text: "De pagina Provinciale Statenverkiezingen noemt 17 maart 2027.",
            links: [pageNl],
          },
          {
            label: "Waterschappen",
            text: "De verkiezingskalender 2027 zet de waterschappen op dezelfde woensdag 17 maart 2027.",
            links: [calNl],
          },
          {
            label: "Tijden",
            text: "Artikel J 1 van de Kieswet laat de stemming om 07:30 beginnen en tot 21:00 duren.",
            links: [actNl],
          },
          {
            label: "Kandidaatstelling",
            text: "De verkiezingskalender 2027 noemt maandag 1 februari 2027 als dag van kandidaatstelling.",
            links: [calNl],
          },
          {
            label: "Stemopneming",
            text: "De verkiezingskalender 2027 zegt dat de stemopneming niet eerder dan 21:00 begint.",
            links: [calNl],
          },
        ],
        faqHeading: "Vragen",
        faqs: [
          {
            question: "Wanneer zijn de Provinciale Statenverkiezingen?",
            text: "De pagina Provinciale Statenverkiezingen noemt 17 maart 2027.",
            links: [pageNl],
          },
          {
            question: "Zijn de waterschappen dezelfde dag?",
            text: "Ja. De verkiezingskalender 2027 noemt de waterschappen op 17 maart 2027.",
            links: [calNl],
          },
          {
            question: "Hoe laat sluit de stemming?",
            text: "Artikel J 1 van de Kieswet laat de stemming tot 21:00 duren. Een bureau kan eerder sluiten. De telling wacht tot 21:00.",
            links: [actNl],
          },
          {
            question: "Publiceert deze site peilingen?",
            text: "Nee. In de gelezen Kieswet is geen publicatieverbod voor peilingen gevonden. Deze site publiceert geen peiling en geen projectie.",
            links: [{ label: "Kieswet", href: ACT }],
          },
          {
            question: "Wanneer komen hier stemmen?",
            text: "Niet voor 21:00 op 17 maart 2027, Midden-Europese tijd. Daarna wordt een getal alleen gekopieerd van verkiezingsuitslagen.nl.",
            links: [{ label: "verkiezingsuitslagen.nl", href: ARCHIVE }],
          },
        ],
        relatedHeading: "Verwante pagina’s",
        related: [
          { href: "/", label: "Home" },
          { href: "/nl/nl/", label: "Nederland" },
          { href: EN, label: "English" },
        ],
        bodyHtml: NL_BODY,
        sourcesHeading: "Bronnen",
        sources: [
          { href: PAGE, label: "Kiesraad, Provinciale Statenverkiezingen", readOn: "2026-10-27" },
          { href: CAL, label: "Kiesraad, verkiezingskalender 2027", readOn: "2026-10-27" },
          { href: ACT, label: "Kieswet, artikel J 1, geldend vanaf 1 oktober 2026", readOn: "2026-10-27" },
          { href: ARCHIVE, label: "Kiesraad, verkiezingsuitslagen", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Netherlands Provincial States and water boards, 17 March 2027",
        description:
          "Provincial States and water-board elections on 17 March 2027. Hours from the Elections Act and the Kiesraad calendar. Unofficial information.",
        ogDescription: "Provincial States and water boards, 17 March 2027. No count before 21:00. Unofficial information.",
        ogLocale: "en_US",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Netherlands", path: "/nl/" },
          { name: "Provincial States 2027", path: EN },
        ],
        eyebrow: "17 March 2027",
        h1: "Provincial States and water boards",
        lede: "Polling day is 17 March 2027. No count is shown before 21:00.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: HOME,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Kiesraad",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/nl/en/", label: "Netherlands" },
          { href: NL, label: "Nederlands" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Provincial States and water-board elections, 17 March 2027",
        locationName: "Netherlands",
        addressRegion: "Netherlands",
        addressCountry: "NL",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "The day is on the Kiesraad page. The clock is in the Elections Act.",
        keyDates: [
          {
            label: "Polling day",
            text: "The Provincial States elections page names 17 March 2027.",
            links: [pageEn],
          },
          {
            label: "Water boards",
            text: "The 2027 election calendar places the water boards on the same Wednesday, 17 March 2027.",
            links: [calEn],
          },
          {
            label: "Hours",
            text: "Article J 1 of the Elections Act starts voting at 07:30 and keeps it open until 21:00.",
            links: [actEn],
          },
          {
            label: "Nominations",
            text: "The 2027 election calendar names Monday 1 February 2027 as nomination day.",
            links: [calEn],
          },
          {
            label: "The count",
            text: "The 2027 election calendar says the count does not start before 21:00.",
            links: [calEn],
          },
        ],
        faqHeading: "Questions",
        faqs: [
          {
            question: "When are the Provincial States elections?",
            text: "The Provincial States elections page names 17 March 2027.",
            links: [pageEn],
          },
          {
            question: "Are the water boards the same day?",
            text: "Yes. The 2027 election calendar names the water boards on 17 March 2027.",
            links: [calEn],
          },
          {
            question: "When does voting end?",
            text: "Article J 1 of the Elections Act keeps voting open until 21:00. A station may close earlier. The count waits until 21:00.",
            links: [actEn],
          },
          {
            question: "Does this site publish polls?",
            text: "No. No publication ban for polls was found in the Elections Act text that was read. This site publishes no poll and no projection.",
            links: [{ label: "Elections Act", href: ACT }],
          },
          {
            question: "When will votes appear here?",
            text: "Not before 21:00 on 17 March 2027, Central European Time. After that, a figure is copied only from verkiezingsuitslagen.nl.",
            links: [{ label: "verkiezingsuitslagen.nl", href: ARCHIVE }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/nl/en/", label: "Netherlands" },
          { href: NL, label: "Nederlands" },
        ],
        bodyHtml: EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: PAGE, label: "Kiesraad, Provincial States elections", readOn: "2026-10-27" },
          { href: CAL, label: "Kiesraad, 2027 election calendar", readOn: "2026-10-27" },
          { href: ACT, label: "Elections Act, article J 1, in force from 1 October 2026", readOn: "2026-10-27" },
          { href: ARCHIVE, label: "Kiesraad, election results", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
