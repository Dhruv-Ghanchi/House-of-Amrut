import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useTheHousePage } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export default function TheHouse() {
  const { data: page, isLoading, isError } = useTheHousePage();
  const [filter, setFilter] = useState("All");
  useDocumentMeta(page?.seo);

  if (isLoading) return <CmsLoading />;
  if (isError || !page) return <CmsError label="The House page" />;

  const gallery = page.gallery ?? [];
  const filters = ["All", ...new Set(gallery.map((g) => g.category).filter(Boolean))];
  const visible = gallery.filter((g) => filter === "All" || g.category === filter);

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      {/* Our Heritage */}
      <section className="py-28 lg:py-36 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              {page.heritageEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-8 leading-tight">
              {page.heritageTitle}
            </h2>
            <div className="space-y-5 font-body text-base text-champagne/70 leading-relaxed">
              {(page.heritageText ?? "").split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.15} className="relative aspect-[4/5] overflow-hidden">
            <img
              src={strapiMediaUrl(page.heritageImage)}
              alt={page.heritageImage?.alternativeText || "Amrut distillery heritage archive"}
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
              {page.craftsmanshipEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              {page.craftsmanshipTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 border border-gold/15">
            {(page.pillars ?? []).map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 0.12}
                className="px-8 py-12 border-b md:border-b-0 border-gold/15 [&:not(:last-child)]:md:border-r"
              >
                <span className="font-heading text-[10px] tracking-luxe text-muted-gold">0{i + 1}</span>
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-lg mt-4 mb-4">
                  {p.title}
                </h3>
                <p className="font-body text-sm text-champagne/60 leading-relaxed">{p.description}</p>
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
              {page.galleryTitle}
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
            {visible.map((g, i) => (
              <Reveal key={g.id} delay={i * 0.08} className="group relative aspect-[3/4] overflow-hidden">
                <img
                  src={strapiMediaUrl(g.image)}
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
            {page.ctaTitle}
          </h2>
          <Link
            to={page.ctaLink || "/tasting-room"}
            className="inline-flex items-center justify-center px-9 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
          >
            {page.ctaLabel}
          </Link>
        </Reveal>
      </section>
    </>
  );
}
