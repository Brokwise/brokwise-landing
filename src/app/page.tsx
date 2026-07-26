import Navbar from "@/components/v2/Navbar";
import Hero from "@/components/v2/Hero";
import Testimonials from "@/components/v2/Testimonials";
import Comparison from "@/components/v2/Comparison";
import Steps from "@/components/v2/Steps";
import CtaBand from "@/components/v2/CtaBand";
import Features from "@/components/v2/Features";
import Network from "@/components/v2/Network";
import Directory from "@/components/v2/Directory";
import Pricing from "@/components/v2/Pricing";
import Faq from "@/components/v2/Faq";
import Footer from "@/components/v2/Footer";
import MetaPixelPageEvents from "@/components/meta-pixel-page-events";
import { DEFAULT_PROMO, PromoBanner } from "@/components/hero";

// Fetch the promo banner on the server so its text is present in the initial
// HTML (crawlable / no post-hydration flash). Always resolves — any failure
// falls back to DEFAULT_PROMO so the page can never break on a bad/absent API.
async function getPromoBanner(): Promise<PromoBanner> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return DEFAULT_PROMO;

  try {
    const res = await fetch(`${base}/admin/tier-config`, {
      // Re-fetch at most every 5 minutes; keeps the page static/ISR + fast.
      next: { revalidate: 300 },
    });
    if (!res.ok) return DEFAULT_PROMO;

    const json = await res.json();
    const b = json?.data?.publicPromoBanner;
    if (!b || typeof b.enabled !== "boolean") return DEFAULT_PROMO;

    const label =
      typeof b.label === "string" && b.label.trim().length > 0
        ? b.label.trim()
        : DEFAULT_PROMO.label;

    return { enabled: b.enabled, label };
  } catch {
    return DEFAULT_PROMO;
  }
}

export default async function Home() {
  const promoBanner = await getPromoBanner();

  return (
    <div className="landing-v2 bg-v2-navy font-sans">
      <MetaPixelPageEvents />
      <Navbar />
      <main>
        <Hero />
        <Testimonials />
        <Comparison />
        <Steps />
        <CtaBand />
        <Features />
        <Network />
        <Directory />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
