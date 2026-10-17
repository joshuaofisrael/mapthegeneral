import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";

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
        <li>
          <Link className="hover:underline" href="/es/">
            Spain
          </Link>
        </li>
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
