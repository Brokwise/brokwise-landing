"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar";

/**
 * Renders the legacy global navbar on every route except the pages that ship
 * their own self-contained v2 navbar: the new landing page ("/") and the
 * broker directory ("/directory" and its subpages).
 */
const SiteNav = () => {
  const pathname = usePathname();

  if (pathname === "/" || pathname.startsWith("/directory")) {
    return null;
  }

  return <NavBar />;
};

export default SiteNav;
