import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "The House", to: "/the-house" },
  { label: "Experiences", to: "/experiences" },
  { label: "Tasting Room", to: "/tasting-room" },
  { label: "Library", to: "/library" },
  { label: "Journeys", to: "/journeys" },
  { label: "Contact", to: "/contact" },
];



export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "bg-onyx/90 backdrop-blur-md border-b border-gold/15" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-luxe px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src="/images/logo.png" 
              alt="House of Amrut" 
              className="h-14 sm:h-16 w-auto object-contain" 
            />
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "group relative font-heading text-[10px] uppercase tracking-luxe transition-colors duration-300",
                    isActive ? "text-champagne" : "text-muted-gold hover:text-gold"
                  )
                }
              >
                {({ isActive }) => (
                  <span className="relative">
                    {n.label}
                    <span
                      className={cn(
                        "absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500",
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <Link
              to="/contact"
              className="font-heading text-[10px] uppercase tracking-luxe text-gold border border-gold-strong px-5 py-2.5 hover:bg-gold hover:text-onyx transition-all duration-500"
            >
              Reserve Your Experience
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-gold"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-onyx/98 backdrop-blur-md border-t border-gold/15">
          <nav className="flex flex-col px-6 py-6 gap-5">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "font-heading text-xs uppercase tracking-luxe",
                    isActive ? "text-champagne" : "text-muted-gold"
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-block font-heading text-[10px] uppercase tracking-luxe text-gold border border-gold-strong px-5 py-3 text-center"
            >
              Reserve Your Experience
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}