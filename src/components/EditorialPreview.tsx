import { editorialPreviewHtml } from "@/data/editorial/html";
import { previewByPath } from "@/data/editorial";

/**
 * Renders the shared preview. The HTML helper is the single markup path so
 * the React page and the static election export cannot drift.
 */
export function EditorialPreview({ path }: { path: string }) {
  const html = editorialPreviewHtml(previewByPath(path));
  if (!html) return null;
  return <div className="prose-legal" dangerouslySetInnerHTML={{ __html: html }} />;
}
