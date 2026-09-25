import React, { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useTastingRoomPage, useMenu } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Download } from "lucide-react";

export default function TastingRoom() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useTastingRoomPage();
  const { data: categories, isLoading: menuLoading, isError: menuError } = useMenu();
  const [tab, setTab] = useState(null);
  useDocumentMeta(page?.seo);

  useEffect(() => {
    if (categories?.length && tab === null) setTab(categories[0].name);
  }, [categories, tab]);

  if (pageLoading || menuLoading) return <CmsLoading />;
  if (pageError || menuError || !page) return <CmsError label="the Tasting Room page" />;

  const activeCategory = categories.find((c) => c.name === tab) ?? categories[0];
  const items = [...(activeCategory?.menu_items ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      {/* Filter tabs */}
      <section className="py-20 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="flex flex-wrap justify-center gap-3 mb-14">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setTab(c.name)}
                className={`px-5 py-3 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                  tab === c.name
                    ? "border-gold text-champagne bg-gold/10"
                    : "border-gold/20 text-muted-gold hover:text-gold"
                }`}
              >
                {c.name}
              </button>
            ))}
          </Reveal>

          {/* Menu grid */}
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
            {items.map((item) => (
              <div key={item.id} className="bg-onyx px-8 py-8 group hover:bg-velvet/40 transition-colors duration-500">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-heading uppercase tracking-luxe text-champagne text-base sm:text-lg">
                    {item.name}
                  </h3>
                  <span className="font-mono text-sm text-gold whitespace-nowrap">{item.price}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-body text-sm text-champagne/55">{item.notes}</p>
                  <span className="font-mono text-[11px] text-muted-gold">{item.abv}</span>
                </div>
                <span className="block h-px w-0 bg-gold/40 mt-5 group-hover:w-full transition-all duration-700" />
              </div>
            ))}
          </Reveal>

          <Reveal className="text-center mt-12">
            <button className="inline-flex items-center gap-3 px-8 py-3.5 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx">
              <Download size={14} />
              {page.downloadMenuLabel}
            </button>
          </Reveal>
        </div>
      </section>

      {/* Culinary pairing list */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              {page.pairingsEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              {page.pairingsTitle}
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
            {(page.pairings ?? []).map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1} className="bg-onyx group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={strapiMediaUrl(p.image)} alt={p.region} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-onyx/40" />
                  <span className="absolute top-4 left-4 font-heading text-[10px] uppercase tracking-luxe text-champagne">
                    {p.region}
                  </span>
                </div>
                <div className="px-5 py-5 border-t border-gold/15">
                  <p className="font-body text-xs text-muted-gold uppercase tracking-luxe-sm">{page.pairedWithLabel}</p>
                  <p className="font-heading text-sm text-champagne mt-1">{p.whisky}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
