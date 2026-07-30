/** Format an INR amount as a compact lakh/crore string (e.g. 12500000 -> "1.25 Cr"). */
export function inr(n: number): string {
  if (n >= 10_000_000) {
    const cr = n / 10_000_000;
    return `₹${cr % 1 === 0 ? cr : cr.toFixed(cr < 10 ? 2 : 1)} Cr`;
  }
  if (n >= 100_000) {
    const l = n / 100_000;
    return `₹${l % 1 === 0 ? l : l.toFixed(l < 10 ? 1 : 0)} L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
}

export function priceBand(range: { min: number; max: number } | null): string | null {
  if (!range) return null;
  if (range.min === range.max) return inr(range.min);
  return `${inr(range.min)} - ${inr(range.max)}`;
}

const UNIT_LABEL: Record<string, string> = {
  SQ_FT: "sq ft",
  SQ_METER: "sq m",
  SQ_YARDS: "sq yd",
  ACRES: "acres",
  HECTARE: "ha",
  BIGHA: "bigha",
  GAJ: "gaj",
};

export function sizeBand(
  range: { min: number; max: number; unit: string } | null
): string | null {
  if (!range) return null;
  const unit = UNIT_LABEL[range.unit] || range.unit.toLowerCase();
  const fmt = (v: number) => v.toLocaleString("en-IN");
  return range.min === range.max
    ? `${fmt(range.min)} ${unit}`
    : `${fmt(range.min)}-${fmt(range.max)} ${unit}`;
}

export function bhkBand(range: { min: number; max: number } | null): string | null {
  if (!range) return null;
  return range.min === range.max ? `${range.min} BHK` : `${range.min}-${range.max} BHK`;
}
