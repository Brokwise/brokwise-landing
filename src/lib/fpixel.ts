/**
 * Meta Pixel (fbq) — manual-first setup:
 * - Base snippet sets autoConfig=false (see facebook-pixel.tsx) so Meta does not infer
 *   SubscribedButtonClick / microdata ViewContent / duplicate signals.
 * - All hits use trackSingle / trackSingleCustom for the configured pixel ID.
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

/** Dedupe PageView — never re-fire for the same route key within a single page session. */
let lastPageViewRouteKey = "";

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
  if (!FB_PIXEL_ID || typeof window === "undefined") return;
  const routeKey = `${window.location.pathname}${window.location.search}`;
  if (routeKey === lastPageViewRouteKey) return;
  lastPageViewRouteKey = routeKey;

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

/** Custom events (Events Manager → Custom conversions). Use BW_* prefix for Brokwise taxonomy. */
export function trackCustom(
  eventName: string,
  params: Record<string, unknown> = {},
): void {
  if (!FB_PIXEL_ID) return;
  whenFbqReady((fbq) => {
    fbq("trackSingleCustom", FB_PIXEL_ID, eventName, params);
  });
}

/** Standard conversion + paired Brokwise custom event (same user intent, richer breakdown). */
export function trackWithBrokwiseCustom(
  standardEvent: string,
  standardParams: Record<string, unknown>,
  brokwiseEventName: `BW_${string}`,
  brokwiseExtra: Record<string, unknown> = {},
): void {
  track(standardEvent, standardParams);
  trackCustom(brokwiseEventName, {
    ...standardParams,
    ...brokwiseExtra,
    bw_standard_event: standardEvent,
  });
}

export const metaPixel = {
  pageview,
  track,
  trackCustom,
  trackWithBrokwiseCustom,
};

/** @deprecated Use metaPixel.track */
export const event = track;
