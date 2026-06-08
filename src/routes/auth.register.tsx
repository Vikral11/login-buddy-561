import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Check, Mail, Lock, User, Briefcase, ChevronDown } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { AuthField, AuthInput, Divider } from "@/components/AuthFormBits";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create account — Agentic" }] }),
  component: RegisterPage,
});

const ROLES = ["Founder", "Executive", "Manager", "Sales", "Marketing", "Developer", "Designer", "Student", "Other"] as const;
type Role = (typeof ROLES)[number];

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<{ name: string; email: string; password: string; confirm: string; role: Role | "" }>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: "name" | "email" | "password" | "confirm") => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!form.name || !form.email || !form.password) return setErr("All fields are required.");
    if (!form.role) return setErr("Please select your role.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");
    if (form.password.length < 8) return setErr("Password must be at least 8 characters.");
    if (!agree) return setErr("Please accept the Terms and Privacy Policy.");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      navigate({ to: "/home" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Create Your Agentic Account"
      subtitle="Start managing all your communication channels from one place."
      panelWidthClass="max-w-[520px] lg:max-w-[540px]"
      cardPaddingClass="px-6 py-6 sm:px-8 sm:py-7"
      footerSpacingClass="mt-3"
      compactTrustFooter
      trustFooterLayoutClass="grid-cols-1"
    >
      <form onSubmit={submit} className="space-y-4" noValidate>
        <div className="space-y-3">
          <AuthField label="Full Name">
            <AuthInput
              icon={User}
              id="name"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
              placeholder="Your full name"
              aria-label="Full name"
              required
            />
          </AuthField>
          <AuthField label="Email Address">
            <AuthInput
              icon={Mail}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              placeholder="Enter your email address"
              aria-label="Email address"
              required
            />
          </AuthField>
        </div>

        <AuthField label="Role">
          <div className="relative">
            <Briefcase className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#CBD5E1]" />
            <select
              id="role"
              name="role"
              autoComplete="organization-title"
              aria-label="Role"
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
              className={
                "block h-[52px] w-full appearance-none rounded-xl border bg-white pl-11 pr-10 text-[14px] outline-none transition-all duration-200 border-[#E5E7EB] focus:border-[#6C4DFF] focus:ring-2 focus:ring-[rgba(108,77,255,0.15)] " +
                (form.role ? "text-[#0F172A]" : "text-[#94A3B8]")
              }
            >
              <option value="" disabled>Select your role</option>
              {ROLES.map((r) => (
                <option key={r} value={r} className="text-[#0F172A]">
                  {r}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#94A3B8]" />
          </div>
        </AuthField>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <AuthField label="Password">
            <AuthInput
              icon={Lock}
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••"
              aria-label="Password"
              required
              minLength={8}
            />
          </AuthField>
          <AuthField label="Confirm Password">
            <AuthInput
              icon={Lock}
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={set("confirm")}
              placeholder="••••••••"
              aria-label="Confirm password"
              required
              minLength={8}
            />
          </AuthField>
        </div>

        <label htmlFor="terms" className="flex items-start gap-2.5 pt-0.5">
          <button
            type="button"
            id="terms"
            role="checkbox"
            aria-checked={agree}
            onClick={() => setAgree(!agree)}
            className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,77,255,0.35)]"
            style={{
              background: agree ? "#6C4DFF" : "white",
              borderColor: agree ? "#6C4DFF" : "#CBD5E1",
            }}
            aria-pressed={agree}
          >
            {agree && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </button>
          <span className="text-[12.5px] leading-relaxed text-[#64748B]">
            I agree to the{" "}
            <span className="font-medium" style={{ color: "#6C4DFF" }}>Terms</span> and{" "}
            <span className="font-medium" style={{ color: "#6C4DFF" }}>Privacy Policy</span>
          </span>
        </label>

        {err && (
          <p role="alert" className="text-[13px]" style={{ color: "#DC2626" }}>
            {err}
          </p>
        )}

        <motion.button
          type="submit"
          whileTap={{ scale: 0.985 }}
          disabled={loading}
          aria-busy={loading}
          className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-2xl text-[15px] font-semibold text-white transition-all duration-200 hover:shadow-xl hover:brightness-[1.03] active:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(108,77,255,0.45)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #6C4DFF 0%, #8F7CFF 100%)",
            boxShadow: "0 18px 38px -12px rgba(108,77,255,0.6)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Creating account…" : "Create Account"}
          {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
        </motion.button>

        <div className="pt-0.5">
          <Divider />
        </div>

        <p className="text-center text-[13.5px] text-[#64748B]">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold" style={{ color: "#6C4DFF" }}>
            Login to Agentic
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}