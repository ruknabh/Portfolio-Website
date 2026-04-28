"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const labelX = useTransform(scrollYProgress, [0, 0.55], [-30, 0]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.6], [40, 0]);
  const lineScale = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.65], [60, 0]);
  const bodyY = useTransform(scrollYProgress, [0.2, 0.75], [40, 0]);

  const meta = [
    { label: "Based in",   value: "Assam, India" },
    { label: "Experience", value: "2+ Years" },
    { label: "Stack",      value: "Full Stack" },
    { label: "Status",     value: "Freelance · Open" },
  ];

  const personal = [
    { label: "Education",  value: "Tezpur University" },
    { label: "Semester",   value: "6th Sem, CSE" },
    { label: "CGPA",       value: "7.28" },
    { label: "Interests",  value: "Sports & Music" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 md:py-32 overflow-hidden bg-background"
    >
      <motion.div
        style={{ y: sectionY, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-6"
      >
        {/* ── Section header ── */}
        <motion.p
          style={{ x: labelX }}
          className="font-helvetica font-bold text-xs uppercase tracking-[0.4em] text-foreground/40 mb-3"
        >
          Who I am
        </motion.p>

        <div className="flex items-end gap-4 sm:gap-6 flex-wrap mb-12 md:mb-20">
          <motion.h2
            style={{ y: headingY }}
            className="font-garamond text-5xl sm:text-6xl md:text-7xl tracking-tight leading-none"
          >
            About Me
          </motion.h2>

          <motion.div
            style={{ scaleX: lineScale, originX: 0 }}
            className="flex-1 min-w-12 h-1.5 bg-accent-orange mb-2"
          />
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[45%_1fr] gap-10 lg:gap-14 items-start">

          {/* LEFT — Profile card */}
          <motion.div style={{ y: cardY }}>
            <div className="relative border-4 border-foreground bg-background shadow-[8px_8px_0_0_rgba(26,26,26,1)]">
              <div className="h-1.5 w-full bg-accent-orange" />

              <div className="flex flex-col items-center gap-5 px-6 sm:px-10 py-7 sm:py-8">

                {/* Avatar */}
                <div
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shrink-0"
                  style={{ boxShadow: "5px 5px 0px 0px rgba(26,26,26,1)" }}
                >
                  <img
                    src="/images/profile.png"
                    alt="Ruknabh Bhattacharyya"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name + title */}
                <div className="text-center">
                  <h3 className="font-helvetica font-black text-xl sm:text-2xl uppercase tracking-tight text-foreground leading-tight">
                    Ruknabh Bhattacharyya
                  </h3>
                  <p className="font-helvetica font-bold text-[10px] uppercase tracking-[0.3em] text-accent-orange mt-2">
                    Full Stack Developer
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-foreground/12" />

                {/* Professional meta */}
                <dl className="w-full space-y-3">
                  {meta.map(({ label, value }) => (
                    <div key={label} className="flex items-baseline justify-between gap-4">
                      <dt className="font-helvetica font-bold text-[9px] uppercase tracking-[0.3em] text-foreground/35 shrink-0">
                        {label}
                      </dt>
                      <dd className="font-helvetica font-black text-[11px] uppercase tracking-wider text-foreground text-right">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Divider */}
                <div className="w-full h-px bg-foreground/12" />

                {/* Location */}
                <div className="flex items-center gap-2 font-helvetica font-black text-[9px] uppercase tracking-widest text-foreground/40">
                  <MapPin className="w-3 h-3 text-accent-orange shrink-0" />
                  Assam, India
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Copy + personal details */}
          <motion.div
            style={{ y: bodyY }}
            className="flex flex-col justify-start gap-7 sm:gap-8 lg:pt-2"
          >
            {/* Pull-quote */}
            <p className="font-garamond text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] leading-tight text-foreground tracking-tight">
              I build things for the web — fast, clean, and with an eye for design.
            </p>

            {/* Accent divider */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-0.75 bg-accent-orange" />
              <div className="flex-1 h-px bg-foreground/10" />
            </div>

            {/* Body */}
            <p className="font-helvetica font-bold text-sm md:text-base leading-relaxed text-foreground/60 max-w-xl">
              Over the past two years I've worked across the full stack — shipping production
              systems, collaborating with clients, and constantly refining how code and design
              work together.
            </p>

            {/* Personal details */}
            <dl className="space-y-3.5">
              {personal.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-6">
                  <dt className="font-helvetica font-bold text-[9px] uppercase tracking-[0.3em] text-foreground/35 w-24 shrink-0">
                    {label}
                  </dt>
                  <dd className="font-helvetica font-black text-[11px] uppercase tracking-wider text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-foreground/15" />
        <div className="w-2.5 h-2.5 rotate-45 bg-accent-orange border-2 border-foreground" />
      </motion.div>
    </section>
  );
}