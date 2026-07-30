import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // A fresh cryptographic nonce is generated per request so the browser
  // can verify that inline scripts were placed by the server, not injected.
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

  // Next.js webpack dev server wraps every module in eval() for fast source
  // maps. We allow that only in development; production never needs it.
  const isDev = process.env.NODE_ENV === "development";

  // ── Script sources ────────────────────────────────────────────────────────
  // 'self'            – Next.js bundle chunks (_next/static/*)
  // 'nonce-{nonce}'   – inline <script> blocks that carry this nonce attribute
  // 'unsafe-inline'   – ignored by nonce-capable browsers; fallback for old ones
  // listed https:     – external scripts loaded by GTM, Pixel, Cal, Analytics…
  //                     (no strict-dynamic needed – the domain list handles them)
  // 'unsafe-eval'     – dev only: webpack eval-source-map HMR
  const scriptSrcParts = [
    // 'self' — Next.js bundle chunks (_next/static/*), fallback for pre-CSP3 browsers
    "'self'",
    // nonce — trusts our own inline <Script> tags (GTM loader, FB Pixel)
    `'nonce-${nonce}'`,
    // strict-dynamic — trusts scripts dynamically created BY nonce'd scripts.
    // This covers PostHog surveys/toolbar, GTM custom HTML tags, Cal.com injections,
    // and any other inline scripts written by trusted loaded scripts.
    // In modern browsers this also makes the explicit domain list below act as
    // a fallback for old browsers only (strict-dynamic ignores host sources in CSP3).
    "'strict-dynamic'",
    // 'unsafe-inline' — ignored by modern browsers when a nonce is present,
    // but retained as a fallback for browsers that predate nonce support.
    "'unsafe-inline'",
    "https://www.googletagmanager.com",
    "https://connect.facebook.net",
    "https://www.facebook.com",
    "https://www.aura.build",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://region1.google-analytics.com",
    "https://va.vercel-scripts.com",
    "https://app.cal.com",
    "https://cal.com",
    "https://*.i.posthog.com",
  ];
  if (isDev) scriptSrcParts.push("'unsafe-eval'");

  // connect-src: production origins plus localhost in dev so fetch() calls to
  // the local API server (NEXT_PUBLIC_API_BASE_URL=http://localhost:PORT) are
  // not blocked by the CSP. Also include ws://localhost:* for HMR websockets.
  const connectSrcParts = [
    "'self'",
    "https://api.brokwise.com",
    "https://*.brokwise.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://analytics.google.com",
    "https://region1.google-analytics.com",
    "https://connect.facebook.net",
    "https://www.facebook.com",
    "https://us.i.posthog.com",
    "https://*.posthog.com",
    "https://app.cal.com",
    "https://cal.com",
    "https://va.vercel-scripts.com",
  ];
  if (isDev) {
    // Allow fetch() to the local backend and webpack HMR websocket.
    connectSrcParts.push("http://localhost:*", "http://127.0.0.1:*", "ws://localhost:*");
  }

  const csp = [
    "default-src 'self'",
    `script-src ${scriptSrcParts.join(" ")}`,
    // Tailwind / shadcn use inline styles; nonce-ing every element is impractical.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    // next/font downloads Google Fonts at build time → served from _next/static/
    "font-src 'self'",
    `connect-src ${connectSrcParts.join(" ")}`,
    "frame-src https://www.googletagmanager.com https://app.cal.com https://cal.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // upgrade-insecure-requests is production-only; in dev the API uses http://
    // so adding it here would silently rewrite http://localhost to https://localhost.
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  // Pass the nonce to the layout (server component) via a request header so it
  // can stamp matching nonce attributes on the inline <Script> blocks it renders.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  // The browser reads CSP from the *response* header.
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    // Run on every HTML page request. Skip static asset paths so we don't
    // waste time generating a nonce for images, fonts, and JS chunks.
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|ttf|woff|woff2)).*)",
  ],
};
