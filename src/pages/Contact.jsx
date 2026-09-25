import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { strapiMediaUrl } from "@/lib/strapi";
import { useContactPage, useGlobal } from "@/hooks/useCms";
import { CmsLoading, CmsError } from "@/components/CmsState";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { ChevronDown, Clock, MapPin, User } from "lucide-react";

export default function Contact() {
  const { data: page, isLoading: pageLoading, isError: pageError } = useContactPage();
  const { data: global, isLoading: globalLoading, isError: globalError } = useGlobal();
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: "", party: "", experience: "", notes: "",
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  useDocumentMeta(page?.seo);

  if (pageLoading || globalLoading) return <CmsLoading />;
  if (pageError || globalError || !page || !global) return <CmsError label="the Contact page" />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };

  const field = "w-full bg-transparent border-b border-gold/25 py-3 font-body text-sm text-champagne placeholder:text-muted-gold/60 focus:outline-none focus:border-gold transition-colors";
  const label = "font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-2 block";
  const partySizeOptions = page.partySizeOptions ?? [];
  const dateOptions = page.dateOptions ?? [];
  const experienceOptions = page.experienceOptions ?? [];

  return (
    <>
      <PageHero
        image={strapiMediaUrl(page.heroImage)}
        eyebrow={page.heroEyebrow}
        title={page.heroTitle}
        subtitle={page.heroSubtitle}
      />

      {/* Split screen */}
      <section className="py-24 bg-onyx border-t border-gold/10">
        <div className="mx-auto max-w-luxe px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <Reveal>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-8">
              {page.infoLabel}
            </span>
            <div className="space-y-7">
              <div className="flex gap-4">
                <MapPin size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">{page.addressLabel}</p>
                  <p className="font-body text-sm text-champagne/80">{global.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">{page.hoursLabel}</p>
                  <p className="font-body text-sm text-champagne/80">{global.hours}</p>
                  <p className="font-body text-sm text-champagne/60">{global.closedNote}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <User size={18} className="text-gold mt-1 shrink-0" />
                <div>
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold mb-1">{page.dressCodeLabel}</p>
                  <p className="font-body text-sm text-champagne/80">{global.dressCode}</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="mt-10 relative aspect-[16/10] bg-velvet border border-gold/15 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={28} className="text-gold mx-auto mb-3" />
                  <p className="font-heading text-[10px] uppercase tracking-luxe text-muted-gold">{page.mapPlaceholderLabel}</p>
                </div>
              </div>
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(rgba(197,160,89,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(197,160,89,0.3) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold block mb-8">
              {page.formTitle}
            </span>
            {sent ? (
              <div className="border border-gold/30 p-10 text-center">
                <h3 className="font-heading uppercase tracking-luxe text-champagne text-xl mb-4">{page.successTitle}</h3>
                <p className="font-body text-sm text-champagne/60">{page.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>{page.nameLabel}</label><input required value={form.name} onChange={set("name")} placeholder={page.namePlaceholder} className={field} /></div>
                  <div><label className={label}>{page.emailLabel}</label><input required type="email" value={form.email} onChange={set("email")} placeholder={page.emailPlaceholder} className={field} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>{page.phoneLabel}</label><input value={form.phone} onChange={set("phone")} placeholder={page.phonePlaceholder} className={field} /></div>
                  <div>
                    <label className={label}>{page.partySizeLabel}</label>
                    <select value={form.party} onChange={set("party")} className={field + " appearance-none"}>
                      <option value="" className="bg-onyx">{page.selectPlaceholder}</option>
                      {partySizeOptions.map((o) => <option key={o.id} value={o.label} className="bg-onyx">{o.label}</option>)}
                    </select>
                  </div>
                </div>

                {/* Date horizontal scroll */}
                <div>
                  <label className={label}>{page.dateLabel}</label>
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                    {dateOptions.map((d) => (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => setForm({ ...form, date: d.label })}
                        className={`shrink-0 px-5 py-3 font-heading text-[10px] uppercase tracking-luxe border transition-all duration-300 ${
                          form.date === d.label ? "border-gold text-champagne bg-gold/10" : "border-gold/20 text-muted-gold hover:text-gold"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className={label}>{page.timeLabel}</label><input type="time" value={form.time} onChange={set("time")} className={field + " [color-scheme:dark]"} /></div>
                  <div>
                    <label className={label}>{page.experienceLabel}</label>
                    <select value={form.experience} onChange={set("experience")} className={field + " appearance-none"}>
                      <option value="" className="bg-onyx">{page.selectPlaceholder}</option>
                      {experienceOptions.map((o) => <option key={o.id} value={o.label} className="bg-onyx">{o.label}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={label}>{page.notesLabel}</label>
                  <textarea value={form.notes} onChange={set("notes")} rows={3} placeholder={page.notesPlaceholder} className={field + " resize-none"} />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
                >
                  {page.submitLabel}
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
            <h2 className="font-heading uppercase tracking-luxe text-champagne text-3xl sm:text-4xl">{page.faqTitle}</h2>
          </Reveal>
          <div className="border border-gold/15">
            {(page.faq ?? []).map((f, i) => (
              <div key={f.id} className="border-b border-gold/15 last:border-b-0">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between px-6 py-5 text-left">
                  <span className="font-heading uppercase tracking-luxe text-champagne text-sm sm:text-base">{f.question}</span>
                  <ChevronDown size={18} className={`text-gold transition-transform duration-500 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-6 pb-6 font-body text-sm text-champagne/60 leading-relaxed">{f.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
