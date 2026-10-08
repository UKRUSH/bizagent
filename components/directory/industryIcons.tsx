import type { ComponentType, SVGProps } from "react";
import type { IndustrySlug } from "@/content/types";
import {
  BarChartIcon,
  BedIcon,
  BoxIcon,
  BriefcaseIcon,
  BuildingIcon,
  CarIcon,
  GraduationCapIcon,
  HeadsetIcon,
  HeartPulseIcon,
  HomeIcon,
  LandmarkIcon,
  MegaphoneIcon,
  ShoppingBagIcon,
  UmbrellaIcon,
  UsersIcon,
  UtensilsIcon,
  WrenchIcon,
} from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per industry. Typed by slug, so a new industry fails typecheck until it has one. */
export const industryIcons: Record<IndustrySlug, IconComponent> = {
  "clinics-hospitals": HeartPulseIcon,
  hotels: BedIcon,
  restaurants: UtensilsIcon,
  "service-companies": WrenchIcon,
  "support-teams": HeadsetIcon,
  "bpos-call-centres": UsersIcon,
  institutions: BuildingIcon,
  "real-estate": HomeIcon,
  education: GraduationCapIcon,
  insurance: UmbrellaIcon,
  "retail-ecommerce": ShoppingBagIcon,
  "d2c-brands": BoxIcon,
  "executives-professionals": BriefcaseIcon,
  agencies: MegaphoneIcon,
  "sales-teams-smes": BarChartIcon,
  automotive: CarIcon,
  "finance-professional-services": LandmarkIcon,
};

/** Icon for an industry slug from content (typed as string there), if one is defined. */
export function industryIcon(slug: string): IconComponent | undefined {
  return Object.hasOwn(industryIcons, slug) ? industryIcons[slug as IndustrySlug] : undefined;
}
