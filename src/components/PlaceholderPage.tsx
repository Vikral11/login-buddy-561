import { motion } from "framer-motion";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  children?: ReactNode;
};

export function PlaceholderPage({ eyebrow, title, description, icon: Icon, children }: Props) {
  return (
    <div className="space-y-8">
      <Link
        to="/home"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 max-w-2xl text-muted-foreground">{description}</p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-dashed border-border bg-card/60 p-12 text-center backdrop-blur-xl shadow-[var(--shadow-card)]"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <h2 className="mt-4 text-lg font-semibold tracking-tight">Coming soon</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          This module is wired and ready to be connected to your FastAPI backend. Data and live state will appear here.
        </p>
        {children ? <div className="mt-8 text-left">{children}</div> : null}
      </motion.div>
    </div>
  );
}