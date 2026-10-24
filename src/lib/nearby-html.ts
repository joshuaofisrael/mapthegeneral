import nearbyJson from "../data/place-nearby.json";

const NEARBY = nearbyJson as Record<string, string[]>;

const COPY: Record<string, { label: string; note: string }> = {
  en: { label: "Nearby places", note: "Other places in the same official area." },
  es: { label: "Lugares cercanos", note: "Otros lugares de la misma zona oficial." },
  fr: { label: "Lieux à proximité", note: "Autres lieux de la même zone officielle." },
  it: { label: "Luoghi vicini", note: "Altri luoghi della stessa area ufficiale." },
  pl: { label: "Pobliskie miejscowości", note: "Inne miejscowości w tej samej jednostce oficjalnej." },
  de: { label: "Nahe Orte", note: "Andere Orte im selben amtlichen Gebiet." },
};

export function nearbyIds(key: string): string[] {
  return NEARBY[key] ?? [];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Links chosen by scripts/build-place-neighbors.py. Empty when this place has no row. */
export function nearbyPlacesParagraph(lang: string, links: { href: string; name: string }[]): string {
  if (links.length === 0) return "";
  const copy = COPY[lang] ?? COPY.en;
  const body = links
    .map((link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.name)}</a>`)
    .join(" · ");
  return `<p class="tools">${escapeHtml(copy.label)}: ${escapeHtml(copy.note)} ${body}</p>`;
}
