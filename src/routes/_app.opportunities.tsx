import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/opportunities")({
  head: () => ({ meta: [{ title: "Opportunities — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Pipeline"
      title="Opportunities"
      description="Job opportunities, recruiter messages and important outreach grouped by source."
      icon={Target}
    />
  ),
});