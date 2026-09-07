import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MapPin } from "lucide-react";

const NAV = [
  { label: "The House", to: "/the-house" },
  { label: "Experiences", to: "/experiences" },
  { label: "Tasting Room", to: "/tasting-room" },
  { label: "Library", to: "/library" },
  { label: "Journeys", to: "/journeys" },
  { label: "Contact", to: "/contact" },
];



export default function SiteFooter() {
  return (
    <footer className="relative bg-onyx border-t border-gold/15 overflow-hidden">
      {/* Massive logotype anchor */}
      <div className="pointer-events-none select-none absolute inset-x-0 bottom-[-2vw] flex justify-center">
        <span className="font-heading text-[18vw] leading-none tracking-luxe text-gold/[0.04] whitespace-nowrap">
          HOUSE OF AMRUT
        </span>
      </div>

      <div className="relative mx-auto max-w-luxe px-6 lg:px-10 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <img 
                src="/images/logo.png" 
                alt="House of Amrut" 
                className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" 
              />
            </Link>
            <p className="mt-5 font-body text-sm text-muted-gold/80 leading-relaxed">
              A spirits library, tasting room and cocktail destination.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-2">
            <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-5">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
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
              <span>Mumbai, India</span>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-champagne/70 hover:text-gold transition-colors duration-300"
            >
              <Instagram size={16} />
              <span className="font-body text-sm">@houseofamrut</span>
            </a>
          </div>
        </div>

        <div className="gold-divider mt-14 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] tracking-luxe-sm text-muted-gold/70 uppercase">
            © 2024 House of Amrut. All Rights Reserved.
          </p>
          <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold/50">
            Few Find It. Fewer Own The Night.
          </p>
        </div>
      </div>
    </footer>
  );
}