"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { metaPixel } from "@/lib/fpixel";
import { REGISTER_URL } from "./content";

const LINKS = [
  { name: "Features", href: "/#features" },
  { name: "Directory", href: "/directory" },
  { name: "Pricing", href: "/#pricing" },
  { name: "FAQ", href: "/#faq" },
  { name: "Support", href: "/support" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const trackSignup = (placement: string) =>
    metaPixel.trackWithBrokwiseCustom(
      "Lead",
      { content_name: "V2 Nav Sign Up" },
      "BW_Nav_AppSignup_Click",
      { placement },
    );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "pointer-events-auto mt-3 flex w-full max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-300 md:mt-5 md:px-6",
          scrolled
            ? "border-white/10 bg-v2-navy/85 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "border-white/10 bg-v2-navy/50 backdrop-blur-md",
        )}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.webp"
            alt="Brokwise logo"
            width={36}
            height={36}
            className="h-8 w-8 rounded-md ring-1 ring-white/10 md:h-9 md:w-9"
          />
          <span className="font-display text-xl font-bold tracking-tight text-white md:text-2xl">
            Brokwise
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.name}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-v2-gold"
            >
              {l.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={REGISTER_URL}
            onClick={() => trackSignup("v2_nav_desktop")}
            className="hidden rounded-full bg-v2-gold px-5 py-2 text-sm font-semibold text-v2-ink transition-all hover:bg-v2-gold-2 hover:scale-[1.03] md:inline-flex"
          >
            Sign Up
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-1.5 text-v2-gold transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          "pointer-events-auto fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-v2-navy/98 backdrop-blur-xl transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        {LINKS.map((l) => (
          <Link
            key={l.name}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-2xl font-medium text-white/80 transition-colors hover:text-v2-gold"
          >
            {l.name}
          </Link>
        ))}
        <Link
          href={REGISTER_URL}
          onClick={() => {
            trackSignup("v2_nav_mobile");
            setOpen(false);
          }}
          className="mt-2 rounded-full bg-v2-gold px-8 py-3 text-lg font-semibold text-v2-ink"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
