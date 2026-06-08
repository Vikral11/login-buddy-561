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
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-[#0F172A]">{label}</span>
        {aside}
      </div>
      {children}
    </label>
  );
}

export const AuthInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function AuthInput(props, ref) {
    return (
      <input
        ref={ref}
        {...props}
        className={
          "block w-full rounded-xl border bg-white px-4 text-[14.5px] text-[#0F172A] placeholder:text-[#94A3B8] outline-none transition-all " +
          "h-[50px] border-[#E2E8F0] focus:border-[#6C4DFF] focus:ring-4 focus:ring-[rgba(108,77,255,0.15)]"
        }
      />
    );
  },
);

export function Divider() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-[#E2E8F0]" />
      <span className="text-[11px] font-medium tracking-[0.2em] text-[#94A3B8]">OR</span>
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
    <div className="flex items-center justify-between gap-2 border-t border-[#EEF2F7] pt-5">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5" style={{ color: "#6C4DFF" }} />
            <span className="text-[11px] font-medium text-[#64748B]">{it.label}</span>
          </div>
        );
      })}
    </div>
  );
}