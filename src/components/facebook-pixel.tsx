"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, Suspense } from "react";
import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";

const FacebookPixelContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  return null;
};

const FacebookPixel = ({ nonce }: { nonce?: string }) => {
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="fb-pixel"
        nonce={nonce}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <Suspense fallback={null}>
        <FacebookPixelContent />
      </Suspense>
    </>
  );
};

export default FacebookPixel;
