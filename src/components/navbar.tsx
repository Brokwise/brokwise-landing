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
        handleScroll();
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
                        ? "top-0 w-full rounded-none border-b border-[#fcb542]/10 bg-[#080808]/90 backdrop-blur-xl px-6 py-4 shadow-2xl shadow-black/40"
                        : "top-4 md:top-6 w-[90%] md:w-full max-w-4xl rounded-full border border-[#fcb542]/15 bg-[#080808]/60 backdrop-blur-xl px-6 py-2 md:py-4 shadow-2xl shadow-black/40"
                )}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl font-serif italic text-[#fcb542] tracking-tight group-hover:text-[#D4BA8A] transition-colors rounded-full relative w-10 h-10">
                            <Image className="rounded-full" src={"/logo.webp"} alt="Brokwise Logo" fill />
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-light text-[#F5F0EB]/60 hover:text-[#fcb542] transition-colors tracking-wide"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="https://app.brokwise.com"
                            className="hidden md:inline-flex items-center justify-center rounded-full bg-[#fcb542] px-5 py-2 text-sm font-medium text-[#080808] transition-all hover:bg-[#D4BA8A] hover:scale-105"
                        >
                            Get Started
                        </Link>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-[#fcb542] p-1 hover:bg-[#fcb542]/10 rounded-full transition-colors"
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

            <div
                className={cn(
                    "fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8",
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
                            className="text-2xl font-serif text-[#F5F0EB]/70 hover:text-[#fcb542] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="https://app.brokwise.com"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="mt-4 inline-flex items-center justify-center rounded-full bg-[#fcb542] px-8 py-3 text-lg font-medium text-[#080808] transition-all hover:bg-[#D4BA8A]"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </>
    );
};

export default NavBar;
