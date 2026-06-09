import { createFileRoute } from "@tanstack/react-router";
import { Activity, Briefcase, FileText, KeyRound, Linkedin, MessageSquare, RefreshCw, Shield, UserPlus, Users, Webhook, Zap } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/linkedin/manage")({
  head: () => ({ meta: [{ title: "Manage LinkedIn — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "linkedin",
        name: "LinkedIn",
        Icon: Linkedin,
        accent: "text-blue-600",
        headerTitle: "Manage LinkedIn",
        headerSubtitle: "Monitor messages, opportunities, and connection updates.",
        statusTitle: "LinkedIn Integration Active",
        insightsTitle: "LinkedIn Insights",
        chartTitle: "LinkedIn Sync Activity",
        chartLabel: "Events synced this week",
        chartPoints: [8, 14, 11, 20, 17, 25, 19],
        metrics: [
          { Icon: MessageSquare, label: "Messages Synced", value: 48, sub: "Total inbox", delta: "9%", color: "text-blue-600 bg-blue-600/10" },
          { Icon: Briefcase, label: "Job Alerts", value: 12, sub: "This week", delta: "4%", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: UserPlus, label: "Connections Added", value: 6, sub: "Last 7 days", color: "text-amber-500 bg-amber-500/10" },
          { Icon: Users, label: "Profile Updates", value: 3, sub: "From network", color: "text-sky-500 bg-sky-500/10" },
        ],
        activity: [
          { Icon: MessageSquare, color: "text-blue-600 bg-blue-600/10", title: "New message received", note: "From Riya Sharma", time: "10 sec ago", dot: "bg-emerald-500" },
          { Icon: Briefcase, color: "text-emerald-500 bg-emerald-500/10", title: "Job alert received", note: "5 Financial Engineering roles", time: "3 min ago", dot: "bg-sky-500" },
          { Icon: UserPlus, color: "text-amber-500 bg-amber-500/10", title: "Connection added", note: "Charvi added to network", time: "12 min ago", dot: "bg-amber-500" },
          { Icon: Webhook, color: "text-primary bg-primary/10", title: "Webhook received", note: "Profile activity sync", time: "20 min ago", dot: "bg-primary" },
          { Icon: RefreshCw, color: "text-sky-500 bg-sky-500/10", title: "Incremental sync completed", note: "8 events processed", time: "1 hr ago", dot: "bg-emerald-500" },
        ],
        quickActions: [
          { Icon: RefreshCw, label: "Run Manual Sync", color: "text-primary bg-primary/10" },
          { Icon: Webhook, label: "Refresh Webhook", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: FileText, label: "View Logs", color: "text-amber-500 bg-amber-500/10" },
          { Icon: KeyRound, label: "Update Credentials", color: "text-sky-500 bg-sky-500/10", to: "/integrations/linkedin/setup" },
        ],
        insights: [
          { Icon: Zap, color: "text-primary bg-primary/10", text: "5 new messages this morning" },
          { Icon: Briefcase, color: "text-amber-500 bg-amber-500/10", text: "12 fresh job alerts matched your filters" },
          { Icon: Shield, color: "text-emerald-500 bg-emerald-500/10", text: "Auth token healthy" },
          { Icon: Activity, color: "text-sky-500 bg-sky-500/10", text: "No sync failures detected" },
        ],
      }}
    />
  ),
});
