"use client";

import React from "react";
import Link from "next/link";
import { Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-transparent pt-12 md:pt-20">
            <div className="bg-[#0A0A0A] text-[#F5F0EB]/40 rounded-t-[2.5rem] md:rounded-t-[4rem] px-6 md:px-12 pt-20 md:pt-24 pb-12 overflow-hidden relative border-t border-[#fcb542]/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
                        <div className="md:col-span-5 lg:col-span-4">
                            <div className="text-3xl md:text-4xl text-[#fcb542] tracking-tight font-serif mb-6">
                                Brokwise
                            </div>
                            <p className="text-sm md:text-base leading-relaxed mb-8 max-w-sm text-[#F5F0EB]/40 font-light">
                                Connecting brokers, properties, and opportunities in one seamless
                                ecosystem.
                            </p>
                            <div className="flex gap-4 text-[#fcb542]">
                                <a
                                    href="https://www.instagram.com/brokwise/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                >
                                    <div className="w-10 h-10 rounded-full border border-[#fcb542]/25 flex items-center justify-center group-hover:bg-[#fcb542] group-hover:text-[#080808] transition-all duration-300">
                                        <Instagram className="w-5 h-5" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div className="md:col-span-3 lg:col-span-4 md:pl-8">
                            <h4 className="text-[#fcb542] text-sm font-medium uppercase tracking-widest mb-8">
                                Platform
                            </h4>
                            <ul className="space-y-4 text-sm font-light">
                                <li>
                                    <a
                                        href="https://app.brokwise.com"
                                        className="hover:text-[#fcb542] transition-colors flex items-center gap-2 group"
                                    >
                                        For Brokers & Firms
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="md:col-span-4 lg:col-span-4">
                            <h4 className="text-[#fcb542] text-sm font-medium uppercase tracking-widest mb-8">
                                Contact
                            </h4>
                            <address className="not-italic text-sm space-y-6 font-light">
                                <div className="space-y-2">
                                    <p className="text-[#fcb542]/40 text-xs uppercase tracking-wider">
                                        Office
                                    </p>
                                    <p className="leading-relaxed text-[#F5F0EB]/50">
                                        P NO. A-27, BAHUBALI NAGAR, JAIPUR <br />
                                        Mansarovar, Jaipur - 302020, Rajasthan, India
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[#fcb542]/40 text-xs uppercase tracking-wider">
                                        Get in touch
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        <a
                                            href="tel:+919929750046"
                                            className="hover:text-[#fcb542] transition-colors"
                                        >
                                            +91 99297 50046
                                        </a>
                                        <a
                                            href="mailto:support@brokwise.com"
                                            className="hover:text-[#fcb542] transition-colors"
                                        >
                                            support@brokwise.com
                                        </a>
                                    </div>
                                </div>
                            </address>
                        </div>
                    </div>

                    <div className="border-t border-[#fcb542]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-[#F5F0EB]/30 font-light">
                        <p>&copy; 2026 Brokwise. All rights reserved.</p>
                        <div className="flex flex-wrap gap-x-8 gap-y-2">
                            <Link
                                href="/platform-terms"
                                className="hover:text-[#fcb542] transition-colors"
                            >
                                Platform Terms
                            </Link>
                            <Link
                                href="/terms-and-conditions"
                                className="hover:text-[#fcb542] transition-colors"
                            >
                                Terms of Use for Brokers
                            </Link>
                            <Link
                                href="/privacy-policy"
                                className="hover:text-[#fcb542] transition-colors"
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
