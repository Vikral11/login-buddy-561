import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { OrbitalVisual } from "@/components/OrbitalVisual";
import { gmailService } from "@/services/gmailService";

export const Route = createFileRoute("/_app/gmail")({
  head: () => ({ meta: [{ title: "Gmail Integration — CurdAI" }] }),
  component: GmailPage,
});

function GmailPage() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["gmail-status"], queryFn: () => gmailService.getStatus() });
  const connect = useMutation({ mutationFn: () => gmailService.connect(), onSuccess: () => qc.invalidateQueries({ queryKey: ["gmail-status"] }) });
  const sync = useMutation({ mutationFn: () => gmailService.sync(), onSuccess: () => qc.invalidateQueries({ queryKey: ["gmail-status"] }) });
  const disconnect = useMutation({ mutationFn: () => gmailService.disconnect(), onSuccess: () => qc.invalidateQueries({ queryKey: ["gmail-status"] }) });

  const connected = !!data?.connected;

  return (
    <div className="space-y-10">
      <header className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary">Gmail Integration</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">Your inbox, intelligently alive.</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Secure, private, and continuously analyzing. The CurdAI engine orbits your Gmail workspace in real time.
        </p>
      </header>

      <div className="flex items-center justify-center">
        <OrbitalVisual size={520} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative mx-auto max-w-2xl overflow-hidden p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        {isLoading ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : connected ? (
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  LIVE — Workspace Connected
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{data?.email}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Last sync: {data?.lastSync ? new Date(data.lastSync).toLocaleString() : "just now"}
                </p>
              </div>
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => sync.mutate()}
                disabled={sync.isPending}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-sm font-medium text-primary-foreground hover:opacity-95"
              >
                {sync.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                Sync Inbox
              </button>
              <button
                onClick={() => disconnect.mutate()}
                className="h-11 rounded-xl border border-border bg-card px-5 text-sm text-muted-foreground hover:text-foreground"
              >
                Disconnect
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-semibold tracking-tight">Connect Your Gmail Workspace</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              Secure. Private. Only you have access. CurdAI never stores credentials and works through OAuth.
            </p>
            <ul className="mx-auto my-6 max-w-sm space-y-2 text-left text-sm text-muted-foreground">
              {["Securely connect to your Gmail", "Read and analyze your emails", "Provide AI insights & intelligence", "You're in control. Always."].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> {t}
                </li>
              ))}
            </ul>
            <button
              onClick={() => connect.mutate()}
              disabled={connect.isPending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-8 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] hover:opacity-95"
            >
              {connect.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Connect Gmail
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}