import Image from "next/image";
import Link from "next/link";

/**
 * White BIZny logo (B mark and wordmark), cut from the supplied artwork onto a transparent
 * background. Always placed on the purple header or footer. The link carries the accessible name.
 */
export function BrandLogo({ preload = false }: { preload?: boolean }) {
  return (
    <Link href="/" className="brand-logo" aria-label="BIZny home">
      <Image
        src="/brand/bizny-logo-white.png"
        alt=""
        width={1519}
        height={603}
        sizes="(max-width: 767px) 136px, 168px"
        className="brand-logo__image"
        preload={preload}
      />
    </Link>
  );
}
