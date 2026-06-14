import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, CheckCircle2, Flag, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { EMAILS } from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/summaries")({
  head: () => ({ meta: [{ title: "Summaries — Gmail Workspace" }] }),
  component: SummariesPage,
});

type Tab = "Daily Summary" | "Weekly Digest" | "Monthly Report";
const TABS: Tab[] = ["Daily Summary", "Weekly Digest", "Monthly Report"];

const COPY: Record<Tab, { period: string; intro: string; trends: { label: string; value: string; delta: string }[] }> = {
  "Daily Summary": {
    period: "Today · Jun 14, 2026",
    intro: "12 new emails processed. 3 marked important. AI extracted 4 action items across Recruiting and Finance.",
    trends: [
      { label: "Volume vs yesterday", value: "+18%", delta: "trending up" },
      { label: "Avg response time", value: "2.1h", delta: "−24%" },
      { label: "Important ratio", value: "25%", delta: "stable" },
    ],
  },
  "Weekly Digest": {
    period: "This week · Jun 8 – 14",
    intro: "84 emails handled this week. Recruiting led volume, Finance led priority. 6 actions completed, 5 still open.",
    trends: [
      { label: "Total emails", value: "84", delta: "+12%" },
      { label: "Actions completed", value: "6 / 11", delta: "55%" },
      { label: "Avg priority score", value: "61", delta: "+4" },
    ],
  },
  "Monthly Report": {
    period: "May 2026",
    intro: "342 emails across 6 categories. Finance saw the steepest growth (+22%). Response times improved by 19%.",
    trends: [
      { label: "Total emails", value: "342", delta: "+9%" },
      { label: "Categories active", value: "6", delta: "stable" },
      { label: "Response time", value: "2.8h", delta: "−19%" },
    ],
  },
};

function SummariesPage() {
  const [tab, setTab] = useState<Tab>("Daily Summary");
  const copy = COPY[tab];

  const keyConvos = EMAILS.filter((e) => e.important).slice(0, 4);
  const events = [
    { title: "HSBC contract renewal due", when: "End of week", color: "text-rose-500 bg-rose-500/10", Icon: Flag },
    { title: "Amazon SWE intern interview", when: "Today, 6 PM", color: "text-amber-500 bg-amber-500/10", Icon: Calendar },
    { title: "Stripe invoice payment", when: "Friday", color: "text-emerald-500 bg-emerald-500/10", Icon: CheckCircle2 },
  ];
  const followUps = EMAILS.filter((e) => e.suggestedActions[0]?.toLowerCase().includes("reply")).slice(0, 4);
  const insights = [
    "Recruiting volume up 18% this week — consider auto-routing to the careers folder.",
    "Finance emails carry the highest priority score (avg 88). Enable auto-summaries here.",
    "Response time on Personal emails slipped to 6h — set a 24h SLA reminder.",
    "Marketing volume is high but low priority — bulk-archive candidate.",
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Summaries</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">AI-generated summaries of your communication intelligence.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`relative rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              tab === t ? "border-primary/50 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {tab === t && <motion.span layoutId="summary-tab" className="absolute inset-0 rounded-full bg-primary/15" />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary-glow/5 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{copy.period}</p>
            <h3 className="mt-1 text-lg font-semibold">{tab}</h3>
            <p className="mt-2 text-sm">{copy.intro}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {copy.trends.map((t) => (
          <div key={t.label} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{t.label}</p>
            <p className="mt-2 text-3xl font-semibold">{t.value}</p>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-600">
              <TrendingUp className="h-3 w-3" /> {t.delta}
            </p>
          </div>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Key Conversations</h3>
          <ul className="mt-4 space-y-3">
            {keyConvos.map((e) => (
              <li key={e.id} className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                  {e.sender.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">{e.sender} · {e.aiSummary}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Important Events</h3>
          <ul className="mt-4 space-y-3">
            {events.map((e) => (
              <li key={e.title} className="flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${e.color}`}>
                  <e.Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="text-[11px] text-muted-foreground">{e.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Pending Follow-Ups</h3>
          <ul className="mt-4 space-y-3">
            {followUps.map((e) => (
              <li key={e.id} className="flex items-start gap-3">
                <MessageSquare className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{e.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">Reply to {e.sender} — {e.reason}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Actionable Insights</h3>
          <ul className="mt-4 space-y-3">
            {insights.map((i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}