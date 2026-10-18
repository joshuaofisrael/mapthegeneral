import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { circunscripcionByNumber } from "../src/data/mx/circunscripciones";
import {
  DIRECTORY_PRINTED_DATE,
  DISTRICTS,
  districtNeighbors,
  padDistrict,
  type District,
} from "../src/data/mx/distritos";
import { entityBySlug } from "../src/data/mx/entities";
import { circunscripcionesPath, districtPath, districtsIndexPath, entityPath, mexicoHome, type Lang } from "../src/data/mx/paths";
import { sourcesById } from "../src/data/mx/sources";
import { ui } from "../src/data/mx/ui";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://ine.mx/voto-y-elecciones/elecciones-2027/";
const SOURCE_IDS = [
  "ine-cg875-anexo",
  "ine-cg875-2022",
  "ine-cg526-2026",
  "ine-cartografia-2026",
  "camara-lxvi",
  "ine-2027",
  "ine-jornada-2024",
] as const;

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function page(lang: Lang, district: District): string {
  const copy = ui(lang);
  const es = lang === "es";
  const other: Lang = es ? "en" : "es";
  const entity = entityBySlug(district.entitySlug);
  const circ = circunscripcionByNumber(district.circunscripcion);
  if (!entity || !circ) throw new Error(`Missing parent for ${district.entityCode}-${district.number}`);
  const path = districtPath(lang, entity.slug, district.number);
  const otherPath = districtPath(other, entity.slug, district.number);
  const number = padDistrict(district.number);
  const titleName = es ? `Distrito ${number}` : `District ${number}`;
  const crumbs = [
    { name: copy.home, path: "/" },
    { name: copy.mexico, path: "/mx/" },
    { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
    { name: entity.name, path: entityPath(lang, entity.slug) },
    { name: titleName, path },
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
    ? `Distrito electoral federal ${number} de ${entity.name}. Cabecera: ${district.cabeceraLocalidad}. Diputación de mayoría relativa. Información no oficial.`
    : `Federal electoral district ${number} of ${entity.name}. Cabecera: ${district.cabeceraLocalidad}. Relative-majority seat. Unofficial information.`;
  const title = `${titleName} · ${entity.name} · ${SITE.name}`;
  const shortSource: Record<(typeof SOURCE_IDS)[number], string> = {
    "ine-cg875-anexo": es ? "INE/CG875/2022, anexo 3, descriptivo de cabeceras" : "INE/CG875/2022, annex 3, cabecera descriptivo",
    "ine-cg875-2022": es ? "DOF, 20 de febrero de 2023, INE/CG875/2022" : "DOF, 20 February 2023, INE/CG875/2022",
    "ine-cg526-2026": es ? "DOF, 5 de octubre de 2026, INE/CG526/2026" : "DOF, 5 October 2026, INE/CG526/2026",
    "ine-cartografia-2026": es ? "INE, shapefile de distritos federales, vigencia 1 de octubre de 2026" : "INE, federal-district shapefile, in force 1 October 2026",
    "camara-lxvi": es ? "Cámara de Diputados, listado LXVI" : "Chamber of Deputies, LXVI list",
    "ine-2027": es ? "INE, proceso electoral federal 2026-2027" : "INE, federal electoral process 2026-2027",
    "ine-jornada-2024": es ? "INE, nota del 5 de junio de 2024" : "INE, note of 5 June 2024",
  };
  const sources = sourcesById([...SOURCE_IDS])
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(shortSource[source.id as (typeof SOURCE_IDS)[number]])}</a> — ${esc(source.readOn)}</li>`,
    )
    .join("");
  const crumbNav = crumbs
    .map((item, index) =>
      index === crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const { prev, next } = districtNeighbors(district);
  const neighbor = [
    prev ? `<a href="${esc(districtPath(lang, entity.slug, prev.number))}">${esc(es ? `Distrito ${padDistrict(prev.number)}` : `District ${padDistrict(prev.number)}`)}</a>` : "",
    next ? `<a href="${esc(districtPath(lang, entity.slug, next.number))}">${esc(es ? `Distrito ${padDistrict(next.number)}` : `District ${padDistrict(next.number)}`)}</a>` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  const ficha = `https://sitl.diputados.gob.mx/LXVI_leg/curricula.php?dipt=${district.deputy.id}`;
  const nameNote =
    district.deputy.entidadPrinted === entity.name
      ? ""
      : es
        ? ` El directorio imprime la entidad como «${district.deputy.entidadPrinted}». El catálogo del INEGI usa «${entity.name}».`
        : ` The directory prints the entidad as “${district.deputy.entidadPrinted}”. The INEGI catalog uses “${entity.name}”.`;
  const indigena = district.indigena
    ? es
      ? `<p>El mismo descriptivo dice que esta demarcación cuenta con ${esc(district.indigenaPct ?? "")} de población indígena y/o afromexicana y que, por lo tanto, es considerado distrito indígena.</p>`
      : `<p>The same descriptivo says this demarcation has ${esc(district.indigenaPct ?? "")} población indígena y/o afromexicana and that it is therefore considered a distrito indígena.</p>`
    : "";
  const cabeceraSentence = es
    ? `El descriptivo del anexo 3 del acuerdo INE/CG875/2022 dice que la cabecera distrital está en la localidad ${district.cabeceraLocalidad}, perteneciente al municipio ${district.cabeceraMunicipio}. Esos nombres se copian como están impresos.`
    : `The descriptivo in annex 3 of agreement INE/CG875/2022 says the district cabecera is in the localidad ${district.cabeceraLocalidad}, in the municipality ${district.cabeceraMunicipio}. Those names are copied as printed.`;
  const framework = es
    ? "El acuerdo INE/CG526/2026 (3 de septiembre de 2026; DOF 5 de octubre de 2026) incorpora esa demarcación para 2026-2027 y no imprime otra lista de cabeceras. El shapefile de distritos federales, vigente desde el 1 de octubre de 2026, trae esta clave de entidad y este número. Su tabla no nombra la cabecera."
    : "Agreement INE/CG526/2026 (3 September 2026; Official Journal 5 October 2026) incorporates that demarcation for 2026-2027 and does not print another cabecera list. The federal-district shapefile, in force from 1 October 2026, has this entidad code and this number. Its table does not name the cabecera.";
  const seat = es
    ? `La página «Listado de Diputados LXVI» de la Cámara de Diputados imprime la fecha «${DIRECTORY_PRINTED_DATE}». La lectura de esta entrega es del 18 de octubre de 2026. En esa lista, <a href="${esc(ficha)}">${esc(district.deputy.name)}</a> aparece con la entidad impresa y con «${esc(district.deputy.seatPrinted)}». El enlace es la ficha que la propia lista enlaza. Esta página no copia teléfono, domicilio ni correo.`
    : `The Chamber of Deputies page “Listado de Diputados LXVI” prints the date “${DIRECTORY_PRINTED_DATE}”. This release read it on 18 October 2026. In that list, <a href="${esc(ficha)}">${esc(district.deputy.name)}</a> appears with the printed entidad and with “${esc(district.deputy.seatPrinted)}”. The link is the profile the list itself links. This page does not copy a phone number, an address, or an email.`;
  const elections = es
    ? "La nota del INE del 5 de junio de 2024 sitúa la jornada federal el 2 de junio de 2024. Esta página no reproduce el escrutinio ni la fecha de toma de posesión. La página del INE para 2026-2027 fija la siguiente jornada el 6 de junio de 2027, con 300 diputaciones de mayoría relativa. No hay candidaturas aquí."
    : "The INE note of 5 June 2024 places federal polling day on 2 June 2024. This page does not reprint the count or a swearing-in date. The INE page for 2026-2027 sets the next polling day on 6 June 2027, with 300 relative-majority deputies. There are no candidacies here.";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(absoluteUrl(path))}">
<link rel="alternate" hreflang="es" href="${esc(absoluteUrl(es ? path : otherPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(es ? otherPath : path))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(es ? otherPath : path))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(absoluteUrl(path))}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${es ? "es_MX" : "en_US"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(mexicoHome(lang))}">${esc(es ? "México" : "Mexico")}</a> · <a href="/search/">${esc(es ? "Buscar" : "Search")}</a> · <a href="${esc(otherPath)}">${es ? "English" : "Español"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p class="eyebrow">${esc(es ? "Distrito electoral federal uninominal" : "Federal single-member electoral district")}</p>
<h1>${esc(titleName)}</h1>
<p class="lede">${esc(entity.name)}</p>
<p><strong>Last updated: October 18, 2026.</strong> <a href="${esc(reportErrorHref(path))}">Report an error</a></p>
<table>
<tr><th>${esc(es ? "Entidad" : "Entidad")}</th><td><a href="${esc(entityPath(lang, entity.slug))}">${esc(entity.name)}</a></td></tr>
<tr><th>${esc(es ? "Número en el descriptivo" : "Number in the descriptivo")}</th><td>${esc(number)}</td></tr>
<tr><th>${esc(es ? "Cabecera, localidad" : "Cabecera, localidad")}</th><td>${esc(district.cabeceraLocalidad)}</td></tr>
<tr><th>${esc(es ? "Municipio de la cabecera" : "Municipality of the cabecera")}</th><td>${esc(district.cabeceraMunicipio)}</td></tr>
<tr><th>${esc(es ? "Circunscripción plurinominal" : "Plurinominal constituency")}</th><td><a href="${esc(circunscripcionesPath(lang))}#circunscripcion-${circ.number}">${esc(String(circ.number))}</a></td></tr>
<tr><th>${esc(es ? "Diputado o diputada" : "Deputy")}</th><td><a href="${esc(ficha)}">${esc(district.deputy.name)}</a></td></tr>
<tr><th>${esc(es ? "Texto del directorio" : "Directory text")}</th><td>${esc(district.deputy.seatPrinted)}</td></tr>
</table>
<p>${esc(cabeceraSentence)}</p>
<p>${esc(framework)}</p>
${indigena}
<h2>${esc(es ? "Diputación federal" : "Federal seat")}</h2>
<p>${seat}${esc(nameNote)}</p>
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(copy.groupGap)}</p>
<h2>${esc(es ? "Elecciones" : "Elections")}</h2>
<p>${esc(elections)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(entityPath(lang, entity.slug))}">${esc(entity.name)}</a> · <a href="${esc(districtsIndexPath(lang))}">${esc(copy.districts)}</a> · <a href="${esc(circunscripcionesPath(lang))}">${esc(copy.circunscripciones)}</a>.${neighbor ? ` ${esc(es ? "Distritos anterior y siguiente:" : "Previous and next districts:")} ${neighbor}` : ""}</p>
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sources}</ul>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
</body>
</html>
`;
}

for (const lang of ["es", "en"] as const) {
  rmSync(join(publicDir, "mx", lang), { recursive: true, force: true });
}

let written = 0;
for (const district of DISTRICTS) {
  for (const lang of ["es", "en"] as const) {
    const path = districtPath(lang, district.entitySlug, district.number);
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, page(lang, district));
    written += 1;
  }
}

console.log(`mexico district html: ${written}`);
