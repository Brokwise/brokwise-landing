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

/**
 * Counter incremented while our own code is issuing a PageView so the proxy
 * guard knows to let it through instead of treating it as an external duplicate.
 */
let bwPageViewInProgress = 0;

/** True once the fbq proxy has been installed. */
let guardInstalled = false;

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

/**
 * Polls until fbevents.js has fully initialised (signalled by callMethod being
 * set on the fbq object), then installs a proxy on window.fbq that silently
 * drops any PageView fired by an external source (e.g. a GTM pixel tag) for
 * the route our code already tracked.
 */
function installPageViewGuard(): void {
  if (guardInstalled || typeof window === "undefined") return;
  const original = window.fbq;
  if (!original) return;
  guardInstalled = true;

  const guarded: FbqFn = (cmd, ...rest) => {
    const isPageView =
      (cmd === "track" && rest[0] === "PageView") ||
      (cmd === "trackSingle" && rest[1] === "PageView");

    if (isPageView && bwPageViewInProgress === 0) {
      const currentKey = `${window.location.pathname}${window.location.search}`;
      if (currentKey === lastPageViewRouteKey) return;
    }

    original(cmd, ...rest);
  };

  // Preserve fbq's own properties (callMethod, queue, loaded, version …)
  Object.assign(guarded, original);
  window.fbq = guarded;
}

function whenFbqFullyLoaded(run: () => void): void {
  if (typeof window === "undefined") return;
  const started = Date.now();
  const tick = () => {
    const fbq = window.fbq as FbqFn & { callMethod?: unknown };
    if (typeof fbq === "function" && typeof fbq.callMethod === "function") {
      run();
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
    bwPageViewInProgress++;
    fbq("trackSingle", FB_PIXEL_ID, "PageView");
    bwPageViewInProgress--;
  });

  // After fbevents.js is fully ready, proxy window.fbq so any external source
  // (e.g. a GTM-managed pixel tag) cannot fire a duplicate PageView for the
  // same route.
  whenFbqFullyLoaded(installPageViewGuard);
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
