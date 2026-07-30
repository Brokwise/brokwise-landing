import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { REGISTER_URL } from "@/components/v2/content";

export default function BrokerSignupCta() {
  return (
    <div className="px-6 pb-20 pt-4">
      <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-5 rounded-[28px] border border-brand/25 bg-surface px-8 py-12 text-center shadow-[0_18px_50px_-24px_rgba(0,0,0,0.8)] sm:flex-row sm:justify-between sm:text-left">
        <div>
          <h2 className="font-display text-[26px] font-bold leading-tight tracking-tight text-ink">
            Are you a broker or agency?
          </h2>
          <p className="mt-2 max-w-[46ch] text-[14.5px] text-dmuted">
            Sign up to Brokwise and get listed in this directory - build a
            verified profile and start receiving qualified enquiries.
          </p>
        </div>
        <Link
          href={REGISTER_URL}
          className="mono-label inline-flex flex-none items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[13px] font-bold text-on-brand transition hover:bg-brand-strong"
        >
          Sign up to Brokwise
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
