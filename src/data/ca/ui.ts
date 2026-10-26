import type { CaLang } from "./types";

const EN = {
  home: "Home",
  canada: "Canada",
  elections: "Elections",
  parties: "Parties",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  regions: "Provinces and territories",
  population: "Population",
  commons: "House of Commons",
  senate: "Senate",
  nextElection: "Next election",
  lastResults: "Official voting results, 28 April 2025",
  currentStandings: "House standings read on 17 October 2026",
  sourcesHeading: "Sources",
  gap: "Gap",
  alphaNearby: "Previous and next names in the alphabetical index",
  parent: "Parent pages",
  readOn: "read",
  kindProvince: "Province",
  kindTerritory: "Territory",
  municipalityGap:
    "Mayors, reeves, and councillors are not copied. Incorporated municipalities from the SGC 2021 list are linked from census divisions in every province and territory. Where an official directory of those officeholders was read, the municipality page links it and does not copy names. Candidate lists are not on this page.",
  postcodeGap:
    "A postal-code search is not wired up. This release did not add an official open postal-code dataset. A postal-code query is not matched to a municipality.",
  candidateGap:
    "Candidate lists for the federal general election fixed for 15 October 2029 are not on this page. That election has not been called in the sources read on 17 October 2026.",
  nextGap:
    "No polling day for the next election of this legislature was printed on a page read for this release. This page does not forecast one.",
  senateGap:
    "The names of current senators are not copied here. The page that was read gives the constitutional distribution of 105 appointed seats, not a list of who holds them.",
  unofficial: "Unofficial information. Confirm with your official election office.",
};

const FR = {
  home: "Accueil",
  canada: "Canada",
  elections: "Élections",
  parties: "Partis",
  results: "Résultats",
  faq: "Questions fréquentes",
  sources: "Sources",
  regions: "Provinces et territoires",
  population: "Population",
  commons: "Chambre des communes",
  senate: "Sénat",
  nextElection: "Prochaine élection",
  lastResults: "Résultats officiels du scrutin, 28 avril 2025",
  currentStandings: "Position des partis lue le 17 octobre 2026",
  sourcesHeading: "Sources",
  gap: "Lacune",
  alphaNearby: "Nom précédent et suivant dans l’index alphabétique",
  parent: "Pages supérieures",
  readOn: "lecture",
  kindProvince: "Province",
  kindTerritory: "Territoire",
  municipalityGap:
    "Les maires, préfets et conseillers ne sont pas copiés. Les municipalités constituées de la liste de la CGT 2021 sont liées depuis les divisions de recensement de chaque province et territoire. Lorsqu’un répertoire officiel de ces titulaires a été lu, la page de la municipalité le lie et n’en copie pas les noms. Les listes de candidatures ne figurent pas sur cette page.",
  postcodeGap:
    "La recherche par code postal n’est pas branchée. Cette livraison n’ajoute pas un jeu de données ouvert et officiel de codes postaux. Une requête de code postal n’est pas appariée à une municipalité.",
  candidateGap:
    "Les listes de candidatures pour l’élection générale fédérale fixée au 15 octobre 2029 ne figurent pas sur cette page. Cette élection n’est pas convoquée dans les sources lues le 17 octobre 2026.",
  nextGap:
    "Aucun jour de scrutin pour la prochaine élection de cette assemblée n’était imprimé sur une page lue pour cette livraison. Cette page n’en prévoit pas.",
  senateGap:
    "Les noms des sénateurs actuels ne sont pas copiés ici. La page lue donne la répartition constitutionnelle de 105 sièges pourvus par nomination, pas la liste des titulaires.",
  unofficial: "Information non officielle. Confirmez-la auprès de votre bureau électoral officiel.",
};

export function ui(lang: CaLang) {
  return lang === "fr" ? FR : EN;
}
