import { createFileRoute } from "@tanstack/react-router";
import { Activity, AtSign, FileText, Heart, Instagram, KeyRound, MessageCircle, RefreshCw, Shield, Webhook, Zap } from "lucide-react";
import { IntegrationManagePage } from "@/components/IntegrationManagePage";

export const Route = createFileRoute("/_app/integrations/instagram/manage")({
  head: () => ({ meta: [{ title: "Manage Instagram — Agentic" }] }),
  component: () => (
    <IntegrationManagePage
      config={{
        provider: "instagram",
        name: "Instagram",
        Icon: Instagram,
        accent: "text-pink-500",
        headerTitle: "Manage Instagram",
        headerSubtitle: "Monitor DMs, comments, and engagement activity.",
        statusTitle: "Instagram Integration Active",
        insightsTitle: "Instagram Insights",
        chartTitle: "Instagram Sync Activity",
        chartLabel: "Events synced this week",
        chartPoints: [22, 17, 28, 19, 33, 26, 30],
        metrics: [
          { Icon: MessageCircle, label: "DMs Synced", value: 87, sub: "Total inbox", delta: "11%", color: "text-pink-500 bg-pink-500/10" },
          { Icon: MessageCircle, label: "Comments Tracked", value: 152, sub: "This week", delta: "6%", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: AtSign, label: "Mentions", value: 14, sub: "Last 7 days", color: "text-amber-500 bg-amber-500/10" },
          { Icon: Heart, label: "Engagement Events", value: 421, sub: "Last 24h", delta: "18%", color: "text-sky-500 bg-sky-500/10" },
        ],
        activity: [
          { Icon: MessageCircle, color: "text-pink-500 bg-pink-500/10", title: "New DM received", note: "From @aarav.k", time: "30 sec ago", dot: "bg-emerald-500" },
          { Icon: AtSign, color: "text-amber-500 bg-amber-500/10", title: "New mention", note: "@charvi tagged in a story", time: "5 min ago", dot: "bg-amber-500" },
          { Icon: Heart, color: "text-rose-500 bg-rose-500/10", title: "Engagement spike", note: "30 new likes on last post", time: "12 min ago", dot: "bg-rose-500" },
          { Icon: Webhook, color: "text-primary bg-primary/10", title: "Webhook received", note: "Comment activity updated", time: "20 min ago", dot: "bg-primary" },
          { Icon: RefreshCw, color: "text-emerald-500 bg-emerald-500/10", title: "Incremental sync completed", note: "14 events processed", time: "1 hr ago", dot: "bg-emerald-500" },
        ],
        quickActions: [
          { Icon: RefreshCw, label: "Run Manual Sync", color: "text-primary bg-primary/10" },
          { Icon: Webhook, label: "Refresh Webhook", color: "text-emerald-500 bg-emerald-500/10" },
          { Icon: FileText, label: "View Logs", color: "text-amber-500 bg-amber-500/10" },
          { Icon: KeyRound, label: "Update Credentials", color: "text-sky-500 bg-sky-500/10", to: "/integrations/instagram/setup" },
        ],
        insights: [
          { Icon: Zap, color: "text-primary bg-primary/10", text: "9 new DMs this morning" },
          { Icon: AtSign, color: "text-amber-500 bg-amber-500/10", text: "14 mentions detected this week" },
          { Icon: Shield, color: "text-emerald-500 bg-emerald-500/10", text: "Graph API token healthy" },
          { Icon: Activity, color: "text-sky-500 bg-sky-500/10", text: "No sync failures detected" },
        ],
      }}
    />
  ),
});
