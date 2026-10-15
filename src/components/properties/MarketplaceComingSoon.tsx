import { CalendarClock, EyeOff, ShieldCheck } from "lucide-react";
import { DirectoryHeroShell } from "@/components/directory/DirectoryHero";
import BrokerSignupCta from "@/components/directory/BrokerSignupCta";

function formatLaunchDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(iso));
}

/**
 * Shown at /properties until an admin opens the customer marketplace (admin
 * Settings > Feature launches). Brokers can already choose listings to make
 * public behind it.
 */
export default function MarketplaceComingSoon({ liveAt }: { liveAt: string | null }) {
  const launchDate = liveAt ? formatLaunchDate(liveAt) : null;
  return (
    <div className="landing-v2">
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHeroShell>
          <span className="mono-label inline-flex items-center gap-2.5 rounded-full border border-brand/70 px-4 py-2 text-[11.5px] font-bold text-brand-ink">
            <span
              aria-hidden
              className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_3px_hsl(var(--brand)/0.25)]"
            />
            {launchDate ? `Launching ${launchDate}` : "Launching soon"}
          </span>
          <h1 className="mt-7 max-w-[18ch] font-display text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-[54px]">
            Properties from verified brokers, almost here.
          </h1>
          <p className="mt-5 max-w-[52ch] text-[15px] leading-relaxed text-dmuted">
            Soon you can browse homes, offices and land listed by RERA-verified brokers, and
            reach them without your number being passed around.{" "}
            {launchDate ? `We open on ${launchDate}.` : "Check back shortly."}
          </p>
        </DirectoryHeroShell>

        <div className="px-6 py-20">
          <div className="mx-auto max-w-[720px] rounded-2xl border border-line bg-surface px-8 py-14 text-center">
            <CalendarClock className="mx-auto h-9 w-9 text-brand-ink" aria-hidden />
            <h2 className="mt-5 font-display text-[24px] font-bold leading-tight tracking-tight text-ink">
              Coming soon
            </h2>
            <p className="mx-auto mt-2 max-w-[46ch] text-[14.5px] text-dmuted">
              Brokers are choosing which of their listings to show you right now.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[14px] font-medium text-brand-ink">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> Verified brokers only
              </span>
              <span className="flex items-center gap-2">
                <EyeOff className="h-4 w-4" /> Your number stays private
              </span>
            </div>
          </div>
        </div>

        <BrokerSignupCta />
      </main>
    </div>
  );
}
