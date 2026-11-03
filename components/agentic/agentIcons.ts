import type { ComponentType, SVGProps } from "react";
import type { AgentIcon } from "@/content/agenticSolutions";
import {
  BriefcaseIcon,
  HeadsetIcon,
  LandmarkIcon,
  MegaphoneIcon,
  MonitorIcon,
  SparkIcon,
  TrendingUpIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";

/** Decorative icon per agent; shared by the server sections and the client previews. */
export const agentIcons: Record<AgentIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  manager: SparkIcon,
  sales: TrendingUpIcon,
  marketing: MegaphoneIcon,
  support: HeadsetIcon,
  hr: UsersIcon,
  finance: LandmarkIcon,
  operations: WorkflowIcon,
  it: MonitorIcon,
  executive: BriefcaseIcon,
};
