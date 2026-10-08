"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";

/**
 * Browser-side theme store shared by the header toggle and the footer selector. The stored
 * preference is the single source of truth; a custom event keeps every control on the page
 * in sync, the "storage" event keeps other tabs in sync.
 *
 * The data-theme attribute is only written by event handlers, never by render or effects:
 * during hydration components see the server snapshot ("light"), and applying that would
 * flash dark-theme visitors back to light.
 */

const CHANGE_EVENT = "bizmaster-theme-change";
const DARK_QUERY = "(prefers-color-scheme: dark)";

// Fallback for this page view when storage is blocked (private modes, strict settings).
let memoryPreference: ThemePreference = "light";

function readPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "system" ? stored : "light";
  } catch {
    return memoryPreference;
  }
}

function resolve(preference: ThemePreference): "light" | "dark" {
  return preference === "dark" || (preference === "system" && window.matchMedia(DARK_QUERY).matches)
    ? "dark"
    : "light";
}

function applyStoredTheme() {
  document.documentElement.setAttribute("data-theme", resolve(readPreference()));
}

function subscribe(callback: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  const onChange = () => {
    applyStoredTheme();
    callback();
  };
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  media.addEventListener("change", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    media.removeEventListener("change", onChange);
  };
}

const serverPreference = (): ThemePreference => "light";
const serverTheme = () => "light" as const;

/** Stores a new preference, applies it immediately and notifies every theme control. */
export function setThemePreference(next: ThemePreference) {
  memoryPreference = next;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage may be unavailable; the theme still applies for this page view.
  }
  document.documentElement.setAttribute("data-theme", resolve(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useThemePreference() {
  return useSyncExternalStore(subscribe, readPreference, serverPreference);
}

/** The theme actually shown, with "system" resolved against the OS setting. */
export function useResolvedTheme() {
  return useSyncExternalStore(subscribe, () => resolve(readPreference()), serverTheme);
}
