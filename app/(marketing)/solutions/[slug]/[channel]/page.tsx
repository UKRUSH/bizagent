import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ComponentType, type SVGProps } from "react";
import { approvedProviderAttribution } from "@/config/site";
import { getIndustry } from "@/content/industries";
import { getModules, moduleAvailabilityLabels } from "@/content/modules";
import { getRoleChannel, roleChannelContent, roleChannelHref, roleChannelLabels } from "@/content/roleChannels";
import { getRole } from "@/content/roles";
import type { RoleChannel } from "@/content/types";
import { moduleIcons } from "@/components/features/moduleIcons";
import { ChannelConversation } from "@/components/solutions/ChannelConversation";
import { ChannelSwitch } from "@/components/solutions/ChannelSwitch";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { PageSkeleton } from "@/components/ui/PageSkeleton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ArrowRightIcon,
  BarChartIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  FilterIcon,
  HeadsetIcon,
  ImageIcon,
  LayersIcon,
  LockIcon,
  MegaphoneIcon,
  MessageIcon,
  MicIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
  PlugIcon,
  ShieldIcon,
  SparkIcon,
  TrendingUpIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import whatsappStyles from "@/components/whatsapp/whatsapp.module.css";
import styles from "@/components/solutions/solutions.module.css";

type Params = PageProps<"/solutions/[slug]/[channel]">["params"];

/** Capability icons keyed by the `icon` field in content/roleChannels.ts. */
const capabilityIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  message: MessageIcon,
  mic: MicIcon,
  workflow: WorkflowIcon,
  users: UsersIcon,
  phone: PhoneIcon,
  headset: HeadsetIcon,
  chart: BarChartIcon,
  image: ImageIcon,
  trending: TrendingUpIcon,
  megaphone: MegaphoneIcon,
  outgoing: PhoneOutgoingIcon,
  calendar: CalendarIcon,
  plug: PlugIcon,
  clock: ClockIcon,
  filter: FilterIcon,
};

/**
 * Role pages, one per channel (spec 5: /solutions/call-center, /sales-agent,
 * /personal-assistant, each with /whatsapp and /voice). The bare role URL redirects to
 * WhatsApp in next.config.ts; unknown slugs and channels get a 404 in proxy.ts.
 */
export function generateStaticParams() {
  return roleChannelContent.map((entry) => ({ slug: entry.role, channel: entry.channel }));
}

async function resolve(params: Params) {
  const { slug, channel } = await params;
  const role = getRole(slug);
  const content = role && getRoleChannel(role.slug, channel);
  return role && content ? { role, content } : null;
}

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]/[channel]">): Promise<Metadata> {
  const page = await resolve(params);
  if (!page) return {};
  const { role, content } = page;
  return {
    title: `${role.title} — ${roleChannelLabels[content.channel].label}`,
    description: content.description,
    alternates: { canonical: roleChannelHref(role.slug, content.channel) },
  };
}

/** Reading params needs a Suspense boundary for instant client navigation (see PageSkeleton). */
export default function RoleChannelPage({ params }: PageProps<"/solutions/[slug]/[channel]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <RoleChannelContent params={params} />
    </Suspense>
  );
}

async function RoleChannelContent({ params }: { params: Params }) {
  const page = await resolve(params);
  if (!page) notFound();
  const { role, content } = page;

  const channelLabel = roleChannelLabels[content.channel].label;
  const otherChannel: RoleChannel = content.channel === "whatsapp" ? "voice" : "whatsapp";
  const isWhatsApp = content.channel === "whatsapp";
  const demoHref = `/book-demo?role=${role.formRole}`;
  const relatedIndustries = role.relatedIndustries.flatMap((slug) => getIndustry(slug) ?? []);
  const attribution = approvedProviderAttribution();
  // Channel questions first; role questions they already cover are dropped.
  const faqs = [
    ...content.faqs,
    ...role.faqs.filter((faq) => !content.faqs.some((item) => item.question === faq.question)),
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Call Agent" },
          { label: role.title, href: role.href },
          { label: channelLabel },
        ]}
        beforeTitle={<ChannelSwitch role={role.slug} current={content.channel} />}
        eyebrow={`${role.title} · ${channelLabel}`}
        title={content.headline}
        actions={
          <>
            <Link href={demoHref} className="button">
              {role.ctaLabel}
            </Link>
            <a href="#how-it-works" className="button button--secondary">
              See how it works
            </a>
          </>
        }
        aside={<ChannelConversation channel={content.channel} preview={content.preview} />}
      >
        <p>{content.description}</p>
        <ul className={whatsappStyles.heroChips} aria-label="Highlights">
          {content.highlights.map((item) => (
            <li key={item}>
              <CheckIcon width="16" height="16" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      {attribution && (
        <section className={`section ${styles.providerSection}`} aria-labelledby="provider-title">
          <div className="container">
            <div className={styles.providerPanel}>
              <div>
                <span className={styles.providerMark}>
                  <ShieldIcon width="16" height="16" />
                  Meta Tech Provider
                </span>
                <h2 id="provider-title">Built by Dilexus. Trusted by Meta.</h2>
                <p>{attribution}</p>
              </div>
              <ul className={styles.providerPoints}>
                <li>
                  <MessageIcon width="20" height="20" />
                  <span>
                    <strong>WhatsApp Business integration</strong>
                    Chats, voice notes, templates and calls on your own business number.
                  </span>
                </li>
                <li>
                  <LockIcon width="20" height="20" />
                  <span>
                    <strong>Your account stays yours</strong>
                    We never ask for your WhatsApp or Meta account passwords.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading
            id="capabilities-title"
            eyebrow={channelLabel}
            title={isWhatsApp ? "What it does on WhatsApp." : "What it does on every call."}
          />
          <div className={styles.fourGrid}>
            {content.capabilities.map((capability) => {
              const Icon = capabilityIcons[capability.icon] ?? SparkIcon;
              return (
                <article key={capability.title} className={`card ${styles.pointCard}`} aria-label={capability.title}>
                  <span className="card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--muted" aria-labelledby="setup-title">
        <div className="container">
          <SectionHeading id="setup-title" title="Go live in three steps." />
          <ol className={`${styles.steps} ${styles.stepsDescribed} ${styles.threeSteps}`}>
            {content.steps.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Who does what">
        <div className={`container ${styles.whoSplit}`}>
          <article className={`card ${styles.sideCard}`} aria-labelledby="assistant-title">
            <div className={styles.sideHeader}>
              <span className={styles.sideIcon} aria-hidden="true">
                <SparkIcon />
              </span>
              <h2 id="assistant-title">What the assistant handles</h2>
            </div>
            <ul className="check-list">
              {role.responsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <span className={styles.handoffMarker} aria-hidden="true">
            <ArrowRightIcon />
            <span>Handoff</span>
          </span>
          <article className={`card ${styles.sideCard} ${styles.teamCard}`} aria-labelledby="team-title">
            <div className={styles.sideHeader}>
              <span className={`${styles.sideIcon} ${styles.sideIconTeam}`} aria-hidden="true">
                <UsersIcon />
              </span>
              <h2 id="team-title">What stays with your team</h2>
            </div>
            <ul className="check-list">
              {role.teamResponsibilities.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Conversations move to a person whenever a customer asks, a topic is sensitive, or
              the assistant cannot resolve the request.
            </p>
          </article>
        </div>
      </section>

      <section id="modules" className="section section--muted" aria-labelledby="modules-title">
        <div className="container">
          <SectionHeading id="modules-title" title="The modules behind this role">
            <p>Each module has its own page with every capability, use cases and availability.</p>
          </SectionHeading>
          <div className={styles.moduleGrid}>
            {getModules(role.modules).map((entry) => {
              const Icon = moduleIcons[entry.slug];
              return (
                <article key={entry.slug} className={`card ${styles.moduleCard}`} aria-labelledby={`module-${entry.slug}`}>
                  <div className={styles.moduleHeader}>
                    <span className="card-icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <span className={styles.moduleNumber}>Module {entry.number}</span>
                      <h3 id={`module-${entry.slug}`}>{entry.title}</h3>
                    </div>
                  </div>
                  <p>{entry.summary}</p>
                  <div className={styles.groups}>
                    {entry.featureGroups.slice(0, 2).map((group) => (
                      <div key={group.heading}>
                        <h4>{group.heading}</h4>
                        <ul className="feature-list">
                          {group.items.slice(0, 3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className={styles.moduleFooter}>
                    <StatusBadge label={moduleAvailabilityLabels[entry.availability]} />
                    <Link href={`/features/${entry.slug}`} className={styles.cardLink}>
                      View module<span className="sr-only">: {entry.title}</span>
                      <ArrowRightIcon width="18" height="18" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="use-cases-title">
        <div className="container">
          <SectionHeading id="use-cases-title" title="Where it helps" />
          <div className={`grid-3 ${styles.useCases}`}>
            {role.useCases.map((useCase) => (
              <article key={useCase.title} className={`card ${styles.useCase}`} aria-label={useCase.title}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
          {relatedIndustries.length > 0 && (
            <div className={styles.related}>
              <h3 id="industries-title">Common in</h3>
              <ul className={styles.industryLinks} aria-labelledby="industries-title">
                {relatedIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                      <ArrowRightIcon width="16" height="16" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about the ${role.title} on ${roleChannelLabels[content.channel].short}`} />
          <FaqList questions={faqs} />
          {role.slug === "call-center" && (
            <div className={styles.callout}>
              <LayersIcon width="20" height="20" />
              <p>
                Running a BPO or several brands? <Link href="/enterprise">See white-label and enterprise options</Link>.
              </p>
            </div>
          )}
          <Link href={roleChannelHref(role.slug, otherChannel)} className={styles.switchCard}>
            {otherChannel === "voice" ? <PhoneIcon width="22" height="22" /> : <MessageIcon width="22" height="22" />}
            <span>
              <strong>Prefer {roleChannelLabels[otherChannel].label}?</strong>
              See the {role.title} on {roleChannelLabels[otherChannel].short}
            </span>
            <ArrowRightIcon width="20" height="20" />
          </Link>
        </div>
      </section>

      <CtaBand
        id="role-cta-title"
        title={`See the ${role.title} on ${roleChannelLabels[content.channel].short} with your own workflow.`}
        text="Tell us how customers reach you and what your team handles most often. We’ll shape the demo around this role."
        action={{ href: demoHref, label: role.ctaLabel }}
        showWhatsApp={isWhatsApp}
      />
    </>
  );
}
