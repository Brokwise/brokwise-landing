"use client";

import { useEffect } from "react";
import {
  Menu,
  ArrowDown,
  ArrowRight,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Background (image) */}
      <div
        className="fixed top-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage:
            "url('https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/9d6f3aad-afc5-4ad7-9fea-352a7aa9f84b_3840w.webp')",
          maskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
        }}
        data-alpha-mask="80"
      ></div>

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 bg-black/30 pointer-events-none"></div>

        {/* Navigation */}
        <nav className="relative z-50 w-full px-6 py-6 md:px-12 flex justify-between items-center border-b border-white/10 animate-on-scroll">
          <div className="text-2xl md:text-3xl text-white tracking-tight font-serif italic">
            Brokwise
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-4 text-sm font-medium tracking-wide">
              <span className="opacity-100 cursor-pointer border-b border-white pb-0.5 text-white">
                EN
              </span>
              <span className="opacity-50 hover:opacity-100 cursor-pointer transition-opacity text-white">
                HI
              </span>
            </div>

            <Link
              href={"https://app.brokwise.com"}
              className="hidden md:block bg-white text-black px-6 py-2.5 rounded-full text-xs md:text-sm font-medium hover:bg-neutral-200 transition-colors tracking-wide"
            >
              GET STARTED
            </Link>

            <button className="text-white hover:text-neutral-300 transition-colors">
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col md:pb-0 z-10 pb-12 relative justify-end">
          {/* Description Card */}
          <div
            className="absolute top-[20%] md:top-auto md:bottom-[20%] right-6 md:right-12 w-[90%] md:w-[32rem] p-8 md:p-10 rounded-sm animate-on-scroll"
            style={
              {
                "--fx-filter": "blur(12px) liquid-glass(2, 5) saturate(1.1)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255,255,255,0.05)",
              } as React.CSSProperties
            }
          >
            <h2 className="font-serif italic text-3xl md:text-4xl leading-tight mb-6 tracking-tight text-white">
              Connect. Transact. Grow.
            </h2>
            <p className="text-base md:text-lg font-light leading-relaxed opacity-90 text-neutral-200">
              The ultimate estate brokerage app connecting brokers with
              properties. Raise enquiries, find matches, and manage your
              brokerage firm effortlessly.
            </p>
          </div>

          {/* Massive Title */}
          <div className="relative w-full px-4 md:px-8 mt-auto z-0 pointer-events-none select-none">
            <h1 className="font-serif text-[10vw] leading-[0.75] tracking-tight text-white mix-blend-overlay opacity-90 animate-on-scroll">
              BROKWISE
            </h1>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 right-8 md:right-12 z-20 flex items-center gap-2 text-white animate-on-scroll">
            <span className="text-xs md:text-sm uppercase tracking-widest font-serif">
              Scroll
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-neutral-900 text-neutral-200 py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="animate-on-scroll">
            <span className="block text-xs font-medium tracking-[0.2em] text-neutral-500 mb-4 uppercase">
              Platform
            </span>
            <h3 className="font-serif text-4xl md:text-6xl tracking-tight mb-8 text-white">
              Empowering
              <br />
              Brokers
            </h3>
            <div className="h-[50vh] md:h-[60vh] w-full bg-neutral-800 rounded-sm overflow-hidden relative group cursor-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&amp;q=80"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                alt="Brokerage Network"
              />
              {/* Hover Badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="text-xs uppercase tracking-widest text-white">
                    Explore
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center animate-on-scroll delay-100">
            <p className="text-lg md:text-2xl font-light leading-relaxed mb-12 text-neutral-400">
              Whether you are an independent broker or a large firm, Brokwise
              provides the tools to close deals faster. Connect with the right
              properties and the right people.
            </p>
            <ul className="space-y-0">
              {[
                { id: "01", title: "Smart Enquiries" },
                { id: "02", title: "Firm Management" },
                { id: "03", title: "Public Marketplace" },
              ].map((item, index) => (
                <li
                  key={item.id}
                  className={`flex items-center justify-between group cursor-pointer border-t border-neutral-800 py-8 hover:bg-white/5 transition-colors px-4 -mx-4 rounded-sm ${
                    index === 2 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-600 font-serif italic text-xl">
                      {item.id}
                    </span>
                    <span className="text-lg font-normal text-neutral-300 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 duration-300" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-neutral-950 text-white py-24 md:py-32 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 animate-on-scroll">
            <div>
              <span className="block text-xs font-medium tracking-[0.2em] text-neutral-500 mb-4 uppercase">
                Marketplace
              </span>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-none">
                Featured{" "}
                <span className="text-neutral-600 italic">Properties</span>
              </h2>
            </div>
            <div className="mt-8 md:mt-0">
              <button className="group flex items-center gap-2 text-sm uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">
                View All Listings
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {/* Project 1 (Large) */}
            <div className="md:col-span-8 group relative animate-on-scroll">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-sm bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&amp;q=80"
                  alt="Modern Office Complex"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                  <div className="flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div>
                      <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest rounded-full">
                          Commercial
                        </span>
                        <span className="text-neutral-300 text-xs tracking-wide">
                          Mumbai
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-serif text-white mb-1">
                        Tech Park Plaza
                      </h3>
                      <p className="text-neutral-400 text-sm md:text-base font-light">
                        Premium Office Spaces
                      </p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/0 group-hover:bg-white text-white group-hover:text-black transition-all duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 (Vertical) */}
            <div className="md:col-span-4 group relative animate-on-scroll delay-100">
              <div className="relative w-full aspect-[3/4] md:aspect-auto md:h-full overflow-hidden rounded-sm bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&amp;q=80"
                  alt="Luxury Apartment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span className="px-2 py-1 bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest rounded-full">
                        Residential
                      </span>
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-1">
                      Skyline Heights
                    </h3>
                    <p className="text-neutral-400 text-sm font-light">
                      South Bombay
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="md:col-span-4 group relative animate-on-scroll">
              <div className="relative w-full aspect-square overflow-hidden rounded-sm bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?w=1000&amp;q=80"
                  alt="Villa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-1">
                    Seaside Villa
                  </h3>
                  <p className="text-neutral-400 text-sm font-light">Alibaug</p>
                </div>
              </div>
            </div>

            {/* Project 4 (Wide) */}
            <div className="md:col-span-8 group relative animate-on-scroll delay-100">
              <div className="relative w-full aspect-video md:aspect-auto md:h-full overflow-hidden rounded-sm bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1600&amp;q=80"
                  alt="Coworking Space"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-1">
                      Innovation Hub
                    </h3>
                    <p className="text-neutral-400 text-sm font-light">
                      Bangalore
                    </p>
                  </div>
                  <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs uppercase tracking-widest border-b border-white pb-1">
                      View Details
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-neutral-400 pt-24 pb-12 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-20">
            {/* Brand */}
            <div className="md:col-span-1 animate-on-scroll">
              <div className="text-2xl text-white tracking-tight font-serif italic mb-6">
                Brokwise
              </div>
              <p className="text-sm leading-relaxed mb-6 max-w-xs">
                Connecting brokers, properties, and opportunities in one
                seamless ecosystem.
              </p>
              <div className="flex gap-4 text-white">
                <Instagram className="w-5 h-5 hover:text-neutral-300 cursor-pointer" />
                <Linkedin className="w-5 h-5 hover:text-neutral-300 cursor-pointer" />
              </div>
            </div>

            {/* Links */}
            <div className="animate-on-scroll delay-100">
              <h4 className="text-white text-sm font-medium uppercase tracking-widest mb-6">
                Platform
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Brokers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    For Companies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Listings
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Enquiries
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="animate-on-scroll delay-200">
              <h4 className="text-white text-sm font-medium uppercase tracking-widest mb-6">
                Contact
              </h4>
              <address className="not-italic text-sm space-y-4">
                <p>
                  Business Bay,
                  <br />
                  Pune, MH 411001
                </p>
                <p>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-white transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:support@brokwise.com"
                    className="hover:text-white transition-colors"
                  >
                    support@brokwise.com
                  </a>
                </p>
              </address>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-1 animate-on-scroll delay-300">
              <h4 className="text-white text-sm font-medium uppercase tracking-widest mb-6">
                Stay Updated
              </h4>
              <form className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-neutral-600 transition-colors rounded-sm placeholder:text-neutral-600"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-neutral-600">
                  Subscribe for the latest property alerts and platform updates.
                </p>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600 animate-on-scroll">
            <p>© 2024 Brokwise. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-neutral-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-neutral-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
