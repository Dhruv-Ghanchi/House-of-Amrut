import React from "react";
import { motion } from "framer-motion";

export default function PageHero({ image, eyebrow, title, subtitle }) {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={image} alt={title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-onyx/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/30 to-onyx/50" />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6 pt-20">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold mb-6"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading uppercase tracking-luxe text-champagne text-shadow-amber text-4xl sm:text-6xl lg:text-7xl leading-none"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-display italic text-xl sm:text-2xl text-champagne/80 mt-6 max-w-xl"
          >
            {subtitle}
          </motion.p>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-px w-24 bg-gold/50 mt-8 origin-center"
        />
      </div>
    </section>
  );
}