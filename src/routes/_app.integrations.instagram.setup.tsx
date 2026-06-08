import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { IntegrationWizard } from "@/components/IntegrationWizard";

export const Route = createFileRoute("/_app/integrations/instagram/setup")({
  head: () => ({ meta: [{ title: "Connect Instagram — Agentic" }] }),
  component: () => (
    <IntegrationWizard
      config={{
        provider: "instagram",
        title: "Connect Instagram",
        Icon: Instagram,
        iconBg: "bg-pink-500/10",
        iconColor: "text-pink-500",
        description:
          "Add your Instagram Graph API credentials to allow Agentic to monitor DMs, comments and activity.",
        credentialLabels: {
          idLabel: "Instagram App ID",
          secretLabel: "Instagram App Secret",
          idName: "instagram_app_id",
          secretName: "instagram_app_secret",
        },
      }}
    />
  ),
});