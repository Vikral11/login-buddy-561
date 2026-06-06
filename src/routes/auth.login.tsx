import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "Sign in — CurdAI" }] }),
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
    <AuthLayout heading="Welcome Back" sub="Access your intelligent workspace">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email address">
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input"
          />
        </Field>
        <Field label="Password">
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="input"
          />
        </Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </motion.button>
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary hover:underline">
            Create Account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}