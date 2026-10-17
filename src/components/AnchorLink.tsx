import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children?: ReactNode;
};

/** Plain anchor. Full page loads keep the static export from depending on per-route RSC payloads. */
export default function AnchorLink({ href, children, ...props }: Props) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
