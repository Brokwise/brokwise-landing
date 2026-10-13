export type PlanCode =
  | "STARTER"
  | "MONTHLY"
  | "ESSENTIAL_Q"
  | "ESSENTIAL_ANNUAL"
  | "PRO_Q"
  | "PRO_ANNUAL"

export type PlanLimits = {
  PROPERTY_LISTING: number
  ENQUIRY_LISTING: number
  SUBMIT_PROPERTY_ENQUIRY: number
  REQUEST_CONTACT: number
}

export type PlanNetwork = {
  access: boolean
  connectionsPerCycle: number
  contactUnlocksPerCycle: number
  weeklyConnectionCap: number
}

export type PlanSaving = {
  planCode: string
  comparedTo: string
  multiple: number
  shortTermCost: number
  saving: number
  savingPercent: number
}

export type PublicPlan = {
  code: string
  name: string
  priceInr: number
  validityDays: number
  kind: "one_time" | "recurring"
  limits: PlanLimits
  network: PlanNetwork
  badge: "most_popular" | "best_value" | null
  order: number
  /** Null for one-time plans. */
  effectivePerMonth: number | null
  savings: PlanSaving[]
}

type PlansResponse = {
  success: boolean
  data: { plans: PublicPlan[] }
}

type CatalogRow = Omit<PublicPlan, "effectivePerMonth" | "savings">

const NO_NETWORK: PlanNetwork = {
  access: false,
  connectionsPerCycle: 0,
  contactUnlocksPerCycle: 0,
  weeklyConnectionCap: 0,
}

// Mirrors the catalog table in the pricing spec (prices are INR before GST).
const CATALOG: CatalogRow[] = [
  {
    code: "STARTER",
    name: "Starter",
    priceInr: 1999,
    validityDays: 30,
    kind: "one_time",
    limits: { PROPERTY_LISTING: 3, ENQUIRY_LISTING: 3, SUBMIT_PROPERTY_ENQUIRY: 5, REQUEST_CONTACT: 2 },
    network: NO_NETWORK,
    badge: null,
    order: 1,
  },
  {
    code: "MONTHLY",
    name: "Monthly",
    priceInr: 5999,
    validityDays: 30,
    kind: "recurring",
    limits: { PROPERTY_LISTING: 7, ENQUIRY_LISTING: 7, SUBMIT_PROPERTY_ENQUIRY: 15, REQUEST_CONTACT: 5 },
    network: { access: true, connectionsPerCycle: 10, contactUnlocksPerCycle: 3, weeklyConnectionCap: 4 },
    badge: null,
    order: 2,
  },
  {
    code: "ESSENTIAL_Q",
    name: "Essential Quarterly",
    priceInr: 14999,
    validityDays: 90,
    kind: "recurring",
    limits: { PROPERTY_LISTING: 20, ENQUIRY_LISTING: 20, SUBMIT_PROPERTY_ENQUIRY: 40, REQUEST_CONTACT: 12 },
    network: { access: true, connectionsPerCycle: 25, contactUnlocksPerCycle: 7, weeklyConnectionCap: 5 },
    badge: "most_popular",
    order: 3,
  },
  {
    code: "ESSENTIAL_ANNUAL",
    name: "Essential Annual",
    priceInr: 49999,
    validityDays: 365,
    kind: "recurring",
    limits: { PROPERTY_LISTING: 100, ENQUIRY_LISTING: 100, SUBMIT_PROPERTY_ENQUIRY: 200, REQUEST_CONTACT: 50 },
    network: { access: true, connectionsPerCycle: 100, contactUnlocksPerCycle: 25, weeklyConnectionCap: 5 },
    badge: "best_value",
    order: 4,
  },
  {
    code: "PRO_Q",
    name: "Pro Quarterly",
    priceInr: 24999,
    validityDays: 90,
    kind: "recurring",
    limits: { PROPERTY_LISTING: 50, ENQUIRY_LISTING: 50, SUBMIT_PROPERTY_ENQUIRY: 100, REQUEST_CONTACT: 25 },
    network: { access: true, connectionsPerCycle: 50, contactUnlocksPerCycle: 15, weeklyConnectionCap: 8 },
    badge: null,
    order: 5,
  },
  {
    code: "PRO_ANNUAL",
    name: "Pro Annual",
    priceInr: 79999,
    validityDays: 365,
    kind: "recurring",
    limits: { PROPERTY_LISTING: 250, ENQUIRY_LISTING: 250, SUBMIT_PROPERTY_ENQUIRY: 500, REQUEST_CONTACT: 100 },
    network: { access: true, connectionsPerCycle: 200, contactUnlocksPerCycle: 50, weeklyConnectionCap: 10 },
    badge: null,
    order: 6,
  },
]

const SAVINGS_COMPARISONS: { planCode: PlanCode; comparedTo: PlanCode; multiple: number }[] = [
  { planCode: "ESSENTIAL_Q", comparedTo: "MONTHLY", multiple: 3 },
  { planCode: "ESSENTIAL_ANNUAL", comparedTo: "ESSENTIAL_Q", multiple: 4 },
  { planCode: "ESSENTIAL_ANNUAL", comparedTo: "MONTHLY", multiple: 12 },
  { planCode: "PRO_ANNUAL", comparedTo: "PRO_Q", multiple: 4 },
]

function effectivePerMonth(plan: CatalogRow): number | null {
  if (plan.kind === "one_time") return null
  const months = plan.validityDays === 365 ? 12 : plan.validityDays / 30
  return Math.round(plan.priceInr / months)
}

function computeSavings(planCode: string): PlanSaving[] {
  const price = new Map(CATALOG.map((p) => [p.code, p.priceInr]))
  const own = price.get(planCode)
  if (own === undefined) return []
  const out: PlanSaving[] = []
  for (const c of SAVINGS_COMPARISONS) {
    if (c.planCode !== planCode) continue
    const base = price.get(c.comparedTo)
    if (base === undefined) continue
    const shortTermCost = base * c.multiple
    const saving = shortTermCost - own
    if (saving <= 0) continue
    out.push({
      ...c,
      shortTermCost,
      saving,
      savingPercent: Math.round((saving / shortTermCost) * 1000) / 10,
    })
  }
  return out
}

/** Shown until the API answers, and kept if it never does. */
export const PLANS_FALLBACK: PublicPlan[] = CATALOG.map((plan) => ({
  ...plan,
  effectivePerMonth: effectivePerMonth(plan),
  savings: computeSavings(plan.code),
}))

const FETCH_TIMEOUT_MS = 8000

function isUsablePlan(p: unknown): p is PublicPlan {
  const plan = p as PublicPlan | null
  return (
    !!plan &&
    typeof plan.code === "string" &&
    typeof plan.name === "string" &&
    typeof plan.priceInr === "number" &&
    typeof plan.validityDays === "number" &&
    !!plan.limits &&
    !!plan.network &&
    typeof plan.order === "number"
  )
}

/**
 * Usable API plans, with the fallback entry standing in for any catalog
 * code the API left out or sent malformed, so no card disappears.
 */
function withFallbackGaps(fetched: unknown[]): PublicPlan[] {
  const byCode = new Map<string, PublicPlan>()
  for (const p of fetched) {
    if (isUsablePlan(p)) byCode.set(p.code, { ...p, savings: Array.isArray(p.savings) ? p.savings : [] })
  }
  for (const fallback of PLANS_FALLBACK) {
    if (!byCode.has(fallback.code)) byCode.set(fallback.code, fallback)
  }
  return Array.from(byCode.values()).sort((a, b) => a.order - b.order)
}

/** Null when the API is not configured, slow, aborted or unusable. */
export async function fetchPlans(signal?: AbortSignal): Promise<PublicPlan[] | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL
  if (!base) return null
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  const onAbort = () => controller.abort()
  signal?.addEventListener("abort", onAbort)
  try {
    const res = await fetch(`${base}/plans`, { signal: controller.signal })
    if (!res.ok) return null
    const json: PlansResponse = await res.json()
    const plans = json?.success ? json.data?.plans : null
    if (!Array.isArray(plans) || plans.length === 0) return null
    return withFallbackGaps(plans)
  } catch {
    return null
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener("abort", onAbort)
  }
}
