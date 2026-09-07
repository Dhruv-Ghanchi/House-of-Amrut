import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";
import { Radar, X } from "lucide-react";

const FILTERS = ["All", "Limited Edition", "Single Cask", "Distiller's Reserve", "Discontinued"];

const BOTTLES = [
  { name: "Amrut Fusion", year: "2009", cask: "Ex-Bourbon + Peated", cat: "Distiller's Reserve", profile: { Sweetness: 70, Smoke: 55, Spice: 60, Fruit: 65, Oak: 75 } },
  { name: "Greedy Angels 8yo", year: "2014", cask: "Ex-Bourbon", cat: "Limited Edition", profile: { Sweetness: 80, Smoke: 20, Spice: 50, Fruit: 85, Oak: 70 } },
  { name: "Single Cask #1127", year: "2012", cask: "Oloroso Sherry", cat: "Single Cask", profile: { Sweetness: 60, Smoke: 30, Spice: 75, Fruit: 80, Oak: 90 } },
  { name: "Amrut Portonova", year: "2010", cask: "Ex-Port Pipe", cat: "Distiller's Reserve", profile: { Sweetness: 85, Smoke: 15, Spice: 55, Fruit: 90, Oak: 65 } },
  { name: "Madeira Cask", year: "2013", cask: "Ex-Madeira", cat: "Limited Edition", profile: { Sweetness: 75, Smoke: 25, Spice: 60, Fruit: 88, Oak: 72 } },
  { name: "Amrut 100 Proof", year: "2011", cask: "Ex-Bourbon", cat: "Discontinued", profile: { Sweetness: 65, Smoke: 45, Spice: 80, Fruit: 55, Oak: 78 } },
  { name: "Cask #2204", year: "2015", cask: "Ex-Sherry Butt", cat: "Single Cask", profile: { Sweetness: 55, Smoke: 40, Spice: 70, Fruit: 78, Oak: 92 } },
  { name: "Founders Reserve", year: "2008", cask: "Ex-Bourbon", cat: "Distiller's Reserve", profile: { Sweetness: 72, Smoke: 50, Spice: 58, Fruit: 68, Oak: 80 } },
];

function RadarChart({ profile }) {
  const axes = ["Sweetness", "Smoke", "Spice", "Fruit", "Oak"];
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 64;
  const angle = (i) => (Math.PI * 2 * i) / axes.length - Math.PI / 2;
  const point = (val, i) => {
    const rr = (r * val) / 100;
    return [cx + rr * Math.cos(angle(i)), cy + rr * Math.sin(angle(i))];
  };
  const pts = axes.map((a, i) => point(profile[a], i).join(",")).join(" ");

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
            {a.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

export default function Library() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(null);

  const visible = BOTTLES.filter(
    (b) =>
      (filter === "All" || b.cat === filter) &&
      (b.name.toLowerCase().includes(query.toLowerCase()) || b.cask.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <PageHero
        image={IMAGES.libraryHero}
        eyebrow="The Library"
        title="The Spirits Library"
        subtitle="A vault of rare and exceptional Indian single malt."
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
              {FILTERS.map((f) => (
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
              <Reveal key={b.name} delay={(i % 4) * 0.08}>
                <button
                  onClick={() => setActive(b)}
                  className="group relative w-full aspect-[3/4] bg-velvet/60 border border-gold/15 overflow-hidden hover:border-gold/40 transition-all duration-500"
                >
                  <img src={IMAGES.bottlePlinth} alt={b.name} className="h-full w-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
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
            <img src={IMAGES.bottlePlinth} alt="Rare bottle pour" className="h-full w-full object-cover" />
            <div className="absolute inset-0 border border-gold/20 m-3 pointer-events-none" />
          </Reveal>
          <Reveal delay={0.12}>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Sommelier's Vault
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl mb-6 leading-tight">
              Pour By The Dram
            </h2>
            <p className="font-body text-base text-champagne/65 leading-relaxed mb-8 max-w-md">
              Certain bottles never leave the shelf — they are too rare, too singular, too storied.
              At House of Amrut, these allocations are opened exclusively for pour-by-the-dram,
              measured by the sommelier for those who ask.
            </p>
            <div className="flex items-center gap-3 text-muted-gold">
              <Radar size={18} className="text-gold" />
              <span className="font-heading text-[10px] uppercase tracking-luxe">By Appointment Only</span>
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
              <img src={IMAGES.bottlePlinth} alt={active.name} className="h-full w-full object-cover" />
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