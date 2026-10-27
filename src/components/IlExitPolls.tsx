/** data-il-exit-polls — television sample copy below stays inside this marker. */
import { IL_TRACKER_OPENS_AT, type IlLang } from "@/data/il-results";
import data from "@/data/il-2026-exit-polls.json";

type SeatMap = Record<string, number>;
type Poll = (typeof data.polls)[number];

const COLOR: Record<string, string> = {
  kan11: "#5c6b73",
  ch12: "#8a6a45",
  ch13: "#5f6f52",
};

const DISCLAIMER = {
  en: "These are unofficial exit-poll projections published by TV channels, not official results. Official results come only from the Central Elections Committee.",
  he: "אלה תחזיות לא רשמיות של מדגמי טלוויזיה שפרסמו ערוצי הטלוויזיה, לא תוצאות רשמיות. התוצאות הרשמיות מגיעות רק מוועדת הבחירות המרכזית.",
} as const;

function seatCount(seats: Poll["seats"], id: string): number {
  const value = (seats as SeatMap)[id];
  return typeof value === "number" ? value : 0;
}

function sumSeats(seats: Poll["seats"]): number {
  return Object.values(seats).reduce((total, value) => total + value, 0);
}

function Bars({ lang, parties }: { lang: IlLang; parties: { id: string }[] }) {
  const rtl = lang === "he";
  const series = data.polls.filter((poll) => poll.showOnChart && sumSeats(poll.seats) === 120);
  const axisMax = data.majority + 8;
  const plotW = 560;
  const rowH = 34;
  const barH = 7;
  const height = parties.length * rowH + 8;
  const lineX = rtl ? plotW - (data.majority / axisMax) * plotW : (data.majority / axisMax) * plotW;

  return (
    <svg viewBox={`0 0 ${plotW} ${height}`} className="h-auto w-full" role="img" aria-hidden="true">
      <line x1={lineX} y1={0} x2={lineX} y2={height} stroke="#143251" strokeDasharray="3 3" strokeWidth="1.25" />
      {parties.map((party, row) =>
        series.map((poll, index) => {
          const seats = seatCount(poll.seats, party.id);
          const width = (seats / axisMax) * plotW;
          const x = rtl ? plotW - width : 0;
          const y = row * rowH + 4 + index * (barH + 2);
          const labelX = rtl ? Math.max(0, x - 4) : Math.min(plotW, x + width + 4);
          return (
            <g key={`${poll.id}-${party.id}`}>
              <rect x={x} y={y} width={width} height={barH} rx={2} fill={COLOR[poll.broadcasterId] ?? "#64748b"} />
              <text
                x={labelX}
                y={y + barH - 1}
                textAnchor={rtl ? "end" : "start"}
                fontSize="9"
                fill="#1a2332"
              >
                {seats}
              </text>
            </g>
          );
        }),
      )}
    </svg>
  );
}

export function IlExitPolls({ lang }: { lang: IlLang }) {
  if (Date.now() < Date.parse(IL_TRACKER_OPENS_AT)) return null;
  const polls = data.polls.filter((poll) => sumSeats(poll.seats) === 120);
  const chartPolls = polls.filter((poll) => poll.showOnChart);
  const ranked = [...data.parties].sort((a, b) => {
    const left = Math.max(...polls.map((poll) => seatCount(poll.seats, b.id)));
    const right = Math.max(...polls.map((poll) => seatCount(poll.seats, a.id)));
    return left - right;
  });
  const chartParties = ranked.filter((party) => chartPolls.some((poll) => seatCount(poll.seats, party.id) > 0));
  const other: IlLang = lang === "he" ? "en" : "he";
  const copy =
    lang === "he"
      ? {
          title: "מדגמי טלוויזיה (לא רשמיים)",
          chart: "העמודות מציגות את המדגם המלא האחרון של כל ערוץ. הצבע הוא של הערוץ.",
          majority: "הקו המקווקו: 61 מנדטים לרוב.",
          party: "רשימה",
          seats: "מנדטים",
          source: "מקור",
          pollster: "מכון",
          also: "גם דווח ב",
        }
      : {
          title: "Unofficial exit polls (TV projections)",
          chart: "The bars use the latest complete sample from each channel. The colour marks the channel.",
          majority: "Dashed line: 61 seats for a majority.",
          party: "List",
          seats: "Seats",
          source: "Source",
          pollster: "Pollster",
          also: "Also reported by",
        };

  return (
    <section data-il-exit-polls className="mb-10 rounded-2xl border-2 border-[#8a8175] bg-[#f3f0ea] p-4 sm:p-5" aria-labelledby="il-exit-polls">
      <h2 id="il-exit-polls" className="text-2xl font-bold text-ink">
        {copy.title}
      </h2>
      <div role="note" className="mt-3 space-y-2 rounded-xl border border-[#8a8175] bg-white p-3 text-sm font-semibold leading-6 text-ink">
        <p lang={lang}>{DISCLAIMER[lang]}</p>
        <p lang={other}>{DISCLAIMER[other]}</p>
      </div>
      <p className="mt-4 text-sm text-ink-muted">{copy.chart}</p>
      <ul className="mt-3 flex flex-wrap gap-3 text-sm">
        {chartPolls.map((poll) => (
          <li key={poll.id} className="inline-flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ background: COLOR[poll.broadcasterId] }} aria-hidden="true" />
            <span>
              {poll.broadcaster[lang]}, {poll.timeLabel[lang]}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-sm font-semibold text-ink">{copy.majority}</p>
      <div className="mt-3 space-y-2">
        {chartParties.map((party) => (
          <div key={party.id} className="grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(8.5rem,12rem)_1fr]">
            <p className="text-sm font-semibold text-ink">{party[lang]}</p>
            <Bars lang={lang} parties={[party]} />
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-sm">
          <thead className="bg-white text-ink-muted">
            <tr>
              <th className="p-2 text-start font-semibold">{copy.party}</th>
              {polls.map((poll) => (
                <th key={poll.id} className="p-2 text-end font-semibold">
                  {poll.broadcaster[lang]}
                  <span className="block font-normal">{poll.timeLabel[lang]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ranked.map((party) => (
              <tr key={party.id} className="border-t border-[#d9d3c8]">
                <th className="p-2 text-start font-medium text-ink">{party[lang]}</th>
                {polls.map((poll) => (
                  <td key={poll.id} className="p-2 text-end tabular-nums">
                    {seatCount(poll.seats, party.id)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-3 text-sm">
        {polls.map((poll) => (
          <li key={poll.id}>
            <a className="font-semibold text-navy underline" href={poll.sources[0]?.url} rel="noopener noreferrer">
              {copy.source}: {poll.broadcaster[lang]}, {poll.timeLabel[lang]}
            </a>
            {poll.pollster && poll.pollsterSource ? (
              <>
                {" "}
                · {copy.pollster}:{" "}
                <a className="text-navy underline" href={poll.pollsterSource} rel="noopener noreferrer">
                  {poll.pollster[lang]}
                </a>
              </>
            ) : null}
            {poll.sources.length > 1 ? (
              <span className="mt-1 block text-ink-muted">
                {copy.also}{" "}
                {poll.sources.slice(1).map((source, index) => (
                  <span key={source.url}>
                    {index > 0 ? ", " : ""}
                    <a className="text-navy underline" href={source.url} rel="noopener noreferrer">
                      {source.label[lang]}
                    </a>
                  </span>
                ))}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
      {data.omitted.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 ps-5 text-sm text-ink-muted">
          {data.omitted.map((item) => (
            <li key={item.en}>{item[lang]}</li>
          ))}
        </ul>
      ) : null}
      <span hidden data-il-sample-end="" />
    </section>
  );
}
