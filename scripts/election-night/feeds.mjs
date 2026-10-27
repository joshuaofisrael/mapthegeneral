/**
 * Official-results hosts the election-night fetcher may read.
 * Paths are /il-live/<id>/results.json on the existing il-live worker prefix.
 * Israel stays on scripts/il-live and is not in this list.
 */
export const RAW_REPO = "https://raw.githubusercontent.com/joshuaofisrael/mapthegeneral/il-live-data";

export const FEEDS = [
  {
    id: "bg-2026-11-01",
    officialUrl: "https://results.cik.bg/",
    hosts: ["results.cik.bg"],
    preserveSnapshot: true,
  },
  {
    id: "ie-2026-seanad",
    officialUrl: "https://www.oireachtas.ie/en/elections/",
    hosts: ["oireachtas.ie", "data.oireachtas.ie"],
  },
  {
    id: "it-2026-chieti",
    officialUrl: "https://elezioni.interno.gov.it/",
    hosts: ["elezioni.interno.gov.it"],
  },
  {
    id: "pl-2026-senat-20",
    officialUrl: "https://wybory.gov.pl/",
    hosts: ["wybory.gov.pl"],
  },
  {
    id: "au-vic-2026",
    officialUrl: "https://www.vec.vic.gov.au/results",
    hosts: ["vec.vic.gov.au"],
  },
  {
    id: "es-2026-generales",
    officialUrl: "https://www.infoelectoral.interior.gob.es/",
    hosts: ["infoelectoral.interior.gob.es"],
  },
  {
    id: "ch-2026-11-29",
    officialUrl: "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html",
    hosts: ["bfs.admin.ch"],
  },
];

export function feedById(id) {
  return FEEDS.find((feed) => feed.id === id) ?? null;
}

export function hostAllowed(hostname, hosts) {
  const host = String(hostname).replace(/^www\./, "").toLowerCase();
  return hosts.some((allowed) => {
    const name = allowed.replace(/^www\./, "").toLowerCase();
    return host === name || host.endsWith(`.${name}`);
  });
}
