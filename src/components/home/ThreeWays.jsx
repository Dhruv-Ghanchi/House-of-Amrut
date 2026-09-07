import React from "react";
import { Reveal } from "@/components/ui/Reveal";

const WAYS = [
  {
    label: "Classic",
    desc: "Familiar, through an Amrut lens.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M14 12 H34 L31 28 C30 32 27 34 24 34 C21 34 18 32 17 28 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M14 12 H34" stroke="currentColor" strokeWidth="1" />
        <path d="M20 38 H28" stroke="currentColor" strokeWidth="1" />
        <path d="M24 34 V38" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Contemporary",
    desc: "Classics reinterpreted.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M24 8 V40" stroke="currentColor" strokeWidth="1" />
        <path d="M24 16 C18 14 14 18 14 24" stroke="currentColor" strokeWidth="1" />
        <path d="M24 24 C18 22 14 26 14 32" stroke="currentColor" strokeWidth="1" />
        <path d="M24 16 C30 14 34 18 34 24" stroke="currentColor" strokeWidth="1" />
        <path d="M24 24 C30 22 34 26 34 32" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Signature",
    desc: "The spirit of India.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M24 10 C28 14 34 14 34 22 C34 30 28 34 24 36 C20 34 14 30 14 22 C14 14 20 14 24 10 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M18 40 H30" stroke="currentColor" strokeWidth="1" />
        <path d="M20 26 C22 27 26 27 28 26" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="22" r="1.2" fill="currentColor" />
        <circle cx="28" cy="22" r="1.2" fill="currentColor" />
      </svg>
    ),
  },
];

export default function ThreeWays() {
  return (
    <section className="relative py-24 lg:py-32 bg-onyx border-t border-gold/10">
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6 block">
            The Experience
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
            Three Ways to Experience the House
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gold/15 border border-gold/15">
          {WAYS.map((w, i) => (
            <Reveal
              key={w.label}
              delay={i * 0.15}
              className="relative flex flex-col items-center text-center px-8 py-16 md:py-20 bg-onyx"
            >
              <div className="mb-8 transition-transform duration-500 hover:scale-110">{w.icon}</div>
              <h3 className="font-heading uppercase tracking-luxe text-champagne text-lg mb-4">
                {w.label}
              </h3>
              <p className="font-body text-base text-champagne/60 leading-relaxed max-w-[220px]">
                {w.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}