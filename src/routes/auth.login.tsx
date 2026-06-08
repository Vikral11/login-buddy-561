import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";
import { AuthField, AuthInput, TrustFooter, Divider } from "@/components/AuthFormBits";

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
      heading={<>Welcome Back <span aria-hidden>👋</span></>}
      subtitle="Sign in to your Agentic workspace."
    >
      <form onSubmit={submit} className="space-y-5">
        <AuthField label="Email Address">
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
            <Link to="/auth/login" className="text-[12px] font-medium" style={{ color: "#6C4DFF" }}>
              Forgot Password?
            </Link>
          }
        >
          <AuthInput
            icon={Lock}
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </AuthField>

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
          Login to Agentic
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.button>

        <Divider />

        <p className="text-center text-[13.5px] text-[#64748B]">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-semibold" style={{ color: "#6C4DFF" }}>
            Register for Agentic
          </Link>
        </p>

        <TrustFooter />
      </form>
    </AuthLayout>
  );
}