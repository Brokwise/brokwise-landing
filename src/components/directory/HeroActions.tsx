"use client";

import { useState } from "react";
import { Phone, Share2, Check } from "lucide-react";
import type { ProfileDetail } from "@/lib/directory/types";
import EnquiryModal from "./EnquiryModal";

/**
 * Primary actions on the profile hero card: open the enquiry form, or share the
 * public profile link. Client-only because both need interactivity; the rest of
 * the hero is server-rendered.
 */
export default function HeroActions({ profile }: { profile: ProfileDetail }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = {
      title: profile.displayName,
      text: `${profile.displayName} on Brokwise`,
      url,
    };
    // Native share sheet on mobile; clipboard fallback on desktop.
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        // User dismissed the sheet - fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  }

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-[220px]">
      <EnquiryModal
        profile={profile}
        renderTrigger={(open) => (
          <button
            type="button"
            onClick={open}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-v2-gold px-6 py-3 text-[14px] font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
          >
            <Phone className="h-4 w-4" /> Contact Now
          </button>
        )}
      />
      <button
        type="button"
        onClick={share}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white transition-all hover:border-white/45 hover:bg-white/5 active:scale-95"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-400" /> Link copied
          </>
        ) : (
          <>
            <Share2 className="h-4 w-4" /> Share
          </>
        )}
      </button>
    </div>
  );
}
