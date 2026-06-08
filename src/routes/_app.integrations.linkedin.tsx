import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { IntegrationWizard } from "@/components/IntegrationWizard";

export const Route = createFileRoute("/_app/integrations/linkedin")({
  head: () => ({ meta: [{ title: "Connect LinkedIn — Agentic" }] }),
  component: () => (
    <IntegrationWizard
      config={{
        provider: "linkedin",
        title: "Connect LinkedIn",
        Icon: Linkedin,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-600",
        description:
          "Add your LinkedIn API credentials to allow Agentic to sync messages, job alerts and connection updates.",
        credentialLabels: {
          idLabel: "LinkedIn Client ID",
          secretLabel: "LinkedIn Client Secret",
          idName: "linkedin_client_id",
          secretName: "linkedin_client_secret",
        },
      }}
    />
  ),
});