"use client";

import { useEffect } from "react";
import { metaPixel } from "@/lib/fpixel";

/**
 * React runs this component's mount effect more than once for a single landing
 * view: in production the page subtree mounts, unmounts, then remounts within a
 * few milliseconds (and StrictMode double-invokes in dev). Unlike PageView,
 * ViewContent and custom events are not de-duplicated inside fbq, so each run
 * would send Meta a duplicate hit.
 *
 * Guard: emit the landing events at most once per route within a short window.
 * The remount artifact fires within tens of milliseconds, so it collapses to a
 * single hit, while a genuine same-session revisit (seconds later) is allowed to
 * fire again - keeping ViewContent consistent with PageView. Resetting on
 * unmount would not work here because the duplicate is itself a remount.
 */
const DEDUPE_WINDOW_MS = 2000;
let lastEmit: { routeKey: string; at: number } = { routeKey: "", at: 0 };

/** One intentional landing ViewContent (manual-only pixel; full params for Pixel Helper). */
export default function MetaPixelPageEvents() {
  useEffect(() => {
    const routeKey =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : "/";
    const now = Date.now();
    if (
      routeKey === lastEmit.routeKey &&
      now - lastEmit.at < DEDUPE_WINDOW_MS
    ) {
      return;
    }
    lastEmit = { routeKey, at: now };

    metaPixel.track("ViewContent", {
      content_ids: ["brokwise_landing_home"],
      content_type: "product_group",
      content_name: "Brokwise Landing Home",
      content_category: "marketing",
    });
    metaPixel.trackCustom("BW_Landing_Home_Load", {
      surface: "marketing_landing",
      path: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  }, []);

  return null;
}
