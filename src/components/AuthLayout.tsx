import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { Mail, Linkedin, Instagram, Sparkles, Zap, Brain, Lock, ShieldCheck, Bot } from "lucide-react";

/**
 * Agentic Auth split-screen layout — light theme only.
 * Forces light theme while mounted so the page does not invert in dark mode.
 */
export function AuthLayout({
  children,
  heading,
  subtitle,
}: {
  children: ReactNode;
  heading: ReactNode;
  subtitle: string;
}) {
  // Force light theme for the auth pages only.
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.remove("dark");
    root.classList.add("light");
    return () => {
      root.classList.remove("light");
      if (hadDark) root.classList.add("dark");
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full text-[#0F172A]"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="grid min-h-screen lg:grid-cols-2">
        <LeftPanel />
        <RightPanel heading={heading} subtitle={subtitle}>
          {children}
        </RightPanel>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-9 w-9 items-center justify-center">
        <div
          className="absolute inset-0 rounded-[10px]"
          style={{
            background: "linear-gradient(135deg, #6C4DFF 0%, #8F7CFF 100%)",
            boxShadow: "0 10px 24px -10px rgba(108,77,255,0.55)",
          }}
        />
        <Sparkles className="relative h-4 w-4 text-white" strokeWidth={2.4} />
      </div>
      <span className="text-[15px] font-bold tracking-[0.18em] text-[#0F172A]">AGENTIC</span>
    </div>
  );
}

function LeftPanel() {
  return (
    <div
      className="relative hidden overflow-hidden lg:flex lg:flex-col lg:px-14 lg:py-10 xl:px-16"
      style={{
        background:
          "radial-gradient(1200px 700px at 0% 0%, rgba(143,124,255,0.22), transparent 60%), radial-gradient(900px 600px at 100% 100%, rgba(108,77,255,0.14), transparent 60%), linear-gradient(180deg, #F4F1FF 0%, #FAFBFC 100%)",
      }}
    >
      <Logo />

      <div className="mt-8">
        <h1 className="text-[52px] xl:text-[60px] font-semibold leading-[1.02] tracking-[-0.02em] text-[#0F172A]">
          All Your Accounts.
          <br />
          One Platform.
          <br />
          <span style={{ color: "#6C4DFF" }}>Smarter Actions.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#64748B]">
          Connect your Gmail, LinkedIn and Instagram accounts into one intelligent workspace —
          monitor updates, opportunities and conversations automatically.
        </p>
      </div>

      <div className="my-6 flex items-center justify-center">
        <EcosystemDiagram />
      </div>

      <FeatureCards />

      <SecurityPanel />
    </div>
  );
}

function EcosystemDiagram() {
  const nodes = [
    { icon: Mail, label: "Gmail", color: "#EA4335", angle: -90 },
    { icon: Linkedin, label: "LinkedIn", color: "#0A66C2", angle: 30 },
    { icon: Instagram, label: "Instagram", color: "#E1306C", angle: 150 },
  ];
  const radius = 175;
  const size = 460;
  const cx = size / 2;
  const cy = size / 2;
  const NODE = 64;
  const CENTER = 84;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute left-0 top-0">
        <defs>
          <radialGradient id="orbit-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C4DFF" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#6C4DFF" stopOpacity="0.28" />
          </radialGradient>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C4DFF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6C4DFF" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={radius + 30} fill="none" stroke="rgba(108,77,255,0.08)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="url(#orbit-grad)" strokeWidth="1.4" strokeDasharray="4 7" />
        <circle cx={cx} cy={cy} r={radius - 42} fill="none" stroke="rgba(108,77,255,0.1)" strokeWidth="1" />
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = cx + radius * Math.cos(rad);
          const y = cy + radius * Math.sin(rad);
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke="url(#line-grad)" strokeWidth="1.2" strokeDasharray="2 5" />
              {/* sync indicator pulse traveling outward */}
              <motion.circle
                r={3}
                fill="#6C4DFF"
                initial={{ opacity: 0 }}
                animate={{
                  cx: [cx, x],
                  cy: [cy, y],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Center Agentic mark */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute flex items-center justify-center rounded-3xl"
        style={{
          left: cx - CENTER / 2,
          top: cy - CENTER / 2,
          width: CENTER,
          height: CENTER,
          background: "linear-gradient(135deg, #6C4DFF, #8F7CFF)",
          boxShadow: "0 28px 60px -18px rgba(108,77,255,0.6), 0 0 0 8px rgba(108,77,255,0.08)",
        }}
      >
        <Sparkles className="h-9 w-9 text-white" strokeWidth={2.2} />
      </motion.div>

      {/* AI assistant under center */}
      <div
        className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/90 backdrop-blur"
        style={{
          left: cx - 22,
          top: cy + CENTER / 2 + 12,
          boxShadow: "0 10px 28px -10px rgba(15,23,42,0.2)",
        }}
      >
        <Bot className="h-5 w-5" style={{ color: "#6C4DFF" }} />
      </div>

      {/* Orbiting nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad) - NODE / 2;
        const y = cy + radius * Math.sin(rad) - NODE / 2;
        const Icon = n.icon;
        return (
          <motion.div
            key={n.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -3, 0] }}
            transition={{
              opacity: { delay: 0.2 + i * 0.1 },
              scale: { delay: 0.2 + i * 0.1 },
              y: { duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 },
            }}
            className="absolute flex items-center justify-center rounded-2xl border border-white/70 bg-white/90 backdrop-blur"
            style={{
              left: x,
              top: y,
              width: NODE,
              height: NODE,
              boxShadow: "0 16px 36px -14px rgba(15,23,42,0.18)",
            }}
          >
            <Icon className="h-7 w-7" style={{ color: n.color }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FeatureCards() {
  const items = [
    { icon: Zap, label: "Real-time Updates", desc: "Instant sync from every connected account." },
    { icon: Sparkles, label: "Smart Automation", desc: "Agentic acts on routine work for you." },
    { icon: Brain, label: "AI Insights", desc: "Summaries and action items, tailored." },
    { icon: Lock, label: "Your Data. Your Control.", desc: "Encrypted, private, always yours." },
  ];
  return (
    <div className="grid grid-cols-2 gap-3.5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="group flex items-start gap-3 rounded-2xl border px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.25)]"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.6)",
              boxShadow: "0 8px 24px -16px rgba(15,23,42,0.18)",
            }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, rgba(108,77,255,0.12), rgba(143,124,255,0.18))" }}
            >
              <Icon className="h-5 w-5" style={{ color: "#6C4DFF" }} />
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-semibold text-[#0F172A]">{it.label}</p>
              <p className="mt-0.5 text-[11.5px] leading-snug text-[#64748B]">{it.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SecurityPanel() {
  return (
    <div
      className="mt-5 flex items-center gap-4 rounded-2xl border px-5 py-4.5"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "rgba(255,255,255,0.5)",
        boxShadow: "0 8px 28px -18px rgba(15,23,42,0.2)",
      }}
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #6C4DFF, #8F7CFF)",
          boxShadow: "0 14px 30px -12px rgba(108,77,255,0.55)",
        }}
      >
        <ShieldCheck className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-[13.5px] font-semibold text-[#0F172A]">Your data stays under your control.</p>
        <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#64748B]">
          Credentials are encrypted and securely managed. Agentic never acts without your authorization.
        </p>
      </div>
    </div>
  );
}

function RightPanel({
  children,
  heading,
  subtitle,
}: {
  children: ReactNode;
  heading: ReactNode;
  subtitle: string;
}) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10"
      style={{
        background:
          "radial-gradient(900px 600px at 100% 0%, rgba(143,124,255,0.10), transparent 60%), radial-gradient(700px 500px at 0% 100%, rgba(108,77,255,0.08), transparent 60%), #FAFBFC",
      }}
    >
      <div className="lg:hidden absolute left-6 top-6">
        <Logo />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[550px] rounded-[28px] border px-9 py-10 sm:px-12 sm:py-12"
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          borderColor: "rgba(255,255,255,0.7)",
          boxShadow:
            "0 40px 80px -30px rgba(15,23,42,0.22), 0 18px 40px -20px rgba(108,77,255,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <div className="text-center">
          <h2 className="text-[32px] font-semibold tracking-tight text-[#0F172A]">{heading}</h2>
          <p className="mt-2 text-[15px] text-[#64748B]">{subtitle}</p>
        </div>
        <div className="mt-8">{children}</div>
      </motion.div>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11.5px] text-[#94A3B8]">
        © Agentic. All rights reserved.
      </p>
    </div>
  );
}
