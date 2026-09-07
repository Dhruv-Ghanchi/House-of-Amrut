import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";
import { Download } from "lucide-react";

const TABS = ["Signature Cocktails", "Pure Single Malts", "Vintage Flight Collections", "Small Bites"];

const MENU = {
  "Signature Cocktails": [
    { name: "Amrut Old Fashioned", notes: "Peat · Bitters · Orange Peel", abv: "32%", price: "₹1,200" },
    { name: "The Cask & Smoke", notes: "Smoke · Charred Oak · Honey", abv: "28%", price: "₹1,400" },
    { name: "Velvet Saffron", notes: "Saffron · Cardamom · Cream", abv: "24%", price: "₹1,100" },
    { name: "Chennai Sour", notes: "Citrus · Tamarind · Egg White", abv: "22%", price: "₹950" },
  ],
  "Pure Single Malts": [
    { name: "Amrut Single Malt", notes: "Honey · Vanilla · Oak", abv: "46%", price: "₹900 / dram" },
    { name: "Amrut Cask Strength", notes: "Spice · Dark Fruit · Leather", abv: "62.8%", price: "₹1,600 / dram" },
    { name: "Amrut Peated", notes: "Peat · Malt · Sea Salt", abv: "46%", price: "₹1,100 / dram" },
    { name: "Amrut Naarangi", notes: "Orange · Oak · Spice", abv: "40%", price: "₹1,250 / dram" },
  ],
  "Vintage Flight Collections": [
    { name: "Founders Reserve Flight", notes: "3 × 15ml · House Lineage", abv: "—", price: "₹3,800" },
    { name: "Ex-Bourbon Cask Flight", notes: "3 × 15ml · Vanilla Forward", abv: "—", price: "₹4,200" },
    { name: "Sherry Cask Flight", notes: "3 × 15ml · Dark Fruit", abv: "—", price: "₹4,800" },
    { name: "Cask Strength Flight", notes: "3 × 15ml · Untamed", abv: "—", price: "₹5,400" },
  ],
  "Small Bites": [
    { name: "Truffle Bhelpuri", notes: "Black Truffle · Puffed Rice", abv: "—", price: "₹650" },
    { name: "Malai Tikka Skewers", notes: "Charcoal · Cream · Saffron", abv: "—", price: "₹780" },
    { name: "Goan Sausage Toast", notes: "Smoked · Vinegar · Chili", abv: "—", price: "₹720" },
    { name: "Dark Chocolate & Cask", notes: "70% Cacao · Oak-aged Cream", abv: "—", price: "₹590" },
  ],
};

const PAIRINGS = [
  { region: "North", whisky: "Amrut Naarangi", img: IMAGES.dishNorth },
  { region: "East", whisky: "Amrut Peated", img: IMAGES.dishEast },
  { region: "West", whisky: "Amrut Single Malt", img: IMAGES.dishWest },
  { region: "South", whisky: "Amrut Cask Strength", img: IMAGES.dishSouth },
];

export default function TastingRoom() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <>
      <PageHero
        image={IMAGES.tastingRoomHero}
        eyebrow="The Tasting Room"
        title="The Tasting Room"
        subtitle="A menu composed in shadow and gold."
      />

      {/* Filter tabs */}
      <section className="py-20 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="flex flex-wrap justify-center gap-3 mb-14">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                  tab === t
                    ? "border-gold text-champagne bg-gold/10"
                    : "border-gold/20 text-muted-gold hover:text-gold"
                }`}
              >
                {t}
              </button>
            ))}
          </Reveal>

          {/* Menu grid */}
          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/15 border border-gold/15">
            {MENU[tab].map((item, i) => (
              <div key={item.name} className="bg-onyx px-8 py-8 group hover:bg-velvet/40 transition-colors duration-500">
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
              Download Full Menu
            </button>
          </Reveal>
        </div>
      </section>

      {/* Culinary pairing list */}
      <section className="py-28 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10">
          <Reveal className="text-center mb-16">
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-6">
              Culinary Pairings
            </span>
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">
              A Map of India, Paired
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gold/15 border border-gold/15">
            {PAIRINGS.map((p, i) => (
              <Reveal key={p.region} delay={i * 0.1} className="bg-onyx group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.img} alt={p.region} className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-onyx/40" />
                  <span className="absolute top-4 left-4 font-heading text-[10px] uppercase tracking-luxe text-champagne">
                    {p.region}
                  </span>
                </div>
                <div className="px-5 py-5 border-t border-gold/15">
                  <p className="font-body text-xs text-muted-gold uppercase tracking-luxe-sm">Paired With</p>
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