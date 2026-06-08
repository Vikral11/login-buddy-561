import { createFileRoute } from "@tanstack/react-router";
import { Instagram, MessageCircle, Mail, AtSign, Clock } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/instagram/manage")({
  head: () => ({ meta: [{ title: "Manage Instagram — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "instagram",
        name: "Instagram",
        Icon: Instagram,
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-500",
        metrics: [
          { label: "DMs Synced", value: 87, Icon: MessageCircle, color: "bg-pink-500/10 text-pink-600" },
          { label: "New Messages", value: 9, Icon: Mail, color: "bg-emerald-500/10 text-emerald-600" },
          { label: "Mentions", value: 14, Icon: AtSign, color: "bg-amber-500/10 text-amber-600" },
          { label: "Last Sync", value: "45s ago", Icon: Clock, color: "bg-sky-500/10 text-sky-600" },
        ],
        activity: [
          { title: "Instagram sync completed", note: "2 new DMs imported", time: "30 sec ago" },
          { title: "New mention", note: "@charvi tagged in a story", time: "5 min ago" },
          { title: "Webhook received", note: "Comment activity updated", time: "8 min ago" },
        ],
      }}
    />
  ),
});