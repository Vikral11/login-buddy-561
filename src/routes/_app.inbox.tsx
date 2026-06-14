import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Inbox, Search, Sparkles, X } from "lucide-react";
import {
  CategoryBadge,
  PriorityBadge,
  __sampleClassifiedEmails,
  type Category,
  type ClassifiedEmail,
  type Priority,
} from "@/components/EmailIntelligenceSection";

export const Route = createFileRoute("/_app/inbox")({
  head: () => ({ meta: [{ title: "Smart Inbox — Agentic" }] }),
  component: SmartInboxPage,
});

const CATEGORIES: Category[] = [
  "Marketing", "Billing", "Lead", "Support",
  "Personal", "Meeting", "Newsletter", "Scam",
];
const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

type EnrichedEmail = ClassifiedEmail & {
  body: string;
  summary: string;
  insights: string[];
};

const BODIES: Record<Category, { body: string; summary: string; insights: string[] }> = {
  Billing: {
    body: "Hi, your latest invoice has been generated and is now available in your account. Please review the charges and ensure your payment method is up to date to avoid any service interruption.",
    summary: "An invoice or billing notification requiring your attention or payment action.",
    insights: ["Time-sensitive — payment deadline likely soon", "Affects active subscription / service access"],
  },
  Lead: {
    body: "Hi there, I came across Agentic and would love to explore a potential partnership. Do you have 20 minutes this week for a quick intro call?",
    summary: "Inbound business opportunity worth a personal reply within 24 hours.",
    insights: ["High commercial intent detected", "Suggested action: schedule intro call"],
  },
  Marketing: {
    body: "Don't miss out — our biggest sale of the year ends tonight. Use code SAVE50 at checkout to get 50% off.",
    summary: "Promotional content. Safe to skip or archive.",
    insights: ["Low engagement priority", "Bulk promotional sender"],
  },
  Meeting: {
    body: "Reminder: you have an upcoming meeting tomorrow. Calendar invite attached with the agenda and join link.",
    summary: "Calendar event or meeting invitation.",
    insights: ["Add to calendar if not already", "Prepare any pre-read materials"],
  },
  Support: {
    body: "Your support ticket has been updated. Our team has investigated the issue and shared a resolution — please confirm everything is working as expected.",
    summary: "Status update on a previously opened support ticket.",
    insights: ["Awaiting your confirmation", "No further action required if resolved"],
  },
  Personal: {
    body: "Just checking in — wanted to share some updates from this week and plan a time to catch up soon.",
    summary: "A personal message from someone in your network.",
    insights: ["Personal correspondence", "Not work-related"],
  },
  Newsletter: {
    body: "Here's your weekly digest of the most interesting stories, curated for you. Read on for the highlights.",
    summary: "Regular newsletter you've subscribed to.",
    insights: ["Recurring digest", "Low priority — read at leisure"],
  },
  Scam: {
    body: "URGENT: Your account will be suspended within 24 hours unless you verify your identity by clicking the link below.",
    summary: "Suspicious message that exhibits classic phishing patterns. Do not click any links.",
    insights: ["Likely phishing attempt", "Recommended action: report and delete"],
  },
};

const EMAILS: EnrichedEmail[] = __sampleClassifiedEmails.map((e) => ({
  ...e,
  ...BODIES[e.category],
}));

function SmartInboxPage() {
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(EMAILS[0]?.id ?? "");

  const filtered = useMemo(() => {
    return EMAILS.filter((e) => {
      if (categoryFilter !== "All" && e.category !== categoryFilter) return false;
      if (priorityFilter !== "All" && e.priority !== priorityFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !e.subject.toLowerCase().includes(q) &&
          !e.sender.toLowerCase().includes(q)
        ) return false;
      }
      return true;
    });
  }, [categoryFilter, priorityFilter, query]);

  const grouped = useMemo(() => {
    const g: Partial<Record<Category, EnrichedEmail[]>> = {};
    filtered.forEach((e) => {
      (g[e.category] ||= []).push(e);
    });
    return g;
  }, [filtered]);

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0];

  const activeFilters = (categoryFilter !== "All" ? 1 : 0) + (priorityFilter !== "All" ? 1 : 0);

  return (
    <div className="space-y-6">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
          <Sparkles className="h-3 w-3" /> AI-Powered
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Smart Inbox</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Emails are automatically classified and prioritized by AI. Filter, group, and read with full context.
        </p>
      </header>

      {/* Filters */}
      <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl shadow-[var(--shadow-card)]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subject or sender…"
              className="h-10 w-full rounded-xl border border-border bg-background/60 pl-9 pr-3 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as Category | "All")}
              className="h-10 rounded-xl border border-border bg-background/60 px-3 text-sm outline-none"
            >
              <option value="All">All categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value as Priority | "All")}
              className="h-10 rounded-xl border border-border bg-background/60 px-3 text-sm outline-none"
            >
              <option value="All">All priorities</option>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            {activeFilters > 0 && (
              <button
                onClick={() => { setCategoryFilter("All"); setPriorityFilter("All"); }}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 text-xs hover:bg-accent"
              >
                <X className="h-3.5 w-3.5" /> Clear ({activeFilters})
              </button>
            )}
          </div>
        </div>

        {/* Quick category chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip active={categoryFilter === "All"} onClick={() => setCategoryFilter("All")} label={`All · ${EMAILS.length}`} />
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              active={categoryFilter === c}
              onClick={() => setCategoryFilter(c)}
              label={`${c} · ${EMAILS.filter((e) => e.category === c).length}`}
            />
          ))}
        </div>
      </div>

      {/* List + Detail */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* List, grouped by category */}
        <div className="space-y-5">
          {Object.keys(grouped).length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
              <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No emails match your filters.</p>
            </div>
          ) : (
            (Object.keys(grouped) as Category[]).map((cat) => (
              <div key={cat}>
                <div className="mb-2 flex items-center justify-between px-1">
                  <CategoryBadge category={cat} />
                  <span className="text-[11px] text-muted-foreground">{grouped[cat]!.length} email{grouped[cat]!.length === 1 ? "" : "s"}</span>
                </div>
                <div className="space-y-2">
                  {grouped[cat]!.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => setSelectedId(e.id)}
                      className={`group flex w-full items-start gap-3 rounded-2xl border bg-card/60 p-3.5 text-left backdrop-blur-xl transition-colors hover:border-primary/40 ${
                        selected?.id === e.id ? "border-primary/50 ring-1 ring-primary/30" : "border-border"
                      }`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary text-xs font-semibold uppercase">
                        {e.sender.slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-medium">{e.sender}</p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">{e.receivedAt}</span>
                        </div>
                        <p className="mt-0.5 truncate text-sm text-foreground/90">{e.subject}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          <CategoryBadge category={e.category} />
                          <PriorityBadge priority={e.priority} />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Detail panel */}
        <aside className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)] lg:sticky lg:top-4 lg:self-start">
          {selected ? (
            <div className="space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <CategoryBadge category={selected.category} />
                  <PriorityBadge priority={selected.priority} />
                  <span className="ml-auto text-[11px] text-muted-foreground">{selected.receivedAt}</span>
                </div>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">{selected.subject}</h2>
                <p className="mt-1 text-xs text-muted-foreground">From <span className="text-foreground/80">{selected.sender}</span></p>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
                  <Sparkles className="h-3 w-3" /> AI Summary
                </div>
                <p className="mt-2 text-sm leading-relaxed text-foreground/90">{selected.summary}</p>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Email Content</p>
                <p className="mt-2 whitespace-pre-line rounded-xl border border-border bg-background/50 p-4 text-sm leading-relaxed">
                  {selected.body}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background/50 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Category</p>
                  <div className="mt-2"><CategoryBadge category={selected.category} /></div>
                </div>
                <div className="rounded-xl border border-border bg-background/50 p-3">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Priority</p>
                  <div className="mt-2"><PriorityBadge priority={selected.priority} /></div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Key Insights</p>
                <ul className="mt-2 space-y-1.5">
                  {selected.insights.map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center text-sm text-muted-foreground">Select an email to view details.</div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-primary/50 bg-primary/10 text-foreground"
          : "border-border text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}