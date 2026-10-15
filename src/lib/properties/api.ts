import { apiBase } from "@/lib/directory/api";
import type { ListingQuery, PublicListing, PublicListingPage } from "./types";

const PORTAL_URL =
  process.env.NEXT_PUBLIC_CUSTOMER_PORTAL_URL || "https://dashboard.brokwise.com";

/** Where "see full details" sends a visitor: the portal, back to this listing. */
export const portalListingUrl = (id: string) =>
  `${PORTAL_URL}/login?next=${encodeURIComponent(`/properties/${id}`)}`;

export const portalSignupUrl = () => `${PORTAL_URL}/login`;

async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json();
  return (json?.data ?? json) as T;
}

const EMPTY: PublicListingPage = { properties: [], total: 0, page: 1, totalPages: 0 };

/** Fails soft: an unreachable API renders the empty state, never a 500. */
export async function fetchListings(query: ListingQuery): Promise<PublicListingPage> {
  const qs = new URLSearchParams({ limit: "12" });
  for (const [k, v] of Object.entries(query)) if (v) qs.set(k, v);
  try {
    const res = await fetch(`${apiBase()}/public/properties?${qs}`, { next: { revalidate: 60 } });
    if (!res.ok) return EMPTY;
    const data = await unwrap<PublicListingPage>(res);
    return { ...EMPTY, ...data, properties: data.properties ?? [] };
  } catch {
    return EMPTY;
  }
}

export async function fetchListing(id: string): Promise<PublicListing | null> {
  try {
    const res = await fetch(`${apiBase()}/public/properties/${encodeURIComponent(id)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return unwrap<PublicListing>(res);
  } catch {
    return null;
  }
}

export async function fetchListingSitemap(): Promise<{ propertyId: string; updatedAt: string }[]> {
  try {
    const res = await fetch(`${apiBase()}/public/properties/sitemap`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return unwrap(res);
  } catch {
    return [];
  }
}
