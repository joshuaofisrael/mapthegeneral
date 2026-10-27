import { GA_MEASUREMENT_ID, GA_WINDOW_ID } from "@/lib/google-analytics";

export { CONSENT_STORAGE_KEY, GA_MEASUREMENT_ID } from "@/lib/google-analytics";

/**
 * Sitewide head tags for the cookie banner. gtag.js is not in the page.
 * public/consent.js loads it only after the visitor clicks Accept, so a normal
 * pageview does not call Google. The measurement id string has to stay in the
 * HTML for scripts/check-ga.ts.
 */
export function GoogleAnalyticsHead() {
  return (
    <>
      <script
        data-ga-loader="1"
        dangerouslySetInnerHTML={{
          __html: `window.${GA_WINDOW_ID}=${JSON.stringify(GA_MEASUREMENT_ID)};`,
        }}
      />
      <script data-ga-loader="1" defer src="/consent.js" />
    </>
  );
}

/** Control that reopens the cookie banner (handled by public/consent.js). */
export function CookieChoicesButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className ?? "consent-link"} data-consent-open="1">
      Cookie choices
    </button>
  );
}
