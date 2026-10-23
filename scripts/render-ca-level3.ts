import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { DIVISIONS, divisionName } from "../src/data/ca/level2";
import {
  CSD_TYPE_LABEL,
  LEGISLATURE,
  MUNICIPALITIES,
  municipalityName,
  municipalityNeighbors,
  municipalitiesIn,
  seatNeighbors,
  seatsIn,
  type LegislatureSeat,
  type Municipality,
} from "../src/data/ca/level3";
import {
  divisionPath,
  legislatureIndexPath,
  legislaturePath,
  municipalityIndexPath,
  municipalityPath,
  regionPath,
} from "../src/data/ca/paths";
import { regionBySlug, regionName } from "../src/data/ca/places";
import { sourcesById } from "../src/data/ca/sources";
import type { CaLang } from "../src/data/ca/types";
import { ui } from "../src/data/ca/ui";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.elections.ca/";
const STATCAN =
  "Adapted from Statistics Canada, Standard Geographical Classification (SGC) 2021, structure file, reference date 2021, and from the 2021 Census digital boundary file attribute table and Dictionary table 1.5. This does not constitute an endorsement by Statistics Canada of this product.";
const STATCAN_FR =
  "Adapté de Statistique Canada, Classification géographique type (CGT) 2021, fichier de structure, date de référence 2021, ainsi que de la table d’attributs du fichier numérique des limites du Recensement de 2021 et du tableau 1.5 du dictionnaire. Ceci ne constitue pas une approbation de ce produit par Statistique Canada.";

const SEAT_SOURCES: Record<string, readonly string[]> = {
  ontario: ["on-mpp"],
  quebec: ["qc-deputes", "qc-circonscriptions-2026"],
  "british-columbia": ["bc-ed-codes", "bc-leg-find", "bc-2026"],
  alberta: ["ab-mla"],
  manitoba: ["mb-mla"],
  saskatchewan: ["sk-mla"],
  "nova-scotia": ["ns-mla"],
  "prince-edward-island": ["pei-mla"],
  nunavut: ["nu-mla"],
};

const MUNI_SOURCES: Record<string, readonly string[]> = {
  ontario: ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "on-mea"],
  quebec: ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "qc-muni-act"],
  "british-columbia": ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "bc-lga-52"],
  alberta: ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "ab-laea", "ab-muni-next"],
};

const DIVISION_BY_CODE = new Map(DIVISIONS.map((division) => [division.code, division]));

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function crumbNav(crumbs: { name: string; path: string }[]): string {
  return crumbs
    .map((item, index) =>
      index === crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
}

function jsonLd(crumbs: { name: string; path: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
}

const SHORT_SOURCE: Record<string, string> = {
  "on-mpp": "Legislative Assembly of Ontario, current MPPs",
  "qc-deputes": "Assemblée nationale du Québec, députés en fonction",
  "qc-circonscriptions-2026": "Élections Québec, liste des circonscriptions 2026",
  "bc-ed-codes": "Elections BC, 2023 electoral district codes",
  "bc-leg-find": "Legislative Assembly of British Columbia, Find MLA by Constituency",
  "bc-2026": "Elections BC, 2026 provincial election",
  "ab-mla": "Legislative Assembly of Alberta, members",
  "mb-mla": "Legislative Assembly of Manitoba, MLA alphabetical list",
  "sk-mla": "Legislative Assembly of Saskatchewan, members",
  "ns-mla": "Nova Scotia Legislature, MLAs",
  "pei-mla": "Legislative Assembly of Prince Edward Island, members",
  "nu-mla": "Legislative Assembly of Nunavut, members",
  "sgc-2021-en": "SGC 2021 structure file, English",
  "sgc-2021-fr": "CGT 2021, fichier de structure, français",
  "sgc-csd-dict": "Census dictionary, table 1.5",
  "sgc-csd-def": "Census dictionary, census subdivision",
  "csd-boundary-2021": "2021 digital boundary file, subdivision attributes",
  "statcan-licence": "Statistics Canada Open Licence",
  "on-mea": "Municipal Elections Act, 1996",
  "qc-muni-act": "Loi sur les élections et les référendums dans les municipalités, art. 1 à 3",
  "bc-lga-52": "Local Government Act, s. 52",
  "ab-laea": "Local Authorities Election Act, ss. 10–12",
  "ab-muni-next": "Alberta.ca, municipal elections overview",
};

function sourceList(lang: CaLang, ids: readonly string[]): string {
  const copy = ui(lang);
  return sourcesById([...ids])
    .map((source) => {
      const label = SHORT_SOURCE[source.id] ?? source.name;
      return `<li><a href="${esc(source.url)}">${esc(label)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}</li>`;
    })
    .join("");
}

function shell(input: {
  lang: CaLang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const { lang, path, title, description, crumbs, body } = input;
  const other: CaLang = lang === "fr" ? "en" : "fr";
  const otherPath = path.replace(/\/ca\/(en|fr)\//, `/ca/${other}/`);
  const enPath = lang === "en" ? path : otherPath;
  const frPath = lang === "fr" ? path : otherPath;
  const canonical = absoluteUrl(path);
  const pageTitle = `${title} · ${SITE.name}`;
  const banner =
    lang === "fr"
      ? `Information non officielle. Confirmez-la auprès de votre <a href="${OFFICE}">bureau électoral officiel</a>.`
      : SITE.officialNotUs.replace("official election office", `<a href="${OFFICE}">official election office</a>`);
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="fr" href="${esc(absoluteUrl(frPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang === "fr" ? "fr_CA" : "en_CA"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd(crumbs)}</script>
${ADSENSE_HEAD_TAGS}
</head>
<body>
<p class="banner">${banner}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="/ca/${lang}/">Canada</a> · <a href="/search/">${lang === "fr" ? "Recherche" : "Search"}</a> · <a href="${esc(otherPath)}">${lang === "fr" ? "English" : "Français"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav(crumbs)}</nav>
${body}
</main>
${withLegalFooter(`© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.`)}
</body>
</html>
`;
}

function nearLine(lang: CaLang, prev?: { name: string; path: string }, next?: { name: string; path: string }): string {
  const copy = ui(lang);
  const parts: string[] = [];
  if (prev) parts.push(`<a href="${esc(prev.path)}">${esc(prev.name)}</a>`);
  if (next) parts.push(`<a href="${esc(next.path)}">${esc(next.name)}</a>`);
  return parts.length ? `${esc(copy.alphaNearby)}: ${parts.join(" · ")}` : "";
}

function seatMember(seat: LegislatureSeat, lang: CaLang): string {
  const fr = lang === "fr";
  if (seat.gap === "dissolved") {
    return fr
      ? "La page « Find MLA by Constituency » de l’Assemblée législative, lue le 19 octobre 2026, dit que la 43e législature a été dissoute le 22 septembre 2026 et qu’une élection générale provinciale aura lieu le 24 octobre 2026. Cette page ne nomme pas de député actuel et ne publie pas de décompte."
      : "The Legislative Assembly page “Find MLA by Constituency”, read on 19 October 2026, says the 43rd Parliament was dissolved on 22 September 2026 and a provincial general election will be held on 24 October 2026. This page does not name a current member and does not publish a count.";
  }
  if (seat.gap === "recount") {
    return fr
      ? `La liste des députés en fonction ne contient pas ${seat.name}. La même page dit qu’un dépouillement judiciaire est en cours dans Vachon et qu’une demande de dépouillement judiciaire a été déposée dans Champlain. Cette page n’attribue pas de parti à cette circonscription et ne publie pas de décompte.`
      : `The list of members in office does not include ${seat.name}. The same page says a judicial count is underway in Vachon and that a request for a judicial count has been filed in Champlain. This page does not assign a party to this district and does not publish a count.`;
  }
  if (!seat.member) throw new Error(`Missing member for ${seat.region}/${seat.name}`);
  if (seat.region === "nunavut") {
    return fr
      ? `La liste des membres nomme ${seat.member} pour cette circonscription. Cette ligne n’imprime pas de parti.`
      : `The member list names ${seat.member} for this constituency. That row does not print a party.`;
  }
  if (seat.region === "alberta") {
    return fr
      ? `Le tableau des membres nomme ${seat.member}. La cellule du caucus imprime « ${seat.party} ». La page ne développe pas cette abréviation.`
      : `The members table names ${seat.member}. The caucus cell prints “${seat.party}”. The page does not spell out that abbreviation.`;
  }
  if (seat.region === "manitoba") {
    return fr
      ? `La liste alphabétique nomme ${seat.member}. La cellule du parti imprime « ${seat.party} ». La légende de la même page imprime « NDP - New Democratic Party », « PC - Progressive Conservative Party », « LIB - Liberal Party » et « IND - Independent ».`
      : `The alphabetical list names ${seat.member}. The party cell prints “${seat.party}”. The legend on the same page prints “NDP - New Democratic Party”, “PC - Progressive Conservative Party”, “LIB - Liberal Party”, and “IND - Independent”.`;
  }
  return fr
    ? `La liste officielle nomme ${seat.member}, ${seat.party}.`
    : `The official list names ${seat.member}, ${seat.party}.`;
}

function seatPage(lang: CaLang, seat: LegislatureSeat): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const region = regionBySlug(seat.region);
  if (!region) throw new Error(seat.region);
  const path = legislaturePath(lang, seat.region, seat.slug);
  const regionHref = regionPath(lang, seat.region);
  const regionLabel = regionName(region, lang);
  const neighbors = seatNeighbors(seat, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name: seat.name, path },
  ];
  const nameNote = fr
    ? seat.region === "quebec"
      ? "Ce nom est celui de la liste 2026 d’Élections Québec. Ce fichier n’ajoute pas une traduction anglaise."
      : "Ce nom est celui de la liste anglaise lue le 19 octobre 2026. Une liste française de ces noms n’a pas été lue."
    : seat.region === "quebec"
      ? "This name is the one in the Élections Québec 2026 list. That file does not add an English translation."
      : "This name is the one on the English list read on 19 October 2026. A French list of these names was not read.";
  const quiet = fr
    ? "Cette page ne publie pas de décompte, de projection ni de liste de candidatures. Les coordonnées personnelles, les photographies et les adresses ne sont pas copiées."
    : "This page does not publish a count, a projection, or a candidate list. Personal contact details, photographs, and addresses are not copied.";
  const near = nearLine(
    lang,
    neighbors.prev ? { name: neighbors.prev.name, path: legislaturePath(lang, neighbors.prev.region, neighbors.prev.slug) } : undefined,
    neighbors.next ? { name: neighbors.next.name, path: legislaturePath(lang, neighbors.next.region, neighbors.next.slug) } : undefined,
  );
  const codeRow = seat.code
    ? `<tr><th>${fr ? "Code" : "Code"}</th><td>${esc(seat.code)}</td></tr>`
    : "";
  const body = `<p class="eyebrow">${fr ? "Circonscription de l’assemblée législative" : "Legislative assembly district"}</p>
<h1>${esc(seat.name)}</h1>
<p><strong>${fr ? "Lecture du 19 octobre 2026." : "Read on 19 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<table>
<tr><th>${region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}</th><td><a href="${esc(regionHref)}">${esc(regionLabel)}</a></td></tr>
${codeRow}
</table>
<p>${esc(nameNote)}</p>
<h2>${fr ? "Membre actuel" : "Current member"}</h2>
<p>${esc(seatMember(seat, lang))}</p>
<p>${esc(quiet)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionHref)}">${esc(regionLabel)}</a> · <a href="${esc(legislatureIndexPath(lang, seat.region))}">${fr ? "Index de l’assemblée" : "Legislature index"}</a>. ${near}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, SEAT_SOURCES[seat.region])}</ul>`;
  const description = fr
    ? `${seat.name}, circonscription de l’assemblée en ${regionLabel}. Information non officielle.`
    : `${seat.name}, legislative assembly district in ${regionLabel}. Unofficial information.`;
  return shell({ lang, path, title: seat.name, description, crumbs, body });
}

function seatIndex(lang: CaLang, regionSlug: string): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const region = regionBySlug(regionSlug);
  if (!region) throw new Error(regionSlug);
  const path = legislatureIndexPath(lang, regionSlug);
  const regionHref = regionPath(lang, regionSlug);
  const regionLabel = regionName(region, lang);
  const seats = seatsIn(regionSlug, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name: fr ? "Assemblée" : "Legislature", path },
  ];
  const items = seats
    .map((seat) => `<li><a href="${esc(legislaturePath(lang, regionSlug, seat.slug))}">${esc(seat.name)}</a></li>`)
    .join("");
  const note =
    regionSlug === "ontario"
      ? fr
        ? "La page des députés actuels imprime « Total seats: 124 », puis 79, 27, 14, 2 et 2 à côté des noms de parti imprimés sur cette page. Le tableau Nom, Parti, Circonscription compte 124 circonscriptions distinctes."
        : "The current-members page prints “Total seats: 124”, then 79, 27, 14, 2 and 2 beside the party names printed on that page. The Name, Party, Riding table has 124 distinct ridings."
      : regionSlug === "quebec"
        ? fr
          ? "Élections Québec publie 127 noms. La page de l’Assemblée dit que l’Assemblée est composée de 127 personnes et que la dernière élection générale a eu lieu le 5 octobre 2026. Sa liste de composition imprime Parti québécois 59, Parti libéral du Québec 40, Parti conservateur du Québec 19, et, sous Indépendants, Québec solidaire 9. Le tableau des députés en fonction compte 125 personnes : Parti québécois 59, Parti libéral du Québec 39, Parti conservateur du Québec 18, Québec solidaire 9. Vachon et Champlain n’y figurent pas."
          : "Élections Québec publishes 127 names. The Assembly page says the Assembly is composed of 127 people and that the last general election was 5 October 2026. Its composition list prints Parti québécois 59, Parti libéral du Québec 40, Parti conservateur du Québec 19, and, under Indépendants, Québec solidaire 9. The members-in-office table has 125 people: Parti québécois 59, Parti libéral du Québec 39, Parti conservateur du Québec 18, Québec solidaire 9. Vachon and Champlain are not in that table."
        : regionSlug === "british-columbia"
          ? fr
            ? "Le fichier des codes d’Elections BC compte 93 noms et 93 codes. L’Assemblée dit que la 43e législature a été dissoute le 22 septembre 2026 et qu’une élection générale aura lieu le 24 octobre 2026. Aucun député actuel n’est nommé ici."
            : "The Elections BC codes file has 93 names and 93 codes. The Assembly says the 43rd Parliament was dissolved on 22 September 2026 and a general election will be held on 24 October 2026. No current member is named here."
          : "";
  const body = `<p class="eyebrow">${regionLabel}</p>
<h1>${fr ? "Circonscriptions de l’assemblée" : "Legislative assembly districts"}</h1>
<p><strong>${fr ? "Lecture du 19 octobre 2026." : "Read on 19 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<p>${esc(fr ? `${seats.length} circonscriptions.` : `${seats.length} districts.`)} ${esc(note)}</p>
<ul>${items}</ul>
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionHref)}">${esc(regionLabel)}</a></p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, SEAT_SOURCES[regionSlug])}</ul>`;
  const description = fr
    ? `Index des circonscriptions de l’assemblée en ${regionLabel}. Information non officielle.`
    : `Index of legislative assembly districts in ${regionLabel}. Unofficial information.`;
  return shell({
    lang,
    path,
    title: fr ? `Assemblée, ${regionLabel}` : `Legislature, ${regionLabel}`,
    description,
    crumbs,
    body,
  });
}

function localElection(place: Municipality, lang: CaLang): string {
  const fr = lang === "fr";
  if (place.region === "ontario") {
    return fr
      ? "La Loi de 1996 sur les élections municipales, article 4, prévoit une élection ordinaire en 2006 et tous les quatre ans. L’article 5 fixe le jour du scrutin au quatrième lundi d’octobre, sous réserve de l’article 10. En 2022, ce lundi est le 24 octobre. En 2026, ce lundi est le 26 octobre. L’article 10 reporte un délai qui tombe un samedi ou un jour férié. L’article 10.1 vise certaines mises en candidature de 2026. Cette page ne publie pas de décompte ni de liste de candidatures."
      : "The Municipal Elections Act, 1996, section 4, provides a regular election in 2006 and every fourth year. Section 5 sets voting day as the fourth Monday in October, subject to section 10. In 2022 that Monday is 24 October. In 2026 that Monday is 26 October. Section 10 moves a deadline that falls on a Saturday or a holiday. Section 10.1 concerns some 2026 nominations. This page does not publish a count or a candidate list.";
  }
  if (place.region === "quebec") {
    if (place.type === "VC" || place.type === "VK" || place.type === "VN") {
      return fr
        ? "L’article 1 de la Loi sur les élections et les référendums dans les municipalités dit que ce titre ne s’applique pas à un village nordique, cri ou naskapi. Cette page n’applique donc pas les articles 2 et 3 à cette subdivision. Elle ne publie pas de décompte et ne nomme pas de maire."
        : "Section 1 of the Act respecting elections and referendums in municipalities says that title does not apply to a northern, Cree, or Naskapi village. This page therefore does not apply sections 2 and 3 to this subdivision. It does not publish a count and does not name a mayor.";
    }
    return fr
      ? "Les articles 2 et 3 prévoient une élection à tous les postes du conseil tous les quatre ans, le premier dimanche de novembre. L’article 1 exclut une municipalité régionale de comté, un village nordique, cri ou naskapi, et un conseil non élu. Le texte lu le 19 octobre 2026 ne nomme pas l’année du cycle, donc aucune date civile n’est imprimée. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "Sections 2 and 3 provide an election for every council seat every four years, on the first Sunday of November. Section 1 excludes a regional county municipality, a northern, Cree or Naskapi village, and a council that is not elected. The text read on 19 October 2026 does not name the year of the cycle, so no calendar date is printed. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "british-columbia") {
    if (place.code === "5915022") {
      return fr
        ? "Cette subdivision est la City of Vancouver. L’article 57 de la Local Government Act mentionne séparément la City of Vancouver. La Vancouver Charter n’a pas été lue, donc cette page n’énonce pas le jour de scrutin de Vancouver. Elle ne publie pas de décompte et ne nomme pas de maire."
        : "This subdivision is the City of Vancouver. Section 57 of the Local Government Act refers separately to the City of Vancouver. The Vancouver Charter was not read, so this page does not state Vancouver’s voting day. It does not publish a count and does not name a mayor.";
    }
    return fr
      ? "L’article 52 de la Local Government Act, à jour au 6 octobre 2026, dit qu’une élection locale générale du maire et de tous les conseillers de chaque municipalité a lieu en 2014 et tous les quatre ans par la suite, et que le jour de scrutin général est le troisième samedi d’octobre de l’année de l’élection. En octobre 2026, les samedis tombent les 3, 10, 17, 24 et 31, donc le troisième samedi est le 17 octobre 2026. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "Section 52 of the Local Government Act, current to 6 October 2026, says a general local election for the mayor and all councillors of each municipality is held in 2014 and every fourth year after that, and that general voting day is the third Saturday of October in the year of the election. In October 2026 the Saturdays fall on the 3rd, 10th, 17th, 24th and 31st, so the third Saturday is 17 October 2026. This page does not publish a count and does not name a mayor.";
  }
  if (place.type === "SV") {
    return fr
      ? "L’article 12 de la Local Authorities Election Act dit que, pour un summer village, le jour du scrutin d’une élection générale du conseil est quatre semaines après le jour que le conseil fixe pour la réception des mises en candidature. Cette page n’imprime pas de date civile pour cette règle. Elle ne publie pas de décompte et ne nomme pas de maire."
      : "Section 12 of the Local Authorities Election Act says that, for a summer village, election day for a general election of council is four weeks after the day the council sets for receiving nominations. This page does not print a calendar date for that rule. It does not publish a count and does not name a mayor.";
  }
  return fr
    ? "L’article 10 de la Local Authorities Election Act dit qu’à compter de 2013 une élection générale a lieu tous les quatre ans. L’article 11 dit que le jour du scrutin d’une élection générale est le troisième lundi d’octobre, sauf si un règlement adopté avant le 30 juin de l’année de l’élection le déplace au samedi qui précède immédiatement ce lundi. Ce règlement est sans effet l’année où une élection sénatoriale ou un référendum a lieu en même temps. La codification lue est à jour au 18 décembre 2025. La page alberta.ca sur les élections municipales, lue le 19 octobre 2026, dit que la prochaine élection générale municipale aura lieu le 15 octobre 2029. Octobre 2029 commence un lundi, donc le troisième lundi est le 15 octobre 2029. Cette page n’a pas lu de règlement qui déplace le jour. Elle ne publie pas de décompte et ne nomme pas de maire ni de préfet."
    : "Section 10 of the Local Authorities Election Act says that, commencing in 2013, a general election is held every 4th year. Section 11 says election day for a general election is the 3rd Monday in October, unless a bylaw passed before 30 June of the election year moves it to the Saturday immediately before that Monday. That bylaw has no effect in a year when a Senate election or a referendum is held at the same time. The consolidation that was read is current to 18 December 2025. The alberta.ca municipal-elections page, read on 19 October 2026, says the next municipal general election will be held on 15 October 2029. October 2029 begins on a Monday, so the third Monday is 15 October 2029. This page did not read a bylaw moving the day. It does not publish a count and does not name a mayor or reeve.";
}

function municipalityPage(lang: CaLang, place: Municipality): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const region = regionBySlug(place.region);
  const division = DIVISION_BY_CODE.get(place.cd);
  if (!region || !division) throw new Error(place.code);
  const path = municipalityPath(lang, place.region, division.slug, place.slug);
  const name = municipalityName(place, lang);
  const other = municipalityName(place, fr ? "en" : "fr");
  const regionHref = regionPath(lang, place.region);
  const regionLabel = regionName(region, lang);
  const divisionHref = divisionPath(lang, place.region, division.slug);
  const divisionLabel = divisionName(division, lang);
  const neighbors = municipalityNeighbors(place, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name: divisionLabel, path: divisionHref },
    { name, path },
  ];
  const boundary = place.boundary
    ? fr
      ? `Le fichier numérique des limites imprime « ${place.boundary} » dans CSDNAME. Le titre de classe anglais de la CGT est « ${place.nameEn} ».`
      : `The digital boundary file prints “${place.boundary}” in CSDNAME. The English SGC class title is “${place.nameEn}”.`
    : fr
      ? "Le titre de classe de la CGT et CSDNAME du fichier de limites impriment le même nom anglais."
      : "The SGC class title and the boundary file’s CSDNAME print the same English name.";
  const office = fr
    ? "Aucun maire, préfet ou conseil n’est copié. Aucun répertoire provincial de ces titulaires n’a été lu. Ce n’est pas publié de façon centrale dans les sources de cette page."
    : "No mayor, reeve, or council is copied. No provincial directory of those officeholders was read. That is not published centrally in the sources for this page.";
  const mapped = fr
    ? "Aucune correspondance officielle entre cette subdivision et une circonscription fédérale ou provinciale n’a été lue. Cette page n’en construit pas une à partir d’une carte."
    : "No official correspondence between this subdivision and a federal or provincial electoral district was read. This page does not build one from a map.";
  const near = nearLine(
    lang,
    neighbors.prev
      ? {
          name: municipalityName(neighbors.prev, lang),
          path: municipalityPath(lang, neighbors.prev.region, division.slug, neighbors.prev.slug),
        }
      : undefined,
    neighbors.next
      ? {
          name: municipalityName(neighbors.next, lang),
          path: municipalityPath(lang, neighbors.next.region, division.slug, neighbors.next.slug),
        }
      : undefined,
  );
  const body = `<p class="eyebrow">${esc(CSD_TYPE_LABEL[place.type])}</p>
<h1>${esc(name)}</h1>
<p class="lede">${fr ? "Autre titre de classe" : "Other class title"}: ${esc(other)}</p>
<p><strong>${fr ? "Lecture du 19 octobre 2026." : "Read on 19 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<table>
<tr><th>${fr ? "Code CGT" : "SGC code"}</th><td>${esc(place.code)}</td></tr>
<tr><th>${fr ? "Type" : "Type"}</th><td>${esc(CSD_TYPE_LABEL[place.type])}</td></tr>
<tr><th>${fr ? "Division de recensement" : "Census division"}</th><td><a href="${esc(divisionHref)}">${esc(divisionLabel)}</a> (${esc(place.cd)})</td></tr>
<tr><th>${region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}</th><td><a href="${esc(regionHref)}">${esc(regionLabel)}</a></td></tr>
</table>
<p>${esc(boundary)}</p>
<h2>${fr ? "Conseil" : "Council"}</h2>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(office)}</p>
<h2>${fr ? "Élection municipale" : "Municipal election"}</h2>
<p>${esc(localElection(place, lang))}</p>
<h2>${fr ? "Circonscription" : "Electoral district"}</h2>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(mapped)}</p>
<p>${esc(fr ? STATCAN_FR : STATCAN)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(divisionHref)}">${esc(divisionLabel)}</a> · <a href="${esc(municipalityIndexPath(lang, place.region, division.slug))}">${fr ? "Index des municipalités" : "Municipality index"}</a> · <a href="${esc(regionHref)}">${esc(regionLabel)}</a>. ${near}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, MUNI_SOURCES[place.region])}</ul>`;
  const description = fr
    ? `${name} (${place.code}), municipalité de la CGT 2021 en ${regionLabel}. Information non officielle.`
    : `${name} (${place.code}), SGC 2021 municipality in ${regionLabel}. Unofficial information.`;
  return shell({ lang, path, title: name, description, crumbs, body });
}

function municipalityIndex(lang: CaLang, divisionCode: string): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const division = DIVISION_BY_CODE.get(divisionCode);
  if (!division) throw new Error(divisionCode);
  const region = regionBySlug(division.region);
  if (!region) throw new Error(division.region);
  const path = municipalityIndexPath(lang, division.region, division.slug);
  const regionHref = regionPath(lang, division.region);
  const regionLabel = regionName(region, lang);
  const divisionHref = divisionPath(lang, division.region, division.slug);
  const divisionLabel = divisionName(division, lang);
  const places = municipalitiesIn(divisionCode, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name: divisionLabel, path: divisionHref },
    { name: fr ? "Municipalités" : "Municipalities", path },
  ];
  const items = places
    .map(
      (place) =>
        `<li><a href="${esc(municipalityPath(lang, division.region, division.slug, place.slug))}">${esc(municipalityName(place, lang))}</a></li>`,
    )
    .join("");
  const body = `<p class="eyebrow">${esc(divisionLabel)}</p>
<h1>${fr ? "Municipalités" : "Municipalities"}</h1>
<p><strong>${fr ? "Lecture du 19 octobre 2026." : "Read on 19 October 2026."}</strong> ${esc(fr ? `${places.length} municipalités constituées dans cette division de recensement.` : `${places.length} incorporated municipalities in this census division.`)}</p>
<ul>${items}</ul>
<p>${esc(fr ? STATCAN_FR : STATCAN)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(divisionHref)}">${esc(divisionLabel)}</a> · <a href="${esc(regionHref)}">${esc(regionLabel)}</a></p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, MUNI_SOURCES[division.region])}</ul>`;
  const description = fr
    ? `Index des municipalités de ${divisionLabel}. Information non officielle.`
    : `Index of municipalities in ${divisionLabel}. Unofficial information.`;
  return shell({
    lang,
    path,
    title: fr ? `Municipalités, ${divisionLabel}` : `Municipalities, ${divisionLabel}`,
    description,
    crumbs,
    body,
  });
}

function writePage(path: string, html: string): number {
  const full = join(publicDir, path, "index.html");
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  return Buffer.byteLength(html);
}

const regions = [...new Set(LEGISLATURE.map((seat) => seat.region))];
const divisionCodes = [...new Set(MUNICIPALITIES.map((place) => place.cd))];

let maxBytes = 0;
let count = 0;
let totalBytes = 0;
for (const lang of ["en", "fr"] as const) {
  for (const region of regions) {
    const bytes = writePage(legislatureIndexPath(lang, region), seatIndex(lang, region));
    maxBytes = Math.max(maxBytes, bytes);
    totalBytes += bytes;
    count += 1;
  }
  for (const seat of LEGISLATURE) {
    const bytes = writePage(legislaturePath(lang, seat.region, seat.slug), seatPage(lang, seat));
    maxBytes = Math.max(maxBytes, bytes);
    totalBytes += bytes;
    count += 1;
  }
  for (const code of divisionCodes) {
    const division = DIVISION_BY_CODE.get(code);
    if (!division) throw new Error(code);
    const bytes = writePage(municipalityIndexPath(lang, division.region, division.slug), municipalityIndex(lang, code));
    maxBytes = Math.max(maxBytes, bytes);
    totalBytes += bytes;
    count += 1;
  }
  for (const place of MUNICIPALITIES) {
    const bytes = writePage(
      municipalityPath(lang, place.region, DIVISION_BY_CODE.get(place.cd)!.slug, place.slug),
      municipalityPage(lang, place),
    );
    maxBytes = Math.max(maxBytes, bytes);
    totalBytes += bytes;
    count += 1;
  }
}

console.log(`canada level 3: ${count} html files, largest ${maxBytes} bytes, total ${totalBytes} bytes`);
