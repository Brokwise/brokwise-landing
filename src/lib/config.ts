export type PlanCard = {
    name: string
    price: number
    description: string
    features: string[]
    buttonText: string
    popular: boolean
    buttonId: string
}

export type PricingData = {
    monthly: PlanCard[]
    quarterly: PlanCard[]
}

type TierName = "BASIC" | "ESSENTIAL" | "PRO"

type TierLimits = Record<TierName, {
    PROPERTY_LISTING: number
    ENQUIRY_LISTING: number
    SUBMIT_PROPERTY_ENQUIRY: number
}>

type TierPricing = Record<TierName, number>

type TierCredits = Record<TierName, number>

export type TierConfigResponse = {
    success: boolean
    data: {
        tierLimits: TierLimits
        pricing: {
            monthlyPricing: TierPricing
            quarterlyPricing: TierPricing
        }
        credits: {
            monthlyCredits: TierCredits
            quarterlyCredits: TierCredits
        }
        publicPromoBanner?: {
            enabled: boolean
            label: string
        }
    }
}

const TIER_ORDER: TierName[] = ["BASIC", "ESSENTIAL", "PRO"]

const TIER_META: Record<TierName, { displayName: string; popular: boolean }> = {
    BASIC: { displayName: "Basic", popular: false },
    ESSENTIAL: { displayName: "Essential", popular: true },
    PRO: { displayName: "Pro", popular: false },
}

const PLAN_META: Record<"monthly" | "quarterly", {
    descriptions: Record<TierName, string>
    buttonText: string
    featureSuffix: string
    creditsSuffix: string
}> = {
    monthly: {
        descriptions: {
            BASIC: "Monthly subscription",
            ESSENTIAL: "Most popular monthly plan",
            PRO: "Maximum power per month",
        },
        buttonText: "Subscribe Now",
        featureSuffix: " / Month",
        creditsSuffix: " / Month",
    },
    quarterly: {
        descriptions: {
            BASIC: "3 Month subscription",
            ESSENTIAL: "Best value quarterly plan",
            PRO: "Maximum power for 3 months",
        },
        buttonText: "Subscribe Quarterly",
        featureSuffix: " / Month",
        creditsSuffix: " (Upfront)",
    },
}

function buildFeatures(
    limits: TierLimits[TierName],
    credits: number,
    featureSuffix: string,
    creditsSuffix: string,
): string[] {
    return [
        `${limits.PROPERTY_LISTING} Listings${featureSuffix}`,
        `${limits.ENQUIRY_LISTING} Enquiries${featureSuffix}`,
        `${limits.SUBMIT_PROPERTY_ENQUIRY} Proposals${featureSuffix}`,
        `${credits} Credits${creditsSuffix}`,
    ]
}

export function transformTierConfig(data: TierConfigResponse["data"]): PricingData {
    const buildPlans = (
        planType: "monthly" | "quarterly",
        limits: TierLimits,
        pricing: TierPricing,
        credits: TierCredits,
    ): PlanCard[] => {
        const meta = PLAN_META[planType]
        return TIER_ORDER.map((tier) => ({
            name: TIER_META[tier].displayName,
            price: pricing[tier],
            description: meta.descriptions[tier],
            features: buildFeatures(limits[tier], credits[tier], meta.featureSuffix, meta.creditsSuffix),
            buttonText: meta.buttonText,
            popular: TIER_META[tier].popular,
            buttonId: `${TIER_META[tier].displayName}-${planType.charAt(0).toUpperCase() + planType.slice(1)}`,
        }))
    }

    return {
        monthly: buildPlans(
            "monthly",
            data.tierLimits,
            data.pricing.monthlyPricing,
            data.credits.monthlyCredits,
        ),
        quarterly: buildPlans(
            "quarterly",
            data.tierLimits,
            data.pricing.quarterlyPricing,
            data.credits.quarterlyCredits,
        ),
    }
}

export const pricingDataFallback: PricingData = {
    monthly: [
        {
            name: "Basic",
            price: 3999,
            description: "Monthly subscription",
            features: ["12 Listings / Month", "12 Enquiries / Month", "16 Proposals / Month", "200 Credits / Month"],
            buttonText: "Subscribe Now",
            popular: false,
            buttonId: "Basic-Monthly",
        },
        {
            name: "Essential",
            price: 4999,
            description: "Most popular monthly plan",
            features: ["24 Listings / Month", "24 Enquiries / Month", "32 Proposals / Month", "400 Credits / Month"],
            buttonText: "Subscribe Now",
            popular: true,
            buttonId: "Essential-Monthly",
        },
        {
            name: "Pro",
            price: 6499,
            description: "Maximum power per month",
            features: ["40 Listings / Month", "40 Enquiries / Month", "70 Proposals / Month", "1000 Credits / Month"],
            buttonText: "Subscribe Now",
            popular: false,
            buttonId: "Pro-Monthly",
        },
    ],
    quarterly: [
        {
            name: "Basic",
            price: 10999,
            description: "3 Month subscription",
            features: ["12 Listings / Month", "12 Enquiries / Month", "16 Proposals / Month", "600 Credits (Upfront)"],
            buttonText: "Subscribe Quarterly",
            popular: false,
            buttonId: "Basic-Quarterly",
        },
        {
            name: "Essential",
            price: 13999,
            description: "Best value quarterly plan",
            features: ["24 Listings / Month", "24 Enquiries / Month", "32 Proposals / Month", "1200 Credits (Upfront)"],
            buttonText: "Subscribe Quarterly",
            popular: true,
            buttonId: "Essential-Quarterly",
        },
        {
            name: "Pro",
            price: 17999,
            description: "Maximum power for 3 months",
            features: ["40 Listings / Month", "40 Enquiries / Month", "70 Proposals / Month", "3000 Credits (Upfront)"],
            buttonText: "Subscribe Quarterly",
            popular: false,
            buttonId: "Pro-Quarterly",
        },
    ],
}
