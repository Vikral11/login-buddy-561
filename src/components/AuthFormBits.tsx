import * as React from "react";
import { ShieldCheck, Lock, Sparkles } from "lucide-react";

export function AuthField({
  label,
  aside,
  children,
}: {
  label: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[13px] font-semibold text-[#0F172A]">{label}</span>
        {aside}
      </div>
      {children}
    </label>
  );
}

export const AuthInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { icon?: React.ComponentType<{ className?: string }> }
>(function AuthInput({ icon: Icon, className, ...props }, ref) {
  return (
    <div className="relative">
      {Icon ? (
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#CBD5E1]" />
      ) : null}
      <input
        ref={ref}
        {...props}
        className={
          "block h-[52px] w-full rounded-xl border bg-white text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all " +
          (Icon ? "pl-11 pr-4 " : "px-4 ") +
          "border-[#E5E7EB] focus:border-[#6C4DFF] focus:ring-2 focus:ring-[rgba(108,77,255,0.15)] " +
          (className ?? "")
        }
      />
    </div>
  );
});

export function Divider() {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="text-[11px] font-semibold tracking-[0.22em] text-[#94A3B8]">OR</span>
      <div className="h-px flex-1 bg-[#E2E8F0]" />
    </div>
  );
}

export function TrustFooter({
  compact = false,
  layoutClassName,
}: {
  compact?: boolean;
  layoutClassName?: string;
}) {
  const items = [
    { icon: ShieldCheck, color: "#6C4DFF", bg: "rgba(108,77,255,0.10)", label: "Secure & Private", desc: "Your data is encrypted and protected." },
    { icon: Lock, color: "#16A34A", bg: "rgba(22,163,74,0.10)", label: "You're in Control", desc: "Connect, manage and disconnect anytime." },
    { icon: Sparkles, color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "Built for Productivity", desc: "Automate, organize and achieve more." },
  ];
  return (
    <div className={`grid ${layoutClassName ?? "grid-cols-1 sm:grid-cols-3"} gap-2 ${compact ? "sm:gap-2" : "sm:gap-3"}`}>
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div
            key={it.label}
            className={`flex h-full items-start gap-2.5 rounded-2xl border bg-white/80 ${compact ? "min-h-[88px] px-3 py-2.5" : "px-3.5 py-3.5"}`}
            style={{ borderColor: "#EEF0F5" }}
          >
            <div
              className={`mt-0.5 flex shrink-0 items-center justify-center rounded-lg ${compact ? "h-6.5 w-6.5" : "h-8 w-8"}`}
              style={{ background: it.bg }}
            >
              <Icon className={compact ? "h-3 w-3" : "h-4 w-4"} style={{ color: it.color }} />
            </div>
            <div className="min-w-0">
              <p className={`font-bold text-[#0F172A] ${compact ? "text-[11.5px]" : "text-[12px]"}`}>{it.label}</p>
              <p className={`mt-0.5 leading-snug text-[#64748B] ${compact ? "text-[10px]" : "text-[11px]"}`}>{it.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}