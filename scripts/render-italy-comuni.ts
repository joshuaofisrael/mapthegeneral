import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { UNITS, collegioByName } from "../src/data/italy/level2";
import {
  collegioPath,
  comunePath,
  comuniIndexPath,
  italyHome,
  otherLang,
  regionPath,
  unitPath,
} from "../src/data/italy/paths";
import { REGIONS, regionBySlug } from "../src/data/italy/places";
import { sourcesById } from "../src/data/italy/sources";
import type { ItLang } from "../src/data/italy/types";
import { ui } from "../src/data/italy/ui";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const chunkPath = join(root, "src/data/italy/comuni-chunk1.json");
const OFFICE = "https://dait.interno.gov.it/elezioni";
const HTML_BUDGET = 27_000_000;
const SOURCE_IDS = ["istat-comuni-chunk", "anagrafe-comuni", "collegi-comune-codes", "dait-speciale-19"];

type Mayor = {
  role: string;
  given: string;
  surname: string;
  electedOn: string;
  enteredOn: string;
};

export type ComuneRecord = {
  code: string;
  numeric: string;
  numeric2017: string;
  name: string;
  italian: string;
  other: string;
  cap: boolean;
  regionSlug: string;
  regionCode: string;
  unitSlug: string;
  unitCode: string;
  unitName: string;
  slug: string;
  mayor: Mayor[];
  mayorFrom: "" | "sindaci" | "maggior";
  council: [string, string, string, string][];
  camera: string[];
  cameraVia: "" | "2026" | "2017" | "conflict";
  senate: string[];
  senateVia: "" | "2026" | "2017" | "conflict";
  called: "" | "calvi" | "stefanaconi" | "ayas";
};

type ChunkFile = {
  readOn: string;
  anagrafeUpdated: string;
  no2027List: true;
  multiCap: { region: string; code: string; name: string; flags: number }[];
  comuni: ComuneRecord[];
};

const MANDATED = ["lombardia", "lazio", "campania", "sicilia"];

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(opts: {
  lang: ItLang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const other = otherLang(opts.lang);
  const otherPath = opts.path.replace(`/it/${opts.lang}/`, `/it/${other}/`);
  const itPath = opts.lang === "it" ? opts.path : otherPath;
  const enPath = opts.lang === "en" ? opts.path : otherPath;
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: opts.crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
  const crumbNav = opts.crumbs
    .map((item, index) =>
      index === opts.crumbs.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const it = opts.lang === "it";
  return `<!DOCTYPE html>
<html lang="${opts.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
<link rel="canonical" href="${esc(absoluteUrl(opts.path))}">
<link rel="alternate" hreflang="it" href="${esc(absoluteUrl(itPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(opts.title)}">
<meta property="og:description" content="${esc(opts.description)}">
<meta property="og:url" content="${esc(absoluteUrl(opts.path))}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${it ? "it_IT" : "en_GB"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${it ? `Informazione non ufficiale. Confermarla con l'<a href="${OFFICE}">ufficio elettorale ufficiale</a>.` : esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(italyHome(opts.lang))}">${it ? "Italia" : "Italy"}</a> · <a href="/search/">${it ? "Cerca" : "Search"}</a> · <a href="${esc(otherPath)}">${it ? "English" : "Italiano"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
${opts.body}
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
</body>
</html>
`;
}

function sourceList(lang: ItLang): string {
  const copy = ui(lang);
  return sourcesById(SOURCE_IDS)
    .map((source) => {
      const licence =
        source.id === "istat-comuni-chunk"
          ? lang === "it"
            ? ` — Fonte: ISTAT, licenza <a href="https://creativecommons.org/licenses/by/4.0/deed.it">CC BY 4.0</a>`
            : ` — Source: ISTAT, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>`
          : "";
      return `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}${licence}</li>`;
    })
    .join("");
}

function person(given: string, surname: string): string {
  return `${given} ${surname}`.trim();
}

function mayorBlock(lang: ItLang, comune: ComuneRecord): string {
  const it = lang === "it";
  if (comune.mayor.length === 0) {
    return `<p class="gap"><strong>${it ? "Lacuna" : "Gap"}.</strong> ${
      it
        ? "I file dei sindaci e del maggior organo aggiornati al 24/08/2026 non hanno una riga il cui nome normalizzato coincide con la denominazione ISTAT di questo comune."
        : "The mayor file and the maggior-organo file updated on 24/08/2026 have no row whose normalised name matches this municipality’s ISTAT name."
    }</p>`;
  }
  const file =
    comune.mayorFrom === "sindaci"
      ? it
        ? "Il file dei sindaci aggiornato al 24/08/2026"
        : "The mayor file updated on 24/08/2026"
      : it
        ? "Il file del maggior organo aggiornato al 24/08/2026"
        : "The maggior-organo file updated on 24/08/2026";
  return comune.mayor
    .map((office) =>
      it
        ? `<p>${file} stampa «${esc(office.role)}»: ${esc(person(office.given, office.surname))}. data_elezione ${esc(office.electedOn)}. data_entrata_in_carica ${esc(office.enteredOn)}.</p>`
        : `<p>${file} prints “${esc(office.role)}”: ${esc(person(office.given, office.surname))}. data_elezione ${esc(office.electedOn)}. data_entrata_in_carica ${esc(office.enteredOn)}.</p>`,
    )
    .join("");
}

function councilBlock(lang: ItLang, comune: ComuneRecord): string {
  const it = lang === "it";
  if (comune.council.length === 0) {
    return `<p class="gap"><strong>${it ? "Lacuna" : "Gap"}.</strong> ${
      it
        ? "Il file degli amministratori comunali aggiornato al 24/08/2026 non ha, per questo nome, una riga con carica di consigliere o di assessore."
        : "The municipal-administrator file updated on 24/08/2026 has no councillor or assessor row for this name."
    }</p>`;
  }
  const items = comune.council
    .map(([role, incarico, given, surname]) => {
      const extra = incarico ? (it ? `, incarico «${esc(incarico)}»` : `, incarico “${esc(incarico)}”`) : "";
      return `<li>${esc(role)}${extra} — ${esc(person(given, surname))}</li>`;
    })
    .join("");
  const lead = it
    ? `Il file degli amministratori comunali aggiornato al 24/08/2026 elenca ${comune.council.length} righe con queste cariche. Non sono copiati data di nascita, luogo di nascita, titolo di studio, professione né la stringa della lista. Le date della riga non sono ripetute qui: per il sindaco o l'organo straordinario restano nel paragrafo sopra.`
    : `The municipal-administrator file updated on 24/08/2026 lists ${comune.council.length} rows with these roles. Birth date, birthplace, education, profession and the electoral-list string are not copied. Row dates are not repeated here; the mayor or extraordinary officer keeps the dates in the paragraph above.`;
  return `<p>${lead}</p><ul>${items}</ul>`;
}

function calledBlock(lang: ItLang, comune: ComuneRecord): string {
  const it = lang === "it";
  if (comune.called === "calvi" || comune.called === "stefanaconi") {
    const place = comune.called === "calvi" ? "Calvi Risorta (CE)" : "Stefanaconi (VV)";
    return it
      ? `<p>La pagina «Speciale elezioni» del Dipartimento, letta il 19 ottobre 2026, dice che un decreto del Ministro dell'interno del 10 settembre 2026 fissa il turno elettorale straordinario per domenica 15 e lunedì 16 novembre 2026 nei comuni sciolti ai sensi dell'art. 143, comma 10, del decreto legislativo n. 267/2000, con eventuale ballottaggio domenica 29 e lunedì 30 novembre 2026, e nomina ${place}. Questa pagina non pubblica cifre di quella votazione.</p>`
      : `<p>The Department’s “Speciale elezioni” page, read on 19 October 2026, says a decree of the Minister of the Interior of 10 September 2026 sets an extraordinary election round for Sunday 15 and Monday 16 November 2026 in the municipalities dissolved under article 143, paragraph 10, of legislative decree no. 267/2000, with a possible ballot on Sunday 29 and Monday 30 November 2026, and it names ${place}. This page does not publish figures for that vote.</p>`;
  }
  if (comune.called === "ayas") {
    return it
      ? `<p>La stessa pagina, letta il 19 ottobre 2026, dice che i comizi per l'elezione diretta del sindaco e del vice sindaco, nonché di 13 consiglieri comunali del Comune di Ayas, sono convocati per domenica 15 novembre 2026, con eventuale ballottaggio domenica 29 novembre 2026. Questa pagina non pubblica cifre di quella votazione.</p>`
      : `<p>The same page, read on 19 October 2026, says the meetings for the direct election of the mayor and the deputy mayor, and of 13 municipal councillors, of the Comune di Ayas are called for Sunday 15 November 2026, with a possible ballot on Sunday 29 November 2026. This page does not publish figures for that vote.</p>`;
  }
  return `<p class="gap"><strong>${it ? "Lacuna" : "Gap"}.</strong> ${
    it
      ? "Il 19 ottobre 2026 non è stato letto un giorno, pubblicato in modo centrale, per la prossima elezione comunale di questo comune. La data sopra, se c'è, è la data_elezione stampata nel file, non uno scrutinio. Questa pagina non ricava un giorno di votazione da una durata dell'incarico."
      : "No centrally published day for the next municipal election of this municipality was read on 19 October 2026. A date above, where present, is the data_elezione printed in the file, not a results table. This page does not turn a term of office into a polling day."
  }</p>`;
}

function houseLinks(lang: ItLang, house: "camera" | "senato", names: string[]): string {
  const it = lang === "it";
  return names
    .map((name) => {
      const item = collegioByName(house, name);
      if (!item) throw new Error(`Missing ${house} collegio ${name}`);
      const parent = item.parent ? collegioByName(house, item.parent) : undefined;
      const uni = `<a href="${esc(collegioPath(lang, house, item.slug))}">${esc(item.name)}</a>`;
      const pluri = parent
        ? ` → <a href="${esc(collegioPath(lang, house, parent.slug))}">${esc(parent.name)}</a>`
        : it
          ? " — la tabella del livello superiore non assegna un collegio plurinominale"
          : " — the parent table assigns no plurinominal constituency";
      return `<li>${uni}${pluri}</li>`;
    })
    .join("");
}

function collegioBlock(lang: ItLang, comune: ComuneRecord): string {
  const it = lang === "it";
  const parts: string[] = [];
  const explain = (via: ComuneRecord["cameraVia"], houseLabel: string) => {
    if (via === "2017") {
      return it
        ? `Il codice numerico del 21 febbraio 2026 è ${esc(comune.numeric)}. La colonna «Codice Comune numerico con 107 Province (dal 2017 al 2025)» stampa ${esc(comune.numeric2017)}. La tabella ${houseLabel} del 2020 elenca quel codice precedente.`
        : `The 21 February 2026 numeric code is ${esc(comune.numeric)}. The column “Codice Comune numerico con 107 Province (dal 2017 al 2025)” prints ${esc(comune.numeric2017)}. The 2020 ${houseLabel} lists that earlier code.`;
    }
    if (via === "2026") {
      return it
        ? `Il codice numerico ${esc(comune.numeric)} compare nella tabella ${houseLabel}.`
        : `Numeric code ${esc(comune.numeric)} appears in ${houseLabel}.`;
    }
    return it
      ? `Né il codice numerico del 21 febbraio 2026 né il codice della colonna 2017-2025 compaiono nella tabella ${houseLabel} letta il 19 ottobre 2026.`
      : `Neither the 21 February 2026 numeric code nor the 2017-2025 column appears in the ${houseLabel} table read on 19 October 2026.`;
  };
  parts.push(`<p>${explain(comune.cameraVia, it ? "A.1 della Camera" : "Chamber table A.1")}</p>`);
  if (comune.camera.length > 1) {
    parts.push(
      `<p>${
        it
          ? "Lo stesso codice è ripetuto sotto più collegi uninominali: il foglio divide il comune. Questa pagina non ne sceglie uno per l'intero territorio."
          : "The same code is repeated under more than one uninominal constituency: the sheet divides the municipality. This page does not pick one for the whole territory."
      }</p>`,
    );
  }
  parts.push(comune.camera.length ? `<ul>${houseLinks(lang, "camera", comune.camera)}</ul>` : "");
  if (comune.camera.includes("Abruzzo - U01")) {
    parts.push(
      it
        ? `<p>La pagina del Dipartimento letta il 19 ottobre 2026 dice che l'elezione suppletiva di quel collegio della Camera è fissata per domenica 15 e lunedì 16 novembre 2026. Questa pagina non pubblica cifre di quella elezione.</p>`
        : `<p>The Department page read on 19 October 2026 says the Chamber by-election for that constituency is set for Sunday 15 and Monday 16 November 2026. This page does not publish figures for that election.</p>`,
    );
  }
  parts.push(`<p>${explain(comune.senateVia, it ? "B.1 del Senato" : "Senate table B.1")}</p>`);
  if (comune.senate.length > 1) {
    parts.push(
      `<p>${
        it
          ? "Lo stesso codice è ripetuto sotto più collegi uninominali del Senato. Questa pagina non ne sceglie uno per l'intero territorio."
          : "The same code is repeated under more than one Senate uninominal constituency. This page does not pick one for the whole territory."
      }</p>`,
    );
  }
  parts.push(comune.senate.length ? `<ul>${houseLinks(lang, "senato", comune.senate)}</ul>` : "");
  return parts.join("");
}

export function comuneHtml(lang: ItLang, comune: ComuneRecord, siblings: ComuneRecord[]): string {
  const it = lang === "it";
  const copy = ui(lang);
  const region = regionBySlug(comune.regionSlug);
  if (!region) throw new Error(comune.regionSlug);
  const path = comunePath(lang, comune.regionSlug, comune.unitSlug, comune.slug);
  const index = siblings.findIndex((item) => item.slug === comune.slug);
  const prev = index > 0 ? siblings[index - 1] : undefined;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined;
  const near = [prev, next]
    .filter((item): item is ComuneRecord => Boolean(item))
    .map((item) => `<a href="${esc(comunePath(lang, item.regionSlug, item.unitSlug, item.slug))}">${esc(item.name)}</a>`)
    .join(" · ");
  const names = [
    `<tr><th>${it ? "Denominazione (italiana e straniera)" : "Name (Italian and other)"}</th><td>${esc(comune.name)}</td></tr>`,
    comune.italian ? `<tr><th>${it ? "Denominazione in italiano" : "Italian name"}</th><td>${esc(comune.italian)}</td></tr>` : "",
    comune.other ? `<tr><th>${it ? "Denominazione altra lingua" : "Other-language name"}</th><td>${esc(comune.other)}</td></tr>` : "",
  ].join("");
  const body = `<p class="eyebrow">Comune${comune.cap ? (it ? " · capoluogo" : " · capoluogo") : ""}</p>
<h1>${esc(comune.name)}</h1>
<p class="lede">${esc(region.istatName)} · ${esc(comune.unitName)} · ${esc(comune.code)}</p>
<p><strong>${it ? "Fonti di questa pagina lette il 19 ottobre 2026." : "Sources on this page were read on 19 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${it ? "Segnala un errore" : "Report an error"}</a></p>
<table>
${names}
<tr><th>${it ? "Codice alfanumerico" : "Alphanumeric code"}</th><td>${esc(comune.code)}</td></tr>
<tr><th>${it ? "Codice numerico al 21/02/2026" : "Numeric code at 21/02/2026"}</th><td>${esc(comune.numeric)}</td></tr>
<tr><th>${it ? "Flag capoluogo nel foglio" : "Capoluogo flag in the sheet"}</th><td>${comune.cap ? "1" : "0"}</td></tr>
</table>
<h2>${it ? "Sindaco o organo straordinario" : "Mayor or extraordinary officer"}</h2>
${mayorBlock(lang, comune)}
<h2>${it ? "Consiglio e giunta nel file comunale" : "Council and executive board in the municipal file"}</h2>
${councilBlock(lang, comune)}
<h2>${it ? "Elezione comunale" : "Municipal election"}</h2>
${calledBlock(lang, comune)}
<h2>${it ? "Collegi della Camera e del Senato" : "Chamber and Senate constituencies"}</h2>
${collegioBlock(lang, comune)}
<p class="tools">${it ? "Livello superiore" : "Parent"}: <a href="${esc(unitPath(lang, comune.regionSlug, comune.unitSlug))}">${esc(comune.unitName)}</a> · <a href="${esc(comuniIndexPath(lang, comune.regionSlug, comune.unitSlug))}">${it ? "Indice dei comuni" : "Municipality index"}</a> · <a href="${esc(regionPath(lang, region.slug))}">${esc(region.istatName)}</a></p>
<p class="tools">${esc(copy.alphaNearby)}: ${near || "—"}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang)}</ul>`;
  return shell({
    lang,
    path,
    title: `${comune.name} · ${SITE.name}`,
    description: it
      ? `${comune.name}: comune ${comune.code}, ${comune.unitName}, ${region.istatName}. Informazione non ufficiale.`
      : `${comune.name}: municipality ${comune.code}, ${comune.unitName}, ${region.istatName}. Unofficial information.`,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: region.istatName, path: regionPath(lang, region.slug) },
      { name: comune.unitName, path: unitPath(lang, comune.regionSlug, comune.unitSlug) },
      { name: comune.name, path },
    ],
    body,
  });
}

export function indexHtml(lang: ItLang, list: ComuneRecord[]): string {
  const it = lang === "it";
  const copy = ui(lang);
  const first = list[0];
  if (!first) throw new Error("empty index");
  const region = regionBySlug(first.regionSlug);
  if (!region) throw new Error(first.regionSlug);
  const unit = UNITS.find((item) => item.regionSlug === first.regionSlug && item.slug === first.unitSlug);
  if (!unit) throw new Error(first.unitSlug);
  const path = comuniIndexPath(lang, first.regionSlug, first.unitSlug);
  const items = list
    .map(
      (comune) =>
        `<li><a href="${esc(comunePath(lang, comune.regionSlug, comune.unitSlug, comune.slug))}">${esc(comune.name)}</a> — ${esc(comune.code)}${comune.cap ? (it ? " · capoluogo" : " · capoluogo") : ""}</li>`,
    )
    .join("");
  const rest = unit.comuni - list.length;
  const body = `<p class="eyebrow">${it ? "Livello 3" : "Level 3"}</p>
<h1>${it ? "Comuni" : "Municipalities"} · ${esc(unit.name)}</h1>
<p class="lede">${esc(region.istatName)} · ${it ? "codice unità" : "unit code"} ${esc(unit.code)}</p>
<p>${
    it
      ? `Il foglio ISTAT «CODICI al 21_02_2026» conta ${unit.comuni} comuni in questa unità. Questa consegna ne pubblica ${list.length}.${rest > 0 ? ` Gli altri ${rest} non sono in questo blocco.` : ""}`
      : `The ISTAT sheet “CODICI al 21_02_2026” counts ${unit.comuni} municipalities in this unit. This chunk publishes ${list.length}.${rest > 0 ? ` The other ${rest} are not in this chunk.` : ""}`
  }</p>
<ul>${items}</ul>
<p class="tools">${it ? "Livello superiore" : "Parent"}: <a href="${esc(unitPath(lang, unit.regionSlug, unit.slug))}">${esc(unit.name)}</a> · <a href="${esc(regionPath(lang, region.slug))}">${esc(region.istatName)}</a></p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang)}</ul>`;
  return shell({
    lang,
    path,
    title: `${it ? "Comuni" : "Municipalities"} · ${unit.name} · ${SITE.name}`,
    description: it
      ? `Indice dei comuni di ${unit.name} pubblicati in questa consegna. Informazione non ufficiale.`
      : `Index of ${unit.name} municipalities published in this chunk. Unofficial information.`,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: region.istatName, path: regionPath(lang, region.slug) },
      { name: unit.name, path: unitPath(lang, unit.regionSlug, unit.slug) },
      { name: it ? "Comuni" : "Municipalities", path },
    ],
    body,
  });
}

function group(list: ComuneRecord[]): Map<string, ComuneRecord[]> {
  const grouped = new Map<string, ComuneRecord[]>();
  for (const comune of list) {
    const key = `${comune.regionSlug}/${comune.unitSlug}`;
    const bucket = grouped.get(key) ?? [];
    bucket.push(comune);
    grouped.set(key, bucket);
  }
  for (const bucket of grouped.values()) bucket.sort((a, b) => a.name.localeCompare(b.name, "it"));
  return grouped;
}

function utf8(value: string): number {
  return Buffer.byteLength(value);
}

function bytesFor(list: ComuneRecord[]): number {
  const grouped = group(list);
  let total = 0;
  for (const bucket of grouped.values()) {
    total += utf8(indexHtml("it", bucket)) + utf8(indexHtml("en", bucket));
    for (const comune of bucket) {
      total += utf8(comuneHtml("it", comune, bucket)) + utf8(comuneHtml("en", comune, bucket));
    }
  }
  return total;
}

function rankOf(comune: ComuneRecord, regionCount: Map<string, number>): [number, number, string] {
  if (comune.cap) return [0, Number(comune.regionCode), `${comune.name}\u0000${comune.code}`];
  const mandated = MANDATED.indexOf(comune.regionSlug);
  if (mandated >= 0) return [mandated + 1, 0, `${comune.name}\u0000${comune.code}`];
  return [10, -(regionCount.get(comune.regionSlug) ?? 0), `${comune.regionSlug}\u0000${comune.name}\u0000${comune.code}`];
}

function select(records: ComuneRecord[], multiCap: ChunkFile["multiCap"]): ComuneRecord[] {
  const regionCount = new Map(REGIONS.map((region) => [region.slug, region.comuni]));
  const ordered = [...records].sort((a, b) => {
    const ra = rankOf(a, regionCount);
    const rb = rankOf(b, regionCount);
    return ra[0] - rb[0] || ra[1] - rb[1] || ra[2].localeCompare(rb[2], "it");
  });
  const pairBytes = new Map(
    ordered.map((comune) => [comune.code, utf8(comuneHtml("it", comune, [comune])) + utf8(comuneHtml("en", comune, [comune]))]),
  );
  const buckets = new Map<string, ComuneRecord[]>();
  const indexBytes = new Map<string, number>();
  const chosen: ComuneRecord[] = [];
  let total = 0;
  for (const comune of ordered) {
    const key = `${comune.regionSlug}/${comune.unitSlug}`;
    const bucket = buckets.get(key) ?? [];
    const nextBucket = [...bucket, comune].sort((a, b) => a.name.localeCompare(b.name, "it"));
    const nextIndex = utf8(indexHtml("it", nextBucket)) + utf8(indexHtml("en", nextBucket));
    const delta = (pairBytes.get(comune.code) ?? 0) + nextIndex - (indexBytes.get(key) ?? 0);
    if (total + delta > HTML_BUDGET) break;
    buckets.set(key, nextBucket);
    indexBytes.set(key, nextIndex);
    chosen.push(comune);
    total += delta;
  }
  let exact = bytesFor(chosen);
  while (chosen.length > 0 && exact > HTML_BUDGET) {
    chosen.pop();
    exact = bytesFor(chosen);
  }
  const file: ChunkFile = {
    readOn: "2026-10-19",
    anagrafeUpdated: "24/08/2026",
    no2027List: true,
    multiCap,
    comuni: chosen,
  };
  writeFileSync(chunkPath, JSON.stringify(file));
  writeFileSync(
    join(root, "src/data/italy/comuni-public.json"),
    JSON.stringify({
      comuni: chosen.map((comune) => ({
        code: comune.code,
        name: comune.name,
        regionSlug: comune.regionSlug,
        unitSlug: comune.unitSlug,
        unitName: comune.unitName,
        slug: comune.slug,
        cap: comune.cap,
      })),
    }),
  );
  console.log(`selected ${chosen.length} comuni, estimate ${total}, exact html bytes ${exact}`);
  return chosen;
}

function writePages(list: ComuneRecord[]) {
  const grouped = group(list);
  let pages = 0;
  let bytes = 0;
  function write(path: string, html: string) {
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    pages += 1;
    bytes += utf8(html);
  }
  for (const bucket of grouped.values()) {
    write(comuniIndexPath("it", bucket[0].regionSlug, bucket[0].unitSlug), indexHtml("it", bucket));
    write(comuniIndexPath("en", bucket[0].regionSlug, bucket[0].unitSlug), indexHtml("en", bucket));
    for (const comune of bucket) {
      write(comunePath("it", comune.regionSlug, comune.unitSlug, comune.slug), comuneHtml("it", comune, bucket));
      write(comunePath("en", comune.regionSlug, comune.unitSlug, comune.slug), comuneHtml("en", comune, bucket));
    }
  }
  console.log(`italy comuni: ${pages} html files, ${bytes} bytes, ${list.length} municipalities`);
}

function coverage(list: ComuneRecord[]) {
  for (const region of REGIONS) {
    const shipped = list.filter((item) => item.regionSlug === region.slug).length;
    if (shipped !== region.comuni) console.log(`remain ${region.istatName} ${shipped}/${region.comuni}`);
    else console.log(`full ${region.istatName} ${shipped}`);
  }
}

const selectMode = process.argv.includes("--select");
if (selectMode) {
  const raw = JSON.parse(readFileSync("/tmp/it3/candidates.json", "utf8")) as {
    records: (ComuneRecord & { pool?: boolean })[];
    multiCap: ChunkFile["multiCap"];
  };
  const chosen = select(
    raw.records.map((record) => {
      const { pool: _pool, ...rest } = record;
      return rest;
    }),
    raw.multiCap,
  );
  writePages(chosen);
  coverage(chosen);
} else {
  const chunk = JSON.parse(readFileSync(chunkPath, "utf8")) as ChunkFile;
  writePages(chunk.comuni);
}
