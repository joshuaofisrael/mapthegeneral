"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Entry = {
  path: string;
  title: string;
  kind: string;
  text: string;
  lang: string;
};

function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function SearchBox({
  initialQuery = "",
  placeholder,
  postcodeNote,
  preferLang,
}: {
  initialQuery?: string;
  placeholder: string;
  postcodeNote: string;
  preferLang?: "es" | "en";
}) {
  const [query, setQuery] = useState(initialQuery);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/search/index.json")
      .then((response) => response.json())
      .then((data: Entry[]) => {
        if (!cancelled) {
          setEntries(data);
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const folded = fold(query.trim());
  const isPostcode = /^\d{5}$/.test(query.trim());
  const results = useMemo(() => {
    if (folded.length < 2 || isPostcode) return [];
    const matched = entries.filter((entry) => fold(`${entry.title} ${entry.text} ${entry.kind}`).includes(folded));
    const preferred = preferLang
      ? matched.filter((entry) => entry.lang === preferLang || entry.lang === "en-only")
      : matched;
    const rows = preferred.length > 0 ? preferred : matched;
    return rows.slice(0, 40);
  }, [entries, folded, isPostcode, preferLang]);

  return (
    <div>
      <form action="/search/" method="get" role="search">
        <label className="block text-sm font-semibold" htmlFor="q">
          Search
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="q"
            name="q"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md border border-line bg-white px-3 py-2 text-base"
            autoComplete="off"
          />
          <button type="submit" className="rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">
            Search
          </button>
        </div>
      </form>
      {isPostcode && <p className="mt-3 text-sm leading-6 text-ink-muted">{postcodeNote}</p>}
      {ready && folded.length >= 2 && !isPostcode && results.length === 0 && (
        <p className="mt-3 text-sm text-ink-muted">No matching page.</p>
      )}
      {results.length > 0 && (
        <ul className="mt-4 divide-y divide-line rounded-xl border border-line bg-paper-card">
          {results.map((entry) => (
            <li key={entry.path}>
              <Link className="block px-4 py-3 hover:bg-navy-wash" href={entry.path}>
                <span className="font-medium">{entry.title}</span>
                <span className="mt-0.5 block text-xs uppercase tracking-wide text-ink-muted">
                  {entry.kind} · {entry.path}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
