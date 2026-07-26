import React from "react";
import Image from "next/image";
import { ShieldCheck, Star, BarChart3, AlignLeft, Plus, ArrowUp } from "lucide-react";
import { STEPS, PEOPLE } from "./content";

const MATCH_FACES = [PEOPLE[0], PEOPLE[2], PEOPLE[3], PEOPLE[5]];

function Arrow() {
  return (
    <div className="flex shrink-0 items-center justify-center py-1 md:py-0">
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        className="rotate-90 text-v2-gold md:rotate-0"
        aria-hidden="true"
      >
        <path
          d="M4 10 C 12 10, 12 20, 24 20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M19 15.5 L24.5 20 L19 24.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/** Verified-profile ID card (step 1). */
function ProfileVisual() {
  return (
    <div className="relative rounded-xl border border-white/10 bg-v2-navy p-3.5">
      <div className="flex items-center gap-3">
        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg">
          <Image src={PEOPLE[1]} alt="" fill sizes="44px" className="object-cover" />
        </span>
        <div className="flex-1 space-y-2">
          <div className="h-1.5 rounded-full bg-white/25" />
          <div className="h-1.5 w-4/5 rounded-full bg-white/15" />
          <div className="h-1.5 w-3/5 rounded-full bg-white/10" />
        </div>
      </div>
      <span className="absolute -bottom-2.5 -right-2.5 grid h-8 w-8 place-items-center rounded-xl bg-emerald-500 ring-4 ring-v2-navy-2">
        <ShieldCheck className="h-4 w-4 text-white" />
      </span>
    </div>
  );
}

/** AI-match panel with matched faces (step 2). */
function MatchVisual() {
  return (
    <div className="rounded-xl border border-white/10 bg-v2-navy p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-2 text-white/30">
          <BarChart3 className="h-3.5 w-3.5" />
          <Star className="h-3.5 w-3.5" />
          <AlignLeft className="h-3.5 w-3.5" />
        </div>
        <div className="rounded-lg bg-emerald-500/15 px-3.5 py-2 text-center">
          <p className="text-[10px] font-medium text-emerald-300">AI Match</p>
          <p className="font-display text-lg font-extrabold leading-none text-emerald-400">
            98%
          </p>
        </div>
      </div>
      <div className="mt-3.5 flex justify-center -space-x-2.5">
        {MATCH_FACES.map((src) => (
          <span
            key={src}
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-v2-navy"
          >
            <Image src={src} alt="" fill sizes="32px" className="object-cover" />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Incoming proposal card (step 3). */
function ProposalVisual() {
  return (
    <div className="rounded-xl border border-v2-gold/30 bg-v2-navy p-3.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-white/50">New Proposal</span>
        <Plus className="h-3.5 w-3.5 text-v2-gold" />
      </div>
      <p className="mt-2 font-display text-xl font-bold leading-none text-white">
        ₹2.4 Cr
      </p>
      <p className="mt-1 text-[11px] text-white/40">Gurugram</p>
      <div className="mt-3.5 flex items-center gap-2">
        <span className="flex-1 rounded-lg bg-v2-gold px-3 py-2 text-center text-[11px] font-bold text-v2-ink">
          View Proposal
        </span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-v2-gold/15 text-v2-gold">
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

const VISUALS = [ProfileVisual, MatchVisual, ProposalVisual];

export default function Steps() {
  return (
    <section className="relative overflow-hidden bg-v2-navy pt-28 pb-20 md:pt-32 md:pb-28">
      <div className="v2-dotgrid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold leading-tight tracking-tight text-v2-gold md:text-5xl md:leading-tight">
          How it works?
        </h2>

        <div className="mt-14 flex flex-col items-stretch gap-4 md:flex-row md:gap-2">
          {STEPS.map((step, i) => {
            const Visual = VISUALS[i];
            return (
              <React.Fragment key={step.title}>
                <div className="flex flex-1 flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6 md:p-7">
                  {/* Header: number + title get the full card width, so nothing
                      collides with the visual below. */}
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-v2-gold font-display text-base font-bold text-v2-ink">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight text-white">
                      {step.title}
                    </h3>
                  </div>

                  {/* Body + visual, side by side, vertically centred. */}
                  <div className="mt-6 flex flex-1 items-center gap-4">
                    <p className="min-w-0 flex-1 text-sm leading-relaxed text-white/55">
                      {step.body}
                    </p>
                    <div className="w-[42%] max-w-[170px] shrink-0">
                      <Visual />
                    </div>
                  </div>
                </div>
                {i < STEPS.length - 1 && <Arrow />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
