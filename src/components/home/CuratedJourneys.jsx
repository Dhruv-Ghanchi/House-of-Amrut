import React from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";

export default function CuratedJourneys({ page, journeys }) {
  const items = journeys ?? [];

  return (
    <section className="relative py-28 lg:py-36 bg-onyx border-t border-gold/10">
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <Reveal className="text-center mb-16">
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6 block">
            {page.curatedJourneysEyebrow}
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
            {page.curatedJourneysTitle}
          </h2>
          <div className="gold-divider w-32 mx-auto mt-8" />
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
          {items.map((j, i) => (
            <Reveal
              key={j.id}
              delay={i * 0.12}
              className="group relative flex flex-col items-center text-center px-6 py-14 lg:py-16 bg-onyx"
            >
              <Link to="/journeys" className="flex flex-col items-center">
                <div className="mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                  <img src={strapiMediaUrl(j.icon)} alt="" className="h-10 w-10" />
                </div>
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-sm leading-snug max-w-[160px]">
                  {j.name}
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
