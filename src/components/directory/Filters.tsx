"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { Search, ChevronDown } from "lucide-react";
import { SPEC_LABEL } from "@/lib/directory/types";

const TYPE_OPTIONS = [
  { value: "", label: "All specialist types" },
  { value: "BROKER", label: "Individual brokers" },
  { value: "PARTNER", label: "Channel partners" },
];

const SPECS: (keyof typeof SPEC_LABEL)[] = ["BUY", "SELL", "RENT"];

/**
 * Property types, matched against DirectoryProfile.propertyTypes by the
 * backend's `propertyType` filter. Kept short so the row does not wrap.
 */
const PROPERTY_TYPES = [
  "Apartment",
  "Villa",
  "Plot",
  "Office Space",
  "Industrial Land",
  "Warehouse",
];

export default function Filters({ cities }: { cities: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = {
    q: params.get("q") || "",
    city: params.get("city") || "",
    type: params.get("type") || "",
    spec: (params.get("spec") || "").split(",").filter(Boolean),
    propertyType: (params.get("propertyType") || "").split(",").filter(Boolean),
  };

  // The three text/select inputs are staged and committed by "Apply filters",
  // which is what the button implies. The chips below are toggles and apply on
  // click, so they always give immediate feedback.
  const [draft, setDraft] = useState({
    q: current.q,
    city: current.city,
    type: current.type,
  });

  useEffect(() => {
    setDraft({ q: current.q, city: current.city, type: current.type });
  }, [current.q, current.city, current.type]);

  const push = useCallback(
    (next: Record<string, string>) => {
      const sp = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(next)) {
        if (v) sp.set(k, v);
        else sp.delete(k);
      }
      sp.delete("page");
      startTransition(() =>
        router.push(`/directory?${sp.toString()}#directory-results`)
      );
    },
    [params, router]
  );

  const apply = () => push(draft);

  const toggleInCsv = (key: "spec" | "propertyType", value: string) => {
    const set = new Set(current[key]);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    push({ [key]: Array.from(set).join(",") });
  };

  const fieldCls =
    "h-11 w-full rounded-xl border border-line-strong bg-surface-2 px-3.5 text-[14px] text-ink outline-none transition placeholder:text-faint focus:border-brand";

  return (
    <div className="mx-auto max-w-[1160px] px-6">
      <div
        className={`rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] transition-opacity ${
          isPending ? "opacity-70" : ""
        }`}
      >
        {/* Row 1: search, city, type, apply.
            Four across only from lg - at md the columns are narrow enough that
            the select labels and the search placeholder get clipped. */}
        <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr_auto]">
          <Field label="Search" htmlFor="dir-q">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
              <input
                id="dir-q"
                value={draft.q}
                onChange={(e) => setDraft((d) => ({ ...d, q: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && apply()}
                placeholder="Keyword or Broker Name..."
                className={`${fieldCls} pl-10`}
              />
            </div>
          </Field>

          <Field label="City" htmlFor="dir-city">
            <SelectShell>
              <select
                id="dir-city"
                value={draft.city}
                onChange={(e) => setDraft((d) => ({ ...d, city: e.target.value }))}
                className={`${fieldCls} appearance-none pr-9`}
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <Field label="Broker Type" htmlFor="dir-type">
            <SelectShell>
              <select
                id="dir-type"
                value={draft.type}
                onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
                className={`${fieldCls} appearance-none pr-9`}
              >
                {TYPE_OPTIONS.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </SelectShell>
          </Field>

          <button
            type="button"
            onClick={apply}
            className="h-11 rounded-xl bg-brand px-7 text-[14px] font-bold text-on-brand transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Apply Filters
          </button>
        </div>

        {/* Row 2: intent segments left, property types right */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Looking to"
            className="inline-flex rounded-full border border-line-strong bg-surface-2 p-1"
          >
            {SPECS.map((s) => {
              const active = current.spec.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInCsv("spec", s)}
                  className={`rounded-full px-5 py-1.5 text-[13px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    active
                      ? "bg-brand text-on-brand"
                      : "text-faint hover:text-ink"
                  }`}
                >
                  {SPEC_LABEL[s]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {PROPERTY_TYPES.map((t) => {
              const active = current.propertyType.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleInCsv("propertyType", t)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    active
                      ? "border-brand bg-brand text-on-brand"
                      : "border-line-strong bg-surface-2 text-dmuted hover:border-brand hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[12.5px] font-medium text-faint"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
    </div>
  );
}
