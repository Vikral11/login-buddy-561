import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/integrations/gmail")({
  head: () => ({ meta: [{ title: "Gmail Integration — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Integration"
      title="Gmail"
      description="Manage your Gmail integration: sync history, scopes, AI summaries and disconnect."
      icon={Mail}
    />
  ),
});