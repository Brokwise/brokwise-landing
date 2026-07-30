"use client";

import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import type { ProfileDetail } from "@/lib/directory/types";
import EnquiryModal from "./EnquiryModal";

/**
 * Inline "Interested in this area?" card that sits in the light About band.
 *
 * The textarea is a low-friction entry point: whatever the visitor types here is
 * carried into the full enquiry form (name / phone / area) when they hit Contact
 * Now, so the modal opens pre-filled rather than starting cold.
 */
export default function EnquiryPanel({ profile }: { profile: ProfileDetail }) {
  const [message, setMessage] = useState("");
  const firstName = profile.displayName.trim().split(/\s+/)[0] || "them";

  return (
    <div
      id="enquire"
      className="scroll-mt-28 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(11,21,34,0.45)]"
    >
      <h3 className="font-display text-[22px] font-bold leading-tight tracking-tight text-v2-ink">
        Interested in this area?
      </h3>
      <p className="mt-2.5 text-[13.5px] leading-relaxed text-v2-ink/60">
        Send {profile.displayName} a message about what you&apos;re looking for.
        They&apos;ll get it instantly and reach out to you.
      </p>

      <label className="mono-label mt-5 block text-[11px] font-semibold text-v2-ink/55">
        Message
      </label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        placeholder={`Tell ${firstName} about your property requirements...`}
        className="mt-2 w-full resize-none rounded-xl border border-black/10 bg-[#F5F5F6] px-3.5 py-3 text-[13.5px] text-v2-ink outline-none transition placeholder:text-v2-ink/35 focus:border-v2-gold focus:bg-white"
      />

      <EnquiryModal
        profile={profile}
        initialMessage={message}
        renderTrigger={(open) => (
          <button
            type="button"
            onClick={open}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-v2-gold py-3 text-[15px] font-bold text-v2-ink transition hover:bg-v2-gold-2 active:scale-[0.99]"
          >
            <Mail className="h-4 w-4" /> Contact Now
          </button>
        )}
      />

      <p className="mt-3.5 flex items-start gap-2 rounded-lg bg-[#F5F5F6] px-3 py-2.5 text-[12px] leading-snug text-v2-ink/55">
        <Lock className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-600" />
        We never share their contact details. Your enquiry is delivered privately,
        inside the Brokwise professional portal.
      </p>
    </div>
  );
}
