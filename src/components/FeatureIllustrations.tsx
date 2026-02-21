"use client";
import React from "react";

export const SearchIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center pb-10 ">
    {/* Ambient glow */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-40 h-40 rounded-full bg-blue-500/15 blur-[64px] animate-feature-pulse" />
    </div>

    {/* Search bar mockup */}
    <div className="relative w-[85%] max-w-[280px]">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(96,165,250)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div className="flex-1 h-8 rounded-lg  bg-blue-500/20 border border-blue-700/20" />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1">
          <span className="px-2.5 py-1 text-[8px] font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-feature-fade-in-1">
            2BHK
          </span>
          <span className="px-2.5 py-1 text-[8px] font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-feature-fade-in-2">
            ₹5L - ₹1Cr
          </span>
          <span className="px-2.5 py-1 text-[8px] font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-feature-fade-in-3">
            Jaipur
          </span>
        </div>
      </div>


    </div>
  </div>
);

export const AlertIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-32 h-32 rounded-full bg-amber-500/15 blur-[64px] animate-feature-pulse" />
    </div>

    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-28 h-28 rounded-full border border-amber-500/20 animate-feature-ring-1" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-40 h-40 rounded-full border border-amber-500/10 animate-feature-ring-2" />
      </div>

      {/* Bell icon */}
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl animate-feature-bell">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/5 rounded-2xl" />
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgb(251,191,36)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_12px_rgba(245,158,11,0.4)] relative z-10">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </div>

      <div className="absolute -top-2 -right-2 animate-feature-badge-pop z-20">
        <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_16px_rgba(244,63,94,0.6)] border border-rose-400/50">
          3
        </div>
      </div>

      <div className="absolute -right-24 top-2 animate-feature-slide-right z-10">
        <div className="bg-white backdrop-blur-md border border-white/10 rounded-xl p-3 w-[110px] shadow-xl">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            <span className="text-[9px] font-medium text-emerald-300">New match</span>
          </div>
          <div className="h-1.5 w-16 rounded-full bg-neutral-300/50" />
          <div className="h-1.5 w-10 rounded-full bg-neutral-500/30 mt-1.5" />
        </div>
      </div>
    </div>
  </div>
);

export const AnalyticsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-56 h-56 rounded-full bg-purple-500/10 blur-[80px] animate-feature-pulse" />
    </div>

    <div className="relative w-full max-w-[360px]">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] font-medium text-neutral-400 mb-1">Total Revenue</div>
            <div className="text-xl font-semibold text-neutral-400 tracking-tight">₹24.8L</div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(52,211,153)" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            </svg>
            <span className="text-[10px] text-emerald-400 font-semibold">+18.2%</span>
          </div>
        </div>

        <div className="flex items-end gap-2.5 h-[110px] mb-4">
          {[
            { h: 40, color: "from-purple-500/30 to-transparent" },
            { h: 65, color: "from-purple-500/40 to-transparent" },
            { h: 45, color: "from-purple-500/30 to-transparent" },
            { h: 80, color: "from-purple-500/50 to-transparent" },
            { h: 55, color: "from-purple-500/35 to-transparent" },
            { h: 90, color: "from-purple-400/60 to-transparent" },
            { h: 70, color: "from-purple-500/45 to-transparent" },
            { h: 100, color: "from-purple-400/80 to-transparent" },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm bg-gradient-to-t ${bar.color} border-t border-purple-400/30 animate-feature-bar-grow`}
                style={{
                  height: `${bar.h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between px-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
            <span key={m} className="text-[9px] font-medium text-neutral-500">{m}</span>
          ))}
        </div>
      </div>

      {/* Floating stats cards */}
      <div className="absolute -top-10 -right-4  z-20">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
          <div className="text-[9px] font-medium text-neutral-400 mb-0.5">Deals Closed</div>
          <div className="text-base font-semibold text-neutral-400">47</div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4  z-20">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
          <div className="text-[9px] font-medium text-neutral-400 mb-0.5">Conversion</div>
          <div className="text-base font-semibold text-emerald-400">68%</div>
        </div>
      </div>

      {/* Smoother Trend line */}
      <svg className="absolute top-14 left-8 w-[75%] h-[70px] pointer-events-none z-20" viewBox="0 0 200 50" fill="none">
        <path
          d="M0 45 C30 40, 50 20, 80 25 S130 5, 160 10 S190 2, 200 -5"
          stroke="url(#trendGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-feature-draw-line"
          strokeDasharray="300"
          strokeDashoffset="300"
          style={{ filter: "drop-shadow(0px 4px 6px rgba(168,85,247,0.4))" }}
        />
        <defs>
          <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.1)" />
            <stop offset="50%" stopColor="rgba(192,132,252,0.8)" />
            <stop offset="100%" stopColor="rgba(216,180,254,1)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export const MatchingIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-48 h-48 rounded-full bg-rose-500/10 blur-[80px] animate-feature-pulse" />
    </div>

    <div className="relative w-full max-w-[340px] h-[220px]">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[130px] animate-feature-slide-in-left z-10">
        <div className="bg-white backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(251,113,133)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-[9px] font-medium text-neutral-500">Buyer</div>
              <div className="text-[9px] font-medium text-neutral-400">Needs 3BHK</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
              <span className="text-[9px] text-neutral-400">Andheri West</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.8)]" />
              <span className="text-[9px] text-neutral-400">₹1.5Cr Budget</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[130px] animate-feature-slide-in-right z-10">
        <div className="bg-white backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(251,191,36)" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="text-[9px] font-medium text-neutral-500">Listing</div>
              <div className="text-[11px] font-medium text-neutral-400">3BHK Ready</div>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span className="text-[9px] text-neutral-400">Andheri West</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              <span className="text-[9px] text-neutral-400">₹1.4Cr Price</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute inset-0 -m-6 rounded-full bg-rose-500/20 blur-xl animate-feature-pulse" />
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-600/10 border border-rose-500/30 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(244,63,94,0.3)] animate-feature-glow-pulse">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgb(251,113,133)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 340 220">
        <line
          x1="130" y1="110" x2="160" y2="110"
          stroke="url(#connGrad1)" strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-feature-dash"
        />
        <line
          x1="180" y1="110" x2="210" y2="110"
          stroke="url(#connGrad2)" strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-feature-dash"
        />
        <circle r="2.5" fill="rgb(251,113,133)" opacity="0.8" style={{ filter: "drop-shadow(0 0 4px rgb(251,113,133))" }}>
          <animateMotion dur="3s" repeatCount="indefinite" path="M130,110 Q145,90 170,110 Q190,130 210,110" />
        </circle>
        <circle r="2.5" fill="rgb(251,191,36)" opacity="0.8" style={{ filter: "drop-shadow(0 0 4px rgb(251,191,36))" }}>
          <animateMotion dur="3s" repeatCount="indefinite" path="M210,110 Q190,90 170,110 Q145,130 130,110" />
        </circle>
        <defs>
          <linearGradient id="connGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.1)" />
            <stop offset="100%" stopColor="rgba(251,113,133,0.7)" />
          </linearGradient>
          <linearGradient id="connGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.7)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 animate-feature-fade-in-2 z-20">
        <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-full px-4 py-1.5 flex items-center gap-2 shadow-lg">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-[10px] text-neutral-400 font-semibold tracking-wide">96% MATCH</span>
        </div>
      </div>
    </div>
  </div>
);

export const ShieldIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-40 h-40 rounded-full bg-emerald-500/15 blur-[64px] animate-feature-pulse" />
    </div>

    <div className="relative">
      <div className="absolute inset-0 -m-8 flex items-center justify-center pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" className="animate-feature-rotate-slow">
          <circle
            cx="50" cy="50" r="46"
            fill="none"
            stroke="url(#shieldRingGrad)"
            strokeWidth="1.5"
            strokeDasharray="8 16"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="shieldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(52,211,153)" />
              <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative w-20 h-20 flex items-center justify-center z-10">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_24px_rgba(52,211,153,0.4)]">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            fill="url(#shieldFill)"
            stroke="rgb(52,211,153)"
            strokeWidth="0.8"
          />
          <defs>
            <linearGradient id="shieldFill" x1="4" y1="2" x2="20" y2="22">
              <stop offset="0%" stopColor="rgba(52,211,153,0.3)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.05)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="animate-feature-check-draw drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]">
            <polyline
              points="9 12 11.5 14.5 16 9"
              stroke="rgb(167,243,208)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              strokeDashoffset="20"
              className="animate-feature-check-stroke"
            />
          </svg>
        </div>
      </div>

      <div className="absolute -right-20 -top-4 animate-feature-float-slow z-20">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          <span className="text-[10px] font-medium text-neutral-500">KYC Verified</span>
        </div>
      </div>
      {/* <div className="absolute -left-16 -bottom-2 animate-feature-float-slow-delayed z-20">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-xl">
          <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]" />
          <span className="text-[10px] font-medium text-neutral-300">RERA Act</span>
        </div>
      </div> */}
    </div>
  </div>
);

export const ChatIllustration = () => (
  <div className="relative w-full flex items-center justify-center pb-8 ">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-28 h-28 rounded-full bg-sky-500/10 blur-[48px] animate-feature-pulse" />
    </div>

    <div className="relative w-[58%] max-w-[170px]">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10">
        <div className="px-3 py-1 border-b border-white/5 bg-white/5 flex items-center gap-2 ">
          <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 shrink-0" />
          <div>
            <div className="text-[9px] font-medium text-neutral-500">Rahul M.</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_rgba(52,211,153,0.6)]" />
              <span className="text-[7px] font-medium text-emerald-400/80 tracking-wide uppercase">Online</span>
            </div>
          </div>
        </div>

        <div className="p-1 space-y-0">
          <div className="animate-feature-msg-1">
            <div className="bg-white border border-white/5 rounded-xl rounded-tl-sm px-2.5 py-1.5 max-w-[85%]">
              <p className="text-[8px] leading-relaxed text-neutral-500">I have a 3BHK in Andheri. Interested?</p>
              <span className="text-[7px] text-neutral-400 mt-0.5 block">2:30 PM</span>
            </div>
          </div>

          <div className="flex justify-end animate-feature-msg-2">
            <div className="bg-sky-500/20 border border-sky-500/20 rounded-xl rounded-tr-sm px-2.5 py-1.5 max-w-[85%]">
              <p className="text-[8px] leading-relaxed text-neutral-500">Yes! Share the details.</p>
              {/* <span className="text-[7px] text-sky-200/50 mt-0.5 block text-right">2:31 PM</span> */}
            </div>
          </div>


        </div>
      </div>
    </div>
  </div>
);