"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

/** Navy-on-glass search field used inside directory hero bands. */
export default function DirectorySearch({
  defaultQuery = "",
  className = "",
}: {
  defaultQuery?: string;
  className?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState(defaultQuery);

  const scrollToResults = () => {
    const el = document.getElementById("directory-results");
    if (!el) return;
    if (window.lenis) window.lenis.scrollTo(el, { offset: -90 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    // scroll:false keeps our position so we can smooth-scroll to the results
    // ourselves instead of the router jumping to the top.
    router.push(`/directory${trimmed ? `?q=${encodeURIComponent(trimmed)}` : ""}`, {
      scroll: false,
    });
    // Reveal the results below the hero. On the list page the results container
    // is already mounted; on other directory pages this no-ops until it loads.
    requestAnimationFrame(scrollToResults);
  };

  return (
    <form
      onSubmit={submit}
      className={`flex max-w-2xl items-center gap-2 rounded-full border border-white/15 bg-white/10 p-1.5 pl-5 backdrop-blur-md transition-colors focus-within:border-v2-gold/50 ${className}`}
    >
      <Search className="h-5 w-5 shrink-0 text-white/50" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name, agency or area..."
        aria-label="Search brokers"
        className="w-full min-w-0 bg-transparent text-[15px] text-white outline-none placeholder:text-white/40"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-v2-gold px-6 py-2.5 text-sm font-semibold text-v2-ink transition-colors hover:bg-v2-gold-2"
      >
        Search
      </button>
    </form>
  );
}
