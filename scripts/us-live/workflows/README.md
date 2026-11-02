# US live page: election-night refresh (needs a human with `workflow` scope to install)

Same pattern that drove the Israel results traffic (Bing/IndexNow on every count change).
1. `git apply scripts/us-live/workflows/pages-indexnow-us-scope.patch` (adds `indexnow_scope=us` to pages.yml)
2. `cp scripts/us-live/workflows/us-live-refresh.yml .github/workflows/`
3. Commit and push to main before 23:00 London on 3 Nov 2026.
