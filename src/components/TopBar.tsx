import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, ChevronDown, LogOut, Moon, Send, Settings, Sun } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

export function TopBar() {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background/60 px-4 backdrop-blur-xl lg:px-8">
      <Link to="/home" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-glow shadow-[var(--shadow-glow)]">
          <Send className="h-4 w-4 -rotate-12 text-primary-foreground" />
        </div>
        <p className="text-lg font-bold tracking-tight">Agentic</p>
      </Link>
      <div className="flex-1" />
      <button
        onClick={toggleTheme}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle theme"
      >
        {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
      <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/60 text-muted-foreground hover:text-foreground" aria-label="Notifications">
        <Bell className="h-4 w-4" />
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">3</span>
      </button>
      <div className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-1.5 py-1.5 text-left hover:bg-accent"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-glow text-xs font-semibold text-primary-foreground">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-48 rounded-xl border border-border bg-popover p-1.5 shadow-[var(--shadow-card)]">
            <Link to="/gmail/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm hover:bg-accent">
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
    </header>
  );
}