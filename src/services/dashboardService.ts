export type Metric = { label: string; value: number; delta: number };

export const dashboardService = {
  async getMetrics(): Promise<Metric[]> {
    return [
      { label: "Emails Indexed", value: 1420, delta: 12 },
      { label: "High Priority", value: 128, delta: 8 },
      { label: "Action Required", value: 42, delta: 51 },
      { label: "Opportunities", value: 18, delta: 15 },
    ];
  },
  async getActivity() {
    return [
      { time: "09:21", title: "Gmail Connected", note: "Workspace connected successfully", kind: "info" as const },
      { time: "09:22", title: "20 Emails Synced", note: "New emails fetched and stored", kind: "success" as const },
      { time: "09:23", title: "AI Analysis Started", note: "Analyzing email patterns", kind: "info" as const },
      { time: "09:24", title: "Job Opportunity Found", note: "1 new opportunity detected", kind: "warning" as const },
      { time: "09:25", title: "Security Alert Detected", note: "1 suspicious email detected", kind: "danger" as const },
    ];
  },
  async getEmailActivity() {
    return [
      { day: "Mon", count: 220 },
      { day: "Tue", count: 310 },
      { day: "Wed", count: 180 },
      { day: "Thu", count: 360 },
      { day: "Fri", count: 280 },
      { day: "Sat", count: 120 },
      { day: "Sun", count: 90 },
    ];
  },
};
*** End Patch