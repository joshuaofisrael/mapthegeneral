# Map the General

Public, nonpartisan election guide for first-world countries.

**Map the General** is a brand of **Joshua Israel Ventures LLC**, a Florida limited liability company (Sunbiz document number **L26000261819**, ACTIVE). It is not a separate company and is not claimed here as a filed DBA or trademark.

Business address: **5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322**.

The site is **not** an official election website. Unofficial information. Confirm with your official election office.

Production URL: **https://mapthegeneral.com**. Hosted on **GitHub Pages**.

The United States 2026 midterms are on the sibling site [Map the Midterms](https://mapthemidterms.com).

## Stack

- Next.js App Router with `output: "export"` (static HTML in `out/`)
- TypeScript
- Tailwind CSS
- Typed local modules under `src/data/`
- GitHub Pages + GitHub Actions

No cookies, no analytics, no accounts. Search runs in the browser against `public/search/index.json`.

## Scripts

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # writes search index, sitemaps, llms.txt, then static export to out/
npm run start    # serve out/ at http://localhost:3000
```

Set `NEXT_PUBLIC_SITE_URL` to the public origin (defaults to `https://mapthegeneral.com`).

## Deploy

Pushes to `main` run `.github/workflows/pages.yml`. In the repo, set **Settings → Pages → Source** to **GitHub Actions**. The deployed `CNAME` file sets `mapthegeneral.com`.

IndexNow key file: `public/a7c3e91b4d2f4086b5e0c1a9d8f74632.txt`. After a deploy, the workflow submits the URL list to IndexNow and continues if that call fails.

## Spain in this release

General election **Sunday, 29 November 2026**, called by **Real Decreto 806/2026**.

| Path | What it is |
|------|------------|
| `/` | Country directory and search |
| `/es/` | Spain language chooser |
| `/es/es/` and `/es/en/` | National pages |
| `/es/[lang]/[community]/` | 17 autonomous communities plus Ceuta and Melilla |
| `/es/[lang]/[community]/[province]/` | 50 provinces |
| `/es/[lang]/elections/cortes-generales-2026/` | The called general election |
| `/es/[lang]/parties/` `/candidates/` `/results/` `/faq/` `/sources/` | Indexes. Candidate profiles wait for the BOE proclamation |

Municipality pages are not in this release. Population is the official Padrón at 1 January 2025 (Real Decreto 1117/2025). Facts that were not on a source read on 17 October 2026 are marked as gaps.

## Contact

Joshua Israel Ventures LLC. Email `joshuaofisrael@gmail.com` with subject `[Contact: Map the General]`.
