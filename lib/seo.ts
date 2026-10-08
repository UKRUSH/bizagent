/**
 * Production URL and indexing switch (spec 16, 21). SITE_URL is the configured production
 * domain; indexing stays off until SITE_INDEXING=true so draft content is never crawled.
 */
export function getSiteUrl(): string {
  return (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

export function indexingAllowed(): boolean {
  return process.env.SITE_INDEXING === "true";
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
