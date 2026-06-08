import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const Route = createFileRoute("/_app/contacts")({
  head: () => ({ meta: [{ title: "Contacts — Agentic" }] }),
  component: () => (
    <PlaceholderPage
      eyebrow="Network"
      title="Contacts"
      description="Synced Gmail contacts, LinkedIn connections and Instagram profiles in one searchable list."
      icon={Contact}
    />
  ),
});