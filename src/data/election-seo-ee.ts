/**
 * Estonia, Riigikogu election, 7 March 2027.
 * Hours are Riigikogu Election Act § 38. The candidate file stays empty.
 */
import type { ElectionSeoProfile } from "./election-seo";

const PAGE = "https://www.valimised.ee/et/riigikogu-valimised-2027";
const ACT = "https://www.riigiteataja.ee/et/akt/RKVS";
const POLLS = "https://www.valimised.ee/et/valimiste-meelespea/valimisagitatsioon-ja-kusitlused";
const HOME = "https://www.valimised.ee/";
const ET = "/ee/et/elections/riigikogu-2027/";
const EN = "/ee/en/elections/riigikogu-2027/";
const OPEN = "2027-03-07T20:15:00+02:00";

const alternates = [
  { hreflang: "et", path: ET },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: ET },
];

const pageEt = { label: "Riigikogu valimised 2027", href: PAGE };
const actEt = { label: "Riigikogu valimise seadus", href: ACT };
const pollsEt = { label: "Valimisagitatsiooni leht", href: POLLS };
const pageEn = { label: "Riigikogu elections 2027", href: PAGE };
const actEn = { label: "Riigikogu Election Act", href: ACT };
const pollsEn = { label: "campaigning and polls page", href: POLLS };

const ET_BODY = `<h2>Mis valimised</h2>
<p><a href="${PAGE}">Riigikogu valimised 2027</a> lehel on valimispäev 7. märts 2027. Eelhääletamise nädal algab esmaspäeval, 1. märtsil, ja selles on kuus eelhääletamise päeva. Elektrooniline hääletamine on 1. märtsist 6. märtsini. Välisesindustes hääletatakse 20. veebruarist 25. veebruarini. Kirja teel hääletamise taotlus peab jõudma välisesindusse hiljemalt 5. veebruariks 2027.</p>
<p class="tools"><a href="${EN}">English</a> · <a href="/ee/et/">Eesti</a></p>
<h2>Kuidas hääletada</h2>
<p><a href="${ACT}">Riigikogu valimise seaduse</a> § 38 lõige 1 ütleb, et valimispäeval algab hääletamine kell 9.00 ja lõpeb kell 20.00. Lõige 4 lubab valijal hääletamise lõpetada 15 minuti jooksul pärast seda aega. See leht ei näita hääli enne kella 20.15 Ida-Euroopa aja järgi. Seaduse tekst ei nimeta ajavööndit. See leht kasutab nihet +02:00, sest 2027. aasta suveaeg algab märtsi viimasel pühapäeval, pärast seda valimispäeva.</p>
<h2>Kandidaadid</h2>
<p>Samal valimislehel peab kandidaat olema 21-aastane kandidaatide registreerimise viimasel päeval, 21. jaanuaril 2027. Erakond peab olema registris hiljemalt 7. detsembriks 2026. 27. oktoobril 2026 ei avatud nimekirja. Siin ei ole nimesid.</p>
<h2>Eelmised valimised</h2>
<p>Eelmise valimise hääli ei kopeeritud. Link on <a href="${HOME}">valimised.ee</a>.</p>
<h2>Küsitlused</h2>
<p><a href="${POLLS}">Valimisagitatsiooni leht</a> ütleb, et avaliku arvamuse küsitluste korraldamine valimiste ajal ja valimispäeval ei ole keelatud. Hääletamisruumis on agitatsioon keelatud. See sait ei avalda küsitlust ega prognoosi ühelgi päeval.</p>
<p>Järgmine osa näitab loendurit ja mitte ühtegi häält enne kella 20.15 7. märtsil 2027. Hääl loetakse ainult selle saidi failist. Kui faili ei saa lugeda, jääb link valimisteenistusele.</p>`;

const EN_BODY = `<h2>What is being elected</h2>
<p>The <a href="${PAGE}">Riigikogu elections 2027</a> page sets election day as 7 March 2027. The advance week starts on Monday 1 March and has six advance days. Electronic voting runs from 1 March through 6 March. Voting at foreign missions is 20–25 February. A request to vote by post must reach the mission by 5 February 2027.</p>
<p class="tools"><a href="${ET}">Eesti</a> · <a href="/ee/en/">Estonia</a></p>
<h2>How to vote</h2>
<p>Section 38(1) of the <a href="${ACT}">Riigikogu Election Act</a> says voting on election day starts at 9.00 and ends at 20.00. Subsection 4 lets a voter finish within 15 minutes after that time. This page shows no votes before 20:15 Eastern European Time. The Act does not name a time zone. This page uses the offset +02:00 because daylight-saving time in 2027 starts on the last Sunday of March, after this election day.</p>
<h2>Candidates</h2>
<p>The same elections page says a candidate must be 21 on the last day of registration, 21 January 2027. A party must be on the register by 7 December 2026. No list was opened on 27 October 2026. No names are printed here.</p>
<h2>The previous election</h2>
<p>No previous vote total was copied. The link is <a href="${HOME}">valimised.ee</a>.</p>
<h2>Polls</h2>
<p>The <a href="${POLLS}">campaigning and polls page</a> says conducting public-opinion polls during the election period and on election day is not forbidden. Campaigning inside the voting room is forbidden. This site publishes no poll and no projection on any day.</p>
<p>The next section shows a countdown, and no votes, until 20:15 on 7 March 2027. A vote is read only from a file on this site. If the file cannot be read, the section keeps the link to the electoral service.</p>`;

export const EE_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "ee-2027-03-07",
    pollingDay: "2027-03-07",
    startDate: "2027-03-07T09:00:00+02:00",
    endDate: OPEN,
    organizerName: "Riigi valimisteenistus",
    organizerUrl: HOME,
    lastmod: "2026-10-27",
    candidateListId: "ee-riigikogu-2027",
    homeLinks: [
      {
        href: ET,
        label: "Riigikogu valimised, 7. märts 2027",
        detail: "Kuupäev on valimised.ee lehel. Hääli ei näidata enne kella 20.15.",
      },
      {
        href: EN,
        label: "Estonia Riigikogu election, 7 March 2027",
        detail: "The date is on valimised.ee. No count before 20:15.",
      },
    ],
    pages: [
      {
        lang: "et",
        htmlLang: "et",
        readWord: "loetud",
        path: ET,
        title: "Riigikogu valimised, 7. märts 2027",
        description:
          "Riigikogu valimised 7. märtsil 2027. Eelhääletamine, elektrooniline hääletamine ja kellaajad Riigikogu valimise seadusest. Mitteametlik teave.",
        ogDescription: "Riigikogu valimised 7. märtsil 2027. Hääli ei näidata enne kella 20.15. Mitteametlik teave.",
        ogLocale: "et_EE",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Eesti", path: "/ee/" },
          { name: "Riigikogu valimised", path: ET },
        ],
        eyebrow: "7. märts 2027",
        h1: "Riigikogu valimised",
        lede: "Valimispäev on 7. märts 2027. Hääli ei näidata enne kella 20.15.",
        updated: "Viimati uuendatud: 27. oktoober 2026.",
        reportLabel: "Teata veast",
        officeHref: HOME,
        bannerBefore: "Mitteametlik teave. Kinnitage ",
        bannerAfter: "valimised.ee",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ee/et/", label: "Eesti" },
          { href: EN, label: "English" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Riigikogu valimised, 7. märts 2027",
        locationName: "Eesti",
        addressRegion: "Eesti",
        addressCountry: "EE",
        keyDatesHeading: "Kuidas hääletada, tähtajad ja allikad",
        keyDatesIntro: "Kuupäevad on valimislehel. Kellaajad on seaduses.",
        keyDates: [
          {
            label: "Valimispäev",
            text: "Riigikogu valimised 2027 leht nimetab valimispäevaks 7. märtsi 2027.",
            links: [pageEt],
          },
          {
            label: "Eelhääletamine",
            text: "Riigikogu valimised 2027 leht ütleb, et eelhääletamise nädal algab 1. märtsil ja elektrooniline hääletamine kestab 1. märtsist 6. märtsini.",
            links: [pageEt],
          },
          {
            label: "Kellaajad",
            text: "Riigikogu valimise seadus ütleb, et valimispäeval algab hääletamine kell 9.00 ja lõpeb kell 20.00, ning valija võib lõpetada 15 minuti jooksul.",
            links: [actEt],
          },
          {
            label: "Kandidaadid",
            text: "Riigikogu valimised 2027 leht ütleb, et registreerimise viimane päev on 21. jaanuar 2027 ja kandidaat peab selleks päevaks olema 21-aastane.",
            links: [pageEt],
          },
          {
            label: "Küsitlused",
            text: "Valimisagitatsiooni leht ütleb, et avaliku arvamuse küsitlused valimiste ajal ja valimispäeval ei ole keelatud. See sait neid ei avalda.",
            links: [pollsEt],
          },
        ],
        faqHeading: "Küsimused",
        faqs: [
          {
            question: "Mis päeval on Riigikogu valimised?",
            text: "Riigikogu valimised 2027 leht nimetab valimispäevaks 7. märtsi 2027.",
            links: [pageEt],
          },
          {
            question: "Mis kell hääletamine lõpeb?",
            text: "Riigikogu valimise seadus lõpetab valimispäeva hääletamise kell 20.00 ja lubab 15 minutit lõpetamiseks. See leht ootab kella 20.15.",
            links: [actEt],
          },
          {
            question: "Kas saab hääletada elektrooniliselt?",
            text: "Riigikogu valimised 2027 leht ütleb, et elektrooniline hääletamine on 1. märtsist 6. märtsini.",
            links: [pageEt],
          },
          {
            question: "Kas sait avaldab küsitlusi?",
            text: "Ei. Valimisagitatsiooni leht ütleb, et küsitlused ei ole keelatud. See sait ei avalda küsitlust ega prognoosi.",
            links: [pollsEt],
          },
          {
            question: "Millal ilmuvad hääled siin?",
            text: "Mitte enne kella 20.15 7. märtsil 2027 Ida-Euroopa aja järgi. Pärast seda kopeeritakse arv ainult lehelt valimised.ee.",
            links: [{ label: "valimised.ee", href: HOME }],
          },
        ],
        relatedHeading: "Seotud lehed",
        related: [
          { href: "/", label: "Home" },
          { href: "/ee/et/", label: "Eesti" },
          { href: EN, label: "English" },
        ],
        bodyHtml: ET_BODY,
        sourcesHeading: "Allikad",
        sources: [
          { href: PAGE, label: "Riigi valimisteenistus, Riigikogu valimised 2027", readOn: "2026-10-27" },
          { href: ACT, label: "Riigikogu valimise seadus", readOn: "2026-10-27" },
          { href: POLLS, label: "Riigi valimisteenistus, valimisagitatsioon ja küsitlused", readOn: "2026-10-27" },
          { href: HOME, label: "valimised.ee", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Estonia Riigikogu election, 7 March 2027",
        description:
          "Riigikogu election on 7 March 2027. Advance voting, electronic voting and the hours in the Riigikogu Election Act. Unofficial information.",
        ogDescription: "Riigikogu election, 7 March 2027. No count before 20:15. Unofficial information.",
        ogLocale: "en_US",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Estonia", path: "/ee/" },
          { name: "Riigikogu election", path: EN },
        ],
        eyebrow: "7 March 2027",
        h1: "Riigikogu election",
        lede: "Election day is 7 March 2027. No count is shown before 20:15.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: HOME,
        bannerBefore: "Unofficial information. Confirm with ",
        bannerAfter: "valimised.ee",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/ee/en/", label: "Estonia" },
          { href: ET, label: "Eesti" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Riigikogu election, 7 March 2027",
        locationName: "Estonia",
        addressRegion: "Estonia",
        addressCountry: "EE",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "The dates are on the elections page. The clock times are in the Act.",
        keyDates: [
          {
            label: "Election day",
            text: "The Riigikogu elections 2027 page names 7 March 2027 as election day.",
            links: [pageEn],
          },
          {
            label: "Advance voting",
            text: "The Riigikogu elections 2027 page says the advance week starts on 1 March and electronic voting runs from 1 March through 6 March.",
            links: [pageEn],
          },
          {
            label: "Hours",
            text: "The Riigikogu Election Act says voting on election day starts at 9.00 and ends at 20.00, and a voter may finish within 15 minutes.",
            links: [actEn],
          },
          {
            label: "Candidates",
            text: "The Riigikogu elections 2027 page says the last day of registration is 21 January 2027 and a candidate must be 21 on that day.",
            links: [pageEn],
          },
          {
            label: "Polls",
            text: "The campaigning and polls page says public-opinion polls during the election period and on election day are not forbidden. This site does not publish them.",
            links: [pollsEn],
          },
        ],
        faqHeading: "Questions",
        faqs: [
          {
            question: "When is the Riigikogu election?",
            text: "The Riigikogu elections 2027 page names 7 March 2027 as election day.",
            links: [pageEn],
          },
          {
            question: "When does voting end?",
            text: "The Riigikogu Election Act ends election-day voting at 20.00 and allows 15 minutes to finish. This page waits until 20:15.",
            links: [actEn],
          },
          {
            question: "Can a voter vote electronically?",
            text: "The Riigikogu elections 2027 page says electronic voting runs from 1 March through 6 March.",
            links: [pageEn],
          },
          {
            question: "Does this site publish polls?",
            text: "No. The campaigning and polls page says polls are not forbidden. This site publishes no poll and no projection.",
            links: [pollsEn],
          },
          {
            question: "When will votes appear here?",
            text: "Not before 20:15 on 7 March 2027, Eastern European Time. After that, a figure is copied only from valimised.ee.",
            links: [{ label: "valimised.ee", href: HOME }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/ee/en/", label: "Estonia" },
          { href: ET, label: "Eesti" },
        ],
        bodyHtml: EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: PAGE, label: "National Electoral Service, Riigikogu elections 2027", readOn: "2026-10-27" },
          { href: ACT, label: "Riigikogu Election Act", readOn: "2026-10-27" },
          { href: POLLS, label: "National Electoral Service, campaigning and polls", readOn: "2026-10-27" },
          { href: HOME, label: "valimised.ee", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
