import { inject, track } from "@vercel/analytics";

/**
 * Two numbers this site never had: how many people are on it, and how many of
 * them tap to call or text.
 *
 * Pageviews go to Vercel Web Analytics — enable it once for the project in the
 * Vercel dashboard (Analytics tab) and the counts appear there; nothing else to
 * configure.
 *
 * Call and text taps are sent as custom events. Vercel records custom events on
 * the Pro plan and silently drops them on Hobby, so when VITE_GA_ID is set the
 * same events are also sent to Google Analytics 4, which records them on any
 * plan. Either destination answers the question that matters for the pitch:
 * "how many calls a month does this site produce?"
 *
 * The listener is one document-level capture handler rather than an onClick
 * on each of the six tel: links, so a link added later is counted without
 * anyone remembering to wire it.
 */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGa(id: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
}

function gaEvent(name: string, params: Record<string, string>) {
  if (window.gtag) window.gtag("event", name, params);
}

let started = false;

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;

  inject();
  if (GA_ID) loadGa(GA_ID);

  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const kind = href.startsWith("tel:")
        ? "call_click"
        : href.startsWith("sms:")
          ? "text_click"
          : null;
      if (!kind) return;
      const props = {
        href,
        page: window.location.pathname,
        label: (a.textContent ?? "").trim().slice(0, 40),
      };
      track(kind, props);
      gaEvent(kind, props);
    },
    { capture: true },
  );
}
