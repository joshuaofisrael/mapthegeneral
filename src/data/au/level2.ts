import raw from "./level2.json";

export type FederalMember = {
  /** Name as the AEC tally room prints it, e.g. "SMITH, David". */
  printed: string;
  party: string;
  source: "aec-2025-elected" | "aec-farrer-2026";
};

export type Division = {
  name: string;
  slug: string;
  stateLabel: string;
  jurisdictionSlug: string;
  area: string;
  profilePath: string;
  redistribution: string;
  member: FederalMember;
};

/** A member as the Victorian Electoral Commission declared them elected. */
export type VicMember = {
  printed: string;
  party: string;
  source: string;
};

/** A Legislative Council member, with the order the VEC printed them elected in. */
export type VicCouncilMember = {
  printed: string;
  party: string;
  order: number;
};

export type AssemblyDistrict = {
  name: string;
  slug: string;
  /** Null when the VEC results used here do not confirm the current member. */
  member: VicMember | null;
};

export type CouncilRegion = {
  name: string;
  slug: string;
  /** Members the VEC 2022 count elected who still hold the seat; fewer than 5 means a gap. */
  members: VicCouncilMember[];
};

export const DIVISIONS = raw.divisions as Division[];
export const ASSEMBLY = raw.assembly as AssemblyDistrict[];
export const COUNCIL = raw.regions as CouncilRegion[];

export function houseIndexPath(): string {
  return "/au/en/house/";
}

export function stateHouseIndexPath(jurisdictionSlug: string): string {
  return `/au/en/${jurisdictionSlug}/house/`;
}

export function divisionPath(jurisdictionSlug: string, slug: string): string {
  return `/au/en/${jurisdictionSlug}/house/${slug}/`;
}

export function assemblyIndexPath(): string {
  return "/au/en/victoria/assembly/";
}

export function assemblyPath(slug: string): string {
  return `/au/en/victoria/assembly/${slug}/`;
}

export function councilIndexPath(): string {
  return "/au/en/victoria/council/";
}

export function councilPath(slug: string): string {
  return `/au/en/victoria/council/${slug}/`;
}

export function divisionsIn(jurisdictionSlug: string): Division[] {
  return DIVISIONS.filter((item) => item.jurisdictionSlug === jurisdictionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "en"),
  );
}

if (DIVISIONS.length !== 150) throw new Error(`Expected 150 divisions, found ${DIVISIONS.length}`);
if (ASSEMBLY.length !== 88) throw new Error(`Expected 88 assembly districts, found ${ASSEMBLY.length}`);
if (COUNCIL.length !== 8) throw new Error(`Expected 8 council regions, found ${COUNCIL.length}`);
if (COUNCIL.some((item) => item.members.length > 5)) throw new Error("A council region has at most 5 members");
export const ASSEMBLY_CONFIRMED = ASSEMBLY.filter((item) => item.member !== null).length;
export const ASSEMBLY_GAPS = ASSEMBLY.length - ASSEMBLY_CONFIRMED;
export const COUNCIL_CONFIRMED = COUNCIL.reduce((sum, item) => sum + item.members.length, 0);
export const COUNCIL_GAPS = COUNCIL.length * 5 - COUNCIL_CONFIRMED;
if (ASSEMBLY_CONFIRMED !== 81) throw new Error(`Expected 81 VEC-confirmed assembly members, found ${ASSEMBLY_CONFIRMED}`);
if (COUNCIL_CONFIRMED !== 34) throw new Error(`Expected 34 VEC-confirmed council members, found ${COUNCIL_CONFIRMED}`);
