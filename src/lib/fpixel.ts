/**
 * Meta Pixel (fbq) helpers — all events go through trackSingle for the configured pixel ID.
 * Calls wait until fbevents.js has exposed window.fbq (fixes Next.js Script timing).
 */

export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";

type FbqFn = (cmd: string, ...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: FbqFn;
  }
}

const READY_MS = 10_000;
const POLL_MS = 50;

function whenFbqReady(run: (fbq: FbqFn) => void): void {
  if (typeof window === "undefined") return;
  const started = Date.now();
  const tick = () => {
    const fbq = window.fbq;
    if (typeof fbq === "function") {
      run(fbq);
      return;
    }
    if (Date.now() - started > READY_MS) return;
    window.setTimeout(tick, POLL_MS);
  };
  tick();
}

export function pageview(): void {
  if (!FB_PIXEL_ID) return;
  whenFbqReady((fbq) => {
    fbq("trackSingle", FB_PIXEL_ID, "PageView");
  });
}

export function track(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (!FB_PIXEL_ID) return;
  whenFbqReady((fbq) => {
    fbq("trackSingle", FB_PIXEL_ID, eventName, params);
  });
}

/** Preferred entry — matches Meta’s “Pixel API” naming in docs and UI. */
export const metaPixel = {
  pageview,
  track,
};

/** @deprecated Use metaPixel.track */
export const event = track;
