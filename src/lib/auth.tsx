import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthCtx = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
};


const Ctx = createContext<AuthCtx | null>(null);
const STORAGE_KEY = "curdai.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const value: AuthCtx = {
    user,
    isAuthenticated: !!user,
    login: async (email) => {
      // TODO: wire to FastAPI /auth/login
      await new Promise((r) => setTimeout(r, 400));
      persist({ id: "u_1", name: email.split("@")[0] || "User", email, role: "User" });
    },
    register: async ({ name, email, role }) => {
      await new Promise((r) => setTimeout(r, 500));
      persist({ id: "u_1", name, email, role });
    },
    logout: () => persist(null),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}