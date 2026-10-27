import { feedPath, nightById, nightOpensAt, rawFeedUrl, snapshotPath, type NightCopy } from "../data/election-night";
import { RELEASE_POLICIES } from "../data/election-policy";
import { pollingExtended, votingEndedConfirmed } from "../data/release-status";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attrs(id: string, lang: string, copy: NightCopy): string {
  const night = nightById(id);
  if (!night) return "";
  const pairs: [string, string][] = [
    ["data-night-id", id],
    ["data-opens", nightOpensAt(id)],
    ["data-tz", night.timeZone],
    ["data-requires-confirmation", RELEASE_POLICIES[id]?.requiresEndOfVotingConfirmation ? "true" : "false"],
    ["data-voting-ended", votingEndedConfirmed(id) ? "true" : "false"],
    ["data-polling-extended", pollingExtended(id) ? "true" : "false"],
    ["data-feed", feedPath(id)],
    ["data-raw", rawFeedUrl(id)],
    ["data-snapshot", snapshotPath(id)],
    ["data-source-href", night.sourceHref],
    ["data-source-label", copy.sourceLabel],
    ["data-countdown", copy.countdown],
    ["data-countdown-note", copy.countdownNote],
    ["data-awaiting", copy.awaiting],
    ["data-preliminary", copy.preliminary],
    ["data-final", copy.final],
    ["data-note", copy.note],
    ["data-updated", copy.updated],
    ["data-fetched", copy.fetched],
    ["data-tz-label", copy.tzLabel],
    ["data-stale", copy.stale],
    ["data-stale-empty", copy.staleEmpty],
    ["data-col-name", copy.colName],
    ["data-col-votes", copy.colVotes],
    ["data-col-share", copy.colShare],
    ["data-units", copy.units],
    ["data-locale", lang === "en" ? "en-GB" : lang],
  ];
  return pairs.map(([key, value]) => `${key}="${esc(value)}"`).join(" ");
}

/** Results mount for a static election page. Empty when that language has no night copy. */
export function nightSectionHtml(id: string, lang: string): string {
  const night = nightById(id);
  const copy = night?.pages[lang];
  if (!night || !copy) return "";
  return `<section id="results" ${attrs(id, lang, copy)}>
<h2>${esc(copy.heading)}</h2>
<div data-night-root></div>
<noscript><p>${esc(copy.noscript)} <a href="${esc(night.sourceHref)}">${esc(copy.sourceLabel)}</a>.</p></noscript>
</section>
<script src="/election-night.js" defer></script>
`;
}
