import type { ComponentType, SVGProps } from "react";
import type { RoleSlug } from "@/content/types";
import { HeadsetIcon, TrendingUpIcon, UserCheckIcon } from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per role, shared by the homepage roles section and /about. */
export const roleIcons: Record<RoleSlug, IconComponent> = {
  "call-center": HeadsetIcon,
  "sales-agent": TrendingUpIcon,
  "personal-assistant": UserCheckIcon,
};
