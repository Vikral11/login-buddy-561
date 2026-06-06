import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "Create account — CurdAI" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "User" as "User" | "Admin", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!form.name || !form.email || !form.password) return setErr("All fields are required.");
    if (form.password !== form.confirm) return setErr("Passwords do not match.");
    if (form.password.length < 8) return setErr("Password must be at least 8 characters.");
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      navigate({ to: "/home" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout heading="Create Workspace" sub="Spin up your intelligent inbox in seconds">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name">
          <input className="input" value={form.name} onChange={set("name")} placeholder="Ada Lovelace" />
        </Field>
        <Field label="Email address">
          <input type="email" className="input" value={form.email} onChange={set("email")} placeholder="you@example.com" />
        </Field>
        <Field label="Role">
          <select className="input" value={form.role} onChange={set("role")}>
            <option>User</option>
            <option>Admin</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Password">
            <input type="password" className="input" value={form.password} onChange={set("password")} placeholder="••••••••" />
          </Field>
          <Field label="Confirm">
            <input type="password" className="input" value={form.confirm} onChange={set("confirm")} placeholder="••••••••" />
          </Field>
        </div>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <motion.button
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95 disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Workspace
        </motion.button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary hover:underline">Sign in</Link>
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