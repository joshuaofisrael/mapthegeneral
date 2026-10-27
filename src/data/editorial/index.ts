import { BATCH1 } from "./batch1";
import { BATCH1B } from "./batch1b";
import { BATCH2 } from "./batch2";
import { BATCH2B } from "./batch2b";
import { BATCH2C } from "./batch2c";
import type { EditorialPreview } from "./model";

export const EDITORIAL_PREVIEWS: EditorialPreview[] = [...BATCH1, ...BATCH1B, ...BATCH2, ...BATCH2B, ...BATCH2C];

const byPath = new Map<string, EditorialPreview>();
for (const item of EDITORIAL_PREVIEWS) {
  if (byPath.has(item.path)) throw new Error(`duplicate editorial preview: ${item.path}`);
  byPath.set(item.path, item);
}

export function previewByPath(path: string): EditorialPreview | undefined {
  if (path === "/") return byPath.get("/");
  const normalized = path.endsWith("/") ? path : `${path}/`;
  return byPath.get(normalized);
}

export function hubPreviewPath(code: string, lang: string): string {
  return `/${code}/${lang}/`;
}
