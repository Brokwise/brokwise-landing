"use client";

import { useEffect } from "react";
import { metaPixel } from "@/lib/fpixel";

/** Landing home ViewContent for Meta attribution (paired with PageView from layout). */
export default function MetaPixelPageEvents() {
  useEffect(() => {
    metaPixel.track("ViewContent", {
      content_name: "Brokwise Landing Home",
      content_category: "marketing",
    });
  }, []);

  return null;
}
