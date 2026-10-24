import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { nearbyIds, nearbyPlacesParagraph } from "../src/lib/nearby-html";
import { socialMetaTags } from "../src/lib/social";
import {
  isOnlyMunicipalityWithCapitalPopulation,
  municipalityNeighbors,
  pageMunicipalities,
  type Municipality,
} from "../src/data/spain/municipalities";
import { communityBySlug, provinceBySlug } from "../src/data/spain/places";
import { sourceById, sourcesById } from "../src/data/spain/sources";
import type { Community, Lang, Province } from "../src/data/spain/types";
import { ui } from "../src/data/spain/ui";
import { formatNumber } from "../src/lib/format";
import { communityPath, municipalityPath, provincePath, spainHome } from "../src/lib/routes";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.juntaelectoralcentral.es/";
const DUPLICATE_MUNICIPALITY_NAMES = (() => {
  const counts = new Map<string, number>();
  for (const municipality of pageMunicipalities()) {
    counts.set(municipality.name, (counts.get(municipality.name) ?? 0) + 1);
  }
  return new Set([...counts].filter(([, count]) => count > 1).map(([name]) => name));
})();
const SOURCE_IDS = ["ine-29005", "rd-1117-2025", "rd-207-2023", "loreg-boe", "mpt-alcaldes-2023"] as const;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(lang: Lang, municipality: Municipality, province: Province, community: Community): string {
  const copy = ui(lang);
  const es = lang === "es";
  const other: Lang = es ? "en" : "es";
  const path = municipalityPath(lang, community.slug, province.slug, municipality.slug);
  const otherPath = municipalityPath(other, community.slug, province.slug, municipality.slug);
  const provinceHref = provincePath(lang, community.slug, province.slug);
  const communityHref = communityPath(lang, community.slug);
  const population = formatNumber(municipality.population, lang);
  const neighbors = neighborLinks(lang, municipality);
  const sameName = province.capital === municipality.name && province.capitalPopulation === municipality.population;
  const uniqueCapital =
    !sameName &&
    municipality.population === province.capitalPopulation &&
    isOnlyMunicipalityWithCapitalPopulation(municipality.code);
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.spain, path: "/es/" },
    { name: es ? "España" : "Spain", path: spainHome(lang) },
    { name: community.officialName, path: communityHref },
    { name: province.decreeName, path: provinceHref },
    { name: municipality.name, path },
  ];
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
  const description = es
    ? `${municipality.name} (${municipality.code}): Total ${population} en la tabla 29005 del INE, periodo 2025. Información no oficial.`
    : `${municipality.name} (${municipality.code}): Total ${population} in INE table 29005, period 2025. Unofficial information.`;
  const title = DUPLICATE_MUNICIPALITY_NAMES.has(municipality.name)
    ? `${municipality.name}, ${province.decreeName} · ${SITE.name}`
    : `${municipality.name} · ${SITE.name}`;
  const canonical = absoluteUrl(path);
  const capitalNote = sameName
    ? es
      ? `El anexo del Real Decreto 1117/2025 usa este mismo nombre como capital de provincia y la misma cifra, ${population}.`
      : `The annex of Royal Decree 1117/2025 uses this same name for the provincial capital and the same figure, ${population}.`
    : uniqueCapital
      ? es
        ? `El anexo nombra la capital «${province.capital}» con ${formatNumber(province.capitalPopulation, lang)}. La tabla 29005 imprime esa misma cifra en este municipio, con el nombre «${municipality.name}». Las dos cadenas no son iguales.`
        : `The annex names the capital “${province.capital}” with ${formatNumber(province.capitalPopulation, lang)}. Table 29005 prints that same figure for this municipality, under the name “${municipality.name}”. The two strings are not the same.`
      : "";
  const sources = sourcesById([...SOURCE_IDS])
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}</li>`,
    )
    .join("");
  const crumbNav = crumbs
    .map((item, index) =>
      index === crumbs.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="es" href="${esc(absoluteUrl(es ? path : otherPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(es ? otherPath : path))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(es ? otherPath : path))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${es ? "es_ES" : "en_US"}">
${socialMetaTags()}
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
${ADSENSE_HEAD_TAGS}
</head>
<body>
<p class="banner">${esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(spainHome(lang))}">${esc(es ? "España" : "Spain")}</a> · <a href="/search/">${esc(es ? "Buscar" : "Search")}</a> · <a href="${esc(otherPath)}">${es ? "English" : "Español"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p class="eyebrow">${esc(copy.municipality)}</p>
<h1>${esc(municipality.name)}</h1>
<p class="lede">${esc(province.decreeName)}</p>
<p><strong>Last updated: ${esc(SITE.lastUpdated)}.</strong> <a href="${esc(reportErrorHref(path))}">Report an error</a></p>
<table>
<tr><th>${esc(copy.population)}</th><td>${esc(population)}</td></tr>
<tr><th>${esc(copy.ineMunicipalityCode)}</th><td>${esc(municipality.code)}</td></tr>
<tr><th>${esc(copy.ineCode)}</th><td>${esc(province.ineCode)}</td></tr>
</table>
<p>${esc(copy.populationSeries)}</p>
<p>${esc(es ? `El nombre de arriba es el que la tabla imprime después del código. Provincia: ${province.decreeName}. Comunidad: ${community.officialName}.` : `The name above is the one the table prints after the code. Province: ${province.decreeName}. Community: ${community.officialName}.`)}</p>
${capitalNote ? `<p>${esc(capitalNote)}</p>` : ""}
<h2>${esc(es ? "Elecciones municipales" : "Municipal elections")}</h2>
<p>${esc(copy.localElection)}</p>
<h2>${esc(es ? "Alcaldía" : "Mayor")}</h2>
<p>${esc(copy.mayorOfficial)} <a href="${esc(sourceById("mpt-alcaldes-2023").url)}">${esc(es ? "Consulta de Cargos Representativos Locales" : "Consulta de Cargos Representativos Locales (local officeholders lookup)")}</a>.</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(provinceHref)}">${esc(province.decreeName)}</a> · <a href="${esc(communityHref)}">${esc(community.officialName)}</a>. ${esc(copy.alphaNearby)}:${neighbors ? neighbors.replace(/^ · /, " ") : ""}</p>
${nearbyPlacesParagraph(
  lang,
  nearbyIds(`es:${municipality.code}`)
    .map((code) => pageMunicipalities().find((item) => item.code === code))
    .filter((item): item is Municipality => Boolean(item))
    .map((item) => ({
      href: municipalityPath(lang, item.communitySlug, item.provinceSlug, item.slug),
      name: item.name,
    })),
)}
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sources}</ul>
</main>
${withLegalFooter("")}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function neighborLinks(lang: Lang, municipality: Municipality): string {
  const { prev, next } = municipalityNeighbors(municipality);
  const parts: string[] = [];
  if (prev) {
    parts.push(
      `<a href="${esc(municipalityPath(lang, prev.communitySlug, prev.provinceSlug, prev.slug))}">${esc(prev.name)}</a>`,
    );
  }
  if (next) {
    parts.push(
      `<a href="${esc(municipalityPath(lang, next.communitySlug, next.provinceSlug, next.slug))}">${esc(next.name)}</a>`,
    );
  }
  return parts.length ? ` · ${parts.join(" · ")}` : "";
}

let written = 0;
for (const lang of ["es", "en"] as const) {
  rmSync(join(publicDir, "es", lang), { recursive: true, force: true });
}
for (const municipality of pageMunicipalities()) {
  const province = provinceBySlug(municipality.provinceSlug);
  const community = communityBySlug(municipality.communitySlug);
  if (!province || !community) throw new Error(`Missing parent for ${municipality.code}`);
  for (const lang of ["es", "en"] as const) {
    const path = municipalityPath(lang, community.slug, province.slug, municipality.slug);
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(lang, municipality, province, community));
    written += 1;
  }
}

console.log(`municipality html: ${written}`);
