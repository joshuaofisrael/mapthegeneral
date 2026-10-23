import { HEROES, OG_HEIGHT, OG_WIDTH, heroCodeFromPath } from "../data/heroes";
import { SITE } from "../data/site";
import { htmlHead, isRedirectStub } from "./adsense";

/** Shared social card. File URL has no trailing slash. Fallback when a page has no country hero. */
export const SOCIAL_IMAGE_PATH = "/og.png";
export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;
export const SOCIAL_IMAGE_ALT = "Map the General, an unofficial independent election guide";

export type SocialImage = { url: string; width: number; height: number; alt: string };

/** Country hero when the path starts with a country that has one. Otherwise og.png. */
export function socialImageFor(pagePath?: string): SocialImage {
  const code = heroCodeFromPath(pagePath);
  const hero = code ? HEROES[code] : undefined;
  if (hero) {
    return {
      url: `${SITE.url}${hero.og}`,
      width: OG_WIDTH,
      height: OG_HEIGHT,
      alt: hero.alt,
    };
  }
  return {
    url: `${SITE.url}${SOCIAL_IMAGE_PATH}`,
    width: SOCIAL_IMAGE_WIDTH,
    height: SOCIAL_IMAGE_HEIGHT,
    alt: SOCIAL_IMAGE_ALT,
  };
}

export function socialImageUrl(pagePath?: string): string {
  return socialImageFor(pagePath).url;
}

export function socialImageMetadata(pagePath?: string) {
  const image = socialImageFor(pagePath);
  return [{ url: image.url, width: image.width, height: image.height, alt: image.alt }];
}

function escAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

/** Attribute text copied out of existing HTML, then escaped again for a new tag. */
function textFromHtml(value: string): string {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

/** Open Graph image and Twitter card tags for a static document. */
export function socialMetaTags(pagePath?: string): string {
  const image = socialImageFor(pagePath);
  const url = escAttr(image.url);
  const alt = escAttr(image.alt);
  return [
    `<meta property="og:image" content="${url}">`,
    `<meta property="og:image:width" content="${image.width}">`,
    `<meta property="og:image:height" content="${image.height}">`,
    `<meta property="og:image:alt" content="${alt}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${url}">`,
    `<meta name="twitter:image:alt" content="${alt}">`,
  ].join("\n");
}

function pathFromCanonical(canonical: string | undefined): string | undefined {
  if (!canonical) return undefined;
  try {
    return new URL(textFromHtml(canonical)).pathname;
  } catch {
    return undefined;
  }
}

/**
 * Fill missing Open Graph and Twitter image tags on an exported document.
 * Uses the page title, description, and canonical URL already in the head.
 * Redirect stubs and non-documents are left unchanged.
 */
export function ensureSocialHead(html: string, routePath?: string): string {
  if (isRedirectStub(html) || htmlHead(html) === null) return html;
  const head = htmlHead(html) ?? "";
  const tags: string[] = [];
  const title = head.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  const description = head.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  const canonical = head.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
  const image = socialImageFor(routePath ?? pathFromCanonical(canonical));
  if (title && !head.includes("og:title")) tags.push(`<meta property="og:title" content="${escAttr(textFromHtml(title))}">`);
  if (description && !head.includes("og:description")) {
    tags.push(`<meta property="og:description" content="${escAttr(textFromHtml(description))}">`);
  }
  if (canonical && !head.includes("og:url")) tags.push(`<meta property="og:url" content="${escAttr(textFromHtml(canonical))}">`);
  if (!head.includes('property="og:site_name"') && !head.includes("og:site_name")) {
    tags.push(`<meta property="og:site_name" content="${escAttr(SITE.name)}">`);
  }
  if (!head.includes("og:type")) tags.push(`<meta property="og:type" content="website">`);
  if (!head.includes("og:image")) {
    const url = escAttr(image.url);
    const alt = escAttr(image.alt);
    tags.push(
      `<meta property="og:image" content="${url}">`,
      `<meta property="og:image:width" content="${image.width}">`,
      `<meta property="og:image:height" content="${image.height}">`,
      `<meta property="og:image:alt" content="${alt}">`,
    );
  }
  if (!head.includes("twitter:card")) tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  if (!head.includes("twitter:image")) {
    tags.push(
      `<meta name="twitter:image" content="${escAttr(image.url)}">`,
      `<meta name="twitter:image:alt" content="${escAttr(image.alt)}">`,
    );
  }
  if (tags.length === 0) return html;
  return html.replace(/<\/head>/i, `${tags.join("\n")}\n</head>`);
}
