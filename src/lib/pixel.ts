import { META_PIXEL_ID } from "@/config";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[]; push?: unknown; loaded?: boolean; version?: string;
};
declare global { interface Window { fbq?: Fbq; _fbq?: Fbq } }

let started = false;

/** Carrega o pixel (somente no navegador e se houver ID) e envia PageView. */
export function initPixel() {
  if (typeof window === "undefined" || !META_PIXEL_ID || started) return;
  started = true;
  if (!window.fbq) {
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod.apply(n, args); else n.queue!.push(args);
    } as Fbq;
    n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
    window.fbq = n; window._fbq = n;
    const s = document.createElement("script");
    s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
  }
  window.fbq("init", META_PIXEL_ID, {}, { agent: "lovable" });
  window.fbq("track", "PageView");
}

export function track(event: "Lead", params?: Record<string, unknown>) {
  if (window.fbq && META_PIXEL_ID) window.fbq("track", event, params ?? {}, { eventID: crypto.randomUUID() });
}

export function trackCustom(event: "QuizStart" | "QuizComplete", params?: Record<string, unknown>) {
  if (window.fbq && META_PIXEL_ID) window.fbq("trackCustom", event, params ?? {});
}
