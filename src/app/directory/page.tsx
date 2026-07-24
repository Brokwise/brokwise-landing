import { ShieldCheck, MapPin, Mail } from "lucide-react";
import { fetchProfiles, ListParams } from "@/lib/directory/api";
import Filters from "@/components/directory/Filters";
import ProfileCard from "@/components/directory/ProfileCard";

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
    <main className="directory-scope min-h-screen bg-paper text-ink">
      <section className="pb-12 pt-28 md:pt-36">
        <div className="mx-auto max-w-[1160px] px-6">
          <div className="mono-label text-[11.5px] font-semibold text-brand-ink">
            Public broker directory
          </div>
          <h1 className="mt-3.5 max-w-[15ch] text-[clamp(30px,5vw,48px)] font-extrabold leading-[1.04] tracking-tight">
            Find a verified broker who knows your neighbourhood.
          </h1>
          <p className="mt-4 max-w-[56ch] text-[16.5px] text-dmuted">
            Browse trusted property brokers, agencies and channel partners by city,
            area and specialisation. See the kind of inventory they work with - then
            send an enquiry. Their contact stays private until they reach out to you.
          </p>
          <div className="mt-5 flex flex-wrap gap-5 text-[13px] text-dmuted">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brand-ink" />
              <b className="font-semibold text-ink">RERA-verified</b> agencies
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-ink" />
              Service areas, <b className="font-semibold text-ink">not exact listings</b>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-ink" />
              Enquiries delivered <b className="font-semibold text-ink">in-app</b>
            </span>
          </div>
        </div>
      </section>

      <Filters cities={CITIES} />

      <div className="mx-auto max-w-[1160px] px-6">
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
  );
}
