"use client";

import { useEffect } from "react";
import { metaPixel } from "@/lib/fpixel";

/** One intentional landing ViewContent (manual-only pixel; full params for Pixel Helper). */
export default function MetaPixelPageEvents() {
  useEffect(() => {
    metaPixel.track("ViewContent", {
      content_ids: ["brokwise_landing_home"],
      content_type: "product_group",
      content_name: "Brokwise Landing Home",
      content_category: "marketing",
    });
    metaPixel.trackCustom("BW_Landing_Home_Load", {
      surface: "marketing_landing",
      path: typeof window !== "undefined" ? window.location.pathname : "/",
    });
  }, []);

  return null;
}
