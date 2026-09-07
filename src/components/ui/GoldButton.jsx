import React from "react";
import { cn } from "@/lib/utils";

export function GoldButton({ children, className, as = "button", href, ...props }) {
  const Comp = as === "a" ? "a" : "button";
  const base =
    "group relative inline-flex items-center justify-center px-7 py-3 font-heading text-[11px] uppercase tracking-luxe text-gold border border-gold-strong transition-all duration-500 hover:bg-gold hover:text-onyx hover:glow-amber";
  if (as === "a" || href) {
    return (
      <a href={href} className={cn(base, className)} {...props}>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }
  return (
    <button className={cn(base, className)} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default GoldButton;