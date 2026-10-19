import type { ItLang, UnitType } from "./types";

const EN = {
  home: "Home",
  italy: "Italy",
  elections: "Elections",
  parties: "Parties",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  regions: "Regions",
  population: "Resident population",
  parliament: "Parliament",
  government: "Government",
  lastElection: "Latest general election",
  nextElection: "Next general election",
  chamber: "Chamber of Deputies",
  senate: "Senate",
  sourcesHeading: "Sources",
  gap: "Gap",
  alphaNearby: "Previous and next names in the alphabetical index",
  readOn: "Read on",
  unofficial: "Unofficial information. Confirm with your official election office.",
  postcodeGap:
    "A postcode search is not wired up. Poste Italiane distributes CAP codes. The CAP Professional databank read on 17 October 2026 is a product for registered users, not an open national file added to this site. Five-digit queries are not matched to a municipality.",
  nextElectionGap:
    "No decree calling the next general election was read on 17 October 2026. Article 60 says the Chamber and the Senate are elected for five years. Article 61 says the next elections take place within seventy days of the end of the previous chambers, and the first sitting within twenty days of the election. This page does not turn those rules into a calendar day.",
  regionalElectionGap:
    "The date of the latest regional election, and any calling decree for the next one, were not copied onto this page. Eligendo and the Department for Internal and Territorial Affairs publish regional elections. This page does not forecast a polling day.",
  presidentGap:
    "The name of the regional president, the parties in the regional government, and the current size of the regional council are not copied here. The anagrafe of local and regional office-holders is the Interior Ministry list.",
  councilGap:
    "The name of the President of the Council of Ministers was not printed in the government pages read on 17 October 2026. It is not supplied from another source.",
  candidateGap:
    "Candidate profiles and proclaimed lists are not in this release.",
  subregionalGap:
    "Municipality pages in this chunk are linked from each territorial unit. Municipalities not listed there are not in this chunk.",
  resultsGap:
    "This page does not declare a winner, a majority, or a government. Figures below are copied from the cited archive page and stay unofficial here.",
};

const IT = {
  home: "Inizio",
  italy: "Italia",
  elections: "Elezioni",
  parties: "Partiti",
  results: "Risultati",
  faq: "Domande frequenti",
  sources: "Fonti",
  regions: "Regioni",
  population: "Popolazione residente",
  parliament: "Parlamento",
  government: "Governo",
  lastElection: "Ultima elezione politica",
  nextElection: "Prossima elezione politica",
  chamber: "Camera dei deputati",
  senate: "Senato della Repubblica",
  sourcesHeading: "Fonti",
  gap: "Lacuna",
  alphaNearby: "Nome precedente e successivo nell'indice alfabetico",
  readOn: "Lettura",
  unofficial: "Informazione non ufficiale. Confermarla con l'ufficio elettorale ufficiale.",
  postcodeGap:
    "La ricerca per CAP non è collegata. I codici di avviamento postale li distribuisce Poste Italiane. La banca dati CAP Professional, letta il 17 ottobre 2026, è un prodotto per utenti registrati, non un file nazionale aperto aggiunto a questo sito. Una query di cinque cifre non è abbinata a un comune.",
  nextElectionGap:
    "Il 17 ottobre 2026 non risulta letto un decreto che convochi le prossime elezioni politiche. L'articolo 60 dice che la Camera e il Senato sono eletti per cinque anni. L'articolo 61 dice che le elezioni delle nuove Camere hanno luogo entro settanta giorni dalla fine delle precedenti e che la prima riunione ha luogo non oltre il ventesimo giorno dalle elezioni. Questa pagina non converte quelle regole in un giorno di calendario.",
  regionalElectionGap:
    "La data dell'ultima elezione regionale, e un eventuale decreto di convocazione della successiva, non sono copiati in questa pagina. Eligendo e il Dipartimento per gli affari interni e territoriali pubblicano le elezioni regionali. Questa pagina non anticipa un giorno di votazione.",
  presidentGap:
    "Il nome di chi presiede la Regione, i partiti del governo regionale e la composizione attuale del consiglio non sono copiati qui. L'anagrafe degli amministratori locali e regionali è l'elenco del Ministero dell'interno.",
  councilGap:
    "Il nome del Presidente del Consiglio dei ministri non è stampato nelle pagine del Governo lette il 17 ottobre 2026. Non è ricavato da un'altra fonte.",
  candidateGap:
    "Le schede dei candidati e le liste proclamate non sono in questa consegna.",
  subregionalGap:
    "Le pagine dei comuni di questa consegna sono collegate da ogni unità territoriale. I comuni non elencati lì non sono in questo blocco.",
  resultsGap:
    "Questa pagina non dichiara un vincitore, una maggioranza o un governo. Le cifre sotto sono copiate dalla pagina d'archivio citata e qui restano non ufficiali.",
};

export function ui(lang: ItLang) {
  return lang === "it" ? IT : EN;
}

export function unitLabel(type: UnitType, lang: ItLang): string {
  const labels: Record<UnitType, { it: string; en: string }> = {
    "1": { it: "Provincia", en: "Province" },
    "2": { it: "Provincia autonoma", en: "Autonomous province" },
    "3": { it: "Città metropolitana", en: "Metropolitan city" },
    "4": { it: "Libero consorzio di comuni", en: "Free consortium of municipalities" },
    "5": { it: "Unità non amministrativa", en: "Non-administrative unit" },
  };
  return labels[type][lang];
}
