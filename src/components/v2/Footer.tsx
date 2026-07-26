"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { APP_URL, FOOTER_CONTACT } from "./content";

const PLATFORM_LINKS = [
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Discover brokers", href: "/directory" },
];

const SUPPORT_LINKS = [
  { name: "FAQ", href: "#faq" },
  { name: "Support", href: "/support" },
  { name: "For brokers & firms", href: APP_URL },
  { name: "Terms of Service", href: "/terms-and-conditions" },
  { name: "Platform Terms", href: "/platform-terms" },
  { name: "Privacy Policy", href: "/privacy-policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    window.location.href = `mailto:${FOOTER_CONTACT.email}?subject=${encodeURIComponent(
      "Newsletter signup",
    )}&body=${encodeURIComponent(`Please subscribe me: ${trimmed}`)}`;
  };

  return (
    <footer className="bg-v2-navy pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand + contact */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="Brokwise logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg ring-1 ring-white/10"
              />
              <p className="font-display text-3xl font-bold text-v2-gold">Brokwise</p>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              India&apos;s private network for real estate brokers. Close faster.
              Grow bigger.
            </p>

            <address className="mt-6 space-y-3 not-italic text-sm text-white/50">
              <p className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-v2-gold/70" />
                <span>
                  {FOOTER_CONTACT.address[0]}
                  <br />
                  {FOOTER_CONTACT.address[1]}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-v2-gold/70" />
                <a href={FOOTER_CONTACT.phoneHref} className="hover:text-v2-gold">
                  {FOOTER_CONTACT.phone}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-v2-gold/70" />
                <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:text-v2-gold">
                  {FOOTER_CONTACT.email}
                </a>
              </p>
            </address>

            <a
              href={FOOTER_CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Brokwise on Instagram"
              className="group mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-v2-gold/25 text-v2-gold transition-all hover:bg-v2-gold hover:text-v2-ink"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Platform */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              Platform
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="transition-colors hover:text-v2-gold">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="md:col-span-2">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-wide text-white">
              Support
            </h4>
            <ul className="space-y-3 text-sm text-white/50">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="transition-colors hover:text-v2-gold">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3">
            <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-white">
              Stay updated
            </h4>
            <p className="mb-4 text-sm text-white/50">Subscribe to our newsletter</p>
            <form onSubmit={subscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-v2-gold/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-v2-gold px-4 py-2.5 text-sm font-semibold text-v2-ink transition-colors hover:bg-v2-gold-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>&copy; 2026 Brokwise. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/platform-terms" className="hover:text-v2-gold">
              Platform Terms
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-v2-gold">
              Terms of Use for Brokers
            </Link>
            <Link href="/privacy-policy" className="hover:text-v2-gold">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
