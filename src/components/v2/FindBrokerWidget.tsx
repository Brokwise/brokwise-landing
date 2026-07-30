"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { metaPixel } from "@/lib/fpixel";

const DISMISS_KEY = "bw_find_broker_widget_dismissed";

/**
 * Floating "Find a Broker" widget shown on the landing page.
 * Nudges visitors toward the public broker directory. Dismissible for the
 * session and appears after a short scroll so it never blocks the hero.
 */
const FindBrokerWidget = () => {
  const [dismissed, setDismissed] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
    setDismissed(false);

    const reveal = () => {
      if (window.scrollY > 400) {
        setVisible(true);
        window.removeEventListener("scroll", reveal);
      }
    };
    window.addEventListener("scroll", reveal, { passive: true });
    reveal();

    // Fallback: surface it after a few seconds even without scrolling.
    const t = window.setTimeout(() => setVisible(true), 6000);
    return () => {
      window.removeEventListener("scroll", reveal);
      window.clearTimeout(t);
    };
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    // Unmount after the exit transition completes.
    window.setTimeout(() => setDismissed(true), 300);
  };

  const handleBrowse = () =>
    metaPixel.trackWithBrokwiseCustom(
      "Lead",
      { content_name: "V2 Find Broker Widget" },
      "BW_FindBroker_Widget_Click",
      { placement: "landing_floating_widget" },
    );

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-4 right-4 z-40 md:bottom-6 md:right-6",
        "transition-all duration-300 ease-out",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="pointer-events-auto relative w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-white/10 bg-v2-navy/95 p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="v2-dotgrid absolute inset-0 opacity-20" />

        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          className="absolute right-2.5 top-2.5 rounded-full p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white/80"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-v2-gold/15 text-v2-gold">
              <Search className="h-[18px] w-[18px]" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-v2-gold">
                Need a broker?
              </p>
              <h3 className="font-display text-base font-bold leading-tight text-white">
                Find a Broker
              </h3>
            </div>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            Find verified real estate professionals in the Brokwise directory.
          </p>

          <Link
            href="/directory"
            onClick={handleBrowse}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-v2-gold px-5 py-2.5 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
          >
            Browse Brokers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FindBrokerWidget;
