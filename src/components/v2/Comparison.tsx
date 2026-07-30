import Link from "next/link";
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

        {/* Early-bird pill */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-full border border-v2-ink/15 bg-v2-paper-2 py-1.5 pl-6 pr-1.5">
            <span className="text-sm font-medium text-v2-ink/70">
              Free Early Bird is On...
            </span>
            <Link
              href={REGISTER_URL}
              className="rounded-full bg-v2-navy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-v2-navy-2"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
