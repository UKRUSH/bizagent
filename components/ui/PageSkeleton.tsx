/**
 * Loading placeholder for pages that read route params (`/features/[slug]`,
 * `/solutions/[slug]`, `/industries/[slug]`). Params need a Suspense boundary even with
 * generateStaticParams: direct visits are fully prerendered and never show this, while a
 * client navigation between two slugs shows it instantly as the content streams in.
 */
export function PageSkeleton() {
  return (
    <div className="page-skeleton" aria-busy="true">
      <p className="sr-only" role="status">
        Loading page
      </p>
      <section className="page-hero">
        <div className="container">
          <span className="skeleton-line" style={{ width: "12rem" }} />
          <span className="skeleton-line skeleton-line--eyebrow" style={{ width: "9rem" }} />
          <span className="skeleton-line skeleton-line--title" style={{ width: "min(36rem, 90%)" }} />
          <span className="skeleton-line skeleton-line--title" style={{ width: "min(26rem, 70%)" }} />
          <span className="skeleton-line" style={{ width: "min(40rem, 95%)" }} />
          <span className="skeleton-line" style={{ width: "min(32rem, 80%)" }} />
        </div>
      </section>
      <section className="section">
        <div className="container grid-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="card skeleton-card">
              <span className="skeleton-line skeleton-line--title" style={{ width: "70%" }} />
              <span className="skeleton-line" />
              <span className="skeleton-line" style={{ width: "85%" }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
