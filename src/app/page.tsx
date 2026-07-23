import Features from "@/components/features";
import Hero, { DEFAULT_PROMO, type PromoBanner } from "@/components/hero";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import Grainient from "@/components/Grainient";
import MetaPixelPageEvents from "@/components/meta-pixel-page-events";

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
    <main>
      <MetaPixelPageEvents />
      <Hero promoBanner={promoBanner} />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />

      {/* Shared container for CTA and Footer to have continuous background */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Grainient
            color1="#fcb542"
            color2="#8B6914"
            color3="#D4BA8A"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
        <div className="relative z-10">
          <CTA />
          <Footer />
        </div>
      </div>
    </main>
  );
}
