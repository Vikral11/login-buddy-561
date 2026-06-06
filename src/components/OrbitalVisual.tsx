import { motion } from "framer-motion";
import { Mail, Shield, Sparkles, Target, TrendingUp, Zap } from "lucide-react";

const nodes = [
  { icon: Target, label: "Priority Detection", angle: 0 },
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
      {/* glow rings */}
      <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle, oklch(0.65 0.22 285 / 0.25), transparent 60%)" }} />
      {[0.55, 0.75, 0.95].map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/20"
          style={{ width: size * s, height: size * s }}
          animate={{ rotate: i % 2 ? -360 : 360 }}
          transition={{ duration: 40 + i * 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

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
        <div className="absolute h-40 w-40 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-primary/50 bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
          <Mail className="h-12 w-12 text-primary-foreground" />
        </div>
      </motion.div>
    </div>
  );
}
*** End Patch