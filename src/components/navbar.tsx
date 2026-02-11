"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NavBar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "Testimonials", href: "#testimonials" },
        { name: "Pricing", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <>
            <nav
                className={cn(
                    "fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-full max-w-4xl transition-all duration-300",
                    "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20",
                    "rounded-full px-6 py-3 md:py-4"
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl font-serif italic text-white tracking-tight group-hover:text-primary/90 transition-colors">
                            Brokwise
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
                            href="https://app.brokwise.com"
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
                        href="https://app.brokwise.com"
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
