import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useExperiencesPage } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ChevronDown } from "lucide-react";

export default function Experiences() {
  const { data: page, isLoading, isError } = useExperiencesPage();
  const [open, setOpen] = useState(0);
  useDocumentMeta(page?.seo);

  if (isLoading) return <CmsLoading />;
  if (isError || !page) return <CmsError label="the Experiences page" />;

  const pillars = page.pillars ?? [];

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        imgPosition="50% 35%"
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      {/* Three Pillars accordion */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              {page.pillarsEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              {page.pillarsTitle}
            </h2>
          </Reveal>

          <div className="border border-gold/15">
            {pillars.map((p, i) => (
              <div key={p.id} className={`border-b border-gold/15 last:border-b-0`}>
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
                    {p.description}
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
            <img src={strapiMediaUrl(page.tablesideImage)} alt={page.tablesideImage?.alternativeText || "Tableside theatre"} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-onyx/40 to-transparent" />
          </Reveal>
          <div className="flex items-center px-8 sm:px-14 py-16 lg:py-0">
            <Reveal delay={0.1}>
              <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
                {page.tablesideEyebrow}
              </span>
              <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
                {page.tablesideTitle}
              </h2>
              <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
                {page.tablesideText}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx"
              >
                {page.tablesideCtaLabel}
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
              {page.diningEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
              {page.diningTitle}
            </h2>
            <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
              {page.diningText}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx"
            >
              {page.diningCtaLabel}
            </Link>
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2 relative aspect-[4/3] overflow-hidden">
            <img src={strapiMediaUrl(page.diningImage)} alt={page.diningImage?.alternativeText || "Private booth"} className="h-full w-full object-cover" />
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
            {page.stickyCtaLabel}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
