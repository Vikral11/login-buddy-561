import { motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { Mail, Linkedin, Instagram, Sparkles, Zap, ShieldCheck, Bot, BarChart3, Lock } from "lucide-react";
import { TrustFooter } from "@/components/AuthFormBits";

/**
 * Agentic Auth split-screen layout — light theme only.
 * Forces light theme while mounted so the page does not invert in dark mode.
 */
export function AuthLayout({
  children,
  heading,
  subtitle,
  panelWidthClass = "max-w-[640px]",
  cardPaddingClass = "px-6 py-7 sm:px-10 sm:py-8",
  footerSpacingClass = "mt-6",
  compactTrustFooter = false,
  trustFooterLayoutClass = "grid-cols-1 sm:grid-cols-3",
}: {
  children: ReactNode;
  heading: ReactNode;
  subtitle: string;
  panelWidthClass?: string;
  cardPaddingClass?: string;
  footerSpacingClass?: string;
  compactTrustFooter?: boolean;
  trustFooterLayoutClass?: string;
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
      className="min-h-screen w-full text-[#0F172A] lg:h-screen lg:overflow-hidden"
      style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="grid min-h-screen lg:h-full lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-[55%_45%]">
        <LeftPanel />
        <RightPanel
          heading={heading}
          subtitle={subtitle}
          panelWidthClass={panelWidthClass}
          cardPaddingClass={cardPaddingClass}
          footerSpacingClass={footerSpacingClass}
          compactTrustFooter={compactTrustFooter}
          trustFooterLayoutClass={trustFooterLayoutClass}
        >
          {children}
        </RightPanel>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 items-center justify-center">
        <div
          className="absolute inset-0 rounded-[11px]"
          style={{
            background: "linear-gradient(135deg, #6C4DFF 0%, #8F7CFF 100%)",
            boxShadow: "0 10px 24px -10px rgba(108,77,255,0.55)",
          }}
        />
        <Sparkles className="relative h-5 w-5 text-white" strokeWidth={2.4} />
      </div>
      <span className="text-[20px] font-extrabold tracking-[0.18em] text-[#0F172A]">AGENTIC</span>
    </div>
  );
}

function LeftPanel() {
  return (
    <div
      className="relative flex flex-col overflow-hidden px-5 py-8 md:px-8 md:py-6 lg:h-screen lg:px-10 xl:px-14"
      style={{ background: "#F7F5FF" }}
    >
      <Logo />

      <div className="mt-5">
        <h1 className="text-[38px] xl:text-[44px] font-bold leading-[1.08] tracking-[-0.02em] text-[#0F172A]">
          All Your Accounts.
          <br />
          One Platform.
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #6C4DFF 0%, #8F7CFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Smarter Actions.
          </span>
        </h1>
        <p className="mt-3 max-w-[360px] text-[14px] leading-[1.55] text-[#64748B]">
          Connect your accounts and let Agentic monitor, organize, and act on what matters most.
        </p>
      </div>

      <div className="my-2 flex flex-1 items-center justify-center overflow-hidden">
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
  const radius = 115;
  const size = 290;
  const cx = size / 2;
  const cy = size / 2;
  const NODE = 52;
  const CENTER = 70;

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
        <circle cx={cx} cy={cy} r={radius + 22} fill="none" stroke="rgba(108,77,255,0.08)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="url(#orbit-grad)" strokeWidth="1.4" strokeDasharray="4 7" />
        <circle cx={cx} cy={cy} r={radius - 32} fill="none" stroke="rgba(108,77,255,0.1)" strokeWidth="1" />
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
        className="absolute flex items-center justify-center rounded-2xl"
        style={{
          left: cx - CENTER / 2,
          top: cy - CENTER / 2,
          width: CENTER,
          height: CENTER,
          background: "linear-gradient(135deg, #6C4DFF, #8F7CFF)",
          boxShadow: "0 20px 44px -16px rgba(108,77,255,0.55), 0 0 0 6px rgba(108,77,255,0.08)",
        }}
      >
        <Sparkles className="h-7 w-7 text-white" strokeWidth={2.2} />
      </motion.div>

      {/* AI assistant under center */}
      <div
        className="absolute flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 backdrop-blur"
        style={{
          left: cx - 18,
          top: cy + CENTER / 2 + 8,
          boxShadow: "0 8px 22px -10px rgba(15,23,42,0.2)",
        }}
      >
        <Bot className="h-4 w-4" style={{ color: "#6C4DFF" }} />
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
              boxShadow: "0 12px 28px -12px rgba(15,23,42,0.18)",
            }}
          >
            <Icon className="h-6 w-6" style={{ color: n.color }} />
          </motion.div>
        );
      })}
    </div>
  );
}

function FeatureCards() {
  const items = [
    { icon: Zap, color: "#6C4DFF", bg: "rgba(108,77,255,0.10)", label: "Real-time Updates", desc: "Get instant updates from all your connected accounts." },
    { icon: ShieldCheck, color: "#16A34A", bg: "rgba(22,163,74,0.10)", label: "Smart Automation", desc: "Agentic acts on your behalf and saves you valuable time." },
    { icon: Sparkles, color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "AI-Powered Insights", desc: "Smart summaries and action items tailored for you." },
    { icon: BarChart3, color: "#0EA5E9", bg: "rgba(14,165,233,0.12)", label: "100% Your Control", desc: "Your data is secure, private and always under your control." },
  ];
  return (
    <div className="grid grid-cols-4 gap-3">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className="flex flex-col gap-2 rounded-xl border bg-white px-3 py-3"
            style={{ borderColor: "#ECE9F7" }}
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: it.bg }}
            >
              <Icon className="h-4 w-4" style={{ color: it.color }} />
            </div>
            <div>
              <p className="text-[12.5px] font-bold leading-tight text-[#0F172A]">{it.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-[#64748B]">{it.desc}</p>
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
      className="mt-4 flex items-center gap-4 rounded-2xl border px-5 py-4"
      style={{
        background: "linear-gradient(180deg, #EDE7FF 0%, #F1ECFF 100%)",
        borderColor: "rgba(108,77,255,0.18)",
      }}
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
        style={{
          background: "linear-gradient(135deg, #8F7CFF, #6C4DFF)",
          boxShadow: "0 14px 28px -12px rgba(108,77,255,0.55)",
        }}
      >
        <Lock className="h-6 w-6 text-white" strokeWidth={2.4} />
      </div>
      <div>
        <p className="text-[14px] font-bold text-[#0F172A]">Your data. Your rules.</p>
        <p className="mt-1 text-[12px] leading-snug text-[#64748B]">
          We prioritize your privacy and security. You're always in control of your data and connections.
        </p>
      </div>
    </div>
  );
}

function RightPanel({
  children,
  heading,
  subtitle,
  panelWidthClass,
  cardPaddingClass,
  footerSpacingClass,
  compactTrustFooter,
  trustFooterLayoutClass,
}: {
  children: ReactNode;
  heading: ReactNode;
  subtitle: string;
  panelWidthClass: string;
  cardPaddingClass: string;
  footerSpacingClass: string;
  compactTrustFooter: boolean;
  trustFooterLayoutClass: string;
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-white px-5 py-8 sm:px-8 lg:h-screen lg:overflow-hidden lg:py-6"
    >
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`w-full ${panelWidthClass} rounded-[24px] border bg-white ${cardPaddingClass}`}
          style={{
            borderColor: "#EEF0F5",
            boxShadow: "0 24px 60px -28px rgba(15,23,42,0.14), 0 6px 18px -10px rgba(15,23,42,0.06)",
          }}
        >
          <div className="text-center">
            <h2 className="text-[28px] font-bold tracking-tight text-[#0F172A]">{heading}</h2>
            <p className="mt-2 text-[14px] text-[#64748B]">{subtitle}</p>
          </div>
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>

      <div className={`mx-auto w-full ${panelWidthClass} ${footerSpacingClass}`}>
        <TrustFooter compact={compactTrustFooter} layoutClassName={trustFooterLayoutClass} />
        <p className="mt-4 text-center text-[12px] text-[#94A3B8]">
          © 2024 Agentic. All rights reserved.
        </p>
      </div>
    </div>
  );
}
