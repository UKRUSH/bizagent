/**
 * Production URL and indexing switch (spec 16, 21). SITE_URL is the configured production
 * domain; indexing stays off until SITE_INDEXING=true so draft content is never crawled.
 * The production URL is also declared in netlify.toml so generated sitemap URLs remain
 * public even if the Netlify environment variable is not configured.
 */
export function getSiteUrl(): string {
  return (process.env.SITE_URL ?? "https://agentbizny.com").replace(/\/$/, "");
}

export function indexingAllowed(): boolean {
  return process.env.SITE_INDEXING === "true";
}

export function absoluteUrl(path: string): string {
  return `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
