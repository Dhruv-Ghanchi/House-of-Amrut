import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { strapiMediaUrl } from "@/lib/strapi";

export default function Hero({ page }) {
  const reduceMotion = useReducedMotion();
  const posterUrl = strapiMediaUrl(page.heroPoster);
  const videoUrl = strapiMediaUrl(page.heroVideo);

  return (
    <section className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {reduceMotion ? (
          <img
            src={posterUrl}
            alt={page.heroPoster?.alternativeText || "Dimly lit luxury Amrut whisky bar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <video
            className="h-full w-full object-cover"
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-onyx/60 via-transparent to-onyx/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx/45 via-transparent to-onyx/25" />
        {/* Cinematic vignette — a light feather into the onyx frame */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(135% 120% at 50% 48%, transparent 52%, rgba(8,8,8,0.32) 82%, rgba(8,8,8,0.6) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 110px 8px rgba(8,8,8,0.42)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-8"
        >
          {page.heroEyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24, letterSpacing: "0.3em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.2em" }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading uppercase tracking-luxe text-champagne text-shadow-amber text-5xl sm:text-7xl lg:text-8xl leading-none"
        >
          {page.heroTitle}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="h-px w-24 bg-gold/50 my-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="font-display italic text-xl sm:text-2xl text-champagne/90 tracking-wide"
        >
          {page.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12"
        >
          <Link
            to="/the-house"
            className="group relative inline-flex items-center justify-center px-9 py-4 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber"
          >
            <span className="relative z-10">{page.heroCtaLabel}</span>
          </Link>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-heading text-[9px] uppercase tracking-luxe text-muted-gold/70">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-gold/50 to-transparent" />
      </motion.div>
    </section>
  );
}
