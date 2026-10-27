/**
 * Paid sponsorship slot under the top house-ad banner.
 *
 * Homepage and country hubs only. The Israel results embed is not a hub.
 * Copy follows the page language. English pages, including the English
 * switch on a country hub, use the English lines.
 *
 * Sold state: set `SOLD_SPONSOR` and rebuild. That one value replaces the
 * "Your ad here" offer with a localized "Sponsored by <name>" banner.
 * Leave it `null` while the slot is for sale.
 *
 * The offer stays in the static HTML. A page script hides the slot after
 * 30 Oct 2026 at 23:59 Asia/Jerusalem. Do not set `hidden` at build time.
 */
import { HOUSE_AD_LANGS, type HouseAdLang, isEmbedRoute, languageFromRoute } from "@/lib/house-ad";

export const SPONSOR_CHECKOUT_URL = "https://buy.stripe.com/6oU14o3w45856FF7Mcb3r1W";

/** Last minute the offer stays up, as an Israel-time wall clock. */
export const SPONSOR_OFFER_UNTIL = "2026-10-30T23:59";
export const SPONSOR_OFFER_TZ = "Asia/Jerusalem";

export type SoldSponsor = {
  name: string;
  href: string;
};

export const SOLD_SPONSOR: SoldSponsor | null = null;

export const SPONSOR_EN_PITCH =
  "Your ad here: exclusive sponsor during Israel election night results + 3 days, 27–30 Oct 2026, $1,000.";
export const SPONSOR_EN_CTA = "Book this slot";
export const SPONSOR_EN_LABEL = "Your ad here";

type SlotCopy = {
  label: string;
  pitch: string;
  cta: string;
  sold: (name: string) => string;
};

const COPY: Record<HouseAdLang, SlotCopy> = {
  en: {
    label: SPONSOR_EN_LABEL,
    pitch: SPONSOR_EN_PITCH,
    cta: SPONSOR_EN_CTA,
    sold: (name) => `Sponsored by ${name}`,
  },
  es: {
    label: "Su anuncio aquí",
    pitch:
      "Su anuncio aquí: patrocinador exclusivo durante los resultados de la noche electoral de Israel y los 3 días siguientes, 27–30 oct 2026, $1,000.",
    cta: "Reservar este espacio",
    sold: (name) => `Patrocinado por ${name}`,
  },
  fr: {
    label: "Votre pub ici",
    pitch:
      "Votre pub ici : sponsor exclusif pendant les résultats de la nuit électorale en Israël et les 3 jours suivants, 27–30 oct. 2026, 1 000 $.",
    cta: "Réserver cet espace",
    sold: (name) => `Sponsorisé par ${name}`,
  },
  de: {
    label: "Ihre Anzeige hier",
    pitch:
      "Ihre Anzeige hier: exklusiver Sponsor während der Ergebnisse der Wahlnacht in Israel und der folgenden 3 Tage, 27.–30. Okt. 2026, 1.000 $.",
    cta: "Diesen Platz buchen",
    sold: (name) => `Gesponsert von ${name}`,
  },
  it: {
    label: "Il tuo annuncio qui",
    pitch:
      "Il tuo annuncio qui: sponsor esclusivo durante i risultati della notte elettorale in Israele e i 3 giorni successivi, 27–30 ott 2026, $1.000.",
    cta: "Prenota questo spazio",
    sold: (name) => `Sponsorizzato da ${name}`,
  },
  pl: {
    label: "Twoja reklama tutaj",
    pitch:
      "Twoja reklama tutaj: wyłączny sponsor podczas wyników nocy wyborczej w Izraelu i kolejnych 3 dni, 27–30 paź 2026, 1000 USD.",
    cta: "Zarezerwuj to miejsce",
    sold: (name) => `Sponsorowane przez ${name}`,
  },
  pt: {
    label: "O seu anúncio aqui",
    pitch:
      "O seu anúncio aqui: patrocinador exclusivo durante os resultados da noite eleitoral em Israel e nos 3 dias seguintes, 27–30 out 2026, $1.000.",
    cta: "Reservar este espaço",
    sold: (name) => `Patrocinado por ${name}`,
  },
  he: {
    label: "המודעה שלכם כאן",
    pitch:
      "המודעה שלכם כאן: חסות בלעדית לתוצאות ליל הבחירות בישראל ולשלושת הימים שאחריהן, 27–30 באוק׳ 2026, $1,000.",
    cta: "הזמינו את המקום",
    sold: (name) => `ממומן על ידי ${name}`,
  },
  sr: {
    label: "Vaš oglas ovde",
    pitch:
      "Vaš oglas ovde: ekskluzivni sponzor tokom rezultata izborne noći u Izraelu i naredna 3 dana, 27–30. okt 2026, $1.000.",
    cta: "Rezervišite ovo mesto",
    sold: (name) => `Sponzorisano od strane ${name}`,
  },
  bg: {
    label: "Вашата реклама тук",
    pitch:
      "Вашата реклама тук: ексклузивен спонсор по време на резултатите от изборната нощ в Израел и следващите 3 дни, 27–30 окт 2026, $1,000.",
    cta: "Запазете това място",
    sold: (name) => `Спонсорирано от ${name}`,
  },
  et: {
    label: "Teie reklaam siin",
    pitch:
      "Teie reklaam siin: eksklusiivne sponsor Iisraeli valimisöö tulemuste ajal ja järgmise 3 päeva jooksul, 27–30 okt 2026, $1,000.",
    cta: "Broneerige see koht",
    sold: (name) => `Sponsoreerib ${name}`,
  },
  nl: {
    label: "Uw advertentie hier",
    pitch:
      "Uw advertentie hier: exclusieve sponsor tijdens de verkiezingsnacht in Israël en de 3 dagen erna, 27–30 okt 2026, $1,000.",
    cta: "Reserveer deze plek",
    sold: (name) => `Gesponsord door ${name}`,
  },
  fi: {
    label: "Mainoksenne tässä",
    pitch:
      "Mainoksenne tässä: yksinoikeudellinen sponsori Israelin vaaliyön tulosten aikana ja seuraavien 3 päivän ajan, 27–30 loka 2026, $1,000.",
    cta: "Varaa tämä paikka",
    sold: (name) => `Sponsoroitu: ${name}`,
  },
};

/**
 * #10b981 is 1.9:1 and #059669 is 2.8:1 against the page background #f6f7f9,
 * short of WCAG AA. White on #059669 is 3.0:1. The border is #047857 (4.1:1
 * on #f6f7f9) and the button is #065f46 with white text (6.1:1). The fill
 * stays #ecfdf5. min-height is the reserved box, so the slot does not shift
 * the page when the font loads or the line wraps.
 */
export const SPONSOR_SLOT_CSS = `.sponsor-slot {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.35rem 0.85rem;
  width: min(72rem, calc(100% - 2rem));
  min-height: 9.5rem;
  margin: 0.55rem auto 0;
  padding: 0.6rem 0.9rem;
  border: 2px solid #047857;
  border-radius: 0.55rem;
  background: #ecfdf5;
  color: #064e3b;
  font-size: 0.95rem;
  line-height: 1.35;
  text-align: start;
  text-decoration: none;
}

@media (min-width: 52rem) {
  .sponsor-slot {
    min-height: 5.25rem;
  }
}

.sponsor-slot:visited {
  color: #064e3b;
}

.sponsor-slot-kicker {
  flex: 0 0 auto;
  margin: 0;
  color: #065f46;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.3;
  text-transform: uppercase;
}

.sponsor-slot-copy {
  flex: 1 1 16rem;
  min-width: 0;
  margin: 0;
  color: #064e3b;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.35;
}

a.sponsor-slot .sponsor-slot-copy,
a.sponsor-slot:visited .sponsor-slot-copy {
  color: #064e3b;
}

.sponsor-slot-btn,
.sponsor-slot-btn:visited,
.sponsor-pay,
.sponsor-pay:visited {
  display: inline-block;
  flex: 0 0 auto;
  margin: 0;
  margin-inline-start: auto;
  padding: 0.45rem 0.85rem;
  border-radius: 0.45rem;
  background: #065f46;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
}

.sponsor-pay {
  margin: 1.25rem 0 0;
  margin-inline-start: 0;
  padding: 0.6rem 1.05rem;
  font-size: 1rem;
}

.sponsor-slot-btn:hover,
.sponsor-slot-btn:focus-visible,
.sponsor-pay:hover,
.sponsor-pay:focus-visible {
  background: #064e3b;
  color: #fff;
}

.sponsor-slot[hidden] {
  display: none !important;
}`;

const BANNED = [/joshua/i, /\bllc\b/i];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Homepage, a country chooser (`/es/`), or a national language hub (`/es/en/`). */
export function isSponsorSurface(route: string): boolean {
  if (isEmbedRoute(route)) return false;
  const parts = route.split("/").filter(Boolean);
  if (parts.length === 0) return true;
  if (!/^[a-z]{2}$/.test(parts[0])) return false;
  if (parts.length === 1) return true;
  return parts.length === 2 && /^[a-z]{2}$/.test(parts[1]);
}

export function advertisePath(lang: HouseAdLang): string {
  return lang === "es" ? "/advertise/es/" : "/advertise/";
}

/** Israel wall clock as YYYY-MM-DDTHH:mm. Null when the zone cannot be read. */
export function jerusalemStamp(date: Date): string | null {
  try {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: SPONSOR_OFFER_TZ,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    const map: Record<string, string> = {};
    for (const part of fmt.formatToParts(date)) {
      if (part.type !== "literal") map[part.type] = part.value;
    }
    const hour = map.hour === "24" ? "00" : map.hour;
    if (!map.year || !map.month || !map.day || !hour || !map.minute) return null;
    return `${map.year}-${map.month}-${map.day}T${hour}:${map.minute}`;
  } catch {
    return null;
  }
}

/** True after 30 Oct 2026 23:59 in Asia/Jerusalem. A failed clock leaves the offer up. */
export function sponsorOfferExpired(date = new Date()): boolean {
  const stamp = jerusalemStamp(date);
  return stamp !== null && stamp > SPONSOR_OFFER_UNTIL;
}

const SPONSOR_DEADLINE_JS = `(function(){try{var fmt=new Intl.DateTimeFormat("en-US",{timeZone:"${SPONSOR_OFFER_TZ}",hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});var map={};fmt.formatToParts(new Date()).forEach(function(p){if(p.type!=="literal")map[p.type]=p.value;});var hour=map.hour==="24"?"00":map.hour;var stamp=map.year+"-"+map.month+"-"+map.day+"T"+hour+":"+map.minute;if(stamp>"${SPONSOR_OFFER_UNTIL}"){var nodes=document.querySelectorAll("[data-sponsor-slot]");for(var i=0;i<nodes.length;i++)nodes[i].setAttribute("hidden","");}}catch(e){}})();`;

export function sponsorDeadlineScript(): string {
  return `<script data-sponsor-deadline="">${SPONSOR_DEADLINE_JS}</script>`;
}

export function renderSponsorSlot(lang: HouseAdLang, sold: SoldSponsor | null): string {
  const copy = COPY[lang];
  if (sold) {
    const name = sold.name.trim();
    const href = sold.href.trim();
    return `<a class="sponsor-slot" data-sponsor-slot="sold" href="${escapeHtml(href)}" rel="sponsored noopener" target="_blank"><span class="sponsor-slot-copy">${escapeHtml(copy.sold(name))}</span></a>`;
  }
  return `<div class="sponsor-slot" data-sponsor-slot="open"><p class="sponsor-slot-kicker">${escapeHtml(copy.label)}</p><p class="sponsor-slot-copy">${escapeHtml(copy.pitch)}</p><a class="sponsor-slot-btn" href="${advertisePath(lang)}">${escapeHtml(copy.cta)}</a></div>`;
}

export function sponsorSlotHtml(route: string, lang: HouseAdLang = languageFromRoute(route)): string {
  if (!isSponsorSurface(route)) return "";
  return `${renderSponsorSlot(lang, SOLD_SPONSOR)}${sponsorDeadlineScript()}`;
}

function validSold(sold: SoldSponsor | null): string | null {
  if (sold === null) return null;
  if (!sold.name.trim()) return "sold sponsor name is empty";
  let url: URL;
  try {
    url = new URL(sold.href);
  } catch {
    return "sold sponsor href is not a URL";
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return "sold sponsor href must be http(s)";
  return null;
}

export function selfCheckSponsorship(): string[] {
  const problems: string[] = [];
  if (SPONSOR_CHECKOUT_URL !== "https://buy.stripe.com/6oU14o3w45856FF7Mcb3r1W") {
    problems.push("checkout URL drifted");
  }
  if (SPONSOR_CHECKOUT_URL.includes("6oU9AUc2AfMJfcbeaAb3r1V")) problems.push("old checkout remains");
  if (COPY.en.pitch !== SPONSOR_EN_PITCH) problems.push("English pitch drifted");
  if (COPY.en.cta !== SPONSOR_EN_CTA) problems.push("English button drifted");
  if (COPY.en.label !== SPONSOR_EN_LABEL) problems.push("English label drifted");
  if (COPY.en.sold("Example") !== "Sponsored by Example") problems.push("English sold line drifted");
  if (!SPONSOR_SLOT_CSS.includes("background: #ecfdf5")) problems.push("missing emerald tint");
  if (!SPONSOR_SLOT_CSS.includes("border: 2px solid #047857")) problems.push("missing emerald outline");
  if (!SPONSOR_SLOT_CSS.includes("min-height: 9.5rem") || !SPONSOR_SLOT_CSS.includes("min-height: 5.25rem")) {
    problems.push("slot is missing its reserved height");
  }
  if (!SPONSOR_SLOT_CSS.includes("background: #065f46") || !SPONSOR_SLOT_CSS.includes("color: #fff")) {
    problems.push("button is missing the emerald fill or white text");
  }
  if (!SPONSOR_SLOT_CSS.includes(".sponsor-slot[hidden]") || !SPONSOR_SLOT_CSS.includes("display: none !important")) {
    problems.push("expired slot cannot hide the flex box");
  }
  if (sponsorOfferExpired(new Date("2026-10-30T21:59:00Z"))) problems.push("offer hides during 23:59 Israel time");
  if (!sponsorOfferExpired(new Date("2026-10-30T22:00:00Z"))) problems.push("offer stays up after 30 Oct 23:59 Israel time");
  if (sponsorOfferExpired(new Date("2026-10-27T19:00:00Z"))) problems.push("offer hides before Israel results night");
  if (!sponsorDeadlineScript().includes('data-sponsor-deadline=""') || !sponsorDeadlineScript().includes(SPONSOR_OFFER_UNTIL)) {
    problems.push("deadline script drifted");
  }
  if (sponsorDeadlineScript().includes("hidden=")) problems.push("static markup must not ship hidden");
  if (/position:\s*(sticky|fixed)/.test(SPONSOR_SLOT_CSS)) problems.push("slot must not stick or cover the page");

  const soldError = validSold(SOLD_SPONSOR);
  if (soldError) problems.push(soldError);

  for (const lang of HOUSE_AD_LANGS) {
    const copy = COPY[lang];
    if (!copy.label.trim() || !copy.pitch.trim() || !copy.cta.trim()) problems.push(`${lang}: empty copy`);
    if (copy.pitch.includes(copy.cta)) problems.push(`${lang}: button text copied into the pitch`);
    if (!copy.pitch.includes("27") || !copy.pitch.includes("30") || !copy.pitch.includes("2026")) {
      problems.push(`${lang}: Israel window missing`);
    }
    if (/US election|EE\. UU\.|États-Unis|Wahlwoche|USA|ноември|בארה|SAD|lis 2026|Nov\. 2026|nov 2026/i.test(copy.pitch)) {
      problems.push(`${lang}: old US-week copy remains`);
    }
    for (const pattern of BANNED) {
      if (pattern.test(copy.label) || pattern.test(copy.pitch) || pattern.test(copy.cta) || pattern.test(copy.sold("Example"))) {
        problems.push(`${lang}: banned phrase ${pattern}`);
      }
    }
    const open = renderSponsorSlot(lang, null);
    if (!open.startsWith('<div class="sponsor-slot"') || !open.includes('data-sponsor-slot="open"')) {
      problems.push(`${lang}: open slot markup drifted`);
    }
    if (open.includes('rel="sponsored') || open.includes("target=")) problems.push(`${lang}: open slot looks sold`);
    if (!open.includes(`href="${advertisePath(lang)}"`)) problems.push(`${lang}: booking link drifted`);
    if ((open.match(/<a\b/g) ?? []).length !== 1) problems.push(`${lang}: open slot should have one link`);
    const sample: SoldSponsor = { name: "A & B <C>", href: "https://example.com/?q=1&x=2" };
    const sold = renderSponsorSlot(lang, sample);
    if (!sold.includes('rel="sponsored noopener"') || !sold.includes('target="_blank"')) {
      problems.push(`${lang}: sold link attributes drifted`);
    }
    if (!sold.includes('data-sponsor-slot="sold"')) problems.push(`${lang}: sold marker missing`);
    if (!sold.includes(escapeHtml(copy.sold(sample.name)))) problems.push(`${lang}: sold label drifted`);
    if (sold.includes("sponsor-slot-btn") || sold.includes("Book this slot")) problems.push(`${lang}: sold slot still sells`);
    if ((sold.match(/<a\b/g) ?? []).length !== 1) problems.push(`${lang}: sold banner is not one link`);
    const inner = sold.replace(/^<a\b[^>]*>/, "").replace(/<\/a>$/, "");
    if (inner.includes("<a")) problems.push(`${lang}: nested anchor`);
  }

  const surfaces = ["/", "/es/", "/es/en/", "/es/es/", "/au/en/", "/ca/fr/", "/il/he/", "/bg/bg/", "/bg/en/"];
  for (const route of surfaces) {
    if (!isSponsorSurface(route)) problems.push(`${route} should show the slot`);
  }
  const hidden = [
    "/il/embed/",
    "/il/embed/index/",
    "/il/en/results/",
    "/es/en/elections/",
    "/advertise/",
    "/advertise/es/",
    "/about/",
    "/search/",
  ];
  for (const route of hidden) {
    if (isSponsorSurface(route)) problems.push(`${route} should not show the slot`);
    if (sponsorSlotHtml(route) !== "") problems.push(`${route} rendered a slot`);
  }
  const homeSlot = sponsorSlotHtml("/", "en");
  if (!homeSlot.startsWith(renderSponsorSlot("en", SOLD_SPONSOR)) || !homeSlot.includes("data-sponsor-deadline")) {
    problems.push("homepage renderer");
  }
  if (homeSlot.includes("6oU9AUc2AfMJfcbeaAb3r1V")) problems.push("old checkout remains in the slot");
  if (/data-sponsor-slot="open"[^>]*hidden/.test(homeSlot)) problems.push("static offer is hidden");
  if (languageFromRoute("/es/en/") !== "en" || sponsorSlotHtml("/es/en/").includes("Su anuncio")) {
    problems.push("English switch lost its English copy");
  }
  if (!sponsorSlotHtml("/es/es/").includes("Su anuncio aquí")) problems.push("Spanish hub lost its Spanish copy");
  return problems.filter((line) => line !== "");
}
