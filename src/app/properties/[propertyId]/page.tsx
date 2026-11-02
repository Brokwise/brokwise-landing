import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  EyeOff,
  Lock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { fetchMarketplaceLaunch } from "@/lib/directory/launch";
import { fetchListing, portalListingUrl } from "@/lib/properties/api";
import {
  categoryLabel,
  displayableImages,
  humanize,
  listingPrice,
  listingRate,
  listingSize,
  listingSlug,
  listingTitle,
} from "@/lib/properties/format";
import MarketplaceComingSoon from "@/components/properties/MarketplaceComingSoon";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brokwise.com";

type Params = { params: { propertyId: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const launch = await fetchMarketplaceLaunch();
  if (!launch.live)
    return {
      title: "Properties - coming soon",
      robots: { index: false, follow: true },
    };
  const p = await fetchListing(params.propertyId);
  if (!p) return { title: "Listing not found", robots: { index: false } };
  const title = `${p.propertyTitle || listingTitle(p)} | Brokwise`;
  const price = listingPrice(p);
  const description = `${listingTitle(p)}${price ? ` at ${price}` : ""}, listed by a verified broker on Brokwise.`;
  const image = displayableImages(p)[0];
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/properties/${listingSlug(p)}` },
    openGraph: { title, description, images: image ? [image] : undefined },
  };
}

export default async function ListingPage({ params }: Params) {
  const launch = await fetchMarketplaceLaunch();
  if (!launch.live) return <MarketplaceComingSoon liveAt={launch.liveAt} />;

  const p = await fetchListing(params.propertyId);
  if (!p) notFound();

  const images = displayableImages(p);
  const price = listingPrice(p);
  const hidden = Math.max(0, p.imageCount - images.length);
  const signUpHref = portalListingUrl(p.id);

  const facts = [
    { label: "Category", value: categoryLabel(p) },
    { label: "Type", value: humanize(p.propertyType) },
    { label: "Size", value: listingSize(p) },
    { label: "BHK", value: p.bhk ? String(p.bhk) : null },
    { label: "Bathrooms", value: p.washrooms ? String(p.washrooms) : null },
    {
      label: "Furnishing",
      value: p.furnishing ? humanize(p.furnishing) : null,
    },
    { label: "Facing", value: p.facing ? humanize(p.facing) : null },
    {
      label: "Rate",
      value: p.listingPurpose !== "RENT" ? listingRate(p) : null,
    },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.propertyTitle || listingTitle(p),
    url: `${SITE_URL}/properties/${listingSlug(p)}`,
    image: images,
    datePosted: p.publishedAt ?? undefined,
    offers:
      p.listingPurpose === "RENT"
        ? p.monthlyRent && {
            "@type": "Offer",
            price: p.monthlyRent,
            priceCurrency: p.region === "AE" ? "AED" : "INR",
          }
        : p.totalPrice && {
            "@type": "Offer",
            price: p.totalPrice,
            priceCurrency: p.region === "AE" ? "AED" : "INR",
          },
    contentLocation: p.city
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: p.city,
            addressRegion: p.state ?? undefined,
          },
        }
      : undefined,
  };

  return (
    <div className="landing-v2">
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-[1160px] px-6 pb-24 pt-24 md:pt-28">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-brand-ink"
          >
            <ArrowLeft className="h-4 w-4" /> All properties
          </Link>

          {/* Gallery */}
          <div className="mt-5 grid gap-3 md:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
              {images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={images[0]}
                  alt={listingTitle(p)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-faint">
                  <Building2 className="h-14 w-14" aria-hidden />
                </div>
              )}
            </div>
            <div className="hidden grid-rows-2 gap-3 md:grid">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-2xl border border-line bg-surface-2"
                >
                  {images[i] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={images[i]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}
                  {i === 2 && hidden > 0 && (
                    <Link
                      href={signUpHref}
                      className="absolute inset-0 grid place-items-center bg-paper/70 text-center text-[14px] font-semibold text-ink backdrop-blur-sm transition hover:bg-paper/60"
                    >
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" /> +{hidden} more photos
                      </span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* Facts */}
            <section>
              <p className="mono-label text-[11.5px] font-bold text-brand-ink">
                {p.listingPurpose === "RENT" ? "For rent" : "For sale"}
              </p>
              <h1 className="mt-2 font-display text-[30px] font-bold leading-tight tracking-tight text-ink md:text-[38px]">
                {p.propertyTitle || listingTitle(p)}
              </h1>
              <p className="mt-2 flex items-center gap-1.5 text-[14.5px] text-dmuted">
                <MapPin className="h-4 w-4" aria-hidden />
                {[p.city, p.state].filter(Boolean).join(", ") ||
                  "Location on request"}
              </p>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-[28px] font-bold tabular-nums text-ink">
                  {price ?? "Price on request"}
                </p>
                {p.isPriceNegotiable && (
                  <span className="text-[13px] font-medium text-dmuted">
                    Negotiable
                  </span>
                )}
                {p.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-good">
                    <BadgeCheck className="h-4 w-4" aria-hidden /> Verified
                    listing
                  </span>
                )}
              </div>

              {/* Cells draw their own right and bottom rules; the negative
                  margins tuck the outermost ones under the frame, so a short
                  last row leaves plain surface instead of a grey block. */}
              <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
                <dl className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3">
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className="border-b border-r border-line px-5 py-4"
                    >
                      <dt className="text-[12px] text-faint">{f.label}</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-ink">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface/60 p-6">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <Lock className="h-4 w-4 text-brand-ink" aria-hidden />{" "}
                  Description, amenities and all photos
                </p>
                <p className="mt-1.5 text-[14px] text-dmuted">
                  Sign up free to see the full listing and send the broker a
                  request.
                </p>
              </div>
            </section>

            {/* Sign-up rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-line bg-surface p-6 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)]">
                <h2 className="font-display text-[20px] font-bold tracking-tight text-ink">
                  Interested?
                </h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-dmuted">
                  Create a free account to see every detail and ask the broker
                  about this property.
                </p>
                <Link
                  href={signUpHref}
                  className="mt-5 flex h-12 items-center justify-center rounded-full bg-brand text-[15px] font-bold text-on-brand transition hover:bg-brand-strong"
                >
                  See full details
                </Link>
                <ul className="mt-5 space-y-2.5 text-[13.5px] text-dmuted">
                  <li className="flex items-start gap-2">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 flex-none text-brand-ink"
                      aria-hidden
                    />
                    Listed by a verified broker
                  </li>
                  <li className="flex items-start gap-2">
                    <EyeOff
                      className="mt-0.5 h-4 w-4 flex-none text-brand-ink"
                      aria-hidden
                    />
                    Your number stays private until you choose to share it
                    with a broker
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
