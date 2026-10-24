/**
 * Sitemap lastmod from git history, with the build date when a source file
 * is new or dirty. The sitemap index uses the build date because the index
 * itself is regenerated on every build.
 *
 * A depth-1 checkout (`git rev-parse --is-shallow-repository` or a failed
 * `git log`) dates every file with the tip commit, so those dates are not
 * used. Pages generated or changed in the build then take the build date,
 * election pages take the registry lastmod, and other pages keep the
 * lastmod already written in the sitemap.
 */
import { execFileSync } from "node:child_process";

export function buildDateIso(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function gitOutput(cwd: string, args: string[]): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

/** Newest commit date per path, from `git log --pretty=format:%cs --name-only`. */
export function parseGitDates(log: string): Map<string, string> {
  const dates = new Map<string, string>();
  let current = "";
  for (const line of log.split("\n")) {
    if (/^\d{4}-\d{2}-\d{2}$/.test(line)) {
      current = line;
      continue;
    }
    if (!line || !current || dates.has(line)) continue;
    dates.set(line, current);
  }
  return dates;
}

/**
 * False when this checkout is shallow or `git log` cannot be read.
 * A shallow log lists the whole tree under one commit, which is not
 * a per-page history.
 */
export function gitHistoryAvailable(cwd: string): boolean {
  try {
    const flag = gitOutput(cwd, ["rev-parse", "--is-shallow-repository"]).trim();
    if (flag === "true") return false;
  } catch {
    // rev-parse failed; the log probe below is the other signal.
  }
  try {
    gitOutput(cwd, ["log", "-1", "--pretty=format:%cs"]);
    return true;
  } catch {
    return false;
  }
}

export function loadGitFileDates(cwd: string): { available: boolean; dates: Map<string, string> } {
  if (!gitHistoryAvailable(cwd)) return { available: false, dates: new Map() };
  try {
    const out = gitOutput(cwd, ["log", "--pretty=format:%cs", "--name-only"]);
    return { available: true, dates: parseGitDates(out) };
  } catch {
    return { available: false, dates: new Map() };
  }
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
  /** False for a shallow clone or a failed `git log`. Defaults to true. */
  historyAvailable?: boolean;
  /** Registry date for this URL, when the election page names one. */
  explicit?: string;
  /** Lastmod already published for this URL. Used only when history is missing. */
  previous?: string;
}): string {
  const historyAvailable = input.historyAvailable !== false;
  let dirtyHit = false;
  let best = "";
  for (const file of input.files) {
    if (input.dirty.has(file)) dirtyHit = true;
    if (!historyAvailable) continue;
    const dated = input.gitDates.get(file);
    if (dated && dated > best) best = dated;
  }
  const generated = input.files.length === 0;

  if (!historyAvailable) {
    if (dirtyHit || generated) return input.explicit && input.explicit > input.buildDate ? input.explicit : input.buildDate;
    if (input.explicit) return input.explicit;
    if (input.previous) return input.previous;
    return input.buildDate;
  }

  const resolved = dirtyHit || !best ? (input.buildDate > best ? input.buildDate : best || input.buildDate) : best;
  if (input.explicit && input.explicit > resolved) return input.explicit;
  return resolved;
}
