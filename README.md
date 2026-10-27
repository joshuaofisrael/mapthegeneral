# Map the General

Public, nonpartisan election guide for the countries covered so far: Australia, Bulgaria, Canada, El Salvador, Estonia, Finland, Ireland, Italy, Mexico, the Netherlands, New Zealand, Norway, Poland, Spain, Sweden, Switzerland, Taiwan, and the United Kingdom. Ireland, Norway and Sweden are national hubs only: no municipality pages and no live tracker. Bulgaria is a national hub for a possible presidential election on 1 November 2026, with no municipality pages and no count before 21:00 Bulgaria time that day. New Zealand is a national hub for the general election on 7 November 2026, with no municipality pages, no party names, and no count before 7:00 pm New Zealand daylight time that day. Taiwan is a national hub on the same pattern, for local public-office elections on 28 November 2026. El Salvador is a national hub for the elections of 28 February 2027. Estonia is a national hub for the Riigikogu election on 7 March 2027. The Netherlands is a national hub for the Provincial States and water-board elections on 17 March 2027. Finland is a national hub for the parliamentary election on 18 April 2027, in Finnish, Swedish and English.

**Publisher:** Map the General.

**Map the General** is a brand of **Joshua Israel Ventures LLC**, a Florida limited liability company (Sunbiz document number **L26000261819**, ACTIVE). It is not a separate company and is not claimed here as a filed DBA or trademark. The public site names that company only on the legal pages.

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

No accounts. Cloudflare Web Analytics is cookieless. Google Analytics 4 loads only after you accept the site’s consent banner. Google AdSense may set advertising cookies; visitors in the EEA, the UK, and Switzerland are asked for consent through Google’s own message. See `docs/adsense-consent.md`. Search runs in the browser against `public/search/index.json`. Internal links are normal anchors, so each page is a full document. After `next build`, the export drops Next’s per-route `index.txt` payloads so the Pages artifact stays under GitHub’s 1 GB site limit.

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

## Sponsorship slot

The homepage and each country hub show one slot directly under the top house-ad banner. It is labelled “Your ad here” in the page language. English pages, including a country hub’s English switch, use the English lines. The button links to `/advertise/` (Spanish hubs link to `/advertise/es/`). The Israel results embed does not show the slot. The box has a reserved `min-height`, so the banner does not move the page when the type loads or the line wraps.

The current offer is the Israel election-night window, 27–30 Oct 2026, through 23:59 Israel time. The offer is in the static HTML and stays visible by default. A page script hides the slot after 30 Oct 2026 at 23:59 Asia/Jerusalem, so it comes down without a rebuild. A sold banner uses the same cutoff.

To mark the slot sold, change the single value `SOLD_SPONSOR` in `src/data/sponsorship.ts` and rebuild:

```ts
export const SOLD_SPONSOR: { name: string; href: string } | null = {
  name: "Example Maps",
  href: "https://example.com/",
};
```

Leave it `null` while the slot is for sale. A name and `href` replace the offer with a localized “Sponsored by <name>” banner. That link uses `rel="sponsored noopener"`. No other file needs an edit.

Terms and the $1,000 checkout are on `/advertise/` and `/advertise/es/`.

## Spain in this release

General election **Sunday, 29 November 2026**, called by **Real Decreto 806/2026**.

| Path | What it is |
|------|------------|
| `/` | Country directory and search |
| `/es/` | Spain language chooser |
| `/es/es/` and `/es/en/` | National pages |
| `/es/[lang]/[community]/` | 17 autonomous communities plus Ceuta and Melilla |
| `/es/[lang]/[community]/[province]/` | 50 provinces |
| `/es/[lang]/[community]/[province]/[municipality]/` | Municipalities with a 2025 Total in INE table 29005 |
| `/es/[lang]/elections/cortes-generales-2026/` | The called general election |
| `/es/[lang]/parties/` `/candidates/` `/results/` `/faq/` `/sources/` | Indexes. Candidate profiles wait for the BOE proclamation |

Population is the official Padrón at 1 January 2025 (Real Decreto 1117/2025). Municipality figures are the 2025 Total column of [INE table 29005](https://www.ine.es/jaxiT3/Tabla.htm?t=29005). Summed by province, they match the decree’s annex. Ceuta and Melilla are the city pages, not a fake province. Six codes with an empty 2025 Total have no page: 12066 Gatova, 15026 Cesuras, 15063 Oza dos Ríos, 17122 Palmerola, 36011 Cerdedo, 36012 Cotobade.

Mayors are one row per municipality from the ministry workbook **Ficha de Alcaldes de la Legislatura 2023** (`https://concejales.redsara.es/consulta/getAlcaldesLegislatura`). The rest of the council is still a gap. Postcodes stay a gap: on datos.gob.es the Centro Nacional de Información Geográfica says the postal-code database belongs to Grupo Correos and that Correos is who distributes it.

Municipality HTML is generated by `scripts/render-municipalities.ts` into `public/es/` (gitignored) and styled with the shared `public/place.css`. Those pages are static documents: no React payload. Each one links its province, its community, and the previous and next names. The province page lists every municipality.

Regenerate the distilled files:

```bash
python3 scripts/extract-municipalities.py /path/to/29005.csv src/data/spain/municipalities.json
```

Facts that were not on a source read on 17 October 2026 are marked as gaps. That includes current regional cabinets, the rest of a municipal council, proclaimed candidacies, a 2027 calendar day, and postcodes.

## Contact

Joshua Israel Ventures LLC. Email `joshuaofisrael@gmail.com` with subject `[Contact: Map the General]`.
