import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Clock,
  Eye,
  FileText,
  KeyRound,
  Mail,
  RefreshCw,
  Sparkles,
  Star,
  Trash2,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useIntegrations, type Provider } from "@/lib/integrations";

// Backwards-compatible shapes (existing routes still pass these — most are unused
// in the new dashboard-style layout but accepted to avoid breaking imports).
export type ManageMetric = { Icon: LucideIcon; label: string; value: number | string; sub: string; delta?: string; color: string };
export type ManageActivity = { Icon: LucideIcon; color: string; title: string; note: string; time: string; dot: string };
export type ManageQuickAction = { Icon: LucideIcon; label: string; color: string; onClick?: () => void; to?: string };
export type ManageInsight = { Icon: LucideIcon; color: string; text: string };

export type ManageConfig = {
  provider: Provider;
  name: "Gmail" | "LinkedIn" | "Instagram";
  Icon: LucideIcon;
  accent: string;
  headerTitle?: string;
  headerSubtitle?: string;
  statusTitle?: string;
  insightsTitle?: string;
  chartTitle?: string;
  metrics?: ManageMetric[];
  activity?: ManageActivity[];
  quickActions?: ManageQuickAction[];
  insights?: ManageInsight[];
  chartPoints?: number[];
  chartLabel?: string;
};

// ----- Per-provider sample dataset (mirrors the reference dashboard) -----
type Conversation = { initials: string; bg: string; sender: string; subject: string; preview: string; time: string; important?: boolean; dot: string };
type TopSender = { Icon?: LucideIcon; initials?: string; iconColor?: string; name: string; count: number };

type ProviderData = {
  metrics: { Icon: LucideIcon; value: number; label: string; sub: string; delta?: string; color: string }[];
  conversationsTitle: string;
  conversations: Conversation[];
  activityTitle: string;
  activityValue: number;
  activityLabel: string;
  activityDelta: string;
  chart: number[];
  topSendersTitle: string;
  topSenders: TopSender[];
  recentActivity: { Icon: LucideIcon; color: string; title: string; time: string }[];
};

const DATA: Record<Provider, ProviderData> = {
  gmail: {
    metrics: [
      { Icon: Mail, value: 201, label: "Emails Imported", sub: "Total synced", delta: "12%", color: "text-primary bg-primary/10" },
      { Icon: Zap, value: 12, label: "New Today", sub: "Since last sync", delta: "8%", color: "text-emerald-500 bg-emerald-500/10" },
      { Icon: Star, value: 7, label: "Important", sub: "Needs attention", color: "text-amber-500 bg-amber-500/10" },
      { Icon: Clock, value: 4, label: "Follow-ups", sub: "Pending replies", color: "text-sky-500 bg-sky-500/10" },
    ],
    conversationsTitle: "Recent Conversations",
    conversations: [
      { initials: "a", bg: "bg-amber-500/15 text-amber-700", sender: "Amazon Recruiter", subject: "Interview Invitation - Software Engineer Intern", preview: "We're excited to invite you for the next round...", time: "2m ago", important: true, dot: "bg-primary" },
      { initials: "in", bg: "bg-blue-600/15 text-blue-700", sender: "LinkedIn Job Alerts", subject: "New opportunities in Financial Engineering", preview: "We found 5 new opportunities that match...", time: "15m ago", dot: "bg-sky-500" },
      { initials: "H", bg: "bg-red-600/15 text-red-700", sender: "HSBC Recruitment", subject: "Financial Engineering Graduate Program", preview: "Thank you for your application to HSBC...", time: "1h ago", important: true, dot: "bg-primary" },
      { initials: "GH", bg: "bg-zinc-800/15 text-zinc-800 dark:text-zinc-200", sender: "GitHub", subject: "Security alert for charvisrivastava02", preview: "We found a potential security vulnerability...", time: "2h ago", dot: "bg-sky-500" },
      { initials: "tcs", bg: "bg-indigo-500/15 text-indigo-700", sender: "TCS Careers", subject: "Update on your application", preview: "We have reviewed your application...", time: "3h ago", dot: "bg-sky-500" },
    ],
    activityTitle: "Email Activity",
    activityValue: 68,
    activityLabel: "Emails received",
    activityDelta: "18% vs last week",
    chart: [22, 38, 28, 55, 42, 48, 36],
    topSendersTitle: "Top Senders",
    topSenders: [
      { initials: "in", iconColor: "bg-blue-600/15 text-blue-700", name: "LinkedIn", count: 24 },
      { initials: "a", iconColor: "bg-amber-500/15 text-amber-700", name: "Amazon Recruiter", count: 16 },
      { initials: "H", iconColor: "bg-red-600/15 text-red-700", name: "HSBC Recruitment", count: 12 },
      { initials: "GH", iconColor: "bg-zinc-800/15 text-zinc-800 dark:text-zinc-200", name: "GitHub", count: 8 },
      { initials: "o", iconColor: "bg-muted text-muted-foreground", name: "Others", count: 8 },
    ],
    recentActivity: [
      { Icon: Mail, color: "text-primary bg-primary/10", title: "New email from Amazon Recruiter", time: "2 seconds ago" },
      { Icon: Activity, color: "text-emerald-500 bg-emerald-500/10", title: "Email processed successfully", time: "5 seconds ago" },
      { Icon: RefreshCw, color: "text-sky-500 bg-sky-500/10", title: "Database updated", time: "8 seconds ago" },
      { Icon: Mail, color: "text-primary bg-primary/10", title: "New email from LinkedIn", time: "12 seconds ago" },
      { Icon: Zap, color: "text-emerald-500 bg-emerald-500/10", title: "Sync completed", time: "15 seconds ago" },
    ],
  },
  linkedin: {
    metrics: [
      { Icon: Mail, value: 48, label: "Messages Synced", sub: "Total inbox", delta: "9%", color: "text-blue-600 bg-blue-600/10" },
      { Icon: Zap, value: 12, label: "Job Alerts", sub: "This week", delta: "4%", color: "text-emerald-500 bg-emerald-500/10" },
      { Icon: Star, value: 6, label: "Connections", sub: "Last 7 days", color: "text-amber-500 bg-amber-500/10" },
      { Icon: Clock, value: 3, label: "Profile Updates", sub: "From network", color: "text-sky-500 bg-sky-500/10" },
    ],
    conversationsTitle: "Recent Messages",
    conversations: [
      { initials: "RS", bg: "bg-blue-600/15 text-blue-700", sender: "Riya Sharma", subject: "Quick intro — Quant role", preview: "Hi Charvi, saw your profile and wanted to...", time: "10s ago", important: true, dot: "bg-primary" },
      { initials: "JP", bg: "bg-emerald-500/15 text-emerald-700", sender: "Job Alerts", subject: "5 Financial Engineering roles", preview: "New roles matching your filters this week...", time: "3m ago", dot: "bg-sky-500" },
      { initials: "C", bg: "bg-amber-500/15 text-amber-700", sender: "Charvi Connections", subject: "Connection request accepted", preview: "You're now connected with Aarav Khanna...", time: "12m ago", dot: "bg-amber-500" },
      { initials: "HR", bg: "bg-indigo-500/15 text-indigo-700", sender: "HR Insider", subject: "Profile views up 24%", preview: "Your profile activity spiked this week...", time: "1h ago", dot: "bg-sky-500" },
      { initials: "AK", bg: "bg-zinc-800/15 text-zinc-800 dark:text-zinc-200", sender: "Aarav Khanna", subject: "Coffee chat next week?", preview: "Would love to catch up about your work...", time: "3h ago", dot: "bg-sky-500" },
    ],
    activityTitle: "LinkedIn Activity",
    activityValue: 42,
    activityLabel: "Events this week",
    activityDelta: "12% vs last week",
    chart: [8, 14, 11, 20, 17, 25, 19],
    topSendersTitle: "Top Contacts",
    topSenders: [
      { initials: "RS", iconColor: "bg-blue-600/15 text-blue-700", name: "Riya Sharma", count: 18 },
      { initials: "JP", iconColor: "bg-emerald-500/15 text-emerald-700", name: "Job Alerts", count: 12 },
      { initials: "AK", iconColor: "bg-zinc-800/15 text-zinc-800 dark:text-zinc-200", name: "Aarav Khanna", count: 7 },
      { initials: "HR", iconColor: "bg-indigo-500/15 text-indigo-700", name: "HR Insider", count: 6 },
      { initials: "o", iconColor: "bg-muted text-muted-foreground", name: "Others", count: 5 },
    ],
    recentActivity: [
      { Icon: Mail, color: "text-blue-600 bg-blue-600/10", title: "New message from Riya Sharma", time: "10 seconds ago" },
      { Icon: Activity, color: "text-emerald-500 bg-emerald-500/10", title: "Job alert processed", time: "3 minutes ago" },
      { Icon: RefreshCw, color: "text-sky-500 bg-sky-500/10", title: "Connection added", time: "12 minutes ago" },
      { Icon: Mail, color: "text-blue-600 bg-blue-600/10", title: "Profile activity sync", time: "20 minutes ago" },
      { Icon: Zap, color: "text-emerald-500 bg-emerald-500/10", title: "Sync completed", time: "1 hour ago" },
    ],
  },
  instagram: {
    metrics: [
      { Icon: Mail, value: 87, label: "DMs Synced", sub: "Total inbox", delta: "11%", color: "text-pink-500 bg-pink-500/10" },
      { Icon: Zap, value: 152, label: "Comments", sub: "This week", delta: "6%", color: "text-emerald-500 bg-emerald-500/10" },
      { Icon: Star, value: 14, label: "Mentions", sub: "Last 7 days", color: "text-amber-500 bg-amber-500/10" },
      { Icon: Clock, value: 421, label: "Engagements", sub: "Last 24h", delta: "18%", color: "text-sky-500 bg-sky-500/10" },
    ],
    conversationsTitle: "Recent DMs",
    conversations: [
      { initials: "ak", bg: "bg-pink-500/15 text-pink-700", sender: "@aarav.k", subject: "Loved your last post!", preview: "Hey! The reel about ML was super helpful...", time: "30s ago", important: true, dot: "bg-pink-500" },
      { initials: "ch", bg: "bg-rose-500/15 text-rose-700", sender: "@charvi.story", subject: "Mention in story", preview: "@charvi tagged you in a story...", time: "5m ago", dot: "bg-amber-500" },
      { initials: "♥", bg: "bg-red-500/15 text-red-700", sender: "Engagement Spike", subject: "30 new likes on last post", preview: "Your recent post is trending in your circle...", time: "12m ago", important: true, dot: "bg-rose-500" },
      { initials: "@", bg: "bg-indigo-500/15 text-indigo-700", sender: "Comments", subject: "New comment activity", preview: "5 new comments on your latest reel...", time: "20m ago", dot: "bg-sky-500" },
      { initials: "ig", bg: "bg-zinc-800/15 text-zinc-800 dark:text-zinc-200", sender: "Instagram", subject: "Weekly insights ready", preview: "Your account reached 2.1k accounts...", time: "1h ago", dot: "bg-sky-500" },
    ],
    activityTitle: "Instagram Activity",
    activityValue: 144,
    activityLabel: "Events this week",
    activityDelta: "22% vs last week",
    chart: [22, 17, 28, 19, 33, 26, 30],
    topSendersTitle: "Top Engagers",
    topSenders: [
      { initials: "ak", iconColor: "bg-pink-500/15 text-pink-700", name: "@aarav.k", count: 22 },
      { initials: "ch", iconColor: "bg-rose-500/15 text-rose-700", name: "@charvi.story", count: 17 },
      { initials: "ml", iconColor: "bg-amber-500/15 text-amber-700", name: "@ml.daily", count: 11 },
      { initials: "ds", iconColor: "bg-indigo-500/15 text-indigo-700", name: "@design.studio", count: 9 },
      { initials: "o", iconColor: "bg-muted text-muted-foreground", name: "Others", count: 8 },
    ],
    recentActivity: [
      { Icon: Mail, color: "text-pink-500 bg-pink-500/10", title: "New DM from @aarav.k", time: "30 seconds ago" },
      { Icon: Activity, color: "text-emerald-500 bg-emerald-500/10", title: "Comment processed", time: "5 minutes ago" },
      { Icon: RefreshCw, color: "text-sky-500 bg-sky-500/10", title: "Mention captured", time: "12 minutes ago" },
      { Icon: Mail, color: "text-pink-500 bg-pink-500/10", title: "Comment activity sync", time: "20 minutes ago" },
      { Icon: Zap, color: "text-emerald-500 bg-emerald-500/10", title: "Sync completed", time: "1 hour ago" },
    ],
  },
};

const CONNECTED_BTN: Record<Provider, string> = {
  gmail: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:opacity-95",
  linkedin: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:opacity-95",
  instagram: "bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white hover:opacity-95",
};

function ActivityChart({ points }: { points: number[] }) {
  const max = Math.max(...points, 1);
  const w = 520, h = 160;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - (p / max) * h * 0.8 - 8] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <svg viewBox={`0 0 ${w} ${h + 24}`} className="mt-4 h-44 w-full">
      <defs>
        <linearGradient id="ea" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary, 250 80% 60%))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--primary, 250 80% 60%))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#ea)" />
      <path d={d} className="stroke-primary" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {days.map((day, i) => (
        <text key={day} x={i * step} y={h + 18} className="fill-muted-foreground" fontSize="11" textAnchor="middle">{day}</text>
      ))}
    </svg>
  );
}

export function IntegrationManagePage({ config }: { config: ManageConfig }) {
  const navigate = useNavigate();
  const integrations = useIntegrations();
  const { user } = useAuth();
  const record = integrations.get(config.provider);
  const [confirm, setConfirm] = useState(false);
  const data = DATA[config.provider];
  const { Icon: ProviderIcon } = config;

  if (!record.connected) {
    return (
      <div className="mx-auto max-w-3xl py-16 text-center">
        <h1 className="text-2xl font-semibold">{config.name} is not connected</h1>
        <p className="mt-2 text-sm text-muted-foreground">Complete setup to access the management dashboard.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/home" className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted">Back to Dashboard</Link>
          <Link to={`/integrations/${config.provider}/setup` as never} className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Connect {config.name}
          </Link>
        </div>
      </div>
    );
  }

  const firstName = (user?.name ?? "there").split(" ")[0];
  const handleDisconnect = () => { integrations.disconnect(config.provider); setConfirm(false); navigate({ to: "/home" }); };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Good evening, {firstName}! <span aria-hidden>👋</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Here's what's happening with your {config.name} today.
          </p>
        </header>
        <div className="flex items-center gap-3">
          {config.provider === "gmail" && (
            <Link
              to={"/gmail/overview" as never}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary/80 px-4 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] hover:opacity-95"
            >
              <Sparkles className="h-4 w-4" />
              View Classifications
            </Link>
          )}
          <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3.5 py-2.5 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
            <span className="w-48">Search anything...</span>
            <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[10px]">⌘K</kbd>
          </div>
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card/70 hover:bg-accent" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white">3</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* MAIN COLUMN */}
        <div className="space-y-6">
          {/* Metrics */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {data.metrics.map((m, i) => {
              const { Icon } = m;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${m.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-semibold leading-none">{m.value}</p>
                      <p className="mt-1.5 text-sm font-medium">{m.label}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>{m.sub}</span>
                    {m.delta && <span className="font-medium text-emerald-600">↑ {m.delta}</span>}
                  </div>
                </motion.div>
              );
            })}
          </section>

          {/* Conversations + Activity chart */}
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold tracking-tight">{data.conversationsTitle}</h3>
                <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                  View all <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
              <ul className="space-y-2">
                {data.conversations.map((c) => (
                  <li key={c.sender + c.subject} className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-accent/40">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${c.bg}`}>
                      {c.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold">{c.sender}</p>
                        {c.important && (
                          <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">Important</span>
                        )}
                      </div>
                      <p className="truncate text-[13px] font-medium">{c.subject}</p>
                      <p className="truncate text-[12px] text-muted-foreground">{c.preview}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 text-[11px] text-muted-foreground">
                      {c.time}
                      <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-xl border border-border bg-background/60 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent/50">
                View all conversations
              </button>
            </div>

            <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-base font-semibold tracking-tight">{data.activityTitle}</h3>
                <span className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">This Week ▾</span>
              </div>
              <p className="mt-2 text-3xl font-semibold leading-none">{data.activityValue}</p>
              <div className="mt-1.5 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{data.activityLabel}</p>
                <span className="text-[11px] font-medium text-emerald-600">↑ {data.activityDelta}</span>
              </div>
              <ActivityChart points={data.chart} />
              <div className="mt-5">
                <p className="mb-2 text-sm font-semibold">{data.topSendersTitle}</p>
                <ul className="space-y-2">
                  {data.topSenders.map((s) => (
                    <li key={s.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-semibold ${s.iconColor ?? "bg-muted"}`}>
                          {s.initials}
                        </div>
                        <span className="text-foreground">{s.name}</span>
                      </div>
                      <span className="font-semibold text-muted-foreground">{s.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-6">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-base font-semibold tracking-tight">AI-Powered Insights</h3>
                </div>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                  Get smart summaries, action items, and important insights from your {config.name} conversations.
                </p>
                <button className="mt-4 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
                  Coming Soon
                </button>
              </div>
              <div className="hidden h-24 w-40 shrink-0 items-center justify-center rounded-2xl bg-background/40 md:flex">
                <ProviderIcon className={`h-10 w-10 ${config.accent}`} />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT RAIL */}
        <aside className="space-y-6">
          {/* Live sync status */}
          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold tracking-tight">Live Sync Status</h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">Your {config.name.toLowerCase()} is being monitored in real-time</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Last synced: 10 seconds ago
            </p>
            <button className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${CONNECTED_BTN[config.provider]}`}>
              <ProviderIcon className="h-4 w-4" /> Connected to {config.name}
            </button>
          </div>

          {/* Recent activity */}
          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
            <ul className="mt-3 space-y-3">
              {data.recentActivity.map((a, i) => {
                const { Icon } = a;
                return (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{a.title}</p>
                      <p className="text-[11px] text-muted-foreground">{a.time}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <button className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all activity <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <h3 className="mb-3 text-base font-semibold tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction Icon={RefreshCw} label="Run Sync" color="text-primary bg-primary/10" />
              <QuickAction Icon={FileText} label="View Logs" color="text-emerald-500 bg-emerald-500/10" />
              <QuickAction Icon={Webhook} label="Refresh Watch" color="text-amber-500 bg-amber-500/10" />
              <QuickAction Icon={KeyRound} label="Update Creds" color="text-sky-500 bg-sky-500/10" to={`/integrations/${config.provider}/setup`} />
            </div>
            <button
              onClick={() => setConfirm(true)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-300/50 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:border-red-900/50"
            >
              <Trash2 className="h-4 w-4" /> Disconnect {config.name}
            </button>
          </div>
        </aside>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Disconnect {config.name}?</h3>
            <p className="mt-2 text-sm text-muted-foreground">All sync events will stop and stored credentials will be removed.</p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm(false)} className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted">Cancel</button>
              <button onClick={handleDisconnect} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                <Trash2 className="h-4 w-4" /> Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuickAction({ Icon, label, color, to, onClick }: { Icon: LucideIcon; label: string; color: string; to?: string; onClick?: () => void }) {
  const inner = (
    <>
      <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-sm font-medium">{label}</p>
    </>
  );
  if (to) {
    return (
      <Link to={to as never} className="rounded-xl border border-border bg-background/60 p-3 text-left transition hover:border-primary/40 hover:bg-primary/5">
        {inner}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className="rounded-xl border border-border bg-background/60 p-3 text-left transition hover:border-primary/40 hover:bg-primary/5">
      {inner}
    </button>
  );
}

// Re-export icons for backward compatibility with existing route configs
export { Activity, FileText, KeyRound, RefreshCw, Webhook, Zap, Eye };
