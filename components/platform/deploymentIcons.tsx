import type { ComponentType, SVGProps } from "react";
import { CloudIcon, LayersIcon, MessageIcon, PlugIcon } from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per deployment option (content/deployment.ts), shared by /platform and /enterprise. */
export const deploymentIcons: Record<string, IconComponent> = {
  "standalone-saas": CloudIcon,
  "crm-erp-layer": PlugIcon,
  "whatsapp-onboarding": MessageIcon,
  "custom-deployment": LayersIcon,
};
