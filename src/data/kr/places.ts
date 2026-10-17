import type { Region } from "./types";

/**
 * Counts are the cells of table 1-1 총괄 in 행정안전부, 「지방자치단체 행정구역 및
 * 인구 현황」(2025. 12. 31. 현재), read 17 October 2026.
 * Office lines are section 7-5 of the same book.
 * The book’s chapter list prints 16 headings. Its total line prints 계(17).
 */
export const REGIONS: Region[] = [
  {
    slug: "seoul",
    officialName: "서울특별시",
    kindKo: "특별시",
    kindEn: "Special City",
    basicTotal: 25,
    si: 0,
    gun: 0,
    gu: 25,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 0,
    myeon: 0,
    dong: 427,
    offices: [{ label: "서울특별시", address: "중구 세종대로 110", postcode: "04524", host: "seoul.go.kr" }],
  },
  {
    slug: "jeonnam-gwangju",
    officialName: "전남광주통합특별시",
    kindKo: "통합특별시",
    kindEn: "Integrated special city",
    basicTotal: 27,
    si: 5,
    gun: 17,
    gu: 5,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 33,
    myeon: 196,
    dong: 164,
    offices: [
      { label: "광주광역시", address: "서구 내방로 111", postcode: "61945", host: "gwangju.go.kr" },
      { label: "전라남도", address: "무안군 삼향읍 오룡길 1", postcode: "58564", host: "jeonnam.go.kr" },
    ],
  },
  {
    slug: "busan",
    officialName: "부산광역시",
    kindKo: "광역시",
    kindEn: "Metropolitan City",
    basicTotal: 16,
    si: 0,
    gun: 1,
    gu: 15,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 4,
    myeon: 1,
    dong: 201,
    offices: [{ label: "부산광역시", address: "연제구 중앙대로 1001", postcode: "47545", host: "busan.go.kr" }],
  },
  {
    slug: "daegu",
    officialName: "대구광역시",
    kindKo: "광역시",
    kindEn: "Metropolitan City",
    basicTotal: 9,
    si: 0,
    gun: 2,
    gu: 7,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 7,
    myeon: 10,
    dong: 133,
    offices: [
      { label: "대구광역시 (산격청사)", address: "북구 연암로 40", postcode: "41542", host: "daegu.go.kr" },
      { label: "대구광역시 (동인청사)", address: "중구 공평로 88", postcode: "41911", host: "daegu.go.kr" },
    ],
  },
  {
    slug: "incheon",
    officialName: "인천광역시",
    kindKo: "광역시",
    kindEn: "Metropolitan City",
    basicTotal: 10,
    si: 0,
    gun: 2,
    gu: 8,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 1,
    myeon: 19,
    dong: 137,
    offices: [{ label: "인천광역시", address: "남동구 정각로 29", postcode: "21554", host: "incheon.go.kr" }],
  },
  {
    slug: "daejeon",
    officialName: "대전광역시",
    kindKo: "광역시",
    kindEn: "Metropolitan City",
    basicTotal: 5,
    si: 0,
    gun: 0,
    gu: 5,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 0,
    myeon: 0,
    dong: 82,
    offices: [{ label: "대전광역시", address: "서구 둔산로 100", postcode: "35242", host: "daejeon.go.kr" }],
  },
  {
    slug: "ulsan",
    officialName: "울산광역시",
    kindKo: "광역시",
    kindEn: "Metropolitan City",
    basicTotal: 5,
    si: 0,
    gun: 1,
    gu: 4,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 6,
    myeon: 6,
    dong: 43,
    offices: [{ label: "울산광역시", address: "남구 중앙로 201", postcode: "44675", host: "ulsan.go.kr" }],
  },
  {
    slug: "sejong",
    officialName: "세종특별자치시",
    kindKo: "특별자치시",
    kindEn: "Special Self-Governing City",
    basicTotal: null,
    si: 0,
    gun: 0,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 1,
    myeon: 9,
    dong: 14,
    offices: [{ label: "세종특별자치시", address: "한누리대로 2130", postcode: "30151", host: "sejong.go.kr" }],
  },
  {
    slug: "gyeonggi",
    officialName: "경기도",
    kindKo: "도",
    kindEn: "Province",
    basicTotal: 31,
    si: 28,
    gun: 3,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 20,
    eup: 37,
    myeon: 102,
    dong: 466,
    offices: [
      { label: "경기도", address: "수원시 영통구 도청로 30", postcode: "16508", host: "gg.go.kr" },
      { label: "경기도 북부청사", address: "의정부시 청사로 1", postcode: "11780", host: "gg.go.kr" },
    ],
  },
  {
    slug: "gangwon",
    officialName: "강원특별자치도",
    kindKo: "특별자치도",
    kindEn: "Special Self-Governing Province",
    basicTotal: 18,
    si: 7,
    gun: 11,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 0,
    eup: 24,
    myeon: 95,
    dong: 74,
    offices: [{ label: "강원특별자치도", address: "춘천시 중앙로 1", postcode: "24266", host: "state.gwd.go.kr" }],
  },
  {
    slug: "chungbuk",
    officialName: "충청북도",
    kindKo: "도",
    kindEn: "Province",
    basicTotal: 11,
    si: 3,
    gun: 8,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 4,
    eup: 16,
    myeon: 86,
    dong: 51,
    offices: [{ label: "충청북도", address: "청주시 상당구 상당로 82", postcode: "28515", host: "chungbuk.go.kr" }],
  },
  {
    slug: "chungnam",
    officialName: "충청남도",
    kindKo: "도",
    kindEn: "Province",
    basicTotal: 15,
    si: 8,
    gun: 7,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 2,
    eup: 25,
    myeon: 136,
    dong: 47,
    offices: [{ label: "충청남도", address: "홍성군 홍북읍 충남대로 21", postcode: "32255", host: "chungnam.go.kr" }],
  },
  {
    slug: "jeonbuk",
    officialName: "전북특별자치도",
    kindKo: "특별자치도",
    kindEn: "Special Self-Governing Province",
    basicTotal: 14,
    si: 6,
    gun: 8,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 2,
    eup: 15,
    myeon: 144,
    dong: 84,
    offices: [{ label: "전북특별자치도", address: "전주시 완산구 효자로 225", postcode: "54968", host: "jeonbuk.go.kr" }],
  },
  {
    slug: "gyeongbuk",
    officialName: "경상북도",
    kindKo: "도",
    kindEn: "Province",
    basicTotal: 22,
    si: 10,
    gun: 12,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 2,
    eup: 38,
    myeon: 192,
    dong: 91,
    offices: [{ label: "경상북도", address: "안동시 풍천면 도청대로 455", postcode: "36759", host: "gb.go.kr" }],
  },
  {
    slug: "gyeongnam",
    officialName: "경상남도",
    kindKo: "도",
    kindEn: "Province",
    basicTotal: 18,
    si: 8,
    gun: 10,
    gu: 0,
    adminSi: 0,
    nonAutoGu: 5,
    eup: 21,
    myeon: 175,
    dong: 109,
    offices: [{ label: "경상남도", address: "창원시 의창구 중앙대로 300", postcode: "51154", host: "gyeongnam.go.kr" }],
  },
  {
    slug: "jeju",
    officialName: "제주특별자치도",
    kindKo: "특별자치도",
    kindEn: "Special Self-Governing Province",
    basicTotal: null,
    si: 0,
    gun: 0,
    gu: 0,
    adminSi: 2,
    nonAutoGu: 0,
    eup: 7,
    myeon: 5,
    dong: 31,
    offices: [{ label: "제주특별자치도", address: "제주시 문연로 6", postcode: "63122", host: "jeju.go.kr" }],
  },
];

export const BASIC_LOCAL_TOTAL = 226;
export const SI_TOTAL = 75;
export const GUN_TOTAL = 82;
export const GU_TOTAL = 69;
export const ADMIN_SI_TOTAL = 2;
export const NON_AUTO_GU_TOTAL = 35;
export const EUP_MYEON_DONG_TOTAL = 3565;
export const EUP_TOTAL = 235;
export const MYEON_TOTAL = 1176;
export const DONG_TOTAL = 2154;

function sum(pick: (region: Region) => number): number {
  return REGIONS.reduce((total, region) => total + pick(region), 0);
}

const basic = sum((region) => region.basicTotal ?? 0);
if (basic !== BASIC_LOCAL_TOTAL) throw new Error(`시·군·구 sum ${basic}`);
if (sum((region) => region.si) !== SI_TOTAL) throw new Error("시 sum");
if (sum((region) => region.gun) !== GUN_TOTAL) throw new Error("군 sum");
if (sum((region) => region.gu) !== GU_TOTAL) throw new Error("구 sum");
if (sum((region) => region.adminSi) !== ADMIN_SI_TOTAL) throw new Error("행정시 sum");
if (sum((region) => region.nonAutoGu) !== NON_AUTO_GU_TOTAL) throw new Error("비자치구 sum");
if (sum((region) => region.eup) !== EUP_TOTAL) throw new Error("읍 sum");
if (sum((region) => region.myeon) !== MYEON_TOTAL) throw new Error("면 sum");
if (sum((region) => region.dong) !== DONG_TOTAL) throw new Error("동 sum");
const places = sum((region) => region.eup + region.myeon + region.dong);
if (places !== EUP_MYEON_DONG_TOTAL) throw new Error(`읍·면·동 sum ${places}`);
if (REGIONS.length !== 16) throw new Error(`Expected 16 chapter headings, got ${REGIONS.length}`);

const slugs = new Set<string>();
for (const region of REGIONS) {
  if (slugs.has(region.slug)) throw new Error(`Duplicate slug ${region.slug}`);
  slugs.add(region.slug);
  if (region.offices.length === 0) throw new Error(`No office for ${region.slug}`);
}

export function regionBySlug(slug: string): Region | undefined {
  return REGIONS.find((region) => region.slug === slug);
}

export function alphaRegions(): Region[] {
  return [...REGIONS].sort((a, b) => a.officialName.localeCompare(b.officialName, "ko"));
}

export function alphaRegionNeighbors(slug: string): { prev?: Region; next?: Region } {
  const ordered = alphaRegions();
  const index = ordered.findIndex((region) => region.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? ordered[index - 1] : undefined,
    next: index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}
