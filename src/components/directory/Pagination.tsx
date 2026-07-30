import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Builds page N of the given query string params (all other filters kept). */
function pageHref(
  searchParams: Record<string, string | string[] | undefined>,
  page: number
): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(searchParams)) {
    if (k === "page") continue;
    const value = Array.isArray(v) ? v[0] : v;
    if (value) qs.set(k, value);
  }
  if (page > 1) qs.set("page", String(page));
  const query = qs.toString();
  return `/directory${query ? `?${query}` : ""}#directory-results`;
}

/** Page numbers to render, with `null` standing in for an ellipsis. */
function pageList(current: number, total: number): (number | null)[] {
  const pages = new Set([1, total, current - 1, current, current + 1]);
  const sorted = Array.from(pages).filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const withGaps: (number | null)[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) withGaps.push(null);
    withGaps.push(p);
    prev = p;
  }
  return withGaps;
}

export default function Pagination({
  page,
  totalPages,
  searchParams,
}: {
  page: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}) {
  if (totalPages <= 1) return null;

  const pages = pageList(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-1.5"
    >
      <PageLink
        href={pageHref(searchParams, page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </PageLink>

      {pages.map((p, i) =>
        p === null ? (
          <span
            key={`gap-${i}`}
            className="px-1.5 text-[13.5px] text-faint"
            aria-hidden
          >
            &hellip;
          </span>
        ) : (
          <PageLink key={p} href={pageHref(searchParams, p)} active={p === page}>
            {p}
          </PageLink>
        )
      )}

      <PageLink
        href={pageHref(searchParams, page + 1)}
        disabled={page >= totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </PageLink>
    </nav>
  );
}

function PageLink({
  href,
  active,
  disabled,
  children,
  ...rest
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const base =
    "grid h-9 min-w-9 place-items-center rounded-full px-2 text-[13.5px] font-semibold transition";

  if (disabled) {
    return (
      <span className={`${base} cursor-not-allowed text-faint/50`} aria-disabled>
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${
        active
          ? "bg-brand text-on-brand"
          : "text-dmuted hover:bg-surface-2 hover:text-ink"
      }`}
      {...rest}
    >
      {children}
    </Link>
  );
}
