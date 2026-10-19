import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import {
  districtName,
  districtNeighbors,
  DISTRICTS,
  divisionName,
  divisionNeighbors,
  DIVISIONS,
  type CensusDivision,
  type District,
} from "../src/data/ca/level2";
import { municipalitiesIn, municipalityName } from "../src/data/ca/level3";
import {
  districtIndexPath,
  districtPath,
  divisionIndexPath,
  divisionPath,
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
const DISTRICT_SOURCES = [
  "ec-fed-2023",
  "hoc-constituencies",
  "hoc-members",
  "hoc-member-search",
  "hoc-open-data",
  "ec-briefing",
  "cea-56-1",
  "ogl-canada",
] as const;
const DIVISION_SOURCES = ["sgc-2021-en", "sgc-2021-fr", "statcan-licence"] as const;
const OGL = "Contains information licensed under the Open Government Licence – Canada.";
const OGL_FR = "Contient des informations visées par la Licence du gouvernement ouvert – Canada.";
const STATCAN_FR =
  "Adapté de Statistique Canada, Classification géographique type (CGT) 2021, fichier de structure, date de référence 2021. Ceci ne constitue pas une approbation de ce produit par Statistique Canada.";
const STATCAN =
  "Adapted from Statistics Canada, Standard Geographical Classification (SGC) 2021, structure file, reference date 2021. This does not constitute an endorsement by Statistics Canada of this product.";

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_FR = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatIso(iso: string, lang: CaLang): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) throw new Error(`Bad date ${iso}`);
  return lang === "fr" ? `${day} ${MONTHS_FR[month - 1]} ${year}` : `${day} ${MONTHS_EN[month - 1]} ${year}`;
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

function sourceList(lang: CaLang, ids: readonly string[]): string {
  const copy = ui(lang);
  return sourcesById([...ids])
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}</li>`,
    )
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
      : SITE.officialNotUs.replace(
          "official election office",
          `<a href="${OFFICE}">official election office</a>`,
        );
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
</head>
<body>
<p class="banner">${banner}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="/ca/${lang}/">Canada</a> · <a href="/search/">${lang === "fr" ? "Recherche" : "Search"}</a> · <a href="${esc(otherPath)}">${lang === "fr" ? "English" : "Français"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav(crumbs)}</nav>
${body}
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function memberSentence(district: District, lang: CaLang): string {
  const mp = district.mp;
  if (!mp) {
    return lang === "fr"
      ? "Les champs de la personne actuelle sont vides dans la liste des circonscriptions actuelles de la Chambre des communes, lue le 18 octobre 2026."
      : "The current-person fields are empty in the House of Commons list of current constituencies, read on 18 October 2026.";
  }
  const honorific = lang === "fr" ? mp.honorificFr : mp.honorificEn;
  const party = lang === "fr" ? mp.partyFr : mp.partyEn;
  const who = `${honorific ? `${honorific} ` : ""}${mp.first} ${mp.last}`;
  const profile = `https://www.ourcommons.ca/Members/${lang}/${mp.profile}`;
  const dated = formatIso(mp.from, lang);
  return lang === "fr"
    ? `La liste des circonscriptions actuelles nomme <a href="${esc(profile)}">${esc(who)}</a>, ${esc(party)}. L’élément FromDateTime du fichier des députés actuels est le ${esc(dated)}. La page anglaise de données ouvertes appelle ce champ « Last time elected ». Le lien est celui imprimé sur la page de recherche des députés actuels.`
    : `The list of current constituencies names <a href="${esc(profile)}">${esc(who)}</a>, ${esc(party)}. The current-members file element FromDateTime is ${esc(dated)}. The English open-data page calls that field “Last time elected”. The link is the one printed on the current-members search page.`;
}

function nameSentence(district: District, lang: CaLang): string {
  if (district.repeats) {
    return lang === "fr"
      ? `La liste anglaise et la liste française de la Chambre impriment le même nom. Le fichier de limites d’Élections Canada range ce nom, puis une virgule, puis le nom de nouveau, dans ED_NAMEE et CF_NOMF. Sur les lignes les plus longues, la copie répétée est coupée à 100 octets. Le numéro ${district.fed} est l’ED_CF_NUM de cette ligne. Le texte avant la virgule est le nom ci-dessus.`
      : `The English list and the French list of the House print the same name. The Elections Canada boundary file stores that name, then a comma, then the name again, in ED_NAMEE and CF_NOMF. On the longest rows the repeated copy is cut off at 100 bytes. The number ${district.fed} is the ED_CF_NUM on that row. The text before the comma is the name above.`;
  }
  return lang === "fr"
    ? `Ces noms sont ceux de la liste des circonscriptions de la Chambre. Les mêmes chaînes sont ED_NAMEE et CF_NOMF dans le fichier de limites d’Élections Canada pour la circonscription ${district.fed}.`
    : `These names are the ones in the House constituency list. The same strings are ED_NAMEE and CF_NOMF in the Elections Canada boundary file for district ${district.fed}.`;
}

function neighborLine(
  lang: CaLang,
  prev?: { name: string; path: string },
  next?: { name: string; path: string },
): string {
  const copy = ui(lang);
  const parts: string[] = [];
  if (prev) parts.push(`<a href="${esc(prev.path)}">${esc(prev.name)}</a>`);
  if (next) parts.push(`<a href="${esc(next.path)}">${esc(next.name)}</a>`);
  return parts.length ? `${esc(copy.alphaNearby)}: ${parts.join(" · ")}` : "";
}

function districtPage(lang: CaLang, district: District): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const region = regionBySlug(district.region);
  if (!region) throw new Error(`Missing region ${district.region}`);
  const path = districtPath(lang, district.region, district.slug);
  const name = districtName(district, lang);
  const otherName = districtName(district, fr ? "en" : "fr");
  const regionHref = regionPath(lang, district.region);
  const regionLabel = regionName(region, lang);
  const neighbors = districtNeighbors(district, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name, path },
  ];
  const description = fr
    ? `${name} (${district.fed}), circonscription électorale fédérale en ${regionLabel}. Information non officielle.`
    : `${name} (${district.fed}), federal electoral district in ${regionLabel}. Unofficial information.`;
  const election = fr
    ? "La dernière élection générale fédérale a eu lieu le 28 avril 2025. La prochaine date fixée est le lundi 15 octobre 2029, sauf dissolution plus tôt du Parlement. Cette page ne publie pas de sondages, de projections ni de résultats par circonscription, et elle ne copie pas de liste de candidatures."
    : "The last federal general election was 28 April 2025. The next fixed date is Monday, 15 October 2029, unless Parliament is dissolved earlier. This page does not publish polls, projections, or riding results, and it does not copy a candidate list.";
  const gap = fr
    ? "Aucun titulaire autre que la personne actuelle nommée par la Chambre, s’il y en a une, n’est ajouté ici. Les coordonnées personnelles, les photographies et les adresses ne sont pas copiées."
    : "No officeholder other than the current person named by the House, if there is one, is added here. Personal contact details, photographs, and addresses are not copied.";
  const near = neighborLine(
    lang,
    neighbors.prev
      ? { name: districtName(neighbors.prev, lang), path: districtPath(lang, neighbors.prev.region, neighbors.prev.slug) }
      : undefined,
    neighbors.next
      ? { name: districtName(neighbors.next, lang), path: districtPath(lang, neighbors.next.region, neighbors.next.slug) }
      : undefined,
  );
  const body = `<p class="eyebrow">${fr ? "Circonscription électorale fédérale" : "Federal electoral district"}</p>
<h1>${esc(name)}</h1>
<p class="lede">${fr ? "Nom anglais" : "French name"}: ${esc(otherName)}</p>
<p><strong>${fr ? "Lecture du 18 octobre 2026." : "Read on 18 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<table>
<tr><th>${fr ? "Numéro" : "District number"}</th><td>${esc(district.fed)}</td></tr>
<tr><th>${region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}</th><td><a href="${esc(regionHref)}">${esc(regionLabel)}</a></td></tr>
</table>
<p>${esc(nameSentence(district, lang))}</p>
<h2>${fr ? "Député actuel" : "Current member"}</h2>
<p>${memberSentence(district, lang)}</p>
<h2>${fr ? "Élection fédérale" : "Federal election"}</h2>
<p>${esc(election)}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(gap)}</p>
<p>${esc(fr ? OGL_FR : OGL)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionHref)}">${esc(regionLabel)}</a> · <a href="${esc(districtIndexPath(lang))}">${fr ? "Index des circonscriptions" : "District index"}</a> · <a href="/ca/${lang}/">Canada</a>. ${near}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, DISTRICT_SOURCES)}</ul>`;
  return shell({ lang, path, title: name, description, crumbs, body });
}

function divisionPage(lang: CaLang, division: CensusDivision): string {
  const copy = ui(lang);
  const fr = lang === "fr";
  const region = regionBySlug(division.region);
  if (!region) throw new Error(`Missing region ${division.region}`);
  const path = divisionPath(lang, division.region, division.slug);
  const name = divisionName(division, lang);
  const otherName = divisionName(division, fr ? "en" : "fr");
  const regionHref = regionPath(lang, division.region);
  const regionLabel = regionName(region, lang);
  const neighbors = divisionNeighbors(division, lang);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.canada, path: "/ca/" },
    { name: "Canada", path: `/ca/${lang}/` },
    { name: regionLabel, path: regionHref },
    { name, path },
  ];
  const description = fr
    ? `${name} (${division.code}), division de recensement de la CGT 2021 en ${regionLabel}. Information non officielle.`
    : `${name} (${division.code}), SGC 2021 census division in ${regionLabel}. Unofficial information.`;
  const lead = fr
    ? `Le fichier de structure de la Classification géographique type (CGT) 2021 inscrit cette division de recensement (niveau 3) en ${regionLabel}. Le titre de classe est le nom ci-dessus. Le fichier ne dit pas si cette division est un gouvernement municipal et ne nomme pas de titulaire. Il ne donne pas la population.`
    : `The Standard Geographical Classification (SGC) 2021 structure file lists this census division (level 3) in ${regionLabel}. The class title is the name above. The file does not say whether this division is a municipal government, and it does not name an officeholder. It does not give a population.`;
  const places = municipalitiesIn(division.code, lang);
  const gap = places.length
    ? fr
      ? "Aucun maire, préfet ou conseil n’est copié. Aucun répertoire provincial de ces titulaires n’a été lu pour cette division. Les listes de candidatures ne figurent pas sur cette page."
      : "No mayor, reeve, or council is copied. No provincial directory of those officeholders was read for this division. Candidate lists are not on this page."
    : fr
      ? "Les municipalités de cette division de recensement ne font pas partie de cette livraison."
      : "Municipalities in this census division are not in this release.";
  const placeLinks = places.length
    ? `<h2>${fr ? "Municipalités" : "Municipalities"}</h2><p><a href="${esc(municipalityIndexPath(lang, division.region, division.slug))}">${fr ? "Index des municipalités" : "Municipality index"}</a></p><ul>${places
        .map(
          (place) =>
            `<li><a href="${esc(municipalityPath(lang, division.region, division.slug, place.slug))}">${esc(municipalityName(place, lang))}</a></li>`,
        )
        .join("")}</ul>`
    : "";
  const near = neighborLine(
    lang,
    neighbors.prev
      ? { name: divisionName(neighbors.prev, lang), path: divisionPath(lang, neighbors.prev.region, neighbors.prev.slug) }
      : undefined,
    neighbors.next
      ? { name: divisionName(neighbors.next, lang), path: divisionPath(lang, neighbors.next.region, neighbors.next.slug) }
      : undefined,
  );
  const body = `<p class="eyebrow">${fr ? "Division de recensement" : "Census division"}</p>
<h1>${esc(name)}</h1>
<p class="lede">${fr ? "Nom anglais" : "French name"}: ${esc(otherName)}</p>
<p><strong>${fr ? "Lecture du 18 octobre 2026." : "Read on 18 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${fr ? "Signaler une erreur" : "Report an error"}</a></p>
<table>
<tr><th>${fr ? "Code CGT" : "SGC code"}</th><td>${esc(division.code)}</td></tr>
<tr><th>${region.kind === "territory" ? copy.kindTerritory : copy.kindProvince}</th><td><a href="${esc(regionHref)}">${esc(regionLabel)}</a></td></tr>
</table>
<p>${esc(lead)}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(gap)}</p>
${placeLinks}
<p>${esc(fr ? STATCAN_FR : STATCAN)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionHref)}">${esc(regionLabel)}</a> · <a href="${esc(divisionIndexPath(lang))}">${fr ? "Index des divisions" : "Division index"}</a> · <a href="/ca/${lang}/">Canada</a>. ${near}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, DIVISION_SOURCES)}</ul>`;
  return shell({ lang, path, title: name, description, crumbs, body });
}

function writePage(path: string, html: string): number {
  const full = join(publicDir, path, "index.html");
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  return Buffer.byteLength(html);
}

for (const lang of ["en", "fr"] as const) {
  rmSync(join(publicDir, "ca", lang), { recursive: true, force: true });
}

let maxBytes = 0;
let count = 0;
for (const lang of ["en", "fr"] as const) {
  for (const district of DISTRICTS) {
    const bytes = writePage(districtPath(lang, district.region, district.slug), districtPage(lang, district));
    maxBytes = Math.max(maxBytes, bytes);
    count += 1;
  }
  for (const division of DIVISIONS) {
    const bytes = writePage(divisionPath(lang, division.region, division.slug), divisionPage(lang, division));
    maxBytes = Math.max(maxBytes, bytes);
    count += 1;
  }
}

console.log(`canada level 2: ${count} html files, largest ${maxBytes} bytes`);
