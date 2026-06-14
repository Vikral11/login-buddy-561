import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertOctagon, AlertTriangle, Clock, Flag, MessageCircle } from "lucide-react";
import { EMAILS, PRIORITY_META, type Email } from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/priorities")({
  head: () => ({ meta: [{ title: "Priorities — Gmail Workspace" }] }),
  component: PrioritiesPage,
});

type Bucket = { id: string; label: string; Icon: typeof Flag; color: string; emails: Email[] };

function PrioritiesPage() {
  const buckets: Bucket[] = [
    { id: "high", label: "High Priority", Icon: Flag, color: "text-rose-600 bg-rose-500/10", emails: EMAILS.filter((e) => e.priority === "Critical") },
    { id: "urgent", label: "Urgent", Icon: AlertOctagon, color: "text-amber-600 bg-amber-500/10", emails: EMAILS.filter((e) => e.priorityScore >= 80 && e.priority !== "Critical") },
    { id: "needs", label: "Needs Response", Icon: MessageCircle, color: "text-sky-600 bg-sky-500/10", emails: EMAILS.filter((e) => e.suggestedActions[0]?.toLowerCase().includes("reply")) },
    { id: "deadline", label: "Deadline Approaching", Icon: Clock, color: "text-violet-600 bg-violet-500/10", emails: EMAILS.filter((e) => e.dueDate && /today|tomorrow|fri|hour/i.test(e.dueDate)) },
    { id: "overdue", label: "Overdue", Icon: AlertTriangle, color: "text-rose-600 bg-rose-500/10", emails: EMAILS.filter((e) => e.dueDate?.toLowerCase().includes("eow") && e.priority === "Critical") },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Priorities</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">AI-scored emails ranked by urgency, deadline, and required action.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {buckets.map((b) => (
          <div key={b.id} className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${b.color}`}>
              <b.Icon className="h-5 w-5" />
            </div>
            <p className="mt-3 text-2xl font-semibold">{b.emails.length}</p>
            <p className="text-xs text-muted-foreground">{b.label}</p>
          </div>
        ))}
      </div>

      {buckets.map((b) => (
        <section key={b.id}>
          <div className="mb-3 flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${b.color}`}>
              <b.Icon className="h-4 w-4" />
            </div>
            <h2 className="text-base font-semibold tracking-tight">{b.label}</h2>
            <span className="text-xs text-muted-foreground">({b.emails.length})</span>
          </div>
          {b.emails.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-6 text-center text-sm text-muted-foreground">
              Nothing here right now — you're caught up.
            </div>
          ) : (
            <ul className="space-y-2 rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl shadow-[var(--shadow-card)]">
              {b.emails.map((e) => (
                <li key={e.id}>
                  <Link to="/gmail/inbox" className="grid grid-cols-[1fr_auto] items-start gap-3 rounded-xl p-3 transition-colors hover:bg-accent/40">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-semibold">{e.subject}</p>
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_META[e.priority].color}`}>{e.priority}</span>
                      </div>
                      <p className="truncate text-[13px] text-muted-foreground">{e.sender} · {e.reason ?? e.aiSummary}</p>
                    </div>
                    <div className="text-right text-[11px] text-muted-foreground">
                      <p className="font-medium text-foreground">Due {e.dueDate ?? "—"}</p>
                      <p>{e.time}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}