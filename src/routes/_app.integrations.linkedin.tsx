import { createFileRoute } from "@tanstack/react-router";
import { Linkedin } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/integrations/linkedin")({
  head: () => ({ meta: [{ title: "LinkedIn Integration — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Integration"
      title="LinkedIn"
      description="Connect your LinkedIn account to sync messages, job alerts and connection updates."
      icon={Linkedin}
    />
  ),
});