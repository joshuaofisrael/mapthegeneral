import { loadCandidateList, profileHref } from "@/lib/candidate-list";

const lists = new Map<string, ReturnType<typeof loadCandidateList>>();

function listFor(id: string) {
  const cached = lists.get(id);
  if (cached) return cached;
  const loaded = loadCandidateList(id);
  lists.set(id, loaded);
  return loaded;
}

/**
 * Renders one named candidate from a candidate-list file.
 * The name links only when that file has a verified profile URL.
 */
export function VerifiedCandidate({ listId, name }: { listId: string; name: string }) {
  const row = listFor(listId).candidates.find((candidate) => candidate.name === name);
  if (!row) return name;
  const label = `${row.name} (${row.committee})`;
  const href = profileHref(row);
  if (!href) return label;
  return (
    <a href={href} rel="nofollow noopener" target="_blank">
      {label}
    </a>
  );
}
