import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Lock, EyeOff, Send } from "lucide-react";
import { fetchProfile } from "@/lib/directory/api";
import {
  PROFILE_TYPE_LABEL,
  SPEC_LABEL,
  CATEGORY_LABEL,
} from "@/lib/directory/types";
import AreaCard from "@/components/directory/AreaCard";
import ServiceAreaMap from "@/components/directory/ServiceAreaMap";
import EnquiryModal from "@/components/directory/EnquiryModal";
import { DirectoryHeroShell } from "@/components/directory/DirectoryHero";
import DirectorySearch from "@/components/directory/DirectorySearch";
import Navbar from "@/components/v2/Navbar";

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

export default async function ProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const p = await fetchProfile(params.slug);
  if (!p) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: p.displayName,
    areaServed: p.areas.map((a) => a.label),
    address: p.city ? { "@type": "PostalAddress", addressLocality: p.city } : undefined,
    knowsAbout: p.propertyCategories.map((c) => CATEGORY_LABEL[c]),
  };

  return (
    <div className="landing-v2">
      <Navbar />
      <main className="directory-scope min-h-screen bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <DirectoryHeroShell compact>
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-white/70 transition-colors hover:text-v2-gold"
        >
          <ArrowLeft className="h-4 w-4" /> All profiles
        </Link>

        <div className="mt-6 flex items-start gap-4">
          {p.heroImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.heroImage}
              alt={p.displayName}
              className="h-16 w-16 flex-none rounded-full object-cover ring-2 ring-white/15"
            />
          ) : (
            <div className="grid h-16 w-16 flex-none place-items-center rounded-full bg-white/10 text-xl font-bold text-white ring-1 ring-white/15">
              {profileInitials(p.displayName)}
            </div>
          )}
          <div className="min-w-0">
            <div className="mono-label flex items-center gap-1.5 text-[10px] font-semibold text-v2-gold">
              <span className="h-[5px] w-[5px] rounded-full bg-v2-gold" />
              {PROFILE_TYPE_LABEL[p.profileType]}
            </div>
            <h1 className="mt-1.5 flex flex-wrap items-center gap-2.5 font-display text-[clamp(26px,4vw,40px)] font-bold leading-tight tracking-tight text-white">
              {p.displayName}
              {p.reraVerified && (
                <ShieldCheck className="h-6 w-6 text-emerald-400" aria-label="RERA verified" />
              )}
            </h1>
            <div className="mono-label mt-2 text-[12px] text-white/55">
              {[p.city, p.yearsOfExperience ? `${p.yearsOfExperience} yrs experience` : null]
                .filter(Boolean)
                .join("  ·  ")}
            </div>
          </div>
        </div>

        <DirectorySearch className="mt-7" />
      </DirectoryHeroShell>

      <div className="mx-auto max-w-[1160px] px-6">
        <div className="border-b border-line py-7">
          {p.about && (
            <p className="max-w-[64ch] text-[15.5px] leading-relaxed text-dmuted">
              {p.about}
            </p>
          )}
          <div className={`flex flex-wrap gap-1.5 ${p.about ? "mt-5" : ""}`}>
            {p.reraVerified && (
              <span className="mono-label inline-flex items-center gap-1.5 rounded-md bg-good-soft px-2.5 py-1 text-[11px] font-medium text-good">
                <ShieldCheck className="h-3.5 w-3.5" /> RERA {p.reraNumber || "verified"}
              </span>
            )}
            {p.specializations.map((s) => (
              <span
                key={s}
                className="mono-label rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-medium text-brand-ink"
              >
                {SPEC_LABEL[s]}
              </span>
            ))}
            {p.propertyCategories.map((c) => (
              <span
                key={c}
                className="mono-label rounded-md border border-line-strong px-2.5 py-1 text-[11px] font-medium text-dmuted"
              >
                {CATEGORY_LABEL[c]}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 py-8 md:grid-cols-[1fr_380px]">
          <div>
            <div className="mono-label text-[11.5px] font-semibold text-brand-ink">
              Where they operate
            </div>
            <div className="mt-3 flex items-start gap-2.5 rounded-lg border border-dashed border-line-strong bg-surface-2 px-3.5 py-3 text-[13px] text-dmuted">
              <Lock className="mt-0.5 h-4 w-4 flex-none text-dmark" />
              Exact properties and addresses are confidential. The figures below are
              anonymised summaries of active inventory in each area - never individual
              listings.
            </div>

            {p.areas.length === 0 ? (
              <p className="mt-4 text-[14px] text-dmuted">
                No active listings to map service areas yet. Send an enquiry and
                they&apos;ll get in touch.
              </p>
            ) : (
              <div className="mt-4 flex flex-col gap-3.5">
                {p.areas.map((a) => (
                  <AreaCard key={a.label} area={a} />
                ))}
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-4 md:sticky md:top-[92px]">
            <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-sm">
              <ServiceAreaMap areas={p.areas} />
              <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-[12px] text-dmuted">
                <span className="inline-block h-3.5 w-5 flex-none rounded border-[1.5px] border-dashed border-brand bg-brand/20" />
                Approximate service areas - circles, not exact locations.
              </div>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
              <h3 className="font-display text-[18px] font-bold tracking-tight">Interested in this area?</h3>
              <p className="mt-2 text-[13.5px] text-dmuted">
                Send {p.displayName} a message about what you&apos;re looking for.
                They&apos;ll get it instantly in the Brokwise app and reach out to you.
              </p>
              <EnquiryModal profile={p} />
              <p className="mt-3.5 flex items-start gap-2 text-[12px] text-faint">
                <Lock className="mt-0.5 h-3.5 w-3.5 flex-none text-good" />
                We never share their phone or email. Your enquiry is delivered privately,
                inside their app.
              </p>
            </div>

            <TrustPanel reraNumber={p.reraVerified ? p.reraNumber : undefined} />
          </aside>
        </div>
      </div>
      </main>
    </div>
  );
}

function profileInitials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "B";
}

function TrustPanel({ reraNumber }: { reraNumber?: string }) {
  const items = [
    {
      icon: ShieldCheck,
      title: "RERA-verified broker",
      body: reraNumber
        ? `Registration ${reraNumber}, verified by Brokwise.`
        : "Verified by Brokwise before listing.",
    },
    {
      icon: Lock,
      title: "Your data stays yours",
      body: "We never share your details without your permission.",
    },
    {
      icon: EyeOff,
      title: "Their contact stays private",
      body: "You only see the broker's number once they respond to you.",
    },
    {
      icon: Send,
      title: "Delivered in-app",
      body: "Your enquiry reaches the broker instantly in the Brokwise app.",
    },
  ];
  return (
    <div className="rounded-xl border border-line bg-surface p-5 shadow-sm">
      <div className="mono-label mb-3.5 text-[10.5px] text-faint">Why enquire on Brokwise</div>
      <ul className="flex flex-col gap-3.5">
        {items.map((it) => (
          <li key={it.title} className="flex gap-3">
            <it.icon className="mt-0.5 h-4 w-4 flex-none text-good" />
            <div>
              <p className="text-[13.5px] font-semibold text-ink">{it.title}</p>
              <p className="text-[12.5px] text-dmuted">{it.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
