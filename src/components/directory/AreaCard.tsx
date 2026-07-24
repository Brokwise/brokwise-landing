import { MapPin } from "lucide-react";
import type { AreaSummary } from "@/lib/directory/types";
import { CATEGORY_LABEL } from "@/lib/directory/types";
import { priceBand, sizeBand, bhkBand } from "@/lib/directory/format";

export default function AreaCard({ area }: { area: AreaSummary }) {
  const { summary } = area;

  return (
    <div className="rounded-xl border border-line bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[16px] font-extrabold">
          <MapPin className="h-4 w-4 text-dmark" />
          {area.label}
        </div>
        {area.city && (
          <span className="mono-label text-[10.5px] text-faint">{area.city}</span>
        )}
      </div>

      {!summary.identifiable ? (
        <p className="mt-3 text-[13px] italic text-dmuted">
          Properties available in this area - enquire for current options.
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-3">
          {summary.categories.map((c) => {
            const bits = [
              bhkBand(c.bhkRange),
              sizeBand(c.sizeRange),
              priceBand(c.priceRange),
            ].filter(Boolean) as string[];
            return (
              <div key={c.category} className="border-l-2 border-line-strong pl-3">
                <div className="flex items-center gap-2">
                  <span className="mono-label rounded-md bg-brand-soft px-2 py-0.5 text-[10.5px] font-medium text-brand-ink">
                    {CATEGORY_LABEL[c.category]}
                  </span>
                  <span className="mono-label text-[12px] tabular-nums text-dmuted">
                    {c.count} active
                  </span>
                </div>
                {bits.length > 0 && (
                  <div className="mono-label mt-1.5 text-[12.5px] tabular-nums text-ink">
                    {bits.join("  ·  ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
