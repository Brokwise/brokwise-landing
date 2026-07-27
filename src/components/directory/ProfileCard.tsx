import Link from "next/link";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import {
  ProfileCardData,
  PROFILE_TYPE_LABEL,
  SPEC_LABEL,
  CATEGORY_LABEL,
} from "@/lib/directory/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "B";
}

export default function ProfileCard({ p }: { p: ProfileCardData }) {
  return (
    <Link
      href={`/directory/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lg"
    >
      <div className="flex items-start gap-3.5 p-4">
        {/* Broker's account profile photo, else initials for a consistent identity. */}
        {p.avatarImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.avatarImage}
            alt={p.displayName}
            className="h-12 w-12 flex-none rounded-full object-cover"
          />
        ) : (
          <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-brand-soft text-[15px] font-bold text-brand-ink">
            {initials(p.displayName)}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="mono-label text-[10px] font-semibold text-dmark">
            {PROFILE_TYPE_LABEL[p.profileType]}
          </div>
          <div className="mt-1 flex items-center gap-1.5">
            <h3 className="truncate font-display text-[17px] font-bold tracking-tight">
              {p.displayName}
            </h3>
            {p.reraVerified && (
              <ShieldCheck className="h-4 w-4 flex-none text-good" aria-label="RERA verified" />
            )}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12.5px] text-faint">
            <MapPin className="h-3.5 w-3.5 flex-none" />
            {[p.city, p.yearsOfExperience ? `${p.yearsOfExperience} yrs` : null]
              .filter(Boolean)
              .join(" · ") || "Multiple areas"}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 px-4 pb-4">
        {p.specializations.map((s) => (
          <span
            key={s}
            className="mono-label rounded-md bg-brand-soft px-2 py-1 text-[10.5px] font-medium text-brand-ink"
          >
            {SPEC_LABEL[s]}
          </span>
        ))}
        {p.propertyCategories.map((c) => (
          <span
            key={c}
            className="mono-label rounded-md border border-line-strong px-2 py-1 text-[10.5px] font-medium text-dmuted"
          >
            {CATEGORY_LABEL[c]}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-line px-4 py-3">
        {p.reraVerified ? (
          <span className="mono-label flex items-center gap-1.5 text-[11px] text-good">
            <ShieldCheck className="h-3.5 w-3.5" /> RERA verified
          </span>
        ) : (
          <span className="mono-label text-[11px] text-faint">Verified broker</span>
        )}
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-brand-ink transition group-hover:gap-2">
          View profile <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
