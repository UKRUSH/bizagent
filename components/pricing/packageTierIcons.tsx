import type { ComponentType, SVGProps } from "react";
import { HeadsetIcon, LayersIcon, SparkIcon, TrendingUpIcon, UsersIcon } from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per quoted package tier (content/plans.ts), shared by /enterprise and /pricing. */
export const packageTierIcons: Record<string, IconComponent> = {
  starter: SparkIcon,
  growth: TrendingUpIcon,
  professional: HeadsetIcon,
  enterprise: LayersIcon,
  "white-label": UsersIcon,
};
