import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, Mail, TrendingUp, Users } from "lucide-react";
import { CategoryBadge, PriorityBadge, type Category, type Priority } from "@/components/EmailIntelligenceSection";

export const Route = createFileRoute("/_app/gmail_/analytics")({
  head: () => ({ meta: [{ title: "Gmail Analytics — Agentic" }] }),
  component: AnalyticsPage,
});

const VOLUME = [18, 24, 19, 32, 28, 41, 36];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

const CATEGORY_DIST: { c: Category; value: number }[] = [
  { c: "Marketing", value: 38 },
  { c: "Newsletter", value: 24 },
  { c: "Lead", value: 18 },
  { c: "Billing", value: 14 },
  { c: "Support", value: 12 },
  { c: "Meeting", value: 9 },
  { c: "Personal", value: 6 },
  { c: "Scam", value: 3 },
];

const PRIORITY_DIST: { p: Priority; value: number; tone: string }[] = [
  { p: "High", value: 22, tone: "bg-red-500" },
  { p: "Medium", value: 48, tone: "bg-amber-500" },
  { p: "Low", value: 54, tone: "bg-muted-foreground/40" },
];

const SENDERS = [
  { name: "sarah@acme.co", count: 18 },
  { name: "billing@stripe.com", count: 14 },
  { name: "calendar@google.com", count: 11 },
  { name: "noreply@linear.app", count: 9 },
  { name: "support@vercel.com", count: 7 },
];

const RESPONSE = [
  { label: "Avg. response time", value: "1h 42m", delta: "-9%" },
  { label: "Response rate", value: "84%", delta: "+4%" },
  { label: "Threads resolved", value: "63", delta: "+11%" },
];

function AnalyticsPage() {
  const maxVol = Math.max(...VOLUME);
  const totalCat = CATEGORY_DIST.reduce((a, b) => a + b.value, 0);
  const totalPri = PRIORITY_DIST.reduce((a, b) => a + b.value, 0);

  return (
    <div className="space-y-6">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          <BarChart3 className="h-3 w-3" /> Gmail Analytics
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Trends, distributions, and patterns from your Gmail activity.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight">
              <Mail className="h-4 w-4 text-primary" /> Email Volume Trends
            </h3>
            <span className="text-[11px] text-muted-foreground">Last 7 days</span>
          </div>
          <div className="flex items-end gap-3">
            {VOLUME.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-primary/70 to-primary/30"
                    style={{ height: `${(v / maxVol) * 100}%` }}
                    title={`${v} emails`}
                  />
                </div>
                <div className="text-center">
                  <p className="text-[11px] text-muted-foreground">{DAYS[i]}</p>
                  <p className="text-xs font-semibold tabular-nums">{v}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <TrendingUp className="h-4 w-4 text-emerald-500" /> Response Trends
          </h3>
          <ul className="space-y-3">
            {RESPONSE.map((r) => (
              <li key={r.label} className="rounded-xl border border-border bg-background/50 p-3">
                <p className="text-[11px] text-muted-foreground">{r.label}</p>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="text-xl font-semibold tabular-nums">{r.value}</p>
                  <span className={`text-[11px] font-medium ${r.delta.startsWith("-") ? "text-rose-500" : "text-emerald-500"}`}>{r.delta}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="mb-4 text-base font-semibold tracking-tight">Category Distribution</h3>
          <ul className="space-y-3">
            {CATEGORY_DIST.map((c) => {
              const pct = Math.round((c.value / totalCat) * 100);
              return (
                <li key={c.c} className="flex items-center gap-3">
                  <div className="w-28 shrink-0"><CategoryBadge category={c.c} /></div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary/60" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-16 text-right text-xs tabular-nums text-muted-foreground">{c.value} · {pct}%</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-base font-semibold tracking-tight">Priority Distribution</h3>
          <ul className="space-y-3">
            {PRIORITY_DIST.map((p) => {
              const pct = Math.round((p.value / totalPri) * 100);
              return (
                <li key={p.p}>
                  <div className="flex items-center justify-between">
                    <PriorityBadge priority={p.p} />
                    <span className="text-xs tabular-nums text-muted-foreground">{p.value} · {pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${p.tone}`} style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
            <Users className="h-4 w-4 text-sky-500" /> Most Active Senders
          </h3>
          <ul className="space-y-2.5">
            {SENDERS.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold uppercase text-primary">{s.name.slice(0,2)}</div>
                  <p className="text-sm">{s.name}</p>
                </div>
                <span className="text-xs tabular-nums text-muted-foreground">{s.count} emails</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="mb-4 text-base font-semibold tracking-tight">Weekly Activity Patterns</h3>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 * 6 }).map((_, i) => {
              const intensity = Math.floor(Math.random() * 4);
              const tones = ["bg-muted/50", "bg-primary/20", "bg-primary/40", "bg-primary/70"];
              return <div key={i} className={`aspect-square rounded-md ${tones[intensity]}`} />;
            })}
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              <span className="h-3 w-3 rounded-sm bg-muted/50" />
              <span className="h-3 w-3 rounded-sm bg-primary/20" />
              <span className="h-3 w-3 rounded-sm bg-primary/40" />
              <span className="h-3 w-3 rounded-sm bg-primary/70" />
            </div>
            <span>More</span>
          </div>
        </section>
      </div>
    </div>
  );
}