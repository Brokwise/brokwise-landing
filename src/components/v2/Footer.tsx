import Link from "next/link";
import Image from "next/image";
import { APP_URL, FOOTER_CONTACT } from "./content";

export default function Footer() {
  return (
    <footer className="bg-v2-navy pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Brokwise Logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full"
              />
              <p className="font-display text-3xl font-bold text-v2-gold">Brokwise</p>
            </div>
          </div>

          {/* Platform */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-sm font-semibold text-v2-gold">Platform</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link href={APP_URL} className="transition-colors hover:text-v2-gold">
                  For Brokers &amp; Firms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="mb-5 text-sm font-semibold text-v2-gold">Contact</h4>

            <p className="text-sm font-semibold text-white">Office</p>
            <address className="mt-2 not-italic text-sm leading-relaxed text-white/50">
              {FOOTER_CONTACT.address[0]}
              <br />
              {FOOTER_CONTACT.address[1]}
            </address>

            <p className="mt-6 text-sm font-semibold text-white">Get In Touch</p>
            <div className="mt-2 space-y-2 text-sm text-white/50">
              <p>
                <a href={FOOTER_CONTACT.phoneHref} className="hover:text-v2-gold">
                  {FOOTER_CONTACT.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${FOOTER_CONTACT.email}`} className="hover:text-v2-gold">
                  {FOOTER_CONTACT.email}
                </a>
              </p>
            </div>
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
