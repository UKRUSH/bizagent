import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalLinkIcon } from "./icons";

interface SmartLinkProps {
  href: string;
  external?: boolean;
  className?: string;
  current?: boolean;
  children: ReactNode;
}

/** Internal routes use next/link; external destinations open in a new tab and say so. */
export function SmartLink({ href, external, className, current, children }: SmartLinkProps) {
  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
        <ExternalLinkIcon className="external-marker" width="14" height="14" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-current={current ? "page" : undefined}>
      {children}
    </Link>
  );
}
