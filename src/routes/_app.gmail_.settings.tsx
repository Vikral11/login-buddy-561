import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, KeyRound, Mail, Shield, Sliders, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useIntegrations } from "@/lib/integrations";

export const Route = createFileRoute("/_app/gmail_/settings")({
  head: () => ({ meta: [{ title: "Gmail Settings — Agentic" }] }),
  component: GmailSettingsPage,
});

function GmailSettingsPage() {
  const { user } = useAuth();
  const { state } = useIntegrations();
  const [notifs, setNotifs] = useState({ high: true, daily: true, weekly: false, marketing: false });
  const [prefs, setPrefs] = useState({ autoCategorize: true, autoSummarize: true, scamShield: true });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Manage your profile, notifications, security, and Gmail preferences.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Profile" Icon={User}>
          <Field label="Name" value={user?.name ?? "—"} />
          <Field label="Email" value={user?.email ?? "—"} />
        </Card>

        <Card title="Connected Gmail Account" Icon={Mail}>
          <Field label="Account" value={state.gmail.connected ? (user?.email ?? "—") : "Not connected"} />
          <Field label="Status" value={state.gmail.connected ? "Live sync active" : "Disconnected"} />
          <div className="flex gap-2 pt-2">
            <Link
              to={"/integrations/gmail/setup" as never}
              className="inline-flex h-9 items-center rounded-lg border border-border bg-background/60 px-3 text-xs hover:bg-accent"
            >
              <KeyRound className="mr-1.5 h-3.5 w-3.5" /> Update credentials
            </Link>
          </div>
        </Card>

        <Card title="Notifications" Icon={Bell}>
          <Toggle label="High-priority email alerts" enabled={notifs.high} onChange={(v) => setNotifs({ ...notifs, high: v })} />
          <Toggle label="Daily summary email" enabled={notifs.daily} onChange={(v) => setNotifs({ ...notifs, daily: v })} />
          <Toggle label="Weekly digest" enabled={notifs.weekly} onChange={(v) => setNotifs({ ...notifs, weekly: v })} />
          <Toggle label="Marketing email notifications" enabled={notifs.marketing} onChange={(v) => setNotifs({ ...notifs, marketing: v })} />
        </Card>

        <Card title="Security" Icon={Shield}>
          <Field label="Two-factor authentication" value="Enabled" />
          <Field label="Active sessions" value="2 devices" />
          <button className="inline-flex h-9 items-center rounded-lg border border-border bg-background/60 px-3 text-xs hover:bg-accent">
            Manage sessions
          </button>
        </Card>

        <Card title="Preferences" Icon={Sliders}>
          <Toggle label="Auto-categorize incoming emails" enabled={prefs.autoCategorize} onChange={(v) => setPrefs({ ...prefs, autoCategorize: v })} />
          <Toggle label="Auto-generate AI summaries" enabled={prefs.autoSummarize} onChange={(v) => setPrefs({ ...prefs, autoSummarize: v })} />
          <Toggle label="Scam / phishing shield" enabled={prefs.scamShield} onChange={(v) => setPrefs({ ...prefs, scamShield: v })} />
        </Card>
      </div>
    </div>
  );
}

function Card({ title, Icon, children }: { title: string; Icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-xl shadow-[var(--shadow-card)]">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold tracking-tight">
        <Icon className="h-4 w-4 text-primary" /> {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2.5">
      <p className="text-[12px] text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  );
}

function Toggle({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-3 py-2.5">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-5 w-9 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}
        aria-pressed={enabled}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-all ${enabled ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </label>
  );
}