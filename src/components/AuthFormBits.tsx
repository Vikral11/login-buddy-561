import * as React from "react";
import { ShieldCheck, UserCheck, Rocket } from "lucide-react";

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
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94A3B8]" />
      ) : null}
      <input
        ref={ref}
        {...props}
        className={
          "block h-[52px] w-full rounded-xl border bg-white/90 text-[14.5px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all " +
          (Icon ? "pl-11 pr-4 " : "px-4 ") +
          "border-[#E2E8F0] focus:border-[#6C4DFF] focus:ring-4 focus:ring-[rgba(108,77,255,0.15)] " +
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
    { icon: ShieldCheck, label: "Secure & Private" },
    { icon: UserCheck, label: "You're In Control" },
    { icon: Rocket, label: "Built For Productivity" },
  ];
  return (
    <div className="flex items-center justify-between gap-2 border-t border-[#EEF2F7] pt-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" style={{ color: "#6C4DFF" }} />
            <span className="text-[11px] font-medium text-[#475569]">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}