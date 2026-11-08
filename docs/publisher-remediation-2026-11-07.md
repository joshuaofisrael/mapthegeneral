# Google publisher readiness remediation — 7 November 2026

Authorized by Joshua: “fix everything and resubmit.” Site changes only; the account owner/coordinator handles the Ad Manager resubmission.

## Findings and changes

- The existing indexing exception used population (<20,000), only Mexico/Spain, and a ±92-day election window. Missing populations, larger cities and an approaching election let template directories remain indexed regardless of original content. Those are not content-quality criteria.
- Added an export-time substantive-content gate. Programmatic geography pages need at least 200 distinctive narrative words in paragraphs; tables, navigation, lists, and sentences repeated on more than three pages in the same country/language do not count. This is a conservative site editorial rule, **not a word-count requirement stated by Google**. Names/numbers alone do not create original prose. National, election, live/results, sources, FAQ and trust pages are retained. The earlier population/election-window indexing exception is superseded by this content-based decision.
- Excluded pages remain available at their original URLs with `noindex,follow`; they are removed from all country/language sitemaps and the IndexNow list. Hreflang no longer recommends excluded pages. Pages and analytics are not deleted.
- Legal/trust pages already existed, including an activated FormSubmit contact endpoint (read-only GET returns 200; no test message was sent). Added an explicit editorial/corrections footer link, upgraded older static footers too, and expanded the editorial and corrections methods.
- Privacy already named Google, Ezoic and cookies. Added third-party opt-out choices and clarified that the analytics banner is **not** advertising consent. Removed unverified English assertions that a published advertising CMP is already guaranteed to appear.
- Corrected stale Israel FAQs saying the main table was provisional after the page itself had published the Committee's final allocation. Vote/seat figures were not changed. Historical seat chart wording is now neutral rather than calling a 2022 table “the count so far.” Corrections are logged.
- Duplicate title stamping now includes noindexed place pages and Italian directory pages. A unique route suffix resolves residual same-name/same-language collisions. New Zealand's sealed content remains untouched.
- Added a complete local link, title and footer audit. Existing build checks cover placeholder copy, official candidate lists, legal blackouts/holds, metadata, GA4 and AdSense verification tags.

## Ads, consent and account-side checks before enabling ads

1. `ads.txt` is present and retains every existing line, including the direct AdSense publisher and Ezoic partner lines. Core Google Ezoic lines match Ezoic's public ads.txt, but the domain-specific manager endpoint `https://srv.adstxtmanager.com/19390/mapthegeneral.com` returned only a domain comment, **not a populated seller list**. The domain-specific Ezoic seller ID cannot be independently re-verified from that response. Verify the selected site's Ads.txt Status in Ezoic; do not replace IDs with guesses.
2. This site intentionally uses Google's advertising CMP route and omits Gatekeeper (see existing integration history). A consent-gated GA4 banner is installed, but source code alone cannot prove the Google **certified advertising message** is configured and published in the account. Verify it for EEA/UK/Switzerland in AdSense/Ad Manager Privacy & messaging and in Ezoic's third-party CMP setting. Do not blindly load a second CMP that could conflict with a published one.
3. There are no explicit AdSense ad units or Ezoic placement/showAds calls in this repository; only existing verification/integration loaders. **Noindex is not permission to serve ads on a low-value page.** Before enabling Auto ads/Ezoic ads, disable ads on all excluded/utility/trust URLs in the provider's ad restrictions, or implement an approved selective-placement setup. Preserve GA4 and Cloudflare analytics on all pages.
4. Google separates MCM account review from domain review. A generic account rejection does not identify low-value content as the cause. Check the precise account status, duplicate-account/policy issues, identity verification and payment details. A PIN mailed on 2 November is ordinarily evidence that identity verification succeeded already; official Google documentation says PIN verification follows identity approval. A recently mailed PIN is not by itself evidence it caused rejection on 6 November.

## Sources opened during this audit

- Google Publisher Policies: https://support.google.com/admanager/answer/9335564 — inventory value, misrepresentation/election claims, privacy, authorized sellers, replicated content.
- Google identity verification: https://support.google.com/admanager/answer/13985965
- Ezoic account/domain rejection guide: https://osticket.ezoic.com/kb/article/my-account-or-domain-was-disapproved-by-google-mcm-how-do-i-fix-this
- Ezoic integration/CMP: https://docs.ezoic.com/docs/ezoicads/integration/ and https://docs.ezoic.com/docs/privacy/gdpr/
- Ezoic exclusions: https://support.ezoic.com/kb/article/excluded-pages-app
- Ezoic public sellers: https://www.ezoic.com/ads.txt
- Spain's stated polling date checked against BOE-A-2026-20742: https://www.boe.es/buscar/doc.php?id=BOE-A-2026-20742

No code audit can promise approval, diagnose a generic account rejection, certify every external source or substitute for an advertising CMP/account verification check.

## Export verification

The content gate scanned 59,764 non-redirect directory documents: **59,532 noindex,follow; 232 retained**, with exactly 232 URLs in the split sitemaps. The IndexNow list has 213 eligible URLs (the existing Italian legal hold still excludes 19 Italian URLs). No page was deleted. Existing redirects remain untouched. A full local-link/title/footer audit covers 59,765 HTML documents and 59,767 distinct local targets; the known Worker-backed Israel JSON endpoint was separately checked live (200). System 404 aliases are excluded from duplicate-title reporting.
