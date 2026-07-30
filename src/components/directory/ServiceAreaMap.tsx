"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AreaSummary } from "@/lib/directory/types";

const AMBER = "#FCB542";
const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

/** Used only when a profile has no geocoded areas at all. */
const FALLBACK_CENTER: [number, number] = [75.7873, 26.9124]; // Jaipur

/**
 * A closed GeoJSON ring approximating a circle of `radiusKm` around `center`.
 *
 * Mapbox's native circle layer sizes in screen pixels, which would keep a
 * "2 km area" the same size at every zoom - visually a lie. A real polygon
 * scales with the map, so the area always reads as the same ground distance.
 */
function circleRing(
  center: [number, number],
  radiusKm: number,
  steps = 72
): [number, number][] {
  const [lng, lat] = center;
  const kmPerDegLat = 110.574;
  const kmPerDegLng = 111.32 * Math.cos((lat * Math.PI) / 180);
  const ring: [number, number][] = [];
  for (let i = 0; i <= steps; i += 1) {
    const theta = (i / steps) * 2 * Math.PI;
    ring.push([
      lng + (radiusKm / kmPerDegLng) * Math.cos(theta),
      lat + (radiusKm / kmPerDegLat) * Math.sin(theta),
    ]);
  }
  return ring;
}

type Ring = { label: string; ring: [number, number][] };

function toRings(areas: AreaSummary[]): Ring[] {
  return areas
    .filter((a) => Array.isArray(a.center))
    .map((a) => ({
      label: a.label,
      ring: circleRing(a.center as [number, number], a.radiusKm || 2),
    }));
}

function toGeoJson(rings: Ring[]) {
  return {
    type: "FeatureCollection" as const,
    features: rings.map((r) => ({
      type: "Feature" as const,
      properties: { label: r.label },
      geometry: { type: "Polygon" as const, coordinates: [r.ring] },
    })),
  };
}

/** SVG stand-in used when there is no token or the map fails to load. */
function FallbackMap({ areas }: { areas: AreaSummary[] }) {
  const pts = areas
    .map((a) => a.center)
    .filter((c): c is [number, number] => Array.isArray(c) && c.length === 2);

  const project = (i: number, c?: [number, number]): [number, number] => {
    if (!c || pts.length < 2) {
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
    <svg
      viewBox="0 0 100 72"
      className="h-full w-full"
      role="img"
      aria-label="Approximate service areas"
    >
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

/**
 * Mapbox view of a profile's approximate service areas.
 *
 * Renders obfuscated circles only - never a pinpoint marker. The circles come
 * from the centroid of the owner's active listings per city, so a marker would
 * imply precision the data does not have and would leak property locations.
 */
export default function ServiceAreaMap({ areas }: { areas: AreaSummary[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!TOKEN || !ref.current || mapRef.current) return;

    const rings = toRings(areas);
    const data = toGeoJson(rings);

    let map: mapboxgl.Map;
    try {
      mapboxgl.accessToken = TOKEN;
      map = new mapboxgl.Map({
        container: ref.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center:
          (areas.find((a) => Array.isArray(a.center))?.center as
            | [number, number]
            | undefined) ?? FALLBACK_CENTER,
        zoom: 10,
        // A service-area map is for orientation, not navigation.
        dragRotate: false,
        pitchWithRotate: false,
      });
    } catch {
      setFailed(true);
      return;
    }
    mapRef.current = map;

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );

    // On failure, tear the map down before swapping in the fallback. React
    // unmounts the container but this effect's cleanup does not re-run, so
    // without an explicit remove() the instance is orphaned in a detached
    // node and keeps requesting tiles.
    map.on("error", () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      setFailed(true);
    });

    map.on("load", () => {
      if (!rings.length) return;

      map.addSource("service-areas", { type: "geojson", data });
      map.addLayer({
        id: "service-areas-fill",
        type: "fill",
        source: "service-areas",
        paint: { "fill-color": AMBER, "fill-opacity": 0.18 },
      });
      map.addLayer({
        id: "service-areas-outline",
        type: "line",
        source: "service-areas",
        paint: {
          "line-color": AMBER,
          "line-width": 1.5,
          // Dashed, so it reads as approximate rather than a hard boundary.
          "line-dasharray": [2, 1.8],
        },
      });
      map.addLayer({
        id: "service-areas-label",
        type: "symbol",
        source: "service-areas",
        layout: {
          "text-field": ["get", "label"],
          "text-size": 11,
          "text-letter-spacing": 0.08,
          "text-transform": "uppercase",
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "rgba(0,0,0,0.75)",
          "text-halo-width": 1.2,
        },
      });

      // Frame every area.
      const bounds = new mapboxgl.LngLatBounds();
      for (const r of rings) {
        for (const c of r.ring) bounds.extend(c);
      }
      if (!bounds.isEmpty()) {
        map.fitBounds(bounds, { padding: 44, duration: 0, maxZoom: 13 });
      }
    });

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [areas]);

  if (!TOKEN || failed) {
    return (
      <div className="h-[260px] w-full bg-surface-2">
        <FallbackMap areas={areas} />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="h-[260px] w-full bg-surface-2"
      aria-label="Map of approximate service areas"
    />
  );
}
