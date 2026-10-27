/**
 * Finland: parliamentary election, 18 April 2027.
 * The day and the clock are the Ministry of Justice letter of 16 September 2026.
 * The Election Act was not section-read. The candidate file stays empty.
 */
import type { ElectionSeoProfile } from "./election-seo";

const LETTER = "https://loviisa.oncloudos.com/fi/kuulutus/202681054.80020.PDF";
const CIRCULAR = "https://www.kuntaliitto.fi/yleiskirjeet/2026/vuoden-2027-eduskuntavaalit";
const RESULTS = "https://tulospalvelu.vaalit.fi/";
const FI = "/fi/fi/elections/eduskunta-2027/";
const EN = "/fi/en/elections/parliamentary-2027/";
const OPEN = "2027-04-18T20:00:00+03:00";

const alternates = [
  { hreflang: "fi", path: FI },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: FI },
];

const letterFi = { label: "Oikeusministeriön kirje", href: LETTER };
const letterEn = { label: "Ministry of Justice letter", href: LETTER };
const resultsFi = { label: "tulospalvelu.vaalit.fi", href: RESULTS };
const resultsEn = { label: "tulospalvelu.vaalit.fi", href: RESULTS };

const FI_BODY = `<h2>Mitä valitaan</h2>
<p><a href="${LETTER}">Oikeusministeriön kirje</a> 16. syyskuuta 2026, VN/12981/2026-OM-3, nimeää eduskuntavaalien vaalipäiväksi sunnuntain 18. huhtikuuta 2027. Tämä ei ole kuntasivu.</p>
<p class="tools"><a href="${EN}">English</a> · <a href="/fi/fi/">Suomi</a></p>
<h2>Miten äänestää</h2>
<p>Kirjeen aikataulu merkitsee vaalipäivän äänestykseksi 18. huhtikuuta kello 9–20 ja alustavan laskennan alkavaksi kello 20. Ennakkoäänestys Suomessa on 7.–13. huhtikuuta 2027 ja ulkomailla 7.–10. huhtikuuta 2027. Suomalaisessa laivassa ennakkoäänestys ulkomailla voi alkaa keskiviikkona 31. maaliskuuta 2027. Kirje lainaa vaalilain 48 §:ää ennakkoäänestyspaikkojen aukioloajoista. Vaalilakia ei avattu pykälittäin. vaalit.fi palautti 403 eikä sitä luettu. Kello 20 on kirjeen aikataulun tunti, ei avattua lain pykälää. Tämä sivu ei näytä ääniä ennen kello 20 Itä-Euroopan kesäaikaa. Kirje ei nimeä aikavyöhykettä. Tämä sivu käyttää siirtoa +03:00, koska kesäaika 2027 alkaa maaliskuun viimeisenä sunnuntaina, ennen tätä päivää.</p>
<h2>Ehdokkaat</h2>
<p>Ehdokashakemuksen on oltava vaalipiirilautakunnassa ennen kello 16.00 9. maaliskuuta 2027. Listaa ei avattu 27. lokakuuta 2026. Tässä ei ole nimiä.</p>
<h2>Aiemmat vaalit</h2>
<p>Vanhaa tulosta ei kopioitu. Tulospalvelun etusivu ei tulostanut vuoden 2027 laskentaa. Linkki on <a href="${RESULTS}">tulospalvelu.vaalit.fi</a>.</p>
<h2>Kyselyt</h2>
<p>Kirje ei sisällä kieltoa julkaista kyselyjä. Vaalilakia ei luettu pykälittäin. Kirjeessä mainittu hallituksen esitys ei ole tällä sivulla lakia. <a href="${CIRCULAR}">Kuntaliiton yleiskirje</a> toistaa saman päivän ja suosittelee ulkomainontaa 31. maaliskuuta 2027 alkaen. Se on suositus, ei lakisääteinen hiljaisuus. Tämä sivusto ei julkaise kyselyä eikä ennustetta minään päivänä.</p>
<p>Seuraava osa näyttää laskurin eikä ääniä ennen kello 20 18. huhtikuuta 2027. Ääni luetaan vain tämän sivuston tiedostosta. Jos tiedostoa ei voi lukea, osassa pysyy linkki tulospalveluun.</p>`;

const EN_BODY = `<h2>What is being elected</h2>
<p>The <a href="${LETTER}">Ministry of Justice letter</a> of 16 September 2026, VN/12981/2026-OM-3, names Sunday 18 April 2027 as polling day for the parliamentary election. This is not a municipality page.</p>
<p class="tools"><a href="${FI}">Suomi</a> · <a href="/fi/en/">Finland</a></p>
<h2>How to vote</h2>
<p>The letter’s timetable prints election-day voting on 18 April as 09:00–20:00 and the preliminary count from 20:00. Advance voting in Finland is 7–13 April 2027, and abroad 7–10 April 2027. On a Finnish ship, advance voting abroad may start on Wednesday 31 March 2027. The letter quotes Election Act section 48 for advance-station hours. The Act was not opened section by section. vaalit.fi returned 403 and was not read. 20:00 is the hour in the letter’s timetable, not a section of the Act that was opened. This page shows no votes before 20:00 Eastern European Summer Time. The letter does not name a time zone. This page uses the offset +03:00 because daylight-saving time in 2027 starts on the last Sunday of March, before this day.</p>
<h2>Candidates</h2>
<p>A candidate application must reach the electoral district board before 16:00 on 9 March 2027. No list was opened on 27 October 2026. No names are printed here.</p>
<h2>The previous election</h2>
<p>No previous total was copied. The results-service front page did not print a 2027 count. The link is <a href="${RESULTS}">tulospalvelu.vaalit.fi</a>.</p>
<h2>Polls</h2>
<p>The letter does not print a ban on publishing polls. The Act was not section-read. A government bill named in the letter is not treated as law on this page. The <a href="${CIRCULAR}">Kuntaliitto circular</a> repeats the same day and recommends outdoor advertising from 31 March 2027. That is a recommendation, not a legal blackout. This site publishes no poll and no projection on any day.</p>
<p>The next section shows a countdown, and no votes, until 20:00 on 18 April 2027. A vote is read only from a file on this site. If the file cannot be read, the section keeps the link to the results service.</p>`;

export const FI_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "fi-2027-04-18",
    pollingDay: "2027-04-18",
    startDate: "2027-04-18T09:00:00+03:00",
    endDate: OPEN,
    organizerName: "Oikeusministeriö",
    organizerUrl: LETTER,
    lastmod: "2026-10-27",
    candidateListId: "fi-2027-04-18",
    homeLinks: [
      {
        href: FI,
        label: "Eduskuntavaalit, 18. huhtikuuta 2027",
        detail: "Päivä on oikeusministeriön kirjeessä. Ei ääniä ennen kello 20.",
      },
      {
        href: EN,
        label: "Finland parliamentary election, 18 April 2027",
        detail: "The day is in the Ministry of Justice letter. No count before 20:00.",
      },
    ],
    pages: [
      {
        lang: "fi",
        htmlLang: "fi",
        readWord: "luettu",
        path: FI,
        title: "Eduskuntavaalit, 18. huhtikuuta 2027",
        description:
          "Eduskuntavaalit sunnuntaina 18. huhtikuuta 2027. Päivä ja kellonajat oikeusministeriön kirjeestä 16. syyskuuta 2026. Epävirallinen tieto.",
        ogDescription: "Eduskuntavaalit 18. huhtikuuta 2027. Ei ääniä ennen kello 20. Epävirallinen tieto.",
        ogLocale: "fi_FI",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Suomi", path: "/fi/" },
          { name: "Eduskuntavaalit 2027", path: FI },
        ],
        eyebrow: "18. huhtikuuta 2027",
        h1: "Eduskuntavaalit",
        lede: "Vaalipäivä on 18. huhtikuuta 2027. Ei ääniä ennen kello 20.",
        updated: "Päivitetty viimeksi: 27. lokakuuta 2026.",
        reportLabel: "Ilmoita virheestä",
        officeHref: RESULTS,
        bannerBefore: "Epävirallinen tieto. Vahvista ",
        bannerAfter: "tulospalvelusta",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/fi/fi/", label: "Suomi" },
          { href: EN, label: "English" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Eduskuntavaalit, 18. huhtikuuta 2027",
        locationName: "Suomi",
        addressRegion: "Suomi",
        addressCountry: "FI",
        keyDatesHeading: "Miten äänestää, päivät ja lähteet",
        keyDatesIntro: "Päivä ja kello ovat oikeusministeriön kirjeessä.",
        keyDates: [
          {
            label: "Vaalipäivä",
            text: "Oikeusministeriön kirje nimeää vaalipäiväksi sunnuntain 18. huhtikuuta 2027.",
            links: [letterFi],
          },
          {
            label: "Ennakkoäänestys",
            text: "Oikeusministeriön kirje asettaa ennakkoäänestyksen Suomessa ajalle 7.–13. huhtikuuta 2027 ja ulkomailla ajalle 7.–10. huhtikuuta 2027.",
            links: [letterFi],
          },
          {
            label: "Kellonajat",
            text: "Oikeusministeriön kirje merkitsee vaalipäivän äänestykseksi 18. huhtikuuta kello 9–20.",
            links: [letterFi],
          },
          {
            label: "Ehdokashakemukset",
            text: "Oikeusministeriön kirje sanoo, että ehdokashakemuksen on oltava vaalipiirilautakunnassa ennen kello 16.00 9. maaliskuuta 2027.",
            links: [letterFi],
          },
          {
            label: "Laskenta",
            text: "Oikeusministeriön kirje aloittaa alustavan laskennan kello 20.",
            links: [letterFi],
          },
        ],
        faqHeading: "Kysymykset",
        faqs: [
          {
            question: "Milloin ovat eduskuntavaalit?",
            text: "Oikeusministeriön kirje nimeää vaalipäiväksi sunnuntain 18. huhtikuuta 2027.",
            links: [letterFi],
          },
          {
            question: "Mihin asti vaalipäivänä äänestetään?",
            text: "Oikeusministeriön kirje merkitsee vaalipäivän äänestykseksi kello 9–20. Tämä sivu ei näytä ääniä ennen kello 20.",
            links: [letterFi],
          },
          {
            question: "Milloin on ennakkoäänestys?",
            text: "Oikeusministeriön kirje asettaa ennakkoäänestyksen Suomessa ajalle 7.–13. huhtikuuta 2027.",
            links: [letterFi],
          },
          {
            question: "Julkaiseeko tämä sivusto kyselyjä?",
            text: "Ei. Oikeusministeriön kirje ei sisällä kieltoa julkaista kyselyjä. Vaalilakia ei luettu pykälittäin. Tämä sivusto ei julkaise kyselyä eikä ennustetta.",
            links: [letterFi],
          },
          {
            question: "Milloin tänne tulee ääniä?",
            text: "Ei ennen kello 20.00 18. huhtikuuta 2027, Itä-Euroopan kesäaikaa. Sen jälkeen luku kopioidaan vain osoitteesta tulospalvelu.vaalit.fi.",
            links: [resultsFi],
          },
        ],
        relatedHeading: "Liittyvät sivut",
        related: [
          { href: "/", label: "Home" },
          { href: "/fi/fi/", label: "Suomi" },
          { href: EN, label: "English" },
        ],
        bodyHtml: FI_BODY,
        sourcesHeading: "Lähteet",
        sources: [
          { href: LETTER, label: "Oikeusministeriö, kirje 16. syyskuuta 2026, VN/12981/2026-OM-3", readOn: "2026-10-27" },
          { href: CIRCULAR, label: "Kuntaliitto, yleiskirje vuoden 2027 eduskuntavaaleista", readOn: "2026-10-27" },
          { href: RESULTS, label: "Oikeusministeriö, tulospalvelu", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "Finland parliamentary election, 18 April 2027",
        description:
          "Parliamentary election on Sunday 18 April 2027. The day and the hours are from the Ministry of Justice letter of 16 September 2026. Unofficial information.",
        ogDescription: "Parliamentary election, 18 April 2027. No count before 20:00. Unofficial information.",
        ogLocale: "en_US",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Finland", path: "/fi/" },
          { name: "Parliamentary election 2027", path: EN },
        ],
        eyebrow: "18 April 2027",
        h1: "Parliamentary election",
        lede: "Polling day is 18 April 2027. No count is shown before 20:00.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: RESULTS,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "results service",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/fi/en/", label: "Finland" },
          { href: FI, label: "Suomi" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Parliamentary election, 18 April 2027",
        locationName: "Finland",
        addressRegion: "Finland",
        addressCountry: "FI",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "The day and the clock are in the Ministry of Justice letter.",
        keyDates: [
          {
            label: "Polling day",
            text: "The Ministry of Justice letter names Sunday 18 April 2027 as polling day.",
            links: [letterEn],
          },
          {
            label: "Advance voting",
            text: "The Ministry of Justice letter sets advance voting in Finland for 7–13 April 2027 and abroad for 7–10 April 2027.",
            links: [letterEn],
          },
          {
            label: "Hours",
            text: "The Ministry of Justice letter prints election-day voting on 18 April as 09:00–20:00.",
            links: [letterEn],
          },
          {
            label: "Applications",
            text: "The Ministry of Justice letter says a candidate application must reach the electoral district board before 16:00 on 9 March 2027.",
            links: [letterEn],
          },
          {
            label: "The count",
            text: "The Ministry of Justice letter starts the preliminary count at 20:00.",
            links: [letterEn],
          },
        ],
        faqHeading: "Questions",
        faqs: [
          {
            question: "When is the parliamentary election?",
            text: "The Ministry of Justice letter names Sunday 18 April 2027 as polling day.",
            links: [letterEn],
          },
          {
            question: "When does voting end on polling day?",
            text: "The Ministry of Justice letter prints voting from 09:00 to 20:00. This page shows no count before 20:00 Eastern European Summer Time.",
            links: [letterEn],
          },
          {
            question: "When is advance voting?",
            text: "The Ministry of Justice letter sets advance voting in Finland for 7–13 April 2027.",
            links: [letterEn],
          },
          {
            question: "Does this site publish polls?",
            text: "No. The Ministry of Justice letter does not print a ban on publishing polls. The Election Act was not section-read. This site publishes no poll and no projection.",
            links: [letterEn],
          },
          {
            question: "When will votes appear here?",
            text: "Not before 20:00 on 18 April 2027, Eastern European Summer Time. After that, a figure is copied only from tulospalvelu.vaalit.fi.",
            links: [resultsEn],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/fi/en/", label: "Finland" },
          { href: FI, label: "Suomi" },
        ],
        bodyHtml: EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: LETTER, label: "Ministry of Justice, letter of 16 September 2026, VN/12981/2026-OM-3", readOn: "2026-10-27" },
          { href: CIRCULAR, label: "Kuntaliitto, circular on the 2027 parliamentary election", readOn: "2026-10-27" },
          { href: RESULTS, label: "Ministry of Justice, results service", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
