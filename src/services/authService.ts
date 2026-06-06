import type { User } from "@/lib/auth";

// Placeholder API service — wire to FastAPI later.
// Example: POST {API}/auth/login -> { access_token, user }

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export const authService = {
  baseUrl: API,
  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    // const r = await fetch(`${API}/auth/login`, { method: "POST", body: JSON.stringify({ email, password }) });
    return { token: "mock", user: { id: "u_1", name: email.split("@")[0], email, role: "User" } };
  },
  async register(payload: { name: string; email: string; password: string; role: "User" | "Admin" }): Promise<{ token: string; user: User }> {
    return { token: "mock", user: { id: "u_1", name: payload.name, email: payload.email, role: payload.role } };
  },
};
