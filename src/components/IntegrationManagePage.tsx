import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  FileText,
  KeyRound,
  RefreshCw,
  Sparkles,
  Trash2,
  Webhook,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { useIntegrations, type Provider } from "@/lib/integrations";

export type ManageMetric = { Icon: LucideIcon; label: string; value: number | string; sub: string; delta?: string; color: string };
export type ManageActivity = { Icon: LucideIcon; color: string; title: string; note: string; time: string; dot: string };
export type ManageQuickAction = { Icon: LucideIcon; label: string; color: string; onClick?: () => void; to?: string };
export type ManageInsight = { Icon: LucideIcon; color: string; text: string };

export type ManageConfig = {
  provider: Provider;
  name: "Gmail" | "LinkedIn" | "Instagram";
  Icon: LucideIcon;
  accent: string;
  headerTitle: string;
  headerSubtitle: string;
  statusTitle: string;
  insightsTitle: string;
  chartTitle: string;
  metrics: ManageMetric[];
  activity: ManageActivity[];
  quickActions: ManageQuickAction[];
  insights: ManageInsight[];
  chartPoints: number[]; // 7 values
  chartLabel: string;
};

function Sparkline({ points, label }: { points: number[]; label: string }) {
  const max = Math.max(...points, 1);
  const w = 320, h = 120;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h * 0.85 - 5}`)
    .join(" ");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return (
    <div>
      <p className="text-3xl font-semibold">{points.reduce((a, b) => a + b, 0)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
      <svg viewBox={`0 0 ${w} ${h + 18}`} className="mt-3 h-32 w-full">
        <defs>
          <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary, 250 80% 60%))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--primary, 250 80% 60%))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#spark)" />
        <path d={d} className="stroke-primary" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {days.map((day, i) => (
          <text key={day} x={i * step} y={h + 14} className="fill-muted-foreground" fontSize="10" textAnchor="middle">{day}</text>
        ))}
      </svg>
    </div>
  );
}

export function IntegrationManagePage({ config }: { config: ManageConfig }) {
  const navigate = useNavigate();
  const integrations = useIntegrations();
  const record = integrations.get(config.provider);
  const [confirm, setConfirm] = useState(false);

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

  const handleDisconnect = () => {
    integrations.disconnect(config.provider);
    setConfirm(false);
    navigate({ to: "/home" });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{config.headerTitle}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{config.headerSubtitle}</p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-w-[280px] rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4 backdrop-blur-xl shadow-[var(--shadow-card)]"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <p className="text-sm font-semibold">{config.statusTitle}</p>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div><dt className="text-muted-foreground">Last Sync</dt><dd className="font-medium">10s ago</dd></div>
            <div><dt className="text-muted-foreground">Webhook</dt><dd className="font-medium text-emerald-600">Active</dd></div>
            <div><dt className="text-muted-foreground">Watch API</dt><dd className="font-medium text-emerald-600">Healthy</dd></div>
            <div><dt className="text-muted-foreground">Health</dt><dd className="font-medium text-emerald-600">Healthy</dd></div>
          </dl>
        </motion.div>
      </div>

      {/* Metrics */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {config.metrics.map((m, i) => {
          const { Icon } = m;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]"
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${m.color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-3xl font-semibold leading-none">{m.value}</p>
              <p className="mt-1.5 text-sm font-medium">{m.label}</p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{m.sub}</span>
                {m.delta && <span className="font-medium text-emerald-600">↑ {m.delta}</span>}
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* Recent Activity + Chart */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
            <button className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View all <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>
          <ul className="space-y-3">
            {config.activity.map((a) => {
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

        <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">{config.chartTitle}</h3>
            <span className="rounded-lg border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">This Week</span>
          </div>
          <Sparkline points={config.chartPoints} label={config.chartLabel} />
        </div>
      </div>

      {/* Quick Actions + Insights */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold tracking-tight">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {config.quickActions.map((q) => {
              const { Icon } = q;
              const inner = (
                <>
                  <div className={`mb-2 flex h-9 w-9 items-center justify-center rounded-lg ${q.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-medium">{q.label}</p>
                </>
              );
              if (q.to) {
                return (
                  <Link key={q.label} to={q.to as never} className="rounded-xl border border-border bg-background/60 p-3 text-left transition hover:border-primary/40 hover:bg-primary/5">
                    {inner}
                  </Link>
                );
              }
              return (
                <button key={q.label} onClick={q.onClick} className="rounded-xl border border-border bg-background/60 p-3 text-left transition hover:border-primary/40 hover:bg-primary/5">
                  {inner}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setConfirm(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-300/50 bg-red-500/5 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:border-red-900/50"
          >
            <Trash2 className="h-4 w-4" /> Disconnect {config.name}
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-6 lg:col-span-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-base font-semibold tracking-tight">{config.insightsTitle}</h3>
          </div>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {config.insights.map((ins) => {
              const { Icon } = ins;
              return (
                <li key={ins.text} className="flex items-start gap-3 rounded-xl border border-border bg-background/60 p-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${ins.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm leading-snug">{ins.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
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

// Re-export common icons used by route configs
export { Activity, FileText, KeyRound, RefreshCw, Webhook, Zap };
