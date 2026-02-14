"use client";

import React from 'react'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'
const CTA = () => {
    const router = useRouter()
    return (
        <section className="py-24 md:py-32 relative overflow-hidden bg-transparent">
            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-10">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/10 backdrop-blur-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="font-normal tracking-wide text-white">Get Flat 90% off for the first month</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1]">
                        Ready to Transform Your <br className="hidden md:block" />
                        <span className="text-white">Brokerage Business?</span>
                    </h2>

                    <p className="text-lg md:text-xl text-white max-w-2xl mx-auto font-light leading-relaxed">
                        Join 5,000+ successful brokers who are already using Brokwise to close more deals and scale their business.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                        <button onClick={() => { router.push("https://app.brokwise.com") }} className="group inline-flex h-12 min-w-[160px] items-center justify-center rounded-full bg-primary px-8 text-base font-normal text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                            Get Started
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-full border border-input bg-background/50 backdrop-blur-sm px-8 text-base font-normal shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                            View Pricing
                        </button>
                    </div>

                    {/* Trust/Social Proof */}
                    <div className="pt-8 border-t border-border/40 mt-12 max-w-2xl mx-auto">
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white font-light">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 " />
                                <span>Easy payment options</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 " />
                                <span>No hidden fees</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 " />
                                <span>Cancel anytime</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default CTA
