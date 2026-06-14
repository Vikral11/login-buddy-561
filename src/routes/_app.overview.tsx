import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useIntegrations, type Provider } from "@/lib/integrations";

export const Route = createFileRoute("/_app/overview")({
  head: () => ({ meta: [{ title: "Overview — Agentic" }] }),
  component: OverviewPage,
});

const PROVIDERS: { id: Provider; name: string; Icon: LucideIcon; accent: string }[] = [
  { id: "gmail", name: "Gmail", Icon: Mail, accent: "text-red-500 bg-red-500/10" },
  { id: "linkedin", name: "LinkedIn", Icon: Linkedin, accent: "text-blue-600 bg-blue-600/10" },
  { id: "instagram", name: "Instagram", Icon: Instagram, accent: "text-pink-500 bg-pink-500/10" },
];

const SYSTEM = [
  { label: "API", value: "Operational", tone: "text-emerald-500" },
  { label: "Sync Workers", value: "Operational", tone: "text-emerald-500" },
  { label: "Webhooks", value: "Operational", tone: "text-emerald-500" },
  { label: "AI Engine", value: "Operational", tone: "text-emerald-500" },
];

const ACTIVITY = [
  { Icon: RefreshCw, color: "text-emerald-500 bg-emerald-500/10", title: "Gmail sync completed", note: "12 new emails imported", time: "30s ago" },
  { Icon: ShieldCheck, color: "text-sky-500 bg-sky-500/10", title: "Watch renewed", note: "Pub/Sub subscription extended", time: "10m ago" },
  { Icon: Activity, color: "text-amber-500 bg-amber-500/10", title: "History cursor advanced", note: "Incremental delta processed", time: "22m ago" },
  { Icon: Heart, color: "text-rose-500 bg-rose-500/10", title: "Connection health check", note: "All providers healthy", time: "1h ago" },
];

function StatCard({ Icon, label, value, sub, color }: { Icon: LucideIcon; label: string; value: string | number; sub: string; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}><Icon className="h-5 w-5" /></div>
        <span className="text-[11px] text-muted-foreground">{sub}</span>
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function OverviewPage() {
  const { state } = useIntegrations();
  const connectedCount = PROVIDERS.filter((p) => state[p.id].connected).length;
  const healthScore = connectedCount === 0 ? 0 : Math.round((connectedCount / PROVIDERS.length) * 100);

  return (
    <div className="space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          <Sparkles className="h-3 w-3" /> Workspace Overview
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          A quick pulse on your connected accounts, sync activity, and system health.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard Icon={Mail} label="Connected Accounts" value={connectedCount} sub={`of ${PROVIDERS.length}`} color="text-primary bg-primary/10" />
        <StatCard Icon={Heart} label="Account Health" value={`${healthScore}%`} sub="Last 24h" color="text-emerald-500 bg-emerald-500/10" />
        <StatCard Icon={RefreshCw} label="Recent Syncs" value={42} sub="Last 24h" color="text-sky-500 bg-sky-500/10" />
        <StatCard Icon={ShieldCheck} label="System Status" value="All Systems Go" sub="Operational" color="text-amber-500 bg-amber-500/10" />
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Connected Accounts</h3>
            <Link to="/home" className="text-xs font-medium text-primary hover:underline">Manage accounts</Link>
          </div>
          <ul className="space-y-3">
            {PROVIDERS.map((p) => {
              const connected = state[p.id].connected;
              const Icon = p.Icon;
              return (
                <li key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-background/50 p-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${p.accent}`}><Icon className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{connected ? "Live sync active" : "Not connected"}</p>
                  </div>
                  {connected ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" /> Connected
                    </span>
                  ) : (
                    <span className="rounded-full bg-rose-500/10 px-2.5 py-1 text-[11px] font-semibold text-rose-600 dark:text-rose-400">Not Connected</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-base font-semibold tracking-tight">System Status</h3>
            <ul className="space-y-2.5">
              {SYSTEM.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${s.tone}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" /> {s.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <h3 className="mb-4 text-base font-semibold tracking-tight">Recent Sync Activity</h3>
            <ul className="space-y-3">
              {ACTIVITY.map((a, i) => {
                const Icon = a.Icon;
                return (
                  <motion.li
                    key={a.title}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-start gap-3"
                  >
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.color}`}><Icon className="h-4 w-4" /></div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{a.title}</p>
                      <p className="truncate text-[11px] text-muted-foreground">{a.note}</p>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}