/**
 * Sitemap lastmod from git history, with the build date when a source file
 * is new or dirty. The sitemap index uses the build date because the index
 * itself is regenerated on every build.
 */

export function buildDateIso(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function publicIndexRel(urlPath: string): string {
  if (urlPath === "/") return "public/index.html";
  const rel = urlPath.replace(/^\/+/, "").replace(/\/+$/, "");
  return `public/${rel}/index.html`;
}

/** Most specific `src/app/.../page.tsx` that matches a public path. */
export function matchAppPage(urlPath: string, pageFiles: string[]): string | null {
  const want = urlPath.replace(/\/+$/, "").split("/").filter(Boolean);
  let best: { file: string; score: number } | null = null;
  for (const file of pageFiles) {
    const normalized = file.replace(/\\/g, "/");
    const rel = normalized.replace(/^src\/app\//, "").replace(/(?:^|\/)page\.tsx$/, "");
    const segs = rel ? rel.split("/").filter(Boolean) : [];
    if (segs.length !== want.length) continue;
    let score = 0;
    let ok = true;
    for (let i = 0; i < segs.length; i++) {
      const seg = segs[i];
      if (seg.startsWith("(") && seg.endsWith(")")) {
        ok = false;
        break;
      }
      if (seg.startsWith("[") && seg.endsWith("]")) score += 1;
      else if (seg === want[i]) score += 10;
      else {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    if (!best || score > best.score) best = { file: normalized, score };
  }
  return best?.file ?? null;
}

/**
 * Data and scripts that generate pages which are not stored as HTML.
 * lastmod for those URLs is the newest commit of these files.
 */
export function generatedSourceFiles(urlPath: string): string[] {
  if (urlPath.startsWith("/es/")) return ["src/data/spain/municipalities.json", "scripts/render-municipalities.ts"];
  if (urlPath.startsWith("/ca/")) return ["src/data/ca/municipalities.json", "src/data/ca/level3.ts", "scripts/render-ca-level3.ts"];
  if (urlPath.startsWith("/it/")) {
    return ["src/data/italy/comuni-public.json", "src/data/italy/level2.json", "scripts/render-italy-comuni.ts", "scripts/render-italy-level2.ts"];
  }
  if (urlPath.startsWith("/mx/")) {
    return ["src/data/mx/municipios.json", "src/data/mx/distritos.json", "scripts/render-mx-municipios.ts", "scripts/render-mx-distritos.ts"];
  }
  return [];
}

export function sourceFilesForPath(urlPath: string, pageFiles: string[], publicExists: (rel: string) => boolean): string[] {
  const files: string[] = [];
  const pub = publicIndexRel(urlPath);
  if (publicExists(pub)) files.push(pub);
  const app = matchAppPage(urlPath, pageFiles);
  if (app) files.push(app);
  if (files.length === 0) files.push(...generatedSourceFiles(urlPath));
  return files;
}

export function resolveLastmod(input: {
  files: string[];
  gitDates: ReadonlyMap<string, string>;
  dirty: ReadonlySet<string>;
  buildDate: string;
}): string {
  let best = "";
  let dirtyHit = false;
  for (const file of input.files) {
    if (input.dirty.has(file)) dirtyHit = true;
    const dated = input.gitDates.get(file);
    if (dated && dated > best) best = dated;
  }
  if (dirtyHit || !best) return input.buildDate > best ? input.buildDate : best || input.buildDate;
  return best;
}
