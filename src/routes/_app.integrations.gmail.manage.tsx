import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy route — the Gmail management experience has moved to the
// dedicated /gmail workspace. Redirect to keep old links/CTAs working.
export const Route = createFileRoute("/_app/integrations/gmail/manage")({
  beforeLoad: () => {
    throw redirect({ to: "/gmail/overview" });
  },
});
