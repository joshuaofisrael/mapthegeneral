import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CANTONS } from "../data/ch/cantons";
import { DISTRICTS, districtNeighbors, districtsForCanton, type District } from "../data/ch/districts";
import { districtPath, districtsIndexPath } from "../data/ch/search";
import { districtCommuneLater, publishedCommuneBlock } from "./ch-commune-block";
import { sourceById, sourcesById } from "../data/ch/sources";
import type { ChLang } from "../data/ch/types";
import { formatNumber, localDate, trustCopy, ui } from "../data/ch/ui";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";
import { socialMetaTags } from "../src/lib/social";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const LANGS: ChLang[] = ["de", "fr", "it", "en"];
const OFFICE = sourceById("bk-nationalrat").url;
const SOURCE_IDS = ["agvch-hist", "opendata-hgv", "bv-1999", "admin-20250827", "bk-nationalrat"] as const;
const OG: Record<ChLang, string> = { de: "de_CH", fr: "fr_CH", it: "it_CH", en: "en_US" };

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cantonByAbbr(abbr: string) {
  const canton = CANTONS.find((item) => item.abbr === abbr);
  if (!canton) throw new Error(`No canton ${abbr}`);
  return canton;
}

function copied(lang: ChLang): string {
  if (lang === "de") return "Kopie vom 18. Oktober 2026.";
  if (lang === "fr") return "Copie du 18 octobre 2026.";
  if (lang === "it") return "Copia del 18 ottobre 2026.";
  return "Copied on 18 October 2026.";
}

function constituency(lang: ChLang, cantonName: string): string {
  if (lang === "de") {
    return `Der Wahlkreis für den Nationalrat ist der Kanton ${cantonName}, nicht dieser Eintrag (Artikel 149 Absatz 3 der Bundesverfassung). Die Medienmitteilung des Bundesrates vom 27. August 2025 nennt die Nationalratswahlen vom 24. Oktober 2027. Ein Wahldatum dieser Verwaltungseinheit steht hier nicht.`;
  }
  if (lang === "fr") {
    return `La circonscription du Conseil national est le canton ${cantonName}, et non cette entrée (article 149, alinéa 3, de la Constitution fédérale). Le communiqué du Conseil fédéral du 27 août 2025 nomme les élections au Conseil national du 24 octobre 2027. Aucune date de scrutin de cette unité n’est inscrite ici.`;
  }
  if (lang === "it") {
    return `Il circondario del Consiglio nazionale è il cantone ${cantonName}, non questa voce (articolo 149 capoverso 3 della Costituzione federale). Il comunicato del Consiglio federale del 27 agosto 2025 indica le elezioni del Consiglio nazionale del 24 ottobre 2027. Qui non è indicata una data di votazione di questa unità.`;
  }
  return `The National Council constituency is the canton of ${cantonName}, not this register entry (article 149 paragraph 3 of the Federal Constitution). The Federal Council release of 27 August 2025 names the National Council elections of 24 October 2027. No polling date for this unit is printed here.`;
}

function officeGap(lang: ChLang): string {
  if (lang === "de") {
    return "Ein amtliches Verzeichnis der Bezirksbehörden oder anderer Amtsträger dieser Einheit lag am 18. Oktober 2026 nicht vor. Es wird kein Name eingesetzt.";
  }
  if (lang === "fr") {
    return "Aucun répertoire officiel des autorités de district ou d’autres titulaires de cette unité n’avait été lu le 18 octobre 2026. Aucun nom n’est ajouté.";
  }
  if (lang === "it") {
    return "Il 18 ottobre 2026 non era stato letto un repertorio ufficiale delle autorità di distretto o di altri titolari di questa unità. Non si inserisce alcun nome.";
  }
  return "No official list of district authorities or other officeholders of this unit had been read on 18 October 2026. No name is added.";
}

function attribution(lang: ChLang): string {
  if (lang === "de") {
    return "Quelle: Bundesamt für Statistik (BFS), Historisiertes Gemeindeverzeichnis der Schweiz, eCH-0071 Version 1.2.0, Dateien 20260101_GDEHist_BEZ.txt und 20260101_GDEHist_GDE.txt. Kopie vom 18. Oktober 2026. opendata.swiss kennzeichnet den Datensatz mit «Open use». Keine amtliche Veröffentlichung des BFS.";
  }
  if (lang === "fr") {
    return "Source : Office fédéral de la statistique (OFS), liste historisée des communes de Suisse, eCH-0071 version 1.2.0, fichiers 20260101_GDEHist_BEZ.txt et 20260101_GDEHist_GDE.txt. Copie du 18 octobre 2026. opendata.swiss marque le jeu de données « Open use ». Ceci n’est pas une publication officielle de l’OFS.";
  }
  if (lang === "it") {
    return "Fonte: Ufficio federale di statistica (UST), repertorio storicizzato dei comuni della Svizzera, eCH-0071 versione 1.2.0, file 20260101_GDEHist_BEZ.txt e 20260101_GDEHist_GDE.txt. Copia del 18 ottobre 2026. opendata.swiss contrassegna il set di dati con «Open use». Non è una pubblicazione ufficiale dell’UST.";
  }
  return "Source: Federal Statistical Office (FSO), Swiss official commune’s historicized list, eCH-0071 version 1.2.0, files 20260101_GDEHist_BEZ.txt and 20260101_GDEHist_GDE.txt. Copied on 18 October 2026. opendata.swiss marks the dataset “Open use”. This is not an official FSO publication.";
}

function pageDocument(input: {
  lang: ChLang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const copy = ui(input.lang);
  const trust = trustCopy(input.lang);
  const canonical = absoluteUrl(input.path);
  const alternates = LANGS.map((code) => {
    const href = absoluteUrl(input.path.replace(/^\/ch\/(de|fr|it|en)\//, `/ch/${code}/`));
    return `<link rel="alternate" hreflang="${code}" href="${esc(href)}">`;
  }).join("");
  const xDefault = absoluteUrl(input.path.replace(/^\/ch\/(de|fr|it|en)\//, "/ch/en/"));
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: input.crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
  const crumbNav = input.crumbs
    .map((item, index) =>
      index === input.crumbs.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const langs = LANGS.map((code) => {
    const href = input.path.replace(/^\/ch\/(de|fr|it|en)\//, `/ch/${code}/`);
    const label = code === "de" ? "Deutsch" : code === "fr" ? "Français" : code === "it" ? "Italiano" : "English";
    return `<a href="${esc(href)}">${label}</a>`;
  }).join(" · ");
  const sources = sourcesById([...SOURCE_IDS])
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}</li>`,
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="${input.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(input.title)} · ${esc(SITE.name)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
${alternates}
<link rel="alternate" hreflang="x-default" href="${esc(xDefault)}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(`${input.title} · ${SITE.name}`)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${OG[input.lang]}">
${socialMetaTags()}
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
${ADSENSE_HEAD_TAGS}
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">${esc(trust.before)}<a href="${esc(OFFICE)}">${esc(trust.link)}</a>${esc(trust.after)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(`/ch/${input.lang}/`)}">${esc(copy.switzerland)}</a> · <a href="/search/">${esc(trust.search)}</a> · ${langs}</header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
${input.body}
<p><strong>${esc(trust.updated)}: ${esc(localDate(SITE.lastUpdated, input.lang))}.</strong> ${esc(copied(input.lang))} <a href="${esc(reportErrorHref(input.path))}">${esc(trust.report)}</a></p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sources}</ul>
<p>${esc(attribution(input.lang))}</p>
</main>
${withLegalFooter("")}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function districtPage(lang: ChLang, district: District): string {
  const copy = ui(lang);
  const canton = cantonByAbbr(district.canton);
  const path = districtPath(lang, canton.slug, district.slug);
  const neighbors = districtNeighbors(district.canton, district.slug);
  const near = [neighbors.prev, neighbors.next]
    .filter((item): item is District => Boolean(item))
    .map((item) => `<a href="${esc(districtPath(lang, canton.slug, item.slug))}">${esc(item.officialName)}</a>`)
    .join(" · ");
  const description =
    lang === "de"
      ? `${district.officialName}: Eintrag im historisierten Gemeindeverzeichnis, ${district.municipalities} politische Gemeinden, Kanton ${canton.officialName}. Inoffizielle Information.`
      : lang === "fr"
        ? `${district.officialName} : entrée du répertoire historisé des communes, ${district.municipalities} communes politiques, canton ${canton.officialName}. Information non officielle.`
        : lang === "it"
          ? `${district.officialName}: voce del repertorio storicizzato dei comuni, ${district.municipalities} comuni politici, cantone ${canton.officialName}. Informazione non ufficiale.`
          : `${district.officialName}: historized commune-register entry, ${district.municipalities} political municipalities, canton ${canton.officialName}. Unofficial information.`;
  const body = `<p class="eyebrow">${esc(copy.districts)}</p>
<h1>${esc(district.officialName)}</h1>
<p class="lede">${esc(canton.officialName)}</p>
<table>
<tr><th>BFS</th><td>${esc(district.bfsNumber)}</td></tr>
<tr><th>${esc(lang === "de" ? "Kurzname" : lang === "fr" ? "Nom court" : lang === "it" ? "Nome breve" : "Short name")}</th><td>${esc(district.shortName)}</td></tr>
<tr><th>${esc(lang === "de" ? "Politische Gemeinden" : lang === "fr" ? "Communes politiques" : lang === "it" ? "Comuni politici" : "Political municipalities")}</th><td>${esc(formatNumber(district.municipalities, lang))}</td></tr>
<tr><th>${esc(lang === "de" ? "Gültig ab" : lang === "fr" ? "Valable depuis" : lang === "it" ? "Valido dal" : "Valid from")}</th><td>${esc(district.validFrom)}</td></tr>
</table>
<p>${esc(constituency(lang, canton.officialName))}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(officeGap(lang))}</p>
${
  publishedCommuneBlock(lang, canton.slug, district.canton, district.slug) ??
  `<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(districtCommuneLater(lang))}</p>`
}
<p class="tools">${esc(copy.parent)}: <a href="${esc(`/ch/${lang}/${canton.slug}/`)}">${esc(canton.officialName)}</a> · <a href="${esc(districtsIndexPath(lang))}">${esc(copy.districts)}</a>. ${esc(copy.alphaNearby)}: ${near}</p>
`;
  return pageDocument({
    lang,
    path,
    title: district.officialName,
    description,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.switzerland, path: "/ch/" },
      { name: copy.switzerland, path: `/ch/${lang}/` },
      { name: canton.officialName, path: `/ch/${lang}/${canton.slug}/` },
      { name: district.officialName, path },
    ],
    body,
  });
}

function indexPage(lang: ChLang): string {
  const copy = ui(lang);
  const path = districtsIndexPath(lang);
  const groups = CANTONS.filter((canton) => districtsForCanton(canton.abbr).length > 0)
    .slice()
    .sort((a, b) => a.officialName.localeCompare(b.officialName, "de"))
    .map((canton) => {
      const links = districtsForCanton(canton.abbr)
        .map(
          (district) =>
            `<li><a href="${esc(districtPath(lang, canton.slug, district.slug))}">${esc(district.officialName)}</a></li>`,
        )
        .join("");
      return `<h2><a href="${esc(`/ch/${lang}/${canton.slug}/`)}">${esc(canton.officialName)}</a></h2><ul>${links}</ul>`;
    })
    .join("");
  const description =
    lang === "de"
      ? "135 Namen aus dem historisierten Gemeindeverzeichnis, Stand 1. Januar 2026, in den Kantonen mit mindestens zwei solchen Einträgen. Inoffizielle Information."
      : lang === "fr"
        ? "135 noms du répertoire historisé des communes, état au 1er janvier 2026, dans les cantons qui en comptent au moins deux. Information non officielle."
        : lang === "it"
          ? "135 nomi del repertorio storicizzato dei comuni, stato al 1° gennaio 2026, nei cantoni che ne hanno almeno due. Informazione non ufficiale."
          : "135 names from the historized commune register, state at 1 January 2026, in cantons with at least two such entries. Unofficial information.";
  const intro =
    lang === "de"
      ? "Gedruckt wird der Name aus 20260101_GDEHist_BEZ.txt, wenn der Eintrag am 1. Januar 2026 mindestens eine politische Gemeinde (Typ 11) enthält und der Kanton mindestens zwei solche Namen hat. Neun Kantone haben nur einen Eintrag; für den gibt es keine eigene Seite."
      : lang === "fr"
        ? "Le nom imprimé est celui de 20260101_GDEHist_BEZ.txt lorsque l’entrée contient, au 1er janvier 2026, au moins une commune politique (type 11) et que le canton a au moins deux de ces noms. Neuf cantons n’ont qu’une entrée ; elle n’a pas de page propre."
        : lang === "it"
          ? "Si stampa il nome di 20260101_GDEHist_BEZ.txt quando la voce contiene, al 1° gennaio 2026, almeno un comune politico (tipo 11) e il cantone ha almeno due di questi nomi. Nove cantoni hanno una sola voce; per essa non c’è una pagina propria."
          : "The name printed is the one in 20260101_GDEHist_BEZ.txt when the entry contains, on 1 January 2026, at least one political municipality (type 11) and the canton has at least two such names. Nine cantons have only one entry; that entry has no page of its own.";
  return pageDocument({
    lang,
    path,
    title: copy.districts,
    description,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.switzerland, path: "/ch/" },
      { name: copy.switzerland, path: `/ch/${lang}/` },
      { name: copy.districts, path },
    ],
    body: `<h1>${esc(copy.districts)}</h1><p>${esc(intro)}</p>${groups}`,
  });
}

function write(path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

let written = 0;
for (const lang of LANGS) {
  write(districtsIndexPath(lang), indexPage(lang));
  written += 1;
  for (const district of DISTRICTS) {
    const canton = cantonByAbbr(district.canton);
    write(districtPath(lang, canton.slug, district.slug), districtPage(lang, district));
    written += 1;
  }
}

console.log(`switzerland district html: ${written}`);
