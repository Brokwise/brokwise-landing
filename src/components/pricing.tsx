"use client"
import { sendGTMEvent } from '@next/third-parties/google';
import React, { useState, useRef } from 'react'
import { Check, Loader2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid';
import { pricingDataFallback, transformTierConfig } from '@/lib/config';
import HexPattern from './HexPattern';
import { metaPixel } from '@/lib/fpixel';
import { useTierConfig } from '@/hooks/useTierConfig';

type PlanType = 'monthly' | 'quarterly'

const featureContextByIndex: (string | null)[] = [
    "Add property to marketplace",
    "Add buyer requirement",
    "Respond to requirement",
    null,
]

const Pricing = () => {
    const [planType, setPlanType] = useState<PlanType>('monthly')
    const { data: tierConfig, loading } = useTierConfig()

    // Derive pricing from the shared tier-config response.
    // Falls back to the hardcoded defaults if the API is unavailable.
    const pricing =
        tierConfig?.success
            ? transformTierConfig(tierConfig.data)
            : pricingDataFallback

    const getPlanLabel = (type: PlanType) => {
        switch (type) {
            case 'monthly': return 'Monthly'
            case 'quarterly': return '3-Month'
        }
    }

    const getPlanSubtitle = (type: PlanType) => {
        switch (type) {
            case 'monthly': return 'Structured monthly access for consistent professional deal flow.'
            case 'quarterly': return 'Extended premium access for sustained market expansion.'
        }
    }

    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scrollNext = () => {
        if (!scrollContainerRef.current?.children.length) return
        const cardWidth = (scrollContainerRef.current.children[0] as HTMLElement).clientWidth
        scrollContainerRef.current.scrollBy({ left: cardWidth + 20, behavior: 'smooth' })
    }

    return (
        <section id="pricing" className="md:py-24 py-4 bg-background relative overflow-hidden font-sans">
            <HexPattern id="hexPricing" fade="top" opacity={0.05} size={48} />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-serif font-medium tracking-tight mb-4 text-[#fcb542]">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-muted-foreground font-light">
                        Choose the perfect plan for your business needs. No hidden fees.
                    </p>

                    <div className="flex flex-col items-center gap-6 mt-8">
                        <div className="inline-flex justify-center gap-2 p-1 rounded-full bg-secondary border border-[#fcb542]/10">
                            {(['monthly', 'quarterly'] as PlanType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPlanType(type)}
                                    className={cn(
                                        "px-2 md:px-6 py-2 rounded-full md:text-sm text-xs font-normal transition-all duration-300",
                                        planType === type
                                            ? "bg-[#fcb542] text-[#080808] shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {getPlanLabel(type)}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-[#fcb542] font-medium">
                            {getPlanSubtitle(planType)}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-[#fcb542]" />
                    </div>
                ) : (
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 max-w-7xl md:mx-auto overflow-x-auto snap-x snap-mandatory py-8 px-4 md:px-0 -mx-4 scrollbar-hide"
                        >
                            {pricing[planType].map((plan) => (
                                <div
                                    key={`${plan.buttonId}-${planType}`}
                                    className={cn(
                                        "min-w-[85vw] md:min-w-0 snap-center md:snap-align-none relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-[0_8px_30px_rgba(201,169,110,0.08)] flex flex-col bg-card",
                                        plan.popular
                                            ? "border-[#fcb542]/40 shadow-[0_0_30px_rgba(201,169,110,0.1)] md:scale-105 z-10"
                                            : "border-[#fcb542]/10 hover:border-[#fcb542]/25"
                                    )}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#fcb542] text-[#080808] px-4 py-1 rounded-full text-xs font-medium tracking-wide">
                                            MOST POPULAR
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-xl font-normal text-foreground mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-1 mb-1">
                                            <span className="text-4xl font-serif font-medium text-[#fcb542]">₹{plan.price.toLocaleString()}</span>
                                            <span className="text-muted-foreground font-light text-sm">
                                                {planType === 'monthly' ? '/month' : planType === 'quarterly' ? '/3 months' : '/pack'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground font-light mb-4">
                                            + 18% GST
                                        </p>
                                        <p className="text-muted-foreground font-light text-sm leading-relaxed">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <div className="flex-1 mb-8">
                                        <ul className="space-y-4">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-light">
                                                    <div className="mt-0.5 p-0.5 rounded-full bg-[#fcb542]/10 text-[#fcb542] shrink-0">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                    <div>
                                                        <p>{feature}</p>
                                                        {featureContextByIndex[i] && (
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {featureContextByIndex[i]}
                                                            </p>
                                                        )}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => {
                                            const eventId = uuidv4();
                                            metaPixel.trackWithBrokwiseCustom(
                                                "InitiateCheckout",
                                                {
                                                    content_name: plan.name,
                                                    content_ids: [plan.buttonId],
                                                    currency: "INR",
                                                    value: plan.price,
                                                },
                                                "BW_Pricing_PlanCheckout_Click",
                                                {
                                                    plan_period: planType,
                                                    plan_id: plan.buttonId,
                                                },
                                            );
                                            sendGTMEvent({
                                                event: "InitiateCheckout - Landing",
                                                plan: plan.buttonId,
                                                eventId: eventId,
                                            });
                                            setTimeout(() => {
                                                window.location.href = "https://app.brokwise.com";
                                            }, 300);
                                        }}
                                        className={cn(
                                            "w-full py-3 px-6 rounded-xl text-sm font-normal transition-colors duration-300",
                                            plan.popular
                                                ? "bg-[#fcb542] text-[#080808] hover:bg-[#D4BA8A]"
                                                : "bg-[#fcb542]/10 text-[#fcb542] border border-[#fcb542]/20 hover:bg-[#fcb542]/20"
                                        )}>
                                        {plan.buttonText}
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={scrollNext}
                            className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-[#080808]/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-[#fcb542]/20 text-[#fcb542] hover:bg-[#fcb542]/10 transition-colors"
                            aria-label="Next plan"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Pricing
