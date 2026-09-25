import React from "react";
import { Reveal } from "@/components/ui/Reveal";

export default function LegacyOverview({ page }) {
  return (
    <section className="relative py-28 lg:py-36 bg-onyx">
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6">
            {page.legacyEyebrow}
          </span>
          <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl lg:text-5xl leading-tight max-w-3xl">
            {page.legacyTitle}
          </h2>
          <div className="gold-divider w-32 my-10 origin-center" />
          <p className="font-body text-lg leading-relaxed text-champagne/70 max-w-2xl">
            {page.legacyText}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
