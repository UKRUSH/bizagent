import Image from "next/image";
import Link from "next/link";

/**
 * Original white BizMaster logo, trimmed of transparent padding only (spec 3.2, 14.4).
 * Always placed on the purple header or footer. The link carries the accessible name.
 */
export function BrandLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Link href="/" className="brand-logo" aria-label="BizMaster Solutions home">
      <Image
        src="/brand/bizmaster-logo-white.png"
        alt=""
        width={1596}
        height={552}
        sizes="(max-width: 767px) 156px, 192px"
        className="brand-logo__image"
        preload={preload}
      />
    </Link>
  );
}
