import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Inbox, AlertCircle, Flag, Sparkles } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricCard } from "@/components/MetricCard";
import { dashboardService } from "@/services/dashboardService";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — CurdAI" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { data: metrics = [] } = useQuery({ queryKey: ["metrics"], queryFn: () => dashboardService.getMetrics() });
  const { data: activity = [] } = useQuery({ queryKey: ["activity"], queryFn: () => dashboardService.getActivity() });
  const { data: emailAct = [] } = useQuery({ queryKey: ["email-act"], queryFn: () => dashboardService.getEmailActivity() });

  const icons = [Inbox, Flag, AlertCircle, Sparkles];
  const tones: Array<"primary" | "warning" | "danger" | "success"> = ["primary", "warning", "danger", "success"];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Executive Overview</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Real-time metrics powering your workspace.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <MetricCard key={m.label} label={m.label} value={m.value} delta={m.delta} icon={icons[i]} tone={tones[i]} index={i} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">Email Activity — This Week</h3>
            <span className="text-xs text-muted-foreground">Synced 2 min ago</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emailAct}>
                <defs>
                  <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.2 295)" />
                    <stop offset="100%" stopColor="oklch(0.55 0.2 285)" />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(0.3 0.04 260)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(0.72 0.03 255)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(0.72 0.03 255)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.035 268)", border: "1px solid oklch(0.3 0.04 260)", borderRadius: 12 }} />
                <Bar dataKey="count" fill="url(#bar)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium">AI Activity Timeline</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <ul className="space-y-4">
            {activity.map((a) => {
              const dot = {
                info: "bg-primary",
                success: "bg-success",
                warning: "bg-warning",
                danger: "bg-destructive",
              }[a.kind];
              return (
                <li key={a.time} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span className={`h-2.5 w-2.5 rounded-full ${dot} ring-4 ring-card`} />
                    <span className="my-1 flex-1 w-px bg-border" />
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{a.title}</p>
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{a.note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
        <h3 className="mb-4 text-sm font-medium">Workspace Insights — 30 days</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={Array.from({ length: 30 }, (_, i) => ({ d: i + 1, v: Math.round(80 + Math.sin(i / 3) * 40 + Math.random() * 30) }))}>
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.72 0.2 295)" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="oklch(0.72 0.2 295)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(0.3 0.04 260)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="d" stroke="oklch(0.72 0.03 255)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="oklch(0.72 0.03 255)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.035 268)", border: "1px solid oklch(0.3 0.04 260)", borderRadius: 12 }} />
              <Area type="monotone" dataKey="v" stroke="oklch(0.72 0.2 295)" strokeWidth={2} fill="url(#area)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}