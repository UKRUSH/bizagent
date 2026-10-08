import Link from "next/link";
import { Suspense } from "react";
import { demoLink } from "@/content/navigation";
import { BrandLogo } from "./BrandLogo";
import { DesktopNavigation, DesktopNavigationView } from "./DesktopNavigation";
import { MobileNavigation, MobileNavigationView } from "./MobileNavigation";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Sticky purple header (spec 4.1, 5.2): logo left, navigation centre, theme toggle and
 * demo CTA right.
 * The navigation reads the pathname for aria-current; the Suspense fallbacks render the
 * same menus without a current link so routes with request-time params still prerender.
 */
export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <BrandLogo preload />
        <Suspense fallback={<DesktopNavigationView pathname={null} />}>
          <DesktopNavigation />
        </Suspense>
        <div className="header-actions">
          <ThemeToggle />
          <Link href={demoLink.href} className="button button--white header-demo">
            {demoLink.label}
          </Link>
          <Suspense fallback={<MobileNavigationView pathname={null} />}>
            <MobileNavigation />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
