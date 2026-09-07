import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";

const REGIONS = [
  { label: "North", img: IMAGES.dishNorth },
  { label: "East", img: IMAGES.dishEast },
  { label: "West", img: IMAGES.dishWest },
  { label: "South", img: IMAGES.dishSouth },
];

export default function RegionalPairings() {
  return (
    <section className="relative py-28 lg:py-36 bg-onyx border-t border-gold/10">
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6 block">
            The Table
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl lg:text-5xl">
            From India, With Intent.
          </h2>
          <p className="font-body text-base text-champagne/60 mt-6 max-w-xl mx-auto leading-relaxed">
            Regional plates composed to converse with the spirit — a map of India, told in four
            courses.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15">
          {REGIONS.map((r, i) => (
            <Reveal key={r.label} delay={i * 0.1} className="group relative bg-onyx overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={r.img}
                  alt={`${r.label} Indian dish`}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-onyx/40 group-hover:bg-onyx/20 transition-colors duration-500" />
              </div>
              <div className="flex items-center justify-between px-5 py-5 border-t border-gold/15">
                <span className="font-heading uppercase tracking-luxe text-champagne text-sm">
                  {r.label}
                </span>
                <span className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold">
                  0{i + 1}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}