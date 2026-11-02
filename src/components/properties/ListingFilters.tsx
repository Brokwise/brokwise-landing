import { ChevronDown, MapPin } from "lucide-react";
import { CATEGORY_LABEL } from "@/lib/directory/types";
import type { ListingQuery } from "@/lib/properties/types";

const fieldCls =
  "h-11 w-full rounded-xl border border-line-strong bg-surface-2 px-3.5 text-[14px] text-ink outline-none transition placeholder:text-faint focus:border-brand";

/**
 * A plain GET form: filters work without JavaScript and every result page is a
 * crawlable URL, which is the point of public listings.
 */
export default function ListingFilters({ query }: { query: ListingQuery }) {
  return (
    <div className="mx-auto max-w-[1160px] px-6">
      <form
        action="/properties#listing-results"
        method="get"
        className="grid items-end gap-4 rounded-2xl border border-line bg-surface p-5 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.7)] sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto]"
      >
        <Field label="City" htmlFor="pl-city">
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              id="pl-city"
              name="city"
              defaultValue={query.city ?? ""}
              placeholder="Jaipur, Pune, Dubai..."
              className={`${fieldCls} pl-10`}
            />
          </div>
        </Field>

        <Field label="Looking to" htmlFor="pl-purpose">
          <Select id="pl-purpose" name="listingPurpose" value={query.listingPurpose}>
            <option value="">Buy or rent</option>
            <option value="SALE">Buy</option>
            <option value="RENT">Rent</option>
          </Select>
        </Field>

        <Field label="Property category" htmlFor="pl-category">
          <Select id="pl-category" name="propertyCategory" value={query.propertyCategory}>
            <option value="">All categories</option>
            {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="BHK" htmlFor="pl-bhk">
          <Select id="pl-bhk" name="bhk" value={query.bhk}>
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} BHK
              </option>
            ))}
            <option value="5">5+ BHK</option>
          </Select>
        </Field>

        <button
          type="submit"
          className="h-11 rounded-xl bg-brand px-7 text-[14px] font-bold text-on-brand transition hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Search
        </button>
      </form>
    </div>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[12.5px] font-medium text-faint">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({
  id,
  name,
  value,
  children,
}: {
  id: string;
  name: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select id={id} name={name} defaultValue={value ?? ""} className={`${fieldCls} appearance-none pr-9`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
    </div>
  );
}
