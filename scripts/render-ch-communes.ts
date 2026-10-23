import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { CANTONS } from "../data/ch/cantons";
import { COMMUNES, communesForParent, type Commune } from "../data/ch/communes";
import { DISTRICTS } from "../data/ch/districts";
import { communePath, communesIndexPath, districtPath } from "../data/ch/search";
import { sourcesById } from "../data/ch/sources";
import type { ChLang } from "../data/ch/types";
import { localDate, trustCopy, ui } from "../data/ch/ui";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import {
  communeHeading,
  communeListMarkup,
  laterCommuneGapParagraph,
  oldCommuneGapParagraph,
  publishedCommuneBlock,
} from "./ch-commune-block";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const LANGS: ChLang[] = ["de", "fr", "it", "en"];
const OFFICE = "https://www.bk.admin.ch/de/nationalratswahlen";
const SOURCE_IDS = ["agvch-hist", "opendata-hgv", "bv-1999", "admin-20250827", "bbl-2022-2547"] as const;
const READ_ON: Record<string, string> = { "agvch-hist": "2026-10-19", "opendata-hgv": "2026-10-19" };
const OG: Record<ChLang, string> = { de: "de_CH", fr: "fr_CH", it: "it_CH", en: "en_US" };

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function cantonByAbbr(abbr: string) {
  const canton = CANTONS.find((item) => item.abbr === abbr);
  if (!canton) throw new Error(`No canton ${abbr}`);
  return canton;
}

function copied(lang: ChLang): string {
  if (lang === "de") return "Kopie vom 19. Oktober 2026.";
  if (lang === "fr") return "Copie du 19 octobre 2026.";
  if (lang === "it") return "Copia del 19 ottobre 2026.";
  return "Copied on 19 October 2026.";
}

function shortLabel(lang: ChLang): string {
  if (lang === "de") return "Kurzname";
  if (lang === "fr") return "Nom court";
  if (lang === "it") return "Nome breve";
  return "Short name";
}

function validLabel(lang: ChLang): string {
  if (lang === "de") return "Gültig ab";
  if (lang === "fr") return "Valable depuis";
  if (lang === "it") return "Valido dal";
  return "Valid from";
}

function constituencyLabel(lang: ChLang): string {
  if (lang === "de") return "Nationalratswahlkreis";
  if (lang === "fr") return "Circonscription du Conseil national";
  if (lang === "it") return "Circondario del Consiglio nazionale";
  return "National Council constituency";
}

function eyebrow(lang: ChLang): string {
  if (lang === "de") return "Politische Gemeinde";
  if (lang === "fr") return "Commune politique";
  if (lang === "it") return "Comune politico";
  return "Political municipality";
}

function constituency(lang: ChLang, cantonName: string): string {
  if (lang === "de") {
    return `Der Wahlkreis für den Nationalrat ist der Kanton ${cantonName} (Artikel 149 Absatz 3 der Bundesverfassung). Die Medienmitteilung des Bundesrates vom 27. August 2025 nennt die Nationalratswahlen vom 24. Oktober 2027. Das Kreisschreiben vom 19. Oktober 2022 nennt die ordentliche Gesamterneuerung vom 22. Oktober 2023.`;
  }
  if (lang === "fr") {
    return `La circonscription du Conseil national est le canton ${cantonName} (article 149, alinéa 3, de la Constitution fédérale). Le communiqué du Conseil fédéral du 27 août 2025 nomme les élections au Conseil national du 24 octobre 2027. La circulaire du 19 octobre 2022 nomme le renouvellement ordinaire du 22 octobre 2023.`;
  }
  if (lang === "it") {
    return `Il circondario del Consiglio nazionale è il cantone ${cantonName} (articolo 149 capoverso 3 della Costituzione federale). Il comunicato del Consiglio federale del 27 agosto 2025 indica le elezioni del Consiglio nazionale del 24 ottobre 2027. La circolare del 19 ottobre 2022 indica il rinnovo ordinario del 22 ottobre 2023.`;
  }
  return `The National Council constituency is the canton of ${cantonName} (article 149 paragraph 3 of the Federal Constitution). The Federal Council release of 27 August 2025 names the National Council elections of 24 October 2027. The circular of 19 October 2022 names the ordinary full renewal of 22 October 2023.`;
}

function executiveGap(lang: ChLang): string {
  if (lang === "de") {
    return "Der Gemeindevorstand (Gemeindepräsident, syndic, maire oder sindaco) ist nicht zentral veröffentlicht. Am 19. Oktober 2026 lag kein amtliches kantonales oder kommunales Verzeichnis dieses Amtes vor. Es wird kein Name eingesetzt.";
  }
  if (lang === "fr") {
    return "L’exécutif communal (Gemeindepräsident, syndic, maire ou sindaco) n’est pas publié de manière centrale. Le 19 octobre 2026, aucun répertoire officiel cantonal ou communal de cette fonction n’avait été lu. Aucun nom n’est ajouté.";
  }
  if (lang === "it") {
    return "L’esecutivo comunale (Gemeindepräsident, syndic, maire o sindaco) non è pubblicato a livello centrale. Il 19 ottobre 2026 non era stato letto un repertorio ufficiale cantonale o comunale di questa carica. Non si inserisce alcun nome.";
  }
  return "The executive head (Gemeindepräsident, syndic, maire, or sindaco) is not published centrally. No official cantonal or communal list of that office had been read on 19 October 2026. No name is printed.";
}

function electionGap(lang: ChLang): string {
  if (lang === "de") {
    return "Ein letztes oder nächstes kommunales Wahldatum steht hier nicht. Die Termine unterscheiden sich nach Kanton. Am 19. Oktober 2026 lag für diese Gemeinde keine kantonale amtliche Quelle mit diesen Daten vor.";
  }
  if (lang === "fr") {
    return "Aucune date de dernière ou de prochaine élection communale n’est inscrite ici. Les dates varient selon le canton. Le 19 octobre 2026, aucune source officielle cantonale ne donnait ces dates pour cette commune.";
  }
  if (lang === "it") {
    return "Qui non è indicata la data dell’ultima o della prossima elezione comunale. Le date variano secondo il cantone. Il 19 ottobre 2026 nessuna fonte ufficiale cantonale riportava queste date per questo comune.";
  }
  return "No last or next communal election date is printed here. The dates vary by canton. On 19 October 2026 no cantonal official source gave those dates for this commune.";
}

function shortSource(lang: ChLang, id: string): string {
  const de: Record<string, string> = {
    "agvch-hist": "BFS, historisiertes Gemeindeverzeichnis, eCH-0071 1.2.0, 20260101_GDEHist_GDE.txt",
    "opendata-hgv": "opendata.swiss, Swiss official commune’s historicized list, Kennzeichen «Open use»",
    "bv-1999": "Bundesverfassung, Art. 149 Abs. 3",
    "admin-20250827": "Bundesrat, Medienmitteilung vom 27. August 2025",
    "bbl-2022-2547": "Bundesrat, Kreisschreiben BBl 2022 2547",
  };
  const fr: Record<string, string> = {
    "agvch-hist": "OFS, liste historisée des communes, eCH-0071 1.2.0, 20260101_GDEHist_GDE.txt",
    "opendata-hgv": "opendata.swiss, Swiss official commune’s historicized list, symbole « Open use »",
    "bv-1999": "Constitution fédérale, art. 149 al. 3",
    "admin-20250827": "Conseil fédéral, communiqué du 27 août 2025",
    "bbl-2022-2547": "Conseil fédéral, circulaire FF 2022 2547",
  };
  const it: Record<string, string> = {
    "agvch-hist": "UST, repertorio storicizzato dei comuni, eCH-0071 1.2.0, 20260101_GDEHist_GDE.txt",
    "opendata-hgv": "opendata.swiss, Swiss official commune’s historicized list, simbolo «Open use»",
    "bv-1999": "Costituzione federale, art. 149 cpv. 3",
    "admin-20250827": "Consiglio federale, comunicato del 27 agosto 2025",
    "bbl-2022-2547": "Consiglio federale, circolare FF 2022 2547",
  };
  const en: Record<string, string> = {
    "agvch-hist": "FSO, historized commune register, eCH-0071 1.2.0, 20260101_GDEHist_GDE.txt",
    "opendata-hgv": "opendata.swiss, Swiss official commune’s historicized list, symbol “Open use”",
    "bv-1999": "Federal Constitution, art. 149 para. 3",
    "admin-20250827": "Federal Council release of 27 August 2025",
    "bbl-2022-2547": "Federal Council circular, BBl 2022 2547",
  };
  const table = lang === "de" ? de : lang === "fr" ? fr : lang === "it" ? it : en;
  return table[id] ?? id;
}

function attribution(lang: ChLang): string {
  if (lang === "de") {
    return "Quelle: Bundesamt für Statistik (BFS), Historisiertes Gemeindeverzeichnis der Schweiz, eCH-0071 1.2.0. Kopie vom 19. Oktober 2026. opendata.swiss: «Open use». Keine amtliche Veröffentlichung des BFS. Der volle Titel steht auf der Quellenseite.";
  }
  if (lang === "fr") {
    return "Source : Office fédéral de la statistique (OFS), liste historisée des communes de Suisse, eCH-0071 1.2.0. Copie du 19 octobre 2026. opendata.swiss : « Open use ». Ceci n’est pas une publication officielle de l’OFS. Le titre complet est sur la page des sources.";
  }
  if (lang === "it") {
    return "Fonte: Ufficio federale di statistica (UST), repertorio storicizzato dei comuni della Svizzera, eCH-0071 1.2.0. Copia del 19 ottobre 2026. opendata.swiss: «Open use». Non è una pubblicazione ufficiale dell’UST. Il titolo completo è nella pagina delle fonti.";
  }
  return "Source: Federal Statistical Office (FSO), Swiss official commune’s historicized list, eCH-0071 1.2.0. Copied on 19 October 2026. opendata.swiss: “Open use”. This is not an official FSO publication. The full title is on the sources page.";
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
      index === input.crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const langs = LANGS.map((code) => {
    const href = input.path.replace(/^\/ch\/(de|fr|it|en)\//, `/ch/${code}/`);
    const label = code === "de" ? "Deutsch" : code === "fr" ? "Français" : code === "it" ? "Italiano" : "English";
    return `<a href="${esc(href)}">${label}</a>`;
  }).join(" · ");
  const sources = sourcesById([...SOURCE_IDS])
    .map((source) => {
      const read = READ_ON[source.id] ?? source.readOn;
      return `<li><a href="${esc(source.url)}">${esc(shortSource(input.lang, source.id))}</a> — ${esc(copy.readOn)} ${esc(read)}</li>`;
    })
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
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
${ADSENSE_HEAD_TAGS}
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
${withLegalFooter(`© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.`)}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function write(path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function communePage(lang: ChLang, commune: Commune): string {
  const copy = ui(lang);
  const canton = cantonByAbbr(commune.canton);
  const path = communePath(lang, canton.slug, commune.districtSlug, commune.slug);
  const siblings = communesForParent(commune.canton, commune.districtSlug);
  const index = siblings.findIndex((item) => item.slug === commune.slug);
  const near = [siblings[index - 1], siblings[index + 1]]
    .filter((item): item is Commune => Boolean(item))
    .map((item) => `<a href="${esc(communePath(lang, canton.slug, commune.districtSlug, item.slug))}">${esc(item.name)}</a>`)
    .join(" · ");
  const parentBits = [
    `<a href="${esc(`/ch/${lang}/${canton.slug}/`)}">${esc(canton.officialName)}</a>`,
  ];
  if (commune.districtSlug) {
    parentBits.push(
      `<a href="${esc(districtPath(lang, canton.slug, commune.districtSlug))}">${esc(commune.districtName)}</a>`,
    );
  }
  parentBits.push(
    `<a href="${esc(communesIndexPath(lang, canton.slug, commune.districtSlug))}">${esc(communeHeading(lang))}</a>`,
  );
  const short =
    commune.shortName !== commune.name
      ? `<tr><th>${esc(shortLabel(lang))}</th><td>${esc(commune.shortName)}</td></tr>`
      : "";
  const description = `${commune.name}, BFS ${commune.bfs}, ${commune.districtName}, ${canton.officialName}.`;
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.switzerland, path: "/ch/" },
    { name: copy.switzerland, path: `/ch/${lang}/` },
    { name: canton.officialName, path: `/ch/${lang}/${canton.slug}/` },
  ];
  if (commune.districtSlug) {
    crumbs.push({
      name: commune.districtName,
      path: districtPath(lang, canton.slug, commune.districtSlug),
    });
  }
  crumbs.push({ name: commune.name, path });
  const body = `<p class="eyebrow">${esc(eyebrow(lang))}</p>
<h1>${esc(commune.name)}</h1>
<p class="lede">${esc(canton.officialName)}${commune.districtSlug ? ` · ${esc(commune.districtName)}` : ""}</p>
<table>
<tr><th>BFS</th><td>${esc(commune.bfs)}</td></tr>
${short}
<tr><th>${esc(validLabel(lang))}</th><td>${esc(commune.validFrom)}</td></tr>
<tr><th>${esc(constituencyLabel(lang))}</th><td>${esc(canton.officialName)}</td></tr>
</table>
<p>${esc(constituency(lang, canton.officialName))}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(executiveGap(lang))}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(electionGap(lang))}</p>
<p class="tools">${esc(copy.parent)}: ${parentBits.join(" · ")}. ${esc(copy.alphaNearby)}: ${near}</p>
`;
  return pageDocument({ lang, path, title: commune.name, description, crumbs, body });
}

function indexPage(lang: ChLang, sample: Commune): string {
  const copy = ui(lang);
  const canton = cantonByAbbr(sample.canton);
  const list = communesForParent(sample.canton, sample.districtSlug);
  const path = communesIndexPath(lang, canton.slug, sample.districtSlug);
  const place = sample.districtSlug ? sample.districtName : canton.officialName;
  const title =
    lang === "de" ? `Gemeinden · ${place}` : lang === "fr" ? `Communes · ${place}` : lang === "it" ? `Comuni · ${place}` : `Municipalities · ${place}`;
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.switzerland, path: "/ch/" },
    { name: copy.switzerland, path: `/ch/${lang}/` },
    { name: canton.officialName, path: `/ch/${lang}/${canton.slug}/` },
  ];
  if (sample.districtSlug) {
    crumbs.push({ name: sample.districtName, path: districtPath(lang, canton.slug, sample.districtSlug) });
  }
  crumbs.push({ name: communeHeading(lang), path });
  const body = `<h1>${esc(title)}</h1><p>${esc(canton.officialName)}. ${list.length}.</p>${communeListMarkup(lang, canton.slug, sample.districtSlug, list)}`;
  return pageDocument({
    lang,
    path,
    title,
    description: `${title}. BFS ${sample.districtBfs}.`,
    crumbs,
    body,
  });
}

function patchDistricts(): number {
  let patched = 0;
  for (const lang of LANGS) {
    for (const district of DISTRICTS) {
      const canton = cantonByAbbr(district.canton);
      const file = join(publicDir, districtPath(lang, canton.slug, district.slug), "index.html");
      const html = readFileSync(file, "utf8");
      const needle = oldCommuneGapParagraph(lang);
      if (!html.includes(needle)) throw new Error(`Gap paragraph missing in ${file}`);
      const block = publishedCommuneBlock(lang, canton.slug, district.canton, district.slug);
      const next = html.replace(needle, block ?? laterCommuneGapParagraph(lang));
      if (next === html) throw new Error(`No change ${file}`);
      writeFileSync(file, next);
      patched += 1;
    }
  }
  return patched;
}

let bytes = 0;
let pages = 0;
const seenParents = new Set<string>();
for (const lang of LANGS) {
  for (const commune of COMMUNES) {
    const canton = cantonByAbbr(commune.canton);
    const html = communePage(lang, commune);
    const path = communePath(lang, canton.slug, commune.districtSlug, commune.slug);
    write(path, html);
    bytes += Buffer.byteLength(html);
    pages += 1;
    const parentKey = `${lang}/${commune.canton}/${commune.districtSlug}`;
    if (!seenParents.has(parentKey)) {
      seenParents.add(parentKey);
      const indexHtml = indexPage(lang, commune);
      write(communesIndexPath(lang, canton.slug, commune.districtSlug), indexHtml);
      bytes += Buffer.byteLength(indexHtml);
      pages += 1;
    }
  }
}

const districts = patchDistricts();
console.log(`switzerland commune html: ${pages} pages, ${bytes} bytes; district files patched: ${districts}`);
