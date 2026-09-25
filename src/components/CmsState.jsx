import React from "react";

export function CmsLoading() {
  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
    </div>
  );
}

export function CmsError({ label = "content" }) {
  return (
    <div className="min-h-screen bg-onyx flex items-center justify-center px-6">
      <p className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold text-center">
        Unable to load {label}. Is the Strapi server running?
      </p>
    </div>
  );
}
