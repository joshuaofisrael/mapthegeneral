import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Message sent",
  description: `Thank you for contacting ${SITE.name}. Your message was sent to ${SITE.legalName}.`,
  path: "/contact/thanks",
});

export default function ContactThanksPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
          { name: "Message sent", path: "/contact/thanks" },
        ])}
      />
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { href: "/contact", label: "Contact" }, { label: "Message sent" }]}
      />
      <PageHeader eyebrow="Contact" title="Thank you" lede="Your message was sent." />
      <div className="prose-legal">
        <p>
          Thank you for contacting {SITE.name}. Your message was delivered to {SITE.legalName}, and we
          reply by email. If you need to add anything, use the <Link href="/contact/">contact form</Link>{" "}
          again.
        </p>
        <p>
          We are not an election office. Confirm dates, lists, and results with the official office
          named on each page.
        </p>
        <p>
          <Link href="/">Back to the home page</Link>
        </p>
      </div>
    </div>
  );
}
