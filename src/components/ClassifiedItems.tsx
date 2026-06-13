import type { LucideIcon } from "lucide-react";
import { AlertTriangle, BadgeDollarSign, CalendarClock, LifeBuoy, Megaphone, Newspaper, ShieldAlert, User2, UserPlus2 } from "lucide-react";

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

export type ClassifiedItem = {
  id: string;
  subject: string;
  category: Category;
  priority: Priority;
  sender: string;
  receivedAt: string;
};

export type CategoryStat = { category: Category; count: number };

const CATEGORY_META: Record<Category, { Icon: LucideIcon; chip: string; soft: string }> = {
  Marketing:  { Icon: Megaphone,        chip: "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20", soft: "text-fuchsia-500 bg-fuchsia-500/10" },
  Billing:    { Icon: BadgeDollarSign,  chip: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", soft: "text-emerald-500 bg-emerald-500/10" },
  Lead:       { Icon: UserPlus2,        chip: "bg-primary/10 text-primary border-primary/20",            soft: "text-primary bg-primary/10" },
  Support:    { Icon: LifeBuoy,         chip: "bg-sky-500/10 text-sky-600 border-sky-500/20",            soft: "text-sky-500 bg-sky-500/10" },
  Personal:   { Icon: User2,            chip: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",   soft: "text-indigo-500 bg-indigo-500/10" },
  Meeting:    { Icon: CalendarClock,    chip: "bg-amber-500/10 text-amber-600 border-amber-500/20",      soft: "text-amber-500 bg-amber-500/10" },
  Newsletter: { Icon: Newspaper,        chip: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20 dark:text-zinc-300", soft: "text-zinc-500 bg-zinc-500/10" },
  Scam:       { Icon: ShieldAlert,      chip: "bg-red-500/10 text-red-600 border-red-500/20",            soft: "text-red-500 bg-red-500/10" },
};

const PRIORITY_CHIP: Record<Priority, string> = {
  High:   "bg-red-500/10 text-red-600 border-red-500/20",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  Low:    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

const PRIORITY_DOT: Record<Priority, string> = {
  High: "bg-red-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

export function CategoryBadge({ category }: { category: Category }) {
  const meta = CATEGORY_META[category];
  const { Icon } = meta;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${meta.chip}`}>
      <Icon className="h-3 w-3" />
      {category}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${PRIORITY_CHIP[priority]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[priority]}`} />
      {priority}
    </span>
  );
}

export function ClassificationSummaryCards({ stats }: { stats: CategoryStat[] }) {
  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => {
        const meta = CATEGORY_META[s.category];
        const { Icon } = meta;
        return (
          <div
            key={s.category}
            className="rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${meta.soft}`}>
                <Icon className="h-4 w-4" />
              </div>
              <CategoryBadge category={s.category} />
            </div>
            <p className="mt-3 text-2xl font-semibold leading-none">{s.count}</p>
            <p className="mt-1 text-xs text-muted-foreground">classified emails</p>
          </div>
        );
      })}
    </section>
  );
}

export function ClassifiedItemsTable({ items, itemLabel = "Subject" }: { items: ClassifiedItem[]; itemLabel?: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Classified Emails</h3>
          <p className="text-xs text-muted-foreground">AI-generated categories and priorities — read only</p>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600">
          {items.length} items
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-medium">{itemLabel}</th>
              <th className="px-3 py-3 font-medium">Category</th>
              <th className="px-3 py-3 font-medium">Priority</th>
              <th className="px-3 py-3 font-medium">Sender</th>
              <th className="px-5 py-3 text-right font-medium">Received</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40">
                <td className="max-w-[280px] truncate px-5 py-3 font-medium">{it.subject}</td>
                <td className="px-3 py-3"><CategoryBadge category={it.category} /></td>
                <td className="px-3 py-3"><PriorityBadge priority={it.priority} /></td>
                <td className="px-3 py-3 text-muted-foreground">{it.sender}</td>
                <td className="px-5 py-3 text-right text-xs text-muted-foreground">{it.receivedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm text-muted-foreground">
          <AlertTriangle className="h-4 w-4" /> No classified items yet
        </div>
      )}
    </div>
  );
}