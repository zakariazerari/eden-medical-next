// app/components/HeaderFooterWrapper.js - ✅ UPDATED VERSION
"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import SiteFooter from "./SiteFooter";
import Breadcrumbs from "./Breadcrumbs";

export default function HeaderFooterWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <Breadcrumbs />}
      <main className={!isAdminRoute ? "mt-16" : ""}>{children}</main>
      {!isAdminRoute && <SiteFooter />}
    </>
  );
}