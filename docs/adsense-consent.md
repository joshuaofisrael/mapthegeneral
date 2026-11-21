# Advertising scripts

On 21 November 2026 the owner withdrew mapthegeneral.com from Google AdSense.

Pages must not load an AdSense script, an ad slot, or an account meta tag. `public/ads.txt` stays. The direct seller line for publisher `pub-5681559774142917` is removed. Every Ezoic seller line stays, including Ezoic records whose domain is google.com for a different publisher id.

`scripts/check-adsense.ts` runs after the static export. It fails the build if built HTML contains `adsbygoogle`, `pagead2.googlesyndication.com`, `ca-pub-5681559774142917`, or `google-adsense-account`, or if `ads.txt` contains a google.com line for publisher `pub-5681559774142917`. It also fails if `ads.txt` is missing or if `out/` is 1 GB or larger.

Google Analytics 4 and the Cloudflare Web Analytics beacon stay on every page. Ezoic integration is unchanged. The privacy policy and the advertising disclosure name Ezoic, not the withdrawn AdSense account. robots.txt and the sitemap are not part of this withdrawal.
