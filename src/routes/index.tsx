import { createFileRoute } from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CurdAI — Transform Email Into Intelligence" },
      { name: "description", content: "Your AI-powered email workspace." },
      { property: "og:title", content: "CurdAI" },
      { property: "og:description", content: "Transform Email Into Intelligence." },
    ],
  }),
  component: Index,
});

function Index() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/home" : "/auth/login"} />;
}
