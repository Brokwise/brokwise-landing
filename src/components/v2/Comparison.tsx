import { XCircle, CheckCircle2 } from "lucide-react";
import { COMPARISON } from "./content";

export default function Comparison() {
  return (
    <section className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-v2-gold-2">
            Why Brokwise?
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-v2-ink md:text-5xl">
            The old way of brokering is holding you back.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-v2-ink/60 md:text-lg">
            See how a private, verified network changes the day-to-day - from how
            you find demand to how you protect every deal.
          </p>
        </div>

        <div className="relative mt-14 grid gap-5 md:grid-cols-2 md:gap-6">
          {/* Traditional */}
          <div className="rounded-3xl border border-black/5 bg-v2-paper-2 p-7 md:p-9">
            <h3 className="mb-6 font-display text-xl font-bold text-v2-ink md:text-2xl">
              The traditional method
            </h3>
            <ul className="space-y-4">
              {COMPARISON.map((row) => (
                <li key={row.old} className="flex items-start gap-3 text-[15px] text-v2-ink/70">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500/80" />
                  {row.old}
                </li>
              ))}
            </ul>
          </div>

          {/* Brokwise */}
          <div className="rounded-3xl border border-v2-gold/25 bg-v2-navy p-7 shadow-[0_24px_60px_-24px_rgba(11,21,34,0.5)] md:p-9">
            <h3 className="mb-6 font-display text-xl font-bold text-white md:text-2xl">
              The Brokwise method
            </h3>
            <ul className="space-y-4">
              {COMPARISON.map((row) => (
                <li key={row.brokwise} className="flex items-start gap-3 text-[15px] text-white/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-v2-gold" />
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
      </div>
    </section>
  );
}
