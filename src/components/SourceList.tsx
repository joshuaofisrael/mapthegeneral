import type { SourceRef } from "@/data/spain/types";

export function SourceList({ sources, heading }: { sources: SourceRef[]; heading: string }) {
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">{heading}</h2>
      <ul className="mt-3 space-y-3 text-sm leading-6">
        {sources.map((source) => (
          <li key={source.id}>
            <a className="font-medium text-navy underline underline-offset-2" href={source.url} rel="noopener noreferrer">
              {source.name}
            </a>
            <span className="text-ink-muted"> — read {source.readOn}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
