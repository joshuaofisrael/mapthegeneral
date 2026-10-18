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

export type VicMember = {
  display: string;
  party: string;
  minister: string;
  position: string;
  rowUpdated: string;
};

export type AssemblyDistrict = {
  name: string;
  slug: string;
  member: VicMember | null;
};

export type CouncilRegion = {
  name: string;
  slug: string;
  members: VicMember[];
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
if (COUNCIL.some((item) => item.members.length !== 5)) throw new Error("Each council region needs 5 members");
if (ASSEMBLY.filter((item) => item.member === null).length !== 5) {
  throw new Error("Expected 5 assembly districts with no member row");
}
