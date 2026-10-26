# Israel live results: workflow files to install

The deploy token could not write to `.github/workflows/` (no `workflow` scope), so these
are staged here. To switch the live feed on:

1. Move `il-live-results.yml` to `.github/workflows/il-live-results.yml`.
2. Replace `.github/workflows/pages.yml` with `pages.yml` here (same file plus an
   `indexnow_scope` input so live-count rebuilds ping IndexNow for the two results URLs
   only; see `pages-indexnow-scope.patch`).

Until then the pages work, but the count only appears after a manual Pages rebuild.
