/** Offset of an IANA zone at an instant, as `+HH:MM` / `-HH:MM`. DST is included. */
export function ianaOffset(timeZone: string, ms: number): string | null {
  if (!Number.isFinite(ms)) return null;
  let name = "";
  try {
    name =
      new Intl.DateTimeFormat("en-US", {
        timeZone,
        timeZoneName: "longOffset",
        hour: "2-digit",
      })
        .formatToParts(new Date(ms))
        .find((part) => part.type === "timeZoneName")?.value ?? "";
  } catch {
    return null;
  }
  if (name === "GMT") return "+00:00";
  const match = name.match(/^GMT([+-])(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return null;
  return `${match[1]}${match[2].padStart(2, "0")}:${match[3] ?? "00"}`;
}

export function isoOffset(iso: string): string | null {
  const match = iso.match(/([+-]\d{2}:\d{2})$/);
  return match ? match[1] : null;
}

/** True when the ISO offset is the zone's offset at that instant. */
export function offsetMatchesZone(iso: string, timeZone: string): boolean {
  const written = isoOffset(iso);
  const zoned = ianaOffset(timeZone, Date.parse(iso));
  return written != null && written === zoned;
}
