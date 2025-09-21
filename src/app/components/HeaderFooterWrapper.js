"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname();

  // ✅ هادي كتشوف واش المسار ديال admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "mt-16" : ""}>{children}</main>
      {!isAdminRoute && <Footer />}
    </>
  );
}
