import { createFileRoute, Navigate } from "@tanstack/react-router";

// The Gmail management experience now lives at /gmail/* under its own
// dedicated workspace shell. This route is preserved as a redirect so
// existing in-app links continue to work.
export const Route = createFileRoute("/_app/integrations/gmail/manage")({
  head: () => ({ meta: [{ title: "Manage Gmail — Agentic" }] }),
  component: () => <Navigate to="/gmail/overview" />,
});
