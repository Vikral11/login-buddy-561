import type { Provider } from "@/lib/integrations";

const API = import.meta.env.VITE_API_URL ?? "";

export type IntegrationStatus = {
  connected: boolean;
  lastSync: string;
  webhook: "active" | "inactive";
  watch: "healthy" | "warning";
  health: "healthy" | "degraded";
};

export type IntegrationMetric = { label: string; value: number | string; delta?: string };
export type ActivityEvent = { id: string; title: string; note: string; time: string };

// Placeholder API layer — swap fetch() calls for FastAPI endpoints later.
export const integrationService = {
  async getStatus(provider: Provider): Promise<IntegrationStatus> {
    // GET `${API}/integrations/${provider}/status`
    void API;
    return {
      connected: true,
      lastSync: "10 seconds ago",
      webhook: "active",
      watch: "healthy",
      health: "healthy",
    };
  },
  async getMetrics(_provider: Provider): Promise<IntegrationMetric[]> {
    // GET `${API}/integrations/${provider}/metrics`
    return [];
  },
  async getActivity(_provider: Provider): Promise<ActivityEvent[]> {
    // GET `${API}/integrations/${provider}/activity`
    return [];
  },
  async runSync(_provider: Provider) {
    // POST `${API}/integrations/${provider}/sync`
  },
};
