# Live tracker legal spec (Map the General)

Every foreign live tracker on this site follows these rules. The machine-readable
table is `src/data/election-law.ts`; `scripts/check-election-law.ts` enforces it at build.

## Rules for every tracker

1. **Source.** Read only the official results service named in `officialResults`
   for that election. Free, public, official sources only. No media feeds, no
   exit polls, no quick counts from pollsters, no projections, no seat models.
2. **Opening time.** Show no count, percentage, leader or "called" label before
   `trackerOpen(id)` is true: the later of `trackerOpensAt` and the end of every
   rule in that window. Before then the tracker shows the polling-day facts and a
   link to the official results service only.
3. **Fetcher gate.** The fetch job must drop returns before the opening time, check
   the source's own timestamp, and refuse any file dated before polling day (test
   files). It writes `out/live/<id>.json` with `results: []` until it may open.
   The build fails if that file holds counts too early.
4. **Client gate.** The page re-checks `trackerOpen(id, Date.now())` before
   rendering counts, and wraps them in `data-election-gate="<id>"` so the shared
   notice hides them during the window.
5. **Labels.** Counts are "provisional, from <official body>, updated <time>".
   Never "projected", "winner" or "called" until the official body says so.
6. **Extensions.** If the official body extends voting anywhere (for example a
   Polish district commission extending hours under the Electoral Code), the
   tracker stays closed until the official body publishes results.

## Per election

| Window id | Election | Law | Tracker may open | Official source |
|---|---|---|---|---|
| it-2026-chieti | Italy, Chamber by-election 01-Chieti, 15–16 Nov 2026 | L. 28/2000 art. 8 (15-day poll ban); L. 212/1956 art. 9 (silence) | 16 Nov 2026 15:00 CET | elezioni.interno.gov.it (Eligendo) |
| pl-2026-senat-20 | Poland, Senate by-election, constituency 20, 22 Nov 2026 | Kodeks wyborczy art. 107 (cisza wyborcza) and art. 115 (no polls or exit polls) | 22 Nov 2026 21:00 CET, and only after PKW publishes | wybory.gov.pl (PKW) |
| au-vic-2026 | Victoria state election, 28 Nov 2026 | No results embargo in law; broadcasters' ad blackout (BSA 1992 Sch. 2 cl. 3A) does not cover this site; authorisation (Electoral Act 2002 s. 83) applies to paid, printed or regulated-entity material, which this site does not publish | 28 Nov 2026 18:00 AEDT (07:00 UTC) | vec.vic.gov.au/results |
| es-2026-generales | Spain, general election, 29 Nov 2026 | LOREG art. 69.7 (5-day poll ban); arts. 51 and 53 (reflection day) | 29 Nov 2026 21:00 CET (Canary Islands close) | infoelectoral.interior.gob.es |
| ch-2026-11-29 | Switzerland, federal popular vote, 29 Nov 2026 | No statutory poll or results ban | 29 Nov 2026 12:00 CET | bfs.admin.ch |
| fr-2027-presidentielle-t1 | France, presidential first round | Loi 77-808 art. 11; Code électoral L49, L52-2 | 20:00 Paris on polling day | resultats-elections.interieur.gouv.fr |
| kr-2027-04-07 | Korea, by-elections, 7 Apr 2027 | 공직선거법 제108조 (6-day poll ban) | 7 Apr 2027 20:00 KST | info.nec.go.kr |
| mx-2027-federal | Mexico, federal election, 6 Jun 2027 | LGIPE art. 251(4)-(6); Reglamento de Elecciones art. 134 | 6 Jun 2027 18:00 in Baja California (UTC-7) | ine.mx |

Countries with no election window yet (GB, CA, DE federal, JP, TR, AU federal) get
one added here before any tracker is built. Their standing rules:

- **GB:** RPA 1983 s. 66A, no exit poll before the poll closes (22:00).
- **CA:** Canada Elections Act s. 328(2), no new election survey results on polling
  day before every polling station in the district closes. (s. 329, the old ban on
  early results, was repealed in 2014.)
- **DE:** BWahlG § 32(2), no exit-poll results before 18:00.
- **JP:** Public Offices Election Act art. 138-3 (no publishing of "popularity votes"
  predicting winners); art. 129 (no campaigning on polling day).
- **TR:** Law 298 art. 80, no news, forecast or comment on the vote or results until
  18:00 on polling day; 18:00–21:00 only Supreme Election Council (YSK) releases.
