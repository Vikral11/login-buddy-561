import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({ meta: [{ title: "Settings — CurdAI" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Workspace Preferences</h1>
      </header>

      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-medium">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Full name" value={user?.name ?? ""} />
          <Field label="Email" value={user?.email ?? ""} />
          <Field label="Role" value={user?.role ?? ""} />
          <Field label="Workspace ID" value="ws_8f3a1c" />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
        <h2 className="text-sm font-medium">Notifications</h2>
        <ul className="mt-4 divide-y divide-border">
          {[
            { name: "High priority alerts", on: true },
            { name: "New opportunity detected", on: true },
            { name: "Daily digest", on: false },
            { name: "Security alerts", on: true },
          ].map((n) => (
            <li key={n.name} className="flex items-center justify-between py-3">
              <span className="text-sm">{n.name}</span>
              <span className={`flex h-6 w-11 items-center rounded-full px-0.5 ${n.on ? "bg-primary" : "bg-muted"}`}>
                <span className={`h-5 w-5 rounded-full bg-card shadow transition-transform ${n.on ? "translate-x-5" : ""}`} />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 rounded-lg border border-border bg-input/40 px-3 py-2 text-sm">{value}</p>
    </div>
  );
}