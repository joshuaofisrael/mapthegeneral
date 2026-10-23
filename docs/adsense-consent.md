# Google AdSense and consent

Approved by Joshua on 23 October 2026. This site is being prepared for AdSense site verification and ads review. No ad units are placed. No other advertising network is used.

## What the build adds

Every non-redirect HTML page gets two tags in `<head>`:

```html
<meta name="google-adsense-account" content="ca-pub-5681559774142917">
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5681559774142917" crossorigin="anonymous"></script>
```

Next.js pages get them from the root layout (`src/app/layout.tsx`). Static pages written by the render scripts get the same tags from `src/lib/adsense.ts`. After `next build`, `scripts/stamp-adsense-html.ts` inserts the tags into any exported page that still lacks them, including HTML that was already committed under `public/`. Redirect stubs (a meta refresh) are left alone. `public/ads.txt` is copied to `/ads.txt`.

The loader is not delayed, wrapped, or blocked. Google's European consent message is delivered by this same script after it is published in the AdSense account. A second, site-built banner would duplicate that message, so none is added.

## What the account owner must publish

In the AdSense account for `ca-pub-5681559774142917`:

1. Open **Privacy & messaging**.
2. Open **European regulations**.
3. Create Google's consent message and **publish** it.

Google shows that message only to visitors in the European Economic Area, the United Kingdom, and Switzerland. Visitors elsewhere do not see it. Until the message is published, the loader is on the site but the consent dialog is not.

## Other scripts

Cloudflare Web Analytics stays where it already was. The beacon is:

```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
```

It is cookieless: it counts page views and does not set cookies or use local storage. It is not an advertising script, and it is not gated on the consent message. It loads on Next.js pages and on the static templates that already included it (Spain municipalities, Italy provinces, Canada level 2, Mexico, Australia, Switzerland, Poland level 2, and UK level 2). Some deeper static pages (Italy municipalities, Canada level 3, Poland level 3, UK level 3) did not include the beacon, and this change does not add it.

No other analytics, tag manager, or cookie script is loaded. The site does not use Google Analytics, social-media pixels, or any advertising network besides this AdSense loader. Fonts are served from this site.

## Privacy page

The only privacy page is English, at `/privacy/`. Country sections of the site use other languages; the legal pages do not have separate locale routes. The advertising section on `/privacy/` is written in English and repeated in Spanish, German, French, Italian, and Polish. It links to Google's partner-sites policy and to Google ads settings, says European visitors are asked for consent, and points questions to the [contact page](https://mapthegeneral.com/contact/). It does not print a personal email address.

## Checks

`scripts/check-adsense.ts` runs after the static export. It fails the build if any non-redirect page lacks either tag in `<head>`, if `ads.txt` is missing or different, if `robots.txt` blocks the AdSense crawlers, or if the `out/` directory is 1 GB or larger.
