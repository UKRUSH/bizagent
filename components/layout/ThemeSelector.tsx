"use client";

import type { ThemePreference } from "@/lib/theme";
import { setThemePreference, useThemePreference } from "@/lib/theme-client";

const options: { id: ThemePreference; label: string }[] = [
  { id: "light", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "system", label: "System" },
];

/**
 * Light / Dark / System selector in the footer (spec 4.3). The choice is stored locally and
 * applied before first paint by the inline script in app/layout.tsx; lib/theme-client keeps
 * it in sync with the header toggle, other tabs and OS changes.
 */
export function ThemeSelector() {
  const preference = useThemePreference();

  return (
    <div className="theme-selector" role="group" aria-labelledby="theme-selector-label">
      <span id="theme-selector-label">Theme</span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={preference === option.id}
          onClick={() => setThemePreference(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
