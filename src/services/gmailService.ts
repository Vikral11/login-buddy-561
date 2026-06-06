const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export type GmailStatus = {
  connected: boolean;
  email?: string;
  lastSync?: string;
};

export const gmailService = {
  async getStatus(): Promise<GmailStatus> {
    // GET {API}/gmail/status
    const raw = typeof window !== "undefined" ? localStorage.getItem("curdai.gmail") : null;
    return raw ? JSON.parse(raw) : { connected: false };
  },
  async connect(): Promise<GmailStatus> {
    const status = { connected: true, email: "charvi.work@gmail.com", lastSync: new Date().toISOString() };
    localStorage.setItem("curdai.gmail", JSON.stringify(status));
    return status;
  },
  async disconnect() {
    localStorage.removeItem("curdai.gmail");
  },
  async sync(): Promise<GmailStatus> {
    const status = { connected: true, email: "charvi.work@gmail.com", lastSync: new Date().toISOString() };
    localStorage.setItem("curdai.gmail", JSON.stringify(status));
    return status;
  },
};
