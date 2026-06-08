import { Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  Lightbulb,
  Loader2,
  Lock,
  Plug,
  RefreshCw,
  Shield,
  Trash2,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { useIntegrations, type Provider } from "@/lib/integrations";

export type WizardConfig = {
  provider: Provider;
  title: string;
  Icon: ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  description: string;
  credentialLabels: { idLabel: string; secretLabel: string; idName: string; secretName: string };
};

const STEPS = [
  { id: 1, title: "Google Credentials", subtitle: "Add Client ID & Client Secret" },
  { id: 2, title: "Project & Subscription", subtitle: "Add Project ID & Subscription ID" },
  { id: 3, title: "Test Connection", subtitle: "Verify and complete" },
] as const;

type FormState = {
  google_client_id: string;
  google_client_secret: string;
  project_id: string;
  subscription_id: string;
};

const emptyForm: FormState = {
  google_client_id: "",
  google_client_secret: "",
  project_id: "",
  subscription_id: "",
};

export function IntegrationWizard({ config }: { config: WizardConfig }) {
  const navigate = useNavigate();
  const integrations = useIntegrations();
  const record = integrations.get(config.provider);
  const isConnected = record.connected;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [showSecret, setShowSecret] = useState(false);
  const [testStatus, setTestStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [confirmDisconnect, setConfirmDisconnect] = useState(false);

  // hydrate from store (preload saved creds when managing)
  useEffect(() => {
    setForm({ ...emptyForm, ...record.creds });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.provider]);

  const step1Valid = form.google_client_id.trim().length > 0 && form.google_client_secret.trim().length > 0;
  const step2Valid = form.project_id.trim().length > 0 && form.subscription_id.trim().length > 0;

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const goToStep = (target: number) => {
    if (target === 1) setStep(1);
    if (target === 2 && step1Valid) setStep(2);
    if (target === 3 && step1Valid && step2Valid) setStep(3);
  };

  const runTest = async () => {
    setTestStatus("loading");
    setErrorMsg("");
    await new Promise((r) => setTimeout(r, 1200));
    if (form.google_client_secret.toLowerCase() === "fail") {
      setTestStatus("error");
      setErrorMsg("Invalid Client Secret. Please verify your credentials in Google Cloud Console.");
      return;
    }
    // Persist connection (ready for FastAPI: POST /integrations/{provider}/connect)
    integrations.connect(config.provider, form);
    setTestStatus("success");
    // Auto-redirect to dashboard
    setTimeout(() => navigate({ to: "/home" }), 1400);
  };

  const handleDisconnect = () => {
    integrations.disconnect(config.provider);
    setConfirmDisconnect(false);
    navigate({ to: "/home" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Link
        to="/home"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Integrations
      </Link>

      {isConnected && (
        <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
              <Plug className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                {config.title} is connected
              </p>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-200/80">
                Edit credentials below, retest the connection, or disconnect this integration.
              </p>
            </div>
          </div>
          <button
            onClick={() => setConfirmDisconnect(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:bg-transparent dark:hover:bg-red-950/30"
          >
            <Trash2 className="h-4 w-4" />
            Disconnect {config.title.replace("Connect ", "")}
          </button>
        </div>
      )}

      <Stepper step={step} onJump={goToStep} step1Valid={step1Valid} step2Valid={step2Valid} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", config.iconBg)}>
              <config.Icon className={cn("h-7 w-7", config.iconColor)} />
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">{config.title}</h1>
              <p className="text-sm text-muted-foreground">
                Step {step} of 3:{" "}
                {step === 1 ? "Add Google Credentials" : step === 2 ? "Project & Subscription" : "Test Connection"}
              </p>
            </div>
          </div>
          <p className="max-w-2xl text-sm text-muted-foreground">{config.description}</p>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepCard key="s1">
                <h2 className="mb-4 text-base font-semibold">Step 1: Google Credentials</h2>
                <FieldLabel label={config.credentialLabels.idLabel} hint="The Client ID from your Google Cloud OAuth 2.0 credentials." />
                <div className="relative">
                  <input
                    id={config.credentialLabels.idName}
                    name={config.credentialLabels.idName}
                    autoComplete="off"
                    value={form.google_client_id}
                    onChange={update("google_client_id")}
                    placeholder="Enter your Google Client ID"
                    className={inputCls}
                  />
                  <Key className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>

                <div className="mt-5">
                  <FieldLabel label={config.credentialLabels.secretLabel} hint="The Client Secret from your Google Cloud OAuth 2.0 credentials." />
                  <div className="relative">
                    <input
                      id={config.credentialLabels.secretName}
                      name={config.credentialLabels.secretName}
                      autoComplete="off"
                      type={showSecret ? "text" : "password"}
                      value={form.google_client_secret}
                      onChange={update("google_client_secret")}
                      placeholder="Enter your Google Client Secret"
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={showSecret ? "Hide secret" : "Show secret"}
                    >
                      {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <HelpHint
                  title="How to get these credentials"
                  body="Follow these steps to create OAuth 2.0 credentials in Google Cloud Console."
                  cta="View Step-by-Step Guide"
                />

                <WizardFooter>
                  <button
                    disabled={!step1Valid}
                    onClick={() => setStep(2)}
                    className={primaryBtn}
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </WizardFooter>
              </StepCard>
            )}

            {step === 2 && (
              <StepCard key="s2">
                <h2 className="mb-4 text-base font-semibold">Step 2: Project & Subscription</h2>
                <FieldLabel label="Project ID" hint="Your Google Cloud project identifier." />
                <input
                  id="project_id"
                  name="project_id"
                  value={form.project_id}
                  onChange={update("project_id")}
                  placeholder="my-company-prod"
                  className={inputCls}
                />
                <div className="mt-5">
                  <FieldLabel label="Subscription ID" hint="The Pub/Sub subscription used for Gmail watch events." />
                  <input
                    id="subscription_id"
                    name="subscription_id"
                    value={form.subscription_id}
                    onChange={update("subscription_id")}
                    placeholder="gmail-watch-sub"
                    className={inputCls}
                  />
                </div>

                <HelpHint
                  title="Need help with Pub/Sub?"
                  body="Create a Pub/Sub subscription, find your Project ID, and configure a Gmail Watch subscription."
                  cta="View Setup Guide"
                />

                <WizardFooter>
                  <button onClick={() => setStep(1)} className={secondaryBtn}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button disabled={!step2Valid} onClick={() => setStep(3)} className={primaryBtn}>
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </WizardFooter>
              </StepCard>
            )}

            {step === 3 && (
              <StepCard key="s3">
                <h2 className="mb-1 text-base font-semibold">Step 3: Test Connection</h2>
                <p className="mb-6 text-sm text-muted-foreground">
                  We'll validate your Client ID, Client Secret, Project ID and Subscription ID.
                </p>

                {testStatus === "idle" && (
                  <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                    <p className="mb-4 text-sm text-muted-foreground">
                      Ready to verify your {config.title} connection.
                    </p>
                    <button onClick={runTest} className={primaryBtn + " mx-auto"}>
                      <Shield className="h-4 w-4" /> Run Test
                    </button>
                  </div>
                )}

                {testStatus === "loading" && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-muted/20 p-10 text-center">
                    <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm font-medium">Checking credentials…</p>
                    <p className="text-xs text-muted-foreground">Contacting Google APIs</p>
                  </div>
                )}

                {testStatus === "success" && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
                          {config.title} Connected Successfully
                        </h3>
                        <p className="text-sm text-emerald-800/80 dark:text-emerald-200/80">
                          Your account is now connected and ready for synchronization.
                        </p>
                        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3">
                          <Meta label="Provider" value={config.title} />
                          <Meta label="Sync Status" value="Live" />
                          <Meta label="Connected" value={new Date().toLocaleString()} />
                        </dl>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end gap-2">
                      <button onClick={() => navigate({ to: "/home" })} className={secondaryBtn}>Done</button>
                    </div>
                  </div>
                )}

                {testStatus === "error" && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/40 dark:bg-red-950/30">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-600">
                        <XCircle className="h-7 w-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Connection Failed</h3>
                        <p className="text-sm text-red-800/80 dark:text-red-200/80">{errorMsg}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end gap-2">
                      <button onClick={() => setStep(1)} className={secondaryBtn}>
                        <ArrowLeft className="h-4 w-4" /> Back
                      </button>
                      <button onClick={runTest} className={primaryBtn}>
                        <RefreshCw className="h-4 w-4" /> Retry
                      </button>
                    </div>
                  </div>
                )}
              </StepCard>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Your credentials are encrypted and stored securely.
          </div>
        </div>

        <DocPanel step={step} />
      </div>

      {confirmDisconnect && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold">
              Disconnect {config.title.replace("Connect ", "")}?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              You will stop receiving updates and sync events from {config.title.replace("Connect ", "")}.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setConfirmDisconnect(false)} className={secondaryBtn}>
                Cancel
              </button>
              <button
                onClick={handleDisconnect}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700"
              >
                <Trash2 className="h-4 w-4" /> Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-border bg-background pl-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const primaryBtn =
  "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50";

const secondaryBtn =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted";

function FieldLabel({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="mb-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      {children}
    </motion.div>
  );
}

function WizardFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 flex items-center justify-end gap-2">{children}</div>;
}

function HelpHint({ title, body, cta }: { title: string; body: string; cta: string }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-200/60 bg-amber-50/60 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 h-5 w-5 text-amber-500" />
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
          <button className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
            {cta} <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-background/60 px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Stepper({
  step,
  onJump,
  step1Valid,
  step2Valid,
}: {
  step: number;
  onJump: (n: number) => void;
  step1Valid: boolean;
  step2Valid: boolean;
}) {
  const progress = useMemo(() => ((step - 1) / (STEPS.length - 1)) * 100, [step]);
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="relative">
        <div className="absolute left-0 right-0 top-5 mx-10 h-0.5 rounded bg-muted" />
        <motion.div
          className="absolute left-0 top-5 mx-10 h-0.5 rounded bg-primary"
          initial={false}
          animate={{ width: `calc(${progress}% - ${progress > 0 ? "0px" : "0px"})` }}
          style={{ maxWidth: "calc(100% - 5rem)" }}
          transition={{ duration: 0.4 }}
        />
        <div className="relative flex items-start justify-between gap-2 overflow-x-auto">
          {STEPS.map((s) => {
            const completed = s.id < step;
            const active = s.id === step;
            const enabled =
              s.id === 1 || (s.id === 2 && step1Valid) || (s.id === 3 && step1Valid && step2Valid);
            return (
              <button
                key={s.id}
                onClick={() => enabled && onJump(s.id)}
                disabled={!enabled}
                className={cn(
                  "flex min-w-[140px] flex-1 flex-col items-center text-center transition disabled:cursor-not-allowed",
                  !enabled && "opacity-50",
                )}
              >
                <span
                  className={cn(
                    "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition",
                    completed && "border-emerald-500 bg-emerald-500 text-white",
                    active && "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30",
                    !active && !completed && "border-border bg-card text-muted-foreground",
                  )}
                >
                  {completed ? <Check className="h-5 w-5" /> : s.id}
                </span>
                <span className={cn("mt-2 text-sm font-semibold", active ? "text-foreground" : "text-muted-foreground")}>
                  {s.title}
                </span>
                <span className="text-xs text-muted-foreground">{s.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DocPanel({ step }: { step: number }) {
  const sections =
    step === 2
      ? [
          { n: 1, title: "Create a Pub/Sub Topic", body: "In Google Cloud Console, open Pub/Sub and create a new topic for Gmail events.", cta: "Open Pub/Sub" },
          { n: 2, title: "Create a Subscription", body: "Add a subscription to your topic — this becomes your Subscription ID.", cta: "View Guide" },
          { n: 3, title: "Enable Gmail Watch", body: "Call users.watch on the Gmail API pointing to your Pub/Sub topic.", cta: "View Example" },
        ]
      : step === 3
      ? [
          { n: 1, title: "We validate your OAuth credentials", body: "Client ID and Secret are exchanged with Google.", cta: "Learn More" },
          { n: 2, title: "We confirm Pub/Sub access", body: "Project ID and Subscription ID are verified.", cta: "Learn More" },
          { n: 3, title: "Sync starts immediately", body: "On success, live sync begins and history backfills.", cta: "View Docs" },
        ]
      : [
          { n: 1, title: "Go to Google Cloud Console", body: "Visit the Google Cloud Console and sign in with your Google account.", cta: "Go to Console" },
          { n: 2, title: "Create OAuth 2.0 Credentials", body: "Navigate to APIs & Services › Credentials and click 'Create Credentials' › OAuth 2.0 Client IDs.", cta: "View Instructions" },
          { n: 3, title: "Copy your Client ID & Secret", body: "Once created, copy your Client ID and Client Secret and paste them here.", cta: "View Example" },
        ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-4 lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold">
            {step === 2 ? "How to set up Pub/Sub" : step === 3 ? "What happens next" : "How to get Google Credentials"}
          </h3>
        </div>
        <ol className="space-y-5">
          {sections.map((s) => (
            <li key={s.n} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {s.n}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                <button className="mt-2 inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-xs font-medium text-primary hover:bg-muted">
                  {s.cta} <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 text-emerald-600" />
          <div>
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Your data is safe</p>
            <p className="mt-0.5 text-xs text-emerald-800/80 dark:text-emerald-200/80">
              We never store your credentials in plain text and they are used only to connect your account.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}