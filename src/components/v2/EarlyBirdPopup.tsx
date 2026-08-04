"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { metaPixel } from "@/lib/fpixel";
import { REGISTER_URL } from "./content";

/** localStorage key - once set, the popup never shows again for this visitor. */
const SEEN_KEY = "brokwise_earlybird_popup_seen";

/** Element in the hero (Hero.tsx) that marks the end of the hero copy. */
const HERO_MARKER_ID = "hero-copy-end";

function alreadySeen(): boolean {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen(): void {
  try {
    localStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Ignore (private mode / storage disabled) - popup simply may reappear.
  }
}

/**
 * Scroll-triggered Early Bird offer popup.
 *
 * Opens the first time a visitor scrolls below the hero copy, then remembers
 * the dismissal in localStorage so it never shows again. Centered modal with a
 * dimmed, click-to-close overlay; also closes on the X button and Esc.
 */
export default function EarlyBirdPopup() {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Watch the hero-copy marker; open once it has scrolled above the viewport.
  useEffect(() => {
    if (alreadySeen()) return;

    const marker = document.getElementById(HERO_MARKER_ID);
    if (!marker) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Fire only when the marker has left the viewport upward (scrolled past),
        // not when it is still below the fold on initial load.
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  const dismiss = useCallback(() => {
    markSeen();
    setOpen(false);
  }, []);

  // Fire the view event once, lock body scroll, wire Esc, and focus the dialog.
  useEffect(() => {
    if (!open) return;

    metaPixel.trackWithBrokwiseCustom(
      "ViewContent",
      { content_name: "V2 Early Bird Popup" },
      "BW_EarlyBird_Popup_View",
      { placement: "v2_scroll_popup" },
    );

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, dismiss]);

  const handleClaim = useCallback(() => {
    metaPixel.trackWithBrokwiseCustom(
      "Lead",
      { content_name: "V2 Early Bird Popup Claim" },
      "BW_EarlyBird_Popup_Claim_Click",
      { placement: "v2_scroll_popup" },
    );
    markSeen();
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-5 duration-200 animate-in fade-in"
      onClick={dismiss}
    >
      {/* Dimmed overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="earlybird-title"
        aria-describedby="earlybird-desc"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-v2-gold/40 bg-v2-navy-2 p-8 text-center text-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] duration-200 animate-in fade-in zoom-in-95"
      >
        {/* Soft gold glow behind the card top */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-v2-gold/20 blur-3xl"
        />

        <button
          ref={closeButtonRef}
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-v2-gold/60"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative">
          {/* Pulse-dot accent (matches the hero promo pill motif) */}
          <span className="mx-auto mb-5 flex h-3 w-3">
            <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-v2-gold opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-v2-gold" />
          </span>

          <h2
            id="earlybird-title"
            className="font-display text-3xl font-bold leading-tight text-v2-gold"
          >
            Early Bird is Live
          </h2>

          <p id="earlybird-desc" className="mt-3 text-base text-white/80">
            Get 3 months free when you sign up today.
          </p>

          <Link
            href={REGISTER_URL}
            onClick={handleClaim}
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-v2-gold px-7 py-3.5 text-base font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
          >
            Claim Offer
          </Link>
        </div>
      </div>
    </div>
  );
}
