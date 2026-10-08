import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { siteConfig, verifiedChannel, whatsappHref } from "@/config/site";
import { contactRoutes } from "@/content/company";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import {
  ArrowRightIcon,
  BarChartIcon,
  BuildingIcon,
  CalendarIcon,
  CloseIcon,
  LayersIcon,
  PlugIcon,
  ShieldIcon,
  SparkIcon,
} from "@/components/ui/icons";
import styles from "@/components/trust/trust.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${siteConfig.productName} team about demos, plans, enterprise deployments and security.`,
  alternates: { canonical: "/contact" },
};

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icons keyed by contact route title; a missing key shows no icon. */
const routeIcons: Record<string, IconComponent> = {
  "See a demo": CalendarIcon,
  "Plans and pricing": BarChartIcon,
  "Enterprise and white-label": LayersIcon,
  "Security documentation": ShieldIcon,
};

/** The intro's privacy reminder, shown as the hero panel. */
const doNotSend = ["Passwords", "Payment details", "Sensitive customer data"];

const beforeYouGetInTouch: { href: string; label: string; Icon: IconComponent }[] = [
  { href: "/platform", label: "How the platform works", Icon: SparkIcon },
  { href: "/pricing", label: "Plans and what is confirmed in a quote", Icon: BarChartIcon },
  { href: "/security", label: "Security and human control", Icon: ShieldIcon },
  { href: "/integrations", label: "Integrations and their status", Icon: PlugIcon },
];

/**
 * General enquiries (spec 5 /contact, 12.3). Direct channels come only from config and are
 * shown only when verified; nothing is invented. No response-time promises.
 */
export default function ContactPage() {
  const whatsapp = verifiedChannel(siteConfig.contact.whatsapp);
  const phone = verifiedChannel(siteConfig.contact.phone);
  const email = verifiedChannel(siteConfig.contact.email);
  const { address, schedulingUrl } = siteConfig.contact;
  const hasDirectChannels = Boolean(whatsapp || phone || email || address || schedulingUrl);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        eyebrow="Contact"
        title="Talk to the BizMaster AI Agent team."
        actions={
          <>
            <a href="#enquiry" className="button">
              Send an Enquiry
            </a>
            <a href="#routes-title" className="button button--secondary">
              Choose a topic
            </a>
          </>
        }
        aside={
          <section className={styles.dontSend} aria-labelledby="dont-send-title">
            <p id="dont-send-title" className={styles.dontSendTitle}>
              <span aria-hidden="true">
                <ShieldIcon width="20" height="20" />
              </span>
              Please don&apos;t send in an enquiry
            </p>
            <ul>
              {doNotSend.map((item) => (
                <li key={item}>
                  <CloseIcon width="14" height="14" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.dontSendNote}>We&apos;ll get the right person involved for everything else.</p>
          </section>
        }
      >
        <p>
          Choose what you would like to talk about and we&apos;ll get the right person involved.
          Please don&apos;t send passwords, payment details or sensitive customer data in an enquiry.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="routes-title">
        <div className="container">
          <SectionHeading id="routes-title" title="How can we help?" />
          <div className={styles.routeGrid}>
            {contactRoutes.map((route, index) => {
              const Icon = routeIcons[route.title];
              return (
                <article key={route.title} className={`card ${styles.routeTile}`} aria-labelledby={`route-${index}`}>
                  {Icon && (
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3 id={`route-${index}`}>{route.title}</h3>
                  <p>{route.description}</p>
                  <Link href={route.href} className={styles.routeAction}>
                    {route.label}
                    <ArrowRightIcon width="18" height="18" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="enquiry" className="section section--muted" aria-labelledby="enquiry-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.enquiryIntro}>
            <h2 id="enquiry-title">Send an enquiry</h2>
            <p>For anything else, send us a message and we&apos;ll get the right person involved.</p>
            <div className={`card ${styles.demoNudge}`}>
              <span className={styles.infoIcon} aria-hidden="true">
                <CalendarIcon />
              </span>
              <div>
                <p className={styles.demoNudgeTitle}>Prefer to see it working?</p>
                <p>Tell us how customers contact you and we&apos;ll shape a demo around your workflow.</p>
                <Link href="/book-demo" className={styles.routeAction}>
                  Book a Demo
                  <ArrowRightIcon width="18" height="18" />
                </Link>
              </div>
            </div>
          </div>
          <div className={`card ${styles.formCard}`}>
            <EnquiryForm kind="general" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="direct-title">
        <div className={`container ${styles.split} ${styles.infoPanels}`}>
          <div className="card">
            <div className={styles.infoHeader}>
              <span className={styles.infoIcon} aria-hidden="true">
                <BuildingIcon />
              </span>
              <h2 id="direct-title">{hasDirectChannels ? "Reach us directly" : "Company information"}</h2>
            </div>
            {hasDirectChannels && (
              <ul className={styles.channels}>
                {whatsapp && (
                  <li>
                    <a href={whatsappHref(whatsapp)} className="button button--whatsapp" target="_blank" rel="noopener noreferrer">
                      WhatsApp {whatsapp.display}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.value}`}>Call {phone.display}</a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email.value}`}>{email.display}</a>
                  </li>
                )}
                {schedulingUrl && (
                  <li>
                    <SmartLink href={schedulingUrl} external>
                      Schedule a call
                    </SmartLink>
                  </li>
                )}
                {address && <li>{address}</li>}
              </ul>
            )}
            <p>
              {siteConfig.productName} is a product of the {siteConfig.companyName}{" "}
              {siteConfig.divisionName}.
            </p>
            <SmartLink href={siteConfig.corporateWebsiteUrl} external className="button button--secondary">
              Visit the {siteConfig.companyName} website
            </SmartLink>
          </div>
          <div className="card">
            <div className={styles.infoHeader}>
              <span className={styles.infoIcon} aria-hidden="true">
                <SparkIcon />
              </span>
              <h2 id="more-title">Before you get in touch</h2>
            </div>
            <ul className={styles.linkRows} aria-labelledby="more-title">
              {beforeYouGetInTouch.map(({ href, label, Icon }) => (
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
        </div>
      </section>
    </>
  );
}
