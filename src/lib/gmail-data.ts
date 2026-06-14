import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  CreditCard,
  FileText,
  HelpCircle,
  Mail,
  Megaphone,
  User,
} from "lucide-react";

export type Category =
  | "All"
  | "Recruiting"
  | "Finance"
  | "Meetings"
  | "Support"
  | "Marketing"
  | "Personal";

export type Priority = "Critical" | "High" | "Medium" | "Low";

export type Email = {
  id: string;
  subject: string;
  sender: string;
  senderEmail: string;
  preview: string;
  body: string;
  time: string;
  category: Category;
  priority: Priority;
  priorityScore: number;
  unread?: boolean;
  important?: boolean;
  aiSummary: string;
  suggestedActions: string[];
  reason?: string;
  dueDate?: string;
};

export const CATEGORY_META: Record<Category, { color: string; Icon: LucideIcon }> = {
  All: { color: "text-foreground bg-muted", Icon: Mail },
  Recruiting: { color: "text-amber-500 bg-amber-500/10", Icon: Briefcase },
  Finance: { color: "text-emerald-500 bg-emerald-500/10", Icon: CreditCard },
  Meetings: { color: "text-sky-500 bg-sky-500/10", Icon: Calendar },
  Support: { color: "text-violet-500 bg-violet-500/10", Icon: HelpCircle },
  Marketing: { color: "text-pink-500 bg-pink-500/10", Icon: Megaphone },
  Personal: { color: "text-primary bg-primary/10", Icon: User },
};

export const PRIORITY_META: Record<Priority, { color: string; ring: string }> = {
  Critical: { color: "text-rose-600 bg-rose-500/10", ring: "ring-rose-500/40" },
  High: { color: "text-amber-600 bg-amber-500/10", ring: "ring-amber-500/40" },
  Medium: { color: "text-sky-600 bg-sky-500/10", ring: "ring-sky-500/40" },
  Low: { color: "text-muted-foreground bg-muted", ring: "ring-border" },
};

export const EMAILS: Email[] = [
  {
    id: "e1",
    subject: "Interview Invitation — Software Engineer Intern",
    sender: "Amazon Recruiter",
    senderEmail: "recruiter@amazon.com",
    preview: "We're excited to invite you for the next round of interviews on…",
    body: "Hi Charvi,\n\nWe're excited to invite you to the next round of interviews for the Software Engineer Intern role. Please confirm your availability for any of the following slots this week.\n\nBest,\nAmazon Talent",
    time: "2m ago",
    category: "Recruiting",
    priority: "Critical",
    priorityScore: 96,
    unread: true,
    important: true,
    aiSummary: "Amazon is requesting interview availability for the SWE Intern role this week. Response expected within 24h.",
    suggestedActions: ["Reply with availability", "Add to calendar", "Snooze 1 day"],
    reason: "Recruiter awaiting response — slot fills fast",
    dueDate: "Today, 6:00 PM",
  },
  {
    id: "e2",
    subject: "Invoice INV-2098 — Payment due",
    sender: "Stripe Billing",
    senderEmail: "billing@stripe.com",
    preview: "Your invoice of $1,240 is due in 3 days. Auto-pay is disabled.",
    body: "Invoice INV-2098 for $1,240.00 is due on Friday. Auto-pay is currently disabled for this account.",
    time: "1h ago",
    category: "Finance",
    priority: "High",
    priorityScore: 84,
    unread: true,
    important: true,
    aiSummary: "Outstanding invoice of $1,240 due Friday. Auto-pay disabled — manual action required.",
    suggestedActions: ["Pay invoice", "Enable auto-pay", "Forward to finance"],
    reason: "Payment deadline in 3 days",
    dueDate: "Fri, 11:59 PM",
  },
  {
    id: "e3",
    subject: "Team Sync — Friday 3 PM",
    sender: "Priya Menon",
    senderEmail: "priya@team.co",
    preview: "Adding you to the weekly sync — agenda inside.",
    body: "Hey, adding you to our weekly team sync. Agenda: roadmap review, blockers, next sprint.",
    time: "3h ago",
    category: "Meetings",
    priority: "Medium",
    priorityScore: 62,
    aiSummary: "Recurring team sync invitation for Friday 3 PM. Agenda attached.",
    suggestedActions: ["Accept", "Propose new time", "Decline"],
    reason: "Meeting requires confirmation",
    dueDate: "Fri, 3:00 PM",
  },
  {
    id: "e4",
    subject: "Security alert for your GitHub account",
    sender: "GitHub Support",
    senderEmail: "noreply@github.com",
    preview: "A potential vulnerability was found in a repository you contribute to.",
    body: "A potential security vulnerability was detected in `charvi/email-ai`. Review the Dependabot alert and patch within 7 days.",
    time: "5h ago",
    category: "Support",
    priority: "High",
    priorityScore: 78,
    unread: true,
    aiSummary: "Dependabot flagged a vulnerability in charvi/email-ai. 7-day window to patch.",
    suggestedActions: ["Open alert", "Apply patch", "Assign to teammate"],
    reason: "Security risk — patch window closing",
    dueDate: "In 7 days",
  },
  {
    id: "e5",
    subject: "Black Friday — 60% off Pro plan",
    sender: "Notion",
    senderEmail: "hello@notion.so",
    preview: "Upgrade your workspace this week and save 60%.",
    body: "Limited time: 60% off Pro for the first year. Offer expires Sunday.",
    time: "1d ago",
    category: "Marketing",
    priority: "Low",
    priorityScore: 18,
    aiSummary: "Promotional email — 60% off Notion Pro until Sunday.",
    suggestedActions: ["Archive", "Unsubscribe"],
  },
  {
    id: "e6",
    subject: "Coffee next week?",
    sender: "Aarav Khanna",
    senderEmail: "aarav@gmail.com",
    preview: "Free Tuesday or Thursday afternoon?",
    body: "Hey! It's been a while. Free for coffee Tue or Thu afternoon?",
    time: "1d ago",
    category: "Personal",
    priority: "Medium",
    priorityScore: 55,
    aiSummary: "Friend asking to schedule coffee Tue/Thu afternoon.",
    suggestedActions: ["Reply with availability", "Suggest video call"],
    reason: "Personal contact awaiting reply",
    dueDate: "Reply within 2 days",
  },
  {
    id: "e7",
    subject: "Contract renewal — HSBC engagement",
    sender: "HSBC Legal",
    senderEmail: "legal@hsbc.com",
    preview: "Please review the attached MSA renewal before EOW.",
    body: "Attached is the MSA renewal for the next 12 months. Please review the redlines and confirm.",
    time: "2d ago",
    category: "Finance",
    priority: "Critical",
    priorityScore: 92,
    important: true,
    aiSummary: "MSA renewal requires legal review and confirmation by end of week.",
    suggestedActions: ["Review contract", "Forward to legal", "Schedule call"],
    reason: "Contract deadline — overdue if missed",
    dueDate: "EOW",
  },
  {
    id: "e8",
    subject: "Quarterly review submission",
    sender: "People Ops",
    senderEmail: "peopleops@team.co",
    preview: "Reminder: submit your Q4 self-review by tomorrow.",
    body: "Friendly reminder — your Q4 self-review is due tomorrow EOD.",
    time: "2d ago",
    category: "Personal",
    priority: "High",
    priorityScore: 80,
    aiSummary: "Q4 self-review due tomorrow EOD.",
    suggestedActions: ["Open review form", "Snooze until tonight"],
    reason: "Internal deadline tomorrow",
    dueDate: "Tomorrow, EOD",
  },
];

export type ActionItem = {
  id: string;
  title: string;
  source: string;
  priority: Priority;
  deadline: string;
  status: "Pending" | "In progress" | "Done";
  Icon: LucideIcon;
  color: string;
};

export const ACTIONS: ActionItem[] = [
  { id: "a1", title: "Reply to Amazon recruiter with availability", source: "Amazon Recruiter — Interview Invitation", priority: "Critical", deadline: "Today, 6:00 PM", status: "Pending", Icon: Briefcase, color: "text-amber-500 bg-amber-500/10" },
  { id: "a2", title: "Pay Stripe invoice INV-2098", source: "Stripe Billing — Payment due", priority: "High", deadline: "Fri, 11:59 PM", status: "Pending", Icon: CreditCard, color: "text-emerald-500 bg-emerald-500/10" },
  { id: "a3", title: "Schedule Friday team sync", source: "Priya Menon — Team Sync", priority: "Medium", deadline: "Fri, 3:00 PM", status: "In progress", Icon: Calendar, color: "text-sky-500 bg-sky-500/10" },
  { id: "a4", title: "Follow up with HSBC on contract redlines", source: "HSBC Legal — Contract renewal", priority: "Critical", deadline: "EOW", status: "Pending", Icon: FileText, color: "text-violet-500 bg-violet-500/10" },
  { id: "a5", title: "Review GitHub Dependabot alert", source: "GitHub Support — Security alert", priority: "High", deadline: "In 7 days", status: "Pending", Icon: AlertTriangle, color: "text-rose-500 bg-rose-500/10" },
  { id: "a6", title: "Submit Q4 self-review", source: "People Ops — Quarterly review", priority: "High", deadline: "Tomorrow, EOD", status: "In progress", Icon: User, color: "text-primary bg-primary/10" },
];

export const RECENT_ACTIVITY = [
  { Icon: Mail, color: "text-primary bg-primary/10", title: "New email from Amazon Recruiter", time: "2 sec ago" },
  { Icon: Mail, color: "text-emerald-500 bg-emerald-500/10", title: "Stripe invoice classified as Finance · High priority", time: "1 min ago" },
  { Icon: Mail, color: "text-sky-500 bg-sky-500/10", title: "Calendar invite parsed from Priya Menon", time: "3 min ago" },
  { Icon: Mail, color: "text-amber-500 bg-amber-500/10", title: "Incremental sync completed — 12 emails", time: "5 min ago" },
  { Icon: Mail, color: "text-violet-500 bg-violet-500/10", title: "GitHub security alert routed to Support", time: "12 min ago" },
];

export const KPIS = {
  processed: 1284,
  newToday: 12,
  important: 7,
  pendingActions: ACTIONS.filter((a) => a.status !== "Done").length,
  followUps: 4,
  lastSync: "10 sec ago",
};

export const TOP_SENDERS = [
  { name: "Amazon Recruiter", count: 18 },
  { name: "Stripe Billing", count: 14 },
  { name: "LinkedIn", count: 12 },
  { name: "GitHub", count: 9 },
  { name: "HSBC Legal", count: 7 },
  { name: "Notion", count: 6 },
];

export const VOLUME_TREND = [22, 38, 28, 55, 42, 48, 36, 51, 44, 39, 58, 47];
export const RESPONSE_TIME = [4.2, 3.8, 3.1, 2.6, 2.9, 2.4, 2.1];
export const CATEGORY_DISTRIBUTION: { name: Category; value: number }[] = [
  { name: "Recruiting", value: 28 },
  { name: "Finance", value: 22 },
  { name: "Meetings", value: 18 },
  { name: "Support", value: 12 },
  { name: "Marketing", value: 14 },
  { name: "Personal", value: 6 },
];
export const PRIORITY_DISTRIBUTION: { name: Priority; value: number }[] = [
  { name: "Critical", value: 9 },
  { name: "High", value: 21 },
  { name: "Medium", value: 38 },
  { name: "Low", value: 32 },
];