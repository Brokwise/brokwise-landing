"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { metaPixel } from "@/lib/fpixel";
import { CAL, CTA_CHECKLIST, REGISTER_URL } from "./content";

export default function CtaBand() {
  return (
    <section className="bg-v2-paper px-5 py-4 md:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-v2-navy">
        {/* City backdrop, right side */}
        <div className="absolute inset-0">
          <Image
            src="/hero.webp"
            alt=""
            fill
            className="object-cover object-right opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-v2-navy via-v2-navy/90 to-v2-navy/40" />
        </div>

        <div className="relative grid gap-8 p-8 md:grid-cols-[1.2fr_1fr] md:items-center md:p-12">
          <div>
            <h2 className="max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[2.5rem]">
              Ready to receive your first high-intent requirement?
            </h2>
            <p className="mt-4 max-w-sm text-base text-white/65">
              Join 5,000+ verified brokers already closing more deals on Brokwise.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <ul className="grid grid-cols-1 gap-3">
              {CTA_CHECKLIST.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-white/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-v2-gold/50 text-v2-gold">
                    <Check className="h-3 w-3" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                data-cal-namespace={CAL.namespace}
                data-cal-link={CAL.link}
                data-cal-config={CAL.config}
                onClick={() =>
                  metaPixel.trackWithBrokwiseCustom(
                    "Schedule",
                    { content_name: "V2 CTA Band Book a Demo" },
                    "BW_CTA_BookDemo_Click",
                    { placement: "v2_cta_band" },
                  )
                }
                className="inline-flex items-center justify-center rounded-full bg-v2-gold px-6 py-3 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
              >
                Request a Live Demo
              </button>
              <Link
                href={REGISTER_URL}
                onClick={() =>
                  metaPixel.trackWithBrokwiseCustom(
                    "Lead",
                    { content_name: "V2 CTA Band Join Now" },
                    "BW_CTA_AppSignup_Click",
                    { placement: "v2_cta_band" },
                  )
                }
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5 active:scale-95"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
