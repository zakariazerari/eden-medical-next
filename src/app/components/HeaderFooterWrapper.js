"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import SiteFooter from "./SiteFooter";

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className={!isAdminRoute ? "mt-16" : ""}>{children}</main>
      {!isAdminRoute && <SiteFooter />}
    </>
  );
}