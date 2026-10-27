import { EDITORIAL_BYLINE, EDITORIAL_UPDATED, type EditorialPreview } from "./model";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Static HTML for election pages rendered outside React. Empty when no preview exists. */
export function editorialPreviewHtml(item: EditorialPreview | undefined): string {
  if (!item) return "";
  const dir = item.dir ? ` dir="${item.dir}"` : "";
  const local = item.updatedLocal ? `<strong>${esc(item.updatedLocal)}</strong> ` : "";
  const paragraphs = item.paragraphs.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("\n");
  const sources = item.citations
    .map(
      (cite) =>
        `<li><a href="${esc(cite.href)}" rel="noopener noreferrer">${esc(cite.label)}</a></li>`,
    )
    .join("\n");
  return `<section id="editorial-preview" lang="${esc(item.lang)}"${dir}>
<p class="eyebrow">${esc(item.heading)}</p>
<p>${local}<strong lang="en">${esc(EDITORIAL_UPDATED)}</strong> <span lang="en">${esc(EDITORIAL_BYLINE)}</span>.</p>
${paragraphs}
<h2>${esc(item.sourcesHeading)}</h2>
<ul>
${sources}
</ul>
</section>
`;
}
