// Runs the legal-hold gate on a file that a generator is about to publish.
// A refusal throws. Callers must not write the destination, and must not
// treat the refusal as a retry that can skip the gate.
import { spawnSync } from "node:child_process";
import { unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export class LegalHoldError extends Error {
  constructor(file) {
    super(`legal-hold gate refused to publish ${file}`);
    this.name = "LegalHoldError";
    this.legalHold = true;
  }
}

/** Check the exact bytes in `file`. Optional draftPath is the path recorded in the hold queue. */
export function assertPublishable(file, draftPath) {
  const script = path.join(ROOT, "scripts", "check-legal-hold.ts");
  const args = ["--experimental-strip-types", "--no-warnings", script, "--paths", file];
  if (draftPath) args.push("--draft-path", draftPath);
  const result = spawnSync(process.execPath, args, { cwd: ROOT, encoding: "utf8" });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error || result.status !== 0) throw new LegalHoldError(draftPath || file);
}

/** Write `body` to `file` only after the gate accepts those exact bytes. */
export function publishFile(file, body) {
  const tmp = path.join(tmpdir(), `legal-hold-${process.pid}-${Date.now()}.json`);
  writeFileSync(tmp, body);
  try {
    assertPublishable(tmp, file);
  } finally {
    try {
      unlinkSync(tmp);
    } catch {
      /* already gone */
    }
  }
  writeFileSync(file, body);
}
