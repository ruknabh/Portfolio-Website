"use client";

import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-8 py-8 flex justify-center items-center">
        <ul className="flex gap-8 md:gap-12">
          {["about", "projects", "skills", "experience", "contact"].map(
            (item, i) => (
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
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-orange group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            )
          )}
        </ul>
      </div>
    </motion.nav>
  );
}