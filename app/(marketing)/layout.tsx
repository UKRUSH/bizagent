import type { ReactNode } from "react";
import { SiteShell } from "@/components/layout/SiteShell";

/** The (marketing) route group owns the public header and footer (spec 14.2). */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
