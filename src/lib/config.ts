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
    activation: PlanCard[]
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
        activationLimits: TierLimits
        pricing: {
            activationPricing: TierPricing
            monthlyPricing: TierPricing
            quarterlyPricing: TierPricing
        }
        credits: {
            activationCredits: TierCredits
            monthlyCredits: TierCredits
            quarterlyCredits: TierCredits
        }
    }
}

const TIER_ORDER: TierName[] = ["BASIC", "ESSENTIAL", "PRO"]

const TIER_META: Record<TierName, { displayName: string; popular: boolean }> = {
    BASIC: { displayName: "Basic", popular: false },
    ESSENTIAL: { displayName: "Essential", popular: true },
    PRO: { displayName: "Pro", popular: false },
}

const PLAN_META: Record<"activation" | "monthly" | "quarterly", {
    descriptions: Record<TierName, string>
    buttonText: string
    featureSuffix: string
    creditsSuffix: string
}> = {
    activation: {
        descriptions: {
            BASIC: "Perfect for getting started",
            ESSENTIAL: "Best value for new users",
            PRO: "For serious professionals",
        },
        buttonText: "Get Started",
        featureSuffix: "",
        creditsSuffix: "",
    },
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
        planType: "activation" | "monthly" | "quarterly",
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
        activation: buildPlans(
            "activation",
            data.activationLimits,
            data.pricing.activationPricing,
            data.credits.activationCredits,
        ),
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
    activation: [
        {
            name: "Basic",
            price: 499,
            description: "Perfect for getting started",
            features: ["1 Listings", "2 Enquiries", "3 Proposals", "40 Credits"],
            buttonText: "Get Started",
            popular: false,
            buttonId: "Basic-Activation",
        },
        {
            name: "Essential",
            price: 999,
            description: "Best value for new users",
            features: ["6 Listings", "6 Enquiries", "6 Proposals", "100 Credits"],
            buttonText: "Get Started",
            popular: true,
            buttonId: "Essential-Activation",
        },
        {
            name: "Pro",
            price: 1799,
            description: "For serious professionals",
            features: ["12 Listings", "12 Enquiries", "12 Proposals", "180 Credits"],
            buttonText: "Get Started",
            popular: false,
            buttonId: "Pro-Activation",
        },
    ],
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
