import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Instagram, Linkedin, Mail } from "lucide-react";
import { useIntegrations } from "@/lib/integrations";

export const Route = createFileRoute("/_gmail/gmail/integrations")({
  head: () => ({ meta: [{ title: "Integrations — Gmail Workspace" }] }),
  component: IntegrationsPage,
});

function IntegrationsPage() {
  const { state } = useIntegrations();
  const gmailConnected = state.gmail.connected;

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Integrations</h1>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">Manage the channels feeding your workspace.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-background text-red-500">
              <Mail className="h-5 w-5" />
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
              gmailConnected ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"
            }`}>
              {gmailConnected ? <CheckCircle2 className="h-3 w-3" /> : null}
              {gmailConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
          <h3 className="mt-4 text-base font-semibold">Gmail</h3>
          <p className="mt-1 text-xs text-muted-foreground">Last sync: 10 sec ago · 0 failures</p>
          <div className="mt-4 flex gap-2">
            {gmailConnected ? (
              <Link to="/gmail/overview" className="flex-1 inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground hover:opacity-95">
                Manage
              </Link>
            ) : (
              <Link to="/integrations/gmail/setup" className="flex-1 inline-flex h-9 items-center justify-center rounded-xl border border-primary/40 text-sm font-medium text-primary hover:bg-primary/10">
                Connect
              </Link>
            )}
          </div>
        </div>

        {[
          { name: "LinkedIn", Icon: Linkedin, color: "text-blue-600" },
          { name: "Instagram", Icon: Instagram, color: "text-pink-500" },
        ].map((p) => (
          <div key={p.name} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background ${p.color}`}>
                <p.Icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">Coming Soon</span>
            </div>
            <h3 className="mt-4 text-base font-semibold">{p.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">Unified messaging coming soon.</p>
            <button disabled className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-xl border border-border bg-muted/40 text-sm font-medium text-muted-foreground">
              Notify me
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}