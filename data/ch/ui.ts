import type { ChLang } from "./types";

const FORMATTERS: Record<ChLang, Intl.NumberFormat> = {
  de: new Intl.NumberFormat("de-CH"),
  fr: new Intl.NumberFormat("fr-CH"),
  it: new Intl.NumberFormat("it-CH"),
  en: new Intl.NumberFormat("en-CH"),
};

export function formatNumber(value: number, lang: ChLang): string {
  return FORMATTERS[lang].format(value);
}

export const CH_LANGS_LABEL: Record<ChLang, string> = {
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  en: "English",
};

const UI = {
  de: {
    home: "Startseite",
    switzerland: "Schweiz",
    elections: "Wahlen",
    parties: "Parteien",
    candidates: "Kandidaturen",
    results: "Ergebnisse",
    faq: "Häufige Fragen",
    sources: "Quellen",
    cantons: "Kantone",
    population: "Bevölkerung",
    parliament: "Parlament",
    government: "Regierung",
    lastElection: "Letzte eidgenössische Wahl",
    nextElection: "Nächste eidgenössische Wahl",
    nationalCouncil: "Nationalrat",
    councilOfStates: "Ständerat",
    federalCouncil: "Bundesrat",
    seats: "Sitze",
    sourcesHeading: "Quellen",
    gap: "Lücke",
    readOn: "Gelesen am",
    alphaNearby: "Vorheriger und nächster Name im alphabetischen Index",
    parent: "Übergeordnete Seiten",
    unofficial: "Inoffizielle Information. Bestätigen Sie sie bei Ihrer offiziellen Wahlbehörde.",
    districts: "Bezirke im Gemeindeverzeichnis",
    districtGap:
      "Gemeindeseiten sind in dieser Ausgabe nicht veröffentlicht. Die Zahl der politischen Gemeinden steht im amtlichen Gemeindeverzeichnis.",
    candidateGap:
      "Für die Nationalratswahlen vom 24. Oktober 2027 lag am 17. Oktober 2026 keine offizielle Kandidatinnen- und Kandidatenliste vor, die diese Seite abdrucken könnte.",
    governmentGap:
      "Die Namen der amtierenden Kantonsregierung und die Sitzzahlen des Kantonsparlaments werden hier nicht abgedruckt. Am 17. Oktober 2026 war dafür kein einzelnes bundesamtliches Verzeichnis gelesen worden.",
    cantonalElectionGap:
      "Ein kantonales Wahldatum nach dem 17. Oktober 2026 wird hier nicht eingesetzt. Diese Seite sagt kein Datum voraus.",
    postcodeGap:
      "Eine Suche nach der vierstelligen Postleitzahl ist nicht angeschlossen. swisstopo veröffentlicht das amtliche Ortschaftenverzeichnis mit Postleitzahl; diese Ausgabe ordnet eine Postleitzahl keiner Gemeinde zu.",
  },
  fr: {
    home: "Accueil",
    switzerland: "Suisse",
    elections: "Élections",
    parties: "Partis",
    candidates: "Candidatures",
    results: "Résultats",
    faq: "Questions fréquentes",
    sources: "Sources",
    cantons: "Cantons",
    population: "Population",
    parliament: "Parlement",
    government: "Gouvernement",
    lastElection: "Dernière élection fédérale",
    nextElection: "Prochaine élection fédérale",
    nationalCouncil: "Conseil national",
    councilOfStates: "Conseil des États",
    federalCouncil: "Conseil fédéral",
    seats: "Sièges",
    sourcesHeading: "Sources",
    gap: "Lacune",
    readOn: "Lu le",
    alphaNearby: "Nom précédent et suivant dans l’index alphabétique",
    parent: "Pages supérieures",
    unofficial: "Information non officielle. Vérifiez-la auprès de votre autorité électorale officielle.",
    districts: "Districts dans le répertoire des communes",
    districtGap:
      "Les pages des communes ne sont pas publiées dans cette édition. Le chiffre des communes politiques figure dans le répertoire officiel des communes.",
    candidateGap:
      "Au 17 octobre 2026, aucune liste officielle de candidatures pour l’élection du Conseil national du 24 octobre 2027 n’avait été lue pour être reproduite ici.",
    governmentGap:
      "Les noms du gouvernement cantonal en fonction et le nombre de sièges du parlement cantonal ne sont pas reproduits. Aucun répertoire fédéral unique n’avait été lu à cette fin le 17 octobre 2026.",
    cantonalElectionGap:
      "Aucune date d’élection cantonale postérieure au 17 octobre 2026 n’est inscrite ici. Cette page ne prévoit pas de date.",
    postcodeGap:
      "La recherche par numéro postal à quatre chiffres n’est pas branchée. swisstopo publie le répertoire officiel des localités avec numéro postal; cette édition ne relie pas un numéro postal à une commune.",
  },
  it: {
    home: "Pagina iniziale",
    switzerland: "Svizzera",
    elections: "Elezioni",
    parties: "Partiti",
    candidates: "Candidature",
    results: "Risultati",
    faq: "Domande frequenti",
    sources: "Fonti",
    cantons: "Cantoni",
    population: "Popolazione",
    parliament: "Parlamento",
    government: "Governo",
    lastElection: "Ultima elezione federale",
    nextElection: "Prossima elezione federale",
    nationalCouncil: "Consiglio nazionale",
    councilOfStates: "Consiglio degli Stati",
    federalCouncil: "Consiglio federale",
    seats: "Seggi",
    sourcesHeading: "Fonti",
    gap: "Lacuna",
    readOn: "Lettura del",
    alphaNearby: "Nome precedente e successivo nell’indice alfabetico",
    parent: "Pagine superiori",
    unofficial: "Informazione non ufficiale. Confermatela presso l’ufficio elettorale ufficiale.",
    districts: "Distretti nel repertorio dei comuni",
    districtGap:
      "Le pagine dei comuni non sono pubblicate in questa edizione. La cifra dei comuni politici sta nel repertorio ufficiale dei comuni.",
    candidateGap:
      "Il 17 ottobre 2026 non era stata letta una lista ufficiale di candidature per l’elezione del Consiglio nazionale del 24 ottobre 2027 da riprodurre qui.",
    governmentGap:
      "I nomi del governo cantonale in carica e il numero di seggi del parlamento cantonale non sono riprodotti. Il 17 ottobre 2026 non era stato letto un unico repertorio federale a questo scopo.",
    cantonalElectionGap:
      "Qui non è indicata una data di elezione cantonale successiva al 17 ottobre 2026. Questa pagina non anticipa una data.",
    postcodeGap:
      "La ricerca per numero postale di quattro cifre non è collegata. swisstopo pubblica il repertorio ufficiale delle località con numero postale; questa edizione non associa un numero postale a un comune.",
  },
  en: {
    home: "Home",
    switzerland: "Switzerland",
    elections: "Elections",
    parties: "Parties",
    candidates: "Candidates",
    results: "Results",
    faq: "FAQ",
    sources: "Sources",
    cantons: "Cantons",
    population: "Population",
    parliament: "Parliament",
    government: "Government",
    lastElection: "Latest federal election",
    nextElection: "Next federal election",
    nationalCouncil: "National Council",
    councilOfStates: "Council of States",
    federalCouncil: "Federal Council",
    seats: "Seats",
    sourcesHeading: "Sources",
    gap: "Gap",
    readOn: "Read on",
    alphaNearby: "Previous and next names in the alphabetical index",
    parent: "Parent pages",
    unofficial: "Unofficial information. Confirm with your official election office.",
    districts: "Districts in the commune register",
    districtGap:
      "Municipality pages are not published in this release. The count of political municipalities is in the official commune register.",
    candidateGap:
      "No official candidacy list for the National Council election of 24 October 2027 had been read for reprinting on 17 October 2026.",
    governmentGap:
      "The names of the sitting cantonal government and the seat count of the cantonal parliament are not copied here. No single federal directory of those offices had been read for that purpose on 17 October 2026.",
    cantonalElectionGap:
      "No cantonal polling date after 17 October 2026 is printed here. This page does not forecast a date.",
    postcodeGap:
      "A four-digit postcode search is not wired up. swisstopo publishes the official index of towns with postcodes; this release does not match a postcode to a municipality.",
  },
} as const;

export function ui(lang: ChLang) {
  return UI[lang];
}

export function officeLabel(lang: ChLang): string {
  if (lang === "de") return "Bundeskanzlei";
  if (lang === "fr") return "Chancellerie fédérale";
  if (lang === "it") return "Cancelleria federale";
  return "Federal Chancellery";
}

/** Localized "last updated / unofficial information / report an error" strings for Swiss pages. */
const TRUST: Record<ChLang, { updated: string; before: string; link: string; after: string; report: string; search: string }> = {
  de: {
    updated: "Zuletzt aktualisiert",
    before: "Inoffizielle Information. Bestätigen Sie sie bei Ihrer ",
    link: "offiziellen Wahlbehörde",
    after: ".",
    report: "Fehler melden",
    search: "Suche",
  },
  fr: {
    updated: "Dernière mise à jour",
    before: "Information non officielle. Vérifiez-la auprès de votre ",
    link: "autorité électorale officielle",
    after: ".",
    report: "Signaler une erreur",
    search: "Recherche",
  },
  it: {
    updated: "Ultimo aggiornamento",
    before: "Informazione non ufficiale. Confermatela presso l’",
    link: "ufficio elettorale ufficiale",
    after: ".",
    report: "Segnala un errore",
    search: "Ricerca",
  },
  en: {
    updated: "Last updated",
    before: "Unofficial information. Confirm with your ",
    link: "official election office",
    after: ".",
    report: "Report an error",
    search: "Search",
  },
};

const DATE_LOCALE: Record<ChLang, string> = { de: "de-CH", fr: "fr-CH", it: "it-CH", en: "en-GB" };

export function trustCopy(lang: ChLang) {
  return TRUST[lang];
}

/** Formats an English site date such as "October 17, 2026" in the page language. */
export function localDate(value: string, lang: ChLang): string {
  const parsed = new Date(`${value} 12:00:00 UTC`);
  if (Number.isNaN(parsed.getTime())) return value;
  return new Intl.DateTimeFormat(DATE_LOCALE[lang], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed);
}
