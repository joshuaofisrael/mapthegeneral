import Link from "@/components/AnchorLink";
import { LEGAL_NAV, SITE } from "@/data/site";
import { alphaCommunities } from "@/data/spain/places";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-navy-deep text-white">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80">{SITE.officialNotUs}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="hover:underline" href="/es/">
                Spain
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/es/en/">
                Spain in English
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/es/es/">
                España en español
              </Link>
            </li>
            <li>
              <Link className="hover:underline" href="/search/">
                Search
              </Link>
            </li>
            <li>
              <a className="hover:underline" href={SITE.siblingUrl}>
                {SITE.siblingName}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Legal</p>
          <ul className="mt-3 space-y-2 text-sm">
            {LEGAL_NAV.map((item) => (
              <li key={item.href}>
                <Link className="hover:underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-site px-4 py-6">
          <p className="text-xs leading-5 text-white/70">
            Spain:{" "}
            {alphaCommunities().map((community, index, list) => (
              <span key={community.slug}>
                <Link className="hover:underline" href={`/es/en/${community.slug}/`}>
                  {community.officialName}
                </Link>
                {index < list.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
