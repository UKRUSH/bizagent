import type { ComponentType, SVGProps } from "react";
import type { IntegrationCategoryId } from "@/content/types";
import {
  BarChartIcon,
  BoxIcon,
  CalendarIcon,
  HeadsetIcon,
  LandmarkIcon,
  LayersIcon,
  MailIcon,
  MessageIcon,
  PhoneIcon,
  PlugIcon,
  ShoppingBagIcon,
  SlidersIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per integration category. Typed by id, so a new category fails typecheck until it has one. */
export const integrationIcons: Record<IntegrationCategoryId, IconComponent> = {
  telephony: PhoneIcon,
  whatsapp: MessageIcon,
  pbx: HeadsetIcon,
  crm: UsersIcon,
  erp: LayersIcon,
  calendar: CalendarIcon,
  email: MailIcon,
  accounting: BarChartIcon,
  payments: PlugIcon,
  hr: WorkflowIcon,
  commerce: ShoppingBagIcon,
  logistics: BoxIcon,
  government: LandmarkIcon,
  productivity: SlidersIcon,
};
