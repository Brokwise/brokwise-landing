import type { ProfileDetail, ProfileListResponse } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

/** Unwrap the backend's { success, status, data } envelope. */
async function unwrap<T>(res: Response): Promise<T> {
  const json = await res.json();
  return (json?.data ?? json) as T;
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
    return unwrap<ProfileListResponse>(res);
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
