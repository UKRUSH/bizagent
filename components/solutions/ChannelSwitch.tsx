import Link from "next/link";
import { roleChannelHref, roleChannelLabels } from "@/content/roleChannels";
import { roleChannels, type RoleChannel, type RoleSlug } from "@/content/types";
import { MessageIcon, PhoneIcon } from "@/components/ui/icons";
import styles from "./solutions.module.css";

const channelIcons: Record<RoleChannel, typeof PhoneIcon> = {
  whatsapp: MessageIcon,
  voice: PhoneIcon,
};

/**
 * Segmented switch between a role's two channel pages. Each option is a real link, so
 * both pages are crawlable and the current one is marked with aria-current.
 */
export function ChannelSwitch({ role, current }: { role: RoleSlug; current: RoleChannel }) {
  return (
    <nav className={styles.channelSwitch} aria-label="Channel">
      <ul>
        {roleChannels.map((channel) => {
          const Icon = channelIcons[channel];
          return (
            <li key={channel}>
              <Link href={roleChannelHref(role, channel)} aria-current={channel === current ? "page" : undefined}>
                <Icon width="18" height="18" />
                {roleChannelLabels[channel].label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
