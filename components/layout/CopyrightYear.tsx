import { cacheLife } from "next/cache";

/**
 * Cache Components rejects a bare `new Date()` during prerendering, so the year is
 * captured in the static shell and refreshed daily.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
