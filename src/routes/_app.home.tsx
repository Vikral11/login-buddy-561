import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "Mission Control — CurdAI" }] }),
  component: Home,
});

function Home() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const cards = [
    { title: "Workspace Status", value: "Operational", note: "All systems nominal", icon: Activity, tone: "text-success" },
    { title: "Connected Gmail", value: "1 account", note: "charvi.work@gmail.com", icon: Mail, tone: "text-primary" },
    { title: "AI Activity", value: "Active", note: "Analyzing 1,420 emails", icon: Sparkles, tone: "text-primary" },
    { title: "Recent Actions", value: "12 today", note: "5 in the last hour", icon: CheckCircle2, tone: "text-success" },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Mission Control</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          {greeting}, {user?.name} <span className="ml-1">👋</span>
        </h1>
        <p className="mt-2 text-muted-foreground">Your workspace is ready. Here's what's happening in your inbox today.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="glass-card relative overflow-hidden p-5"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ${c.tone}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight">{c.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{c.note}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card relative overflow-hidden p-8"
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary">Signature Insight</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Your AI is actively learning from your inbox.</h2>
            <p className="mt-3 text-muted-foreground">
              CurdAI processed 1,420 emails today, flagged 128 as high-priority, and surfaced 18 new opportunities. Head to the Dashboard for the full briefing.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48 rounded-full border border-primary/30">
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/40 to-primary-glow/40 blur-2xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
                  <Sparkles className="h-10 w-10 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}