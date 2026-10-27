import Link from "@/components/AnchorLink";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { countryHubs } from "@/lib/country-hubs";

export default function NotFound() {
  return (
    <div>
      <PageHeader
        eyebrow="404"
        title="This page is not on the map"
        lede={`${SITE.name} is an information site. It is not an official election website.`}
      />
      <ul className="space-y-2 text-navy">
        <li>
          <Link className="hover:underline" href="/">
            Home
          </Link>
        </li>
        {countryHubs().map((hub) => (
          <li key={hub.code}>
            <Link className="hover:underline" href={hub.href} lang={hub.lang} dir={hub.dir}>
              {hub.name}
            </Link>
          </li>
        ))}
        <li>
          <Link className="hover:underline" href="/search/">
            Search
          </Link>
        </li>
        <li>
          <Link className="hover:underline" href="/contact/">
            Report an error
          </Link>
        </li>
      </ul>
    </div>
  );
}
