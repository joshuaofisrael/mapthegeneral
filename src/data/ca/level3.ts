import { DIVISIONS } from "./level2";
import type { CaLang } from "./types";
import legislatureJson from "./legislature.json";
import municipalitiesJson from "./municipalities.json";

export type LegislatureSeat = {
  region: string;
  name: string;
  member: string;
  party: string;
  code: string;
  /** Empty, "recount" (Quebec judicial count), or "dissolved" (British Columbia, 22 September 2026). */
  gap: "" | "recount" | "dissolved";
  slug: string;
};

export type Municipality = {
  code: string;
  cd: string;
  region: string;
  nameEn: string;
  nameFr: string;
  type: string;
  /** Digital-boundary CSDNAME when it differs from the English SGC class title. */
  boundary: string;
  slug: string;
};

/** Labels printed in Statistics Canada table 1.5, catalogue 98-301-X. */
export const CSD_TYPE_LABEL: Record<string, string> = {
  C: "C – City / Cité",
  CC: "CC – Chartered community",
  CG: "CG – Community government",
  CT: "CT – Canton (municipalité de)",
  CU: "CU – Cantons unis (municipalité de)",
  CV: "CV – City / Ville",
  CY: "CY – City",
  DM: "DM – District municipality",
  IM: "IM – Island municipality",
  LGD: "LGD – Local government district",
  M: "M – Municipality / Municipalité",
  MD: "MD – Municipal district",
  MRM: "MRM – Regional Municipality / Municipalité Régional",
  MÉ: "MÉ – Municipalité",
  MU: "MU – Municipality",
  NH: "NH – Northern hamlet",
  NV: "NV – Northern village",
  P: "P – Parish / Paroisse (municipalité de)",
  PE: "PE – Paroisse (municipalité de)",
  RCR: "RCR – Rural community / Communauté rurale",
  RGM: "RGM – Regional municipality",
  RM: "RM – Rural municipality",
  RV: "RV – Resort village",
  RMU: "RMU – Resort Municipality",
  SM: "SM – Specialized municipality",
  SV: "SV – Summer village",
  HAM: "HAM – Hamlet",
  T: "T – Town",
  TP: "TP – Township",
  TV: "TV – Town / Ville",
  V: "V – Ville",
  VC: "VC – Village cri",
  VK: "VK – Village naskapi",
  VL: "VL – Village",
  VN: "VN – Village nordique",
};

export const LEGISLATURE = legislatureJson as LegislatureSeat[];
export const MUNICIPALITIES = municipalitiesJson as Municipality[];

const SEAT_COUNTS: Record<string, number> = {
  ontario: 124,
  quebec: 127,
  "british-columbia": 93,
  alberta: 87,
  manitoba: 57,
  saskatchewan: 61,
  "nova-scotia": 56,
  "prince-edward-island": 27,
  nunavut: 22,
};

const MUNI_COUNTS: Record<string, number> = {
  ontario: 414,
  quebec: 1130,
  "british-columbia": 160,
  alberta: 326,
  manitoba: 138,
  saskatchewan: 775,
  "nova-scotia": 40,
  "new-brunswick": 104,
  "newfoundland-and-labrador": 277,
  "prince-edward-island": 59,
  yukon: 8,
  "northwest-territories": 24,
  nunavut: 25,
};

function assertLevel3(): void {
  if (LEGISLATURE.length !== 654) throw new Error(`Expected 654 legislature seats, found ${LEGISLATURE.length}`);
  const byRegion = new Map<string, LegislatureSeat[]>();
  const slugs = new Set<string>();
  for (const seat of LEGISLATURE) {
    const key = `${seat.region}/${seat.slug}`;
    if (slugs.has(key)) throw new Error(`Duplicate legislature slug ${key}`);
    slugs.add(key);
    const list = byRegion.get(seat.region) ?? [];
    list.push(seat);
    byRegion.set(seat.region, list);
  }
  for (const [region, count] of Object.entries(SEAT_COUNTS)) {
    const list = byRegion.get(region) ?? [];
    if (list.length !== count) throw new Error(`${region} expected ${count} seats, found ${list.length}`);
  }
  const parties = (region: string) =>
    (byRegion.get(region) ?? []).reduce<Record<string, number>>((acc, seat) => {
      acc[seat.party] = (acc[seat.party] ?? 0) + 1;
      return acc;
    }, {});
  const expect = (region: string, counts: Record<string, number>) => {
    const found = parties(region);
    for (const [party, count] of Object.entries(counts)) {
      if (found[party] !== count) throw new Error(`${region} ${party} expected ${count}, found ${found[party] ?? 0}`);
    }
  };
  expect("ontario", {
    "Progressive Conservative Party of Ontario": 79,
    "New Democratic Party of Ontario": 27,
    "Ontario Liberal Party": 14,
    "Green Party of Ontario": 2,
    Independent: 2,
  });
  expect("quebec", {
    "Parti québécois": 59,
    "Parti libéral du Québec": 39,
    "Parti conservateur du Québec": 18,
    "Québec solidaire": 9,
    "": 2,
  });
  expect("alberta", { UC: 47, NDP: 39, PTP: 1 });
  expect("manitoba", { NDP: 34, PC: 19, IND: 3, "IND LIB": 1 });
  expect("saskatchewan", { "Government Caucus": 34, "Opposition Caucus": 26, Independent: 1 });
  expect("nova-scotia", { PC: 43, NDP: 9, Liberal: 3, Independent: 1 });
  expect("prince-edward-island", { PC: 18, Green: 4, Liberal: 4, Independent: 1 });
  const recounts = (byRegion.get("quebec") ?? []).filter((seat) => seat.gap === "recount").map((seat) => seat.name).sort();
  if (recounts.join("|") !== "Champlain|Vachon") throw new Error(`Unexpected Quebec recount seats ${recounts.join(",")}`);
  for (const seat of byRegion.get("british-columbia") ?? []) {
    if (seat.gap !== "dissolved" || seat.member) throw new Error(`BC seat ${seat.name} should have no current member`);
  }
  if (MUNICIPALITIES.length !== 3480) throw new Error(`Expected 3480 municipalities, found ${MUNICIPALITIES.length}`);
  const divisionByCode = new Map(DIVISIONS.map((division) => [division.code, division]));
  const muniSlugs = new Set<string>();
  const muniCounts: Record<string, number> = {};
  for (const place of MUNICIPALITIES) {
    if (!CSD_TYPE_LABEL[place.type]) throw new Error(`Unknown CSD type ${place.type} on ${place.code}`);
    const division = divisionByCode.get(place.cd);
    if (!division || division.region !== place.region) throw new Error(`Municipality ${place.code} has no parent division`);
    const key = `${place.cd}/${place.slug}`;
    if (muniSlugs.has(key)) throw new Error(`Duplicate municipality slug ${key}`);
    muniSlugs.add(key);
    muniCounts[place.region] = (muniCounts[place.region] ?? 0) + 1;
  }
  for (const [region, count] of Object.entries(MUNI_COUNTS)) {
    if (muniCounts[region] !== count) throw new Error(`${region} municipalities expected ${count}, found ${muniCounts[region] ?? 0}`);
  }
}

assertLevel3();

function collator(lang: CaLang): Intl.Collator {
  return new Intl.Collator(lang === "fr" ? "fr-CA" : "en-CA");
}

export function municipalityName(place: Municipality, lang: CaLang): string {
  return lang === "fr" ? place.nameFr : place.nameEn;
}

export function seatsIn(region: string, lang: CaLang): LegislatureSeat[] {
  const compare = collator(lang);
  return LEGISLATURE.filter((seat) => seat.region === region).sort((a, b) => compare.compare(a.name, b.name));
}

export function seatNeighbors(seat: LegislatureSeat, lang: CaLang): { prev?: LegislatureSeat; next?: LegislatureSeat } {
  const list = seatsIn(seat.region, lang);
  const index = list.findIndex((item) => item.slug === seat.slug);
  return { prev: list[index - 1], next: list[index + 1] };
}

const byDivision = new Map<string, Municipality[]>();
for (const place of MUNICIPALITIES) {
  const list = byDivision.get(place.cd) ?? [];
  list.push(place);
  byDivision.set(place.cd, list);
}

export function municipalitiesIn(cd: string, lang: CaLang): Municipality[] {
  const compare = collator(lang);
  return (byDivision.get(cd) ?? []).slice().sort((a, b) => compare.compare(municipalityName(a, lang), municipalityName(b, lang)));
}

export function municipalityNeighbors(
  place: Municipality,
  lang: CaLang,
): { prev?: Municipality; next?: Municipality } {
  const list = municipalitiesIn(place.cd, lang);
  const index = list.findIndex((item) => item.slug === place.slug);
  return { prev: list[index - 1], next: list[index + 1] };
}

export function regionsWithLegislature(): string[] {
  return Object.keys(SEAT_COUNTS);
}

export function regionsWithMunicipalities(): string[] {
  return Object.keys(MUNI_COUNTS);
}
