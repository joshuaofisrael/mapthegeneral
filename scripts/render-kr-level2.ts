import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import {
  CONSTITUENCIES,
  constituencyNeighbors,
  districtListUrl,
  LOCAL_UNITS,
  INCHEON_LAW_URL,
  INCHEON_REFORM_URL,
  localNeighbors,
  type Constituency,
  type LocalUnit,
} from "../src/data/kr/level2";
import { regionBySlug } from "../src/data/kr/places";
import {
  constituencyIndexPath,
  constituencyPath,
  formatKrDate,
  krHome,
  krRoot,
  localIndexPath,
  localPath,
  regionPath,
} from "../src/data/kr/paths";
import { sourcesById } from "../src/data/kr/sources";
import type { KrLang } from "../src/data/kr/types";
import { ui } from "../src/data/kr/ui";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.nec.go.kr/";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function kindLabel(kind: LocalUnit["kind"], lang: KrLang): string {
  if (lang === "ko") return kind === "si" ? "시" : kind === "gun" ? "군" : "구";
  return kind === "si" ? "Si" : kind === "gun" ? "Gun" : "Gu";
}

function crumbsHtml(
  lang: KrLang,
  crumbs: { name: string; path: string }[],
): { nav: string; jsonLd: string } {
  const nav = crumbs
    .map((item, index) =>
      index === crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
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
  return { nav, jsonLd };
}

function sourceItems(lang: KrLang, ids: string[]): string {
  const copy = ui(lang);
  return sourcesById(ids)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — ${esc(copy.readOn)} ${esc(source.readOn)}</li>`,
    )
    .join("");
}

function shell(input: {
  lang: KrLang;
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
  const { lang } = input;
  const ko = lang === "ko";
  const copy = ui(lang);
  const { nav, jsonLd } = crumbsHtml(lang, input.crumbs);
  const canonical = absoluteUrl(input.path);
  const koPath = ko ? input.path : input.otherPath;
  const enPath = ko ? input.otherPath : input.path;
  const home = krHome(lang);
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(input.title)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="ko" href="${esc(absoluteUrl(koPath))}">
<link rel="alternate" hreflang="en" href="${esc(absoluteUrl(enPath))}">
<link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(enPath))}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(input.title)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${ko ? "ko_KR" : "en_US"}">
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
</head>
<body>
<p class="banner">${ko ? `비공식 정보입니다. <a href="${OFFICE}">공식 선거관리기관</a>에서 확인하십시오.` : esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(home)}">${esc(ko ? "대한민국" : "South Korea")}</a> · <a href="/search/">${esc(ko ? "검색" : "Search")}</a> · <a href="${esc(input.otherPath)}">${ko ? "English" : "한국어"}</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${nav}</nav>
<p class="eyebrow">${esc(input.eyebrow)}</p>
<h1>${esc(input.h1)}</h1>
<p class="lede">${esc(input.lede)}</p>
<p><a href="${esc(reportErrorHref(input.path))}">${ko ? "오류 알리기" : "Report an error"}</a></p>
${input.body}
<h2>${esc(copy.sourcesHeading)}</h2>
<ul>${sourceItems(lang, input.sourceIds)}</ul>
</main>
<footer class="wrap">© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}. ${ko ? "출처: 각 항목의 읽은 날." : "Attribution: the read date on each source."}</footer>
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function officeHtml(lang: KrLang, unit: LocalUnit): string {
  const ko = lang === "ko";
  if (!unit.inBook) {
    return `<p>${esc(
      ko
        ? "2025년 12월 31일 현재의 7-5에는 이 이름이 없습니다. 사무소 주소는 옮기지 않습니다."
        : "Section 7-5, as of 31 December 2025, does not print this name. No office address is copied.",
    )}</p>`;
  }
  const items = unit.offices
    .map((office) => {
      const host = office.host
        ? ` <a href="https://${esc(office.host)}/">${esc(office.host)}</a>`
        : "";
      return `<li>${esc(office.address)}. ${esc(office.postcode)}.${host}</li>`;
    })
    .join("");
  return `<p>${esc(
    ko
      ? "주소, 우편번호, 홈페이지는 7-5에 인쇄된 문자열입니다. 링크는 호스트 앞에 https://만 붙입니다. 대표전화는 옮기지 않습니다."
      : "The address, postcode, and homepage are the strings printed in section 7-5. The link adds only https:// before the host. The telephone cell is not copied.",
  )}</p><ul>${items}</ul>`;
}

function headHtml(lang: KrLang, unit: LocalUnit): string {
  const ko = lang === "ko";
  const head = unit.head;
  if (!head) {
    return `<p>${esc(
      ko
        ? `당선인명부의 선거구명 칸은 이 이름을 적지 않습니다. 이름은 ${unit.name}입니다. 인천광역시 줄에는 제물포구, 영종구, 검단구가 있습니다. 이 페이지는 이 단체의 당선인 이름을 적지 않습니다.`
        : `The winner roster’s 선거구명 cell does not print ${unit.name}. Under 인천광역시 it does print 제물포구, 영종구, and 검단구. This page does not name a person elected to this office.`,
    )}</p>`;
  }
  const elected = ko
    ? `당선인명부의 선거구명 칸은 ${head.district}, 성명 칸은 ${head.name}, 소속정당명 칸은 ${head.party}입니다. 생년월일, 주소, 학력, 경력 칸은 옮기지 않습니다.`
    : `The winner roster’s 선거구명 cell prints ${head.district}. Its 성명 cell prints ${head.name}. Its 소속정당명 cell prints ${head.party}. Birth date, address, education, and career cells are not copied.`;
  if (!unit.vacancy) {
    const absent = ko
      ? "2026년 10월 18일에 읽은 재보궐선거 확정상황 4건에는 이 선거구가 없습니다."
      : "The by-election confirmation table read on 18 October 2026 has four rows. This office is not one of them.";
    return `<p>${esc(elected)}</p><p>${esc(absent)}</p>`;
  }
  const vacancy = unit.vacancy;
  const later = ko
    ? `같은 날 읽은 재보궐선거 확정상황은 실시일 ${vacancy.pollingDay}, 선거 구·시·군의 장선거, 구분 보궐, 선거구 ${unit.name}, 대상자 ${vacancy.person}, 정당 ${vacancy.party}, 사유 ${vacancy.reason}, 사유발생일 ${vacancy.reasonOn}, 사유확정일 ${vacancy.confirmedOn}이라고 적습니다. 이 페이지는 2026년 10월 18일 현재의 단체장 이름을 따로 적지 않습니다.`
    : `The by-election table read the same day prints polling day ${vacancy.pollingDay}, election 구·시·군의 장선거, kind 보궐, constituency ${unit.name}, person ${vacancy.person}, party ${vacancy.party}, reason ${vacancy.reason}, reason date ${vacancy.reasonOn}, confirmation date ${vacancy.confirmedOn}. This page does not add a separate name for who holds the office on 18 October 2026.`;
  return `<p>${esc(elected)}</p><p>${esc(later)}</p>`;
}

function localPage(lang: KrLang, unit: LocalUnit): string {
  const ko = lang === "ko";
  const region = regionBySlug(unit.region);
  if (!region) throw new Error(unit.region);
  const path = localPath(lang, unit.region, unit.slug);
  const other = localPath(lang === "ko" ? "en" : "ko", unit.region, unit.slug);
  const copy = ui(lang);
  const neighbors = localNeighbors(unit);
  const neighborBits = [neighbors.prev, neighbors.next]
    .filter((item): item is LocalUnit => Boolean(item))
    .map((item) => `<a href="${esc(localPath(lang, item.region, item.slug))}">${esc(item.name)}</a>`)
    .join(" · ");
  const sourceIds = ["mois-district-2025", "nec-local-2026", "nec-winners-2026", "nec-byelection-2026", "election-act-34", "nec-statistics-terms"];
  const description = ko
    ? `${unit.name}. 7-5와 2026년 6월 3일 구·시·군의 장 당선인명부. 비공식 정보입니다.`
    : `${unit.name}. Section 7-5 and the 3 June 2026 roster for heads of si, gun, and gu. Unofficial information.`;
  const next = ko
    ? "다음 임기만료 지방선거의 달력 날짜는 적지 않습니다. 공직선거법 제34조제1항제3호가 규칙을 정합니다. 그 날짜를 적은 이후 문서는 2026년 10월 18일에 읽지 않았습니다."
    : "No calendar day is printed for the next term-expiry local election. Article 34(1)3 of the Public Official Election Act states the rule. No later instrument naming that day was read on 18 October 2026.";
  const body = `<table>
<tr><th>${esc(ko ? "종류" : "Kind")}</th><td>${esc(kindLabel(unit.kind, lang))}</td></tr>
<tr><th>${esc(ko ? "책자의 상급 이름" : "Parent name in the book")}</th><td>${esc(unit.bookParent)}</td></tr>
<tr><th>${esc(ko ? "이 사이트의 상위 페이지" : "Parent page on this site")}</th><td><a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a></td></tr>
</table>
<h2>${esc(ko ? "사무소" : "Office")}</h2>
${officeHtml(lang, unit)}
<h2>${esc(ko ? "2026년 6월 3일 선거" : "Election of 3 June 2026")}</h2>
<p>${esc(
    ko
      ? "중앙선거관리위원회의 주요사무일정은 제9회 전국동시지방선거 실시일을 2026-06-03으로 적습니다. 아래는 당선인명부의 칸입니다."
      : "The National Election Commission schedule prints 2026-06-03 as the polling day of the 9th nationwide simultaneous local elections. The cells below are from the winner roster.",
  )}</p>
${headHtml(lang, unit)}
<h2>${esc(ko ? "다음 선거" : "Next election")}</h2>
<p>${esc(next)}</p>
${
  unit.vacancy
    ? `<p>${esc(
        ko
          ? `확정상황이 적은 보궐선거의 실시일은 ${unit.vacancy.pollingDay}입니다.`
          : `The confirmation table prints ${unit.vacancy.pollingDay} as the polling day of the by-election.`,
      )}</p>`
    : ""
}
${
  unit.region === "incheon" && unit.slug === "seo-gu"
    ? ko
      ? `<p><a href="${esc(INCHEON_LAW_URL)}">법률 제20161호</a>는 2026년 7월 1일부터 서구의 일부를 나누어 검단구를 설치합니다. 7-5와 당선인명부는 서구라는 이름을 인쇄합니다. <a href="${esc(INCHEON_REFORM_URL)}">인천광역시 행정체제 개편 안내</a>는 나머지 지역을 서해구로 부릅니다.</p>`
      : `<p><a href="${esc(INCHEON_LAW_URL)}">Law No. 20161</a> split part of 서구 off as 검단구 from 1 July 2026. Section 7-5 and the winner roster print the name 서구. <a href="${esc(INCHEON_REFORM_URL)}">Incheon Metropolitan City’s reorganization page</a> calls the remaining area 서해구.</p>`
    : ""
}
<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(copy.localPagesGap)}</p>
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a> · <a href="${esc(localIndexPath(lang))}">${esc(ko ? "시·군·구" : "Si, gun, and gu")}</a>. ${esc(copy.alphaNearby)}: ${neighborBits}</p>`;
  return shell({
    lang,
    path,
    otherPath: other,
    title: `${unit.name} · ${SITE.name}`,
    description,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.korea, path: krRoot() },
      { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
      { name: region.officialName, path: regionPath(lang, region.slug) },
      { name: unit.name, path },
    ],
    eyebrow: unit.inBook ? kindLabel(unit.kind, lang) : ko ? "당선인명부의 선거구명" : "Name in the winner roster",
    h1: unit.name,
    lede: region.officialName,
    body,
    sourceIds,
  });
}

function constituencyPage(lang: KrLang, row: Constituency): string {
  const ko = lang === "ko";
  const region = regionBySlug(row.region);
  if (!region) throw new Error(row.region);
  const path = constituencyPath(lang, row.slug);
  const other = constituencyPath(lang === "ko" ? "en" : "ko", row.slug);
  const copy = ui(lang);
  const neighbors = constituencyNeighbors(row);
  const neighborBits = [neighbors.prev, neighbors.next]
    .filter((item): item is Constituency => Boolean(item))
    .map((item) => `<a href="${esc(constituencyPath(lang, item.slug))}">${esc(item.name)}</a>`)
    .join(" · ");
  const listUrl = districtListUrl(row.cityCode);
  const member = row.member;
  const memberHtml = member
    ? `<p>${esc(
        ko
          ? `열린국회정보 제22대 국회의원 검색의 지역구 칸은 ${member.origNm}, 이름 칸은 ${member.name}, 정당 칸은 ${member.party}입니다.`
          : `The 22nd-term member search prints ${member.origNm} in the constituency cell, ${member.name} in the name cell, and ${member.party} in the party cell.`,
      )} <a href="${esc(member.url)}">${esc(ko ? "의원 페이지" : "Member page")}</a>.</p>`
    : `<p>${esc(
        ko
          ? "같은 검색의 지역구 253행에는 이 선거구와 맞는 줄이 없습니다."
          : "None of the 253 constituency rows in that search matches this district.",
      )}</p>`;
  const byeHtml = row.bye2026
    ? `<p>${esc(
        ko
          ? `당선인명부의 국회의원재보궐선거 행은 선거구명 ${row.name}, 성명 ${row.bye2026.name}, 소속정당명 ${row.bye2026.party}입니다. 게시문은 그 명부가 2026년 6월 3일 실시 선거(국회의원재보궐선거 포함)라고 적습니다. 생년월일과 주소는 옮기지 않습니다.`
          : `A National Assembly by-election row in the winner roster prints 선거구명 ${row.name}, 성명 ${row.bye2026.name}, and 소속정당명 ${row.bye2026.party}. The board post says the roster is for the election held on 3 June 2026, including National Assembly by-elections. Birth date and address are not copied.`,
      )}</p>`
    : "";
  const vacancyHtml = row.vacancy
    ? `<p>${esc(
        ko
          ? `재보궐선거 확정상황은 실시일 ${row.vacancy.pollingDay}, 선거 국회의원선거, 구분 보궐, 시도 ${row.city}, 선거구 ${row.name}, 대상자 ${row.vacancy.person}, 정당 ${row.vacancy.party}, 사유 ${row.vacancy.reason}, 사유발생일 ${row.vacancy.reasonOn}, 사유확정일 ${row.vacancy.confirmedOn}이라고 적습니다. 대상자를 현직 의원으로 적지 않습니다.`
          : `The by-election table prints polling day ${row.vacancy.pollingDay}, election 국회의원선거, kind 보궐, city ${row.city}, constituency ${row.name}, person ${row.vacancy.person}, party ${row.vacancy.party}, reason ${row.vacancy.reason}, reason date ${row.vacancy.reasonOn}, confirmation date ${row.vacancy.confirmedOn}. The person cell is not printed here as a current member.`,
      )}</p>`
    : "";
  const sourceIds = [
    "nec-na-2024-date",
    "nec-na-2024-districts",
    "assembly-member-search",
    "assembly-member-kogl",
    "assembly-term-22",
    "election-act-34",
  ];
  if (row.bye2026) sourceIds.push("nec-winners-2026", "nec-statistics-terms");
  if (row.vacancy) sourceIds.push("nec-byelection-2026");
  const description = ko
    ? `${row.city} ${row.name}. 제22대 지역구. 비공식 정보입니다.`
    : `${row.city} ${row.name}. A 22nd-term constituency. Unofficial information.`;
  const body = `<table>
<tr><th>${esc(ko ? "선관위 이름" : "NEC name")}</th><td>${esc(row.name)}</td></tr>
<tr><th>${esc(ko ? "선관위 코드" : "NEC code")}</th><td>${esc(row.code)}</td></tr>
<tr><th>${esc(ko ? "선관위 시·도" : "NEC city or province")}</th><td>${esc(row.city)}</td></tr>
<tr><th>${esc(ko ? "상위 페이지" : "Parent page")}</th><td><a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a></td></tr>
</table>
<p>${esc(
    ko
      ? "이름은 선거통계시스템의 지역구 목록 NAME 칸입니다."
      : "The name is the NAME cell of the election-statistics constituency list.",
  )} <a href="${esc(listUrl)}">${esc(ko ? "이 시·도의 목록" : "List for this city or province")}</a>.</p>
<h2>${esc(ko ? "최근 선거" : "Latest election")}</h2>
<p>${esc(
    ko
      ? `역대선거 페이지는 제22대 국회의원선거 투표실시일을 ${formatKrDate("2024-04-10", lang)}로 적습니다.`
      : `The past-elections page prints ${formatKrDate("2024-04-10", lang)} as the polling day of the 22nd National Assembly election.`,
  )}</p>
${byeHtml}
<h2>${esc(ko ? "현직 지역구 의원" : "Current constituency member")}</h2>
<p>${esc(
    ko
      ? "2026년 10월 18일 검색은 299명입니다. 당선방법 칸이 지역구인 줄은 253개, 비례대표인 줄은 46개입니다. 사진, 생년월일, 전화, 이메일, 보좌진은 옮기지 않습니다."
      : "The search on 18 October 2026 returned 299 people: 253 rows whose election-method cell is 지역구 and 46 whose cell is 비례대표. Photo, birth date, telephone, email, and staff cells are not copied.",
  )}</p>
${memberHtml}
${vacancyHtml}
<h2>${esc(ko ? "다음 선거" : "Next election")}</h2>
<p>${esc(
    ko
      ? `국회회의록은 제22대 임기를 2024.05.30.부터 2028.05.29.까지로 적습니다. 공직선거법 제34조제1항제2호로 계산한 다음 임기만료 국회의원선거일은 ${formatKrDate("2028-04-12", lang)}입니다. 비례대표 46석은 이 페이지의 대상이 아닙니다.`
      : `The National Assembly minutes index prints the 22nd term as 30 May 2024 to 29 May 2028. The next term-expiry National Assembly election, calculated under article 34(1)2, is ${formatKrDate("2028-04-12", lang)}. The 46 proportional seats are not this page.`,
  )}</p>
${
  row.vacancy
    ? `<p>${esc(
        ko
          ? `확정상황이 적은 이 선거구의 보궐선거 실시일은 ${row.vacancy.pollingDay}입니다.`
          : `The confirmation table prints ${row.vacancy.pollingDay} as the polling day of the by-election for this constituency.`,
      )}</p>`
    : ""
}
<p class="tools">${esc(copy.parent)}: <a href="${esc(regionPath(lang, region.slug))}">${esc(region.officialName)}</a> · <a href="${esc(constituencyIndexPath(lang))}">${esc(ko ? "지역구" : "Constituencies")}</a>. ${esc(copy.alphaNearby)}: ${neighborBits}</p>`;
  return shell({
    lang,
    path,
    otherPath: other,
    title: `${row.city} ${row.name} · ${SITE.name}`,
    description,
    crumbs: [
      { name: copy.home, path: "/" },
      { name: copy.korea, path: krRoot() },
      { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
      { name: region.officialName, path: regionPath(lang, region.slug) },
      { name: row.name, path },
    ],
    eyebrow: ko ? "국회의원지역구" : "National Assembly constituency",
    h1: row.name,
    lede: row.city,
    body,
    sourceIds,
  });
}

let written = 0;
for (const lang of ["ko", "en"] as const) {
  for (const unit of LOCAL_UNITS) {
    const path = localPath(lang, unit.region, unit.slug);
    const file = join(publicDir, path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, localPage(lang, unit));
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
console.log(`korea level-2 html: ${written}`);
