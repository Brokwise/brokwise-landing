"use client";

import React from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { metaPixel } from '@/lib/fpixel'

const CTA = () => {
    const router = useRouter()
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-10">

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#ffffff] leading-[1.1]">
                        Ready to Transform Your <br className="hidden md:block" />
                        Real Estate Business?
                    </h2>

                    <p className="text-lg md:text-xl text-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        Join 5,000+ successful brokers who are already using Brokwise to close more deals and scale their business.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button onClick={() => {
                            metaPixel.trackWithBrokwiseCustom(
                                "Lead",
                                { content_name: "CTA Get Started" },
                                "BW_CTA_AppSignup_Click",
                                { placement: "footer_cta" },
                            );
                            router.push("https://app.brokwise.com")
                        }} className="group inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-[#ffffff] px-8 text-base font-medium text-[#080808] shadow-[0_0_30px_rgba(201,169,110,0.2)] transition-all hover:bg-[#D4BA8A] hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#fcb542] disabled:pointer-events-none disabled:opacity-50">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button onClick={() => {
                            metaPixel.trackCustom("BW_CTA_ScrollToPricing_Click", {
                                content_name: "CTA View Pricing",
                                target_section: "pricing",
                                placement: "footer_cta",
                            });
                            const pricingSection = document.getElementById('pricing');
                            if (pricingSection) {
                                pricingSection.scrollIntoView({ behavior: 'smooth' });
                            }
                        }} className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full border border-[#ffffff]/30 bg-transparent backdrop-blur-sm px-8 text-base font-normal text-[#ffffff] shadow-sm transition-all hover:bg-[#ffffff]/10 hover:border-[#ffffff]/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#ffffff] disabled:pointer-events-none disabled:opacity-50">
                            View Pricing
                        </button>
                    </div>

                    <div className="pt-8 border-t border-[#fcb542]/10 mt-12 max-w-2xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-foreground/60 font-light">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#ffffff]/80" />
                                <span className="text-[#ffffff]/80">Easy payment options</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#ffffff]/80" />
                                <span className="text-[#ffffff]/80">No hidden fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-[#ffffff]/80" />
                                <span className="text-[#ffffff]/80">Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default CTA
