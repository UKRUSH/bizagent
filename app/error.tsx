"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Root error boundary. It renders below the root layout but outside the marketing shell,
 * so it stays self-contained. Errors are logged without request bodies (spec 21).
 */
export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error.digest ?? error.message);
  }, [error]);

  return (
    <main id="main-content" tabIndex={-1} className="section">
      <div className="container status-page">
        <span className="eyebrow">Something went wrong</span>
        <h1>This page didn’t load correctly.</h1>
        <p className="muted prose">
          Please try again. If the problem continues, return to the homepage and try a different
          page.
        </p>
        <div className="button-row">
          <button type="button" className="button" onClick={() => retry()}>
            Try again
          </button>
          <Link href="/" className="button button--secondary">
            Go to the homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
