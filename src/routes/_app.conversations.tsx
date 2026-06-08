import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/conversations")({
  head: () => ({ meta: [{ title: "Conversations — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Inbox"
      title="Conversations"
      description="Gmail, LinkedIn and Instagram conversations unified in one place. Search, filter and triage with AI."
      icon={MessageSquare}
    />
  ),
});