import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";
import { ChevronDown } from "lucide-react";

const PILLARS = [
  {
    name: "Classic",
    duration: "60 min",
    group: "1-4 guests",
    tier: "₹₹",
    desc: "Familiar, through an Amrut lens. A guided flight of house expressions served neat, with still water and a brief on each pour's origin.",
  },
  {
    name: "Contemporary",
    duration: "75 min",
    group: "1-6 guests",
    tier: "₹₹₹",
    desc: "Classics reinterpreted. Our mixologists rebuild the canon of the Old Fashioned, Manhattan and Sour around Amrut's single malts, tableside.",
  },
  {
    name: "Signature",
    duration: "90 min",
    group: "1-8 guests",
    tier: "₹₹₹₹",
    desc: "The spirit of India. Rare allocations paired with regional plates, narrated by the sommelier from the Tasting Cart.",
  },
];

export default function Experiences() {
  const [open, setOpen] = useState(0);

  return (
    <>
      <PageHero
        image={IMAGES.experiencesHero}
        imgPosition="50% 35%"
        eyebrow="Experiences"
        title="Experiences"
        subtitle="Curated evenings, composed pour by pour."
      />

      {/* Three Pillars accordion */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              The Three Pillars
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              Choose Your Evening
            </h2>
          </Reveal>

          <div className="border border-gold/15">
            {PILLARS.map((p, i) => (
              <div key={p.name} className={`border-b border-gold/15 last:border-b-0`}>
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 sm:px-10 py-7 text-left group"
                >
                  <div className="flex items-center gap-6">
                    <span className="font-heading text-[10px] tracking-luxe text-muted-gold">0{i + 1}</span>
                    <h3 className="font-heading uppercase tracking-luxe text-champagne text-lg sm:text-2xl">
                      {p.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex gap-8 font-heading text-[10px] uppercase tracking-luxe text-muted-gold">
                      <span>{p.duration}</span>
                      <span>{p.group}</span>
                      <span className="text-gold">{p.tier}</span>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-gold transition-transform duration-500 ${open === i ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    open === i ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <p className="px-6 sm:px-10 pb-8 pl-[3.4rem] font-body text-base text-champagne/65 leading-relaxed max-w-2xl">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tableside Theatre highlight */}
      <section className="relative bg-onyx border-t border-gold/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <Reveal className="relative h-[60vh] lg:h-[80vh] overflow-hidden">
            <img src={IMAGES.tablesideCocktail} alt="Tableside theatre" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-onyx/40 to-transparent" />
          </Reveal>
          <div className="flex items-center px-8 sm:px-14 py-16 lg:py-0">
            <Reveal delay={0.1}>
              <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
                Tableside Theatre
              </span>
              <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
                The Tasting Cart, At Your Table
              </h2>
              <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
                A private experience where the mixologist wheels the cart to your booth and composes
                each cocktail in the glow of candlelight. Bitters measured by eye, ice cut by hand,
                every gesture part of the performance.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx"
              >
                Enquire Privately
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Private dining */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="order-2 lg:order-1">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Private Dining & Events
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
              Buy the House
            </h2>
            <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
              Reserve a private VIP room or take the house in its entirety. Bespoke menus, dedicated
              sommelier, and a sealed guest list for celebrations that deserve no audience but your own.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx"
            >
              Submit an Inquiry
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden">
            <img src={IMAGES.privateDining} alt="Private booth" className="h-full w-full object-cover" />
            <div className="absolute inset-0 border border-gold/20 m-3 pointer-events-none" />
          </Reveal>
        </div>
      </section>

      {/* Sticky CTA */}
      <section className="py-20 bg-onyx border-t border-gold/10 text-center">
        <Reveal>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 font-heading text-[11px] uppercase tracking-luxe text-onyx bg-gold border border-gold transition-all duration-500 hover:glow-amber"
          >
            Book an Experience
          </Link>
        </Reveal>
      </section>
    </>
  );
}