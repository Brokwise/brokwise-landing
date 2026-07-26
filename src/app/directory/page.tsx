import { fetchProfiles, ListParams } from "@/lib/directory/api";
import Filters from "@/components/directory/Filters";
import ProfileCard from "@/components/directory/ProfileCard";
import DirectoryHero from "@/components/directory/DirectoryHero";
import Navbar from "@/components/v2/Navbar";

export const dynamic = "force-dynamic";

const CITIES = ["Jaipur", "Bengaluru", "Pune", "Hyderabad"];

function pick(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

export default async function ListingPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params: ListParams = {
    q: pick(searchParams.q),
    city: pick(searchParams.city),
    type: pick(searchParams.type),
    spec: pick(searchParams.spec),
    category: pick(searchParams.category),
    propertyType: pick(searchParams.propertyType),
    page: pick(searchParams.page),
  };

  const { profiles, total } = await fetchProfiles(params);

  return (
    <div className="landing-v2">
      <Navbar />
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHero
          title="Find a verified broker who knows your neighbourhood."
          subtitle="Browse trusted property brokers, agencies and channel partners by city, area and specialisation. See the kind of inventory they work with - then send an enquiry. Their contact stays private until they reach out to you."
          defaultQuery={params.q ?? ""}
        />

        <Filters cities={CITIES} />

        <div id="directory-results" className="mx-auto max-w-[1160px] px-6 scroll-mt-24">
          <div className="flex items-baseline justify-between py-6">
            <div className="mono-label text-[13px] text-dmuted">
              <b className="text-ink">{total}</b> profiles in your area
            </div>
            <div className="mono-label text-[13px] text-faint">sorted by relevance</div>
          </div>

          {profiles.length === 0 ? (
            <div className="py-16 text-center text-dmuted">
              No profiles match those filters yet. Try widening your search.
            </div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 pb-16">
              {profiles.map((p) => (
                <ProfileCard key={p.slug} p={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
