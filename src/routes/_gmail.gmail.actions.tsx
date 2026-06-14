import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import { ACTIONS, PRIORITY_META, type ActionItem } from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/actions")({
  head: () => ({ meta: [{ title: "Actions — Gmail Workspace" }] }),
  component: ActionsPage,
});

const STATUS_COLOR: Record<ActionItem["status"], string> = {
  Pending: "text-amber-600 bg-amber-500/10",
  "In progress": "text-sky-600 bg-sky-500/10",
  Done: "text-emerald-600 bg-emerald-500/10",
};

function ActionsPage() {
  const [filter, setFilter] = useState<"All" | ActionItem["status"]>("All");
  const list = ACTIONS.filter((a) => filter === "All" || a.status === filter);

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Actions</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">AI-generated tasks extracted directly from your inbox.</p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {(["All", "Pending", "In progress", "Done"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === s ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <div key={a.id} className="flex flex-col rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${a.color}`}>
                <a.Icon className="h-5 w-5" />
              </div>
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${STATUS_COLOR[a.status]}`}>{a.status}</span>
            </div>
            <h3 className="mt-4 text-sm font-semibold leading-snug">{a.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">From: {a.source}</p>

            <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {a.deadline}</span>
              <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_META[a.priority].color}`}>{a.priority}</span>
            </div>

            <div className="mt-4 flex gap-2 pt-4 border-t border-border">
              <button className="flex-1 inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground hover:opacity-95">
                Take action
              </button>
              <button className="inline-flex h-9 items-center justify-center rounded-xl border border-border bg-background/60 px-3 text-sm font-medium hover:bg-accent" aria-label="Mark done">
                <CheckCircle2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center text-sm text-muted-foreground">
            No actions in this filter.
          </div>
        )}
      </div>
    </div>
  );
}