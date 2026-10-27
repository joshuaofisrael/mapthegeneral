/**
 * Manual publication switches. A missing row is not a confirmation.
 * `votingEnded` must be exactly true before a window that requires it can open.
 * `pollingExtended` true keeps that window closed. A failed feed is not a row
 * here: fetchers and pages treat a failed or stale feed as closed.
 */
import raw from "../../data/release-status.json";

export type ReleaseRow = {
  votingEnded?: boolean;
  pollingExtended?: boolean;
};

const rows = raw as Record<string, ReleaseRow>;

export function releaseRow(id: string): ReleaseRow | null {
  const row = rows[id];
  return row && typeof row === "object" ? row : null;
}

export function votingEndedConfirmed(id: string): boolean {
  return releaseRow(id)?.votingEnded === true;
}

export function pollingExtended(id: string): boolean {
  return releaseRow(id)?.pollingExtended === true;
}
