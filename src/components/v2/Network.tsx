"use client";

import Image from "next/image";
import Link from "next/link";
import { metaPixel } from "@/lib/fpixel";
import { CAL, REGISTER_URL } from "./content";

export default function Network() {
  return (
    <section className="relative overflow-hidden bg-v2-navy py-20 md:py-28">
      <div className="v2-dotgrid absolute inset-0 opacity-30" />

      {/* Teaser feed bleeding off the right edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] items-center overflow-hidden md:flex lg:w-[54%]">
        <Image
          src="/app-preview.png"
          alt=""
          width={1919}
          height={1079}
          className="h-auto w-[135%] max-w-none -ml-[15%] rounded-xl opacity-90"
        />
        {/* Fade only the left edge into navy so the copy stays readable; the grid shows across the rest */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1522,#0B1522_10%,transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-xl">
          <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-v2-gold">
            Preview
          </p>
          <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-[3.5rem]">
            Take a look inside the <span className="text-v2-gold">Network.</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/65">
            A live feed of verified requirements, validated inventory, and
            AI-matched opportunities - updated in real time. Full details unlock
            the moment you join.
          </p>
          <div className="mt-8 flex gap-3.5">
            <Link
              href={REGISTER_URL}
              onClick={() =>
                metaPixel.trackWithBrokwiseCustom(
                  "Lead",
                  { content_name: "V2 Network Register" },
                  "BW_Network_AppSignup_Click",
                  { placement: "v2_network" },
                )
              }
              className="inline-flex items-center justify-center rounded-full bg-v2-gold px-8 py-3 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
            >
              Register
            </Link>
            <button
              type="button"
              data-cal-namespace={CAL.namespace}
              data-cal-link={CAL.link}
              data-cal-config={CAL.config}
              onClick={() =>
                metaPixel.trackWithBrokwiseCustom(
                  "Schedule",
                  { content_name: "V2 Network Demo" },
                  "BW_Network_BookDemo_Click",
                  { placement: "v2_network" },
                )
              }
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5 active:scale-95"
            >
              Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
