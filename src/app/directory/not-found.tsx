import Link from "next/link";
import DirectoryHero from "@/components/directory/DirectoryHero";
import Navbar from "@/components/v2/Navbar";

export default function NotFound() {
  return (
    <div className="landing-v2">
      <Navbar />
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHero
          eyebrow="404"
          title="We couldn't find that profile."
          subtitle="This directory profile may have been moved or is no longer listed. Search the directory or browse all verified brokers below."
          compact
        />
        <div className="mx-auto flex max-w-[1160px] flex-col items-center px-6 py-16 text-center">
          <p className="max-w-[46ch] text-[15.5px] text-dmuted">
            Try a different name or area, or head back to the full directory of
            verified brokers, agencies and channel partners.
          </p>
          <Link
            href="/directory"
            className="mt-6 rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-on-brand transition hover:bg-brand-strong"
          >
            Browse all brokers
          </Link>
        </div>
      </main>
    </div>
  );
}
