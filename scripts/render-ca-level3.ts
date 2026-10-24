import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { CLOUDFLARE_BEACON_TAG } from "../src/lib/cloudflare-beacon";
import { nearbyIds, nearbyPlacesParagraph } from "../src/lib/nearby-html";
import { socialMetaTags } from "../src/lib/social";
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

const STATCAN_IDS = ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "sgc-csd-def", "csd-boundary-2021", "statcan-licence"] as const;

const MUNI_SOURCES: Record<string, readonly string[]> = {
  ontario: ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "on-mea"],
  quebec: ["sgc-2021-en", "sgc-2021-fr", "sgc-csd-dict", "csd-boundary-2021", "statcan-licence", "qc-muni-act"],
  "british-columbia": [...STATCAN_IDS, "bc-lga-52", "bc-local-governments"],
  alberta: [...STATCAN_IDS, "ab-laea", "ab-muni-next", "ab-officials", "ab-ogl"],
  manitoba: [...STATCAN_IDS, "mb-muni-elections", "mb-election-faq"],
  saskatchewan: [...STATCAN_IDS, "sk-muni-dates", "sk-muni-directory"],
  "nova-scotia": [...STATCAN_IDS, "ns-mea", "ns-muni-elections"],
  "new-brunswick": [...STATCAN_IDS, "nb-local-process", "nb-mea"],
  "newfoundland-and-labrador": [...STATCAN_IDS, "nl-2025-date"],
  "prince-edward-island": [...STATCAN_IDS, "pei-mga", "pei-candidates"],
  yukon: [...STATCAN_IDS],
  "northwest-territories": [...STATCAN_IDS, "nwt-elections-home"],
  nunavut: [...STATCAN_IDS, "nu-muni"],
};

function muniSourceIds(place: Municipality): readonly string[] {
  const ids = MUNI_SOURCES[place.region];
  if (!ids) throw new Error(`No municipality sources for ${place.region}`);
  if (place.code === "5915022") return [...ids, "bc-van-toc"];
  return ids;
}

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
  "bc-van-toc": "Vancouver Charter, table of contents, s. 9",
  "bc-local-governments": "British Columbia, Local governments",
  "ab-officials": "Alberta.ca, Find a municipal official",
  "ab-ogl": "Open Government Licence – Alberta",
  "mb-muni-elections": "Manitoba, Municipal Elections 2026",
  "mb-election-faq": "Manitoba, municipal election FAQ",
  "sk-muni-dates": "Saskatchewan, municipal election dates",
  "sk-muni-directory": "Saskatchewan, municipal directory",
  "ns-mea": "Municipal Elections Act (Nova Scotia), ss. 2 and 10",
  "ns-muni-elections": "Nova Scotia, municipal elections",
  "nb-local-process": "New Brunswick, local government general election process",
  "nb-mea": "Municipal Elections Act (New Brunswick), s. 3",
  "nl-2025-date": "Newfoundland and Labrador, 2025 municipal election date",
  "pei-mga": "Municipal Government Act (Prince Edward Island), ss. 32 and 37",
  "pei-candidates": "Prince Edward Island, candidate information for municipal elections",
  "nwt-elections-home": "Elections NWT, home page",
  "nu-muni": "Elections Nunavut, municipal council elections",
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
${socialMetaTags()}
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
${withLegalFooter(`© 2026 ${esc(SITE.name)}.`)}
${CLOUDFLARE_BEACON_TAG}
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
${nearbyPlacesParagraph(
  lang,
  nearbyIds(`ca-seat:${seat.region}/${seat.slug}`)
    .map((id) => {
      const slug = id.slice(id.indexOf("/") + 1);
      return LEGISLATURE.find((item) => item.region === seat.region && item.slug === slug);
    })
    .filter((item): item is LegislatureSeat => Boolean(item))
    .map((item) => ({ href: legislaturePath(lang, item.region, item.slug), name: item.name })),
)}
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

const MB_JULY = new Set(["4601078", "4613049", "4618034"]);
const PEI_RESORT = "1102045";

function extLink(url: string, label: string): string {
  return `<a href="${esc(url)}">${esc(label)}</a>`;
}

function isLegacyMunicipality(region: string): boolean {
  return region === "ontario" || region === "quebec";
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
        ? "Cette subdivision est la City of Vancouver. La table des matières de la Vancouver Charter énumère l’article 9, « General local election ». Le texte de cet article n’a pas été lu, donc cette page n’énonce pas le jour de scrutin de Vancouver. L’article 57 de la Local Government Act porte sur les coûts d’élection et mentionne Vancouver pour le partage des coûts; il n’est pas utilisé ici comme règle du jour de scrutin. Cette page ne publie pas de décompte et ne nomme pas de maire."
        : "This subdivision is the City of Vancouver. The Vancouver Charter table of contents lists section 9, “General local election”. The section text was not read, so this page does not state Vancouver’s voting day. Section 57 of the Local Government Act is about election costs and mentions Vancouver for cost-sharing; it is not used here as the voting-day rule. This page does not publish a count and does not name a mayor.";
    }
    return fr
      ? "L’article 52 de la Local Government Act, à jour au 20 octobre 2026, dit qu’une élection locale générale du maire et de tous les conseillers de chaque municipalité a lieu en 2014 et tous les quatre ans par la suite, et que le jour de scrutin général est le troisième samedi d’octobre de l’année de l’élection. En octobre 2026, les samedis tombent les 3, 10, 17, 24 et 31, donc le troisième samedi est le 17 octobre 2026. En octobre 2030, les samedis tombent les 5, 12, 19 et 26, donc le troisième samedi est le 19 octobre 2030. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "Section 52 of the Local Government Act, current to 20 October 2026, says a general local election for the mayor and all councillors of each municipality is held in 2014 and every fourth year after that, and that general voting day is the third Saturday of October in the year of the election. In October 2026 the Saturdays fall on the 3rd, 10th, 17th, 24th and 31st, so the third Saturday is 17 October 2026. In October 2030 the Saturdays fall on the 5th, 12th, 19th and 26th, so the third Saturday is 19 October 2030. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "alberta") {
    if (place.type === "SV") {
      return fr
        ? "L’article 12 de la Local Authorities Election Act dit que, pour un summer village, le jour du scrutin d’une élection générale du conseil est quatre semaines après le jour que le conseil fixe pour la réception des mises en candidature. Cette page n’imprime pas de date civile pour cette règle. Elle ne publie pas de décompte et ne nomme pas de maire."
        : "Section 12 of the Local Authorities Election Act says that, for a summer village, election day for a general election of council is four weeks after the day the council sets for receiving nominations. This page does not print a calendar date for that rule. It does not publish a count and does not name a mayor.";
    }
    return fr
      ? "L’article 10 de la Local Authorities Election Act dit qu’à compter de 2013 une élection générale a lieu tous les quatre ans. Ce cycle comprend 2025 et 2029. L’article 11 dit que le jour du scrutin d’une élection générale est le troisième lundi d’octobre, sauf si un règlement adopté avant le 30 juin de l’année de l’élection le déplace au samedi qui précède immédiatement ce lundi. Ce règlement est sans effet l’année où une élection sénatoriale ou un référendum a lieu en même temps. La codification lue est à jour au 18 décembre 2025. Le troisième lundi d’octobre 2025 est le 20 octobre 2025. La page alberta.ca sur les élections municipales, lue le 24 octobre 2026, dit que la prochaine élection générale municipale aura lieu le 15 octobre 2029. Octobre 2029 commence un lundi, donc le troisième lundi est le 15 octobre 2029. Cette page n’a pas lu de règlement qui déplace le jour. Elle ne publie pas de décompte et ne nomme pas de maire ni de préfet."
      : "Section 10 of the Local Authorities Election Act says that, commencing in 2013, a general election is held every 4th year. That cycle includes 2025 and 2029. Section 11 says election day for a general election is the 3rd Monday in October, unless a bylaw passed before 30 June of the election year moves it to the Saturday immediately before that Monday. That bylaw has no effect in a year when a Senate election or a referendum is held at the same time. The consolidation that was read is current to 18 December 2025. The third Monday of October 2025 is 20 October 2025. The alberta.ca municipal-elections page, read on 24 October 2026, says the next municipal general election will be held on 15 October 2029. October 2029 begins on a Monday, so the third Monday is 15 October 2029. This page did not read a bylaw moving the day. It does not publish a count and does not name a mayor or reeve.";
  }
  if (place.region === "manitoba") {
    if (MB_JULY.has(place.code)) {
      return fr
        ? "La page des élections municipales du Manitoba et la foire aux questions, lues le 24 octobre 2026, disent que cette municipalité élit son conseil tous les quatre ans, le quatrième vendredi de juillet. Le quatrième vendredi de juillet 2022 est le 22 juillet 2022. Le quatrième vendredi de juillet 2026 est le 24 juillet 2026. Le quatrième vendredi de juillet 2030 est le 26 juillet 2030. Le texte officiel de la loi pour cette règle du vendredi n’a pas été lu. Cette page ne publie pas de décompte et ne nomme pas de maire ni de préfet."
        : "The Manitoba municipal elections page and the municipal election FAQ, read on 24 October 2026, say this municipality elects its council every four years on the fourth Friday in July. The fourth Friday of July 2022 is 22 July 2022. The fourth Friday of July 2026 is 24 July 2026. The fourth Friday of July 2030 is 26 July 2030. The official statute text for that Friday rule was not read. This page does not publish a count and does not name a mayor or reeve.";
    }
    return fr
      ? "La page des élections municipales du Manitoba et la foire aux questions, lues le 24 octobre 2026, disent que la plupart des municipalités élisent leur conseil tous les quatre ans, le quatrième mercredi d’octobre. Le quatrième mercredi d’octobre 2022 est le 26 octobre 2022. Le quatrième mercredi d’octobre 2026 est le 28 octobre 2026. Le texte officiel de la loi pour cette règle du mercredi n’a pas été lu. Cette page ne publie pas de décompte et ne nomme pas de maire ni de préfet."
      : "The Manitoba municipal elections page and the municipal election FAQ, read on 24 October 2026, say most municipalities elect their councils every four years on the fourth Wednesday in October. The fourth Wednesday of October 2022 is 26 October 2022. The fourth Wednesday of October 2026 is 28 October 2026. The official statute text for that Wednesday rule was not read. This page does not publish a count and does not name a mayor or reeve.";
  }
  if (place.region === "saskatchewan") {
    const act = fr
      ? "La page cite The Local Government Election Act, 2015. Le texte de la loi n’a pas été lu. Cette page ne publie pas de décompte et ne nomme pas de maire ni de préfet."
      : "The page cites The Local Government Election Act, 2015. The Act text was not read. This page does not publish a count and does not name a mayor or reeve.";
    const noWards = fr ? " Elle n’énumère pas les divisions." : " It does not list divisions.";
    if (place.type === "RM") {
      return fr
        ? `La page de la Saskatchewan « Election dates and workshops for municipalities », lue le 24 octobre 2026, dit que les municipalités rurales élisent certaines divisions tous les deux ans et que les membres siègent quatre ans. Elle imprime le lundi 9 novembre 2026 pour les divisions paires, et le mercredi 8 novembre 2028 pour les divisions impaires et le préfet. Elle n’imprime pas la date de la dernière élection. ${act}${noWards}`
        : `The Saskatchewan page “Election dates and workshops for municipalities”, read on 24 October 2026, says rural municipalities elect selected divisions every two years and that members serve four years. It prints Monday 9 November 2026 for even-numbered divisions, and Wednesday 8 November 2028 for odd-numbered divisions and the reeve. It does not print the last election date. ${act}${noWards}`;
    }
    if (place.type === "RV") {
      return fr
        ? `La page de la Saskatchewan « Election dates and workshops for municipalities », lue le 24 octobre 2026, imprime le samedi 29 juillet 2028 pour les villages de villégiature. Elle n’imprime pas la date de la dernière élection. ${act}`
        : `The Saskatchewan page “Election dates and workshops for municipalities”, read on 24 October 2026, prints Saturday 29 July 2028 for resort villages. It does not print the last election date. ${act}`;
    }
    if (place.type === "NH" || place.type === "NV") {
      return fr
        ? `La page de la Saskatchewan « Election dates and workshops for municipalities », lue le 24 octobre 2026, imprime l’automne 2028 pour les municipalités du Nord et dit de communiquer avec le bureau municipal pour la date exacte. Elle n’imprime pas de jour civil pour cette élection ni la date de la dernière élection. ${act}`
        : `The Saskatchewan page “Election dates and workshops for municipalities”, read on 24 October 2026, prints fall 2028 for northern municipalities and says to contact the municipal office for the exact date. It does not print a calendar day for that election or the last election date. ${act}`;
    }
    return fr
      ? `La page de la Saskatchewan « Election dates and workshops for municipalities », lue le 24 octobre 2026, dit que les élections générales ont lieu tous les quatre ans. Elle imprime le mercredi 8 novembre 2028 pour le maire et les conseillers des cités, villes et villages. Elle imprime aussi l’automne 2028 pour les municipalités du Nord et dit de communiquer avec le bureau municipal pour la date exacte. La Classification géographique type n’indique pas si cette subdivision est nordique, donc les deux phrases sont imprimées. Elle n’imprime pas la date de la dernière élection. ${act}`
      : `The Saskatchewan page “Election dates and workshops for municipalities”, read on 24 October 2026, says general elections are held every four years. It prints Wednesday 8 November 2028 for the mayor and councillors of cities, towns, and villages. It also prints fall 2028 for northern municipalities and says to contact the municipal office for the exact date. The Standard Geographical Classification does not mark whether this subdivision is northern, so both sentences are printed. It does not print the last election date. ${act}`;
  }
  if (place.region === "nova-scotia") {
    return fr
      ? "L’article 10 de la Municipal Elections Act, dans la codification administrative lue le 24 octobre 2026, dit qu’une élection municipale ordinaire a lieu le troisième samedi d’octobre en 2000 et tous les quatre ans par la suite. En octobre 2024, les samedis tombent les 5, 12, 19 et 26, donc le troisième samedi est le 19 octobre 2024. En octobre 2028, les samedis tombent les 7, 14, 21 et 28, donc le troisième samedi est le 21 octobre 2028. La page de la Nouvelle-Écosse sur les élections municipales, lue le même jour, énonce la même règle. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "Section 10 of the Municipal Elections Act, in the office consolidation read on 24 October 2026, says a regular municipal election is held on the third Saturday of October in 2000 and every fourth year after that. In October 2024 the Saturdays fall on the 5th, 12th, 19th and 26th, so the third Saturday is 19 October 2024. In October 2028 the Saturdays fall on the 7th, 14th, 21st and 28th, so the third Saturday is 21 October 2028. The Nova Scotia municipal-elections page, read the same day, states the same rule. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "new-brunswick") {
    return fr
      ? "La page du Nouveau-Brunswick « The local government general election process », lue le 24 octobre 2026, dit qu’une élection générale des gouvernements locaux a lieu tous les quatre ans, le deuxième lundi de mai, et elle imprime le 11 mai 2026 et le 13 mai 2030. La codification de la Municipal Elections Act à jour au 13 décembre 2023, article 3, dit que cette loi et la Local Governance Act régissent l’élection des maires et des conseillers. Cette codification ne contient ni la date de mai ni la règle du lundi, donc cette page n’attribue pas la date à un numéro d’article. La page ne dit pas si cette subdivision de recensement de 2021 était un gouvernement local le 11 mai 2026. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "The New Brunswick page “The local government general election process”, read on 24 October 2026, says a local government general election is held every four years on the second Monday in May, and it prints 11 May 2026 and 13 May 2030. The Municipal Elections Act consolidation current to 13 December 2023, section 3, says that Act and the Local Governance Act govern the election of mayors and councillors. That consolidation does not contain the May date or the Monday rule, so this page does not attribute the date to a section number. The page does not say whether this 2021 census subdivision was a local government on 11 May 2026. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "newfoundland-and-labrador") {
    return fr
      ? "Le communiqué du gouvernement de Terre-Neuve-et-Labrador du 1er novembre 2024, lu le 24 octobre 2026, dit que la Municipal Elections Act prévoit une élection générale municipale tous les quatre ans, le dernier mardi de septembre, et que la date de 2025 a été reportée du 30 septembre 2025 au 2 octobre 2025. L’année suivante de ce cycle de quatre ans est 2029. Le dernier mardi de septembre 2029 est le 25 septembre 2029. Aucun avis de report pour 2029 n’a été lu. Le texte de la loi lui-même n’a pas été lu. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "The Government of Newfoundland and Labrador news release of 1 November 2024, read on 24 October 2026, says the Municipal Elections Act provides a municipal general election every four years on the last Tuesday in September, and that the 2025 date was moved from 30 September 2025 to 2 October 2025. The next year in that four-year cycle is 2029. The last Tuesday of September 2029 is 25 September 2029. No 2029 deferral notice was read. The Act text itself was not read. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "prince-edward-island") {
    if (place.code === PEI_RESORT) {
      return fr
        ? "L’article 32(c) de la Municipal Government Act dit que, pour la Resort Municipality of Stanley Bridge, Hope River, Bayview, Cavendish and North Rustico, le premier lundi de novembre de l’article 37 est réputé être le deuxième lundi d’août. Le deuxième lundi d’août 2022 est le 8 août 2022. Le deuxième lundi d’août 2026 est le 10 août 2026. Le deuxième lundi d’août 2030 est le 12 août 2030. La page d’information aux candidats, lue le 24 octobre 2026, imprime le 10 août 2026 pour cette municipalité de villégiature. Cette page ne publie pas de décompte et ne nomme pas de maire."
        : "Section 32(c) of the Municipal Government Act says that, for the Resort Municipality of Stanley Bridge, Hope River, Bayview, Cavendish and North Rustico, the first Monday in November in section 37 is deemed to be the second Monday in August. The second Monday of August 2022 is 8 August 2022. The second Monday of August 2026 is 10 August 2026. The second Monday of August 2030 is 12 August 2030. The candidate-information page, read on 24 October 2026, prints 10 August 2026 for that resort municipality. This page does not publish a count and does not name a mayor.";
    }
    return fr
      ? "L’article 37 de la Municipal Government Act dit qu’une élection générale a lieu tous les quatre ans le premier lundi de novembre, à compter de 2018. Le premier lundi de novembre 2022 est le 7 novembre 2022. Le premier lundi de novembre 2026 est le 2 novembre 2026. La page d’information aux candidats, lue le 24 octobre 2026, imprime le 2 novembre 2026. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "Section 37 of the Municipal Government Act says a general election is held every four years on the first Monday in November, starting in 2018. The first Monday of November 2022 is 7 November 2022. The first Monday of November 2026 is 2 November 2026. The candidate-information page, read on 24 October 2026, prints 2 November 2026. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "northwest-territories") {
    return fr
      ? "La page d’accueil d’Élections TNO, lue le 24 octobre 2026, dit de communiquer avec le ministère des Affaires municipales et communautaires pour les élections municipales. Elle imprime une élection générale territoriale le 5 octobre 2027. Elle n’imprime pas de jour de scrutin municipal. Cette page n’en énonce pas. Elle ne publie pas de décompte et ne nomme pas de maire."
      : "The Elections NWT home page, read on 24 October 2026, says to contact the Department of Municipal and Community Affairs for municipal elections. It prints a territorial general election on 5 October 2027. It does not print a municipal voting day. This page does not state one. It does not publish a count and does not name a mayor.";
  }
  if (place.region === "nunavut") {
    return fr
      ? "La page d’Élections Nunavut sur les élections des conseils municipaux, lue le 24 octobre 2026, dit que les conseils sont élus tous les quatre ans et imprime la prochaine élection générale municipale au 25 octobre 2027. Elle dit que les règles figurent dans la Loi électorale du Nunavut à partir de l’article 224.1. Le texte de cet article n’a pas été lu. La page n’imprime pas la date précédente. Cette page ne publie pas de décompte et ne nomme pas de maire."
      : "The Elections Nunavut page on municipal council elections, read on 24 October 2026, says councils are elected every four years and prints the next municipal general election as 25 October 2027. It says the rules are in the Nunavut Elections Act starting at section 224.1. That section text was not read. The page does not print the previous date. This page does not publish a count and does not name a mayor.";
  }
  if (place.region === "yukon") {
    return fr
      ? "La Municipal Act du Yukon et les pages municipales du gouvernement du Yukon n’ont pas été obtenues le 24 octobre 2026. Aucun jour de scrutin municipal n’est imprimé. Cette page n’en énonce pas. Elle ne nomme pas de maire."
      : "The Yukon Municipal Act and the Government of Yukon municipal pages were not retrieved on 24 October 2026. No municipal voting day is printed. This page does not state one. It does not name a mayor.";
  }
  throw new Error(`No municipal election text for ${place.region}/${place.code}`);
}

function councilInner(place: Municipality, lang: CaLang): string {
  const fr = lang === "fr";
  if (isLegacyMunicipality(place.region)) {
    return fr
      ? "Aucun maire, préfet ou conseil n’est copié. Aucun répertoire provincial de ces titulaires n’a été lu. Ce n’est pas publié de façon centrale dans les sources de cette page."
      : "No mayor, reeve, or council is copied. No provincial directory of those officeholders was read. That is not published centrally in the sources for this page.";
  }
  if (place.region === "british-columbia") {
    const page = extLink(
      "https://www2.gov.bc.ca/gov/content/governments/local-governments",
      fr ? "page des gouvernements locaux de la Colombie-Britannique" : "British Columbia local governments page",
    );
    return fr
      ? `Aucun maire ni conseil n’est copié. La ${page}, lue le 24 octobre 2026, ne dresse pas la liste des maires.`
      : `No mayor or council is copied. The ${page}, read on 24 October 2026, does not list mayors.`;
  }
  if (place.region === "alberta") {
    const directory = extLink(
      "https://www.alberta.ca/find-a-municipal-official",
      fr ? "Trouver un élu municipal" : "Find a municipal official",
    );
    const licence = extLink(
      "https://open.alberta.ca/licence",
      fr ? "Licence du gouvernement ouvert – Alberta" : "Open Government Licence – Alberta",
    );
    return fr
      ? `Aucun maire, préfet ou conseil n’est copié. ${directory} est une page de recherche. Aucun nom n’a été copié. La ressource du catalogue qui a été lue est cette page de recherche, pas un tableur. La ${licence} a été lue.`
      : `No mayor, reeve, or council is copied. ${directory} is a search page. No name was copied. The catalogue resource that was read is that search page, not a spreadsheet. The ${licence} was read.`;
  }
  if (place.region === "saskatchewan") {
    const directory = extLink(
      "https://www.saskatchewan.ca/government/municipal-administration/municipal-directory",
      fr ? "répertoire municipal de la Saskatchewan" : "Saskatchewan municipal directory",
    );
    return fr
      ? `Aucun maire, préfet ou conseil n’est copié. Le ${directory} est un formulaire de recherche. Aucun nom n’a été copié.`
      : `No mayor, reeve, or council is copied. The ${directory} is a search form. No name was copied.`;
  }
  if (place.region === "nunavut") {
    return fr
      ? "Aucun maire n’est nommé. Élections Nunavut dit qu’un conseil compte normalement huit conseillers et un maire, et qu’il y a 25 conseils municipaux. La page ne nomme personne. Cette phrase est la description générale de l’organisme, pas une liste pour cette subdivision."
      : "No mayor is named. Elections Nunavut says a council normally has eight councillors plus a mayor, and that there are 25 municipal councils. The page does not name anyone. That sentence is the agency’s general description, not a list for this subdivision.";
  }
  if (place.region === "northwest-territories") {
    return fr
      ? "Aucun maire ni conseil n’est copié. La page d’accueil d’Élections TNO dit de communiquer avec le ministère des Affaires municipales et communautaires. Aucune liste de maires n’a été lue."
      : "No mayor or council is copied. The Elections NWT home page says to contact the Department of Municipal and Community Affairs. No list of mayors was read.";
  }
  if (place.region === "yukon") {
    return fr
      ? "Aucun maire ni conseil n’est copié. Aucun répertoire municipal du Yukon n’a été obtenu le 24 octobre 2026."
      : "No mayor or council is copied. No Yukon municipal directory was retrieved on 24 October 2026.";
  }
  return fr
    ? "Aucun maire, préfet ou conseil n’est copié. Aucun répertoire provincial de ces titulaires n’a été obtenu le 24 octobre 2026. Ce n’est pas publié de façon centrale dans les sources de cette page."
    : "No mayor, reeve, or council is copied. No provincial directory of those officeholders was retrieved on 24 October 2026. That is not published centrally in the sources for this page.";
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
  const legacy = isLegacyMunicipality(place.region);
  const readStamp = legacy
    ? fr
      ? "Lecture du 19 octobre 2026."
      : "Read on 19 October 2026."
    : fr
      ? "Lecture du 24 octobre 2026."
      : "Read on 24 October 2026.";
  const reference = legacy
    ? ""
    : `<p>${esc(
        fr
          ? "Le fichier de structure de la CGT 2021 a la date de référence 2021. Une constitution, une fusion ou un changement de nom postérieur ne figure pas dans ce fichier."
          : "The SGC 2021 structure file uses the reference date 2021. A later incorporation, amalgamation, or name change is not in that file.",
      )}</p>\n`;
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
<p><strong>${esc(readStamp)}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<table>
<tr><th>${fr ? "Code CGT" : "SGC code"}</th><td>${esc(place.code)}</td></tr>
<tr><th>${fr ? "Type" : "Type"}</th><td>${esc(CSD_TYPE_LABEL[place.type])}</td></tr>
<tr><th>${fr ? "Division de recensement" : "Census division"}</th><td><a href="${esc(divisionHref)}">${esc(divisionLabel)}</a> (${esc(place.cd)})</td></tr>
<tr><th>${region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}</th><td><a href="${esc(regionHref)}">${esc(regionLabel)}</a></td></tr>
</table>
<p>${esc(boundary)}</p>
${reference}<h2>${fr ? "Conseil" : "Council"}</h2>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${councilInner(place, lang)}</p>
<h2>${fr ? "Élection municipale" : "Municipal election"}</h2>
<p>${esc(localElection(place, lang))}</p>
<h2>${fr ? "Circonscription" : "Electoral district"}</h2>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(mapped)}</p>
<p>${esc(fr ? STATCAN_FR : STATCAN)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(divisionHref)}">${esc(divisionLabel)}</a> · <a href="${esc(municipalityIndexPath(lang, place.region, division.slug))}">${fr ? "Index des municipalités" : "Municipality index"}</a> · <a href="${esc(regionHref)}">${esc(regionLabel)}</a>. ${near}</p>
${nearbyPlacesParagraph(
  lang,
  nearbyIds(`ca:${place.code}`)
    .map((code) => MUNICIPALITIES.find((item) => item.code === code))
    .filter((item): item is Municipality => Boolean(item))
    .map((item) => {
      const parent = DIVISION_BY_CODE.get(item.cd);
      return parent
        ? { href: municipalityPath(lang, item.region, parent.slug, item.slug), name: municipalityName(item, lang) }
        : undefined;
    })
    .filter((item): item is { href: string; name: string } => Boolean(item)),
)}
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, muniSourceIds(place))}</ul>`;
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
  const readStamp = isLegacyMunicipality(division.region)
    ? fr
      ? "Lecture du 19 octobre 2026."
      : "Read on 19 October 2026."
    : fr
      ? "Lecture du 24 octobre 2026."
      : "Read on 24 October 2026.";
  const body = `<p class="eyebrow">${esc(divisionLabel)}</p>
<h1>${fr ? "Municipalités" : "Municipalities"}</h1>
<p><strong>${esc(readStamp)}</strong> ${esc(fr ? `${places.length} municipalités constituées dans cette division de recensement.` : `${places.length} incorporated municipalities in this census division.`)}</p>
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
