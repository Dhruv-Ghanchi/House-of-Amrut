import React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";

export default function TablesideBanner() {
  return (
    <section className="relative bg-onyx border-t border-gold/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Reveal className="relative h-[60vh] md:h-[80vh] overflow-hidden group">
          <img
            src={IMAGES.tastingCart}
            alt="The tasting cart with Amrut bottles"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-onyx/30" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <span className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold block mb-3">
                01 · Pour
              </span>
              <h3 className="font-heading uppercase tracking-luxe text-champagne text-2xl sm:text-3xl">
                The Tasting Cart
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative h-[60vh] md:h-[80vh] overflow-hidden group md:border-l border-gold/15">
          <img
            src={IMAGES.tablesideCocktail}
            alt="Tableside theatre craft cocktail"
            className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx/80 via-transparent to-onyx/30" />
          <div className="absolute inset-0 flex items-end p-10">
            <div>
              <span className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold block mb-3">
                02 · Craft
              </span>
              <h3 className="font-heading uppercase tracking-luxe text-champagne text-2xl sm:text-3xl">
                Tableside Theatre
              </h3>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-luxe px-6 lg:px-10 py-20 text-center">
        <Reveal>
          <p className="font-display italic text-2xl sm:text-3xl text-champagne/85 max-w-3xl mx-auto leading-relaxed">
            "Where the mixologist becomes the storyteller, and every pour is performed in the
            glow of candlelight."
          </p>
        </Reveal>
      </div>
    </section>
  );
}