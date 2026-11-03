import { previewDisclosure } from "@/content/previews";
import type { RoleChannel, RoleChannelContent } from "@/content/types";
import { MessageIcon, PhoneIcon, UserCheckIcon, WaveformIcon } from "@/components/ui/icons";
import whatsappStyles from "@/components/whatsapp/whatsapp.module.css";
import styles from "./solutions.module.css";

/**
 * Fictional conversation in a phone frame for a role's channel page (spec 4.2). WhatsApp
 * shows a chat; Voice shows a live-call transcript. Both end with the human handoff.
 */
export function ChannelConversation({
  channel,
  preview,
}: {
  channel: RoleChannel;
  preview: RoleChannelContent["preview"];
}) {
  const isVoice = channel === "voice";
  const Icon = isVoice ? PhoneIcon : MessageIcon;

  return (
    <div className={whatsappStyles.preview}>
      <figure className={whatsappStyles.screen} aria-labelledby="channel-preview-caption">
        <div className={whatsappStyles.header}>
          <span className={whatsappStyles.channel}>
            <span className={whatsappStyles.avatar} aria-hidden="true">
              <Icon />
              {!isVoice && <span className={whatsappStyles.dot} />}
            </span>
            {preview.context}
          </span>
          <span className={whatsappStyles.demoBadge}>Illustrative demo</span>
        </div>
        {isVoice && (
          <p className={styles.callActive}>
            <WaveformIcon width="18" height="18" />
            AI voice call active
          </p>
        )}
        <ol className={whatsappStyles.chat} aria-label={isVoice ? "Fictional call transcript" : "Fictional WhatsApp conversation"}>
          {preview.messages.map((message, index) => (
            <li key={index} className={message.speaker === "assistant" ? whatsappStyles.assistant : whatsappStyles.customer}>
              <span className={whatsappStyles.sender}>
                {message.speaker === "assistant" ? "AI assistant" : isVoice ? "Caller" : "Customer"}
              </span>
              <span>{message.text}</span>
            </li>
          ))}
        </ol>
        <div className={`${whatsappStyles.outcome} ${styles.channelHandoff}`}>
          <UserCheckIcon width="18" height="18" />
          <span>
            Handoff to {preview.handoff.to}
            <small>{preview.handoff.reason}</small>
          </span>
        </div>
        <figcaption id="channel-preview-caption" className={whatsappStyles.caption}>
          {previewDisclosure}. Names and details are fictional.
        </figcaption>
      </figure>
    </div>
  );
}
