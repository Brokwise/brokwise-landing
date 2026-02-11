import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="Modern Real Estate Architecture"
          fill
          className="object-cover object-center opacity-90"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-background" />

        <div className="absolute -bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center gap-8 max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.1]">
          Where Brokers Connect, <br className="hidden md:block" />
          Collaborate & Close Deals.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform that helps real estate brokers list properties, find matching buyers, and scale their business effortlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            href="https://app.brokwise.com"
            className="group inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Get started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
