"use client";
import React from "react";

export const SearchIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-blue-500/10 blur-3xl animate-feature-pulse" />
    </div>

    {/* Search bar mockup */}
    <div className="relative w-[85%] max-w-[260px] bg-white">
      <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-feature-float">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(96,165,250)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
          <div className="flex-1 h-6 rounded-md bg-white/[0.05] border border-white/[0.06]" />
        </div>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 text-[9px] rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20 animate-feature-fade-in-1">
            2BHK
          </span>
          <span className="px-2 py-0.5 text-[9px] rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 animate-feature-fade-in-2">
            ₹50L - ₹1Cr
          </span>
          <span className="px-2 py-0.5 text-[9px] rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/20 animate-feature-fade-in-3">
            Mumbai
          </span>
        </div>
      </div>

      {/* Floating result cards */}
      <div className="absolute -bottom-6 -right-3 w-[120px] animate-feature-slide-up-1">
        <div className="bg-white/[0.05] backdrop-blur border border-white/[0.08] rounded-lg p-2 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <div className="w-full h-8 rounded bg-gradient-to-br from-blue-500/20 to-blue-600/10 mb-1.5" />
          <div className="h-1.5 w-16 rounded-full bg-white/10" />
          <div className="h-1.5 w-10 rounded-full bg-white/[0.06] mt-1" />
        </div>
      </div>
      <div className="absolute -bottom-3 -left-4 w-[100px] animate-feature-slide-up-2">
        <div className="bg-white/[0.04] backdrop-blur border border-white/[0.06] rounded-lg p-2 shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
          <div className="w-full h-6 rounded bg-gradient-to-br from-sky-500/15 to-sky-600/5 mb-1.5" />
          <div className="h-1.5 w-12 rounded-full bg-white/10" />
        </div>
      </div>
    </div>
  </div>
);

export const AlertIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Ambient glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-28 h-28 rounded-full bg-amber-500/10 blur-3xl animate-feature-pulse" />
    </div>

    <div className="relative">
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full border border-amber-500/20 animate-feature-ring-1" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border border-amber-500/10 animate-feature-ring-2" />
      </div>

      {/* Bell icon */}
      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/25 to-orange-500/15 border border-amber-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.15)] animate-feature-bell">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgb(245,158,11)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
      </div>

      {/* Notification badges */}
      <div className="absolute -top-2 -right-2 animate-feature-badge-pop">
        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]">
          3
        </div>
      </div>

      {/* Floating notification card */}
      <div className="absolute -right-20 top-1 animate-feature-slide-right">
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-lg p-2 w-[90px] shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[7px] text-emerald-400">New match</span>
          </div>
          <div className="h-1 w-14 rounded-full bg-white/10" />
          <div className="h-1 w-9 rounded-full bg-white/[0.06] mt-0.5" />
        </div>
      </div>
    </div>
  </div>
);

export const AnalyticsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-purple-500/8 blur-3xl animate-feature-pulse" />
    </div>

    <div className="relative w-full max-w-[340px]">
      {/* Main chart card */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] text-white/40 mb-0.5">Total Revenue</div>
            <div className="text-lg font-medium text-white/90">₹24.8L</div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(52,211,153)" strokeWidth="2.5">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            </svg>
            <span className="text-[9px] text-emerald-400 font-medium">+18.2%</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-2 h-[100px] mb-3">
          {[
            { h: 40, color: "from-purple-500/40 to-purple-600/20" },
            { h: 65, color: "from-purple-500/50 to-purple-600/25" },
            { h: 45, color: "from-purple-500/40 to-purple-600/20" },
            { h: 80, color: "from-purple-500/60 to-purple-600/30" },
            { h: 55, color: "from-purple-500/45 to-purple-600/20" },
            { h: 90, color: "from-purple-400/70 to-purple-500/35" },
            { h: 70, color: "from-purple-500/55 to-purple-600/25" },
            { h: 100, color: "from-purple-400/80 to-purple-500/40" },
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-md bg-gradient-to-t ${bar.color} border border-white/[0.05] animate-feature-bar-grow`}
                style={{
                  height: `${bar.h}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex justify-between px-1">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
            <span key={m} className="text-[7px] text-white/20">{m}</span>
          ))}
        </div>
      </div>

      {/* Floating stats cards */}
      <div className="absolute -top-3 -right-3 animate-feature-float-slow">
        <div className="bg-white/[0.06] backdrop-blur border border-white/[0.1] rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="text-[8px] text-white/40">Deals Closed</div>
          <div className="text-sm font-medium text-white/90">47</div>
        </div>
      </div>

      <div className="absolute -bottom-2 -left-3 animate-feature-float-slow-delayed">
        <div className="bg-white/[0.06] backdrop-blur border border-white/[0.1] rounded-xl px-3 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <div className="text-[8px] text-white/40">Conversion</div>
          <div className="text-sm font-medium text-emerald-400">68%</div>
        </div>
      </div>

      {/* Trend line SVG overlay */}
      <svg className="absolute top-12 left-8 w-[75%] h-[60px] pointer-events-none" viewBox="0 0 200 50" fill="none">
        <path
          d="M0 40 C30 35, 50 25, 80 28 S130 10, 160 15 S190 5, 200 2"
          stroke="url(#trendGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-feature-draw-line"
          strokeDasharray="300"
          strokeDashoffset="300"
        />
        <defs>
          <linearGradient id="trendGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0.3)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0.8)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export const MatchingIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-40 h-40 rounded-full bg-rose-500/8 blur-3xl animate-feature-pulse" />
    </div>

    <div className="relative w-full max-w-[320px] h-[200px]">
      {/* Left card - Buyer */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[120px] animate-feature-slide-in-left">
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-500/20 border border-rose-500/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(251,113,133)" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-white/60">Buyer</div>
              <div className="text-[9px] text-white/90">Looking for 3BHK</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-rose-400" />
              <span className="text-[7px] text-white/40">Andheri West</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-rose-400" />
              <span className="text-[7px] text-white/40">₹1.5Cr Budget</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right card - Property */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[120px] animate-feature-slide-in-right">
        <div className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] rounded-xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(251,191,36)" strokeWidth="2">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="text-[8px] text-white/60">Listing</div>
              <div className="text-[9px] text-white/90">3BHK Available</div>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-[7px] text-white/40">Andheri West</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-amber-400" />
              <span className="text-[7px] text-white/40">₹1.4Cr Price</span>
            </div>
          </div>
        </div>
      </div>

      {/* Center connection - Lightning bolt */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 -m-4 rounded-full bg-rose-500/10 blur-xl animate-feature-pulse" />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500/30 to-pink-600/20 border border-rose-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.2)] animate-feature-glow-pulse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(251,113,133)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 200">
        <line
          x1="120" y1="100" x2="155" y2="100"
          stroke="url(#connGrad1)" strokeWidth="1.5"
          strokeDasharray="4 3"
          className="animate-feature-dash"
        />
        <line
          x1="165" y1="100" x2="200" y2="100"
          stroke="url(#connGrad2)" strokeWidth="1.5"
          strokeDasharray="4 3"
          className="animate-feature-dash"
        />
        {/* Orbiting dots */}
        <circle r="2" fill="rgb(251,113,133)" opacity="0.6">
          <animateMotion dur="3s" repeatCount="indefinite" path="M120,100 Q140,80 160,100 Q180,120 200,100" />
        </circle>
        <circle r="2" fill="rgb(251,191,36)" opacity="0.6">
          <animateMotion dur="3s" repeatCount="indefinite" path="M200,100 Q180,80 160,100 Q140,120 120,100" />
        </circle>
        <defs>
          <linearGradient id="connGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.1)" />
            <stop offset="100%" stopColor="rgba(251,113,133,0.5)" />
          </linearGradient>
          <linearGradient id="connGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(251,113,133,0.5)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0.1)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Match percentage badge */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 animate-feature-fade-in-2">
        <div className="bg-emerald-500/15 border border-emerald-500/25 rounded-full px-3 py-1 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-medium">96% Match</span>
        </div>
      </div>
    </div>
  </div>
);

export const ShieldIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-28 h-28 rounded-full bg-emerald-500/10 blur-3xl animate-feature-pulse" />
    </div>

    <div className="relative">
      {/* Rotating verification ring */}
      <div className="absolute inset-0 -m-6 flex items-center justify-center">
        <svg width="90" height="90" viewBox="0 0 90 90" className="animate-feature-rotate-slow">
          <circle
            cx="45" cy="45" r="40"
            fill="none"
            stroke="url(#shieldRingGrad)"
            strokeWidth="1"
            strokeDasharray="8 12"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="shieldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(52,211,153)" />
              <stop offset="100%" stopColor="rgb(16,185,129)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Shield */}
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]">
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            fill="url(#shieldFill)"
            stroke="rgb(52,211,153)"
            strokeWidth="0.5"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="shieldFill" x1="4" y1="2" x2="20" y2="22">
              <stop offset="0%" stopColor="rgba(52,211,153,0.25)" />
              <stop offset="100%" stopColor="rgba(16,185,129,0.08)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Checkmark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="animate-feature-check-draw">
            <polyline
              points="9 12 11.5 14.5 16 9"
              stroke="rgb(52,211,153)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              strokeDashoffset="20"
              className="animate-feature-check-stroke"
            />
          </svg>
        </div>
      </div>

      {/* Floating verification badges */}
      <div className="absolute -right-16 -top-2 animate-feature-float-slow">
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[7px] text-white/60">KYC Verified</span>
        </div>
      </div>
      <div className="absolute -left-14 -bottom-1 animate-feature-float-slow-delayed">
        <div className="bg-white/[0.06] border border-white/[0.08] rounded-lg px-2 py-1 flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          <span className="text-[7px] text-white/60">RERA</span>
        </div>
      </div>
    </div>
  </div>
);

export const ChatIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Background glow */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-28 h-28 rounded-full bg-sky-500/10 blur-3xl animate-feature-pulse" />
    </div>

    <div className="relative w-[85%] max-w-[220px]">
      {/* Chat window */}
      <div className="bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        {/* Chat header */}
        <div className="px-3 py-2 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500/30 to-blue-500/20 border border-sky-500/20" />
          <div>
            <div className="text-[8px] text-white/70">Rahul M.</div>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[6px] text-emerald-400/70">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="p-3 space-y-2">
          {/* Received message */}
          <div className="animate-feature-msg-1">
            <div className="bg-white/[0.06] rounded-lg rounded-tl-none px-2.5 py-1.5 max-w-[80%]">
              <p className="text-[8px] text-white/70">I have a 3BHK in Andheri. Interested?</p>
              <span className="text-[6px] text-white/30 mt-0.5 block">2:30 PM</span>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end animate-feature-msg-2">
            <div className="bg-sky-500/20 border border-sky-500/15 rounded-lg rounded-tr-none px-2.5 py-1.5 max-w-[80%]">
              <p className="text-[8px] text-white/80">Yes! Share the details.</p>
              <span className="text-[6px] text-sky-300/40 mt-0.5 block text-right">2:31 PM</span>
            </div>
          </div>

          {/* Typing indicator */}
          <div className="animate-feature-msg-3">
            <div className="bg-white/[0.06] rounded-lg rounded-tl-none px-3 py-2 w-fit">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-feature-typing-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-feature-typing-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 animate-feature-typing-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
