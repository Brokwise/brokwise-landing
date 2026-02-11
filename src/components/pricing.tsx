"use client"

import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const pricingData = {
    brokers: {
        starter: {
            name: "Starter",
            price: 500,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: false
        },
        essentials: {
            name: "Essentials",
            price: 1000,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: true
        },
        elite: {
            name: "Elite",
            price: 1500,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: false
        }
    },
    channelPartners: {
        foundation: {
            name: "Foundation",
            price: 500,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: false
        },
        growth: {
            name: "Growth",
            price: 1000,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: true
        },
        enterprise: {
            name: "Enterprise",
            price: 1500,
            description: "Access the platform for",
            features: [
                "1000+ Properties",
                "1000+ Buyers",
                "1000+ Sellers",
                "1000+ Leads",
                "1000+ Deals",
                "1000+ Referrals"
            ],
            buttonText: "Get Started",
            popular: false
        }
    }
}

const Pricing = () => {
    const [planType, setPlanType] = useState<'brokers' | 'channelPartners'>('brokers')
    const [duration, setDuration] = useState<3 | 6 | 12>(3)

    const getDurationLabel = (months: number) => {
        if (months === 12) return '1 Year'
        return `${months} Months`
    }

    return (
        <section className="py-24 bg-background relative overflow-hidden font-sans">
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
                        <div className="inline-flex p-1 rounded-full bg-secondary border border-border">
                            <button
                                onClick={() => setPlanType('brokers')}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-normal transition-all duration-300",
                                    planType === 'brokers'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Brokers
                            </button>
                            <button
                                onClick={() => setPlanType('channelPartners')}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-normal transition-all duration-300",
                                    planType === 'channelPartners'
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                Channel Partners
                            </button>
                        </div>

                        {/* Duration Selector */}
                        <div className="inline-flex p-1 rounded-full bg-secondary/50 border border-border/50">
                            {[3, 6, 12].map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setDuration(d as 3 | 6 | 12)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-full text-xs font-normal transition-all duration-300 min-w-[80px]",
                                        duration === d
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {getDurationLabel(d)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {Object.values(pricingData[planType]).map((plan, index) => {
                        const totalPrice = plan.price * duration

                        return (
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
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-normal text-foreground">₹{totalPrice}</span>
                                        <span className="text-muted-foreground font-light text-sm">/{getDurationLabel(duration).toLowerCase()}</span>
                                    </div>
                                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                                        {plan.description} {getDurationLabel(duration).toLowerCase()} at just {totalPrice} INR
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

                                <button className={cn(
                                    "w-full py-3 px-6 rounded-xl text-sm font-normal transition-colors duration-300",
                                    plan.popular
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                )}>
                                    {plan.buttonText}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Pricing
