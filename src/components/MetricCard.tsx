import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  delta,
  icon: Icon,
  tone = "primary",
  index = 0,
}: {
  label: string;
  value: number;
  delta: number;
  icon: LucideIcon;
  tone?: "primary" | "warning" | "danger" | "success";
  index?: number;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = 900;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const toneCls = {
    primary: "text-primary bg-primary/10",
    warning: "text-warning bg-warning/10",
    danger: "text-destructive bg-destructive/10",
    success: "text-success bg-success/10",
  }[tone];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl transition-opacity group-hover:opacity-80" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{n.toLocaleString()}</p>
          <p className="mt-2 inline-flex items-center gap-1 text-xs text-success">
            <ArrowUpRight className="h-3 w-3" /> {delta}% from yesterday
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneCls}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
*** End Patch