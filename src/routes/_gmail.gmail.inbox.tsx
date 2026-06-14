import { createFileRoute } from "@tanstack/react-router";
import { Filter, Search, Sparkles, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { CATEGORY_META, EMAILS, PRIORITY_META, type Category, type Email } from "@/lib/gmail-data";

export const Route = createFileRoute("/_gmail/gmail/inbox")({
  head: () => ({ meta: [{ title: "Inbox — Gmail Workspace" }] }),
  component: InboxPage,
});

const CATEGORIES: Category[] = ["All", "Recruiting", "Finance", "Meetings", "Support", "Marketing", "Personal"];

function InboxPage() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(EMAILS[0].id);

  const list = useMemo(() => {
    return EMAILS.filter((e) => {
      if (category !== "All" && e.category !== category) return false;
      if (unreadOnly && !e.unread) return false;
      if (query && !(`${e.subject} ${e.sender} ${e.preview}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [category, query, unreadOnly]);

  const selected = EMAILS.find((e) => e.id === selectedId) ?? list[0] ?? EMAILS[0];

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">AI-organized emails across every category that matters.</p>
      </header>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c];
          const active = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <meta.Icon className="h-3.5 w-3.5" />
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        {/* Left: list */}
        <section className="rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="space-y-3 border-b border-border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search emails…"
                className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary/50" />
            </div>
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} className="accent-primary" />
              <Filter className="h-3.5 w-3.5" /> Unread only
            </label>
          </div>
          <ul className="max-h-[640px] divide-y divide-border overflow-y-auto">
            {list.map((e) => {
              const meta = CATEGORY_META[e.category];
              const isSel = e.id === selected.id;
              return (
                <li key={e.id}>
                  <button onClick={() => setSelectedId(e.id)}
                    className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${isSel ? "bg-primary/5" : "hover:bg-accent/40"}`}>
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${meta.color}`}>
                      <meta.Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`truncate text-sm ${e.unread ? "font-semibold" : "font-medium"}`}>{e.sender}</p>
                        {e.important && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
                      </div>
                      <p className="truncate text-[13px]">{e.subject}</p>
                      <p className="truncate text-[12px] text-muted-foreground">{e.preview}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5 text-[11px] text-muted-foreground">
                      <span>{e.time}</span>
                      <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_META[e.priority].color}`}>{e.priority}</span>
                    </div>
                  </button>
                </li>
              );
            })}
            {list.length === 0 && <li className="p-10 text-center text-sm text-muted-foreground">No emails match your filters.</li>}
          </ul>
        </section>

        {/* Right: detail */}
        <EmailDetail email={selected} />
      </div>
    </div>
  );
}

function EmailDetail({ email }: { email: Email }) {
  const cat = CATEGORY_META[email.category];
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <div className="flex items-start gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
          <cat.Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold tracking-tight">{email.subject}</h2>
          <p className="text-sm text-muted-foreground">
            {email.sender} <span className="opacity-60">&lt;{email.senderEmail}&gt;</span> · {email.time}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${cat.color}`}>{email.category}</span>
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_META[email.priority].color}`}>{email.priority}</span>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <Sparkles className="h-3.5 w-3.5" /> AI Summary
        </div>
        <p className="mt-2 text-sm">{email.aiSummary}</p>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Priority Score</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">{email.priorityScore}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow" style={{ width: `${email.priorityScore}%` }} />
          </div>
        </div>
        <div className="rounded-xl border border-border p-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Reason</p>
          <p className="mt-2 text-sm">{email.reason ?? "Routine message — no urgent action required."}</p>
          {email.dueDate && <p className="mt-1 text-xs text-muted-foreground">Due: {email.dueDate}</p>}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Suggested Actions</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {email.suggestedActions.map((a, i) => (
            <button key={a} className={`inline-flex h-9 items-center rounded-xl px-3 text-sm font-medium ${
              i === 0 ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:opacity-95"
                      : "border border-border bg-background/60 hover:bg-accent"
            }`}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 whitespace-pre-wrap rounded-xl border border-border bg-background/40 p-4 text-sm leading-relaxed text-muted-foreground">
        {email.body}
      </div>
    </section>
  );
}