import type { EditorialPreview } from "./model";

const PAGE_EN = "https://www.valimised.ee/en/riigikogu-elections-2027";
const PAGE_ET = "https://www.valimised.ee/et/riigikogu-valimised-2027";
const ACT_EN = "https://www.riigiteataja.ee/en/eli/ee/501102024002/consolide/current";
const ACT_ET = "https://www.riigiteataja.ee/et/akt/RKVS";
const CAMP_EN = "https://www.valimised.ee/en/estonian-elections-nutshell/election-campaigning-and-polls";
const CAMP_ET = "https://www.valimised.ee/et/valimiste-meelespea/valimisagitatsioon-ja-kusitlused";

const EN_CITES = [
  { label: "State Electoral Office, Riigikogu elections 2027", href: PAGE_EN },
  { label: "Riigikogu Election Act, English consolidation", href: ACT_EN },
  { label: "State Electoral Office, election campaigning", href: CAMP_EN },
];

const ET_CITES = [
  { label: "Riigi valimisteenistus, Riigikogu valimised 2027", href: PAGE_ET },
  { label: "Riigikogu valimise seadus", href: ACT_ET },
  { label: "Riigi valimisteenistus, valimisagitatsioon", href: CAMP_ET },
];

export const BATCH_EE: EditorialPreview[] = [
  {
    path: "/ee/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "This hub is the English guide to Estonia’s election of the Riigikogu. The elections page on valimised.ee names 7 March 2027 as election day. Section 2 of the Riigikogu Election Act holds a regular election on the first Sunday in March of the fourth year after the previous election year, and that Sunday in 2027 is 7 March. The same elections page says the election week starts on Monday 1 March and consists of six advance days. Electronic voting is available during the advance, from 1 March until 6 March. Voting at Estonia’s foreign missions runs from 20 February through 25 February. A voter who wishes to vote by mail must submit a written application to a foreign mission by 5 February 2027. This release has no municipality pages and adds no date the office did not print.",
      "Section 1 of the Act says the Riigikogu has 101 members. Each voter has one vote. Results are determined by proportional representation, and voting is secret. Section 6 holds the election in twelve multi-mandate districts. Section 7 has the National Electoral Committee distribute the mandates after the elections are declared, using the population register as at the first day of the month of that declaration. Section 2 requires the President of the Republic to declare regular elections at least three months before election day. On 27 October 2026 no such resolution was opened for this preview, so no district mandate number is printed.",
      "Section 38 sets the hours. Voting on election day opens at 9:00 and closes at 20:00. Voters may complete voting within 15 minutes after that close, and within 15 minutes after electronic voting ends. The Act does not name a time zone. This hub uses the offset +02:00, Eastern European Time, because daylight-saving time in 2027 begins on the last Sunday of March, after this election day. No count is shown before 20:15 on 7 March 2027. Section 57 says a voting-district committee opens the ballot boxes after the close of voting. Separately, the State Electoral Office ascertains electronic votes after 20:00 on election day, and the committee that counts votes cast outside the voter’s own district starts at 20:00. Either of those 20:00 steps can begin while a voter at a polling place is still allowed to finish, which is why the count on this site stays hidden until 20:15.",
      "Section 4 gives the vote to an Estonian citizen who is 18 by election day. A person serving a prison sentence may not participate in voting. The right to stand belongs to an Estonian citizen who is 21 by the last day for registration of candidates. The elections page dates that day as 21 January 2027. A political party must be entered in the register of non-profit associations and foundations by 7 December 2026, and an independent candidate may take part. A person in active service in the Defence Forces may not stand. On 27 October 2026 the office had not published a list of names in ballot order, so this hub prints none. The campaigning page prohibits campaigning inside the polling place, so the room stays neutral, and it does not prohibit a public survey during the elections period or on election day. This site publishes no survey figure and no projection on any day. No vote table from an earlier election was copied.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/ee/et/",
    lang: "et",
    heading: "Toimetuse ülevaade",
    updatedLocal: "Viimati uuendatud: 27. oktoober 2026.",
    sourcesHeading: "Selle ülevaate allikad",
    paragraphs: [
      "See juhend on eestikeelne ülevaade Riigikogu valimistest. Valimised.ee leht nimetab valimispäevaks 7. märtsi 2027. Riigikogu valimise seaduse § 2 kohaselt toimuvad korralised valimised märtsi esimesel pühapäeval neljandal aastal pärast eelmist valimisaastat, ja 2027. aastal on see pühapäev 7. märts. Samal lehel algab valimisnädal esmaspäeval, 1. märtsil, ja selles on kuus eelhääletamise päeva. Elektrooniliselt saab hääletada eelhääletamise ajal, 1. märtsist 6. märtsini. Eesti välisesindustes hääletatakse 20. veebruarist 25. veebruarini. Kirja teel hääletamiseks tuleb esitada välisesindusele kirjalik taotlus hiljemalt 5. veebruariks 2027. Sellel väljaandel ei ole omavalitsuste lehti ega päeva, mida teenistus ei ole trükkinud.",
      "Seaduse § 1 ütleb, et Riigikogus on 101 liiget. Igal valijal on üks hääl. Tulemus selgitatakse proportsionaalse esindatuse põhimõttel ja hääletamine on salajane. § 6 järgi toimuvad valimised kaheteistkümnes mitmemandaadilises ringkonnas. § 7 järgi jaotab Vabariigi Valimiskomisjon mandaadid pärast valimiste väljakuulutamist, rahvastikuregistri andmete alusel selle kuu esimese päeva seisuga, mil valimised välja kuulutatakse. § 2 nõuab, et Vabariigi President kuulutaks korralised valimised välja vähemalt kolm kuud enne valimispäeva. 27. oktoobril 2026 ei avatud seda otsust, seepärast ei trükita siin ringkonna mandaatide arvu.",
      "Kellaajad on §-s 38. Valimispäeval algab hääletamine kell 9.00 ja lõpeb kell 20.00. Valija võib hääletamise lõpetada 15 minuti jooksul pärast seda aega ja 15 minuti jooksul pärast elektroonilise hääletamise lõppu. Seadus ei nimeta ajavööndit. See juhend kasutab nihet +02:00, Ida-Euroopa aega, sest 2027. aasta suveaeg algab märtsi viimasel pühapäeval, pärast seda valimispäeva. Hääli ei näidata enne kella 20.15 7. märtsil 2027. § 57 ütleb, et jaoskonnakomisjon avab hääletamiskastid pärast hääletamise lõppu. Eraldi selgitab riigi valimisteenistus elektroonilised hääled välja pärast kella 20.00 valimispäeval, ja väljaspool elukohajärgset ringkonda antud häälte lugemine algab kell 20.00. Kumbki neist kella 20.00 sammudest võib alata ajal, mil valija jaoskonnas tohib veel lõpetada, seepärast jääb siinne loend peidus kella 20.15-ni.",
      "§ 4 annab hääle Eesti kodanikule, kes on valimispäevaks saanud 18-aastaseks. Vanglakaristust kandev isik ei või hääletamises osaleda. Kandideerida võib Eesti kodanik, kes on kandidaatide registreerimise viimaseks päevaks saanud 21-aastaseks. Valimisleht nimetab selleks päevaks 21. jaanuari 2027. Erakond peab olema mittetulundusühingute ja sihtasutuste registris hiljemalt 7. detsembriks 2026, ja osaleda võib ka üksikkandidaat. Tegevväelane ei või kandideerida. 27. oktoobril 2026 ei olnud avaldatud nimekirja hääletamissedeli järjekorras, seepärast ei trükita siin nimesid. Agitatsiooni leht keelab agitatsiooni hääletamisruumis, et ruum jääks neutraalseks, ega keela avalikku küsitlust valimiste perioodil ega valimispäeval. See sait ei avalda küsitluse arvu ega prognoosi ühelgi päeval. Varasema valimise häälte tabelit ei kopeeritud.",
    ],
    citations: ET_CITES,
  },
  {
    path: "/ee/en/elections/riigikogu-2027/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "Sunday 7 March 2027 is the Riigikogu election day printed on valimised.ee. Section 2 of the Riigikogu Election Act puts a regular election on the first Sunday in March of the fourth year after the previous election year. In 2027 that Sunday is 7 March, so the page and the Act name the same day. The elections page then sets the week around it. Advance voting starts on Monday 1 March and covers six days. Electronic voting runs from 1 March through 6 March. Missions abroad vote from 20 February through 25 February, and a postal application must reach a mission by 5 February 2027. This page does not move any of those dates.",
      "The Act’s opening sections describe the contest itself. The Riigikogu has 101 members. Each voter casts one secret vote, and the result is proportional. There are twelve multi-mandate districts. Mandate numbers are not a fixed table in the Act. The National Electoral Committee distributes them after the President declares the elections, from the population register on the first day of that month. The President must make that declaration at least three months before election day. The declaration was not among the pages read on 27 October 2026, so this page gives no seat count by district.",
      "A reader who wants the clock should use section 38, not a guess. Election-day voting opens at 9:00 and closes at 20:00. A voter who is still inside that process may finish for 15 minutes after 20:00, and the same 15 minutes applies after electronic voting ends. The statute never names Eastern European Time. The offset +02:00 is used because 2027 daylight-saving time starts on the last Sunday of March, which is later than 7 March. This page therefore shows no figure before 20:15. That wait is deliberate. A district committee opens its boxes after voting closes. Electronic votes are ascertained after 20:00, and votes cast outside the voter’s district are counted from 20:00. Publishing a number at 20:00 would overlap the 15 minutes in which a voter may still finish.",
      "Who may take part is section 4, read together with the elections page. An Estonian citizen aged 18 by 7 March 2027 may vote. A person serving a prison sentence may not. Standing requires Estonian citizenship and the age of 21 by 21 January 2027, the last registration day named on the elections page. Parties already in the non-profit register by 7 December 2026 may take part, as may an independent candidate. Active service in the Defence Forces bars standing. No ballot-order list of names was published on the elections page when it was read on 27 October 2026, and none is invented here. Campaigning inside the polling place is prohibited. A public survey during the elections period and on election day is not prohibited by the campaigning page. This site still prints no survey figure and no projection, before 20:15 or after it. An official figure can appear only after that instant, and only as a copy of the office’s count. An earlier election’s table stays on valimised.ee.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/ee/et/elections/riigikogu-2027/",
    lang: "et",
    heading: "Toimetuse ülevaade",
    updatedLocal: "Viimati uuendatud: 27. oktoober 2026.",
    sourcesHeading: "Selle ülevaate allikad",
    paragraphs: [
      "Pühapäev, 7. märts 2027, on Riigikogu valimispäev, mille valimised.ee leht trükib. Riigikogu valimise seaduse § 2 paneb korralised valimised märtsi esimesele pühapäevale neljandal aastal pärast eelmist valimisaastat. 2027. aastal on see pühapäev 7. märts, nii et leht ja seadus nimetavad sama päeva. Valimisleht kirjeldab ka selle ümber olevat nädalat. Eelhääletamine algab esmaspäeval, 1. märtsil, ja kestab kuus päeva. Elektrooniline hääletamine on 1. märtsist 6. märtsini. Välisesindustes hääletatakse 20. veebruarist 25. veebruarini, ja kirjalik taotlus kirja teel hääletamiseks peab jõudma välisesindusse hiljemalt 5. veebruariks 2027. See leht ei nihuta ühtegi neist kuupäevadest.",
      "Seaduse algusparagrahvid kirjeldavad valimist ennast. Riigikogus on 101 liiget. Iga valija annab ühe salajase hääle ja tulemus on proportsionaalne. Ringkondi on kaksteist ja need on mitmemandaadilised. Mandaatide arv ei ole seaduses valmis tabel. Vabariigi Valimiskomisjon jaotab need pärast seda, kui president on valimised välja kuulutanud, rahvastikuregistri järgi selle kuu esimesel päeval. President peab korralised valimised välja kuulutama vähemalt kolm kuud enne valimispäeva. 27. oktoobril 2026 loetud lehtede hulgas seda otsust ei olnud, seepärast ei anna see leht ringkondade kaupa mandaatide arvu.",
      "Kes otsib kellaaega, loeb § 38, mitte oletust. Valimispäeval algab hääletamine kell 9.00 ja lõpeb kell 20.00. Valija, kes on veel selles toimingus, võib lõpetada 15 minuti jooksul pärast kella 20.00, ja sama 15 minutit kehtib pärast elektroonilise hääletamise lõppu. Seadus ei nimeta Ida-Euroopa aega. Nihet +02:00 kasutatakse seepärast, et 2027. aasta suveaeg algab märtsi viimasel pühapäeval, mis on hiljem kui 7. märts. See leht ei näita seepärast ühtegi arvu enne kella 20.15. Ootamine on taotluslik. Jaoskonnakomisjon avab kastid pärast hääletamise lõppu. Elektroonilised hääled selgitatakse välja pärast kella 20.00 ja väljaspool elukohajärgset ringkonda antud hääli hakatakse lugema kell 20.00. Arvu avaldamine kell 20.00 kattuks nende 15 minutiga, mille jooksul valija tohib veel lõpetada.",
      "Kes võib osaleda, on §-s 4, koos valimislehega. Hääletada võib Eesti kodanik, kes on 7. märtsiks 2027 saanud 18-aastaseks. Vanglakaristust kandev isik ei või. Kandideerimiseks on vaja Eesti kodakondsust ja 21. eluaastat 21. jaanuariks 2027, mis on valimislehel nimetatud registreerimise viimane päev. Osaleda võivad erakonnad, mis on mittetulundusühingute registris 7. detsembriks 2026, ja üksikkandidaat. Tegevteenistus kaitseväes võtab kandideerimisõiguse. 27. oktoobril 2026 ei olnud valimislehel nimekirja sedeli järjekorras ja siin seda ei mõelda välja. Hääletamisruumis on agitatsioon keelatud. Avalik küsitlus valimiste perioodil ja valimispäeval ei ole agitatsioonilehel keelatud. See sait ei trüki ikkagi küsitluse arvu ega prognoosi, ei enne kella 20.15 ega pärast seda. Ametliku arvu võib näidata alles pärast seda hetke ja ainult teenistuse loendi koopiana. Varasema valimise tabel jääb valimised.ee lehele.",
    ],
    citations: ET_CITES,
  },
];
