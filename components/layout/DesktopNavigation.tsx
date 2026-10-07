"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FocusEvent } from "react";
import { isActivePath, primaryNavigation } from "@/content/navigation";
import { ChevronDownIcon } from "@/components/ui/icons";
import { SmartLink } from "@/components/ui/SmartLink";

export function DesktopNavigation() {
  return <DesktopNavigationView pathname={usePathname()} />;
}

/**
 * Disclosure-pattern dropdowns (spec 5.2): buttons with aria-expanded control plain link
 * lists. Menus close on Escape, outside click, focus leaving the menu, and route change.
 * `pathname` is null in the Suspense fallback, where no link is marked current.
 */
export function DesktopNavigationView({ pathname }: { pathname: string | null }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [lastPathname, setLastPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
  }

  useEffect(() => {
    if (!openMenu) return;

    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpenMenu(null);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      document.getElementById(`nav-trigger-${openMenu}`)?.focus();
      setOpenMenu(null);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu]);

  function closeWhenFocusLeaves(menuId: string) {
    return (event: FocusEvent<HTMLLIElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        setOpenMenu((current) => (current === menuId ? null : current));
      }
    };
  }

  const isCurrent = (href: string) => pathname !== null && isActivePath(pathname, href);

  return (
    <nav ref={navRef} className="desktop-nav" aria-label="Main">
      <ul className="desktop-nav__list">
        {primaryNavigation.map((item) => {
          if (item.kind === "link") {
            return (
              <li key={item.href}>
                <Link href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            );
          }

          const isOpen = openMenu === item.id;
          return (
            <li key={item.id} className="desktop-nav__item" onBlur={closeWhenFocusLeaves(item.id)}>
              <button
                type="button"
                id={`nav-trigger-${item.id}`}
                className="nav-trigger"
                aria-expanded={isOpen}
                aria-controls={`nav-panel-${item.id}`}
                onClick={() => setOpenMenu(isOpen ? null : item.id)}
              >
                {item.label}
                <ChevronDownIcon className="nav-trigger__chevron" />
              </button>
              <div id={`nav-panel-${item.id}`} className="nav-panel" hidden={!isOpen}>
                <ul>
                  {item.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        external={link.external}
                        current={isCurrent(link.href)}
                        className={link.featured ? "nav-panel__featured" : undefined}
                      >
                        <span className="nav-panel__label">{link.label}</span>
                        {link.description && (
                          <span className="nav-panel__description">{link.description}</span>
                        )}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
