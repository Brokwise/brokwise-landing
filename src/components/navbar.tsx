"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const vh = window.innerHeight;
            setIsScrolled(window.scrollY > vh * 0.5);
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "/#features" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "Pricing", href: "/#pricing" },
        { name: "FAQ", href: "/#faq" },
        { name: "Support", href: "/support" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out",
                    isScrolled
                        ? "top-0 w-full rounded-none border-b border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 shadow-2xl shadow-black/20"
                        : "top-4 md:top-6 w-[90%] md:w-full max-w-4xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-6 py-3 md:py-4 shadow-2xl shadow-black/20"
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl font-serif italic text-white tracking-tight group-hover:text-primary/90 transition-colors rounded-full">
                            <Image className="rounded-full" src={"/logo.webp"} alt="Brokwise Logo" width={50} height={50} />
                        </span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-light text-neutral-300 hover:text-white transition-colors tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://brokwise.com"
                            className="hidden md:inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition-all hover:bg-neutral-200 hover:scale-105"
                        >
                            Get Started
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8",
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-2xl font-serif italic text-white/80 hover:text-white transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://brokwise.com"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-medium text-black transition-all hover:bg-neutral-200"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;
