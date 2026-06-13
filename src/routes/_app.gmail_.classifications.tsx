import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { EmailIntelligenceSection } from "@/components/EmailIntelligenceSection";

export const Route = createFileRoute("/_app/gmail_/classifications")({
  head: () => ({ meta: [{ title: "AI Email Intelligence — Agentic" }] }),
  component: GmailClassificationsPage,
});

function GmailClassificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to={"/integrations/gmail/manage" as never}
            className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Manage Gmail
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            <Sparkles className="h-3 w-3" /> Gmail
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            AI Email Intelligence
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Automatically categorized and prioritized emails.
          </p>
        </div>
      </div>

      <EmailIntelligenceSection />
    </div>
  );
}