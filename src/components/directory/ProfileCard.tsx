import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import {
  ProfileCardData,
  PROFILE_TYPE_LABEL,
  CATEGORY_LABEL,
} from "@/lib/directory/types";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() || "").join("") || "B";
}

/**
 * Public directory card.
 *
 * The stat strip carries only facts the platform can stand behind - RERA
 * status, live listing count, service-area count. It deliberately does NOT
 * show ratings, review counts, online presence or response times: none of
 * those are tracked, and inventing them would put fabricated social proof on
 * a real broker's public page.
 */
export default function ProfileCard({ p }: { p: ProfileCardData }) {
  const chips = [
    ...p.propertyTypes.slice(0, 2),
    ...(p.propertyTypes.length === 0
      ? p.propertyCategories.slice(0, 2).map((c) => CATEGORY_LABEL[c])
      : []),
  ].filter(Boolean);

  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:border-line-strong">
      {/* Identity */}
      <div className="flex items-start gap-4">
        {p.avatarImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.avatarImage}
            alt={p.displayName}
            className="h-[68px] w-[68px] flex-none rounded-2xl object-cover"
          />
        ) : (
          <div className="grid h-[68px] w-[68px] flex-none place-items-center rounded-2xl bg-brand-soft text-xl font-bold text-brand-ink">
            {initials(p.displayName)}
          </div>
        )}

        <div className="min-w-0 flex-1 pt-0.5">
          {/* Two lines, not truncated: agency names are long and the name is
              the one thing a visitor must be able to read in full. */}
          <h3 className="line-clamp-2 font-display text-[20px] font-bold leading-tight tracking-tight text-ink">
            {p.displayName}
          </h3>
          {p.reraNumber ? (
            <p className="mono-label mt-1 text-[12px] font-semibold text-brand-ink">
              RERA ID: {p.reraNumber}
            </p>
          ) : (
            <p className="mono-label mt-1 text-[12px] font-semibold text-faint">
              {PROFILE_TYPE_LABEL[p.profileType]}
            </p>
          )}
          <p className="mt-1.5 text-[12.5px] text-faint">
            {PROFILE_TYPE_LABEL[p.profileType]}
          </p>
        </div>
      </div>

      {/* Spec rows */}
      <dl className="mt-5 space-y-2.5">
        {typeof p.yearsOfExperience === "number" && p.yearsOfExperience > 0 && (
          <SpecRow label="Experience" value={`${p.yearsOfExperience}+ Years`} />
        )}
        <SpecRow
          label="Location"
          value={p.city || p.operatingAreas.slice(0, 2).join(", ") || "Multiple areas"}
        />
        {p.languages.length > 0 && (
          <SpecRow label="Languages" value={p.languages.slice(0, 3).join(", ")} />
        )}
      </dl>

      {/* Focus chips */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c}
              className="rounded-lg bg-surface-2 px-2.5 py-1.5 text-[12px] font-medium text-dmuted"
            >
              {c}
            </span>
          ))}
        </div>
      )}

      {/* Verifiable stats only */}
      <div className="mt-4 grid grid-cols-3 divide-x divide-line rounded-xl bg-surface-2 py-3">
        <Stat
          value={
            p.reraVerified ? (
              <span className="inline-flex items-center gap-1.5 text-good">
                <ShieldCheck className="h-3.5 w-3.5" /> RERA
              </span>
            ) : (
              <span className="text-faint">Pending</span>
            )
          }
          label={p.reraVerified ? "Verified" : "Verification"}
        />
        <Stat value={p.activeListings} label="Listings" />
        <Stat value={p.operatingAreaCount} label="Areas" />
      </div>

      {/* Actions. "Contact" routes to the profile, where the enquiry form and
          its consent copy live - the contact detail is never on the card. */}
      <div className="mt-5 space-y-2.5">
        <Link
          href={`/directory/${p.slug}#enquire`}
          className="flex h-11 items-center justify-center rounded-full bg-brand text-[14px] font-bold text-on-brand transition hover:bg-brand-strong"
        >
          Contact Now
        </Link>
        <Link
          href={`/directory/${p.slug}`}
          className="flex h-11 items-center justify-center rounded-full border border-line-strong text-[14px] font-semibold text-ink transition hover:border-brand hover:text-brand-ink"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="flex-none text-[13px] text-faint">{label}</dt>
      <dd className="truncate text-right text-[13px] font-semibold text-ink">
        {value}
      </dd>
    </div>
  );
}

function Stat({
  value,
  label,
}: {
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="px-2 text-center">
      <div className="text-[14px] font-bold tabular-nums text-ink">{value}</div>
      <div className="mono-label mt-0.5 text-[9.5px] text-faint">{label}</div>
    </div>
  );
}
