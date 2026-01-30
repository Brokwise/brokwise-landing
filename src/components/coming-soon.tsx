"use client";

import React, { useState, useEffect } from "react";

const ComingSoon = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 overflow-hidden relative selection:bg-white/20 flex flex-col">
            {/* Background Texture/Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                    }}
                ></div>
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-neutral-800/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-white/5 rounded-full blur-[100px] mix-blend-overlay"></div>
                {/* Massive Background Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-serif italic text-outline opacity-[0.03] whitespace-nowrap select-none pointer-events-none z-[-1]">
                    Coming Soon
                </div>
            </div>

            {/* Navigation / Header */}
            <nav className="relative z-10 w-full px-6 py-8 md:px-12 flex justify-between items-center">
                <div className="text-2xl md:text-3xl text-white tracking-tight font-serif italic animate-in fade-in slide-in-from-top-4 duration-1000">
                    Brokwise
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow flex flex-col justify-center items-center px-6 relative z-10 w-full max-w-4xl mx-auto">
                <div className="flex flex-col justify-center items-center text-center">
                    <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-300 font-medium">Launching 2026</span>
                    </div>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        Coming <br />
                        <span className="italic text-neutral-500">Soon</span>
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
                        We are building the future of real estate brokerage. Connect with premium properties, streamline your firm&apos;s operations, and close deals faster.
                    </p>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 w-full px-6 py-8 md:px-12 flex justify-center items-center text-xs text-neutral-500 border-t border-white/5 mt-auto">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-800">
                    © 2026 Brokwise Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default ComingSoon;
