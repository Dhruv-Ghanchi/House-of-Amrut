import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useLibraryPage, useBottles } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { Radar, X } from "lucide-react";

function RadarChart({ profile }) {
  const axes = ["sweetness", "smoke", "spice", "fruit", "oak"];
  const labels = { sweetness: "Sweetness", smoke: "Smoke", spice: "Spice", fruit: "Fruit", oak: "Oak" };
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 64;
  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (val, i) => {
    const rr = (r * val) / 100;
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))];
  };
  const pts = axes.map((a, i) => point(profile?.[a] ?? 0, i).join(",")).join(" ");

  return (
    <svg width={size} height={size} className="text-gold">
      {[25, 50, 75, 100].map((ring) => (
        <polygon
          key={ring}
          points={axes.map((_, i) => {
            const rr = (r * ring) / 100;
            return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))].join(",");
          }).join(" ")}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      ))}
      {axes.map((_, i) => {
        const [x, y] = point(100, i);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />;
      })}
      <polygon points={pts} fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1" />
      {axes.map((a, i) => {
        const [x, y] = point(118, i);
        return (
          <text key={a} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="font-heading" fontSize="8" fill="currentColor" fillOpacity="0.7" style={{ letterSpacing: "0.1em" }}>
            {labels[a].toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

export default function Library() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useLibraryPage();
  const { data: bottles, isLoading: bottlesLoading, isError: bottlesError } = useBottles();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);
  useDocumentMeta(page?.seo);

  if (pageLoading || bottlesLoading) return <CmsLoading />;
  if (pageError || bottlesError || !page) return <CmsError label="the Library page" />;

  const filters = ["All", ...new Set(bottles.map((b) => b.category).filter(Boolean))];
  const visible = bottles.filter(
    (b) =>
      (filter === "All" || b.category === filter) &&
      (b.name.toLowerCase().includes(query.toLowerCase()) || (b.cask ?? "").toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      {/* Search & filter */}
      <section className="py-20 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-center justify-between mb-12">
            <div className="relative flex-1 max-w-md">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the archive…"
                className="w-full bg-transparent border-b border-gold/30 py-3 pl-1 pr-4 font-body text-sm text-champagne placeholder:text-muted-gold/60 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                    filter === f ? "border-gold text-champagne bg-gold/10" : "border-gold/20 text-muted-gold hover:text-gold"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Vault grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {visible.map((b, i) => (
              <Reveal key={b.id} delay={(i % 4) * 0.08}>
                <button
                  onClick={() => setActive(b)}
                  className="group relative w-full aspect-[3/4] bg-velvet/60 border border-gold/15 overflow-hidden hover:border-gold/40 transition-all duration-500"
                >
                  <img src={strapiMediaUrl(b.image)} alt={b.name} className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                    <span className="font-mono text-[10px] text-muted-gold">{b.year}</span>
                    <h3 className="font-heading uppercase tracking-luxe text-champagne text-sm mt-1 leading-tight">{b.name}</h3>
                    <span className="block h-px w-0 bg-gold mt-3 group-hover:w-10 transition-all duration-500" />
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sommelier's vault */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal className="relative aspect-[4/5] overflow-hidden">
            <img src={strapiMediaUrl(page.vaultImage)} alt={page.vaultImage?.alternativeText || "Rare bottle pour"} className="h-full w-full object-cover" />
            <div className="absolute inset-0 border border-gold/20 m-3 pointer-events-none" />
          </Reveal>
          <Reveal delay={0.12}>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              {page.vaultEyebrow}
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
              {page.vaultTitle}
            </h2>
            <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
              {page.vaultText}
            </p>
            <div className="flex items-center gap-3 text-muted-gold">
              <Radar size={18} className="text-gold" />
              <span className="font-heading text-[10px] uppercase tracking-luxe">{page.vaultBadge}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8" onClick={() => setActive(null)}>
          <div className="absolute inset-0 bg-onyx/85 backdrop-blur-sm" />
          <div
            className="relative bg-velvet border border-gold/30 max-w-3xl w-full grid grid-cols-1 sm:grid-cols-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-square sm:aspect-auto">
              <img src={strapiMediaUrl(active.image)} alt={active.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-8 flex flex-col">
              <button onClick={() => setActive(null)} className="self-end text-muted-gold hover:text-gold transition-colors">
                <X size={20} />
              </button>
              <span className="font-mono text-[11px] text-muted-gold mt-2">Distilled {active.year}</span>
              <h3 className="font-heading uppercase tracking-luxe text-champagne text-2xl mt-2 leading-tight">{active.name}</h3>
              <p className="font-body text-sm text-champagne/60 mt-4">
                <span className="text-muted-gold uppercase tracking-luxe-sm text-[11px] block mb-1">Cask Type</span>
                {active.cask}
              </p>
              <div className="mt-6">
                <span className="text-muted-gold uppercase tracking-luxe-sm text-[11px] block mb-4">Tasting Profile</span>
                <div className="flex justify-center"><RadarChart profile={active.profile} /></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
