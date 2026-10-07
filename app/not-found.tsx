import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Real not-found UI for unmatched routes and unknown slugs (spec 14.1, 23.2). */
export default function NotFound() {
  return (
    <SiteShell>
      <section className="section">
        <div className="container status-page">
          <span className="eyebrow">404</span>
          <h1>We couldn’t find that page.</h1>
          <p className="muted prose">
            The link may be out of date, or the page may not be published yet. You can return to
            the homepage or ask us about a demo.
          </p>
          <div className="button-row">
            <Link href="/" className="button">
              Go to the homepage
            </Link>
            <Link href="/book-demo" className="button button--secondary">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
