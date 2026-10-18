import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const places = require(join(root, "data/fr/places.json"));
const level2 = require(join(root, "data/fr/level2.json"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mapthegeneral.com").replace(/\/+$/, "");
const READ = "2026-10-18";
const LO = "https://www.data.gouv.fr/pages/legal/licences/etalab-2.0";
const AN_PAGE = "https://data.assemblee-nationale.fr/acteurs/deputes-en-exercice";
const AN_LICENCE = "https://data.assemblee-nationale.fr/licence-ouverte-open-licence";
const RNE_PAGE = "https://www.data.gouv.fr/datasets/repertoire-national-des-elus-1";
const F1939 = "https://www.service-public.gouv.fr/particuliers/vosdroits/F1939";
const D2021 = "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000043403678";
const D2024 = "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049689654";
const D2025 = "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000052142190";
const COG = "https://www.insee.fr/fr/information/8740222";
const POP = "https://www.insee.fr/fr/statistiques/8681011";
const INTERIOR = "https://www.elections.interieur.gouv.fr/";
const PRESIDENTIAL = {
  fr: "/fr/fr/elections/presidentielle-2027/",
  en: "/fr/en/elections/presidentielle-2027/",
};

const SATURDAY = new Set(["971", "972", "973", "975", "977", "987"]);

const CAUSE_EN = {
  "élections générales": "general election",
  "remplacement d'un député ayant démissionné pour cause d’incompatibilité prévue aux articles LO 137, LO 137-1, LO 141 ou LO 141-1 du code électoral":
    "replacement of a deputy who resigned because of an incompatibility under articles LO 137, LO 137-1, LO 141 or LO 141-1 of the Electoral Code",
  "remplacement d'un député décédé": "replacement of a deputy who died",
  "remplacement d'un député en mission au-delà de 6 mois": "replacement of a deputy on a mission lasting more than six months",
  "remplacement d'un député nommé au Gouvernement": "replacement of a deputy appointed to the Government",
  "reprise de l'exercice du mandat d'un ancien membre du Gouvernement":
    "resumption of the mandate of a former member of the Government",
  "élection partielle, remplacement d'un député démissionnaire":
    "partial election, replacement of a deputy who resigned",
  "élection partielle, remplacement d'un député démissionnaire d'office":
    "partial election, replacement of a deputy who resigned as of right",
  "élection partielle, remplacement d'un député élu au Parlement européen":
    "partial election, replacement of a deputy elected to the European Parliament",
  "élection partielle, suite à l'annulation de l'élection d'un député":
    "partial election, following the annulment of a deputy’s election",
};

const regionsByCode = new Map(places.regions.map((region) => [region.code, region]));
const departments = places.departments;
const deptByCode = new Map(departments.map((department) => [department.code, department]));

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteUrl(path) {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return `${SITE_URL}/${clean}/`;
}

function formatNumber(value, lang) {
  return new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US").format(value);
}

function formatOptional(value, lang) {
  if (value == null) return "—";
  return formatNumber(value, lang);
}

function departmentPath(lang, regionSlug, departmentSlug) {
  return `/fr/${lang}/${regionSlug}/${departmentSlug}/`;
}

function departementsIndexPath(lang) {
  return `/fr/${lang}/departements/`;
}

function circonscriptionsIndexPath(lang) {
  return `/fr/${lang}/circonscriptions/`;
}

function constituencyPath(lang, slug) {
  return `/fr/${lang}/circonscriptions/${slug}/`;
}

function sourcesPath(lang) {
  return `/fr/${lang}/sources/`;
}

function regionPath(lang, slug) {
  return `/fr/${lang}/${slug}/`;
}

function causeEn(cause) {
  const text = CAUSE_EN[cause];
  if (!text) throw new Error(`Untranslated mandate cause: ${cause}`);
  return text;
}

function holderLine(holder) {
  return `${holder.givenName} ${holder.familyName}`;
}

function sourceItems(lang) {
  const read = lang === "fr" ? "lu le" : "read";
  return [
    [`Insee, Code officiel géographique au 1er janvier 2026`, COG, "2026-10-17"],
    [`Insee, populations de référence 2023`, POP, "2026-10-17"],
    [`Service-Public, F1939, vérifié le 1er juillet 2026`, F1939, READ],
    [`Décret n° 2021-483 du 21 avril 2021`, D2021, READ],
    [`Décret n° 2024-527 du 9 juin 2024`, D2024, READ],
    [`Décret n° 2025-848 du 27 août 2025`, D2025, READ],
    [`Assemblée nationale, députés en exercice, catalogue du ${level2.anCatalogDate}`, AN_PAGE, READ],
    [`Ministère de l'Intérieur, Répertoire national des élus, mis à jour le ${level2.rneUpdated}`, RNE_PAGE, READ],
    [`Licence Ouverte 2.0`, LO, READ],
    [`Assemblée nationale, page Licence Ouverte`, AN_LICENCE, READ],
  ]
    .map(
      ([name, url, date]) =>
        `<li><a href="${esc(url)}">${esc(name)}</a> — ${esc(read)} ${esc(date)}</li>`,
    )
    .join("");
}

function attribution(lang) {
  return lang === "fr"
    ? `Réutilisation sous la <a href="${LO}">Licence Ouverte 2.0</a> : Assemblée nationale (catalogue ${esc(level2.anCatalogDate)}) et ministère de l’Intérieur, Répertoire national des élus (mise à jour ${esc(level2.rneUpdated)}). INSEE pour le nom, le code, le chef-lieu et la population. Cette réutilisation n’est pas une caution officielle. <a href="${esc(sourcesPath(lang))}">Lois et licences</a>.`
    : `Reused under the <a href="${LO}">Open Licence 2.0</a>: National Assembly (catalogue ${esc(level2.anCatalogDate)}) and the Ministry of the Interior, National directory of elected officials (updated ${esc(level2.rneUpdated)}). INSEE for the name, the code, the chef-lieu and the population. This reuse is not an official endorsement. <a href="${esc(sourcesPath(lang))}">Laws and licences</a>.`;
}

function presidentialSentence(lang) {
  const href = PRESIDENTIAL[lang];
  return lang === "fr"
    ? `La prochaine élection nationale imprimée par la fiche F1939 est l’<a href="${href}">élection présidentielle des 18 avril et 2 mai 2027</a>.`
    : `The next national election printed by page F1939 is the <a href="${href}">presidential election of 18 April and 2 May 2027</a>.`;
}

function shell({ lang, path, title, description, crumbs, eyebrow, h1, lede, body }) {
  const other = lang === "fr" ? "en" : "fr";
  const otherPath = path.replace(`/fr/${lang}/`, `/fr/${other}/`);
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
  const crumbNav = crumbs
    .map((item, index) =>
      index === crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const banner =
    lang === "fr"
      ? `Information non officielle. Vérifiez auprès du <a href="${INTERIOR}">ministère de l’Intérieur</a>.`
      : `Unofficial information. Confirm with the <a href="${INTERIOR}">Ministry of the Interior</a>.`;
  const updated = lang === "fr" ? `Lu le 18 octobre 2026.` : `Read on 18 October 2026.`;
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} · Map the General</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(absoluteUrl(path))}">
<link rel="alternate" hreflang="fr" href="${esc(absoluteUrl(lang === "fr" ? path : otherPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(lang === "en" ? path : otherPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(lang === "en" ? path : otherPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(title)} · Map the General">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(absoluteUrl(path))}">
<meta property="og:site_name" content="Map the General">
<meta property="og:type" content="website">
<meta property="og:locale" content="${lang === "fr" ? "fr_FR" : "en_US"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${banner}</p>
<header class="wrap tools"><a href="/">Map the General</a> · <a href="/fr/${lang}/">France</a> · <a href="/search/">${lang === "fr" ? "Recherche" : "Search"}</a> · <a href="${esc(otherPath)}">${lang === "fr" ? "English" : "Français"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p class="eyebrow">${esc(eyebrow)}</p>
<h1>${esc(h1)}</h1>
<p class="lede">${lede}</p>
<p><strong>${esc(updated)}</strong> <a href="/contact/?url=${encodeURIComponent(path)}">${lang === "fr" ? "Signaler une erreur" : "Report an error"}</a></p>
${body}
<h2>${lang === "fr" ? "Sources" : "Sources"}</h2>
<ul>${sourceItems(lang)}</ul>
<p>${attribution(lang)}</p>
</main>
<footer class="wrap">© 2026 Joshua Israel Ventures LLC. 5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322.</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function lastElectionText(lang, kind) {
  if (kind === "departmental-2021") {
    return lang === "fr"
      ? "Le décret n° 2021-483 du 21 avril 2021 convoque les collèges électoraux le dimanche 20 juin 2021 pour l’élection des conseillers départementaux. L’article 5 fixe le second tour, là où il doit avoir lieu, au dimanche 27 juin 2021. La fiche F1939, relue le 18 octobre 2026, imprime « Juin 2021 » comme vote précédent et ne répète pas ces jours."
      : "Decree No. 2021-483 of 21 April 2021 summons the electoral colleges on Sunday, 20 June 2021, for the election of departmental councillors. Article 5 sets the second round, where one must be held, on Sunday, 27 June 2021. Page F1939, re-read on 18 October 2026, prints “June 2021” as the previous vote and does not repeat those days.";
  }
  if (kind === "assembly-2021") {
    return lang === "fr"
      ? "Le même décret convoque, le dimanche 20 juin 2021, l’élection des conseillers à l’Assemblée de Corse, à l’assemblée de Guyane et à l’assemblée de Martinique. L’article 5 fixe le second tour au dimanche 27 juin 2021 là où il doit avoir lieu. La notice du décret dit qu’en l’absence de conseils départementaux, les électeurs de Corse, de Guyane et de Martinique prennent part aux seules élections de ces assemblées."
      : "The same decree summons, on Sunday, 20 June 2021, the election of councillors to the Assembly of Corsica, the assembly of Guyane and the assembly of Martinique. Article 5 sets the second round on Sunday, 27 June 2021, where one must be held. The decree’s notice says that, in the absence of departmental councils, voters in Corsica, Guyane and Martinique take part only in the elections of those assemblies.";
  }
  if (kind === "paris-2026") {
    return lang === "fr"
      ? "Le décret n° 2025-848 du 27 août 2025, article 1, convoque les électeurs le dimanche 15 mars 2026 pour le renouvellement du conseil de Paris. L’article 7 fixe le second tour au dimanche 22 mars 2026 dans les communes où il doit avoir lieu. La notice du décret de 2021 disait que les électeurs de la Ville de Paris ne prenaient part, en juin 2021, qu’aux élections régionales."
      : "Decree No. 2025-848 of 27 August 2025, article 1, summons voters on Sunday, 15 March 2026, for the renewal of the Council of Paris. Article 7 sets the second round on Sunday, 22 March 2026, in the communes where one must be held. The 2021 decree’s notice said that voters of the Ville de Paris took part, in June 2021, only in the regional elections.";
  }
  if (kind === "lyon-2026") {
    return lang === "fr"
      ? "Le décret n° 2025-848 du 27 août 2025, article 3, convoque les électeurs des communes de la métropole de Lyon le dimanche 15 mars 2026 pour élire les conseillers métropolitains de Lyon. L’article 7 fixe le second tour au dimanche 22 mars 2026 là où il doit avoir lieu. La notice du décret de 2021 disait que ces électeurs ne prenaient part, en juin 2021, qu’aux élections régionales."
      : "Decree No. 2025-848 of 27 August 2025, article 3, summons voters of the communes of the Lyon metropolis on Sunday, 15 March 2026, to elect the metropolitan councillors of Lyon. Article 7 sets the second round on Sunday, 22 March 2026, where one must be held. The 2021 decree’s notice said that those voters took part, in June 2021, only in the regional elections.";
  }
  throw new Error(`Unknown last election ${kind}`);
}

function nextElectionText(lang, kind) {
  if (kind === "departmental-2028") {
    return lang === "fr"
      ? "La fiche F1939 place les prochaines élections départementales en mars 2028. Elle dit que la date précise est communiquée au moins six semaines à l’avance. Elle n’imprime pas un jour de mars 2028."
      : "Page F1939 places the next departmental elections in March 2028. It says the precise date is announced at least six weeks ahead. It does not print a day in March 2028.";
  }
  if (kind === "regional-2028-gap") {
    return lang === "fr"
      ? "La fiche F1939 place les prochaines élections régionales en mars 2028, sans jour. Elle n’a pas une ligne distincte pour la prochaine élection de l’assemblée de Corse, de Guyane ou de Martinique. Cette page n’invente pas cette date."
      : "Page F1939 places the next regional elections in March 2028, with no day. It has no separate line for the next election of the assembly of Corsica, Guyane or Martinique. This page does not invent that date.";
  }
  if (kind === "municipal-2032-gap") {
    return lang === "fr"
      ? "La fiche F1939 place les prochaines élections municipales en 2032 et le vote précédent en mars 2026. Elle n’imprime pas une échéance distincte pour le prochain conseil de Paris ou les prochains conseillers métropolitains de Lyon. Cette page n’en ajoute pas."
      : "Page F1939 places the next municipal elections in 2032 and the previous vote in March 2026. It does not print a separate date for the next Council of Paris or the next metropolitan councillors of Lyon. This page does not add one.";
  }
  throw new Error(`Unknown next election ${kind}`);
}

function officeBody(lang, office) {
  const bits = [`<h2>${esc(office.bodyName)}</h2>`, `<p>${lang === "fr" ? "Code dans le COG" : "Code in the COG"} : ${esc(office.bodyCode)}.</p>`];
  if (office.holders.length === 0) {
    bits.push(
      `<p class="gap"><strong>${lang === "fr" ? "Lacune" : "Gap"}.</strong> ${
        lang === "fr"
          ? "Le fichier des conseillers départementaux du Répertoire national des élus, mis à jour le 11 août 2026, a des lignes pour ce département, y compris des vice-présidents, et aucune ligne dont la fonction est « Président du conseil départemental ». Cette page ne nomme pas de président."
          : "The departmental-councillors file of the National directory of elected officials, updated on 11 August 2026, has rows for this department, including vice-presidents, and no row whose function is “Président du conseil départemental”. This page does not name a president."
      }</p>`,
    );
    return bits.join("");
  }
  const rows = office.holders
    .map((holder) => {
      const fn =
        holder.source === "rne-mai"
          ? lang === "fr"
            ? "Le fichier des maires n’a pas de colonne de fonction. Le jeu de données appelle ce fichier celui des maires. Une ligne pour la commune 75056."
            : "The mayors file has no function column. The dataset calls this file the mayors file. One row for commune 75056."
          : esc(holder.function);
      const section = holder.sectionLabel
        ? ` ${lang === "fr" ? "Section imprimée" : "Printed section"} : ${esc(holder.sectionLabel)}.`
        : "";
      const label = ` ${lang === "fr" ? "Libellé RNE" : "RNE label"} : ${esc(holder.rneLabel)} (${esc(holder.rneCode)}).`;
      return `<li>${esc(holderLine(holder))}. ${fn}.${section}${label} ${lang === "fr" ? "Début du mandat" : "Mandate start"} ${esc(holder.mandateStart)}. ${lang === "fr" ? "Début de la fonction" : "Function start"} ${esc(holder.functionStart)}.</li>`;
    })
    .join("");
  bits.push(`<ul>${rows}</ul>`);
  if (office.kind === "alsace") {
    bits.push(
      `<p>${
        lang === "fr"
          ? "Le COG imprime « Collectivité européenne d'Alsace ». Le fichier RNE imprime « Collectivité Européenne d'Alsace » et le code 6AE, partagé par le Bas-Rhin et le Haut-Rhin."
          : "The COG prints “Collectivité européenne d'Alsace”. The RNE file prints “Collectivité Européenne d'Alsace” and the code 6AE, shared by Bas-Rhin and Haut-Rhin."
      }</p>`,
    );
  }
  if (office.kind === "corse") {
    bits.push(
      `<p>${
        lang === "fr"
          ? "Le fichier des assemblées à statut particulier imprime le code 94 et le libellé « Corse ». Le COG imprime le code 20R et « Collectivité de Corse » pour la Corse-du-Sud et la Haute-Corse. Les deux codes sont recopiés tels quels."
          : "The special-status assemblies file prints code 94 and the label “Corse”. The COG prints code 20R and “Collectivité de Corse” for Corse-du-Sud and Haute-Corse. Both codes are copied as written."
      }</p>`,
    );
  }
  if (office.kind === "lyon") {
    bits.push(
      `<p>${
        lang === "fr"
          ? "Le COG imprime « Métropole de Lyon ». Le fichier RNE imprime « Métropole De Lyon » et le code 69M."
          : "The COG prints “Métropole de Lyon”. The RNE file prints “Métropole De Lyon” and the code 69M."
      }</p>`,
    );
  }
  if (office.kind === "paris") {
    bits.push(
      `<p class="gap"><strong>${lang === "fr" ? "Lacune" : "Gap"}.</strong> ${
        lang === "fr"
          ? "Le fichier des conseillers départementaux n’a pas de code 75. Cette page ne dit pas que la personne du fichier des maires préside le conseil de Paris : cette phrase n’est pas dans le fichier lu."
          : "The departmental-councillors file has no code 75. This page does not say that the person in the mayors file presides over the Council of Paris: that sentence is not in the file that was read."
      }</p>`,
    );
  }
  if (office.kind === "ctu" && office.bodyCode === "973R") {
    bits.push(
      `<p class="gap"><strong>${lang === "fr" ? "Lacune" : "Gap"}.</strong> ${
        lang === "fr"
          ? "Le fichier n’a pas, pour la Guyane, de ligne « Président de l'organe exécutif ». Seule la fonction imprimée est recopiée."
          : "The file has no “Président de l'organe exécutif” row for Guyane. Only the printed function is copied."
      }</p>`,
    );
  }
  return bits.join("");
}

function constituencyLinks(lang, list) {
  if (!list.length) {
    return `<p class="gap"><strong>${lang === "fr" ? "Lacune" : "Gap"}.</strong> ${
      lang === "fr"
        ? "Le fichier des circonscriptions de la 17e législature, sans date de fin, n’en place aucune dans ce département."
        : "The 17th-legislature constituency file, with no end date, places none in this department."
    }</p>`;
  }
  const items = list
    .map(
      (item) =>
        `<li><a href="${esc(constituencyPath(lang, item.slug))}">${esc(item.libelle)}</a></li>`,
    )
    .join("");
  return `<ul>${items}</ul>`;
}

function departmentPage(lang, department) {
  const region = regionsByCode.get(department.regionCode);
  const path = departmentPath(lang, region.slug, department.slug);
  const offices = level2.departments[department.code] || [];
  const circos = level2.constituencies.filter((item) => item.depCode === department.code);
  const fr = lang === "fr";
  const body = `
<p>${presidentialSentence(lang)}</p>
<table>
<tr><th>${fr ? "Code département" : "Department code"}</th><td>${esc(department.code)}</td></tr>
<tr><th>${fr ? "Chef-lieu" : "Chef-lieu"}</th><td>${esc(department.chefLieu)} (${esc(department.chefLieuCode)})</td></tr>
<tr><th>${fr ? "Communes" : "Communes"}</th><td>${esc(formatOptional(department.communes, lang))}</td></tr>
<tr><th>${fr ? "Population municipale" : "Municipal population"}</th><td>${esc(formatOptional(department.populationMunicipale, lang))}</td></tr>
<tr><th>${fr ? "Population totale" : "Total population"}</th><td>${esc(formatOptional(department.populationTotale, lang))}</td></tr>
</table>
<p>${
  department.populationMunicipale == null
    ? fr
      ? "Mayotte n’est pas dans le fichier d’ensemble « France hors Mayotte ». Aucun chiffre de population n’est imprimé."
      : "Mayotte is not in the ensemble file “France excluding Mayotte”. No population figure is printed."
    : fr
      ? "Population : fichier d’ensemble, référence au 1er janvier 2023, en vigueur au 1er janvier 2026."
      : "Population: ensemble file, reference date 1 January 2023, in force on 1 January 2026."
}</p>
${offices.map((office) => officeBody(lang, office)).join("")}
<h2>${fr ? "Dernière élection de cette assemblée" : "Last election of this assembly"}</h2>
${offices.map((office) => `<p>${lastElectionText(lang, office.lastElection)}</p>`).join("")}
<h2>${fr ? "Prochaine élection" : "Next election"}</h2>
${offices.map((office) => `<p>${nextElectionText(lang, office.nextElection)}</p>`).join("")}
<p>${fr ? "Cette page n’imprime ni sondage, ni projection, ni résultat." : "This page prints no poll, no projection and no result."}</p>
<h2>${fr ? "Circonscriptions législatives" : "Legislative constituencies"}</h2>
${constituencyLinks(lang, circos)}
<p class="tools">${fr ? "Région" : "Region"} : <a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a> · <a href="${esc(departementsIndexPath(lang))}">${fr ? "Index des départements" : "Department index"}</a></p>`;
  return shell({
    lang,
    path,
    title: department.officialName,
    description: fr
      ? `${department.officialName} (${department.code}), département du COG au 1er janvier 2026. Information non officielle.`
      : `${department.officialName} (${department.code}), a COG department at 1 January 2026. Unofficial information.`,
    crumbs: [
      { name: fr ? "Accueil" : "Home", path: "/" },
      { name: "France", path: "/fr/" },
      { name: "France", path: `/fr/${lang}/` },
      { name: region.officialName, path: regionPath(lang, region.slug) },
      { name: department.officialName, path },
    ],
    eyebrow: fr ? `Département · code ${department.code}` : `Department · code ${department.code}`,
    h1: department.officialName,
    lede: fr ? `Chef-lieu dans le COG : ${esc(department.chefLieu)}.` : `Chef-lieu in the COG: ${esc(department.chefLieu)}.`,
    body,
  });
}

function legislativeText(lang, constituency) {
  const fr = lang === "fr";
  const saturday = SATURDAY.has(constituency.depCode);
  const base = fr
    ? "Le décret n° 2024-527 du 9 juin 2024, article 1, convoque les électeurs le dimanche 30 juin 2024. L’article 6 fixe le second tour, s’il a lieu, au dimanche 7 juillet 2024."
    : "Decree No. 2024-527 of 9 June 2024, article 1, summons voters on Sunday, 30 June 2024. Article 6 sets the second round, if one is held, on Sunday, 7 July 2024.";
  const sat = saturday
    ? fr
      ? " Le même décret fixe le samedi 29 juin 2024 et le samedi 6 juillet 2024 à Saint-Pierre-et-Miquelon, à Saint-Barthélemy, à Saint-Martin, en Guadeloupe, en Martinique, en Guyane et en Polynésie française."
      : " The same decree sets Saturday, 29 June 2024 and Saturday, 6 July 2024 in Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin, Guadeloupe, Martinique, Guyane and French Polynesia."
    : "";
  const abroad =
    constituency.depCode === "099"
      ? fr
        ? " Pour les Français établis hors de France, la dérogation du samedi vise les bureaux de vote ouverts par les ambassades et postes consulaires situés sur le continent américain. L’article 10 ouvre le vote électronique le mardi précédant le scrutin à 12 heures et le clôt le jeudi précédant le scrutin à 12 heures. Cette page n’attribue pas un de ces jours à cette circonscription."
        : " For French citizens living abroad, the Saturday derogation covers polling stations opened by embassies and consular posts on the American continent. Article 10 opens electronic voting on the Tuesday before the poll at 12:00 and closes it on the Thursday before the poll at 12:00. This page does not assign one of those days to this constituency."
      : "";
  const next = fr
    ? "La fiche F1939 place les prochaines élections législatives en 2029, sans jour, sauf dissolution. Elle dit qu’elles ont lieu dans les 70 jours avant la fin du mandat de l’Assemblée précédemment élue, et le septième dimanche qui suit la publication du décret de convocation."
    : "Page F1939 places the next legislative elections in 2029, with no day, unless the Assembly is dissolved. It says they are held within 70 days before the end of the term of the previously elected Assembly, and on the seventh Sunday after publication of the summoning decree.";
  return `<p>${base}${sat}${abroad}</p><p>${next}</p><p>${fr ? "La fiche F1939 imprime « Juin et juillet 2024 » comme vote précédent. Cette page n’imprime ni sondage, ni projection, ni résultat." : "Page F1939 prints “June and July 2024” as the previous vote. This page prints no poll, no projection and no result."}</p>`;
}

function constituencyPage(lang, constituency) {
  const fr = lang === "fr";
  const path = constituencyPath(lang, constituency.slug);
  const department = deptByCode.get(constituency.depCode);
  const region = department ? regionsByCode.get(department.regionCode) : null;
  const parentCrumbs = department
    ? [
        { name: region.officialName, path: regionPath(lang, region.slug) },
        { name: department.officialName, path: departmentPath(lang, region.slug, department.slug) },
      ]
    : [{ name: fr ? "Circonscriptions" : "Constituencies", path: circonscriptionsIndexPath(lang) }];
  const deputy = constituency.deputy;
  let member;
  if (!deputy) {
    member = `<p class="gap"><strong>${fr ? "Lacune" : "Gap"}.</strong> ${
      fr
        ? `Le fichier des députés au mandat actif, catalogue du ${esc(level2.anCatalogDate)}, ne contient pas de député dont le mandat parlementaire ouvert pointe vers cette circonscription (${esc(constituency.uid)}).`
        : `The file of deputies with an active mandate, catalogue date ${esc(level2.anCatalogDate)}, has no deputy whose open parliamentary mandate points to this constituency (${esc(constituency.uid)}).`
    }</p>`;
  } else {
    const who = `${deputy.civ ? `${deputy.civ} ` : ""}${deputy.givenName} ${deputy.familyName}`.trim();
    const gloss = fr ? "" : ` (${esc(causeEn(deputy.cause))})`;
    member = `<p>${esc(who)}. ${fr ? "Début du mandat dans le fichier" : "Mandate start in the file"} : ${esc(deputy.mandateStart)}. ${fr ? "Cause imprimée" : "Printed cause"} : ${esc(deputy.cause)}${gloss}.</p>`;
    if (deputy.cause !== "élections générales") {
      member += `<p>${
        fr
          ? "La date de début est celle du fichier. Cette page ne décrit pas le scrutin qui a suivi la cause imprimée et n’en donne aucun chiffre."
          : "The start date is the one in the file. This page does not describe the poll that followed the printed cause and gives no figures for it."
      }</p>`;
    }
  }
  const up = department
    ? `<p class="tools">${fr ? "Département" : "Department"} : <a href="${esc(departmentPath(lang, region.slug, department.slug))}">${esc(department.officialName)}</a> · <a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a></p>`
    : `<p class="tools">${fr ? "Pas de département du COG pour le code" : "No COG department for code"} ${esc(constituency.depCode)}. <a href="${esc(circonscriptionsIndexPath(lang))}">${fr ? "Index" : "Index"}</a></p>`;
  const body = `
<p>${presidentialSentence(lang)}</p>
<table>
<tr><th>${fr ? "Libellé" : "Label"}</th><td>${esc(constituency.libelle)}</td></tr>
<tr><th>${fr ? "Numéro" : "Number"}</th><td>${esc(constituency.numero)}</td></tr>
<tr><th>${fr ? "Département dans le fichier" : "Department in the file"}</th><td>${esc(constituency.depName)} (${esc(constituency.depCode)})</td></tr>
<tr><th>${fr ? "Région dans le fichier" : "Region in the file"}</th><td>${esc(constituency.regionName)} (${esc(constituency.regionType)})</td></tr>
<tr><th>${fr ? "Identifiant d’organe" : "Organ identifier"}</th><td>${esc(constituency.uid)}</td></tr>
<tr><th>${fr ? "Ouverture de l’organe" : "Organ start"}</th><td>${esc(constituency.organStart)}</td></tr>
</table>
<h2>${fr ? "Député au mandat actif" : "Deputy with an active mandate"}</h2>
${member}
<h2>${fr ? "Élection législative" : "Legislative election"}</h2>
${legislativeText(lang, constituency)}
${up}`;
  return shell({
    lang,
    path,
    title: constituency.libelle,
    description: fr
      ? `${constituency.libelle}. Député au mandat actif dans l’open data de l’Assemblée nationale. Information non officielle.`
      : `${constituency.libelle}. Deputy with an active mandate in National Assembly open data. Unofficial information.`,
    crumbs: [
      { name: fr ? "Accueil" : "Home", path: "/" },
      { name: "France", path: "/fr/" },
      { name: "France", path: `/fr/${lang}/` },
      ...parentCrumbs,
      { name: constituency.libelle, path },
    ],
    eyebrow: fr ? "Circonscription législative" : "Legislative constituency",
    h1: constituency.libelle,
    lede: esc(constituency.depName),
    body,
  });
}

function departementsIndex(lang) {
  const fr = lang === "fr";
  const path = departementsIndexPath(lang);
  const groups = [...regionsByCode.values()]
    .sort((a, b) => a.officialName.localeCompare(b.officialName, "fr"))
    .map((region) => {
      const items = departments
        .filter((department) => department.regionCode === region.code)
        .sort((a, b) => a.officialName.localeCompare(b.officialName, "fr"))
        .map(
          (department) =>
            `<li><a href="${esc(departmentPath(lang, region.slug, department.slug))}">${esc(department.officialName)}</a> (${esc(department.code)})</li>`,
        )
        .join("");
      return `<h2><a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a></h2><ul>${items}</ul>`;
    })
    .join("");
  return shell({
    lang,
    path,
    title: fr ? "Départements" : "Departments",
    description: fr
      ? "Les 101 départements du Code officiel géographique au 1er janvier 2026. Information non officielle."
      : "The 101 departments of the official geographic code at 1 January 2026. Unofficial information.",
    crumbs: [
      { name: fr ? "Accueil" : "Home", path: "/" },
      { name: "France", path: "/fr/" },
      { name: "France", path: `/fr/${lang}/` },
      { name: fr ? "Départements" : "Departments", path },
    ],
    eyebrow: fr ? "Niveau 2" : "Level 2",
    h1: fr ? "Départements" : "Departments",
    lede: presidentialSentence(lang),
    body: `<p>${fr ? "Chaque nom ouvre la page du département. Les communes ne sont pas publiées." : "Each name opens the department page. Communes are not published."}</p>${groups}<p class="tools"><a href="${esc(circonscriptionsIndexPath(lang))}">${fr ? "Circonscriptions législatives" : "Legislative constituencies"}</a></p>`,
  });
}

function circonscriptionsIndex(lang) {
  const fr = lang === "fr";
  const path = circonscriptionsIndexPath(lang);
  const groups = new Map();
  for (const constituency of level2.constituencies) {
    const key = `${constituency.depCode} ${constituency.depName}`;
    const list = groups.get(key) ?? [];
    list.push(constituency);
    groups.set(key, list);
  }
  const keys = [...groups.keys()].sort((a, b) => a.localeCompare(b, "fr"));
  const body = keys
    .map((key) => {
      const items = groups
        .get(key)
        .map(
          (item) =>
            `<li><a href="${esc(constituencyPath(lang, item.slug))}">${esc(item.libelle)}</a></li>`,
        )
        .join("");
      return `<h2>${esc(key)}</h2><ul>${items}</ul>`;
    })
    .join("");
  return shell({
    lang,
    path,
    title: fr ? "Circonscriptions législatives" : "Legislative constituencies",
    description: fr
      ? "Les 577 circonscriptions de la 17e législature dans l’open data de l’Assemblée nationale. Information non officielle."
      : "The 577 constituencies of the 17th legislature in National Assembly open data. Unofficial information.",
    crumbs: [
      { name: fr ? "Accueil" : "Home", path: "/" },
      { name: "France", path: "/fr/" },
      { name: "France", path: `/fr/${lang}/` },
      { name: fr ? "Circonscriptions" : "Constituencies", path },
    ],
    eyebrow: fr ? "Niveau 2" : "Level 2",
    h1: fr ? "Circonscriptions législatives" : "Legislative constituencies",
    lede: presidentialSentence(lang),
    body: `<p>${fr ? `${level2.constituencies.length} organes sans date de fin. Trois n’ont pas de député au mandat actif dans le fichier lu.` : `${level2.constituencies.length} organs with no end date. Three have no deputy with an active mandate in the file that was read.`}</p>${body}`,
  });
}

const publicDir = join(root, "public");
rmSync(join(publicDir, "fr"), { recursive: true, force: true });

let written = 0;
function writePage(path, html) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  written += 1;
}

for (const lang of ["fr", "en"]) {
  writePage(departementsIndexPath(lang), departementsIndex(lang));
  writePage(circonscriptionsIndexPath(lang), circonscriptionsIndex(lang));
  for (const department of departments) {
    const region = regionsByCode.get(department.regionCode);
    writePage(departmentPath(lang, region.slug, department.slug), departmentPage(lang, department));
  }
  for (const constituency of level2.constituencies) {
    writePage(constituencyPath(lang, constituency.slug), constituencyPage(lang, constituency));
  }
}

const sample = join(publicDir, "fr/en/auvergne-rhone-alpes/ain/index.html");
console.log(`france level 2 html: ${written}`);
