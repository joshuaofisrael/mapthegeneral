import { OddsMeter } from "@/components/OddsMeter";
import { STAGE_LABEL, type ElectionResults } from "@/data/results/types";

type Lang = "en" | "es";

const T = {
  en: {
    stage: "Stage",
    counted: "Counted",
    source: "Source",
    read: "Read",
    noCount: "No count yet",
    noCountBody: (opens: string) =>
      `No figures are shown before ${opens}. When the count starts, this table copies the official results service, with the time each figure was read. This site does not calculate seats or call a winner.`,
    votes: "Votes",
    share: "Share",
    seats: "Seats",
    of: "of",
    log: "Live updates",
    logEmpty: "Dated entries will appear here once counting starts, newest first, each with its source.",
    unofficial: "Unofficial copy. If this page and the official source differ, the official source controls.",
  },
  es: {
    stage: "Fase",
    counted: "Escrutado",
    source: "Fuente",
    read: "Leído",
    noCount: "Aún no hay escrutinio",
    noCountBody: (opens: string) =>
      `No se muestran cifras antes de ${opens}. Cuando empiece el escrutinio, esta tabla copiará el servicio oficial de resultados, con la hora de lectura de cada cifra. Esta web no calcula escaños ni proclama ganadores.`,
    votes: "Votos",
    share: "Porcentaje",
    seats: "Escaños",
    of: "de",
    log: "Actualizaciones en directo",
    logEmpty: "Aquí aparecerán entradas fechadas cuando empiece el escrutinio, de la más reciente a la más antigua, cada una con su fuente.",
    unofficial: "Copia no oficial. Si esta página y la fuente oficial difieren, prevalece la fuente oficial.",
  },
} as const;

function when(iso: string, lang: Lang, timeZone: string): string {
  return new Date(iso).toLocaleString(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  });
}

/**
 * Reusable results block: stage, counted share, source and read time, a
 * party or candidate table, a dated live-entry log, and an optional
 * prediction-market meter (hidden during the legal blackout it is given).
 */
export function ResultsTemplate({
  data,
  lang = "en",
  timeZone,
  opensAt,
}: {
  data: ElectionResults;
  lang?: Lang;
  /** IANA zone for printed times, e.g. "Europe/Madrid". */
  timeZone: string;
  /** Earliest time a count may be shown (ISO). */
  opensAt: string;
}) {
  const t = T[lang];
  const hasRows = data.rows.length > 0;
  const showSeats = data.rows.some((row) => row.seats !== undefined);
  const log = [...data.log].sort((a, b) => b.at.localeCompare(a.at));
  return (
    <div className="space-y-6" data-results-template={data.id}>
      <dl className="grid gap-3 rounded-xl border border-line bg-paper-card p-5 text-sm sm:grid-cols-2" data-results-stage={data.stage}>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{t.stage}</dt>
          <dd className="mt-1 font-semibold text-ink">{STAGE_LABEL[data.stage][lang]}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{t.counted}</dt>
          <dd className="mt-1 text-ink">{data.counted ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{t.source}</dt>
          <dd className="mt-1">
            <a className="text-navy underline" href={data.source.url} rel="noopener noreferrer">
              {data.source.label}
            </a>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{t.read}</dt>
          <dd className="mt-1 text-ink">{data.readAt ? when(data.readAt, lang, timeZone) : "—"}</dd>
        </div>
      </dl>

      {data.odds ? <OddsMeter {...data.odds} /> : null}

      {hasRows ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="py-2 pr-4">{data.rowLabel}</th>
                <th scope="col" className="py-2 pr-4">{t.votes}</th>
                <th scope="col" className="py-2 pr-4">{t.share}</th>
                {showSeats ? (
                  <th scope="col" className="py-2">
                    {t.seats}
                    {data.seatsTotal ? ` (${t.of} ${data.seatsTotal})` : ""}
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.name} className="border-b border-line/60">
                  <td className="py-2 pr-4 font-medium">{row.name}</td>
                  <td className="py-2 pr-4">{row.votes?.toLocaleString(lang === "es" ? "es-ES" : "en-GB") ?? ""}</td>
                  <td className="py-2 pr-4">{row.share ?? ""}</td>
                  {showSeats ? <td className="py-2">{row.seats ?? ""}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-ink-soft">{t.unofficial}</p>
        </div>
      ) : (
        <section className="rounded-xl border border-dashed border-line p-5 text-sm leading-6">
          <h2 className="font-serif text-xl font-semibold">{t.noCount}</h2>
          <p className="mt-1 text-ink-muted">{t.noCountBody(when(opensAt, lang, timeZone))}</p>
        </section>
      )}

      <section aria-labelledby={`${data.id}-log`}>
        <h2 id={`${data.id}-log`} className="font-serif text-xl font-semibold">
          {t.log}
        </h2>
        {log.length ? (
          <ol className="mt-3 space-y-3 text-sm leading-6">
            {log.map((entry) => (
              <li key={entry.at + entry.text} className="border-l-2 border-navy pl-3">
                <time dateTime={entry.at} className="block text-xs font-semibold text-navy">
                  {when(entry.at, lang, timeZone)}
                </time>
                <span>{entry.text} </span>
                <a className="text-navy underline" href={entry.source.url} rel="noopener noreferrer">
                  {entry.source.label}
                </a>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-2 text-sm text-ink-muted">{t.logEmpty}</p>
        )}
      </section>
    </div>
  );
}
