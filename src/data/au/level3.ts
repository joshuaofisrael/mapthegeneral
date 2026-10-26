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
  /** ABS ASGS 2025 State Electoral Division code, when the page uses that list. */
  absCode?: string;
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
  /** State boundaries dataset code, exactly as printed, when a reuse licence covers it. */
  stateCode?: string;
  /** Geoscape Administrative Boundaries LGA_PID, when the legal name is that table’s LGA_NAME. */
  legalPid?: string;
};

/** Index heading for a state or territory lower-house list. */
export function chamberTitle(slug: string): string {
  if (slug === "tasmania") return "House of Assembly divisions";
  if (slug === "south-australia") return "House of Assembly districts";
  if (slug === "australian-capital-territory") return "Legislative Assembly electorates";
  if (slug === "northern-territory") return "Legislative Assembly divisions";
  return "Legislative Assembly districts";
}

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

if (STATE_DISTRICTS.length !== 327) throw new Error(`Expected 327 state districts, found ${STATE_DISTRICTS.length}`);
if (districtsIn("new-south-wales").length !== 93) throw new Error("Expected 93 NSW districts");
if (districtsIn("queensland").length !== 93) throw new Error("Expected 93 Queensland districts");
if (districtsIn("western-australia").length !== 59) throw new Error("Expected 59 Western Australian districts");
if (districtsIn("south-australia").length !== 47) throw new Error("Expected 47 South Australian districts");
if (districtsIn("tasmania").length !== 5) throw new Error("Expected 5 Tasmanian divisions");
if (districtsIn("australian-capital-territory").length !== 5) throw new Error("Expected 5 ACT electorates");
if (districtsIn("northern-territory").length !== 25) throw new Error("Expected 25 Northern Territory divisions");
const absDistrictCodes = STATE_DISTRICTS.filter((item) => item.absCode);
if (absDistrictCodes.length !== 229) throw new Error(`Expected 229 ABS-coded districts, found ${absDistrictCodes.length}`);
for (const item of absDistrictCodes) {
  if (!item.absCode || !/^\d{5}$/.test(item.absCode)) throw new Error(`Bad SED code ${item.absCode} ${item.name}`);
}
const qldNamed = LOCAL_AREAS.filter((item) => item.jurisdictionSlug === "queensland" && item.stateCode);
if (qldNamed.length !== 78) throw new Error(`Expected 78 Queensland state area codes, found ${qldNamed.length}`);
if (LOCAL_AREAS.length !== 548) throw new Error(`Expected 548 local areas, found ${LOCAL_AREAS.length}`);
if (LOCAL_AREAS.filter((item) => item.group === "vic-council").length !== 79) {
  throw new Error("Expected 79 Victorian councils");
}
if (areasIn("victoria").length !== 80) throw new Error("Expected 80 Victorian areas, including unincorporated");
