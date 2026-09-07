import React from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <span className="h-px w-10 bg-gold/40" />
      <span className="font-heading text-[11px] uppercase tracking-luxe text-muted-gold">
        {children}
      </span>
      <span className="h-px w-10 bg-gold/40" />
    </div>
  );
}

export function SectionHeading({ eyebrow, title, className, light }) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      {eyebrow && <Eyebrow className="mb-6">{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "font-heading uppercase tracking-luxe leading-tight",
          light ? "text-champagne" : "text-champagne"
        )}
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionHeading;