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

export function TrustFooter() {
  const items = [
    { icon: ShieldCheck, color: "#6C4DFF", bg: "rgba(108,77,255,0.10)", label: "Secure & Private", desc: "Your data is encrypted and protected." },
    { icon: Lock, color: "#16A34A", bg: "rgba(22,163,74,0.10)", label: "You're in Control", desc: "Connect, manage and disconnect anytime." },
    { icon: Sparkles, color: "#F59E0B", bg: "rgba(245,158,11,0.12)", label: "Built for Productivity", desc: "Automate, organize and achieve more." },
  ];
  return (
    <div className="grid grid-cols-3 gap-5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="flex items-start gap-2.5">
            <div
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
              style={{ background: it.bg }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: it.color }} />
            </div>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-[#0F172A]">{it.label}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-[#64748B]">{it.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}