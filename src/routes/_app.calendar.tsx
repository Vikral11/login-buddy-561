import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/calendar")({
  head: () => ({ meta: [{ title: "Calendar — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Schedule"
      title="Calendar"
      description="Meetings, reminders and follow-ups in a unified calendar view."
      icon={Calendar}
    />
  ),
});