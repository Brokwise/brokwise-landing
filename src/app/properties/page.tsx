import type { Metadata } from "next";
import Link from "next/link";
import { EyeOff, MapPin, ShieldCheck } from "lucide-react";
import { fetchMarketplaceLaunch } from "@/lib/directory/launch";
import { fetchListings, portalSignupUrl } from "@/lib/properties/api";
import { CATEGORY_LABEL, type PropertyCategory } from "@/lib/directory/types";
import type { ListingQuery } from "@/lib/properties/types";
import DirectoryHero from "@/components/directory/DirectoryHero";
import Pagination from "@/components/directory/Pagination";
import ListingFilters from "@/components/properties/ListingFilters";
import ListingCard from "@/components/properties/ListingCard";
import MarketplaceComingSoon from "@/components/properties/MarketplaceComingSoon";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brokwise.com";

type SearchParams = Record<string, string | string[] | undefined>;

const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

const readQuery = (sp: SearchParams): ListingQuery => ({
  city: pick(sp.city),
  listingPurpose: pick(sp.listingPurpose),
  propertyCategory: pick(sp.propertyCategory),
  bhk: pick(sp.bhk),
  page: pick(sp.page),
});

/** "Residential properties for rent in Jaipur" from whichever filters are set. */
function heading(q: ListingQuery): string {
  const what = q.propertyCategory
    ? `${CATEGORY_LABEL[q.propertyCategory as PropertyCategory] ?? "All"} properties`
    : q.listingPurpose || q.city
      ? "Properties"
      : "All properties";
  const purpose = q.listingPurpose === "RENT" ? " for rent" : q.listingPurpose === "SALE" ? " for sale" : "";
  return `${what}${purpose}${q.city ? ` in ${q.city}` : ""}`;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const launch = await fetchMarketplaceLaunch();
  if (!launch.live) return { title: "Properties - coming soon", robots: { index: false, follow: true } };
  const q = readQuery(searchParams);
  const title = `${heading(q)} from verified brokers | Brokwise`;
  const description = `Browse ${heading(q).toLowerCase()} listed by RERA-verified brokers on Brokwise. Your number stays private until you choose to share it.`;
  // Page 2+ and BHK filters are thin variants of the same page.
  const thin = Boolean(q.page && q.page !== "1") || Boolean(q.bhk);
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/properties` },
    robots: thin ? { index: false, follow: true } : undefined,
    openGraph: { title, description },
  };
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const launch = await fetchMarketplaceLaunch();
  if (!launch.live) return <MarketplaceComingSoon liveAt={launch.liveAt} />;

  const query = readQuery(searchParams);
  const { properties, total, page, totalPages } = await fetchListings(query);

  return (
    <div className="landing-v2">
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHero
          eyebrow="Public listings"
          highlights={[
            { icon: ShieldCheck, label: "Verified brokers only" },
            { icon: MapPin, label: "Area and price upfront" },
            { icon: EyeOff, label: "Your number stays private" },
          ]}
          title="Properties listed by Verified Brokers."
          subtitle="Homes, offices, land and more from RERA-verified brokers. Browse freely; sign up to see full details and reach the broker. Your number stays private until you choose to share it."
        />

        <div className="relative z-10 -mt-4 pb-2">
          <ListingFilters query={query} />
        </div>

        <div id="listing-results" className="directory-results-light scroll-mt-24 bg-paper px-6 pb-24 pt-12">
          <div className="mx-auto max-w-[1160px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-[34px] font-bold leading-tight tracking-tight text-brand-ink md:text-[38px]">
                  {heading(query)}
                </h2>
                <p className="mt-1.5 text-[14.5px] text-dmuted">
                  {total > 0
                    ? `${total} ${total === 1 ? "listing" : "listings"}, newest first.`
                    : "Newest first."}
                </p>
              </div>
              <Link
                href={portalSignupUrl()}
                className="inline-flex h-10 items-center rounded-full border border-line-strong px-5 text-[13.5px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
              >
                Sign up free
              </Link>
            </div>

            {properties.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-line bg-surface px-6 py-20 text-center text-dmuted">
                No listings match those filters yet. Try another city or widen your search.
              </div>
            ) : (
              <>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {properties.map((p) => (
                    <ListingCard key={p.id} p={p} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  searchParams={searchParams}
                  basePath="/properties"
                  anchor="listing-results"
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
