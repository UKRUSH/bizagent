import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}

/** Section title block. `id` labels the enclosing section via aria-labelledby. */
export function SectionHeading({ id, eyebrow, title, children }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      {eyebrow && <span className="eyebrow section-eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}
