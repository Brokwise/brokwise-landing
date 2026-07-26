"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { metaPixel } from "@/lib/fpixel";
import { CAL, REGISTER_URL } from "./content";

export default function Network() {
  return (
    <section className="relative overflow-hidden bg-v2-navy py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Take a look inside <span className="text-v2-gold">the network.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
            A live feed of verified requirements, validated inventory, and
            AI-matched opportunities - updated in real time. Full details unlock
            the moment you join.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
              className="inline-flex items-center justify-center rounded-full bg-v2-gold px-7 py-3 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
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
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5 active:scale-95"
            >
              Book a demo
            </button>
          </div>
        </div>

        {/* App preview in a browser frame */}
        <div className="relative mx-auto mt-14 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-v2-navy-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-v2-navy px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
            <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-1 text-[11px] text-white/40 sm:inline">
              app.brokwise.com
            </span>
          </div>
          <div className="relative">
            <Image
              src="/app-preview.png"
              alt="Brokwise app - verified property listings and enquiries"
              width={1919}
              height={1079}
              className="block h-auto w-full"
            />
            {/* Fade the lower portion to tease the feed */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-v2-navy-2 via-v2-navy-2/70 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
              <span className="flex items-center gap-2 rounded-full border border-v2-gold/30 bg-v2-navy/85 px-4 py-2 text-xs font-semibold text-v2-gold backdrop-blur-sm">
                <Lock className="h-3.5 w-3.5" /> Unlock full details
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
