import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

interface PageHeroProps {
  breadcrumbs: Crumb[];
  eyebrow?: string;
  title: string;
  /** Introductory copy, rendered as paragraphs by the caller. */
  children?: ReactNode;
  /** Buttons or links under the introduction. */
  actions?: ReactNode;
  /** Optional element beside the copy on wide screens, e.g. an illustration. */
  aside?: ReactNode;
}

/** Light hero for interior pages, with breadcrumbs and the page's single h1. */
export function PageHero({ breadcrumbs, eyebrow, title, children, actions, aside }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className={`container ${aside ? "page-hero__grid" : ""}`}>
        <div className="page-hero__copy">
          <Breadcrumbs items={breadcrumbs} />
          {eyebrow && <span className="eyebrow section-eyebrow">{eyebrow}</span>}
          <h1 id="page-title">{title}</h1>
          {children && <div className="page-hero__intro">{children}</div>}
          {actions && <div className="button-row">{actions}</div>}
        </div>
        {aside}
      </div>
    </section>
  );
}
