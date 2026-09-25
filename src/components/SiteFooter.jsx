import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin } from "lucide-react";
import { strapiMediaUrl } from "@/lib/strapi";
import { useGlobal } from "@/hooks/useCms";

export default function SiteFooter() {
  const { data: global } = useGlobal();
  if (!global) return null;

  const nav = global.navLinks ?? [];
  const logoUrl = strapiMediaUrl(global.logo);

  return (
    <footer className="relative bg-onyx border-t border-gold/15 overflow-hidden">
      {/* Massive logotype anchor */}
      <div className="pointer-events-none select-none absolute inset-x-0 bottom-[-2vw] flex justify-center">
        <span className="font-heading text-[18vw] leading-none tracking-luxe text-gold/[0.04] whitespace-nowrap">
          {global.siteName}
        </span>
      </div>

      <div className="relative mx-auto max-w-luxe px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <img
                src={logoUrl}
                alt={global.siteName}
                className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="mt-5 font-body text-sm text-muted-gold/80 leading-relaxed">
              {global.footerTagline}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-5">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {nav.map((n) => (
                <li key={n.id}>
                  <Link
                    to={n.url}
                    className="font-body text-sm text-champagne/70 hover:text-gold transition-colors duration-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-5">
              Find Us
            </p>
            <div className="flex items-start gap-2 text-champagne/70 font-body text-sm">
              <MapPin size={14} className="text-gold mt-1" />
              <span>{global.address}</span>
            </div>
            <a
              href={global.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-champagne/70 hover:text-gold transition-colors duration-300"
            >
              <Instagram size={16} />
              <span className="font-body text-sm">{global.instagramHandle}</span>
            </a>
          </div>
        </div>

        <div className="gold-divider mt-14 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="font-body text-[11px] tracking-luxe-sm text-muted-gold/70 uppercase">
              {global.copyrightText}
            </p>
            <p className="font-body text-[9px] tracking-luxe-sm text-muted-gold/40 uppercase">
              {global.designerCredit}
            </p>
          </div>
          <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold/50">
            {global.footerMotto}
          </p>
        </div>
      </div>
    </footer>
  );
}
