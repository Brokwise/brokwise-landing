import React from "react";
import Image from "next/image";
import { STEPS } from "./content";

/** Step illustrations exported from the Figma design. */
const STEP_IMAGES = [
  "/images/steps/step-verified.png",
  "/images/steps/step-requirement.png",
  "/images/steps/step-close.png",
] as const;

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

export default function Steps() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-v2-navy pt-28 pb-20 md:pt-32 md:pb-28"
    >
      <div className="v2-dotgrid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <h2 className="text-center font-display text-3xl font-bold leading-tight tracking-tight text-v2-gold md:text-5xl md:leading-tight">
          How it Works?
        </h2>

        <div className="mt-14 flex flex-col items-stretch gap-4 md:flex-row md:gap-2">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.title}>
              <div className="relative flex flex-1 items-center gap-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-6">
                {/* Copy: number + title + body */}
                <div className="relative z-10 min-w-0 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-v2-gold font-display text-base font-bold text-v2-ink">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold leading-tight text-white">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">
                    {step.body}
                  </p>
                </div>

                {/* Illustration */}
                <div className="relative aspect-square w-[34%] max-w-[120px] shrink-0 self-center">
                  <Image
                    src={STEP_IMAGES[i]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 40vw, 220px"
                    className="object-contain"
                  />
                </div>
              </div>
              {i < STEPS.length - 1 && <Arrow />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
