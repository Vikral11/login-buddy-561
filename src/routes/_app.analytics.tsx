import { createFileRoute } from "@tanstack/react-router";
import { BarChart3 } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Insights"
      title="Analytics"
      description="Email trends, engagement metrics, message volume and response activity."
      icon={BarChart3}
    />
  ),
});