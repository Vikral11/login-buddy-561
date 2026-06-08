import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Check, Mail, Lock, User } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { AuthField, AuthInput, Divider } from "@/components/AuthFormBits";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create account — Agentic" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!form.name || !form.email || !form.password) return setErr("All fields are required.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");
    if (form.password.length < 8) return setErr("Password must be at least 8 characters.");
    if (!agree) return setErr("Please accept the Terms and Privacy Policy.");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: "User" });
      navigate({ to: "/home" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading="Create Your Agentic Account"
      subtitle="Start managing all your communication channels from one place."
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Full Name">
          <AuthInput icon={User} value={form.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
        </AuthField>
        <AuthField label="Email Address">
          <AuthInput icon={Mail} type="email" value={form.email} onChange={set("email")} placeholder="Enter your email address" autoComplete="email" />
        </AuthField>
        <div className="grid grid-cols-2 gap-3">
          <AuthField label="Password">
            <AuthInput icon={Lock} type="password" value={form.password} onChange={set("password")} placeholder="••••••••" autoComplete="new-password" />
          </AuthField>
          <AuthField label="Confirm Password">
            <AuthInput icon={Lock} type="password" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" autoComplete="new-password" />
          </AuthField>
        </div>

        <label className="flex items-start gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setAgree(!agree)}
            className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all"
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

        {err && <p className="text-[13px]" style={{ color: "#DC2626" }}>{err}</p>}

        <motion.button
          whileTap={{ scale: 0.985 }}
          disabled={loading}
          className="group flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl text-[15.5px] font-semibold text-white transition-all hover:shadow-xl disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #6C4DFF 0%, #8F7CFF 100%)",
            boxShadow: "0 18px 38px -12px rgba(108,77,255,0.6)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Create Account
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>

        <Divider />

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