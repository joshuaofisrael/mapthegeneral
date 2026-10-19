import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { circunscripcionForEntity } from "../src/data/mx/circunscripciones";
import { ENTITIES, entityBySlug } from "../src/data/mx/entities";
import {
  entitySlugFor,
  isAlcaldia,
  municipioNeighbors,
  MUNICIPIOS,
  municipiosByEntitySlug,
  type Municipio,
} from "../src/data/mx/municipios";
import {
  circunscripcionesPath,
  districtPath,
  entityPath,
  mexicoHome,
  municipioPath,
  municipiosIndexPath,
  type Lang,
} from "../src/data/mx/paths";
import { padDistrict } from "../src/data/mx/distritos";
import { sourcesById } from "../src/data/mx/sources";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://ine.mx/voto-y-elecciones/elecciones-2027/";
const SOURCE_IDS = ["inegi-mgem", "ine-2027", "ine-cg130-2023", "ine-cartografia-mun", "inafed-presidentes"] as const;

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function num(value: number, lang: Lang): string {
  return new Intl.NumberFormat(lang === "es" ? "es-MX" : "en-GB").format(value);
}

function clearPlaceDirs() {
  for (const lang of ["es", "en"] as const) {
    const langDir = join(publicDir, "mx", lang);
    if (!existsSync(langDir)) continue;
    for (const entity of readdirSync(langDir, { withFileTypes: true })) {
      if (!entity.isDirectory()) continue;
      const entityDir = join(langDir, entity.name);
      for (const child of readdirSync(entityDir, { withFileTypes: true })) {
        if (child.isDirectory() && !/^distrito-\d+$/.test(child.name)) {
          rmSync(join(entityDir, child.name), { recursive: true, force: true });
        }
      }
    }
  }
}

function writePage(path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function shell(opts: {
  lang: Lang;
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
}): string {
  const es = opts.lang === "es";
  const other: Lang = es ? "en" : "es";
  const otherPath = opts.path.replace(`/mx/${opts.lang}/`, `/mx/${other}/`);
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
      index === opts.crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const shortSource: Record<(typeof SOURCE_IDS)[number], string> = {
    "inegi-mgem": es ? "INEGI, catálogo mgem" : "INEGI, mgem catalog",
    "ine-2027": es ? "INE, proceso 2026-2027" : "INE, 2026-2027 process",
    "ine-cg130-2023": es ? "DOF, INE/CG130/2023" : "DOF, INE/CG130/2023",
    "ine-cartografia-mun": es ? "INE, shapefiles de municipios y distritos" : "INE, municipality and district shapefiles",
    "inafed-presidentes": es ? "INAFED, datos.gob.mx, CC BY 4.0" : "INAFED, datos.gob.mx, CC BY 4.0",
  };
  const sources = sourcesById([...SOURCE_IDS])
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(shortSource[source.id as (typeof SOURCE_IDS)[number]])}</a> — ${esc(source.readOn)}</li>`,
    )
    .join("");
  const banner = es
    ? `Información no oficial. Confírmela con su <a href="${OFFICE}">autoridad electoral oficial</a>.`
    : `${esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}`;
  return `<!DOCTYPE html>
<html lang="${opts.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(opts.title)}</title>
<meta name="description" content="${esc(opts.description)}">
<link rel="canonical" href="${esc(absoluteUrl(opts.path))}">
<link rel="alternate" hreflang="es" href="${esc(absoluteUrl(es ? opts.path : otherPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(es ? otherPath : opts.path))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(es ? otherPath : opts.path))}">
<meta name="robots" content="index,follow">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${banner}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(mexicoHome(opts.lang))}">${es ? "México" : "Mexico"}</a> · <a href="/search/">${es ? "Buscar" : "Search"}</a> · <a href="${esc(otherPath)}">${es ? "English" : "Español"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
${opts.body}
<h2>${es ? "Fuentes" : "Sources"}</h2>
<ul>${sources}</ul>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function officeText(lang: Lang, row: Municipio): string {
  const es = lang === "es";
  const office = isAlcaldia(row) ? "alcaldía" : es ? "presidencia municipal" : "municipal presidency";
  if (!row.inafed) {
    return es
      ? `Esta clave no está en el archivo del INAFED «Presidentas y Presidentes municipales en gobiernos actuales» (CC BY 4.0), leído el 19 de octubre de 2026. No se copian el nombre de la ${office}, domicilio, teléfono, correo ni integrantes del ayuntamiento.`
      : `This code is not in the INAFED file “Presidentas y Presidentes municipales en gobiernos actuales” (CC BY 4.0), read on 19 October 2026. The ${office} name, address, phone, email, and ayuntamiento membership are not copied.`;
  }
  return es
    ? `INAFED, «Presidentas y Presidentes municipales en gobiernos actuales» (CC BY 4.0), leído el 19 de octubre de 2026. Esta clave está en el archivo y ningún periodo cubre esa fecha. No se copian nombre, partido, domicilio, teléfono, correo ni integrantes del ayuntamiento.`
    : `INAFED, “Presidentas y Presidentes municipales en gobiernos actuales” (CC BY 4.0), read on 19 October 2026. This code is in the file and no term covers that date. Name, party, address, phone, email, and ayuntamiento membership are not copied.`;
}

function electionText(lang: Lang, entityCode: string, presidencias: number | undefined, alcaldias: number | undefined, rows: number): string {
  const es = lang === "es";
  if (entityCode === "09" && alcaldias === rows) {
    return es
      ? "INE, leído el 17 de octubre de 2026: 16 alcaldías, igual a las filas del catálogo. Jornada: 6 de junio de 2027. No se copia la fecha de la elección anterior."
      : "INE, read on 17 October 2026: 16 alcaldías, equal to the catalog row count. Polling day: 6 June 2027. The date of the previous election is not copied.";
  }
  if (presidencias === undefined) {
    return es
      ? "El bloque del INE para esta entidad, leído el 17 de octubre de 2026, no imprime presidencias municipales. Esta página no asigna una jornada ni copia la fecha de la elección anterior."
      : "The INE block for this entidad, read on 17 October 2026, does not print municipal presidencies. This page does not assign a polling day or copy the date of the previous election.";
  }
  if (presidencias === rows) {
    return es
      ? `INE, leído el 17 de octubre de 2026: ${presidencias} presidencias municipales, igual a las filas del catálogo. Jornada: 6 de junio de 2027. No se copia la fecha de la elección anterior.`
      : `INE, read on 17 October 2026: ${presidencias} municipal presidencies, equal to the catalog row count. Polling day: 6 June 2027. The date of the previous election is not copied.`;
  }
  return es
    ? `El INE imprime ${presidencias} presidencias municipales y el catálogo tiene ${rows} filas. Esta página no dice si este municipio entra en la jornada del 6 de junio de 2027, ni copia la fecha de la elección anterior.`
    : `The INE prints ${presidencias} municipal presidencies and the catalog has ${rows} rows. This page does not say whether this municipality is on the 6 June 2027 ballot, or copy the date of the previous election.`;
}

function districtBits(lang: Lang, entitySlug: string, row: Municipio): { cell: string; note: string } {
  const es = lang === "es";
  if (row.join === "name") {
    const links = row.districts
      .map((number) => `<a href="${esc(districtPath(lang, entitySlug, number))}">${esc(padDistrict(number))}</a>`)
      .join(", ");
    const note = es
      ? "Comparación de esta entrega, no una tabla del INE ni un producto del INEGI: el polígono municipal del INE con este nombre, sobre los distritos federales vigentes desde el 1 de octubre de 2026."
      : "A comparison made for this release, not an INE table and not an INEGI product: the INE municipality polygon with this name, over the federal districts in force from 1 October 2026.";
    return { cell: links, note };
  }
  if (row.join === "ambiguous") {
    const note = es
      ? "El shapefile municipal del INE tiene más de un polígono con este nombre. Esta página no elige un distrito."
      : "The INE municipality shapefile has more than one polygon with this name. This page does not choose a district.";
    return { cell: es ? "Sin elección" : "Not chosen", note };
  }
  const note = es
    ? "El shapefile municipal del INE no tiene un polígono cuyo nombre coincida solo con esta fila. Esta página no lista un distrito federal."
    : "The INE municipality shapefile has no polygon whose name matches only this row. This page does not list a federal district.";
  return { cell: es ? "Sin emparejamiento" : "No match", note };
}

function placePage(lang: Lang, row: Municipio): string {
  const es = lang === "es";
  const entitySlug = entitySlugFor(row);
  const entity = entityBySlug(entitySlug);
  const circ = circunscripcionForEntity(entitySlug);
  if (!entity || !circ) throw new Error(`Missing parent ${row.code}`);
  const path = municipioPath(lang, entitySlug, row.slug);
  const kind = isAlcaldia(row) ? "Alcaldía" : es ? "Municipio" : "Municipality";
  const title = `${row.name} · ${entity.name} · ${SITE.name}`;
  const description = es
    ? `${row.name}, clave ${row.code}. ${kind} de ${entity.name}. Información no oficial.`
    : `${row.name}, code ${row.code}. ${kind} of ${entity.name}. Unofficial information.`;
  const crumbs = [
    { name: es ? "Inicio" : "Home", path: "/" },
    { name: "México", path: "/mx/" },
    { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
    { name: entity.name, path: entityPath(lang, entitySlug) },
    { name: row.name, path },
  ];
  const pop =
    row.population === null
      ? es
        ? "El servicio no devolvió pob_total."
        : "The service did not return pob_total."
      : num(row.population, lang);
  const catalog = es
    ? `Fuente: INEGI, mgem, leído el 19 de octubre de 2026. Nombre «${row.name}», clave ${row.code}. Metadato: Censo de Población y Vivienda, 2020. nom_cab no se copia.`
    : `Fuente: INEGI, mgem, read on 19 October 2026. Name “${row.name}”, code ${row.code}. Metadata: 2020 Census of Population and Housing. nom_cab is not copied.`;
  const districts = districtBits(lang, entitySlug, row);
  const { prev, next } = municipioNeighbors(row);
  const near = [
    prev ? `<a href="${esc(municipioPath(lang, entitySlug, prev.slug))}">${esc(prev.name)}</a>` : "",
    next ? `<a href="${esc(municipioPath(lang, entitySlug, next.slug))}">${esc(next.name)}</a>` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const body = `<p class="eyebrow">${esc(kind)}</p>
<h1>${esc(row.name)}</h1>
<p class="lede">${esc(entity.name)}</p>
<p><strong>${es ? "Lectura: 19 de octubre de 2026." : "Read: 19 October 2026."}</strong> <a href="${esc(reportErrorHref(path))}">${es ? "Reportar un error" : "Report an error"}</a></p>
<table>
<tr><th>${es ? "Clave geoestadística" : "Geostatistical code"}</th><td>${esc(row.code)}</td></tr>
<tr><th>${es ? "Entidad" : "Entidad"}</th><td><a href="${esc(entityPath(lang, entitySlug))}">${esc(entity.name)}</a></td></tr>
<tr><th>${es ? "Población, Censo 2020" : "Population, 2020 Census"}</th><td>${esc(pop)}</td></tr>
<tr><th>${es ? "Circunscripción" : "Constituency"}</th><td><a href="${esc(circunscripcionesPath(lang))}#circunscripcion-${circ.number}">${circ.number}</a></td></tr>
<tr><th>${es ? "Distrito federal" : "Federal district"}</th><td>${districts.cell}</td></tr>
</table>
<p>${esc(catalog)}</p>
<p>${esc(districts.note)} ${es ? `El acuerdo INE/CG130/2023 sitúa la entidad en la circunscripción ${circ.number}.` : `Agreement INE/CG130/2023 places the entidad in constituency ${circ.number}.`}</p>
<h2>${esc(isAlcaldia(row) ? "Alcaldía" : es ? "Ayuntamiento" : "Ayuntamiento")}</h2>
<p class="gap"><strong>${es ? "Laguna" : "Gap"}.</strong> ${esc(officeText(lang, row))}</p>
<h2>${es ? "Elecciones" : "Elections"}</h2>
<p>${esc(electionText(lang, entity.code, entity.ine.presidencias, entity.ine.alcaldias, entity.municipalities))}</p>
<p class="tools">${es ? "Páginas superiores" : "Parent pages"}: <a href="${esc(entityPath(lang, entitySlug))}">${esc(entity.name)}</a> · <a href="${esc(municipiosIndexPath(lang, entitySlug))}">${es ? "Índice" : "Index"}</a> · <a href="${esc(mexicoHome(lang))}">${es ? "México" : "Mexico"}</a>.${near ? ` ${es ? "Anterior y siguiente:" : "Previous and next:"} ${near}` : ""}</p>`;
  return shell({ lang, path, title, description, crumbs, body });
}

function indexPage(lang: Lang, entitySlug: string): string {
  const es = lang === "es";
  const entity = entityBySlug(entitySlug);
  if (!entity) throw new Error(entitySlug);
  const rows = municipiosByEntitySlug(entitySlug);
  const path = municipiosIndexPath(lang, entitySlug);
  const label = entity.code === "09" ? (es ? "Alcaldías" : "Alcaldías") : es ? "Municipios" : "Municipalities";
  const title = `${label} · ${entity.name} · ${SITE.name}`;
  const description = es
    ? `${label} de ${entity.name} en el catálogo mgem del INEGI. Información no oficial.`
    : `${label} of ${entity.name} in the INEGI mgem catalog. Unofficial information.`;
  const crumbs = [
    { name: es ? "Inicio" : "Home", path: "/" },
    { name: "México", path: "/mx/" },
    { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
    { name: entity.name, path: entityPath(lang, entitySlug) },
    { name: label, path },
  ];
  const items = rows
    .map(
      (row) =>
        `<li><a href="${esc(municipioPath(lang, entitySlug, row.slug))}">${esc(row.name)}</a> <span>${esc(row.code)}</span></li>`,
    )
    .join("");
  const intro = es
    ? `El servicio mgem, leído el 19 de octubre de 2026, devolvió ${rows.length} filas para la clave ${entity.code}. Cada fila tiene página. La entidad también enlaza esta lista.`
    : `The mgem service, read on 19 October 2026, returned ${rows.length} rows for code ${entity.code}. Each row has a page. The entidad page also links this list.`;
  const body = `<p class="eyebrow">${esc(entity.name)}</p>
<h1>${esc(label)}</h1>
<p>${esc(intro)}</p>
<ul>${items}</ul>
<p class="tools"><a href="${esc(entityPath(lang, entitySlug))}">${esc(entity.name)}</a></p>`;
  return shell({ lang, path, title, description, crumbs, body });
}

clearPlaceDirs();
let written = 0;
for (const row of MUNICIPIOS) {
  for (const lang of ["es", "en"] as const) {
    writePage(municipioPath(lang, entitySlugFor(row), row.slug), placePage(lang, row));
    written += 1;
  }
}
for (const entity of ENTITIES) {
  for (const lang of ["es", "en"] as const) {
    writePage(municipiosIndexPath(lang, entity.slug), indexPage(lang, entity.slug));
    written += 1;
  }
}
console.log(`mexico municipality html: ${written}`);
