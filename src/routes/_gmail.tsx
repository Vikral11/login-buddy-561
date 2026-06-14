import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { GmailShell } from "@/components/GmailShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_gmail")({
  component: GmailLayout,
});

function GmailLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  return (
    <GmailShell>
      <Outlet />
    </GmailShell>
  );
}