"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";

/**
 * Renders the legacy global navbar on every route except the new landing page
 * at "/", which ships its own self-contained navbar.
 */
const SiteNav = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <NavBar />;
};

export default SiteNav;
