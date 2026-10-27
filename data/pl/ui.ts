import type { Lang } from "./types";

const EN = {
  home: "Home",
  poland: "Poland",
  elections: "Elections",
  results: "Results",
  voivodeships: "Voivodeships",
  sourcesHeading: "Sources",
  gap: "Gap",
  readOn: "Read on",
  parent: "Parent pages",
  alphaNearby: "Previous and next names in the alphabetical index",
  sejm: "Sejm",
  senate: "Senate",
  deputies: "Deputies in the annex",
  constituencies: "Sejm constituencies in the annex",
  lastElection: "Latest election on the cited list",
  nextElection: "Next election",
  government: "Offices",
  localGap:
    "Gmina pages from the 19 October 2026 TERC file are in this release. Candidate lists and wards are not.",
  gminaGap: "Gmina pages from the 19 October 2026 TERC file are linked from each powiat page and from the gmina index.",
  officeNameGap:
    "No official list read for this page names the starosta or the prezydent miasta. The name is not filled in from anywhere else.",
  officeholderGap:
    "The name of the marszałek województwa and the name of the wojewoda are not copied here. No official list of those officeholders was read for this page.",
  nextLocalGap:
    "No order setting the next sejmik election was read on 17 October 2026. This page does not turn the five-year term into a calendar day.",
  candidateGap:
    "Proclaimed candidate lists for the Sejm and Senate election in the 14 October to 12 November 2027 window are not on this page. No postanowienie of the President ordering that election was read on 17 October 2026.",
  postcodeGap:
    "A postcode search is not connected. Poczta Polska says the Oficjalny Spis PNA is supplied as a paid electronic file and that the file may not be redistributed. No official open postcode-to-gmina file was added. A query is not matched to a gmina.",
  populationGap:
    "This page does not print a population figure. No Statistics Poland table of population by voivodeship was among the pages read on 17 October 2026, so article 16(3) of the voivodeship act is not applied to a headcount.",
  unofficial: "Unofficial information. Confirm with your official election office.",
};

const PL: typeof EN = {
  home: "Strona główna",
  poland: "Polska",
  elections: "Wybory",
  results: "Wyniki",
  voivodeships: "Województwa",
  sourcesHeading: "Źródła",
  gap: "Luka",
  readOn: "Odczyt",
  parent: "Strony nadrzędne",
  alphaNearby: "Poprzednia i następna nazwa w indeksie alfabetycznym",
  sejm: "Sejm",
  senate: "Senat",
  deputies: "Posłowie w załączniku",
  constituencies: "Okręgi do Sejmu w załączniku",
  lastElection: "Ostatnie wybory w cytowanym obwieszczeniu",
  nextElection: "Następne wybory",
  government: "Urzędy",
  localGap:
    "Strony gmin z pliku TERC z 19 października 2026 r. są w tym wydaniu. List kandydatów i obwodów nie ma.",
  gminaGap: "Strony gmin z pliku TERC z 19 października 2026 r. są podlinkowane ze strony powiatu i z indeksu gmin.",
  officeNameGap:
    "Na potrzeby tej strony nie odczytano urzędowego wykazu, który podaje starostę albo prezydenta miasta. Nazwiska nie uzupełniono z innego miejsca.",
  officeholderGap:
    "Nazwiska marszałka województwa i wojewody nie są tu przepisane. Na potrzeby tej strony nie odczytano urzędowego wykazu tych osób.",
  nextLocalGap:
    "17 października 2026 r. nie odczytano zarządzenia wyznaczającego następne wybory do sejmiku. Ta strona nie zamienia pięcioletniej kadencji na dzień kalendarzowy.",
  candidateGap:
    "Na tej stronie nie ma list kandydatów zgłoszonych w wyborach do Sejmu i Senatu w oknie od 14 października do 12 listopada 2027 r. 17 października 2026 r. nie odczytano postanowienia Prezydenta zarządzającego te wybory.",
  postcodeGap:
    "Wyszukiwanie po kodzie pocztowym nie jest podłączone. Poczta Polska podaje, że Oficjalny Spis PNA udostępnia jako płatny plik elektroniczny i że pliku nie wolno redystrybuować. Nie dodano urzędowego otwartego pliku kod pocztowy–gmina. Zapytanie nie jest łączone z gminą.",
  populationGap:
    "Ta strona nie podaje liczby ludności. 17 października 2026 r. nie pobrano tablicy GUS z ludnością województw, więc art. 16 ust. 3 ustawy o samorządzie województwa nie jest tu stosowany do żadnej liczby mieszkańców.",
  unofficial: "Informacja nieoficjalna. Potwierdź ją w urzędowym organie wyborczym.",
};

export function ui(lang: Lang) {
  return lang === "pl" ? PL : EN;
}
