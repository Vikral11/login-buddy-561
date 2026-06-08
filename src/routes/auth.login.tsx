import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { AuthField, AuthInput, Divider } from "@/components/AuthFormBits";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — Agentic" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!email || !password) return setErr("Enter your email and password.");
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/home" });
    } catch (e: any) {
      setErr(e?.message ?? "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      heading={<>Welcome back! <span aria-hidden>👋</span></>}
      subtitle="Login to your Agentic account"
    >
      <form onSubmit={submit} className="space-y-4">
        <AuthField label="Email address">
          <AuthInput
            icon={Mail}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
          />
        </AuthField>
        <AuthField
          label="Password"
          aside={
            <Link to="/auth/login" className="text-[12.5px] font-semibold" style={{ color: "#6C4DFF" }}>
              Forgot password?
            </Link>
          }
        >
          <div className="relative">
            <AuthInput
              icon={Lock}
              type={showPw ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#94A3B8] hover:text-[#475569]"
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
            </button>
          </div>
        </AuthField>

        {err && <p className="text-[13px]" style={{ color: "#DC2626" }}>{err}</p>}

        <motion.button
          whileTap={{ scale: 0.985 }}
          disabled={loading}
          className="group mt-2 flex h-[56px] w-full items-center justify-center gap-2 rounded-2xl text-[15px] font-semibold text-white transition-all hover:shadow-xl disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #6C4DFF 0%, #8F7CFF 100%)",
            boxShadow: "0 18px 38px -12px rgba(108,77,255,0.6)",
          }}
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Login to Agentic
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>

        <Divider />

        <p className="text-center text-[13.5px] text-[#64748B]">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-bold" style={{ color: "#6C4DFF" }}>
            Register for Agentic
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}