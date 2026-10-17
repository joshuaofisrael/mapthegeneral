import Link from "next/link";

export function LinkGrid({
  heading,
  items,
}: {
  heading: string;
  items: { href: string; title: string; detail?: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">{heading}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.href} className="rounded-xl border border-line bg-paper-card p-4">
            <Link className="font-serif text-lg font-semibold hover:text-navy" href={item.href}>
              {item.title}
            </Link>
            {item.detail && <p className="mt-1 text-sm text-ink-muted">{item.detail}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}
