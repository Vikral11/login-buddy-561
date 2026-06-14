import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock, Flag, Mail, RefreshCw, Sparkles, Star, Zap } from "lucide-react";
import { EMAILS, KPIS, PRIORITY_META, RECENT_ACTIVITY } from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/overview")({
  head: () => ({ meta: [{ title: "Overview — Gmail Workspace" }] }),
  component: Overview,
});

const KPI_CARDS = [
  { Icon: Mail, label: "Emails Processed", value: KPIS.processed, sub: "All time", color: "text-primary bg-primary/10" },
  { Icon: Zap, label: "New Today", value: KPIS.newToday, sub: "Since last sync", color: "text-emerald-500 bg-emerald-500/10" },
  { Icon: Star, label: "Important", value: KPIS.important, sub: "Flagged by AI", color: "text-amber-500 bg-amber-500/10" },
  { Icon: Flag, label: "Pending Actions", value: KPIS.pendingActions, sub: "Need response", color: "text-rose-500 bg-rose-500/10" },
  { Icon: Clock, label: "Follow-Ups", value: KPIS.followUps, sub: "This week", color: "text-sky-500 bg-sky-500/10" },
  { Icon: CheckCircle2, label: "Last Sync", value: KPIS.lastSync, sub: "Healthy", color: "text-violet-500 bg-violet-500/10" },
];

function Overview() {
  const important = EMAILS.filter((e) => e.important).slice(0, 4);
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Executive dashboard for your Gmail intelligence.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {KPI_CARDS.map((k, i) => (
          <motion.div key={k.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className="flex items-start gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${k.color}`}>
                <k.Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold leading-none">{k.value}</p>
                <p className="mt-1.5 text-sm font-medium">{k.label}</p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">{k.sub}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-5">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Recent Important Emails</h3>
            <Link to="/gmail/inbox" className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline">
              View inbox <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="space-y-2">
            {important.map((e) => (
              <li key={e.id} className="flex items-start gap-3 rounded-xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-accent/40">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                  {e.sender.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold">{e.sender}</p>
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_META[e.priority].color}`}>{e.priority}</span>
                  </div>
                  <p className="truncate text-[13px] font-medium">{e.subject}</p>
                  <p className="truncate text-[12px] text-muted-foreground">{e.aiSummary}</p>
                </div>
                <span className="shrink-0 text-[11px] text-muted-foreground">{e.time}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="text-base font-semibold tracking-tight">Recent Activity</h3>
          <ul className="mt-4 space-y-3">
            {RECENT_ACTIVITY.map((a) => (
              <li key={a.title} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.color}`}>
                  <a.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold">Today's Summary</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              You received <span className="font-semibold text-foreground">{KPIS.newToday}</span> new emails. AI flagged{" "}
              <span className="font-semibold text-foreground">{KPIS.important}</span> as important — including a recruiter interview invite from Amazon
              and an HSBC contract renewal awaiting review. <span className="font-semibold text-foreground">{KPIS.pendingActions}</span> action items
              are still pending across Finance and Recruiting.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link to="/gmail/priorities" className="inline-flex h-9 items-center rounded-xl bg-gradient-to-r from-primary to-primary-glow px-4 text-sm font-medium text-primary-foreground hover:opacity-95">
                View priorities
              </Link>
              <Link to="/gmail/summaries" className="inline-flex h-9 items-center rounded-xl border border-border bg-background/60 px-4 text-sm font-medium hover:bg-accent">
                Open daily summary
              </Link>
              <button className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-background/60 px-4 text-sm font-medium hover:bg-accent">
                <RefreshCw className="h-3.5 w-3.5" /> Sync now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}