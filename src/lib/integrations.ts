import { useSyncExternalStore } from "react";

export type Provider = "gmail" | "linkedin" | "instagram";

export type IntegrationCreds = {
  google_client_id: string;
  google_client_secret: string;
  project_id: string;
  subscription_id: string;
};

export type IntegrationRecord = {
  connected: boolean;
  connectedAt?: string;
  creds: IntegrationCreds;
};

const emptyCreds: IntegrationCreds = {
  google_client_id: "",
  google_client_secret: "",
  project_id: "",
  subscription_id: "",
};

const KEY = "agentic:integrations:v1";
const EVT = "agentic:integrations:changed";

type StoreShape = Record<Provider, IntegrationRecord>;

const defaultState: StoreShape = {
  gmail: { connected: false, creds: { ...emptyCreds } },
  linkedin: { connected: false, creds: { ...emptyCreds } },
  instagram: { connected: false, creds: { ...emptyCreds } },
};

function read(): StoreShape {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
}

function write(state: StoreShape) {
  localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVT));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener("storage", handler);
  };
}

let cache: StoreShape | null = null;
let cacheRaw = "";
function getSnapshot(): StoreShape {
  if (typeof window === "undefined") return defaultState;
  const raw = localStorage.getItem(KEY) ?? "";
  if (raw === cacheRaw && cache) return cache;
  cacheRaw = raw;
  cache = read();
  return cache;
}

export function useIntegrations() {
  const state = useSyncExternalStore(subscribe, getSnapshot, () => defaultState);

  return {
    state,
    get(provider: Provider): IntegrationRecord {
      return state[provider];
    },
    saveCreds(provider: Provider, creds: IntegrationCreds) {
      const next = read();
      next[provider] = { ...next[provider], creds };
      write(next);
    },
    connect(provider: Provider, creds: IntegrationCreds) {
      const next = read();
      next[provider] = { connected: true, connectedAt: new Date().toISOString(), creds };
      write(next);
    },
    disconnect(provider: Provider) {
      const next = read();
      next[provider] = { connected: false, creds: { ...emptyCreds } };
      write(next);
    },
  };
}

export function getIntegration(provider: Provider): IntegrationRecord {
  return read()[provider];
}