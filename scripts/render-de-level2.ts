import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { formatNumber } from "../src/data/de/format";
import { alphaLands, landBySlug } from "../src/data/de/lands";
import {
  KREISE,
  KREIS_TYPE_LABEL,
  kreisNeighbors,
  typeCounts,
  WAHLKREISE,
  wahlkreisNeighbors,
} from "../src/data/de/level2";
import type { Kreis, Wahlkreis } from "../src/data/de/level2-types";
import {
  bundestag2029Path,
  germanyHome,
  kreisPath,
  kreiseIndexPath,
  landPath,
  resultsPath,
  wahlkreisPath,
  wahlkreiseIndexPath,
} from "../src/data/de/paths";
import { sourcesById } from "../src/data/de/sources";
import type { DeLang } from "../src/data/de/types";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.bundeswahlleiterin.de/";
const READ = "2026-10-18";

let writtenOnce = false;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pad(nr: number): string {
  return String(nr).padStart(3, "0");
}

function printedDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  return `${day}.${month}.${year}`;
}

function crumbsHtml(items: { name: string; path: string }[]): string {
  return items
    .map((item, index) =>
      index === items.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
}

function jsonLd(items: { name: string; path: string }[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
}

function sourceItems(ids: string[]): string {
  return sourcesById(ids)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${source.readOn}</li>`,
    )
    .join("");
}

function shell(input: {
  lang: DeLang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const de = input.lang === "de";
  const other: DeLang = de ? "en" : "de";
  const otherPath = input.path.replace(/^\/de\/(de|en)\//, `/de/${other}/`);
  const dePath = de ? input.path : otherPath;
  const enPath = de ? otherPath : input.path;
  const country = de ? "Deutschland" : "Germany";
  const banner = de
    ? `Keine amtliche Information. Bitte bei der <a href="${OFFICE}">Bundeswahlleiterin</a> oder der zuständigen Wahlbehörde prüfen.`
    : `Unofficial information. Confirm with the <a href="${OFFICE}">Federal Returning Officer</a> or the competent election office.`;
  return `<!DOCTYPE html>
<html lang="${input.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(input.title)} · ${esc(SITE.name)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(absoluteUrl(input.path))}">
<link rel="alternate" hreflang="de" href="${esc(absoluteUrl(dePath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd(input.crumbs)}</script>
</head>
<body>
<p class="banner">${banner}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(germanyHome(input.lang))}">${esc(country)}</a> · <a href="/search/">${de ? "Suche" : "Search"}</a> · <a href="${esc(otherPath)}">${de ? "English" : "Deutsch"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbsHtml(input.crumbs)}</nav>
${input.body}
<p><strong>${de ? "Gelesen am 18. Oktober 2026." : "Read on 18 October 2026."}</strong> <a href="${esc(reportErrorHref(input.path))}">${de ? "Fehler melden" : "Report an error"}</a></p>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
</body>
</html>
`;
}

function writePage(path: string, html: string): void {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function baseCrumbs(lang: DeLang, extra: { name: string; path: string }[]): { name: string; path: string }[] {
  const de = lang === "de";
  return [
    { name: de ? "Start" : "Home", path: "/" },
    { name: de ? "Deutschland" : "Germany", path: "/de/" },
    { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
    ...extra,
  ];
}

const DL_DE = `<a href="https://www.govdata.de/dl-de/by-2-0">Datenlizenz Deutschland – Namensnennung – Version 2.0</a>`;
const BWL_NOTE: Record<DeLang, string> = {
  de: `Quelle: © Die Bundeswahlleiterin, Wiesbaden 2024 und 2025. Lizenz: ${DL_DE}. Daten in eigener Darstellung, ohne Änderung der Zahlen.`,
  en: `Source: © Die Bundeswahlleiterin, Wiesbaden 2024 and 2025. Licence: ${DL_DE}. Data presented in our own layout; figures unchanged.`,
};
const DESTATIS_NOTE: Record<DeLang, string> = {
  de: "Daten im Auftrag der Herausgebergemeinschaft Statistische Ämter des Bundes und der Länder, Statistisches Bundesamt (Destatis), 2026. Vervielfältigung und Verbreitung, auch auszugsweise, mit Quellenangabe gestattet.",
  en: "Data on behalf of the joint publishers Statistical Offices of the Federation and the Länder, Statistisches Bundesamt (Destatis), 2026. Reproduction and distribution, including excerpts, permitted with source attribution.",
};

function kreisPage(lang: DeLang, kreis: Kreis): string {
  const de = lang === "de";
  const land = landBySlug(kreis.land);
  if (!land) throw new Error(`Missing Land ${kreis.land}`);
  const path = kreisPath(lang, kreis.land, kreis.slug);
  const label = KREIS_TYPE_LABEL[kreis.type];
  const neighbors = kreisNeighbors(kreis);
  const neighborBits: string[] = [];
  if (neighbors.prev) {
    neighborBits.push(
      `<a href="${esc(kreisPath(lang, neighbors.prev.land, neighbors.prev.slug))}">${esc(neighbors.prev.name)}</a>`,
    );
  }
  if (neighbors.next) {
    neighborBits.push(
      `<a href="${esc(kreisPath(lang, neighbors.next.land, neighbors.next.slug))}">${esc(neighbors.next.name)}</a>`,
    );
  }
  const cityState =
    kreis.land === "berlin" || kreis.land === "hamburg"
      ? de
        ? `<p>Diese Zeile ist die eine kreisfreie Stadt, die Destatis für dieses Land führt.</p>`
        : `<p>This row is the one district-free city Destatis lists for this Land.</p>`
      : kreis.land === "bremen"
        ? de
          ? `<p>Destatis führt im Land Bremen zwei Einheiten der Satzart 40: Bremen, Stadt und Bremerhaven, Stadt.</p>`
          : `<p>Destatis lists two Satzart-40 units in the Land Bremen: Bremen, Stadt and Bremerhaven, Stadt.</p>`
        : "";
  const nextBlock = kreis.next
    ? de
      ? `<p>Das Hessische Statistische Landesamt druckt in der Tabelle der Direktwahlen die Zeile „${esc(kreis.next.label)}“ mit dem Termin ${esc(printedDate(kreis.next.date))}. Die Seite nennt die derzeitige Amtsinhaberin oder den Amtsinhaber nicht und druckt keinen vorherigen Wahltag. Diese Seite veröffentlicht keine Bewerbungen, keine Umfragen und kein Ergebnis dieser Wahl.</p>`
      : `<p>The statistical office of Hessen prints, in its table of direct elections, the row “${esc(kreis.next.label)}” with the date ${esc(printedDate(kreis.next.date))}. That page does not name the current officeholder and does not print a previous polling day. This page does not publish candidacies, polls, or a result of that election.</p>`
    : de
      ? `<p class="gap"><strong>Lücke.</strong> Ein amtlicher Termin für die nächste Wahl der Vertretung oder der Verwaltungsspitze dieser Einheit lag am ${READ} nicht vor. Der Landtagstermin auf der Länderseite ist eine andere Wahl.</p>`
      : `<p class="gap"><strong>Gap.</strong> No official date for the next election of this unit’s council or head of administration was read on ${READ}. The Landtag date on the Land page is a different election.</p>`;
  const ids = kreis.next ? ["destatis-gv100", "hessen-termine"] : ["destatis-gv100"];
  const body = `<p class="eyebrow">${esc(label)}</p>
<h1>${esc(kreis.name)}</h1>
<p class="lede"><a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a></p>
<table>
<tr><th>${de ? "Amtlicher Regionalschlüssel" : "Official regional key"}</th><td>${esc(kreis.ags)}</td></tr>
<tr><th>${de ? "Textkennzeichen" : "Text code"}</th><td>${esc(kreis.type)} — ${esc(label)}</td></tr>
<tr><th>${de ? "Sitz der Kreisverwaltung" : "Seat of the Kreis administration"}</th><td>${esc(kreis.seat)}</td></tr>
<tr><th>${de ? "Bevölkerung" : "Population"}</th><td>${esc(formatNumber(kreis.pop, lang))}</td></tr>
</table>
<p>${
    de
      ? `Die Bevölkerungszahl ist die Summe des Feldes „Bevölkerung, insgesamt“ (Satzstellen 140–150) aller Zeilen der Satzart 60 mit diesem Kreisschlüssel. Die Zeile der Satzart 40 druckt diese Summe nicht. Die Hinweise zur Datei setzen den Bevölkerungsstichtag auf den 31.12.2025 (Zensus 2022). Gebietsstand der Datei: 30.09.2026.`
      : `The population is the sum of the field “Bevölkerung, insgesamt” (positions 140–150) on every Satzart-60 row with this Kreis key. The Satzart-40 row does not print that sum. The file notes set the population reference date at 31 December 2025 (2022 census). Territorial status of the file: 30 September 2026.`
  }</p>
${cityState}
<p>${
    de
      ? `Die Datensatzbeschreibung im selben Zip bezeichnet das Textkennzeichen ${esc(kreis.type)} als „${esc(label)}“. Die Beschreibung ist mit Stand 14.06.2000 überschrieben und liegt der Ausgabe August 2026 bei.`
      : `The dataset description in the same zip labels text code ${esc(kreis.type)} as “${esc(label)}”. That description is headed 14 June 2000 and is shipped with the August 2026 edition.`
  }</p>
<h2>${de ? "Wahl" : "Election"}</h2>
${nextBlock}
<h2>${de ? "Amt" : "Office"}</h2>
<p class="gap"><strong>${de ? "Lücke." : "Gap."}</strong> ${
    de
      ? "GV100AD nennt keine Landrätin, keinen Landrat, keine Oberbürgermeisterin und keinen Oberbürgermeister. Eine amtliche Bundesliste dieser Personen lag am 18. Oktober 2026 nicht vor. Der Textcode beschreibt die Einheit, nicht die Amtsbezeichnung der Person."
      : "GV100AD does not name a Landrat, a Landrätin, an Oberbürgermeister, or an Oberbürgermeisterin. No federal official list of those people was read on 18 October 2026. The text code describes the unit, not the title of the person in office."
  }</p>
<p class="tools">${de ? "Übergeordnet" : "Parent"}: <a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a> · <a href="${esc(kreiseIndexPath(lang))}">${de ? "Alle Kreise" : "All Kreise"}</a>. ${
    de ? "Benachbarte Namen" : "Nearby names"
  }: ${neighborBits.join(" · ") || "—"}</p>
<h2>${de ? "Quellen" : "Sources"}</h2>
<ul>${sourceItems(ids)}</ul>
<p class="note">${DESTATIS_NOTE[lang]}</p>`;
  return shell({
    lang,
    path,
    title: kreis.name,
    description: de
      ? `${kreis.name} (${kreis.ags}), ${label} in ${land.name}. Bevölkerung ${formatNumber(kreis.pop, lang)} als Summe aus GV100AD. Keine amtliche Information.`
      : `${kreis.name} (${kreis.ags}), ${label} in ${land.name}. Population ${formatNumber(kreis.pop, lang)}, summed from GV100AD. Unofficial information.`,
    crumbs: baseCrumbs(lang, [
      { name: land.name, path: landPath(lang, land.slug) },
      { name: kreis.name, path },
    ]),
    body,
  });
}

function wahlkreisPage(lang: DeLang, wk: Wahlkreis): string {
  const de = lang === "de";
  const land = landBySlug(wk.land);
  if (!land) throw new Error(`Missing Land ${wk.land}`);
  const path = wahlkreisPath(lang, wk.land, wk.slug);
  const neighbors = wahlkreisNeighbors(wk);
  const neighborBits: string[] = [];
  if (neighbors.prev) {
    neighborBits.push(
      `<a href="${esc(wahlkreisPath(lang, neighbors.prev.land, neighbors.prev.slug))}">${esc(pad(neighbors.prev.nr))} ${esc(neighbors.prev.name)}</a>`,
    );
  }
  if (neighbors.next) {
    neighborBits.push(
      `<a href="${esc(wahlkreisPath(lang, neighbors.next.land, neighbors.next.slug))}">${esc(pad(neighbors.next.nr))} ${esc(neighbors.next.name)}</a>`,
    );
  }
  const seat = wk.seated
    ? de
      ? `<p>Die Spalte „Gewählt“ druckt „${esc(wk.party)}“. Die Datei der Gewählten, Status Endgültig, Stand 12.03.2025, führt ${esc(wk.member ?? "")} mit dem Kennzeichen Kreiswahlvorschlag für diesen Wahlkreis. GruppennameLang: ${esc(wk.partyLong)}.</p>`
      : `<p>The column “Gewählt” prints “${esc(wk.party)}”. The elected-members file, status final, as of 12 March 2025, lists ${esc(wk.member ?? "")} with Kennzeichen Kreiswahlvorschlag for this constituency. GruppennameLang: ${esc(wk.partyLong)}.</p>`
    : de
      ? `<p class="gap"><strong>Lücke beim Namen.</strong> Die Spalte „Gewählt“ druckt einen Halbgeviertstrich. Die Datei der Gewählten enthält keine Zeile mit dem Kennzeichen Kreiswahlvorschlag für diesen Wahlkreis. Ein Personenname einer Bewerbung steht hier nicht.</p>`
      : `<p class="gap"><strong>Gap on the name.</strong> The column “Gewählt” prints an en dash. The elected-members file has no row with Kennzeichen Kreiswahlvorschlag for this constituency. No candidate’s personal name is printed here.</p>`;
  const body = `<p class="eyebrow">${de ? "Bundestagswahlkreis" : "Bundestag constituency"} ${esc(pad(wk.nr))}</p>
<h1>${esc(wk.name)}</h1>
<p class="lede"><a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a></p>
<table>
<tr><th>${de ? "Wahlkreisnummer" : "Constituency number"}</th><td>${esc(pad(wk.nr))}</td></tr>
<tr><th>${de ? "Letzte Wahl" : "Last election"}</th><td>${de ? "Sonntag, 23. Februar 2025" : "Sunday, 23 February 2025"}</td></tr>
<tr><th>${de ? "Nächste Wahl" : "Next election"}</th><td><a href="${esc(bundestag2029Path(lang))}">${de ? "26. Januar 2029 bis 25. März 2029, kein Tag festgesetzt" : "26 January 2029 to 25 March 2029, no day set"}</a></td></tr>
</table>
<h2>${de ? "Erststimmen am 23. Februar 2025" : "First votes on 23 February 2025"}</h2>
<p>${
    de
      ? `In kerg2.csv, Status Endgültig, Stand 11.03.2025, hat bei Stimme 1 die höchste Anzahl die Gruppe ${esc(wk.party)} (${esc(wk.partyLong)}): ${esc(formatNumber(wk.votes, lang))} Stimmen, Prozent wie gedruckt ${esc(wk.pct)}.`
      : `In kerg2.csv, status final, as of 11 March 2025, the Stimme-1 row with the highest Anzahl is ${esc(wk.party)} (${esc(wk.partyLong)}): ${esc(formatNumber(wk.votes, lang))} votes, percent as printed ${esc(wk.pct)}.`
  }</p>
<p>${
    de
      ? "§ 1 Absatz 3 des Bundeswahlgesetzes nennt die Zweitstimmendeckung: eine Partei erhält für ihre Bewerberinnen und Bewerber mit den meisten Erststimmen in den Wahlkreisen des Landes so viele Sitze, wie die Zweitstimmen der Partei decken. Die Open-Data-Seite sagt, die Spalte „Gewählt“ enthalte bei ausreichender Deckung den Namen des Wahlvorschlagträgers und sonst den Text „–“."
      : "Section 1(3) of the Federal Elections Act names Zweitstimmendeckung: a party receives, for the candidates who took the most first votes in the constituencies of that Land, as many seats as the party’s second votes cover. The open-data page says the column “Gewählt” contains the nominating group’s name when coverage is sufficient, and the text “–” when it is not."
  }</p>
${seat}
<p>${
    de
      ? "Anschrift, Geburtsjahr, Geschlecht, Beruf und Geburtsort aus der Datei der Gewählten werden nicht abgedruckt."
      : "Address, year of birth, sex, occupation, and place of birth from the elected-members file are not reprinted."
  }</p>
<p class="tools">${de ? "Übergeordnet" : "Parent"}: <a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a> · <a href="${esc(wahlkreiseIndexPath(lang))}">${de ? "Alle Wahlkreise" : "All constituencies"}</a> · <a href="${esc(resultsPath(lang))}">${de ? "Bundesergebnis" : "Federal result"}</a>. ${
    de ? "Vorherige und nächste Nummer" : "Previous and next number"
  }: ${neighborBits.join(" · ") || "—"}</p>
<h2>${de ? "Quellen" : "Sources"}</h2>
<ul>${sourceItems(["bwl-wkr-names", "bwl-kerg2", "bwl-gewaehlte", "bwl-opendata", "bwahlg-1", "bwl-2029"])}</ul>
<p class="note">${BWL_NOTE[lang]}</p>`;
  return shell({
    lang,
    path,
    title: `${pad(wk.nr)} ${wk.name}`,
    description: de
      ? `Wahlkreis ${pad(wk.nr)} ${wk.name}: Erststimmen ${wk.party} ${wk.pct} am 23. Februar 2025. ${wk.seated ? wk.member : "Keine Person mit Kreiswahlvorschlag in der Datei der Gewählten."} Keine amtliche Information.`
      : `Constituency ${pad(wk.nr)} ${wk.name}: first votes ${wk.party} ${wk.pct} on 23 February 2025. ${wk.seated ? wk.member : "No Kreiswahlvorschlag person in the elected-members file."} Unofficial information.`,
    crumbs: baseCrumbs(lang, [
      { name: land.name, path: landPath(lang, land.slug) },
      { name: `${pad(wk.nr)} ${wk.name}`, path },
    ]),
    body,
  });
}

function kreiseIndex(lang: DeLang): string {
  const de = lang === "de";
  const path = kreiseIndexPath(lang);
  const counts = typeCounts();
  const groups = alphaLands()
    .map((land) => {
      const items = KREISE.filter((kreis) => kreis.land === land.slug).sort(
        (a, b) => a.name.localeCompare(b.name, "de") || a.ags.localeCompare(b.ags),
      );
      const lis = items
        .map(
          (kreis) =>
            `<li><a href="${esc(kreisPath(lang, kreis.land, kreis.slug))}">${esc(kreis.name)}</a> <span>${esc(KREIS_TYPE_LABEL[kreis.type])}</span></li>`,
        )
        .join("");
      return `<h2><a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a></h2><ul>${lis}</ul>`;
    })
    .join("");
  const body = `<h1>${de ? "Kreise und kreisfreie Städte" : "Kreise and district-free cities"}</h1>
<p class="lede">${de ? "401 Einheiten der Satzart 40, Gebietsstand 30.09.2026." : "401 Satzart-40 units, territorial status 30 September 2026."}</p>
<p>${
    de
      ? `Die Datei zählt Textkennzeichen 41 Kreisfreie Stadt ${counts["41"]}, 42 Stadtkreis ${counts["42"]}, 43 Kreis ${counts["43"]}, 44 Landkreis ${counts["44"]}, 45 Regionalverband ${counts["45"]}. 41 und 42 sind zusammen 107. 43, 44 und 45 sind zusammen 294. Die Tabelle Verwaltungsgliederung druckt für Deutschland 401 Kreise, darunter 107 kreisfreie Städte und 294 Landkreise.`
      : `The file counts text code 41 Kreisfreie Stadt ${counts["41"]}, 42 Stadtkreis ${counts["42"]}, 43 Kreis ${counts["43"]}, 44 Landkreis ${counts["44"]}, 45 Regionalverband ${counts["45"]}. Codes 41 and 42 sum to 107. Codes 43, 44 and 45 sum to 294. The Verwaltungsgliederung table prints 401 Kreise for Germany, of which 107 are district-free cities and 294 are Landkreise.`
  }</p>
<p class="gap"><strong>${de ? "Lücke." : "Gap."}</strong> ${
    de
      ? "Gemeindeseiten sind nicht in dieser Ausgabe. Eine Bundesliste der Landrätinnen, Landräte, Oberbürgermeisterinnen und Oberbürgermeister lag nicht vor."
      : "Municipality pages are not in this release. No federal list of Landräte or Oberbürgermeister was read."
  }</p>
${groups}
<h2>${de ? "Quellen" : "Sources"}</h2>
<ul>${sourceItems(["destatis-gv100", "destatis-gv"])}</ul>`;
  return shell({
    lang,
    path,
    title: de ? "Kreise und kreisfreie Städte" : "Kreise and district-free cities",
    description: de
      ? "401 Kreise und kreisfreie Städte aus GV100AD, Gebietsstand 30.09.2026, unter ihrem Land. Keine amtliche Information."
      : "401 Kreise and district-free cities from GV100AD, territorial status 30 September 2026, under their Land. Unofficial information.",
    crumbs: baseCrumbs(lang, [{ name: de ? "Kreise" : "Kreise", path }]),
    body,
  });
}

function wahlkreiseIndex(lang: DeLang): string {
  const de = lang === "de";
  const path = wahlkreiseIndexPath(lang);
  const seated = WAHLKREISE.filter((wk) => wk.seated).length;
  const uncovered = WAHLKREISE.length - seated;
  const groups = alphaLands()
    .map((land) => {
      const items = WAHLKREISE.filter((wk) => wk.land === land.slug).sort((a, b) => a.nr - b.nr);
      const lis = items
        .map(
          (wk) =>
            `<li><a href="${esc(wahlkreisPath(lang, wk.land, wk.slug))}">${esc(pad(wk.nr))} ${esc(wk.name)}</a></li>`,
        )
        .join("");
      return `<h2><a href="${esc(landPath(lang, land.slug))}">${esc(land.name)}</a></h2><ul>${lis}</ul>`;
    })
    .join("");
  const body = `<h1>${de ? "Wahlkreise zum 21. Deutschen Bundestag" : "Constituencies of the 21st German Bundestag"}</h1>
<p class="lede">${de ? "299 Wahlkreise. Namenstand 07.03.2024." : "299 constituencies. Names as of 7 March 2024."}</p>
<p>${
    de
      ? `Die Datei der Gewählten hat ${seated} Zeilen mit dem Kennzeichen Kreiswahlvorschlag und ${uncovered} Wahlkreise ohne eine solche Zeile. In diesen ${uncovered} Fällen druckt kerg2 in der Spalte „Gewählt“ einen Halbgeviertstrich. Landeslistenmandate stehen nicht auf den Wahlkreisseiten.`
      : `The elected-members file has ${seated} rows with Kennzeichen Kreiswahlvorschlag, and ${uncovered} constituencies with no such row. For those ${uncovered}, kerg2 prints an en dash in the column “Gewählt”. Land-list seats are not repeated on the constituency pages.`
  }</p>
${groups}
<h2>${de ? "Quellen" : "Sources"}</h2>
<ul>${sourceItems(["bwl-wkr-names", "bwl-kerg2", "bwl-gewaehlte", "bwl-opendata", "bwahlg-1"])}</ul>`;
  return shell({
    lang,
    path,
    title: de ? "Bundestagswahlkreise" : "Bundestag constituencies",
    description: de
      ? "299 Bundestagswahlkreise mit dem endgültigen Erststimmenergebnis 2025 und dem Vermerk zur Zweitstimmendeckung. Keine amtliche Information."
      : "299 Bundestag constituencies with the final 2025 first-vote result and the second-vote-coverage note. Unofficial information.",
    crumbs: baseCrumbs(lang, [{ name: de ? "Wahlkreise" : "Constituencies", path }]),
    body,
  });
}

export function renderGermanyLevel2(): void {
  if (writtenOnce) return;
  writtenOnce = true;
  for (const lang of ["de", "en"] as const) {
    rmSync(join(publicDir, "de", lang), { recursive: true, force: true });
  }
  let n = 0;
  for (const lang of ["de", "en"] as const) {
    writePage(kreiseIndexPath(lang), kreiseIndex(lang));
    writePage(wahlkreiseIndexPath(lang), wahlkreiseIndex(lang));
    n += 2;
    for (const kreis of KREISE) {
      writePage(kreisPath(lang, kreis.land, kreis.slug), kreisPage(lang, kreis));
      n += 1;
    }
    for (const wk of WAHLKREISE) {
      writePage(wahlkreisPath(lang, wk.land, wk.slug), wahlkreisPage(lang, wk));
      n += 1;
    }
  }
  console.log(`germany level-2 html: ${n}`);
}

renderGermanyLevel2();
