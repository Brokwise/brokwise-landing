"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-transparent pt-12 md:pt-20">
            <div className="bg-black text-neutral-400 rounded-t-[2.5rem] md:rounded-t-[4rem] px-6 md:px-12 pt-20 md:pt-24 pb-12 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
                        {/* Brand - Spans 4 columns */}
                        <div className="md:col-span-5 lg:col-span-4">
                            <div className="text-3xl md:text-4xl text-white tracking-tight font-serif italic mb-6">
                                Brokwise
                            </div>
                            <p className="text-sm md:text-base leading-relaxed mb-8 max-w-sm text-neutral-400 font-light">
                                Connecting brokers, properties, and opportunities in one seamless
                                ecosystem.
                            </p>
                            <div className="flex gap-4 text-white">
                                <a
                                    href="https://www.instagram.com/brokwise/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Links - Spans 4 columns */}
                        <div className="md:col-span-3 lg:col-span-4 md:pl-8">
                            <h4 className="text-white text-sm font-medium uppercase tracking-widest mb-8">
                                Platform
                            </h4>
                            <ul className="space-y-4 text-sm font-light">
                                <li>
                                    <a
                                        href="https://brokwise.com"
                                        className="hover:text-white transition-colors flex items-center gap-2 group"
                                    >
                                        For Brokers & Firms
                                    </a>
                                </li>
                                {/* Add more links here if needed */}
                            </ul>
                        </div>

                        {/* Contact - Spans 4 columns */}
                        <div className="md:col-span-4 lg:col-span-4">
                            <h4 className="text-white text-sm font-medium uppercase tracking-widest mb-8">
                                Contact
                            </h4>
                            <address className="not-italic text-sm space-y-6 font-light">
                                <div className="space-y-2">
                                    <p className="text-neutral-500 text-xs uppercase tracking-wider">
                                        Office
                                    </p>
                                    <p className="leading-relaxed text-neutral-300">
                                        P NO. A-27, BAHUBALI NAGAR, JAIPUR <br />
                                        Mansarovar, Jaipur - 302020, Rajasthan, India
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-neutral-500 text-xs uppercase tracking-wider">
                                        Get in touch
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <a
                                            href="tel:+919571850046"
                                            className="hover:text-white transition-colors"
                                        >
                                            +91 95718 50046
                                        </a>
                                        <a
                                            href="mailto:support@brokwise.com"
                                            className="hover:text-white transition-colors"
                                        >
                                            support@brokwise.com
                                        </a>
                                    </div>
                                </div>
                            </address>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-neutral-500 font-light">
                        <p>© 2026 Brokwise. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link
                                href={"/privacy-policy"}
                                className="hover:text-white transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href={"/terms-and-conditions"}
                                className="hover:text-white transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
