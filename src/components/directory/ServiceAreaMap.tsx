"use client";

import { useEffect, useRef, useState } from "react";
import type { AreaSummary } from "@/lib/directory/types";

const AMBER = "#FCB542";

declare global {
  interface Window {
    // Google Maps JS types are not installed; treat as unknown-shaped.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google?: any;
    __bwMapsLoading?: Promise<void>;
  }
}

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") return Promise.reject();
  if (window.google?.maps) return Promise.resolve();
  if (window.__bwMapsLoading) return window.__bwMapsLoading;
  window.__bwMapsLoading = new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(s);
  });
  return window.__bwMapsLoading;
}

/** SVG fallback: approximate circles projected into a normalized box. No pins. */
function FallbackMap({ areas }: { areas: AreaSummary[] }) {
  const pts = areas
    .map((a) => a.center)
    .filter((c): c is [number, number] => Array.isArray(c) && c.length === 2);

  const project = (i: number, c?: [number, number]): [number, number] => {
    if (!c || pts.length < 2) {
      // Deterministic scatter when coords are missing/degenerate.
      const cols = Math.ceil(Math.sqrt(areas.length || 1));
      const x = 20 + ((i % cols) / Math.max(1, cols - 1 || 1)) * 60;
      const y = 22 + (Math.floor(i / cols) / Math.max(1, cols)) * 40;
      return [isFinite(x) ? x : 50, isFinite(y) ? y : 40];
    }
    const lngs = pts.map((p) => p[0]);
    const lats = pts.map((p) => p[1]);
    const minLng = Math.min(...lngs),
      maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats),
      maxLat = Math.max(...lats);
    const x = 15 + ((c[0] - minLng) / (maxLng - minLng || 1)) * 70;
    const y = 60 - ((c[1] - minLat) / (maxLat - minLat || 1)) * 40;
    return [x, y];
  };

  return (
    <svg viewBox="0 0 100 72" className="h-full w-full" role="img" aria-label="Approximate service areas">
      <defs>
        <pattern id="g" width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M8 0H0V8" fill="none" stroke="hsl(var(--line))" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="100" height="72" fill="url(#g)" />
      <line x1="0" y1="46" x2="100" y2="22" stroke="hsl(var(--line-strong))" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="28" y1="0" x2="70" y2="72" stroke="hsl(var(--line-strong))" strokeWidth="2.2" strokeLinecap="round" />
      {areas.map((a, i) => {
        const [x, y] = project(i, a.center);
        return (
          <g key={a.label}>
            <circle cx={x} cy={y} r={11} fill={AMBER} fillOpacity={0.2} stroke={AMBER} strokeWidth={0.8} strokeDasharray="2 1.8" />
            <circle cx={x} cy={y} r={1} fill={AMBER} opacity={0.6} />
            <text x={x} y={y - 13} textAnchor="middle" fontSize="3.2" fill="hsl(var(--dmuted))" className="mono-label">
              {a.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ServiceAreaMap({ areas }: { areas: AreaSummary[] }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!apiKey || !ref.current) return;
    let cancelled = false;
    const centers = areas.filter((a) => Array.isArray(a.center));

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !ref.current || !window.google?.maps) return;
        const g = window.google.maps;
        const map = new g.Map(ref.current, {
          zoom: 11,
          center: centers[0]?.center
            ? { lat: centers[0].center![1], lng: centers[0].center![0] }
            : { lat: 26.9124, lng: 75.7873 }, // Jaipur fallback center
          disableDefaultUI: true,
          zoomControl: true,
          styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }],
        });
        const bounds = new g.LatLngBounds();
        for (const a of centers) {
          const center = { lat: a.center![1], lng: a.center![0] };
          // Approximate service-area circle - never a pinpoint marker.
          const circle = new g.Circle({
            map,
            center,
            radius: (a.radiusKm || 2) * 1000,
            fillColor: AMBER,
            fillOpacity: 0.18,
            strokeColor: AMBER,
            strokeOpacity: 0.9,
            strokeWeight: 1.5,
          });
          bounds.union(circle.getBounds());
        }
        if (centers.length) map.fitBounds(bounds, 40);
      })
      .catch(() => !cancelled && setFailed(true));

    return () => {
      cancelled = true;
    };
  }, [apiKey, areas]);

  if (!apiKey || failed) {
    return (
      <div className="h-[260px] w-full bg-surface-2">
        <FallbackMap areas={areas} />
      </div>
    );
  }
  return <div ref={ref} className="h-[260px] w-full bg-surface-2" aria-label="Map of service areas" />;
}
