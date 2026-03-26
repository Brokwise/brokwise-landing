"use client";
import React from "react";

interface HexPatternProps {
  id?: string;
  className?: string;
  opacity?: number;
  size?: number;
  fade?: "horizontal" | "top" | "radial";
}

const hexPoints = (cx: number, cy: number, r: number) =>
  Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
  }).join(" ");

const HexPattern: React.FC<HexPatternProps> = ({
  id = "hexP",
  className = "",
  opacity = 1,
  size = 52,
  fade = "horizontal",
}) => {
  const r = size;
  const hs = r * Math.sqrt(3);
  const tileW = r * 3;
  const tileH = hs * 2;
  const stroke = `rgba(252,181,66,${opacity})`;

  const maskMap: Record<string, string> = {
    horizontal:
      "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
    top: "linear-gradient(to bottom, black 0%, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
    radial:
      "radial-gradient(ellipse 70% 60% at 50% 30%, black 0%, transparent 100%)",
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{
        WebkitMaskImage: maskMap[fade],
        maskImage: maskMap[fade],
        WebkitMaskComposite: fade === "top" ? "source-in" : undefined,
        maskComposite: fade === "top" ? "intersect" : undefined,
      } as React.CSSProperties}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-100"
      >
        <defs>
          <pattern
            id={id}
            width={tileW}
            height={tileH}
            patternUnits="userSpaceOnUse"
          >
            <polygon points={hexPoints(0, 0, r)} fill="none" stroke={stroke} strokeWidth="0.6" />
            <polygon points={hexPoints(r * 1.5, hs * 0.5, r)} fill="none" stroke={stroke} strokeWidth="0.6" />
            <polygon points={hexPoints(0, hs, r)} fill="none" stroke={stroke} strokeWidth="0.6" />
            <polygon points={hexPoints(r * 1.5, hs * 1.5, r)} fill="none" stroke={stroke} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
};

export default HexPattern;
