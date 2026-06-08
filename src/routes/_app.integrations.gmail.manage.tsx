import { createFileRoute } from "@tanstack/react-router";
import { Mail, Inbox, Zap, Clock, Activity } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/gmail/manage")({
  head: () => ({ meta: [{ title: "Manage Gmail — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "gmail",
        name: "Gmail",
        Icon: Mail,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        metrics: [
          { label: "Total Emails", value: 201, Icon: Inbox, color: "bg-primary/10 text-primary" },
          { label: "New Today", value: 12, Icon: Zap, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Last Sync", value: "10s ago", Icon: Clock, color: "bg-sky-500/10 text-sky-600" },
          { label: "Sync Health", value: "Healthy", Icon: Activity, color: "bg-amber-500/10 text-amber-600" },
        ],
        activity: [
          { title: "Gmail sync completed", note: "3 new emails imported", time: "2 sec ago" },
          { title: "Watch subscription active", note: "Pub/Sub receiving events", time: "1 min ago" },
          { title: "Webhook received", note: "INBOX label updated", time: "5 min ago" },
        ],
      }}
    />
  ),
});