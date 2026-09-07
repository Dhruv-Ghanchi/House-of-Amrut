import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";

const PILLARS = [
  {
    title: "Distillation",
    desc: "Copper pot stills refining Indian six-row barley into a spirit of uncommon body and structure.",
  },
  {
    title: "Maturation in the Tropics",
    desc: "An unforgiving climate that accelerates the angels' share, concentrating flavour faster than any northern warehouse.",
  },
  {
    title: "Artisan Blending",
    desc: "Casks selected by hand and married with intent — each release a composition, never a formula.",
  },
];

const GALLERY = [
  { img: IMAGES.loungeInterior, label: "The Lounge" },
  { img: IMAGES.privateBooth, label: "Private Booths" },
  { img: IMAGES.heroBar, label: "The Bar" },
  { img: IMAGES.libraryHero, label: "The Library" },
];

export default function TheHouse() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Lounge", "Booths", "Bar", "Library"];
  const visible = GALLERY.filter((g) => filter === "All" || g.label.includes(filter) || filter.includes(g.label.split(" ")[1]));

  return (
    <>
      <PageHero
        image={IMAGES.theHouseHero}
        eyebrow="The House"
        title="The House"
        subtitle="Where Heritage Meets Modern Indulgence"
      />

      {/* Our Heritage */}
      <section className="py-28 lg:py-36 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Our Heritage
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-8 leading-tight">
              Since 1948, A Quiet Revolution
            </h2>
            <div className="space-y-5 font-body text-base text-champagne/70 leading-relaxed">
              <p>
                What began as a small distillery in Bangalore would, over seven decades, become the
                name that put Indian single malt on the world map. Amrut pioneered a spirit once
                thought impossible to craft in the tropics.
              </p>
              <p>
                House of Amrut is its sanctuary — a place where that legacy is not merely stored but
                poured, studied and celebrated. Every bottle on these shelves carries the weight of
                an unlikely triumph.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden">
            <img
              src={IMAGES.heritageArchive}
              alt="Amrut distillery heritage archive"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 border border-gold/20 m-3 pointer-events-none" />
          </Reveal>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Craftsmanship & Philosophy
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              The Making of a Spirit
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gold/15">
            {PILLARS.map((p, i) => (
              <Reveal
                key={p.title}
                delay={i * 0.12}
                className="px-8 py-12 border-b md:border-b-0 border-gold/15 [&:not(:last-child)]:md:border-r"
              >
                <span className="font-heading text-[10px] tracking-luxe text-muted-gold">0{i + 1}</span>
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-lg mt-4 mb-4">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-champagne/60 leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-12">
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-8">
              Interior & Ambiance
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                    filter === f
                      ? "border-gold text-champagne bg-gold/10"
                      : "border-gold/20 text-muted-gold hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.08} className="group relative aspect-[3/4] overflow-hidden">
                <img
                  src={g.img}
                  alt={g.label}
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-onyx/50 group-hover:bg-onyx/20 transition-colors duration-500" />
                <span className="absolute bottom-4 left-4 font-heading text-[10px] uppercase tracking-luxe text-champagne">
                  {g.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-onyx border-t border-gold/10 text-center">
        <Reveal className="mx-auto max-w-luxe px-6">
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-8">
            Enter the Spirits Library
          </h2>
          <Link
            to="/tasting-room"
            className="inline-flex items-center justify-center px-9 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
          >
            Explore Our Tasting Room
          </Link>
        </Reveal>
      </section>
    </>
  );
}