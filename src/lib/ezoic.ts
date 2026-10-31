/**
 * Ezoic JavaScript integration (same header block as mapthemidterms.com PR #88).
 * Inserted at the very start of <head> on every exported HTML page, before the
 * GA4 tag and AdSense. No Ezoic ad placeholders are added. Ezoic's Gatekeeper
 * CMP is not loaded: consent comes from the site banner and Google's TCF signal.
 */
export const EZOIC_HEAD_BLOCK = `<script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
<script>
    window.ezstandalone = window.ezstandalone || {};
    ezstandalone.cmd = ezstandalone.cmd || [];
</script>
<script async src="//ezoicanalytics.com/analytics.js"></script>`;

export function insertEzoicHead(html: string): string {
  if (html.includes("ezojs.com/ezoic/sa.min.js")) return html;
  const m = /<head[^>]*>/i.exec(html);
  if (!m) return html;
  const at = m.index + m[0].length;
  // Keep <meta charset> first if it opens <head>.
  const rest = html.slice(at);
  const cs = /^\s*<meta charset="[^"]*"\s*\/?>/i.exec(rest);
  const pos = cs ? at + cs[0].length : at;
  return html.slice(0, pos) + EZOIC_HEAD_BLOCK + html.slice(pos);
}
