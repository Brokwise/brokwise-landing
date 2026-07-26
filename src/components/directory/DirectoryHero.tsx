import React from "react";
import Image from "next/image";
import { ShieldCheck, MapPin, Mail } from "lucide-react";
import DirectorySearch from "./DirectorySearch";

/** Shared navy background band for directory hero sections. */
export function DirectoryHeroShell({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-v2-navy text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-v2-navy via-v2-navy/85 to-v2-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-v2-navy/70 via-transparent to-v2-navy" />
      </div>
      <div
        className={`relative z-10 mx-auto max-w-6xl px-5 md:px-8 ${
          compact ? "pt-28 pb-12 md:pt-32 md:pb-14" : "pt-32 pb-14 md:pt-40 md:pb-16"
        }`}
      >
        {children}
      </div>
    </section>
  );
}

type Props = {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  defaultQuery?: string;
  compact?: boolean;
};

export default function DirectoryHero({
  title,
  subtitle,
  eyebrow = "Public broker directory",
  defaultQuery = "",
  compact = false,
}: Props) {
  return (
    <DirectoryHeroShell compact={compact}>
      <p className="mb-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-v2-gold">
        {eyebrow}
      </p>
      <h1 className="max-w-3xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          {subtitle}
        </p>
      )}

      <DirectorySearch defaultQuery={defaultQuery} className="mt-7" />

      {!compact && (
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/60">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-v2-gold" />
            <b className="font-semibold text-white/85">RERA-verified</b> agencies
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-v2-gold" />
            Service areas, <b className="font-semibold text-white/85">not exact listings</b>
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-v2-gold" />
            Enquiries delivered <b className="font-semibold text-white/85">in-app</b>
          </span>
        </div>
      )}
    </DirectoryHeroShell>
  );
}
