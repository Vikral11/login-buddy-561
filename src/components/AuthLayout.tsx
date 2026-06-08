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
      <div className="grid min-h-screen lg:grid-cols-[55fr_45fr]">
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
      className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:px-14 lg:py-10"
      style={{
        background:
          "radial-gradient(1200px 600px at 0% 0%, rgba(143,124,255,0.18), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(108,77,255,0.12), transparent 60%), linear-gradient(180deg, #F7F5FF 0%, #FAFBFC 100%)",
      }}
    >
      <Logo />

      <div className="mt-6 max-w-xl">
        <h1 className="text-[44px] font-semibold leading-[1.05] tracking-tight text-[#0F172A]">
          All Your Accounts.
          <br />
          One Platform.
          <br />
          <span style={{ color: "#6C4DFF" }}>Smarter Actions.</span>
        </h1>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#64748B]">
          Connect your Gmail, LinkedIn and Instagram accounts into one intelligent workspace.
          Monitor updates, opportunities and conversations automatically.
        </p>
      </div>

      <div className="my-8 flex flex-1 items-center justify-center">
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
  const radius = 130;
  const size = 340;
  const cx = size / 2;
  const cy = size / 2;

  return (
    <div className="relative" style={{ width: size, height: size + 60 }}>
      <svg width={size} height={size} className="absolute left-0 top-0">
        <defs>
          <radialGradient id="orbit-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6C4DFF" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#6C4DFF" stopOpacity="0.25" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="url(#orbit-grad)" strokeWidth="1.2" strokeDasharray="3 6" />
        <circle cx={cx} cy={cy} r={radius - 32} fill="none" stroke="rgba(108,77,255,0.1)" strokeWidth="1" />
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = cx + radius * Math.cos(rad);
          const y = cy + radius * Math.sin(rad);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(108,77,255,0.22)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          );
        })}
      </svg>

      {/* Center Agentic mark */}
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute flex h-16 w-16 items-center justify-center rounded-2xl"
        style={{
          left: cx - 32,
          top: cy - 32,
          background: "linear-gradient(135deg, #6C4DFF, #8F7CFF)",
          boxShadow: "0 18px 40px -14px rgba(108,77,255,0.55)",
        }}
      >
        <Sparkles className="h-7 w-7 text-white" strokeWidth={2.2} />
      </motion.div>

      {/* AI assistant under center */}
      <div
        className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/80 backdrop-blur"
        style={{
          left: cx - 18,
          top: cy + 48,
          boxShadow: "0 8px 24px -10px rgba(15,23,42,0.18)",
        }}
      >
        <Bot className="h-4 w-4" style={{ color: "#6C4DFF" }} />
      </div>

      {/* Orbiting nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = cx + radius * Math.cos(rad) - 26;
        const y = cy + radius * Math.sin(rad) - 26;
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
            className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-white/60 bg-white/85 backdrop-blur"
            style={{
              left: x,
              top: y,
              boxShadow: "0 12px 30px -12px rgba(15,23,42,0.15)",
            }}
          >
            <Icon className="h-5 w-5" style={{ color: n.color }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FeatureCards() {
  const items = [
    { icon: Zap, label: "Real-time Updates" },
    { icon: Sparkles, label: "Smart Automation" },
    { icon: Brain, label: "AI Insights" },
    { icon: Lock, label: "Your Data. Your Control." },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              borderColor: "rgba(255,255,255,0.6)",
              boxShadow: "0 8px 24px -16px rgba(15,23,42,0.18)",
            }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "linear-gradient(135deg, rgba(108,77,255,0.12), rgba(143,124,255,0.18))" }}
            >
              <Icon className="h-4 w-4" style={{ color: "#6C4DFF" }} />
            </div>
            <span className="text-[13px] font-medium text-[#0F172A]">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SecurityPanel() {
  return (
    <div
      className="mt-5 flex items-start gap-3 rounded-2xl border px-4 py-3.5"
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderColor: "rgba(255,255,255,0.5)",
        boxShadow: "0 8px 28px -18px rgba(15,23,42,0.2)",
      }}
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
        style={{ background: "linear-gradient(135deg, rgba(108,77,255,0.14), rgba(143,124,255,0.22))" }}
      >
        <ShieldCheck className="h-4 w-4" style={{ color: "#6C4DFF" }} />
      </div>
      <p className="text-[12.5px] leading-relaxed text-[#475569]">
        <span className="font-semibold text-[#0F172A]">Your data stays under your control.</span>{" "}
        Credentials are encrypted and securely managed. Agentic never acts without your authorization.
      </p>
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
    <div className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-10" style={{ background: "#FAFBFC" }}>
      <div className="lg:hidden absolute left-6 top-6">
        <Logo />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[440px] rounded-[24px] border px-8 py-9 sm:px-10"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderColor: "rgba(255,255,255,0.6)",
          boxShadow:
            "0 30px 60px -30px rgba(15,23,42,0.18), 0 12px 32px -16px rgba(108,77,255,0.18)",
        }}
      >
        <h2 className="text-[26px] font-semibold tracking-tight text-[#0F172A]">{heading}</h2>
        <p className="mt-1.5 text-[14px] text-[#64748B]">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </motion.div>

      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[11px] text-[#94A3B8]">
        © Agentic. All rights reserved.
      </p>
    </div>
  );
}
