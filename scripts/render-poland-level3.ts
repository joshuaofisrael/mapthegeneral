import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  allGminy,
  gminaIndexPath,
  gminaNeighbors,
  gminaPath,
  gminasIn,
  powiatGminaIndexPath,
  type Gmina,
} from "../data/pl/gminy";
import { allPowiats, powiatHeading, powiatPath, senatOkregPath, sejmOkregPath, type Powiat } from "../data/pl/level2";
import { alphaVoivodeships, voivodeshipBySlug } from "../data/pl/places";
import { polandHome, voivodeshipPath } from "../data/pl/paths";
import { sourcesById } from "../data/pl/sources";
import type { Lang } from "../data/pl/types";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";
import { CLOUDFLARE_BEACON_TAG } from "../src/lib/cloudflare-beacon";
import { nearbyIds, nearbyPlacesParagraph } from "../src/lib/nearby-html";
import { socialMetaTags } from "../src/lib/social";

const PKW_RESULTS = "https://samorzad2024.pkw.gov.pl/samorzad2024/";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://pkw.gov.pl/";
const READ = "2026-10-19";

const KIND_EN: Record<string, string> = {
  "gmina wiejska": "rural gmina",
  "gmina miejska": "urban gmina",
  "gmina miejsko-wiejska": "urban-rural gmina",
  "gmina miejska, miasto stołeczne": "urban gmina, capital city",
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SHORT: Record<string, string> = {
  "teryt-terc-20261019": "GUS, TERC_Urzedowy_2026-10-19",
  "teryt-zasady": "GUS, zasady udostępniania TERYT",
  "pkw-wybrani-wbp-2024": "PKW, wybrani wójt burmistrz prezydent 2024",
  "pkw-rady-2024": "PKW, obwieszczenie o radach, 9 kwietnia 2024 r.",
  "pkw-wbp-tura2-2024": "PKW, ponowne głosowanie, Dz.U. 2024 poz. 617",
  "samorzad-gmina": "Ustawa o samorządzie gminnym, Dz.U. 2026 poz. 662",
  kodeks: "Kodeks wyborczy, Dz.U. 2026 poz. 1261",
  "pkw-okregi-rady-gmin-2024": "PKW, okręgi rad gmin 2024, suma mandatów",
  "senate-okregi": "Senat, okręgi wyborcze",
  "rm-karkonoski-2020": "Rada Ministrów, Dz.U. 2020 poz. 1331",
  "pkw-senat-20-2026": "PKW, wybory uzupełniające do Senatu, okręg 20",
  "postanowienie-senat-20-2026": "Postanowienie Prezydenta, Dz.U. 2026 poz. 1255",
};

function sourceList(ids: string[]): string {
  return sourcesById(ids)
    .map((source) => `<a href="${esc(source.url)}">${esc(SHORT[source.id] ?? source.name)}</a> (${esc(source.readOn)})`)
    .join("; ");
}

function crumbsHtml(crumbs: { name: string; path: string }[]): string {
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

function shell(input: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const pl = input.lang === "pl";
  const other: Lang = pl ? "en" : "pl";
  const otherPath = input.path.replace(/^\/pl\/(pl|en)\//, `/pl/${other}/`);
  const plHref = absoluteUrl(pl ? input.path : otherPath);
  const enHref = absoluteUrl(pl ? otherPath : input.path);
  const canonical = absoluteUrl(input.path);
  const updated = pl ? "Aktualizacja: 19 października 2026 r." : "Updated 19 October 2026.";
  return `<!DOCTYPE html>
<html lang="${input.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(input.title)} · ${esc(SITE.name)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="pl" href="${esc(plHref)}">
<link rel="alternate" hreflang="en" href="${esc(enHref)}">
<link rel="alternate" hreflang="x-default" href="${esc(enHref)}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(input.title)} · ${esc(SITE.name)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${pl ? "pl_PL" : "en_US"}">
${socialMetaTags()}
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd(input.crumbs)}</script>
${ADSENSE_HEAD_TAGS}
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">${pl ? `Informacja nieoficjalna. Potwierdź w <a href="${OFFICE}">PKW</a>.` : `Unofficial. Confirm with the <a href="${OFFICE}">official election office</a>.`}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(polandHome(input.lang))}">${pl ? "Polska" : "Poland"}</a> · <a href="/search/">${pl ? "Szukaj" : "Search"}</a> · <a href="${esc(otherPath)}">${pl ? "English" : "Polski"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbsHtml(input.crumbs)}</nav>
${input.body}
<p><strong>${esc(updated)}</strong> <a href="${esc(reportErrorHref(input.path))}">${pl ? "Zgłoś błąd" : "Report an error"}</a></p>
</main>
${withLegalFooter("")}
${CLOUDFLARE_BEACON_TAG}
</body>
</html>
`;
}

function writePage(path: string, html: string): void {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function officeHtml(lang: Lang, gmina: Gmina): string {
  const pl = lang === "pl";
  const link = `<a href="${esc(PKW_RESULTS)}">${pl ? "Państwowa Komisja Wyborcza" : "National Electoral Commission (PKW)"}</a>`;
  const title = gmina.office
    ? `<p>${pl ? "Organ wykonawczy" : "Executive office"}: ${esc(gmina.office)}.</p>`
    : `<p class="gap">${pl ? "Luka. Tej gminy nie ma w pliku PKW z wybranymi wójtami, burmistrzami i prezydentami miast." : "Gap. This gmina has no row in the PKW file of elected wójtowie, burmistrzowie and prezydenci miast."}</p>`;
  return `${title}<p>${
    pl
      ? `Ta strona nie podaje nazwisk wójtów, burmistrzów, prezydentów miast ani komitetów wyborczych. Oficjalnym źródłem wyników wyborów samorządowych jest ${link}.`
      : `This page does not list the names of wójtowie, burmistrzowie or prezydenci miast, or their election committees. The official source for local election results is the ${link}.`
  }</p>`;
}

function councilHtml(lang: Lang, gmina: Gmina): string {
  const pl = lang === "pl";
  if (gmina.seats == null) {
    return `<p class="gap">${
      pl
        ? "Luka. Plik PKW z okręgami do rad gmin nie ma wiersza o tym kodzie TERYT. Liczby mandatów ani nazwisk radnych nie uzupełniono."
        : "Gap. The PKW file of gmina-council okręgi has no row for this TERYT code. The mandate count and the councillors’ names are not filled in."
    }</p>`;
  }
  return `<p>${pl ? `Mandaty: ${gmina.seats}. Nazwisk radnych nie ma.` : `Mandates: ${gmina.seats}. Councillor names are not listed.`}</p>`;
}

function constituencyHtml(lang: Lang, gmina: Gmina): string {
  const pl = lang === "pl";
  const parts: string[] = [];
  if (gmina.senat) {
    const href = senatOkregPath(lang, gmina.senat);
    if (gmina.powiatCode === "0206") {
      parts.push(
        pl
          ? `Senat <a href="${esc(href)}">${gmina.senat}</a> (w tabeli: jeleniogórski; od 1 stycznia 2021 r. karkonoski, Dz.U. 2020 poz. 1331)`
          : `Senate <a href="${esc(href)}">${gmina.senat}</a> (table name jeleniogórski; karkonoski from 1 January 2021, Dz.U. 2020 item 1331)`,
      );
    } else {
      parts.push(pl ? `Senat <a href="${esc(href)}">${gmina.senat}</a>` : `Senate <a href="${esc(href)}">${gmina.senat}</a>`);
    }
  } else if (gmina.senatSplit) {
    parts.push(pl ? "Senat: miasto podzielone, bez przypisania gminy" : "Senate: city divided, gmina not assigned");
  }
  if (gmina.sejm) {
    const href = sejmOkregPath(lang, gmina.sejm);
    parts.push(pl ? `Sejm <a href="${esc(href)}">${gmina.sejm}</a>` : `Sejm <a href="${esc(href)}">${gmina.sejm}</a>`);
  } else {
    parts.push(pl ? "Sejm: województwo podzielone, bez przypisania gminy" : "Sejm: voivodeship divided, gmina not assigned");
  }
  if (gmina.senat === 20) {
    parts.push(
      pl
        ? "Wybory uzupełniające 22 listopada 2026 r. Ta strona nie podaje badań opinii ani wyniku."
        : "By-election 22 November 2026. This page prints no opinion research and no result.",
    );
  }
  return `<p>${parts.join(". ")}.</p>`;
}

function electionsHtml(lang: Lang): string {
  const pl = lang === "pl";
  if (pl) {
    return `<p>Rady i pierwsza tura organu wykonawczego: 7 kwietnia 2024 r. Ponowne głosowanie: 21 kwietnia 2024 r. Tury tej gminy plik nie podaje. Kadencja rady: 5 lat od wyboru (art. 16). Kadencja wójta: art. 26 ust. 2. Następne regularne wybory: 2029 (art. 371 § 1). Dnia głosowania nie odczytano ${READ}.</p>`;
  }
  return `<p>Councils and the first executive round: 7 April 2024. Second ballot: 21 April 2024. This gmina’s round is not in the file. Council term: five years from election day (article 16). Wójt’s term: article 26(2). Next regular election: 2029 (article 371 § 1). No polling day was read on 19 October 2026.</p>`;
}

function gminaPage(lang: Lang, gmina: Gmina, powiat: Powiat): string {
  const pl = lang === "pl";
  const voj = voivodeshipBySlug(gmina.voivodeshipSlug);
  if (!voj) throw new Error(gmina.voivodeshipSlug);
  const path = gminaPath(lang, gmina);
  const parentHeading = powiatHeading(powiat);
  const gloss = KIND_EN[gmina.kind];
  if (!gloss) throw new Error(gmina.kind);
  const neighbors = gminaNeighbors(gmina);
  const near = [neighbors.prev, neighbors.next]
    .filter((item): item is Gmina => Boolean(item))
    .map((item) => `<a href="${esc(gminaPath(lang, item))}">${esc(item.name)}</a>`)
    .join(" · ");
  const title = `${gmina.name} — ${gmina.kind}`;
  const description = pl
    ? `${gmina.name}, ${gmina.kind}, TERC ${gmina.code}. Informacja nieoficjalna.`
    : `${gmina.name}, ${gloss}, TERC ${gmina.code}. Unofficial.`;
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: voj.name, path: voivodeshipPath(lang, voj.slug) },
    { name: parentHeading, path: powiatPath(lang, powiat.voivodeshipSlug, powiat.slug) },
    { name: gmina.name, path },
  ];
  const indexSources = `${gminaIndexPath(lang)}#sources`;
  const extra =
    (gmina.powiatCode === "0206"
      ? ` <a href="https://dziennikustaw.gov.pl/DU/2020/1331">Dz.U. 2020 poz. 1331</a> (2026-10-19).`
      : "") +
    (gmina.senat === 20
      ? ` <a href="https://wybory.gov.pl/senat20261122/pl">PKW, okręg 20</a> (2026-10-18). <a href="https://www.dziennikustaw.gov.pl/DU/2026/1255">Dz.U. 2026 poz. 1255</a> (2026-10-18).`
      : "");
  const body = `<p class="eyebrow">${esc(gmina.kind)}${pl ? "" : ` · ${esc(gloss)}`}</p>
<h1>${esc(gmina.name)}</h1>
<p class="lede">${esc(parentHeading)}, ${esc(voj.name)}</p>
<p>NAZWA ${esc(gmina.name)}. NAZWA_DOD ${esc(gmina.kind)}. TERC ${esc(gmina.code)} (WOJ ${esc(gmina.woj)}, POW ${esc(gmina.pow)}, GMI ${esc(gmina.gmi)}, RODZ ${esc(gmina.rodz)}). STAN_NA ${esc(gmina.stanNa)}. TERC_Urzedowy_2026-10-19.</p>
<h2>${pl ? "Organ wykonawczy" : "Executive"}</h2>
${officeHtml(lang, gmina)}
<h2>${pl ? "Rada" : "Council"}</h2>
${councilHtml(lang, gmina)}
<h2>${pl ? "Wybory" : "Elections"}</h2>
${electionsHtml(lang)}
<h2>${pl ? "Okręgi" : "Constituencies"}</h2>
${constituencyHtml(lang, gmina)}
<p><a href="${esc(powiatPath(lang, powiat.voivodeshipSlug, powiat.slug))}">${esc(parentHeading)}</a> · <a href="${esc(powiatGminaIndexPath(lang, powiat.voivodeshipSlug, powiat.slug))}">${pl ? "Gminy" : "Gminas"}</a> · <a href="${esc(voivodeshipPath(lang, voj.slug))}">${esc(voj.name)}</a>${near ? ` · ${near}` : ""}</p>
${nearbyPlacesParagraph(
  lang,
  nearbyIds(`pl:${gmina.code}`)
    .map((code) => allGminy().find((item) => item.code === code))
    .filter((item): item is Gmina => Boolean(item))
    .map((item) => ({ href: gminaPath(lang, item), name: item.name })),
)}
<p>${pl ? "Źródła" : "Sources"}: <a href="https://api.sejm.gov.pl/eli/acts/DU/2026/662/text.pdf">Dz.U. 2026 poz. 662</a>, <a href="https://api.sejm.gov.pl/eli/acts/DU/2026/1261/text.pdf">1261</a>, <a href="https://api.sejm.gov.pl/eli/acts/DU/2024/617/text.html">2024 poz. 617</a>.${extra} <a href="${esc(indexSources)}">TERC, PKW${pl ? "" : ", Senate"}</a>.</p>`;
  return shell({ lang, path, title, description, crumbs, body });
}

function powiatIndexPage(lang: Lang, powiat: Powiat): string {
  const pl = lang === "pl";
  const voj = voivodeshipBySlug(powiat.voivodeshipSlug);
  if (!voj) throw new Error(powiat.voivodeshipSlug);
  const heading = powiatHeading(powiat);
  const path = powiatGminaIndexPath(lang, powiat.voivodeshipSlug, powiat.slug);
  const list = gminasIn(powiat.voivodeshipSlug, powiat.slug)
    .map((gmina) => `<li><a href="${esc(gminaPath(lang, gmina))}">${esc(gmina.name)}</a> — ${esc(gmina.kind)}, ${esc(gmina.code)}</li>`)
    .join("");
  const title = pl ? `Gminy — ${heading}` : `Gminas — ${heading}`;
  const description = pl
    ? `Gminy w jednostce ${heading} według pliku TERC_Urzedowy_2026-10-19. Informacja nieoficjalna.`
    : `Gminas in ${heading} from the file TERC_Urzedowy_2026-10-19. Unofficial information.`;
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: "Polska", path: "/pl/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: voj.name, path: voivodeshipPath(lang, voj.slug) },
    { name: heading, path: powiatPath(lang, powiat.voivodeshipSlug, powiat.slug) },
    { name: pl ? "Gminy" : "Gminas", path },
  ];
  const body = `<p class="eyebrow">${pl ? "Indeks gmin" : "Gmina index"}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(voj.name)}</p>
<p>${pl ? "Każdy wiersz jest gminą z pliku TERC_Urzedowy_2026-10-19, katalog z datą 2026-01-01." : "Each row is a gmina from the file TERC_Urzedowy_2026-10-19, catalog date 2026-01-01."}</p>
<ul>${list}</ul>
<p class="tools"><a href="${esc(powiatPath(lang, powiat.voivodeshipSlug, powiat.slug))}">${esc(heading)}</a> · <a href="${esc(gminaIndexPath(lang))}">${pl ? "Wszystkie gminy" : "All gminas"}</a></p>
<p>${pl ? "Źródła" : "Sources"}: ${sourceList(["teryt-terc-20261019", "teryt-zasady"])}</p>`;
  return shell({ lang, path, title, description, crumbs, body });
}

function nationalIndex(lang: Lang): string {
  const pl = lang === "pl";
  const path = gminaIndexPath(lang);
  const blocks = alphaVoivodeships()
    .map((voj) => {
      const powiats = allPowiats()
        .filter((powiat) => powiat.voivodeshipSlug === voj.slug)
        .sort((a, b) => powiatHeading(a).localeCompare(powiatHeading(b), "pl"));
      const inner = powiats
        .map((powiat) => {
          const links = gminasIn(voj.slug, powiat.slug)
            .map((gmina) => `<li><a href="${esc(gminaPath(lang, gmina))}">${esc(gmina.name)}</a> — ${esc(gmina.kind)}</li>`)
            .join("");
          return `<h3><a href="${esc(powiatGminaIndexPath(lang, voj.slug, powiat.slug))}">${esc(powiatHeading(powiat))}</a></h3><ul>${links}</ul>`;
        })
        .join("");
      return `<h2><a href="${esc(voivodeshipPath(lang, voj.slug))}">${esc(voj.name)}</a></h2>${inner}`;
    })
    .join("");
  const title = pl ? "Gminy" : "Gminas";
  const description = pl
    ? "2 479 gmin z pliku TERC_Urzedowy_2026-10-19. Informacja nieoficjalna."
    : "2,479 gminas from the file TERC_Urzedowy_2026-10-19. Unofficial information.";
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: "Polska", path: "/pl/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: title, path },
  ];
  const body = `<p class="eyebrow">${pl ? "Indeks" : "Index"}</p>
<h1>${esc(title)}</h1>
<p>${
    pl
      ? "Wykaz ma 2 479 wierszy, których NAZWA_DOD zaczyna się od „gmina”, z pliku TERC_Urzedowy_2026-10-19 (katalog z datą 2026-01-01). Plik PKW z wybranymi wójtami, burmistrzami i prezydentami miast ma 2 477 wierszy. Szczawa i Grabówka są w TERC i nie mają wiersza w tamtym pliku. Wilkowice mają wiersz z pustą komórką „Wybrany kandydat”."
      : "The list has 2,479 rows whose NAZWA_DOD starts with “gmina”, from the file TERC_Urzedowy_2026-10-19 (catalog date 2026-01-01). The PKW file of elected wójtowie, burmistrzowie and prezydenci miast has 2,477 rows. Szczawa and Grabówka are in TERC and have no row in that file. Wilkowice has a row whose Wybrany kandydat cell is empty."
  }</p>
${blocks}
<p id="sources">${pl ? "Źródła" : "Sources"}: ${sourceList([
    "teryt-terc-20261019",
    "teryt-zasady",
    "pkw-wybrani-wbp-2024",
    "pkw-okregi-rady-gmin-2024",
    "pkw-rady-2024",
    "pkw-wbp-tura2-2024",
    "samorzad-gmina",
    "samorzad-gmina-1273",
    "kodeks",
    "senate-okregi",
    "rm-karkonoski-2020",
    "pkw-senat-20-2026",
    "postanowienie-senat-20-2026",
  ])}</p>`;
  return shell({ lang, path, title, description, crumbs, body });
}

const powiatByKey = new Map(allPowiats().map((powiat) => [`${powiat.voivodeshipSlug}/${powiat.slug}`, powiat]));

let written = 0;
for (const lang of ["pl", "en"] as const) {
  writePage(gminaIndexPath(lang), nationalIndex(lang));
  written += 1;
  for (const powiat of allPowiats()) {
    writePage(powiatGminaIndexPath(lang, powiat.voivodeshipSlug, powiat.slug), powiatIndexPage(lang, powiat));
    written += 1;
  }
  for (const gmina of allGminy()) {
    const powiat = powiatByKey.get(`${gmina.voivodeshipSlug}/${gmina.powiatSlug}`);
    if (!powiat) throw new Error(gmina.code);
    writePage(gminaPath(lang, gmina), gminaPage(lang, gmina, powiat));
    written += 1;
  }
}
console.log(`poland level 3 html: ${written}`);
