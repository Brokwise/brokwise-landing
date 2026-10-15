import Link from "next/link";
import { BadgeCheck, Building2, Images } from "lucide-react";
import {
  categoryLabel,
  displayableImages,
  listingPrice,
  listingSize,
  listingSlug,
  listingTitle,
} from "@/lib/properties/format";
import type { PublicListing } from "@/lib/properties/types";

/**
 * Public listing card. Shows what a customer needs to judge interest - area,
 * price, size, photos - and never the address or the broker: those are what a
 * signed-up customer earns by sending a request.
 */
export default function ListingCard({ p }: { p: PublicListing }) {
  const image = displayableImages(p)[0];
  const price = listingPrice(p);
  const size = listingSize(p);
  return (
    <Link
      href={`/properties/${listingSlug(p)}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] transition hover:-translate-y-0.5 hover:border-line-strong"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={listingTitle(p)}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-faint">
            <Building2 className="h-10 w-10" aria-hidden />
          </div>
        )}
        <span className="mono-label absolute left-3 top-3 rounded-full bg-paper/85 px-3 py-1 text-[10.5px] font-bold text-brand-ink backdrop-blur">
          {p.listingPurpose === "RENT" ? "For rent" : "For sale"}
        </span>
        {p.imageCount > 1 && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-paper/85 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur">
            <Images className="h-3.5 w-3.5" aria-hidden /> {p.imageCount}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[12px] font-medium text-faint">
          {categoryLabel(p)}
          {p.city ? ` · ${p.city}` : ""}
        </p>
        <h3 className="mt-1 line-clamp-2 font-display text-[18px] font-bold leading-snug tracking-tight text-ink">
          {p.propertyTitle || listingTitle(p)}
        </h3>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[19px] font-bold tabular-nums text-brand-ink">{price ?? "Price on request"}</p>
            {size && <p className="mt-0.5 text-[12.5px] text-dmuted">{size}</p>}
          </div>
          {p.isVerified && (
            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-good">
              <BadgeCheck className="h-4 w-4" aria-hidden /> Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
