import Features from "@/components/features";
import Hero from "@/components/hero";
import Pricing from "@/components/pricing";
import FAQ from "@/components/faq";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import Grainient from "@/components/Grainient";

export default function Home() {
  return (
    <main>
      <Hero />
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
