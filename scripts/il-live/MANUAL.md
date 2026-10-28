# Manual (hand-copied) Israel count

Rule: when the official feed is blocked, copy the figures by hand and cite the source.

The Committee's CSV is behind an AWS WAF challenge outside Israel, so the live feed can stay at "awaiting".
`src/data/il-2026-manual-count.json` is committed data rendered by `IlManualCount` at the top of the official
block on /il/en/results/ and /il/he/results/. The poller (fetch.mjs → il-live-data branch) never touches it, and
the block hides itself in the browser when a live Committee count arrives.

Update (prefer votes26.bechirot.gov.il; otherwise a reputable outlet citing the Committee's count):

    node scripts/il-live/manual-count.mjs --pct 63.1 --as-of 2026-10-28T09:40:00+02:00 \
      --source <url> --seats "מחל=27,דרך=21,ודם=12,רק=11,אמת=9,ג=9,ל=8,שס=7,ב=6,ט=6,עם=4"
    git commit -am "IL manual count: 63.1%" && open a PR, merge; Pages deploys and pings IndexNow.

`--off` hides the block. Seats must sum to 120. Never label it final; it is not the official result.
