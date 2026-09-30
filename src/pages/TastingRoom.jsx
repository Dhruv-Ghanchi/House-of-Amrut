import React, { useState, useEffect, useMemo } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useTastingRoomPage } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Download } from "lucide-react";

// Crop focal point per region, tuned to each photo's actual composition —
// the dish sits off-center in these venue photos, so a plain "center" crop
// (default object-fit: cover behavior) cuts into the plate/garnish.
const PAIRING_FOCAL_POINT = {
  North: "65% center",
  East: "center",
  South: "center 85%",
  West: "center 100%",
};

function groupMenu(menu) {
  const groups = [];
  const byLabel = new Map();
  const sorted = [...(menu ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  for (const category of sorted) {
    const label = category.sectionGroup || category.name;
    if (!byLabel.has(label)) {
      const group = { label, categories: [] };
      byLabel.set(label, group);
      groups.push(group);
    }
    byLabel.get(label).categories.push(category);
  }
  return groups;
}

function priceColumns(category) {
  return (category.priceColumns ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function itemPrices(item) {
  return [item.price1, item.price2, item.price3].filter((p) => p !== null && p !== undefined && p !== "");
}

export default function TastingRoom() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useTastingRoomPage();
  const [tab, setTab] = useState(null);
  useDocumentMeta(page?.seo);

  const groups = useMemo(() => groupMenu(page?.menu), [page]);

  useEffect(() => {
    if (groups.length && tab === null) setTab(groups[0].label);
  }, [groups, tab]);

  if (pageLoading) return <CmsLoading />;
  if (pageError || !page) return <CmsError label="the Tasting Room page" />;

  const activeGroup = groups.find((g) => g.label === tab) ?? groups[0];

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
          {groups.length > 1 && (
            <Reveal className="flex flex-wrap justify-center gap-3 mb-14">
              {groups.map((g) => (
                <button
                  key={g.label}
                  onClick={() => setTab(g.label)}
                  className={`px-5 py-3 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                    tab === g.label
                      ? "border-gold text-champagne bg-gold/10"
                      : "border-gold/20 text-muted-gold hover:text-gold"
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </Reveal>
          )}

          {/* Menu sections */}
          {(activeGroup?.categories ?? []).map((category) => {
            const cols = priceColumns(category);
            const items = [...(category.items ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
            return (
              <div key={category.id} className="mb-16 last:mb-0">
                {activeGroup.categories.length > 1 && (
                  <Reveal className="mb-6 text-center">
                    <h3 className="font-heading uppercase tracking-luxe text-gold text-lg sm:text-xl">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="font-body text-sm text-champagne/55 mt-2 max-w-2xl mx-auto">
                        {category.description}
                      </p>
                    )}
                  </Reveal>
                )}
                {activeGroup.categories.length === 1 && category.description && (
                  <Reveal className="mb-8 text-center">
                    <p className="font-body text-sm text-champagne/55 max-w-2xl mx-auto">{category.description}</p>
                  </Reveal>
                )}

                {cols.length > 1 && (
                  <div className="flex justify-end gap-6 pr-8 mb-2 font-mono text-[10px] uppercase tracking-luxe-sm text-muted-gold">
                    {cols.map((c) => (
                      <span key={c} className="w-12 text-right">
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
                  {items.map((item) => {
                    const prices = itemPrices(item);
                    return (
                      <div
                        key={item.id}
                        className="bg-onyx px-8 py-8 group hover:bg-velvet/40 transition-colors duration-500"
                      >
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-heading uppercase tracking-luxe text-champagne text-base sm:text-lg">
                            {item.name}
                          </h4>
                          {prices.length > 0 ? (
                            <span className="flex gap-4 font-mono text-sm text-gold whitespace-nowrap">
                              {prices.map((p, i) => (
                                <span key={i} className="w-12 text-right">
                                  {p}
                                </span>
                              ))}
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] uppercase tracking-luxe-sm text-gold whitespace-nowrap">
                              On the House
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <p className="font-body text-sm text-champagne/55">{item.notes}</p>
                          <span className="font-mono text-[11px] text-muted-gold whitespace-nowrap ml-4">
                            {item.region ? item.region : item.abv}
                          </span>
                        </div>
                        <span className="block h-px w-0 bg-gold/40 mt-5 group-hover:w-full transition-all duration-700" />
                      </div>
                    );
                  })}
                </Reveal>
              </div>
            );
          })}

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
                  <img
                    src={strapiMediaUrl(p.image)}
                    alt={p.region}
                    style={{ objectPosition: PAIRING_FOCAL_POINT[p.region] ?? "center" }}
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
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
