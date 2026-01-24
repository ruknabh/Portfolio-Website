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
        {/* Centered Navigation */}
        <ul className="flex gap-8 md:gap-12 font-helvetica text-xs md:text-sm uppercase tracking-widest font-bold">
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
                  className="relative group hover:text-accent-orange transition-colors duration-300"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-accent-orange group-hover:w-full transition-all duration-300" />
                </a>
              </motion.li>
            )
          )}

        </ul>
      </div>
    </motion.nav>
  );
}