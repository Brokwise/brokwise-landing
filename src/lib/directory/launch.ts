import { cache } from "react";
import { apiBase } from "./api";

export interface DirectoryLaunch {
  live: boolean;
  /** ISO instant the directory is scheduled to open, when an admin set one. */
  liveAt: string | null;
}

const CLOSED: DirectoryLaunch = { live: false, liveAt: null };

type LaunchFeature = "publicDirectory" | "customerMarketplace";

/**
 * Every launch switch, read once per request: wrapped in React's cache() so
 * generateMetadata and the page share one call.
 */
const fetchLaunches = cache(async (): Promise<Record<string, unknown> | null> => {
  try {
    const res = await fetch(`${apiBase()}/utils/feature-launches`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = await res.json();
    return (json?.data ?? json) ?? null;
  } catch {
    return null;
  }
});

const fetchLaunch = async (feature: LaunchFeature): Promise<DirectoryLaunch> => {
  const launches = await fetchLaunches();
  const launch = launches?.[feature] as
    | { live?: boolean; state?: string; liveAt?: string | null }
    | undefined;
  if (!launch) return CLOSED;
  return {
    live: launch.live === true,
    liveAt: launch.state === "scheduled" ? launch.liveAt ?? null : null,
  };
};

/**
 * Whether an admin has launched the public directory. Read on every request,
 * so a scheduled launch opens at its time without a redeploy.
 *
 * Fails closed: if the API cannot say, show the coming-soon page. The profile
 * endpoints refuse to serve until launch anyway, so an open page would only
 * render empty.
 */
export const fetchDirectoryLaunch = () => fetchLaunch("publicDirectory");

/** Public listings at /properties. Fails closed like the directory. */
export const fetchMarketplaceLaunch = () => fetchLaunch("customerMarketplace");
