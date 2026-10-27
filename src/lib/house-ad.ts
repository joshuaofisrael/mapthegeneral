/**
 * One static house ad per exported page, placed under the header.
 * The offer is chosen at build time from an FNV-1a hash of the page path:
 * 3/5 NamedScan, 2/5 RankFootprint. NamedScan copy is what that site published
 * on 27 October 2026. RankFootprint's line is the $1 sample scan, the same
 * words in every language. The card loads no image or script, and it keeps
 * a reserved height.
 */

export const HOUSE_AD_IDS = ["namedscan", "rankfootprint"] as const;
export type HouseAdId = (typeof HOUSE_AD_IDS)[number];

export const HOUSE_AD_LANGS = ["en", "es", "fr", "de", "it", "pl", "pt", "he", "sr", "bg", "et", "nl", "fi"] as const;
export type HouseAdLang = (typeof HOUSE_AD_LANGS)[number];

export const HOUSE_ADS: Record<HouseAdId, { name: string; origin: string }> = {
  namedscan: { name: "NamedScan", origin: "https://namedscan.com/" },
  rankfootprint: { name: "RankFootprint", origin: "https://rankfootprint.com/" },
};

/** Page languages plus Swiss locales and the other site languages. */
export const RANKFOOTPRINT_LANGS = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pl",
  "pt",
  "he",
  "sr",
  "bg",
  "de-CH",
  "fr-CH",
  "it-CH",
  "sv",
  "no",
  "zh",
  "et",
  "nl",
  "fi",
] as const;
export type RankfootprintLang = (typeof RANKFOOTPRINT_LANGS)[number];

type RankLine = { pitch: string; cta: string };

/** Exact RankFootprint headline. Same words in every language. */
const RANKFOOTPRINT_PITCH = "$1 Google Maps rank sample scan";

function rankPaid(cta: string): RankLine {
  return { pitch: RANKFOOTPRINT_PITCH, cta };
}

/** Static HTML. Free-scan wording must not appear here. */
const RANK_PAID: Record<RankfootprintLang, RankLine> = {
  en: rankPaid("Get the $1 sample scan"),
  es: rankPaid("Consigue el escaneo de muestra de $1"),
  fr: rankPaid("Obtenir le scan d’échantillon à $1"),
  de: rankPaid("Beispielscan für $1 holen"),
  it: rankPaid("Ottieni la scansione campione da $1"),
  pl: rankPaid("Weź próbny skan za $1"),
  pt: rankPaid("Obtenha a varredura de amostra de $1"),
  he: rankPaid("קבלו את סריקת הדגימה ב-$1"),
  sr: rankPaid("Uzmite uzorak skeniranja za $1"),
  bg: rankPaid("Вземете примерното сканиране за $1"),
  "de-CH": rankPaid("Beispielscan für $1 holen"),
  "fr-CH": rankPaid("Obtenir l’échantillon à $1"),
  "it-CH": rankPaid("Ottieni la scansione campione da $1"),
  sv: rankPaid("Hämta provskanningen för $1"),
  no: rankPaid("Få prøveskanningen for $1"),
  zh: rankPaid("取得 $1 樣本掃描"),
  et: rankPaid("Hangi $1 näidisskaneering"),
  nl: rankPaid("Haal de proefscan van $1"),
  fi: rankPaid("Hanki $1:n näyteskannaus"),
};

const RANK_SPONSOR_EXTRA: Record<"sv" | "no" | "zh" | "et" | "nl" | "fi", string> = {
  sv: "Sponsrad av RankFootprint",
  no: "Sponset av RankFootprint",
  zh: "由 RankFootprint 贊助",
  et: "Sponsoreeritud: RankFootprint",
  nl: "Gesponsord door RankFootprint",
  fi: "RankFootprintin sponsoroima",
};

const FREE_SCAN_MARKERS = [
  "free scan",
  "free sample",
  "free 3",
  "try the free",
  "gratis",
  "gratuit",
  "kostenlos",
  "darmow",
  "bezpłat",
  "bezplat",
  "grátis",
  "חינם",
  "חינמ",
  "besplat",
  "безплат",
  "免費",
  "tasuta",
  "maksuton",
];

/** First free-scan phrase in `text`, or null. Case-insensitive. */
export function freeScanMarker(text: string): string | null {
  const hay = text.toLowerCase();
  for (const marker of FREE_SCAN_MARKERS) {
    if (hay.includes(marker.toLowerCase())) return marker;
  }
  return null;
}

type AdCopy = {
  sponsored: (name: string) => string;
  pitch: Record<HouseAdId, string>;
  cta: Record<HouseAdId, string>;
};

const COPY: Record<HouseAdLang, AdCopy> = {
  en: {
    sponsored: (name) => `Sponsored by ${name}`,
    pitch: {
      namedscan:
        "Find out whether ChatGPT names your local business when customers ask. NamedScan runs those questions with live web search and shows who gets recommended, plus what to fix first.",
      rankfootprint: RANK_PAID.en.pitch,
    },
    cta: {
      namedscan: "Try NamedScan",
      rankfootprint: RANK_PAID.en.cta,
    },
  },
  es: {
    sponsored: (name) => `Patrocinado por ${name}`,
    pitch: {
      namedscan:
        "Comprueba si ChatGPT nombra tu negocio local cuando los clientes preguntan. NamedScan hace esas preguntas con búsqueda web en vivo y muestra a quién recomienda y qué corregir primero.",
      rankfootprint: RANK_PAID.es.pitch,
    },
    cta: {
      namedscan: "Prueba NamedScan",
      rankfootprint: RANK_PAID.es.cta,
    },
  },
  fr: {
    sponsored: (name) => `Sponsorisé par ${name}`,
    pitch: {
      namedscan:
        "Voyez si ChatGPT cite votre commerce local lorsque des clients posent une question. NamedScan pose ces questions avec la recherche web en direct et montre qui est recommandé, ainsi que ce qu’il faut corriger en premier.",
      rankfootprint: RANK_PAID.fr.pitch,
    },
    cta: {
      namedscan: "Essayer NamedScan",
      rankfootprint: RANK_PAID.fr.cta,
    },
  },
  de: {
    sponsored: (name) => `Gesponsert von ${name}`,
    pitch: {
      namedscan:
        "Prüfen Sie, ob ChatGPT Ihr lokales Unternehmen nennt, wenn Kunden fragen. NamedScan stellt diese Fragen mit Live-Websuche und zeigt, wer empfohlen wird und was zuerst zu korrigieren ist.",
      rankfootprint: RANK_PAID.de.pitch,
    },
    cta: {
      namedscan: "NamedScan testen",
      rankfootprint: RANK_PAID.de.cta,
    },
  },
  it: {
    sponsored: (name) => `Sponsorizzato da ${name}`,
    pitch: {
      namedscan:
        "Scopri se ChatGPT cita la tua attività locale quando i clienti fanno una domanda. NamedScan pone quelle domande con la ricerca web dal vivo e mostra chi viene consigliato e cosa correggere per primo.",
      rankfootprint: RANK_PAID.it.pitch,
    },
    cta: {
      namedscan: "Prova NamedScan",
      rankfootprint: RANK_PAID.it.cta,
    },
  },
  pl: {
    sponsored: (name) => `Sponsorowane przez ${name}`,
    pitch: {
      namedscan:
        "Sprawdź, czy ChatGPT wymienia Twoją lokalną firmę, gdy klienci zadają pytanie. NamedScan zadaje te pytania z wyszukiwaniem w internecie na żywo i pokazuje, kogo poleca oraz co poprawić w pierwszej kolejności.",
      rankfootprint: RANK_PAID.pl.pitch,
    },
    cta: {
      namedscan: "Wypróbuj NamedScan",
      rankfootprint: RANK_PAID.pl.cta,
    },
  },
  pt: {
    sponsored: (name) => `Patrocinado por ${name}`,
    pitch: {
      namedscan:
        "Veja se o ChatGPT cita o seu negócio local quando clientes perguntam. A NamedScan faz essas perguntas com busca ao vivo na web e mostra quem é recomendado e o que corrigir primeiro.",
      rankfootprint: RANK_PAID.pt.pitch,
    },
    cta: {
      namedscan: "Experimente a NamedScan",
      rankfootprint: RANK_PAID.pt.cta,
    },
  },
  he: {
    sponsored: (name) => `ממומן על ידי ${name}`,
    pitch: {
      namedscan:
        "בדקו אם ChatGPT מזכיר את העסק המקומי שלכם כשלקוחות שואלים. NamedScan שולח את השאלות האלה עם חיפוש חי באינטרנט ומראה את מי ממליצים ומה כדאי לתקן קודם.",
      rankfootprint: RANK_PAID.he.pitch,
    },
    cta: {
      namedscan: "נסו את NamedScan",
      rankfootprint: RANK_PAID.he.cta,
    },
  },
  sr: {
    sponsored: (name) => `Sponzorisano od strane ${name}`,
    pitch: {
      namedscan:
        "Proverite da li ChatGPT imenuje vaš lokalni biznis kada kupci pitaju. NamedScan postavlja ta pitanja uz pretragu veba uživo i pokazuje koga preporučuje i šta prvo da ispravite.",
      rankfootprint: RANK_PAID.sr.pitch,
    },
    cta: {
      namedscan: "Isprobajte NamedScan",
      rankfootprint: RANK_PAID.sr.cta,
    },
  },
  bg: {
    sponsored: (name) => `Спонсорирано от ${name}`,
    pitch: {
      namedscan:
        "Разберете дали ChatGPT посочва местния ви бизнес, когато клиентите питат. NamedScan задава тези въпроси с търсене в интернет на живо и показва кого препоръчва и какво да поправите първо.",
      rankfootprint: RANK_PAID.bg.pitch,
    },
    cta: {
      namedscan: "Пробвайте NamedScan",
      rankfootprint: RANK_PAID.bg.cta,
    },
  },
  et: {
    sponsored: (name) => `Sponsoreerib ${name}`,
    pitch: {
      namedscan:
        "Vaadake, kas ChatGPT nimetab teie kohalikku ettevõtet, kui kliendid küsivad. NamedScan esitab need küsimused reaalajas veebiotsinguga ja näitab, keda soovitab ning mida esimesena parandada.",
      rankfootprint: RANK_PAID.et.pitch,
    },
    cta: {
      namedscan: "Proovige NamedScan",
      rankfootprint: RANK_PAID.et.cta,
    },
  },
  nl: {
    sponsored: (name) => `Gesponsord door ${name}`,
    pitch: {
      namedscan:
        "Kijk of ChatGPT uw lokale bedrijf noemt wanneer klanten een vraag stellen. NamedScan stelt die vragen met live zoeken op het web en laat zien wie wordt aanbevolen en wat eerst beter kan.",
      rankfootprint: RANK_PAID.nl.pitch,
    },
    cta: {
      namedscan: "Probeer NamedScan",
      rankfootprint: RANK_PAID.nl.cta,
    },
  },
  fi: {
    sponsored: (name) => `Sponsoroitu: ${name}`,
    pitch: {
      namedscan:
        "Katso, nimeääkö ChatGPT paikallisen yrityksenne, kun asiakkaat kysyvät. NamedScan esittää nämä kysymykset live-verkkohaulla ja näyttää, ketä se suosittelee ja mitä korjata ensin.",
      rankfootprint: RANK_PAID.fi.pitch,
    },
    cta: {
      namedscan: "Kokeile NamedScan",
      rankfootprint: RANK_PAID.fi.cta,
    },
  },
};

/** Phrases that must survive in each language, taken from the published offers. */
const REQUIRED: Record<HouseAdLang, Record<HouseAdId, string[]>> = {
  en: {
    namedscan: ["ChatGPT", "live web search", "what to fix first"],
    rankfootprint: ["$1"],
  },
  es: {
    namedscan: ["ChatGPT", "búsqueda web en vivo"],
    rankfootprint: ["$1"],
  },
  fr: {
    namedscan: ["ChatGPT", "recherche web en direct"],
    rankfootprint: ["$1"],
  },
  de: {
    namedscan: ["ChatGPT", "Live-Websuche"],
    rankfootprint: ["$1"],
  },
  it: {
    namedscan: ["ChatGPT", "ricerca web dal vivo"],
    rankfootprint: ["$1"],
  },
  pl: {
    namedscan: ["ChatGPT", "wyszukiwaniem w internecie na żywo"],
    rankfootprint: ["$1"],
  },
  pt: {
    namedscan: ["ChatGPT", "busca ao vivo na web"],
    rankfootprint: ["$1"],
  },
  he: {
    namedscan: ["ChatGPT", "חיפוש חי באינטרנט"],
    rankfootprint: ["$1"],
  },
  sr: {
    namedscan: ["ChatGPT", "pretragu veba uživo"],
    rankfootprint: ["$1"],
  },
  bg: {
    namedscan: ["ChatGPT", "търсене в интернет на живо"],
    rankfootprint: ["$1"],
  },
  et: {
    namedscan: ["ChatGPT", "reaalajas veebiotsinguga"],
    rankfootprint: ["$1"],
  },
  nl: {
    namedscan: ["ChatGPT", "live zoeken op het web"],
    rankfootprint: ["$1"],
  },
  fi: {
    namedscan: ["ChatGPT", "live-verkkohaulla"],
    rankfootprint: ["$1"],
  },
};

/**
 * Amber is outside the site navy and paper palette. #d97706 is 2.85:1 on the
 * header wash #eef3f8, short of the 3:1 non-text minimum, so the border is
 * #b45309 (4.5:1 on #eef3f8 and on the #fef3c7 fill). Ink #1a2332 on that
 * fill is 14.2:1. The sponsored label #78350f is 8.2:1. White on the button
 * #92400e is 7.1:1, and on the hover #78350f is 9.1:1. min-height stays 3rem
 * so the bar does not collapse or animate.
 */
export const HOUSE_AD_CSS = `.house-ad {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.45rem 0.85rem;
  width: 100%;
  max-width: 72rem;
  min-width: 0;
  min-height: 3rem;
  margin: 0 auto;
  padding: 0.65rem 1.25rem;
  border: 2px solid #b45309;
  border-radius: 0;
  background: #fef3c7;
  color: #1a2332;
  font-size: 0.92rem;
  line-height: 1.35;
  text-align: start;
  text-decoration: none;
}

.house-ad:visited {
  color: #1a2332;
}

.house-ad:hover,
.house-ad:focus-visible {
  border-color: #92400e;
  text-decoration: none;
}

.house-ad-kicker,
.house-ad:visited .house-ad-kicker {
  display: block;
  flex: 0 0 auto;
  margin: 0;
  color: #78350f;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.house-ad-copy,
.house-ad:visited .house-ad-copy {
  display: block;
  flex: 1 1 12rem;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: #1a2332;
  font-weight: 700;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.house-ad-btn,
.house-ad:visited .house-ad-btn {
  display: inline-block;
  flex: 0 0 auto;
  margin: 0;
  margin-inline-start: auto;
  padding: 0.45rem 0.95rem;
  border-radius: 0.45rem;
  background: #92400e;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
}

.house-ad:hover .house-ad-btn,
.house-ad:focus-visible .house-ad-btn {
  background: #78350f;
  color: #fff;
}

.house-ad-slot {
  display: contents;
}`;

const BANNED = [/joshua/i, /\bllc\b/i, /testimonial/i, /★/, /\d+\s*%/, /customers love/i, /guaranteed results/i];

export function houseAdHref(id: HouseAdId): string {
  const url = new URL(HOUSE_ADS[id].origin);
  url.searchParams.set("utm_source", "mapthegeneral");
  url.searchParams.set("utm_medium", "house_ad");
  url.searchParams.set("utm_campaign", id);
  return url.toString();
}

/** FNV-1a, 32-bit. Buckets 0–2 are NamedScan and 3–4 are RankFootprint, about 60/40. */
export function houseAdIdForRoute(route: string): HouseAdId {
  let hash = 2166136261;
  for (let i = 0; i < route.length; i++) {
    hash ^= route.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const bucket = (hash >>> 0) % 5;
  return bucket < 3 ? "namedscan" : "rankfootprint";
}

/**
 * Same rule as scripts/stamp-html-lang.mjs: the language is the second
 * path segment when that segment is one of the site languages.
 */
export function languageFromRoute(route: string): HouseAdLang {
  const parts = route.split("/").filter(Boolean);
  const candidate = parts.length >= 2 ? parts[1] : "";
  return isHouseAdLang(candidate) ? candidate : "en";
}

export function routeFromHtmlFile(rel: string): string {
  const norm = rel.split(/[/\\]/).join("/");
  // Next renders the not-found page at pathname /_not-found/ and writes both files.
  if (norm === "404.html" || norm === "404/index.html") return "/_not-found/";
  let route: string;
  if (norm === "index.html") route = "/";
  else if (norm.endsWith("/index.html")) route = `/${norm.slice(0, -"index.html".length)}`;
  else route = `/${norm.replace(/\.html$/, "")}`;
  if (!route.endsWith("/")) route = `${route}/`;
  return route.replace(/\/{2,}/g, "/");
}

export function pageLanguage(html: string): string | null {
  const match = html.match(/<html\b[^>]*\blang="([^"]+)"/i);
  if (!match) return null;
  const primary = match[1].toLowerCase().split("-")[0];
  return primary || null;
}

export function isHouseAdLang(lang: string | null): lang is HouseAdLang {
  return lang !== null && (HOUSE_AD_LANGS as readonly string[]).includes(lang);
}

/**
 * House-ad copy exists only for HOUSE_AD_LANGS. A document in another
 * language keeps the existing English card. A missing lang stays missing.
 */
export function houseAdLangForDocument(lang: string | null): HouseAdLang | null {
  if (lang === null) return null;
  return isHouseAdLang(lang) ? lang : "en";
}

export function isEmbedRoute(route: string): boolean {
  return route === "/il/embed/" || route.startsWith("/il/embed/");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rankSponsor(lang: RankfootprintLang): string {
  switch (lang) {
    case "de-CH":
      return COPY.de.sponsored("RankFootprint");
    case "fr-CH":
      return COPY.fr.sponsored("RankFootprint");
    case "it-CH":
      return COPY.it.sponsored("RankFootprint");
    case "sv":
    case "no":
    case "zh":
    case "et":
    case "nl":
    case "fi":
      return RANK_SPONSOR_EXTRA[lang];
    default:
      return COPY[lang].sponsored("RankFootprint");
  }
}

/** Swiss pages use the regional wording. Other pages use the language segment. */
export function rankfootprintLangForRoute(route: string): RankfootprintLang {
  const parts = route.split("/").filter(Boolean);
  const country = parts[0] ?? "";
  const segment = parts[1] ?? "";
  if (country === "ch" && segment === "de") return "de-CH";
  if (country === "ch" && segment === "fr") return "fr-CH";
  if (country === "ch" && segment === "it") return "it-CH";
  if (segment === "zh") return "zh";
  if (segment === "sv") return "sv";
  if (segment === "no" || segment === "nb" || segment === "nn") return "no";
  if (segment === "et") return "et";
  if (segment === "nl") return "nl";
  if (segment === "fi") return "fi";
  if ((RANKFOOTPRINT_LANGS as readonly string[]).includes(segment)) return segment as RankfootprintLang;
  return "en";
}

function renderRankfootprint(lang: RankfootprintLang): string {
  const paid = RANK_PAID[lang];
  return `<a class="house-ad" data-house-ad="rankfootprint" href="${escapeHtml(houseAdHref("rankfootprint"))}" rel="sponsored noopener" target="_blank"><span class="house-ad-kicker">${escapeHtml(rankSponsor(lang))}</span><span class="house-ad-copy">${escapeHtml(paid.pitch)}</span><span class="house-ad-btn">${escapeHtml(paid.cta)}</span></a>`;
}

/** The whole card is one anchor. The button is a span, so there is no nested link. */
export function renderHouseAd(id: HouseAdId, lang: HouseAdLang): string {
  if (id === "rankfootprint") return renderRankfootprint(lang);
  const ad = HOUSE_ADS[id];
  const copy = COPY[lang];
  return `<a class="house-ad" data-house-ad="${id}" href="${escapeHtml(houseAdHref(id))}" rel="sponsored noopener" target="_blank"><span class="house-ad-kicker">${escapeHtml(copy.sponsored(ad.name))}</span><span class="house-ad-copy">${escapeHtml(copy.pitch[id])}</span><span class="house-ad-btn">${escapeHtml(copy.cta[id])}</span></a>`;
}

export function houseAdHtml(route: string, lang: HouseAdLang): string {
  const id = houseAdIdForRoute(route);
  if (id === "rankfootprint") return renderRankfootprint(rankfootprintLangForRoute(route));
  return renderHouseAd(id, lang);
}

function sentenceCount(text: string): number {
  return text.match(/[.!?]/g)?.length ?? 0;
}

export function selfCheckHouseAds(): string[] {
  const problems: string[] = [];
  for (const lang of HOUSE_AD_LANGS) {
    const copy = COPY[lang];
    for (const id of HOUSE_AD_IDS) {
      const pitch = copy.pitch[id];
      const cta = copy.cta[id];
      const label = copy.sponsored(HOUSE_ADS[id].name);
      if (id !== "rankfootprint") {
        const sentences = sentenceCount(pitch);
        if (sentences !== 2) problems.push(`${lang} ${id}: pitch has ${sentences} sentence marks, expected 2`);
      }
      if (!label.includes(HOUSE_ADS[id].name)) problems.push(`${lang} ${id}: label dropped the site name`);
      if (label !== copy.sponsored(HOUSE_ADS[id].name)) problems.push(`${lang} ${id}: label drifted`);
      if (!cta.trim() || pitch.includes(cta)) problems.push(`${lang} ${id}: CTA missing or copied into the pitch`);
      for (const phrase of REQUIRED[lang][id]) {
        if (!pitch.includes(phrase) && !cta.includes(phrase)) problems.push(`${lang} ${id}: missing “${phrase}”`);
      }
      for (const pattern of BANNED) {
        if (pattern.test(pitch) || pattern.test(cta) || pattern.test(label)) {
          problems.push(`${lang} ${id}: banned phrase ${pattern}`);
        }
      }
      const html = renderHouseAd(id, lang);
      const inner = html.replace(/^<a\b[^>]*>/, "").replace(/<\/a>$/, "");
      if (!html.startsWith("<a ") || !html.endsWith("</a>")) problems.push(`${lang} ${id}: card is not one anchor`);
      if (inner.includes("<a")) problems.push(`${lang} ${id}: nested anchor`);
      if (!html.includes('rel="sponsored noopener"') || !html.includes('target="_blank"')) {
        problems.push(`${lang} ${id}: link attributes drifted`);
      }
      if ((html.match(/<span class="house-ad-btn"/g) ?? []).length !== 1) {
        problems.push(`${lang} ${id}: button span missing`);
      }
      if (id === "namedscan" && (html.includes("data-ad-lang") || html.includes("min-width"))) {
        problems.push(`${lang} namedscan: markup drifted`);
      }
      if (id === "rankfootprint") {
        const marker = freeScanMarker(html);
        if (marker) problems.push(`${lang} rankfootprint: static ad has free-scan wording “${marker}”`);
        if (!html.includes(RANKFOOTPRINT_PITCH)) problems.push(`${lang} rankfootprint: pitch is not the $1 line`);
        if (html.includes("data-ad-lang") || html.includes("<script")) {
          problems.push(`${lang} rankfootprint: card still has a script hook`);
        }
      }
      if (html.includes("<img") || html.includes("<script") || html.includes("url(")) {
        problems.push(`${lang} ${id}: card requests an image or script`);
      }
      const href = houseAdHref(id);
      if (!html.includes(escapeHtml(href))) problems.push(`${lang} ${id}: href drifted`);
      const url = new URL(href);
      if (url.searchParams.get("utm_source") !== "mapthegeneral") problems.push(`${id}: utm_source`);
      if (url.searchParams.get("utm_medium") !== "house_ad") problems.push(`${id}: utm_medium`);
      if (url.searchParams.get("utm_campaign") !== id) problems.push(`${id}: utm_campaign`);
      if (url.origin + url.pathname !== HOUSE_ADS[id].origin.replace(/\/$/, "") && url.href.split("?")[0] !== HOUSE_ADS[id].origin) {
        problems.push(`${id}: origin drifted (${url.href})`);
      }
    }
  }
  if (COPY.en.cta.namedscan !== "Try NamedScan") problems.push("English NamedScan CTA drifted");
  if (RANKFOOTPRINT_PITCH !== "$1 Google Maps rank sample scan") problems.push("RankFootprint pitch drifted");
  if (RANK_PAID.en.pitch !== RANKFOOTPRINT_PITCH) problems.push("English RankFootprint pitch drifted");
  if (RANK_PAID.en.cta !== "Get the $1 sample scan") problems.push("English RankFootprint CTA drifted");
  if (COPY.en.cta.rankfootprint !== RANK_PAID.en.cta || COPY.en.pitch.rankfootprint !== RANK_PAID.en.pitch) {
    problems.push("English RankFootprint card is not the $1 copy");
  }
  for (const lang of RANKFOOTPRINT_LANGS) {
    const card = renderRankfootprint(lang);
    const marker = freeScanMarker(card);
    if (RANK_PAID[lang].pitch !== RANKFOOTPRINT_PITCH) problems.push(`${lang} rank pitch is not the $1 line`);
    if (marker) problems.push(`${lang} rank card has free-scan wording “${marker}”`);
    if (!card.includes(RANKFOOTPRINT_PITCH)) problems.push(`${lang} rank card missing the $1 line`);
    if (!card.includes("$1")) problems.push(`${lang} rank card missing $1`);
    if (!rankSponsor(lang).includes("RankFootprint")) problems.push(`${lang} rank label dropped the name`);
    if (card.includes("<script")) problems.push(`${lang} rank card loads a script`);
  }
  if (rankfootprintLangForRoute("/") !== "en") problems.push("homepage rank language");
  if (rankfootprintLangForRoute("/ch/de/lu/") !== "de-CH" || rankfootprintLangForRoute("/ch/fr/") !== "fr-CH") {
    problems.push("Swiss rank language");
  }
  if (rankfootprintLangForRoute("/ch/it/") !== "it-CH" || rankfootprintLangForRoute("/it/it/") !== "it") {
    problems.push("Italian rank language");
  }
  if (rankfootprintLangForRoute("/ca/fr/") !== "fr") problems.push("Canadian French rank language");
  if (rankfootprintLangForRoute("/tw/zh/elections/difang-gongzhi-2026/") !== "zh") problems.push("Chinese rank language");
  if (rankfootprintLangForRoute("/se/sv/") !== "sv" || rankfootprintLangForRoute("/no/nb/") !== "no") {
    problems.push("Nordic rank language");
  }
  if (COPY.en.sponsored("NamedScan") !== "Sponsored by NamedScan") problems.push("English label drifted");
  if (COPY.en.sponsored("RankFootprint") !== "Sponsored by RankFootprint") problems.push("English label drifted");
  if (!HOUSE_AD_CSS.includes("min-height: 3rem") || !HOUSE_AD_CSS.includes("display: flex")) {
    problems.push("banner is missing its reserved horizontal layout");
  }
  if (/position:\s*(sticky|fixed)/.test(HOUSE_AD_CSS)) problems.push("banner must not stick or cover the page");

  const counts: Record<HouseAdId, number> = { namedscan: 0, rankfootprint: 0 };
  const sample = 20000;
  for (let i = 0; i < sample; i++) counts[houseAdIdForRoute(`/p/${i}/`)]++;
  const share = (id: HouseAdId) => counts[id] / sample;
  if (share("namedscan") < 0.55 || share("namedscan") > 0.65) {
    problems.push(`synthetic NamedScan share ${share("namedscan").toFixed(3)}`);
  }
  if (share("rankfootprint") < 0.35 || share("rankfootprint") > 0.45) {
    problems.push(`synthetic RankFootprint share ${share("rankfootprint").toFixed(3)}`);
  }
  if (houseAdIdForRoute("/es/en/") !== houseAdIdForRoute("/es/en/")) problems.push("route hash is not stable");
  if (routeFromHtmlFile("index.html") !== "/") problems.push("homepage route");
  if (routeFromHtmlFile("es/en/index.html") !== "/es/en/") problems.push("nested route");
  if (routeFromHtmlFile("404.html") !== "/_not-found/") problems.push("not-found route");
  if (routeFromHtmlFile("404/index.html") !== "/_not-found/") problems.push("not-found index route");
  if (languageFromRoute("/") !== "en" || languageFromRoute("/about/") !== "en" || languageFromRoute("/es/") !== "en") {
    problems.push("english routes lost their language");
  }
  if (languageFromRoute("/es/es/") !== "es" || languageFromRoute("/ca/fr/") !== "fr") problems.push("path language");
  if (languageFromRoute("/il/he/results/") !== "he" || languageFromRoute("/br/pt/elections/geral-2026/") !== "pt") {
    problems.push("path language");
  }
  if (languageFromRoute("/ch/de/") !== "de" || languageFromRoute("/it/it/") !== "it" || languageFromRoute("/pl/pl/") !== "pl") {
    problems.push("path language");
  }
  if (languageFromRoute("/rs/sr/elections/predsednicki-2026/") !== "sr") problems.push("path language");
  if (languageFromRoute("/bg/bg/") !== "bg" || languageFromRoute("/bg/bg/elections/prezident-2026/") !== "bg") {
    problems.push("path language");
  }
  if (languageFromRoute("/ee/et/") !== "et") problems.push("path language");
  if (languageFromRoute("/nl/nl/") !== "nl") problems.push("path language");
  if (languageFromRoute("/fi/fi/") !== "fi") problems.push("path language");
  if (houseAdLangForDocument("zh") !== "en") problems.push("zh document should use the English house ad");
  if (houseAdLangForDocument("es") !== "es") problems.push("Spanish house ad must stay Spanish");
  if (houseAdLangForDocument("bg") !== "bg") problems.push("Bulgarian house ad must stay Bulgarian");
  if (houseAdLangForDocument("en") !== "en") problems.push("English house ad must stay English");
  if (houseAdLangForDocument(null) !== null) problems.push("missing lang must not invent a house ad");
  return problems;
}
