import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { COMPARISON, REGISTER_URL } from "./content";

export default function Comparison() {
  return (
    <section id="why-brokwise" className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-v2-ink md:text-5xl">
            The Old Way of Brokering is Holding You Back
          </h2>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {/* Traditional */}
          <div className="rounded-3xl border border-black/5 bg-v2-paper-2 p-7 md:p-9">
            <h3 className="mb-6 font-display text-xl font-bold text-v2-ink md:text-2xl">
              The Traditional Method
            </h3>
            <ul className="space-y-4">
              {COMPARISON.map((row) => (
                <li
                  key={row.old}
                  className="flex items-center gap-3 text-[15px] text-v2-ink/70"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.oldIcon} alt="" className="h-7 w-7 shrink-0" />
                  {row.old}
                </li>
              ))}
            </ul>
          </div>

          {/* Brokwise */}
          <div className="rounded-3xl border border-v2-gold/25 bg-v2-navy p-7 shadow-[0_24px_60px_-24px_rgba(11,21,34,0.5)] md:p-9">
            <h3 className="mb-6 font-display text-xl font-bold text-white md:text-2xl">
              The Brokwise Method
            </h3>
            <ul className="space-y-4">
              {COMPARISON.map((row) => (
                <li
                  key={row.brokwise}
                  className="flex items-center gap-3 text-[15px] text-white/85"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={row.newIcon} alt="" className="h-7 w-7 shrink-0" />
                  {row.brokwise}
                </li>
              ))}
            </ul>
          </div>

          {/* VS badge */}
          <div className="absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-v2-paper bg-v2-gold font-display text-lg font-bold text-v2-ink shadow-lg">
              VS
            </span>
          </div>
        </div>

        {/* Early-bird pill - matches the hero capsule */}
        <div className="mt-12 flex justify-center">
          <div className="group relative inline-flex">
            <Link
              href={REGISTER_URL}
              className="relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-v2-gold/35 bg-v2-ink/95 py-3.5 pl-7 pr-6 backdrop-blur-md transition-transform hover:scale-[1.02] active:scale-95"
            >
              {/* Warm gradient tint inside */}
              <span className="absolute inset-0 bg-gradient-to-r from-v2-gold/10 via-transparent to-v2-gold/10 pointer-events-none" />
              {/* Top highlight line */}
              <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-v2-gold/55 to-transparent" />

              {/* Glowing live dot */}
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-v2-gold opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-v2-gold" />
              </span>

              <Sparkles className="h-4 w-4 shrink-0 text-v2-gold/70" aria-hidden />

              <span className="relative whitespace-nowrap text-sm font-semibold tracking-wide text-v2-gold">
                Free Early Bird is On - Join Now
              </span>

              <ArrowRight className="relative h-4 w-4 shrink-0 text-v2-gold transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
