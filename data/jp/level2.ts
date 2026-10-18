import { PREFECTURES } from "./places";
import raw from "./level2.json";

/** Headings from 公職選挙法別表第一. `part` means a chome-level list under this heading was not copied. */
export type AreaNode = {
  t: string;
  part: boolean;
  c: AreaNode[];
};

export type HrMember = {
  name: string;
  kana: string;
  faction: string;
  times: string;
  profile: string;
};

export type HcMember = {
  name: string;
  legal: string;
  kana: string;
  faction: string;
  term: string;
  profile: string;
  seiji: string;
};

export type Smd = {
  prefecture: string;
  n: number;
  lawHeading: string;
  listLabel: string;
  areas: AreaNode[];
  truncated: boolean;
  member: HrMember;
};

export type PrBlock = {
  id: string;
  nameJa: string;
  seatsKanji: string;
  seats: number;
  listLabel: string;
  prefectures: string[];
  members: HrMember[];
};

export type HcDistrict = {
  lawName: string;
  listName: string;
  seatsKanji: string;
  seats: number;
  parents: string[];
  canonical: string;
  members: HcMember[];
};

export type Level2 = {
  readOn: string;
  hrListAsOf: string;
  hcListAsOf: string;
  annexNote: string;
  hrOffice: { address: string; phone: string };
  hcOffice: { address: string; phone: string };
  smd: Smd[];
  blocks: PrBlock[];
  hc: HcDistrict[];
};

export const LEVEL2 = raw as Level2;

if (LEVEL2.smd.length !== 289) {
  throw new Error(`Expected 289 single-member districts, found ${LEVEL2.smd.length}`);
}
if (LEVEL2.blocks.length !== 11 || LEVEL2.blocks.reduce((sum, block) => sum + block.seats, 0) !== 176) {
  throw new Error("Proportional annex must be 11 blocks and 176 seats");
}
if (LEVEL2.hc.length !== 45 || LEVEL2.hc.reduce((sum, district) => sum + district.seats, 0) !== 148) {
  throw new Error("Councillors annex must be 45 districts and 148 seats");
}

const blockByPref = new Map<string, string>();
for (const block of LEVEL2.blocks) {
  for (const slug of block.prefectures) {
    if (blockByPref.has(slug)) throw new Error(`Prefecture ${slug} is in two blocks`);
    blockByPref.set(slug, block.id);
  }
}
for (const prefecture of PREFECTURES) {
  if (blockByPref.get(prefecture.slug) !== prefecture.blockId) {
    throw new Error(`Block annex disagrees with the Ministry table for ${prefecture.slug}`);
  }
  const numbers = LEVEL2.smd.filter((item) => item.prefecture === prefecture.slug).map((item) => item.n);
  const expected = numbers.map((_, index) => index + 1);
  if (numbers.join() !== expected.join()) {
    throw new Error(`District numbers for ${prefecture.slug} are ${numbers.join(",")}`);
  }
}

export function smdsIn(slug: string): Smd[] {
  return LEVEL2.smd.filter((item) => item.prefecture === slug);
}

export function blockRecord(id: string): PrBlock {
  const found = LEVEL2.blocks.find((item) => item.id === id);
  if (!found) throw new Error(`Missing block ${id}`);
  return found;
}

export function hcFor(slug: string): HcDistrict | undefined {
  return LEVEL2.hc.find((item) => item.parents.includes(slug));
}

export function areaLine(nodes: AreaNode[]): string {
  return nodes
    .map((node) => {
      const mark = node.part ? "※" : "";
      if (node.c.length === 0) return `${node.t}${mark}`;
      return `${node.t}${mark}（${areaLine(node.c)}）`;
    })
    .join("、");
}

export function usesAnnexNote(nodes: AreaNode[]): boolean {
  return nodes.some((node) => node.t.includes("本庁管内") || usesAnnexNote(node.c));
}
