"use client"
import { sendGTMEvent } from '@next/third-parties/google';
import React, { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { v4 as uuidv4 } from 'uuid';
import { PricingData, TierConfigResponse, pricingDataFallback, transformTierConfig } from '@/lib/config';

type PlanType = 'activation' | 'monthly' | 'quarterly'

const Pricing = () => {
    const [planType, setPlanType] = useState<PlanType>('activation')
    const [pricing, setPricing] = useState<PricingData>(pricingDataFallback)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTierConfig = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/tier-config`)
                const json: TierConfigResponse = await res.json()
                if (json.success) {
                    setPricing(transformTierConfig(json.data))
                }
            } catch {
                // fallback already set
            } finally {
                setLoading(false)
            }
        }
        fetchTierConfig()
    }, [])

    const getPlanLabel = (type: PlanType) => {
        switch (type) {
            case 'activation': return 'Activation Packs'
            case 'monthly': return 'Monthly Subscription'
            case 'quarterly': return '3 Month Subscription'
        }
    }

    const getPlanSubtitle = (type: PlanType) => {
        switch (type) {
            case 'activation': return 'Mandatory First Month'
            case 'monthly': return 'Billed Monthly'
            case 'quarterly': return 'Billed Quarterly'
        }
    }

    return (
        <section id="pricing" className="py-24 bg-background relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-normal tracking-tight mb-4 text-foreground">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-muted-foreground font-light">
                        Choose the perfect plan for your business needs. No hidden fees.
                    </p>

                    <div className="flex flex-col items-center gap-6 mt-8">
                        {/* Plan Type Selector */}
                        <div className="inline-flex flex-wrap justify-center gap-2 p-1 rounded-full bg-secondary border border-border">
                            {(['activation', 'monthly', 'quarterly'] as PlanType[]).map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setPlanType(type)}
                                    className={cn(
                                        "px-6 py-2 rounded-full text-sm font-normal transition-all duration-300",
                                        planType === type
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {getPlanLabel(type)}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm text-primary font-medium">
                            {getPlanSubtitle(planType)}
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricing[planType].map((plan, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "relative rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg flex flex-col bg-card",
                                    plan.popular
                                        ? "border-primary/50 shadow-md scale-105 z-10"
                                        : "border-border hover:border-primary/20"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-xs font-normal tracking-wide">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-xl font-normal text-foreground mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl font-normal text-foreground">₹{plan.price.toLocaleString()}</span>
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
                                                <div className="mt-0.5 p-0.5 rounded-full bg-primary/10 text-primary shrink-0">
                                                    <Check className="w-3 h-3" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    onClick={() => {
                                        const eventId = uuidv4();
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
                                            ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                    )}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Pricing
