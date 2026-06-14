import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_gmail/gmail/")({
  component: () => <Navigate to="/gmail/overview" />,
});