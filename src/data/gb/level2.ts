import rawJson from "./level2.json";

export type NationSlug = "england" | "scotland" | "wales" | "northern-ireland";

export type ByElectionNote = {
  /** Exact line from the 59th Parliament by-election list. */
  listed: string;
  listedIso: string;
  /** True when the Members API status start is that listed date. */
  statusMatchesList: boolean;
};

export type WestminsterSeat = {
  id: number;
  name: string;
  slug: string;
  nation: NationSlug;
  gss: string;
  /** ONS PCON24NMW when it is non-empty and not the same string as the name. */
  welshName: string | null;
  boundaryStart: string;
  memberId: number;
  displayName: string;
  fullTitle: string;
  party: string;
  statusStart: string;
  statusDescription: string;
  byElection: ByElectionNote | null;
};

export type SpMember = {
  personId: number;
  displayName: string;
  parliamentaryName: string;
  party: string;
  from: string;
};

export type SpConstituency = {
  id: number;
  name: string;
  slug: string;
  code: string;
  validFrom: string;
  regionName: string;
  regionSlug: string;
  member: SpMember;
};

export type SpRegion = {
  id: number;
  name: string;
  slug: string;
  code: string;
  start: string;
  members: SpMember[];
};

export type SeneddMember = {
  id: string;
  name: string;
  party: string;
  from: string;
};

export type SeneddSeat = {
  name: string;
  slug: string;
  members: SeneddMember[];
};

export type AssemblyMember = {
  personId: string;
  name: string;
  party: string;
};

export type AssemblySeat = {
  name: string;
  slug: string;
  members: AssemblyMember[];
};

type Level2File = {
  readOn: string;
  westminster: WestminsterSeat[];
  scottishConstituencies: SpConstituency[];
  scottishRegions: SpRegion[];
  senedd: SeneddSeat[];
  assembly: AssemblySeat[];
};

const data = rawJson as Level2File;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(data.readOn === "2026-10-18", "level2 readOn");
assert(data.westminster.length === 650, "westminster count");
assert(data.scottishConstituencies.length === 73, "scottish constituencies");
assert(data.scottishRegions.length === 8, "scottish regions");
assert(data.senedd.length === 16, "senedd");
assert(data.assembly.length === 18, "assembly");

const nationCounts = { england: 0, scotland: 0, wales: 0, "northern-ireland": 0 };
for (const seat of data.westminster) {
  nationCounts[seat.nation] += 1;
  assert(seat.boundaryStart === "2024-05-31", seat.name);
  assert(seat.statusDescription === "Current Member", seat.name);
}
assert(nationCounts.england === 543, "england seats");
assert(nationCounts.scotland === 57, "scotland seats");
assert(nationCounts.wales === 32, "wales seats");
assert(nationCounts["northern-ireland"] === 18, "ni seats");

for (const region of data.scottishRegions) {
  assert(region.members.length === 7, region.name);
  assert(region.start === "2026-05-06", region.name);
}
for (const seat of data.scottishConstituencies) {
  assert(seat.validFrom === "2026-05-07", seat.name);
  assert(seat.member.from === "2026-05-07", seat.name);
}
for (const seat of data.senedd) {
  assert(seat.members.length === 6, seat.name);
  for (const member of seat.members) assert(member.from === "2026-05-08", seat.name);
}
for (const seat of data.assembly) {
  assert(seat.members.length === 5, seat.name);
}

export const LEVEL2_READ_ON = data.readOn;

export const NATION_NAME: Record<NationSlug, string> = {
  england: "England",
  scotland: "Scotland",
  wales: "Wales",
  "northern-ireland": "Northern Ireland",
};

export const MSP_DIRECTORY = "https://www.parliament.scot/msps/current-and-previous-msps/";
export const SENEDD_FIND = "https://senedd.wales/find-a-member-of-the-senedd/";

export const CONSTITUENCY_HUB = "/gb/en/constituencies/";
export const WESTMINSTER_INDEX = "/gb/en/westminster/";
export const SCOTTISH_PARLIAMENT_INDEX = "/gb/en/scotland/scottish-parliament/";
export const SENEDD_INDEX = "/gb/en/wales/senedd/";
export const ASSEMBLY_INDEX = "/gb/en/northern-ireland/assembly/";

export function westminsterNationIndex(nation: NationSlug): string {
  return `/gb/en/${nation}/westminster/`;
}

export function mpProfile(memberId: number): string {
  return `https://members.parliament.uk/member/${memberId}/overview`;
}

export function westminsterSeatPath(seat: WestminsterSeat): string {
  return `/gb/en/${seat.nation}/westminster/${seat.slug}/`;
}

export function spConstituencyPath(seat: SpConstituency): string {
  return `/gb/en/scotland/scottish-parliament/constituencies/${seat.slug}/`;
}

export function spRegionPath(region: SpRegion): string {
  return `/gb/en/scotland/scottish-parliament/regions/${region.slug}/`;
}

export function seneddPath(seat: SeneddSeat): string {
  return `/gb/en/wales/senedd/${seat.slug}/`;
}

export function assemblyPath(seat: AssemblySeat): string {
  return `/gb/en/northern-ireland/assembly/${seat.slug}/`;
}

export const WESTMINSTER = data.westminster;
export const SCOTTISH_CONSTITUENCIES = data.scottishConstituencies;
export const SCOTTISH_REGIONS = data.scottishRegions;
export const SENEDD = data.senedd;
export const ASSEMBLY = data.assembly;

export function westminsterIn(nation: NationSlug): WestminsterSeat[] {
  return WESTMINSTER.filter((seat) => seat.nation === nation);
}

export function constituenciesInRegion(regionSlug: string): SpConstituency[] {
  return SCOTTISH_CONSTITUENCIES.filter((seat) => seat.regionSlug === regionSlug);
}

export type Level2SearchRow = {
  path: string;
  title: string;
  kind: string;
  text: string;
};

export function gbLevel2SearchEntries(): Level2SearchRow[] {
  const rows: Level2SearchRow[] = [
    {
      path: CONSTITUENCY_HUB,
      title: "Constituencies",
      kind: "index",
      text: "Westminster Scottish Parliament Senedd Northern Ireland Assembly constituencies",
    },
    {
      path: WESTMINSTER_INDEX,
      title: "Westminster constituencies",
      kind: "index",
      text: "House of Commons 650 constituencies 2024 boundaries",
    },
    {
      path: SCOTTISH_PARLIAMENT_INDEX,
      title: "Scottish Parliament constituencies and regions",
      kind: "index",
      text: "Scottish Parliament 73 constituencies 8 regions MSP",
    },
    {
      path: SENEDD_INDEX,
      title: "Senedd constituencies",
      kind: "index",
      text: "Senedd 2026 constituencies Members of the Senedd",
    },
    {
      path: ASSEMBLY_INDEX,
      title: "Northern Ireland Assembly constituencies",
      kind: "index",
      text: "Northern Ireland Assembly MLA constituencies",
    },
  ];
  for (const nation of ["england", "scotland", "wales", "northern-ireland"] as const) {
    rows.push({
      path: westminsterNationIndex(nation),
      title: `Westminster constituencies in ${NATION_NAME[nation]}`,
      kind: "index",
      text: `${NATION_NAME[nation]} Westminster House of Commons`,
    });
  }
  for (const seat of WESTMINSTER) {
    rows.push({
      path: westminsterSeatPath(seat),
      title: seat.name,
      kind: "constituency",
      text: `${seat.name} ${seat.fullTitle} ${seat.party} ${seat.gss} ${NATION_NAME[seat.nation]} Westminster`,
    });
  }
  for (const seat of SCOTTISH_CONSTITUENCIES) {
    rows.push({
      path: spConstituencyPath(seat),
      title: seat.name,
      kind: "constituency",
      text: `${seat.name} ${seat.member.displayName} ${seat.member.party} Scottish Parliament ${seat.regionName}`,
    });
  }
  for (const region of SCOTTISH_REGIONS) {
    rows.push({
      path: spRegionPath(region),
      title: region.name,
      kind: "region",
      text: `${region.name} Scottish Parliament region ${region.members.map((member) => member.displayName).join(" ")}`,
    });
  }
  for (const seat of SENEDD) {
    rows.push({
      path: seneddPath(seat),
      title: seat.name,
      kind: "constituency",
      text: `${seat.name} Senedd ${seat.members.map((member) => `${member.name} ${member.party}`).join(" ")}`,
    });
  }
  for (const seat of ASSEMBLY) {
    rows.push({
      path: assemblyPath(seat),
      title: seat.name,
      kind: "constituency",
      text: `${seat.name} Northern Ireland Assembly ${seat.members.map((member) => `${member.name} ${member.party}`).join(" ")}`,
    });
  }
  return rows;
}
