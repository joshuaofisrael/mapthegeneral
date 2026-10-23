import { SITE } from "../data/site";
import { htmlHead, isRedirectStub } from "./adsense";

/** Shared social card. File URL has no trailing slash. */
export const SOCIAL_IMAGE_PATH = "/og.png";
export const SOCIAL_IMAGE_WIDTH = 1200;
export const SOCIAL_IMAGE_HEIGHT = 630;
export const SOCIAL_IMAGE_ALT = "Map the General, an unofficial independent election guide";

export function socialImageUrl(): string {
  return `${SITE.url}${SOCIAL_IMAGE_PATH}`;
}

export function socialImageMetadata() {
  return [
    {
      url: socialImageUrl(),
      width: SOCIAL_IMAGE_WIDTH,
      height: SOCIAL_IMAGE_HEIGHT,
      alt: SOCIAL_IMAGE_ALT,
    },
  ];
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
export function socialMetaTags(): string {
  const url = escAttr(socialImageUrl());
  const alt = escAttr(SOCIAL_IMAGE_ALT);
  return [
    `<meta property="og:image" content="${url}">`,
    `<meta property="og:image:width" content="${SOCIAL_IMAGE_WIDTH}">`,
    `<meta property="og:image:height" content="${SOCIAL_IMAGE_HEIGHT}">`,
    `<meta property="og:image:alt" content="${alt}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:image" content="${url}">`,
    `<meta name="twitter:image:alt" content="${alt}">`,
  ].join("\n");
}

/**
 * Fill missing Open Graph and Twitter image tags on an exported document.
 * Uses the page title, description, and canonical URL already in the head.
 * Redirect stubs and non-documents are left unchanged.
 */
export function ensureSocialHead(html: string): string {
  if (isRedirectStub(html) || htmlHead(html) === null) return html;
  const head = htmlHead(html) ?? "";
  const tags: string[] = [];
  const title = head.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  const description = head.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1];
  const canonical = head.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i)?.[1];
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
    const url = escAttr(socialImageUrl());
    const alt = escAttr(SOCIAL_IMAGE_ALT);
    tags.push(
      `<meta property="og:image" content="${url}">`,
      `<meta property="og:image:width" content="${SOCIAL_IMAGE_WIDTH}">`,
      `<meta property="og:image:height" content="${SOCIAL_IMAGE_HEIGHT}">`,
      `<meta property="og:image:alt" content="${alt}">`,
    );
  }
  if (!head.includes("twitter:card")) tags.push(`<meta name="twitter:card" content="summary_large_image">`);
  if (!head.includes("twitter:image")) {
    tags.push(
      `<meta name="twitter:image" content="${escAttr(socialImageUrl())}">`,
      `<meta name="twitter:image:alt" content="${escAttr(SOCIAL_IMAGE_ALT)}">`,
    );
  }
  if (tags.length === 0) return html;
  return html.replace(/<\/head>/i, `${tags.join("\n")}\n</head>`);
}
