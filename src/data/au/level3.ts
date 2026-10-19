import raw from "./level3.json";

export type StateDistrict = {
  jurisdictionSlug: string;
  name: string;
  slug: string;
  chamber: string;
  memberPrinted: string | null;
  memberParty: string | null;
  memberKind: "general-2023" | "by-election" | "gap";
  declaration: string | null;
};

export type LocalArea = {
  group: "vic-council" | "abs";
  jurisdictionSlug: string;
  name: string;
  slug: string;
  absCode: string;
  absName: string;
  kind: "council" | "abs" | "unincorporated";
  flags: string[];
  vecPath: string | null;
};

export const STATE_DISTRICTS = raw.districts as StateDistrict[];
export const LOCAL_AREAS = raw.areas as LocalArea[];

export function stateAssemblyIndexPath(jurisdictionSlug: string): string {
  return `/au/en/${jurisdictionSlug}/assembly/`;
}

export function stateAssemblyPath(jurisdictionSlug: string, slug: string): string {
  return `/au/en/${jurisdictionSlug}/assembly/${slug}/`;
}

export function localIndexPath(jurisdictionSlug: string): string {
  if (jurisdictionSlug === "victoria") return "/au/en/victoria/local-councils/";
  return `/au/en/${jurisdictionSlug}/local-government/`;
}

export function localPath(area: LocalArea): string {
  if (area.group === "vic-council") return `/au/en/victoria/local-councils/${area.slug}/`;
  return `/au/en/${area.jurisdictionSlug}/local-government/${area.slug}/`;
}

export function districtsIn(jurisdictionSlug: string): StateDistrict[] {
  return STATE_DISTRICTS.filter((item) => item.jurisdictionSlug === jurisdictionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "en"),
  );
}

export function areasIn(jurisdictionSlug: string): LocalArea[] {
  return LOCAL_AREAS.filter((item) => item.jurisdictionSlug === jurisdictionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "en"),
  );
}

const districtKeys = new Set<string>();
for (const item of STATE_DISTRICTS) {
  const key = `${item.jurisdictionSlug}/${item.slug}`;
  if (districtKeys.has(key)) throw new Error(`Duplicate state district ${key}`);
  districtKeys.add(key);
}
const areaKeys = new Set<string>();
for (const item of LOCAL_AREAS) {
  const key = localPath(item);
  if (areaKeys.has(key)) throw new Error(`Duplicate local area ${key}`);
  areaKeys.add(key);
  if (!/^\d{5}$/.test(item.absCode)) throw new Error(`Bad LGA code ${item.absCode} ${item.name}`);
}

if (STATE_DISTRICTS.length !== 98) throw new Error(`Expected 98 state districts, found ${STATE_DISTRICTS.length}`);
if (districtsIn("new-south-wales").length !== 93) throw new Error("Expected 93 NSW districts");
if (districtsIn("tasmania").length !== 5) throw new Error("Expected 5 Tasmanian divisions");
if (LOCAL_AREAS.length !== 548) throw new Error(`Expected 548 local areas, found ${LOCAL_AREAS.length}`);
if (LOCAL_AREAS.filter((item) => item.group === "vic-council").length !== 79) {
  throw new Error("Expected 79 Victorian councils");
}
if (areasIn("victoria").length !== 80) throw new Error("Expected 80 Victorian areas, including unincorporated");
