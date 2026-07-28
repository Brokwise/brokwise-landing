"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, UserPlus, ShieldCheck, Star, StarHalf } from "lucide-react";
import { getCalApi } from "@calcom/embed-react";
import { metaPixel } from "@/lib/fpixel";
import { CAL, HERO_BULLETS, REGISTER_URL, STATS } from "./content";

const DEFAULT_PROMO = {
  enabled: true,
  label: "Claim Your 25 Free Credits with Our Early Bird Offer",
};

export default function Hero() {
  const [promo, setPromo] = useState(DEFAULT_PROMO);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL.namespace });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!base) return;
    const controller = new AbortController();
    fetch(`${base}/admin/tier-config`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        const b = json?.data?.publicPromoBanner;
        if (!b || typeof b.enabled !== "boolean") return;
        const label =
          typeof b.label === "string" && b.label.trim().length > 0
            ? b.label.trim()
            : DEFAULT_PROMO.label;
        setPromo({ enabled: b.enabled, label });
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  return (
    <section className="relative z-10 bg-[#040B14] text-white">
      {/* Background image + gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/hero-new.png"
          alt="Two brokers shaking hands over a connected city network"
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-90"
        />
        {/* Darken the left so the copy stays legible over the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#040B14] via-[#040B14]/90 to-transparent" />
        {/* Fade the bottom into the next section's navy so the seam is seamless */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040B14]/80 via-transparent to-v2-navy" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-28 pt-32 md:px-8 md:pb-32 md:pt-44">
        <div className="max-w-2xl">
          {promo.enabled && (
            <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-v2-gold/40 bg-v2-gold/10 px-4 py-2 text-sm font-semibold text-v2-gold">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-v2-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-v2-gold" />
              </span>
              {promo.label}
            </div>
          )}

          <h1 className="font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-[4.2rem]">
            <span className="text-v2-mist">India&apos;s Verified Network for</span>
            <br />
            <span className="text-v2-gold">Real Estate Brokers.</span>
          </h1>

          <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {HERO_BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-[15px] text-white/85">
                <ShieldCheck className="h-5 w-5 shrink-0 text-v2-gold" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <button
              type="button"
              data-cal-namespace={CAL.namespace}
              data-cal-link={CAL.link}
              data-cal-config={CAL.config}
              onClick={() =>
                metaPixel.trackWithBrokwiseCustom(
                  "Schedule",
                  { content_name: "V2 Hero Book a Demo" },
                  "BW_Hero_BookDemo_Click",
                  { placement: "v2_hero" },
                )
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-v2-gold px-7 py-3.5 text-base font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.02] active:scale-95"
            >
              <CalendarDays className="h-5 w-5" />
              Request a Live Demo
            </button>
            <Link
              href={REGISTER_URL}
              onClick={() =>
                metaPixel.trackWithBrokwiseCustom(
                  "Lead",
                  { content_name: "V2 Hero Register" },
                  "BW_Hero_AppSignup_Click",
                  { placement: "v2_hero" },
                )
              }
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-v2-gold/40 bg-white/5 px-7 py-3.5 text-base font-semibold text-v2-gold transition-all hover:border-v2-gold/70 hover:bg-v2-gold/10 active:scale-95"
            >
              <UserPlus className="h-5 w-5" />
              Join Now
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-9 flex flex-col gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-v2-gold text-v2-gold" />
              ))}
              <StarHalf className="h-5 w-5 fill-v2-gold text-v2-gold" />
            </div>
            <span className="text-sm font-semibold text-white/80">
              Trusted by top brokers across India
            </span>
          </div>
        </div>

      </div>

      {/* Stats bar — floats across the hero / next-section boundary */}
      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md md:grid-cols-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3.5 bg-v2-navy-2/80 px-6 py-6"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/[0.06]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.icon} alt="" className="h-6 w-6" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-v2-gold md:text-3xl">
                    {s.value}
                  </span>
                  <span className="text-sm text-white/60">{s.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
