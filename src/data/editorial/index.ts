import { BATCH1 } from "./batch1";
import { BATCH1B } from "./batch1b";
import { BATCH2 } from "./batch2";
import { BATCH2B } from "./batch2b";
import { BATCH2C } from "./batch2c";
import { BATCH3A } from "./batch3a";
import { BATCH3B } from "./batch3b";
import { BATCH3C } from "./batch3c";
import { BATCH3D } from "./batch3d";
import { BATCH4 } from "./batch4";
import { BATCH5 } from "./batch5";
import { BATCH_EE } from "./batch-ee";
import { BATCH_FI } from "./batch-fi";
import { BATCH_NL } from "./batch-nl";
import { BATCH_TW } from "./batch-tw";
import type { EditorialPreview } from "./model";

export const EDITORIAL_PREVIEWS: EditorialPreview[] = [
  ...BATCH1,
  ...BATCH1B,
  ...BATCH2,
  ...BATCH2B,
  ...BATCH2C,
  ...BATCH3A,
  ...BATCH3B,
  ...BATCH3C,
  ...BATCH3D,
  ...BATCH4,
  ...BATCH5,
  ...BATCH_TW,
  ...BATCH_EE,
  ...BATCH_NL,
  ...BATCH_FI,
];

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
