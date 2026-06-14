import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_connect")({
  component: ConnectLayout,
});

function ConnectLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  return (
    <div className="min-h-screen text-foreground">
      <TopBar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}