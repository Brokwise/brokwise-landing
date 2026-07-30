import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Boxes,
  Layers,
  Languages,
  Home,
  Building2,
  Factory,
  Tractor,
  Hotel,
  Warehouse,
} from "lucide-react";
import { fetchProfile, fetchProfiles } from "@/lib/directory/api";
import {
  PROFILE_TYPE_LABEL,
  SPEC_LABEL,
  CATEGORY_LABEL,
  type AreaSummary,
  type PropertyCategory,
  type ProfileDetail,
} from "@/lib/directory/types";
import { bhkBand, priceBand } from "@/lib/directory/format";
import ServiceAreaMap from "@/components/directory/ServiceAreaMap";
import HeroActions from "@/components/directory/HeroActions";
import EnquiryPanel from "@/components/directory/EnquiryPanel";
import BrokerRailCard, { type RailItem } from "@/components/directory/BrokerRailCard";
import Navbar from "@/components/v2/Navbar";
import Footer from "@/components/v2/Footer";
import { REGISTER_URL } from "@/components/v2/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://brokwise.com";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const p = await fetchProfile(params.slug);
  if (!p) return { title: "Profile not found" };
  const areas = p.areas.map((a) => a.label).join(", ");
  const title = `${p.displayName} - ${PROFILE_TYPE_LABEL[p.profileType]}${p.city ? ` in ${p.city}` : ""}`;
  const description =
    p.about ||
    `${p.displayName} works across ${areas || p.city || "multiple areas"} in ${p.specializations
      .map((s) => SPEC_LABEL[s])
      .join("/")} across ${p.propertyCategories.map((c) => CATEGORY_LABEL[c]).join(", ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/directory/${p.slug}` },
    openGraph: { title, description, type: "profile" },
  };
}

const CATEGORY_ICON: Record<PropertyCategory, typeof Home> = {
  RESIDENTIAL: Home,
  COMMERCIAL: Building2,
  INDUSTRIAL: Factory,
  AGRICULTURAL: Tractor,
  RESORT: Hotel,
  FARM_HOUSE: Warehouse,
};

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const p = await fetchProfile(params.slug);
  if (!p) notFound();

  const isCompany = p.profileType !== "BROKER";
  const totalActive = p.areas.reduce((s, a) => s + (a.summary?.totalCount || 0), 0);
  const maxAreaCount = Math.max(0, ...p.areas.map((a) => a.summary?.totalCount || 0));
  const firstName = displayCase(p.displayName).split(" ")[0] || p.displayName;

  // Verifiable facts only for the hero strip - always four, filling from the
  // strongest facts the profile actually carries.
  const heroStats: { label: string; value: string; live?: boolean }[] = [
    p.yearsOfExperience
      ? { label: "Experience", value: `${p.yearsOfExperience} Years` }
      : { label: "Service Areas", value: String(p.areas.length) },
    {
      label: "Specialization",
      value: p.specializations.map((s) => SPEC_LABEL[s]).join(" · ") ||
        (p.propertyCategories[0] ? CATEGORY_LABEL[p.propertyCategories[0]] : "-"),
    },
    p.reraNumber
      ? { label: "RERA ID", value: p.reraNumber }
      : { label: "Active Listings", value: String(totalActive) },
    { label: "Availability", value: "Active", live: true },
  ];

  const aboutStats = [
    { icon: Boxes, value: totalActive, label: "Active Listings", show: true },
    { icon: MapPin, value: p.areas.length, label: "Service Areas", show: p.areas.length > 0 },
    { icon: Layers, value: p.propertyCategories.length, label: "Categories", show: p.propertyCategories.length > 0 },
    { icon: Languages, value: p.languages.length, label: "Languages", show: p.languages.length > 0 },
    {
      icon: ShieldCheck,
      value: p.reraVerified ? "RERA" : "Pending",
      label: p.reraVerified ? "Verified" : "Verification",
      show: true,
      good: p.reraVerified,
    },
  ].filter((s) => s.show);

  const rail = await buildRail(p, isCompany);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: p.displayName,
    areaServed: p.areas.map((a) => a.label),
    address: p.city ? { "@type": "PostalAddress", addressLocality: p.city } : undefined,
    knowsAbout: p.propertyCategories.map((c) => CATEGORY_LABEL[c]),
  };

  return (
    <div className="landing-v2 bg-v2-navy font-sans">
      <Navbar />
      <main className="directory-scope">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* ── Hero band ─────────────────────────────────────────────── */}
        <section className="bg-v2-navy px-5 pt-24 pb-6 md:px-8 md:pt-28">
          <div className="mx-auto max-w-[1160px]">
            <Link
              href="/directory"
              className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-white/60 transition-colors hover:text-v2-gold"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>

            <div className="relative mt-4 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-v2-navy-3 to-v2-navy-2">
              <div className="absolute inset-0">
                <Image
                  src="/hero-new.png"
                  alt=""
                  fill
                  priority
                  quality={80}
                  className="object-cover object-[78%_45%] opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-v2-navy-3 via-v2-navy-3/90 to-v2-navy-3/30" />
              </div>

              <div className="relative grid gap-8 p-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10 md:p-9">
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  {p.avatarImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.avatarImage}
                      alt={p.displayName}
                      className="h-28 w-28 flex-none rounded-full object-cover ring-4 ring-white/15"
                    />
                  ) : (
                    <div className="grid h-28 w-28 flex-none place-items-center rounded-full bg-white/10 text-3xl font-bold text-white ring-4 ring-white/15">
                      {profileInitials(p.displayName)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="mono-label inline-flex items-center rounded-full border border-v2-gold/60 px-3 py-1 text-[10.5px] font-semibold text-v2-gold">
                        {PROFILE_TYPE_LABEL[p.profileType]}
                      </span>
                      {p.reraVerified && (
                        <span className="mono-label inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 text-[10.5px] font-semibold text-emerald-300">
                          <ShieldCheck className="h-3.5 w-3.5" /> RERA Verified
                        </span>
                      )}
                    </div>

                    <h1 className="mt-3 font-display text-[clamp(28px,4vw,42px)] font-bold leading-tight tracking-tight text-white">
                      {displayCase(p.displayName)}
                    </h1>

                    <p className="mt-2 flex flex-wrap items-center gap-x-1.5 text-[13.5px] text-white/65">
                      {p.city && (
                        <span className="inline-flex items-center gap-1 font-semibold text-white/80">
                          <MapPin className="h-4 w-4 text-v2-gold" /> {p.city}
                        </span>
                      )}
                      {p.city && p.propertyCategories.length > 0 && <span className="text-white/30">•</span>}
                      {p.propertyCategories.length > 0 && (
                        <span>
                          Specializing in{" "}
                          {p.propertyCategories.slice(0, 2).map((c) => CATEGORY_LABEL[c]).join(" & ")}{" "}
                          Properties
                        </span>
                      )}
                    </p>

                    <div className="mt-6 grid max-w-xl grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
                      {heroStats.map((s) => (
                        <div key={s.label}>
                          <div className="mono-label text-[10px] font-semibold text-white/40">
                            {s.label}
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 text-[14px] font-semibold text-white">
                            {s.live && (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]" />
                            )}
                            <span className="truncate">{s.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <HeroActions profile={p} />
              </div>
            </div>
          </div>
        </section>

        {/* ── About band (light) ───────────────────────────────────── */}
        <section className="bg-v2-paper px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1160px] items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_400px]">
            <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-white p-7 shadow-[0_18px_50px_-32px_rgba(11,21,34,0.4)] md:p-9">
              <h2 className="font-display text-[26px] font-bold tracking-tight text-v2-ink md:text-[30px]">
                About {firstName}
              </h2>
              {p.about && (
                <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-v2-ink/70">
                  {p.about}
                </p>
              )}

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {aboutStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-black/[0.06] bg-[#F5F5F6] px-3 py-4 text-center"
                  >
                    <s.icon
                      className={`mx-auto h-5 w-5 ${s.good ? "text-emerald-600" : "text-v2-ink/50"}`}
                    />
                    <div
                      className={`mt-2 text-[18px] font-bold tabular-nums ${s.good ? "text-emerald-600" : "text-v2-ink"}`}
                    >
                      {s.value}
                    </div>
                    <div className="mono-label mt-0.5 text-[9.5px] text-v2-ink/50">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <EnquiryPanel profile={p} />
          </div>
        </section>

        {/* ── Where they operate (dark) ────────────────────────────── */}
        <section className="bg-v2-navy px-5 py-14 md:px-8 md:py-16">
          <div className="mx-auto grid max-w-[1160px] items-start gap-6 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)_minmax(0,280px)]">
            {/* Areas */}
            <div>
              <div className="mono-label text-[11px] font-semibold text-v2-gold">
                Where they operate
              </div>
              {p.areas.length === 0 ? (
                <p className="mt-3 text-[13.5px] text-white/55">
                  No mapped service areas yet - send an enquiry and they&apos;ll get in touch.
                </p>
              ) : (
                <div className="mt-4 flex flex-col gap-3.5">
                  {p.areas.map((a) => (
                    <OperateAreaCard
                      key={a.label}
                      area={a}
                      major={(a.summary?.totalCount || 0) >= maxAreaCount && maxAreaCount > 0}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Map */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-v2-navy-2">
              <ServiceAreaMap areas={p.areas} />
              <div className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/45 px-2.5 py-1 backdrop-blur-sm">
                <span className="mono-label text-[9.5px] font-semibold text-white/70">
                  Service coverage map
                </span>
              </div>
              {p.city && (
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-sm">
                  <span className="mono-label text-[10px] font-semibold text-white">
                    {p.city}
                  </span>
                </div>
              )}
            </div>

            {/* Expertise */}
            <div>
              <div className="mono-label text-[11px] font-semibold text-v2-gold">
                Expertise
              </div>
              <div className="mt-4 flex flex-col gap-2.5">
                {p.propertyCategories.map((c) => {
                  const Icon = CATEGORY_ICON[c];
                  return (
                    <div
                      key={c}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-v2-navy-3 px-3.5 py-3"
                    >
                      <Icon className="h-4 w-4 flex-none text-v2-gold" />
                      <span className="text-[13.5px] font-medium text-white">
                        {CATEGORY_LABEL[c]}
                      </span>
                    </div>
                  );
                })}
              </div>
              {p.specializations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.specializations.map((s) => (
                    <span
                      key={s}
                      className="mono-label rounded-full border border-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white/70"
                    >
                      {SPEC_LABEL[s]}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>



        {/* ── Recommended / our brokers (light) ────────────────────── */}
        {rail.items.length > 0 && (
          <section className="bg-v2-paper px-5 py-14 md:px-8 md:py-16">
            <div className="mx-auto max-w-[1160px]">
              <h2 className="font-display text-[26px] font-bold tracking-tight text-v2-ink md:text-[30px]">
                {rail.title}
              </h2>
              <div className="mt-7 flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
                {rail.items.map((item, i) => (
                  <div key={i} className="snap-start">
                    <BrokerRailCard item={item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

/**
 * Compact service-area card for the dark band: name + hub weight, live count,
 * and anonymised configuration / price bands merged across categories.
 */
function OperateAreaCard({ area, major }: { area: AreaSummary; major: boolean }) {
  const cats = area.summary?.categories ?? [];
  const bhk = mergeRange(cats.map((c) => c.bhkRange));
  const price = mergeRange(cats.map((c) => c.priceRange));
  const count = area.summary?.totalCount || 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-v2-navy-3 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-[17px] font-bold text-white">{area.label}</div>
          <div className="mono-label mt-0.5 text-[9.5px] font-semibold text-v2-gold">
            {major ? "Major hub" : "Secondary hub"}
          </div>
        </div>
        <span className="mono-label flex-none rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80">
          {count} Active {count === 1 ? "Listing" : "Listings"}
        </span>
      </div>

      <dl className="mt-4 space-y-2 border-t border-white/10 pt-3 text-[12.5px]">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-white/45">Configuration</dt>
          <dd className="font-semibold tabular-nums text-white">{bhkBand(bhk) || "-"}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-white/45">Price Range</dt>
          <dd className="font-semibold tabular-nums text-white">{priceBand(price) || "-"}</dd>
        </div>
      </dl>
    </div>
  );
}

function mergeRange(
  ranges: ({ min: number; max: number } | null)[]
): { min: number; max: number } | null {
  const present = ranges.filter((r): r is { min: number; max: number } => !!r);
  if (present.length === 0) return null;
  return {
    min: Math.min(...present.map((r) => r.min)),
    max: Math.max(...present.map((r) => r.max)),
  };
}

/** For a company with brokers, surface those; otherwise recommend other profiles. */
async function buildRail(
  p: ProfileDetail,
  isCompany: boolean
): Promise<{ title: string; items: RailItem[] }> {
  if (isCompany && p.brokers && p.brokers.length > 0) {
    return {
      title: "Our brokers",
      items: p.brokers.map((b) => ({
        name: displayCase(b.fullName),
        initials: profileInitials(b.fullName),
        avatar: b.profilePhoto,
        reraNumber: b.reraNumber,
        typeLabel: "Individual broker",
        experience: b.yearsOfExperience,
        location: b.city,
      })),
    };
  }

  const list = await fetchProfiles({});
  const others = list.profiles.filter((o) => o.slug !== p.slug).slice(0, 8);
  return {
    title: "More recommended brokers",
    items: others.map((o) => ({
      name: displayCase(o.displayName),
      href: `/directory/${o.slug}`,
      initials: profileInitials(o.displayName),
      avatar: o.avatarImage,
      reraNumber: o.reraNumber,
      typeLabel: PROFILE_TYPE_LABEL[o.profileType],
      experience: o.yearsOfExperience,
      location: o.city || o.operatingAreas.slice(0, 1).join(""),
      listings: o.activeListings,
      areas: o.operatingAreaCount,
    })),
  };
}

function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "B";
}

/** Render ALL-CAPS source names in normal title case; leave mixed-case as-is. */
function displayCase(s: string): string {
  if (s === s.toUpperCase()) {
    return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return s;
}
