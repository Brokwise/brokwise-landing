import { fetchProfiles, ListParams } from "@/lib/directory/api";
import Filters from "@/components/directory/Filters";
import ProfileCard from "@/components/directory/ProfileCard";
import DirectoryHero from "@/components/directory/DirectoryHero";
import DirectoryComingSoon from "@/components/directory/DirectoryComingSoon";
import Pagination from "@/components/directory/Pagination";
import BrokerSignupCta from "@/components/directory/BrokerSignupCta";

export const dynamic = "force-dynamic";

// Flip to false to open the public directory. While true, the page shows a
// "coming soon" placeholder and skips fetching profiles entirely, even
// though broker profiles already exist and are ready behind the scenes.
const SHOW_COMING_SOON = true;

const CITIES = ["Jaipur", "Bengaluru", "Pune", "Hyderabad"];

function pick(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (SHOW_COMING_SOON) {
    return <DirectoryComingSoon />;
  }

  const params: ListParams = {
    q: pick(searchParams.q),
    city: pick(searchParams.city),
    type: pick(searchParams.type),
    spec: pick(searchParams.spec),
    category: pick(searchParams.category),
    propertyType: pick(searchParams.propertyType),
    page: pick(searchParams.page),
  };

  const { profiles, total, page, totalPages } = await fetchProfiles(params);

  return (
    <div className="landing-v2">
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHero
          title="Find a Verified Broker who knows your Neighbourhood."
          subtitle="Browse trusted property brokers, agencies and channel partners by city, area and specialisation. See the kind of inventory they work with - then send an enquiry. Their contact stays private until they reach out to you."
        />

        {/* Tucked into the hero band by -mt-4. Needs to be positioned with a
            z-index, because the hero section above is `relative` and would
            otherwise paint over the card's top edge. */}
        <div className="relative z-10 -mt-4 pb-2">
          <Filters cities={CITIES} />
        </div>

        <div
          id="directory-results"
          className="directory-results-light scroll-mt-24 bg-paper px-6 pb-24 pt-12"
        >
          <div className="mx-auto max-w-[1160px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-[38px] font-bold leading-tight tracking-tight text-brand-ink">
                  Verified Partners
                </h2>
                <p className="mt-1.5 text-[14.5px] text-dmuted">
                  {total > 0
                    ? `${total} ${total === 1 ? "profile" : "profiles"} - RERA-verified first, then most recently updated.`
                    : "RERA-verified first, then most recently updated."}
                </p>
              </div>
              <div className="mono-label flex items-center gap-2.5 text-[11px] text-faint">
                <span>Sort by:</span>
                <span className="font-semibold text-ink">Relevance</span>
                {params.city && (
                  <>
                    <span aria-hidden className="text-line-strong">|</span>
                    <span className="font-semibold text-ink">{params.city}</span>
                  </>
                )}
              </div>
            </div>

            {profiles.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-line bg-surface py-20 text-center text-dmuted">
                No profiles match those filters yet. Try widening your search.
              </div>
            ) : (
              <>
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {profiles.map((p) => (
                    <ProfileCard key={p.slug} p={p} />
                  ))}
                </div>
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  searchParams={searchParams}
                />
              </>
            )}
          </div>
        </div>

        <BrokerSignupCta />
      </main>
    </div>
  );
}
