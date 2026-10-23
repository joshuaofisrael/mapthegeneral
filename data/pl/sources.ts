import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_L2 = "2026-10-18";
const READ_L3 = "2026-10-19";

export const SOURCES: SourceRef[] = [
  {
    id: "constitution",
    name: "Konstytucja Rzeczypospolitej Polskiej z dnia 2 kwietnia 1997 r. (Dz. U. 1997 nr 78 poz. 483), tekst na sejm.gov.pl",
    url: "https://www.sejm.gov.pl/prawo/konst/polski/4.htm",
    readOn: READ,
  },
  {
    id: "constitution-eli",
    name: "Konstytucja Rzeczypospolitej Polskiej, tekst ustawy (Dz. U. 1997 nr 78 poz. 483) w api.sejm.gov.pl",
    url: "https://api.sejm.gov.pl/eli/acts/DU/1997/483/text/U/D19970483Lj.pdf",
    readOn: READ,
  },
  {
    id: "kodeks",
    name: "Obwieszczenie Marszałka Sejmu Rzeczypospolitej Polskiej z dnia 1 września 2026 r. w sprawie ogłoszenia jednolitego tekstu ustawy – Kodeks wyborczy (Dz. U. 2026 poz. 1261)",
    url: "https://api.sejm.gov.pl/eli/acts/DU/2026/1261/text.pdf",
    readOn: READ,
  },
  {
    id: "sejm-first-sitting",
    name: "Sejm Rzeczypospolitej Polskiej, sprawozdanie z 1. dnia 1. posiedzenia Sejmu X kadencji, 13 listopada 2023 r.",
    url: "https://www.sejm.gov.pl/sejm10.nsf/wypowiedz.xsp?dzien=1&posiedzenie=1&wyp=0",
    readOn: READ,
  },
  {
    id: "sejm-senior",
    name: "Sejm Rzeczypospolitej Polskiej, informacja Marszałka Seniora o zwołaniu pierwszego posiedzenia Sejmu X kadencji na 13 listopada 2023 r.",
    url: "https://www.sejm.gov.pl/Sejm9.nsf/komunikat.xsp?documentId=3E6B15D3956E4E99C1258A6100428CEE",
    readOn: READ,
  },
  {
    id: "sejm-marshal",
    name: "Sejm Rzeczypospolitej Polskiej, komunikat „Sejm wybrał Włodzimierza Czarzastego na funkcję Marszałka Sejmu RP”",
    url: "https://www.sejm.gov.pl/sejm10.nsf/komunikat.xsp?documentId=E7F57A11C3CEAA02C1258D46003D2E77&symbol=M_WYDARZENIA_KOMUNIKAT",
    readOn: READ,
  },
  {
    id: "sejm-marshal-half-year",
    name: "Sejm Rzeczypospolitej Polskiej, komunikat z 18 maja 2026 r. o pół roku sprawowania funkcji Marszałka Sejmu przez Włodzimierza Czarzastego",
    url: "https://www.sejm.gov.pl/sejm10.nsf/komunikat.xsp?documentId=5008BBE52A78DE89C1258DFB005211B2",
    readOn: READ,
  },
  {
    id: "senate-marshal",
    name: "Senat Rzeczypospolitej Polskiej, aktualności „Marszałek i Prezydium”",
    url: "https://www.senat.gov.pl/aktualnoscilista/marszalek-i-prezydium/",
    readOn: READ,
  },
  {
    id: "pkw",
    name: "Państwowa Komisja Wyborcza",
    url: "https://pkw.gov.pl/",
    readOn: READ,
  },
  {
    id: "pkw-sejm-2023",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 17 października 2023 r. o wynikach wyborów do Sejmu Rzeczypospolitej Polskiej przeprowadzonych w dniu 15 października 2023 r.",
    url: "https://www.pkw.gov.pl/uploaded_files/1697617008_obwieszczenie-sejm.pdf",
    readOn: READ,
  },
  {
    id: "pkw-senat-2023",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 17 października 2023 r. o wynikach wyborów do Senatu Rzeczypospolitej Polskiej przeprowadzonych w dniu 15 października 2023 r.",
    url: "https://www.pkw.gov.pl/uploaded_files/1697634760_obwieszczenie-senat.pdf",
    readOn: READ,
  },
  {
    id: "pkw-president-2025",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 2 czerwca 2025 r. o wynikach ponownego głosowania i wyniku wyborów Prezydenta Rzeczypospolitej Polskiej",
    url: "https://pkw.gov.pl/uploaded_files/1748873119_obwieszczenie-pkw-o-wynikach-ponowne-glosowanie.pdf",
    readOn: READ,
  },
  {
    id: "president-oath",
    name: "Oficjalna strona Prezydenta Rzeczypospolitej Polskiej, „Zaprzysiężenie Prezydenta RP Karola Nawrockiego”, 6 sierpnia 2025 r.",
    url: "https://www.prezydent.pl/aktualnosci/wydarzenia/zaprzysiezenie-prezydenta-rp-karola-nawrockiego-,104583",
    readOn: READ,
  },
  {
    id: "zn-oath",
    name: "Zgromadzenie Narodowe, sprawozdanie stenograficzne z 6 sierpnia 2025 r.",
    url: "https://orka2.sejm.gov.pl/StenoInter10.nsf/0/9777162960E4CAA4C1258CE5002C82B2/%24File/ZN_06_08_2025_ksiazka.pdf",
    readOn: READ,
  },
  {
    id: "prime-minister",
    name: "Kancelaria Prezesa Rady Ministrów, Skład Rady Ministrów",
    url: "https://www.gov.pl/web/premier/sklad-rady-ministrow",
    readOn: READ,
  },
  {
    id: "mswia-jst",
    name: "Ministerstwo Spraw Wewnętrznych i Administracji, Baza JST, stan na 1 stycznia 2026 r.",
    url: "https://www.gov.pl/web/mswia/baza-jst",
    readOn: READ,
  },
  {
    id: "teryt",
    name: "Główny Urząd Statystyczny, Rejestr TERYT, wykaz jednostek od 1 stycznia 2026 r.",
    url: "https://eteryt.stat.gov.pl/",
    readOn: READ,
  },
  {
    id: "samorzad-woj",
    name: "Obwieszczenie Marszałka Sejmu Rzeczypospolitej Polskiej z dnia 27 maja 2026 r. w sprawie ogłoszenia jednolitego tekstu ustawy o samorządzie województwa (Dz. U. 2026 poz. 720)",
    url: "https://dziennikustaw.gov.pl/D2026000072001.pdf",
    readOn: READ,
  },
  {
    id: "pkw-rady-2024",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 9 kwietnia 2024 r. o zbiorczych wynikach wyborów do rad na obszarze kraju, przeprowadzonych w dniu 7 kwietnia 2024 r.",
    url: "https://samorzad2024.pkw.gov.pl/samorzad2024/statics/PKW%5FAKTUALNOSCI/uploaded%5Ffiles/1712713138%5Fobwieszczenie-pkw-rady-final.pdf",
    readOn: READ,
  },
  {
    id: "pkw-wojt-2024",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 9 kwietnia 2024 r. o zbiorczych wynikach wyborów wójtów, burmistrzów i prezydentów miast na obszarze kraju, przeprowadzonych w dniu 7 kwietnia 2024 r.",
    url: "https://www.pkw.gov.pl/uploaded_files/1712751143_obwieszczenie-wbp-pkw-tura-1-final.pdf",
    readOn: READ,
  },
  {
    id: "poczta",
    name: "Poczta Polska, System Pocztowych Numerów Adresowych (PNA), BIP",
    url: "https://bip.poczta-polska.pl/bez-kategorii/system-pocztowych-numerow-adresowych-pna/",
    readOn: READ,
  },
  {
    id: "teryt-terc",
    name: "Główny Urząd Statystyczny, plik pełny TERC_Urzedowy_2026-10-18 (katalog z datą 2026-01-01), pobrany ze strony plików pełnych eTERYT",
    url: "https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pliki_pelne.aspx",
    readOn: READ_L2,
  },
  {
    id: "teryt-zasady",
    name: "Główny Urząd Statystyczny, Formy i zasady udostępniania danych rejestru TERYT",
    url: "https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/formy_i_zasady_udostepniania/formy_i_zasady_udostepniania.aspx",
    readOn: READ_L2,
  },
  {
    id: "sejm-api-mp",
    name: "Kancelaria Sejmu, API danych Sejmu, lista posłów X kadencji (term10/MP), mandaty z polem active",
    url: "https://api.sejm.gov.pl/sejm/term10/MP",
    readOn: READ_L2,
  },
  {
    id: "sejm-api-clubs",
    name: "Kancelaria Sejmu, API danych Sejmu, kluby i koła X kadencji (term10/clubs)",
    url: "https://api.sejm.gov.pl/sejm/term10/clubs",
    readOn: READ_L2,
  },
  {
    id: "senate-okregi",
    name: "Senat Rzeczypospolitej Polskiej, Okręgi wyborcze",
    url: "https://www.senat.gov.pl/sklad/okregi-wyborcze/",
    readOn: READ_L2,
  },
  {
    id: "pkw-senat-20-2026",
    name: "Państwowa Komisja Wyborcza, serwis „Wybory uzupełniające do Senatu w okręgu wyborczym nr 20”",
    url: "https://wybory.gov.pl/senat20261122/pl",
    readOn: READ_L2,
  },
  {
    id: "postanowienie-senat-20-2026",
    name: "Postanowienie Prezydenta Rzeczypospolitej Polskiej z dnia 25 września 2026 r. w sprawie zarządzenia wyborów uzupełniających do Senatu Rzeczypospolitej Polskiej (Dz.U. 2026 poz. 1255)",
    url: "https://www.dziennikustaw.gov.pl/DU/2026/1255",
    readOn: READ_L2,
  },
  {
    id: "teryt-terc-20261019",
    name: "Główny Urząd Statystyczny, plik pełny TERC_Urzedowy_2026-10-19 (katalog z datą 2026-01-01), pobrany ze strony plików pełnych eTERYT",
    url: "https://eteryt.stat.gov.pl/eTeryt/rejestr_teryt/udostepnianie_danych/baza_teryt/uzytkownicy_indywidualni/pobieranie/pliki_pelne.aspx",
    readOn: READ_L3,
  },
  {
    id: "pkw-wybrani-wbp-2024",
    name: "Państwowa Komisja Wyborcza, plik wybrani_wojt_burmistrz_prezydent_utf8.csv z archiwum wybrani_wojt_burmistrz_prezydent_csv.zip (wybory samorządowe 2024)",
    url: "https://samorzad2024.pkw.gov.pl/samorzad2024/data/csv/wybrani_wojt_burmistrz_prezydent_csv.zip",
    readOn: READ_L3,
  },
  {
    id: "pkw-okregi-rady-gmin-2024",
    name: "Państwowa Komisja Wyborcza, plik okręgów do rad gmin z archiwum okregi_rady_gmin_csv.zip (wybory samorządowe 2024). Na stronach jest tylko suma kolumny „Liczba mandatów”",
    url: "https://samorzad2024.pkw.gov.pl/samorzad2024/data/csv/okregi_rady_gmin_csv.zip",
    readOn: READ_L3,
  },
  {
    id: "pkw-wbp-tura2-2024",
    name: "Obwieszczenie Państwowej Komisji Wyborczej z dnia 22 kwietnia 2024 r. uzupełniające obwieszczenie z dnia 9 kwietnia 2024 r. o zbiorczych wynikach wyborów wójtów, burmistrzów i prezydentów miast (Dz.U. 2024 poz. 617)",
    url: "https://api.sejm.gov.pl/eli/acts/DU/2024/617/text.html",
    readOn: READ_L3,
  },
  {
    id: "samorzad-gmina",
    name: "Obwieszczenie Marszałka Sejmu Rzeczypospolitej Polskiej z dnia 15 maja 2026 r. w sprawie ogłoszenia jednolitego tekstu ustawy o samorządzie gminnym (Dz.U. 2026 poz. 662)",
    url: "https://api.sejm.gov.pl/eli/acts/DU/2026/662/text.pdf",
    readOn: READ_L3,
  },
  {
    id: "samorzad-gmina-1273",
    name: "Ustawa z dnia 4 września 2026 r. o zmianie ustawy o samorządzie gminnym (Dz.U. 2026 poz. 1273). Zmienia art. 36 i art. 37. Nie zmienia art. 16 ani art. 26",
    url: "https://api.sejm.gov.pl/eli/acts/DU/2026/1273/text.pdf",
    readOn: READ_L3,
  },
  {
    id: "rm-karkonoski-2020",
    name: "Rozporządzenie Rady Ministrów z dnia 29 lipca 2020 r. w sprawie zmiany nazwy powiatu jeleniogórskiego na powiat karkonoski (Dz.U. 2020 poz. 1331)",
    url: "https://dziennikustaw.gov.pl/DU/2020/1331",
    readOn: READ_L3,
  },
  {
    id: "postanowienie-senat-20-pdf",
    name: "Postanowienie Prezydenta Rzeczypospolitej Polskiej z dnia 25 września 2026 r. w sprawie zarządzenia wyborów uzupełniających do Senatu (Dz.U. 2026 poz. 1255), plik PDF w serwisie wyborów",
    url: "https://wybory.gov.pl/senat20261122/statics/PKW_AKTUALNOSCI/uploaded_files/1790383652_postanowienie.pdf",
    readOn: "2026-10-23",
  },
  {
    id: "pkw-senat-20-kandydaci",
    name: "Państwowa Komisja Wyborcza, plik kandydaci_senat_utf8.csv w archiwum kandydaci_senat_csv.zip (wybory uzupełniające do Senatu, okręg nr 20)",
    url: "https://wybory.gov.pl/senat20261122/data/csv/kandydaci_senat_csv.1791978806.zip",
    readOn: "2026-10-23",
  },
  {
    id: "pkw-senat-20-okregi",
    name: "Państwowa Komisja Wyborcza, plik okregi_senat_utf8.csv w archiwum okregi_senat_csv.zip (wybory uzupełniające do Senatu, okręg nr 20)",
    url: "https://wybory.gov.pl/senat20261122/data/csv/okregi_senat_csv.1791978806.zip",
    readOn: "2026-10-23",
  },
  {
    id: "ustawa-otwarte-dane",
    name: "Ustawa z dnia 11 sierpnia 2021 r. o otwartych danych i ponownym wykorzystywaniu informacji sektora publicznego (tekst na api.sejm.gov.pl)",
    url: "https://api.sejm.gov.pl/eli/acts/DU/2021/1641/text.html",
    readOn: "2026-10-23",
  },
];

const byId = new Map(SOURCES.map((source) => [source.id, source]));

export function sourceById(id: string): SourceRef {
  const source = byId.get(id);
  if (!source) throw new Error(`Missing Poland source ${id}`);
  return source;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map((id) => sourceById(id));
}
