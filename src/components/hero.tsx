"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "30min" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden pt-10 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Modern Real Estate Architecture"
          fill
          className="object-cover object-center opacity-70"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-[#080808]/20 to-background" />
        <div className="absolute -bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium tracking-tight text-[#fcb542] leading-[1.1]">
          Where Brokers Connect, <br className="hidden md:block" />
          Collaborate & Close Deals.
        </h1>

        <p className="text-lg md:text-xl text-foreground/70 font-light max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform that helps real estate brokers list properties, find matching buyers, and scale their business effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
          <button
            className="group inline-flex items-center justify-center rounded-full bg-[#fcb542] md:px-8 md:py-4 px-4 py-2 text-base font-medium text-[#080808] transition-all duration-300 hover:bg-[#D4BA8A] hover:scale-105 active:scale-95 shadow-[0_0_30px_-5px_rgba(201,169,110,0.3)] hover:shadow-[0_0_40px_-5px_rgba(201,169,110,0.5)]"
            data-cal-namespace="30min"
            data-cal-link="anshul-sharma/30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            <Calendar className="mr-2 h-4 w-4 transition-transform group-hover:-rotate-12" />
            Book a Demo
          </button>
          <Link
            href="https://app.brokwise.com"
            className="group inline-flex items-center justify-center rounded-full border border-[#fcb542]/30 bg-transparent md:px-8 md:py-4 px-4 py-2 text-base font-medium text-[#fcb542] transition-all duration-300 hover:bg-[#fcb542]/10 hover:border-[#fcb542]/50 hover:scale-105 active:scale-95"
          >
            Get started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
