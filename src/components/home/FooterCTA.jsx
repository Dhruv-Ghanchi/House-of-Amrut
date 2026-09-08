import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

export default function FooterCTA() {
  return (
    <section className="relative py-32 lg:py-44 bg-onyx border-t border-gold/10 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grain" />
      <div className="relative mx-auto max-w-luxe px-6 lg:px-10 text-center">
        <Reveal>
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-8 block">
            Reservations
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-4xl sm:text-6xl lg:text-7xl leading-none text-shadow-amber">
            The House Awaits.
          </h2>
          <p className="font-display italic text-xl sm:text-2xl text-champagne/70 mt-8">
            An evening worth remembering.
          </p>
          <div className="mt-12">
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center px-10 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
            >
              <span className="relative z-10">Reserve Your Table</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}