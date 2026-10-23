import { HERO_HEIGHT, HERO_WIDTH, HERO_WIDTHS, HEROES, heroApplies } from "@/data/heroes";

const CAPTION = "AI-generated image";

export function CountryHero({
  code,
  priority = false,
  sizes = "(min-width: 72rem) 72rem, 100vw",
  framed = true,
}: {
  code: string;
  priority?: boolean;
  sizes?: string;
  framed?: boolean;
}) {
  const hero = HEROES[code];
  if (!hero) return null;
  const avif = HERO_WIDTHS.map((width) => `${hero.base}-${width}.avif ${width}w`).join(", ");
  const webp = HERO_WIDTHS.map((width) => `${hero.base}-${width}.webp ${width}w`).join(", ");
  const image = (
    <picture>
      <source type="image/avif" srcSet={avif} sizes={sizes} />
      <source type="image/webp" srcSet={webp} sizes={sizes} />
      <img
        src={`${hero.base}-1280.webp`}
        alt={hero.alt}
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        className="aspect-[16/9] h-auto w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
      />
    </picture>
  );
  if (!framed) {
    return (
      <figure className="m-0">
        {image}
        <figcaption className="px-3 py-1.5 text-xs text-ink-soft">{CAPTION}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="mb-6 overflow-hidden rounded-xl border border-line bg-paper-card shadow-card">
      {image}
      <figcaption className="px-3 py-2 text-xs text-ink-soft">{CAPTION}</figcaption>
    </figure>
  );
}

/** Hero on a country hub (/xx/ or /xx/lang/) or an election page. Nowhere else. */
export function RouteHero({ country, path }: { country: string; path: string }) {
  if (!heroApplies(country, path)) return null;
  return <CountryHero code={country} priority />;
}
