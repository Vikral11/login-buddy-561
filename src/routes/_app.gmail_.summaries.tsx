import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Clock, MessageSquare, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/_app/gmail_/summaries")({
  head: () => ({ meta: [{ title: "Summaries — Agentic" }] }),
  component: SummariesPage,
});

type Tab = "Daily" | "Weekly" | "Monthly";
const TABS: Tab[] = ["Daily", "Weekly", "Monthly"];

const DATA: Record<Tab, {
  executive: string;
  conversations: { who: string; topic: string; time: string }[];
  updates: { title: string; note: string }[];
  followUps: { title: string; due: string }[];
  trends: { label: string; value: string; delta: string }[];
}> = {
  Daily: {
    executive: "Today you received 38 emails. The most important threads are an invoice from Stripe, a partnership inquiry from Acme, and a meeting confirmation from your PM.",
    conversations: [
      { who: "Sarah @ Acme", topic: "Partnership opportunity — awaiting your reply", time: "2h ago" },
      { who: "Stripe", topic: "Invoice for November is ready to review", time: "4h ago" },
      { who: "Calendar", topic: "Standup tomorrow at 10:00 confirmed", time: "5h ago" },
    ],
    updates: [
      { title: "1 new lead", note: "Website contact form — qualified" },
      { title: "2 invoices", note: "Both require action before Friday" },
      { title: "1 meeting", note: "Roadmap sync moved to 3 PM" },
    ],
    followUps: [
      { title: "Reply to Sarah at Acme", due: "Today" },
      { title: "Approve Stripe invoice", due: "Today" },
    ],
    trends: [
      { label: "Inbound volume", value: "38", delta: "+12%" },
      { label: "Response rate", value: "84%", delta: "+4%" },
      { label: "Avg. response time", value: "1h 42m", delta: "-9%" },
    ],
  },
  Weekly: {
    executive: "This week your inbox processed 214 emails. Lead activity is up 22%, and follow-ups have decreased — a healthy trend.",
    conversations: [
      { who: "Acme Co.", topic: "Three threads on partnership terms", time: "Mon–Thu" },
      { who: "Hiring", topic: "Two candidate interviews scheduled", time: "Wed" },
      { who: "Finance", topic: "Quarterly review documents shared", time: "Fri" },
    ],
    updates: [
      { title: "5 new leads", note: "All from inbound channels" },
      { title: "4 invoices", note: "3 paid, 1 pending" },
      { title: "6 meetings", note: "Calendar utilization at 72%" },
    ],
    followUps: [
      { title: "Send proposal to Acme", due: "Mon" },
      { title: "Close out Q3 invoices", due: "Wed" },
      { title: "Reply to candidate feedback", due: "Fri" },
    ],
    trends: [
      { label: "Inbound volume", value: "214", delta: "+8%" },
      { label: "Lead conversations", value: "11", delta: "+22%" },
      { label: "Avg. response time", value: "2h 10m", delta: "-6%" },
    ],
  },
  Monthly: {
    executive: "Across November, you handled 902 emails with a 78% response rate. Lead volume continues to climb, while marketing noise dropped after filter tuning.",
    conversations: [
      { who: "Acme Co.", topic: "Partnership closed — onboarding next month" },
      { who: "Support", topic: "Resolved 42 customer tickets" },
      { who: "Team", topic: "Quarterly OKRs finalized" },
    ].map((c) => ({ ...c, time: "Nov" })),
    updates: [
      { title: "18 new leads", note: "Up from 14 last month" },
      { title: "12 invoices", note: "All settled" },
      { title: "24 meetings", note: "Including 3 customer reviews" },
    ],
    followUps: [
      { title: "Quarterly board update", due: "Dec 5" },
      { title: "Send year-end recap", due: "Dec 18" },
    ],
    trends: [
      { label: "Inbound volume", value: "902", delta: "+5%" },
      { label: "Response rate", value: "78%", delta: "+3%" },
      { label: "Marketing noise", value: "184", delta: "-18%" },
    ],
  },
};

function SummariesPage() {
  const [tab, setTab] = useState<Tab>("Daily");
  const d = DATA[tab];

  return (
    <div className="space-y-6">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          <Sparkles className="h-3 w-3" /> AI Executive Summary
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Summaries</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Daily, weekly, and monthly digests of what mattered in your Gmail.
        </p>
      </header>

      <div className="inline-flex rounded-xl border border-border bg-card/70 p-1 backdrop-blur-xl shadow-[var(--shadow-card)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-4 py-1.5 text-sm transition-colors ${
              tab === t ? "bg-primary/10 text-foreground ring-1 ring-primary/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t} Summary
          </button>
        ))}
      </div>

      <section className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-primary">
          <Sparkles className="h-3 w-3" /> AI Executive Summary
        </div>
        <p className="mt-2 text-base leading-relaxed text-foreground/90">{d.executive}</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <MessageSquare className="h-4 w-4 text-primary" /> Key Conversations
          </h3>
          <ul className="space-y-3">
            {d.conversations.map((c) => (
              <li key={c.who + c.topic} className="rounded-xl border border-border bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{c.who}</p>
                  <span className="text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="mt-1 text-[13px] text-muted-foreground">{c.topic}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <CalendarDays className="h-4 w-4 text-emerald-500" /> Important Updates
          </h3>
          <ul className="space-y-3">
            {d.updates.map((u) => (
              <li key={u.title} className="flex items-start gap-3 rounded-xl border border-border bg-background/50 p-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-sm font-medium">{u.title}</p>
                  <p className="text-[12px] text-muted-foreground">{u.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <Clock className="h-4 w-4 text-amber-500" /> Pending Follow-Ups
          </h3>
          <ul className="space-y-3">
            {d.followUps.map((f) => (
              <li key={f.title} className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-3">
                <p className="text-sm font-medium">{f.title}</p>
                <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">{f.due}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <TrendingUp className="h-4 w-4 text-sky-500" /> Communication Trends
          </h3>
          <ul className="space-y-3">
            {d.trends.map((t) => (
              <li key={t.label} className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-3">
                <p className="text-sm text-muted-foreground">{t.label}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold tabular-nums">{t.value}</p>
                  <span className={`text-[11px] font-medium ${t.delta.startsWith("-") ? "text-rose-500" : "text-emerald-500"}`}>{t.delta}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}