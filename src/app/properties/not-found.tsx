import Link from "next/link";
import DirectoryHero from "@/components/directory/DirectoryHero";

export default function NotFound() {
  return (
    <div className="landing-v2">
      <main className="directory-scope min-h-screen bg-paper text-ink">
        <DirectoryHero
          eyebrow="404"
          title="This listing isn't available."
          subtitle="It may have been sold, rented, or taken off Brokwise by the broker."
          compact
        />
        <div className="mx-auto flex max-w-[1160px] flex-col items-center px-6 py-16 text-center">
          <p className="max-w-[46ch] text-[15.5px] text-dmuted">
            Plenty of other properties from verified brokers are still open.
          </p>
          <Link
            href="/properties"
            className="mt-6 rounded-full bg-brand px-6 py-3 text-[15px] font-semibold text-on-brand transition hover:bg-brand-strong"
          >
            Browse all properties
          </Link>
        </div>
      </main>
    </div>
  );
}
