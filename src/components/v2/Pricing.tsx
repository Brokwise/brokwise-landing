"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import React, { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";
import { PLANS_FALLBACK, PublicPlan, fetchPlans } from "@/lib/plans";
import { metaPixel } from "@/lib/fpixel";
import { APP_URL } from "./content";

type Term = "quarterly" | "annual";

const TERMS: Term[] = ["quarterly", "annual"];

const TERM_LABELS: Record<Term, string> = {
  quarterly: "Quarterly",
  annual: "Annual",
};

const TERM_SUBTITLES: Record<Term, string> = {
  quarterly: "Three months of access, renewing every quarter.",
  annual: "A full year of access at the lowest effective monthly price.",
};

/** The three cards, by term. Monthly has no longer variant. */
const CARD_CODES: Record<Term, string[]> = {
  quarterly: ["MONTHLY", "ESSENTIAL_Q", "PRO_Q"],
  annual: ["MONTHLY", "ESSENTIAL_ANNUAL", "PRO_ANNUAL"],
};

const BADGE_LABELS = {
  most_popular: "Most Popular",
  best_value: "Best Value",
} as const;

const inr = new Intl.NumberFormat("en-IN");
const rupees = (n: number) => `₹${inr.format(n)}`;

function validityLabel(days: number): string {
  if (days === 365) return "12 months";
  if (days % 30 === 0) {
    const months = days / 30;
    return months === 1 ? "30 days" : `${months} months`;
  }
  return `${days} days`;
}

function planPeriod(plan: PublicPlan): string {
  if (plan.kind === "one_time") return "one_time";
  if (plan.validityDays === 365) return "annual";
  if (plan.validityDays >= 90) return "quarterly";
  return "monthly";
}

/** The card's headline saving: the comparison against the next shorter plan. */
function headlineSaving(plan: PublicPlan, byCode: Map<string, PublicPlan>): string | null {
  const saving = [...plan.savings].sort((a, b) => a.multiple - b.multiple)[0];
  if (!saving) return null;
  const comparedTo = byCode.get(saving.comparedTo)?.name ?? saving.comparedTo;
  return `Save ${rupees(saving.saving)} (${saving.savingPercent.toFixed(1)}%) vs ${saving.multiple} x ${comparedTo}`;
}

function features(plan: PublicPlan): { label: string; included: boolean }[] {
  const { limits, network } = plan;
  return [
    { label: `${inr.format(limits.PROPERTY_LISTING)} Listings`, included: true },
    { label: `${inr.format(limits.ENQUIRY_LISTING)} Enquiries`, included: true },
    { label: `${inr.format(limits.SUBMIT_PROPERTY_ENQUIRY)} Proposals`, included: true },
    { label: `${inr.format(limits.REQUEST_CONTACT)} Contact unlocks`, included: true },
    network.access
      ? { label: `${inr.format(network.connectionsPerCycle)} Broker Network connections`, included: true }
      : { label: "Broker Network connections: Not included", included: false },
    network.access
      ? { label: `${inr.format(network.contactUnlocksPerCycle)} Network contact unlocks`, included: true }
      : { label: "Network contact unlocks: Not included", included: false },
  ];
}

export default function Pricing() {
  const [term, setTerm] = useState<Term>("quarterly");
  const [plans, setPlans] = useState<PublicPlan[]>(PLANS_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchPlans().then((fetched) => {
      if (!cancelled && fetched) setPlans(fetched);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const byCode = useMemo(() => new Map(plans.map((p) => [p.code, p])), [plans]);
  const starter = byCode.get("STARTER");
  const cards = CARD_CODES[term]
    .map((code) => byCode.get(code))
    .filter((p): p is PublicPlan => Boolean(p));

  const checkout = (plan: PublicPlan) => {
    const eventId = uuidv4();
    metaPixel.trackWithBrokwiseCustom(
      "InitiateCheckout",
      { content_name: plan.name, content_ids: [plan.code], currency: "INR", value: plan.priceInr },
      "BW_Pricing_PlanCheckout_Click",
      { plan_period: planPeriod(plan), plan_id: plan.code },
    );
    sendGTMEvent({ event: "InitiateCheckout - Landing", plan: plan.code, eventId });
    setTimeout(() => {
      window.location.href = APP_URL;
    }, 300);
  };

  return (
    <section id="pricing" className="bg-v2-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-v2-ink md:text-5xl">
            Choose Your Plan
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-v2-ink/60">
            Simple membership plans with clear allowances. All prices are shown before 18% GST.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex gap-1 rounded-full border border-v2-ink/10 bg-v2-paper-2 p-1"
            >
              {TERMS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTerm(t)}
                  aria-pressed={term === t}
                  className={cn(
                    "rounded-full px-5 py-2 text-sm font-semibold transition-colors md:px-7",
                    term === t
                      ? "bg-v2-gold text-v2-ink shadow-sm"
                      : "text-v2-ink/55 hover:text-v2-ink",
                  )}
                >
                  {TERM_LABELS[t]}
                </button>
              ))}
            </div>
            <p className="text-sm font-medium text-v2-gold-2">{TERM_SUBTITLES[term]}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-start">
          {cards.map((plan) => {
            const saving = headlineSaving(plan, byCode);
            const badge = plan.badge ? BADGE_LABELS[plan.badge] : null;
            const popular = plan.badge === "most_popular";

            return (
              <div
                key={plan.code}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-3xl border bg-v2-paper-2 p-6 md:p-8",
                  badge
                    ? "border-v2-gold shadow-[0_24px_60px_-30px_rgba(11,21,34,0.4)] md:-mt-3 md:pt-11"
                    : "border-black/5",
                )}
              >
                {badge && (
                  <span className="absolute right-0 top-0 rounded-bl-2xl bg-v2-gold px-4 py-1.5 text-xs font-bold text-v2-ink">
                    {badge}
                  </span>
                )}

                <h3 className="text-sm font-semibold uppercase tracking-wide text-v2-ink/50">
                  {plan.name}
                </h3>

                <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                  <span className="font-display text-4xl font-bold text-v2-ink">
                    {rupees(plan.priceInr)}
                  </span>
                  <span className="text-sm text-v2-ink/50">
                    + GST / {validityLabel(plan.validityDays)}
                  </span>
                </div>

                {plan.effectivePerMonth !== null && plan.validityDays > 30 && (
                  <p className="mt-1 text-sm font-medium text-v2-ink/70">
                    Effective {rupees(plan.effectivePerMonth)} / month
                  </p>
                )}

                {saving && (
                  <p className="mt-3 self-start rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {saving}
                  </p>
                )}

                <ul className="mt-6 mb-4 flex-1 space-y-3.5">
                  {features(plan).map((f) => (
                    <li key={f.label} className="flex items-start gap-3 text-sm text-v2-ink/75">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-v2-gold/20 text-v2-gold-2">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {f.label}
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-xs text-v2-ink/45">Allowances apply per plan period.</p>

                <button
                  onClick={() => checkout(plan)}
                  className={cn(
                    "w-full rounded-full py-3 text-sm font-semibold transition-all active:scale-95",
                    popular
                      ? "bg-v2-gold text-v2-ink hover:bg-v2-gold-2"
                      : "border border-v2-ink/15 text-v2-ink hover:bg-v2-ink hover:text-white",
                  )}
                >
                  Get {plan.name}
                </button>
              </div>
            );
          })}
        </div>

        {starter && (
          <div className="mt-8 flex flex-col gap-5 rounded-3xl border border-black/5 bg-v2-paper-2 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-v2-ink/50">
                {starter.name} - one-time intro
              </h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-2">
                <span className="font-display text-3xl font-bold text-v2-ink">
                  {rupees(starter.priceInr)}
                </span>
                <span className="text-sm text-v2-ink/50">
                  + GST / {validityLabel(starter.validityDays)}, one-time
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-v2-ink/70">
                {features(starter).map((f) => (
                  <li key={f.label} className="flex items-center gap-1.5">
                    {f.included ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-v2-gold-2" strokeWidth={3} />
                    ) : (
                      <X className="h-3.5 w-3.5 shrink-0 text-v2-ink/35" strokeWidth={3} />
                    )}
                    <span className={f.included ? undefined : "text-v2-ink/45"}>{f.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => checkout(starter)}
              className="w-full shrink-0 rounded-full border border-v2-ink/15 px-8 py-3 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-ink hover:text-white active:scale-95 md:w-auto"
            >
              Get {starter.name}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
