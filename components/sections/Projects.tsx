"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

/* ─── Project data ───────────────────────────────────────────────────────── */
const projects = [
  {
    number: "01",
    title: "Asset Management System",
    tag: "Full Stack · Production",
    description:
      "A production-ready platform with role-based permissions, automated asset unassignment, and admin override controls. Comprehensive analytics dashboard for asset tracking, maintenance scheduling, and real-time status monitoring.",
    tech: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "Recharts"],
    image: "/images/project-1.png",
    live: "#",
    repo: "#",
  },
];

/* ─── Single project card ────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-0 border-4 border-white/12 group hover:border-accent-orange transition-colors duration-500"
    >
      {/* LEFT — Image panel */}
      <div className="relative overflow-hidden bg-white/5 border-b-4 lg:border-b-0 lg:border-r-4 border-white/12 group-hover:border-accent-orange transition-colors duration-500 h-64 lg:h-auto min-h-75">
        <motion.img
          src={project.image}
          alt={project.title}
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-60 group-hover:opacity-85 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

        {/* Ghost number */}
        <span className="absolute bottom-4 left-5 font-helvetica font-black text-[5.5rem] leading-none text-white/6 select-none pointer-events-none">
          {project.number}
        </span>

        {/* Tag */}
        <span className="absolute top-4 left-4 font-helvetica font-black text-[9px] uppercase tracking-widest px-3 py-1.5 bg-accent-orange text-white">
          {project.tag}
        </span>
      </div>

      {/* RIGHT — Content panel */}
      <div className="flex flex-col justify-between p-8 md:p-10">
        <div>
          <h3 className="font-helvetica font-black text-3xl md:text-4xl uppercase tracking-tight text-white leading-tight mb-4">
            {project.title}
          </h3>

          <div className="w-10 h-1.5 bg-accent-orange mb-6" />

          <p className="font-helvetica font-bold text-sm leading-relaxed text-white/50 mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-helvetica font-black text-[9px] uppercase tracking-wider px-3 py-1.5 border-2 border-white/12 text-white/35 hover:border-accent-orange hover:text-accent-orange transition-all duration-200"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={project.live}
            className="group/btn inline-flex items-center gap-2 px-6 py-3.5 bg-white text-foreground border-4 border-white font-helvetica font-black text-[10px] uppercase tracking-widest shadow-[5px_5px_0_0] shadow-accent-orange/50 hover:translate-x-1.25 hover:translate-y-1.25 hover:shadow-none transition-all duration-200"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
          </a>

          <a
            href={project.repo}
            className="w-12.5 h-12.5 flex items-center justify-center border-4 border-white/15 text-white/40 hover:border-white hover:text-white transition-all duration-200"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /*
   * Track from when the wrapper's TOP hits the BOTTOM of the viewport
   * → until the wrapper's TOP hits the TOP of the viewport.
   * This gives us the full "rising" scroll range.
   */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });

  const panelY      = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const panelScale  = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const panelRadius = useTransform(scrollYProgress, [0, 0.7], [36, 0]);
  const panelWidth  = useTransform(scrollYProgress, [0, 1], ["86%", "100%"]);

  return (
    <div ref={wrapperRef} className="relative" style={{ marginTop: "-2px" }}>
      <motion.section
        id="projects"
        style={{
          y: panelY,
          scale: panelScale,
          borderRadius: panelRadius,
          width: panelWidth,
          transformOrigin: "bottom center",
        }}
        className="relative bg-[#111111] px-6 md:px-12 py-24 md:py-32 overflow-hidden will-change-transform mx-auto"
      >
        {/* Grain texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Fine white grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(0deg,  rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-helvetica font-bold text-xs uppercase tracking-[0.4em] text-white/30 mb-3"
          >
            Selected work
          </motion.p>

          <div className="flex items-end gap-6 flex-wrap mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-helvetica font-black text-6xl md:text-7xl uppercase tracking-tight leading-none text-white"
            >
              Projects
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="flex-1 min-w-15 h-1.5 bg-accent-orange mb-2"
            />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.number} project={project} />
            ))}
          </div>

          {/* Bottom link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-14 flex items-center gap-5"
          >
            <div className="flex-1 h-px bg-white/8" />
            <a
              href="#"
              className="group inline-flex items-center gap-2 font-helvetica font-black text-[10px] uppercase tracking-widest text-white/30 hover:text-accent-orange transition-colors duration-200"
            >
              More on GitHub
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <div className="flex-1 h-px bg-white/8" />
          </motion.div>

        </div>
      </motion.section>
    </div>
  );
}