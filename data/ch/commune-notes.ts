import type { ChLang } from "./types";

/**
 * Communal election and executive sentences for cantons added after the
 * Zürich, Bern / Berne, Vaud, Aargau and St. Gallen release.
 * Null from the helpers means the older sentence in the renderer stays.
 * Names of communal executives are not stored.
 */

const PRIOR = new Set(["ZH", "BE", "VD", "AG", "SG"]);
const ROOT_BFS = "1065";
const TI_2025 = new Set(["5073", "5079", "5395"]);

const GAP_ELECTION: Record<ChLang, string> = {
  de: "Ein letztes oder nächstes kommunales Wahldatum steht hier nicht. Die Termine setzt der Kanton. Sie sind kein Feld im historisierten Gemeindeverzeichnis, aus dem diese Seite den Namen und die BFS-Nummer nimmt.",
  fr: "Aucune date de dernière ou de prochaine élection communale n’est inscrite ici. Le canton fixe ces dates. Elles ne sont pas un champ du répertoire historisé dont cette page tire le nom et le numéro OFS.",
  it: "Qui non è indicata la data dell’ultima o della prossima elezione comunale. Le date le fissa il cantone. Non sono un campo del repertorio storicizzato da cui questa pagina ricava il nome e il numero UST.",
  en: "No last or next communal election date is printed here. The canton sets those dates. They are not a field in the historized commune register from which this page takes the name and the FSO number.",
};

const GAP_EXECUTIVE: Record<ChLang, string> = {
  de: "Der Gemeindevorstand (Gemeindepräsident, syndic, maire oder sindaco) wird nicht abgedruckt. Ein Name aus einem kantonalen oder kommunalen Verzeichnis wird auf dieser Seite nicht gespeichert.",
  fr: "L’exécutif communal (Gemeindepräsident, syndic, maire ou sindaco) n’est pas imprimé. Aucun nom tiré d’un répertoire cantonal ou communal n’est enregistré sur cette page.",
  it: "L’esecutivo comunale (Gemeindepräsident, syndic, maire o sindaco) non è stampato. Nessun nome tratto da un repertorio cantonale o comunale è registrato in questa pagina.",
  en: "The executive head (Gemeindepräsident, syndic, maire, or sindaco) is not printed. No name from a cantonal or communal directory is stored on this page.",
};

const GE_ELECTION: Record<ChLang, string> = {
  de: "Die Seite des Staates Genf «Elections municipales 2025 - dates importantes», gelesen am 25. Oktober 2026, setzt den 23. März 2025 für die Wahl der conseils municipaux und den ersten Wahlgang der Gemeindeexekutiven fest, und den 13. April 2025 für den zweiten Wahlgang der Exekutiven. Dieselbe Seite setzt den 2. Juni 2025 für die Einsetzungssitzung der conseils municipaux. Die erläuternde Notiz zu dieser Wahl nennt die Legislatur vom 1. Juni 2025 bis zum 31. Mai 2030. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "La page de l’État de Genève « Elections municipales 2025 - dates importantes », lue le 25 octobre 2026, fixe au 23 mars 2025 l’élection des conseils municipaux et le premier tour des exécutifs communaux, et au 13 avril 2025 le second tour des exécutifs. La même page fixe au 2 juin 2025 la séance d’installation des conseils municipaux. La notice explicative de ce scrutin dit que la législature court du 1er juin 2025 au 31 mai 2030. Aucune date communale ultérieure n’est inscrite ici.",
  it: "La pagina dello Stato di Ginevra «Elections municipales 2025 - dates importantes», letta il 25 ottobre 2026, fissa al 23 marzo 2025 l’elezione dei consigli municipali e il primo turno degli esecutivi comunali, e al 13 aprile 2025 il secondo turno degli esecutivi. La stessa pagina fissa al 2 giugno 2025 la seduta di insediamento dei consigli municipali. La nota esplicativa di quello scrutinio dice che la legislatura va dal 1° giugno 2025 al 31 maggio 2030. Qui non è indicata una data comunale successiva.",
  en: "The State of Geneva page “Elections municipales 2025 - dates importantes”, read on 25 October 2026, sets 23 March 2025 for the municipal-council election and the first round of the communal executives, and 13 April 2025 for the second round of the executives. The same page sets 2 June 2025 for the installation sitting of the municipal councils. The explanatory notice for that ballot says the legislature runs from 1 June 2025 to 31 May 2030. No later communal polling day is printed here.",
};

const GE_EXECUTIVE: Record<ChLang, string> = {
  de: "Die Gemeindeexekutive ist der conseil administratif. Ein Name wird nicht abgedruckt. Am 25. Oktober 2026 wurde kein Verzeichnis dieser Namen auf diese Seite übernommen.",
  fr: "L’exécutif communal est le conseil administratif. Aucun nom n’est imprimé. Le 25 octobre 2026, aucun répertoire de ces noms n’a été copié sur cette page.",
  it: "L’esecutivo comunale è il conseil administratif. Nessun nome è stampato. Il 25 ottobre 2026 nessun repertorio di questi nomi è stato copiato in questa pagina.",
  en: "The communal executive is the conseil administratif. No name is printed. On 25 October 2026 no directory of those names was copied onto this page.",
};

const LU_ELECTION: Record<ChLang, string> = {
  de: "Die Seite des Kantons Luzern «Kommunalwahlen 2024», gelesen am 25. Oktober 2026, hält fest, dass die Neuwahlen der Gemeindebehörden und Gemeindeparlamente für die Amtsdauer 2024–2028 am 28. April 2024 stattfanden. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "La page du canton de Lucerne « Kommunalwahlen 2024 », lue le 25 octobre 2026, écrit que le renouvellement des autorités communales et des parlements communaux pour la période 2024–2028 a eu lieu le 28 avril 2024. Aucune date communale ultérieure n’est inscrite ici.",
  it: "La pagina del Cantone di Lucerna «Kommunalwahlen 2024», letta il 25 ottobre 2026, scrive che il rinnovo delle autorità comunali e dei parlamenti comunali per il periodo 2024–2028 ha avuto luogo il 28 aprile 2024. Qui non è indicata una data comunale successiva.",
  en: "The Canton of Lucerne page “Kommunalwahlen 2024”, read on 25 October 2026, states that the renewal of the municipal authorities and municipal parliaments for the term 2024–2028 took place on 28 April 2024. No later communal polling day is printed here.",
};

const LU_ROOT: Record<ChLang, string> = {
  de: "Die Seite des Kantons Luzern «Kommunalwahlen 2024», gelesen am 25. Oktober 2026, nennt für die Neuwahlen des Gemeinderates der Einwohnergemeinde Root für die Amtsdauer 2025–2028 den 22. September 2024. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "La page du canton de Lucerne « Kommunalwahlen 2024 », lue le 25 octobre 2026, indique le 22 septembre 2024 pour le renouvellement du conseil communal de la commune d’habitants de Root pour la période 2025–2028. Aucune date communale ultérieure n’est inscrite ici.",
  it: "La pagina del Cantone di Lucerna «Kommunalwahlen 2024», letta il 25 ottobre 2026, indica il 22 settembre 2024 per il rinnovo del consiglio comunale del comune di Root per il periodo 2025–2028. Qui non è indicata una data comunale successiva.",
  en: "The Canton of Lucerne page “Kommunalwahlen 2024”, read on 25 October 2026, gives 22 September 2024 for the renewal of the municipal council of the commune of Root for the term 2025–2028. No later communal polling day is printed here.",
};

const LU_EXECUTIVE: Record<ChLang, string> = {
  de: "Die Gemeindeexekutive ist der Gemeinderat oder der Stadtrat. Die Kantonsseite bezeichnet diese Wahlen als kommunale Wahlen und verweist an die Wohngemeinde. Ein Name wird nicht abgedruckt.",
  fr: "L’exécutif communal est le Gemeinderat ou le Stadtrat. La page cantonale qualifie ces élections de communales et renvoie à la commune de domicile. Aucun nom n’est imprimé.",
  it: "L’esecutivo comunale è il Gemeinderat o lo Stadtrat. La pagina cantonale qualifica queste elezioni come comunali e rinvia al comune di domicilio. Nessun nome è stampato.",
  en: "The municipal executive is the Gemeinderat or the Stadtrat. The canton page calls these communal elections and points readers to their own commune. No name is printed.",
};

const TI_ELECTION: Record<ChLang, string> = {
  de: "Das Wahlarchiv der Staatskanzlei des Kantons Tessin, gelesen am 25. Oktober 2026, führt den 14. April 2024 für die Wahl des Municipio und des Consiglio comunale der Tessiner Gemeinden. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "Les archives électorales de la Chancellerie d’État du canton du Tessin, lues le 25 octobre 2026, indiquent le 14 avril 2024 pour l’élection du Municipio et du Consiglio comunale des communes tessinoises. Aucune date communale ultérieure n’est inscrite ici.",
  it: "L’archivio delle elezioni della Cancelleria dello Stato del Cantone Ticino, letto il 25 ottobre 2026, indica il 14 aprile 2024 per l’elezione del Municipio e del Consiglio comunale dei Comuni ticinesi. Qui non è indicata una data comunale successiva.",
  en: "The election archive of the Cantonal Chancellery of Ticino, read on 25 October 2026, lists 14 April 2024 for the election of the Municipio and the Consiglio comunale of the Ticino communes. No later communal polling day is printed here.",
};

const TI_2025_ELECTION: Record<ChLang, string> = {
  de: "Das Wahlarchiv der Staatskanzlei des Kantons Tessin, gelesen am 25. Oktober 2026, führt den 6. April 2025 für die Wahl des Municipio und des Consiglio comunale von Giornico, Lema und Quinto. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "Les archives électorales de la Chancellerie d’État du canton du Tessin, lues le 25 octobre 2026, indiquent le 6 avril 2025 pour l’élection du Municipio et du Consiglio comunale de Giornico, Lema et Quinto. Aucune date communale ultérieure n’est inscrite ici.",
  it: "L’archivio delle elezioni della Cancelleria dello Stato del Cantone Ticino, letto il 25 ottobre 2026, indica il 6 aprile 2025 per l’elezione del Municipio e del Consiglio comunale di Giornico, Lema e Quinto. Qui non è indicata una data comunale successiva.",
  en: "The election archive of the Cantonal Chancellery of Ticino, read on 25 October 2026, lists 6 April 2025 for the election of the Municipio and the Consiglio comunale of Giornico, Lema and Quinto. No later communal polling day is printed here.",
};

const TI_EXECUTIVE: Record<ChLang, string> = {
  de: "Die Gemeindeexekutive ist der Municipio, an ihrer Spitze der sindaco. Ein Name wird nicht abgedruckt.",
  fr: "L’exécutif communal est le Municipio, avec le sindaco à sa tête. Aucun nom n’est imprimé.",
  it: "L’esecutivo comunale è il Municipio, con il sindaco alla sua testa. Nessun nome è stampato.",
  en: "The communal executive is the Municipio, headed by the sindaco. No name is printed.",
};

const VS_ELECTION: Record<ChLang, string> = {
  de: "Der Beschluss des Staatsrats des Kantons Wallis vom 27. März 2024 über die Wahl der Gemeindebehörden für die Legislatur 2025–2028, gelesen am 25. Oktober 2026, setzt den 13. Oktober 2024 für den conseil municipal, mit einem zweiten Wahlgang im Majorz am 3. November 2024, und den 10. November 2024 für einen conseil général, wo die Gemeinde einen hat. Er setzt den 10. November 2024 für die Präsidentin oder den Präsidenten und die Vizepräsidentin oder den Vizepräsidenten, mit einem zweiten Wahlgang am 24. November 2024. Wo der conseil municipal selbst einen zweiten Wahlgang im Majorz braucht, verschiebt der Beschluss diese Wahl auf den 24. November 2024 und einen weiteren Wahlgang auf den 8. Dezember 2024. Das historisierte Gemeindeverzeichnis sagt nicht, welches dieser Daten hier galt. Ein späteres kommunales Wahldatum steht hier nicht.",
  fr: "L’arrêté du Conseil d’État du canton du Valais du 27 mars 2024 concernant l’élection des autorités communales pour la législature 2025–2028, lu le 25 octobre 2026, fixe au 13 octobre 2024 l’élection du conseil municipal, avec un second tour majoritaire le 3 novembre 2024, et au 10 novembre 2024 celle d’un conseil général là où la commune en a un. Il fixe au 10 novembre 2024 l’élection du président et du vice-président, avec un second tour le 24 novembre 2024. Là où le conseil municipal lui-même exige un second tour majoritaire, l’arrêté reporte cette élection au 24 novembre 2024 et un tour suivant au 8 décembre 2024. Le répertoire historisé des communes ne dit pas laquelle de ces dates a valu ici. Aucune date communale ultérieure n’est inscrite ici.",
  it: "Il decreto del Consiglio di Stato del Cantone Vallese del 27 marzo 2024 sull’elezione delle autorità comunali per la legislatura 2025–2028, letto il 25 ottobre 2026, fissa al 13 ottobre 2024 l’elezione del conseil municipal, con un secondo turno maggioritario il 3 novembre 2024, e al 10 novembre 2024 quella di un conseil général dove il comune ne ha uno. Fissa al 10 novembre 2024 l’elezione del presidente e del vicepresidente, con un secondo turno il 24 novembre 2024. Dove il conseil municipal stesso richiede un secondo turno maggioritario, il decreto sposta questa elezione al 24 novembre 2024 e un turno ulteriore all’8 dicembre 2024. Il repertorio storicizzato dei comuni non dice quale di queste date sia valsa qui. Qui non è indicata una data comunale successiva.",
  en: "The Council of State decree of the canton of Valais of 27 March 2024 on the election of the communal authorities for the legislature 2025–2028, read on 25 October 2026, sets 13 October 2024 for the conseil municipal, with a majoritarian second round on 3 November 2024, and 10 November 2024 for a conseil général where the commune has one. It sets 10 November 2024 for the president and vice-president, with a second round on 24 November 2024. Where the conseil municipal itself needs a majoritarian second round, the decree moves that election to 24 November 2024 and a further round to 8 December 2024. The historized commune register does not say which of these dates applied here. No later communal polling day is printed here.",
};

const VS_EXECUTIVE: Record<ChLang, string> = {
  de: "Der Kanton Wallis veröffentlicht die Präsidentinnen und Präsidenten sowie die Vizepräsidentinnen und Vizepräsidenten der Gemeinden auf einer Kantonsseite. Diese Namen werden hier nicht übernommen. Die Seite:",
  fr: "Le canton du Valais publie les présidentes et présidents ainsi que les vice-présidentes et vice-présidents des communes sur une page cantonale. Ces noms ne sont pas repris ici. La page :",
  it: "Il Cantone Vallese pubblica le presidentesse e i presidenti nonché le vicepresidentesse e i vicepresidenti dei comuni su una pagina cantonale. Questi nomi non sono ripresi qui. La pagina:",
  en: "The canton of Valais publishes the presidents and vice-presidents of the communes on a cantonal page. Those names are not copied here. The page:",
};

export function communeRegisterRead(canton: string): "2026-10-19" | "2026-10-25" {
  return PRIOR.has(canton) ? "2026-10-19" : "2026-10-25";
}

export function extraCommuneSourceIds(canton: string): string[] {
  if (canton === "GE") return ["ge-muni-2025", "ge-notice-20250323"];
  if (canton === "LU") return ["lu-kom-2024"];
  if (canton === "TI") return ["ti-archivio"];
  if (canton === "VS") return ["vs-ace-2024", "vs-presidents"];
  return [];
}

export function communeElectionNote(canton: string, bfs: string, lang: ChLang): string | null {
  if (PRIOR.has(canton)) return null;
  if (canton === "GE") return GE_ELECTION[lang];
  if (canton === "LU") return bfs === ROOT_BFS ? LU_ROOT[lang] : LU_ELECTION[lang];
  if (canton === "TI") return TI_2025.has(bfs) ? TI_2025_ELECTION[lang] : TI_ELECTION[lang];
  if (canton === "VS") return VS_ELECTION[lang];
  return GAP_ELECTION[lang];
}

export function communeExecutiveNote(canton: string, lang: ChLang): string | null {
  if (PRIOR.has(canton)) return null;
  if (canton === "GE") return GE_EXECUTIVE[lang];
  if (canton === "LU") return LU_EXECUTIVE[lang];
  if (canton === "TI") return TI_EXECUTIVE[lang];
  if (canton === "VS") return VS_EXECUTIVE[lang];
  return GAP_EXECUTIVE[lang];
}

export function executiveDirectoryLink(canton: string): { href: string; label: string } | null {
  if (canton !== "VS") return null;
  return { href: "https://www.vs.ch/web/communes/president-vice-president", label: "vs.ch" };
}
