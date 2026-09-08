import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { IMAGES } from "@/lib/images";
import { ChevronDown, Clock, MapPin, User } from "lucide-react";

const FAQ = [
  { q: "What is the dress code?", a: "Smart elegant. We ask guests to honour the house. No sportswear or open footwear after 8 PM." },
  { q: "Is there an age restriction?", a: "Yes. The House is strictly 21 and above. Valid identification is required at entry." },
  { q: "What is the cancellation policy?", a: "Reservations may be modified or cancelled up to 24 hours prior. Within 24 hours, a 50% hold applies to the booking." },
  { q: "Is valet available?", a: "Complimentary valet is offered for all reserved guests from 6 PM onward at the main entrance." },
];

const DATES = ["Mon 09", "Tue 10", "Wed 11", "Thu 12", "Fri 13", "Sat 14"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", party: "", experience: "", notes: "",
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const field = "w-full bg-transparent border-b border-gold/25 py-3 font-body text-sm text-champagne placeholder:text-muted-gold/60 focus:outline-none focus:border-gold transition-colors";
  const label = "font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-2 block";

  return (
    <>
      <PageHero
        image={IMAGES.contactHero}
        eyebrow="Contact"
        title="Get In Touch"
        subtitle="Jersey City, New Jersey"
      />

      {/* Split screen */}
      <section className="py-24 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <Reveal>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-8">
              The House
            </span>
            <div className="space-y-7">
              <div className="flex gap-4">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">Address</p>
                  <p className="font-body text-sm text-champagne/80">BLJC, 136 Newark Avenue, Jersey City, NJ 07302</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">Hours</p>
                  <p className="font-body text-sm text-champagne/80">Tuesday to Sunday · 6:00 PM to 1:00 AM</p>
                  <p className="font-body text-sm text-champagne/60">Closed Mondays</p>
                </div>
              </div>
              <div className="flex gap-4">
                <User size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">Dress Code</p>
                  <p className="font-body text-sm text-champagne/80">Smart Elegant · 21+ Only</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 relative aspect-[16/10] bg-velvet border border-gold/15 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gold mx-auto mb-3" />
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold">Jersey City, NJ</p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(197,160,89,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-8">
              Reservation Request
            </span>
            {sent ? (
              <div className="border border-gold/30 p-10 text-center">
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-xl mb-4">Request Received</h3>
                <p className="font-body text-sm text-champagne/60">The house will be in touch within 24 hours to confirm your evening.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>Full Name</label><input required value={form.name} onChange={set("name")} placeholder="Your name" className={field} /></div>
                  <div><label className={label}>Email</label><input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={field} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>Phone Number</label><input value={form.phone} onChange={set("phone")} placeholder="Best number to reach you" className={field} /></div>
                  <div>
                    <label className={label}>Party Size</label>
                    <select value={form.party} onChange={set("party")} className={field + " appearance-none"}>
                      <option value="" className="bg-onyx">Select</option>
                      {["1","2","3","4","5","6","7","8+ guests"].map((n) => <option key={n} value={n} className="bg-onyx">{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date horizontal scroll */}
                <div>
                  <label className={label}>Date</label>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {DATES.map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setForm({ ...form, date: d })}
                        className={`shrink-0 px-5 py-3 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                          form.date === d ? "border-gold text-champagne bg-gold/10" : "border-gold/20 text-muted-gold hover:text-gold"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>Time</label><input type="time" value={form.time} onChange={set("time")} className={field + " [color-scheme:dark]"} /></div>
                  <div>
                    <label className={label}>Experience</label>
                    <select value={form.experience} onChange={set("experience")} className={field + " appearance-none"}>
                      <option value="" className="bg-onyx">Select</option>
                      {["Tasting Room","Guided Journey","Private Event"].map((n) => <option key={n} value={n} className="bg-onyx">{n}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={label}>Special Requests</label>
                  <textarea value={form.notes} onChange={set("notes")} rows={3} placeholder="Anniversary, dietary notes, seating preference…" className={field + " resize-none"} />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
                >
                  Submit Reservation Request
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal className="text-center mb-14">
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">Before You Arrive</h2>
          </Reveal>
          <div className="border border-gold/15">
            {FAQ.map((f, i) => (
              <div key={i} className="border-b border-gold/15 last:border-b-0">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-heading uppercase tracking-luxe text-champagne text-sm sm:text-base">{f.q}</span>
                  <ChevronDown size={18} className={`text-gold transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-6 pb-6 font-body text-sm text-champagne/60 leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}