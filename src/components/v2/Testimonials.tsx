"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "./content";

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-v2-navy pb-20 pt-16 md:pb-28 md:pt-36"
    >
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.75rem]">
          Why Brokers Trust <span className="text-v2-gold">Brokwise</span>
        </h2>
      </div>

      <div className="v2-marquee relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-v2-navy to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-v2-navy to-transparent md:w-28" />

        <div className="v2-marquee-track flex w-max gap-5 px-5">
          {loop.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[300px] shrink-0 flex-col rounded-2xl border border-white/10 bg-v2-navy-2 p-6 md:w-[360px]"
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-v2-gold text-v2-gold" />
                ))}
              </div>
              <blockquote className="mb-7 flex-1 text-[15px] leading-relaxed text-white/80">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-v2-gold/25">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-white">{t.name}</span>
                  <span className="text-xs text-white/50">
                    {t.role}, {t.location}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
