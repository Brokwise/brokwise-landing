"use client";

import { useEffect, useState } from "react";
import { TierConfigResponse } from "@/lib/config";

export type TierConfigState = {
  data: TierConfigResponse | null;
  loading: boolean;
};

// Module-level cache so the fetch fires exactly once per browser session,
// no matter how many components call useTierConfig() simultaneously.
//
// - `inflight`: the in-progress Promise; subsequent callers attach to it
//   instead of starting a second request.
// - `resolved`: the settled result; components that mount after the fetch
//   completes receive it synchronously via useState's initialiser, so they
//   never show a loading spinner at all.
let inflight: Promise<TierConfigState> | null = null;
let resolved: TierConfigState | null = null;

function fetchTierConfig(): Promise<TierConfigState> {
  // Already settled — return immediately.
  if (resolved !== null) return Promise.resolve(resolved);
  // In-flight — share the existing Promise.
  if (inflight !== null) return inflight;

  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) {
    resolved = { data: null, loading: false };
    return Promise.resolve(resolved);
  }

  inflight = fetch(`${base}/admin/tier-config`)
    .then((res) => {
      if (!res.ok) throw new Error(`Tier config API error: ${res.status}`);
      return res.json();
    })
    .then((json: TierConfigResponse | null) => {
      resolved = { data: json, loading: false };
      inflight = null;
      return resolved;
    })
    .catch(() => {
      resolved = { data: null, loading: false };
      inflight = null;
      return resolved as TierConfigState;
    });

  return inflight;
}

export function useTierConfig(): TierConfigState {
  // Initialise from the module-level cache so components that mount after
  // the fetch completes never flicker through a loading state.
  const [state, setState] = useState<TierConfigState>(
    () => resolved ?? { data: null, loading: true },
  );

  useEffect(() => {
    // Cache already has a result — nothing to do.
    if (resolved !== null) return;

    let cancelled = false;
    fetchTierConfig().then((result) => {
      if (!cancelled) setState(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
