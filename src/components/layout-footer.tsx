"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

const LayoutFooter = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Footer />;
};

export default LayoutFooter;
