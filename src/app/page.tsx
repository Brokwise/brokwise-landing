import Navbar from "@/components/v2/Navbar";
import Hero from "@/components/v2/Hero";
import Testimonials from "@/components/v2/Testimonials";
import Comparison from "@/components/v2/Comparison";
import Steps from "@/components/v2/Steps";
import CtaBand from "@/components/v2/CtaBand";
import Features from "@/components/v2/Features";
import Network from "@/components/v2/Network";
import Pricing from "@/components/v2/Pricing";
import Faq from "@/components/v2/Faq";
import Footer from "@/components/v2/Footer";
import FindBrokerWidget from "@/components/v2/FindBrokerWidget";
import MetaPixelPageEvents from "@/components/meta-pixel-page-events";

export default function Home() {
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
        <Pricing />
        <Faq />
      </main>
      <Footer />
      <FindBrokerWidget />
    </div>
  );
}
