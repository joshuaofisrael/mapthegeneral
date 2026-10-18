import { notFound } from "next/navigation";
import type { KrLang } from "./types";

export const KR_LANGS: KrLang[] = ["ko", "en"];

export function asKrLang(value: string): KrLang {
  if (value !== "ko" && value !== "en") notFound();
  return value;
}

export function krRoot(): string {
  return "/kr/";
}

export function krHome(lang: KrLang): string {
  return `/kr/${lang}/`;
}

export function regionPath(lang: KrLang, slug: string): string {
  return `/kr/${lang}/${slug}/`;
}

export const NA_ELECTION_SLUG = "national-assembly-2028";

export function electionsPath(lang: KrLang): string {
  return `${krHome(lang)}elections/`;
}

export function naElectionPath(lang: KrLang): string {
  return `${electionsPath(lang)}${NA_ELECTION_SLUG}/`;
}

export function sectionPath(lang: KrLang, section: string): string {
  return `${krHome(lang)}${section}/`;
}

export function localIndexPath(lang: KrLang): string {
  return `${krHome(lang)}local/`;
}

export function localPath(lang: KrLang, region: string, slug: string): string {
  return `${regionPath(lang, region)}${slug}/`;
}

export function constituencyIndexPath(lang: KrLang): string {
  return `${krHome(lang)}constituencies/`;
}

export function constituencyPath(lang: KrLang, slug: string): string {
  return `${constituencyIndexPath(lang)}${slug}/`;
}

export function otherLang(lang: KrLang): KrLang {
  return lang === "ko" ? "en" : "ko";
}

export function swapKrLang(path: string, lang: KrLang): string {
  if (path.startsWith("/kr/ko/") || path.startsWith("/kr/en/")) {
    return path.replace(/^\/kr\/(ko|en)\//, `/kr/${lang}/`);
  }
  return path;
}

export function formatKrNumber(value: number, lang: KrLang): string {
  return new Intl.NumberFormat(lang === "ko" ? "ko-KR" : "en-US").format(value);
}

export function formatKrDate(iso: string, lang: KrLang): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === "ko" ? "ko-KR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function officeHref(host: string): string {
  return `https://${host}/`;
}
