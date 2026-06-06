import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { AlertTriangle, Briefcase, CalendarDays, Flag, Mail, Search, Shield, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_app/workspace")({
  head: () => ({ meta: [{ title: "AI Workspace — CurdAI" }] }),
  component: Workspace,
});

const items = [
  { id: 1, kind: "priority", icon: Flag, title: "High Priority Email", from: "Team Project Update Required", time: "10:24 AM", tone: "text-destructive bg-destructive/10" },
  { id: 2, kind: "job", icon: Briefcase, title: "Job Opportunity", from: "Frontend Developer at Microsoft", time: "09:15 AM", tone: "text-primary bg-primary/10" },
  { id: 3, kind: "opp", icon: Sparkles, title: "Internship Opportunity", from: "Data Science Internship", time: "Yesterday", tone: "text-primary bg-primary/10" },
  { id: 4, kind: "security", icon: Shield, title: "Security Alert", from: "Suspicious login detected", time: "Yesterday", tone: "text-warning bg-warning/10" },
  { id: 5, kind: "meeting", icon: CalendarDays, title: "Meeting Invitation", from: "Team Sync — Friday 3 PM", time: "2 days ago", tone: "text-primary bg-primary/10" },
  { id: 6, kind: "alert", icon: AlertTriangle, title: "Unread Important", from: "Quarterly Review Submission", time: "3 days ago", tone: "text-warning bg-warning/10" },
];

const tabs = ["All", "Priority", "Opportunities", "Meetings", "Security"];

function Workspace() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const filtered = items.filter((i) =>
    (tab === "All" ||
      (tab === "Priority" && i.kind === "priority") ||
      (tab === "Opportunities" && (i.kind === "job" || i.kind === "opp")) ||
      (tab === "Meetings" && i.kind === "meeting") ||
      (tab === "Security" && (i.kind === "security" || i.kind === "alert"))) &&
    (q === "" || i.title.toLowerCase().includes(q.toLowerCase()) || i.from.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">AI Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Email Intelligence</h1>
        <p className="mt-1 text-muted-foreground">Smart analysis of your emails, organized by what matters.</p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                tab === t ? "border-primary/50 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === t && <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-full bg-primary/15" />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search emails…" className="input pl-9" />
        </div>
      </div>

      <div className="grid gap-3">
        {filtered.map((i, idx) => {
          const Icon = i.icon;
          return (
            <motion.div
              key={i.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              whileHover={{ y: -2 }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-xl shadow-[var(--shadow-card)] transition-colors hover:border-primary/40"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${i.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{i.title}</p>
                <p className="text-xs text-muted-foreground">{i.from}</p>
              </div>
              <span className="text-xs text-muted-foreground">{i.time}</span>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
            <Mail className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">No emails match your filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}