"use client";

import { useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQS, FAQ_CATEGORIES, type FaqCategory } from "./content";

export default function Faq() {
  const [active, setActive] = useState<FaqCategory>("General");
  const [open, setOpen] = useState<string | null>(null);

  const items = useMemo(
    () => FAQS.filter((f) => f.category === active),
    [active],
  );

  const selectCategory = (category: FaqCategory) => {
    setActive(category);
    setOpen(null);
  };

  return (
    <section id="faq" className="bg-v2-navy py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
            <span className="text-v2-gold">F</span>requently{" "}
            <span className="text-v2-gold">A</span>sked{" "}
            <span className="text-v2-gold">Q</span>uestions
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Everything you need to know about Brokwise, credits, subscriptions, and
            more.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => selectCategory(category)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                active === category
                  ? "bg-v2-gold text-v2-ink"
                  : "text-white/60 hover:text-white",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="mt-10 space-y-3">
          {items.map((item) => {
            const isOpen = open === item.question;
            return (
              <div
                key={item.question}
                className={cn(
                  "rounded-2xl border bg-v2-navy-2 transition-colors",
                  isOpen ? "border-v2-gold/40" : "border-white/10 hover:border-white/20",
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.question)}
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
