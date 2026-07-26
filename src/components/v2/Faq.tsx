"use client";

import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQS } from "./content";

const POINTS = [
  "Verified brokers. Trusted connections. Better opportunities.",
  "Expand your network with real estate professionals nationwide.",
  "Collaborate, refer, and grow together with confidence.",
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-v2-navy py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-[0.85fr_1.15fr] md:px-8">
        <div>
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            <span className="text-v2-gold">F</span>requently{" "}
            <span className="text-v2-gold">A</span>sked{" "}
            <span className="text-v2-gold">Q</span>uestions
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-white/60">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-v2-gold/40 text-v2-gold">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.question}
                className={cn(
                  "rounded-2xl border bg-v2-navy-2 transition-colors",
                  isOpen ? "border-v2-gold/40" : "border-white/10 hover:border-white/20",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base font-medium text-white md:text-lg">
                    {item.question}
                  </span>
                  <span className="shrink-0 text-v2-gold">
                    {isOpen ? <Minus className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
