import { NextResponse, type NextRequest } from "next/server";
import { moduleSlugs } from "@/content/types";

/**
 * Unknown slugs must return a real 404 (spec 14.1, 23.2). With Cache Components the
 * prerendered shell for an unknown param starts streaming before the page can call
 * notFound(), which fixes the status at 200. Checking the slug here, before rendering,
 * keeps the status correct. Only lightweight slug lists are imported.
 */
const knownSlugs: Record<string, ReadonlySet<string>> = {
  features: new Set<string>(moduleSlugs),
};

/** Unmatched path; rewriting here renders app/not-found.tsx with a 404 status. */
const NOT_FOUND_PATH = "/_unknown-slug";

export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const allowed = knownSlugs[section];
  if (allowed && slug && !allowed.has(safeDecode(slug))) {
    return NextResponse.rewrite(new URL(NOT_FOUND_PATH, request.url));
  }
  return NextResponse.next();
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export const config = {
  matcher: ["/features/:slug"],
};
