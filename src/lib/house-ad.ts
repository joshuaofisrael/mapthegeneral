/**
 * One static house ad per exported page. The offer is chosen at build time
 * from an FNV-1a hash of the page path: 3/5 NamedScan, 1/5 Tax Deed Pack,
 * 1/5 RankFootprint. Copy is only what those sites published on 27 October 2026.
 */

export const HOUSE_AD_IDS = ["namedscan", "taxdeedpack", "rankfootprint"] as const;
export type HouseAdId = (typeof HOUSE_AD_IDS)[number];

export const HOUSE_AD_LANGS = ["en", "es", "fr", "de", "it", "pl", "pt", "he", "sr"] as const;
export type HouseAdLang = (typeof HOUSE_AD_LANGS)[number];

export const HOUSE_ADS: Record<HouseAdId, { name: string; origin: string }> = {
  namedscan: { name: "NamedScan", origin: "https://namedscan.com/" },
  taxdeedpack: { name: "Tax Deed Pack", origin: "https://taxdeedpack.com/" },
  rankfootprint: { name: "RankFootprint", origin: "https://rankfootprint.com/" },
};

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
      taxdeedpack:
        "Review one US tax-deed property before you bid: a $149 pack of public-record research, emailed as a PDF. It is not an appraisal, a title search, or a bid recommendation.",
      rankfootprint:
        "See your Google Maps rank at each point on a grid around your business, starting with a free 3×3 scan. RankFootprint is not affiliated with Google and does not guarantee a ranking.",
    },
    cta: {
      namedscan: "Try NamedScan",
      taxdeedpack: "Get the $149 pack",
      rankfootprint: "Try the free scan",
    },
  },
  es: {
    sponsored: (name) => `Patrocinado por ${name}`,
    pitch: {
      namedscan:
        "Comprueba si ChatGPT nombra tu negocio local cuando los clientes preguntan. NamedScan hace esas preguntas con búsqueda web en vivo y muestra a quién recomienda y qué corregir primero.",
      taxdeedpack:
        "Revisa un inmueble de tax deed en Estados Unidos antes de pujar: un pack de investigación de registros públicos por $149, enviado por correo en PDF. No es una tasación, una búsqueda de título ni una recomendación de puja.",
      rankfootprint:
        "Mira tu posición en Google Maps en cada punto de una cuadrícula alrededor de tu negocio, empezando por un escaneo gratis de 3×3. RankFootprint no está afiliado a Google y no garantiza ninguna posición.",
    },
    cta: {
      namedscan: "Prueba NamedScan",
      taxdeedpack: "Consigue el pack de $149",
      rankfootprint: "Prueba el escaneo gratis",
    },
  },
  fr: {
    sponsored: (name) => `Sponsorisé par ${name}`,
    pitch: {
      namedscan:
        "Voyez si ChatGPT cite votre commerce local lorsque des clients posent une question. NamedScan pose ces questions avec la recherche web en direct et montre qui est recommandé, ainsi que ce qu’il faut corriger en premier.",
      taxdeedpack:
        "Examinez un bien américain de type tax deed avant d’enchérir : un dossier de recherche sur les archives publiques à $149, envoyé en PDF par courriel. Ce n’est ni une expertise, ni une recherche de titre, ni une recommandation d’enchère.",
      rankfootprint:
        "Voyez votre rang Google Maps à chaque point d’une grille autour de votre établissement, en commençant par un scan gratuit de 3×3. RankFootprint n’est pas affilié à Google et ne garantit aucun classement.",
    },
    cta: {
      namedscan: "Essayer NamedScan",
      taxdeedpack: "Obtenir le dossier à $149",
      rankfootprint: "Essayer le scan gratuit",
    },
  },
  de: {
    sponsored: (name) => `Gesponsert von ${name}`,
    pitch: {
      namedscan:
        "Prüfen Sie, ob ChatGPT Ihr lokales Unternehmen nennt, wenn Kunden fragen. NamedScan stellt diese Fragen mit Live-Websuche und zeigt, wer empfohlen wird und was zuerst zu korrigieren ist.",
      taxdeedpack:
        "Prüfen Sie eine US-Immobilie aus einem Tax-Deed-Verkauf vor dem Gebot: ein Recherchepaket öffentlicher Unterlagen für $149, per E-Mail als PDF. Es ist kein Gutachten, keine Titelsuche und keine Gebotsempfehlung.",
      rankfootprint:
        "Sehen Sie Ihren Google-Maps-Rang an jedem Punkt eines Rasters um Ihren Betrieb, beginnend mit einem kostenlosen 3×3-Scan. RankFootprint ist nicht mit Google verbunden und garantiert kein Ranking.",
    },
    cta: {
      namedscan: "NamedScan testen",
      taxdeedpack: "Das $149-Paket holen",
      rankfootprint: "Kostenlosen Scan testen",
    },
  },
  it: {
    sponsored: (name) => `Sponsorizzato da ${name}`,
    pitch: {
      namedscan:
        "Scopri se ChatGPT cita la tua attività locale quando i clienti fanno una domanda. NamedScan pone quelle domande con la ricerca web dal vivo e mostra chi viene consigliato e cosa correggere per primo.",
      taxdeedpack:
        "Esamina un immobile statunitense all’asta tax deed prima di fare un’offerta: un dossier di ricerca sui registri pubblici a $149, inviato via e-mail in PDF. Non è una perizia, una ricerca del titolo né una raccomandazione d’offerta.",
      rankfootprint:
        "Vedi la tua posizione su Google Maps in ogni punto di una griglia intorno alla tua attività, a partire da una scansione gratuita 3×3. RankFootprint non è affiliato a Google e non garantisce una posizione.",
    },
    cta: {
      namedscan: "Prova NamedScan",
      taxdeedpack: "Ottieni il pack da $149",
      rankfootprint: "Prova la scansione gratuita",
    },
  },
  pl: {
    sponsored: (name) => `Sponsorowane przez ${name}`,
    pitch: {
      namedscan:
        "Sprawdź, czy ChatGPT wymienia Twoją lokalną firmę, gdy klienci zadają pytanie. NamedScan zadaje te pytania z wyszukiwaniem w internecie na żywo i pokazuje, kogo poleca oraz co poprawić w pierwszej kolejności.",
      taxdeedpack:
        "Sprawdź jedną nieruchomość z aukcji tax deed w USA przed licytacją: pakiet badania rejestrów publicznych za $149, wysyłany e-mailem jako PDF. To nie jest operat szacunkowy, badanie tytułu ani rekomendacja oferty.",
      rankfootprint:
        "Zobacz swoją pozycję w Google Maps w każdym punkcie siatki wokół firmy, zaczynając od bezpłatnego skanu 3×3. RankFootprint nie jest powiązany z Google i nie gwarantuje pozycji.",
    },
    cta: {
      namedscan: "Wypróbuj NamedScan",
      taxdeedpack: "Zamów pakiet za $149",
      rankfootprint: "Wypróbuj darmowy skan",
    },
  },
  pt: {
    sponsored: (name) => `Patrocinado por ${name}`,
    pitch: {
      namedscan:
        "Veja se o ChatGPT cita o seu negócio local quando clientes perguntam. A NamedScan faz essas perguntas com busca ao vivo na web e mostra quem é recomendado e o que corrigir primeiro.",
      taxdeedpack:
        "Revise um imóvel de tax deed nos Estados Unidos antes de dar um lance: um pacote de pesquisa em registros públicos por $149, enviado por e-mail em PDF. Não é uma avaliação, uma pesquisa de título nem uma recomendação de lance.",
      rankfootprint:
        "Veja sua posição no Google Maps em cada ponto de uma grade ao redor do negócio, começando por uma varredura 3×3 gratuita. O RankFootprint não é afiliado ao Google e não garante posição.",
    },
    cta: {
      namedscan: "Experimente a NamedScan",
      taxdeedpack: "Peça o pacote de $149",
      rankfootprint: "Experimente a varredura grátis",
    },
  },
  he: {
    sponsored: (name) => `ממומן על ידי ${name}`,
    pitch: {
      namedscan:
        "בדקו אם ChatGPT מזכיר את העסק המקומי שלכם כשלקוחות שואלים. NamedScan שולח את השאלות האלה עם חיפוש חי באינטרנט ומראה את מי ממליצים ומה כדאי לתקן קודם.",
      taxdeedpack:
        "בדקו נכס אחד ממכירת tax deed בארצות הברית לפני ההצעה: חבילת מחקר של רשומות ציבוריות ב-$149, שנשלחת בדוא״ל כ-PDF. זו אינה שמאות, בדיקת בעלות או המלצת הצעה.",
      rankfootprint:
        "ראו את הדירוג שלכם ב-Google Maps בכל נקודה ברשת סביב העסק, החל מסריקת 3×3 חינמית. RankFootprint אינו קשור ל-Google ואינו מבטיח דירוג.",
    },
    cta: {
      namedscan: "נסו את NamedScan",
      taxdeedpack: "קבלו את החבילה ב-$149",
      rankfootprint: "נסו את הסריקה החינמית",
    },
  },
  sr: {
    sponsored: (name) => `Sponzorisano od strane ${name}`,
    pitch: {
      namedscan:
        "Proverite da li ChatGPT imenuje vaš lokalni biznis kada kupci pitaju. NamedScan postavlja ta pitanja uz pretragu veba uživo i pokazuje koga preporučuje i šta prvo da ispravite.",
      taxdeedpack:
        "Pregledajte jednu nekretninu sa tax deed aukcije u SAD pre ponude: paket istraživanja javnih zapisa za $149, poslat e-poštom kao PDF. To nije procena vrednosti, provera titule ni preporuka ponude.",
      rankfootprint:
        "Vidite svoj rang na Google Maps u svakoj tački mreže oko biznisa, počev od besplatnog skeniranja 3×3. RankFootprint nije povezan sa Google-om i ne garantuje rang.",
    },
    cta: {
      namedscan: "Isprobajte NamedScan",
      taxdeedpack: "Uzmite paket za $149",
      rankfootprint: "Isprobajte besplatno skeniranje",
    },
  },
};

/** Phrases that must survive in each language, taken from the published offers. */
const REQUIRED: Record<HouseAdLang, Record<HouseAdId, string[]>> = {
  en: {
    namedscan: ["ChatGPT", "live web search", "what to fix first"],
    taxdeedpack: ["$149", "not an appraisal", "title search", "bid recommendation"],
    rankfootprint: ["3×3", "not affiliated with Google", "does not guarantee"],
  },
  es: {
    namedscan: ["ChatGPT", "búsqueda web en vivo"],
    taxdeedpack: ["$149", "No es una tasación", "búsqueda de título", "recomendación de puja"],
    rankfootprint: ["3×3", "no está afiliado a Google", "no garantiza"],
  },
  fr: {
    namedscan: ["ChatGPT", "recherche web en direct"],
    taxdeedpack: ["$149", "ni une expertise", "recherche de titre", "recommandation d’enchère"],
    rankfootprint: ["3×3", "n’est pas affilié à Google", "ne garantit"],
  },
  de: {
    namedscan: ["ChatGPT", "Live-Websuche"],
    taxdeedpack: ["$149", "kein Gutachten", "keine Titelsuche", "keine Gebotsempfehlung"],
    rankfootprint: ["3×3", "nicht mit Google verbunden", "garantiert kein"],
  },
  it: {
    namedscan: ["ChatGPT", "ricerca web dal vivo"],
    taxdeedpack: ["$149", "Non è una perizia", "ricerca del titolo", "raccomandazione d’offerta"],
    rankfootprint: ["3×3", "non è affiliato a Google", "non garantisce"],
  },
  pl: {
    namedscan: ["ChatGPT", "wyszukiwaniem w internecie na żywo"],
    taxdeedpack: ["$149", "nie jest operat szacunkowy", "badanie tytułu", "rekomendacja oferty"],
    rankfootprint: ["3×3", "nie jest powiązany z Google", "nie gwarantuje"],
  },
  pt: {
    namedscan: ["ChatGPT", "busca ao vivo na web"],
    taxdeedpack: ["$149", "Não é uma avaliação", "pesquisa de título", "recomendação de lance"],
    rankfootprint: ["3×3", "não é afiliado ao Google", "não garante"],
  },
  he: {
    namedscan: ["ChatGPT", "חיפוש חי באינטרנט"],
    taxdeedpack: ["$149", "אינה שמאות", "בדיקת בעלות", "המלצת הצעה"],
    rankfootprint: ["3×3", "אינו קשור ל-Google", "אינו מבטיח"],
  },
  sr: {
    namedscan: ["ChatGPT", "pretragu veba uživo"],
    taxdeedpack: ["$149", "nije procena vrednosti", "provera titule", "preporuka ponude"],
    rankfootprint: ["3×3", "nije povezan sa Google-om", "ne garantuje"],
  },
};

export const HOUSE_AD_CSS = `.house-ad {
  box-sizing: border-box;
  display: block;
  width: 100%;
  max-width: 36rem;
  min-height: 11.5rem;
  margin: 2rem 0 0;
  padding: 0.95rem 1.05rem 1.05rem;
  border: 1px solid #d5dde6;
  border-inline-start: 3px solid #1e4a73;
  border-radius: 0.75rem;
  background: #fff;
  color: #1a2332;
  font-size: 0.95rem;
  line-height: 1.45;
  text-align: start;
  text-decoration: none;
  box-shadow: 0 1px 2px rgba(20, 36, 56, 0.06), 0 8px 24px rgba(20, 36, 56, 0.05);
}

.house-ad:visited {
  color: #1a2332;
}

.house-ad:hover,
.house-ad:focus-visible {
  border-color: #1e4a73;
  text-decoration: none;
}

.house-ad-kicker,
.house-ad:visited .house-ad-kicker {
  display: block;
  margin: 0;
  color: #1e4a73;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

.house-ad-copy,
.house-ad:visited .house-ad-copy {
  display: block;
  margin: 0.45rem 0 0;
  color: #1a2332;
}

.house-ad-btn,
.house-ad:visited .house-ad-btn {
  display: inline-block;
  margin: 0.8rem 0 0;
  padding: 0.45rem 0.85rem;
  border-radius: 0.45rem;
  background: #1e4a73;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  line-height: 1.3;
}

.house-ad:hover .house-ad-btn,
.house-ad:focus-visible .house-ad-btn {
  background: #143251;
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

/** FNV-1a, 32-bit. Buckets 0–2 are NamedScan so the split stays near 60/20/20. */
export function houseAdIdForRoute(route: string): HouseAdId {
  let hash = 2166136261;
  for (let i = 0; i < route.length; i++) {
    hash ^= route.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const bucket = (hash >>> 0) % 5;
  if (bucket === 3) return "taxdeedpack";
  if (bucket === 4) return "rankfootprint";
  return "namedscan";
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

/** The whole card is one anchor. The button is a span, so there is no nested link. */
export function renderHouseAd(id: HouseAdId, lang: HouseAdLang): string {
  const ad = HOUSE_ADS[id];
  const copy = COPY[lang];
  return `<a class="house-ad" data-house-ad="${id}" href="${escapeHtml(houseAdHref(id))}" rel="sponsored noopener" target="_blank"><span class="house-ad-kicker">${escapeHtml(copy.sponsored(ad.name))}</span><span class="house-ad-copy">${escapeHtml(copy.pitch[id])}</span><span class="house-ad-btn">${escapeHtml(copy.cta[id])}</span></a>`;
}

export function houseAdHtml(route: string, lang: HouseAdLang): string {
  return renderHouseAd(houseAdIdForRoute(route), lang);
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
      const sentences = sentenceCount(pitch);
      if (sentences !== 2) problems.push(`${lang} ${id}: pitch has ${sentences} sentence marks, expected 2`);
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
      if ((html.match(/<span class="house-ad-btn">/g) ?? []).length !== 1) {
        problems.push(`${lang} ${id}: button span missing`);
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
  if (COPY.en.cta.taxdeedpack !== "Get the $149 pack") problems.push("English Tax Deed Pack CTA drifted");
  if (COPY.en.sponsored("NamedScan") !== "Sponsored by NamedScan") problems.push("English label drifted");

  const counts: Record<HouseAdId, number> = { namedscan: 0, taxdeedpack: 0, rankfootprint: 0 };
  const sample = 20000;
  for (let i = 0; i < sample; i++) counts[houseAdIdForRoute(`/p/${i}/`)]++;
  const share = (id: HouseAdId) => counts[id] / sample;
  if (share("namedscan") < 0.55 || share("namedscan") > 0.65) {
    problems.push(`synthetic NamedScan share ${share("namedscan").toFixed(3)}`);
  }
  for (const id of ["taxdeedpack", "rankfootprint"] as const) {
    if (share(id) < 0.15 || share(id) > 0.25) problems.push(`synthetic ${id} share ${share(id).toFixed(3)}`);
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
  return problems;
}
