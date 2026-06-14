import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BarChart3,
  Bell,
  ChevronDown,
  ClipboardList,
  FileText,
  Flag,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Moon,
  Plug,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

const nav = [
  { to: "/gmail/overview", label: "Overview", icon: LayoutDashboard },
  { to: "/gmail/inbox", label: "Inbox", icon: Inbox },
  { to: "/gmail/priorities", label: "Priorities", icon: Flag },
  { to: "/gmail/actions", label: "Actions", icon: ClipboardList },
  { to: "/gmail/summaries", label: "Summaries", icon: FileText },
  { to: "/gmail/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/gmail/integrations", label: "Integrations", icon: Plug },
  { to: "/gmail/settings", label: "Settings", icon: Settings },
] as const;

export function GmailShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const Sidebar = (
    <div className="flex h-full flex-col">
      <Link to="/gmail/overview" className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
          <Mail className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-base font-bold tracking-tight leading-none">Gmail</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-1">Workspace</p>
        </div>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map((n) => {
          const active = pathname === n.to || pathname.startsWith(n.to + "/");
          const Icon = n.icon;
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setMobileOpen(false)}
              className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
            >
              {active && (
                <motion.span
                  layoutId="gmail-sidebar-active"
                  className="absolute inset-0 rounded-xl bg-primary/10 ring-1 ring-primary/30"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <Icon className={`relative h-4 w-4 transition-transform group-hover:translate-x-0.5 ${active ? "text-primary" : ""}`} />
              <span className={`relative flex-1 ${active ? "text-foreground font-medium" : ""}`}>{n.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mx-3 mb-3 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary-glow/10 p-4">
        <p className="text-sm font-semibold">Connect more</p>
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          Add LinkedIn and Instagram to unify your inbox.
        </p>
        <Link to="/home" className="mt-3 inline-flex h-8 w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-glow text-xs font-medium text-primary-foreground hover:opacity-95">
          Manage Accounts
        </Link>
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
            <Link to="/gmail/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
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
          <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-sidebar lg:hidden">{Sidebar}</aside>
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
              placeholder="Search emails, senders, actions…"
              className="h-9 w-full max-w-md rounded-lg border border-border bg-card/60 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
            />
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: "easeOut" }}>
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}