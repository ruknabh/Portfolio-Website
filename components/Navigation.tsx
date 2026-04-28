"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = ["about", "projects", "skills", "experience", "contact"];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (item: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.getElementById(item)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 sm:py-8 flex justify-center items-center">

          {/* Desktop nav */}
          <ul className="hidden sm:flex gap-6 md:gap-12">
            {navItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                <a
                  href={`#${item}`}
                  className="relative group transition-colors duration-300 font-garamond text-base md:text-md tracking-wide capitalize"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D94E28")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Mobile: hamburger button — right-aligned */}
          <div className="sm:hidden w-full flex justify-end">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setMobileOpen((v) => !v)}
              className="w-10 h-10 flex items-center justify-center border-2 border-white/20 text-white/70"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "rgba(7,7,15,0.97)", backdropFilter: "blur(12px)" }}
          >
            {/* Close button top-right */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-5 w-10 h-10 flex items-center justify-center border-2 border-white/20 text-white/70"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Orange rule top */}
            <div className="w-8 h-0.5 bg-accent-orange mb-2" />

            {navItems.map((item, i) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, duration: 0.35 }}
                onClick={() => handleNav(item)}
                className="font-garamond text-4xl capitalize tracking-wide text-white/70 hover:text-white transition-colors duration-200"
              >
                {item}
              </motion.button>
            ))}

            {/* Bottom accent */}
            <div className="w-8 h-0.5 bg-accent-orange mt-2" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}