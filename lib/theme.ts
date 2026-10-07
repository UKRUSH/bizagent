/**
 * Theme preference (specification section 4.3).
 *
 * The site launches in the light reading theme. A stored preference of "dark", or "system"
 * while the OS prefers dark, switches page surfaces to the dark tokens. The purple header
 * and footer are unaffected. The selector UI arrives in Part 10; this initializer already
 * applies any stored preference before first paint to avoid a theme flash.
 */

export const THEME_STORAGE_KEY = "bizmaster-theme";

export type ThemePreference = "light" | "dark" | "system";

/**
 * Inline script for <head>. Runs during HTML parsing, before paint and hydration.
 * A Content Security Policy must allow it with a nonce or hash when CSP is added (spec 21).
 */
export const themeInitScript = `(function(){try{var p=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=p==="dark"||(p==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}})()`;
