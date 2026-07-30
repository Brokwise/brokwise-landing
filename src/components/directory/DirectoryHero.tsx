import React from "react";
import Image from "next/image";
import { ShieldCheck, MapPin, Mail } from "lucide-react";

/**
 * Shared navy background band for directory hero sections.
 *
 * The artwork is weighted to the right and masked left-to-right so the
 * headline always sits on near-solid navy, whatever the image contains.
 */
export function DirectoryHeroShell({
  children,
  compact = false,
}: {
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-paper text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-new.png"
          alt=""
          fill
          priority
          quality={85}
          /* Biased right-of-centre so the glowing skyline and network arcs sit
             beside the headline rather than behind it. */
          className="object-cover object-[68%_50%]"
        />
        {/* Left-to-right mask: solid behind the copy, artwork visible right. */}
        <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/85 to-paper/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-transparent to-paper" />
      </div>
      <div
        className={`relative z-10 mx-auto max-w-[1160px] px-6 ${
          compact ? "pt-28 pb-10 md:pt-32 md:pb-12" : "pt-28 pb-10 md:pt-32 md:pb-14"
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
  compact?: boolean;
};

export default function DirectoryHero({
  title,
  subtitle,
  eyebrow = "Public broker directory",
  compact = false,
}: Props) {
  return (
    <DirectoryHeroShell compact={compact}>
      <span className="mono-label inline-flex items-center gap-2.5 rounded-full border border-brand/70 px-4 py-2 text-[11.5px] font-bold text-brand-ink">
        <span
          aria-hidden
          className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_3px_hsl(var(--brand)/0.25)]"
        />
        {eyebrow}
      </span>

      <h1 className="mt-7 max-w-[15ch] font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-[54px]">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-dmuted">
          {subtitle}
        </p>
      )}

      {!compact && (
        <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3 text-[14px] font-medium text-brand-ink">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            RERA-verified agencies
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Service areas
          </span>
          <span className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Enquiries delivered
          </span>
        </div>
      )}
    </DirectoryHeroShell>
  );
}
