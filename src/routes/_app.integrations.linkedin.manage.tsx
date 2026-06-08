import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, MessageSquare, Users, Briefcase, Clock } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/linkedin/manage")({
  head: () => ({ meta: [{ title: "Manage LinkedIn — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "linkedin",
        name: "LinkedIn",
        Icon: Linkedin,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600",
        metrics: [
          { label: "Messages Synced", value: 48, Icon: MessageSquare, color: "bg-blue-500/10 text-blue-600" },
          { label: "New Connections", value: 6, Icon: Users, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Opportunities", value: 12, Icon: Briefcase, color: "bg-amber-500/10 text-amber-600" },
          { label: "Last Sync", value: "20s ago", Icon: Clock, color: "bg-sky-500/10 text-sky-600" },
        ],
        activity: [
          { title: "LinkedIn sync completed", note: "5 new messages imported", time: "10 sec ago" },
          { title: "New job alert", note: "Financial Engineering roles", time: "3 min ago" },
          { title: "Connection request", note: "Charvi added to network", time: "12 min ago" },
        ],
      }}
    />
  ),
});