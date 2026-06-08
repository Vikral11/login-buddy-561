import { createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/integrations/instagram")({
  head: () => ({ meta: [{ title: "Instagram Integration — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Integration"
      title="Instagram"
      description="Connect your Instagram account to monitor DMs, comments and activity."
      icon={Instagram}
    />
  ),
});