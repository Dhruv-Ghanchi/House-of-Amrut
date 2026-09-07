import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";

const JOURNEYS = [
  {
    label: "The Innovators",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-gold">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" />
        <path d="M24 12 L28 24 L24 36 L20 24 Z" stroke="currentColor" strokeWidth="1" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "The Angel's Share",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M14 16 H34 V34 C34 36 32 38 30 38 H18 C16 38 14 36 14 34 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M14 20 H34" stroke="currentColor" strokeWidth="1" />
        <path d="M24 12 V16" stroke="currentColor" strokeWidth="1" />
        <path d="M20 26 H28" stroke="currentColor" strokeWidth="1" />
        <path d="M20 30 H28" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Land & Time",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M8 36 L18 22 L24 30 L32 16 L40 36 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M8 36 H40" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "The Rare & Exceptional",
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M24 10 C30 14 34 18 34 24 C34 30 30 34 24 38 C18 34 14 30 14 24 C14 18 18 14 24 10 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M24 10 V38" stroke="currentColor" strokeWidth="1" />
        <path d="M14 24 H34" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function CuratedJourneys() {
  return (
    <section className="relative py-28 lg:py-36 bg-onyx border-t border-gold/10">
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6 block">
            Guided Flights
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
            Curated Journeys
          </h2>
          <div className="gold-divider w-32 mx-auto mt-8" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
          {JOURNEYS.map((j, i) => (
            <Reveal
              key={j.label}
              delay={i * 0.12}
              className="group relative flex flex-col items-center text-center px-6 py-14 lg:py-16 bg-onyx"
            >
              <Link to="/journeys" className="flex flex-col items-center">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                  {j.icon}
                </div>
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-sm leading-snug max-w-[160px]">
                  {j.label}
                </h3>
                <span className="mt-5 h-px w-0 bg-gold transition-all duration-500 group-hover:w-10" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}