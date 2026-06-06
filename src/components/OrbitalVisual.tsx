import { motion } from "framer-motion";
import { Brain, Mail, Shield, Sparkles, Target, TrendingUp, Zap } from "lucide-react";

const nodes = [
  { icon: Target, label: "Priority", angle: 0 },
  { icon: Sparkles, label: "AI Analysis", angle: 60 },
  { icon: TrendingUp, label: "Productivity", angle: 120 },
  { icon: Zap, label: "Opportunity", angle: 180 },
  { icon: Shield, label: "Security", angle: 240 },
  { icon: Mail, label: "Inbox Sync", angle: 300 },
];

export function OrbitalVisual({ size = 460 }: { size?: number }) {
  const radius = size * 0.38;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* ambient halo */}
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.22 285 / 0.35), transparent 60%)" }} />
      <div className="absolute h-[70%] w-[70%] animate-pulse-glow rounded-full" style={{ background: "radial-gradient(circle, oklch(0.7 0.22 295 / 0.5), transparent 65%)" }} />

      {[0.55, 0.75, 0.95].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-dashed border-primary/30"
          style={{ width: size * s, height: size * s }}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* tilted orbit ring (3D feel) */}
      <div
        className="absolute rounded-full border border-primary/40"
        style={{
          width: size * 1.02, height: size * 0.45,
          transform: "rotateX(70deg)",
          boxShadow: "0 0 60px oklch(0.65 0.22 285 / 0.5) inset",
        }}
      />

      {/* orbiting nodes */}
      <motion.div
        className="absolute"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      >
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius + radius;
          const y = Math.sin(rad) * radius + radius;
          const Icon = n.icon;
          return (
            <motion.div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/40 bg-card/80 backdrop-blur-md shadow-[var(--shadow-glow)]">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {n.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* particles */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/70"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: Math.cos(a) * (radius + 30),
              y: Math.sin(a) * (radius + 30),
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        );
      })}

      {/* center email orb */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute h-48 w-48 rounded-full bg-primary/50 blur-3xl" />
        {/* glass pedestal */}
        <div className="absolute -bottom-10 h-6 w-40 rounded-full bg-primary/30 blur-2xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-white/20 bg-gradient-to-br from-white/95 to-white/80 shadow-[0_25px_60px_-10px_oklch(0.65_0.22_285/0.7)] backdrop-blur-xl">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent" />
          {/* Gmail-like mark */}
          <svg viewBox="0 0 64 48" className="relative h-14 w-14">
            <path d="M4 8 L32 28 L60 8 L60 42 L48 42 L48 22 L32 34 L16 22 L16 42 L4 42 Z" fill="url(#gm)" />
            <defs>
              <linearGradient id="gm" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="oklch(0.55 0.22 285)" />
                <stop offset="1" stopColor="oklch(0.65 0.22 320)" />
              </linearGradient>
            </defs>
          </svg>
          <Brain className="absolute -right-2 -top-2 h-5 w-5 text-primary drop-shadow-[0_0_10px_oklch(0.7_0.22_295)]" />
        </div>
      </motion.div>
    </div>
  );
}
