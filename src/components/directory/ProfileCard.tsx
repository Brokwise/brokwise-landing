import Link from "next/link";
import { MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import {
  ProfileCardData,
  PROFILE_TYPE_LABEL,
  SPEC_LABEL,
  CATEGORY_LABEL,
} from "@/lib/directory/types";

export default function ProfileCard({ p }: { p: ProfileCardData }) {
  return (
    <Link
      href={`/directory/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-sm transition hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lg"
    >
      <div className="flex-1 p-4">
        <div className="mono-label flex items-center gap-1.5 text-[10px] font-semibold text-dmark">
          <span className="h-[5px] w-[5px] rounded-full bg-dmark" />
          {PROFILE_TYPE_LABEL[p.profileType]}
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <h3 className="text-[17px] font-extrabold tracking-tight">{p.displayName}</h3>
          {p.reraVerified && (
            <ShieldCheck className="h-4 w-4 flex-none text-good" aria-label="RERA verified" />
          )}
        </div>
        <div className="mt-0.5 text-[13px] text-dmuted">
          {p.profileType === "BROKER"
            ? `${p.yearsOfExperience ?? 0} yrs experience`
            : [p.city, p.yearsOfExperience ? `${p.yearsOfExperience} yrs` : null]
                .filter(Boolean)
                .join(" · ")}
        </div>

        {p.operatingAreas.length > 0 && (
          <div className="mt-2.5 flex items-center gap-1.5 text-[12.5px] text-faint">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{p.operatingAreas.join(" · ")}</span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
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
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-3">
        <span className="mono-label text-[11.5px] text-dmuted">
          {p.city || "Multiple areas"}
        </span>
        <span className="flex items-center gap-1.5 text-[13px] font-bold text-brand-ink transition group-hover:gap-2">
          View profile <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
