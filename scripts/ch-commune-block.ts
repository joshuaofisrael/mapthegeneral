import { communesForParent, type Commune } from "../data/ch/communes";
import { communePath, communesIndexPath } from "../data/ch/search";
import type { ChLang } from "../data/ch/types";
import { ui } from "../data/ch/ui";

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function communeHeading(lang: ChLang): string {
  if (lang === "de") return "Politische Gemeinden";
  if (lang === "fr") return "Communes politiques";
  if (lang === "it") return "Comuni politici";
  return "Political municipalities";
}

/** District pages outside this chunk. Replaces the old release-wide gap sentence. */
export function districtCommuneLater(lang: ChLang): string {
  if (lang === "de") {
    return "Gemeindeseiten dieses Bezirks folgen in einer späteren Ausgabe. Die Zahl der politischen Gemeinden steht im amtlichen Gemeindeverzeichnis.";
  }
  if (lang === "fr") {
    return "Les pages des communes de ce district suivent dans une édition ultérieure. Le chiffre des communes politiques figure dans le répertoire officiel des communes.";
  }
  if (lang === "it") {
    return "Le pagine dei comuni di questo distretto seguono in un’edizione successiva. La cifra dei comuni politici sta nel repertorio ufficiale dei comuni.";
  }
  return "Municipality pages for this district are left for a later release. The count of political municipalities is in the official commune register.";
}

export function communeListMarkup(lang: ChLang, cantonSlug: string, districtSlug: string, list: Commune[]): string {
  const index = communesIndexPath(lang, cantonSlug, districtSlug);
  const items = list
    .map(
      (commune) =>
        `<li><a href="${esc(communePath(lang, cantonSlug, districtSlug, commune.slug))}">${esc(commune.name)}</a> · ${esc(commune.bfs)}</li>`,
    )
    .join("");
  const note =
    lang === "de"
      ? "Namen und BFS-Nummern aus 20260101_GDEHist_GDE.txt, Stand 1. Januar 2026. Kopie vom 19. Oktober 2026."
      : lang === "fr"
        ? "Noms et numéros OFS tirés de 20260101_GDEHist_GDE.txt, état au 1er janvier 2026. Copie du 19 octobre 2026."
        : lang === "it"
          ? "Nomi e numeri UST da 20260101_GDEHist_GDE.txt, stato al 1° gennaio 2026. Copia del 19 ottobre 2026."
          : "Names and FSO numbers from 20260101_GDEHist_GDE.txt, state at 1 January 2026. Copied on 19 October 2026.";
  return `<h2><a href="${esc(index)}">${esc(communeHeading(lang))}</a></h2><ul>${items}</ul><p>${esc(note)}</p>`;
}

export function publishedCommuneBlock(lang: ChLang, cantonSlug: string, cantonAbbr: string, districtSlug: string): string | null {
  const list = communesForParent(cantonAbbr, districtSlug);
  if (list.length === 0) return null;
  return communeListMarkup(lang, cantonSlug, districtSlug, list);
}

export function oldCommuneGapParagraph(lang: ChLang): string {
  const copy = ui(lang);
  return `<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(copy.districtGap)}</p>`;
}

export function laterCommuneGapParagraph(lang: ChLang): string {
  const copy = ui(lang);
  return `<p class="gap"><strong>${esc(copy.gap)}.</strong> ${esc(districtCommuneLater(lang))}</p>`;
}
