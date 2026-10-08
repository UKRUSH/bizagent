/**
 * Form wording (spec 12.1). The enquiry acknowledgement must use the business's approved
 * privacy wording. The statements below are DRAFTS awaiting that approval
 * (BUILD_PLAN open confirmation 7); replace them and set `approved: true` once confirmed.
 * Marketing consent is always a separate, unticked choice.
 */
export const enquiryAcknowledgement = {
  approved: false,
  demo: "I agree that BizMaster Solutions may use these details to respond to my demo request.",
  general: "I agree that BizMaster Solutions may use these details to respond to my enquiry.",
  security: "I agree that BizMaster Solutions may use these details to respond to my security information request.",
};

export const marketingConsentLabel =
  "Optional: I'd like to receive product news and offers from BizMaster Solutions. I can opt out at any time.";

export const sensitiveDataHint =
  "Please don't include passwords, payment details or your customers' personal information.";

/** Shown when the request store is not configured or temporarily unavailable. */
export const unavailableMessage =
  "We couldn't receive your request just now, so nothing has been sent. Your answers are still here; please try again shortly.";
