"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import {
  PricingData,
  TierConfigResponse,
  pricingDataFallback,
  transformTierConfig,
} from "@/lib/config";
import { metaPixel } from "@/lib/fpixel";
import { APP_URL } from "./content";

type PlanType = "monthly" | "quarterly";

export default function Pricing() {
  const planType: PlanType = "monthly";
  const [pricing, setPricing] = useState<PricingData>(pricingDataFallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/tier-config`,
        );
        const json: TierConfigResponse = await res.json();
        if (json.success) setPricing(transformTierConfig(json.data));
      } catch {
        /* fallback already set */
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const checkout = (buttonId: string, name: string, price: number) => {
    const eventId = uuidv4();
    metaPixel.trackWithBrokwiseCustom(
      "InitiateCheckout",
      { content_name: name, content_ids: [buttonId], currency: "INR", value: price },
      "BW_Pricing_PlanCheckout_Click",
      { plan_period: planType, plan_id: buttonId },
    );
    sendGTMEvent({ event: "InitiateCheckout - Landing", plan: buttonId, eventId });
    setTimeout(() => {
      window.location.href = APP_URL;
    }, 300);
  };

  return (
    <section id="pricing" className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-v2-ink md:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-v2-ink/60">
            Start with 25 free credits and pay only when you need more. No hidden fees.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-v2-gold" />
          </div>
        ) : (
          <div className="mt-14 grid gap-6 md:grid-cols-3 md:items-start">
            {pricing[planType].map((plan) => (
              <div
                key={plan.buttonId}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-3xl border bg-v2-paper-2 p-8",
                  plan.popular
                    ? "border-v2-gold shadow-[0_24px_60px_-30px_rgba(11,21,34,0.4)] md:-mt-3 md:pt-11"
                    : "border-black/5",
                )}
              >
                {plan.popular && (
                  <span className="absolute right-0 top-0 rounded-bl-2xl bg-v2-gold px-4 py-1.5 text-xs font-bold text-v2-ink">
                    Most Popular
                  </span>
                )}

                <h3 className="text-sm font-semibold uppercase tracking-wide text-v2-ink/50">
                  {plan.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-bold text-v2-ink">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-v2-ink/50">
                    {planType === "monthly" ? "/month" : "/3 months"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-v2-ink/40">18% GST</p>
                <p className="mt-3 text-sm text-v2-ink/60">{plan.description}</p>

                <ul className="mt-7 mb-8 flex-1 space-y-3.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-v2-ink/75">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-v2-gold/20 text-v2-gold-2">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => checkout(plan.buttonId, plan.name, plan.price)}
                  className={cn(
                    "w-full rounded-full py-3 text-sm font-semibold transition-all active:scale-95",
                    plan.popular
                      ? "bg-v2-gold text-v2-ink hover:bg-v2-gold-2"
                      : "border border-v2-ink/15 text-v2-ink hover:bg-v2-ink hover:text-white",
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
