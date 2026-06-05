"use client";
import React from "react";

const G = "#fcb542";
const G_DIM = "rgba(252,181,66,0.12)";

export const SearchIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full blur-[60px] animate-feature-pulse" style={{ background: G_DIM }} />
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 animate-feature-float-slow drop-shadow-[0_0_20px_rgba(252,181,66,0.3)]">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  </div>
);

export const AlertIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full blur-[60px] animate-feature-pulse" style={{ background: G_DIM }} />
    <div className="absolute w-20 h-20 rounded-full border border-[#fcb542]/10 animate-feature-ring-1" />
    <div className="absolute w-28 h-28 rounded-full border border-[#fcb542]/5 animate-feature-ring-2" />
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 animate-feature-float drop-shadow-[0_0_20px_rgba(252,181,66,0.3)]">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  </div>
);

export const AnalyticsIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-40 h-40 rounded-full blur-[80px] animate-feature-pulse" style={{ background: G_DIM }} />
    <div className="relative z-10 flex items-end gap-2 sm:gap-3 h-[80px] sm:h-[120px]">
      {[32, 55, 40, 72, 50, 85, 60, 95].map((h, i) => (
        <div
          key={i}
          className="w-2.5 sm:w-3.5 rounded-sm animate-feature-bar-grow"
          style={{
            height: `${h}%`,
            background: `linear-gradient(to top, transparent, ${G})`,
            opacity: 0.25 + (h / 95) * 0.55,
            animationDelay: `${i * 0.08}s`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  </div>
);

export const MatchingIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center p-4">
    <div className="absolute w-40 h-40 rounded-full blur-[80px] animate-feature-pulse" style={{ background: G_DIM }} />
    <div className="relative z-10 flex items-center gap-3 sm:gap-5">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#fcb542]/25 flex items-center justify-center animate-feature-float-slow">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <svg width="40" height="12" viewBox="0 0 40 12" className="opacity-50">
        <line x1="0" y1="6" x2="32" y2="6" stroke={G} strokeWidth="1" strokeDasharray="3 3" className="animate-feature-dash" />
        <polygon points="32,2 40,6 32,10" fill={G} opacity="0.7" />
      </svg>

      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#fcb542]/25 flex items-center justify-center animate-feature-float-slow-delayed">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      </div>
    </div>
  </div>
);

export const ShieldIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full blur-[60px] animate-feature-pulse" style={{ background: G_DIM }} />
    <div className="relative z-10 animate-feature-float-slow">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_24px_rgba(252,181,66,0.25)]">
        <path
          d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          fill="url(#shieldFillMin)"
          stroke={G}
          strokeWidth="1"
        />
        <polyline
          points="9 12 11 14 15 10"
          fill="none"
          stroke={G}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="shieldFillMin" x1="4" y1="2" x2="20" y2="22">
            <stop offset="0%" stopColor="rgba(252,181,66,0.15)" />
            <stop offset="100%" stopColor="rgba(252,181,66,0.02)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
);

export const BiddingIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="absolute w-28 h-28 rounded-full blur-[60px] animate-feature-pulse" style={{ background: G_DIM }} />
    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 animate-feature-float drop-shadow-[0_0_20px_rgba(252,181,66,0.3)]">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  </div>
);
