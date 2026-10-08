import type { ComponentType, SVGProps } from "react";
import type { ModuleCategory, ModuleSlug } from "@/content/types";
import {
  CalendarIcon,
  FilterIcon,
  HeadsetIcon,
  MegaphoneIcon,
  MessageIcon,
  MicIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
  RefreshIcon,
  SearchIcon,
  SlidersIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon,
  WaveformIcon,
  WorkflowIcon,
} from "@/components/ui/icons";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per module. Typed by slug, so a new module fails typecheck until it has one. */
export const moduleIcons: Record<ModuleSlug, IconComponent> = {
  "inbound-calls": PhoneIcon,
  "outbound-calls": PhoneOutgoingIcon,
  "whatsapp-messaging": MessageIcon,
  "whatsapp-voice": MicIcon,
  "follow-ups": WorkflowIcon,
  "reminders-scheduling": CalendarIcon,
  "call-filtering": FilterIcon,
  "customer-segmentation": UsersIcon,
  "recording-transcription": WaveformIcon,
  "promotions-campaigns": MegaphoneIcon,
  "sales-agent": TrendingUpIcon,
  "call-center": HeadsetIcon,
  "personal-assistant": UserCheckIcon,
};

/** Decorative icon per module category. */
export const categoryIcons: Record<ModuleCategory, IconComponent> = {
  respond: PhoneIcon,
  "follow-through": RefreshIcon,
  understand: SearchIcon,
  grow: TrendingUpIcon,
  manage: SlidersIcon,
};
