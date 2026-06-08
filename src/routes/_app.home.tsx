import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  Clock,
  ExternalLink,
  Eye,
  Linkedin,
  Mail,
  Instagram,
  RefreshCw,
  Shield,
  Sparkles,
  Star,
  Timer,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useIntegrations, type Provider } from "@/lib/integrations";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Home — Agentic" }] }),
  component: Home,
});

type Status = "connected" | "not_connected";
type Integration = {
  provider: Provider;
  name: "Gmail" | "LinkedIn" | "Instagram";
  description: string;
  bullets: { label: string }[];
  accent: string;
  trendColor: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const integrations: Integration[] = [
  {
    provider: "gmail",
    name: "Gmail",
    description: "Sync your emails, get AI summaries, and never miss important conversations.",
    bullets: [{ label: "201 emails imported" }, { label: "Live sync active" }],
    accent: "text-red-500",
    trendColor: "from-emerald-400/40 to-transparent",
    href: "/integrations/gmail/setup",
    Icon: Mail,
  },
  {
    provider: "linkedin",
    name: "LinkedIn",
    description: "Track messages, job opportunities, and important updates.",
    bullets: [{ label: "Message sync" }, { label: "Job alerts" }, { label: "Connection updates" }],
    accent: "text-blue-600",
    trendColor: "from-sky-400/40 to-transparent",
    href: "/integrations/linkedin/setup",
    Icon: Linkedin,
  },
  {
    provider: "instagram",
    name: "Instagram",
    description: "Monitor DMs, comments, and important engagements.",
    bullets: [{ label: "DM sync" }, { label: "Comment tracking" }, { label: "Activity insights" }],
    accent: "text-pink-500",
    trendColor: "from-pink-400/40 to-transparent",
    href: "/integrations/instagram/setup",
    Icon: Instagram,
  },
];

const whyConnect = [
  { icon: Zap, title: "All-in-One View", note: "See all your conversations in one unified dashboard.", color: "text-primary bg-primary/10" },
  { icon: Shield, title: "Never Miss Out", note: "Get real-time updates and important alerts.", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Sparkles, title: "AI-Powered Insights", note: "Smart summaries and action items for you.", color: "text-amber-500 bg-amber-500/10" },
  { icon: TrendingUp, title: "Save Time", note: "Automate tracking and focus on what matters.", color: "text-sky-500 bg-sky-500/10" },
];

const recentActivity = [
  { Icon: Mail, color: "text-red-500 bg-red-500/10", title: "New email from Amazon Recruiter", note: "Interview Invitation – Software Engineer Intern", time: "2 sec ago", dot: "bg-emerald-500" },
  { Icon: Linkedin, color: "text-blue-600 bg-blue-600/10", title: "LinkedIn job alert received", note: "5 new opportunities in Financial Engineering", time: "15 sec ago", dot: "bg-sky-500" },
  { Icon: RefreshCw, color: "text-primary bg-primary/10", title: "Gmail sync completed", note: "12 new emails imported successfully", time: "30 sec ago", dot: "bg-emerald-500" },
  { Icon: Instagram, color: "text-pink-500 bg-pink-500/10", title: "Instagram connected successfully", note: "You can now track your DMs and engagement", time: "1 min ago", dot: "bg-pink-500" },
];

const overview = [
  { Icon: Mail, label: "Emails", value: 201, color: "text-primary bg-primary/10" },
  { Icon: Zap, label: "New Today", value: 12, color: "text-emerald-500 bg-emerald-500/10" },
  { Icon: Star, label: "Important", value: 7, color: "text-amber-500 bg-amber-500/10" },
  { Icon: Clock, label: "Follow-ups", value: 4, color: "text-sky-500 bg-sky-500/10" },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
      Not Connected
    </span>
  );
}

function Heartbeat() {
  return (
    <svg viewBox="0 0 120 40" className="h-9 w-28 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 20 H20 L26 8 L34 32 L42 14 L50 26 L58 20 H80 L86 10 L94 28 L102 20 H120" />
    </svg>
  );
}

function Home() {
  const { user } = useAuth();
  const name = user?.name ?? "there";
  const { state } = useIntegrations();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Welcome back, {name}! <span aria-hidden>👋</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            Connect your accounts to bring all your conversations and opportunities into one place.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 px-4 py-3 backdrop-blur-xl shadow-[var(--shadow-card)]"
        >
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live Sync Active
            </p>
            <p className="text-[11px] text-muted-foreground">Last synced: 10 sec ago</p>
          </div>
          <Heartbeat />
        </motion.div>
      </div>

      {/* Integrations */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold tracking-tight">Connect Your Accounts</h2>
          <p className="text-sm text-muted-foreground">Integrate your favorite platforms and never miss an important update.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-stretch">
          {integrations.map((it, i) => {
            const { Icon } = it;
            const status: Status = state[it.provider].connected ? "connected" : "not_connected";
            const buttonLabel = status === "connected" ? `Manage ${it.name}` : `Connect ${it.name}`;
            const targetHref = (status === "connected" ? `${it.href}/manage` : it.href) as string;
            return (
              <motion.div
                key={it.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-[var(--shadow-card)]"
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${it.trendColor}`} />
                <div className="relative flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background ${it.accent}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{it.name}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{it.description}</p>
                  <div className="mt-3"><StatusBadge status={status} /></div>
                  <ul className="mt-4 space-y-1.5">
                    {it.bullets.map((b) => (
                      <li key={b.label} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                        {b.label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative mt-auto flex gap-2 px-5 pb-5">
                  <Link
                    to={targetHref as never}
                    className={`flex h-10 flex-1 items-center justify-center rounded-xl border text-sm font-medium transition-colors ${
                      status === "connected"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400"
                        : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {buttonLabel}
                  </Link>
                  <Link
                    to={targetHref as never}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:text-foreground"
                    aria-label={`Open ${it.name}`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why connect */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-primary/[0.03] to-transparent p-6">
        <h3 className="text-base font-semibold tracking-tight">Why connect your accounts?</h3>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {whyConnect.map((w) => {
            const { icon: Icon } = w;
            return (
              <div key={w.title} className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${w.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{w.title}</p>
                  <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{w.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
            <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <ul className="space-y-3">
            {recentActivity.map((a) => {
              const { Icon } = a;
              return (
                <li key={a.title} className="flex items-center gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-accent/40">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="truncate text-[12px] text-muted-foreground">{a.note}</p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    {a.time}
                    <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold tracking-tight">Integration Status</h3>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
                View details <Eye className="h-3 w-3" />
              </button>
            </div>
            <ul className="space-y-3">
              {integrations.map((it) => {
                const { Icon } = it;
                const status: Status = state[it.provider].connected ? "connected" : "not_connected";
                return (
                  <li key={it.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-background ${it.accent}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-medium">{it.name}</p>
                    </div>
                    <StatusBadge status={status} />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-base font-semibold tracking-tight">Your Overview</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {overview.map((o) => {
                const { Icon } = o;
                return (
                  <div key={o.label} className="rounded-xl border border-border bg-background/60 p-3">
                    <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg ${o.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-xl font-semibold leading-none">{o.value}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{o.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}