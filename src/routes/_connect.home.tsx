import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Clock,
  Instagram,
  Linkedin,
  Mail,
  RefreshCw,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useIntegrations, type Provider } from "@/lib/integrations";

export const Route = createFileRoute("/_connect/home")({
  head: () => ({ meta: [{ title: "Connect Your Accounts — Agentic" }] }),
  component: ConnectAccounts,
});

type Status = "connected" | "not_connected" | "coming_soon";
type Integration = {
  provider: Provider;
  name: "Gmail" | "LinkedIn" | "Instagram";
  description: string;
  bullets: string[];
  accent: string;
  trendColor: string;
  Icon: React.ComponentType<{ className?: string }>;
  status: Status;
};

const integrations: Integration[] = [
  { provider: "gmail", name: "Gmail", description: "Sync emails, get AI summaries, never miss an important conversation.", bullets: ["Real-time sync", "AI classification", "Priority detection"], accent: "text-red-500", trendColor: "from-emerald-400/40 to-transparent", Icon: Mail, status: "not_connected" },
  { provider: "linkedin", name: "LinkedIn", description: "Track messages, job opportunities, and connection updates.", bullets: ["Message sync", "Job alerts", "Connection updates"], accent: "text-blue-600", trendColor: "from-sky-400/40 to-transparent", Icon: Linkedin, status: "coming_soon" },
  { provider: "instagram", name: "Instagram", description: "Monitor DMs, comments, and important engagements.", bullets: ["DM sync", "Comment tracking", "Activity insights"], accent: "text-pink-500", trendColor: "from-pink-400/40 to-transparent", Icon: Instagram, status: "coming_soon" },
];

const recentActivity = [
  { Icon: Mail, color: "text-red-500 bg-red-500/10", title: "New email from Amazon Recruiter", note: "Interview Invitation — Software Engineer Intern", time: "2 sec ago" },
  { Icon: RefreshCw, color: "text-primary bg-primary/10", title: "Gmail sync completed", note: "12 new emails imported successfully", time: "30 sec ago" },
  { Icon: CheckCircle2, color: "text-emerald-500 bg-emerald-500/10", title: "Gmail OAuth refreshed", note: "Token renewed for next 60 days", time: "5 min ago" },
  { Icon: Activity, color: "text-amber-500 bg-amber-500/10", title: "Watch channel renewed", note: "Pub/Sub subscription extended", time: "12 min ago" },
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "connected")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
      </span>
    );
  if (status === "coming_soon")
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
        Coming Soon
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">
      Not Connected
    </span>
  );
}

function ConnectAccounts() {
  const { state } = useIntegrations();

  const cards = integrations.map((it) => ({
    ...it,
    status: it.provider === "gmail" ? (state.gmail.connected ? "connected" : "not_connected") as Status : it.status,
  }));

  const connectedCount = cards.filter((c) => c.status === "connected").length;
  const healthScore = connectedCount > 0 ? 98 : 0;

  return (
    <div className="space-y-10">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Onboarding</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Connect Your Accounts</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
          Bring your Gmail, LinkedIn, and Instagram accounts together in one place to unlock unified AI intelligence.
        </p>
      </header>

      {/* Integration cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 items-stretch">
        {cards.map((it, i) => {
          const { Icon } = it;
          const disabled = it.status === "coming_soon";
          const isConnected = it.status === "connected";
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
                  <StatusBadge status={it.status} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{it.name}</h3>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{it.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {it.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-[12.5px] text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-auto p-5 pt-0">
                {disabled ? (
                  <button disabled className="flex h-10 w-full items-center justify-center rounded-xl border border-border bg-muted/40 text-sm font-medium text-muted-foreground">
                    Coming Soon
                  </button>
                ) : isConnected ? (
                  <Link to="/gmail/overview" className="flex h-10 w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground hover:opacity-95">
                    Manage {it.name}
                  </Link>
                ) : (
                  <Link to="/integrations/gmail/setup" className="flex h-10 w-full items-center justify-center rounded-xl border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10">
                    Connect {it.name}
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Connection Status */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight">Connection Status</h2>
        <p className="text-sm text-muted-foreground">A snapshot of your account links right now.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <StatCard Icon={CheckCircle2} color="text-emerald-500 bg-emerald-500/10" label="Connected Accounts" value={`${connectedCount} / 3`} sub="Across all platforms" />
          <StatCard Icon={Clock} color="text-sky-500 bg-sky-500/10" label="Last Sync" value="10 sec ago" sub="Gmail · incremental" />
          <StatCard Icon={Shield} color="text-primary bg-primary/10" label="Account Health" value={`${healthScore}%`} sub={healthScore ? "All tokens healthy" : "No accounts linked"} />
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
        <p className="text-sm text-muted-foreground">Recent sync and connection events.</p>
        <ul className="mt-4 space-y-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl shadow-[var(--shadow-card)]">
          {recentActivity.map((a) => (
            <li key={a.title} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-accent/40">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${a.color}`}>
                <a.Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.title}</p>
                <p className="truncate text-xs text-muted-foreground">{a.note}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Integration Health Summary */}
      <section>
        <h2 className="text-lg font-semibold tracking-tight">Integration Health Summary</h2>
        <p className="text-sm text-muted-foreground">Quick health overview for each platform.</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-[var(--shadow-card)]">
          {cards.map((it, i) => {
            const { Icon } = it;
            const health = it.status === "connected" ? "Healthy" : it.status === "coming_soon" ? "—" : "Disconnected";
            const healthColor =
              it.status === "connected" ? "text-emerald-600" : it.status === "coming_soon" ? "text-muted-foreground" : "text-rose-600";
            return (
              <div key={it.name} className={`flex items-center gap-4 p-4 ${i !== cards.length - 1 ? "border-b border-border" : ""}`}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background ${it.accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{it.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {it.status === "connected" ? "Last sync 10 sec ago · 0 failures" : it.status === "coming_soon" ? "Coming soon" : "Not connected"}
                  </p>
                </div>
                <span className={`text-xs font-semibold ${healthColor}`}>{health}</span>
                <StatusBadge status={it.status} />
              </div>
            );
          })}
        </div>
      </section>

      {/* Why connect */}
      <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Why connect everything?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Unified inbox, smarter AI summaries, and one place to act on what matters.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { Icon: Zap, title: "All-in-One View", note: "All conversations in one dashboard.", color: "text-primary bg-primary/10" },
            { Icon: Shield, title: "Never Miss Out", note: "Real-time updates and alerts.", color: "text-emerald-500 bg-emerald-500/10" },
            { Icon: Sparkles, title: "AI-Powered Insights", note: "Smart summaries and actions.", color: "text-amber-500 bg-amber-500/10" },
            { Icon: TrendingUp, title: "Save Time", note: "Automate tracking, focus on what matters.", color: "text-sky-500 bg-sky-500/10" },
          ].map((w) => (
            <div key={w.title} className="rounded-xl border border-border bg-card/70 p-4">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${w.color}`}>
                <w.Icon className="h-4 w-4" />
              </div>
              <p className="mt-3 text-sm font-semibold">{w.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{w.note}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ Icon, color, label, value, sub }: { Icon: React.ComponentType<{ className?: string }>; color: string; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-3xl font-semibold leading-none">{value}</p>
          <p className="mt-1.5 text-sm font-medium">{label}</p>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}