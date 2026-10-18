import Link from "@/components/AnchorLink";

export function SeatLinks({
  heading,
  intro,
  seats,
}: {
  heading: string;
  intro: string;
  seats: { href: string; title: string; detail: string }[];
}) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold">{heading}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{intro}</p>
      <ul className="mt-4 columns-1 gap-x-8 sm:columns-2">
        {seats.map((seat) => (
          <li key={seat.href} className="mb-1 break-inside-avoid text-sm">
            <Link className="text-navy underline" href={seat.href}>
              {seat.title}
            </Link>
            <span className="text-ink-muted"> — {seat.detail}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
