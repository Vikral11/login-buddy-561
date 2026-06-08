import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { IntegrationWizard } from "@/components/IntegrationWizard";

export const Route = createFileRoute("/_app/integrations/gmail")({
  head: () => ({ meta: [{ title: "Connect Gmail — Agentic" }] }),
  component: () => (
    <IntegrationWizard
      config={{
        provider: "gmail",
        title: "Connect Gmail",
        Icon: Mail,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        description:
          "Add your Google API credentials to allow Agentic to securely access your Gmail account.",
        credentialLabels: {
          idLabel: "Google Client ID",
          secretLabel: "Google Client Secret",
          idName: "google_client_id",
          secretName: "google_client_secret",
        },
      }}
    />
  ),
});