import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-onyx">
      {/* Vertical narrative rails */}
      <div className="pointer-events-none fixed inset-y-0 left-6 z-40 hidden lg:block">
        <div className="gold-divider-v h-full" />
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-6 z-40 hidden lg:block">
        <div className="gold-divider-v h-full" />
      </div>

      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}