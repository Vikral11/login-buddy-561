import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertTriangle, FileText, Inbox, KeyRound, Mail, RefreshCw, Shield, Webhook, Zap } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/gmail/manage")({
  head: () => ({ meta: [{ title: "Manage Gmail — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "gmail",
        name: "Gmail",
        Icon: Mail,
        accent: "text-red-500",
        headerTitle: "Manage Gmail",
        headerSubtitle: "Monitor, configure, and manage your Gmail integration.",
        statusTitle: "Gmail Integration Active",
        insightsTitle: "Gmail Insights",
        chartTitle: "Gmail Sync Activity",
        chartLabel: "Emails synced this week",
        chartPoints: [12, 18, 9, 24, 31, 22, 28],
        metrics: [
          { Icon: Inbox, label: "Emails Imported", value: 201, sub: "Total synced", delta: "12%", color: "text-primary bg-primary/10" },
          { Icon: Zap, label: "New Emails Today", value: 12, sub: "Since last sync", delta: "8%", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: Mail, label: "Unread Emails", value: 7, sub: "Needs attention", color: "text-amber-500 bg-amber-500/10" },
          { Icon: AlertTriangle, label: "Sync Failures", value: 0, sub: "Last 24h", color: "text-sky-500 bg-sky-500/10" },
        ],
        activity: [
          { Icon: Mail, color: "text-red-500 bg-red-500/10", title: "New email imported", note: "From Amazon Recruiter", time: "2 sec ago", dot: "bg-emerald-500" },
          { Icon: Webhook, color: "text-primary bg-primary/10", title: "Webhook received", note: "INBOX label updated", time: "30 sec ago", dot: "bg-sky-500" },
          { Icon: RefreshCw, color: "text-emerald-500 bg-emerald-500/10", title: "Incremental sync completed", note: "12 new emails imported", time: "1 min ago", dot: "bg-emerald-500" },
          { Icon: Activity, color: "text-amber-500 bg-amber-500/10", title: "History ID updated", note: "Cursor advanced", time: "3 min ago", dot: "bg-amber-500" },
          { Icon: Shield, color: "text-sky-500 bg-sky-500/10", title: "Watch renewed", note: "Pub/Sub subscription extended", time: "10 min ago", dot: "bg-sky-500" },
        ],
        quickActions: [
          { Icon: RefreshCw, label: "Run Manual Sync", color: "text-primary bg-primary/10" },
          { Icon: Webhook, label: "Refresh Watch", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: FileText, label: "View Logs", color: "text-amber-500 bg-amber-500/10" },
          { Icon: KeyRound, label: "Update Credentials", color: "text-sky-500 bg-sky-500/10", to: "/integrations/gmail/setup" },
        ],
        insights: [
          { Icon: Zap, color: "text-primary bg-primary/10", text: "12 new emails imported today" },
          { Icon: Mail, color: "text-amber-500 bg-amber-500/10", text: "3 important emails detected" },
          { Icon: Shield, color: "text-emerald-500 bg-emerald-500/10", text: "Watch API healthy" },
          { Icon: Activity, color: "text-sky-500 bg-sky-500/10", text: "No sync failures detected" },
        ],
      }}
    />
  ),
});
