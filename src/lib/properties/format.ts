import { inr } from "@/lib/directory/format";
import { CATEGORY_LABEL } from "@/lib/directory/types";
import type { PublicListing } from "./types";

const aed = (n: number) =>
  `AED ${n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(2)}M` : n.toLocaleString("en-AE")}`;

export const money = (n: number, region: PublicListing["region"]) =>
  region === "AE" ? aed(n) : inr(n);

/** The headline price: monthly rent for rentals, total price otherwise. */
export function listingPrice(p: PublicListing): string | null {
  if (p.listingPurpose === "RENT") {
    return p.monthlyRent ? `${money(p.monthlyRent, p.region)}/month` : null;
  }
  return p.totalPrice ? money(p.totalPrice, p.region) : null;
}

/** "FARM_HOUSE" -> "Farm house". */
export const humanize = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase().replace(/_/g, " ");

const UNIT: Record<string, string> = {
  SQ_FT: "sq ft",
  SQ_METER: "sq m",
  SQ_YARDS: "sq yd",
  ACRES: "acres",
  HECTARE: "ha",
  BIGHA: "bigha",
  GAJ: "gaj",
};

/** "₹6,500 / sq ft". */
export const listingRate = (p: PublicListing) =>
  p.rate ? `${money(p.rate, p.region)}${p.sizeUnit && UNIT[p.sizeUnit] ? ` / ${UNIT[p.sizeUnit]}` : ""}` : null;

export const listingSize = (p: PublicListing) =>
  p.size ? `${p.size.toLocaleString("en-IN")} ${UNIT[p.sizeUnit ?? ""] ?? (p.sizeUnit ?? "").toLowerCase()}`.trim() : null;

/** "3 BHK Flat for sale in Jaipur" - the card and page title. */
export function listingTitle(p: PublicListing): string {
  const kind = `${p.bhk ? `${p.bhk} BHK ` : ""}${humanize(p.propertyType)}`;
  const purpose = p.listingPurpose === "RENT" ? "for rent" : "for sale";
  return `${kind} ${purpose}${p.city ? ` in ${p.city}` : ""}`;
}

export const categoryLabel = (p: PublicListing) =>
  CATEGORY_LABEL[p.propertyCategory] ?? humanize(p.propertyCategory);

/** Images the landing can render: absolute URLs only. */
export const displayableImages = (p: PublicListing) =>
  p.images.filter((src) => /^https:\/\//i.test(src));

/** Public URL slug: the human id when there is one. */
export const listingSlug = (p: PublicListing) => p.propertyId ?? p.id;
