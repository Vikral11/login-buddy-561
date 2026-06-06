import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import heroImg from "@/assets/login-hero.jpg";

export function AuthLayout({ children, heading, sub }: { children: ReactNode; heading: string; sub: string }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border lg:flex lg:flex-col lg:justify-between lg:p-12">
        {/* Ambient backdrop */}
        <div className="pointer-events-none absolute inset-0">
          <div className="glow-orb" style={{ width: 520, height: 520, top: -120, left: -120, background: "radial-gradient(circle, oklch(0.55 0.22 285 / 0.55), transparent 70%)" }} />
          <div className="glow-orb" style={{ width: 460, height: 460, bottom: -140, right: -120, background: "radial-gradient(circle, oklch(0.6 0.2 320 / 0.45), transparent 70%)" }} />
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        </div>

        <div className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight">CURD <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">AI</span></p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Email Workspace</p>
          </div>
        </div>

        <div className="relative flex flex-1 items-center justify-center">
          {/* Concentric energy rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {[520, 420, 320].map((s, i) => (
              <div
                key={s}
                className={i % 2 ? "animate-spin-reverse" : "animate-spin-slow"}
                style={{
                  position: "absolute",
                  width: s, height: s,
                  borderRadius: 9999,
                  border: "1px dashed color-mix(in oklab, var(--color-primary) 35%, transparent)",
                  maskImage: "radial-gradient(circle, black 60%, transparent 75%)",
                }}
              />
            ))}
            <div className="animate-pulse-glow absolute h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.22 285 / 0.5), transparent 60%)" }} />
          </div>

          <motion.img
            src={heroImg}
            alt="CurdAI floating email capsule"
            width={520}
            height={520}
            className="relative z-10 h-[520px] w-[520px] object-contain drop-shadow-[0_30px_80px_oklch(0.55_0.22_285/0.55)]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 0.8 }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
          />

          {/* Floating particles */}
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/80"
              style={{ left: `${15 + (i * 53) % 70}%`, top: `${20 + (i * 37) % 60}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="relative space-y-2">
          <h1 className="text-5xl font-semibold tracking-tight">CURD <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">AI</span></h1>
          <h2 className="max-w-md text-2xl font-medium tracking-tight text-foreground/90">
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
