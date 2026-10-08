import type { Metadata } from "next";
import Link from "next/link";
import { industries, industrySearchSuggestions, industrySearchText } from "@/content/industries";
import { getModules } from "@/content/modules";
import { IndustryDirectory, type DirectoryIndustry } from "@/components/directory/IndustryDirectory";
import { IndustryMosaic } from "@/components/directory/IndustryMosaic";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "How BizMaster AI Agent supports bookings, enquiries, reminders and follow-ups in 17 industries, with regulated decisions kept with your team.",
  alternates: { canonical: "/industries" },
};

const directory: DirectoryIndustry[] = industries.map((industry) => ({
  slug: industry.slug,
  name: industry.name,
  summary: industry.summary,
  moduleNames: getModules(industry.modules).map((entry) => entry.shortTitle),
  searchText: industrySearchText(industry),
}));

/** Searchable buyer segments (spec 5 /industries, 9). */
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
        eyebrow="Industries"
        title="Built around how your industry works."
        actions={
          <>
            <Link href="/book-demo" className="button">
              Book a Demo
            </Link>
            <a href="#directory" className="button button--secondary">
              Find your industry
            </a>
          </>
        }
        aside={<IndustryMosaic />}
      >
        <p>
          See how bookings, enquiries, reminders and handoff fit together in your sector. Each
          page shows a fictional example, the modules involved and the decisions that stay with
          your team.
        </p>
      </PageHero>

      <section id="directory" className="section" aria-label="Industry directory">
        <div className="container">
          <IndustryDirectory industries={directory} suggestions={industrySearchSuggestions} />
        </div>
      </section>

      <CtaBand
        id="industries-cta-title"
        title="Don’t see your industry?"
        text="Most businesses that rely on calls and WhatsApp share the same building blocks. Tell us about your workflow."
        action={{ href: "/book-demo?industry=other", label: "Describe Your Workflow" }}
      />
    </>
  );
}
