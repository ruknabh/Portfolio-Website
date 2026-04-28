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
    tryIt: null,
    repo: "https://github.com/ruknabh/IOCL-Winter-Internship",
    showTryIt: false,
  },
  {
    number: "02",
    title: "Debate Arena",
    tag: "Real-time · Multiplayer",
    description:
      "A live two-player debate platform where opponents argue any topic across three timed rounds. Each round is judged in real time by an AI, which scores arguments and delivers a final verdict — no human moderator needed.",
    tech: ["React", "Node.js", "Express", "Socket.IO", "Zustand", "Tailwind CSS", "OpenRouter API"],
    image: "/images/project-2.png",
    tryIt: "https://debate-arena-ruknabh.vercel.app/",
    repo: "https://github.com/ruknabh/Debate-Arena",
    showTryIt: true,
  },
  {
    number: "03",
    title: "This Portfolio",
    tag: "Design · Frontend",
    description:
      "A hand-crafted portfolio built around a brutalist editorial aesthetic — animated letter-by-letter hero type, a scroll-driven 3D lava planet rendered in WebGL, scroll-linked marquee skill rows, a parallax project panel, and a contact form — all wired together with scroll-reactive Framer Motion throughout.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "React Three Fiber"],
    image: "/images/project-3.png",
    tryIt: "#",
    repo: "#",
    showTryIt: true,
  },
];

/* ─── Project card ───────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[300px_1fr] border-4 border-white/10"
      style={{ background: "#0e0e0e" }}
    >
      {/* LEFT — compact 16:9 thumbnail, fixed width on desktop */}
      <div className="relative border-b-4 lg:border-b-0 lg:border-r-4 border-white/10 overflow-hidden"
        style={{
          /* 16:9 on mobile (full width), fixed height on desktop to match column */
          aspectRatio: "16 / 9",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          /*
            width/height hints let the browser allocate space before the image
            loads, eliminating layout shift. Actual display size is ~300×169px
            on desktop — much lighter than a full half-panel.
          */
          width={600}
          height={338}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle darkening at the bottom only */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Tag — always visible */}
        <span className="absolute top-3 left-3 font-helvetica font-black text-[8px] uppercase tracking-widest px-2.5 py-1 bg-accent-orange text-white leading-none">
          {project.tag}
        </span>

        {/* Ghost number bottom-right */}
        <span className="absolute bottom-2 right-3 font-helvetica font-black text-4xl leading-none text-white/8 select-none pointer-events-none">
          {project.number}
        </span>
      </div>

      {/* RIGHT — description takes all remaining space */}
      <div className="flex flex-col justify-between p-7 md:p-8 gap-6">

        {/* Top block */}
        <div className="flex flex-col gap-4">

          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-helvetica font-black text-xl md:text-2xl uppercase tracking-tight text-white leading-tight">
              {project.title}
            </h3>
            {/* Inline number label — light, small */}
            <span className="font-helvetica font-black text-[10px] uppercase tracking-widest text-white/15 shrink-0 mt-1">
              {project.number}
            </span>
          </div>

          {/* Orange rule */}
          <div className="w-8 h-[2px] bg-accent-orange" />

          {/* Description — prominent, easy to read */}
          <p className="font-helvetica font-bold text-sm md:text-[0.92rem] leading-[1.85] text-white/72">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="font-helvetica font-bold text-[8px] uppercase tracking-wider px-2 py-0.5 border border-white/10 text-white/35"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3 pt-1">
          {project.showTryIt && (
            <a
              href={project.tryIt ?? "#"}
              target={project.tryIt && project.tryIt !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2
                px-5 py-2.5
                bg-white text-[#0e0e0e]
                border-4 border-white
                font-helvetica font-black text-[9px] uppercase tracking-widest
                shadow-[4px_4px_0_0_rgba(217,78,40,0.65)]
                hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]
                transition-[box-shadow,transform] duration-150
              "
            >
              Try It
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          )}

          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="w-[40px] h-[40px] flex items-center justify-center border-2 border-white/15 text-white/35 hover:border-white/45 hover:text-white/65 transition-colors duration-150"
          >
            <Github className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────────────────────────── */
export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Preserved scroll-rise animation — single listener, no per-card overhead */
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });

  const panelY      = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const panelScale  = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const panelRadius = useTransform(scrollYProgress, [0, 0.7], [32, 0]);
  const panelWidth  = useTransform(scrollYProgress, [0, 1], ["88%", "100%"]);

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
          willChange: "transform",
        }}
        className="relative bg-[#111111] px-6 md:px-12 py-24 md:py-32 overflow-hidden mx-auto"
      >
        <div className="relative max-w-6xl mx-auto">

          {/* Header */}
          <p className="font-helvetica font-bold text-xs uppercase tracking-[0.4em] text-white/35 mb-3">
            Selected work
          </p>

          <div className="flex items-end gap-6 flex-wrap mb-14 md:mb-18">
            <h2 className="font-garamond text-6xl md:text-7xl tracking-tight leading-none text-white">
              Projects
            </h2>
            <div className="flex-1 min-w-[3rem] h-1.5 bg-accent-orange mb-2" />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.number} project={project} index={i} />
            ))}
          </div>

          {/* Footer */}
          <div className="mt-12 flex items-center gap-5">
            <div className="flex-1 h-px bg-white/8" />
            <a
              href="https://github.com/ruknabh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-helvetica font-black text-[10px] uppercase tracking-widest text-white/28 hover:text-accent-orange transition-colors duration-200"
            >
              More on GitHub
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <div className="flex-1 h-px bg-white/8" />
          </div>

        </div>
      </motion.section>
    </div>
  );
}