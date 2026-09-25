import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useJourneysPage, useJourneys } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function Journeys() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useJourneysPage();
  const { data: journeys, isLoading: journeysLoading, isError: journeysError } = useJourneys();
  useDocumentMeta(page?.seo);

  if (pageLoading || journeysLoading) return <CmsLoading />;
  if (pageError || journeysError || !page) return <CmsError label="the Journeys page" />;

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        imgPosition="50% 38%"
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              {page.sectionEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              {page.sectionTitle}
            </h2>
            <div className="gold-divider w-32 mx-auto mt-8" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
            {journeys.map((j, i) => (
              <Reveal key={j.id} delay={(i % 2) * 0.12} className="bg-onyx p-8 sm:p-10 group hover:bg-velvet/40 transition-colors duration-500">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <img src={strapiMediaUrl(j.icon)} alt="" className="h-9 w-9" />
                    <h3 className="font-heading uppercase tracking-luxe text-champagne text-xl sm:text-2xl mt-5">
                      {j.name}
                    </h3>
                  </div>
                  <span className="font-mono text-[11px] text-muted-gold">0{i + 1}</span>
                </div>
                <p className="font-body text-sm text-champagne/60 leading-relaxed mb-8 max-w-md">
                  {j.description}
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
                  {page.reserveCtaLabel}
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
            {page.quoteText}
          </p>
        </Reveal>
      </section>
    </>
  );
}
