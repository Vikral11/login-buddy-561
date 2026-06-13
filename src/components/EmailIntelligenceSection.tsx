import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Banknote,
  Brain,
  CalendarDays,
  Filter,
  Heart,
  Inbox,
  Megaphone,
  Newspaper,
  Search,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

// Reusable AI classification building blocks. Designed so future LinkedIn /
// Instagram dashboards can pass their own category set + data.

export type Category =
  | "Marketing"
  | "Billing"
  | "Lead"
  | "Support"
  | "Personal"
  | "Meeting"
  | "Newsletter"
  | "Scam";

export type Priority = "High" | "Medium" | "Low";

export type ClassifiedEmail = {
  id: string;
  subject: string;
  category: Category;
  priority: Priority;
  sender: string;
  receivedAt: string;
};

const CATEGORY_META: Record<Category, { icon: LucideIcon; color: string; ring: string; bg: string }> = {
  Marketing: { icon: Megaphone, color: "text-pink-500", ring: "ring-pink-500/30", bg: "bg-pink-500/10" },
  Billing: { icon: Banknote, color: "text-emerald-500", ring: "ring-emerald-500/30", bg: "bg-emerald-500/10" },
  Lead: { icon: Target, color: "text-primary", ring: "ring-primary/30", bg: "bg-primary/10" },
  Support: { icon: LifeBuoy, color: "text-sky-500", ring: "ring-sky-500/30", bg: "bg-sky-500/10" },
  Personal: { icon: Heart, color: "text-rose-500", ring: "ring-rose-500/30", bg: "bg-rose-500/10" },
  Meeting: { icon: CalendarDays, color: "text-amber-500", ring: "ring-amber-500/30", bg: "bg-amber-500/10" },
  Newsletter: { icon: Newspaper, color: "text-indigo-500", ring: "ring-indigo-500/30", bg: "bg-indigo-500/10" },
  Scam: { icon: ShieldAlert, color: "text-red-500", ring: "ring-red-500/30", bg: "bg-red-500/10" },
};

const CATEGORIES: Category[] = [
  "Marketing", "Billing", "Lead", "Support", "Personal", "Meeting", "Newsletter", "Scam",
];

// Mock dataset — FastAPI backend will populate this after Gmail sync.
const SAMPLE_EMAILS: ClassifiedEmail[] = [
  { id: "1", subject: "Your invoice for November is ready", category: "Billing", priority: "High", sender: "billing@stripe.com", receivedAt: "2m ago" },
  { id: "2", subject: "Re: Partnership opportunity with Acme", category: "Lead", priority: "High", sender: "sarah@acme.co", receivedAt: "12m ago" },
  { id: "3", subject: "50% OFF — Black Friday Sale!", category: "Marketing", priority: "Low", sender: "promo@brand.com", receivedAt: "30m ago" },
  { id: "4", subject: "Standup tomorrow at 10:00", category: "Meeting", priority: "Medium", sender: "calendar@google.com", receivedAt: "1h ago" },
  { id: "5", subject: "Ticket #4821 resolved", category: "Support", priority: "Medium", sender: "support@vercel.com", receivedAt: "2h ago" },
  { id: "6", subject: "Weekly digest from Hacker News", category: "Newsletter", priority: "Low", sender: "noreply@hn.com", receivedAt: "3h ago" },
  { id: "7", subject: "Mom's birthday plans 🎂", category: "Personal", priority: "Medium", sender: "dad@family.com", receivedAt: "5h ago" },
  { id: "8", subject: "URGENT: Verify your account NOW", category: "Scam", priority: "High", sender: "secure@phish.xyz", receivedAt: "6h ago" },
  { id: "9", subject: "New lead from website form", category: "Lead", priority: "Medium", sender: "leads@agentic.io", receivedAt: "8h ago" },
  { id: "10", subject: "Payment received — thanks!", category: "Billing", priority: "Low", sender: "no-reply@paypal.com", receivedAt: "1d ago" },
  { id: "11", subject: "Product update — what's new", category: "Newsletter", priority: "Low", sender: "news@linear.app", receivedAt: "1d ago" },
  { id: "12", subject: "Quick sync on roadmap?", category: "Meeting", priority: "High", sender: "pm@team.com", receivedAt: "1d ago" },
];

export function PriorityBadge({ priority }: { priority: Priority }) {
  const styles = {
    High: "bg-red-500/10 text-red-500 ring-red-500/30",
    Medium: "bg-amber-500/10 text-amber-500 ring-amber-500/30",
    Low: "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${styles[priority]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {priority}
    </span>
  );
}

export function CategoryBadge({ category }: { category: Category }) {
  const m = CATEGORY_META[category];
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ring-1 ${m.bg} ${m.color} ${m.ring}`}>
      <Icon className="h-3 w-3" />
      {category}
    </span>
  );
}

export function ClassificationSummaryCard({ category, count, total }: { category: Category; count: number; total: number }) {
  const m = CATEGORY_META[category];
  const Icon = m.icon;
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl shadow-[var(--shadow-card)] transition-colors hover:border-primary/30">
      <div className="flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${m.bg} ${m.color}`}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[11px] text-muted-foreground">{pct}%</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-xs text-muted-foreground">{category}</p>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${m.bg.replace("/10", "/60")}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function StatChip({ icon: Icon, label, value, accent }: { icon: LucideIcon; label: string; value: string | number; accent: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">
      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">{label}</p>
        <p className="text-base font-semibold tabular-nums leading-tight">{value}</p>
      </div>
    </div>
  );
}

export function ClassifiedEmailTable({ emails }: { emails: ClassifiedEmail[] }) {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [sortDesc, setSortDesc] = useState(true);

  const rows = useMemo(() => {
    const filtered = emails.filter((e) => {
      if (categoryFilter !== "All" && e.category !== categoryFilter) return false;
      if (priorityFilter !== "All" && e.priority !== priorityFilter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!e.subject.toLowerCase().includes(q) && !e.sender.toLowerCase().includes(q)) return false;
      }
      return true;
    });
    return sortDesc ? filtered : [...filtered].reverse();
  }, [emails, query, categoryFilter, priorityFilter, sortDesc]);

  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Recently Classified Emails</h3>
          <p className="text-xs text-muted-foreground">Generated by the AI classifier after each sync.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subject or sender…"
              className="h-8 w-56 rounded-md border border-border bg-background/60 pl-8 pr-2 text-xs outline-none focus:border-primary/50"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as Category | "All")}
            className="h-8 rounded-md border border-border bg-background/60 px-2 text-xs outline-none"
          >
            <option value="All">All categories</option>
            {CATEGORIES.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as Priority | "All")}
            className="h-8 rounded-md border border-border bg-background/60 px-2 text-xs outline-none"
          >
            <option value="All">All priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button
            onClick={() => setSortDesc((s) => !s)}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 text-xs hover:bg-accent"
          >
            <Filter className="h-3.5 w-3.5" /> {sortDesc ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <th className="px-3 py-2 font-medium">Subject</th>
              <th className="px-3 py-2 font-medium">Category</th>
              <th className="px-3 py-2 font-medium">Priority</th>
              <th className="px-3 py-2 font-medium">Sender</th>
              <th className="px-3 py-2 font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.id} className="border-b border-border/60 last:border-0 hover:bg-accent/40">
                <td className="px-3 py-2.5 font-medium">{e.subject}</td>
                <td className="px-3 py-2.5"><CategoryBadge category={e.category} /></td>
                <td className="px-3 py-2.5"><PriorityBadge priority={e.priority} /></td>
                <td className="px-3 py-2.5 text-muted-foreground">{e.sender}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{e.receivedAt}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-muted-foreground">No emails match the current filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmailIntelligenceSection({ emails = SAMPLE_EMAILS, itemLabel = "emails" }: { emails?: ClassifiedEmail[]; itemLabel?: string }) {
  const counts = useMemo(() => {
    const c: Record<Category, number> = {
      Marketing: 0, Billing: 0, Lead: 0, Support: 0,
      Personal: 0, Meeting: 0, Newsletter: 0, Scam: 0,
    };
    emails.forEach((e) => { c[e.category] += 1; });
    return c;
  }, [emails]);

  const total = emails.length;
  const high = emails.filter((e) => e.priority === "High").length;
  const medium = emails.filter((e) => e.priority === "Medium").length;
  const low = emails.filter((e) => e.priority === "Low").length;
  const mostActive = (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "—") as Category;

  return (
    <section className="space-y-5">
      {/* Section header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" /> AI Email Intelligence
          </div>
          <h2 className="mt-2 text-xl font-semibold tracking-tight">Automatically categorized & prioritized</h2>
          <p className="text-sm text-muted-foreground">AI-classified {itemLabel} from your latest sync.</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        <StatChip icon={Inbox} label="Total" value={total} accent="bg-primary/10 text-primary" />
        <StatChip icon={AlertTriangle} label="High Priority" value={high} accent="bg-red-500/10 text-red-500" />
        <StatChip icon={TrendingUp} label="Medium Priority" value={medium} accent="bg-amber-500/10 text-amber-500" />
        <StatChip icon={Brain} label="Low Priority" value={low} accent="bg-muted text-muted-foreground" />
        <StatChip icon={Sparkles} label="Most Active" value={mostActive} accent="bg-emerald-500/10 text-emerald-500" />
      </div>

      {/* Classification overview */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {CATEGORIES.map((c) => (
          <ClassificationSummaryCard key={c} category={c} count={counts[c]} total={total} />
        ))}
      </div>

      {/* Table */}
      <ClassifiedEmailTable emails={emails} />
    </section>
  );
}

export const __sampleClassifiedEmails = SAMPLE_EMAILS;