import type { ModuleSlug } from "./types";

/**
 * Fictional, clearly labelled illustrations for each module page (spec 7, 7.1). Each one
 * follows the "Website demonstration" column of the spec 7 table. Initials only; nothing
 * here describes a real customer, number or result.
 */
export interface ModuleIllustration {
  title: string;
  events: { label: string; detail: string }[];
  outcome: string;
}

export const moduleIllustrations: Record<ModuleSlug, ModuleIllustration> = {
  "inbound-calls": {
    title: "An incoming call becomes a booking, with handoff",
    events: [
      { label: "Call received", detail: "Returning caller K., recognised from the CRM" },
      { label: "Intent", detail: "Booking request, plus a question about an invoice" },
      { label: "Action", detail: "Appointment booked for Tuesday at 10:30; reminder scheduled" },
      { label: "Handoff", detail: "Invoice question sent to accounts with a call summary" },
    ],
    outcome: "Booking created and a ticket opened for accounts.",
  },
  "outbound-calls": {
    title: "Lead list to qualification, tagged result and next task",
    events: [
      { label: "List checked", detail: "Approved list imported; do-not-call and consent checked" },
      { label: "Call", detail: "Placed inside the permitted calling window for lead M." },
      { label: "Outcome", detail: "Tagged “interested — callback”" },
      { label: "Next task", detail: "Callback task created for the sales team" },
    ],
    outcome: "CRM updated and a task assigned to a salesperson.",
  },
  "whatsapp-messaging": {
    title: "A product enquiry with media and handoff",
    events: [
      { label: "Message", detail: "Customer S. sends a photo: “Do you have this in blue?”" },
      { label: "Answer", detail: "Catalogue checked; blue is in stock in two sizes" },
      { label: "Request", detail: "Customer asks for a bulk discount" },
      { label: "Handoff", detail: "Discount request sent to sales with the photo and chat" },
    ],
    outcome: "Stock question answered; pricing decision left with the team.",
  },
  "whatsapp-voice": {
    title: "A voice call with transcript and confirmation",
    events: [
      { label: "Call", detail: "Customer J. calls the business WhatsApp number" },
      { label: "Consent", detail: "Recording announced; customer continues" },
      { label: "Order", detail: "Two items captured from speech and read back" },
      { label: "Confirmed", detail: "Customer confirms; order sent to the order system" },
    ],
    outcome: "Order confirmed by read-back, with transcript and summary saved.",
  },
  "follow-ups": {
    title: "A follow-up timeline that stops on reply",
    events: [
      { label: "Day 1", detail: "Quote sent to lead P. by WhatsApp — delivered" },
      { label: "Day 3", detail: "Reminder message — no reply" },
      { label: "Day 7", detail: "Follow-up call scheduled — pending" },
      { label: "Reply", detail: "Lead replies on day 5; remaining steps stopped" },
    ],
    outcome: "Sequence stopped on reply and the lead passed to sales.",
  },
  "reminders-scheduling": {
    title: "A booking summary and reminder schedule",
    events: [
      { label: "Booking", detail: "Service visit for customer A. on Friday at 9:00" },
      { label: "Reminder 1", detail: "WhatsApp, two days before — confirmed" },
      { label: "Reminder 2", detail: "Call on the morning of the visit, if unconfirmed" },
      { label: "If missed", detail: "No-show follow-up offers a new slot" },
    ],
    outcome: "Customer confirmed; the calendar stays in sync.",
  },
  "call-filtering": {
    title: "A caller screening decision with review override",
    events: [
      { label: "Incoming", detail: "Unknown number with a low reputation score" },
      { label: "Screening", detail: "Caller asked for name and purpose" },
      { label: "Decision", detail: "Marked as likely telemarketing and redirected" },
      { label: "Review", detail: "Team member reviews the queue and allows the number" },
    ],
    outcome: "False positive corrected and the number added to the allow list.",
  },
  "customer-segmentation": {
    title: "A segment changes the workflow",
    events: [
      { label: "Profile", detail: "Customer V.: loyal tier, Tamil preferred, repeat purchases" },
      { label: "Segment", detail: "Rule assigns “loyal — high value”" },
      { label: "Routing", detail: "Calls go to the account manager first" },
      { label: "Action", detail: "Eligible for the approved loyalty offer" },
    ],
    outcome: "The reason for the segment is shown with the rule that applied.",
  },
  "recording-transcription": {
    title: "Consent, a redacted transcript and search",
    events: [
      { label: "Consent", detail: "Recording announced at call start — accepted" },
      { label: "Transcript", detail: "Speakers separated; card number redacted as [REDACTED]" },
      { label: "Summary", detail: "Topic: billing · Sentiment: neutral · Outcome: resolved" },
      { label: "Search", detail: "Found by a supervisor filtering “billing, last 7 days”" },
    ],
    outcome: "Access recorded in the audit trail.",
  },
  "promotions-campaigns": {
    title: "An approved template and eligibility check",
    events: [
      { label: "Template", detail: "Festival offer template — approved" },
      { label: "Audience", detail: "Loyalty segment, opted in to WhatsApp marketing" },
      { label: "Checks", detail: "Opt-outs removed; frequency cap respected" },
      { label: "Scheduled", detail: "Send set for Saturday at 10:00" },
    ],
    outcome: "Only eligible, opted-in customers are included.",
  },
  "sales-agent": {
    title: "Enquiry to qualification to a human-reviewed quote",
    events: [
      { label: "Enquiry", detail: "Lead R. asks about 15 office chairs" },
      { label: "Qualified", detail: "Budget approved, decision maker, needed this month — hot" },
      { label: "Draft quote", detail: "Prepared with tax from the price list" },
      { label: "Review", detail: "Waiting for manager approval before sending" },
    ],
    outcome: "Nothing is sent to the customer until the quote is approved.",
  },
  "call-center": {
    title: "Queues, handoff status and a QA panel",
    events: [
      { label: "Queues", detail: "Sinhala: 3 waiting · English: 1 waiting · VIP: 0" },
      { label: "Assistant", detail: "Routine balance enquiry resolved without queueing" },
      { label: "Handoff", detail: "Complaint transferred to agent N. with a summary" },
      { label: "QA", detail: "Call scored and added to the coaching review queue" },
    ],
    outcome: "Supervisor sees live queue status and quality reviews.",
  },
  "personal-assistant": {
    title: "A schedule suggestion that waits for approval",
    events: [
      { label: "Request", detail: "“Find time with L. next week for an hour”" },
      { label: "Suggestion", detail: "Tuesday 2:00 or Thursday 11:00, avoiding travel time" },
      { label: "Approval", detail: "Waiting for your choice before sending the invite" },
      { label: "Then", detail: "Invite sent and a reminder set the day before" },
    ],
    outcome: "No invite is sent until you approve.",
  },
};
