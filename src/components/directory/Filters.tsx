"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search, Check } from "lucide-react";
import { SPEC_LABEL } from "@/lib/directory/types";

const TYPE_OPTIONS = [
  { value: "", label: "All profiles" },
  { value: "BROKER", label: "Individual brokers" },
  { value: "PARTNER", label: "Channel partners" },
];

const SPECS: (keyof typeof SPEC_LABEL)[] = ["BUY", "SELL", "RENT"];
const CATEGORIES = ["RESIDENTIAL", "COMMERCIAL", "LAND", "INDUSTRIAL"] as const;

// "LAND" is a UI convenience mapped to AGRICULTURAL for the backend category set.
const CAT_TO_QUERY: Record<string, string> = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
  LAND: "AGRICULTURAL",
  INDUSTRIAL: "INDUSTRIAL",
};
const CAT_LABEL_UI: Record<string, string> = {
  RESIDENTIAL: "Residential",
  COMMERCIAL: "Commercial",
  LAND: "Land",
  INDUSTRIAL: "Industrial",
};

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = {
    q: params.get("q") || "",
    city: params.get("city") || "",
    type: params.get("type") || "",
    spec: (params.get("spec") || "").split(",").filter(Boolean),
    category: (params.get("category") || "").split(",").filter(Boolean),
  };

  const push = useCallback(
    (next: Record<string, string>) => {
      const sp = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(next)) {
        if (v) sp.set(k, v);
        else sp.delete(k);
      }
      sp.delete("page");
      startTransition(() => router.push(`/directory?${sp.toString()}`));
    },
    [params, router]
  );

  const toggleInCsv = (key: "spec" | "category", value: string) => {
    const set = new Set(current[key]);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    push({ [key]: Array.from(set).join(",") });
  };

  const selectCls =
    "rounded-lg border border-line-strong bg-surface px-3 py-2 text-sm font-medium text-ink outline-none focus:border-brand";

  return (
    <div
      className={`sticky top-[64px] z-30 border-y border-line bg-paper/90 py-4 backdrop-blur md:top-[72px] ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1160px] flex-col gap-3.5 px-6">
        {/* Row 1: search + the two scope selects */}
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex min-w-[240px] flex-1 items-center gap-2.5 rounded-lg border border-line-strong bg-surface px-4 py-2.5 focus-within:border-brand">
            <Search className="h-4 w-4 text-faint" />
            <input
              defaultValue={current.q}
              onKeyDown={(e) => {
                if (e.key === "Enter") push({ q: (e.target as HTMLInputElement).value });
              }}
              placeholder="Search by name, agency or area..."
              aria-label="Search"
              className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
            />
          </label>
          <select
            value={current.city}
            onChange={(e) => push({ city: e.target.value })}
            aria-label="Filter by city"
            className={selectCls}
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={current.type}
            onChange={(e) => push({ type: e.target.value })}
            aria-label="Filter by profile type"
            className={selectCls}
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Row 2: labelled multi-select clusters */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <ChipGroup label="Looking to">
            {SPECS.map((s) => (
              <Chip
                key={s}
                active={current.spec.includes(s)}
                onClick={() => toggleInCsv("spec", s)}
                label={SPEC_LABEL[s]}
              />
            ))}
          </ChipGroup>
          <ChipGroup label="Property type">
            {CATEGORIES.map((c) => {
              const q = CAT_TO_QUERY[c]!;
              return (
                <Chip
                  key={c}
                  active={current.category.includes(q)}
                  onClick={() => toggleInCsv("category", q)}
                  label={CAT_LABEL_UI[c]}
                />
              );
            })}
          </ChipGroup>
        </div>
      </div>
    </div>
  );
}

function ChipGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="mono-label text-[10.5px] text-faint">
        {label} <span className="opacity-70">· any</span>
      </span>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`mono-label inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition ${
        active
          ? "border-brand bg-brand text-on-brand"
          : "border-line-strong bg-surface text-dmuted hover:border-brand hover:text-ink"
      }`}
    >
      {active && <Check className="h-3 w-3" />}
      {label}
    </button>
  );
}
