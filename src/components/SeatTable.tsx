import Link from "next/link";
import { CITIES, PROVINCES } from "@/data/spain/places";
import type { Lang } from "@/data/spain/types";
import { communityPath, provincePath } from "@/lib/routes";

export function SeatTable({ lang }: { lang: Lang }) {
  const rows = [
    ...PROVINCES.map((province) => ({
      name: province.decreeName,
      seats: province.congressSeats,
      href:
        province.communitySlug === province.slug
          ? provincePath(lang, province.communitySlug, province.slug)
          : provincePath(lang, province.communitySlug, province.slug),
    })),
    ...CITIES.map((city) => ({
      name: city.decreeName,
      seats: city.congressSeats,
      href: communityPath(lang, city.slug),
    })),
  ].sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <div className="overflow-x-auto">
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">{lang === "es" ? "Circunscripción" : "Constituency"}</th>
            <th scope="col">{lang === "es" ? "Diputados" : "Deputies"}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>
                <Link className="text-navy underline" href={row.href}>
                  {row.name}
                </Link>
              </td>
              <td>{row.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
