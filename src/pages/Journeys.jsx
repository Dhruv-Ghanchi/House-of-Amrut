import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";

const JOURNEYS = [
  {
    name: "The Innovators",
    desc: "Exploring pioneering wood finishes: ex-bourbon, ex-sherry, and the experimental casks that rewrote what Indian malt could be.",
    duration: "60 min",
    pours: "4 × 15ml",
    price: "₹4,500 / person",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="text-gold">
        <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1" />
        <path d="M24 12 L28 24 L24 36 L20 24 Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "The Angel's Share",
    desc: "A focus on rapid tropical maturation, and how heat, humidity and time compress decades of flavour into a few intense years.",
    duration: "60 min",
    pours: "4 × 15ml",
    price: "₹5,200 / person",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M14 16 H34 V34 C34 36 32 38 30 38 H18 C16 38 14 36 14 34 Z" stroke="currentColor" strokeWidth="1" />
        <path d="M14 20 H34" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "Land & Time",
    desc: "A terroir-focused flight tracing Indian barley origins, from the northern plains to the southern coast, in four glasses.",
    duration: "60 min",
    pours: "4 × 15ml",
    price: "₹4,800 / person",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M8 36 L18 22 L24 30 L32 16 L40 36 Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    name: "The Rare & Exceptional",
    desc: "Poured from cask-strength and limited allocations: bottles that exist in handfuls, opened only for those who journey here.",
    duration: "75 min",
    pours: "4 × 15ml",
    price: "₹7,500 / person",
    icon: (
      <svg width="36" height="36" viewBox="0 0 48 48" fill="none" className="text-gold">
        <path d="M24 10 C30 14 34 18 34 24 C34 30 30 34 24 38 C18 34 14 30 14 24 C14 18 18 14 24 10 Z" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function Journeys() {
  return (
    <>
      <PageHero
        image={IMAGES.journeysHero}
        imgPosition="50% 38%"
        eyebrow="Journeys"
        title="Curated Journeys"
        subtitle="Four guided tasting flights, narrated by the sommelier."
      />

      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Flight Selection
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              Four Routes Through the Spirit
            </h2>
            <div className="gold-divider w-32 mx-auto mt-8" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
            {JOURNEYS.map((j, i) => (
              <Reveal key={j.name} delay={(i % 2) * 0.12} className="bg-onyx p-8 sm:p-10 group hover:bg-velvet/40 transition-colors duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    {j.icon}
                    <h3 className="font-heading uppercase tracking-luxe text-champagne text-xl sm:text-2xl mt-5">
                      {j.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-muted-gold">0{i + 1}</span>
                </div>
                <p className="font-body text-sm text-champagne/60 leading-relaxed mb-8 max-w-md">
                  {j.desc}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8 font-heading text-[10px] uppercase tracking-luxe text-muted-gold">
                  <span><span className="text-champagne/80">{j.duration}</span> · Duration</span>
                  <span><span className="text-champagne/80">{j.pours}</span> · Pours</span>
                  <span className="text-gold">{j.price}</span>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-7 py-3 font-heading text-[10px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx"
                >
                  Reserve This Journey
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sommelier note */}
      <section className="py-24 bg-onyx border-t border-gold/10">
        <Reveal className="mx-auto max-w-luxe px-6 text-center">
          <p className="font-display italic text-2xl sm:text-3xl text-champagne/85 max-w-3xl mx-auto leading-relaxed">
            "Each journey is guided. The sommelier pours, and the story follows. You are not
            drinking; you are listening."
          </p>
        </Reveal>
      </section>
    </>
  );
}