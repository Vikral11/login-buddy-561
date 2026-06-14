import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronDown,
  Home,
  Inbox,
  Link2,
  LogOut,
  Moon,
  NotebookPen,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: number };

const connectNav: NavItem[] = [
  { to: "/overview", label: "Overview", icon: Home },
  { to: "/home", label: "Connect Accounts", icon: Link2 },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

const gmailNav: NavItem[] = [
  { to: "/gmail/overview", label: "Overview", icon: Home },
  { to: "/gmail/inbox", label: "Smart Inbox", icon: Inbox },
  { to: "/gmail/summaries", label: "Summaries", icon: NotebookPen },
  { to: "/gmail/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/gmail/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const inGmailContext =
    pathname.startsWith("/gmail/") ||
    pathname === "/integrations/gmail/manage";
  const nav = inGmailContext ? gmailNav : connectNav;
  const workspaceLabel = inGmailContext ? "Gmail Intelligence" : "Agentic";

  const Sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
          <Send className="h-4 w-4 -rotate-12 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold leading-tight tracking-tight">Agentic</p>
          <p className="truncate text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{workspaceLabel}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => {
          const active =
            pathname === n.to ||
            (n.to !== "/home" && n.to !== "/overview" && pathname.startsWith(n.to + "/"));
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to as never}
              onClick={() => setMobileOpen(false)}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={`relative h-4 w-4 transition-transform group-hover:translate-x-0.5 ${active ? "text-primary" : ""}`} />
              <span className={`relative flex-1 ${active ? "text-foreground font-medium" : ""}`}>{n.label}</span>
              {n.badge ? (
                <span className="relative inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1.5 text-[10px] font-semibold text-destructive-foreground">
                  {n.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
        {inGmailContext && (
          <Link
            to={"/home" as never}
            onClick={() => setMobileOpen(false)}
            className="mt-4 flex items-center gap-3 rounded-xl border border-dashed border-border px-3 py-2.5 text-xs text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <Link2 className="h-3.5 w-3.5" />
            Back to Connect Accounts
          </Link>
        )}
      </nav>

      <div className="mx-3 mb-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary-glow/10 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <p className="text-sm font-semibold">Upgrade to Pro</p>
        </div>
        <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
          Unlock advanced insights and powerful automation.
        </p>
        <button className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-xs font-medium text-primary-foreground hover:opacity-95">
          Upgrade Now
        </button>
      </div>

      <div className="relative border-t border-border px-3 py-3">
        <button
          onClick={() => setProfileOpen((s) => !s)}
          className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-sidebar-accent"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user?.name}</p>
            <p className="truncate text-[11px] text-muted-foreground">{user?.email}</p>
          </div>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${profileOpen ? "rotate-180" : ""}`} />
        </button>
        {profileOpen && (
          <div className="absolute bottom-[calc(100%+4px)] left-3 right-3 z-30 rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-card)]">
            <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
              <Settings className="h-4 w-4" /> Profile
            </Link>
            <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
              <Settings className="h-4 w-4" /> Settings
            </Link>
            <button
              onClick={() => { logout(); navigate({ to: "/auth/login" }); }}
              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-sidebar/70 backdrop-blur-xl lg:block">
        {Sidebar}
      </aside>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar lg:hidden">
            {Sidebar}
          </aside>
        </>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/60 px-4 backdrop-blur-xl lg:px-8">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground lg:hidden"
            aria-label="Open menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div className="relative flex flex-1 items-center">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search anything…"
              className="h-9 w-full max-w-md rounded-lg border border-border bg-card/60 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
            />
            <kbd className="absolute right-3 hidden rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-muted-foreground md:inline-block" style={{ left: "auto" }}>⌘K</kbd>
          </div>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span>
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
