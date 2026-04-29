"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const frontend = [
  { name: "React", icon: "/icons/react.svg" },
  { name: "Next.js", icon: "/icons/nextdotjs.svg" },
  { name: "TypeScript", icon: "/icons/typescript.svg" },
  { name: "Tailwind CSS", icon: "/icons/tailwindcss.svg" },
  { name: "Framer Motion", icon: "/icons/framer.svg" },
  { name: "Three.js", icon: "/icons/threedotjs.svg" },
  { name: "JavaScript", icon: "/icons/javascript.svg" },
  { name: "HTML5", icon: "/icons/html5.svg" },
];

const backend = [
  { name: "Node.js", icon: "/icons/nodedotjs.svg" },
  { name: "Express", icon: "/icons/express.svg" },
  { name: "MongoDB", icon: "/icons/mongodb.svg" },
  { name: "MySQL", icon: "/icons/mysql.svg" },
  { name: "Redis", icon: "/icons/redis.svg" },
  { name: "Socket.IO", icon: "/icons/socketdotio.svg" },
];

const tooling = [
  { name: "Git", icon: "/icons/git.svg" },
  { name: "Docker", icon: "/icons/docker.svg" },
  { name: "Figma", icon: "/icons/figma.svg" },
  { name: "Vercel", icon: "/icons/vercel.svg" },
  { name: "Render", icon: "/icons/render.svg" },
  { name: "Linux", icon: "/icons/linux.svg" },
  { name: "GitHub", icon: "/icons/github.svg" },
];

type Tech = { name: string; icon: string };

/* ─── Single chip ────────────────────────────────────────────────────────── */
function TechChip({ tech, small = false }: { tech: Tech; small?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-2.5 sm:gap-3.5 shrink-0 group cursor-default select-none ${small ? "mx-4 sm:mx-8" : "mx-5 sm:mx-8"}`}>
      <div
        className={`
          ${small ? "w-16 h-16 sm:w-24 sm:h-24 p-3 sm:p-4" : "w-20 h-20 sm:w-24 sm:h-24 p-3.5 sm:p-4"}
          rounded-full
          border-4 border-foreground
          bg-background
          shadow-[4px_4px_0_0] shadow-foreground
          flex items-center justify-center
          transition-all duration-300
          group-hover:shadow-accent-orange
          group-hover:-translate-y-2
        `}
      >
        <Image
  src={tech.icon}
  alt={tech.name}
  width={52}
  height={52}
  sizes="(max-width: 640px) 64px, 96px"
  className="w-full h-full object-contain"
  draggable={false}
/>
      </div>
      <span className="font-helvetica text-[8px] sm:text-[10px] uppercase tracking-widest font-bold text-foreground/40 group-hover:text-foreground transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
}

/* ─── Scroll-driven marquee row ──────────────────────────────────────────── */
function MarqueeRow({
  techs,
  direction,
  scrollYProgress,
}: {
  techs: Tech[];
  direction: "left" | "right";
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "right" ? ["-33.333%", "0%"] : ["0%", "-33.333%"]
  );

  const items = [...techs, ...techs, ...techs];

  return (
    <div className="relative w-full overflow-hidden py-3 sm:py-4">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 z-10 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 z-10 bg-linear-to-l from-background to-transparent" />

      <motion.div
        className="flex items-end"
        style={{ width: "max-content", x }}
      >
        {items.map((tech, i) => (
          <TechChip key={`${tech.name}-${i}`} tech={tech} small />
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Row label ──────────────────────────────────────────────────────────── */
function RowLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-5 px-5 sm:px-6 max-w-6xl mx-auto mb-3 sm:mb-4">
      <span className="font-helvetica text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-bold text-foreground/25">
        {number}
      </span>
      <span className="font-helvetica text-xs sm:text-sm uppercase tracking-[0.25em] font-black text-foreground/50">
        {label}
      </span>
      <div className="flex-1 h-px bg-foreground/10" />
    </div>
  );
}

/* ─── Skills section ─────────────────────────────────────────────────────── */
export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={sectionRef} id="skills" className="py-20 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-5 sm:px-6 mb-14 md:mb-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-helvetica text-xs uppercase tracking-[0.35em] font-bold text-foreground/40 mb-3"
        >
          What I work with
        </motion.p>

        <div className="flex items-end gap-4 sm:gap-6 flex-wrap">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-garamond text-5xl sm:text-6xl md:text-7xl leading-none"
          >
            Skills
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="flex-1 min-w-12 h-1.5 bg-accent-orange mb-3"
          />
        </div>
      </div>

      {/* Three scroll-driven rows */}
      <div className="flex flex-col gap-10 sm:gap-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0 }}
        >
          <RowLabel number="01" label="Frontend" />
          <MarqueeRow techs={frontend} direction="right" scrollYProgress={scrollYProgress} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <RowLabel number="02" label="Backend" />
          <MarqueeRow techs={backend} direction="left" scrollYProgress={scrollYProgress} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.2 }}
        >
          <RowLabel number="03" label="Tooling" />
          <MarqueeRow techs={tooling} direction="right" scrollYProgress={scrollYProgress} />
        </motion.div>
      </div>
    </section>
  );
}