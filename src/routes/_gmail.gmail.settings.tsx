import { createFileRoute } from "@tanstack/react-router";
import { Bell, KeyRound, Plug, Settings as SettingsIcon, Shield, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_gmail/gmail/settings")({
  head: () => ({ meta: [{ title: "Settings — Gmail Workspace" }] }),
  component: SettingsPage,
});

type Section = "Profile" | "Notifications" | "Security" | "Connected Accounts" | "Preferences";
const SECTIONS: { id: Section; Icon: typeof User }[] = [
  { id: "Profile", Icon: User },
  { id: "Notifications", Icon: Bell },
  { id: "Security", Icon: Shield },
  { id: "Connected Accounts", Icon: Plug },
  { id: "Preferences", Icon: SettingsIcon },
];

function SettingsPage() {
  const { user } = useAuth();
  const [section, setSection] = useState<Section>("Profile");

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Configure your workspace, notifications, and security.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="rounded-2xl border border-border bg-card/70 p-2 backdrop-blur-xl shadow-[var(--shadow-card)]">
          {SECTIONS.map((s) => {
            const active = section === s.id;
            return (
              <button key={s.id} onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "bg-primary/10 text-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}>
                <s.Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                {s.id}
              </button>
            );
          })}
        </nav>

        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
          {section === "Profile" && (
            <div>
              <h2 className="text-base font-semibold">Profile</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" value={user?.name ?? ""} />
                <Field label="Email" value={user?.email ?? ""} />
                <Field label="Role" value={user?.role ?? "Member"} />
                <Field label="Workspace ID" value="ws_8f3a1c" />
              </div>
            </div>
          )}
          {section === "Notifications" && (
            <div>
              <h2 className="text-base font-semibold">Notifications</h2>
              <ul className="mt-4 divide-y divide-border">
                {[
                  { name: "High priority email alerts", on: true },
                  { name: "Action item reminders", on: true },
                  { name: "Daily summary digest", on: false },
                  { name: "Weekly insights report", on: true },
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
            </div>
          )}
          {section === "Security" && (
            <div>
              <h2 className="text-base font-semibold">Security</h2>
              <div className="mt-4 space-y-3">
                <Row Icon={KeyRound} title="Two-factor authentication" sub="Authenticator app · Enabled" action="Manage" />
                <Row Icon={Shield} title="Active sessions" sub="2 devices · Last activity 1m ago" action="Review" />
                <Row Icon={KeyRound} title="API tokens" sub="1 active token" action="Rotate" />
              </div>
            </div>
          )}
          {section === "Connected Accounts" && (
            <div>
              <h2 className="text-base font-semibold">Connected Accounts</h2>
              <div className="mt-4 space-y-3">
                <Row Icon={Plug} title="Gmail" sub="Connected · last sync 10 sec ago" action="Manage" />
                <Row Icon={Plug} title="LinkedIn" sub="Coming soon" action="—" disabled />
                <Row Icon={Plug} title="Instagram" sub="Coming soon" action="—" disabled />
              </div>
            </div>
          )}
          {section === "Preferences" && (
            <div>
              <h2 className="text-base font-semibold">Preferences</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Default landing page" value="Overview" />
                <Field label="Time zone" value="Asia/Kolkata" />
                <Field label="Date format" value="DD MMM, YYYY" />
                <Field label="AI summary length" value="Concise" />
              </div>
            </div>
          )}
        </section>
      </div>
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

function Row({ Icon, title, sub, action, disabled }: { Icon: typeof User; title: string; sub: string; action: string; disabled?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background/40 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{sub}</p>
      </div>
      <button disabled={disabled}
        className={`rounded-lg border border-border px-3 py-1.5 text-xs font-medium ${disabled ? "text-muted-foreground" : "hover:bg-accent"}`}>
        {action}
      </button>
    </div>
  );
}