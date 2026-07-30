import type {
  ProfileCardData,
  ProfileDetail,
  ProfileListResponse,
} from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/** Unwrap the backend's { success, status, data } envelope. */
async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json();
  return (json?.data ?? json) as T;
}

/**
 * Fill in array/count fields a response might omit. A deployed API can lag the
 * frontend (or a cached response can predate a field being added), and this is
 * a public page - it must degrade, never throw.
 */
function normalizeCard(p: ProfileCardData): ProfileCardData {
  return {
    ...p,
    specializations: p.specializations ?? [],
    propertyCategories: p.propertyCategories ?? [],
    propertyTypes: p.propertyTypes ?? [],
    languages: p.languages ?? [],
    operatingAreas: p.operatingAreas ?? [],
    operatingAreaCount: p.operatingAreaCount ?? 0,
    activeListings: p.activeListings ?? 0,
    reraVerified: !!p.reraVerified,
  };
}

export interface ListParams {
  q?: string;
  city?: string;
  type?: string;
  spec?: string;
  category?: string;
  propertyType?: string;
  page?: string;
}

export async function fetchProfiles(
  params: ListParams
): Promise<ProfileListResponse> {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) qs.set(k, v);
  }
  const empty = { profiles: [], page: 1, limit: 24, total: 0, totalPages: 0 };
  try {
    const res = await fetch(`${API_BASE}/directory/profiles?${qs.toString()}`, {
      // Public directory: keep fresh-ish but let the CDN cache briefly.
      next: { revalidate: 60 },
    });
    if (!res.ok) return empty;
    const data = await unwrap<ProfileListResponse>(res);
    return { ...data, profiles: (data.profiles ?? []).map(normalizeCard) };
  } catch {
    // API unreachable - render the shell + empty state rather than a 500.
    return empty;
  }
}

export async function fetchProfile(slug: string): Promise<ProfileDetail | null> {
  try {
    const res = await fetch(
      `${API_BASE}/directory/profiles/${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    return unwrap<ProfileDetail>(res);
  } catch {
    return null;
  }
}

/** Client-side: submit a public enquiry. */
export async function submitEnquiry(body: {
  slug: string;
  /** Target a specific broker under a channel partner (company page). */
  brokerId?: string;
  visitorName: string;
  visitorPhone: string;
  visitorEmail?: string;
  expertCategories: string[];
  preferredAreas: string[];
  requestCallback: boolean;
  message?: string;
  turnstileToken?: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/directory/enquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { ok: false, error: json?.message || "Could not send enquiry." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

export function apiBase() {
  return API_BASE;
}
