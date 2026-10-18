import type { DeLang } from "./types";

const EN = {
  home: "Home",
  germany: "Germany",
  elections: "Elections",
  parties: "Parties",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  lands: "Länder",
  parliament: "Parliament",
  government: "Government",
  nextElection: "Next election in the Bundesrat table",
  turnus: "Turnus in that table",
  sourcesHeading: "Sources",
  gap: "Gap",
  alphaNearby: "Previous and next names in the alphabetical index",
  population: "Population",
  officeholderGap:
    "The name of the head of this Land government, the parties in that government, and the current chamber’s seat totals are not copied here. The parliament and the government linked below publish them.",
  localGap:
    "Municipality pages are not in this release. No mayor is named on these pages.",
  kreiseHeading: "Kreise and district-free cities",
  wahlkreiseHeading: "Bundestag constituencies",
  candidateGap:
    "No candidacy for the 2029 Bundestag election was read on 17 October 2026. The Federal Returning Officer’s page says elections of the candidates themselves may be held from 26 November 2027 at the earliest. This page does not publish a candidate list.",
  postcodeGap:
    "A postcode search is not wired up. This release did not add an official postcode-to-municipality file.",
  resultNote:
    "The figures below are the final result the Federal Electoral Committee established on 14 March 2025. This page does not call a race and does not predict the 2029 election.",
  unofficial: "Unofficial information. Confirm with your official election office.",
};

const DE = {
  home: "Start",
  germany: "Deutschland",
  elections: "Wahlen",
  parties: "Parteien",
  results: "Ergebnis",
  faq: "Fragen",
  sources: "Quellen",
  lands: "Länder",
  parliament: "Parlament",
  government: "Regierung",
  nextElection: "Nächste Wahl in der Bundesratstabelle",
  turnus: "Turnus in dieser Tabelle",
  sourcesHeading: "Quellen",
  gap: "Lücke",
  alphaNearby: "Vorheriger und nächster Name im alphabetischen Index",
  population: "Bevölkerung",
  officeholderGap:
    "Der Name der Person an der Spitze dieser Landesregierung, die Parteien dieser Regierung und die Sitzzahlen der laufenden Wahlperiode stehen hier nicht. Parlament und Regierung, die unten verlinkt sind, veröffentlichen sie.",
  localGap:
    "Seiten für Gemeinden sind in dieser Ausgabe nicht enthalten. Kein Bürgermeistername steht auf diesen Seiten.",
  kreiseHeading: "Kreise und kreisfreie Städte",
  wahlkreiseHeading: "Bundestagswahlkreise",
  candidateGap:
    "Am 17. Oktober 2026 lag keine Bewerbung für die Bundestagswahl 2029 vor, die für diese Seite gelesen wurde. Die Seite der Bundeswahlleiterin sagt, dass die Wahlen der Bewerberinnen und Bewerber frühestens ab dem 26. November 2027 stattfinden dürfen. Diese Seite veröffentlicht keine Bewerberliste.",
  postcodeGap:
    "Eine Suche nach Postleitzahl ist nicht angeschlossen. Diese Ausgabe enthält keine amtliche Datei von Postleitzahl zu Gemeinde.",
  resultNote:
    "Die Zahlen unten sind das endgültige Ergebnis, das der Bundeswahlausschuss am 14. März 2025 festgestellt hat. Diese Seite ruft kein Wahlergebnis aus und sagt die Wahl 2029 nicht voraus.",
  unofficial: "Keine amtliche Information. Bitte bei der amtlichen Wahlbehörde prüfen.",
};

export function ui(lang: DeLang) {
  return lang === "de" ? DE : EN;
}
