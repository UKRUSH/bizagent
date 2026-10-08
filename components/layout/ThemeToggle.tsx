"use client";

import { MoonIcon, SunIcon } from "@/components/ui/icons";
import { setThemePreference, useResolvedTheme } from "@/lib/theme-client";

/**
 * Header light/dark toggle (spec 4.3). Switches to the opposite of the theme on screen and
 * stores that as an explicit choice; the footer selector still offers "System".
 * Before hydration the button shows the light-theme state; both icons are rendered and CSS
 * picks the one matching data-theme, so the icon is right on first paint.
 */
export function ThemeToggle() {
  const theme = useResolvedTheme();
  const next = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      onClick={() => setThemePreference(next)}
    >
      <MoonIcon className="theme-toggle__moon" width={20} height={20} />
      <SunIcon className="theme-toggle__sun" width={20} height={20} />
    </button>
  );
}
