import { getPlansByFamily, planFamilies } from "@/content/plans";
import type { PlanFamily } from "@/content/types";
import { Tabs } from "@/components/ui/Tabs";
import { PlanCard, TrialBanner } from "./PlanCard";

function FamilyPanel({ family, previewDrafts }: { family: PlanFamily; previewDrafts: boolean }) {
  const familyPlans = getPlansByFamily(family);
  const trial = familyPlans.find((plan) => plan.isTrial);
  const paid = familyPlans.filter((plan) => !plan.isTrial);
  return (
    <>
      {trial && <TrialBanner plan={trial} previewDrafts={previewDrafts} />}
      <div className="pricing-grid">
        {paid.map((plan) => (
          <PlanCard key={plan.slug} plan={plan} previewDrafts={previewDrafts} />
        ))}
      </div>
    </>
  );
}

/**
 * "Chat AI" and "Voice + Chat AI" tabs (spec 8.4). Monthly pricing only; the trial is a
 * compact banner above the paid cards (spec 15.2). `#chat-plans` / `#voice-plans` in the
 * URL select the matching tab.
 */
export function PlanFamilyTabs({ previewDrafts, idBase = "plans" }: { previewDrafts: boolean; idBase?: string }) {
  return (
    <Tabs
      label="Plan type"
      idBase={idBase}
      hashTargets={{ "#chat-plans": "chat", "#voice-plans": "voice" }}
      tabs={planFamilies.map((family) => ({
        id: family.id,
        label: family.label,
        content: <FamilyPanel family={family.id} previewDrafts={previewDrafts} />,
      }))}
    />
  );
}
