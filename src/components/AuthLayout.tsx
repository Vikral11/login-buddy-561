import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { OrbitalVisual } from "./OrbitalVisual";

export function AuthLayout({ children, heading, sub }: { children: ReactNode; heading: string; sub: string }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">CurdAI</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Email Workspace</p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <OrbitalVisual size={520} />
        </div>

        <div className="space-y-2">
          <h2 className="max-w-md text-3xl font-semibold tracking-tight">
            Transform Email Into <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Intelligence</span>
          </h2>
          <p className="max-w-md text-sm text-muted-foreground">
            AI that understands your emails, organizes what matters, and helps you achieve more every day.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold">CurdAI</p>
            </div>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">{heading}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{sub}</p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
