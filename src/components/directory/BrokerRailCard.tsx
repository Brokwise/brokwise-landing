import Link from "next/link";
import { ShieldCheck, MapPin } from "lucide-react";

export interface RailItem {
  name: string;
  /** Deep link to a profile, or undefined for a non-navigable broker entry. */
  href?: string;
  avatar?: string;
  initials: string;
  reraNumber?: string;
  typeLabel: string;
  experience?: number;
  location?: string;
  listings?: number;
  areas?: number;
}

/**
 * Card used in the "recommended / our brokers" rail at the foot of a profile.
 *
 * Mirrors the marketing mock's layout but carries only verifiable facts (RERA,
 * experience, live listing count, area count) - no ratings, review counts or
 * online-status, which the platform does not track.
 */
export default function BrokerRailCard({ item }: { item: RailItem }) {
  return (
    <div className="flex w-[300px] flex-none flex-col rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_18px_50px_-32px_rgba(11,21,34,0.5)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-30px_rgba(11,21,34,0.55)]">
      <div className="flex items-start gap-3.5">
        {item.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.avatar}
            alt={item.name}
            className="h-14 w-14 flex-none rounded-full object-cover ring-2 ring-v2-gold/60"
          />
        ) : (
          <div className="grid h-14 w-14 flex-none place-items-center rounded-full bg-v2-navy text-lg font-bold text-v2-gold ring-2 ring-v2-gold/60">
            {item.initials}
          </div>
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          <h4 className="flex items-center gap-1.5 truncate font-display text-[16px] font-bold tracking-tight text-v2-ink">
            <span className="truncate">{item.name}</span>
            {item.reraNumber && (
              <ShieldCheck className="h-4 w-4 flex-none text-emerald-500" aria-label="RERA verified" />
            )}
          </h4>
          <p className="mono-label mt-1 truncate text-[11px] font-semibold text-v2-ink/50">
            {item.reraNumber ? `RERA ID: ${item.reraNumber}` : item.typeLabel}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-[12.5px]">
        {typeof item.experience === "number" && item.experience > 0 && (
          <Row label="Experience" value={`${item.experience}+ Years`} />
        )}
        {item.location && (
          <Row
            label="Location"
            value={
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-v2-ink/40" /> {item.location}
              </span>
            }
          />
        )}
      </dl>

      {(item.listings != null || item.areas != null) && (
        <div className="mt-4 grid grid-cols-2 divide-x divide-black/[0.06] rounded-xl bg-[#F5F5F6] py-2.5">
          <Mini value={item.listings ?? 0} label="Listings" />
          <Mini value={item.areas ?? 0} label="Areas" />
        </div>
      )}

      {item.href ? (
        <Link
          href={item.href}
          className="mt-4 flex h-11 items-center justify-center rounded-full bg-v2-gold text-[14px] font-bold text-v2-ink transition hover:bg-v2-gold-2"
        >
          View Profile
        </Link>
      ) : (
        <span className="mono-label mt-4 flex h-11 items-center justify-center rounded-full border border-black/10 text-[12px] font-semibold text-v2-ink/50">
          {item.typeLabel}
        </span>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="flex-none text-v2-ink/45">{label}</dt>
      <dd className="truncate text-right font-semibold text-v2-ink">{value}</dd>
    </div>
  );
}

function Mini({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="px-2 text-center">
      <div className="text-[15px] font-bold tabular-nums text-v2-ink">{value}</div>
      <div className="mono-label mt-0.5 text-[9px] text-v2-ink/45">{label}</div>
    </div>
  );
}
