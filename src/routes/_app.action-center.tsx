import { createFileRoute } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/action-center")({
  head: () => ({ meta: [{ title: "Action Center — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Workflows"
      title="Action Center"
      description="Tasks, follow-ups, reminders and pending responses — all in one place."
      icon={Zap}
    />
  ),
});