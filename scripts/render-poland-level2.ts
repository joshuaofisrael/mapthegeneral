import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  allPowiats,
  allSejmOkregi,
  allSenatOkregi,
  isCityPowiat,
  mpPageUrl,
  powiatHeading,
  powiatIndexPath,
  powiatNeighbors,
  powiatPath,
  sejmIndexPath,
  sejmOkregPath,
  senatIndexPath,
  senatOkregPath,
  type Powiat,
  type SejmOkreg,
  type SenatOkreg,
} from "../data/pl/level2";
import { gminaIndexPath, gminaPath, gminasIn, powiatGminaIndexPath } from "../data/pl/gminy";
import { voivodeshipBySlug } from "../data/pl/places";
import { polandHome, voivodeshipPath } from "../data/pl/paths";
import { sourcesById } from "../data/pl/sources";
import type { Lang } from "../data/pl/types";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { socialMetaTags } from "../src/lib/social";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://pkw.gov.pl/";
const READ = "2026-10-18";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sourceList(ids: string[]): string {
  return sourcesById(ids)
    .map((source) => `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(source.readOn)}</li>`)
    .join("");
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
  updatedPl?: string;
  updatedEn?: string;
}): string {
  const pl = input.lang === "pl";
  const other: Lang = pl ? "en" : "pl";
  const otherPath = input.path.replace(/^\/pl\/(pl|en)\//, `/pl/${other}/`);
  const plHref = absoluteUrl(pl ? input.path : otherPath);
  const enHref = absoluteUrl(pl ? otherPath : input.path);
  const canonical = absoluteUrl(input.path);
  const updated = pl
    ? (input.updatedPl ?? "Ostatnia aktualizacja tej strony: 18 października 2026 r.")
    : (input.updatedEn ?? "Last updated: 18 October 2026.");
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
<meta property="og:title" content="${esc(input.title)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${pl ? "pl_PL" : "en_US"}">
${socialMetaTags()}
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd(input.crumbs)}</script>
${ADSENSE_HEAD_TAGS}
</head>
<body>
<p class="banner">${pl ? `Informacja nieoficjalna. Potwierdź ją w <a href="${OFFICE}">urzędowym organie wyborczym</a>.` : esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(polandHome(input.lang))}">${pl ? "Polska" : "Poland"}</a> · <a href="/search/">${pl ? "Szukaj" : "Search"}</a> · <a href="${esc(otherPath)}">${pl ? "English" : "Polski"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbsHtml(input.crumbs)}</nav>
${input.body}
<p><strong>${esc(updated)}</strong> <a href="${esc(reportErrorHref(input.path))}">${pl ? "Zgłoś błąd" : "Report an error"}</a></p>
</main>
${withLegalFooter("")}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function writePage(path: string, html: string): void {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function powiatPage(lang: Lang, powiat: Powiat): string {
  const pl = lang === "pl";
  const voj = voivodeshipBySlug(powiat.voivodeshipSlug);
  if (!voj) throw new Error(powiat.voivodeshipSlug);
  const path = powiatPath(lang, powiat.voivodeshipSlug, powiat.slug);
  const heading = powiatHeading(powiat);
  const city = isCityPowiat(powiat.kind);
  const neighbors = powiatNeighbors(powiat);
  const near = [neighbors.prev, neighbors.next]
    .filter((item): item is Powiat => Boolean(item))
    .map((item) => `<a href="${esc(powiatPath(lang, item.voivodeshipSlug, item.slug))}">${esc(powiatHeading(item))}</a>`)
    .join(" · ");
  const office = city ? (pl ? "Prezydent miasta" : "City mayor (prezydent miasta)") : pl ? "Starosta" : "Starosta";
  const election = city
    ? pl
      ? "Obwieszczenie PKW z 9 kwietnia 2024 r. podaje zbiorcze wyniki wyborów wójtów, burmistrzów i prezydentów miast przeprowadzonych 7 kwietnia 2024 r. Nie przepisuje wyniku tego miasta."
      : "The National Electoral Commission announcement of 9 April 2024 gives the national totals for the 7 April 2024 elections of wójtowie, burmistrzowie and prezydenci miast. It does not give this city’s result."
    : pl
      ? "Obwieszczenie PKW z 9 kwietnia 2024 r. podaje zbiorcze wyniki wyborów do rad przeprowadzonych 7 kwietnia 2024 r. Nie przepisuje wyniku rady tego powiatu."
      : "The National Electoral Commission announcement of 9 April 2024 gives the national totals for the council elections held on 7 April 2024. It does not give this powiat council’s result.";
  const next = pl
    ? `18 października 2026 r. nie odczytano zarządzenia wyznaczającego następne wybory tej jednostki. Ta strona nie podaje dnia głosowania.`
    : `No order setting this unit’s next election was read on ${READ}. This page does not print a polling day.`;
  const gap = pl
    ? "Luka. Na potrzeby tej strony nie odczytano urzędowego wykazu z nazwiskiem starosty albo prezydenta miasta. Nazwiska nie uzupełniono."
    : "Gap. No official list read for this page names the starosta or the prezydent miasta. The name is not filled in.";
  const eyebrow = city ? (pl ? "Miasto na prawach powiatu" : "City with powiat status") : pl ? "Powiat" : "Powiat";
  const description = pl
    ? `${heading}: ${powiat.kind}, kod TERC ${powiat.code}, ${voj.name}. Informacja nieoficjalna.`
    : `${heading}: ${powiat.kind}, TERC code ${powiat.code}, ${voj.name}. Unofficial information.`;
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: "Polska", path: "/pl/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: voj.name, path: voivodeshipPath(lang, voj.slug) },
    { name: heading, path },
  ];
  const children = gminasIn(powiat.voivodeshipSlug, powiat.slug);
  const gminaLinks = children
    .map((gmina) => `<li><a href="${esc(gminaPath(lang, gmina))}">${esc(gmina.name)}</a> — ${esc(gmina.kind)}</li>`)
    .join("");
  const body = `<p class="eyebrow">${esc(eyebrow)}</p>
<h1>${esc(heading)}</h1>
<p class="lede">${esc(voj.name)}</p>
<table>
<tr><th>NAZWA</th><td>${esc(powiat.name)}</td></tr>
<tr><th>NAZWA_DOD</th><td>${esc(powiat.kind)}</td></tr>
<tr><th>TERC</th><td>${esc(powiat.code)} (WOJ ${esc(powiat.woj)}, POW ${esc(powiat.pow)})</td></tr>
<tr><th>STAN_NA</th><td>${esc(powiat.stanNa)}</td></tr>
</table>
<p>${pl ? "Pola powyżej są przepisane z pliku TERC_Urzedowy_2026-10-18. Katalog w pliku ma datę 2026-01-01." : "The fields above are copied from the file TERC_Urzedowy_2026-10-18. The catalog date inside the file is 2026-01-01."}</p>
<h2>${esc(office)}</h2>
<p class="gap">${esc(gap)}</p>
<h2>${pl ? "Wybory" : "Elections"}</h2>
<p>${esc(election)}</p>
<p>${esc(next)}</p>
<h2>${pl ? "Gminy" : "Gminas"}</h2>
<p>${pl ? `Plik TERC_Urzedowy_2026-10-19, katalog z datą 2026-01-01, ma w tej jednostce ${children.length} wierszy, których NAZWA_DOD zaczyna się od „gmina”.` : `The file TERC_Urzedowy_2026-10-19, catalog date 2026-01-01, has ${children.length} rows in this unit whose NAZWA_DOD starts with “gmina”.`}</p>
<ul>${gminaLinks}</ul>
<p class="tools"><a href="${esc(powiatGminaIndexPath(lang, powiat.voivodeshipSlug, powiat.slug))}">${pl ? "Indeks gmin tego powiatu" : "Gmina index for this powiat"}</a> · <a href="${esc(gminaIndexPath(lang))}">${pl ? "Wszystkie gminy" : "All gminas"}</a></p>
<p class="tools">${pl ? "Strony nadrzędne" : "Parent pages"}: <a href="${esc(voivodeshipPath(lang, voj.slug))}">${esc(voj.name)}</a> · <a href="${esc(powiatIndexPath(lang))}">${pl ? "Powiaty" : "Powiats"}</a> · <a href="${esc(polandHome(lang))}">${pl ? "Polska" : "Poland"}</a>. ${pl ? "Sąsiednie nazwy" : "Nearby names"}: ${near}</p>
<h2>${pl ? "Źródła" : "Sources"}</h2>
<ul>${sourceList(city ? ["teryt-terc", "teryt-terc-20261019", "teryt-zasady", "pkw-wojt-2024"] : ["teryt-terc", "teryt-terc-20261019", "teryt-zasady", "pkw-rady-2024"])}</ul>`;
  return shell({
    lang,
    path,
    title: heading,
    description,
    crumbs,
    body,
    updatedPl: "Ostatnia aktualizacja tej strony: 19 października 2026 r.",
    updatedEn: "Last updated: 19 October 2026.",
  });
}

function sejmPage(lang: Lang, okreg: SejmOkreg): string {
  const pl = lang === "pl";
  const voj = voivodeshipBySlug(okreg.voivodeshipSlug);
  if (!voj) throw new Error(okreg.voivodeshipSlug);
  const path = sejmOkregPath(lang, okreg.num);
  const title = pl ? `Okręg wyborczy nr ${okreg.num} do Sejmu` : `Sejm constituency ${okreg.num}`;
  const prev = okreg.num > 1 ? okreg.num - 1 : undefined;
  const next = okreg.num < 41 ? okreg.num + 1 : undefined;
  const near = [prev, next]
    .filter((n): n is number => Boolean(n))
    .map((n) => `<a href="${esc(sejmOkregPath(lang, n))}">${n}</a>`)
    .join(" · ");
  const members = okreg.members
    .map(
      (member) =>
        `<li><a href="${esc(mpPageUrl(member.id))}">${esc(member.name)}</a> — ${esc(member.clubName)}</li>`,
    )
    .join("");
  const description = pl
    ? `Okręg nr ${okreg.num} do Sejmu: ${okreg.seats} posłów, siedziba OKW ${okreg.okw}. Informacja nieoficjalna.`
    : `Sejm constituency ${okreg.num}: ${okreg.seats} deputies, OKW seat ${okreg.okw}. Unofficial information.`;
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: "Polska", path: "/pl/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: pl ? "Okręgi do Sejmu" : "Sejm constituencies", path: sejmIndexPath(lang) },
    { name: String(okreg.num), path },
  ];
  const body = `<p class="eyebrow">${pl ? "Sejm" : "Sejm"}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(voj.name)}</p>
<table>
<tr><th>${pl ? "Numer" : "Number"}</th><td>${okreg.num}</td></tr>
<tr><th>${pl ? "Posłowie w załączniku nr 1" : "Deputies in annex 1"}</th><td>${okreg.seats}</td></tr>
<tr><th>${pl ? "Siedziba OKW w załączniku" : "OKW seat in the annex"}</th><td>${esc(okreg.okw)}</td></tr>
<tr><th>districtName</th><td>${esc(okreg.districtName)}</td></tr>
<tr><th>${pl ? "Województwo w API" : "Voivodeship in the API"}</th><td>${esc(okreg.voivodeship)}</td></tr>
<tr><th>${pl ? "Aktywni posłowie w API" : "Active deputies in the API"}</th><td>${okreg.members.length}</td></tr>
</table>
<p>${pl ? "Liczba posłów i siedziba OKW są z załącznika nr 1 do Kodeksu wyborczego (Dz. U. 2026 poz. 1261). districtName i województwo są polami API Sejmu odczytanymi 18 października 2026 r. Ta strona nie przepisuje akapitu granicy z załącznika." : "The deputy count and the OKW seat are from annex 1 of the electoral code (Dziennik Ustaw 2026 item 1261). districtName and the voivodeship are Sejm API fields read on 18 October 2026. This page does not reprint the annex boundary paragraph."}</p>
<h2>${pl ? "Posłowie z aktywnym mandatem" : "Deputies with an active mandate"}</h2>
<ul>${members}</ul>
<p>${pl ? "Lista obejmuje rekordy z polem active równym true. Nie obejmuje daty urodzenia, adresu e-mail ani zawodu z tego API." : "The list is the records whose active field is true. It does not include birth date, email address, or profession from that API."}</p>
<h2>${pl ? "Wybory" : "Elections"}</h2>
<p>${pl ? "Ostatnie wybory do Sejmu w obwieszczeniu PKW z 17 października 2023 r. odbyły się 15 października 2023 r. Skład powyżej jest późniejszym odczytem API, nie listą z tamtego obwieszczenia." : "The last Sejm election in the Commission announcement of 17 October 2023 was held on 15 October 2023. The list above is a later API reading, not the list in that announcement."}</p>
<p>${pl ? `Następne wybory do Sejmu i Senatu w oknie konstytucyjnym: <a href="${esc(polandHome(lang))}elections/sejm-senat-2027/">14 października–12 listopada 2027</a>. 18 października 2026 r. nie odczytano postanowienia Prezydenta wyznaczającego dzień tych wyborów.` : `Next Sejm and Senate election in the constitutional window: <a href="${esc(polandHome(lang))}elections/sejm-senat-2027/">14 October–12 November 2027</a>. No presidential order setting that day was read on 18 October 2026.`}</p>
<p class="tools"><a href="${esc(voivodeshipPath(lang, voj.slug))}">${esc(voj.name)}</a> · <a href="${esc(sejmIndexPath(lang))}">${pl ? "Wszystkie okręgi" : "All constituencies"}</a>. ${pl ? "Numery obok" : "Nearby numbers"}: ${near}</p>
<h2>${pl ? "Źródła" : "Sources"}</h2>
<ul>${sourceList(["kodeks", "sejm-api-mp", "sejm-api-clubs", "pkw-sejm-2023"])}</ul>`;
  return shell({ lang, path, title, description, crumbs, body });
}

function senatPage(lang: Lang, okreg: SenatOkreg): string {
  const pl = lang === "pl";
  const voj = voivodeshipBySlug(okreg.voivodeshipSlug);
  if (!voj) throw new Error(okreg.voivodeshipSlug);
  const path = senatOkregPath(lang, okreg.num);
  const title = pl ? `Okręg wyborczy nr ${okreg.num} do Senatu` : `Senate constituency ${okreg.num}`;
  const prev = okreg.num > 1 ? okreg.num - 1 : undefined;
  const next = okreg.num < 100 ? okreg.num + 1 : undefined;
  const near = [prev, next]
    .filter((n): n is number => Boolean(n))
    .map((n) => `<a href="${esc(senatOkregPath(lang, n))}">${n}</a>`)
    .join(" · ");
  const extra = okreg.alsoPrinted
    ? `<p>${pl ? "Ta sama tabela drukuje także wiersz" : "The same table also prints a row"}: ${esc(okreg.alsoPrinted.name)}. ${esc(okreg.alsoPrinted.note)}</p>`
    : "";
  const byElection =
    okreg.num === 20
      ? `<p>${
          pl
            ? `Postanowieniem Prezydenta RP z dnia 25 września 2026 r. (<a href="https://www.dziennikustaw.gov.pl/DU/2026/1255">Dz.U. 2026 poz. 1255</a>) zarządzono wybory uzupełniające do Senatu w okręgu wyborczym nr 20. Datą wyborów jest niedziela 22 listopada 2026 r. Tę samą datę podaje serwis Państwowej Komisji Wyborczej <a href="https://wybory.gov.pl/senat20261122/pl">Wybory uzupełniające do Senatu w okręgu wyborczym nr 20</a>, odczytany 18 października 2026 r.`
            : `By order of the President of the Republic of Poland of 25 September 2026 (<a href="https://www.dziennikustaw.gov.pl/DU/2026/1255">Dz.U. 2026 item 1255</a>), a by-election to the Senate was called in constituency 20. Polling day is Sunday 22 November 2026. The National Electoral Commission service <a href="https://wybory.gov.pl/senat20261122/pl">Wybory uzupełniające do Senatu w okręgu wyborczym nr 20</a>, read on 18 October 2026, prints the same date.`
        }</p>`
      : "";
  const seat = okreg.vacant
    ? `<p class="gap"><strong>${pl ? "Mandat nieobsadzony." : "Seat vacant."}</strong> ${
        pl
          ? `Tabela Senatu „Okręgi wyborcze” (senat.gov.pl, odczyt 18 października 2026 r.) drukuje w komórce senatora: „${esc(okreg.senator)}”.`
          : `The Senate table “Okręgi wyborcze” (senat.gov.pl, read 18 October 2026) prints in the senator cell: “${esc(okreg.senator)}”.`
      }</p>`
    : `<p>${esc(okreg.senator)}</p>`;
  const description = pl
    ? okreg.vacant
      ? `Okręg nr ${okreg.num} do Senatu. Mandat nieobsadzony. Wybory uzupełniające 22 listopada 2026 r. Informacja nieoficjalna.`
      : `Okręg nr ${okreg.num} do Senatu. Senator w tabeli Senatu: ${okreg.senator}. Informacja nieoficjalna.`
    : okreg.vacant
      ? `Senate constituency ${okreg.num}. Seat vacant. By-election on 22 November 2026. Unofficial information.`
      : `Senate constituency ${okreg.num}. Senator in the Senate table: ${okreg.senator}. Unofficial information.`;
  const crumbs = [
    { name: pl ? "Strona główna" : "Home", path: "/" },
    { name: "Polska", path: "/pl/" },
    { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
    { name: pl ? "Okręgi do Senatu" : "Senate constituencies", path: senatIndexPath(lang) },
    { name: String(okreg.num), path },
  ];
  const ids = okreg.num === 20 ? ["senate-okregi", "kodeks", "pkw-senat-2023", "postanowienie-senat-20-2026", "pkw-senat-20-2026"] : ["senate-okregi", "kodeks", "pkw-senat-2023"];
  const body = `<p class="eyebrow">${pl ? "Senat" : "Senate"}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(voj.name)}</p>
<p>${pl ? "Zdanie o obszarze jest przepisane ze strony Senatu „Okręgi wyborcze”, odczytanej 18 października 2026 r. Załącznik nr 2 do Kodeksu wyborczego jest ustawowym wykazem. Ta strona go nie przepisuje." : "The area sentence is copied from the Senate page “Okręgi wyborcze”, read on 18 October 2026. Annex 2 of the electoral code is the statutory list. This page does not reprint it."}</p>
<p>${esc(okreg.area)}</p>
<h2>${okreg.vacant ? (pl ? "Mandat" : "Seat") : pl ? "Senator w tabeli" : "Senator in the table"}</h2>
${seat}
${extra}
${byElection}
<h2>${pl ? "Wybory" : "Elections"}</h2>
<p>${pl ? "Ostatnie wybory do Senatu w obwieszczeniu PKW z 17 października 2023 r. odbyły się 15 października 2023 r. Komórka senatora powyżej jest późniejszym odczytem strony Senatu." : "The last Senate election in the Commission announcement of 17 October 2023 was held on 15 October 2023. The senator cell above is a later reading of the Senate page."}</p>
<p>${pl ? `Następne wybory do Sejmu i Senatu w oknie konstytucyjnym: <a href="${esc(polandHome(lang))}elections/sejm-senat-2027/">14 października–12 listopada 2027</a>.` : `Next Sejm and Senate election in the constitutional window: <a href="${esc(polandHome(lang))}elections/sejm-senat-2027/">14 October–12 November 2027</a>.`}</p>
<p class="tools"><a href="${esc(voivodeshipPath(lang, voj.slug))}">${esc(voj.name)}</a> · <a href="${esc(senatIndexPath(lang))}">${pl ? "Wszystkie okręgi" : "All constituencies"}</a>. ${pl ? "Numery obok" : "Nearby numbers"}: ${near}</p>
<h2>${pl ? "Źródła" : "Sources"}</h2>
<ul>${sourceList(ids)}</ul>`;
  return shell({ lang, path, title, description, crumbs, body });
}

let written = 0;
for (const lang of ["pl", "en"] as const) {
  for (const powiat of allPowiats()) {
    writePage(powiatPath(lang, powiat.voivodeshipSlug, powiat.slug), powiatPage(lang, powiat));
    written += 1;
  }
  for (const okreg of allSejmOkregi()) {
    writePage(sejmOkregPath(lang, okreg.num), sejmPage(lang, okreg));
    written += 1;
  }
  for (const okreg of allSenatOkregi()) {
    writePage(senatOkregPath(lang, okreg.num), senatPage(lang, okreg));
    written += 1;
  }
}
console.log(`poland level 2 html: ${written}`);
