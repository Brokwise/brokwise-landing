import type { MetadataRoute } from "next";
import { fetchMarketplaceLaunch } from "@/lib/directory/launch";
import { fetchListingSitemap } from "@/lib/properties/api";

const SITE_URL = "https://brokwise.com";

export const revalidate = 3600;

/** Public listings, only once the marketplace is live. */
async function listingEntries(): Promise<MetadataRoute.Sitemap> {
  const launch = await fetchMarketplaceLaunch();
  if (!launch.live) return [];
  const listings = await fetchListingSitemap();
  return [
    { url: `${SITE_URL}/properties`, changeFrequency: "daily", priority: 0.9 },
    ...listings.map((l) => ({
      url: `${SITE_URL}/properties/${encodeURIComponent(l.propertyId)}`,
      lastModified: new Date(l.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-and-conditions`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/platform-terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...(await listingEntries()),
  ];
}
