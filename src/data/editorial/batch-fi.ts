import type { EditorialPreview } from "./model";

const LETTER = "https://loviisa.oncloudos.com/fi/kuulutus/202681054.80020.PDF";
const CIRCULAR = "https://www.kuntaliitto.fi/yleiskirjeet/2026/vuoden-2027-eduskuntavaalit";
const RESULTS = "https://tulospalvelu.vaalit.fi/";

const EN_CITES = [
  { label: "Ministry of Justice, letter of 16 September 2026, VN/12981/2026-OM-3", href: LETTER },
  { label: "Kuntaliitto, circular on the 2027 parliamentary election", href: CIRCULAR },
  { label: "Ministry of Justice, results service", href: RESULTS },
];

const FI_CITES = [
  { label: "Oikeusministeriö, kirje 16. syyskuuta 2026, VN/12981/2026-OM-3", href: LETTER },
  { label: "Kuntaliitto, yleiskirje vuoden 2027 eduskuntavaaleista", href: CIRCULAR },
  { label: "Oikeusministeriö, tulospalvelu", href: RESULTS },
];

const SV_CITES = [
  { label: "Justitieministeriet, brev den 16 september 2026, VN/12981/2026-OM-3", href: LETTER },
  { label: "Kuntaliitto, cirkulär om riksdagsvalet 2027", href: CIRCULAR },
  { label: "Justitieministeriet, resultattjänst", href: RESULTS },
];

export const BATCH_FI: EditorialPreview[] = [
  {
    path: "/fi/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "This hub is the English guide to Finland’s parliamentary election on Sunday 18 April 2027. The Ministry of Justice letter of 16 September 2026, VN/12981/2026-OM-3, names that Sunday as polling day. Advance voting in Finland is 7–13 April 2027, and abroad 7–10 April 2027. On a Finnish ship, advance voting abroad may start on Wednesday 31 March 2027. The Kuntaliitto circular repeats the same day and the same advance windows, and it points municipalities to that letter for the deadlines. The circular recommends outdoor advertising from 31 March 2027. That line is a recommendation, not a statutory silence. This release has no municipality pages and adds no day the letter’s timetable does not print.",
      "The letter’s timetable prints election-day voting on 18 April as 09:00–20:00 and the preliminary count of election-day votes from 20:00. Another line places the electoral district board’s meeting for the advance count no earlier than 10:00 that Sunday, and the meeting that confirms the result on 21 April. This hub shows no count before 20:00 Eastern European Summer Time. The letter does not name a time zone. The offset here is +03:00 because daylight-saving time in 2027 starts on the last Sunday of March, before this Sunday. The letter quotes Election Act section 48 for advance-station hours. The Act was not opened section by section. vaalit.fi returned a block on 27 October 2026 and was not read. The day and the clock on this hub are the letter’s.",
      "Names are not a list that can be copied yet. An application must reach the electoral district board before 16:00 on 9 March 2027. The board draws up the combined candidate list on 18 March 2027, and distribution of that list and of the candidate book to the municipalities starts on 19 March 2027. None of those documents was open on 27 October 2026. This hub prints no names and no ballot order. The letter says the constituency division in Election Act section 5 is unchanged since the 2023 parliamentary election. Section 5 was not opened, so no constituency is named here. The letter is addressed to municipal executives and, in its heading, excepts the region of Åland. No separate Åland timetable was opened.",
      "Seat numbers for 2027 are not printed. The timetable places a government decree on the number of seats in each constituency on 5 or 12 November 2026, from the population register as at 31 October. That decree was not opened on 27 October 2026. The letter does not print a ban on a public survey. The advertising date in the circular is not treated as one. This site publishes no survey figure and no projection on any day. An official figure may appear only after 20:00, and only as a copy of the results service. No earlier total was copied. The voting register becomes legally valid at 12:00 on 6 April 2027, and a request to vote at home must be made before 16:00 that day. Finland is in the European Union, so the GDPR applies. The Data Protection Act was not section-read. This hub publishes no roll and no personal identity code.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/fi/fi/",
    lang: "fi",
    heading: "Toimituksen katsaus",
    updatedLocal: "Päivitetty viimeksi: 27. lokakuuta 2026.",
    sourcesHeading: "Lähteet tässä katsauksessa",
    paragraphs: [
      "Tämä opas on suomenkielinen johdatus eduskuntavaaleihin sunnuntaina 18. huhtikuuta 2027. Oikeusministeriön kirje 16. syyskuuta 2026, VN/12981/2026-OM-3, nimeää tuon sunnuntain vaalipäiväksi. Ennakkoäänestys Suomessa on 7.–13. huhtikuuta 2027 ja ulkomailla 7.–10. huhtikuuta 2027. Suomalaisessa laivassa ulkomaan ennakkoäänestys voi alkaa keskiviikkona 31. maaliskuuta 2027. Kuntaliiton yleiskirje toistaa saman päivän ja samat ennakkoikkunat ja ohjaa kunnat määräajoissa tuohon kirjeeseen. Yleiskirje suosittelee ulkomainontaa 31. maaliskuuta 2027 alkaen. Se rivi on suositus, ei lakisääteinen hiljaisuus. Tässä julkaisussa ei ole kuntasivuja eikä päivää, jota kirjeen aikataulu ei paina.",
      "Kirjeen aikataulu merkitsee vaalipäivän äänestykseksi 18. huhtikuuta kello 9–20 ja vaalipäivän äänten alustavan laskennan alkavaksi kello 20. Toinen rivi asettaa vaalipiirilautakunnan ennakkoäänten laskennan kokouksen aikaisintaan kello 10 samana sunnuntaina ja tuloksen vahvistavan kokouksen 21. huhtikuuta. Tämä opas ei näytä ääniä ennen kello 20 Itä-Euroopan kesäaikaa. Kirje ei nimeä aikavyöhykettä. Siirto tässä on +03:00, koska kesäaika 2027 alkaa maaliskuun viimeisenä sunnuntaina, ennen tätä sunnuntaita. Kirje lainaa vaalilain 48 §:ää ennakkoäänestyspaikkojen aukioloajoista. Lakia ei avattu pykälittäin. vaalit.fi palautti esteen 27. lokakuuta 2026 eikä sitä luettu. Päivä ja kello tässä oppaassa ovat kirjeen.",
      "Nimet eivät ole vielä lista, jonka voisi kopioida. Hakemuksen on oltava vaalipiirilautakunnassa ennen kello 16.00 9. maaliskuuta 2027. Lautakunta laatii ehdokaslistojen yhdistelmän 18. maaliskuuta 2027, ja yhdistelmän sekä ehdokaskirjan jakelu kunnille alkaa 19. maaliskuuta 2027. Mitään näistä asiakirjoista ei avattu 27. lokakuuta 2026. Tässä oppaassa ei ole nimiä eikä järjestystä äänestyslipulla. Kirje sanoo, että vaalilain 5 §:n vaalipiirijako on ennallaan vuoden 2023 eduskuntavaalien jälkeen. Pykälää 5 ei avattu, joten yhtäkään vaalipiiriä ei nimetä. Kirje on osoitettu kunnanhallituksille, ja sen otsikko rajaa Ahvenanmaan maakunnan ulkopuolelle. Erillistä Ahvenanmaan aikataulua ei avattu.",
      "Vuoden 2027 paikkamääriä ei paineta. Aikataulu sijoittaa valtioneuvoston asetuksen vaalipiirien edustajanpaikoista päivälle 5. tai 12. marraskuuta 2026, väestötietojärjestelmän 31. lokakuuta tilanteen pohjalta. Asetusta ei avattu 27. lokakuuta 2026. Kirje ei sisällä kieltoa julkaista kyselyä. Yleiskirjeen mainospäivää ei käsitellä sellaisena. Tämä sivusto ei julkaise kyselylukua eikä ennustetta minään päivänä. Virallinen luku voi tulla vasta kello 20 jälkeen, ja vain tulospalvelun kopiona. Aiempaa tulosta ei kopioitu. Äänioikeusrekisteri tulee lainvoimaiseksi kello 12.00 6. huhtikuuta 2027, ja kotiäänestykseen on ilmoittauduttava ennen kello 16.00 samana päivänä. Suomi on Euroopan unionissa, joten yleistä tietosuoja-asetusta sovelletaan. Tietosuojalakia ei luettu pykälittäin. Tämä opas ei julkaise äänioikeusrekisteriä eikä henkilötunnusta.",
    ],
    citations: FI_CITES,
  },
  {
    path: "/fi/sv/",
    lang: "sv",
    heading: "Redaktionell översikt",
    updatedLocal: "Senast uppdaterad: 27 oktober 2026.",
    sourcesHeading: "Källor för denna översikt",
    paragraphs: [
      "Denna guide är den svenska ingången till riksdagsvalet söndagen den 18 april 2027. Justitieministeriets brev den 16 september 2026, VN/12981/2026-OM-3, anger den söndagen som valdag. Förhandsröstning i Finland är 7–13 april 2027 och utomlands 7–10 april 2027. På ett finländskt fartyg kan förhandsröstning utomlands börja onsdagen den 31 mars 2027. Kuntaliittos cirkulär upprepar samma dag och samma förhandsfönster och visar kommunerna till det brevet för tidsfristerna. Cirkuläret rekommenderar utomhusreklam från den 31 mars 2027. Den meningen är en rekommendation, inte en lagstadgad tystnad. Denna utgåva har inga kommunsidor och lägger inte till en dag som brevets tidsplan inte trycker.",
      "Brevets tidsplan anger röstning på valdagen den 18 april som klockan 9–20 och den preliminära räkningen av valdagssedlar från klockan 20. En annan rad lägger valkretsnämndens möte för förhandsrösterna tidigast klockan 10 samma söndag, och mötet som fastställer resultatet den 21 april. Denna guide visar inga röster före klockan 20 östeuropeisk sommartid. Brevet anger ingen tidszon. Förskjutningen här är +03:00 eftersom sommartid 2027 börjar den sista söndagen i mars, före denna söndag. Brevet citerar vallagens 48 § för öppettider på förhandsröstningsställen. Lagen öppnades inte paragraf för paragraf. vaalit.fi svarade med ett hinder den 27 oktober 2026 och lästes inte. Dagen och klockan i denna guide är brevets.",
      "Namn är ännu ingen lista som kan kopieras. En ansökan ska vara hos valkretsnämnden före klockan 16.00 den 9 mars 2027. Nämnden upprättar sammanställningen av kandidatlistorna den 18 mars 2027, och utdelningen av den listan och av kandidatboken till kommunerna börjar den 19 mars 2027. Inget av de dokumenten var öppet den 27 oktober 2026. Denna guide trycker inga namn och ingen ordning på valsedeln. Brevet säger att valkretsindelningen i vallagens 5 § är oförändrad sedan riksdagsvalet 2023. Paragraf 5 öppnades inte, så ingen valkrets namnges här. Brevet är ställt till kommunstyrelser och undantar i rubriken landskapet Åland. Ingen separat tidtabell för Åland öppnades.",
      "Mandatantalet för 2027 trycks inte. Tidsplanen lägger en statsrådsförordning om antalet mandat i varje valkrets på den 5 eller 12 november 2026, från befolkningsdatasystemet per den 31 oktober. Den förordningen öppnades inte den 27 oktober 2026. Brevet innehåller inget förbud mot en offentlig mätning. Reklamdatumet i cirkuläret behandlas inte som ett sådant. Denna webbplats publicerar ingen mätningssiffra och ingen projektion någon dag. En officiell siffra får komma först efter klockan 20, och bara som en kopia av resultattjänsten. Inget tidigare resultat kopierades. Röstlängden blir lagakraftvunnen klockan 12.00 den 6 april 2027, och en anmälan om röstning hemma ska göras före klockan 16.00 samma dag. Finland är i Europeiska unionen, så den allmänna dataskyddsförordningen gäller. Dataskyddslagen lästes inte paragraf för paragraf. Denna guide publicerar ingen röstlängd och ingen personbeteckning.",
    ],
    citations: SV_CITES,
  },
  {
    path: "/fi/en/elections/parliamentary-2027/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "Sunday 18 April 2027 is the polling day the Ministry of Justice letter of 16 September 2026, VN/12981/2026-OM-3, prints for the parliamentary election. The Kuntaliitto circular repeats that Sunday and says the letter is what municipalities received on the deadlines. One page covers the national contest. It is not a page for each municipality, and it is not a page for Åland on its own. The letter’s heading is addressed to municipal executives and excepts the region of Åland. No Åland timetable was opened for this note, and none is invented here.",
      "The clock is the letter’s timetable, not a section of the Election Act that was opened. Voting on 18 April is printed as 09:00–20:00. The preliminary count of election-day votes starts from 20:00. The electoral district board may meet on the advance count no earlier than 10:00 that day, and it meets to confirm the result on 21 April. This page shows nothing before 20:00 Eastern European Summer Time. The letter does not name a time zone. The offset is +03:00 because 2027 daylight-saving time begins on the last Sunday of March. Advance voting in Finland is 7–13 April, abroad 7–10 April, and on a Finnish ship it may start on 31 March. Section 48 is quoted in the letter for advance-station hours and was not opened here. vaalit.fi was blocked on 27 October 2026, so it is not a source on this page.",
      "Ballot order waits on March. Applications are due at the electoral district board before 16:00 on 9 March 2027. The combined candidate list is drawn up on 18 March 2027. Distribution to the municipalities, of that list and of the candidate book, starts on 19 March 2027. On 27 October 2026 there was no such list to copy, so this page has no names. The letter says Election Act section 5 still sets the constituencies used in 2023. That section was not opened, and the 2023 names are not reprinted. A government decree on how many seats each constituency has is dated in the timetable as 5 or 12 November 2026, from the register as at 31 October. The decree was not opened, and no seat total is printed.",
      "The letter does not contain a rule against a survey. The circular’s suggestion that outdoor advertising start on 31 March 2027 is not read as a legal blackout. This site still prints no survey figure and no projection, before 20:00 or after it. A figure from the results service can be shown only after the close, and only as that service’s count. No earlier total was copied. Voters who need to vote at home must ask before 16:00 on 6 April 2027, the same day the timetable says the voting register is legally valid at 12:00. No roll and no personal identity code are published here. The Data Protection Act was not section-read. The GDPR still applies because Finland is in the European Union.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/fi/fi/elections/eduskunta-2027/",
    lang: "fi",
    heading: "Toimituksen katsaus",
    updatedLocal: "Päivitetty viimeksi: 27. lokakuuta 2026.",
    sourcesHeading: "Lähteet tässä katsauksessa",
    paragraphs: [
      "Sunnuntai 18. huhtikuuta 2027 on vaalipäivä, jonka oikeusministeriön kirje 16. syyskuuta 2026, VN/12981/2026-OM-3, painaa eduskuntavaaleille. Kuntaliiton yleiskirje toistaa tuon sunnuntain ja sanoo, että kunnat saivat määräajat tuossa kirjeessä. Yksi sivu kattaa valtakunnallisen vaalin. Se ei ole sivu jokaista kuntaa varten eikä oma sivu Ahvenanmaalle. Kirjeen otsikko on osoitettu kunnanhallituksille ja rajaa Ahvenanmaan maakunnan ulkopuolelle. Ahvenanmaan aikataulua ei avattu tätä muistiinpanoa varten, eikä sitä keksitä tähän.",
      "Kello on kirjeen aikataulussa, ei avatussa vaalilain pykälässä. Äänestys 18. huhtikuuta on merkitty kello 9–20. Vaalipäivän äänten alustava laskenta alkaa kello 20. Vaalipiirilautakunta voi kokoontua ennakkoäänten laskentaan aikaisintaan kello 10 samana päivänä, ja se kokoontuu vahvistamaan tuloksen 21. huhtikuuta. Tämä sivu ei näytä mitään ennen kello 20 Itä-Euroopan kesäaikaa. Kirje ei nimeä aikavyöhykettä. Siirto on +03:00, koska vuoden 2027 kesäaika alkaa maaliskuun viimeisenä sunnuntaina. Ennakkoäänestys Suomessa on 7.–13. huhtikuuta, ulkomailla 7.–10. huhtikuuta, ja suomalaisessa laivassa se voi alkaa 31. maaliskuuta. Pykälä 48 on lainattu kirjeessä ennakkopaikkojen aukioloajoista eikä sitä avattu tässä. vaalit.fi oli estetty 27. lokakuuta 2026, joten se ei ole lähde tällä sivulla.",
      "Järjestys äänestyslipulla odottaa maaliskuuta. Hakemukset on toimitettava vaalipiirilautakunnalle ennen kello 16.00 9. maaliskuuta 2027. Ehdokaslistojen yhdistelmä laaditaan 18. maaliskuuta 2027. Jakelu kunnille, sekä yhdistelmän että ehdokaskirjan, alkaa 19. maaliskuuta 2027. Lokakuun 27. päivänä 2026 ei ollut listaa kopioitavaksi, joten tällä sivulla ei ole nimiä. Kirje sanoo, että vaalilain 5 § asettaa yhä vuonna 2023 käytetyt vaalipiirit. Tätä pykälää ei avattu, eikä vuoden 2023 nimiä paineta uudelleen. Valtioneuvoston asetus kunkin vaalipiirin paikoista on aikataulussa 5. tai 12. marraskuuta 2026, rekisterin 31. lokakuuta tilanteesta. Asetusta ei avattu, eikä paikkojen yhteismäärää paineta.",
      "Kirje ei sisällä sääntöä kyselyä vastaan. Yleiskirjeen ehdotus, että ulkomainonta alkaisi 31. maaliskuuta 2027, ei ole lakisääteinen hiljaisuus. Tämä sivusto ei silti paina kyselylukua eikä ennustetta, ei ennen kello 20 eikä sen jälkeen. Tulospalvelun luku voidaan näyttää vasta sulkemisen jälkeen, ja vain tuon palvelun lukuna. Aiempaa tulosta ei kopioitu. Kotiäänestystä tarvitsevan on pyydettävä sitä ennen kello 16.00 6. huhtikuuta 2027, samana päivänä jona aikataulu sanoo äänioikeusrekisterin olevan lainvoimainen kello 12.00. Täällä ei julkaista äänioikeusrekisteriä eikä henkilötunnusta. Tietosuojalakia ei luettu pykälittäin. Yleistä tietosuoja-asetusta sovelletaan silti, koska Suomi on Euroopan unionissa.",
    ],
    citations: FI_CITES,
  },
  {
    path: "/fi/sv/elections/riksdagsval-2027/",
    lang: "sv",
    heading: "Redaktionell översikt",
    updatedLocal: "Senast uppdaterad: 27 oktober 2026.",
    sourcesHeading: "Källor för denna översikt",
    paragraphs: [
      "Söndagen den 18 april 2027 är den valdag som justitieministeriets brev den 16 september 2026, VN/12981/2026-OM-3, trycker för riksdagsvalet. Kuntaliittos cirkulär upprepar den söndagen och säger att kommunerna fick tidsfristerna i det brevet. En sida täcker det nationella valet. Den är inte en sida för varje kommun, och den är inte en egen sida för Åland. Brevets rubrik är ställd till kommunstyrelser och undantar landskapet Åland. Ingen tidtabell för Åland öppnades för denna notis, och ingen läggs till här.",
      "Klockan står i brevets tidsplan, inte i en paragraf av vallagen som öppnades. Röstningen den 18 april är tryckt som klockan 9–20. Den preliminära räkningen av valdagssedlar börjar från klockan 20. Valkretsnämnden får sammanträda om förhandsrösterna tidigast klockan 10 samma dag, och den sammanträder för att fastställa resultatet den 21 april. Denna sida visar ingenting före klockan 20 östeuropeisk sommartid. Brevet anger ingen tidszon. Förskjutningen är +03:00 eftersom sommartiden 2027 börjar den sista söndagen i mars. Förhandsröstning i Finland är 7–13 april, utomlands 7–10 april, och på ett finländskt fartyg kan den börja den 31 mars. Paragraf 48 citeras i brevet för öppettider på förhandsställen och öppnades inte här. vaalit.fi var spärrad den 27 oktober 2026, så den är inte en källa på denna sida.",
      "Ordningen på valsedeln väntar på mars. Ansökningar ska vara hos valkretsnämnden före klockan 16.00 den 9 mars 2027. Sammanställningen av kandidatlistorna upprättas den 18 mars 2027. Utdelningen till kommunerna, av den listan och av kandidatboken, börjar den 19 mars 2027. Den 27 oktober 2026 fanns ingen sådan lista att kopiera, så denna sida har inga namn. Brevet säger att vallagens 5 § fortfarande anger de valkretsar som användes 2023. Den paragrafen öppnades inte, och namnen från 2023 trycks inte om. En statsrådsförordning om hur många mandat varje valkrets har är daterad i tidsplanen till den 5 eller 12 november 2026, från registret per den 31 oktober. Förordningen öppnades inte, och inget mandatantal trycks.",
      "Brevet innehåller ingen regel mot en mätning. Cirkulärets förslag att utomhusreklam ska börja den 31 mars 2027 läses inte som en lagstadgad tystnad. Denna webbplats trycker ändå ingen mätningssiffra och ingen projektion, varken före klockan 20 eller efter. En siffra från resultattjänsten kan visas först efter stängning, och bara som den tjänstens räkning. Inget tidigare resultat kopierades. Den som behöver rösta hemma ska anmäla det före klockan 16.00 den 6 april 2027, samma dag som tidsplanen säger att röstlängden är lagakraftvunnen klockan 12.00. Ingen röstlängd och ingen personbeteckning publiceras här. Dataskyddslagen lästes inte paragraf för paragraf. Den allmänna dataskyddsförordningen gäller ändå, eftersom Finland är i Europeiska unionen.",
    ],
    citations: SV_CITES,
  },
];
