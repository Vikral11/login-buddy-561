import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  Pencil,
  RefreshCw,
  Trash2,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { useIntegrations, type Provider } from "@/lib/integrations";

export type ManageConfig = {
  provider: Provider;
  name: "Gmail" | "LinkedIn" | "Instagram";
  Icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  metrics: { label: string; value: string | number; Icon: ComponentType<{ className?: string }>; color: string }[];
  activity: { title: string; note: string; time: string }[];
};

function mask(v: string) {
  if (!v) return "—";
  return "•".repeat(Math.min(Math.max(v.length, 8), 18));
}

export function IntegrationManagePage({ config }: { config: ManageConfig }) {
  const navigate = useNavigate();
  const integrations = useIntegrations();
  const record = integrations.get(config.provider);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [confirm, setConfirm] = useState(false);

  const lastSync = useMemo(
    () => (record.connectedAt ? new Date(record.connectedAt).toLocaleString() : "Just now"),
    [record.connectedAt],
  );

  // If not connected, send user back to setup wizard
  if (!record.connected) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold">{config.name} is not connected</h1>
        <p className="mt-2 text-sm text-muted-foreground">Set up {config.name} to access the management page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/home" className={secondaryBtn}>Back to Dashboard</Link>
          <Link to={`/integrations/${config.provider}/setup` as never} className={primaryBtn}>
            Connect {config.name}
          </Link>
        </div>
      </div>
    );
  }

  const creds: { name: string; key: keyof typeof record.creds }[] = [
    { name: "GOOGLE_CLIENT_ID", key: "google_client_id" },
    { name: "GOOGLE_CLIENT_SECRET", key: "google_client_secret" },
    { name: "PROJECT_ID", key: "project_id" },
    { name: "SUBSCRIPTION_ID", key: "subscription_id" },
  ];

  const handleDisconnect = () => {
    integrations.disconnect(config.provider);
    setConfirm(false);
    navigate({ to: "/home" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        to="/home"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-4">
          <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", config.iconBg)}>
            <config.Icon className={cn("h-7 w-7", config.iconColor)} />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Manage {config.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Monitor sync, review credentials, and control your {config.name} integration.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card/70 p-4 shadow-[var(--shadow-card)] min-w-[260px]">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Connection Status</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Connected
            </span>
            <span className="text-xs text-muted-foreground">Healthy</span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Last sync: {lastSync}</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {config.metrics.map((m, i) => {
          const { Icon } = m;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card/70 p-5 shadow-[var(--shadow-card)]"
            >
              <div className={cn("mb-3 flex h-9 w-9 items-center justify-center rounded-xl", m.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-semibold">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Settings */}
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold tracking-tight flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Credentials
            </h2>
            <Link to={`/integrations/${config.provider}/setup` as never} className={secondaryBtn}>
              <Pencil className="h-4 w-4" /> Update Credentials
            </Link>
          </div>
          <ul className="space-y-3">
            {creds.map((c) => {
              const value = (record.creds[c.key] ?? "") as string;
              const shown = reveal[c.name];
              return (
                <li
                  key={c.name}
                  className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-muted-foreground">{c.name}</p>
                    <p className="truncate font-mono text-sm">{shown ? value || "—" : mask(value)}</p>
                  </div>
                  <button
                    onClick={() => setReveal((r) => ({ ...r, [c.name]: !r[c.name] }))}
                    className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label={shown ? "Hide value" : "Reveal value"}
                  >
                    {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Sync controls */}
          <div className="mt-6 border-t border-border pt-6">
            <h3 className="mb-3 text-sm font-semibold">Sync Controls</h3>
            <div className="flex flex-wrap gap-2">
              <button className={primaryBtn}>
                <RefreshCw className="h-4 w-4" /> Run Manual Sync
              </button>
              <button className={secondaryBtn}>
                <Activity className="h-4 w-4" /> Refresh Status
              </button>
              <button className={secondaryBtn}>
                <FileText className="h-4 w-4" /> View Logs
              </button>
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-[var(--shadow-card)]">
          <h2 className="mb-4 text-base font-semibold tracking-tight flex items-center gap-2">
            <Zap className="h-4 w-4" /> Recent Activity
          </h2>
          <ul className="space-y-4">
            {config.activity.map((a, i) => (
              <li key={i} className="flex gap-3">
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.note}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 rounded-2xl border-2 border-red-300/60 bg-red-50/40 p-6 dark:border-red-900/50 dark:bg-red-950/20">
        <h2 className="text-base font-semibold text-red-900 dark:text-red-100">Danger Zone</h2>
        <p className="mt-1 text-sm text-red-800/80 dark:text-red-200/80">
          Disconnecting will stop all sync events and remove stored credentials.
        </p>
        <button
          onClick={() => setConfirm(true)}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
        >
          <Trash2 className="h-4 w-4" /> Disconnect {config.name}
        </button>
      </div>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold">Are you sure you want to disconnect {config.name}?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You will stop receiving updates and sync events from {config.name}.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirm(false)} className={secondaryBtn}>Cancel</button>
              <button
                onClick={handleDisconnect}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" /> Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const primaryBtn =
  "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90";
const secondaryBtn =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted";