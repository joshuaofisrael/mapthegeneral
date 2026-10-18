import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import {
  CONSTITUENCIES,
  DISTRICTS,
  UNASSIGNED_BY_PROVINCE,
  constituencyNeighbors,
  constituencyPath,
  constituenciesInProvince,
  districtIndexPath,
  districtNeighbors,
  districtPath,
  constituencyIndexPath,
  type Constituency,
  type District,
  type Member,
} from "../src/data/tr/level2";
import { sourcesById } from "../src/data/tr/sources";
import type { TrLang } from "../src/data/tr/types";
import { provincePath, turkeyHome } from "../src/data/tr/metadata";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.ysk.gov.tr/";
const READ = "2026-10-18";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crumbsJson(items: { name: string; path: string }[]): string {
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

function crumbNav(items: { name: string; path: string }[]): string {
  return items
    .map((item, index) =>
      index === items.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
}

function sourceList(ids: string[], tr: boolean): string {
  const read = tr ? "Okuma" : "read";
  return sourcesById(ids)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${read} ${esc(source.readOn)}</li>`,
    )
    .join("");
}

function shell(input: {
  lang: TrLang;
  path: string;
  otherPath: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  h1: string;
  lede: string;
  body: string;
  sourceIds: string[];
}): string {
  const tr = input.lang === "tr";
  const enPath = tr ? input.otherPath : input.path;
  const trPath = tr ? input.path : input.otherPath;
  const canonical = absoluteUrl(input.path);
  const home = turkeyHome(input.lang);
  return `<!DOCTYPE html>
<html lang="${input.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(input.title)} · ${esc(SITE.name)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="tr" href="${esc(absoluteUrl(trPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(input.title)} · ${esc(SITE.name)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${tr ? "tr_TR" : "en_US"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${crumbsJson(input.crumbs)}</script>
</head>
<body>
<p class="banner">${tr ? `Resmî olmayan bilgi. <a href="${OFFICE}">Resmî seçim kurulunuzdan</a> teyit edin.` : esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(home)}">${tr ? "Türkiye" : "Turkey"}</a> · <a href="/search/">${tr ? "Ara" : "Search"}</a> · <a href="${esc(input.otherPath)}">${tr ? "English" : "Türkçe"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav(input.crumbs)}</nav>
<p class="eyebrow">${esc(input.eyebrow)}</p>
<h1>${esc(input.h1)}</h1>
<p class="lede">${esc(input.lede)}</p>
<p><strong>${tr ? "Son güncelleme: 18 Ekim 2026." : "Last updated: 18 October 2026."}</strong> <a href="${esc(reportErrorHref(input.path))}">${tr ? "Hata bildirin" : "Report an error"}</a></p>
${input.body}
<h2>${tr ? "Kaynaklar" : "Sources"}</h2>
<ul>${sourceList(input.sourceIds, tr)}</ul>
<p class="gap">${tr ? "KVKK: sayfa, kamu görevi için resmî listede basılmış adı ve parti etiketini tekrarlar. Fotoğraf, telefon, adres veya özgeçmiş eklemez." : "KVKK: this page repeats only the name and party label already printed for the public office. It adds no photograph, telephone number, address, or biography."}</p>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}.</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function memberItems(members: Member[]): string {
  return members
    .map(
      (member) =>
        `<li><a href="${esc(member.href)}">${esc(member.name)}</a> — ${esc(member.party)}${member.nameNote ? " *" : ""}</li>`,
    )
    .join("");
}

function districtPage(lang: TrLang, district: District): string {
  const tr = lang === "tr";
  const other: TrLang = tr ? "en" : "tr";
  const path = districtPath(lang, district.provinceSlug, district.slug);
  const parent = provincePath(lang, district.provinceSlug);
  const cevres = constituenciesInProvince(district.provinceSlug);
  const neighbors = districtNeighbors(district);
  const near = [neighbors.prev, neighbors.next]
    .filter((row): row is District => Boolean(row))
    .map((row) => `<a href="${esc(districtPath(lang, row.provinceSlug, row.slug))}">${esc(row.name)}</a>`)
    .join(" · ");
  const mayor = district.mayor
    ? tr
      ? `31 Mart 2024 ilçe belediye başkanı seçiminde YSK açık veri dosyası seçilen olarak ${district.mayor.name} adını basar. Parti adı dosyada ${district.mayor.party} olarak yazılıdır. Bu, seçim günündeki listedir; sonraki bir görev değişikliği bu sayfada yoktur.`
      : `The YSK open-data file of people elected in the 31 March 2024 ilçe belediye başkanı contests prints ${district.mayor.name}. The party name in that file is ${district.mayor.party}. That is the election-day list; a later change of office is not on this page.`
    : tr
      ? "Bu ilçe, 31 Mart 2024 seçilenler dosyasında yoktur. Liste 3, Aksaray-Güzelyurt, Kayseri-Pınarbaşı ve Şanlıurfa-Hilvan belediye başkanlığı seçimlerinin iptal edildiğini ve toplama girmediğini yazar. Seçilen kişinin adı bu sayfada yoktur."
      : "This district is not in the 31 March 2024 elected-candidate file. Liste 3 says the Aksaray-Güzelyurt, Kayseri-Pınarbaşı, and Şanlıurfa-Hilvan mayoral contests were cancelled and left out of that total. The elected person’s name is not on this page.";
  const cevre =
    cevres.length === 1
      ? tr
        ? `YSK’nın 14 Mayıs 2023 seçim çevresi listesinde bu ilin tek çevresi ${cevres[0].name} olarak yazılıdır.`
        : `The YSK list of 14 May 2023 constituencies prints one çevre for this province: ${cevres[0].name}.`
      : tr
        ? "Bu ilin birden fazla numaralı seçim çevresi vardır. Açık veri listesi, her numaralı çevrenin hangi ilçelerden oluştuğunu basmaz."
        : "This province has more than one numbered constituency. The open-data list does not print which districts sit inside each numbered çevre.";
  const cevreLink =
    cevres.length === 1
      ? ` <a href="${esc(constituencyPath(lang, cevres[0].slug))}">${esc(cevres[0].name)}</a>`
      : ` <a href="${esc(constituencyIndexPath(lang))}">${tr ? "Seçim çevreleri" : "Constituencies"}</a>`;
  const body = `<p>${esc(mayor)}</p>
<h2>${tr ? "Seçimler" : "Elections"}</h2>
<p>${tr ? "Son mahalli idareler genel seçimi 31 Mart 2024 Pazar günüdür. 2023/1565 sayılı karar bu günü yazar. 2972 sayılı Kanunun 8. maddesi, olağan seçimi beş yılda bir, Mart ayının son Pazar gününe koyar. Bu sayfa bir sonraki olağan günü hesaplamaz." : "The last local general election was Sunday, 31 March 2024. Decision 2023/1565 states that day. Article 8 of Law 2972 puts the ordinary election every five years, on the last Sunday of March. This page does not calculate the next ordinary day."}</p>
<p>${esc(tr ? "Birlikte yapılan önceki milletvekili seçimi 14 Mayıs 2023 Pazar günüdür." : "The previous joint parliamentary election was Sunday, 14 May 2023.")} ${esc(cevre)}${cevreLink}</p>
<p>${tr ? "Bir sonraki olağan Cumhurbaşkanı ve milletvekili seçimi 2028’dedir. Oy günü bu sayfada hesaplanmaz." : "The next ordinary presidential and parliamentary elections fall in 2028. This page does not calculate the polling day."} <a href="${esc(`${turkeyHome(lang)}elections/2028/`)}">2028</a></p>
<p class="gap"><strong>${tr ? "Eksik." : "Gap."}</strong> ${tr ? "Kaymakamın adı kopyalanmadı. Belde, köy ve mahalle sayfaları bu sürümde yoktur." : "The kaymakam’s name is not copied. Town, village, and neighbourhood pages are not in this release."}</p>
<p class="tools">${tr ? "Üst" : "Parent"}: <a href="${esc(parent)}">${esc(district.provinceName)}</a> · <a href="${esc(districtIndexPath(lang))}">${tr ? "İlçeler" : "Districts"}</a>${near ? ` · ${near}` : ""}</p>`;
  return shell({
    lang,
    path,
    otherPath: districtPath(other, district.provinceSlug, district.slug),
    title: district.name,
    description: tr
      ? `${district.name}, ${district.provinceName} ilçesi. 31 Mart 2024 ilçe belediye başkanı, YSK kaydı varsa. Resmî olmayan bilgi.`
      : `${district.name}, a district of ${district.provinceName}. The 31 March 2024 ilçe belediye başkanı where YSK records one. Unofficial information.`,
    crumbs: [
      { name: tr ? "Başlangıç" : "Home", path: "/" },
      { name: tr ? "Türkiye" : "Turkey", path: "/tr/" },
      { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
      { name: district.provinceName, path: parent },
      { name: district.name, path },
    ],
    eyebrow: tr ? "İlçe" : "District",
    h1: district.name,
    lede: district.provinceName,
    body,
    sourceIds: [
      "ysk-acik-2024-baskan",
      "ysk-2024-ilce-aday",
      "ysk-2024-2367",
      "ysk-2024-liste3",
      "ysk-2023-1565",
      "kanun-2972",
      "ysk-acik-2023-cevre",
    ],
  });
}

function constituencyPage(lang: TrLang, row: Constituency): string {
  const tr = lang === "tr";
  const other: TrLang = tr ? "en" : "tr";
  const path = constituencyPath(lang, row.slug);
  const parent = provincePath(lang, row.provinceSlug);
  const neighbors = constituencyNeighbors(row.slug);
  const near = [neighbors.prev, neighbors.next]
    .filter((item): item is Constituency => Boolean(item))
    .map((item) => `<a href="${esc(constituencyPath(lang, item.slug))}">${esc(item.name)}</a>`)
    .join(" · ");
  const unassigned = UNASSIGNED_BY_PROVINCE[row.provinceSlug] ?? [];
  const multi = constituenciesInProvince(row.provinceSlug).length > 1;
  const starred = row.members.some((member) => member.nameNote);
  const gapBits: string[] = [];
  if (unassigned.length && multi) {
    const names = unassigned.map((member) => member.name).join(", ");
    gapBits.push(
      tr
        ? `TBMM listesi ${row.provinceName} altında şu adları da basar ve üye sayfasında numaralı çevre yazmaz: ${names}. Bu adlar bu çevreye yazılmadı.`
        : `The TBMM list also prints these names under ${row.provinceName} and does not print a numbered çevre on the member page: ${names}. Those names are not assigned to this çevre.`,
    );
  }
  if (row.members.length !== row.seats2023) {
    gapBits.push(
      tr
        ? `14 Mayıs 2023 dosyası bu çevre için ${row.seats2023} sandalye sayar. Bu sayfadaki TBMM eşleşmesi ${row.members.length} addır. Boş sandalyenin nedeni burada yoktur.`
        : `The 14 May 2023 file counts ${row.seats2023} seats for this çevre. The TBMM match on this page has ${row.members.length} names. The reason for an empty seat is not here.`,
    );
  }
  gapBits.push(
    tr
      ? "Numaralı çevreyi oluşturan ilçelerin listesi açık veri dosyasında yoktur."
      : "The list of districts inside a numbered çevre is not in the open-data file.",
  );
  const body = `<table>
<tr><th>${tr ? "2023 sandalye" : "Seats in 2023"}</th><td>${row.seats2023}</td></tr>
<tr><th>${tr ? "TBMM listesi" : "TBMM list"}</th><td>${row.members.length}</td></tr>
</table>
<p>${tr ? "Sandalye sayısı, 14 Mayıs 2023 seçiminde bu çevre adıyla seçilen kişilerin sayısıdır. Güncel ad ve parti etiketi, 18 Ekim 2026’da okunan TBMM listesindendir. Parti, seçim günündeki partiden farklı olabilir." : "The seat count is the number of people elected under this çevre name on 14 May 2023. The current name and party label are from the TBMM list read on 18 October 2026. The party may differ from election day."}</p>
<h2>${tr ? "Milletvekilleri" : "Members"}</h2>
<ul>${memberItems(row.members)}</ul>
${starred ? `<p class="gap">* ${tr ? "Bu ad, 14 Mayıs 2023 seçilenler dosyasında aynen yoktur. TBMM adı ili tek çevresi olan bu ile yazdığı için burada durur." : "This exact name is not in the 14 May 2023 elected file. It is listed here because TBMM prints the name under this province, and the province has one çevre."}</p>` : ""}
<h2>${tr ? "Seçimler" : "Elections"}</h2>
<p>${tr ? "Son milletvekili seçimi 14 Mayıs 2023 Pazar günüdür. Bir sonraki olağan seçim 2028’dedir. Oy günü hesaplanmaz." : "The last parliamentary election was Sunday, 14 May 2023. The next ordinary election falls in 2028. The polling day is not calculated."} <a href="${esc(`${turkeyHome(lang)}elections/2028/`)}">2028</a></p>
<p class="gap"><strong>${tr ? "Eksik." : "Gap."}</strong> ${esc(gapBits.join(" "))}</p>
<p class="tools">${tr ? "Üst" : "Parent"}: <a href="${esc(parent)}">${esc(row.provinceName)}</a> · <a href="${esc(constituencyIndexPath(lang))}">${tr ? "Seçim çevreleri" : "Constituencies"}</a>${near ? ` · ${near}` : ""}</p>`;
  return shell({
    lang,
    path,
    otherPath: constituencyPath(other, row.slug),
    title: row.name,
    description: tr
      ? `${row.name}: 2023’te ${row.seats2023} sandalye. TBMM listesindeki milletvekilleri. Resmî olmayan bilgi.`
      : `${row.name}: ${row.seats2023} seats in 2023. Members on the TBMM list. Unofficial information.`,
    crumbs: [
      { name: tr ? "Başlangıç" : "Home", path: "/" },
      { name: tr ? "Türkiye" : "Turkey", path: "/tr/" },
      { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
      { name: row.provinceName, path: parent },
      { name: row.name, path },
    ],
    eyebrow: tr ? "Seçim çevresi" : "Constituency",
    h1: row.name,
    lede: row.provinceName,
    body,
    sourceIds: ["ysk-acik-2023-mv", "ysk-acik-2023-cevre", "tbmm-liste", "kanun-2839", "kanun-6271"],
  });
}

for (const lang of ["tr", "en"] as const) {
  rmSync(join(publicDir, "tr", lang), { recursive: true, force: true });
}

let written = 0;
for (const lang of ["tr", "en"] as const) {
  for (const district of DISTRICTS) {
    const path = districtPath(lang, district.provinceSlug, district.slug);
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, districtPage(lang, district));
    written += 1;
  }
  for (const row of CONSTITUENCIES) {
    const path = constituencyPath(lang, row.slug);
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, constituencyPage(lang, row));
    written += 1;
  }
}

console.log(`turkey level-2 html: ${written}`);
