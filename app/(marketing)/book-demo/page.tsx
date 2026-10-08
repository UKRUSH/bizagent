import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import type { ComponentType, SVGProps } from "react";
import { siteConfig } from "@/config/site";
import { parseDemoPreselection } from "@/content/form-options";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { PageHero } from "@/components/ui/PageHero";
import { SmartLink } from "@/components/ui/SmartLink";
import {
  ArrowRightIcon,
  BarChartIcon,
  CalendarIcon,
  MessageIcon,
  MonitorIcon,
  PlugIcon,
  SearchIcon,
  SparkIcon,
} from "@/components/ui/icons";
import styles from "@/components/trust/trust.module.css";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: `Request a ${siteConfig.productName} demo shaped around how your customers contact you.`,
  alternates: { canonical: "/book-demo" },
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** The form's sections, in order, as the hero panel's outline. */
const formOutline = [
  { title: "About you", text: "Your name, business and how to reach you." },
  { title: "What you need", text: "Industry, role, modules, plan, volume and the systems you use." },
  { title: "Your demo", text: "Language, a preferred date and time of day, and your time zone." },
  { title: "Anything else", text: "What you would like the demo to cover." },
  { title: "Consent", text: "How we may use your details." },
];

const nextSteps: { title: string; text: string; Icon: IconComponent }[] = [
  { title: "We review your request", text: "We look at your channels, volumes and the modules you chose.", Icon: SearchIcon },
  { title: "We get in touch", text: "We contact you to agree a time that suits you.", Icon: MessageIcon },
  { title: "Your demo", text: "We walk through your own workflow, in the language you chose.", Icon: MonitorIcon },
];

const beforeYourDemo: { href: string; label: string; Icon: IconComponent }[] = [
  { href: "/platform", label: "How the platform works", Icon: SparkIcon },
  { href: "/pricing", label: "Plans and pricing", Icon: BarChartIcon },
  { href: "/integrations", label: "Integrations and their status", Icon: PlugIcon },
];

/** Reads ?plan=, ?module=, ?industry= and ?role=, keeping only allowlisted values (spec 12.2). */
async function PreselectedDemoForm({ searchParams }: { searchParams: PageProps<"/book-demo">["searchParams"] }) {
  return <DemoRequestForm preselection={parseDemoPreselection(await searchParams)} />;
}

/** Qualified conversion (spec 5 /book-demo, 12). */
export default function BookDemoPage({ searchParams }: PageProps<"/book-demo">) {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Book a Demo" }]}
        eyebrow="Book a demo"
        title="See how the agent fits your business."
        actions={
          <>
            <a href="#demo-request" className="button">
              Start Your Request
            </a>
            <Link href="/contact" className="button button--secondary">
              Contact the Team
            </Link>
          </>
        }
        aside={
          <section className={styles.outline} aria-labelledby="outline-title">
            <p id="outline-title" className={styles.outlineTitle}>
              <span aria-hidden="true">
                <CalendarIcon width="20" height="20" />
              </span>
              What we&apos;ll ask
            </p>
            <ol>
              {formOutline.map((part) => (
                <li key={part.title}>
                  <strong>{part.title}</strong>
                  <span>{part.text}</span>
                </li>
              ))}
            </ol>
            <p className={styles.outlineNote}>A preferred date is a preference, not a confirmed booking.</p>
          </section>
        }
      >
        <p>
          Tell us how customers contact you and what your team handles most often. We&apos;ll use
          that workflow to shape your demo.
        </p>
      </PageHero>

      <section id="demo-request" className="section section--muted" aria-label="Demo request">
        <div className={`container ${styles.split} ${styles.demoLayout}`}>
          <div className={styles.demoForm}>
            <noscript>
              <p className={styles.notice}>
                This form needs JavaScript to send your request. You can also reach the team through
                the{" "}
                <SmartLink href={siteConfig.corporateWebsiteUrl} external>
                  {siteConfig.companyName} website
                </SmartLink>
                .
              </p>
            </noscript>
            <Suspense fallback={<DemoRequestForm preselection={{ modules: [] }} placeholder />}>
              <PreselectedDemoForm searchParams={searchParams} />
            </Suspense>
          </div>
          <aside className={styles.demoAside} aria-labelledby="next-steps-title">
            <div className="card">
              <h2 id="next-steps-title" className={styles.asideHeading}>
                What happens next
              </h2>
              <ol className={styles.timeline}>
                {nextSteps.map(({ title, text, Icon }) => (
                  <li key={title}>
                    <span className={styles.timelineIcon} aria-hidden="true">
                      <Icon width="20" height="20" />
                    </span>
                    <div>
                      <strong>{title}.</strong> {text}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className={`card ${styles.demoNudge}`}>
              <span className={styles.infoIcon} aria-hidden="true">
                <MessageIcon />
              </span>
              <div>
                <p className={styles.demoNudgeTitle}>Prefer to ask a question first?</p>
                <Link href="/contact" className={styles.routeAction}>
                  Contact the team
                  <ArrowRightIcon width="18" height="18" />
                </Link>
              </div>
            </div>
            <div className="card">
              <h2 id="before-demo-title" className={styles.asideHeading}>
                Before your demo
              </h2>
              <ul className={styles.linkRows} aria-labelledby="before-demo-title">
                {beforeYourDemo.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <Link href={href}>
                      <Icon width="20" height="20" aria-hidden="true" />
                      {label}
                      <ArrowRightIcon width="18" height="18" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
