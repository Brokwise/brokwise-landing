import { cache } from "react";
import { apiBase } from "./api";

export interface DirectoryLaunch {
  live: boolean;
  /** ISO instant the directory is scheduled to open, when an admin set one. */
  liveAt: string | null;
}

const CLOSED: DirectoryLaunch = { live: false, liveAt: null };

/**
 * Whether an admin has launched the public directory. Read on every request,
 * so a scheduled launch opens at its time without a redeploy.
 *
 * Wrapped in React's cache() so generateMetadata and the page share one call
 * per request.
 *
 * Fails closed: if the API cannot say, show the coming-soon page. The profile
 * endpoints refuse to serve until launch anyway, so an open page would only
 * render empty.
 */
export const fetchDirectoryLaunch = cache(async (): Promise<DirectoryLaunch> => {
  try {
    const res = await fetch(`${apiBase()}/utils/feature-launches`, {
      cache: "no-store",
    });
    if (!res.ok) return CLOSED;
    const json = await res.json();
    const launch: { live?: boolean; state?: string; liveAt?: string | null } | undefined =
      (json?.data ?? json)?.publicDirectory;
    if (!launch) return CLOSED;
    return {
      live: launch.live === true,
      liveAt: launch.state === "scheduled" ? launch.liveAt ?? null : null,
    };
  } catch {
    return CLOSED;
  }
});
