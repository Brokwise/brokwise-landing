import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { PEOPLE } from "./content";

/** Illustrative preview cards for the public directory. */
const PREVIEW = [
  { name: "Amit Jain", type: "Individual broker", city: "Jaipur", img: PEOPLE[0], tags: ["Residential", "Buy"] },
  { name: "Priya Verma", type: "Channel partner", city: "Noida", img: PEOPLE[5], tags: ["Residential", "Rent"] },
  { name: "Rajesh Sharma", type: "Individual broker", city: "Jaipur", img: PEOPLE[4], tags: ["Land", "Commercial"] },
];

export default function Directory() {
  return (
    <section id="directory" className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-v2-navy p-8 md:p-12">
          <div className="v2-dotgrid absolute inset-0 opacity-30" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            {/* Copy */}
            <div>
              <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-v2-gold">
                Public directory
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.5rem]">
                Find a verified broker who knows your neighbourhood.
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/65">
                Browse RERA-verified brokers, agencies and channel partners by city,
                area and specialisation - then send an enquiry. Their contact stays
                private until they reach out to you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
                <Link
                  href="/directory"
                  className="group inline-flex items-center gap-2 rounded-full bg-v2-gold px-7 py-3 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
                >
                  Explore the directory
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <span className="text-sm text-white/50">Free to browse · No login</span>
              </div>
            </div>

            {/* Preview cards */}
            <div className="flex flex-col gap-3">
              {PREVIEW.map((b) => (
                <div
                  key={b.name}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                    <Image src={b.img} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate font-display text-[15px] font-bold text-white">
                        {b.name}
                      </span>
                      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-label="RERA verified" />
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-white/50">
                      <MapPin className="h-3 w-3" /> {b.type} · {b.city}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {b.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-v2-gold/10 px-2 py-0.5 text-[10.5px] font-medium text-v2-gold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
