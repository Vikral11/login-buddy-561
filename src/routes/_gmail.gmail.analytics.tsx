import { createFileRoute } from "@tanstack/react-router";
import {
  CATEGORY_DISTRIBUTION,
  PRIORITY_DISTRIBUTION,
  PRIORITY_META,
  RESPONSE_TIME,
  TOP_SENDERS,
  VOLUME_TREND,
} from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Gmail Workspace" }] }),
  component: AnalyticsPage,
});

function LineChart({ points, accent = "primary" }: { points: number[]; accent?: "primary" | "emerald" }) {
  const max = Math.max(...points, 1);
  const w = 520, h = 160;
  const step = w / (points.length - 1);
  const pts = points.map((p, i) => [i * step, h - (p / max) * h * 0.8 - 8] as const);
  const d = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const strokeClass = accent === "primary" ? "stroke-primary" : "stroke-emerald-500";
  const fillId = accent === "primary" ? "lc-primary" : "lc-emerald";
  const stopColor = accent === "primary" ? "hsl(var(--primary, 250 80% 60%))" : "rgb(16, 185, 129)";
  return (
    <svg viewBox={`0 0 ${w} ${h + 8}`} className="h-44 w-full">
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stopColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${fillId})`} />
      <path d={d} className={strokeClass} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart({ data }: { data: { name: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.name}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>{d.name}</span>
            <span className="text-muted-foreground">{d.value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Donut({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((a, b) => a + b.value, 0) || 1;
  const r = 60, c = 2 * Math.PI * r, cx = 80, cy = 80;
  let acc = 0;
  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40">
        <circle cx={cx} cy={cy} r={r} fill="none" className="stroke-muted" strokeWidth="18" />
        {data.map((d) => {
          const len = (d.value / total) * c;
          const dash = `${len} ${c - len}`;
          const offset = c - acc;
          acc += len;
          return (
            <circle key={d.name} cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="18"
              strokeDasharray={dash} strokeDashoffset={offset} className={d.color}
              transform={`rotate(-90 ${cx} ${cy})`} />
          );
        })}
        <text x={cx} y={cy - 4} textAnchor="middle" className="fill-foreground text-[20px] font-semibold">{total}</text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="fill-muted-foreground text-[10px]">total</text>
      </svg>
      <ul className="space-y-1.5 text-sm">
        {data.map((d) => (
          <li key={d.name} className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${d.color.replace("text-", "bg-")}`} />
            <span className="flex-1">{d.name}</span>
            <span className="text-muted-foreground">{Math.round((d.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnalyticsPage() {
  const priorityDonut = PRIORITY_DISTRIBUTION.map((p) => ({
    name: p.name,
    value: p.value,
    color: PRIORITY_META[p.name].color.split(" ")[0],
  }));

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Analytics</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Volume, categories, priorities, and response performance.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Email Volume Trend</h3>
            <span className="text-[11px] text-muted-foreground">Last 12 days</span>
          </div>
          <p className="mt-2 text-3xl font-semibold">{VOLUME_TREND.reduce((a, b) => a + b, 0)}</p>
          <p className="text-xs text-muted-foreground">Total emails received</p>
          <LineChart points={VOLUME_TREND} />
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold tracking-tight">Response Time Trend</h3>
            <span className="text-[11px] text-muted-foreground">Hours · last 7 days</span>
          </div>
          <p className="mt-2 text-3xl font-semibold">{RESPONSE_TIME[RESPONSE_TIME.length - 1]}h</p>
          <p className="text-xs text-emerald-600">↓ 50% vs week start</p>
          <LineChart points={RESPONSE_TIME} accent="emerald" />
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Category Distribution</h3>
          <p className="text-xs text-muted-foreground">How AI classified your inbox this period</p>
          <div className="mt-4">
            <BarChart data={CATEGORY_DISTRIBUTION.map((c) => ({ name: c.name, value: c.value }))} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <h3 className="text-base font-semibold tracking-tight">Priority Distribution</h3>
          <p className="text-xs text-muted-foreground">Mix of priority scores assigned by AI</p>
          <div className="mt-4">
            <Donut data={priorityDonut} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="text-base font-semibold tracking-tight">Top Senders</h3>
          <p className="text-xs text-muted-foreground">Most frequent senders this period</p>
          <ul className="mt-4 divide-y divide-border">
            {TOP_SENDERS.map((s) => (
              <li key={s.name} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-xs font-semibold text-primary">
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-sm">{s.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
                      style={{ width: `${(s.count / TOP_SENDERS[0].count) * 100}%` }} />
                  </div>
                  <span className="w-8 text-right text-sm font-medium">{s.count}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}