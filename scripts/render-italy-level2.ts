import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ANAGRAFE_NAMES_NOT_MATCHED,
  COLLEGI,
  ESTERO_DEPUTIES,
  UNITS,
  collegioByName,
  type Level2Collegio,
  type Level2Unit,
} from "../src/data/italy/level2";
import {
  collegioPath,
  collegiIndexPath,
  italyHome,
  otherLang,
  regionPath,
  comuniIndexPath,
  unitPath,
  unitsIndexPath,
} from "../src/data/italy/paths";
import { regionBySlug } from "../src/data/italy/places";
import { sourceById, sourcesById } from "../src/data/italy/sources";
import type { ItLang } from "../src/data/italy/types";
import { ui, unitLabel } from "../src/data/italy/ui";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://dait.interno.gov.it/elezioni";
const LANGS: ItLang[] = ["it", "en"];
const MONTHS = {
  it: ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ymd(value: string, lang: ItLang): string {
  if (!/^\d{8}$/.test(value)) return value;
  const year = value.slice(0, 4);
  const month = Number(value.slice(4, 6));
  const day = String(Number(value.slice(6, 8)));
  return `${day} ${MONTHS[lang][month - 1]} ${year}`;
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
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function sourceList(lang: ItLang, ids: string[]): string {
  const copy = ui(lang);
  return sourcesById(ids)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}${
          source.id.startsWith("istat-")
            ? lang === "it"
              ? ` — Fonte: ISTAT, licenza <a href="https://creativecommons.org/licenses/by/4.0/deed.it">CC BY 4.0</a>`
              : ` — Source: ISTAT, licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>`
            : ""
        }</li>`,
    )
    .join("");
}

function neighbors(lang: ItLang, unit: Level2Unit): string {
  const list = UNITS.filter((item) => item.regionSlug === unit.regionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );
  const index = list.findIndex((item) => item.slug === unit.slug);
  const parts: string[] = [];
  if (index > 0) {
    const prev = list[index - 1];
    parts.push(`<a href="${esc(unitPath(lang, prev.regionSlug, prev.slug))}">${esc(prev.name)}</a>`);
  }
  if (index >= 0 && index < list.length - 1) {
    const next = list[index + 1];
    parts.push(`<a href="${esc(unitPath(lang, next.regionSlug, next.slug))}">${esc(next.name)}</a>`);
  }
  return parts.join(" · ");
}

function unitPage(lang: ItLang, unit: Level2Unit): string {
  const it = lang === "it";
  const copy = ui(lang);
  const region = regionBySlug(unit.regionSlug);
  if (!region) throw new Error(`Missing region ${unit.regionSlug}`);
  const path = unitPath(lang, unit.regionSlug, unit.slug);
  const typeName = unitLabel(unit.type, lang);
  const offices =
    unit.offices.length === 0
      ? `<p class="gap"><strong>${esc(copy.gap)}.</strong> ${
          it
            ? "I file degli amministratori provinciali e metropolitani aggiornati al 24 agosto 2026 non stampano, per questo nome, un presidente della provincia, un sindaco metropolitano o un commissario straordinario."
            : "The provincial and metropolitan administrator files updated on 24 August 2026 do not print a provincial president, a metropolitan mayor, or an extraordinary commissioner for this name."
        }</p>`
      : `<p>${
          it
            ? `Carica stampata nell'anagrafe aggiornata al 24 agosto 2026: ${unit.offices.map((office) => `«${esc(office.role)}»`).join(", ")}.`
            : `Office printed in the register updated on 24 August 2026: ${unit.offices.map((office) => `“${esc(office.role)}”`).join(", ")}.`
        }</p>`;
  const officeholders = `<p>${
    it
      ? `Questa pagina non riporta i nomi dei presidenti di provincia, dei sindaci metropolitani o dei commissari. La fonte ufficiale per gli amministratori in carica è l'<a href="${esc(sourceById("anagrafe").url)}">Anagrafe degli amministratori locali e regionali</a> del Ministero dell'Interno.`
      : `This page does not list the names of provincial presidents, metropolitan mayors or commissioners. The official source for current officeholders is the Interior Ministry's <a href="${esc(sourceById("anagrafe").url)}">register of local and regional administrators</a>.`
  }</p>`;
  const body = `<p class="eyebrow">${esc(typeName)}</p>
<h1>${esc(unit.name)}</h1>
<p class="lede">${esc(region.istatName)} · ${it ? "codice ISTAT" : "ISTAT code"} ${esc(unit.code)}</p>
<p><strong>${it ? "Fonti di questa pagina lette il 18 ottobre 2026." : "Sources on this page were read on 18 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${it ? "Segnala un errore" : "Report an error"}</a></p>
<table>
<tr><th>${it ? "Tipologia ISTAT" : "ISTAT type"}</th><td>${esc(unit.type)} — ${esc(typeName)}</td></tr>
<tr><th>${it ? "Comuni nel foglio" : "Municipalities in the sheet"}</th><td>${esc(String(unit.comuni))}</td></tr>
</table>
<p>${
    it
      ? "Il foglio «CODICI al 21_02_2026» ha 110 unità territoriali sovracomunali. Un'intestazione dello stesso file dice «107 Province (dal 2017 al 2025)». Questa pagina usa il foglio del 21 febbraio 2026."
      : "The sheet “CODICI al 21_02_2026” has 110 supra-municipal units. A header in the same workbook says “107 Province (dal 2017 al 2025)”. This page uses the 21 February 2026 sheet."
  }</p>
<h2>${it ? "Carica" : "Office"}</h2>
${offices}
${officeholders}
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${
    it
      ? "Non è stato letto un decreto di convocazione della prossima elezione di questo livello."
      : "No decree calling the next election at this level was read."
  }</p>
<p class="tools">${it ? "Comuni" : "Municipalities"}: <a href="${esc(comuniIndexPath(lang, unit.regionSlug, unit.slug))}">${it ? "Indice dei comuni pubblicati per questa unità" : "Index of municipalities published for this unit"}</a></p>
<p class="tools">${it ? "Livello superiore" : "Parent"}: <a href="${esc(regionPath(lang, region.slug))}">${esc(region.istatName)}</a> · <a href="${esc(unitsIndexPath(lang))}">${it ? "Indice" : "Index"}</a>. ${esc(copy.alphaNearby)}: ${neighbors(lang, unit)}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, ["istat-elenco-xlsx", "istat-codici", "anagrafe", "anagrafe-incarica", "dait"])}</ul>`;
  return shell({
    lang,
    path,
    title: `${unit.name} · ${SITE.name}`,
    description: it
      ? `${unit.name}: ${typeName}, codice ISTAT ${unit.code}, ${region.istatName}. Informazione non ufficiale.`
      : `${unit.name}: ${typeName}, ISTAT code ${unit.code}, ${region.istatName}. Unofficial information.`,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: region.istatName, path: regionPath(lang, region.slug) },
      { name: unit.name, path },
    ],
    body,
  });
}

function memberParagraphs(lang: ItLang, item: Level2Collegio): string {
  const it = lang === "it";
  if (item.house === "senato") {
    return `<p class="gap"><strong>${it ? "Lacuna" : "Gap"}.</strong> ${
      it
        ? "Il CSV dei senatori della XIX legislatura scaricato il 18 ottobre 2026 da dati.senato.it non ha un codice di collegio. Le schede pubbliche dei senatori quel giorno non erano leggibili. Questa pagina non assegna un nome."
        : "The CSV of XIX-legislature senators downloaded on 18 October 2026 from dati.senato.it has no constituency code. Public senator profiles were not readable that day. This page does not assign a name."
    }</p>`;
  }
  if (item.members.length === 0) {
    return `<p class="gap"><strong>${it ? "Lacuna" : "Gap"}.</strong> ${
      it
        ? "L'interrogazione SPARQL dei mandati della Camera senza endDate, del 18 ottobre 2026, non ha una riga per questo collegio."
        : "The 18 October 2026 SPARQL query of Chamber mandates without an endDate has no row for this constituency."
    }</p>`;
  }
  return item.members
    .map((member) => {
      const lista = member.lista
        ? it
          ? ` Lista: «${esc(member.lista)}».`
          : ` List: “${esc(member.lista)}”.`
        : it
          ? " Il campo lista è vuoto."
          : " The list field is empty.";
      return it
        ? `<p>${esc(member.given)} ${esc(member.surname)}. tipoElezione «${esc(member.tipo)}». startDate ${esc(ymd(member.start, lang))}.${lista}</p>`
        : `<p>${esc(member.given)} ${esc(member.surname)}. tipoElezione “${esc(member.tipo)}”. startDate ${esc(ymd(member.start, lang))}.${lista}</p>`;
    })
    .join("");
}

function lawNote(lang: ItLang): string {
  return lang === "it"
    ? "Il decreto legislativo 23 dicembre 2020, n. 177, determina questo collegio. La legge 9 ottobre 2026, n. 180, è pubblicata nella Gazzetta Ufficiale n. 235 del 9 ottobre 2026 ed entra in vigore il 24 ottobre 2026. Nel passo letto cita la tabella A.2 del decreto 177/2020 per i collegi plurinominali della Camera e la tabella A.1 per i collegi uninominali di Valle d'Aosta/Vallée d'Aoste e Trentino-Alto Adige/Südtirol. Questa pagina non riscrive il resto di quella legge. Non è stato letto un giorno per la prossima elezione politica."
    : "Legislative decree no. 177 of 23 December 2020 draws this constituency. Law no. 180 of 9 October 2026 was published in Gazzetta Ufficiale no. 235 of 9 October 2026 and enters into force on 24 October 2026. In the passage that was read, it cites table A.2 of decree 177/2020 for Chamber plurinominal constituencies and table A.1 for the uninominal constituencies of Valle d'Aosta/Vallée d'Aoste and Trentino-Alto Adige/Südtirol. This page does not restate the rest of that law. No polling day for the next general election was read.";
}

function collegioPage(lang: ItLang, item: Level2Collegio): string {
  const it = lang === "it";
  const copy = ui(lang);
  const region = regionBySlug(item.regionSlug);
  if (!region) throw new Error(item.regionSlug);
  const path = collegioPath(lang, item.house, item.slug);
  const kind =
    item.kind === "uninominale"
      ? it
        ? "Collegio uninominale"
        : "Single-member constituency"
      : it
        ? "Collegio plurinominale"
        : "Multi-member constituency";
  const house = item.house === "camera" ? (it ? "Camera dei deputati" : "Chamber of Deputies") : it ? "Senato della Repubblica" : "Senate";
  const parent = item.parent ? collegioByName(item.house, item.parent) : undefined;
  const childLinks = item.children
    .map((name) => {
      const child = collegioByName(item.house, name);
      if (!child) throw new Error(`Missing child ${name}`);
      return `<li><a href="${esc(collegioPath(lang, item.house, child.slug))}">${esc(child.name)}</a>${child.largest ? ` — ${esc(child.largest)}` : ""}</li>`;
    })
    .join("");
  const chieti = item.chietiByElection
    ? `<p>${
        it
          ? "La pagina «Speciale elezioni» del Dipartimento, letta il 18 ottobre 2026, dice che un decreto del Presidente della Repubblica pubblicato nella Gazzetta Ufficiale, serie generale, n. 224 del 26 settembre 2026, indice l'elezione suppletiva nel collegio uninominale 01-Chieti della XVII circoscrizione Abruzzo per domenica 15 e lunedì 16 novembre 2026. Questa pagina non pubblica sondaggi, proiezioni o risultati di quella elezione. L'articolo 8 della legge 22 febbraio 2000, n. 28, vieta di rendere pubblici i risultati dei sondaggi demoscopici nei quindici giorni precedenti la votazione."
          : "The Department’s “Speciale elezioni” page, read on 18 October 2026, says a presidential decree published in the Gazzetta Ufficiale, general series, no. 224 of 26 September 2026, calls a by-election in single-member constituency 01-Chieti of the XVII Abruzzo constituency for Sunday 15 and Monday 16 November 2026. This page does not publish polls, projections, or results of that election. Article 8 of Law no. 28 of 22 February 2000 forbids publishing opinion-poll results in the fifteen days before voting."
      }</p>`
    : "";
  const place =
    item.kind === "uninominale"
      ? it
        ? `La tabella stampa come comune o area di maggiore ampiezza «${item.largest}». Righe di dettaglio: ${item.placeRows}. Codici ISTAT distinti: ${item.distinctCodes}. L'elenco dei comuni non è ricopiato.`
        : `The table prints “${item.largest}” as the municipality or area of greatest demographic size. Detail rows: ${item.placeRows}. Distinct ISTAT codes: ${item.distinctCodes}. The municipality list is not copied here.`
      : it
        ? `I collegi uninominali che la tabella A.2 o B.2 assegna a questo collegio sono elencati sotto. L'elenco dei comuni non è ricopiato.`
        : `The uninominal constituencies that table A.2 or B.2 assigns to this constituency are listed below. The municipality list is not copied here.`;
  const body = `<p class="eyebrow">${esc(kind)} · ${esc(house)}</p>
<h1>${esc(item.name)}</h1>
<p class="lede">${esc(item.circoscrizione)} · ${esc(item.regionName)}</p>
<p><strong>${it ? "Fonti di questa pagina lette il 18 ottobre 2026." : "Sources on this page were read on 18 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${it ? "Segnala un errore" : "Report an error"}</a></p>
<p>${esc(lawNote(lang))}</p>
<p>${esc(place)}</p>
${chieti}
<h2>${it ? "Componenti" : "Members"}</h2>
${item.house === "camera" ? `<p>${it ? "Nomi dei mandati della Camera senza data di fine, nell'interrogazione del 18 ottobre 2026. Non è un risultato e non proclama una maggioranza." : "Names from Chamber mandates with no end date, in the 18 October 2026 query. This is not a results table and does not declare a majority."}</p>` : ""}
${memberParagraphs(lang, item)}
${childLinks ? `<h2>${it ? "Collegi uninominali compresi" : "Uninominal constituencies included"}</h2><ul>${childLinks}</ul>` : ""}
<p class="tools">${it ? "Livello superiore" : "Parent"}: <a href="${esc(regionPath(lang, region.slug))}">${esc(region.istatName)}</a>${
    parent ? ` · <a href="${esc(collegioPath(lang, item.house, parent.slug))}">${esc(parent.name)}</a>` : ""
  } · <a href="${esc(collegiIndexPath(lang))}">${it ? "Indice dei collegi" : "Constituency index"}</a></p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, ["dlgs-177-2020", "collegi-xlsx", "camera-deputati-19", "senato-senatori-19", "legge-180-2026", "legge-28-2000", "dait-speciale"])}</ul>`;
  return shell({
    lang,
    path,
    title: `${item.name} · ${SITE.name}`,
    description: it
      ? `${item.name}: ${kind}, ${house}, decreto legislativo 177/2020. Informazione non ufficiale.`
      : `${item.name}: ${kind}, ${house}, legislative decree 177/2020. Unofficial information.`,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: region.istatName, path: regionPath(lang, region.slug) },
      { name: item.name, path },
    ],
    body,
  });
}

function unitsIndex(lang: ItLang): string {
  const it = lang === "it";
  const copy = ui(lang);
  const path = unitsIndexPath(lang);
  const regions = [...new Set(UNITS.map((unit) => unit.regionSlug))];
  const lists = regions
    .map((slug) => {
      const region = regionBySlug(slug);
      if (!region) throw new Error(slug);
      const items = UNITS.filter((unit) => unit.regionSlug === slug)
        .sort((a, b) => a.name.localeCompare(b.name, "it"))
        .map(
          (unit) =>
            `<li><a href="${esc(unitPath(lang, unit.regionSlug, unit.slug))}">${esc(unit.name)}</a> — ${esc(unitLabel(unit.type, lang))}</li>`,
        )
        .join("");
      return `<h2><a href="${esc(regionPath(lang, slug))}">${esc(region.istatName)}</a></h2><ul>${items}</ul>`;
    })
    .join("");
  const body = `<p class="eyebrow">${it ? "Livello 2" : "Level 2"}</p>
<h1>${it ? "Unità territoriali sovracomunali" : "Supra-municipal territorial units"}</h1>
<p class="lede">${it ? "110 unità nel foglio ISTAT del 21 febbraio 2026." : "110 units in the ISTAT sheet of 21 February 2026."}</p>
<p>${
    it
      ? `Conteggio per tipologia: 83 province, 15 città metropolitane, 6 liberi consorzi di comuni, 2 province autonome, 4 unità non amministrative. Il file degli amministratori aggiornato al 24 agosto 2026 stampa ancora ${ANAGRAFE_NAMES_NOT_MATCHED.join(", ")}, nome assente dal foglio ISTAT: nessuna pagina.`
      : `Counts by type: 83 provinces, 15 metropolitan cities, 6 free consortia of municipalities, 2 autonomous provinces, 4 non-administrative units. The administrator file updated on 24 August 2026 still prints ${ANAGRAFE_NAMES_NOT_MATCHED.join(", ")}, a name absent from the ISTAT sheet: no page.`
  }</p>
${lists}
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, ["istat-elenco-xlsx", "anagrafe-incarica"])}</ul>`;
  return shell({
    lang,
    path,
    title: `${it ? "Unità territoriali" : "Territorial units"} · ${SITE.name}`,
    description: it
      ? "Indice delle 110 unità territoriali sovracomunali ISTAT. Informazione non ufficiale."
      : "Index of the 110 ISTAT supra-municipal units. Unofficial information.",
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: it ? "Unità territoriali" : "Territorial units", path },
    ],
    body,
  });
}

function collegiIndex(lang: ItLang): string {
  const it = lang === "it";
  const copy = ui(lang);
  const path = collegiIndexPath(lang);
  const blocks = (["camera", "senato"] as const)
    .map((house) => {
      const title = house === "camera" ? (it ? "Camera dei deputati" : "Chamber") : it ? "Senato" : "Senate";
      const items = COLLEGI.filter((item) => item.house === house)
        .sort((a, b) => a.name.localeCompare(b.name, "it"))
        .map(
          (item) =>
            `<li><a href="${esc(collegioPath(lang, house, item.slug))}">${esc(item.name)}</a></li>`,
        )
        .join("");
      return `<h2>${esc(title)}</h2><ul>${items}</ul>`;
    })
    .join("");
  const body = `<p class="eyebrow">${it ? "Livello 2" : "Level 2"}</p>
<h1>${it ? "Collegi uninominali e plurinominali" : "Uninominal and plurinominal constituencies"}</h1>
<p class="lede">${it ? "Tabelle A.1, A.2, B.1 e B.2 del decreto legislativo n. 177/2020." : "Tables A.1, A.2, B.1 and B.2 of legislative decree no. 177/2020."}</p>
<p>${esc(lawNote(lang))} ${
    it
      ? `I deputati della circoscrizione Estero nell'interrogazione sono ${ESTERO_DEPUTIES}. Non sono collegi del decreto 177/2020 e non hanno una pagina qui.`
      : `Deputies of the overseas constituency in the query: ${ESTERO_DEPUTIES}. They are not constituencies of decree 177/2020 and have no page here.`
  }</p>
${blocks}
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceList(lang, ["dlgs-177-2020", "collegi-xlsx", "legge-180-2026", "camera-deputati-19"])}</ul>`;
  return shell({
    lang,
    path,
    title: `${it ? "Collegi" : "Constituencies"} · ${SITE.name}`,
    description: it
      ? "Indice dei collegi della Camera e del Senato nel decreto legislativo 177/2020. Informazione non ufficiale."
      : "Index of Chamber and Senate constituencies in legislative decree 177/2020. Unofficial information.",
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.italy, path: "/it/" },
      { name: it ? "Italia" : "Italy", path: italyHome(lang) },
      { name: it ? "Collegi" : "Constituencies", path },
    ],
    body,
  });
}

rmSync(join(publicDir, "it"), { recursive: true, force: true });
let written = 0;
let bytes = 0;
function write(path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
  bytes += Buffer.byteLength(html);
}
for (const lang of LANGS) {
  write(unitsIndexPath(lang), unitsIndex(lang));
  write(collegiIndexPath(lang), collegiIndex(lang));
  for (const unit of UNITS) write(unitPath(lang, unit.regionSlug, unit.slug), unitPage(lang, unit));
  for (const item of COLLEGI) write(collegioPath(lang, item.house, item.slug), collegioPage(lang, item));
}
console.log(`italy level 2 html: ${written} pages, ${bytes} bytes`);
