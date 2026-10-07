"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { demoLink, isActivePath, primaryNavigation } from "@/content/navigation";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/SmartLink";

export function MobileNavigation() {
  return <MobileNavigationView pathname={usePathname()} />;
}

/**
 * Expandable (non-modal) mobile menu (spec 5.2). Starts hidden via the native `hidden`
 * attribute and closes on route change, Escape, the Close button, or widening to desktop.
 * It is not a modal drawer, so focus is not trapped.
 */
export function MobileNavigationView({ pathname }: { pathname: string | null }) {
  const [open, setOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    }
    const desktop = window.matchMedia("(min-width: 1024px)");
    function handleViewportChange(event: MediaQueryListEvent) {
      if (event.matches) setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleViewportChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleViewportChange);
    };
  }, [open]);

  const isCurrent = (href: string) => pathname !== null && isActivePath(pathname, href);
  const topLevelLinks = primaryNavigation.filter((item) => item.kind === "link");
  const menus = primaryNavigation.filter((item) => item.kind === "menu");

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon width="20" height="20" /> : <MenuIcon width="20" height="20" />}
        <span>{open ? "Close" : "Menu"}</span>
      </button>

      <nav id="mobile-navigation" className="mobile-nav" aria-label="Main" hidden={!open}>
        <div className="mobile-nav__group">
          <ul>
            {topLevelLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {menus.map((menu) => (
          <div key={menu.id} className="mobile-nav__group">
            <p className="mobile-nav__heading" id={`mobile-nav-${menu.id}`}>
              {menu.label}
            </p>
            <ul aria-labelledby={`mobile-nav-${menu.id}`}>
              {menu.links.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} external={link.external} current={isCurrent(link.href)}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <Link href={demoLink.href} className="button button--white">
          {demoLink.label}
        </Link>
      </nav>
    </>
  );
}
